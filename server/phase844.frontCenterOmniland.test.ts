import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 844 — Front-and-Center Omniland Discovery", () => {
  it("places a high-contrast Omniland discovery feature immediately after the main hero", () => {
    const home = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("function OmnilandFrontCenter()");
    expect(home).toContain('id="omniland-front-center"');
    expect(home).toContain("THE SCROLLVERSE VISUAL WORLD");
    expect(home).toContain("The worlds are");
    expect(home).toContain('href="/omniland-cinematic-gateway"');
    expect(home).toContain('href: "/omniland-source-atlas"');
    expect(home).toContain("<OmnilandFrontCenter />\n      <CreatorDigitalDNABeacon />\n      <LookbookConstellationFrontCenter />\n      <InteractiveCreatorPortfolio />\n      <VisualSignalFrontCenter />\n      <ProductionWorkbenchBeacon />\n      <FeaturedSovereignArchiveVideo />\n      <ManusHeroWelcome />");
  });
});
