import fs from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => fs.readFileSync(path, "utf8");
const page = read("client/src/pages/ScrollVerseBrandArchitecture.tsx");

describe("Phase 775 — ScrollVerse Brand Architecture", () => {
  it("registers the browser-local brand architecture route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import ScrollVerseBrandArchitecture from "./pages/ScrollVerseBrandArchitecture"');
    expect(app).toContain('path="/scrollverse-brand-architecture" component={ScrollVerseBrandArchitecture}');
  });

  it("preserves six connected brand layers and transparent state labels", () => {
    for (const layer of ["Source and origin", "Creative systems", "Research and learning", "Portfolio and readiness", "Partnership highways", "External release gates"]) expect(page).toContain(layer);
    expect(page).toContain("available now");
    expect(page).toContain("requires owner release");
  });

  it("connects the brand layers to live browser-local ecosystem records", () => {
    for (const route of ["/connected-source-registry", "/creative-systems-launchpad", "/apex-digital-intelligence-research", "/portfolio-evidence-hub", "/partnership-highways", "/active-pathways-release-gates-audit"]) expect(page).toContain(route);
    expect(page).toContain("does not establish a legal entity");
    expect(page).toContain("Copy local architecture note");
  });
});
