/**
 * Family Portal Router — Owner-only sovereign family wallet & QFS flow data.
 * Zaire ∞ · Jada · Nyasia · Chais The Great
 */
import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { familyWallets, familyTransactions } from "../../drizzle/schema";
import { protectedProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";

/** Guard: only the owner (OWNER_OPEN_ID) can access family portal */
const ownerProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.openId !== ENV.ownerOpenId && ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Sovereign access only." });
  }
  return next({ ctx });
});

export const familyRouter = router({
  /**
   * Get all family wallet balances and member profiles.
   */
  getPortal: ownerProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { wallets: [], totalLondc: 0, totalValueUsd: 0 };

    const wallets = await db.select().from(familyWallets).orderBy(familyWallets.id);

    const totalLondc = wallets.reduce((sum: number, w: { londcBalance: number }) => sum + w.londcBalance, 0);
    // Simulated $LONDC price: $0.0144 per token (pre-mainnet)
    const londcPrice = 0.0144;
    const totalValueUsd = Math.round(totalLondc * londcPrice * 100) / 100;

    return { wallets, totalLondc, totalValueUsd, londcPrice };
  }),

  /**
   * Get QFS transaction history for a specific family member.
   */
  getMemberTransactions: ownerProcedure
    .input(z.object({ memberId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { transactions: [] };

      const transactions = await db
        .select()
        .from(familyTransactions)
        .where(eq(familyTransactions.memberId, input.memberId))
        .orderBy(desc(familyTransactions.createdAt))
        .limit(50);

      return { transactions };
    }),

  /**
   * Get all family transactions (full QFS flow history).
   */
  getAllTransactions: ownerProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { transactions: [] };

    const transactions = await db
      .select()
      .from(familyTransactions)
      .orderBy(desc(familyTransactions.createdAt))
      .limit(100);

    return { transactions };
  }),

  /**
   * Send $LONDC from one family member to another (records the transfer).
   */
  sendLondc: ownerProcedure
    .input(z.object({
      fromMemberId: z.number(),
      toMemberId: z.number(),
      amount: z.number().min(1).max(1000000),
      note: z.string().max(256).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Deduct from sender
      const sender = await db.select().from(familyWallets).where(eq(familyWallets.id, input.fromMemberId)).limit(1);
      if (!sender[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Sender not found" });
      if (sender[0].londcBalance < input.amount) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Insufficient $LONDC balance" });
      }

      const txHash = `0xQFS${Date.now().toString(16).toUpperCase()}`;

      // Record send
      await db.insert(familyTransactions).values({
        memberId: input.fromMemberId,
        type: "londc_send",
        amountLondc: input.amount,
        txHash,
        note: input.note ?? `Transfer to member #${input.toMemberId}`,
        status: "confirmed",
      });

      // Record receive
      await db.insert(familyTransactions).values({
        memberId: input.toMemberId,
        type: "londc_receive",
        amountLondc: input.amount,
        txHash,
        note: input.note ?? `Transfer from member #${input.fromMemberId}`,
        status: "confirmed",
      });

      // Update balances
      await db
        .update(familyWallets)
        .set({ londcBalance: sender[0].londcBalance - input.amount })
        .where(eq(familyWallets.id, input.fromMemberId));

      const receiver = await db.select().from(familyWallets).where(eq(familyWallets.id, input.toMemberId)).limit(1);
      if (receiver[0]) {
        await db
          .update(familyWallets)
          .set({ londcBalance: receiver[0].londcBalance + input.amount })
          .where(eq(familyWallets.id, input.toMemberId));
      }

      return { success: true, txHash, amount: input.amount };
    }),
});
