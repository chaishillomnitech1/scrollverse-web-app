import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 767 — ScrollVerse Portfolio Evidence Hub", () => {
  it("registers the source-led portfolio hub", () => {
    expect(read("client/src/App.tsx")).toContain('path="/portfolio-evidence-hub" component={PortfolioEvidenceHub}');
  });

  it("connects all major portfolio lanes with direct current-state handoffs", () => {
    const page = read("client/src/pages/PortfolioEvidenceHub.tsx");
    for (const route of ["/portfolio-asset-evidence-inventory", "/autoempire-source-intake", "/connected-statements-music-evidence", "/protected-visual-evidence-hub", "/digital-mirror-twin", "/scrollverse-xlviiiblocks-readiness", "/transmissions-source-convergence"]) expect(page).toContain(route);
  });

  it("keeps valuation, ownership, collateral, and financial operations outside the hub", () => {
    const page = read("client/src/pages/PortfolioEvidenceHub.tsx");
    expect(page).toContain("The hub does not determine value, ownership, title, collateral eligibility");
    expect(read("docs/phase767-portfolio-evidence-hub-architecture.md")).toContain("It will not show asset values, totals, ownership status, collateral eligibility");
    expect(read("client/src/pages/PortfolioAssetEvidenceInventory.tsx")).toContain('href="/portfolio-evidence-hub"');
  });
});
