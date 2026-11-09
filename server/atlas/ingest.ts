import { createHash } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { evidenceLedger, atlasEntities, atlasRelationships } from "../../drizzle/schema";
import { getDb } from "../db";

export type AtlasSourceKind =
  | "github"
  | "chatgpt_export"
  | "manus_export"
  | "perplexity_export"
  | "gemini_export"
  | "copilot_export"
  | "grok_export"
  | "user_upload";

export type AtlasEvidenceSource = {
  sourceKey: string;
  kind: AtlasSourceKind;
  label: string;
  url?: string;
  repository?: string;
  filePath?: string;
  commitSha?: string;
  commitDate?: Date;
  commitMessage?: string;
  contentSha256?: string;
};

export type AtlasImportEntity = {
  slug: string;
  title: string;
  kind: "PROJECT" | "REPOSITORY" | "CONVERSATION" | "ARTIFACT" | "DISCOVERY" | "PERSON" | "PLATFORM" | "CONCEPT" | "DEPLOYMENT";
  summary?: string;
  source: AtlasEvidenceSource;
};

export type AtlasImportRelationship = {
  sourceSlug: string;
  targetSlug: string;
  relationType: string;
  description: string;
  source: AtlasEvidenceSource;
};

export type AtlasImportBatch = {
  batchId: string;
  entities: AtlasImportEntity[];
  relationships: AtlasImportRelationship[];
};

const SHA256 = /^[a-f0-9]{64}$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RELATION = /^[A-Z][A-Z0-9_]*$/;

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b));
    return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function validateAtlasImportBatch(batch: AtlasImportBatch): void {
  if (!/^[a-z0-9][a-z0-9._:-]{2,119}$/i.test(batch.batchId)) {
    throw new Error("Atlas batchId must be a stable 3–120 character identifier.");
  }
  const slugs = new Set<string>();
  for (const entity of batch.entities) {
    if (!SLUG.test(entity.slug)) throw new Error(`Invalid entity slug: ${entity.slug}`);
    if (slugs.has(entity.slug)) throw new Error(`Duplicate entity slug in batch: ${entity.slug}`);
    slugs.add(entity.slug);
    validateSource(entity.source);
  }
  for (const relationship of batch.relationships) {
    if (!SLUG.test(relationship.sourceSlug) || !SLUG.test(relationship.targetSlug)) {
      throw new Error("Relationship endpoints must use valid entity slugs.");
    }
    if (relationship.sourceSlug === relationship.targetSlug) throw new Error("Self relationships are not accepted.");
    if (!RELATION.test(relationship.relationType)) throw new Error(`Invalid relation type: ${relationship.relationType}`);
    if (!relationship.description.trim()) throw new Error("Every relationship requires a source-grounded description.");
    validateSource(relationship.source);
  }
}

function validateSource(source: AtlasEvidenceSource): void {
  if (!/^[a-z0-9][a-z0-9._:/-]{2,239}$/i.test(source.sourceKey)) {
    throw new Error("Every source requires a stable sourceKey.");
  }
  if (!source.label.trim()) throw new Error("Every source requires a human-readable label.");
  if (source.url) {
    const parsed = new URL(source.url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
      throw new Error("Atlas source URLs must be credential-free HTTPS URLs.");
    }
  }
  if (source.contentSha256 && !SHA256.test(source.contentSha256)) {
    throw new Error("contentSha256 must be a 64-character hexadecimal SHA-256 digest.");
  }
  if (source.commitSha && !/^[a-f0-9]{7,40}$/i.test(source.commitSha)) {
    throw new Error("Git commit references must be 7–40 hexadecimal characters.");
  }
}

export function atlasEvidenceIdentity(source: AtlasEvidenceSource) {
  const fingerprint = sha256(canonicalJson({
    sourceKey: source.sourceKey,
    kind: source.kind,
    url: source.url ?? null,
    repository: source.repository ?? null,
    filePath: source.filePath ?? null,
    commitSha: source.commitSha ?? null,
    contentSha256: source.contentSha256 ?? null,
  }));
  return {
    vaultId: `atlas:${source.sourceKey}`,
    manifestStamp: fingerprint,
    contentSha256: source.contentSha256 ?? fingerprint,
  };
}

/**
 * Idempotently imports a curated batch. Replays update descriptive source
 * metadata only; publication and visibility are never changed by ingestion.
 * Every new evidence row remains QUEUED and every new graph record remains
 * DRAFT + PRIVATE until a separate administrator review/publish action.
 */
