import { TRPCError } from "@trpc/server";
import { and, desc, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  collaborationRequests,
  creatorGovernanceProfiles,
  provenanceRecords,
  provenanceReviewEvents,
  users,
} from "../../drizzle/schema";
import type { CollaborationRequest, CreatorGovernanceProfile, ProvenanceRecord, ProvenanceReviewEvent } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

const collaborationType = z.enum(["INTRODUCTION", "CO_CREATE", "FEEDBACK", "RESEARCH"]);
const provenanceType = z.enum(["IDEA", "TEXT", "VISUAL", "AUDIO", "DESIGN", "RESEARCH"]);
const provenanceSource = z.enum(["ORIGINAL", "LICENSED", "PUBLIC_DOMAIN", "COLLABORATIVE", "UNVERIFIED"]);

const profileInput = z.object({
  displayName: z.string().trim().min(2).max(120),
  bio: z.string().trim().max(600).optional().nullable(),
  disciplines: z.array(z.string().trim().min(2).max(40)).min(1).max(8).transform(items => Array.from(new Set(items))),
  signatureStatement: z.string().trim().max(600).optional().nullable(),
  originStatement: z.string().trim().max(600).optional().nullable(),
  isPublic: z.boolean(),
  collaborationEnabled: z.boolean(),
  confirmPublicProfileConsent: z.boolean(),
  confirmCollaborationConsent: z.boolean(),
});

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Creator-governance storage is unavailable." });
  return db;
}

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Provenance review requires administrator access." });
  return next({ ctx });
});

function publicKey() {
  return `creator_${nanoid(16)}`;
}

