import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const receiptPath = "docs/phase937-manifest-and-skills-receipt.md";

describe("Phase 937 — manifest and skills receipt", () => {
  it("preserves supplied counts, skill identities, and hosting evidence boundaries", () => {
    expect(existsSync(receiptPath)).toBe(true);
    const receipt = readFileSync(receiptPath, "utf8");
    expect(receipt).toContain("consolidated_manifest.json");
    expect(receipt).toContain("227");
    expect(receipt).toContain("scrollverse-artifact-evidence-readiness.skill");
    expect(receipt).toContain("scrollverse-evidence-command-portal.skill");
    expect(receipt).toContain("HTTP 200");
    expect(receipt).toContain("No credit or billing entitlement was verified");
    expect(receipt).toContain("no external repository action was performed");
  });
});
