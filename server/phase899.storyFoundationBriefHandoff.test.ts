import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

function readProjectFile(relativePath: string) {
  return readFileSync(resolve(projectRoot, relativePath), "utf8");
}

describe("Phase 899 — Story Foundation Brief handoff", () => {
  it("defines narrative-and-source-only presets for all completed planning foundations", () => {
    const presets = readProjectFile("client/src/lib/storyFoundationBrief.ts");

    expect(presets).toContain("STORY_FOUNDATION_PRESETS");
    expect(presets).toContain("dynasty");
    expect(presets).toContain("rebirth");
    expect(presets).toContain("filmFoundation");
    expect(presets).toContain("sevenEpisode");
    expect(presets).toContain("title");
    expect(presets).toContain("purpose");
    expect(presets).toContain("narrativeArc");
    expect(presets).toContain("sources");
    expect(presets).toContain("does not approve visual, sound, rights, accessibility, destination, production, financial, account, or release decisions");
  });

  it("loads a selected foundation into the local Episode Brief Builder without treating it as a production-ready brief", () => {
    const builder = readProjectFile("client/src/pages/EpisodeBriefBuilder.tsx");

    expect(builder).toContain("getStoryFoundationFromSearch");
    expect(builder).toContain("Source foundation loaded");
    expect(builder).toContain("foundation narrative and source context");
    expect(builder).toContain("Visual, sound, accessibility, rights, destination, and release fields remain your decision.");
  });

  it("adds an explicit local brief handoff from each compatible source-led planning route", () => {
    const dynasty = readProjectFile("client/src/pages/DynastyVisualArchive.tsx");
    const rebirth = readProjectFile("client/src/pages/RebirthLivingCodex.tsx");
    const film = readProjectFile("client/src/pages/InfininillionaireFilmFoundation.tsx");
    const series = readProjectFile("client/src/pages/SevenEpisodeSeries.tsx");

    expect(dynasty).toContain("/episode-brief-builder?foundation=dynasty");
    expect(rebirth).toContain("/episode-brief-builder?foundation=rebirth");
    expect(film).toContain("/episode-brief-builder?foundation=filmFoundation");
    expect(series).toContain("/episode-brief-builder?foundation=sevenEpisode");
  });
});