export const creatorGovernanceRouter = router({
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    const [profile] = await db.select().from(creatorGovernanceProfiles).where(eq(creatorGovernanceProfiles.userId, ctx.user.id)).limit(1);
    return profile ?? null;
  }),

  saveMyProfile: protectedProcedure.input(profileInput).mutation(async ({ ctx, input }) => {
    if (input.isPublic && !input.confirmPublicProfileConsent) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Confirm public-profile consent before making a profile discoverable." });
    }
    if (input.collaborationEnabled && (!input.isPublic || !input.confirmCollaborationConsent)) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Collaboration requests require a public profile and explicit collaboration consent." });
    }

    const db = await requireDb();
    const [existing] = await db.select().from(creatorGovernanceProfiles).where(eq(creatorGovernanceProfiles.userId, ctx.user.id)).limit(1);
    const now = new Date();
    const values = {
      displayName: input.displayName,
      bio: input.bio?.trim() || null,
      disciplines: input.disciplines,
      signatureStatement: input.signatureStatement?.trim() || null,
      originStatement: input.originStatement?.trim() || null,
      isPublic: input.isPublic,
      collaborationEnabled: input.collaborationEnabled,
      publicProfileConsentAt: input.isPublic ? now : null,
      collaborationConsentAt: input.collaborationEnabled ? now : null,
    };
    if (existing) {
      await db.update(creatorGovernanceProfiles).set(values).where(eq(creatorGovernanceProfiles.userId, ctx.user.id));
      return { success: true, publicProfileKey: existing.publicProfileKey };
    }
    const publicProfileKey = publicKey();
    await db.insert(creatorGovernanceProfiles).values({ userId: ctx.user.id, publicProfileKey, ...values });
    return { success: true, publicProfileKey };
  }),

  listPublicProfiles: publicProcedure.input(z.object({ limit: z.number().int().min(1).max(48).default(24) }).optional()).query(async ({ input }) => {
    const db = await requireDb();
    return db.select({
      publicProfileKey: creatorGovernanceProfiles.publicProfileKey,
      displayName: creatorGovernanceProfiles.displayName,
      bio: creatorGovernanceProfiles.bio,
      disciplines: creatorGovernanceProfiles.disciplines,
      signatureStatement: creatorGovernanceProfiles.signatureStatement,
      originStatement: creatorGovernanceProfiles.originStatement,
      collaborationEnabled: creatorGovernanceProfiles.collaborationEnabled,
      updatedAt: creatorGovernanceProfiles.updatedAt,
    }).from(creatorGovernanceProfiles)
      .where(eq(creatorGovernanceProfiles.isPublic, true))
      .orderBy(desc(creatorGovernanceProfiles.updatedAt))
      .limit(input?.limit ?? 24);
  }),

  sendCollaborationRequest: protectedProcedure.input(z.object({
    recipientPublicProfileKey: z.string().trim().min(8).max(32),
    requestType: collaborationType,
    projectTitle: z.string().trim().min(3).max(160),
    message: z.string().trim().min(12).max(1500),
  })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [recipient] = await db.select().from(creatorGovernanceProfiles).where(and(
      eq(creatorGovernanceProfiles.publicProfileKey, input.recipientPublicProfileKey),
      eq(creatorGovernanceProfiles.isPublic, true),
      eq(creatorGovernanceProfiles.collaborationEnabled, true),
    )).limit(1);
    if (!recipient) throw new TRPCError({ code: "NOT_FOUND", message: "This creator is not currently accepting collaboration requests." });
    if (recipient.userId === ctx.user.id) throw new TRPCError({ code: "BAD_REQUEST", message: "You cannot send a collaboration request to your own profile." });
    const [existing] = await db.select({ id: collaborationRequests.id }).from(collaborationRequests).where(and(
      eq(collaborationRequests.requesterUserId, ctx.user.id),
      eq(collaborationRequests.recipientUserId, recipient.userId),
      eq(collaborationRequests.projectTitle, input.projectTitle),
      eq(collaborationRequests.status, "PENDING"),
    )).limit(1);
    if (existing) throw new TRPCError({ code: "CONFLICT", message: "A matching collaboration request is already pending." });
    const result = await db.insert(collaborationRequests).values({
      requesterUserId: ctx.user.id,
      recipientUserId: recipient.userId,
      requestType: input.requestType,
      projectTitle: input.projectTitle,
      message: input.message,
    });
    return { success: true, id: Number(result[0].insertId), status: "PENDING" as const };
  }),

  getMyCollaborationRequests: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    const [incoming, outgoing]: [CollaborationRequest[], CollaborationRequest[]] = await Promise.all([
      db.select().from(collaborationRequests).where(eq(collaborationRequests.recipientUserId, ctx.user.id)).orderBy(desc(collaborationRequests.updatedAt)),
      db.select().from(collaborationRequests).where(eq(collaborationRequests.requesterUserId, ctx.user.id)).orderBy(desc(collaborationRequests.updatedAt)),
    ]);
    const ids: number[] = Array.from(new Set([...incoming.map((item: CollaborationRequest) => item.requesterUserId), ...outgoing.map((item: CollaborationRequest) => item.recipientUserId)]));
    const relatedProfiles: Array<Pick<CreatorGovernanceProfile, "userId" | "displayName" | "publicProfileKey">> = ids.length ? await db.select({ userId: creatorGovernanceProfiles.userId, displayName: creatorGovernanceProfiles.displayName, publicProfileKey: creatorGovernanceProfiles.publicProfileKey }).from(creatorGovernanceProfiles).where(inArray(creatorGovernanceProfiles.userId, ids)) : [];
    const profileByUserId = new Map(relatedProfiles.map(profile => [profile.userId, profile]));
    return {
      incoming: incoming.map((request: CollaborationRequest) => ({ ...request, requester: profileByUserId.get(request.requesterUserId) ?? null })),
      outgoing: outgoing.map((request: CollaborationRequest) => ({ ...request, recipient: profileByUserId.get(request.recipientUserId) ?? null })),
    };
  }),

  respondToCollaborationRequest: protectedProcedure.input(z.object({ id: z.number().int().positive(), decision: z.enum(["ACCEPTED", "DECLINED"]) })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [request] = await db.select().from(collaborationRequests).where(eq(collaborationRequests.id, input.id)).limit(1);
    if (!request || request.recipientUserId !== ctx.user.id) throw new TRPCError({ code: "NOT_FOUND", message: "Collaboration request not found for this account." });
    if (request.status !== "PENDING") throw new TRPCError({ code: "CONFLICT", message: "Only pending collaboration requests can be answered." });
    await db.update(collaborationRequests).set({ status: input.decision, respondedAt: new Date() }).where(eq(collaborationRequests.id, input.id));
    return { success: true, status: input.decision };
  }),

  withdrawCollaborationRequest: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const result = await db.update(collaborationRequests).set({ status: "WITHDRAWN" }).where(and(
      eq(collaborationRequests.id, input.id),
      eq(collaborationRequests.requesterUserId, ctx.user.id),
      eq(collaborationRequests.status, "PENDING"),
    ));
    if (!result[0].affectedRows) throw new TRPCError({ code: "NOT_FOUND", message: "Pending collaboration request not found for this account." });
    return { success: true };
  }),

  listMyProvenance: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    const records: ProvenanceRecord[] = await db.select().from(provenanceRecords).where(eq(provenanceRecords.ownerUserId, ctx.user.id)).orderBy(desc(provenanceRecords.updatedAt));
    const ids: number[] = records.map((record: ProvenanceRecord) => record.id);
    const events: ProvenanceReviewEvent[] = ids.length ? await db.select().from(provenanceReviewEvents).where(inArray(provenanceReviewEvents.provenanceRecordId, ids)).orderBy(desc(provenanceReviewEvents.createdAt)) : [];
    return records.map((record: ProvenanceRecord) => ({ ...record, events: events.filter((event: ProvenanceReviewEvent) => event.provenanceRecordId === record.id) }));
  }),

  createProvenanceRecord: protectedProcedure.input(z.object({
    title: z.string().trim().min(3).max(180),
    recordType: provenanceType,
    summary: z.string().trim().min(10).max(2000),
    sourceCategory: provenanceSource,
    sourceReference: z.string().trim().max(2048).optional().nullable(),
    ownerAttestation: z.boolean(),
  })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const result = await db.insert(provenanceRecords).values({
      ownerUserId: ctx.user.id,
      title: input.title,
      recordType: input.recordType,
      summary: input.summary,
      sourceCategory: input.sourceCategory,
      sourceReference: input.sourceReference?.trim() || null,
      ownerAttestation: input.ownerAttestation,
      reviewStatus: "DRAFT",
    });
    const id = Number(result[0].insertId);
    await db.insert(provenanceReviewEvents).values({ provenanceRecordId: id, action: "CREATED", note: "Private provenance record created. This is not a legal ownership determination.", actorUserId: ctx.user.id });
    return { success: true, id, reviewStatus: "DRAFT" as const };
  }),

  submitProvenanceRecord: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [record] = await db.select().from(provenanceRecords).where(and(eq(provenanceRecords.id, input.id), eq(provenanceRecords.ownerUserId, ctx.user.id))).limit(1);
    if (!record) throw new TRPCError({ code: "NOT_FOUND", message: "Provenance record not found for this account." });
    if (!record.ownerAttestation) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Confirm your provenance attestation before submitting a record for completeness review." });
    if (record.reviewStatus !== "DRAFT" && record.reviewStatus !== "NEEDS_INFO") throw new TRPCError({ code: "CONFLICT", message: "Only draft or information-requested records can be submitted." });
    const now = new Date();
    await db.update(provenanceRecords).set({ reviewStatus: "SUBMITTED", submittedAt: now, reviewedByUserId: null, reviewedAt: null }).where(eq(provenanceRecords.id, record.id));
    await db.insert(provenanceReviewEvents).values({ provenanceRecordId: record.id, action: "SUBMITTED", note: "Submitted for protected completeness review; no legal or commercial conclusion is implied.", actorUserId: ctx.user.id });
    return { success: true, reviewStatus: "SUBMITTED" as const };
  }),

  getProvenanceReviewQueue: adminProcedure.query(async () => {
    const db = await requireDb();
    const records: ProvenanceRecord[] = await db.select().from(provenanceRecords).where(inArray(provenanceRecords.reviewStatus, ["SUBMITTED", "NEEDS_INFO", "ACKNOWLEDGED"])).orderBy(desc(provenanceRecords.updatedAt));
    const ownerIds: number[] = Array.from(new Set(records.map((record: ProvenanceRecord) => record.ownerUserId)));
    const owners: Array<{ id: number; name: string | null }> = ownerIds.length ? await db.select({ id: users.id, name: users.name }).from(users).where(inArray(users.id, ownerIds)) : [];
    const ownerById = new Map(owners.map(owner => [owner.id, owner]));
    const ids: number[] = records.map((record: ProvenanceRecord) => record.id);
    const events: ProvenanceReviewEvent[] = ids.length ? await db.select().from(provenanceReviewEvents).where(inArray(provenanceReviewEvents.provenanceRecordId, ids)).orderBy(desc(provenanceReviewEvents.createdAt)) : [];
    return records.map((record: ProvenanceRecord) => ({ ...record, owner: ownerById.get(record.ownerUserId) ?? null, events: events.filter((event: ProvenanceReviewEvent) => event.provenanceRecordId === record.id) }));
  }),

  reviewProvenanceRecord: adminProcedure.input(z.object({ id: z.number().int().positive(), decision: z.enum(["ACKNOWLEDGED", "NEEDS_INFO"]), note: z.string().trim().min(3).max(1500) })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [record] = await db.select().from(provenanceRecords).where(eq(provenanceRecords.id, input.id)).limit(1);
    if (!record || record.reviewStatus === "DRAFT") throw new TRPCError({ code: "NOT_FOUND", message: "Submitted provenance record not found." });
    const now = new Date();
    await db.update(provenanceRecords).set({ reviewStatus: input.decision, reviewedByUserId: ctx.user.id, reviewedAt: now }).where(eq(provenanceRecords.id, input.id));
    await db.insert(provenanceReviewEvents).values({ provenanceRecordId: input.id, action: input.decision, note: input.note, actorUserId: ctx.user.id });
    return { success: true, reviewStatus: input.decision, reviewMeaning: "Completeness feedback only; this is not a legal ownership, licensing, valuation, or commercial-readiness determination." };
  }),
});
