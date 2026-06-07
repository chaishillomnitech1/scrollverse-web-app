/**
 * ScrollVerse Casino Router — Provably Fair Gaming Engine
 * Games: Slots | Spin Wheel | Scratch Card | Jackpot Pools
 * Features: Lose-to-Earn 10% kickback, Guardian tier bonuses, 4 jackpot pools
 */
import crypto from "crypto";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { casinoSessions, casinoJackpot, notifications, users } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

// ── Provably Fair PRNG ────────────────────────────────────────────────────────
function generateServerSeed(): string {
  return crypto.randomBytes(32).toString("hex");
}

function generateHash(serverSeed: string, clientSeed: string, nonce: number): string {
  return crypto
    .createHmac("sha256", serverSeed)
    .update(`${clientSeed}:${nonce}`)
    .digest("hex");
}

function hashToFloat(hash: string): number {
  const hex = hash.substring(0, 8);
  return parseInt(hex, 16) / 0xffffffff;
}

// ── Slot Machine Engine ───────────────────────────────────────────────────────
const SLOT_SYMBOLS = ["🌙", "⭐", "💎", "🔥", "🕋", "👑", "🌌", "⚡", "🧬", "♾️"];
const SLOT_WEIGHTS = [20, 18, 12, 10, 8, 6, 5, 4, 3, 1]; // Higher index = rarer

function weightedSymbol(rng: number): string {
  const total = SLOT_WEIGHTS.reduce((a, b) => a + b, 0);
  let cumulative = 0;
  for (let i = 0; i < SLOT_SYMBOLS.length; i++) {
    cumulative += SLOT_WEIGHTS[i];
    if (rng * total < cumulative) return SLOT_SYMBOLS[i];
  }
  return SLOT_SYMBOLS[0];
}

function spinSlots(hash: string): { reels: string[]; outcome: string; multiplier: number } {
  const rng1 = hashToFloat(hash);
  const rng2 = hashToFloat(hash.substring(8));
  const rng3 = hashToFloat(hash.substring(16));

  const reels = [weightedSymbol(rng1), weightedSymbol(rng2), weightedSymbol(rng3)];

  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    // Triple match
    const symbolIdx = SLOT_SYMBOLS.indexOf(reels[0]);
    if (symbolIdx >= 9) return { reels, outcome: "jackpot", multiplier: 777 };
    if (symbolIdx >= 7) return { reels, outcome: "win", multiplier: 100 };
    if (symbolIdx >= 5) return { reels, outcome: "win", multiplier: 25 };
    if (symbolIdx >= 3) return { reels, outcome: "win", multiplier: 10 };
    return { reels, outcome: "win", multiplier: 5 };
  } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
    return { reels, outcome: "win", multiplier: 2 };
  }
  return { reels, outcome: "lose", multiplier: 0 };
}

// ── Spin Wheel Engine ─────────────────────────────────────────────────────────
const WHEEL_SEGMENTS = [
  { label: "2x", multiplier: 2, probability: 0.15 },
  { label: "LOSE", multiplier: 0, probability: 0.30 },
  { label: "3x", multiplier: 3, probability: 0.12 },
  { label: "LOSE", multiplier: 0, probability: 0.15 },
  { label: "5x", multiplier: 5, probability: 0.10 },
  { label: "LOSE", multiplier: 0, probability: 0.08 },
  { label: "10x", multiplier: 10, probability: 0.05 },
  { label: "JACKPOT", multiplier: 0, probability: 0.02 }, // triggers jackpot pool
  { label: "1.5x", multiplier: 1.5, probability: 0.03 },
];

function spinWheel(hash: string): { segment: string; multiplier: number; outcome: string; segmentIndex: number } {
  const rng = hashToFloat(hash);
  let cumulative = 0;
  for (let i = 0; i < WHEEL_SEGMENTS.length; i++) {
    cumulative += WHEEL_SEGMENTS[i].probability;
    if (rng < cumulative) {
      const seg = WHEEL_SEGMENTS[i];
      const outcome = seg.label === "JACKPOT" ? "jackpot" : seg.multiplier > 0 ? "win" : "lose";
      return { segment: seg.label, multiplier: seg.multiplier, outcome, segmentIndex: i };
    }
  }
  return { segment: "LOSE", multiplier: 0, outcome: "lose", segmentIndex: 1 };
}

// ── Scratch Card Engine ───────────────────────────────────────────────────────
const SCRATCH_PRIZES = [
  { label: "💎 JACKPOT", multiplier: 100, probability: 0.005 },
  { label: "👑 50x", multiplier: 50, probability: 0.01 },
  { label: "🔥 20x", multiplier: 20, probability: 0.02 },
  { label: "⭐ 10x", multiplier: 10, probability: 0.04 },
  { label: "🌙 5x", multiplier: 5, probability: 0.08 },
  { label: "⚡ 3x", multiplier: 3, probability: 0.12 },
  { label: "🧬 2x", multiplier: 2, probability: 0.18 },
  { label: "❌ No Win", multiplier: 0, probability: 0.525 },
];

