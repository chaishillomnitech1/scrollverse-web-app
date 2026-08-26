import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 814 — Asset Registry public presentation", () => {
  it("centers creator assets, source context, and reader-led pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/AssetRegistry.tsx"), "utf8");
    expect(page).toContain("Explore what is open. Follow what is being prepared.");
    expect(page).toContain("Each pathway makes its current state and next record visible.");
    expect(page).toContain("collector readiness gates");
    expect(page).not.toContain("A source card, museum record, original reader, catalog desk, or future offer does not automatically become a transaction.");
  });
});
