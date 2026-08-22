import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 762 — ScrollVerse × XLVIIIblocks partnership readiness", () => {
  it("registers the browser-local partnership readiness route", () => {
    expect(read("client/src/App.tsx")).toContain('path="/scrollverse-xlviiiblocks-readiness" component={ScrollVerseXLVIIIblocksReadiness}');
  });

  it("includes proposal lanes, evidence inputs, and business-readiness handoffs", () => {
    const page = read("client/src/pages/ScrollVerseXLVIIIblocksReadiness.tsx");
    for (const label of ["Partnership identity", "Use-of-funds narrative", "Governance design", "White-label architecture", "EVIDENCE PACKET"]) expect(page).toContain(label);
    for (const route of ["/capital-readiness", "/sovereign-bank", "/revenue", "/commerce-financial-readiness-board", "/exchange/stocks", "/transmissions-source-convergence"]) expect(page).toContain(route);
  });

  it("keeps lending, funding, contracts, and market actions out of the readiness record", () => {
    const page = read("client/src/pages/ScrollVerseXLVIIIblocksReadiness.tsx");
    expect(page).toContain("This route does not apply for or obtain a loan, contact a lender, establish credit, bind a partner, execute a contract");
    expect(read("docs/phase762-scrollverse-xlviiiblocks-partnership-readiness.md")).toContain("It does not establish a lender relationship, loan, credit facility, partnership agreement, funding event");
  });
});
