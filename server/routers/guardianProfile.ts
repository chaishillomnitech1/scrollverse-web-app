import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { guardianProfiles } from "../../drizzle/schema";
import { eq, desc, sql } from "drizzle-orm";

export const guardianProfileRouter = router({
  // Get a public guardian profile by handle or userId
  getPublicProfile: publicProcedure
    .input(z.object({ handle: z.string().optional(), userId: z.string().optional() }))
    .query(async ({ input }) => {
      const db = await getDb();
      let profile = null;
      if (input.handle) {
        const rows = await db
          .select()
          .from(guardianProfiles)
          .where(eq(guardianProfiles.handle, input.handle))
          .limit(1);
        profile = rows[0] ?? null;
      } else if (input.userId) {
        const rows = await db
          .select()
          .from(guardianProfiles)
          .where(eq(guardianProfiles.userId, input.userId))
          .limit(1);
        profile = rows[0] ?? null;
      }
      return { profile };
    }),

  // Get the leaderboard (top 50 by resonance score)
  getLeaderboard: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ input }) => {
      const db = await getDb();
      const profiles = await db
        .select()
        .from(guardianProfiles)
        .orderBy(desc(guardianProfiles.resonanceScore))
        .limit(input.limit);
      return { profiles };
    }),

  // Get or create the authenticated user's own profile
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const userId = String(ctx.user.id);
    const rows = await db
      .select()
      .from(guardianProfiles)
      .where(eq(guardianProfiles.userId, userId))
      .limit(1);
    if (rows[0]) return { profile: rows[0] };
    // Auto-create profile on first access
    const displayName = ctx.user.name ?? `Guardian_${userId.slice(0, 6)}`;
    const handle = displayName.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 32) + userId.slice(0, 4);
    await db.insert(guardianProfiles).values({
      userId,
      displayName,
      handle,
      tier: "guardian",
      frequency: "528Hz",
      resonanceScore: 100,
    });
    const created = await db
      .select()
      .from(guardianProfiles)
      .where(eq(guardianProfiles.userId, userId))
      .limit(1);
    return { profile: created[0] ?? null };
  }),

  // Update the authenticated user's own profile
  updateProfile: protectedProcedure
    .input(
      z.object({
        displayName: z.string().min(1).max(128).optional(),
        bio: z.string().max(1000).optional(),
        frequency: z.enum(["528Hz", "963Hz", "432Hz", "1558Hz", "11:11Hz"]).optional(),
        walletAddress: z.string().max(64).optional(),
        avatarUrl: z.string().url().max(512).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const userId = String(ctx.user.id);
      await db
        .update(guardianProfiles)
        .set({ ...input })
        .where(eq(guardianProfiles.userId, userId));
      const rows = await db
        .select()
        .from(guardianProfiles)
        .where(eq(guardianProfiles.userId, userId))
        .limit(1);
      return { profile: rows[0] ?? null };
    }),

  // Get total guardian count
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    const rows = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(guardianProfiles);
    const tierRows = await db
      .select({
        tier: guardianProfiles.tier,
        count: sql<number>`COUNT(*)`,
      })
      .from(guardianProfiles)
      .groupBy(guardianProfiles.tier);
    return {
      total: Number(rows[0]?.count ?? 0),
      byTier: tierRows.map((r: any) => ({ tier: r.tier, count: Number(r.count) })),
    };
  }),
});
