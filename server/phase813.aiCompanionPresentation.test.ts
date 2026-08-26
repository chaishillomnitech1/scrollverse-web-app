import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 813 — AI Companion Hub public presentation", () => {
  it("centers creator agency, source context, and visible visitor pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/AICompanionHub.tsx"), "utf8");
    expect(page).toContain("COMPANION PATHWAY STANDARD");
    expect(page).toContain("Original guidance. Visible choices. Creator agency.");
    expect(page).toContain("SOURCE CONTEXT");
    expect(page).not.toContain("COMPANION HONESTY STANDARD");
  });
});