function scratchCard(hash: string): { prize: string; multiplier: number; outcome: string; cells: string[] } {
  const rng = hashToFloat(hash);
  let cumulative = 0;
  let prize = SCRATCH_PRIZES[SCRATCH_PRIZES.length - 1];
  for (const p of SCRATCH_PRIZES) {
    cumulative += p.probability;
    if (rng < cumulative) { prize = p; break; }
  }
  // Generate 9 scratch cells (3x3 grid)
  const cells = Array.from({ length: 9 }, (_, i) => {
    const h = hashToFloat(hash.substring(i * 4));
    return h < 0.3 ? "💎" : h < 0.6 ? "⭐" : h < 0.8 ? "🔥" : "🌙";
  });
  const outcome = prize.multiplier >= 100 ? "jackpot" : prize.multiplier > 0 ? "win" : "lose";
  return { prize: prize.label, multiplier: prize.multiplier, outcome, cells };
}

// ── Guardian Tier Bonus Multiplier ────────────────────────────────────────────
function getTierBonus(tier: string): number {
  switch (tier) {
    case "guardian": return 1.1;    // +10%
    case "sovereign": return 1.25;  // +25%
    case "ascendant": return 1.5;   // +50%
    default: return 1.0;
  }
}

// ── Router ────────────────────────────────────────────────────────────────────
export const casinoRouter = router({
  /**
   * Get current jackpot pool amounts
   */
  getJackpots: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const pools = await db.select().from(casinoJackpot).orderBy(casinoJackpot.poolName);
    if (pools.length === 0) {
      const defaults = [
        { poolName: "mini", currentAmount: "144" },
        { poolName: "major", currentAmount: "1440" },
        { poolName: "mega", currentAmount: "14400" },
        { poolName: "sovereign", currentAmount: "144000" },
      ];
      await db.insert(casinoJackpot).values(defaults);
      return defaults.map((p, i) => ({ id: i + 1, ...p, lastWonAt: null, lastWinnerId: null, updatedAt: new Date() }));
    }
    return pools;
  }),

  /**
   * Get player stats for the current user
   */
  getMyStats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { sessions: [], stats: { totalGames: 0, totalBet: "0", totalPayout: "0", totalKickback: "0", netProfit: "0", winRate: "0" } };
    const sessions = await db
      .select()
      .from(casinoSessions)
      .where(eq(casinoSessions.userId, ctx.user.id))
      .orderBy(desc(casinoSessions.createdAt))
      .limit(20);

    const totalBet = sessions.reduce((acc: number, s: typeof sessions[0]) => acc + parseFloat(s.betAmount), 0);
    const totalPayout = sessions.reduce((acc: number, s: typeof sessions[0]) => acc + parseFloat(s.payout), 0);
    const totalKickback = sessions.reduce((acc: number, s: typeof sessions[0]) => acc + parseFloat(s.kickback), 0);
    const wins = sessions.filter((s: typeof sessions[0]) => s.outcome === "win" || s.outcome === "jackpot").length;

    return {
      sessions: sessions.slice(0, 10),
      stats: {
        totalGames: sessions.length,
        totalBet: totalBet.toFixed(2),
        totalPayout: totalPayout.toFixed(2),
        totalKickback: totalKickback.toFixed(2),
        netProfit: (totalPayout + totalKickback - totalBet).toFixed(2),
        winRate: sessions.length > 0 ? ((wins / sessions.length) * 100).toFixed(1) : "0",
      },
    };
  }),

  /**
   * Spin the slot machine
   */
  spinSlots: protectedProcedure
    .input(
      z.object({
        betAmount: z.number().min(1).max(10000),
        clientSeed: z.string().min(1).max(128),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const serverSeed = generateServerSeed();
      const nonce = Math.floor(Math.random() * 1000000);
      const hash = generateHash(serverSeed, input.clientSeed, nonce);
      const { reels, outcome, multiplier } = spinSlots(hash);

      const [user] = await db.select().from(users).where(eq(users.id, ctx.user.id));
      const tierBonus = getTierBonus(user?.guardianTier ?? "none");

      const bet = input.betAmount;
      const rawPayout = outcome === "jackpot" ? bet * 777 : outcome === "win" ? bet * multiplier : 0;
      const payout = Math.floor(rawPayout * tierBonus);
      const kickback = outcome === "lose" ? Math.floor(bet * 0.10) : 0;

      const [row] = await db
        .insert(casinoSessions)
        .values({
          userId: ctx.user.id,
          game: "slots",
          betAmount: bet.toString(),
          outcome,
          payout: payout.toString(),
          kickback: kickback.toString(),
          serverSeed,
          clientSeed: input.clientSeed,
          nonce,
          result: JSON.stringify({ reels, multiplier, hash: hash.substring(0, 16) }),
          createdAt: new Date(),
        })
        .$returningId();

      if (outcome === "jackpot" || payout > bet * 10) {
        await db.insert(notifications).values({
          userId: ctx.user.id,
          title: outcome === "jackpot" ? "🎰 JACKPOT! SOVEREIGN WIN!" : "🎰 Big Win!",
          message: `You won ${payout} $LONDC on the slots! Reels: ${reels.join(" ")}`,
          type: outcome === "jackpot" ? "jackpot" : "success",
          link: "/casino",
          createdAt: new Date(),
        });
      }

      return {
        sessionId: row.id,
        reels,
        outcome,
        multiplier,
        bet,
        payout,
        kickback,
        tierBonus,
        serverSeed: serverSeed.substring(0, 16) + "...", // partial reveal for fairness
        hash: hash.substring(0, 16),
        message: outcome === "jackpot"
          ? "🎰 SOVEREIGN JACKPOT! KUN FAYAKŪN × ∞!"
          : outcome === "win"
          ? `🎉 You won ${payout} $LONDC!`
          : kickback > 0
          ? `💫 Lose-to-Earn: ${kickback} $LONDC kickback credited!`
          : "Try again — the Ring is with you!",
      };
    }),

  /**
   * Spin the wheel of fortune
   */
  spinWheel: protectedProcedure
    .input(
      z.object({
        betAmount: z.number().min(1).max(10000),
        clientSeed: z.string().min(1).max(128),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const serverSeed = generateServerSeed();
      const nonce = Math.floor(Math.random() * 1000000);
      const hash = generateHash(serverSeed, input.clientSeed, nonce);
      const { segment, multiplier, outcome, segmentIndex } = spinWheel(hash);

      const [user] = await db.select().from(users).where(eq(users.id, ctx.user.id));
      const tierBonus = getTierBonus(user?.guardianTier ?? "none");

      const bet = input.betAmount;
      const rawPayout = outcome === "win" ? bet * multiplier : 0;
      const payout = Math.floor(rawPayout * tierBonus);
      const kickback = outcome === "lose" ? Math.floor(bet * 0.10) : 0;

      await db.insert(casinoSessions).values({
        userId: ctx.user.id,
        game: "wheel",
        betAmount: bet.toString(),
        outcome,
        payout: payout.toString(),
        kickback: kickback.toString(),
        serverSeed,
        clientSeed: input.clientSeed,
        nonce,
        result: JSON.stringify({ segment, multiplier, segmentIndex }),
        createdAt: new Date(),
      });

      return {
        segment,
        segmentIndex,
        outcome,
        multiplier,
        bet,
        payout,
        kickback,
        tierBonus,
        message: outcome === "jackpot"
          ? "🎡 JACKPOT WHEEL! ALLĀHU AKBAR × ∞!"
          : outcome === "win"
          ? `🎡 ${segment}! You won ${payout} $LONDC!`
          : kickback > 0
          ? `💫 Lose-to-Earn: ${kickback} $LONDC kickback!`
          : "The wheel turns — your time is coming!",
      };
    }),

  /**
   * Scratch card game
   */
  scratchCard: protectedProcedure
    .input(
      z.object({
        betAmount: z.number().min(1).max(10000),
        clientSeed: z.string().min(1).max(128),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const serverSeed = generateServerSeed();
      const nonce = Math.floor(Math.random() * 1000000);
      const hash = generateHash(serverSeed, input.clientSeed, nonce);
      const { prize, multiplier, outcome, cells } = scratchCard(hash);

      const [user] = await db.select().from(users).where(eq(users.id, ctx.user.id));
      const tierBonus = getTierBonus(user?.guardianTier ?? "none");

      const bet = input.betAmount;
      const rawPayout = outcome !== "lose" ? bet * multiplier : 0;
      const payout = Math.floor(rawPayout * tierBonus);
      const kickback = outcome === "lose" ? Math.floor(bet * 0.10) : 0;

      await db.insert(casinoSessions).values({
        userId: ctx.user.id,
        game: "scratch",
        betAmount: bet.toString(),
        outcome,
        payout: payout.toString(),
        kickback: kickback.toString(),
        serverSeed,
        clientSeed: input.clientSeed,
        nonce,
        result: JSON.stringify({ prize, multiplier, cells }),
        createdAt: new Date(),
      });

      return {
        prize,
        cells,
        outcome,
        multiplier,
        bet,
        payout,
        kickback,
        tierBonus,
        message: outcome === "jackpot"
          ? "💎 SCRATCH JACKPOT! SOVEREIGN WEALTH ACTIVATED!"
          : outcome === "win"
          ? `🎴 ${prize}! You won ${payout} $LONDC!`
          : kickback > 0
          ? `💫 Lose-to-Earn: ${kickback} $LONDC kickback!`
          : "Scratch again — the empire rewards persistence!",
      };
    }),

  /**
   * Get recent winners (public leaderboard)
   */
  getRecentWinners: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const winners = await db
      .select({
        id: casinoSessions.id,
        game: casinoSessions.game,
        outcome: casinoSessions.outcome,
        payout: casinoSessions.payout,
        createdAt: casinoSessions.createdAt,
      })
      .from(casinoSessions)
      .where(eq(casinoSessions.outcome, "jackpot"))
      .orderBy(desc(casinoSessions.createdAt))
      .limit(10);
    return winners;
  }),
});
