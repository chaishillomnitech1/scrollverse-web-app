import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { thinkSpacePosts, thinkSpaceComments, thinkSpaceLikes } from "../../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";

const CATEGORIES = ["music", "film", "scholarship", "art", "technology", "philosophy", "spirituality", "business", "general"] as const;

export const thinkSpaceRouter = router({
  // Create a post (text + optional media URL)
  createPost: publicProcedure
    .input(z.object({
      content: z.string().min(1).max(5000),
      userName: z.string().min(1).max(100).default("Anonymous"),
      category: z.enum(CATEGORIES).default("general"),
      mediaUrl: z.string().url().optional(),
      mediaType: z.enum(["image", "audio", "video", "document", "link"]).optional(),
      mediaName: z.string().max(500).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id ?? null;
      const userName = ctx.user?.name ?? input.userName;
      const now = Date.now();
      const db = await getDb();
      const [result] = await db.insert(thinkSpacePosts).values({
        userId,
        userName,
        content: input.content,
        category: input.category,
        mediaUrl: input.mediaUrl ?? null,
        mediaType: input.mediaType ?? null,
        mediaName: input.mediaName ?? null,
        likes: 0,
        createdAt: now,
      });
      return { success: true, postId: result.insertId };
    }),

  // Get posts feed with optional category filter
  getPosts: publicProcedure
    .input(z.object({
      category: z.enum([...CATEGORIES, "all"]).default("all"),
      limit: z.number().min(1).max(50).default(20),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      const posts = input.category === "all"
        ? await db.select().from(thinkSpacePosts).orderBy(desc(thinkSpacePosts.createdAt)).limit(input.limit).offset(input.offset)
        : await db.select().from(thinkSpacePosts).where(eq(thinkSpacePosts.category, input.category)).orderBy(desc(thinkSpacePosts.createdAt)).limit(input.limit).offset(input.offset);
      const [countResult] = await db.select({ count: sql<number>`count(*)` }).from(thinkSpacePosts);
      return { posts, total: countResult?.count ?? 0 };
    }),

  // Like a post (toggle)
  likePost: publicProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id;
      if (!userId) {
        // Anonymous like — just increment
        const db = await getDb();
        await db.update(thinkSpacePosts).set({ likes: sql`likes + 1` }).where(eq(thinkSpacePosts.id, input.postId));
        return { liked: true };
      }
      // Check if already liked
      const db = await getDb();
      const existing = await db.select().from(thinkSpaceLikes).where(and(eq(thinkSpaceLikes.postId, input.postId), eq(thinkSpaceLikes.userId, userId)));
      if (existing.length > 0) {
        await db.delete(thinkSpaceLikes).where(and(eq(thinkSpaceLikes.postId, input.postId), eq(thinkSpaceLikes.userId, userId)));
        await db.update(thinkSpacePosts).set({ likes: sql`GREATEST(likes - 1, 0)` }).where(eq(thinkSpacePosts.id, input.postId));
        return { liked: false };
      }
      await db.insert(thinkSpaceLikes).values({ postId: input.postId, userId, createdAt: Date.now() });
      await db.update(thinkSpacePosts).set({ likes: sql`likes + 1` }).where(eq(thinkSpacePosts.id, input.postId));
      return { liked: true };
    }),

  // Add a comment
  addComment: publicProcedure
    .input(z.object({
      postId: z.number(),
      content: z.string().min(1).max(2000),
      userName: z.string().min(1).max(100).default("Anonymous"),
    }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id ?? null;
      const userName = ctx.user?.name ?? input.userName;
      const db = await getDb();
      await db.insert(thinkSpaceComments).values({
        postId: input.postId,
        userId,
        userName,
        content: input.content,
        createdAt: Date.now(),
      });
      return { success: true };
    }),

  // Get comments for a post
  getComments: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      return db.select().from(thinkSpaceComments).where(eq(thinkSpaceComments.postId, input.postId)).orderBy(desc(thinkSpaceComments.createdAt)).limit(50);
    }),

  // Get stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    const [postCount] = await db.select({ count: sql<number>`count(*)` }).from(thinkSpacePosts);
    const [commentCount] = await db.select({ count: sql<number>`count(*)` }).from(thinkSpaceComments);
    return { posts: postCount?.count ?? 0, comments: commentCount?.count ?? 0 };
  }),
});
