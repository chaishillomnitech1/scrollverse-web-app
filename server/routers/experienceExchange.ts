import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";
import {
  experienceEntries,
  experienceProfiles,
  experienceReactions,
  experienceReplies,
  experienceSaves,
} from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

const visibilitySchema = z.enum(["PUBLIC", "COMMUNITY"]);
const reactionSchema = z.enum(["REFLECT", "SUPPORT", "CONNECT"]);

const profileInput = z.object({
  displayName: z.string().trim().min(2).max(96),
  profileVisibility: z.enum(["PUBLIC", "PSEUDONYMOUS", "COMMUNITY"]),
  allowReplies: z.boolean(),
});

export const experienceExchangeRouter = router({
  listPublic: publicProcedure
    .input(z.object({ query: z.string().trim().max(120).default(""), theme: z.string().trim().max(64).default("all") }))
    .query(async ({ input }) => {
      const db = await getDb();
      const conditions = [eq(experienceEntries.visibility, "PUBLIC"), eq(experienceEntries.status, "PUBLISHED")];
      if (input.query) {
        const needle = `%${input.query}%`;
        conditions.push(or(like(experienceEntries.title, needle), like(experienceEntries.content, needle), like(experienceEntries.themes, needle))!);
      }
      if (input.theme !== "all") conditions.push(like(experienceEntries.themes, `%${input.theme}%`));
      const entries = await db.select().from(experienceEntries).where(and(...conditions)).orderBy(desc(experienceEntries.createdAt)).limit(48);
      return entries;
    }),

  getReplies: publicProcedure.input(z.object({ entryId: z.number().int().positive() })).query(async ({ input }) => {
    const db = await getDb();
    return db.select().from(experienceReplies).where(eq(experienceReplies.entryId, input.entryId)).orderBy(desc(experienceReplies.createdAt)).limit(80);
  }),

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const rows = await db.select().from(experienceProfiles).where(eq(experienceProfiles.userId, ctx.user.id)).limit(1);
    return rows[0] ?? null;
  }),

  saveProfile: protectedProcedure.input(profileInput).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    const existing = await db.select({ id: experienceProfiles.id }).from(experienceProfiles).where(eq(experienceProfiles.userId, ctx.user.id)).limit(1);
    if (existing[0]) {
      await db.update(experienceProfiles).set(input).where(eq(experienceProfiles.id, existing[0].id));
    } else {
      await db.insert(experienceProfiles).values({ userId: ctx.user.id, ...input });
    }
    return { success: true };
  }),

  createEntry: protectedProcedure
    .input(z.object({
      title: z.string().trim().min(3).max(180),
      content: z.string().trim().min(20).max(8000),
      themes: z.array(z.string().trim().min(2).max(32)).min(1).max(6),
      visibility: visibilitySchema,
      allowReplies: z.boolean(),
      displayName: z.string().trim().min(2).max(96),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const [result] = await db.insert(experienceEntries).values({
        authorUserId: ctx.user.id,
        displayName: input.displayName,
        title: input.title,
        content: input.content,
        themes: input.themes.join(", "),
        visibility: input.visibility,
        allowReplies: input.allowReplies,
      });
      return { success: true, entryId: result.insertId };
    }),

  createReply: protectedProcedure
    .input(z.object({ entryId: z.number().int().positive(), content: z.string().trim().min(2).max(3000), displayName: z.string().trim().min(2).max(96) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const entry = await db.select({ id: experienceEntries.id, allowReplies: experienceEntries.allowReplies, status: experienceEntries.status }).from(experienceEntries).where(eq(experienceEntries.id, input.entryId)).limit(1);
      if (!entry[0] || !entry[0].allowReplies || entry[0].status !== "PUBLISHED") throw new Error("Replies are unavailable for this reflection.");
      const [result] = await db.insert(experienceReplies).values({ entryId: input.entryId, authorUserId: ctx.user.id, displayName: input.displayName, content: input.content });
      return { success: true, replyId: result.insertId };
    }),

  toggleReaction: protectedProcedure
    .input(z.object({ entryId: z.number().int().positive(), reaction: reactionSchema }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const existing = await db.select({ id: experienceReactions.id }).from(experienceReactions).where(and(eq(experienceReactions.entryId, input.entryId), eq(experienceReactions.userId, ctx.user.id), eq(experienceReactions.reaction, input.reaction))).limit(1);
      if (existing[0]) {
        await db.delete(experienceReactions).where(eq(experienceReactions.id, existing[0].id));
        return { active: false };
      }
      await db.insert(experienceReactions).values({ entryId: input.entryId, userId: ctx.user.id, reaction: input.reaction });
      return { active: true };
    }),

  toggleSave: protectedProcedure.input(z.object({ entryId: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    const existing = await db.select({ id: experienceSaves.id }).from(experienceSaves).where(and(eq(experienceSaves.entryId, input.entryId), eq(experienceSaves.userId, ctx.user.id))).limit(1);
    if (existing[0]) {
      await db.delete(experienceSaves).where(eq(experienceSaves.id, existing[0].id));
      return { saved: false };
    }
    await db.insert(experienceSaves).values({ entryId: input.entryId, userId: ctx.user.id });
    return { saved: true };
  }),

  getParticipantStats: publicProcedure.query(async () => {
    const db = await getDb();
    const [entries] = await db.select({ count: sql<number>`count(*)` }).from(experienceEntries).where(and(eq(experienceEntries.visibility, "PUBLIC"), eq(experienceEntries.status, "PUBLISHED")));
    const [replies] = await db.select({ count: sql<number>`count(*)` }).from(experienceReplies);
    return { entries: entries?.count ?? 0, replies: replies?.count ?? 0 };
  }),
});
