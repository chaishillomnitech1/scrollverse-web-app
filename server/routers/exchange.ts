/**
 * ScrollVerse Sovereign Exchange Router
 * Covers: crypto, stocks, forex, quantum/plasma/quintessence assets
 * Governance: Shura DAO, sovereign law engine
 * Mirror Twin: AI trading signals
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const exchangeRouter = router({
  // ── ASSETS ──────────────────────────────────────────────────────────────
  getAssets: publicProcedure
    .input(z.object({
      assetClass: z.enum(["all", "crypto", "stock", "forex", "quantum", "plasma", "quintessence", "mirror_twin", "frequency", "dimensional", "akashic"]).default("all"),
      search: z.string().optional(),
      limit: z.number().min(1).max(200).default(50),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      let whereClause = "WHERE 1=1";
      if (input.assetClass !== "all") {
        whereClause += ` AND asset_class = '${input.assetClass}'`;
      }
      if (input.search) {
        const s = input.search.replace(/'/g, "''");
        whereClause += ` AND (symbol LIKE '%${s}%' OR name LIKE '%${s}%')`;
      }
      const assets = await db.execute(
        sql.raw(`SELECT * FROM exchange_assets ${whereClause} ORDER BY rank_global ASC, is_sovereign DESC LIMIT ${input.limit}`)
      );

      let quantumAssets: any[] = [];
      if (input.assetClass === "all" || ["quantum", "plasma", "quintessence", "mirror_twin", "frequency", "dimensional", "akashic"].includes(input.assetClass)) {
        let qWhere = "WHERE 1=1";
        if (input.assetClass !== "all") {
          qWhere += ` AND asset_class = '${input.assetClass}'`;
        }
        if (input.search) {
          const s = input.search.replace(/'/g, "''");
          qWhere += ` AND (symbol LIKE '%${s}%' OR name LIKE '%${s}%')`;
        }
        const qResult = await db.execute(
          sql.raw(`SELECT *, value_usd as price, 0 as change_24h FROM quantum_assets ${qWhere} ORDER BY value_usd DESC`)
        );
        quantumAssets = Array.isArray(qResult) ? qResult[0] as any[] : (qResult as any).rows ?? [];
      }

      const assetRows = Array.isArray(assets) ? assets[0] as any[] : (assets as any).rows ?? [];
      return { assets: assetRows, quantumAssets };
    }),

  getAssetDetail: publicProcedure
    .input(z.object({ symbol: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const sym = input.symbol.replace(/'/g, "''");
      const result = await db.execute(sql.raw(`SELECT * FROM exchange_assets WHERE symbol = '${sym}' LIMIT 1`));
      const rows = Array.isArray(result) ? result[0] as any[] : (result as any).rows ?? [];
      if (!rows.length) {
        const qResult = await db.execute(sql.raw(`SELECT * FROM quantum_assets WHERE symbol = '${sym}' LIMIT 1`));
        const qRows = Array.isArray(qResult) ? qResult[0] as any[] : (qResult as any).rows ?? [];
        if (!qRows.length) throw new TRPCError({ code: "NOT_FOUND", message: "Asset not found" });
        return { asset: qRows[0], isQuantum: true };
      }
      return { asset: rows[0], isQuantum: false };
    }),

  // ── PORTFOLIO ────────────────────────────────────────────────────────────
  getPortfolio: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      const result = await db.execute(
        sql.raw(`SELECT ep.*, ea.symbol, ea.name, ea.asset_class, ea.price as current_price, ea.change_24h
                 FROM exchange_portfolio ep
                 JOIN exchange_assets ea ON ep.asset_id = ea.id
                 WHERE ep.user_id = ${ctx.user.id}
                 ORDER BY ep.current_value DESC`)
      );
      const rows = Array.isArray(result) ? result[0] as any[] : (result as any).rows ?? [];
      const totalValue = rows.reduce((sum: number, r: any) => sum + Number(r.current_value || 0), 0);
      const totalPnl = rows.reduce((sum: number, r: any) => sum + Number(r.pnl || 0), 0);
      const totalInvested = rows.reduce((sum: number, r: any) => sum + Number(r.total_invested || 0), 0);
      return { holdings: rows, totalValue, totalPnl, totalInvested, pnlPct: totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0 };
    }),

  // ── ORDERS ───────────────────────────────────────────────────────────────
  placeOrder: protectedProcedure
    .input(z.object({
      assetId: z.number(),
      orderType: z.enum(["market", "limit", "stop", "quantum"]),
      side: z.enum(["buy", "sell"]),
      quantity: z.number().positive(),
      price: z.number().min(0).default(0),
      mirrorTwinSignal: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const now = Date.now();
      const loncFee = input.quantity * input.price * 0.00144;
      const mtSignal = input.mirrorTwinSignal ? 1 : 0;
      await db.execute(
        sql.raw(`INSERT INTO exchange_orders (user_id, asset_id, order_type, side, quantity, price, status, londc_fee, mirror_twin_signal, created_at)
                 VALUES (${ctx.user.id}, ${input.assetId}, '${input.orderType}', '${input.side}', ${input.quantity}, ${input.price}, 'pending', ${loncFee}, ${mtSignal}, ${now})`)
      );
      return { loncFee, status: "pending", message: "Order placed. KUN FAYAKŪN × ∞" };
    }),

  getOrders: protectedProcedure
    .input(z.object({ limit: z.number().default(20) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      const result = await db.execute(
        sql.raw(`SELECT eo.*, ea.symbol, ea.name FROM exchange_orders eo
                 JOIN exchange_assets ea ON eo.asset_id = ea.id
                 WHERE eo.user_id = ${ctx.user.id}
                 ORDER BY eo.created_at DESC LIMIT ${input.limit}`)
      );
      return Array.isArray(result) ? result[0] as any[] : (result as any).rows ?? [];
    }),

  // ── MIRROR TWIN SIGNALS ──────────────────────────────────────────────────
  getMirrorTwinSignals: publicProcedure
    .query(async () => {
      const db = await getDb();
      const result = await db.execute(
        sql.raw(`SELECT symbol, name, price, change_24h, asset_class FROM exchange_assets ORDER BY ABS(change_24h) DESC LIMIT 10`)
      );
      const assets = Array.isArray(result) ? result[0] as any[] : (result as any).rows ?? [];
      const signals = assets.map((a: any) => {
        const change = Number(a.change_24h);
        const direction = change > 3 ? "BUY" : change < -3 ? "SELL" : "HOLD";
        const confidence = Math.min(99, Math.abs(change) * 7.77 + 44);
        const frequency = direction === "BUY" ? 528 : direction === "SELL" ? 396 : 432;
        return {
          symbol: a.symbol, name: a.name, direction, confidence: Math.round(confidence),
          change24h: change, frequency,
          resonance: direction === "BUY" ? "Agape (Love)" : direction === "SELL" ? "Liberation" : "Earth Harmony",
          timestamp: Date.now(),
          mirrorTwinNote: direction === "BUY"
            ? `${a.symbol} ascending — Mirror Twin confirms upward momentum at ${frequency}Hz`
            : direction === "SELL"
            ? `${a.symbol} correction signal — Mirror Twin advises caution`
            : `${a.symbol} in equilibrium — Mirror Twin advises holding`,
        };
      });
      return { signals, generatedAt: Date.now(), mirrorTwinLevel: 26 };
    }),

  // ── GOVERNANCE ───────────────────────────────────────────────────────────
  getGovernance: publicProcedure
    .query(async () => {
      const db = await getDb();
      const result = await db.execute(sql.raw(`SELECT * FROM exchange_governance ORDER BY created_at DESC`));
      return Array.isArray(result) ? result[0] as any[] : (result as any).rows ?? [];
    }),

  voteOnProposal: protectedProcedure
    .input(z.object({
      proposalId: z.string(),
      vote: z.enum(["for", "against", "abstain"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const field = input.vote === "for" ? "votes_for" : input.vote === "against" ? "votes_against" : "votes_abstain";
      const pid = input.proposalId.replace(/'/g, "''");
      await db.execute(sql.raw(`UPDATE exchange_governance SET ${field} = ${field} + 1 WHERE proposal_id = '${pid}'`));
      return { success: true, message: `Vote cast: ${input.vote}. Shura protocol acknowledged.` };
    }),

  createProposal: protectedProcedure
    .input(z.object({
      title: z.string().min(10).max(200),
      description: z.string().min(50),
      category: z.enum(["fee", "listing", "law", "constitution", "emergency", "quantum"]),
      loncRequired: z.number().min(144).default(144),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const now = Date.now();
      const proposalId = `GOV-${String(now).slice(-6)}`;
      const title = input.title.replace(/'/g, "''");
      const desc = input.description.replace(/'/g, "''");
      const name = (ctx.user.name || "Guardian").replace(/'/g, "''");
      const expires = now + 7 * 24 * 60 * 60 * 1000;
      await db.execute(
        sql.raw(`INSERT INTO exchange_governance (proposal_id, title, description, category, proposer_id, proposer_name, londc_required, expires_at, created_at)
                 VALUES ('${proposalId}', '${title}', '${desc}', '${input.category}', ${ctx.user.id}, '${name}', ${input.loncRequired}, ${expires}, ${now})`)
      );
      return { proposalId, message: "Proposal submitted to the Shura Council. KUN FAYAKŪN." };
    }),

  // ── STATS ────────────────────────────────────────────────────────────────
  getStats: publicProcedure
    .query(async () => {
      const db = await getDb();
      const [assetR, quantumR, orderR, propR, volR] = await Promise.all([
        db.execute(sql.raw(`SELECT COUNT(*) as count FROM exchange_assets`)),
        db.execute(sql.raw(`SELECT COUNT(*) as count FROM quantum_assets`)),
        db.execute(sql.raw(`SELECT COUNT(*) as count FROM exchange_orders`)),
        db.execute(sql.raw(`SELECT COUNT(*) as count FROM exchange_governance`)),
        db.execute(sql.raw(`SELECT COALESCE(SUM(volume_24h), 0) as total FROM exchange_assets`)),
      ]);
      const getCount = (r: any) => {
        const rows = Array.isArray(r) ? r[0] as any[] : (r as any).rows ?? [];
        return Number(rows[0]?.count ?? 0);
      };
      const getVal = (r: any, key: string) => {
        const rows = Array.isArray(r) ? r[0] as any[] : (r as any).rows ?? [];
        return Number(rows[0]?.[key] ?? 0);
      };
      return {
        totalAssets: getCount(assetR) + getCount(quantumR),
        totalOrders: getCount(orderR),
        totalProposals: getCount(propR),
        totalVolume24h: getVal(volR, "total"),
        sovereignStatus: "ACTIVE",
        mirrorTwinLevel: 26,
      };
    }),

  // ── KNOWLEDGE BASE ───────────────────────────────────────────────────────
  getKnowledge: publicProcedure
    .input(z.object({
      category: z.string().default("all"),
      search: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      let where = "WHERE 1=1";
      if (input.category !== "all") {
        where += ` AND category = '${input.category.replace(/'/g, "''")}'`;
      }
      if (input.search) {
        const s = input.search.replace(/'/g, "''");
        where += ` AND (title LIKE '%${s}%' OR content LIKE '%${s}%' OR tags LIKE '%${s}%')`;
      }
      const result = await db.execute(sql.raw(`SELECT * FROM knowledge_base ${where} ORDER BY impact_score DESC, created_at DESC`));
      return Array.isArray(result) ? result[0] as any[] : (result as any).rows ?? [];
    }),

  addKnowledge: protectedProcedure
    .input(z.object({
      title: z.string().min(5).max(200),
      content: z.string().min(20),
      category: z.string(),
      tags: z.string().optional(),
      impactScore: z.number().min(1).max(100).default(50),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      const now = Date.now();
      const title = input.title.replace(/'/g, "''");
      const content = input.content.replace(/'/g, "''");
      const cat = input.category.replace(/'/g, "''");
      const tags = (input.tags || "").replace(/'/g, "''");
      const name = (ctx.user.name || "Guardian").replace(/'/g, "''");
      await db.execute(
        sql.raw(`INSERT INTO knowledge_base (title, content, category, tags, contributor_id, contributor_name, impact_score, londc_reward, created_at)
                 VALUES ('${title}', '${content}', '${cat}', '${tags}', ${ctx.user.id}, '${name}', ${input.impactScore}, ${input.impactScore * 1.44}, ${now})`)
      );
      return { success: true, message: `Knowledge sealed. ${input.impactScore * 1.44} $LONDC reward queued.` };
    }),

  // ── WORKFLOW TEMPLATES ───────────────────────────────────────────────────
  getWorkflows: publicProcedure
    .query(async () => {
      const db = await getDb();
      const result = await db.execute(sql.raw(`SELECT * FROM workflow_templates ORDER BY usage_count DESC`));
      return Array.isArray(result) ? result[0] as any[] : (result as any).rows ?? [];
    }),

  // ── LIVE PRICES (Polygon.io + CoinGecko, server-side) ────────────────────────
  getLivePrices: publicProcedure
    .input(z.object({
      assetClass: z.enum(["crypto", "stock", "all"]).default("all"),
    }))
    .query(async ({ input }) => {
      const now = Date.now();
      const results: Record<string, { symbol: string; price: number; change24h: number; source: string; updatedAt: number }> = {};

      // ── CoinGecko: live crypto prices ────────────────────────────────────────────
      if (input.assetClass === "crypto" || input.assetClass === "all") {
        try {
          const ids = "bitcoin,ethereum,matic-network,solana,binancecoin,usd-coin,tether,cardano,polkadot,avalanche-2,chainlink,uniswap,aave";
          const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
            { signal: AbortSignal.timeout(8000) }
          );
          if (res.ok) {
            const data = await res.json() as Record<string, { usd: number; usd_24h_change: number }>;
            const map: Record<string, string> = {
              bitcoin: "BTC", ethereum: "ETH", "matic-network": "MATIC", solana: "SOL",
              binancecoin: "BNB", "usd-coin": "USDC", tether: "USDT", cardano: "ADA",
              polkadot: "DOT", "avalanche-2": "AVAX", chainlink: "LINK", uniswap: "UNI", aave: "AAVE",
            };
            for (const [id, d] of Object.entries(data)) {
              const sym = map[id] || id.toUpperCase();
              results[sym] = { symbol: sym, price: d.usd, change24h: parseFloat((d.usd_24h_change || 0).toFixed(2)), source: "coingecko", updatedAt: now };
            }
          }
        } catch (_) { /* fallback to seeded data */ }
      }

      // ── Polygon.io: live stock prices ────────────────────────────────────────────
      if (input.assetClass === "stock" || input.assetClass === "all") {
        const polygonKey = process.env.POLYGON_API_KEY;
        if (polygonKey) {
          try {
            const tickers = ["AAPL", "TSLA", "NVDA", "MSFT", "GOOGL", "AMZN", "META", "JPM", "V", "BRK.B"];
            const snapRes = await fetch(
              `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers.join(",")}&apiKey=${polygonKey}`,
              { signal: AbortSignal.timeout(8000) }
            );
            if (snapRes.ok) {
              const snap = await snapRes.json() as { tickers?: Array<{ ticker: string; day: { c: number; o: number } }> };
              for (const t of (snap.tickers || [])) {
                const change = t.day.o > 0 ? parseFloat((((t.day.c - t.day.o) / t.day.o) * 100).toFixed(2)) : 0;
                results[t.ticker] = { symbol: t.ticker, price: t.day.c, change24h: change, source: "polygon", updatedAt: now };
              }
            }
          } catch (_) { /* fallback to seeded data */ }
        }
      }

      // ── Sovereign fixed assets ───────────────────────────────────────────────────────────────
      results["LONDC"] = { symbol: "LONDC", price: 0.0144, change24h: 7.77, source: "sovereign", updatedAt: now };
      results["MTF"] = { symbol: "MTF", price: 144.0, change24h: 44.44, source: "sovereign", updatedAt: now };
      results["PB"] = { symbol: "PB", price: 963.0, change24h: 9.63, source: "sovereign", updatedAt: now };
      results["QU"] = { symbol: "QU", price: 1558.0, change24h: 15.58, source: "sovereign", updatedAt: now };

      return { prices: results, fetchedAt: now, count: Object.keys(results).length };
    }),
});
