import type { Express, Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { stripeOrders, revenueEvents, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    // express.raw is applied per-route here via the rawBody trick
    (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      let event: Stripe.Event;

      try {
        if (!sig || !webhookSecret) {
          console.warn("[Webhook] Missing stripe-signature or STRIPE_WEBHOOK_SECRET");
          return res.status(400).json({ error: "Missing signature" });
        }
        // req.body is a Buffer when express.raw is used upstream
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        console.error("[Webhook] Signature verification failed:", msg);
        return res.status(400).json({ error: `Webhook Error: ${msg}` });
      }

      // Test event passthrough for webhook verification
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Webhook] Received: ${event.type} (${event.id})`);

      handleEvent(event).catch((err) => {
        console.error("[Webhook] Handler error:", err);
      });

      return res.json({ received: true });
    }
  );
}

async function handleEvent(event: Stripe.Event) {
  const db = await getDb();
  if (!db) {
    console.warn("[Webhook] DB not available, skipping event processing");
    return;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id ? parseInt(session.metadata.user_id) : null;
      const productTier = session.metadata?.product_tier as "guardian" | "sovereign" | "ascendant" | null;
      const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : null;

      if (paymentIntentId && productTier) {
        // Upsert stripe order
        await db
          .insert(stripeOrders)
          .values({
            userId: userId ?? undefined,
            stripePaymentIntentId: paymentIntentId,
            stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
            productTier,
            status: "succeeded",
          })
          .onDuplicateKeyUpdate({ set: { status: "succeeded" } });

        // Log revenue event
        await db.insert(revenueEvents).values({
          eventType: "payment_succeeded",
          productTier,
          amountCents: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          stripeEventId: event.id,
        });

        // Upgrade user guardian tier
        if (userId) {
          const tierMap: Record<string, "guardian" | "sovereign" | "ascendant"> = {
            guardian: "guardian",
            sovereign: "sovereign",
            ascendant: "ascendant",
          };
          const newTier = tierMap[productTier];
          if (newTier) {
            await db
              .update(users)
              .set({ guardianTier: newTier, stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined })
              .where(eq(users.id, userId));
          }
        }
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const paymentIntentId = pi.id;
      await db
        .update(stripeOrders)
        .set({ status: "failed" })
        .where(eq(stripeOrders.stripePaymentIntentId, paymentIntentId));
      break;
    }

    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }
}
