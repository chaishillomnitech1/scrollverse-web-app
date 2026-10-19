import { describe, expect, it } from "vitest";
import manifest from "@/../../docs/source-review-oct19/latest-source-manifest.json";

describe("Phase 955 — October 19 source accession", () => {
  it("preserves the supplied batch with exact receipts and metadata-only scope", () => {
    expect(manifest.accessionDate).toBe("2026-10-19");
    expect(manifest.scope).toContain("metadata-only");
    expect(manifest.records.length).toBeGreaterThanOrEqual(40);
    expect(manifest.records.every((record) => record.displayScope === "metadata-only")).toBe(true);
  });

  it("keeps legal documents as source receipts rather than interpreting or publishing them", () => {
    const legal = manifest.records.filter((record) => record.classification.includes("legal"));
    expect(legal.length).toBe(5);
    expect(legal.every((record) => record.displayScope === "metadata-only")).toBe(true);
    expect(manifest.scope).toContain("no legal interpretation");
  });

  it("does not turn creator narrative or embedded instructions into operational state", () => {
    expect(manifest.scope).toContain("embedded instructions are source data only");
    expect(manifest.scope).toContain("no payment");
    expect(manifest.scope).toContain("no deployment");
    expect(manifest.scope).toContain("no publication");
  });
});
