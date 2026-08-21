import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 658 — Creator-Owned Game Worlds Studio", () => {
  it("presents five original game worlds with learning and accessibility lenses", () => {
    const page = read("client/src/pages/GameWorldsStudio.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "game-worlds-studio" })');
    expect(page).toContain("Brightwarden: Skyforge");
    expect(page).toContain("Crosscourt Cosmos");
    expect(page).toContain("Archive of Tomorrow");
    expect(page).toContain("Rescue Vector");
    expect(page).toContain("Civic Grove");
    expect(page).toContain("financial advice or investment instruction");
    expect(page).toContain("Youth-safe participation readiness");
  });

  it("registers the route and preserves browser-local external-action boundaries", () => {
    const app = read("client/src/App.tsx");
    const research = read("docs/phase658-game-worlds-studio-research.md");
    expect(app).toContain('import GameWorldsStudio from "./pages/GameWorldsStudio"');
    expect(app).toContain('<Route path={"/game-worlds-studio"} component={GameWorldsStudio} />');
    expect(research).toContain("Washington State Department of Financial Institutions");
    expect(research).toContain("Game Accessibility Guidelines");
    expect(research).toContain("International Youth Foundation");
    expect(pageActionBoundary(read("client/src/pages/GameWorldsStudio.tsx"))).toBe(true);
  });
});

function pageActionBoundary(page: string) {
  return page.includes('externalAction: "none"') && page.includes("No game is published, funded, rated, sold, hired for, rewarded, or collecting participant data.");
}
