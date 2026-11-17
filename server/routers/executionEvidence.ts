import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { routeWorkWithCapabilities } from "../atlas/execution-control";
import { protectedProcedure, router } from "../_core/trpc";
import { readGitHubEvidence, readVercelEvidence } from "../integrations/provider-evidence";

const adminReadProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Provider evidence snapshots require administrator access." });
  }
  return next({ ctx });
});

/**
 * Read-only, owner/admin provider snapshot. No build, deployment, comment,
 * branch, workflow dispatch, database write, or provider mutation is exposed.
 */
export const executionEvidenceRouter = router({
  providerSnapshot: adminReadProcedure.query(async () => {
    const observedAt = new Date().toISOString();
    const [github, vercel] = await Promise.all([
      readGitHubEvidence(),
      readVercelEvidence(),
    ]);
    return {
      observedAt,
      mode: "READ_ONLY" as const,
      github,
      vercel,
    };
  }),
  routeTask: adminReadProcedure
    .input(z.object({
      task: z.string().trim().min(1).max(500),
      requiresProductionWrite: z.boolean().optional(),
      containsSensitiveData: z.boolean().optional(),
    }))
    .query(async ({ input }) => {
      const [github, vercel] = await Promise.all([
        readGitHubEvidence(),
        readVercelEvidence(),
      ]);
      const route = routeWorkWithCapabilities(input, [github.capability, vercel.capability]);
      return {
        mode: "ROUTING_ONLY" as const,
        route,
        providerStates: [github.capability, vercel.capability],
        note: "No task was executed. Only timestamped AUTHORIZED read capabilities can be selected; writes remain approval-gated.",
      };
    }),
});
