import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { governanceProposals } from "../../drizzle/schema";
import { desc, eq, count } from "drizzle-orm";

function generateProposalId(): string {
  return `PROP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export const governanceRouter = router({
  getProposals: publicProcedure
    .input(z.object({
      status: z.enum(["active", "passed", "rejected", "pending", "all"]).default("all"),
      limit: z.number().min(1).max(50).default(20),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { proposals: [], totalCount: 0 };

      const proposals = input.status === "all"
        ? await db
            .select()
            .from(governanceProposals)
            .orderBy(desc(governanceProposals.createdAt))
            .limit(input.limit)
        : await db
            .select()
            .from(governanceProposals)
            .where(eq(governanceProposals.status, input.status))
            .orderBy(desc(governanceProposals.createdAt))
            .limit(input.limit);

      const countResult = await db.select({ count: count() }).from(governanceProposals);

      return {
        proposals,
        totalCount: countResult[0]?.count ?? 0,
      };
    }),

  createProposal: publicProcedure
    .input(z.object({
      title: z.string().min(10).max(256),
      description: z.string().min(20).max(2000),
      proposerName: z.string().min(1).max(128),
      proposerWallet: z.string().max(64).optional(),
      category: z.enum(["general", "treasury", "protocol", "community", "frequency", "guardian"]).default("general"),
      durationDays: z.number().min(1).max(30).default(7),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");

      const endsAt = new Date();
      endsAt.setDate(endsAt.getDate() + input.durationDays);

      const proposalId = generateProposalId();

      const [proposal] = await db
        .insert(governanceProposals)
        .values({
          proposalId,
          title: input.title,
          description: input.description,
          proposerName: input.proposerName,
          proposerWallet: input.proposerWallet,
          category: input.category,
          status: "active",
          endsAt,
        })
        .$returningId();

      return {
        success: true,
        proposalId,
        id: proposal.id,
        endsAt,
        message: `Proposal "${input.title}" submitted to the DAO. Voting ends in ${input.durationDays} days.`,
      };
    }),

  vote: publicProcedure
    .input(z.object({
      proposalId: z.string(),
      voterName: z.string().min(1).max(128),
      vote: z.enum(["for", "against"]),
      votingPower: z.number().min(1).max(1000000).default(144),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");

      const [proposal] = await db
        .select()
        .from(governanceProposals)
        .where(eq(governanceProposals.proposalId, input.proposalId))
        .limit(1);

      if (!proposal) throw new Error("Proposal not found");
      if (proposal.status !== "active") throw new Error("Voting is closed for this proposal");

      const newVotesFor = input.vote === "for" ? proposal.votesFor + input.votingPower : proposal.votesFor;
      const newVotesAgainst = input.vote === "against" ? proposal.votesAgainst + input.votingPower : proposal.votesAgainst;
      const newTotalPower = proposal.votingPower + input.votingPower;

      await db
        .update(governanceProposals)
        .set({
          votesFor: newVotesFor,
          votesAgainst: newVotesAgainst,
          votingPower: newTotalPower,
        })
        .where(eq(governanceProposals.proposalId, input.proposalId));

      return {
        success: true,
        vote: input.vote,
        votesFor: newVotesFor,
        votesAgainst: newVotesAgainst,
        totalVotingPower: newTotalPower,
        message: `Vote cast ${input.vote === "for" ? "FOR" : "AGAINST"} with ${input.votingPower} voting power.`,
      };
    }),

  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { active: 0, passed: 0, rejected: 0, total: 0 };

    const results = await db.select({ status: governanceProposals.status, count: count() })
      .from(governanceProposals)
      .groupBy(governanceProposals.status);

    const stats: Record<string, number> = { active: 0, passed: 0, rejected: 0, pending: 0 };
    for (const r of results) {
      stats[r.status] = r.count;
    }

    return {
      ...stats,
      total: Object.values(stats).reduce((a, b) => a + b, 0),
    };
  }),
});
