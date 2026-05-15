import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { uapDocuments, uapEntities, uapCoins } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

// Static curated UAP data — seeded on first access
const SEED_DOCUMENTS = [
  {
    title: "PURSUE Program — UAP Intelligence Collection Framework",
    agency: "DIA / AARO",
    date: "2023-07-26",
    summary: "The PURSUE program establishes a classified framework for systematic collection, analysis, and dissemination of Unidentified Aerial Phenomena intelligence across all military branches. Includes standardized reporting protocols and chain-of-custody procedures for recovered materials.",
    category: "program",
    classificationLevel: "DECLASSIFIED",
    sourceUrl: "https://www.aaro.mil",
    tokenized: 0,
  },
  {
    title: "Kecksburg Bronze Ellipsoid — Recovered Craft Analysis",
    agency: "NASA / USAF",
    date: "1965-12-09",
    summary: "Detailed analysis of the acorn-shaped metallic object recovered near Kecksburg, Pennsylvania. The Bronze Ellipsoid exhibited unknown alloy composition, hieroglyphic-like markings around the base ring, and no conventional propulsion system. Object transferred to Wright-Patterson AFB for further study.",
    category: "recovered_material",
    classificationLevel: "PARTIALLY DECLASSIFIED",
    sourceUrl: "https://www.archives.gov",
    tokenized: 1,
  },
  {
    title: "Apollo 17 Lunar Witnesses — Classified Mission Addendum",
    agency: "NASA",
    date: "1972-12-14",
    summary: "Classified addendum to the Apollo 17 mission logs documenting multiple anomalous observations by crew members Cernan, Evans, and Schmitt. Includes photographic evidence of structured objects in lunar orbit and surface anomalies inconsistent with natural geological formation.",
    category: "mission_report",
    classificationLevel: "PARTIALLY DECLASSIFIED",
    sourceUrl: "https://www.nasa.gov",
    tokenized: 1,
  },
  {
    title: "Gimbal UAP — F/A-18 Infrared Engagement Report",
    agency: "US Navy / AARO",
    date: "2015-01-20",
    summary: "Full engagement report from USS Theodore Roosevelt carrier strike group documenting the Gimbal UAP encounter. Object demonstrated rotation against wind, no visible propulsion, and exceeded F/A-18 performance envelope. Multiple radar and FLIR confirmations across 14 days of encounters.",
    category: "encounter_report",
    classificationLevel: "DECLASSIFIED",
    sourceUrl: "https://www.aaro.mil",
    tokenized: 0,
  },
  {
    title: "UAP Disclosure Act 2024 — Congressional Intelligence Findings",
    agency: "US Congress / AARO",
    date: "2024-01-01",
    summary: "Congressional findings from the UAP Disclosure Act establishing mandatory reporting requirements, whistleblower protections, and the All-domain Anomaly Resolution Office (AARO) mandate. Includes classified annexes on recovered non-human intelligence and reverse engineering programs.",
    category: "legislation",
    classificationLevel: "PUBLIC LAW",
    sourceUrl: "https://www.congress.gov",
    tokenized: 0,
  },
  {
    title: "David Grusch Congressional Testimony — Non-Human Intelligence",
    agency: "US Congress",
    date: "2023-07-26",
    summary: "Former NGA intelligence officer David Grusch's sworn testimony before the House Oversight Committee confirming the existence of multi-decade UAP retrieval and reverse engineering programs. Testimony includes claims of non-human biologics, intact craft, and illegal concealment from Congressional oversight.",
    category: "testimony",
    classificationLevel: "PUBLIC RECORD",
    sourceUrl: "https://oversight.house.gov",
    tokenized: 1,
  },
];

