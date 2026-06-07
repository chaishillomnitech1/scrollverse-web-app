/**
 * Synter Ads tRPC Router
 * Exposes server-side Synter tracking and campaign stats to the frontend.
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  synterTrackEvent,
  synterGetCampaignStats,
  synterSubmitGuardianLead,
  synterTrackPurchase,
} from "../synterAds";

export const synterRouter = router({
  /**
   * Track any frontend event (page view, click, engagement)
   */
  trackEvent: publicProcedure
    .input(
      z.object({
        event: z.string().min(1).max(64),
        page: z.string().optional(),
        sessionId: z.string().optional(),
        value: z.number().optional(),
        metadata: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const success = await synterTrackEvent({
        event: input.event,
        page: input.page,
        sessionId: input.sessionId,
        userId: ctx.user?.id?.toString(),
        value: input.value,
        metadata: input.metadata,
      });
      return { success };
    }),

  /**
   * Submit a Guardian signup lead for Synter retargeting
   */
  submitGuardianLead: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        tier: z.string().default("GUARDIAN"),
        source: z.string().default("scrollverse.co"),
      })
    )
    .mutation(async ({ input }) => {
      const success = await synterSubmitGuardianLead(
        input.email,
        input.tier,
        input.source
      );
      return { success };
    }),

  /**
   * Get campaign performance stats (protected — owner only)
   */
  getCampaignStats: protectedProcedure
    .input(z.object({ campaignId: z.string().optional() }))
    .query(async ({ input }) => {
      const stats = await synterGetCampaignStats(input.campaignId);
      return { stats };
    }),

  /**
   * Track a purchase conversion (called internally after Stripe webhook)
   */
  trackPurchase: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        productName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const success = await synterTrackPurchase(
        ctx.user.id.toString(),
        input.amount,
        input.productName
      );
      return { success };
    }),
});
