/**
 * Custom Notification System — tRPC Router
 * Real-time in-app notifications for Guardians: alerts, jackpots, announcements, system events.
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { notifications } from "../../drizzle/schema";
import { eq, desc, and, isNull } from "drizzle-orm";
import { notifyOwner } from "../_core/notification";

export const notificationsRouter = router({
  /**
   * Get all notifications for the current user (newest first, max 50)
   */
  getMyNotifications: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }).optional())
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 50;
      const db = await getDb();
      const rows = await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, ctx.user.id))
        .orderBy(desc(notifications.createdAt))
        .limit(limit);
      return rows;
    }),

  /**
   * Get unread notification count for the bell badge
   */
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const rows = await db
      .select()
      .from(notifications)
      .where(and(eq(notifications.userId, ctx.user.id), isNull(notifications.readAt)));
    return { count: rows.length };
  }),

  /**
   * Mark a single notification as read
   */
  markRead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      await db
        .update(notifications)
        .set({ readAt: new Date() })
        .where(and(eq(notifications.id, input.id), eq(notifications.userId, ctx.user.id)));
      return { success: true };
    }),

  /**
   * Mark all notifications as read
   */
  markAllRead: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    await db
      .update(notifications)
      .set({ readAt: new Date() })
      .where(and(eq(notifications.userId, ctx.user.id), isNull(notifications.readAt)));
    return { success: true };
  }),

  /**
   * Delete a notification
   */
  deleteNotification: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      await db
        .delete(notifications)
        .where(and(eq(notifications.id, input.id), eq(notifications.userId, ctx.user.id)));
      return { success: true };
    }),

  /**
   * Send a system-wide broadcast notification to all users (owner only via notifyOwner)
   * Creates a notification record for the current user + notifies owner
   */
  sendSelfNotification: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        message: z.string().min(1).max(1000),
        type: z.enum(["info", "success", "warning", "jackpot", "guardian", "system"]).default("info"),
        link: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const [row] = await db
        .insert(notifications)
        .values({
          userId: ctx.user.id,
          title: input.title,
          message: input.message,
          type: input.type,
          link: input.link ?? null,
          createdAt: new Date(),
        })
        .$returningId();
      return { id: row.id, success: true };
    }),

  /**
   * Internal: create a notification for a specific user (used by casino, store, etc.)
   */
  createForUser: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        message: z.string(),
        type: z.enum(["info", "success", "warning", "jackpot", "guardian", "system"]).default("info"),
        link: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const [row] = await db
        .insert(notifications)
        .values({
          userId: ctx.user.id,
          title: input.title,
          message: input.message,
          type: input.type,
          link: input.link ?? null,
          createdAt: new Date(),
        })
        .$returningId();
      return { id: row.id };
    }),

  /**
   * Notify owner of a critical event (uses built-in notifyOwner helper)
   */
  notifyOwnerEvent: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input }) => {
      const ok = await notifyOwner({ title: input.title, content: input.content });
      return { sent: ok };
    }),
});
