import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 810 — GitHub Showcase public presentation", () => {
  it("centers creator discovery and source context", () => {
    const page = fs.readFileSync(path.resolve(process.cwd(), "client/src/pages/GitHubShowcase.tsx"), "utf8");
    expect(page).toContain("A public code trail, ready for discovery.");
    expect(page).toContain("SOURCE CONTEXT");
    expect(page).toContain("SOURCE + READER LENS");
    expect(page).not.toContain("INTERPRETATION BOUNDARY");
  });
});
