import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync("client/src/App.tsx", "utf8");
const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const pagePath = "client/src/pages/FluidityCorpusBlueprint.tsx";

describe("Phase 905 — Fluidity and Gemini Corpus Blueprint", () => {
  it("adds a registered source-labeled book and corpus planning route with explicit boundaries", () => {
    const page = readFileSync(pagePath, "utf8");

    expect(app).toContain('const FluidityCorpusBlueprint = lazy(() => import("@/pages/FluidityCorpusBlueprint"))');
    expect(app).toContain('<Route path="/fluidity-corpus-blueprint" component={FluidityCorpusBlueprint} />');
    expect(home).toContain('href="/fluidity-corpus-blueprint"');
    expect(page).toContain("Fluidity & Corpus Blueprint");
    expect(page).toContain("Creator Perspective → AI Clarification → Evidence Status → Reader Assessment");
    expect(page).toContain("THE FLUIDITY OF EXISTENCE");
    expect(page).toContain("Title index only");
    expect(page).toContain("No raw conversation is uploaded, no book is generated, and no external sharing or publication action occurs here.");
  });

  it("labels the displayed 12-entry map as planning lenses rather than the full source progression", () => {
    const page = readFileSync(pagePath, "utf8");
    const sourceReview = readFileSync("docs/phase905-fluidity-gemini-corpus-source-review.md", "utf8");

    expect(sourceReview).toContain("**27-chapter** progression");
    expect(page).toContain("12 PLANNING LENSES");
    expect(home).toContain("12 PLANNING LENSES");
  });
});
