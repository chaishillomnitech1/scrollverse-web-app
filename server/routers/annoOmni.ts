import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { annoOmniLeads } from "../../drizzle/schema";
import { desc, count, eq, sql } from "drizzle-orm";

export const annoOmniRouter = router({
  /**
   * Submit a new 48D Identity Nexus lead (KYS onboarding).
   */
  submitLead: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(256),
        email: z.string().email().max(320),
        businessName: z.string().max(256).optional(),
        businessType: z.string().max(64).optional(),
        frequency: z.enum(["528Hz", "963Hz", "432Hz", "1558Hz"]).default("528Hz"),
        sovereignGoal: z.string().max(1000).optional(),
        referralCode: z.string().max(32).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, alreadyRegistered: false };
      // Check for duplicate email
      const existing = await db
        .select({ id: annoOmniLeads.id })
        .from(annoOmniLeads)
        .where(eq(annoOmniLeads.email, input.email))
        .limit(1);
      if (existing.length > 0) {
        return { success: true, alreadyRegistered: true };
      }
      await db.insert(annoOmniLeads).values({
        name: input.name,
        email: input.email,
        businessName: input.businessName ?? null,
        businessType: input.businessType ?? null,
        frequency: input.frequency,
        sovereignGoal: input.sovereignGoal ?? null,
        referralCode: input.referralCode ?? null,
        status: "pending",
      });
      return { success: true, alreadyRegistered: false };
    }),

  /**
   * Get aggregate stats for the Identity Pulse dashboard.
   */
  getIdentityPulse: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { total: 0, byFrequency: [], byType: [], recent: [], zakatPotential: 0, sovereignTarget: 50_000_000, percentToTarget: "0.000000" };
    const [totalResult] = await db
      .select({ total: count() })
      .from(annoOmniLeads);
    const total = totalResult?.total ?? 0;

    const byFrequency = await db
      .select({
        frequency: annoOmniLeads.frequency,
        count: count(),
      })
      .from(annoOmniLeads)
      .groupBy(annoOmniLeads.frequency);

    const byType = await db
      .select({
        businessType: annoOmniLeads.businessType,
        count: count(),
      })
      .from(annoOmniLeads)
      .groupBy(annoOmniLeads.businessType)
      .limit(10);

    const recent = await db
      .select({
        id: annoOmniLeads.id,
        name: annoOmniLeads.name,
        businessName: annoOmniLeads.businessName,
        frequency: annoOmniLeads.frequency,
        createdAt: annoOmniLeads.createdAt,
      })
      .from(annoOmniLeads)
      .orderBy(desc(annoOmniLeads.createdAt))
      .limit(5);

    return {
      total,
      byFrequency,
      byType,
      recent,
      zakatPotential: Math.floor(total * 0.0777 * 144),
      sovereignTarget: 50_000_000,
      percentToTarget: ((total / 50_000_000) * 100).toFixed(6),
    };
  }),
});
