import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { merchantNodes } from "../../drizzle/schema";
import { eq, desc, count, sum } from "drizzle-orm";

export const merchantRouter = router({
  /**
   * Get all merchant nodes (optionally filtered by cluster or status)
   */
  getNodes: publicProcedure
    .input(
      z.object({
        cluster: z.string().optional(),
        status: z.enum(["active", "pending", "inactive", "all"]).default("all"),
        limit: z.number().min(1).max(100).default(50),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const opts = input ?? { status: "all", limit: 50 };

      let query = db.select().from(merchantNodes).orderBy(desc(merchantNodes.createdAt)).$dynamic();

      if (opts.cluster) {
        query = query.where(eq(merchantNodes.cluster, opts.cluster));
      }

      const rows = await query.limit(opts.limit);

      // Filter by status if needed (after fetch for simplicity)
      if (opts.status !== "all") {
        return rows.filter((r) => r.status === opts.status);
      }

      return rows;
    }),

  /**
   * Get aggregate stats for the ScrollPort dashboard
   */
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const [totalResult] = await db.select({ total: count() }).from(merchantNodes);
    const [activeResult] = await db
      .select({ total: count() })
      .from(merchantNodes)
      .where(eq(merchantNodes.status, "active"));
    const [gpvResult] = await db
      .select({ total: sum(merchantNodes.gpvMonthly) })
      .from(merchantNodes)
      .where(eq(merchantNodes.status, "active"));
    const [zakatResult] = await db
      .select({ total: sum(merchantNodes.zakatAmount) })
      .from(merchantNodes)
      .where(eq(merchantNodes.status, "active"));

    // Cluster breakdown
    const allNodes = await db.select({ cluster: merchantNodes.cluster, status: merchantNodes.status }).from(merchantNodes);
    const clusterMap: Record<string, { total: number; active: number }> = {};
    for (const node of allNodes) {
      if (!clusterMap[node.cluster]) clusterMap[node.cluster] = { total: 0, active: 0 };
      clusterMap[node.cluster].total++;
      if (node.status === "active") clusterMap[node.cluster].active++;
    }

    return {
      totalNodes: totalResult?.total ?? 0,
      activeNodes: activeResult?.total ?? 0,
      totalGpvMonthly: Number(gpvResult?.total ?? 0),
      totalZakatDistributed: Number(zakatResult?.total ?? 0),
      clusters: clusterMap,
    };
  }),

  /**
   * Register a new merchant node
   */
  addNode: publicProcedure
    .input(
      z.object({
        businessName: z.string().min(2).max(256),
        ownerName: z.string().min(2).max(256),
        email: z.string().email().optional(),
        city: z.string().min(2).max(128),
        state: z.string().min(2).max(64),
        country: z.string().max(64).default("USA"),
        cluster: z.string().max(64).default("South Jersey"),
        businessType: z.string().max(64).default("Retail"),
        referralCode: z.string().max(32).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const [result] = await db.insert(merchantNodes).values({
        businessName: input.businessName,
        ownerName: input.ownerName,
        email: input.email,
        city: input.city,
        state: input.state,
        country: input.country,
        cluster: input.cluster,
        businessType: input.businessType,
        referralCode: input.referralCode,
        gpvMonthly: 0,
        zakatAmount: 0,
        status: "pending",
        tier: "seed",
      });

      return {
        success: true,
        id: (result as { insertId?: number })?.insertId,
        message: `${input.businessName} is now registered in the ScrollPort network. Welcome to the sovereign merchant empire.`,
      };
    }),

  /**
   * Get recent merchant activations for the Physical Wins Feed
   */
  getRecentActivations: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(10) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const limit = input?.limit ?? 10;
      const rows = await db
        .select()
        .from(merchantNodes)
        .where(eq(merchantNodes.status, "active"))
        .orderBy(desc(merchantNodes.activatedAt))
        .limit(limit);

      return rows;
    }),
});
