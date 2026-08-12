import { and, desc, eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  creatorReleaseAssetEvents,
  creatorReleaseAssets,
  creatorSupportRequestEvents,
  creatorSupportRequests,
  provenanceRecords,
  users,
} from "../../drizzle/schema";
import type {
  CreatorReleaseAsset,
  CreatorReleaseAssetEvent,
  CreatorSupportRequest,
  CreatorSupportRequestEvent,
} from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const supportCategory = z.enum(["ACCESS", "CREATOR_WORKSPACE", "RELEASE_PLANNING", "PROVENANCE", "OTHER"]);
const supportStatus = z.enum(["IN_REVIEW", "AWAITING_CREATOR", "RESOLVED", "CLOSED"]);
const releaseAssetKind = z.enum(["APP_ICON", "SCREENSHOT", "STORE_COPY", "PRIVACY_COPY", "RELEASE_NOTE", "SUPPORT_POLICY", "OTHER"]);
const releaseAssetDecision = z.enum(["ACKNOWLEDGED", "NEEDS_INFO", "EXCLUDED"]);

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Creator-operations storage is unavailable." });
  return db;
}

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Creator-operations review requires administrator access." });
  return next({ ctx });
});

async function getMyOperations(userId: number) {
  const db = await requireDb();
  const [supportRequests, releaseAssets, provenanceCandidates] = await Promise.all([
    db.select().from(creatorSupportRequests).where(eq(creatorSupportRequests.requesterUserId, userId)).orderBy(desc(creatorSupportRequests.updatedAt)),
    db.select().from(creatorReleaseAssets).where(eq(creatorReleaseAssets.ownerUserId, userId)).orderBy(desc(creatorReleaseAssets.updatedAt)),
    db.select({ id: provenanceRecords.id, title: provenanceRecords.title, reviewStatus: provenanceRecords.reviewStatus }).from(provenanceRecords).where(eq(provenanceRecords.ownerUserId, userId)).orderBy(desc(provenanceRecords.updatedAt)),
  ]);
  const [supportEvents, assetEvents] = await Promise.all([
    supportRequests.length ? db.select().from(creatorSupportRequestEvents).where(inArray(creatorSupportRequestEvents.supportRequestId, supportRequests.map((request: CreatorSupportRequest) => request.id))).orderBy(desc(creatorSupportRequestEvents.createdAt)) : Promise.resolve([]),
    releaseAssets.length ? db.select().from(creatorReleaseAssetEvents).where(inArray(creatorReleaseAssetEvents.releaseAssetId, releaseAssets.map((asset: CreatorReleaseAsset) => asset.id))).orderBy(desc(creatorReleaseAssetEvents.createdAt)) : Promise.resolve([]),
  ]);
  return {
    supportRequests: supportRequests.map((request: CreatorSupportRequest) => ({ ...request, events: supportEvents.filter((event: CreatorSupportRequestEvent) => event.supportRequestId === request.id) })),
    releaseAssets: releaseAssets.map((asset: CreatorReleaseAsset) => ({ ...asset, events: assetEvents.filter((event: CreatorReleaseAssetEvent) => event.releaseAssetId === asset.id) })),
    provenanceCandidates,
  };
}

