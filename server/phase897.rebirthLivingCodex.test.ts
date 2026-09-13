import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

function readProjectFile(relativePath: string) {
  return readFileSync(resolve(projectRoot, relativePath), "utf8");
}

describe("Phase 897 — Rebirth and Living Codex planning pathway", () => {
  it("presents Tree, Water, and Knowledge as source-labeled planning lanes with no field-action claims", () => {
    const page = readProjectFile("client/src/pages/RebirthLivingCodex.tsx");

    expect(page).toMatch(/Rebirth &amp;\s*<span[^>]*>Living Codex<\/span>/);
    expect(page).toContain("Tree");
    expect(page).toContain("Water");
    expect(page).toContain("Knowledge");
    expect(page).toMatch(/creator-led planning record/i);
    expect(page).toContain("No field intervention, funding, token, DAO, or release action occurs here.");
  });

  it("keeps authoritative restoration guidance external and connects first-party narrative planning routes", () => {
    const page = readProjectFile("client/src/pages/RebirthLivingCodex.tsx");

    expect(page).toContain("https://www.fao.org/forestry/our-focus/forest-management/assisted-natural-regeneration/en");
    expect(page).toContain("https://www.unep.org/news-and-stories/story/beginners-guide-ecosystem-restoration");
    expect(page).toContain("https://iucn.org/our-work/topic/ecosystem-restoration-and-land-degradation");
    expect(page).toContain('href="/seven-episode-series"');
    expect(page).toContain('href="/episode-brief-builder"');
    expect(page).toContain('href="/special-repository"');
  });

  it("registers the route and a central homepage handoff", () => {
    const app = readProjectFile("client/src/App.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");

    expect(app).toContain('lazy(() => import("@/pages/RebirthLivingCodex"))');
    expect(app).toContain('path="/rebirth-living-codex"');
    expect(home).toContain('href="/rebirth-living-codex"');
    expect(home).toContain("Rebirth &amp; Living Codex");
  });

  it("preserves the creator source review and authoritative research references", () => {
    const record = readProjectFile("docs/phase897-rebirth-living-codex-source-review.md");

    expect(record).toContain("Rebirth Manifesto");
    expect(record).toContain("FAO");
    expect(record).toContain("UNEP");
    expect(record).toContain("IUCN");
    expect(record).toContain("No field intervention, funding, token, DAO, or release action");
  });
});
