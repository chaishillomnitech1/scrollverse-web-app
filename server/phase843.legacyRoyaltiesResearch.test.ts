import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(import.meta.dirname, relativePath), "utf8");

describe("Phase 843 — Historical Legacy and Royalty Research", () => {
  it("registers the historical pathway and connects it to the Omniland and portal discovery surfaces", () => {
    const app = read("../client/src/App.tsx");
    const atlas = read("../client/src/pages/OmnilandSourceAtlas.tsx");
    const home = read("../client/src/pages/Home.tsx");
    expect(app).toContain('const LegacyRoyaltiesResearch = lazy(() => import("@/pages/LegacyRoyaltiesResearch"))');
    expect(app).toContain('<Route path="/legacy-royalties-research" component={LegacyRoyaltiesResearch} />');
    expect(atlas).toContain('href="/legacy-royalties-research"');
    expect(home).toContain('title: "Legacy + Royalty Research"');
    expect(home).toContain('{ label: "Legacy Research", href: "/legacy-royalties-research" }');
  });

  it("presents the supplied title index as historical research rather than an external operating claim", () => {
    const page = read("../client/src/pages/LegacyRoyaltiesResearch.tsx");
    expect(page).toContain("65 indexed entries");
    expect(page).toContain("Blockchain Royalties as a Global Wealth Engine");
    expect(page).toContain("ScrollVerse + OmniGenesis");
    expect(page).toContain("GitHub + workflow research");
    expect(page).toContain("is not an investment offer, financial forecast, token or royalty operating record");
    expect(page).toContain("does not establish a financial outcome");
  });
});
