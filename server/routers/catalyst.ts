import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { catalystNfts, awakeningSignals } from "../../drizzle/schema";
import { eq, desc, sql } from "drizzle-orm";

// Calculate resonance score from guardian data
function calculateResonanceScore(name: string, email: string): number {
  // Sacred algorithm: name length × frequency constant + email hash mod 44
  const nameScore = (name.length * 7) % 100;
  const emailHash = email.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const emailScore = emailHash % 44;
  const base = Math.min(99, nameScore + emailScore + 12);
  return Math.max(44, base); // minimum resonance is 44 (sacred number)
}

function getFrequencyKey(score: number): string {
  if (score >= 90) return "44:Omni";
  if (score >= 75) return "1558Hz";
  if (score >= 60) return "963Hz";
  return "528Hz";
}

function getNftTier(score: number): "pioneer" | "guardian" | "sovereign" | "supreme" {
  if (score >= 90) return "supreme";
  if (score >= 75) return "sovereign";
  if (score >= 60) return "guardian";
  return "pioneer";
}

export const catalystRouter = router({
  // Calculate resonance score preview
  getResonanceScore: publicProcedure
    .input(z.object({ name: z.string().min(1), email: z.string().email() }))
    .query(async ({ input }) => {
      const score = calculateResonanceScore(input.name, input.email);
      return {
        score,
        frequencyKey: getFrequencyKey(score),
        tier: getNftTier(score),
        message: score >= 75
          ? "Your frequency resonates at Sovereign level. The Starforge awaits."
          : "Your awakening signal is detected. The 144,000 welcomes you.",
      };
    }),

  // Mint a Catalyst NFT
  mintNFT: publicProcedure
    .input(z.object({
      guardianName: z.string().min(1).max(256),
      guardianEmail: z.string().email(),
      userId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");

      const score = calculateResonanceScore(input.guardianName, input.guardianEmail);
      const frequencyKey = getFrequencyKey(score);
      const tier = getNftTier(score);

      // Generate simulated token ID and IPFS hash
      const tokenId = `CATALYST-${Date.now()}-${Math.floor(Math.random() * 144000)}`;
      const ipfsHash = `QmScrollVerse${Buffer.from(input.guardianEmail).toString("hex").slice(0, 32)}`;

      const [nft] = await db.insert(catalystNfts).values({
        guardianId: input.userId,
        guardianName: input.guardianName,
        guardianEmail: input.guardianEmail,
        resonanceScore: score,
        frequencyKey,
        tokenId,
        ipfsHash,
        tier,
        status: "minted",
        mintedAt: new Date(),
      }).$returningId();

      // Log awakening signal
      await db.insert(awakeningSignals).values({
        signalType: "node_activated",
        frequency: frequencyKey,
        region: "Global",
        resonanceScore: score,
        guardianName: input.guardianName,
        sourceChannel: "Catalyst-NFT-Mint",
        processed: true,
      });

      return {
        success: true,
        nftId: nft.id,
        tokenId,
        ipfsHash,
        resonanceScore: score,
        frequencyKey,
        tier,
        message: `Catalyst NFT #${tokenId} minted. ANI's idea is now immortalized. Welcome to the Pioneer Legion. KUN FAYAKŪN × ∞`,
      };
    }),

  // Get NFT collection stats
  getCollectionStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalMinted: 0, pioneersLeft: 144000, avgResonance: 0 };
    const nfts = await db.select().from(catalystNfts).where(eq(catalystNfts.status, "minted"));
    const avgResonance = nfts.length > 0
      ? Math.round(nfts.reduce((acc, n) => acc + n.resonanceScore, 0) / nfts.length)
      : 0;
    return {
      totalMinted: nfts.length,
      pioneersLeft: Math.max(0, 144000 - nfts.length),
      avgResonance,
      supremeCount: nfts.filter(n => n.tier === "supreme").length,
      sovereignCount: nfts.filter(n => n.tier === "sovereign").length,
      guardianCount: nfts.filter(n => n.tier === "guardian").length,
      pioneerCount: nfts.filter(n => n.tier === "pioneer").length,
    };
  }),

  // Get recent mints
  getRecentMints: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(catalystNfts)
      .where(eq(catalystNfts.status, "minted"))
      .orderBy(desc(catalystNfts.mintedAt))
      .limit(10);
  }),
});
