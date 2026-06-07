/**
 * Heartbeat Router — Scheduled Job Endpoints
 * Called by Manus schedule (daily cron) or manually via admin.
 * Secured with BUILT_IN_FORGE_API_KEY to prevent unauthorized triggering.
 */
import { Router } from "express";
import { compoundStakingRewards } from "./compoundRewards";
import { notifyOwner } from "../_core/notification";

export const heartbeatRouter = Router();

// Middleware: verify the request is from a trusted source
heartbeatRouter.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const expectedKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
});

/**
 * POST /api/heartbeat/compound-rewards
 * Compounds daily staking rewards for all active positions.
 * Trigger: daily cron via Manus schedule
 */
heartbeatRouter.post("/compound-rewards", async (req, res) => {
  try {
    const result = await compoundStakingRewards();

    // Notify owner of daily compound summary
    await notifyOwner({
      title: "⚡ Daily Staking Compound Complete",
      content: `Processed ${result.processed} positions. Total new rewards distributed: ${result.totalNewRewards.toFixed(4)} CHX.${result.errors.length > 0 ? ` Errors: ${result.errors.join(", ")}` : ""}`,
    });

    res.json({
      success: true,
      processed: result.processed,
      totalNewRewards: result.totalNewRewards,
      errors: result.errors,
    });
  } catch (err) {
    console.error("[Heartbeat] compound-rewards error:", err);
    res.status(500).json({ error: String(err) });
  }
});

/**
 * GET /api/heartbeat/health
 * Simple health check for the heartbeat system.
 */
heartbeatRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
