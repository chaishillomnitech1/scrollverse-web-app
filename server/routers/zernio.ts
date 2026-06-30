/**
 * Zernio Social Distribution Router
 * Handles sovereign post creation with auto-injected hashtags and CTA
 */
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { zernio_posts } from "../../drizzle/schema";
import { desc, eq } from "drizzle-orm";

const SOVEREIGN_HASHTAGS = [
  "#ScrollVerse",
  "#LONDC",
  "#Guardian",
  "#KunFayakun",
  "#SovereignEmpire",
  "#ChaisTheGreat",
];

const SOVEREIGN_CTA = "scrollverse.co/link";

function buildCaption(rawCaption: string, platforms: string[]): string {
  const hashtags = SOVEREIGN_HASHTAGS.join(" ");
  const cta = `\n\n🔗 ${SOVEREIGN_CTA}`;
  const tags = `\n\n${hashtags}`;
  return `${rawCaption}${cta}${tags}`;
}

export const zernioRouter = router({
  // Create a new sovereign post
  createPost: protectedProcedure
    .input(
      z.object({
        rawCaption: z.string().min(1).max(2200),
        platforms: z.array(z.string()).min(1),
        mediaUrl: z.string().optional(),
        scheduledAt: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const fullCaption = buildCaption(input.rawCaption, input.platforms);
      const post = await db
        .insert(zernio_posts)
        .values({
          user_id: ctx.user.id,
          raw_caption: input.rawCaption,
          full_caption: fullCaption,
          platforms: JSON.stringify(input.platforms),
          media_url: input.mediaUrl || null,
          scheduled_at: input.scheduledAt ? new Date(input.scheduledAt) : null,
          status: input.scheduledAt ? "scheduled" : "draft",
          hashtags: JSON.stringify(SOVEREIGN_HASHTAGS),
          cta_url: SOVEREIGN_CTA,
        })
        .execute();
      return { success: true, fullCaption, postId: (post as any).insertId };
    }),

  // List posts for the current user
  listPosts: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const posts = await db
      .select()
      .from(zernio_posts)
      .where(eq(zernio_posts.user_id, ctx.user.id))
      .orderBy(desc(zernio_posts.created_at))
      .limit(50)
      .execute();
    return posts;
  }),

  // Get sovereign hashtags and CTA
  getSovereignConfig: publicProcedure.query(() => {
    return {
      hashtags: SOVEREIGN_HASHTAGS,
      cta: SOVEREIGN_CTA,
      platforms: [
        { id: "instagram", name: "Instagram", icon: "📸", color: "#E1306C" },
        { id: "tiktok", name: "TikTok", icon: "🎵", color: "#010101" },
        { id: "x", name: "X (Twitter)", icon: "𝕏", color: "#1DA1F2" },
        { id: "linkedin", name: "LinkedIn", icon: "💼", color: "#0A66C2" },
        { id: "facebook", name: "Facebook", icon: "📘", color: "#1877F2" },
        { id: "youtube", name: "YouTube", icon: "▶️", color: "#FF0000" },
        { id: "threads", name: "Threads", icon: "🧵", color: "#000000" },
        { id: "snapchat", name: "Snapchat", icon: "👻", color: "#FFFC00" },
        { id: "pinterest", name: "Pinterest", icon: "📌", color: "#E60023" },
        { id: "telegram", name: "Telegram", icon: "✈️", color: "#2CA5E0" },
        { id: "discord", name: "Discord", icon: "🎮", color: "#5865F2" },
        { id: "scrollverse", name: "ScrollVerse", icon: "🌀", color: "#00D4FF" },
      ],
    };
  }),

  // Delete a post
  deletePost: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      await db
        .delete(zernio_posts)
        .where(eq(zernio_posts.id, input.id))
        .execute();
      return { success: true };
    }),
});
