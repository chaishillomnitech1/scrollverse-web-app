import { TRPCError } from "@trpc/server";
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
});
