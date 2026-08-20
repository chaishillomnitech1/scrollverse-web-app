import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createLocalRoyaltyRecord, listLocalRoyaltyRecords } from "../db";
import { adminProcedure, router } from "../_core/trpc";

const royaltyRecordInput = z.object({
  recordReference: z.string().trim().min(4).max(160),
  assetLabel: z.string().trim().min(1).max(32).default("LONDC"),
  networkLabel: z.string().trim().max(64).optional(),
  submittedTransactionReference: z.string().trim().max(160).optional(),
  counterpartyReference: z.string().trim().max(160).optional(),
  declaredAmount: z.string().trim().max(80).optional(),
  declaredUnit: z.string().trim().min(1).max(32).default("LONDC"),
  sourceReference: z.string().trim().url().max(2048).optional(),
  sourceNote: z.string().trim().min(8).max(2000),
  observedAt: z.coerce.date().optional(),
});

/**
 * Owner-only source records. These procedures are intentionally manual and
 * non-custodial: they save an operator-supplied reference but do not query,
 * validate, submit, sign, transmit, or move anything outside this database.
 */
export const royaltyRecordsRouter = router({
  list: adminProcedure.query(({ ctx }) => listLocalRoyaltyRecords(ctx.user.id)),
  record: adminProcedure.input(royaltyRecordInput).mutation(async ({ ctx, input }) => {
    const created = await createLocalRoyaltyRecord({
      ownerUserId: ctx.user.id,
      recordReference: input.recordReference,
      assetLabel: input.assetLabel,
      networkLabel: input.networkLabel,
      submittedTransactionReference: input.submittedTransactionReference,
      counterpartyReference: input.counterpartyReference,
      declaredAmount: input.declaredAmount,
      declaredUnit: input.declaredUnit,
      sourceReference: input.sourceReference,
      sourceNote: input.sourceNote,
      observedAt: input.observedAt,
      reviewStatus: "DRAFT",
    });
    if (!created) throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "Local royalty record storage is unavailable." });
    return created;
  }),
});
