import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 516 episode experience and playback readiness", () => {
  it("registers the episode experience route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import EpisodeExperience from "./pages/EpisodeExperience"');
    expect(app).toContain('<Route path="/episode-experience" component={EpisodeExperience} />');
  });

  it("provides source-labeled episode and scene navigation with release gates", () => {
    const page = read("client/src/pages/EpisodeExperience.tsx");
    expect(page).toContain("Archive Signal: First Light");
    expect(page).toContain("Night Sentinel: Source Pathways");
    expect(page).toContain("SCENE NAVIGATION");
    expect(page).toContain("RELEASE PACKET GATES");
    expect(page).toContain("ACCESS AND YOUTH SAFETY");
  });

  it("does not add playback or media release and links from episodic and cinema routes", () => {
    const page = read("client/src/pages/EpisodeExperience.tsx");
    const slate = read("client/src/pages/EpisodicProductionSlate.tsx");
    const cinema = read("client/src/pages/SovereignCinema.tsx");
    expect(page).toContain("NO PLAYBACK ACTIVE");
    expect(page).toContain("does not publish a script, play or host media, create a performance, synthesize narration");
    expect(slate).toContain('href="/episode-experience"');
    expect(cinema).toContain('href="/episode-experience"');
  });
});
