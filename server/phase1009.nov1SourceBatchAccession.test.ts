import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Phase 1009 Nov 1 source batch accession", () => {
  const root = join(process.cwd(), "docs", "source-review-nov1");
  it("preserves the five supplied records as metadata-only receipts", () => {
    const manifest = JSON.parse(readFileSync(join(root, "nov1-latest-source-batch-manifest.json"), "utf8"));
    expect(manifest.batch_id).toContain("nov1");
    expect(manifest.records).toHaveLength(5);
    for (const record of manifest.records) {
      expect(record.bytes).toBeGreaterThan(0);
      expect(record.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(record.boundary).toBe("metadata-only");
    }
  });

  it("states that supplied HTML and text bodies were not executed or published", () => {
    const note = readFileSync(join(root, "nov1-latest-source-batch-accession.md"), "utf8");
    expect(note).toContain("metadata-only");
    expect(note).toContain("not executed");
    expect(note).toContain("not published");
    expect(note).toContain("creator-supplied");
  });
});
