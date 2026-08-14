import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 223 music and creator release readiness", () => {
  it("keeps specialist release guidance source-led, local-first, and fail-closed", () => {
    const page = read("client/src/pages/MusicCreatorReleaseReadiness.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const research = read("docs/phase223-creator-music-web3-research.md");
    expect(page).toContain("Music and Creator Release Readiness");
    expect(page).toContain("8");
    expect(page).toContain("OWNER-SUPPLIED VYDIA CONTEXT");
    expect(page).toContain("FAIL-CLOSED ACTIVATION BOUNDARY");
    expect(page).toContain("does not upload or distribute music or video");
    expect(app).toContain('import MusicCreatorReleaseReadiness from "./pages/MusicCreatorReleaseReadiness"');
    expect(app).toContain('<Route path="/music-creator-release-readiness" component={MusicCreatorReleaseReadiness} />');
    expect(home).toContain('href: "/music-creator-release-readiness"');
    expect(research).toContain("owner-supplied context only");
    expect(research).toContain("Tory Lanez");
  });
});
