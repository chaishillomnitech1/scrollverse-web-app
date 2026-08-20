import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 648 — YouTube Episode Release Desk", () => {
  it("keeps public-version metadata local and release-gated for all supplied episode records", () => {
    const page = read("client/src/pages/YouTubeEpisodeReleaseDesk.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "youtube-episode-release-desk" })');
    expect(page).toContain("EPISODE 24");
    expect(page).toContain("EPISODE 37");
    expect(page).toContain("EPISODE 38");
    expect(page).toContain("EPISODE 39");
    expect(page).toContain("EPISODE 40");
    expect(page).toContain("EPISODE 41");
    expect(page).toContain("EPISODE 42");
    expect(page).toContain("EPISODE 43");
    expect(page).toContain("requires owner release");
    expect(page).toContain("No video upload, channel publication");
    expect(page).toContain('providerAction: "none"');
  });

  it("registers the release desk and connects it from the episodic archive", () => {
    const app = read("client/src/App.tsx");
    const archive = read("client/src/pages/EpisodicOperationsArchive.tsx");
    expect(app).toContain('import YouTubeEpisodeReleaseDesk from "./pages/YouTubeEpisodeReleaseDesk"');
    expect(app).toContain('<Route path={"/youtube-episode-release-desk"} component={YouTubeEpisodeReleaseDesk} />');
    expect(archive).toContain('href: "/youtube-episode-release-desk"');
  });
});
