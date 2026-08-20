import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 631–634 — Catalog Storyworlds and creator-first stewardship", () => {
  it("registers the new catalog and fair-practice routes with homepage discovery", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(app).toContain('path={"/cover-art-storyworlds"}');
    expect(app).toContain('path={"/public-footprint"}');
    expect(app).toContain('path={"/catalog-stewardship"}');
    expect(app).toContain('path={"/fair-practice"}');
    expect(home).toContain('href: "/cover-art-storyworlds"');
    expect(home).toContain('href: "/public-footprint"');
    expect(home).toContain('href: "/catalog-stewardship"');
  });

  it("preserves source-led cover storyworlds for every current catalog record without marking distribution or minting as active", () => {
    const covers = read("client/src/pages/CoverArtStoryworlds.tsx");
    const records = read("docs/phase631-cover-storyworlds-records.md");
    const completion = read("docs/phase631-cover-catalog-completion.md");
    expect(covers).toContain("Pnb Rock Vibes");
    expect(covers).toContain("The Golden Frequency Overlook");
    expect(covers).toContain("The Goat You Just Met");
    expect(covers).toContain("Londyn's Lullaby Lifetime Instruction");
    expect(covers).toContain("CHAIS X LETTER");
    expect(covers).toContain("Throwing Stones");
    expect(covers).toContain("EXACT RELEASE GATE");
    expect(covers).toContain("/scrollverse-story-worlds");
    expect(covers).toContain("/creator-broadcast-preparation");
    expect(covers).toContain("does not distribute music");
    expect(records).toContain("Ripple Constellation");
    expect(completion).toContain("COVER-005");
    expect(records).toContain("does not generate, publish, distribute, list, mint");
  });

  it("publishes source-labeled public footprint and catalog stewardship records", () => {
    const footprint = read("client/src/pages/PublicFootprint.tsx");
    const stewardship = read("client/src/pages/CatalogStewardship.tsx");
    const research = read("docs/phase632-public-footprint-records.md");
    expect(footprint).toContain("SOURCE-LABELED DISCOVERY");
    expect(footprint).toContain("OWNER-SUPPLIED DISCOVERY LEAD");
    expect(stewardship).toContain("LOCAL CATALOG STEWARDSHIP");
    expect(stewardship).toContain("does not access a distributor dashboard");
    expect(research).toContain("The Goat You Just Met");
    expect(research).toContain("Apple Music");
  });

  it("keeps Fair Practice Navigator as a browser-local review route", () => {
    const fair = read("client/src/pages/FairPracticeNavigator.tsx");
    expect(fair).toContain("FAIR PRACTICE NAVIGATOR");
    expect(fair).toContain("LOCAL SELF-REVIEW");
    expect(fair).toContain("does not resolve a dispute");
  });
});
