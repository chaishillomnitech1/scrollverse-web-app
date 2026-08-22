import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 708 — Archive Index Synchronization", () => {
  it("adds the newest archive records to the Route Integrity Index with direct states", () => {
    const routes = read("client/src/pages/RouteIntegrityIndex.tsx");
    expect(routes).toContain("/empire-power-index");
    expect(routes).toContain("/protected-visual-intake");
    expect(routes).toContain("/supplied-public-references");
    expect(routes).toContain("/episode-52-final-structural-expansion");
    expect(routes).toContain("Episode 52 Recovery Gate");
  });

  it("extends the Empire Power Index with evidence and recovery paths", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(index).toContain("POWER-19");
    expect(index).toContain("POWER-20");
    expect(index).toContain("POWER-21");
    expect(index).toContain("29 CONNECTED POWER ROUTES");
    expect(index).toContain("source-absence state");
  });

  it("keeps the added evidence paths in research state", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(index).toContain('lane: "Evidence", state: "research", href: "/protected-visual-intake"');
    expect(index).toContain('lane: "Evidence", state: "research", href: "/episode-52-final-structural-expansion"');
  });
});
