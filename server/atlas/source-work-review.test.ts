import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Source-to-Work review integration", () => {
  const app = readFileSync("client/src/App.tsx", "utf8");
  const review = readFileSync("client/src/pages/SourceWorkReview.tsx", "utf8");
  const collections = readFileSync("client/src/pages/SourceCollections.tsx", "utf8");
  const accession = readFileSync("client/src/pages/DigitalshipAccessionDesk.tsx", "utf8");

  it("registers the review surface as an additive route", () => {
    expect(app).toContain('path="/source-work-review"');
    expect(app).toContain('import("@/pages/SourceWorkReview")');
  });

  it("connects the existing Source Collections and Accession Desk", () => {
    expect(collections).toContain('href="/source-work-review"');
    expect(collections).toContain('href="/digitalship-accession"');
    expect(accession).toContain('href="/source-work-review"');
    expect(accession).toContain('href="/source-collections"');
  });

  it("uses existing source batches, collection records, and accession fingerprints", () => {
    expect(review).toContain("SOURCE_BATCHES");
    expect(review).toContain("SOURCE_COLLECTIONS");
    expect(review).toContain("ACCESSION_RECORDS");
    expect(review).toContain("resolveSourceCollectionsToWork");
    expect(review).toContain("REGISTERED_WORK_REFERENCES");
  });

  it("keeps candidate links review-only and does not write to Atlas", () => {
    expect(review).toContain("Human review required");
    expect(review).toContain("No Atlas relationship has been written or approved");
    expect(review).not.toContain("ingestAtlasBatch");
    expect(review).not.toContain("trpc.atlas.");
    expect(review).not.toContain("fetch(");
  });
});
