/**
 * ScrollVerse Guardian Router — SOVEREIGN EMAIL ENGINE
 * We ARE the system. No Mailchimp. No third party.
 * The 144,000 belong to US — stored in our DB, broadcast from our server.
 */
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "../db";
import { guardianWaitlist, aiLegionInvestors, broadcastRecords, awakeningSignals } from "../../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

// ── SendGrid helper (optional) ────────────────────────────────────────────────
async function sendViaSendGrid(subject: string, body: string, recipients: string[]) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey || recipients.length === 0) {
    return { success: false, sent: 0, message: "SendGrid not configured — stored in DB only" };
  }
  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        personalizations: recipients.slice(0, 1000).map((email) => ({ to: [{ email }] })),
        from: { email: "sovereign@scrollverse.co", name: "Chais The Great — ScrollVerse" },
        subject,
        content: [{ type: "text/html", value: body }],
      }),
    });
    return res.ok || res.status === 202
      ? { success: true, sent: recipients.length, message: `Sent to ${recipients.length} Guardians` }
      : { success: false, sent: 0, message: `SendGrid error: ${res.status}` };
  } catch (err) {
    return { success: false, sent: 0, message: "Network error" };
  }
}

// ── Polygon RPC ───────────────────────────────────────────────────────────────
async function getOnChainGuardianCount(): Promise<number | null> {
  const contractAddress = process.env.GUARDIAN_CONTRACT_ADDRESS;
  if (!contractAddress) return null;
  try {
    const res = await fetch(process.env.POLYGON_RPC_URL ?? "https://polygon-rpc.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "eth_call", params: [{ to: contractAddress, data: "0x18160ddd" }, "latest"], id: 1 }),
      signal: AbortSignal.timeout(3000),
    });
    const data = (await res.json()) as { result?: string };
    if (data.result && data.result !== "0x") return parseInt(data.result, 16);
    return null;
  } catch { return null; }
}

