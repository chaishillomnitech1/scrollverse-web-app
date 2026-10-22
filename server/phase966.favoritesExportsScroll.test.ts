import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { buildInvestorRelationsCsv, buildInvestorRelationsPdfText } from "../client/src/lib/investorRelations";

const read = (file: string) => readFileSync(file, "utf8");

describe("Phase 966 favorites, exports, and scroll polish", () => {
  it("provides collection favorite controls with local persistence", () => {
    const page = read("client/src/pages/SourceCollections.tsx");
    expect(page).toContain("readPortfolioFavorites");
    expect(page).toContain("Save to favorites");
    expect(page).toContain("savedOnly");
    expect(page).toContain("Saved favorites by category");
  });

  it("exports investor catalog data in CSV and PDF-ready text formats", () => {
    const csv = buildInvestorRelationsCsv();
    const pdfText = buildInvestorRelationsPdfText();
    expect(csv).toContain('"id","kind","title"');
    expect(csv).toContain("sourceLabel");
    expect(pdfText).toContain("ScrollVerse Investor Relations Catalog");
    expect(pdfText).toContain("Source-labeled local display");
  });

  it("keeps smooth scroll and tooltip behavior accessible", () => {
    const css = read("client/src/index.css");
    const page = read("client/src/pages/InvestorRelations.tsx");
    expect(css).toContain("scroll-behavior: smooth");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(page).toContain("aria-describedby");
    expect(page).toContain("Download CSV");
    expect(page).toContain("Download PDF");
    expect(page).toContain("Share performance metrics");
    expect(page).toContain("navigator.share");
    expect(page).toContain("Preparing CSV export");
    expect(page).toContain("Preparing PDF export");
    expect(page).toContain("Preview unavailable");
    expect(page).toContain("onError");
  });
});
