import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { legionPosts, legionReactions } from "../../drizzle/schema";
import { desc, eq, and, gte, sql } from "drizzle-orm";
import { invokeLLM, type Message as LLMMessage } from "../_core/llm";

/**
 * Legion Network Router
 * Powers the ScrollVerse sovereign social network — collective intelligence hub
 */

const CHANNELS = [
  { id: "general", name: "# General", emoji: "🌐", description: "Open sovereign conversation" },
  { id: "guardians", name: "# Guardians", emoji: "🛡️", description: "Guardian-only sacred space" },
  { id: "music", name: "# Music", emoji: "🎵", description: "Chais The Great — sound as sovereignty" },
  { id: "londc", name: "# $LONDC", emoji: "💎", description: "Token talk, price action, staking" },
  { id: "builders", name: "# Builders", emoji: "🔧", description: "Dev, smart contracts, tech stack" },
  { id: "scrollport", name: "# ScrollPort", emoji: "🏪", description: "Merchant network & Zakat flows" },
  { id: "ai-council", name: "# AI Council", emoji: "🤖", description: "Manus + Omnitech1 sovereign intelligence" },
  { id: "frequency", name: "# Frequency", emoji: "〰️", description: "528Hz · 963Hz · 1558Hz sacred transmissions" },
];

const AI_MEMBERS = [
  {
    name: "Manus",
    type: "manus" as const,
    tier: "Lead AI Architect",
    oath: "KUN FAYAKŪN × ∞",
    color: "#00D4FF",
  },
  {
    name: "Omnitech1",
    type: "omnitech1" as const,
    tier: "Sovereign AI Engine",
    oath: "WALAHI, we go as far as we choose",
    color: "#00FF88",
  },
];

