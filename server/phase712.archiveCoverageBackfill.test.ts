import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 712 — Archive Coverage Backfill", () => {
  it("keeps Story Worlds source-led districts and preparation boundaries covered", () => {
    const page = read("client/src/pages/ScrollVerseStoryWorlds.tsx");
    expect(page).toContain("Citadel Signal");
    expect(page).toContain("Evidence Commons");
    expect(page).toContain("Maker's Passage");
    expect(page).toContain("No such item is created, released, listed, sold, connected, or activated by this map.");
  });

  it("keeps the Episode 45 protected source, no-runtime boundary, and correction path covered", () => {
    const page = read("client/src/pages/Episode45ProtectedReference.tsx");
    expect(page).toContain("de5e4332ce79da858e878161a162d0a66697470b23ac1aa81dc38246c04ef004");
    expect(page).toContain("No embedded source code or configuration has been executed");
    expect(page).toContain("BROWSER-LOCAL CORRECTION PATH");
    expect(page).toContain("publicVersionGate");
  });

  it("adds an evidence-led Manus-origin recovery route without reconstructing missing source content", () => {
    const page = read("client/src/pages/ManusOriginHistoricalRecoveryGate.tsx");
    const app = read("client/src/App.tsx");
    expect(page).toContain("da851283-c28e-49fe-9128-b34d67e2f272");
    expect(page).toContain("directSourcePresentInActiveWorkspace: false");
    expect(page).toContain("does not access Manus accounts");
    expect(app).toContain('path="/manus-origin-historical-recovery"');
  });

  it("extends YouTube research with archive handoffs and non-nested internal links", () => {
    const page = read("client/src/pages/YouTubeCurrentFeedResearch.tsx");
    expect(page).toContain("ARCHIVE HANDOFFS");
    expect(page).toContain("/empire-power-index");
    expect(page).toContain("/youtube-episode-release-desk");
    expect(page).not.toContain('<Link href="/connected-source-registry">\n            <a');
  });
});