export async function ingestAtlasBatch(batch: AtlasImportBatch) {
  validateAtlasImportBatch(batch);
  const db = await getDb();
  if (!db) throw new Error("Atlas ingestion requires the configured MySQL database.");

  return db.transaction(async (tx) => {
    const evidenceIds = new Map<string, number>();

    const allSources = new Map<string, AtlasEvidenceSource>();
    for (const entity of batch.entities) allSources.set(entity.source.sourceKey, entity.source);
    for (const edge of batch.relationships) allSources.set(edge.source.sourceKey, edge.source);

    for (const source of allSources.values()) {
      const identity = atlasEvidenceIdentity(source);
      await tx.insert(evidenceLedger).values({
        vaultId: identity.vaultId,
        workCopyPath: `atlas-sources/${source.kind}/${source.sourceKey}`.slice(0, 512),
        manifestStamp: identity.manifestStamp,
        status: "QUEUED",
        repoName: source.repository ?? null,
        filePath: source.filePath ?? null,
        contentSha256: identity.contentSha256,
        commitSha: source.commitSha ?? null,
        commitDate: source.commitDate ?? null,
        commitMessage: source.commitMessage ?? null,
        proofLink: source.url ?? null,
      }).onDuplicateKeyUpdate({
        // Stable identity collision is intentionally a no-op; never overwrite
        // an earlier evidence fingerprint with a different source revision.
        set: { vaultId: identity.vaultId },
      });
      const [evidence] = await tx.select({ id: evidenceLedger.id })
        .from(evidenceLedger).where(eq(evidenceLedger.vaultId, identity.vaultId)).limit(1);
      if (!evidence) throw new Error(`Evidence row could not be resolved: ${source.sourceKey}`);
      evidenceIds.set(source.sourceKey, evidence.id);
    }

    const entityIds = new Map<string, number>();
    for (const entity of batch.entities) {
      const sourceEvidenceId = evidenceIds.get(entity.source.sourceKey);
      if (!sourceEvidenceId) throw new Error(`Missing evidence for entity: ${entity.slug}`);
      await tx.insert(atlasEntities).values({
        slug: entity.slug,
        title: entity.title,
        kind: entity.kind,
        summary: entity.summary ?? null,
        visibility: "PRIVATE",
        status: "DRAFT",
        provenance: "SOURCE_LINKED",
        sourceLabel: entity.source.label,
        sourceUrl: entity.source.url ?? null,
        sourceEvidenceId,
      }).onDuplicateKeyUpdate({
        set: {
          title: entity.title,
          kind: entity.kind,
          summary: entity.summary ?? null,
          sourceLabel: entity.source.label,
          sourceUrl: entity.source.url ?? null,
          sourceEvidenceId,
          provenance: "SOURCE_LINKED",
        },
      });
      const [stored] = await tx.select({ id: atlasEntities.id })
        .from(atlasEntities).where(eq(atlasEntities.slug, entity.slug)).limit(1);
      if (!stored) throw new Error(`Entity could not be resolved after upsert: ${entity.slug}`);
      entityIds.set(entity.slug, stored.id);
    }

    let relationshipCount = 0;
    for (const edge of batch.relationships) {
      const sourceEntityId = entityIds.get(edge.sourceSlug);
      const targetEntityId = entityIds.get(edge.targetSlug);
      const sourceEvidenceId = evidenceIds.get(edge.source.sourceKey);
      if (!sourceEntityId || !targetEntityId || !sourceEvidenceId) {
        throw new Error(`Relationship endpoints or evidence are missing: ${edge.sourceSlug} -> ${edge.targetSlug}`);
      }
      await tx.insert(atlasRelationships).values({
        sourceEntityId,
        targetEntityId,
        relationType: edge.relationType,
        description: edge.description,
        visibility: "PRIVATE",
        status: "DRAFT",
        provenance: "SOURCE_LINKED",
        sourceLabel: edge.source.label,
        sourceUrl: edge.source.url ?? null,
        sourceEvidenceId,
      }).onDuplicateKeyUpdate({
        set: {
          description: edge.description,
          sourceLabel: edge.source.label,
          sourceUrl: edge.source.url ?? null,
          sourceEvidenceId,
          provenance: "SOURCE_LINKED",
        },
      });
      relationshipCount += 1;
    }

    return {
      batchId: batch.batchId,
      entitiesUpserted: entityIds.size,
      relationshipsUpserted: relationshipCount,
      evidenceSourcesLinked: evidenceIds.size,
      publicationChanged: false,
      status: "DRAFT_PRIVATE" as const,
    };
  });
}
