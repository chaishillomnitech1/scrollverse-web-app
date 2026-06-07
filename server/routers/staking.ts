import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { stakingRecords, stakingPositions, notifications } from "../../drizzle/schema";
import { desc, eq, count, sum, and } from "drizzle-orm";
import { notifyOwner } from "../_core/notification";

const SOVEREIGN_POOLS = {
  genesis: { name: "Genesis Pool", apy: 432, hz: "432 Hz", minChx: 100, color: "#00D4FF", icon: "🌱" },
  celestial: { name: "Celestial Pool", apy: 528, hz: "528 Hz", minChx: 500, color: "#FFB800", icon: "✨" },
  infinity: { name: "Infinity Pool", apy: 999, hz: "∞", minChx: 1000, color: "#00FF88", icon: "♾️" },
};

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

  // ── Sovereign Pool procedures ──────────────────────────────────────────────

  getPoolStats: publicProcedure.query(async () => {
    const db = await getDb();
    const pools = await Promise.all(
      (["genesis", "celestial", "infinity"] as const).map(async (pool) => {
        const cfg = SOVEREIGN_POOLS[pool];
        const rows = await db
          .select({ total: sum(stakingPositions.chxStaked), cnt: count() })
          .from(stakingPositions)
          .where(and(eq(stakingPositions.pool, pool), eq(stakingPositions.status, "active")));
        return {
          id: pool,
          ...cfg,
          tvl: Number(rows[0]?.total ?? 0),
          stakers: rows[0]?.cnt ?? 0,
        };
      })
    );
    return { pools };
  }),

  getMyPositions: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const positions = await db
      .select()
      .from(stakingPositions)
      .where(and(eq(stakingPositions.userId, ctx.user.id), eq(stakingPositions.status, "active")))
      .orderBy(desc(stakingPositions.stakedAt));
    return { positions };
  }),

  stakeInPool: protectedProcedure
    .input(z.object({
      pool: z.enum(["genesis", "celestial", "infinity"]),
      chxAmount: z.number().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const cfg = SOVEREIGN_POOLS[input.pool];
      if (input.chxAmount < cfg.minChx) {
        throw new Error(`Minimum stake for ${cfg.name} is ${cfg.minChx} CHX`);
      }
      const [row] = await db
        .insert(stakingPositions)
        .values({
          userId: ctx.user.id,
          pool: input.pool,
          chxStaked: String(input.chxAmount),
          apyRate: String(cfg.apy),
          rewardsEarned: "0",
          status: "active",
          stakedAt: new Date(),
          lastCompoundAt: new Date(),
        })
        .$returningId();
      const annualReward = (input.chxAmount * cfg.apy) / 100;

      // Fire in-app notification to the staker
      await db.insert(notifications).values({
        userId: ctx.user.id,
        title: `${cfg.icon} Staked in ${cfg.name}!`,
        message: `You've staked ${input.chxAmount.toLocaleString()} CHX in the ${cfg.name} at ${cfg.apy}% APY. Estimated annual reward: ${Math.floor(annualReward).toLocaleString()} CHX. Rewards compound daily. KUN FAYAKŪN × ∞`,
        type: "staking",
        link: "/staking",
      });

      // Notify owner of new staker
      await notifyOwner({
        title: `⚡ New Staker — ${cfg.name}`,
        content: `User ${ctx.user.id} staked ${input.chxAmount.toLocaleString()} CHX in ${cfg.name} (${cfg.apy}% APY). Est. annual reward: ${Math.floor(annualReward).toLocaleString()} CHX.`,
      });

      return {
        success: true,
        positionId: row.id,
        pool: input.pool,
        chxStaked: input.chxAmount,
        apy: cfg.apy,
        estimatedAnnualReward: Math.floor(annualReward),
        message: `${input.chxAmount} CHX staked in ${cfg.name} at ${cfg.apy}% APY. Est. annual reward: ${Math.floor(annualReward)} CHX`,
      };
    }),

  withdrawFromPool: protectedProcedure
    .input(z.object({ positionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const [pos] = await db
        .select()
        .from(stakingPositions)
        .where(and(eq(stakingPositions.id, input.positionId), eq(stakingPositions.userId, ctx.user.id)));
      if (!pos) throw new Error("Position not found");
      await db
        .update(stakingPositions)
        .set({ status: "withdrawn", withdrawnAt: new Date() })
        .where(eq(stakingPositions.id, input.positionId));
      return { success: true, message: "Position withdrawn successfully" };
    }),
});
