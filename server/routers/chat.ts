/**
 * GUARDIAN COMMUNITY CHAT ROUTER
 * Real-time community messaging for the ScrollVerse Guardian network
 * Polling-based with 3-second refresh — no WebSocket complexity needed
 */
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { chatMessages } from "../../drizzle/schema";
import { desc, eq, gt } from "drizzle-orm";

const CHANNELS = ["general", "guardians", "music", "token", "builders"] as const;
const FREQUENCIES = ["528Hz", "963Hz", "1558Hz"] as const;
const MAX_MESSAGE_LENGTH = 500;
const MESSAGES_PER_PAGE = 50;

export const chatRouter = router({
  /**
   * Get recent messages for a channel (latest 50)
   */
  getMessages: publicProcedure
    .input(
      z.object({
        channel: z.enum(CHANNELS).default("general"),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const rows = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.channel, input.channel))
        .orderBy(desc(chatMessages.createdAt))
        .limit(MESSAGES_PER_PAGE);

      return rows.reverse(); // Return oldest-first for display
    }),

  /**
   * Poll for new messages since a given message ID
   */
  pollNew: publicProcedure
    .input(
      z.object({
        channel: z.enum(CHANNELS).default("general"),
        afterId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const rows = await db
        .select()
        .from(chatMessages)
        .where(gt(chatMessages.id, input.afterId))
        .orderBy(chatMessages.createdAt)
        .limit(20);

      return rows.filter((r: any) => r.channel === input.channel);
    }),

  /**
   * Send a message — open to all (no auth required for community feel)
   */
  sendMessage: publicProcedure
    .input(
      z.object({
        displayName: z.string().min(1).max(64),
        message: z.string().min(1).max(MAX_MESSAGE_LENGTH),
        channel: z.enum(CHANNELS).default("general"),
        frequency: z.enum(FREQUENCIES).default("528Hz"),
      })
    )
    .mutation(async ({ input }) => {
      if (input.displayName.includes("http")) {
        throw new Error("Display name cannot contain URLs");
      }

      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const [result] = await db.insert(chatMessages).values({
        displayName: input.displayName.trim(),
        message: input.message.trim(),
        channel: input.channel,
        frequency: input.frequency,
      });

      return { success: true, id: (result as { insertId: number }).insertId };
    }),

  /**
   * Get channel stats
   */
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalMessages: 0, channelCounts: {}, recentSenders: [] };

    const allMessages = await db
      .select()
      .from(chatMessages)
      .orderBy(desc(chatMessages.createdAt))
      .limit(200);

    const channelCounts: Record<string, number> = {};
    for (const ch of CHANNELS) {
      channelCounts[ch] = allMessages.filter((m: any) => m.channel === ch).length;
    }

    const uniqueSenders = Array.from(
      new Set(allMessages.slice(0, 20).map((m: any) => m.displayName))
    ).slice(0, 10);

    return {
      totalMessages: allMessages.length,
      channelCounts,
      recentSenders: uniqueSenders,
    };
  }),
});
