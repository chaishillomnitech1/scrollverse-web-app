import { desc, eq, lt } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { guardianProfiles, journeyInteractionEvents, journeyUserProgress } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const RETENTION_DAYS = 90;
const eventSchema = z.enum(["ZONE_OPENED", "ROUTE_SELECTED", "RECOMMENDATION_SELECTED"]);

export type JourneyRecommendation = { title: string; href: string; description: string; tone: "gold" | "cyan" | "green" };

export function buildJourneyRecommendations(hasProfile: boolean, activationStarted: boolean): JourneyRecommendation[] {
  if (!hasProfile) {
    return [
      { title: "Complete your Guardian profile", href: "/guardian-dashboard", description: "Set your Guardian identity to personalize the path ahead.", tone: "gold" },
      { title: "Begin Guardian activation", href: "/guardian-activation", description: "Open the guided activation experience at your own pace.", tone: "green" },
      { title: "Meet the AI Legion", href: "/ai-legion-apex", description: "Choose a guide for questions, building, or learning.", tone: "cyan" },
    ];
  }
  if (!activationStarted) {
    return [
      { title: "Continue Guardian activation", href: "/guardian-activation", description: "Your profile is ready; start the activation path when it feels right.", tone: "gold" },
      { title: "Explore Think Space", href: "/think-space", description: "Share original work and find community discovery pathways.", tone: "green" },
      { title: "Read the Seerah Archive", href: "/seerah", description: "Continue through the public sacred-learning library.", tone: "cyan" },
    ];
  }
  return [
    { title: "Build a concept lookboard", href: "/fashion-portfolio", description: "Create an original concept board with no commerce or inventory effect.", tone: "gold" },
    { title: "Enter the Mesopotamia Library", href: "/mesopotamia-library", description: "Explore the free knowledge wings and their guided pathways.", tone: "green" },
    { title: "Meet the AI Legion", href: "/ai-legion-apex", description: "Return to the intelligence network for guided exploration.", tone: "cyan" },
  ];
}

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Journey storage is unavailable." });
  return db;
}

async function ensureProgress(userId: number) {
  const db = await requireDb();
  const [existing] = await db.select().from(journeyUserProgress).where(eq(journeyUserProgress.userId, userId));
  if (existing) return { db, progress: existing };
  const now = new Date();
  await db.insert(journeyUserProgress).values({ userId, openedJourneyAt: now });
  const [created] = await db.select().from(journeyUserProgress).where(eq(journeyUserProgress.userId, userId));
  if (!created) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Journey progress could not be initialized." });
  return { db, progress: created };
}

export const journeyRouter = router({
  overview: protectedProcedure.query(async ({ ctx }) => {
    const { db, progress } = await ensureProgress(ctx.user.id);
    const [profile] = await db.select().from(guardianProfiles).where(eq(guardianProfiles.userId, String(ctx.user.id)));
    const analyticsEnabled = Boolean(progress.analyticsOptedInAt && !progress.analyticsOptedOutAt);
    const completeSteps = [Boolean(profile), Boolean(progress.activationStartedAt), Boolean(progress.recommendationVisitedAt)].filter(Boolean).length;
    return {
      hasGuardianProfile: Boolean(profile),
      activationStarted: Boolean(progress.activationStartedAt),
      recommendationVisited: Boolean(progress.recommendationVisitedAt),
      analyticsEnabled,
      progress: { completeSteps, totalSteps: 3 },
      recommendations: buildJourneyRecommendations(Boolean(profile), Boolean(progress.activationStartedAt)),
    };
  }),

  markProgress: protectedProcedure.input(z.object({ step: z.enum(["ACTIVATION_STARTED", "RECOMMENDATION_VISITED"]) })).mutation(async ({ ctx, input }) => {
    const { db } = await ensureProgress(ctx.user.id);
    const now = new Date();
    await db.update(journeyUserProgress).set(input.step === "ACTIVATION_STARTED" ? { activationStartedAt: now } : { recommendationVisitedAt: now }).where(eq(journeyUserProgress.userId, ctx.user.id));
    return { success: true };
  }),

  setAnalyticsPreference: protectedProcedure.input(z.object({ enabled: z.boolean() })).mutation(async ({ ctx, input }) => {
    const { db } = await ensureProgress(ctx.user.id);
    const now = new Date();
    if (input.enabled) {
      await db.update(journeyUserProgress).set({ analyticsOptedInAt: now, analyticsOptedOutAt: null }).where(eq(journeyUserProgress.userId, ctx.user.id));
    } else {
      await db.update(journeyUserProgress).set({ analyticsOptedOutAt: now }).where(eq(journeyUserProgress.userId, ctx.user.id));
      await db.delete(journeyInteractionEvents).where(eq(journeyInteractionEvents.userId, ctx.user.id));
    }
    return { success: true, enabled: input.enabled };
  }),

  trackInteraction: protectedProcedure.input(z.object({ eventType: eventSchema, zoneId: z.string().trim().min(1).max(64).optional(), targetHref: z.string().trim().regex(/^\//).max(255).optional() })).mutation(async ({ ctx, input }) => {
    const { db, progress } = await ensureProgress(ctx.user.id);
    const analyticsEnabled = Boolean(progress.analyticsOptedInAt && !progress.analyticsOptedOutAt);
    if (!analyticsEnabled) return { recorded: false, reason: "analytics_not_enabled" as const };
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
    await db.delete(journeyInteractionEvents).where(lt(journeyInteractionEvents.createdAt, cutoff));
    await db.insert(journeyInteractionEvents).values({ userId: ctx.user.id, ...input });
    return { recorded: true };
  }),

  recentSelections: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    return db.select().from(journeyInteractionEvents).where(eq(journeyInteractionEvents.userId, ctx.user.id)).orderBy(desc(journeyInteractionEvents.createdAt)).limit(12);
  }),
});
