import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifestPath = resolve(root, "docs/source-review-oct29/oct29-legion-omni-batch-manifest.json");
const notePath = resolve(root, "docs/source-review-oct29/oct29-legion-omni-batch-accession.md");

describe("Phase 997 Legion and Omni-Convergence accession", () => {
  it("records the newly supplied Legion batch with exact SHA-256 receipts", () => {
    expect(existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(manifest.records).toHaveLength(8);
    expect(manifest.records.every((record: { sha256: string; bytes: number }) => /^[a-f0-9]{64}$/.test(record.sha256) && record.bytes > 0)).toBe(true);
    expect(manifest.records.map((record: { filename: string }) => record.filename)).toContain("Empire-Legion-Recruitment.html");
    expect(manifest.records.map((record: { filename: string }) => record.filename)).toContain("Unified+Command+Ten+Ai.tar.gz");
  });

  it("preserves the no-execution and source-claim boundary", () => {
    expect(existsSync(notePath)).toBe(true);
    const note = readFileSync(notePath, "utf8");
    expect(note).toContain("metadata-only");
    expect(note).toContain("not executed");
    expect(note).toContain("creator-supplied claims remain source-labeled");
    expect(note).toContain("not independently verified");
  });
});
