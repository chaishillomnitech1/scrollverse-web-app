/**
 * SEERAH ROUTER
 * Quiz leaderboard: saveScore (protected) + getLeaderboard (public)
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { seerahQuizScores } from "../../drizzle/schema";
import { desc, eq } from "drizzle-orm";

export const seerahRouter = router({
  /** Save a quiz score for the authenticated user */
  saveScore: protectedProcedure
    .input(
      z.object({
        score: z.number().int().min(0).max(10),
        totalQuestions: z.number().int().default(10),
        badge: z.string().max(64),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const userName = ctx.user.name ?? ctx.user.email ?? "Anonymous Guardian";

      await db.insert(seerahQuizScores).values({
        userId: ctx.user.id,
        userName,
        score: input.score,
        totalQuestions: input.totalQuestions,
        badge: input.badge,
      });

      return { success: true };
    }),

  /** Get top-10 leaderboard (best score per user) */
  getLeaderboard: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    // Get all scores ordered by score desc, then by createdAt asc (earliest best score wins ties)
    const allScores = await db
      .select()
      .from(seerahQuizScores)
      .orderBy(desc(seerahQuizScores.score), seerahQuizScores.createdAt)
      .limit(100);

    // Deduplicate: keep only best score per user
    const seen = new Set<number>();
    const top: typeof allScores = [];
    for (const row of allScores) {
      if (!seen.has(row.userId)) {
        seen.add(row.userId);
        top.push(row);
        if (top.length >= 10) break;
      }
    }

    return top.map((row: (typeof allScores)[number], i: number) => ({
      rank: i + 1,
      userName: row.userName,
      score: row.score,
      totalQuestions: row.totalQuestions,
      badge: row.badge,
      createdAt: row.createdAt,
    }));
  }),
});
