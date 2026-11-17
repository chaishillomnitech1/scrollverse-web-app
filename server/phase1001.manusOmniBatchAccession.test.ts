import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const manifestPath = path.join(root, "docs/source-review-oct29/oct29-manus-omni-batch-manifest.json");
const notePath = path.join(root, "docs/source-review-oct29/oct29-manus-omni-batch-accession.md");

describe("Phase 1001 Manus and Omni batch accession", () => {
  it("preserves exact local receipts for the newly supplied batch", () => {
    expect(fs.existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    expect(manifest.files.length).toBe(17);
    expect(manifest.files.every((record: { sha256: string; byteLength: number }) => /^[a-f0-9]{64}$/.test(record.sha256))).toBe(true);
    expect(manifest.files.every((record: { byteLength: number }) => record.byteLength > 0)).toBe(true);
  });

  it("keeps creator claims separate from technical receipt evidence", () => {
    expect(fs.existsSync(notePath)).toBe(true);
    const note = fs.readFileSync(notePath, "utf8");
    expect(note).toContain("metadata-only");
    expect(note).toContain("not independently verified");
    expect(note).toContain("no execution");
    expect(note).toContain("no publication");
  });
});
