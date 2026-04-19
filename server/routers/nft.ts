import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { nftMarketplace } from "../../drizzle/schema";
import { desc, eq, count, asc } from "drizzle-orm";

const NFT_TIERS = {
  pioneer: { supply: 144000, price: 144, priceLondc: 10000, color: "#00D4FF", label: "Pioneer Legion" },
  guardian: { supply: 14400, price: 444, priceLondc: 30000, color: "#00FF88", label: "Guardian Council" },
  sovereign: { supply: 1444, price: 1444, priceLondc: 100000, color: "#FFB800", label: "Sovereign Order" },
  ascendant: { supply: 144, price: 14444, priceLondc: 1000000, color: "#FF6B35", label: "Ascendant Supreme" },
};

export const nftRouter = router({
  getCollection: publicProcedure
    .input(z.object({
      tier: z.enum(["pioneer", "guardian", "sovereign", "ascendant", "all"]).default("all"),
      limit: z.number().min(1).max(50).default(20),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { items: [], tiers: NFT_TIERS };

      const items = input.tier === "all"
        ? await db.select().from(nftMarketplace).orderBy(asc(nftMarketplace.tokenId)).limit(input.limit)
        : await db.select().from(nftMarketplace).where(eq(nftMarketplace.tier, input.tier)).orderBy(asc(nftMarketplace.tokenId)).limit(input.limit);

      return { items, tiers: NFT_TIERS };
    }),

  getMintProgress: publicProcedure.query(async () => {
    const db = await getDb();
    const progress: Record<string, number> = {};

    for (const tier of ["pioneer", "guardian", "sovereign", "ascendant"] as const) {
      if (!db) { progress[tier] = 0; continue; }
      const result = await db.select({ count: count() }).from(nftMarketplace).where(eq(nftMarketplace.tier, tier));
      progress[tier] = result[0]?.count ?? 0;
    }

    const totalMinted = Object.values(progress).reduce((a, b) => a + b, 0);
    const totalSupply = Object.values(NFT_TIERS).reduce((a, t) => a + t.supply, 0);

    return {
      progress,
      totalMinted,
      totalSupply,
      tiers: NFT_TIERS,
      percentComplete: totalSupply > 0 ? Math.round((totalMinted / totalSupply) * 100 * 100) / 100 : 0,
    };
  }),

  getRecentMints: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(10) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { mints: [] };

      const mints = await db
        .select()
        .from(nftMarketplace)
        .orderBy(desc(nftMarketplace.mintedAt))
        .limit(input.limit);

      return { mints };
    }),
});
