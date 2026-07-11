import type { Express, Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { stripeOrders, revenueEvents, users, creatorApplications, referralCodes, legionRewards, chxReservations, notifications } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { notifyOwner } from "../_core/notification";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      let event: Stripe.Event;

      try {
        if (!sig || !webhookSecret) {
          console.warn("[Webhook] Missing stripe-signature or STRIPE_WEBHOOK_SECRET");
          return res.status(400).json({ error: "Missing signature" });
        }
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
              .set({
                guardianTier: newTier,
                stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
              })
              .where(eq(users.id, userId));
          }
        }

        // ─── AUTO-DISTRIBUTE $LONDC REFERRAL REWARD ───────────────────────
        // If a referral_code was passed in checkout metadata, reward the creator
        const referralCode = session.metadata?.referral_code;
        if (referralCode) {
          try {
            const [creator] = await db
              .select()
              .from(creatorApplications)
              .where(eq(creatorApplications.referralCode, referralCode))
              .limit(1);

            if (creator && creator.status === "approved") {
              // 7.77% sovereign commission on tier reward amounts
              const tierRewardBase: Record<string, number> = {
                guardian: 144,
                sovereign: 444,
                ascendant: 1444,
              };
              const base = tierRewardBase[productTier ?? "guardian"] ?? 144;
              const loncReward = Math.round(base * 0.0777 * 100) / 100;

              // Record in legion_rewards
              await db.insert(legionRewards).values({
                memberId: creator.id,
                memberName: creator.name,
                rewardType: "referral_commission",
                amount: loncReward.toString(),
                currency: "LONDC",
                reason: `Guardian activation via referral ${referralCode} — ${productTier} tier`,
                impactScore: Math.round(loncReward),
              });

              // Update creator application stats
              await db
                .update(creatorApplications)
                .set({
                  activationsCount: sql`${creatorApplications.activationsCount} + 1`,
                  loncEarned: sql`CAST(CAST(${creatorApplications.loncEarned} AS DECIMAL(20,6)) + ${loncReward} AS CHAR)`,
                })
                .where(eq(creatorApplications.id, creator.id));

              // Update referral_codes conversions counter
              await db
                .update(referralCodes)
                .set({ conversions: sql`${referralCodes.conversions} + 1` })
                .where(eq(referralCodes.code, referralCode));

              console.log(
                `[Webhook] ✅ Referral reward: ${loncReward} $LONDC → creator "${creator.name}" (code: ${referralCode})`
              );
            }
          } catch (refErr) {
            console.error("[Webhook] Referral reward error:", refErr);
          }
        }
        // ─────────────────────────────────────────────────────────────────

        // ─── SOVEREIGN INFLOW NOTIFICATION ───────────────────────────────
        // Fire a real-time owner ping for every IPO/NFT payment
        try {
          const productType = session.metadata?.product_type ?? "token";
          const customerEmail = session.metadata?.customer_email ?? "(no email)";
          const customerName = session.metadata?.customer_name ?? "Guardian";
          const amountUSD = ((session.amount_total ?? 0) / 100).toFixed(2);

          if (productType === "nft") {
            const nftName = session.metadata?.nft_name ?? "Sovereign NFT";
            await notifyOwner({
              title: `🏆 NFT MINTED — ${nftName}`,
              content: `${customerName} (${customerEmail}) minted "${nftName}" for $${amountUSD} USD. INFLOW CONFIRMED. KUN FAYAKŪN × ∞`,
            });
          } else if (productTier) {
            const tierLabels: Record<string, string> = {
              guardian: "Guardian — $144",
              sovereign: "Sovereign — $444",
              ascendant: "Ascendant — $1,444",
            };
            const tierLabel = tierLabels[productTier] ?? productTier.toUpperCase();
            await notifyOwner({
              title: `🏛️ SOVEREIGN INFLOW — ${tierLabel}`,
              content: `${customerName} (${customerEmail}) invested $${amountUSD} USD at the ${tierLabel} tier. Guardian #${userId ?? "anon"} activated. KUN FAYAKŪN × ∞`,
            });
          }
        } catch (notifyErr) {
          console.error("[Webhook] notifyOwner error:", notifyErr);
        }
        // ─────────────────────────────────────────────────────────────────
      }

      // ─── CHX RESERVATION CONFIRMATION ────────────────────────────────
      // If this is a CHX pre-sale reservation, confirm it and notify the buyer
      const chxType = session.metadata?.type;
      const chxUserId = session.metadata?.userId ? parseInt(session.metadata.userId) : null;
      const chxAmount = session.metadata?.chxAmount ? parseInt(session.metadata.chxAmount) : null;
      if (chxType === "chx_reservation" && chxUserId && chxAmount) {
        try {
          // Confirm the reservation
          await db
            .update(chxReservations)
            .set({ status: "confirmed", stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null })
            .where(eq(chxReservations.stripeSessionId, session.id));

          // Fire in-app notification to the buyer
          await db.insert(notifications).values({
            userId: chxUserId,
            title: "🟡 CHX Reservation Confirmed!",
            message: `Your reservation of ${chxAmount.toLocaleString()} CHX tokens has been confirmed. You'll receive your tokens when $CHX launches on Polygon Mainnet. KUN FAYAK\u016aN \u00d7 \u221e`,
            type: "chx",
            link: "/chxtoken",
          });

          // Notify owner
          await notifyOwner({
            title: "🟡 CHX Reservation Confirmed",
            content: `User ${chxUserId} confirmed reservation of ${chxAmount.toLocaleString()} CHX. Payment: $${((session.amount_total ?? 0) / 100).toFixed(2)} USD.`,
          });

          console.log(`[Webhook] \u2705 CHX reservation confirmed: ${chxAmount} CHX for user ${chxUserId}`);
        } catch (chxErr) {
          console.error("[Webhook] CHX reservation confirmation error:", chxErr);
        }
      }
      // ─────────────────────────────────────────────────────────────────
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
