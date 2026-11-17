import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const projectRoot = join(import.meta.dirname, "..");
const manifestPath = join(
  projectRoot,
  "docs/source-review-oct27/oct27-block145-blueprints-manifest.json",
);
const notePath = join(
  projectRoot,
  "docs/source-review-oct27/oct27-block145-blueprints-accession.md",
);

describe("Phase 992 Block 145 blueprint accession", () => {
  it("preserves every requested source receipt with an exact SHA-256 shape", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
      count: number;
      missing_requested_files: string[];
      records: Array<{ filename: string; bytes: number; sha256: string }>;
    };

    expect(manifest.count).toBe(25);
    expect(manifest.missing_requested_files).toEqual([]);
    expect(manifest.records).toHaveLength(25);
    expect(manifest.records.every((record) => record.bytes > 0)).toBe(true);
    expect(
      manifest.records.every((record) => /^[a-f0-9]{64}$/.test(record.sha256)),
    ).toBe(true);
    expect(manifest.records.some((record) => record.filename.endsWith(".pdf"))).toBe(true);
    expect(manifest.records.some((record) => record.filename.endsWith(".csv"))).toBe(true);
  });

  it("keeps creator claims and supplied bodies behind explicit local-only boundaries", () => {
    const note = readFileSync(notePath, "utf8");
    const manifest = readFileSync(manifestPath, "utf8");

    expect(note).toContain("metadata-only local accession");
    expect(note).toContain("not treated as independently verified");
    expect(note).toContain("No supplied body was executed");
    expect(manifest).toContain("not embedded or published");
    expect(manifest).toContain("No external repository");
  });
});
