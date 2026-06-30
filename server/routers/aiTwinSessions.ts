/**
 * AI TWIN SESSIONS ROUTER
 * Persistent conversation sessions with the Chais Sabir Allah AI Twin
 * Guardians can return to previous consultations with full history intact
 */
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { aiTwinSessions } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const aiTwinSessionsRouter = router({
  // Create a new session
  create: publicProcedure
    .input(z.object({
      title: z.string().max(255).default("New Consultation"),
      guestId: z.string().max(128).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const userId = ctx.user?.id ?? null;
      const [result] = await db.insert(aiTwinSessions).values({
        userId,
        guestId: input.guestId ?? null,
        title: input.title,
        messages: "[]",
        messageCount: 0,
        lastMessageAt: new Date(),
      });
      const id = (result as any).insertId as number;
      const [session] = await db.select().from(aiTwinSessions).where(eq(aiTwinSessions.id, id));
      return session;
    }),

  // Get all sessions for the current user (or guest)
  list: publicProcedure
    .input(z.object({ guestId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      const userId = ctx.user?.id ?? null;
      if (userId) {
        return db.select().from(aiTwinSessions)
          .where(eq(aiTwinSessions.userId, userId))
          .orderBy(desc(aiTwinSessions.lastMessageAt))
          .limit(50);
      }
      if (input.guestId) {
        return db.select().from(aiTwinSessions)
          .where(eq(aiTwinSessions.guestId, input.guestId))
          .orderBy(desc(aiTwinSessions.lastMessageAt))
          .limit(20);
      }
      return [];
    }),

  // Get a single session by ID
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      const [session] = await db.select().from(aiTwinSessions)
        .where(eq(aiTwinSessions.id, input.id));
      if (!session) throw new Error("Session not found");
      return session;
    }),

  // Update session messages and title
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      messages: z.string(), // JSON string of message array
      title: z.string().max(255).optional(),
      messageCount: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const updateData: Record<string, unknown> = {
        messages: input.messages,
        lastMessageAt: new Date(),
      };
      if (input.title) updateData.title = input.title;
      if (input.messageCount !== undefined) updateData.messageCount = input.messageCount;

      await db.update(aiTwinSessions)
        .set(updateData)
        .where(eq(aiTwinSessions.id, input.id));

      const [session] = await db.select().from(aiTwinSessions)
        .where(eq(aiTwinSessions.id, input.id));
      return session;
    }),

  // Delete a session
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      await db.delete(aiTwinSessions).where(eq(aiTwinSessions.id, input.id));
      return { success: true };
    }),
});
