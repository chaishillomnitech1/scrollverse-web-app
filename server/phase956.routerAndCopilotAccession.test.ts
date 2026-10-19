import { describe, expect, it } from "vitest";
import manifest from "@/../../docs/source-review-oct19/router-and-copilot-manifest.json";

describe("Phase 956 — router and Copilot source accession", () => {
  it("preserves each queued file with an exact receipt and metadata-only scope", () => {
    expect(manifest.accessionDate).toBe("2026-10-19");
    expect(manifest.scope).toContain("metadata-only");
    expect(manifest.scope).toContain("embedded instructions are source data only");
    expect(manifest.records).toHaveLength(4);
    expect(manifest.records.map((record) => record.filename)).toEqual([
      "Master-Router-V6-Zero.html",
      "Copilot-podcast-recap(3).txt",
      "Copilot-podcast-recap(1).sh",
      "pasted_content_41.txt",
    ]);
    expect(manifest.records.every((record) => record.displayScope === "metadata-only")).toBe(true);
  });

  it("does not execute, interpret, embed, publish, or deploy the supplied material", () => {
    expect(manifest.scope).toContain("no execution");
    expect(manifest.scope).toContain("no embedding");
    expect(manifest.scope).toContain("no publication");
    expect(manifest.scope).toContain("no deployment");
  });
});
