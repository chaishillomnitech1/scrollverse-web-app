/**
 * OmniChess PvP tRPC Router
 * Handles: challenge creation, match state, wager escrow, leaderboard
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { chess_matches, chess_wager_escrow } from "../../drizzle/schema";
import { eq, desc, or, and } from "drizzle-orm";

export const chessRouter = router({
  // Get active matches for the current user
  getMyMatches: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const matches = await db
      .select()
      .from(chess_matches)
      .where(
        or(
          eq(chess_matches.challenger_id, ctx.user.id),
          eq(chess_matches.opponent_id, ctx.user.id)
        )
      )
      .orderBy(desc(chess_matches.created_at))
      .limit(20);
    return matches;
  }),

  // Get global leaderboard
  getLeaderboard: publicProcedure.query(async () => {
    const db = await getDb();
    // Get all completed matches and compute win counts
    const matches = await db
      .select()
      .from(chess_matches)
      .where(eq(chess_matches.status, "completed"))
      .orderBy(desc(chess_matches.created_at))
      .limit(100);

    // Tally wins per user
    const winMap = new Map<number, { wins: number; losses: number; draws: number }>();
    for (const m of matches) {
      if (!m.winner_id) {
        // draw
        const w = winMap.get(m.challenger_id) ?? { wins: 0, losses: 0, draws: 0 };
        const b = winMap.get(m.opponent_id) ?? { wins: 0, losses: 0, draws: 0 };
        winMap.set(m.challenger_id, { ...w, draws: w.draws + 1 });
        winMap.set(m.opponent_id, { ...b, draws: b.draws + 1 });
      } else {
        const loserId = m.winner_id === m.challenger_id ? m.opponent_id : m.challenger_id;
        const w = winMap.get(m.winner_id) ?? { wins: 0, losses: 0, draws: 0 };
        const l = winMap.get(loserId) ?? { wins: 0, losses: 0, draws: 0 };
        winMap.set(m.winner_id, { ...w, wins: w.wins + 1 });
        winMap.set(loserId, { ...l, losses: l.losses + 1 });
      }
    }

    // Get user names for top players
    const topUserIds = Array.from(winMap.entries())
      .sort((a, b) => b[1].wins - a[1].wins)
      .slice(0, 10)
      .map(([id]) => id);

    const leaderboard = topUserIds.map((id, rank) => {
      const stats = winMap.get(id)!;
      return {
        rank: rank + 1,
        userId: id,
        displayName: `Guardian #${id}`,
        wins: stats.wins,
        losses: stats.losses,
        draws: stats.draws,
        londc_earned: stats.wins * 144,
      };
    });

    return leaderboard;
  }),

  // Create a challenge (open match invitation)
  createChallenge: protectedProcedure
    .input(
      z.object({
        wager_londc: z.number().min(0).max(10000).default(0),
        time_control: z.enum(["bullet", "blitz", "rapid", "classical"]).default("blitz"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const [result] = await db.insert(chess_matches).values({
        challenger_id: ctx.user.id,
        opponent_id: 0, // 0 = open challenge
        status: "pending",
        wager_amount: input.wager_londc,
        wager_tier: input.wager_londc === 0 ? "none" : input.wager_londc <= 144 ? "guardian" : input.wager_londc <= 444 ? "sovereign" : "ascendant",
        board_state: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        move_history: "[]",
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      return { matchId: (result as any).insertId as number };
    }),

  // Accept an open challenge
  acceptChallenge: protectedProcedure
    .input(z.object({ matchId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const [match] = await db
        .select()
        .from(chess_matches)
        .where(eq(chess_matches.id, input.matchId));
      if (!match) throw new Error("Match not found");
      if (match.status !== "pending") throw new Error("Match already started");
      if (match.challenger_id === ctx.user.id) throw new Error("Cannot accept your own challenge");

      await db
        .update(chess_matches)
        .set({
          opponent_id: ctx.user.id,
          status: "active",
          updated_at: Date.now(),
        })
        .where(eq(chess_matches.id, input.matchId));

      return { success: true };
    }),

  // Get open challenges (pending matches with black_player_id = 0)
  getOpenChallenges: publicProcedure.query(async () => {
    const db = await getDb();
    const challenges = await db
      .select()
      .from(chess_matches)
      .where(and(eq(chess_matches.status, "pending"), eq(chess_matches.opponent_id, 0)))
      .orderBy(desc(chess_matches.created_at))
      .limit(20);
    return challenges;
  }),

  // Get a single match by ID
  getMatch: publicProcedure
    .input(z.object({ matchId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const [match] = await db
        .select()
        .from(chess_matches)
        .where(eq(chess_matches.id, input.matchId));
      return match ?? null;
    }),

  // Resign from a match
  resign: protectedProcedure
    .input(z.object({ matchId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const [match] = await db
        .select()
        .from(chess_matches)
        .where(eq(chess_matches.id, input.matchId));
      if (!match) throw new Error("Match not found");
      if (match.status !== "active") throw new Error("Match is not active");
      const isChallenger = match.challenger_id === ctx.user.id;
      const isOpponent = match.opponent_id === ctx.user.id;
      if (!isChallenger && !isOpponent) throw new Error("Not a participant");

      const winnerId = isChallenger ? match.opponent_id : match.challenger_id;
      await db
        .update(chess_matches)
        .set({
          status: "completed",
          winner_id: winnerId,
          updated_at: Date.now(),
        })
        .where(eq(chess_matches.id, input.matchId));

      return { success: true, winnerId };
    }),

  // Get wager escrow for a match
  getWager: publicProcedure
    .input(z.object({ matchId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const [wager] = await db
        .select()
        .from(chess_wager_escrow)
        .where(eq(chess_wager_escrow.match_id, input.matchId));
      return wager ?? null;
    }),
});
