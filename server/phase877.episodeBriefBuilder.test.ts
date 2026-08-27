import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 877 browser-local episode brief builder", () => {
  it("provides local-only production preparation, release gates, and an export without media or external action", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/EpisodeBriefBuilder.tsx"), "utf8");
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    const episodes = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/EpisodeExperience.tsx"), "utf8");
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(page).toContain("ORIGINAL EPISODE WORKBENCH");
    expect(page).toContain("BROWSER-LOCAL · NO MEDIA ACTION");
    expect(page).toContain("Export local JSON");
    expect(page).toContain("does not generate images, video, narration, or music");
    expect(page).toContain("scrollverse-original-episode-brief.json");
    expect(page).toContain('href="/omniland-cinematic-gateway"');
    expect(page).toContain('href="/sovereign-archive-chronicles"');
    expect(app).toContain('path="/episode-brief-builder"');
    expect(episodes).toContain('href="/episode-brief-builder"');
    expect(home).toContain('id="production-workbench-beacon"');
    expect(home).toContain("Open Episode Brief Builder");
    expect(home).toContain('href="/episode-brief-builder"');
  });
});
