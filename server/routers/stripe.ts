import Stripe from "stripe";
import { z } from "zod";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { LONDC_PRODUCTS, CHX_PRESALE_PRODUCTS } from "../stripe/products";
import { stripeOrders, revenueEvents, users } from "../../drizzle/schema";
import { eq, desc, sql } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const stripeRouter = router({
  /**
   * Returns all $LONDC product tiers for the frontend to display.
   */
  getProducts: publicProcedure.query(() => {
    return LONDC_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      priceCents: p.priceCents,
      tokens: p.tokens,
      icon: p.icon,
      color: p.color,
      features: p.features,
      popular: "popular" in p ? p.popular : false,
    }));
  }),

  /**
   * Creates a Stripe Checkout Session for a $LONDC token tier purchase.
   */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        tier: z.enum(["guardian", "sovereign", "ascendant"]),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = LONDC_PRODUCTS.find((p) => p.id === input.tier);
      if (!product) throw new Error("Invalid product tier");

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: product.priceCents,
              product_data: {
                name: `ScrollVerse Trinity — ${product.name}`,
                description: `${product.tokens} $LONDC tokens. ${product.description}`,
                images: [
                  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-token-MrdUrN6gWtHmpfWBB2zPsY.webp",
                ],
              },
            },
            quantity: 1,
          },
        ],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
          product_tier: input.tier,
          tokens: product.tokens.toString(),
        },
        allow_promotion_codes: true,
        success_url: `${input.origin}/payment-success?tier=${input.tier}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.origin}/token`,
      });

      return { url: session.url! };
    }),

  /**
   * Creates a Stripe Checkout Session for an NFT purchase (Mr. Walkshit series, UAP collections, etc.)
   */
  createNFTCheckoutSession: protectedProcedure
    .input(
      z.object({
        nftId: z.string(),
        nftName: z.string(),
        nftDescription: z.string(),
        priceCents: z.number().min(50),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: input.priceCents,
              product_data: {
                name: `ScrollVerse NFT — ${input.nftName}`,
                description: input.nftDescription.slice(0, 200),
              },
            },
            quantity: 1,
          },
        ],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
          product_type: "nft",
          nft_id: input.nftId,
          nft_name: input.nftName,
        },
        allow_promotion_codes: true,
        success_url: `${input.origin}/payment-success?nft=${encodeURIComponent(input.nftName)}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.origin}/mr-walkshit`,
      });
      return { url: session.url! };
    }),

  /**
   * Returns CHX pre-sale product tiers.
   */
  getCHXProducts: publicProcedure.query(() => {
    return CHX_PRESALE_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      priceCents: p.priceCents,
      chxAmount: p.chxAmount,
      icon: p.icon,
      color: p.color,
      poolEligibility: p.poolEligibility,
      apy: p.apy,
      features: p.features,
      popular: "popular" in p ? p.popular : false,
    }));
  }),

  /**
   * Creates a Stripe Checkout Session for CHX pre-sale reservation.
   */
  createCHXCheckout: protectedProcedure
    .input(
      z.object({
        tier: z.enum(["chx_seed", "chx_celestial", "chx_infinity"]),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = CHX_PRESALE_PRODUCTS.find((p) => p.id === input.tier);
      if (!product) throw new Error("Invalid CHX pre-sale tier");
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: product.priceCents,
              product_data: {
                name: `ScrollVerse CHX Token \u2014 ${product.name}`,
                description: `${product.chxAmount.toLocaleString()} CHX tokens. ${product.poolEligibility} Pool (${product.apy}% APY).`,
              },
            },
            quantity: 1,
          },
        ],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
          product_type: "chx_presale",
          chx_tier: input.tier,
          chx_amount: product.chxAmount.toString(),
          pool: product.poolEligibility,
        },
        allow_promotion_codes: true,
        success_url: `${input.origin}/payment-success?type=chx&tier=${input.tier}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.origin}/chxtoken`,
      });
      return { url: session.url! };
    }),

  /**
   * Returns the current user's order history.
   */
  getMyOrders: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(stripeOrders)
      .where(eq(stripeOrders.userId, ctx.user.id))
      .orderBy(desc(stripeOrders.createdAt))
      .limit(20);
  }),

  /**
   * SCCC Dashboard — aggregated revenue metrics.
   */
  getDashboardMetrics: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { totalRevenueCents: 0, byTier: [], guardianCount: 0, recentEvents: [], orderCount: 0 };

    const [totalRevenue] = await db
      .select({ total: sql<number>`COALESCE(SUM(amount_cents), 0)` })
      .from(revenueEvents)
      .where(eq(revenueEvents.eventType, "payment_succeeded"));

    const byTier = await db
      .select({
        tier: revenueEvents.productTier,
        total: sql<number>`COALESCE(SUM(amount_cents), 0)`,
        count: sql<number>`COUNT(*)`,
      })
      .from(revenueEvents)
      .where(eq(revenueEvents.eventType, "payment_succeeded"))
      .groupBy(revenueEvents.productTier);

    const [guardianCount] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users);

    const recentEvents = await db
      .select()
      .from(revenueEvents)
      .orderBy(desc(revenueEvents.createdAt))
      .limit(10);

    const [orderCount] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(stripeOrders)
      .where(eq(stripeOrders.status, "succeeded"));

    return {
      totalRevenueCents: Number(totalRevenue?.total ?? 0),
      byTier,
      guardianCount: Number(guardianCount?.count ?? 0),
      recentEvents,
      orderCount: Number(orderCount?.count ?? 0),
    };
  }),

  createRingActivationTicket: protectedProcedure
    .input(
      z.object({
        tier: z.enum(["virtual", "physical", "sovereign"]),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { RING_ACTIVATION_PRODUCTS } = await import("../stripe/products.js");
      const product = RING_ACTIVATION_PRODUCTS.find((p) => p.id === input.tier);
      if (!product) throw new Error("Invalid ticket tier");
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: product.priceCents,
              product_data: {
                name: `Ring Activation Gathering — ${product.name}`,
                description: product.description,
              },
            },
            quantity: 1,
          },
        ],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
          product_type: "ring_activation_ticket",
          tier: input.tier,
        },
        allow_promotion_codes: true,
        success_url: `${input.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=ring_activation`,
        cancel_url: `${input.origin}/ring-activation`,
      });
      return { url: session.url! };
    }),

});
