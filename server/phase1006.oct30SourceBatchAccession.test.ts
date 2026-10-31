import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifestPath = resolve(root, "docs/source-review-oct30/oct30-latest-source-batch-manifest.json");
const notePath = resolve(root, "docs/source-review-oct30/oct30-latest-source-batch-accession.md");

describe("Phase 1006 Oct 30 source batch accession", () => {
  it("preserves all supplied files as metadata-only SHA-256 receipts", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    expect(manifest.boundary).toContain("metadata-only");
    expect(manifest.records).toHaveLength(21);
    for (const record of manifest.records) {
      expect(record.filename).toBeTruthy();
      expect(record.bytes).toBeGreaterThan(0);
      expect(record.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(record.mime).toBeTruthy();
    }
  });

  it("keeps source claims separate from technical evidence", () => {
    const note = readFileSync(notePath, "utf8");
    expect(note).toContain("metadata-only");
    expect(note).toContain("not independently verified");
    expect(note).toContain("not executed");
    expect(note).toContain("not uploaded");
    expect(note).toContain("not published");
  });
});
