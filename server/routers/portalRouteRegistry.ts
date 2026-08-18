import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { parse as parseCookie } from "cookie";
import { z } from "zod";
import { portalRouteRefreshRuns, portalRouteRefreshSettings } from "../../drizzle/schema";
import { COOKIE_NAME } from "@shared/const";
import { getDb } from "../db";
import { createHeartbeatJob, updateHeartbeatJob } from "../_core/heartbeat";
import { protectedProcedure, router } from "../_core/trpc";
import { PORTAL_ROUTE_REFRESH_KEY, refreshPortalRouteRegistry } from "../portalRouteRegistry";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Portal route refresh controls require administrator access." });
  return next({ ctx });
});

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Portal route registry storage is unavailable." });
  return db;
}

async function getOrCreateSettings(db: Awaited<ReturnType<typeof requireDb>>) {
  const [existing] = await db.select().from(portalRouteRefreshSettings).where(eq(portalRouteRefreshSettings.settingsKey, PORTAL_ROUTE_REFRESH_KEY)).limit(1);
  if (existing) return existing;
  await db.insert(portalRouteRefreshSettings).values({ settingsKey: PORTAL_ROUTE_REFRESH_KEY, enabled: false });
  const [created] = await db.select().from(portalRouteRefreshSettings).where(eq(portalRouteRefreshSettings.settingsKey, PORTAL_ROUTE_REFRESH_KEY)).limit(1);
  if (!created) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Portal route refresh settings could not be created." });
  return created;
}

function manualRefreshKey() {
  return `manual:${new Date().toISOString()}`;
}

export const portalRouteRegistryRouter = router({
  getStatus: adminProcedure.query(async () => {
    const db = await requireDb();
    const settings = await getOrCreateSettings(db);
    const runs = await db.select().from(portalRouteRefreshRuns).where(eq(portalRouteRefreshRuns.settingsId, settings.id)).orderBy(desc(portalRouteRefreshRuns.createdAt)).limit(20);
    return { settings, runs, boundary: "The refresh inventory writes portal-owned route metadata only. Scheduling is created only after deployment; it does not publish, send, mint, list, price, sell, or activate any external service." };
  }),

  refreshNow: adminProcedure.mutation(async () => {
    const db = await requireDb();
    const settings = await getOrCreateSettings(db);
    const outcome = await refreshPortalRouteRegistry(db);
    const now = new Date();
    await db.insert(portalRouteRefreshRuns).values({ settingsId: settings.id, refreshKey: manualRefreshKey(), taskUid: null, ...outcome });
    await db.update(portalRouteRefreshSettings).set({ lastRefreshAt: now }).where(eq(portalRouteRefreshSettings.id, settings.id));
    return outcome;
  }),

  configureSchedule: adminProcedure.input(z.object({ cron: z.string().trim().regex(/^\d+\s+\d+\s+\d+\s+(?:\*|\d+)\s+(?:\*|\d+)\s+(?:\*|\d+)$/, "Use a six-field UTC cron expression, for example: 0 15 5 * * *") })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const settings = await getOrCreateSettings(db);
    const sessionToken = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? "";
    if (!sessionToken) throw new TRPCError({ code: "UNAUTHORIZED", message: "A signed-in administrator session is required to create a portal refresh schedule." });

    if (settings.scheduleCronTaskUid) {
      const updated = await updateHeartbeatJob(settings.scheduleCronTaskUid, { cron: input.cron, path: "/api/scheduled/portal-route-refresh", method: "POST", payload: {}, description: "Deterministic ScrollVerse public route metadata refresh. No external publishing, commerce, token, wallet, or provider action.", enable: true }, sessionToken);
      await db.update(portalRouteRefreshSettings).set({ cronExpression: input.cron, enabled: true }).where(eq(portalRouteRefreshSettings.id, settings.id));
      return { taskUid: settings.scheduleCronTaskUid, nextExecutionAt: updated.nextExecutionAt ?? null, updated: true };
    }

    const created = await createHeartbeatJob({ name: "scrollverse-public-route-refresh", cron: input.cron, path: "/api/scheduled/portal-route-refresh", method: "POST", payload: {}, description: "Deterministic ScrollVerse public route metadata refresh. No external publishing, commerce, token, wallet, or provider action." }, sessionToken);
    await db.update(portalRouteRefreshSettings).set({ scheduleCronTaskUid: created.taskUid, cronExpression: input.cron, enabled: true }).where(eq(portalRouteRefreshSettings.id, settings.id));
    return { taskUid: created.taskUid, nextExecutionAt: created.nextExecutionAt ?? null, updated: false };
  }),

  pauseSchedule: adminProcedure.mutation(async ({ ctx }) => {
    const db = await requireDb();
    const settings = await getOrCreateSettings(db);
    if (!settings.scheduleCronTaskUid) return { paused: false, reason: "No scheduled route refresh exists." };
    const sessionToken = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? "";
    if (!sessionToken) throw new TRPCError({ code: "UNAUTHORIZED", message: "A signed-in administrator session is required to pause a portal refresh schedule." });
    await updateHeartbeatJob(settings.scheduleCronTaskUid, { enable: false }, sessionToken);
    await db.update(portalRouteRefreshSettings).set({ enabled: false }).where(eq(portalRouteRefreshSettings.id, settings.id));
    return { paused: true, taskUid: settings.scheduleCronTaskUid };
  }),
});
