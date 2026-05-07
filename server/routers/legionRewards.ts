/**
 * Legion Rewards Router
 * Compensation engine: impact scores, $LONDC earnings, tier upgrades
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { legionRewards, referralCodes } from "../../drizzle/schema";
import { sql, desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const legionRewardsRouter = router({
  getRewards: publicProcedure
    .input(z.object({
      memberId: z.number().optional(),
      rewardType: z.string().optional(),
      status: z.string().optional(),
      limit: z.number().min(1).max(100).default(20),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      const conditions: string[] = [];
      if (input.memberId) conditions.push(`member_id = ${input.memberId}`);
      if (input.rewardType) conditions.push(`reward_type = '${input.rewardType}'`);
      if (input.status) conditions.push(`status = '${input.status}'`);
      const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      const results = await db.execute(
        sql.raw(`SELECT * FROM legion_rewards ${where} ORDER BY created_at DESC LIMIT ${input.limit}`)
      );
      const rows = Array.isArray(results) ? results[0] as any[] : (results as any).rows ?? [];
      return rows;
    }),

  distributeReward: protectedProcedure
    .input(z.object({
      memberId: z.number(),
      memberName: z.string().optional(),
      rewardType: z.enum(["contribution", "creation", "advancement", "referral", "governance"]),
      amount: z.string(),
      currency: z.string().default("LONDC"),
      reason: z.string().optional(),
      impactScore: z.number().default(0),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can distribute rewards" });
      }
      const db = await getDb();
      const [result] = await db.insert(legionRewards).values({
        memberId: input.memberId,
        memberName: input.memberName,
        rewardType: input.rewardType,
        amount: input.amount,
        currency: input.currency,
        reason: input.reason,
        impactScore: input.impactScore,
        status: "distributed",
        distributedAt: new Date(),
      });
      return { success: true, id: (result as any).insertId };
    }),

  getLeaderboard: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      const results = await db.execute(
        sql.raw(`
          SELECT member_id, member_name,
            SUM(CAST(amount AS DECIMAL(20,4))) as total_earned,
            SUM(impact_score) as total_impact,
            COUNT(*) as reward_count,
            MAX(created_at) as last_reward
          FROM legion_rewards
          WHERE status IN ('distributed', 'claimed')
          GROUP BY member_id, member_name
          ORDER BY total_earned DESC
          LIMIT ${input.limit}
        `)
      );
      const rows = Array.isArray(results) ? results[0] as any[] : (results as any).rows ?? [];
      return rows;
    }),

  claimReward: protectedProcedure
    .input(z.object({
      rewardId: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      // Verify the reward belongs to this user
      const [reward] = await db.select().from(legionRewards)
        .where(eq(legionRewards.id, input.rewardId))
        .limit(1);
      if (!reward) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Reward not found" });
      }
      if (reward.memberId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "This reward does not belong to you" });
      }
      if (reward.status === "claimed") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Reward already claimed" });
      }
      await db.update(legionRewards)
        .set({ status: "claimed" })
        .where(eq(legionRewards.id, input.rewardId));
      return { success: true };
    }),

  getMyRewards: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      const results = await db.select().from(legionRewards)
        .where(eq(legionRewards.memberId, ctx.user.id))
        .orderBy(desc(legionRewards.createdAt))
        .limit(50);
      return results;
    }),

  // Activate a Guardian using a referral code — auto-distributes $LONDC to the creator
  activateWithReferral: protectedProcedure
    .input(z.object({
      referralCode: z.string().min(1).max(64),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();

      // Find the referral code
      const [codeRow] = await db.select().from(referralCodes)
        .where(eq(referralCodes.code, input.referralCode.toUpperCase()))
        .limit(1);

      if (!codeRow) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Referral code not found" });
      }

      // Determine reward rate by tier
      const tierRates: Record<string, number> = {
        guardian: 7.77,
        sovereign: 14.4,
        ascendant: 22.2,
      };
      const tier = (codeRow.tier ?? "guardian").toLowerCase();
      const rate = tierRates[tier] ?? 7.77;

      // Base activation value: 144 $LONDC per Guardian activation
      const baseValue = 144;
      const loncReward = parseFloat((baseValue * (rate / 100)).toFixed(4));

      // Distribute $LONDC reward to the creator
      await db.insert(legionRewards).values({
        memberId: codeRow.userId ?? 0,
        memberName: codeRow.creatorName,
        rewardType: "referral",
        amount: loncReward.toString(),
        currency: "LONDC",
        reason: `Referral activation by user #${ctx.user.id} via code ${input.referralCode}`,
        impactScore: Math.floor(loncReward),
        status: "distributed",
        distributedAt: new Date(),
      });

      // Update referral code stats
      await db.execute(
        sql.raw(`UPDATE referral_codes SET conversions = conversions + 1, rewardTokens = rewardTokens + ${Math.floor(loncReward)} WHERE id = ${codeRow.id}`)
      );

      // Also update creator_applications activations count
      await db.execute(
        sql.raw(`UPDATE creator_applications SET activations_count = activations_count + 1 WHERE referral_code = '${input.referralCode.toUpperCase()}'`)
      );

      return {
        success: true,
        loncDistributed: loncReward,
        creatorName: codeRow.creatorName,
        tier,
        message: `${loncReward} $LONDC distributed to ${codeRow.creatorName} for your activation!`,
      };
    }),

  getStats: publicProcedure
    .query(async () => {
      const db = await getDb();
      const results = await db.execute(
        sql.raw(`
          SELECT
            COUNT(*) as total_rewards,
            SUM(CAST(amount AS DECIMAL(20,4))) as total_distributed,
            COUNT(DISTINCT member_id) as unique_recipients,
            SUM(impact_score) as total_impact
          FROM legion_rewards
          WHERE status IN ('distributed', 'claimed')
        `)
      );
      const rows = Array.isArray(results) ? results[0] as any[] : (results as any).rows ?? [];
      return rows[0] ?? { total_rewards: 0, total_distributed: 0, unique_recipients: 0, total_impact: 0 };
    }),
});
