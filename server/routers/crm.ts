/**
 * CRM + Sales Analytics Router — Owner-Only
 * Internal dashboard for contact management and revenue analytics
 */
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { ENV } from "../_core/env";

// Owner guard middleware
const ownerProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.openId !== ENV.ownerOpenId) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Sovereign access only" });
  }
  return next({ ctx });
});

export const crmRouter = router({
  // Get all contacts with pagination
  getContacts: ownerProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
      status: z.string().optional(),
      tier: z.string().optional(),
      source: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const offset = (input.page - 1) * input.limit;

      let whereClause = "WHERE 1=1";
      if (input.status) whereClause += ` AND status = '${input.status}'`;
      if (input.tier) whereClause += ` AND tier = '${input.tier}'`;
      if (input.source) whereClause += ` AND source = '${input.source}'`;

      const contacts = await db.execute(
        sql.raw(`SELECT * FROM crm_contacts ${whereClause} ORDER BY createdAt DESC LIMIT ${input.limit} OFFSET ${offset}`)
      );

      const countResult = await db.execute(
        sql.raw(`SELECT COUNT(*) as total FROM crm_contacts ${whereClause}`)
      );

      const rows = contacts.rows as Array<Record<string, unknown>>;
      const countRows = countResult.rows as Array<Record<string, unknown>>;
      const total = Number(countRows[0]?.total ?? 0);

      return {
        contacts: rows,
        total,
        pages: Math.ceil(total / input.limit),
        page: input.page,
      };
    }),

  // Add a new contact
  addContact: ownerProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      tier: z.enum(["lead", "guardian", "sovereign", "ascendant", "legion"]).default("lead"),
      source: z.enum(["waitlist", "token_store", "academy", "books", "nft_mint", "referral", "direct", "social"]).default("direct"),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.execute(
        sql.raw(`INSERT INTO crm_contacts (name, email, phone, tier, source, notes) VALUES ('${input.name.replace(/'/g, "''")}', '${input.email}', ${input.phone ? `'${input.phone}'` : "NULL"}, '${input.tier}', '${input.source}', ${input.notes ? `'${input.notes.replace(/'/g, "''")}'` : "NULL"})`)
      );

      return { success: true };
    }),

  // Update contact status
  updateContact: ownerProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["new", "contacted", "qualified", "converted", "churned"]).optional(),
      tier: z.enum(["lead", "guardian", "sovereign", "ascendant", "legion"]).optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const updates: string[] = [];
      if (input.status) updates.push(`status = '${input.status}'`);
      if (input.tier) updates.push(`tier = '${input.tier}'`);
      if (input.notes !== undefined) updates.push(`notes = '${input.notes.replace(/'/g, "''")}'`);

      if (updates.length === 0) return { success: true };

      await db.execute(
        sql.raw(`UPDATE crm_contacts SET ${updates.join(", ")} WHERE id = ${input.id}`)
      );

      return { success: true };
    }),

  // Sales analytics — revenue by source, tier, time period
  getSalesAnalytics: ownerProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    // Total revenue
    const totalRevResult = await db.execute(
      sql.raw(`SELECT SUM(amountCents) as total, COUNT(*) as count FROM sales_events WHERE type = 'purchase'`)
    );

    // Revenue by source
    const bySourceResult = await db.execute(
      sql.raw(`SELECT source, SUM(amountCents) as total, COUNT(*) as count FROM sales_events WHERE type = 'purchase' GROUP BY source ORDER BY total DESC`)
    );

    // Revenue by type (all 5 streams)
    const byTypeResult = await db.execute(
      sql.raw(`SELECT type, SUM(amountCents) as total, COUNT(*) as count FROM sales_events GROUP BY type ORDER BY total DESC`)
    );

    // Revenue by product
    const byProductResult = await db.execute(
      sql.raw(`SELECT product, SUM(amountCents) as total, COUNT(*) as count FROM sales_events WHERE type = 'purchase' GROUP BY product ORDER BY total DESC LIMIT 10`)
    );

    // Contact pipeline stats
    const pipelineResult = await db.execute(
      sql.raw(`SELECT status, tier, COUNT(*) as count FROM crm_contacts GROUP BY status, tier ORDER BY status, tier`)
    );

    // Total contacts by tier
    const tierResult = await db.execute(
      sql.raw(`SELECT tier, COUNT(*) as count, SUM(totalSpentCents) as totalSpent FROM crm_contacts GROUP BY tier ORDER BY totalSpent DESC`)
    );

    // Recent 30 days revenue (daily breakdown)
    const dailyResult = await db.execute(
      sql.raw(`SELECT DATE(createdAt) as day, SUM(amountCents) as total, COUNT(*) as count FROM sales_events WHERE type = 'purchase' AND createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY DATE(createdAt) ORDER BY day ASC`)
    );

    // Zakat distributed
    const zakatResult = await db.execute(
      sql.raw(`SELECT SUM(amountCents) as total, COUNT(*) as count FROM sales_events WHERE type = 'zakat'`)
    );

    // $LONDC distributed
    const londcResult = await db.execute(
      sql.raw(`SELECT SUM(londcAmount) as total FROM sales_events`)
    );

    const totalRevRows = totalRevResult.rows as Array<Record<string, unknown>>;
    const zakatRows = zakatResult.rows as Array<Record<string, unknown>>;
    const londcRows = londcResult.rows as Array<Record<string, unknown>>;

    const totalRevenueCents = Number(totalRevRows[0]?.total ?? 0);
    const totalTransactions = Number(totalRevRows[0]?.count ?? 0);
    const zakatDistributed = Number(zakatRows[0]?.total ?? 0);
    const londcDistributed = Number(londcRows[0]?.total ?? 0);

    // Predictive forecast — simple linear projection based on last 7 days
    const last7Result = await db.execute(
      sql.raw(`SELECT SUM(amountCents) as total FROM sales_events WHERE type = 'purchase' AND createdAt >= DATE_SUB(NOW(), INTERVAL 7 DAY)`)
    );
    const last7Rows = last7Result.rows as Array<Record<string, unknown>>;
    const last7Total = Number(last7Rows[0]?.total ?? 0);
    const dailyAvg = last7Total / 7;

    return {
      summary: {
        totalRevenueCents,
        totalTransactions,
        zakatDistributed,
        londcDistributed,
        avgOrderValueCents: totalTransactions > 0 ? Math.round(totalRevenueCents / totalTransactions) : 0,
      },
      forecast: {
        next7DaysCents: Math.round(dailyAvg * 7),
        next30DaysCents: Math.round(dailyAvg * 30),
        next90DaysCents: Math.round(dailyAvg * 90),
        dailyAvgCents: Math.round(dailyAvg),
      },
      bySource: bySourceResult.rows as Array<Record<string, unknown>>,
      byType: byTypeResult.rows as Array<Record<string, unknown>>,
      byProduct: byProductResult.rows as Array<Record<string, unknown>>,
      pipeline: pipelineResult.rows as Array<Record<string, unknown>>,
      tierBreakdown: tierResult.rows as Array<Record<string, unknown>>,
      dailyRevenue: dailyResult.rows as Array<Record<string, unknown>>,
    };
  }),

  // Export contacts as CSV data
  exportContacts: ownerProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const result = await db.execute(
      sql.raw(`SELECT name, email, phone, tier, source, status, totalSpentCents, notes, createdAt FROM crm_contacts ORDER BY createdAt DESC`)
    );

    return { rows: result.rows as Array<Record<string, unknown>> };
  }),
});
