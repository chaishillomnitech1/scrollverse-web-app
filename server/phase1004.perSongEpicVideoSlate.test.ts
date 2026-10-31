import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 1004 per-song epic-video slate", () => {
  const page = readFileSync(resolve(process.cwd(), "client/src/pages/MusicCreatorReleaseReadiness.tsx"), "utf8");
  const slate = readFileSync(resolve(process.cwd(), "client/src/components/SongEpicVideoSlate.tsx"), "utf8");

  it("exposes a local brief form for the required creative fields", () => {
    expect(page).toContain("SongEpicVideoSlate");
    expect(slate).toContain("PER-SONG EPIC-VIDEO SLATE");
    expect(slate).toContain("Purpose and narrative");
    expect(slate).toContain("Duration and aspect ratio");
    expect(slate).toContain("Visual style and references");
    expect(slate).toContain("Language, voice, and narration");
    expect(slate).toContain("Music-use authorization");
  });

  it("keeps production planning browser-local and visibly fail-closed", () => {
    expect(slate).toContain("Save local production brief");
    expect(slate).toContain("browser-local");
    expect(slate).toContain("does not generate, upload, publish, or distribute video");
    expect(slate).toContain("Reference-image plan");
  });
});
