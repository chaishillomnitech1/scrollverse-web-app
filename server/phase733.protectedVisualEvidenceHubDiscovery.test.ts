import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 733 — Protected Visual Evidence Hub Discovery Synchronization", () => {
  it("adds the evidence hub as the 28th Power Index route with research state", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(index).toContain("POWER-28");
    expect(index).toContain("/protected-visual-evidence-hub");
    expect(index).toContain("31 CONNECTED POWER ROUTES");
  });

  it("adds the hub to the Route Integrity Index and homepage archive rail", () => {
    const routes = read("client/src/pages/RouteIntegrityIndex.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(routes).toContain('path: "/protected-visual-evidence-hub"');
    expect(home).toContain('step: "12", title: "Protected Visual Evidence Hub"');
    expect(home).toContain("Five evidence lanes · source-specific boundaries");
    expect(home).toContain("30 connected project routes");
  });
});
