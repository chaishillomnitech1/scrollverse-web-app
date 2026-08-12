import { TRPCError } from "@trpc/server";
import { and, desc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import {
  revenueOperationReadiness,
  revenueOperationReadinessEvents,
} from "../../drizzle/schema";
import type { RevenueOperationReadiness, RevenueOperationReadinessEvent } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const readinessStatus = z.enum(["NOT_STARTED", "IN_PROGRESS", "AWAITING_OWNER", "BLOCKED", "READY"]);
const operationCategory = z.enum(["PAYMENT", "BOOKING", "COMMERCE", "CREATOR", "GITHUB", "SECURITY"]);

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Revenue Operations records require administrator access." });
  return next({ ctx });
});

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Revenue Operations storage is unavailable." });
  return db;
}

function summarize(records: RevenueOperationReadiness[]) {
  return {
    total: records.length,
    ready: records.filter(record => record.readinessStatus === "READY").length,
    awaitingOwner: records.filter(record => record.readinessStatus === "AWAITING_OWNER").length,
    blocked: records.filter(record => record.readinessStatus === "BLOCKED").length,
    boundary: "Readiness records organize evidence and owner actions only. They do not activate payments, providers, payouts, contracts, tokens, or deployments.",
  };
}

async function getWorkspace() {
  const db = await requireDb();
  const records: RevenueOperationReadiness[] = await db.select().from(revenueOperationReadiness).orderBy(desc(revenueOperationReadiness.updatedAt));
  const events: RevenueOperationReadinessEvent[] = records.length
    ? await db.select().from(revenueOperationReadinessEvents).where(inArray(revenueOperationReadinessEvents.readinessRecordId, records.map(record => record.id))).orderBy(desc(revenueOperationReadinessEvents.createdAt))
    : [];
  return {
    records: records.map(record => ({ ...record, events: events.filter(event => event.readinessRecordId === record.id) })),
    summary: summarize(records),
    schedules: [
      { key: "fashion-evidence", label: "Fashion evidence expiry digest", cadence: "Daily · 09:00 UTC", state: "ACTIVE", scope: "Non-transactional owner reminder for evidence expiry. No commerce action." },
      { key: "revenue-readiness", label: "Revenue readiness review digest", cadence: "Pending registration", state: "PLANNED", scope: "Will summarize owner-controlled readiness states and never initiate a payment, payout, or deployment." },
    ],
  };
}

const recordInput = z.object({
  operationKey: z.string().trim().min(3).max(96).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only."),
  title: z.string().trim().min(3).max(180),
  category: operationCategory,
  readinessStatus,
  evidenceSummary: z.string().trim().min(12).max(2000),
  evidenceUrl: z.string().trim().url().max(2048).optional().nullable(),
  nextOwnerAction: z.string().trim().min(3).max(1000),
  ownerAttestation: z.boolean(),
});

export const revenueOperationsRouter = router({
  getWorkspace: adminProcedure.query(() => getWorkspace()),

  createReadinessRecord: adminProcedure.input(recordInput).mutation(async ({ ctx, input }) => {
    if (input.readinessStatus === "READY" && !input.ownerAttestation) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Confirm the owner attestation before recording a readiness state of READY." });
    }
    const db = await requireDb();
    const result = await db.insert(revenueOperationReadiness).values({
      ...input,
      evidenceUrl: input.evidenceUrl?.trim() || null,
      updatedByUserId: ctx.user.id,
      lastReviewedAt: new Date(),
    });
    const id = Number(result[0].insertId);
    await db.insert(revenueOperationReadinessEvents).values({
      readinessRecordId: id,
      action: "CREATED",
      nextStatus: input.readinessStatus,
      note: "Owner-controlled readiness record created. This is not a provider activation, commercial approval, payment instruction, or deployment authorization.",
      actorUserId: ctx.user.id,
    });
    return { success: true, id, boundary: "The record captures internal readiness evidence only." };
  }),

  updateReadinessRecord: adminProcedure.input(recordInput.extend({ id: z.number().int().positive(), note: z.string().trim().min(3).max(1500) })).mutation(async ({ ctx, input }) => {
    if (input.readinessStatus === "READY" && !input.ownerAttestation) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Confirm the owner attestation before recording a readiness state of READY." });
    }
    const db = await requireDb();
    const [existing] = await db.select().from(revenueOperationReadiness).where(eq(revenueOperationReadiness.id, input.id)).limit(1);
    if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Revenue Operations record not found." });
    await db.update(revenueOperationReadiness).set({
      operationKey: input.operationKey,
      title: input.title,
      category: input.category,
      readinessStatus: input.readinessStatus,
      evidenceSummary: input.evidenceSummary,
      evidenceUrl: input.evidenceUrl?.trim() || null,
      nextOwnerAction: input.nextOwnerAction,
      ownerAttestation: input.ownerAttestation,
      updatedByUserId: ctx.user.id,
      lastReviewedAt: new Date(),
    }).where(eq(revenueOperationReadiness.id, existing.id));
    await db.insert(revenueOperationReadinessEvents).values({
      readinessRecordId: existing.id,
      action: existing.readinessStatus === input.readinessStatus ? "NOTE" : "STATUS_CHANGED",
      previousStatus: existing.readinessStatus,
      nextStatus: input.readinessStatus,
      note: input.note,
      actorUserId: ctx.user.id,
    });
    return { success: true, readinessStatus: input.readinessStatus, boundary: "Updating a readiness record does not activate any external system." };
  }),

  addReadinessNote: adminProcedure.input(z.object({ id: z.number().int().positive(), note: z.string().trim().min(3).max(1500) })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [record] = await db.select().from(revenueOperationReadiness).where(eq(revenueOperationReadiness.id, input.id)).limit(1);
    if (!record) throw new TRPCError({ code: "NOT_FOUND", message: "Revenue Operations record not found." });
    await db.insert(revenueOperationReadinessEvents).values({ readinessRecordId: record.id, action: "NOTE", nextStatus: record.readinessStatus, note: input.note, actorUserId: ctx.user.id });
    return { success: true };
  }),
});
