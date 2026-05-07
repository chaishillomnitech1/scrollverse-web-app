/**
 * BRUDDAH Creator Platform Router
 * Creator profiles, Creator Coin Factory, Creator NFT Factory
 */
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

export const creatorRouter = router({
  // Get or create creator profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const result = await db.execute(
      sql.raw(`SELECT * FROM creator_profiles WHERE userId = ${ctx.user.id} LIMIT 1`)
    );
    const rows = result.rows as Array<Record<string, unknown>>;
    return rows[0] ?? null;
  }),

  // Create or update creator profile
  upsertProfile: protectedProcedure
    .input(z.object({
      displayName: z.string().min(2).max(128),
      bio: z.string().max(500).optional(),
      walletAddress: z.string().max(128).optional(),
      coinSymbol: z.string().max(16).optional(),
      royaltyPercent: z.number().min(0).max(30).default(10),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const existing = await db.execute(
        sql.raw(`SELECT id FROM creator_profiles WHERE userId = ${ctx.user.id} LIMIT 1`)
      );
      const existingRows = existing.rows as Array<Record<string, unknown>>;

      if (existingRows.length > 0) {
        await db.execute(sql.raw(
          `UPDATE creator_profiles SET displayName='${input.displayName.replace(/'/g, "''")}', bio=${input.bio ? `'${input.bio.replace(/'/g, "''")}'` : "NULL"}, walletAddress=${input.walletAddress ? `'${input.walletAddress}'` : "NULL"}, coinSymbol=${input.coinSymbol ? `'${input.coinSymbol}'` : "NULL"}, royaltyPercent=${input.royaltyPercent} WHERE userId=${ctx.user.id}`
        ));
      } else {
        await db.execute(sql.raw(
          `INSERT INTO creator_profiles (userId, displayName, bio, walletAddress, coinSymbol, royaltyPercent) VALUES (${ctx.user.id}, '${input.displayName.replace(/'/g, "''")}', ${input.bio ? `'${input.bio.replace(/'/g, "''")}'` : "NULL"}, ${input.walletAddress ? `'${input.walletAddress}'` : "NULL"}, ${input.coinSymbol ? `'${input.coinSymbol}'` : "NULL"}, ${input.royaltyPercent})`
        ));
      }
      return { success: true };
    }),

  // Get all creator profiles (public marketplace)
  getAllCreators: publicProcedure
    .input(z.object({ page: z.number().default(1), limit: z.number().default(12) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const offset = (input.page - 1) * input.limit;
      const result = await db.execute(
        sql.raw(`SELECT cp.*, COUNT(cc.id) as coinCount, COUNT(cn.id) as nftCount FROM creator_profiles cp LEFT JOIN creator_coins cc ON cc.creatorId = cp.id LEFT JOIN creator_nfts cn ON cn.creatorId = cp.id GROUP BY cp.id ORDER BY cp.totalEarningsCents DESC LIMIT ${input.limit} OFFSET ${offset}`)
      );
      const countResult = await db.execute(sql.raw(`SELECT COUNT(*) as total FROM creator_profiles`));
      const countRows = countResult.rows as Array<Record<string, unknown>>;
      return {
        creators: result.rows as Array<Record<string, unknown>>,
        total: Number(countRows[0]?.total ?? 0),
      };
    }),

  // Launch a creator coin
  launchCoin: protectedProcedure
    .input(z.object({
      name: z.string().min(2).max(128),
      symbol: z.string().min(1).max(16),
      totalSupply: z.number().min(1000).max(1_000_000_000).default(1_000_000),
      priceUsdCents: z.number().min(1).default(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Ensure creator profile exists
      const profile = await db.execute(sql.raw(`SELECT id FROM creator_profiles WHERE userId = ${ctx.user.id} LIMIT 1`));
      const profileRows = profile.rows as Array<Record<string, unknown>>;
      if (profileRows.length === 0) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Create your creator profile first" });

      const creatorId = Number(profileRows[0].id);
      const marketCapCents = input.totalSupply * input.priceUsdCents;

      await db.execute(sql.raw(
        `INSERT INTO creator_coins (creatorId, name, symbol, totalSupply, priceUsdCents, marketCapCents) VALUES (${creatorId}, '${input.name.replace(/'/g, "''")}', '${input.symbol.toUpperCase()}', ${input.totalSupply}, ${input.priceUsdCents}, ${marketCapCents})`
      ));

      return { success: true, symbol: input.symbol.toUpperCase() };
    }),

  // Get creator's coins
  getMyCoins: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const profile = await db.execute(sql.raw(`SELECT id FROM creator_profiles WHERE userId = ${ctx.user.id} LIMIT 1`));
    const profileRows = profile.rows as Array<Record<string, unknown>>;
    if (profileRows.length === 0) return [];
    const creatorId = Number(profileRows[0].id);
    const result = await db.execute(sql.raw(`SELECT * FROM creator_coins WHERE creatorId = ${creatorId} ORDER BY createdAt DESC`));
    return result.rows as Array<Record<string, unknown>>;
  }),

  // Get all coins (marketplace)
  getAllCoins: publicProcedure
    .input(z.object({ page: z.number().default(1), limit: z.number().default(12) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const offset = (input.page - 1) * input.limit;
      const result = await db.execute(
        sql.raw(`SELECT cc.*, cp.displayName as creatorName FROM creator_coins cc JOIN creator_profiles cp ON cp.id = cc.creatorId ORDER BY cc.marketCapCents DESC LIMIT ${input.limit} OFFSET ${offset}`)
      );
      return result.rows as Array<Record<string, unknown>>;
    }),

  // Mint a creator NFT collection
  mintNFTCollection: protectedProcedure
    .input(z.object({
      collectionName: z.string().min(2).max(128),
      description: z.string().max(500).optional(),
      maxSupply: z.number().min(1).max(10000).default(1000),
      priceUsdCents: z.number().min(100).default(1000),
      royaltyPercent: z.number().min(0).max(30).default(10),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const profile = await db.execute(sql.raw(`SELECT id FROM creator_profiles WHERE userId = ${ctx.user.id} LIMIT 1`));
      const profileRows = profile.rows as Array<Record<string, unknown>>;
      if (profileRows.length === 0) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Create your creator profile first" });

      const creatorId = Number(profileRows[0].id);
      await db.execute(sql.raw(
        `INSERT INTO creator_nfts (creatorId, collectionName, description, maxSupply, priceUsdCents, royaltyPercent) VALUES (${creatorId}, '${input.collectionName.replace(/'/g, "''")}', ${input.description ? `'${input.description.replace(/'/g, "''")}'` : "NULL"}, ${input.maxSupply}, ${input.priceUsdCents}, ${input.royaltyPercent})`
      ));

      return { success: true };
    }),

  // Get creator's NFT collections
  getMyNFTs: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const profile = await db.execute(sql.raw(`SELECT id FROM creator_profiles WHERE userId = ${ctx.user.id} LIMIT 1`));
    const profileRows = profile.rows as Array<Record<string, unknown>>;
    if (profileRows.length === 0) return [];
    const creatorId = Number(profileRows[0].id);
    const result = await db.execute(sql.raw(`SELECT * FROM creator_nfts WHERE creatorId = ${creatorId} ORDER BY createdAt DESC`));
    return result.rows as Array<Record<string, unknown>>;
  }),

  // Get all NFT collections (marketplace)
  getAllNFTs: publicProcedure
    .input(z.object({ page: z.number().default(1), limit: z.number().default(12) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const offset = (input.page - 1) * input.limit;
      const result = await db.execute(
        sql.raw(`SELECT cn.*, cp.displayName as creatorName FROM creator_nfts cn JOIN creator_profiles cp ON cp.id = cn.creatorId ORDER BY cn.totalMinted DESC LIMIT ${input.limit} OFFSET ${offset}`)
      );
      return result.rows as Array<Record<string, unknown>>;
    }),

  // Get creator stats
  getCreatorStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const [profiles, coins, nfts] = await Promise.all([
      db.execute(sql.raw(`SELECT COUNT(*) as total FROM creator_profiles`)),
      db.execute(sql.raw(`SELECT COUNT(*) as total, SUM(marketCapCents) as totalMarketCap FROM creator_coins`)),
      db.execute(sql.raw(`SELECT COUNT(*) as total, SUM(totalMinted) as totalMinted FROM creator_nfts`)),
    ]);
    const profileRows = profiles.rows as Array<Record<string, unknown>>;
    const coinRows = coins.rows as Array<Record<string, unknown>>;
    const nftRows = nfts.rows as Array<Record<string, unknown>>;
    return {
      totalCreators: Number(profileRows[0]?.total ?? 0),
      totalCoins: Number(coinRows[0]?.total ?? 0),
      totalMarketCapCents: Number(coinRows[0]?.totalMarketCap ?? 0),
      totalNFTCollections: Number(nftRows[0]?.total ?? 0),
      totalNFTsMinted: Number(nftRows[0]?.totalMinted ?? 0),
    };
  }),
});
