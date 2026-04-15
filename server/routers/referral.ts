/**
 * GUARDIAN REFERRAL SYSTEM ROUTER
 * Unique viral invite codes for the 144,000 Guardian network
 * Each Guardian gets a sovereign code — every conversion earns $LONDC rewards
 */
import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { referralCodes } from "../../drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";

// Generate a sovereign referral code: SV-<NAME_PREFIX>-<RANDOM>
function generateSovereignCode(name: string): string {
  const prefix = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4)
    .padEnd(4, "X");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `SV-${prefix}-${random}`;
}

export const referralRouter = router({
  /**
   * Generate or retrieve a referral code for a Guardian.
   */
  generateCode: publicProcedure
    .input(
      z.object({
        creatorName: z.string().min(2).max(128),
        creatorEmail: z.string().email().max(320).optional(),
        tier: z.string().max(32).default("Guardian"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      // Check if email already has a code
      if (input.creatorEmail) {
        const existing = await db
          .select()
          .from(referralCodes)
          .where(eq(referralCodes.creatorEmail, input.creatorEmail))
          .limit(1);
        if (existing.length > 0) {
          return { code: existing[0].code, isNew: false };
        }
      }

      // Generate unique code (retry on collision)
      let code = generateSovereignCode(input.creatorName);
      let attempts = 0;
      while (attempts < 5) {
        const collision = await db
          .select({ id: referralCodes.id })
          .from(referralCodes)
          .where(eq(referralCodes.code, code))
          .limit(1);
        if (collision.length === 0) break;
        code = generateSovereignCode(input.creatorName);
        attempts++;
      }

      await db.insert(referralCodes).values({
        code,
        creatorName: input.creatorName,
        creatorEmail: input.creatorEmail ?? null,
        tier: input.tier,
        clicks: 0,
        conversions: 0,
        rewardTokens: 0,
      });

      return { code, isNew: true };
    }),

  /**
   * Track a referral link click (called when someone visits via a ref link).
   */
  trackClick: publicProcedure
    .input(z.object({ code: z.string().max(32) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      await db
        .update(referralCodes)
        .set({ clicks: sql`${referralCodes.clicks} + 1` })
        .where(eq(referralCodes.code, input.code));
      return { success: true };
    }),

  /**
   * Record a conversion when a referred Guardian completes signup/purchase.
   */
  recordConversion: publicProcedure
    .input(z.object({ code: z.string().max(32) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      // Each conversion earns 144 $LONDC reward tokens
      await db
        .update(referralCodes)
        .set({
          conversions: sql`${referralCodes.conversions} + 1`,
          rewardTokens: sql`${referralCodes.rewardTokens} + 144`,
        })
        .where(eq(referralCodes.code, input.code));
      return { success: true };
    }),

  /**
   * Get stats for a specific referral code.
   */
  getStats: publicProcedure
    .input(z.object({ code: z.string().max(32) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const [result] = await db
        .select()
        .from(referralCodes)
        .where(eq(referralCodes.code, input.code))
        .limit(1);
      return result ?? null;
    }),

  /**
   * Get the top 20 referral leaderboard.
   */
  getLeaderboard: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select({
        id: referralCodes.id,
        code: referralCodes.code,
        creatorName: referralCodes.creatorName,
        tier: referralCodes.tier,
        clicks: referralCodes.clicks,
        conversions: referralCodes.conversions,
        rewardTokens: referralCodes.rewardTokens,
      })
      .from(referralCodes)
      .orderBy(desc(referralCodes.conversions))
      .limit(20);
  }),

  /**
   * Get global referral network stats.
   */
  getNetworkStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalCodes: 0, totalClicks: 0, totalConversions: 0, totalRewardTokens: 0 };
    const [result] = await db
      .select({
        totalCodes: sql<number>`COUNT(*)`,
        totalClicks: sql<number>`SUM(${referralCodes.clicks})`,
        totalConversions: sql<number>`SUM(${referralCodes.conversions})`,
        totalRewardTokens: sql<number>`SUM(${referralCodes.rewardTokens})`,
      })
      .from(referralCodes);
    return {
      totalCodes: result?.totalCodes ?? 0,
      totalClicks: result?.totalClicks ?? 0,
      totalConversions: result?.totalConversions ?? 0,
      totalRewardTokens: result?.totalRewardTokens ?? 0,
    };
  }),
});
