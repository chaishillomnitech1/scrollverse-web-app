import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("Phase 973 — latest accession visibility", () => {
  it("exposes the newest metadata-only source batch without embedding raw bodies", () => {
    const page = readFileSync("client/src/pages/SourceCollections.tsx", "utf8");
    expect(page).toContain("OCT 23 UPLOAD ACCESSION");
    expect(page).toContain("latestAccession.count.toLocaleString()} {latestAccession.scope} receipts");
    expect(page).toContain('href="/source-collections"');
    expect(page).toContain("Source bodies remain outside the deployable portal");
  });
});
