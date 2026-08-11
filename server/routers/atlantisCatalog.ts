import { TRPCError } from "@trpc/server";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import {
  atlantisCatalogSkus,
  catalogAssetAuditEvents,
  catalogAssetRecords,
  catalogManufacturers,
  commerceActivationConfigs,
  impactRecipients,
  users,
} from "../../drizzle/schema";
import { getDb } from "../db";
import { storagePut } from "../storage";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { submittedFashionImageReview } from "../../shared/submittedFashionImageReview";
import { supplementalFashionMediaIntake } from "../../shared/submittedFashionMediaIntake";

export const ATLANTIS_CATALOG_KEY = "atlantis-collection";
export const EXPECTED_ATLANTIS_SKUS = [
  "XLVIII-ATL-POSEIDON-01",
  "XLVIII-ATL-NEPTUNE-02",
  "XLVIII-ATL-TRIDENT-03",
  "XLVIII-ATL-MARIANA-04",
  "XLVIII-ATL-OCEANIC-05",
  "XLVIII-ATL-ABYSSAL-06",
  "XLVIII-ATL-METATRON-07",
] as const;

type CommerceGateInput = {
  config?: {
    shopifyAuthorized: boolean;
    shopifyShopDomain: string | null;
    taxPolicyUrl: string | null;
    shippingPolicyUrl: string | null;
    refundPolicyUrl: string | null;
    customerSupportEmail: string | null;
    impactDisclosureUrl: string | null;
  };
  skus: Array<{
    sku: string;
    manufacturerId: number | null;
    impactRecipientId: number | null;
    baseCostCents: number | null;
    retailPriceCents: number | null;
    taxClassification: string | null;
    fulfillmentCenter: string | null;
    refundPolicyUrl: string | null;
    productionStatus: "DRAFT" | "APPROVED" | "BLOCKED";
  }>;
  manufacturers: Array<{ id: number; agreementUrl: string | null; sampleEvidenceUrl: string | null; complianceStatus: "PENDING" | "APPROVED" | "REJECTED" }>;
  recipients: Array<{ id: number; agreementUrl: string | null; paymentDestination: string | null; allocationBasisPoints: number; status: "PENDING" | "APPROVED" | "REJECTED" }>;
  assets: Array<{ sku: string; assetKind: "HERO" | "DETAIL" | "ON_BODY"; assetUrl: string; rightsStatus: "UNVERIFIED" | "OWNER_ATTESTED" | "LICENSED" | "REJECTED"; reviewStatus: "PENDING" | "APPROVED" | "REJECTED"; evidenceDocumentUrl?: string | null; evidenceExpiresAt?: Date | null }>;
  hasShopifyAuthorization: boolean;
};

export function evaluateAtlantisCommerceGate(input: CommerceGateInput) {
  const blockers: string[] = [];
  const config = input.config;
  if (!input.hasShopifyAuthorization || !config?.shopifyAuthorized || !config.shopifyShopDomain) {
    blockers.push("Shopify authorization is not connected to the server.");
  }
  if (!config?.taxPolicyUrl || !config.shippingPolicyUrl || !config.refundPolicyUrl || !config.customerSupportEmail || !config.impactDisclosureUrl) {
    blockers.push("Customer tax, shipping, refund, support, or impact disclosure details are incomplete.");
  }

  for (const skuCode of EXPECTED_ATLANTIS_SKUS) {
    const sku = input.skus.find(item => item.sku === skuCode);
    if (!sku) {
      blockers.push(`${skuCode}: SKU record is missing.`);
      continue;
    }
    if (sku.productionStatus !== "APPROVED") blockers.push(`${skuCode}: production approval is missing.`);
    if (!sku.baseCostCents || !sku.retailPriceCents || sku.baseCostCents <= 0 || sku.retailPriceCents <= 0 || sku.retailPriceCents < sku.baseCostCents) {
      blockers.push(`${skuCode}: a valid cost and retail price are required.`);
    }
    if (!sku.taxClassification || !sku.fulfillmentCenter || !sku.refundPolicyUrl) blockers.push(`${skuCode}: tax, fulfillment, or refund assignment is incomplete.`);

    const manufacturer = input.manufacturers.find(item => item.id === sku.manufacturerId);
    if (!manufacturer || manufacturer.complianceStatus !== "APPROVED" || !manufacturer.agreementUrl || !manufacturer.sampleEvidenceUrl) {
      blockers.push(`${skuCode}: approved manufacturer agreement and sample evidence are required.`);
    }
    const recipient = input.recipients.find(item => item.id === sku.impactRecipientId);
    if (!recipient || recipient.status !== "APPROVED" || !recipient.agreementUrl || !recipient.paymentDestination || recipient.allocationBasisPoints < 700 || recipient.allocationBasisPoints > 1000) {
      blockers.push(`${skuCode}: approved 7–10% impact-recipient terms are required.`);
    }
    for (const kind of ["HERO", "DETAIL", "ON_BODY"] as const) {
      const asset = input.assets.find(item => item.sku === skuCode && item.assetKind === kind && item.reviewStatus === "APPROVED" && item.rightsStatus === "LICENSED" && Boolean(item.assetUrl) && Boolean(item.evidenceDocumentUrl) && Boolean(item.evidenceExpiresAt) && new Date(item.evidenceExpiresAt ?? 0) > new Date());
      if (!asset) blockers.push(`${skuCode}: approved ${kind.toLowerCase().replace("_", "-")} image is required.`);
    }
  }

  return {
    catalogKey: ATLANTIS_CATALOG_KEY,
    ready: blockers.length === 0,
    activationStatus: blockers.length === 0 ? "READY" : "LOCKED",
    blockers,
    requiredSkuCount: EXPECTED_ATLANTIS_SKUS.length,
    completedSkuCount: input.skus.filter(item => EXPECTED_ATLANTIS_SKUS.includes(item.sku as (typeof EXPECTED_ATLANTIS_SKUS)[number])).length,
  } as const;
}

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Catalog operations require administrator access." });
  return next({ ctx });
});

