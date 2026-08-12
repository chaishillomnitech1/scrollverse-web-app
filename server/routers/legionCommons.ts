import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { legionCommonsEntries } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

const constellation = z.enum(["ORIGIN", "LEARNING", "BUILD", "REFLECTION", "GUIDANCE"]);

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Legion Commons storage is unavailable." });
  return db;
}

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Commons review requires administrator access." });
  return next({ ctx });
});

export const legionCommonsRouter = router({
  listVisible: publicProcedure.input(z.object({ limit: z.number().int().min(1).max(60).default(30) }).optional()).query(async ({ input }) => {
    const db = await requireDb();
    return db.select().from(legionCommonsEntries)
      .where(eq(legionCommonsEntries.isVisible, true))
      .orderBy(desc(legionCommonsEntries.createdAt))
      .limit(input?.limit ?? 30);
  }),

  createEntry: protectedProcedure.input(z.object({
    constellation,
    content: z.string().trim().min(12).max(1500),
    requestGuidance: z.boolean().default(false),
  })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const activityState = input.requestGuidance ? "AWAITING_INTERACTION" : "HUMAN_AUTHORED" as const;
    const authorLabel = ctx.user.name?.trim().slice(0, 120) || "Guardian";
    const result = await db.insert(legionCommonsEntries).values({
      authorUserId: ctx.user.id,
      authorLabel,
      constellation: input.constellation,
      content: input.content,
      activityState,
      systemLabel: null,
    });
    return { success: true, id: Number(result[0].insertId), activityState };
  }),

  hideMyEntry: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const result = await db.update(legionCommonsEntries).set({ isVisible: false }).where(and(
      eq(legionCommonsEntries.id, input.id),
      eq(legionCommonsEntries.authorUserId, ctx.user.id),
    ));
    if (!result[0].affectedRows) throw new TRPCError({ code: "NOT_FOUND", message: "Visible Commons entry not found for this account." });
    return { success: true };
  }),

  markReviewedGuidance: adminProcedure.input(z.object({ id: z.number().int().positive(), systemLabel: z.string().trim().min(2).max(120).default("Human-reviewed guidance") })).mutation(async ({ input }) => {
    const db = await requireDb();
    const result = await db.update(legionCommonsEntries).set({ activityState: "REVIEWED_GUIDANCE", systemLabel: input.systemLabel }).where(and(
      eq(legionCommonsEntries.id, input.id),
      eq(legionCommonsEntries.isVisible, true),
    ));
    if (!result[0].affectedRows) throw new TRPCError({ code: "NOT_FOUND", message: "Visible Commons entry not found." });
    return { success: true, activityState: "REVIEWED_GUIDANCE" as const };
  }),
});
