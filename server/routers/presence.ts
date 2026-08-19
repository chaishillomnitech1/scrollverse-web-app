import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";

const PRESENCE_WINDOW_MS = 75_000;
const activeSessions = new Map<string, number>();

function prunePresence(now = Date.now()) {
  activeSessions.forEach((seenAt, sessionId) => {
    if (now - seenAt > PRESENCE_WINDOW_MS) activeSessions.delete(sessionId);
  });
}

export const presenceRouter = router({
  ping: publicProcedure
    .input(z.object({ sessionId: z.string().min(20).max(96).regex(/^[a-zA-Z0-9_-]+$/) }))
    .mutation(({ input }) => {
      const now = Date.now();
      prunePresence(now);
      activeSessions.set(input.sessionId, now);
      return { active: activeSessions.size, windowSeconds: PRESENCE_WINDOW_MS / 1000 };
    }),
  active: publicProcedure.query(() => {
    prunePresence();
    return { active: activeSessions.size, windowSeconds: PRESENCE_WINDOW_MS / 1000 };
  }),
});

export const __presenceTest = { prunePresence, activeSessions, windowMs: PRESENCE_WINDOW_MS };