export const creatorOperationsRouter = router({
  getMyOperations: protectedProcedure.query(({ ctx }) => getMyOperations(ctx.user.id)),

  createSupportRequest: protectedProcedure.input(z.object({
    category: supportCategory,
    subject: z.string().trim().min(3).max(180),
    details: z.string().trim().min(12).max(2000),
    requesterAttestation: z.boolean(),
  })).mutation(async ({ ctx, input }) => {
    if (!input.requesterAttestation) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Confirm that this request contains no credentials, payment data, government IDs, or emergency information." });
    const db = await requireDb();
    const result = await db.insert(creatorSupportRequests).values({
      requesterUserId: ctx.user.id,
      category: input.category,
      subject: input.subject,
      details: input.details,
      requesterAttestation: true,
      status: "OPEN",
    });
    const id = Number(result[0].insertId);
    await db.insert(creatorSupportRequestEvents).values({ supportRequestId: id, action: "CREATED", note: "Creator support request opened. A status is not a guarantee of response timing or outcome.", actorUserId: ctx.user.id });
    return { success: true, id, status: "OPEN" as const };
  }),

  addSupportNote: protectedProcedure.input(z.object({ id: z.number().int().positive(), note: z.string().trim().min(3).max(1500) })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [request] = await db.select().from(creatorSupportRequests).where(and(eq(creatorSupportRequests.id, input.id), eq(creatorSupportRequests.requesterUserId, ctx.user.id))).limit(1);
    if (!request) throw new TRPCError({ code: "NOT_FOUND", message: "Support request not found for this account." });
    if (request.status === "CLOSED") throw new TRPCError({ code: "CONFLICT", message: "Closed support requests cannot receive additional notes." });
    await db.insert(creatorSupportRequestEvents).values({ supportRequestId: request.id, action: "NOTE", note: input.note, actorUserId: ctx.user.id });
    return { success: true };
  }),

  createReleaseAsset: protectedProcedure.input(z.object({
    assetKind: releaseAssetKind,
    title: z.string().trim().min(3).max(180),
    description: z.string().trim().min(10).max(2000),
    sourceReference: z.string().trim().max(2048).optional().nullable(),
    provenanceRecordId: z.number().int().positive().optional().nullable(),
    ownerAttestation: z.boolean(),
  })).mutation(async ({ ctx, input }) => {
    if (!input.ownerAttestation) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Confirm that this record is an honest release-material note and does not contain private credentials or sensitive data." });
    const db = await requireDb();
    if (input.provenanceRecordId) {
      const [record] = await db.select({ id: provenanceRecords.id }).from(provenanceRecords).where(and(eq(provenanceRecords.id, input.provenanceRecordId), eq(provenanceRecords.ownerUserId, ctx.user.id))).limit(1);
      if (!record) throw new TRPCError({ code: "NOT_FOUND", message: "Selected provenance record is not available for this account." });
    }
    const result = await db.insert(creatorReleaseAssets).values({
      ownerUserId: ctx.user.id,
      provenanceRecordId: input.provenanceRecordId ?? null,
      assetKind: input.assetKind,
      title: input.title,
      description: input.description,
      sourceReference: input.sourceReference?.trim() || null,
      ownerAttestation: true,
      reviewStatus: "DRAFT",
    });
    const id = Number(result[0].insertId);
    await db.insert(creatorReleaseAssetEvents).values({ releaseAssetId: id, action: "CREATED", note: "Private release-asset record created. This is not a store listing, clearance decision, or proof of shipment.", actorUserId: ctx.user.id });
    return { success: true, id, reviewStatus: "DRAFT" as const };
  }),

  submitReleaseAsset: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [asset] = await db.select().from(creatorReleaseAssets).where(and(eq(creatorReleaseAssets.id, input.id), eq(creatorReleaseAssets.ownerUserId, ctx.user.id))).limit(1);
    if (!asset) throw new TRPCError({ code: "NOT_FOUND", message: "Release-asset record not found for this account." });
    if (!asset.ownerAttestation) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Confirm the release-asset attestation before requesting completeness review." });
    if (asset.reviewStatus !== "DRAFT" && asset.reviewStatus !== "NEEDS_INFO") throw new TRPCError({ code: "CONFLICT", message: "Only draft or information-requested release assets can be submitted." });
    await db.update(creatorReleaseAssets).set({ reviewStatus: "SUBMITTED", submittedAt: new Date(), reviewedByUserId: null, reviewedAt: null }).where(eq(creatorReleaseAssets.id, asset.id));
    await db.insert(creatorReleaseAssetEvents).values({ releaseAssetId: asset.id, action: "SUBMITTED", note: "Submitted for protected completeness feedback; no legal, platform, or commercial approval is implied.", actorUserId: ctx.user.id });
    return { success: true, reviewStatus: "SUBMITTED" as const };
  }),

  getSupportReviewQueue: adminProcedure.query(async () => {
    const db = await requireDb();
    const requests: CreatorSupportRequest[] = await db.select().from(creatorSupportRequests).where(inArray(creatorSupportRequests.status, ["OPEN", "IN_REVIEW", "AWAITING_CREATOR"])).orderBy(desc(creatorSupportRequests.updatedAt));
    const requesterIds = Array.from(new Set(requests.map(request => request.requesterUserId)));
    const requesters: Array<{ id: number; name: string | null }> = requesterIds.length ? await db.select({ id: users.id, name: users.name }).from(users).where(inArray(users.id, requesterIds)) : [];
    const requesterById = new Map(requesters.map(requester => [requester.id, requester]));
    const events: CreatorSupportRequestEvent[] = requests.length ? await db.select().from(creatorSupportRequestEvents).where(inArray(creatorSupportRequestEvents.supportRequestId, requests.map(request => request.id))).orderBy(desc(creatorSupportRequestEvents.createdAt)) : [];
    return requests.map(request => ({ ...request, requester: requesterById.get(request.requesterUserId) ?? null, events: events.filter(event => event.supportRequestId === request.id) }));
  }),

  reviewSupportRequest: adminProcedure.input(z.object({ id: z.number().int().positive(), status: supportStatus, note: z.string().trim().min(3).max(1500) })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [request] = await db.select().from(creatorSupportRequests).where(eq(creatorSupportRequests.id, input.id)).limit(1);
    if (!request) throw new TRPCError({ code: "NOT_FOUND", message: "Support request not found." });
    const action = input.status;
    await db.update(creatorSupportRequests).set({ status: input.status, assignedReviewerUserId: ctx.user.id }).where(eq(creatorSupportRequests.id, request.id));
    await db.insert(creatorSupportRequestEvents).values({ supportRequestId: request.id, action, note: input.note, actorUserId: ctx.user.id });
    return { success: true, status: input.status, reviewMeaning: "Operational status only; this is not a legal, medical, financial, or external-provider decision." };
  }),

  getReleaseAssetReviewQueue: adminProcedure.query(async () => {
    const db = await requireDb();
    const assets: CreatorReleaseAsset[] = await db.select().from(creatorReleaseAssets).where(inArray(creatorReleaseAssets.reviewStatus, ["SUBMITTED", "NEEDS_INFO", "ACKNOWLEDGED"])).orderBy(desc(creatorReleaseAssets.updatedAt));
    const ownerIds = Array.from(new Set(assets.map(asset => asset.ownerUserId)));
    const owners: Array<{ id: number; name: string | null }> = ownerIds.length ? await db.select({ id: users.id, name: users.name }).from(users).where(inArray(users.id, ownerIds)) : [];
    const ownerById = new Map(owners.map(owner => [owner.id, owner]));
    const events: CreatorReleaseAssetEvent[] = assets.length ? await db.select().from(creatorReleaseAssetEvents).where(inArray(creatorReleaseAssetEvents.releaseAssetId, assets.map(asset => asset.id))).orderBy(desc(creatorReleaseAssetEvents.createdAt)) : [];
    return assets.map(asset => ({ ...asset, owner: ownerById.get(asset.ownerUserId) ?? null, events: events.filter(event => event.releaseAssetId === asset.id) }));
  }),

  reviewReleaseAsset: adminProcedure.input(z.object({ id: z.number().int().positive(), decision: releaseAssetDecision, note: z.string().trim().min(3).max(1500) })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [asset] = await db.select().from(creatorReleaseAssets).where(eq(creatorReleaseAssets.id, input.id)).limit(1);
    if (!asset || asset.reviewStatus === "DRAFT") throw new TRPCError({ code: "NOT_FOUND", message: "Submitted release-asset record not found." });
    await db.update(creatorReleaseAssets).set({ reviewStatus: input.decision, reviewedByUserId: ctx.user.id, reviewedAt: new Date() }).where(eq(creatorReleaseAssets.id, asset.id));
    await db.insert(creatorReleaseAssetEvents).values({ releaseAssetId: asset.id, action: input.decision, note: input.note, actorUserId: ctx.user.id });
    return { success: true, reviewStatus: input.decision, reviewMeaning: "Completeness feedback only; this is not external-store acceptance, legal clearance, or commercial approval." };
  }),
});