async function getCatalogRecords() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Catalog database is unavailable." });
  const [config] = await db.select().from(commerceActivationConfigs).where(eq(commerceActivationConfigs.catalogKey, ATLANTIS_CATALOG_KEY)).limit(1);
  const [skus, manufacturers, recipients, assets, reviewers] = await Promise.all([
    db.select().from(atlantisCatalogSkus).where(inArray(atlantisCatalogSkus.sku, [...EXPECTED_ATLANTIS_SKUS])),
    db.select().from(catalogManufacturers),
    db.select().from(impactRecipients),
    db.select().from(catalogAssetRecords).where(inArray(catalogAssetRecords.sku, [...EXPECTED_ATLANTIS_SKUS])),
    db.select({ id: users.id, name: users.name, email: users.email }).from(users).where(eq(users.role, "admin")),
  ]);
  const assetIds = assets.map((asset: { id: number }) => asset.id);
  const auditEvents = assetIds.length ? await db.select().from(catalogAssetAuditEvents).where(inArray(catalogAssetAuditEvents.assetId, assetIds)) : [];
  return { db, config, skus, manufacturers, recipients, assets, auditEvents, reviewers };
}

const optionalUrl = z.string().url().max(2048).optional().nullable();
const evidenceMimeType = z.enum(["application/pdf", "image/jpeg", "image/png", "image/webp"]);

