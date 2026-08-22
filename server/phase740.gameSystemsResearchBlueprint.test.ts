import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
const page = readFileSync("client/src/pages/GameSystemsResearchBlueprint.tsx", "utf8");
const app = readFileSync("client/src/App.tsx", "utf8");
describe("Phase 740 Game Systems & Research Blueprint", () => {
  it("registers the browser-local game research route", () => {
    expect(app).toContain('path="/game-systems-research-blueprint"');
    expect(page).toContain("Game Systems + Research Blueprint");
  });
  it("separates historical source study, modern claims, and game design", () => {
    expect(page).toContain("Historical Guido d’Arezzo solmization is separate");
    expect(page).toContain("without therapeutic promises");
    expect(page).toContain("Manuscript + text transmission");
  });
  it("keeps special repository creation owner-controlled", () => {
    expect(page).toContain("Blueprint before repository");
    expect(page).toContain("does not claim that one exists");
  });
});
