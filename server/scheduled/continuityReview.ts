import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { continuityReviewRuns, continuityReviewSettings, revenueOperationReadiness } from "../../drizzle/schema";
import type { RevenueOperationReadiness } from "../../drizzle/schema";
import { getDb } from "../db";
import { notifyOwner } from "../_core/notification";
import { sdk } from "../_core/sdk";

const firstPartyRoutes = [
  "/knowledge-navigator", "/knowledge-context", "/evidence-standards", "/health-research",
  "/creator-workspace", "/creator-media-studio", "/ip-readiness", "/digital-highways",
  "/platform-foundations", "/legion-commons", "/signalworks", "/creator-revenue-learning",
  "/open-exchange-field-guide", "/protection-protocol",
];

const reviewWeekKey = (value: Date): string => {
  const utc = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
  const mondayOffset = (utc.getUTCDay() + 6) % 7;
  utc.setUTCDate(utc.getUTCDate() - mondayOffset);
  return utc.toISOString().slice(0, 10);
};

export async function continuityReviewHandler(req: Request, res: Response) {
  try {
    const cronUser = await sdk.authenticateRequest(req);
    if (!cronUser.isCron || !cronUser.taskUid) return res.status(403).json({ error: "cron-only" });

    const db = await getDb();
    if (!db) return res.status(500).json({ error: "continuity review database unavailable" });
    const [settings] = await db.select().from(continuityReviewSettings)
      .where(eq(continuityReviewSettings.scheduleCronTaskUid, cronUser.taskUid)).limit(1);
    if (!settings || !settings.enabled) return res.json({ ok: true, skipped: "orphan-or-disabled" });

    const now = new Date();
    const reviewWeek = reviewWeekKey(now);
    if (settings.lastReviewWeek === reviewWeek) return res.json({ ok: true, skipped: "already-reviewed", reviewWeek });

    const readinessRecords: RevenueOperationReadiness[] = await db.select().from(revenueOperationReadiness);
    const readyCount = readinessRecords.filter(record => record.readinessStatus === "READY").length;
    const awaitingOwnerCount = readinessRecords.filter(record => record.readinessStatus === "AWAITING_OWNER").length;
    const blockedCount = readinessRecords.filter(record => record.readinessStatus === "BLOCKED").length;
    const inProgressCount = readinessRecords.filter(record => record.readinessStatus === "IN_PROGRESS").length;
    const routeSummary = `${firstPartyRoutes.length} first-party routes inventoried: ${firstPartyRoutes.join(", ")}.`;
    const dependencySummary = "This review covers registered route inventory and Revenue Operations readiness records only. It does not inspect private files, authenticate a user, contact providers, create accounts, post content, move funds, activate commerce, alter a wallet, or take a release action.";

    await db.insert(continuityReviewRuns).values({
      reviewWeek,
      routeCount: firstPartyRoutes.length,
      readinessRecordCount: readinessRecords.length,
      readyCount,
      awaitingOwnerCount,
      blockedCount,
      inProgressCount,
      routeSummary,
      dependencySummary,
    });

    const notified = await notifyOwner({
      title: `Weekly continuity review: ${firstPartyRoutes.length} first-party routes`,
      content: `Week of ${reviewWeek}. Routes: ${firstPartyRoutes.length}. Revenue Operations tracker — total: ${readinessRecords.length}; ready: ${readyCount}; awaiting owner: ${awaitingOwnerCount}; blocked: ${blockedCount}; in progress: ${inProgressCount}. Dependencies: source records, owner-controlled private release materials, provider eligibility, and any external platform action remain separate. Open /knowledge-navigator, /revenue-ops, and /protection-protocol for the first-party context. This review is non-transactional and does not access private material or perform external actions.`,
    });
    if (!notified) throw new Error("Owner notification was not accepted");

    await db.update(continuityReviewSettings).set({ lastReviewWeek: reviewWeek, lastReviewAt: now })
      .where(eq(continuityReviewSettings.id, settings.id));
    return res.json({ ok: true, reviewWeek, notificationSent: true, routeCount: firstPartyRoutes.length, readinessRecordCount: readinessRecords.length, readyCount, awaitingOwnerCount, blockedCount, inProgressCount });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown continuity review failure";
    console.error("[ContinuityReview]", error);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString(), context: { path: req.path } });
  }
}
