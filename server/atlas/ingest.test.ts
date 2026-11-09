import { describe, expect, it } from "vitest";
import { atlasEvidenceIdentity, validateAtlasImportBatch, type AtlasImportBatch } from "./ingest";
import { normalizeAtlasExternalDocument } from "./adapters";
import { atlasFoundationBatch } from "../../data/atlas/foundation.v1";

const source = {
  sourceKey: "github:repo:file",
  kind: "github" as const,
  label: "GitHub source",
  url: "https://github.com/example/project/blob/main/README.md",
};

const batch: AtlasImportBatch = {
  batchId: "atlas-test-batch-v1",
  entities: [
    { slug: "project-a", title: "Project A", kind: "PROJECT", source },
    { slug: "project-b", title: "Project B", kind: "PROJECT", source },
  ],
  relationships: [{
    sourceSlug: "project-a",
    targetSlug: "project-b",
    relationType: "DOCUMENTED_IN",
    description: "The source file documents the project relationship.",
    source,
  }],
};

describe("Atlas source ingestion", () => {
  it("accepts source-backed entities and documented edges", () => {
    expect(() => validateAtlasImportBatch(batch)).not.toThrow();
  });

  it("keeps the archive recovery candidates explicitly provisional", () => {
    expect(() => validateAtlasImportBatch(atlasFoundationBatch)).not.toThrow();
    expect(atlasFoundationBatch.entities).toHaveLength(47);
    expect(atlasFoundationBatch.relationships).toHaveLength(48);
    const candidates = atlasFoundationBatch.entities.filter(entity => entity.slug.startsWith("chat-cand-"));
    expect(candidates).toHaveLength(37);
    expect(candidates.every(entity => entity.summary?.includes("not a recovered original title"))).toBe(true);
  });

  it("produces deterministic evidence identities across replays", () => {
    expect(atlasEvidenceIdentity(source)).toEqual(atlasEvidenceIdentity({ ...source }));
  });

  it("changes the evidence fingerprint when the source revision changes", () => {
    const revised = { ...source, commitSha: "0123456789abcdef0123456789abcdef01234567" };
    expect(atlasEvidenceIdentity(source).manifestStamp).not.toBe(atlasEvidenceIdentity(revised).manifestStamp);
    expect(atlasEvidenceIdentity(source).vaultId).not.toBe(atlasEvidenceIdentity(revised).vaultId);
  });

  it("does not invent a content hash when only source metadata is available", () => {
    expect(atlasEvidenceIdentity(source).contentSha256).toBeNull();
  });

  it("rejects insecure source URLs", () => {
    expect(() => validateAtlasImportBatch({
      ...batch,
      entities: [{ ...batch.entities[0], source: { ...source, url: "http://example.com/source" } }],
    })).toThrow(/HTTPS/);
  });

  it("rejects duplicate slugs and self-referential relationships", () => {
    expect(() => validateAtlasImportBatch({
      ...batch,
      entities: [batch.entities[0], batch.entities[0]],
    })).toThrow(/Duplicate entity slug/);
    expect(() => validateAtlasImportBatch({
      ...batch,
      relationships: [{ ...batch.relationships[0], targetSlug: "project-a" }],
    })).toThrow(/Self relationships/);
  });

  it("normalizes an exported cross-platform document without losing its source identity", () => {
    const normalized = normalizeAtlasExternalDocument({
      platform: "chatgpt_export",
      externalId: "conversation-123",
      title: "Atlas planning",
      text: "Original exported conversation text.",
      exportedAt: "2026-11-09T09:00:00-05:00",
    });
    expect(normalized.source.sourceKey).toBe("chatgpt_export:conversation-123");
    expect(normalized.source.contentSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(normalized.content).toBe("Original exported conversation text.");
  });
});
