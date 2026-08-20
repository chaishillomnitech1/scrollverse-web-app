import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 628 — Realms + Amenities and Creator Registry", () => {
  it("registers the new connected digital-world routes and homepage discovery entry", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const worlds = read("client/src/pages/ScrollVerseStoryWorlds.tsx");

    expect(app).toContain('path={"/realms-amenities"}');
    expect(app).toContain('path={"/creator-brand-registry"}');
    expect(home).toContain('href: "/realms-amenities"');
    expect(worlds).toContain('href: "/realms-amenities"');
  });

  it("maps seven browser-local amenities and preserves exact external action gates", () => {
    const realms = read("client/src/pages/RealmsAmenities.tsx");
    const registry = read("client/src/pages/CreatorBrandRegistry.tsx");

    expect(realms).toContain("Habitat Commons");
    expect(realms).toContain("Creation Port");
    expect(realms).toContain("Learning Garden");
    expect(realms).toContain("Market Arcade");
    expect(realms).toContain("does not identify a purchasable property");
    expect(registry).toContain("SOURCE + BRAND REGISTRY");
    expect(registry).toContain("EXACT ACTION RECORDS");
    expect(registry).toContain("needs its own exact record");
  });

  it("publishes official research links and source-labeled claim candidates without asserting external outcomes", () => {
    const registry = read("client/src/pages/CreatorBrandRegistry.tsx");
    const directory = read("docs/phase629-official-resource-directory.md");

    expect(registry).toContain("OFFICIAL PUBLIC-RESOURCE TRACKS");
    expect(registry).toContain("SOURCE-LABELED CLAIM CANDIDATES");
    expect(registry).toContain("SV-CLAIM-001");
    expect(registry).toContain("USPTO Trademark Search");
    expect(registry).toContain("not filings, registrations, grants, ownership findings");
    expect(directory).toContain("USPTO Trademark Search");
    expect(directory).toContain("WIPO Global Brand Database");
    expect(directory).toContain("ICANN Lookup");
    expect(directory).toContain("not a statutory ownership finding");
  });
});
