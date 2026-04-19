import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { bridgeStatus } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const CHAINS = [
  { chainId: 137, name: "Polygon", symbol: "MATIC", color: "#8247E5", rpcUrl: "https://polygon-rpc.com" },
  { chainId: 1, name: "Ethereum", symbol: "ETH", color: "#627EEA", rpcUrl: "https://cloudflare-eth.com" },
  { chainId: 42161, name: "Arbitrum", symbol: "ARB", color: "#28A0F0", rpcUrl: "https://arb1.arbitrum.io/rpc" },
];

export const bridgeRouter = router({
  getStatus: publicProcedure.query(async () => {
    const db = await getDb();

    // Seed bridge status if empty
    if (db) {
      for (const chain of CHAINS) {
        const existing = await db
          .select()
          .from(bridgeStatus)
          .where(eq(bridgeStatus.chainId, chain.chainId))
          .limit(1);

        if (existing.length === 0) {
          await db.insert(bridgeStatus).values({
            chainId: chain.chainId,
            chainName: chain.name,
            healthScore: 95 + Math.floor(Math.random() * 5),
            syncPercent: 98 + Math.floor(Math.random() * 2),
            pendingTransfers: Math.floor(Math.random() * 10),
            completedTransfers: Math.floor(Math.random() * 10000),
            totalVolumeLondc: Math.floor(Math.random() * 1000000),
            status: "online",
          });
        }
      }

      const statuses = await db.select().from(bridgeStatus);
      return { chains: statuses, chainMeta: CHAINS };
    }

    // Fallback simulated data
    return {
      chains: CHAINS.map(c => ({
        id: c.chainId,
        chainId: c.chainId,
        chainName: c.name,
        healthScore: 97,
        syncPercent: 99,
        pendingTransfers: 3,
        completedTransfers: 7777,
        totalVolumeLondc: 144000,
        status: "online" as const,
        lastSyncAt: new Date(),
        createdAt: new Date(),
      })),
      chainMeta: CHAINS,
    };
  }),

  getHealth: publicProcedure
    .input(z.object({ chainId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { health: 100, status: "online" };

      const [chain] = await db
        .select()
        .from(bridgeStatus)
        .where(eq(bridgeStatus.chainId, input.chainId))
        .limit(1);

      return {
        health: chain?.healthScore ?? 100,
        status: chain?.status ?? "online",
        syncPercent: chain?.syncPercent ?? 100,
        pendingTransfers: chain?.pendingTransfers ?? 0,
      };
    }),
});
