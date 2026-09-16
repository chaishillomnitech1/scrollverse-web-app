import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

function readProjectFile(relativePath: string) {
  return readFileSync(resolve(projectRoot, relativePath), "utf8");
}

describe("Phase 901 — Source-Led Planning Atlas", () => {
  it("defines an interactive first-party route that maps the completed creator workflow", () => {
    const atlas = readProjectFile("client/src/pages/PlanningAtlas.tsx");

    expect(atlas).toContain("Planning Atlas");
    expect(atlas).toContain("SOURCE → STORY → BRIEF → REVIEW");
    expect(atlas).toContain("Dynasty Visual Archive");
    expect(atlas).toContain("Rebirth & Living Codex");
    expect(atlas).toContain("INFININILLIONAIRE Film Foundation");
    expect(atlas).toContain("Seven-Episode Series");
    expect(atlas).toContain("Episode Brief Builder");
    expect(atlas).toContain("Special Repository");
    expect(atlas).toContain("No media is generated, no field activity is authorized, and no financial, account, or release action occurs here.");
  });

  it("registers the atlas and promotes it from the central ScrollVerse discovery flow", () => {
    const app = readProjectFile("client/src/App.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");

    expect(app).toContain("const PlanningAtlas = lazy(() => import(\"@/pages/PlanningAtlas\"))");
    expect(app).toContain('<Route path="/planning-atlas" component={PlanningAtlas} />');
    expect(home).toContain("PlanningAtlasBeacon");
    expect(home).toContain('href="/planning-atlas"');
  });

  it("keeps every workflow handoff within registered first-party planning routes", () => {
    const atlas = readProjectFile("client/src/pages/PlanningAtlas.tsx");

    expect(atlas).toContain('route: "/dynasty-visual-archive"');
    expect(atlas).toContain('route: "/rebirth-living-codex"');
    expect(atlas).toContain('route: "/infininillionaire-film-foundation"');
    expect(atlas).toContain('route: "/seven-episode-series"');
    expect(atlas).toContain('route: "/episode-brief-builder"');
    expect(atlas).toContain('route: "/special-repository"');
  });
});
