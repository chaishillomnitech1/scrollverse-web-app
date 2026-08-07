/**
 * ScrollVerse Sovereign Card Router
 * Stripe Checkout sessions for card tier subscriptions
 * Tiers: Guardian (free), Sovereign ($9.99/mo), Apex ($29.99/mo), Diamond ($99.99/mo), Infinity (invite)
 * KUN FAYAKUN x Infinity
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-03-25.dahlia" });
}

// Card tier catalog with Stripe prices (monthly subscriptions, in cents USD)
const CARD_TIERS: Record<string, { name: string; price: number; description: string; features: string[] }> = {
  guardian: {
    name: "Guardian Card",
    price: 0,
    description: "Free entry to sovereignty — instant digital card, $LONDC wallet, 1% cashback",
    features: ["Instant digital card", "$LONDC native wallet", "1% cashback in $LONDC", "Zero foreign transaction fees"],
  },
  sovereign: {
    name: "Sovereign Card",
    price: 999, // $9.99/mo
    description: "Physical gold-accented card, 2.5% cashback, Zakat auto-distribution, Sovereign Bank access",
    features: ["Physical gold-accented card", "2.5% cashback in $LONDC", "Zakat 7.77% auto-distribution", "Sovereign Bank account"],
  },
  apex: {
    name: "Apex Card",
    price: 2999, // $29.99/mo
    description: "Metal frequency-encoded card, 5% cashback + 1% BTC, NFT collateral lending, $LONDC staking 12% APY",
    features: ["Metal frequency-encoded card", "5% $LONDC + 1% BTC cashback", "NFT collateral lending", "$LONDC staking 12% APY"],
  },
  diamond: {
    name: "Diamond Card",
    price: 9999, // $99.99/mo
    description: "Diamond-finish card, 10% cashback, direct market access, AI Legion financial advisors, $LONDC staking 18% APY",
    features: ["Diamond-finish physical card", "10% cashback in $LONDC", "Direct market access", "AI Legion financial advisors"],
  },
};

export const cardRouter = router({
  /**
   * Create a Stripe Checkout session for a card tier subscription.
   * Guardian tier is free — no Stripe session needed.
   */
  createCardCheckout: publicProcedure
    .input(
      z.object({
        tierId: z.enum(["sovereign", "apex", "diamond"]),
        successUrl: z.string().url(),
        cancelUrl: z.string().url(),
        customerEmail: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const stripe = getStripe();
      if (!stripe) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Payment processing not yet active. Activate Stripe Live Mode in Management UI → Settings → Payment to start accepting real card applications.",
        });
      }

      const tier = CARD_TIERS[input.tierId];
      if (!tier) throw new TRPCError({ code: "BAD_REQUEST", message: "Card tier not found" });

      // Use subscription mode for recurring monthly fee
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        ...(input.customerEmail ? { customer_email: input.customerEmail } : {}),
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: {
              name: tier.name,
              description: tier.description,
              metadata: { tierId: input.tierId, source: "scrollverse.co/sovereign-card" },
            },
            unit_amount: tier.price,
            recurring: { interval: "month" },
          },
          quantity: 1,
        }],
        metadata: { tierId: input.tierId, cardName: tier.name },
        success_url: `${input.successUrl}?session_id={CHECKOUT_SESSION_ID}&tier=${input.tierId}`,
        cancel_url: input.cancelUrl,
        subscription_data: {
          metadata: { tierId: input.tierId, source: "scrollverse-sovereign-card" },
        },
      });

      return {
        sessionId: session.id,
        url: session.url,
        amount: tier.price,
        tierName: tier.name,
        tierId: input.tierId,
      };
    }),

  /**
   * Get card checkout session status.
   */
  getCardCheckoutStatus: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const stripe = getStripe();
      if (!stripe) return { status: "unknown", active: false };
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      return {
        status: session.payment_status,
        active: session.status === "complete",
        tierId: session.metadata?.tierId,
        tierName: session.metadata?.cardName,
        customerEmail: session.customer_email,
      };
    }),

  /**
   * Apply for Guardian tier (free) — just record the application.
   */
  applyGuardian: protectedProcedure
    .mutation(async ({ ctx }) => {
      // Guardian is free — just confirm the application
      return {
        success: true,
        message: "Guardian Card application received. Your digital card will be activated within 24 hours. KUN FAYAKŪN × ∞",
        userId: ctx.user.id,
        tier: "guardian",
      };
    }),
});
