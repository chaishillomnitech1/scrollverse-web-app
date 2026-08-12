import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { revenueOperationDigestSettings, revenueOperationReadiness } from "../../drizzle/schema";
import type { RevenueOperationReadiness } from "../../drizzle/schema";
import { getDb } from "../db";
import { notifyOwner } from "../_core/notification";
import { sdk } from "../_core/sdk";

const toDayKey = (value: Date) => value.toISOString().slice(0, 10);

export async function revenueOperationsDigestHandler(req: Request, res: Response) {
  try {
    const cronUser = await sdk.authenticateRequest(req);
    if (!cronUser.isCron || !cronUser.taskUid) return res.status(403).json({ error: "cron-only" });

    const db = await getDb();
    if (!db) return res.status(500).json({ error: "revenue operations database unavailable" });
    const [settings] = await db.select().from(revenueOperationDigestSettings)
      .where(eq(revenueOperationDigestSettings.scheduleCronTaskUid, cronUser.taskUid)).limit(1);
    if (!settings || !settings.enabled) return res.json({ ok: true, skipped: "orphan-or-disabled" });

    const now = new Date();
    const dayKey = toDayKey(now);
    if (settings.lastDigestDay === dayKey) return res.json({ ok: true, skipped: "already-delivered", dayKey });

    const records: RevenueOperationReadiness[] = await db.select().from(revenueOperationReadiness);
    const ready = records.filter(record => record.readinessStatus === "READY").length;
    const awaitingOwner = records.filter(record => record.readinessStatus === "AWAITING_OWNER").length;
    const blocked = records.filter(record => record.readinessStatus === "BLOCKED").length;
    const inProgress = records.filter(record => record.readinessStatus === "IN_PROGRESS").length;

    const notified = await notifyOwner({
      title: `Revenue Operations review: ${records.length} readiness record${records.length === 1 ? "" : "s"}`,
      content: `Daily non-transactional review for ${dayKey}. Ready: ${ready}; awaiting owner: ${awaitingOwner}; blocked: ${blocked}; in progress: ${inProgress}. Open /revenue-ops to review source-labelled evidence and named next actions. This digest does not initiate charges, payouts, token actions, provider changes, or deployments.`,
    });
    if (!notified) throw new Error("Owner notification was not accepted");

    await db.update(revenueOperationDigestSettings).set({ lastDigestDay: dayKey, lastDigestAt: now })
      .where(eq(revenueOperationDigestSettings.id, settings.id));
    return res.json({ ok: true, dayKey, notificationSent: true, recordCount: records.length, ready, awaitingOwner, blocked, inProgress });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Revenue Operations digest failure";
    console.error("[RevenueOperationsDigest]", error);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString(), context: { path: req.path } });
  }
}
