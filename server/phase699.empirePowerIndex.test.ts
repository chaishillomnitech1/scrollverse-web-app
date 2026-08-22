import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 699 — ScrollVerse Empire Power Index", () => {
  it("maps archive, evidence, creator, Game Worlds, continuity, and campaign lanes", () => {
    const page = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(page).toContain("Omniverse Manifesto Codex");
    expect(page).toContain("Protected Source Convergence");
    expect(page).toContain("Sovereign Cartoon Gallery");
    expect(page).toContain("Game Worlds Studio");
    expect(page).toContain("Sovereignty Infrastructure");
    expect(page).toContain("Campaign Activation Center");
  });

  it("retains browser-local export controls and explicit in-project route boundaries", () => {
    const page = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(page).toContain("useSovereignHeartbeat({ page: \"empire-power-index\" })");
    expect(page).toContain("externalAction: \"none\"");
    expect(page).toContain("This index verifies listed in-project route registration only");
    expect(page).toContain("scrollverse-empire-power-index.json");
  });

  it("registers the Empire Power Index route", () => {
    expect(read("client/src/App.tsx")).toContain("/empire-power-index");
  });
});
