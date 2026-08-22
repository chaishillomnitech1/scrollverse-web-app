import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 737 — Paired Retained Image Discovery Synchronization", () => {
  it("adds the paired intake to the expanded five-lane visual evidence hub", () => {
    const hub = read("client/src/pages/ProtectedVisualEvidenceHub.tsx");
    expect(hub).toContain("PVE-05");
    expect(hub).toContain('href: "/paired-retained-image-intake"');
    expect(hub).toContain("5 EVIDENCE LANES");
  });
  it("adds the route across the primary navigation maps with a research state", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    const routes = read("client/src/pages/RouteIntegrityIndex.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(index).toContain("POWER-30");
    expect(index).toContain("30 CONNECTED POWER ROUTES");
    expect(routes).toContain('path: "/paired-retained-image-intake"');
    expect(home).toContain('step: "14", title: "Paired Retained Image Intake"');
    expect(home).toContain("30 connected project routes");
  });
});
