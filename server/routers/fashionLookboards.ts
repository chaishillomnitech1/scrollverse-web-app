import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { fashionLookboards } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

const conceptItemIds = ["atl-01", "atl-02", "atl-03", "atl-04", "atl-05", "atl-06", "atl-07"] as const;
const itemIdsSchema = z.array(z.enum(conceptItemIds)).min(1).max(4).transform(ids => Array.from(new Set(ids)));
export const parseLookboardItemIds = (value: unknown) => itemIdsSchema.parse(value);

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Lookboard storage is unavailable." });
  return db;
}

export const fashionLookboardsRouter = router({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    return db.select().from(fashionLookboards).where(eq(fashionLookboards.userId, ctx.user.id)).orderBy(desc(fashionLookboards.updatedAt));
  }),

  listPublic: publicProcedure.input(z.object({ limit: z.number().int().min(1).max(24).default(8) }).optional()).query(async ({ input }) => {
    const db = await requireDb();
    return db.select().from(fashionLookboards).where(eq(fashionLookboards.isPublic, true)).orderBy(desc(fashionLookboards.updatedAt)).limit(input?.limit ?? 8);
  }),

  save: protectedProcedure.input(z.object({
    title: z.string().trim().min(2).max(96),
    itemIds: z.unknown().transform(parseLookboardItemIds),
    isPublic: z.boolean().default(true),
  })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const creatorName = ctx.user.name?.trim().slice(0, 160) || "Guardian";
    const result = await db.insert(fashionLookboards).values({
      userId: ctx.user.id,
      creatorName,
      title: input.title,
      itemIds: input.itemIds,
      isPublic: input.isPublic,
    });
    return { success: true, id: Number(result[0].insertId), message: "Concept lookboard saved. It has no commerce or inventory effect." };
  }),

  remove: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const result = await db.delete(fashionLookboards).where(and(eq(fashionLookboards.id, input.id), eq(fashionLookboards.userId, ctx.user.id)));
    if (!result[0].affectedRows) throw new TRPCError({ code: "NOT_FOUND", message: "Lookboard not found or not owned by this account." });
    return { success: true };
  }),
});
