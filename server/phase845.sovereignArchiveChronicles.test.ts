import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(import.meta.dirname, relativePath), "utf8");

describe("Phase 845 — Sovereign Archive Chronicles restoration", () => {
  it("registers a first-party Chronicles route and brings the Sovereign Archive home path inside ScrollVerse", () => {
    const app = read("../client/src/App.tsx");
    const home = read("../client/src/pages/Home.tsx");
    expect(app).toContain('const SovereignArchiveChronicles = lazy(() => import("@/pages/SovereignArchiveChronicles"))');
    expect(app).toContain('<Route path={"/sovereign-archive-chronicles"} component={SovereignArchiveChronicles} />');
    expect(home).toContain('href="/sovereign-archive-chronicles#black-atlantic-city"');
  });

  it("restores the visible pilot, comic, ledger, and story-world source structure", () => {
    const page = read("../client/src/pages/SovereignArchiveChronicles.tsx");
    expect(page).toContain("The Sovereign");
    expect(page).toContain("Archive Chronicles.");
    expect(page).toContain("The Memory Commons");
    expect(page).toContain("Issue Zero passage");
    expect(page).toContain("World Ledger");
    expect(page).toContain("Curtis, Aria, Jaxson, and S.O.P.H.I.A.");
    expect(page).toContain("https://sovereignhub-mo62pcrx.manus.space/");
  });

  it("features the selected YouTube source on the home page with its platform context preserved", () => {
    const home = read("../client/src/pages/Home.tsx");
    expect(home).toContain("function FeaturedSovereignArchiveVideo()");
    expect(home).toContain("https://www.youtube-nocookie.com/embed/SqK0RJTobNI");
    expect(home).toContain("Creator-selected ScrollVerse video highlight");
    expect(home).toContain("YouTube’s automated-traffic interstitial");
    expect(home).toContain("<FeaturedSovereignArchiveVideo />");
  });
});
