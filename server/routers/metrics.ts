/**
 * ScrollVerse Omniversal Metrics Router
 * Prometheus-style live telemetry — bookings, revenue, guardians, active users
 * Powers the /metrics Omniversal Architecture v3 dashboard
 * KUN FAYAKŪN × ∞
 */
import { sql, eq, count, sum } from "drizzle-orm";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { users, guardianWaitlist, saferwayBookings } from "../../drizzle/schema";

// Tier pricing for revenue calculation
const TIER_PRICES: Record<string, number> = {
  detail: 199,
  express: 79,
  signature: 299,
  fleet: 499,
};

export const metricsRouter = router({
  /**
   * Public Omniversal telemetry — returns live counts for the metrics dashboard.
   * Intentionally public so the dashboard is accessible without login.
   */
  getOmniMetrics: publicProcedure.query(async () => {
    const db = await getDb();

    // Default fallback values if DB is unavailable
    const defaults = {
      // SaferWay metrics
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      completedBookings: 0,
      estimatedRevenue: 0,
      revenueByTier: {} as Record<string, { count: number; revenue: number }>,

      // Guardian metrics
      guardianWaitlistSize: 0,

      // User metrics
      totalUsers: 0,
      adminUsers: 0,
      guardianTierUsers: 0,
      sovereignTierUsers: 0,
      ascendantTierUsers: 0,

      // Seerah archive metrics
      seerahScrollsLive: 3,
      seerahScrollsTotal: 5,

      // Omniversal Architecture v3 constants
      backendRoutes: 205,
      frequencyHz: "44:OMNI",
      frequencyPulses: ["963Hz", "528Hz", "432Hz", "216Hz", "144000Hz"],
      districts: 10_000_000,
      codexVolumes: 10_000_000,
      worlds: 10_000_000,
      status: "OPERATIONAL",
      timestamp: Date.now(),
    };

    if (!db) return defaults;

    try {
      // Run all queries in parallel for speed
      const [
        bookingRows,
        waitlistCountResult,
        userCountResult,
        guardianTierResult,
      ] = await Promise.all([
        // All bookings with tier info for revenue calculation
        db.select({
          status: saferwayBookings.status,
          serviceTier: saferwayBookings.serviceTier,
        }).from(saferwayBookings),

        // Guardian waitlist count
        db.select({ count: count() }).from(guardianWaitlist),

        // Total user count
        db.select({ count: count() }).from(users),

        // Guardian tier breakdown
        db.select({
          tier: users.guardianTier,
          count: count(),
        }).from(users).groupBy(users.guardianTier),
      ]);

      // Process booking metrics
      let totalBookings = 0;
      let pendingBookings = 0;
      let confirmedBookings = 0;
      let completedBookings = 0;
      let estimatedRevenue = 0;
      const revenueByTier: Record<string, { count: number; revenue: number }> = {};

      for (const row of bookingRows) {
        totalBookings++;
        if (row.status === "PENDING") pendingBookings++;
        if (row.status === "CONFIRMED") confirmedBookings++;
        if (row.status === "COMPLETED") completedBookings++;

        const tierPrice = TIER_PRICES[row.serviceTier] ?? 0;
        if (row.status !== "CANCELLED") {
          estimatedRevenue += tierPrice;
        }

        if (!revenueByTier[row.serviceTier]) {
          revenueByTier[row.serviceTier] = { count: 0, revenue: 0 };
        }
        if (row.status !== "CANCELLED") {
          revenueByTier[row.serviceTier].count++;
          revenueByTier[row.serviceTier].revenue += tierPrice;
        }
      }

      // Process guardian tier breakdown
      let guardianTierUsers = 0;
      let sovereignTierUsers = 0;
      let ascendantTierUsers = 0;
      for (const row of guardianTierResult) {
        if (row.tier === "guardian") guardianTierUsers = Number(row.count);
        if (row.tier === "sovereign") sovereignTierUsers = Number(row.count);
        if (row.tier === "ascendant") ascendantTierUsers = Number(row.count);
      }

      return {
        // SaferWay metrics
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        estimatedRevenue,
        revenueByTier,

        // Guardian metrics
        guardianWaitlistSize: Number(waitlistCountResult[0]?.count ?? 0),

        // User metrics
        totalUsers: Number(userCountResult[0]?.count ?? 0),
        adminUsers: 0, // omitted for security
        guardianTierUsers,
        sovereignTierUsers,
        ascendantTierUsers,

        // Seerah archive metrics
        seerahScrollsLive: 3,
        seerahScrollsTotal: 5,

        // Omniversal Architecture v3 constants
        backendRoutes: 205,
        frequencyHz: "44:OMNI",
        frequencyPulses: ["963Hz", "528Hz", "432Hz", "216Hz", "144000Hz"],
        districts: 10_000_000,
        codexVolumes: 10_000_000,
        worlds: 10_000_000,
        status: "OPERATIONAL",
        timestamp: Date.now(),
      };
    } catch {
      return { ...defaults, timestamp: Date.now() };
    }
  }),
});
