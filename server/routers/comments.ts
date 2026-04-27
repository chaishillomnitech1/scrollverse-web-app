import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { chapterComments } from "../../drizzle/schema";
import { eq, desc, asc } from "drizzle-orm";

export const commentsRouter = router({
  getComments: publicProcedure
    .input(z.object({ chapterId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (db == null) return [];
      return db
        .select()
        .from(chapterComments)
        .where(eq(chapterComments.chapterId, input.chapterId))
        .orderBy(desc(chapterComments.isPinned), asc(chapterComments.createdAt));
    }),

  addComment: publicProcedure
    .input(
      z.object({
        chapterId: z.string().min(1).max(64),
        authorName: z.string().min(1).max(128),
        authorId: z.string().max(128).optional(),
        content: z.string().min(1).max(2000),
        frequency: z.enum(["528Hz", "963Hz", "432Hz", "1558Hz"]).default("528Hz"),
        guardianTier: z.enum(["visitor", "guardian", "sovereign", "ascendant", "legion"]).default("visitor"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db == null) throw new Error("Database unavailable");
      await db.insert(chapterComments).values({
        chapterId: input.chapterId,
        authorName: input.authorName,
        authorId: input.authorId ?? null,
        content: input.content,
        frequency: input.frequency,
        guardianTier: input.guardianTier,
        likes: 0,
        isPinned: false,
      });
      return db
        .select()
        .from(chapterComments)
        .where(eq(chapterComments.chapterId, input.chapterId))
        .orderBy(desc(chapterComments.isPinned), asc(chapterComments.createdAt));
    }),

  likeComment: publicProcedure
    .input(z.object({ commentId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db == null) throw new Error("Database unavailable");
      const existing = await db
        .select()
        .from(chapterComments)
        .where(eq(chapterComments.id, input.commentId))
        .limit(1);
      if (existing.length === 0) throw new Error("Comment not found");
      await db
        .update(chapterComments)
        .set({ likes: existing[0].likes + 1 })
        .where(eq(chapterComments.id, input.commentId));
      return { success: true, likes: existing[0].likes + 1 };
    }),

  deleteComment: publicProcedure
    .input(z.object({ commentId: z.number(), authorId: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db == null) throw new Error("Database unavailable");
      const existing = await db
        .select()
        .from(chapterComments)
        .where(eq(chapterComments.id, input.commentId))
        .limit(1);
      if (existing.length === 0) throw new Error("Comment not found");
      if (existing[0].authorId !== input.authorId) {
        throw new Error("Not authorized to delete this comment");
      }
      await db.delete(chapterComments).where(eq(chapterComments.id, input.commentId));
      return { success: true };
    }),

  getChapterStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (db == null) return [];
    const rows = await db.select().from(chapterComments);
    const counts: Record<string, number> = {};
    for (const row of rows) {
      counts[row.chapterId] = (counts[row.chapterId] ?? 0) + 1;
    }
    return Object.entries(counts).map(([chapterId, count]) => ({ chapterId, count }));
  }),
});
