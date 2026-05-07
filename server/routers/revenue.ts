/**
 * Revenue Distribution Router — Phase 37
 * Handles all 5 revenue streams:
 *   1. Referral rewards: 5% $LONDC auto-credit on referred purchase
 *   2. Zakat distribution: 7.77% of every Token Store purchase
 *   3. Creator coin trading fees: 5% on every swap
 *   4. NFT royalties: 10% on secondary sales
 *   5. Revenue streams dashboard data
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  revenueDistributions,
  revenueEvents,
  referralCodes,
  auditLogs,
} from "../../drizzle/schema";
import { eq, desc, sum, count } from "drizzle-orm";

// Revenue stream constants
const REFERRAL_RATE = 0.05;    // 5%
const ZAKAT_RATE = 0.0777;     // 7.77%
const TRADING_FEE_RATE = 0.05; // 5%
const NFT_ROYALTY_RATE = 0.10; // 10%

export const revenueRouter = router({
  // Distribute revenue across all streams for a given purchase
  distributeRevenue: protectedProcedure
    .input(z.object({
      sourceType: z.enum(["token_purchase", "nft_mint", "creator_coin_swap", "nft_secondary_sale", "academy_enrollment"]),
      sourceId: z.string().optional(),
      totalAmountCents: z.number().int().positive(),
      referralCode: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const total = input.totalAmountCents;

      // Calculate distributions
      const zakatAmount = Math.floor(total * ZAKAT_RATE);
      const referralAmount = input.referralCode ? Math.floor(total * REFERRAL_RATE) : 0;
      const tradingFeeAmount = input.sourceType === "creator_coin_swap" ? Math.floor(total * TRADING_FEE_RATE) : 0;
      const nftRoyaltyAmount = input.sourceType === "nft_secondary_sale" ? Math.floor(total * NFT_ROYALTY_RATE) : 0;
      const netAmount = total - zakatAmount - referralAmount - tradingFeeAmount - nftRoyaltyAmount;

      // Resolve referral user if code provided
      let referralUserId: number | null = null;
      if (input.referralCode) {
        const [ref] = await db
          .select()
          .from(referralCodes)
          .where(eq(referralCodes.code, input.referralCode))
          .limit(1);
        if (ref) {
          referralUserId = ref.userId ?? null;
          // Increment referral conversions
          await db
            .update(referralCodes)
            .set({ conversions: (ref.conversions ?? 0) + 1, rewardTokens: (ref.rewardTokens ?? 0) + Math.floor(referralAmount / 100) })
            .where(eq(referralCodes.id, ref.id));
        }
      }

      // Record the distribution
      await db.insert(revenueDistributions).values({
        sourceType: input.sourceType,
        sourceId: input.sourceId ?? null,
        totalAmount: total,
        referralAmount,
        zakatAmount,
        tradingFeeAmount,
        nftRoyaltyAmount,
        netAmount,
        referralUserId,
      });

      // Log revenue event
      await db.insert(revenueEvents).values({
        eventType: `${input.sourceType}_distributed`,
        productTier: input.sourceType,
        amountCents: total,
        currency: "usd",
      });

      // Audit log
      await db.insert(auditLogs).values({
        userId: ctx.user.id,
        action: "revenue_distributed",
        resource: "revenue_distributions",
        resourceId: input.sourceId ?? "unknown",
        metadata: JSON.stringify({ sourceType: input.sourceType, total, zakatAmount, referralAmount }),
      });

      return {
        success: true,
        distribution: {
          total,
          zakat: zakatAmount,
          referral: referralAmount,
          tradingFee: tradingFeeAmount,
          nftRoyalty: nftRoyaltyAmount,
          net: netAmount,
        },
      };
    }),

  // Get revenue streams dashboard data
  getStreamsData: publicProcedure.query(async () => {
    const db = await getDb();

    // Get all distributions
    const distributions = await db
      .select()
      .from(revenueDistributions)
      .orderBy(desc(revenueDistributions.distributedAt))
      .limit(100);

    // Aggregate totals
    const totals = distributions.reduce(
      (acc: { totalRevenue: number; totalZakat: number; totalReferral: number; totalTradingFees: number; totalNftRoyalties: number; totalNet: number }, d: typeof distributions[0]) => ({
        totalRevenue: acc.totalRevenue + d.totalAmount,
        totalZakat: acc.totalZakat + (d.zakatAmount ?? 0),
        totalReferral: acc.totalReferral + (d.referralAmount ?? 0),
        totalTradingFees: acc.totalTradingFees + (d.tradingFeeAmount ?? 0),
        totalNftRoyalties: acc.totalNftRoyalties + (d.nftRoyaltyAmount ?? 0),
        totalNet: acc.totalNet + d.netAmount,
      }),
      { totalRevenue: 0, totalZakat: 0, totalReferral: 0, totalTradingFees: 0, totalNftRoyalties: 0, totalNet: 0 }
    );

    // Revenue by source type
    const bySource: Record<string, number> = {};
    for (const d of distributions) {
      bySource[d.sourceType] = (bySource[d.sourceType] ?? 0) + d.totalAmount;
    }

    // Recent distributions
    const recent = distributions.slice(0, 20);

    return {
      totals,
      bySource,
      recent,
      streams: [
        {
          name: "Referral Rewards",
          rate: "5%",
          description: "Auto-credited to referrer on every referred purchase",
          totalDistributed: totals.totalReferral,
          color: "#00D4FF",
          icon: "🔗",
        },
        {
          name: "Zakat Distribution",
          rate: "7.77%",
          description: "Sovereign charity auto-routed to Zakat vault on every purchase",
          totalDistributed: totals.totalZakat,
          color: "#FFB800",
          icon: "☪️",
        },
        {
          name: "Creator Coin Trading Fees",
          rate: "5%",
          description: "Fee on every creator coin swap in the BRUDDAH marketplace",
          totalDistributed: totals.totalTradingFees,
          color: "#00FF88",
          icon: "💱",
        },
        {
          name: "NFT Royalties",
          rate: "10%",
          description: "Creator royalty on every secondary NFT sale",
          totalDistributed: totals.totalNftRoyalties,
          color: "#FF6B6B",
          icon: "🎨",
        },
        {
          name: "Net Revenue",
          rate: "~77%",
          description: "Net revenue after all distributions",
          totalDistributed: totals.totalNet,
          color: "#A78BFA",
          icon: "💎",
        },
      ],
    };
  }),

  // Get recent distributions (for live feed)
  getRecentDistributions: publicProcedure
    .input(z.object({ limit: z.number().int().min(1).max(50).default(10) }))
    .query(async ({ input }) => {
      const db = await getDb();
      return db
        .select()
        .from(revenueDistributions)
        .orderBy(desc(revenueDistributions.distributedAt))
        .limit(input.limit);
    }),
});
