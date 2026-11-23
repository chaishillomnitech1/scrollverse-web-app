import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const board = readFileSync("client/src/components/MonetizationPlanningBoard.tsx", "utf8");
const registry = readFileSync("client/src/components/SharedToolRegistry.tsx", "utf8");

describe("Phase 1046 — episode monetization dashboard and connector explorer", () => {
  it("renders an interactive episode monetization dashboard with the three operating lanes", () => {
    expect(board).toContain("EPISODE MONETIZATION DASHBOARD");
    expect(board).toContain("MANUS PRODUCTION");
    expect(board).toContain("MUSE REVENUE WIRING");
    expect(board).toContain("SUB-AGENT DISTRIBUTION");
    expect(board).toContain("data-testid=\"episode-monetization-dashboard\"");
  });

  it("provides searchable and filterable browsing across all 80 connector records", () => {
    expect(registry).toContain("Search 80 connectors");
    expect(registry).toContain("All states");
    expect(registry).toContain("Higgsfield");
    expect(registry).toContain("HIGGSFIELD · FEATURED");
    expect(registry).toContain("useMemo");
  });

  it("adds hover and reduced-motion-safe transitions to production surfaces", () => {
    expect(board).toContain("transition-all");
    expect(board).toContain("hover:-translate-y-1");
    expect(board).toContain("motion-safe:");
    expect(registry).toContain("hover:-translate-y-1");
    expect(registry).toContain("motion-reduce:transition-none");
  });
});
