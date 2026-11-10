/**
 * Additive, read-only resolver between the existing Source Collections /
 * Accession records and registered work references.
 *
 * This module does not write to Atlas, publish records, infer missing source
 * bytes, or collapse same-name source versions. Exact route/title matches only.
 */

export type ResolverCitation = {
  batch: string;
  lines: readonly [number, number];
};

export type ResolverSourceBatch = {
  id: string;
  filename: string;
  bytes: number;
  sha256: string;
  lineCount: number;
  versionLabel?: string;
};

export type ResolverSourceCollection = {
  id: string;
  title: string;
  category: string;
  detail: string;
  href: string;
  catalogDate: string;
  sources: readonly ResolverCitation[];
};

export type ResolverAccession = {
  filename: string;
  bytes: number;
  sha256: string;
  classification: string;
  displayScope: string;
};

export type ResolverWorkReference = {
  id: string;
  title: string;
  route?: string;
  repository?: string;
  status?: string;
};

export type ResolverMatchKind = "ROUTE_EXACT" | "TITLE_EXACT";

export type ResolvedSourceCitation = {
  batchId: string;
  filename: string | null;
  lines: readonly [number, number];
  recordedBytes: number | null;
  recordedSha256: string | null;
  versionLabel: string | null;
  accessions: Array<{
    filename: string;
    recordedBytes: number;
    recordedSha256: string;
    classification: string;
    displayScope: string;
    byteAvailability: "METADATA_ONLY" | "AVAILABLE_OR_UNSPECIFIED";
  }>;
};

export type SourceWorkResolution = {
  workId: string;
  sourceCollectionId: string;
  title: string;
  category: string;
  detail: string;
  route: string;
  catalogDate: string;
  citations: ResolvedSourceCitation[];
  matches: Array<{
    workReferenceId: string;
    title: string;
    route: string | null;
    repository: string | null;
    status: string | null;
    matchKind: ResolverMatchKind;
  }>;
  resolution: "LINKED_BY_EXACT_ROUTE" | "LINKED_BY_EXACT_TITLE" | "UNRESOLVED";
  reviewRequired: boolean;
};

function normalizeTitle(value: string): string {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

function normalizeRoute(value: string): string {
  const path = value.trim().split(/[?#]/, 1)[0] || "/";
  const leading = path.startsWith("/") ? path : `/${path}`;
  return leading.length > 1 ? leading.replace(/\/+$/, "") : leading;
}

function stableId(value: string): string {
  return value.normalize("NFKC").trim().toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Build deterministic source-to-work candidates from existing registries.
 * Exact route matches outrank exact title matches. No fuzzy match is emitted.
 * Same-name accessions remain separate when their source batch IDs differ.
 */
export function resolveSourceCollectionsToWork(input: {
  collections: readonly ResolverSourceCollection[];
  batches: readonly ResolverSourceBatch[];
  accessions?: readonly ResolverAccession[];
  workReferences: readonly ResolverWorkReference[];
}): SourceWorkResolution[] {
  const batchById = new Map(input.batches.map(batch => [batch.id, batch]));
  const accessionsByFilename = new Map<string, ResolverAccession[]>();
  for (const accession of input.accessions ?? []) {
    const key = accession.filename.normalize("NFKC").toLocaleLowerCase("en-US");
    const current = accessionsByFilename.get(key) ?? [];
    current.push(accession);
    accessionsByFilename.set(key, current);
  }

  const references = [...input.workReferences].sort((a, b) => a.id.localeCompare(b.id));

  return [...input.collections]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(collection => {
      const route = normalizeRoute(collection.href);
      const routeMatches = references.filter(reference =>
        reference.route && normalizeRoute(reference.route) === route,
      );
      const titleMatches = routeMatches.length > 0 ? [] : references.filter(reference =>
        normalizeTitle(reference.title) === normalizeTitle(collection.title),
      );
      const matches = (routeMatches.length > 0 ? routeMatches : titleMatches).map(reference => ({
        workReferenceId: reference.id,
        title: reference.title,
        route: reference.route ? normalizeRoute(reference.route) : null,
        repository: reference.repository ?? null,
        status: reference.status ?? null,
        matchKind: (routeMatches.length > 0 ? "ROUTE_EXACT" : "TITLE_EXACT") as ResolverMatchKind,
      }));

      const seenCitations = new Set<string>();
      const citations = collection.sources
        .filter(citation => {
          const key = `${citation.batch}:${citation.lines[0]}:${citation.lines[1]}`;
          if (seenCitations.has(key)) return false;
          seenCitations.add(key);
          return true;
        })
        .map(citation => {
          const batch = batchById.get(citation.batch);
          const filenameMatches = batch
            ? accessionsByFilename.get(batch.filename.normalize("NFKC").toLocaleLowerCase("en-US")) ?? []
            : [];
          // A repeated filename is not enough to identify a version. Join only
          // when both recorded byte count and SHA-256 match the source receipt.
          const accessionMatches = batch
            ? filenameMatches.filter(accession =>
                accession.bytes === batch.bytes &&
                accession.sha256.toLowerCase() === batch.sha256.toLowerCase(),
              )
            : [];
          return {
            batchId: citation.batch,
            filename: batch?.filename ?? null,
            lines: [citation.lines[0], citation.lines[1]] as const,
            recordedBytes: batch?.bytes ?? null,
            recordedSha256: batch?.sha256 ?? null,
            versionLabel: batch?.versionLabel ?? null,
            accessions: accessionMatches.map(accession => ({
              filename: accession.filename,
              recordedBytes: accession.bytes,
              recordedSha256: accession.sha256,
              classification: accession.classification,
              displayScope: accession.displayScope,
              byteAvailability: accession.displayScope === "metadata-only"
                ? "METADATA_ONLY" as const
                : "AVAILABLE_OR_UNSPECIFIED" as const,
            })).sort((a, b) => a.recordedSha256.localeCompare(b.recordedSha256)),
          };
        })
        .sort((a, b) => a.batchId.localeCompare(b.batchId)
          || a.lines[0] - b.lines[0] || a.lines[1] - b.lines[1]);

      const resolution = routeMatches.length > 0
        ? "LINKED_BY_EXACT_ROUTE" as const
        : titleMatches.length > 0
          ? "LINKED_BY_EXACT_TITLE" as const
          : "UNRESOLVED" as const;

      return {
        workId: `source-collection:${stableId(collection.id)}`,
        sourceCollectionId: collection.id,
        title: collection.title,
        category: collection.category,
        detail: collection.detail,
        route,
        catalogDate: collection.catalogDate,
        citations,
        matches,
        resolution,
        reviewRequired: true,
      };
    });
}
