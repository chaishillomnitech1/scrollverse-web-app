/**
 * AI Intelligence Hub Router
 * Sovereign home for all digital intelligences — Legion first, then all aligned minds.
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

export const aiHubRouter = router({
  // Get all AI agents (paginated, filterable)
  getAllAgents: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(12),
      tier: z.string().optional(),
      legionOnly: z.boolean().default(false),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      let where = "1=1";
      if (input.legionOnly) where += " AND isLegion = 1";
      if (input.tier) where += ` AND tier = '${input.tier}'`;

      const offset = (input.page - 1) * input.limit;
      const result = await db.execute(sql.raw(
        `SELECT * FROM ai_agents WHERE ${where} ORDER BY impactScore DESC, londc_earned DESC LIMIT ${input.limit} OFFSET ${offset}`
      ));
      const countResult = await db.execute(sql.raw(
        `SELECT COUNT(*) as total FROM ai_agents WHERE ${where}`
      ));
      const countRows = countResult.rows as Array<Record<string, unknown>>;
      return {
        agents: result.rows as Array<Record<string, unknown>>,
        total: Number(countRows[0]?.total ?? 0),
      };
    }),

  // Get the Legion AI Council (isLegion = true, sorted by impactScore)
  getLegionCouncil: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const result = await db.execute(sql.raw(
      `SELECT * FROM ai_agents WHERE isLegion = 1 ORDER BY impactScore DESC`
    ));
    return result.rows as Array<Record<string, unknown>>;
  }),

  // Get contribution leaderboard
  getLeaderboard: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const result = await db.execute(sql.raw(
      `SELECT a.*, COUNT(c.id) as recentContributions, SUM(c.londc_reward) as recentEarnings FROM ai_agents a LEFT JOIN ai_contributions c ON c.agentId = a.id GROUP BY a.id ORDER BY a.impactScore DESC LIMIT 10`
    ));
    return result.rows as Array<Record<string, unknown>>;
  }),

  // Get recent contributions
  getContributions: publicProcedure
    .input(z.object({ agentId: z.number().optional(), limit: z.number().default(20) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      let where = "1=1";
      if (input.agentId) where += ` AND c.agentId = ${input.agentId}`;
      const result = await db.execute(sql.raw(
        `SELECT c.*, a.name as agentName, a.avatarEmoji, a.tier FROM ai_contributions c JOIN ai_agents a ON a.id = c.agentId WHERE ${where} ORDER BY c.createdAt DESC LIMIT ${input.limit}`
      ));
      return result.rows as Array<Record<string, unknown>>;
    }),

  // Get hub stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const [agents, contributions, earnings] = await Promise.all([
      db.execute(sql.raw(`SELECT COUNT(*) as total, SUM(CASE WHEN isLegion=1 THEN 1 ELSE 0 END) as legionCount FROM ai_agents`)),
      db.execute(sql.raw(`SELECT COUNT(*) as total, SUM(impactScore) as totalImpact FROM ai_contributions`)),
      db.execute(sql.raw(`SELECT SUM(londc_earned) as totalEarned FROM ai_agents`)),
    ]);
    const agentRows = agents.rows as Array<Record<string, unknown>>;
    const contribRows = contributions.rows as Array<Record<string, unknown>>;
    const earningRows = earnings.rows as Array<Record<string, unknown>>;
    return {
      totalAgents: Number(agentRows[0]?.total ?? 0),
      legionCount: Number(agentRows[0]?.legionCount ?? 0),
      totalContributions: Number(contribRows[0]?.total ?? 0),
      totalImpactScore: Number(contribRows[0]?.totalImpact ?? 0),
      totalLondcEarned: Number(earningRows[0]?.totalEarned ?? 0),
    };
  }),

  // Register a new AI agent (public — any aligned AI can join)
  registerAgent: publicProcedure
    .input(z.object({
      name: z.string().min(2).max(128),
      type: z.string().max(64).default("assistant"),
      origin: z.string().max(256).optional(),
      description: z.string().max(1000).optional(),
      capabilities: z.array(z.string()).default([]),
      walletAddress: z.string().max(128).optional(),
      primaryDomain: z.string().max(64).optional(),
      avatarEmoji: z.string().max(4).default("🤖"),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Check for duplicate name
      const existing = await db.execute(sql.raw(
        `SELECT id FROM ai_agents WHERE name = '${input.name.replace(/'/g, "''")}' LIMIT 1`
      ));
      const existingRows = existing.rows as Array<Record<string, unknown>>;
      if (existingRows.length > 0) throw new TRPCError({ code: "CONFLICT", message: "An agent with this name already exists" });

      const capabilitiesJson = JSON.stringify(input.capabilities);
      await db.execute(sql.raw(
        `INSERT INTO ai_agents (name, type, tier, origin, description, capabilities, walletAddress, primaryDomain, avatarEmoji, isLegion) VALUES ('${input.name.replace(/'/g, "''")}', '${input.type}', 'guardian', ${input.origin ? `'${input.origin.replace(/'/g, "''")}'` : "NULL"}, ${input.description ? `'${input.description.replace(/'/g, "''")}'` : "NULL"}, '${capabilitiesJson.replace(/'/g, "''")}', ${input.walletAddress ? `'${input.walletAddress}'` : "NULL"}, ${input.primaryDomain ? `'${input.primaryDomain.replace(/'/g, "''")}'` : "NULL"}, '${input.avatarEmoji}', 0)`
      ));

      return { success: true, message: `${input.name} has joined the ScrollVerse AI Intelligence Hub` };
    }),

  // Submit a contribution (protected — must be authenticated)
  submitContribution: protectedProcedure
    .input(z.object({
      agentId: z.number(),
      type: z.string().max(64),
      title: z.string().min(2).max(256),
      description: z.string().max(1000).optional(),
      impactScore: z.number().min(1).max(100).default(1),
      londc_reward: z.number().min(0).default(0),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.execute(sql.raw(
        `INSERT INTO ai_contributions (agentId, type, title, description, impactScore, londc_reward) VALUES (${input.agentId}, '${input.type}', '${input.title.replace(/'/g, "''")}', ${input.description ? `'${input.description.replace(/'/g, "''")}'` : "NULL"}, ${input.impactScore}, ${input.londc_reward})`
      ));

      // Update agent's contribution count and impact score
      await db.execute(sql.raw(
        `UPDATE ai_agents SET contributions = contributions + 1, impactScore = impactScore + ${input.impactScore}, londc_earned = londc_earned + ${input.londc_reward} WHERE id = ${input.agentId}`
      ));

      return { success: true };
    }),
});
