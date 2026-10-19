import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(
  readFileSync(new URL("../docs/source-review-oct19/realtime-upload-manifest.json", import.meta.url), "utf8"),
);

describe("Phase 958 — real-time upload accession", () => {
  it("preserves exact receipts and non-execution boundaries", () => {
    expect(manifest.accessionDate).toBe("2026-10-19");
    expect(manifest.records).toHaveLength(3);
    expect(manifest.records.every((record) => record.displayScope === "metadata-only")).toBe(true);
    expect(manifest.records.every((record) => record.execution === "not executed")).toBe(true);
    expect(manifest.records.find((record) => record.filename.endsWith(".zip"))?.archiveMembers).toBe(14);
  });
});
