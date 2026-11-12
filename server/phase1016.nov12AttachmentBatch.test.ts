import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (relative: string) => readFileSync(join(root, relative), "utf8");

describe("Phase 1016 Nov 12 attachment batch", () => {
  it("preserves all four attachments as exact metadata-only receipts", () => {
    const manifest = JSON.parse(read("docs/source-review-nov12/nov12-attachment-batch-manifest.json")) as {
      records: Array<{ file: string; bytes: number; sha256: string; boundary: string }>;
      boundary: string;
    };
    expect(manifest.records).toHaveLength(4);
    expect(manifest.records.map(record => record.file)).toEqual([
      "pasted_content_182.txt",
      "pasted_content_183.txt",
      "pasted_content_184.txt",
      "pasted_content_185.txt",
    ]);
    for (const record of manifest.records) {
      expect(record.bytes).toBeGreaterThan(0);
      expect(record.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(record.boundary).toBe("metadata-only");
    }
    expect(manifest.boundary).toContain("not executed");
    expect(manifest.boundary).toContain("not extracted");
  });

  it("surfaces each receipt on the homepage with a direct accession route", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain("PHASE 1016 · NOV 12 ATTACHMENT RECEIPTS");
    for (const file of ["pasted_content_182.txt", "pasted_content_183.txt", "pasted_content_184.txt", "pasted_content_185.txt"]) {
      expect(home).toContain(file);
    }
    expect(home).toContain("SOURCE CONTEXT ONLY");
    expect(home).toContain("No execution, extraction, or rendering");
  });
});