export const atlantisCatalogRouter = router({
  getCommerceGate: publicProcedure.query(async () => {
    const records = await getCatalogRecords();
    const gate = evaluateAtlantisCommerceGate({
      ...records,
      hasShopifyAuthorization: Boolean(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN && process.env.SHOPIFY_SHOP_DOMAIN),
    });
    return { ...gate, catalogKey: ATLANTIS_CATALOG_KEY };
  }),

  getOperations: adminProcedure.query(async () => {
    const records = await getCatalogRecords();
    const gate = evaluateAtlantisCommerceGate({
      ...records,
      hasShopifyAuthorization: Boolean(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN && process.env.SHOPIFY_SHOP_DOMAIN),
    });
    return { ...records, gate };
  }),

  getEvidenceQueue: adminProcedure.query(async () => {
    const { assets, reviewers } = await getCatalogRecords();
    const now = new Date();
    const dueSoonCutoff = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const reviewerById = new Map(reviewers.map((reviewer: { id: number; name: string | null; email: string | null }) => [reviewer.id, reviewer]));
    const items = assets
      .filter((asset: { reviewStatus: string }) => asset.reviewStatus !== "REJECTED")
      .map((asset: { assignedReviewerUserId: number | null; evidenceExpiresAt: Date | null; evidenceDocumentUrl: string | null; [key: string]: unknown }) => {
        const expiry = asset.evidenceExpiresAt ? new Date(asset.evidenceExpiresAt) : null;
        const evidenceState = !asset.evidenceDocumentUrl ? "MISSING_EVIDENCE" : !expiry ? "MISSING_EXPIRY" : expiry <= now ? "EXPIRED" : expiry <= dueSoonCutoff ? "DUE_SOON" : "CURRENT";
        return { ...asset, evidenceState, reviewer: asset.assignedReviewerUserId ? reviewerById.get(asset.assignedReviewerUserId) ?? null : null };
      })
      .filter((asset: { evidenceState: string }) => asset.evidenceState !== "CURRENT");
    return { generatedAt: now, dueSoonCutoff, items };
  }),

  getSubmittedImageReview: adminProcedure.query(() => ({
    candidates: submittedFashionImageReview,
    summary: {
      candidateCount: submittedFashionImageReview.length,
      supplementalIntakeCount: supplementalFashionMediaIntake.length,
      trademarkReviewCount: submittedFashionImageReview.filter(item => item.requiresTrademarkReview).length,
      approvalCount: 0,
      commerceEffect: "NONE" as const,
    },
  })),

  saveManufacturer: adminProcedure.input(z.object({
    id: z.number().int().positive().optional(),
    supplierName: z.string().trim().min(2).max(255),
    legalEntityName: z.string().trim().max(255).optional().nullable(),
    countryCode: z.string().trim().max(8).optional().nullable(),
    facilityAddress: z.string().trim().max(1000).optional().nullable(),
    agreementUrl: optionalUrl,
    sampleEvidenceUrl: optionalUrl,
    reviewNotes: z.string().trim().max(5000).optional().nullable(),
  })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Catalog database is unavailable." });
    const values = { supplierName: input.supplierName, legalEntityName: input.legalEntityName ?? null, countryCode: input.countryCode ?? null, facilityAddress: input.facilityAddress ?? null, agreementUrl: input.agreementUrl ?? null, sampleEvidenceUrl: input.sampleEvidenceUrl ?? null, reviewNotes: input.reviewNotes ?? null };
    if (input.id) await db.update(catalogManufacturers).set({ ...values, complianceStatus: "PENDING", reviewedByUserId: null, reviewedAt: null }).where(eq(catalogManufacturers.id, input.id));
    else await db.insert(catalogManufacturers).values(values);
    return { success: true, status: "PENDING" as const };
  }),

  reviewManufacturer: adminProcedure.input(z.object({ id: z.number().int().positive(), decision: z.enum(["APPROVED", "REJECTED"]), reviewNotes: z.string().trim().min(3).max(5000) })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const [manufacturer] = await db.select().from(catalogManufacturers).where(eq(catalogManufacturers.id, input.id)).limit(1);
    if (!manufacturer) throw new TRPCError({ code: "NOT_FOUND", message: "Manufacturer record not found." });
    if (input.decision === "APPROVED" && (!manufacturer.agreementUrl || !manufacturer.sampleEvidenceUrl)) throw new TRPCError({ code: "BAD_REQUEST", message: "An agreement URL and sample-evidence URL are required before approval." });
    await db.update(catalogManufacturers).set({ complianceStatus: input.decision, reviewNotes: input.reviewNotes, reviewedByUserId: ctx.user.id, reviewedAt: new Date() }).where(eq(catalogManufacturers.id, input.id));
    return { success: true };
  }),

  saveImpactRecipient: adminProcedure.input(z.object({
    id: z.number().int().positive().optional(),
    displayName: z.string().trim().min(2).max(255),
    agreementUrl: optionalUrl,
    paymentDestination: z.string().trim().max(512).optional().nullable(),
    allocationBasisPoints: z.number().int().min(0).max(10000),
    reviewNotes: z.string().trim().max(5000).optional().nullable(),
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const values = { displayName: input.displayName, agreementUrl: input.agreementUrl ?? null, paymentDestination: input.paymentDestination ?? null, allocationBasisPoints: input.allocationBasisPoints, reviewNotes: input.reviewNotes ?? null };
    if (input.id) await db.update(impactRecipients).set({ ...values, status: "PENDING", reviewedByUserId: null, reviewedAt: null }).where(eq(impactRecipients.id, input.id));
    else await db.insert(impactRecipients).values(values);
    return { success: true, status: "PENDING" as const };
  }),

  reviewImpactRecipient: adminProcedure.input(z.object({ id: z.number().int().positive(), decision: z.enum(["APPROVED", "REJECTED"]), reviewNotes: z.string().trim().min(3).max(5000) })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const [recipient] = await db.select().from(impactRecipients).where(eq(impactRecipients.id, input.id)).limit(1);
    if (!recipient) throw new TRPCError({ code: "NOT_FOUND", message: "Impact-recipient record not found." });
    if (input.decision === "APPROVED" && (!recipient.agreementUrl || !recipient.paymentDestination || recipient.allocationBasisPoints < 700 || recipient.allocationBasisPoints > 1000)) throw new TRPCError({ code: "BAD_REQUEST", message: "Approval requires recipient terms, payment destination, and a 7–10% allocation." });
    await db.update(impactRecipients).set({ status: input.decision, reviewNotes: input.reviewNotes, reviewedByUserId: ctx.user.id, reviewedAt: new Date() }).where(eq(impactRecipients.id, input.id));
    return { success: true };
  }),

  saveSku: adminProcedure.input(z.object({
    sku: z.enum(EXPECTED_ATLANTIS_SKUS), setNumber: z.number().int().min(1).max(7), title: z.string().trim().min(2).max(255), manufacturerId: z.number().int().positive().optional().nullable(), impactRecipientId: z.number().int().positive().optional().nullable(), baseCostCents: z.number().int().positive().optional().nullable(), retailPriceCents: z.number().int().positive().optional().nullable(), taxClassification: z.string().trim().max(128).optional().nullable(), fulfillmentCenter: z.string().trim().max(255).optional().nullable(), refundPolicyUrl: optionalUrl, reviewNotes: z.string().trim().max(5000).optional().nullable(),
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    await db.insert(atlantisCatalogSkus).values({ ...input, manufacturerId: input.manufacturerId ?? null, impactRecipientId: input.impactRecipientId ?? null, baseCostCents: input.baseCostCents ?? null, retailPriceCents: input.retailPriceCents ?? null, taxClassification: input.taxClassification ?? null, fulfillmentCenter: input.fulfillmentCenter ?? null, refundPolicyUrl: input.refundPolicyUrl ?? null, reviewNotes: input.reviewNotes ?? null, productionStatus: "DRAFT" }).onDuplicateKeyUpdate({ set: { setNumber: input.setNumber, title: input.title, manufacturerId: input.manufacturerId ?? null, impactRecipientId: input.impactRecipientId ?? null, baseCostCents: input.baseCostCents ?? null, retailPriceCents: input.retailPriceCents ?? null, taxClassification: input.taxClassification ?? null, fulfillmentCenter: input.fulfillmentCenter ?? null, refundPolicyUrl: input.refundPolicyUrl ?? null, reviewNotes: input.reviewNotes ?? null, productionStatus: "DRAFT", reviewedByUserId: null, reviewedAt: null } });
    return { success: true, status: "DRAFT" as const };
  }),

  reviewSku: adminProcedure.input(z.object({ sku: z.enum(EXPECTED_ATLANTIS_SKUS), decision: z.enum(["APPROVED", "BLOCKED"]), reviewNotes: z.string().trim().min(3).max(5000) })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    await db.update(atlantisCatalogSkus).set({ productionStatus: input.decision, reviewNotes: input.reviewNotes, reviewedByUserId: ctx.user.id, reviewedAt: new Date() }).where(eq(atlantisCatalogSkus.sku, input.sku));
    return { success: true };
  }),

  uploadAsset: adminProcedure.input(z.object({ sku: z.enum(EXPECTED_ATLANTIS_SKUS), assetKind: z.enum(["HERO", "DETAIL", "ON_BODY"]), originalFileName: z.string().trim().min(1).max(255), mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]), base64Data: z.string().min(1).max(11_000_000), sourceReference: z.string().trim().max(5000).optional().nullable() })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rawBase64 = input.base64Data.replace(/^data:[^;]+;base64,/, "");
    const bytes = Buffer.from(rawBase64, "base64");
    if (!bytes.length || bytes.length > 8 * 1024 * 1024) throw new TRPCError({ code: "BAD_REQUEST", message: "Use an image between 1 byte and 8 MB." });
    const safeName = input.originalFileName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `atlantis-catalog/${input.sku}/${input.assetKind.toLowerCase()}-${Date.now()}-${safeName}`;
    const stored = await storagePut(key, bytes, input.mimeType);
    await db.insert(catalogAssetRecords).values({ sku: input.sku, assetKind: input.assetKind, storageKey: stored.key, assetUrl: stored.url, sourceReference: input.sourceReference ?? null, rightsStatus: "UNVERIFIED", uploadedByUserId: ctx.user.id, reviewStatus: "PENDING" });
    const [createdAsset] = await db.select().from(catalogAssetRecords).where(eq(catalogAssetRecords.storageKey, stored.key)).limit(1);
    if (!createdAsset) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Asset record could not be confirmed after upload." });
    await db.insert(catalogAssetAuditEvents).values({ assetId: createdAsset.id, action: "UPLOADED", previousStatus: null, nextStatus: "PENDING", note: input.sourceReference?.trim() ? `Uploaded with source reference: ${input.sourceReference.trim()}` : "Uploaded as a pending protected asset; source and rights review required.", actorUserId: ctx.user.id });
    return { success: true, assetUrl: stored.url, status: "PENDING" as const };
  }),

  uploadAssetEvidence: adminProcedure.input(z.object({ id: z.number().int().positive(), originalFileName: z.string().trim().min(1).max(255), mimeType: evidenceMimeType, base64Data: z.string().min(1).max(11_000_000) })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Catalog database is unavailable." });
    const [asset] = await db.select().from(catalogAssetRecords).where(eq(catalogAssetRecords.id, input.id)).limit(1);
    if (!asset) throw new TRPCError({ code: "NOT_FOUND", message: "Asset record not found." });
    const rawBase64 = input.base64Data.replace(/^data:[^;]+;base64,/, "");
    const bytes = Buffer.from(rawBase64, "base64");
    if (!bytes.length || bytes.length > 8 * 1024 * 1024) throw new TRPCError({ code: "BAD_REQUEST", message: "Use an evidence file between 1 byte and 8 MB." });
    const safeName = input.originalFileName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `atlantis-catalog/${asset.sku}/evidence/${asset.id}-${Date.now()}-${safeName}`;
    const stored = await storagePut(key, bytes, input.mimeType);
    await db.update(catalogAssetRecords).set({ evidenceDocumentUrl: stored.url }).where(eq(catalogAssetRecords.id, asset.id));
    await db.insert(catalogAssetAuditEvents).values({ assetId: asset.id, action: "NOTE", previousStatus: asset.reviewStatus, nextStatus: asset.reviewStatus, note: `Evidence document attached: ${safeName}`, actorUserId: ctx.user.id });
    return { success: true, evidenceDocumentUrl: stored.url };
  }),

  updateAssetGovernance: adminProcedure.input(z.object({ id: z.number().int().positive(), assignedReviewerUserId: z.number().int().positive().nullable(), evidenceExpiresAt: z.date().nullable() })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Catalog database is unavailable." });
    const [asset] = await db.select().from(catalogAssetRecords).where(eq(catalogAssetRecords.id, input.id)).limit(1);
    if (!asset) throw new TRPCError({ code: "NOT_FOUND", message: "Asset record not found." });
    if (input.assignedReviewerUserId) {
      const [reviewer] = await db.select({ id: users.id }).from(users).where(and(eq(users.id, input.assignedReviewerUserId), eq(users.role, "admin"))).limit(1);
      if (!reviewer) throw new TRPCError({ code: "BAD_REQUEST", message: "Choose an administrator as the asset reviewer." });
    }
    if (input.evidenceExpiresAt && input.evidenceExpiresAt <= new Date()) throw new TRPCError({ code: "BAD_REQUEST", message: "Evidence expiry must be in the future." });
    await db.update(catalogAssetRecords).set({ assignedReviewerUserId: input.assignedReviewerUserId, evidenceExpiresAt: input.evidenceExpiresAt }).where(eq(catalogAssetRecords.id, asset.id));
    const reviewerText = input.assignedReviewerUserId ? `reviewer #${input.assignedReviewerUserId}` : "no reviewer";
    const expiryText = input.evidenceExpiresAt ? `evidence expiry ${input.evidenceExpiresAt.toISOString().slice(0, 10)}` : "no evidence expiry";
    await db.insert(catalogAssetAuditEvents).values({ assetId: asset.id, action: "NOTE", previousStatus: asset.reviewStatus, nextStatus: asset.reviewStatus, note: `Governance updated: ${reviewerText}; ${expiryText}.`, actorUserId: ctx.user.id });
    return { success: true };
  }),

  reviewAsset: adminProcedure.input(z.object({ id: z.number().int().positive(), decision: z.enum(["APPROVED", "REJECTED"]), rightsStatus: z.enum(["UNVERIFIED", "OWNER_ATTESTED", "LICENSED", "REJECTED"]).optional(), reviewNotes: z.string().trim().min(3).max(5000) })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const [asset] = await db.select().from(catalogAssetRecords).where(eq(catalogAssetRecords.id, input.id)).limit(1);
    if (!asset) throw new TRPCError({ code: "NOT_FOUND", message: "Asset record not found." });
    const rightsStatus = input.rightsStatus ?? asset.rightsStatus;
    if (input.decision === "APPROVED" && rightsStatus !== "LICENSED") throw new TRPCError({ code: "BAD_REQUEST", message: "A licensed rights status is required before approving a catalog asset." });
    await db.update(catalogAssetRecords).set({ reviewStatus: input.decision, rightsStatus, reviewNotes: input.reviewNotes, reviewedByUserId: ctx.user.id, reviewedAt: new Date() }).where(eq(catalogAssetRecords.id, input.id));
    await db.insert(catalogAssetAuditEvents).values({ assetId: asset.id, action: input.decision, previousStatus: asset.reviewStatus, nextStatus: input.decision, note: input.reviewNotes, actorUserId: ctx.user.id });
    return { success: true };
  }),

  addAssetAuditNote: adminProcedure.input(z.object({ id: z.number().int().positive(), note: z.string().trim().min(3).max(5000) })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const [asset] = await db.select().from(catalogAssetRecords).where(eq(catalogAssetRecords.id, input.id)).limit(1);
    if (!asset) throw new TRPCError({ code: "NOT_FOUND", message: "Asset record not found." });
    await db.insert(catalogAssetAuditEvents).values({ assetId: asset.id, action: "NOTE", previousStatus: asset.reviewStatus, nextStatus: asset.reviewStatus, note: input.note, actorUserId: ctx.user.id });
    return { success: true };
  }),

  saveCommerceConfiguration: adminProcedure.input(z.object({ shopifyShopDomain: z.string().trim().max(255).optional().nullable(), taxPolicyUrl: optionalUrl, shippingPolicyUrl: optionalUrl, refundPolicyUrl: optionalUrl, customerSupportEmail: z.string().email().max(320).optional().nullable(), impactDisclosureUrl: optionalUrl })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const shopifyAuthorized = Boolean(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN && process.env.SHOPIFY_SHOP_DOMAIN && input.shopifyShopDomain);
    await db.insert(commerceActivationConfigs).values({ catalogKey: ATLANTIS_CATALOG_KEY, shopifyAuthorized, shopifyShopDomain: input.shopifyShopDomain ?? null, taxPolicyUrl: input.taxPolicyUrl ?? null, shippingPolicyUrl: input.shippingPolicyUrl ?? null, refundPolicyUrl: input.refundPolicyUrl ?? null, customerSupportEmail: input.customerSupportEmail ?? null, impactDisclosureUrl: input.impactDisclosureUrl ?? null, activationStatus: "LOCKED", updatedByUserId: ctx.user.id }).onDuplicateKeyUpdate({ set: { shopifyAuthorized, shopifyShopDomain: input.shopifyShopDomain ?? null, taxPolicyUrl: input.taxPolicyUrl ?? null, shippingPolicyUrl: input.shippingPolicyUrl ?? null, refundPolicyUrl: input.refundPolicyUrl ?? null, customerSupportEmail: input.customerSupportEmail ?? null, impactDisclosureUrl: input.impactDisclosureUrl ?? null, activationStatus: "LOCKED", updatedByUserId: ctx.user.id } });
    return { success: true, shopifyAuthorized, message: shopifyAuthorized ? "Shopify credentials are available to the server; the full catalog gate still controls activation." : "Shopify remains unauthorized until the connector and server credentials are configured." };
  }),

  requestActivation: adminProcedure.mutation(async () => {
    const records = await getCatalogRecords();
    const gate = evaluateAtlantisCommerceGate({ ...records, hasShopifyAuthorization: Boolean(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN && process.env.SHOPIFY_SHOP_DOMAIN) });
    if (!gate.ready) return { success: false, gate };
    await records.db.update(commerceActivationConfigs).set({ activationStatus: "READY" }).where(eq(commerceActivationConfigs.catalogKey, ATLANTIS_CATALOG_KEY));
    return { success: true, gate: { ...gate, activationStatus: "READY" as const } };
  }),
});
