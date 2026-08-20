import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 626 — ScrollVerse Story Worlds", () => {
  it("registers the browser-local digital-universe map and links it from the source story index and homepage", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const stories = read("client/src/pages/GeminiStorybookCollection.tsx");
    const page = read("client/src/pages/ScrollVerseStoryWorlds.tsx");

    expect(app).toContain('path={"/scrollverse-story-worlds"}');
    expect(home).toContain('href: "/scrollverse-story-worlds"');
    expect(stories).toContain('href="/scrollverse-story-worlds"');
    expect(page).toContain("SCROLLVERSE STORY WORLDS");
    expect(page).toContain("SV-STORY-001");
    expect(page).toContain("SV-STORY-017");
    expect(page).toContain("Infinite Archive");
    expect(page).toContain("Lumen Trails");
    expect(page).toContain("Civic Horizon");
  });

  it("maps source-title records into preparation lanes without representing media, collectible, or external release as active", () => {
    const page = read("client/src/pages/ScrollVerseStoryWorlds.tsx");
    const visualWorlds = read("client/src/pages/VisualStoryWorlds.tsx");

    expect(page).toContain("Film + Epics");
    expect(page).toContain("Comics");
    expect(page).toContain("Animation");
    expect(page).toContain("Learning");
    expect(page).toContain("Collectible Concepts");
    expect(page).toContain("FAMILY + ADULT-SUPPORTED");
    expect(page).toContain("REQUIRES OWNER RELEASE");
    expect(visualWorlds).toContain("ScrollVerse Story Worlds");
  });

  it("adds visitor-controlled visual rhythm and creator highways while keeping recurring evolution deploy-gated", () => {
    const page = read("client/src/pages/ScrollVerseStoryWorlds.tsx");
    const schedule = read("docs/phase627-recurring-evolution-control.md");

    expect(page).toContain("VISUAL RHYTHM CONTROLS");
    expect(page).toContain("Balanced");
    expect(page).toContain("prefers-reduced-motion");
    expect(page).toContain("CREATOR + LEGION HIGHWAYS");
    expect(page).toContain("ai-constellation");
    expect(schedule).toContain("/api/scheduled/story-worlds-refresh");
    expect(schedule).toContain("Not implemented or enabled");
    expect(schedule).toContain("No in-process timer");
  });
});