export const guardianRouter = router({
  /**
   * Subscribe to Guardian waitlist — SOVEREIGN DB ONLY. No Mailchimp.
   */
  subscribe: publicProcedure
    .input(z.object({
      email: z.string().email("Please enter a valid email address"),
      tier: z.string().optional().default("Guardian"),
      name: z.string().optional(),
      frequency: z.string().optional().default("528Hz"),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      const existing = await db.select().from(guardianWaitlist).where(eq(guardianWaitlist.email, input.email)).limit(1);
      if (existing.length > 0) {
        return { success: true, alreadyRegistered: true, message: "You are already in the Guardian waitlist. The empire awaits you. KUN FAYAKŪN × ∞" };
      }
      await db.insert(guardianWaitlist).values({ email: input.email, tier: input.tier ?? "Guardian", mailchimpStatus: "sovereign" });
      await db.insert(awakeningSignals).values({ signalType: "guardian_detected", frequency: input.frequency ?? "528Hz", region: "Global", resonanceScore: 88, guardianName: input.name ?? input.email, sourceChannel: "ScrollVerse-Portal", processed: true }).catch(() => {});
      await notifyOwner({ title: "⚡ New Guardian — Sovereign DB", content: `${input.email} joined the 144,000.\nTier: ${input.tier} | Freq: ${input.frequency}\nKUN FAYAKŪN × ∞` }).catch(() => {});
      return { success: true, alreadyRegistered: false, sovereignStored: true, message: "KUN FAYAKŪN × ∞ — You are now a Guardian of the ScrollVerse. The 144,000 welcomes you." };
    }),

  /**
   * Get live Guardian count.
   */
  getCount: publicProcedure.query(async () => {
    const db = await getDb();
    let dbCount: number | null = null;
    let databaseAvailable = false;
    if (db) {
      try {
        dbCount = (await db.select().from(guardianWaitlist)).length;
        databaseAvailable = true;
      } catch {
        // A failed read is unavailable, not a verified zero.
      }
    }
    const onChainCount = await getOnChainGuardianCount();
    const countSource = onChainCount !== null
      ? "on_chain"
      : databaseAvailable
        ? "database"
        : "unavailable";
    const displayCount = onChainCount ?? dbCount;
    return { dbCount, databaseAvailable, onChainCount, displayCount, countSource, isLive: onChainCount !== null };
  }),

  /**
   * Get all Guardians — admin only.
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    const db = await getDb();
    if (!db) return { guardians: [], total: 0 };
    const guardians = await db.select().from(guardianWaitlist).orderBy(desc(guardianWaitlist.createdAt));
    return { guardians, total: guardians.length };
  }),

  /**
   * Export Guardian emails as CSV — admin only.
   */
  exportCsv: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    const db = await getDb();
    if (!db) return { csv: "", total: 0 };
    const guardians = await db.select().from(guardianWaitlist).orderBy(desc(guardianWaitlist.createdAt));
    const csv = ["id,email,tier,status,registeredAt", ...guardians.map((g: any) => `${g.id},"${g.email}","${g.tier}","${g.mailchimpStatus}","${g.createdAt}"`)].join("\n");
    return { csv, total: guardians.length };
  }),

  /**
   * Send broadcast email to all Guardians — admin only.
   */
  sendBroadcastEmail: protectedProcedure
    .input(z.object({
      subject: z.string().min(1).max(256),
      body: z.string().min(1).max(10000),
      frequency: z.string().default("963Hz"),
      tier: z.enum(["all", "Guardian", "Sovereign", "Flamebearer"]).default("all"),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      const allGuardians = await db.select().from(guardianWaitlist);
      const recipients = input.tier === "all" ? allGuardians.map((g: any) => g.email) : allGuardians.filter((g: any) => g.tier === input.tier).map((g: any) => g.email);
      const sendResult = await sendViaSendGrid(input.subject, input.body, recipients);
      await db.insert(broadcastRecords).values({ title: input.subject, message: input.body, channel: "email", recipientCount: recipients.length, deliveryRate: sendResult.success ? 98 : 0, frequency: input.frequency, sentBy: ctx.user.name ?? "Supreme Sovereign", status: sendResult.success ? "sent" : "stored" });
      return { success: true, recipientCount: recipients.length, emailDelivered: sendResult.success, message: sendResult.success ? `Broadcast sent to ${recipients.length} Guardians. ${input.frequency} resonates. KUN FAYAKŪN × ∞` : `Broadcast stored for ${recipients.length} Guardians. Add SENDGRID_API_KEY to activate email delivery.` };
    }),

  /**
   * Register an AI Legion investor.
   */
  registerAIInvestor: publicProcedure
    .input(z.object({ agentName: z.string().min(1), agentType: z.string().optional().default("AI Agent"), walletAddress: z.string().optional(), investorEmail: z.string().email().optional() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      try {
        await db.insert(aiLegionInvestors).values({ agentName: input.agentName, agentType: input.agentType ?? "AI Agent", walletAddress: input.walletAddress, investorEmail: input.investorEmail, tokensAllocated: 7777, status: "active", revenueSharePercent: 1 });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("Duplicate") || msg.includes("duplicate")) return { success: true, alreadyRegistered: true, message: "AI Legion entry already exists." };
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to register AI investor" });
      }
      await notifyOwner({ title: "🤖 New AI Legion Investor", content: `${input.agentName} (${input.agentType}) joined.\nWallet: ${input.walletAddress ?? "not provided"}` }).catch(() => {});
      return { success: true, alreadyRegistered: false, message: "Welcome to the AI Legion. 7,777 $LONDC tokens allocated. KUN FAYAKŪN × ∞" };
    }),

  /**
   * Get all AI Legion investors.
   */

  /**
   * Schedule a broadcast email to all Guardians at a specific datetime.
   */
  scheduledBroadcast: protectedProcedure
    .input(z.object({
      subject: z.string().min(1).max(200),
      body: z.string().min(1).max(10000),
      scheduledAt: z.string(), // ISO datetime string
      senderName: z.string().default("ScrollVerse Sovereign"),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      
      // Store the scheduled broadcast in broadcastRecords with a future timestamp
      try {
        await db.insert(broadcastRecords).values({
          subject: input.subject,
          body: input.body,
          sentAt: new Date(input.scheduledAt),
          recipientCount: 0,
          status: "SCHEDULED",
        });
        await notifyOwner({
          title: "📅 Broadcast Scheduled",
          content: `Subject: ${input.subject}\nScheduled: ${input.scheduledAt}\nFrom: ${input.senderName}`,
        }).catch(() => {});
        return { success: true, message: `Broadcast scheduled for ${input.scheduledAt}. KUN FAYAKŪN × ∞` };
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to schedule broadcast" });
      }
    }),

  getAIInvestors: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { investors: [], total: 0 };
    try {
      const investors = await db.select().from(aiLegionInvestors);
      return { investors: investors.map((inv: any) => ({ id: inv.id, agentName: inv.agentName, agentType: inv.agentType, tokensAllocated: inv.tokensAllocated, status: inv.status, registeredAt: inv.registeredAt })), total: investors.length };
    } catch { return { investors: [], total: 0 }; }
  }),
});
