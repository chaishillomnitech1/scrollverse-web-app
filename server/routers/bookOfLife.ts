/**
 * Book of Life NFT Mint Router
 * Handles Guardian NFT minting with Stripe fallback for fiat onboarding.
 */
import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { getDb } from "../db";
import { bookOfLifeMints } from "../../drizzle/schema";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });

// Tier pricing in cents
const TIER_PRICES: Record<string, number> = {
  guardian: 4400,    // $44.00
  sovereign: 14400,  // $144.00
  ascendant: 52800,  // $528.00
};

const TIER_NAMES: Record<string, string> = {
  guardian: "Guardian Soul NFT",
  sovereign: "Sovereign Soul NFT",
  ascendant: "Ascendant Soul NFT",
};

export const bookOfLifeRouter = router({
  /**
   * Initiate a Book of Life NFT mint — creates Stripe PaymentIntent + DB record.
   */
  initiateMint: protectedProcedure
    .input(z.object({
      guardianTier: z.enum(["guardian", "sovereign", "ascendant"]),
      walletAddress: z.string().min(10).max(128).optional(),
      frequency: z.string().default("528Hz"),
      origin: z.string().url(),
    }))
    .mutation(async ({ ctx, input }) => {
      const priceInCents = TIER_PRICES[input.guardianTier];

      // Create Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: priceInCents,
        currency: "usd",
        metadata: {
          userId: ctx.user.id.toString(),
          guardianTier: input.guardianTier,
          walletAddress: input.walletAddress ?? "",
          frequency: input.frequency,
          product: "book_of_life_nft",
        },
        description: `${TIER_NAMES[input.guardianTier]} — ScrollVerse Book of Life`,
      });

      // Create Stripe Checkout Session for redirect flow
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: ctx.user.email ?? undefined,
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: {
              name: TIER_NAMES[input.guardianTier],
              description: `Book of Life NFT — ${input.guardianTier.charAt(0).toUpperCase() + input.guardianTier.slice(1)} Tier — ${input.frequency} — Polygon Mainnet`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        }],
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          guardian_tier: input.guardianTier,
          wallet_address: input.walletAddress ?? "",
          frequency: input.frequency,
          product: "book_of_life_nft",
        },
        allow_promotion_codes: true,
        success_url: `${input.origin}/book-of-life?mint=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.origin}/book-of-life?mint=cancelled`,
      });

      // Record in DB
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.insert(bookOfLifeMints).values({
        userId: ctx.user.id,
        walletAddress: input.walletAddress ?? null,
        guardianTier: input.guardianTier,
        frequency: input.frequency,
        stripePaymentIntentId: paymentIntent.id,
        mintStatus: "pending",
      });

      return {
        checkoutUrl: session.url,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount: priceInCents,
        tier: input.guardianTier,
      };
    }),

  /**
   * Get the current user's mint status.
   */
  getMintStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { mints: [], hasMinted: false, latestMint: null };
    const mints = await db
      .select()
      .from(bookOfLifeMints)
      .where(eq(bookOfLifeMints.userId, ctx.user.id))
      .orderBy(desc(bookOfLifeMints.createdAt))
      .limit(5);

    return {
      mints,
      hasMinted: mints.some((m: { mintStatus: string }) => m.mintStatus === "minted"),
      latestMint: mints[0] ?? null,
    };
  }),

  /**
   * Get all mints (public stats for the mint counter).
   */
  getMintStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalMints: 0, mintedCount: 0, pendingCount: 0, remaining: 144000 };
    const allMints = await db.select().from(bookOfLifeMints);
    return {
      totalMints: allMints.length,
      mintedCount: allMints.filter((m: { mintStatus: string }) => m.mintStatus === "minted").length,
      pendingCount: allMints.filter((m: { mintStatus: string }) => m.mintStatus === "pending" || m.mintStatus === "paid").length,
      remaining: 144000 - allMints.filter((m: { mintStatus: string }) => m.mintStatus === "minted").length,
    };
  }),
});
