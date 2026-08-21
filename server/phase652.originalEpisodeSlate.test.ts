import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 652 — Original Public Episode Slate and Calendar", () => {
  it("presents original public versions, accessibility preparation, and no provider action", () => {
    const page = read("client/src/pages/OriginalEpisodeSlate.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "original-episode-slate" })');
    expect(page).toContain("The Archive Opens");
    expect(page).toContain("The Signal Ledger");
    expect(page).toContain("The Solar System");
    expect(page).toContain("STORY CADENCE");
    expect(page).toContain("EVENT CADENCE");
    expect(page).toContain('providerAction: "none"');
    expect(page).toContain("No master, narration, music, captions, thumbnail, channel, visibility, date, premiere, upload, or public post is approved");
  });

  it("registers the planner, connects it from the YouTube desk, and records execution requirements", () => {
    const app = read("client/src/App.tsx");
    const releaseDesk = read("client/src/pages/YouTubeEpisodeReleaseDesk.tsx");
    const slate = read("docs/phase652-original-public-episode-slate.md");
    expect(app).toContain('import OriginalEpisodeSlate from "./pages/OriginalEpisodeSlate"');
    expect(app).toContain('<Route path={"/original-episode-slate"} component={OriginalEpisodeSlate} />');
    expect(releaseDesk).toContain('href: "/original-episode-slate"');
    expect(slate).toContain("music-use authorization");
    expect(slate).toContain("same-conversation release confirmation");
  });
});
