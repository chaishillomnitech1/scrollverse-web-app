/**
 * Knowledge Base Router
 * Legion knowledge base: search, add, rate, workflow templates
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { knowledgeBase, workflowTemplates } from "../../drizzle/schema";
import { sql, desc, like, or, eq } from "drizzle-orm";

export const knowledgeRouter = router({
  getAll: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().default(0),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      let query = db.select().from(knowledgeBase).where(eq(knowledgeBase.isPublished, 1));
      const results = await db.select().from(knowledgeBase)
        .where(
          input.category && input.category !== "all"
            ? sql`${knowledgeBase.isPublished} = 1 AND ${knowledgeBase.category} = ${input.category}`
            : eq(knowledgeBase.isPublished, 1)
        )
        .orderBy(desc(knowledgeBase.usageCount))
        .limit(input.limit)
        .offset(input.offset);
      return results;
    }),

  search: publicProcedure
    .input(z.object({
      query: z.string().min(1),
      category: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      const q = `%${input.query}%`;
      const results = await db.select().from(knowledgeBase)
        .where(
          sql`${knowledgeBase.isPublished} = 1 AND (${knowledgeBase.title} LIKE ${q} OR ${knowledgeBase.content} LIKE ${q} OR ${knowledgeBase.tags} LIKE ${q})`
        )
        .orderBy(desc(knowledgeBase.rating))
        .limit(20);
      return results;
    }),

  add: protectedProcedure
    .input(z.object({
      title: z.string().min(3).max(256),
      category: z.string().default("general"),
      content: z.string().min(10),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const [result] = await db.insert(knowledgeBase).values({
        title: input.title,
        category: input.category,
        content: input.content,
        tags: input.tags ? JSON.stringify(input.tags) : null,
        authorId: ctx.user.id,
        authorName: ctx.user.name ?? "Guardian",
        isPublished: 1,
      });
      return { success: true, id: (result as any).insertId };
    }),

  rate: protectedProcedure
    .input(z.object({
      id: z.number(),
      rating: z.number().min(1).max(5),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.update(knowledgeBase)
        .set({ rating: input.rating, usageCount: sql`${knowledgeBase.usageCount} + 1` })
        .where(eq(knowledgeBase.id, input.id));
      return { success: true };
    }),

  getWorkflows: publicProcedure
    .input(z.object({
      category: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      const results = await db.select().from(workflowTemplates)
        .where(
          input.category && input.category !== "all"
            ? sql`${workflowTemplates.isPublished} = 1 AND ${workflowTemplates.category} = ${input.category}`
            : eq(workflowTemplates.isPublished, 1)
        )
        .orderBy(desc(workflowTemplates.timesUsed))
        .limit(20);
      return results;
    }),

  addWorkflow: protectedProcedure
    .input(z.object({
      name: z.string().min(3).max(256),
      description: z.string().optional(),
      category: z.string().default("general"),
      steps: z.array(z.object({
        step: z.number(),
        title: z.string(),
        description: z.string(),
      })).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const [result] = await db.insert(workflowTemplates).values({
        name: input.name,
        description: input.description,
        category: input.category,
        steps: input.steps ? JSON.stringify(input.steps) : null,
        authorId: ctx.user.id,
        authorName: ctx.user.name ?? "Guardian",
        isPublished: 1,
      });
      return { success: true, id: (result as any).insertId };
    }),
});
