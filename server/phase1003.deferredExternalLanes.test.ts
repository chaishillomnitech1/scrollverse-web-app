import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 1003 deferred external lanes", () => {
  it("records every remaining lane as pending rather than implying execution", () => {
    const note = read("docs/source-review-oct30/oct30-deferred-external-lanes.md");
    expect(note).toContain("owner/provider-controlled");
    expect(note).toContain("no external action was performed");
    expect(note).toContain("payment");
    expect(note).toContain("repository");
    expect(note).toContain("wallet");
    expect(note).toContain("contract");
    expect(note).toContain("publishing");
    expect(note).toContain("owner-provided input");
  });

  it("keeps local evidence and external outcomes separate", () => {
    const note = read("docs/source-review-oct30/oct30-deferred-external-lanes.md");
    expect(note).toContain("local-only");
    expect(note).toContain("must not be marked complete");
    expect(note).toContain("source-labeled");
  });
});
