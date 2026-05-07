import { z } from "zod";
import { getDb } from "../db";
import { creatorApplications, referralCodes, legionRewards } from "../../drizzle/schema";
import { eq, count, sum, desc } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";

function genCode(instagram: string): string {
  const handle = instagram.replace("@", "").toUpperCase().slice(0, 8);
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SV-${handle}-${rand}`;
}

export const partnersRouter = router({
  // Apply as a creator partner
  applyAsCreator: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(200),
        email: z.string().email(),
        instagram: z.string().min(1).max(100),
        followers: z.number().min(0).default(0),
        niche: z.string().optional(),
        tier: z.enum(["guardian", "sovereign", "ascendant"]).default("sovereign"),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();

      // Check if already applied
      const existing = await db
        .select()
        .from(creatorApplications)
        .where(eq(creatorApplications.email, input.email))
        .limit(1);

      if (existing.length > 0) {
        return { success: true, message: "Application already on file — we will be in touch!", existing: true };
      }

      // Generate a referral code for the creator
      const referralCode = genCode(input.instagram);

      await db.insert(creatorApplications).values({
        name: input.name,
        email: input.email,
        instagram: input.instagram,
        followers: input.followers,
        niche: input.niche ?? null,
        tier: input.tier,
        bio: input.bio ?? null,
        status: "pending",
        referralCode,
        loncEarned: "0",
        activationsCount: 0,
      });

      return {
        success: true,
        message: "Application submitted! Expect a response within 24 hours.",
        referralCode,
      };
    }),

  // Get all applications (admin only)
  getApplications: protectedProcedure.query(async () => {
    const db = await getDb();
    const apps = await db
      .select()
      .from(creatorApplications)
      .orderBy(desc(creatorApplications.createdAt))
      .limit(100);
    return apps;
  }),

  // Approve a creator application
  approveCreator: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db
        .update(creatorApplications)
        .set({ status: "approved", approvedAt: new Date() })
        .where(eq(creatorApplications.id, input.id));

      // Also create a referral code entry in the referral_codes table
      const app = await db
        .select()
        .from(creatorApplications)
        .where(eq(creatorApplications.id, input.id))
        .limit(1);

      if (app[0]?.referralCode) {
        const existingCode = await db
          .select()
          .from(referralCodes)
          .where(eq(referralCodes.code, app[0].referralCode))
          .limit(1);

        if (existingCode.length === 0) {
          await db.insert(referralCodes).values({
            code: app[0].referralCode,
            creatorName: app[0].name,
            creatorEmail: app[0].email ?? undefined,
            tier: app[0].tier ?? "guardian",
          });
        }
      }

      return { success: true, message: "Creator approved and referral code activated." };
    }),

  // Get platform stats for the partners page
  getStats: publicProcedure.query(async () => {
    const db = await getDb();

    const [totalCreatorsResult] = await db
      .select({ count: count() })
      .from(creatorApplications)
      .where(eq(creatorApplications.status, "approved"));

    const [totalActivationsResult] = await db
      .select({ total: sum(creatorApplications.activationsCount) })
      .from(creatorApplications);

    const [totalLoncResult] = await db
      .select({ total: sum(legionRewards.impactScore) })
      .from(legionRewards);

    return {
      totalCreators: totalCreatorsResult?.count ?? 0,
      totalActivations: totalActivationsResult?.total ?? 0,
      totalLonc: `${((Number(totalLoncResult?.total) || 0) * 144).toLocaleString()} $LONDC`,
    };
  }),
});
