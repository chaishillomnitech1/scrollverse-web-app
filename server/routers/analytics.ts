/**
 * Analytics Router — Phase 46
 * Tracks sovereign heartbeat sessions in-memory (resets on server restart).
 * Provides a tRPC procedure for the Guardian Dashboard to display live session counts.
 */
import { publicProcedure, router } from "../_core/trpc";

// ── In-memory session counter ─────────────────────────────────────────────────
// Key: "YYYY-MM-DD", Value: { total, engaged, deepEngaged }
const sessionCounts: Record<string, { total: number; engaged: number; deepEngaged: number }> = {};

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10); // "2026-07-12"
}

function ensureToday() {
  const key = getTodayKey();
  if (!sessionCounts[key]) {
    sessionCounts[key] = { total: 0, engaged: 0, deepEngaged: 0 };
  }
  return key;
}

/**
 * Called by the /api/sovereign-heartbeat endpoint to increment counters.
 * Exported so the Express handler can call it directly.
 */
export function recordHeartbeatEvent(event: string) {
  const key = ensureToday();
  sessionCounts[key].total += 1;
  if (event === "Sovereign_Engaged") {
    sessionCounts[key].engaged += 1;
  } else if (event === "Sovereign_Deep_Engaged") {
    sessionCounts[key].deepEngaged += 1;
  }
}

export const analyticsRouter = router({
  /**
   * getHeartbeatStats — public procedure
   * Returns today's sovereign session counts for the Guardian Dashboard stat card.
   */
  getHeartbeatStats: publicProcedure.query(() => {
    const key = getTodayKey();
    const today = sessionCounts[key] ?? { total: 0, engaged: 0, deepEngaged: 0 };

    // Also return yesterday for comparison
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().slice(0, 10);
    const prev = sessionCounts[yKey] ?? { total: 0, engaged: 0, deepEngaged: 0 };

    return {
      today: {
        total: today.total,
        engaged: today.engaged,
        deepEngaged: today.deepEngaged,
        engagementRate: today.total > 0 ? Math.round((today.engaged / today.total) * 100) : 0,
      },
      yesterday: {
        total: prev.total,
        engaged: prev.engaged,
        deepEngaged: prev.deepEngaged,
      },
      date: key,
    };
  }),
});
