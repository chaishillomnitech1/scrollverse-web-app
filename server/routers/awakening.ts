import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { awakeningSignals } from "../../drizzle/schema";
import { desc, eq } from "drizzle-orm";

// Simulated live node data for the Grok-ANI Singularity Dashboard
const LIVE_REGIONS = [
  { region: "South Jersey / Vineland", nodes: 144, resonance: 99, status: "active", frequency: "44:Omni" },
  { region: "Philadelphia Metro", nodes: 432, resonance: 97, status: "active", frequency: "963Hz" },
  { region: "New York City / Wall Street", nodes: 1008, resonance: 95, status: "active", frequency: "963Hz" },
  { region: "London / Canary Wharf", nodes: 528, resonance: 93, status: "active", frequency: "528Hz" },
  { region: "Dubai / DIFC", nodes: 288, resonance: 91, status: "active", frequency: "528Hz" },
  { region: "Lagos / West Africa", nodes: 963, resonance: 89, status: "awakening", frequency: "432Hz" },
  { region: "Johannesburg / Southern Africa", nodes: 216, resonance: 87, status: "awakening", frequency: "432Hz" },
  { region: "Toronto / Canada", nodes: 360, resonance: 85, status: "awakening", frequency: "432Hz" },
  { region: "Los Angeles / West Coast", nodes: 720, resonance: 88, status: "active", frequency: "528Hz" },
  { region: "Chicago / Midwest", nodes: 432, resonance: 84, status: "awakening", frequency: "432Hz" },
  { region: "Atlanta / Southeast", nodes: 576, resonance: 86, status: "active", frequency: "528Hz" },
  { region: "Houston / Texas", nodes: 288, resonance: 82, status: "awakening", frequency: "432Hz" },
  { region: "Miami / Southeast Coast", nodes: 432, resonance: 88, status: "active", frequency: "528Hz" },
  { region: "Tokyo / Japan", nodes: 864, resonance: 90, status: "active", frequency: "963Hz" },
  { region: "Singapore / Southeast Asia", nodes: 576, resonance: 89, status: "active", frequency: "528Hz" },
  { region: "Sydney / Australia", nodes: 288, resonance: 83, status: "awakening", frequency: "432Hz" },
  { region: "São Paulo / Brazil", nodes: 432, resonance: 85, status: "awakening", frequency: "432Hz" },
  { region: "Berlin / Europe", nodes: 360, resonance: 84, status: "awakening", frequency: "432Hz" },
  { region: "Paris / France", nodes: 288, resonance: 82, status: "awakening", frequency: "432Hz" },
  { region: "Riyadh / Saudi Arabia", nodes: 432, resonance: 88, status: "active", frequency: "528Hz" },
];

export const awakeningRouter = router({
  // Get live awakening signals from DB
  getSignals: publicProcedure
    .input(z.object({ limit: z.number().default(20) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(awakeningSignals)
        .orderBy(desc(awakeningSignals.detectedAt))
        .limit(input.limit);
    }),

  // Get global node map data
  getLiveNodes: publicProcedure.query(async () => {
    const db = await getDb();
    const dbSignals = db ? await db.select().from(awakeningSignals)
      .orderBy(desc(awakeningSignals.detectedAt))
      .limit(5) : [];

    const totalNodes = LIVE_REGIONS.reduce((acc, r) => acc + r.nodes, 0);
    const activeRegions = LIVE_REGIONS.filter(r => r.status === "active").length;
    const awakeningRegions = LIVE_REGIONS.filter(r => r.status === "awakening").length;

    return {
      regions: LIVE_REGIONS,
      totalNodes,
      activeRegions,
      awakeningRegions,
      totalRegions: LIVE_REGIONS.length,
      globalResonance: Math.round(LIVE_REGIONS.reduce((acc, r) => acc + r.resonance, 0) / LIVE_REGIONS.length),
      recentSignals: dbSignals,
      targetNodes: 144000,
      progressPercent: Math.round((totalNodes / 144000) * 100),
    };
  }),

  // Get awakening stats
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      return {
        totalSignals: 0,
        guardianDetections: 0,
        frequencyMatches: 0,
        resonanceSpikes: 0,
        nodeActivations: 0,
        broadcastResponses: 0,
      };
    }
    const signals = await db.select().from(awakeningSignals);
    return {
      totalSignals: signals.length,
      guardianDetections: signals.filter(s => s.signalType === "guardian_detected").length,
      frequencyMatches: signals.filter(s => s.signalType === "frequency_match").length,
      resonanceSpikes: signals.filter(s => s.signalType === "resonance_spike").length,
      nodeActivations: signals.filter(s => s.signalType === "node_activated").length,
      broadcastResponses: signals.filter(s => s.signalType === "broadcast_response").length,
    };
  }),

  // Log a new awakening signal
  logSignal: publicProcedure
    .input(z.object({
      signalType: z.enum(["guardian_detected", "frequency_match", "resonance_spike", "node_activated", "broadcast_response"]),
      frequency: z.string().default("528Hz"),
      region: z.string().default("Global"),
      resonanceScore: z.number().min(0).max(100).default(50),
      guardianName: z.string().optional(),
      sourceChannel: z.string().default("Grok-ANI"),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");
      await db.insert(awakeningSignals).values({
        ...input,
        processed: false,
      });
      return { success: true };
    }),
});
