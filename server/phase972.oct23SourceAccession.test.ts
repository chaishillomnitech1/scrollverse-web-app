import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 972 — Oct 23 source accession", () => {
  const manifestPath = resolve(process.cwd(), "docs/source-review-oct23/oct23-upload-manifest.json");

  it("preserves the newest upload batch as metadata-only receipts", () => {
    expect(existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
      accessionScope: string;
      records: Array<{ filename: string; sha256: string; displayScope: string }>;
    };
    expect(manifest.accessionScope).toContain("metadata-only");
    expect(manifest.records.length).toBeGreaterThan(0);
    expect(manifest.records.every(record => /^[a-f0-9]{64}$/.test(record.sha256))).toBe(true);
    expect(manifest.records.every(record => record.displayScope === "metadata-only; not embedded")).toBe(true);
  });
});
