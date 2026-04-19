import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { stakingRecords } from "../../drizzle/schema";
import { desc, eq, count, sum } from "drizzle-orm";

const STAKING_TIERS = {
  guardian: { lockDays: 30, apyBasisPoints: 500, minAmount: 144, label: "Guardian", color: "#00D4FF" },
  sovereign: { lockDays: 90, apyBasisPoints: 1200, minAmount: 444, label: "Sovereign", color: "#FFB800" },
  supreme: { lockDays: 365, apyBasisPoints: 2500, minAmount: 1444, label: "Supreme", color: "#FF6B35" },
};

export const stakingRouter = router({
  getTiers: publicProcedure.query(() => {
    return { tiers: STAKING_TIERS };
  }),

  getPositions: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { positions: [], totalStaked: 0, activeStakers: 0 };

      const positions = await db
        .select()
        .from(stakingRecords)
        .where(eq(stakingRecords.status, "active"))
        .orderBy(desc(stakingRecords.stakedAt))
        .limit(input.limit);

      const totalResult = await db
        .select({ total: sum(stakingRecords.amountLondc) })
        .from(stakingRecords)
        .where(eq(stakingRecords.status, "active"));

      const countResult = await db
        .select({ count: count() })
        .from(stakingRecords)
        .where(eq(stakingRecords.status, "active"));

      return {
        positions,
        totalStaked: Number(totalResult[0]?.total ?? 0),
        activeStakers: countResult[0]?.count ?? 0,
      };
    }),

  stake: publicProcedure
    .input(z.object({
      stakerName: z.string().min(1).max(128),
      walletAddress: z.string().max(64).optional(),
      tier: z.enum(["guardian", "sovereign", "supreme"]),
      amountLondc: z.number().min(1),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");

      const tierConfig = STAKING_TIERS[input.tier];
      if (input.amountLondc < tierConfig.minAmount) {
        throw new Error(`Minimum stake for ${tierConfig.label} tier is ${tierConfig.minAmount} $LONDC`);
      }

      const unlocksAt = new Date();
      unlocksAt.setDate(unlocksAt.getDate() + tierConfig.lockDays);

      const [record] = await db
        .insert(stakingRecords)
        .values({
          stakerName: input.stakerName,
          walletAddress: input.walletAddress,
          tier: input.tier,
          amountLondc: input.amountLondc,
          apyPercent: tierConfig.apyBasisPoints,
          lockDays: tierConfig.lockDays,
          unlocksAt,
        })
        .$returningId();

      const annualReward = Math.floor((input.amountLondc * tierConfig.apyBasisPoints) / 10000);
      const periodReward = Math.floor((annualReward * tierConfig.lockDays) / 365);

      return {
        success: true,
        recordId: record.id,
        tier: input.tier,
        amountStaked: input.amountLondc,
        estimatedReward: periodReward,
        unlocksAt,
        message: `${input.amountLondc} $LONDC staked at ${tierConfig.apyBasisPoints / 100}% APY. Estimated reward: ${periodReward} $LONDC`,
      };
    }),

  getLeaderboard: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(10) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { leaderboard: [] };

      const leaderboard = await db
        .select()
        .from(stakingRecords)
        .where(eq(stakingRecords.status, "active"))
        .orderBy(desc(stakingRecords.amountLondc))
        .limit(input.limit);

      return { leaderboard };
    }),
});
