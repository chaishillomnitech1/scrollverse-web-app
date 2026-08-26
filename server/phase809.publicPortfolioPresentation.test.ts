import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const pagePath = path.resolve(process.cwd(), "client/src/pages/PublicPortfolioGovernance.tsx");

describe("Phase 809 — Public Portfolio Governance presentation", () => {
  it("centers creator portfolio context and reader pathways", () => {
    const page = fs.readFileSync(pagePath, "utf8");
    expect(page).toContain("Read the pattern. Follow the portfolio trail.");
    expect(page).toContain("SOURCE CONTEXT");
    expect(page).toContain("source material at the stated review time");
    expect(page).not.toContain("Read the pattern. Separate the proof.");
  });
});
