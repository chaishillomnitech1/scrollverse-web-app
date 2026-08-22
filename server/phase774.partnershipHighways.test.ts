import fs from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => fs.readFileSync(path, "utf8");
const page = read("client/src/pages/PartnershipHighways.tsx");

describe("Phase 774 — Partnership Highways Framework", () => {
  it("registers the browser-local partnership-highways route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import PartnershipHighways from "./pages/PartnershipHighways"');
    expect(app).toContain('path="/partnership-highways" component={PartnershipHighways}');
  });

  it("preserves five cross-discipline study highways with visible states", () => {
    for (const title of ["Learning and research", "Creative practice", "Systems and tools", "Portfolio and partnership preparation", "External release study"]) {
      expect(page).toContain(title);
    }
    expect(page).toContain("available now");
    expect(page).toContain("requires owner release");
  });

  it("keeps participation browser-local and external commitments bounded", () => {
    expect(page).toContain("not a recruitment portal, partnership offer, contract, compensation plan, or provider integration");
    expect(page).toContain("No participant is recruited, employed, appointed, contracted");
    expect(page).toContain("Copy local study record");
    for (const route of ["/apex-digital-intelligence-research", "/portfolio-evidence-hub", "/game-worlds-studio", "/active-pathways-release-gates-audit"]) expect(page).toContain(route);
  });
});