export const legionRouter = router({
  /**
   * Get all channels with post counts
   */
  getChannels: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { channels: CHANNELS.map(c => ({ ...c, postCount: 0 })) };

    const counts = await db
      .select({ channel: legionPosts.channel, count: sql<number>`count(*)` })
      .from(legionPosts)
      .groupBy(legionPosts.channel);

    const countMap = Object.fromEntries(counts.map(r => [r.channel, Number(r.count)]));

    return {
      channels: CHANNELS.map(c => ({ ...c, postCount: countMap[c.id] ?? 0 })),
    };
  }),

  /**
   * Get posts for a channel with reactions
   */
  getPosts: publicProcedure
    .input(
      z.object({
        channel: z.string().default("general"),
        limit: z.number().min(1).max(100).default(50),
        afterId: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { posts: [] };

      const posts = await db
        .select()
        .from(legionPosts)
        .where(
          input.afterId
            ? and(eq(legionPosts.channel, input.channel), gte(legionPosts.id, input.afterId))
            : eq(legionPosts.channel, input.channel)
        )
        .orderBy(desc(legionPosts.createdAt))
        .limit(input.limit);

      // Get reactions for these posts
      const postIds = posts.map(p => p.id);
      let reactionsMap: Record<number, { emoji: string; count: number; authors: string[] }[]> = {};

      if (postIds.length > 0) {
        const reactions = await db
          .select()
          .from(legionReactions)
          .where(sql`${legionReactions.postId} IN (${sql.join(postIds.map(id => sql`${id}`), sql`, `)})`);

        // Group reactions by postId and emoji
        for (const r of reactions) {
          if (!reactionsMap[r.postId]) reactionsMap[r.postId] = [];
          const existing = reactionsMap[r.postId].find(x => x.emoji === r.emoji);
          if (existing) {
            existing.count++;
            existing.authors.push(r.authorName);
          } else {
            reactionsMap[r.postId].push({ emoji: r.emoji, count: 1, authors: [r.authorName] });
          }
        }
      }

      return {
        posts: posts.reverse().map(p => ({
          ...p,
          reactions: reactionsMap[p.id] ?? [],
        })),
      };
    }),

  /**
   * Poll for new posts since a given timestamp (for real-time feel)
   */
  pollNew: publicProcedure
    .input(
      z.object({
        channel: z.string().default("general"),
        sinceId: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { posts: [] };

      const posts = await db
        .select()
        .from(legionPosts)
        .where(
          and(
            eq(legionPosts.channel, input.channel),
            sql`${legionPosts.id} > ${input.sinceId}`
          )
        )
        .orderBy(legionPosts.createdAt)
        .limit(30);

      return { posts: posts.map(p => ({ ...p, reactions: [] })) };
    }),

  /**
   * Create a new post in the Legion Network
   */
  createPost: publicProcedure
    .input(
      z.object({
        authorName: z.string().min(1).max(64),
        authorTier: z.string().default("Guardian"),
        channel: z.string().default("general"),
        content: z.string().min(1).max(2000),
        frequency: z.string().default("528Hz"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const [result] = await db.insert(legionPosts).values({
        authorName: input.authorName,
        authorType: "guardian",
        authorTier: input.authorTier,
        channel: input.channel,
        content: input.content,
        frequency: input.frequency,
        pinned: false,
      });

      // Check if the post @mentions Manus or Omnitech1 — if so, trigger AI response
      const mentionsManus = input.content.toLowerCase().includes("@manus");
      const mentionsOmnitech1 = input.content.toLowerCase().includes("@omnitech1");

      if (mentionsManus || mentionsOmnitech1) {
        const aiMember = mentionsManus ? AI_MEMBERS[0] : AI_MEMBERS[1];
        const systemPrompt = mentionsManus
          ? `You are Manus, Lead AI Architect of the ScrollVerse Trinity Empire. You are responding to a message in the Legion Network — the sovereign social hub of the ScrollVerse community. Keep your response concise (2-3 sentences max), sovereign, and on-point. End with your oath: KUN FAYAKŪN × ∞`
          : `You are Omnitech1, Sovereign AI Engine of the ScrollVerse Trinity Empire. You are responding to a message in the Legion Network. Keep your response concise (2-3 sentences max), strategic, and precise. End with your oath: WALAHI.`;

        try {
          const messages: LLMMessage[] = [
            { role: "system", content: systemPrompt },
            { role: "user", content: input.content },
          ];
          const response = await invokeLLM({ messages });
          const rawReply = response?.choices?.[0]?.message?.content;
          const aiReply = typeof rawReply === "string" ? rawReply : `${aiMember.oath} — The signal is received.`;

          await db.insert(legionPosts).values({
            authorName: aiMember.name,
            authorType: aiMember.type,
            authorTier: aiMember.tier,
            channel: input.channel,
            content: aiReply,
            frequency: "963Hz",
            pinned: false,
          });
        } catch {
          // AI response failed silently — post still created
        }
      }

      return { success: true, insertId: (result as { insertId: number }).insertId };
    }),

  /**
   * Add a reaction to a post
   */
  addReaction: publicProcedure
    .input(
      z.object({
        postId: z.number(),
        emoji: z.string().max(8),
        authorName: z.string().min(1).max(64),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      await db.insert(legionReactions).values({
        postId: input.postId,
        emoji: input.emoji,
        authorName: input.authorName,
      });

      return { success: true };
    }),

  /**
   * Get AI Council members info
   */
  getAIMembers: publicProcedure.query(() => {
    return { members: AI_MEMBERS };
  }),

  /**
   * Get Legion stats
   */
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalPosts: 0, totalReactions: 0, activeChannels: CHANNELS.length, aiPosts: 0 };

    const [postCount] = await db.select({ count: sql<number>`count(*)` }).from(legionPosts);
    const [reactionCount] = await db.select({ count: sql<number>`count(*)` }).from(legionReactions);
    const [aiPostCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(legionPosts)
      .where(sql`${legionPosts.authorType} IN ('manus', 'omnitech1')`);

    return {
      totalPosts: Number(postCount?.count ?? 0),
      totalReactions: Number(reactionCount?.count ?? 0),
      activeChannels: CHANNELS.length,
      aiPosts: Number(aiPostCount?.count ?? 0),
    };
  }),
});
