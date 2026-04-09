/**
 * ScrollVerse Guardian Router
 * - subscribe: Adds email to guardian_waitlist DB + proxies to Mailchimp API server-side
 * - getCount: Returns live Guardian count (DB count + optional on-chain count from Polygon RPC)
 */
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db";
import { guardianWaitlist } from "../../drizzle/schema";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

// ── Mailchimp helper ──────────────────────────────────────────────────────────
async function subscribeToMailchimp(email: string): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!apiKey || !listId) {
    console.warn("[Mailchimp] API key or list ID not configured — skipping Mailchimp sync");
    return { success: false, message: "Mailchimp not configured" };
  }

  // Derive data center from API key (format: key-dc, e.g. abc123-us21)
  const dc = apiKey.split("-").pop();
  if (!dc) {
    return { success: false, message: "Invalid Mailchimp API key format" };
  }

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        tags: ["guardian-waitlist", "scrollverse-portal", "528hz"],
        merge_fields: {
          SOURCE: "ScrollVerse Portal — Guardian Waitlist",
        },
      }),
    });

    if (response.ok) {
      return { success: true, message: "Subscribed to Mailchimp" };
    }

    const errorData = (await response.json()) as { title?: string; detail?: string };

    // 400 with "Member Exists" is not a real error — they're already subscribed
    if (errorData.title === "Member Exists") {
      return { success: true, message: "Already subscribed" };
    }

    console.error("[Mailchimp] Subscription error:", errorData);
    return { success: false, message: errorData.detail ?? "Mailchimp error" };
  } catch (err) {
    console.error("[Mailchimp] Network error:", err);
    return { success: false, message: "Network error contacting Mailchimp" };
  }
}

// ── Polygon RPC helper ────────────────────────────────────────────────────────
async function getOnChainGuardianCount(): Promise<number | null> {
  const rpcUrl = process.env.POLYGON_RPC_URL ?? "https://polygon-rpc.com";
  const contractAddress = process.env.GUARDIAN_CONTRACT_ADDRESS;

  if (!contractAddress) {
    // Contract not yet deployed — return null so UI falls back to DB count
    return null;
  }

  try {
    // Call totalSupply() on the ERC-721 Guardian NFT contract
    // totalSupply() selector: 0x18160ddd
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [
          {
            to: contractAddress,
            data: "0x18160ddd",
          },
          "latest",
        ],
        id: 1,
      }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { result?: string };
    if (!data.result || data.result === "0x") return null;

    const count = parseInt(data.result, 16);
    return isNaN(count) ? null : count;
  } catch (err) {
    console.warn("[Polygon RPC] Failed to fetch Guardian count:", err);
    return null;
  }
}

// ── Router ────────────────────────────────────────────────────────────────────
export const guardianRouter = router({
  /**
   * Subscribe an email to the Guardian waitlist.
   * 1. Saves to local DB (guardian_waitlist table)
   * 2. Proxies to Mailchimp API server-side (no API key exposed to browser)
   * 3. Notifies the owner
   */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email("Please enter a valid email address"),
        tier: z.string().optional().default("Guardian"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();

      // Check for duplicate in DB
      if (db) {
        const existing = await db
          .select()
          .from(guardianWaitlist)
          .where(eq(guardianWaitlist.email, input.email))
          .limit(1);

        if (existing.length > 0) {
          return {
            success: true,
            alreadyRegistered: true,
            message: "You are already in the Guardian waitlist. The empire awaits you.",
          };
        }
      }

      // Subscribe to Mailchimp first
      const mailchimpResult = await subscribeToMailchimp(input.email);

      // Save to local DB
      if (db) {
        try {
          await db.insert(guardianWaitlist).values({
            email: input.email,
            tier: input.tier,
            mailchimpStatus: mailchimpResult.success ? "subscribed" : "pending",
          });
        } catch (err) {
          console.error("[Guardian] DB insert error:", err);
          // Don't throw — Mailchimp may have succeeded, still return success
        }
      }

      // Notify the Sovereign
      await notifyOwner({
        title: "⚡ New Guardian Registered",
        content: `${input.email} has joined the 144,000 Guardian waitlist.\nMailchimp: ${mailchimpResult.message}`,
      }).catch(() => {}); // Non-blocking

      return {
        success: true,
        alreadyRegistered: false,
        mailchimpSynced: mailchimpResult.success,
        message: "KUN FAYAKŪN × ∞ — You are now a Guardian of the ScrollVerse.",
      };
    }),

  /**
   * Get the live Guardian count.
   * Returns DB count + optional on-chain count from Polygon RPC.
   */
  getCount: publicProcedure.query(async () => {
    const db = await getDb();

    let dbCount = 0;
    if (db) {
      try {
        const rows = await db.select().from(guardianWaitlist);
        dbCount = rows.length;
      } catch {
        dbCount = 0;
      }
    }

    const onChainCount = await getOnChainGuardianCount();

    return {
      dbCount,
      onChainCount,
      // Display count: prefer on-chain if available, else DB + simulated base
      displayCount: onChainCount !== null ? onChainCount : dbCount + 1247,
      isLive: onChainCount !== null,
    };
  }),
});
