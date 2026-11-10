import { describe, expect, it } from "vitest";
import {
  resolveSourceCollectionsToWork,
  type ResolverAccession,
  type ResolverSourceBatch,
  type ResolverSourceCollection,
  type ResolverWorkReference,
} from "./source-work-resolver";

const collections: ResolverSourceCollection[] = [
  {
    id: "alpha",
    title: "Alpha Project",
    category: "Systems",
    detail: "Original creator detail remains attached.",
    href: "/alpha/",
    catalogDate: "2026-10-12",
    sources: [
      { batch: "batch-a", lines: [4, 9] },
      { batch: "batch-a", lines: [4, 9] },
      { batch: "batch-a-v2", lines: [1, 2] },
    ],
  },
  {
    id: "beta",
    title: "Beta Collection",
    category: "Stories",
    detail: "No exact registered work yet.",
    href: "/beta",
    catalogDate: "2026-10-13",
    sources: [],
  },
];

const batches: ResolverSourceBatch[] = [
  { id: "batch-a", filename: "pasted_content_1.txt", bytes: 100, sha256: "a".repeat(64), lineCount: 10 },
  { id: "batch-a-v2", filename: "pasted_content_1.txt", bytes: 120, sha256: "b".repeat(64), lineCount: 12, versionLabel: "Replacement text version" },
];

const accessions: ResolverAccession[] = [
  { filename: "pasted_content_1.txt", bytes: 100, sha256: "c".repeat(64), classification: "creator-supplied source text", displayScope: "metadata-only" },
  { filename: "pasted_content_1.txt", bytes: 120, sha256: "d".repeat(64), classification: "creator-supplied source text", displayScope: "metadata-only" },
];

const workReferences: ResolverWorkReference[] = [
  { id: "route-alpha", title: "A different display title", route: "/alpha", repository: "owner/repo", status: "DESIGNED" },
  { id: "title-beta", title: "Beta Collection", route: "/other" },
];

describe("read-only source-to-work resolver", () => {
  it("prefers exact normalized route matches and retains source citations", () => {
    const [alpha] = resolveSourceCollectionsToWork({ collections, batches, accessions, workReferences });
    expect(alpha.resolution).toBe("LINKED_BY_EXACT_ROUTE");
    expect(alpha.matches.map(match => match.workReferenceId)).toEqual(["route-alpha"]);
    expect(alpha.citations).toHaveLength(2);
    expect(alpha.citations[0].accessions).toHaveLength(2);
  });

  it("does not collapse same-filename source versions with different batch IDs", () => {
    const [alpha] = resolveSourceCollectionsToWork({ collections, batches, accessions, workReferences });
    expect(alpha.citations.map(citation => citation.batchId)).toEqual(["batch-a", "batch-a-v2"]);
    expect(alpha.citations[0].recordedSha256).not.toBe(alpha.citations[1].recordedSha256);
  });

  it("labels metadata-only accessions without claiming the raw bytes are present", () => {
    const [alpha] = resolveSourceCollectionsToWork({ collections, batches, accessions, workReferences });
    expect(alpha.citations[0].accessions.every(item => item.byteAvailability === "METADATA_ONLY")).toBe(true);
  });

  it("uses exact title fallback and leaves unmatched records unresolved for review", () => {
    const results = resolveSourceCollectionsToWork({ collections, batches, accessions, workReferences });
    expect(results[1].resolution).toBe("LINKED_BY_EXACT_TITLE");
    expect(results.every(result => result.reviewRequired)).toBe(true);
  });

  it("returns deterministic IDs and ordering regardless of input order", () => {
    const first = resolveSourceCollectionsToWork({ collections, batches, accessions, workReferences });
    const second = resolveSourceCollectionsToWork({
      collections: [...collections].reverse(),
      batches: [...batches].reverse(),
      accessions: [...accessions].reverse(),
      workReferences: [...workReferences].reverse(),
    });
    expect(second).toEqual(first);
    expect(first[0].workId).toBe("source-collection:alpha");
  });
});
