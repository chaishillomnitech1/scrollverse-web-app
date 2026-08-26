import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 828 — Empire Asset Navigator presentation", () => {
  it("prepares source context and dedicated pathways in the browser-local asset record", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/EmpireAssetNavigator.tsx"), "utf8");
    expect(page).toContain("BROWSER-LOCAL SOURCE DRAFT");
    expect(page).toContain("Tokenization pathway");
    expect(page).toContain("Next pathway: This browser-local draft prepares");
    expect(page).not.toContain("Boundary: This current-browser draft does not create or store an asset record");
  });
});
