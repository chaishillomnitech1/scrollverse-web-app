import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/LondynLegacy.tsx"), "utf8");
describe("Phase 273 — Londyn family-page controls", () => {
  it("uses visible preparation and readiness actions rather than simulated mint or checkout behavior", () => {
    expect(page).toContain("Start Voice Brief");
    expect(page).toContain("Prepare Legacy Film Brief");
    expect(page).toContain("View collection readiness");
    expect(page).toContain("Collectible readiness selected");
    expect(page).not.toContain("createNFTCheckoutSession");
  });
});
