import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 866 creator destinations and Meta AI lookbooks", () => {
  it("places the lookbook constellation directly after Digital DNA and labels external source scope", () => {
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("function LookbookConstellationFrontCenter()");
    expect(home).toContain("META AI ARTIFACTS + LOOKBOOK CONSTELLATION");
    expect(home).toContain("https://scrollshop-vxg9x8ac.manus.space");
    expect(home).toContain("DISCOVERY, NOT A CHECKOUT CLAIM");
    expect(home.indexOf("<CreatorDigitalDNABeacon />")).toBeLessThan(home.indexOf("<LookbookConstellationFrontCenter />"));
    expect(home.indexOf("<LookbookConstellationFrontCenter />")).toBeLessThan(home.indexOf("<FeaturedSovereignArchiveVideo />"));
  });

  it("indexes the currently accessible owner-provided destinations without treating them as operating claims", () => {
    const registry = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ConnectedSourceRegistry.tsx"), "utf8");
    expect(registry).toContain("SRC-024");
    expect(registry).toContain("SRC-025");
    expect(registry).toContain("SRC-026");
    expect(registry).toContain("scrollport-nen7uujp.manus.space");
    expect(registry).toContain("scrollshop-vxg9x8ac.manus.space");
    expect(registry).toContain("globalmap.scrollverse.co");
    expect(registry).toContain("not imported as current ScrollVerse facts");
  });
});
