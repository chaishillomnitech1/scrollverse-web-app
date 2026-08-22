import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 735 — Retained Photo Intake Discovery Synchronization", () => {
  it("adds the retained photo intake to the four-lane protected visual evidence hub", () => {
    const hub = read("client/src/pages/ProtectedVisualEvidenceHub.tsx");
    expect(hub).toContain("PVE-04");
    expect(hub).toContain('href: "/retained-photo-intake"');
    expect(hub).toContain("7 EVIDENCE LANES");
    expect(hub).toContain("Seven source lanes.");
  });

  it("adds the route across primary navigation maps with research state", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    const routes = read("client/src/pages/RouteIntegrityIndex.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(index).toContain("POWER-29");
    expect(index).toContain("31 CONNECTED POWER ROUTES");
    expect(routes).toContain('path: "/retained-photo-intake"');
    expect(home).toContain('step: "13", title: "Retained Photo Intake"');
    expect(home).toContain("30 connected project routes");
  });
});
