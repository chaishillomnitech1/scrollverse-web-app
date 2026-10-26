import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 988 late-night visual batch accession", () => {
  const manifestPath = resolve("docs/source-review-oct26/oct26-late-night-visual-batch-manifest.json");
  const notePath = resolve("docs/source-review-oct26/oct26-late-night-visual-batch-accession.md");

  it("keeps the 49 supplied records metadata-only with SHA-256 receipts", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(manifest.manifestVersion).toBe("oct26-late-night-visual-batch-v1");
    expect(manifest.metadataOnly).toBe(true);
    expect(manifest.recordCount).toBe(49);
    expect(manifest.records).toHaveLength(49);
    expect(manifest.records.every((record: { sha256: string; displayScope: string }) => /^[a-f0-9]{64}$/.test(record.sha256))).toBe(true);
    expect(manifest.records.every((record: { displayScope: string }) => record.displayScope.includes("not embedded or published"))).toBe(true);
  });

  it("documents non-execution and source-claim boundaries", () => {
    const note = readFileSync(notePath, "utf8");
    expect(note).toContain("were not executed, rendered, played, transformed, uploaded, embedded, or published");
    expect(note).toContain("statement in the source material was converted into verified portal state.");
    expect(note).toContain("deliberate, visitor-controlled handoff");
  });
});
