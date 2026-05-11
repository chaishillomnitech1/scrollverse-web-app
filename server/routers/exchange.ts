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

  // ── LIVE STOCK PRICES (Polygon.io) ──────────────────────────────────────
  getLiveStockPrices: publicProcedure
    .input(z.object({ symbols: z.array(z.string()).optional() }).optional())
    .query(async ({ input }) => {
      const TOP_STOCKS = ["AAPL","TSLA","NVDA","MSFT","GOOGL","AMZN","META","JPM","V","JNJ","WMT","PG","MA","UNH","HD","CVX","LLY","ABBV","MRK","PEP","KO","AVGO","COST","TMO","MCD","ACN","BAC","NFLX","ADBE","BRK.B"];
      const symbols = input?.symbols ?? TOP_STOCKS;
      const apiKey = process.env.POLYGON_API_KEY;
      const results: Record<string, { symbol: string; price: number; change: number; changePercent: number; volume: number; high: number; low: number; open: number; close: number; source: string }> = {};
      if (apiKey) {
        try {
          const tickerList = symbols.slice(0, 30).join(",");
          const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickerList}&apiKey=${apiKey}`;
          const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
          if (res.ok) {
            const data = await res.json() as { tickers?: Array<{ ticker: string; day: { c: number; o: number; h: number; l: number; v: number }; prevDay: { c: number }; todaysChangePerc: number; todaysChange: number }> };
            for (const t of (data.tickers ?? [])) {
              results[t.ticker] = { symbol: t.ticker, price: t.day?.c ?? t.prevDay?.c ?? 0, change: parseFloat((t.todaysChange ?? 0).toFixed(2)), changePercent: parseFloat((t.todaysChangePerc ?? 0).toFixed(2)), volume: t.day?.v ?? 0, high: t.day?.h ?? 0, low: t.day?.l ?? 0, open: t.day?.o ?? 0, close: t.day?.c ?? t.prevDay?.c ?? 0, source: "polygon" };
            }
          }
        } catch (_) { /* fallback */ }
      }
      const MOCK: Record<string, number> = { AAPL: 213.49, TSLA: 177.58, NVDA: 875.39, MSFT: 415.22, GOOGL: 175.98, AMZN: 185.07, META: 527.34, JPM: 199.45, V: 278.90, NFLX: 628.77, JNJ: 152.30, WMT: 68.45, PG: 168.22, MA: 472.11, UNH: 525.80, HD: 342.60, CVX: 158.90, LLY: 798.44, ABBV: 172.33, MRK: 128.77 };
      for (const sym of symbols) {
        if (!results[sym]) {
          const base = MOCK[sym] ?? 100 + Math.random() * 400;
          const chg = parseFloat((Math.random() * 6 - 3).toFixed(2));
          results[sym] = { symbol: sym, price: parseFloat(base.toFixed(2)), change: chg, changePercent: chg, volume: Math.floor(Math.random() * 50000000), high: parseFloat((base * 1.02).toFixed(2)), low: parseFloat((base * 0.98).toFixed(2)), open: parseFloat((base * 0.995).toFixed(2)), close: parseFloat(base.toFixed(2)), source: "mock" };
        }
      }
      return { stocks: results, fetchedAt: Date.now(), count: Object.keys(results).length };
    }),

  // ── STOCK OHLC CHART DATA (Polygon.io) ──────────────────────────────────
  getStockOHLC: publicProcedure
    .input(z.object({ symbol: z.string(), timeframe: z.enum(["1D","1W","1M","3M","1Y"]).default("1M") }))
    .query(async ({ input }) => {
      const apiKey = process.env.POLYGON_API_KEY;
      const now = new Date();
      const fromMap: Record<string, number> = { "1D": 1, "1W": 7, "1M": 30, "3M": 90, "1Y": 365 };
      const days = fromMap[input.timeframe] ?? 30;
      const from = new Date(now.getTime() - days * 86400000).toISOString().split("T")[0];
      const to = now.toISOString().split("T")[0];
      const timespan = days <= 7 ? "hour" : "day";
      if (apiKey) {
        try {
          const url = `https://api.polygon.io/v2/aggs/ticker/${input.symbol}/range/1/${timespan}/${from}/${to}?adjusted=true&sort=asc&limit=200&apiKey=${apiKey}`;
          const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
          if (res.ok) {
            const data = await res.json() as { results?: Array<{ t: number; o: number; h: number; l: number; c: number; v: number }> };
            if (data.results?.length) {
              return { symbol: input.symbol, timeframe: input.timeframe, candles: data.results.map(r => ({ time: r.t, open: r.o, high: r.h, low: r.l, close: r.c, volume: r.v })), source: "polygon" };
            }
          }
        } catch (_) { /* fallback */ }
      }
      const base = 150 + Math.random() * 300;
      const candles = Array.from({ length: Math.min(days, 60) }, (_, i) => {
        const t = now.getTime() - (days - i) * 86400000;
        const o = base + (Math.random() - 0.48) * 3 * i;
        const h = o + Math.random() * 5;
        const l = o - Math.random() * 5;
        const c = l + Math.random() * (h - l);
        return { time: t, open: parseFloat(o.toFixed(2)), high: parseFloat(h.toFixed(2)), low: parseFloat(l.toFixed(2)), close: parseFloat(c.toFixed(2)), volume: Math.floor(Math.random() * 10000000) };
      });
      return { symbol: input.symbol, timeframe: input.timeframe, candles, source: "mock" };
    }),

  // ── STOCK DETAILS (Polygon.io) ───────────────────────────────────────────
  getStockDetails: publicProcedure
    .input(z.object({ symbol: z.string() }))
    .query(async ({ input }) => {
      const apiKey = process.env.POLYGON_API_KEY;
      if (apiKey) {
        try {
          const url = `https://api.polygon.io/v3/reference/tickers/${input.symbol}?apiKey=${apiKey}`;
          const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
          if (res.ok) {
            const data = await res.json() as { results?: { name: string; description: string; market_cap: number; total_employees: number; sic_description: string; homepage_url: string; list_date: string } };
            if (data.results) return { symbol: input.symbol, ...data.results, source: "polygon" };
          }
        } catch (_) { /* fallback */ }
      }
      return { symbol: input.symbol, name: input.symbol, description: `${input.symbol} — sovereign asset on the OMNIEX Wall Street Desk.`, market_cap: 0, total_employees: 0, sic_description: "Technology", homepage_url: "", list_date: "", source: "mock" };
    }),

  // ── STOCK NEWS (Polygon.io) ──────────────────────────────────────────────
  getStockNews: publicProcedure
    .input(z.object({ symbol: z.string(), limit: z.number().default(5) }))
    .query(async ({ input }) => {
      const apiKey = process.env.POLYGON_API_KEY;
      if (apiKey) {
        try {
          const url = `https://api.polygon.io/v2/reference/news?ticker=${input.symbol}&limit=${input.limit}&apiKey=${apiKey}`;
          const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
          if (res.ok) {
            const data = await res.json() as { results?: Array<{ id: string; title: string; article_url: string; published_utc: string; description: string; author: string; image_url: string }> };
            return { symbol: input.symbol, articles: data.results ?? [], source: "polygon" };
          }
        } catch (_) { /* fallback */ }
      }
      return { symbol: input.symbol, articles: [], source: "mock" };
    }),

  // ── LIVE CRYPTO PRICES (CoinGecko) ──────────────────────────────────────
  getLiveCryptoPrices: publicProcedure
    .input(z.object({ coins: z.array(z.string()).optional() }).optional())
    .query(async ({ input }) => {
      const TOP_COINS = ["bitcoin","ethereum","matic-network","solana","binancecoin","usd-coin","tether","cardano","polkadot","avalanche-2","chainlink","uniswap","aave","the-sandbox","decentraland","axie-infinity","render-token","fetch-ai","ocean-protocol","filecoin","near","cosmos","algorand","stellar","vechain","tron","litecoin","bitcoin-cash","monero","dash"];
      const coins = input?.coins ?? TOP_COINS;
      const SYMBOL_MAP: Record<string, string> = { "bitcoin":"BTC","ethereum":"ETH","matic-network":"MATIC","solana":"SOL","binancecoin":"BNB","usd-coin":"USDC","tether":"USDT","cardano":"ADA","polkadot":"DOT","avalanche-2":"AVAX","chainlink":"LINK","uniswap":"UNI","aave":"AAVE","the-sandbox":"SAND","decentraland":"MANA","axie-infinity":"AXS","render-token":"RNDR","fetch-ai":"FET","ocean-protocol":"OCEAN","filecoin":"FIL","near":"NEAR","cosmos":"ATOM","algorand":"ALGO","stellar":"XLM","vechain":"VET","tron":"TRX","litecoin":"LTC","bitcoin-cash":"BCH","monero":"XMR","dash":"DASH" };
      try {
        const ids = coins.slice(0, 30).join(",");
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24h_change=true&include_market_cap=true&include_24hr_vol=true`;
        const res = await fetch(url, { headers: { "Accept": "application/json" }, signal: AbortSignal.timeout(8000) });
        if (res.ok) {
          const data = await res.json() as Record<string, { usd: number; usd_24h_change: number; usd_market_cap: number; usd_24h_vol: number }>;
          const results: Record<string, { symbol: string; id: string; price: number; change24h: number; marketCap: number; volume24h: number; source: string }> = {};
          for (const [id, d] of Object.entries(data)) {
            const sym = SYMBOL_MAP[id] ?? id.toUpperCase();
            results[sym] = { symbol: sym, id, price: d.usd, change24h: parseFloat((d.usd_24h_change ?? 0).toFixed(2)), marketCap: d.usd_market_cap ?? 0, volume24h: d.usd_24h_vol ?? 0, source: "coingecko" };
          }
          results["LONDC"] = { symbol: "LONDC", id: "londc", price: 0.0144, change24h: 7.77, marketCap: 144000000, volume24h: 1440000, source: "sovereign" };
          return { crypto: results, fetchedAt: Date.now(), count: Object.keys(results).length };
        }
      } catch (_) { /* fallback */ }
      const MOCK_PRICES: Record<string, number> = { BTC: 67420, ETH: 3521, MATIC: 0.72, SOL: 178, BNB: 612, USDC: 1.00, USDT: 1.00, ADA: 0.45, DOT: 7.82, AVAX: 38.90, LINK: 14.22, UNI: 8.45, AAVE: 92.30, SAND: 0.38, MANA: 0.41 };
      const results: Record<string, { symbol: string; id: string; price: number; change24h: number; marketCap: number; volume24h: number; source: string }> = {};
      for (const [sym, price] of Object.entries(MOCK_PRICES)) {
        results[sym] = { symbol: sym, id: sym.toLowerCase(), price, change24h: parseFloat((Math.random() * 10 - 5).toFixed(2)), marketCap: price * 1000000, volume24h: price * 100000, source: "mock" };
      }
      results["LONDC"] = { symbol: "LONDC", id: "londc", price: 0.0144, change24h: 7.77, marketCap: 144000000, volume24h: 1440000, source: "sovereign" };
      return { crypto: results, fetchedAt: Date.now(), count: Object.keys(results).length };
    }),

  // ── CRYPTO OHLC CHART DATA (CoinGecko) ──────────────────────────────────
  getCryptoOHLC: publicProcedure
    .input(z.object({ coinId: z.string(), days: z.number().default(30) }))
    .query(async ({ input }) => {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/${input.coinId}/ohlc?vs_currency=usd&days=${input.days}`;
        const res = await fetch(url, { headers: { "Accept": "application/json" }, signal: AbortSignal.timeout(8000) });
        if (res.ok) {
          const data = await res.json() as Array<[number, number, number, number, number]>;
          const candles = data.map(([t, o, h, l, c]) => ({ time: t, open: o, high: h, low: l, close: c }));
          return { coinId: input.coinId, days: input.days, candles, source: "coingecko" };
        }
      } catch (_) { /* fallback */ }
      const base = 100 + Math.random() * 1000;
      const candles = Array.from({ length: Math.min(input.days, 60) }, (_, i) => {
        const t = Date.now() - (input.days - i) * 86400000;
        const o = base + (Math.random() - 0.48) * base * 0.05 * i;
        const h = o * (1 + Math.random() * 0.03);
        const l = o * (1 - Math.random() * 0.03);
        const c = l + Math.random() * (h - l);
        return { time: t, open: parseFloat(o.toFixed(4)), high: parseFloat(h.toFixed(4)), low: parseFloat(l.toFixed(4)), close: parseFloat(c.toFixed(4)) };
      });
      return { coinId: input.coinId, days: input.days, candles, source: "mock" };
    }),
});