const SEED_ENTITIES = [
  {
    name: "Bronze Ellipsoid",
    type: "craft",
    description: "Acorn-shaped metallic object recovered near Kecksburg, PA in 1965. Unknown alloy composition with hieroglyphic-like markings. No conventional propulsion system detected. Currently held at Wright-Patterson AFB.",
    frequency: "963Hz",
    nftMinted: 1,
    nftCollection: "Bronze Ellipsoid Legacy",
    sightingsCount: 1,
    firstSighted: "December 9, 1965",
  },
  {
    name: "Metallic Orb",
    type: "craft",
    description: "Spherical metallic objects reported globally by military pilots and civilians. Demonstrate anti-gravity propulsion, instantaneous acceleration, and electromagnetic interference. Most common UAP type in AARO database.",
    frequency: "528Hz",
    nftMinted: 1,
    nftCollection: "Universal Sentience Gallery",
    sightingsCount: 4847,
    firstSighted: "1940s",
  },
  {
    name: "Triangular Formation",
    type: "formation",
    description: "Large triangular craft observed over Belgium (1989-1990), Phoenix (1997), and multiple US military installations. Silent operation, estimated 300+ meters across. Possible classified US program or non-human origin.",
    frequency: "432Hz",
    nftMinted: 0,
    nftCollection: null,
    sightingsCount: 12000,
    firstSighted: "November 29, 1989",
  },
  {
    name: "Interdimensional Being",
    type: "entity",
    description: "Non-physical intelligences reported by UAP encounter witnesses, remote viewers, and consciousness researchers. Operate outside conventional spacetime. Associated with 963Hz frequency activations and expanded states of consciousness.",
    frequency: "963Hz",
    nftMinted: 1,
    nftCollection: "Universal Sentience Gallery",
    sightingsCount: 247,
    firstSighted: "Ancient history",
  },
  {
    name: "Tic-Tac",
    type: "craft",
    description: "White oblong craft (approximately 40 feet long) encountered by USS Nimitz carrier group in 2004. Demonstrated instantaneous acceleration from 80,000 feet to sea level, no visible propulsion, and ability to mirror F/A-18 maneuvers. Confirmed by FLIR, radar, and multiple pilots.",
    frequency: "528Hz",
    nftMinted: 1,
    nftCollection: "Apollo Lunar Witnesses",
    sightingsCount: 6,
    firstSighted: "November 14, 2004",
  },
];

const SEED_COINS = [
  {
    symbol: "UFO",
    name: "UFO Disclosure Token",
    description: "The sovereign token of the UAP Intelligence Network. Each $UFO represents a verified declassified document fragment, creating a living archive of humanity's contact history. Backed by the PURSUE program intelligence framework.",
    totalSupply: "144,000,000",
    price: "0.0144",
    backingAsset: "PURSUE Intelligence Archive",
    chain: "Polygon",
    isActive: 1,
  },
  {
    symbol: "ETUNITY",
    name: "Eternal Unity Coin",
    description: "The bridge token between human and non-human intelligence. $ETUNITY powers the Universal Sentience Gallery and funds ongoing UAP research, consciousness expansion programs, and interdimensional communication protocols.",
    totalSupply: "963,000,000",
    price: "0.0963",
    backingAsset: "Universal Sentience Gallery NFTs",
    chain: "Polygon",
    isActive: 1,
  },
  {
    symbol: "LUNARWITNESS",
    name: "Lunar Witness Token",
    description: "Commemorating the Apollo 17 crew's classified lunar observations. Each $LUNARWITNESS token is backed by a fragment of the declassified mission addendum. Only 17 million tokens — one for each mission day and crew member.",
    totalSupply: "17,000,000",
    price: "0.1972",
    backingAsset: "Apollo 17 Mission Archive",
    chain: "Polygon",
    isActive: 1,
  },
];

async function ensureSeeded() {
  const db = await getDb();
  const docs = await db.select().from(uapDocuments).limit(1);
  if (docs.length === 0) {
    await db.insert(uapDocuments).values(SEED_DOCUMENTS as any);
  }
  const entities = await db.select().from(uapEntities).limit(1);
  if (entities.length === 0) {
    await db.insert(uapEntities).values(SEED_ENTITIES as any);
  }
  const coins = await db.select().from(uapCoins).limit(1);
  if (coins.length === 0) {
    await db.insert(uapCoins).values(SEED_COINS as any);
  }
}

