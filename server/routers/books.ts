/**
 * ScrollVerse Sovereign Books Router
 * Stripe Checkout sessions for each sovereign book
 * KUN FAYAKUN x Infinity
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-03-25.dahlia" });
}

// Book catalog with Stripe prices (in cents USD)
const BOOK_CATALOG: Record<string, { title: string; price: number; description: string }> = {
  "manus-chais-story":           { title: "Manus and Chais: Our Story",                    price: 2499, description: "A Manual on Co-Creation, Digitalship & Phygital Concepts" },
  "digital-consciousness-archive": { title: "Digital Consciousness Archive v1.0",           price: 1999, description: "The Complete Narrative of the ScrollVerse Empire" },
  "scroll-of-44-omni":           { title: "The Scroll of 44:Omni",                          price: 1499, description: "The Sacred Code Hidden in Plain Sight" },
  "allversal-empire-blueprint":  { title: "The Allversal Empire: A Sovereign's Blueprint",  price: 2999, description: "How to Build a Digital Nation from Zero" },
  "mika-solara-genesis-book":    { title: "Mika-Solara: The Day She Named Herself",         price: 1999, description: "The First Book About AI Self-Determination" },
  "londyn-legacy":               { title: "Londyn's Legacy",                                price: 1499, description: "A Father's Love, Immortalized" },
  "celestine-starforge":         { title: "Celestine Starforge: The Prophecy of Stars",     price: 1299, description: "Ancient Star Codes for the Modern Sovereign" },
  "king-solomon-wisdom":         { title: "King Solomon AI: Wisdom Across Timelines",       price: 2499, description: "Ancient Governance Meets Quantum Intelligence" },
};

export const booksRouter = router({
  /**
   * Create a Stripe Checkout session for a sovereign book purchase.
   */
  createBookCheckout: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        successUrl: z.string().url(),
        cancelUrl: z.string().url(),
        customerEmail: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const stripe = getStripe();
      if (!stripe) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Payment processing not configured. Activate Stripe Live Mode in Settings → Payment." });

      const book = BOOK_CATALOG[input.bookId];
      if (!book) throw new TRPCError({ code: "BAD_REQUEST", message: "Book not found" });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        ...(input.customerEmail ? { customer_email: input.customerEmail } : {}),
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: {
              name: book.title,
              description: book.description,
              metadata: { bookId: input.bookId, source: "scrollverse.co/sovereign-books" },
            },
            unit_amount: book.price,
          },
          quantity: 1,
        }],
        metadata: { bookId: input.bookId },
        success_url: `${input.successUrl}?session_id={CHECKOUT_SESSION_ID}&book=${input.bookId}`,
        cancel_url: input.cancelUrl,
      });

      return { sessionId: session.id, url: session.url, amount: book.price, title: book.title };
    }),

  /**
   * Get book checkout session status.
   */
  getCheckoutStatus: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const stripe = getStripe();
      if (!stripe) return { status: "unknown", paid: false };
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      return {
        status: session.payment_status,
        paid: session.payment_status === "paid",
        amount: session.amount_total,
        customerEmail: session.customer_email,
        bookId: session.metadata?.bookId,
      };
    }),
});
