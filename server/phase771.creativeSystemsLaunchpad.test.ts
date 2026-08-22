import fs from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => fs.readFileSync(path, "utf8");
const page = read("client/src/pages/CreativeSystemsLaunchpad.tsx");

describe("Phase 771 — Cross-Domain Creative Systems Launchpad", () => {
  it("registers the browser-local launchpad route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import CreativeSystemsLaunchpad from "./pages/CreativeSystemsLaunchpad"');
    expect(app).toContain('path="/creative-systems-launchpad" component={CreativeSystemsLaunchpad}');
  });

  it("preserves all five cross-domain creative lanes with current-state labels", () => {
    expect(page).toContain("Source the record");
    expect(page).toContain("Shape the creation");
    expect(page).toContain("Compose media and catalog");
    expect(page).toContain("Study the system");
    expect(page).toContain("Package the pathway");
    expect(page).toContain("requires owner release");
  });

  it("connects source, creation, media, research, Game Worlds, portfolio, and release records without external execution", () => {
    for (const route of ["/connected-source-registry", "/digital-mirror-twin", "/music", "/game-worlds-studio", "/apex-digital-intelligence-research", "/portfolio-evidence-hub", "/active-pathways-release-gates-audit"]) {
      expect(page).toContain(route);
    }
    expect(page).toContain("does not submit, publish, mint, list, transact");
    expect(page).toContain("Copy local path");
  });
});
