import { randomUUID } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { creatorMediaAssets } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";

const mediaKind = z.enum(["IMAGE", "AUDIO", "VIDEO", "DOCUMENT", "OTHER"]);
const mediaVisibility = z.enum(["PRIVATE", "THINK_SPACE_DRAFT", "PUBLIC_PENDING_REVIEW"]);
const supportedMimeType = z.enum([
  "image/jpeg", "image/png", "image/webp", "image/gif",
  "audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4",
  "video/mp4", "video/webm", "video/quicktime",
  "application/pdf", "text/plain",
]);
const MAX_MEDIA_BYTES = 12 * 1024 * 1024;

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Creator-media storage is unavailable." });
  return db;
}

function matchesKind(kind: z.infer<typeof mediaKind>, mimeType: z.infer<typeof supportedMimeType>) {
  if (kind === "IMAGE") return mimeType.startsWith("image/");
  if (kind === "AUDIO") return mimeType.startsWith("audio/");
  if (kind === "VIDEO") return mimeType.startsWith("video/");
  if (kind === "DOCUMENT") return mimeType === "application/pdf" || mimeType === "text/plain";
  return true;
}

export const mediaIntakeRouter = router({
  getMyMedia: protectedProcedure.query(async ({ ctx }) => {
    const db = await requireDb();
    return db.select().from(creatorMediaAssets)
      .where(eq(creatorMediaAssets.ownerUserId, ctx.user.id))
      .orderBy(desc(creatorMediaAssets.updatedAt));
  }),

  createRecord: protectedProcedure.input(z.object({
    title: z.string().trim().min(3).max(180),
    description: z.string().trim().min(10).max(2000),
    mediaKind,
    visibility: mediaVisibility.default("PRIVATE"),
    provenanceNote: z.string().trim().max(2000).optional().nullable(),
    consentAttestation: z.boolean(),
  })).mutation(async ({ ctx, input }) => {
    if (!input.consentAttestation) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Confirm that you own or are permitted to share this media and that it contains no credentials, government IDs, private health records, or emergency information." });
    }
    const db = await requireDb();
    const result = await db.insert(creatorMediaAssets).values({
      ownerUserId: ctx.user.id,
      title: input.title,
      description: input.description,
      mediaKind: input.mediaKind,
      visibility: input.visibility,
      consentAttestation: true,
      provenanceNote: input.provenanceNote?.trim() || null,
      distributionStatus: "NOT_REQUESTED",
    });
    return {
      success: true,
      id: Number(result[0].insertId),
      boundary: "This is a private creator-media record. It does not publish to Think Space, grant rights, clear content, or distribute to an external service.",
    };
  }),

  uploadFile: protectedProcedure.input(z.object({
    id: z.number().int().positive(),
    originalFileName: z.string().trim().min(1).max(255),
    mimeType: supportedMimeType,
    base64Data: z.string().min(1).max(17_000_000),
  })).mutation(async ({ ctx, input }) => {
    const db = await requireDb();
    const [asset] = await db.select().from(creatorMediaAssets)
      .where(eq(creatorMediaAssets.id, input.id)).limit(1);
    if (!asset || asset.ownerUserId !== ctx.user.id) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Creator-media record not found for this account." });
    }
    if (!matchesKind(asset.mediaKind, input.mimeType)) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "The chosen file type does not match this media record's category." });
    }
    const normalizedBase64 = input.base64Data.replace(/^data:[^;]+;base64,/, "");
    let bytes: Buffer;
    try {
      bytes = Buffer.from(normalizedBase64, "base64");
    } catch {
      throw new TRPCError({ code: "BAD_REQUEST", message: "The selected file could not be decoded." });
    }
    if (bytes.length === 0 || bytes.length > MAX_MEDIA_BYTES) {
      throw new TRPCError({ code: "PAYLOAD_TOO_LARGE", message: "Creator Media Dock accepts files up to 12 MB for secure staging." });
    }
    const safeName = input.originalFileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const stored = await storagePut(`creator-media/${ctx.user.id}/${asset.id}/${randomUUID()}-${safeName}`, bytes, input.mimeType);
    await db.update(creatorMediaAssets).set({
      storageKey: stored.key,
      assetUrl: stored.url,
      originalFileName: input.originalFileName,
      mimeType: input.mimeType,
      byteSize: bytes.length,
    }).where(eq(creatorMediaAssets.id, asset.id));
    return {
      success: true,
      assetUrl: stored.url,
      byteSize: bytes.length,
      boundary: "Secure staging confirms file presence only. It does not publish, transfer rights, or create an external distribution placement.",
    };
  }),
});
