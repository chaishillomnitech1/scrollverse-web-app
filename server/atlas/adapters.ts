import { createHash } from "node:crypto";
import type { AtlasEvidenceSource, AtlasSourceKind } from "./ingest";

export type AtlasExternalDocument = {
  platform: AtlasSourceKind;
  externalId: string;
  title: string;
  text: string;
  url?: string;
  exportedAt?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Provider-neutral boundary for cross-platform archive ingestion.
 * Provider-specific collectors must supply exported or authorized content;
 * this normalizer never logs in, scrapes private accounts, or invents URLs.
 */
export function normalizeAtlasExternalDocument(document: AtlasExternalDocument): {
  source: AtlasEvidenceSource;
  title: string;
  content: string;
  metadata: Record<string, unknown>;
} {
  const externalId = document.externalId.trim();
  const title = document.title.trim();
  if (!externalId || !title) throw new Error("External archive documents require an externalId and title.");
  const content = document.text.replace(/\r\n/g, "\n").trim();
  if (!content) throw new Error("Empty archive documents are not imported.");
  const contentSha256 = createHash("sha256").update(content, "utf8").digest("hex");
  const safeId = externalId.replace(/[^a-zA-Z0-9._:/-]/g, "-").slice(0, 180);
  return {
    source: {
      sourceKey: `${document.platform}:${safeId}`,
      kind: document.platform,
      label: `${document.platform} export — ${title}`,
      url: document.url,
      contentSha256,
    },
    title,
    content,
    metadata: {
      ...(document.metadata ?? {}),
      exportedAt: document.exportedAt ?? null,
      platform: document.platform,
      externalId,
    },
  };
}
