import type { Request, Response } from "express";
import { desc, eq } from "drizzle-orm";
import { portalRouteRefreshRuns, portalRouteRefreshSettings } from "../../drizzle/schema";
import { getDb } from "../db";
import { PORTAL_ROUTE_REFRESH_KEY, refreshPortalRouteRegistry } from "../portalRouteRegistry";
import { sdk } from "../_core/sdk";

function refreshKey(taskUid: string, date: Date) {
  return `${taskUid}:${date.toISOString().slice(0, 10)}`;
}

export async function portalRouteRefreshHandler(req: Request, res: Response) {
  try {
    const cronUser = await sdk.authenticateRequest(req);
    if (!cronUser.isCron || !cronUser.taskUid) return res.status(403).json({ error: "cron-only" });
    const db = await getDb();
    if (!db) return res.status(500).json({ error: "portal route refresh database unavailable" });

    const [settings] = await db.select().from(portalRouteRefreshSettings)
      .where(eq(portalRouteRefreshSettings.scheduleCronTaskUid, cronUser.taskUid)).limit(1);
    if (!settings || settings.settingsKey !== PORTAL_ROUTE_REFRESH_KEY || !settings.enabled) return res.json({ ok: true, skipped: "orphan-or-disabled" });

    const now = new Date();
    const key = refreshKey(cronUser.taskUid, now);
    const [existingRun] = await db.select().from(portalRouteRefreshRuns).where(eq(portalRouteRefreshRuns.refreshKey, key)).orderBy(desc(portalRouteRefreshRuns.createdAt)).limit(1);
    if (existingRun) return res.json({ ok: true, skipped: "already-refreshed", refreshKey: key, routeCount: existingRun.routeCount });

    const outcome = await refreshPortalRouteRegistry(db);
    await db.insert(portalRouteRefreshRuns).values({ settingsId: settings.id, refreshKey: key, taskUid: cronUser.taskUid, ...outcome });
    await db.update(portalRouteRefreshSettings).set({ lastRefreshAt: now }).where(eq(portalRouteRefreshSettings.id, settings.id));
    return res.json({ ok: true, refreshKey: key, ...outcome });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown portal route refresh failure";
    console.error("[PortalRouteRefresh]", error);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString(), context: { path: req.path } });
  }
}
