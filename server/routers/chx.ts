import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { chxReservations } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

// CHX pre-sale: $14.40 per 100 CHX tokens
const CHX_PRICE_PER_100 = 1440; // cents = $14.40

export const chxRouter = router({
  // Create a Stripe Checkout session for CHX pre-sale reservation
  reserveCHX: protectedProcedure
    .input(
      z.object({
        chxAmount: z.number().min(100).max(1000000),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const units = Math.ceil(input.chxAmount / 100);
      const totalCents = units * CHX_PRICE_PER_100;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `CHX Token Pre-Sale — ${input.chxAmount} CHX`,
                description: `Reserve ${input.chxAmount} CHX at $14.40/100 tokens. Converts to live tokens at launch.`,
                images: [],
              },
              unit_amount: totalCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${input.origin}/chx-token?reserved=1`,
        cancel_url: `${input.origin}/chx-token?cancelled=1`,
        metadata: {
          userId: String(ctx.user.id),
          chxAmount: String(input.chxAmount),
          type: "chx_reservation",
        },
        customer_email: ctx.user.email ?? undefined,
      });

      // Create pending reservation record
      await db.insert(chxReservations).values({
        userId: ctx.user.id,
        stripeSessionId: session.id,
        chxAmount: input.chxAmount,
        usdAmount: (totalCents / 100).toFixed(2),
        status: "pending",
        email: ctx.user.email ?? null,
      });

      return { url: session.url, sessionId: session.id };
    }),

  // Get the user's CHX reservations
  getMyReservations: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const reservations = await db
      .select()
      .from(chxReservations)
      .where(eq(chxReservations.userId, ctx.user.id))
      .orderBy(desc(chxReservations.createdAt))
      .limit(20);
    return reservations;
  }),

  // Admin: get all reservations
  getAllReservations: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Admin only");
    }
    const db = await getDb();
    const reservations = await db
      .select()
      .from(chxReservations)
      .orderBy(desc(chxReservations.createdAt))
      .limit(200);
    return reservations;
  }),

  // Get total CHX reserved (public stats)
  getStats: protectedProcedure.query(async () => {
    const db = await getDb();
    const all = await db
      .select()
      .from(chxReservations)
      .where(eq(chxReservations.status, "confirmed"));
    const totalCHX = all.reduce((sum: number, r: typeof all[0]) => sum + r.chxAmount, 0);
    const totalUSD = all.reduce((sum: number, r: typeof all[0]) => sum + parseFloat(r.usdAmount), 0);
    return {
      totalReservations: all.length,
      totalCHX,
      totalUSD: totalUSD.toFixed(2),
      remainingSupply: 10_000_000 - totalCHX,
    };
  }),
});
