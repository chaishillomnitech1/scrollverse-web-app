import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const manifest = JSON.parse(
  readFileSync(new URL("../docs/source-review-oct20/oct20-upload-manifest.json", import.meta.url), "utf8"),
);

describe("Phase 959 — October 20 upload accession", () => {
  it("preserves all supplied records as metadata-only receipts", () => {
    expect(manifest.accessionDate).toBe("2026-10-20");
    expect(manifest.records).toHaveLength(20);
    expect(manifest.records.every((record: { displayScope: string; execution: string }) => record.displayScope === "metadata-only")).toBe(true);
    expect(manifest.records.every((record: { displayScope: string; execution: string }) => record.execution === "not executed")).toBe(true);
    expect(manifest.records.find((record: { filename: string }) => record.filename === "image_20261019_180150.mp4")?.bytes).toBe(4554177);
    expect(manifest.records.find((record: { filename: string }) => record.filename === "Main-Portal-Radar-Emerald-Ipfs.html")?.sha256).toBe("e9f1f58553dc6bdf347955c3aa4615d49206783d0411ad975874d76c066b1bca");
  });
});
