import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 975 Oct 24 accession", () => {
  it("contains exact-hash metadata-only receipts", () => {
    const manifest = JSON.parse(readFileSync(resolve(process.cwd(), "docs/source-review-oct24/oct24-newest-upload-manifest.json"), "utf8"));
    expect(manifest.batch).toBe("oct24-newest-upload-batch");
    expect(manifest.count).toBe(20);
    expect(manifest.scope).toContain("Metadata-only local accession");
    expect(manifest.records).toHaveLength(20);
    for (const record of manifest.records) {
      expect(record.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(record.displayScope).toBe("metadata-only local receipt");
    }
  });
});