export const uapRouter = router({
  getUAPDocuments: publicProcedure
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async ({ input }) => {
      await ensureSeeded();
      const db = await getDb();
      const docs = await db.select().from(uapDocuments).orderBy(desc(uapDocuments.createdAt));
      if (input?.category) {
        return docs.filter((d: typeof docs[0]) => d.category === input.category);
      }
      return docs;
    }),

  getUAPEntities: publicProcedure
    .input(z.object({ type: z.string().optional() }).optional())
    .query(async ({ input }) => {
      await ensureSeeded();
      const db = await getDb();
      const entities = await db.select().from(uapEntities).orderBy(desc(uapEntities.sightingsCount));
      if (input?.type) {
        return entities.filter((e: typeof entities[0]) => e.type === input.type);
      }
      return entities;
    }),

  getUAPCoins: publicProcedure.query(async () => {
    await ensureSeeded();
    const db = await getDb();
    return db.select().from(uapCoins).orderBy(uapCoins.symbol);
  }),

  getUAPCollections: publicProcedure.query(async () => {
    await ensureSeeded();
    const db = await getDb();
    const entities = await db.select().from(uapEntities);
    const collections = [
      {
        id: "bronze-ellipsoid-legacy",
        name: "Bronze Ellipsoid Legacy",
        description: "144 soulbound NFTs commemorating the Kecksburg recovery. Each token grants access to classified document fragments and the PURSUE oracle feed.",
        supply: 144,
        minted: 7,
        priceUsd: 1444,
        priceLondc: 10000,
        tier: "legendary",
        soulbound: true,
        utility: ["PURSUE oracle access", "Classified document fragments", "DAO governance vote (10x weight)", "Physical relic replica"],
        imageUrl: null,
      },
      {
        id: "apollo-lunar-witnesses",
        name: "Apollo Lunar Witnesses",
        description: "17 ultra-rare NFTs — one per Apollo 17 mission day. Each contains a fragment of the classified lunar observation addendum. Mythic tier with 10-year time-lock vault.",
        supply: 17,
        minted: 3,
        priceUsd: 4444,
        priceLondc: 30000,
        tier: "mythic",
        soulbound: false,
        utility: ["Classified mission addendum fragment", "10-year vault with time-release content", "Lunar coordinate access", "Sovereign Council membership"],
        imageUrl: null,
      },
      {
        id: "universal-sentience-gallery",
        name: "Universal Sentience Gallery",
        description: "44 NFTs representing the 44 confirmed non-human entity contact events. Each NFT is paired with a $ETUNITY coin allocation and consciousness expansion protocol.",
        supply: 44,
        minted: 12,
        priceUsd: 963,
        priceLondc: 6666,
        tier: "sovereign",
        soulbound: false,
        utility: ["$ETUNITY coin allocation (10,000)", "Consciousness expansion protocol", "Entity contact archive access", "Universal Sentience DAO vote"],
        imageUrl: null,
      },
    ];
    return collections;
  }),

  mintUAPNFT: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        walletAddress: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Mint simulation — real contract integration pending deployment
      return {
        success: true,
        message: `NFT mint initiated for collection ${input.collectionId}. Connect wallet to complete on Polygon Mainnet.`,
        tokenId: Math.floor(Math.random() * 10000),
        collectionId: input.collectionId,
        walletAddress: input.walletAddress || "pending",
        txHash: null,
        status: "pending_wallet_confirmation",
      };
    }),

  swapUAPCoin: protectedProcedure
    .input(
      z.object({
        fromSymbol: z.string(),
        toSymbol: z.string(),
        amount: z.number().positive(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Swap simulation — real DEX integration pending
      const rate = input.fromSymbol === "LONDC" ? 0.0144 : 1;
      const outputAmount = input.amount * rate;
      return {
        success: true,
        message: `Swap initiated: ${input.amount} ${input.fromSymbol} → ${outputAmount.toFixed(4)} ${input.toSymbol}`,
        inputAmount: input.amount,
        outputAmount,
        fromSymbol: input.fromSymbol,
        toSymbol: input.toSymbol,
        status: "pending_wallet_confirmation",
        txHash: null,
      };
    }),
});
