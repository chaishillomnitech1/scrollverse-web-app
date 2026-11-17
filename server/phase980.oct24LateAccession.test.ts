import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Phase 980 late Oct 24 accession", () => {
  it("preserves a non-empty metadata-only manifest with exact SHA-256 receipts", () => {
    const manifest = JSON.parse(readFileSync(resolve(process.cwd(), "docs/source-review-oct24/oct24-late-upload-manifest.json"), "utf8"));
    expect(manifest.batch).toBe("oct24-late-upload-batch");
    expect(manifest.count).toBeGreaterThan(0);
    expect(manifest.scope).toContain("Metadata-only local accession");
    expect(manifest.records.every((record: { sha256: string; bytes: number; displayScope: string }) => /^[a-f0-9]{64}$/.test(record.sha256) && record.bytes > 0 && record.displayScope === "metadata-only local receipt")).toBe(true);
  });

  it("keeps the accession note explicit about non-execution and duplicate handling", () => {
    const note = readFileSync(resolve(process.cwd(), "docs/source-review-oct24/oct24-late-upload-accession.md"), "utf8");
    expect(note).toContain("no supplied HTML, JSON, text, image, video, or other body was opened");
    expect(note).toContain("Duplicate handling");
  });
});
