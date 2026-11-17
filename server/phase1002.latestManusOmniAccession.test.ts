import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Receipt = { filename: string; bytes: number; sha256: string };

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 1002 latest Manus and Omni accession", () => {
  it("preserves the exact metadata-only receipt batch", () => {
    const manifest = JSON.parse(read("docs/source-review-oct29/oct29-latest-manus-omni-manifest.json")) as {
      records: Receipt[];
    };
    expect(manifest.records).toHaveLength(17);
    for (const record of manifest.records) {
      expect(record.filename).toBeTruthy();
      expect(record.bytes).toBeGreaterThan(0);
      expect(record.sha256).toMatch(/^[a-f0-9]{64}$/);
    }
    expect(manifest.records.find((record) => record.filename === "Omni-Agent-25-Unified.html")?.sha256)
      .toBe("af24010d0d3570c6221cd7494ce94347937e1845e83f80337125f79cc5bfa108");
  });

  it("keeps source claims separate from local technical evidence", () => {
    const note = read("docs/source-review-oct29/oct29-latest-manus-omni-accession.md");
    expect(note).toContain("metadata-only");
    expect(note).toContain("not independently verified");
    expect(note).toContain("not executed");
    expect(note).toContain("not uploaded");
    expect(note).toContain("not published");
  });
});
