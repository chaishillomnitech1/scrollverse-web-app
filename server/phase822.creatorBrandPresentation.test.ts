import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 822 — Creator Brand Registry presentation", () => {
  it("centers creator source context and dedicated action pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CreatorBrandRegistry.tsx"), "utf8");
    expect(page).toContain("This page keeps creator source context visible.");
    expect(page).toContain("continue through their own exact pathway");
    expect(page).not.toContain("No trademark, copyright, patent, domain");
  });
});
