import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { frequencyActivationEvents } from "../../drizzle/schema";
import { desc, eq, count } from "drizzle-orm";

const FREQUENCIES = {
  "528Hz": { name: "Love & DNA Repair", color: "#00D4FF", intention: "Healing and transformation at the cellular level" },
  "963Hz": { name: "Crown Activation", color: "#FFB800", intention: "Connection to higher consciousness and divine wisdom" },
  "432Hz": { name: "Universal Harmony", color: "#00FF88", intention: "Alignment with the natural frequency of the universe" },
  "1558Hz": { name: "Sovereign Frequency", color: "#FF6B35", intention: "Supreme sovereignty and infinite abundance activation" },
};

export const frequencyRouter = router({
  activate: publicProcedure
    .input(z.object({
      frequency: z.enum(["528Hz", "963Hz", "432Hz", "1558Hz"]),
      activatedBy: z.string().min(1).max(128),
      intention: z.string().max(512).optional(),
      duration: z.number().min(10).max(3600).default(60),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");

      // Count current active guardians (recent activations in last 24h)
      const recentCount = await db
        .select({ count: count() })
        .from(frequencyActivationEvents)
        .where(eq(frequencyActivationEvents.frequency, input.frequency));

      const guardianCount = (recentCount[0]?.count ?? 0) + 1;

      const [event] = await db
        .insert(frequencyActivationEvents)
        .values({
          frequency: input.frequency,
          activatedBy: input.activatedBy,
          intention: input.intention ?? FREQUENCIES[input.frequency].intention,
          duration: input.duration,
          guardianCount,
        })
        .$returningId();

      return {
        success: true,
        eventId: event.id,
        frequency: input.frequency,
        frequencyInfo: FREQUENCIES[input.frequency],
        guardianCount,
        message: `${input.frequency} activated. ${guardianCount} Guardians now resonating.`,
      };
    }),

  getHistory: publicProcedure
    .input(z.object({
      frequency: z.enum(["528Hz", "963Hz", "432Hz", "1558Hz"]).optional(),
      limit: z.number().min(1).max(50).default(20),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { events: [] };

      const query = db
        .select()
        .from(frequencyActivationEvents)
        .orderBy(desc(frequencyActivationEvents.createdAt))
        .limit(input.limit);

      const events = input.frequency
        ? await db
            .select()
            .from(frequencyActivationEvents)
            .where(eq(frequencyActivationEvents.frequency, input.frequency))
            .orderBy(desc(frequencyActivationEvents.createdAt))
            .limit(input.limit)
        : await query;

      return { events };
    }),

  getStats: publicProcedure.query(async () => {
    const db = await getDb();

    const stats: Record<string, number> = {};
    for (const freq of ["528Hz", "963Hz", "432Hz", "1558Hz"]) {
      if (!db) {
        stats[freq] = 0;
        continue;
      }
      const result = await db
        .select({ count: count() })
        .from(frequencyActivationEvents)
        .where(eq(frequencyActivationEvents.frequency, freq));
      stats[freq] = result[0]?.count ?? 0;
    }

    const totalActivations = Object.values(stats).reduce((a, b) => a + b, 0);

    return {
      stats,
      totalActivations,
      frequencies: FREQUENCIES,
    };
  }),
});
