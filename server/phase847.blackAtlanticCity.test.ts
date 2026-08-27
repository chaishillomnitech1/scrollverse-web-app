import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 847 — Black Atlantic City interactive showcase", () => {
  it("builds an original fictional Black Atlantic City scene selector around the creator avatar, Thoth Hawk, and Londyn", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/SovereignArchiveChronicles.tsx"), "utf8");
    expect(page).toContain("BLACK ATLANTIC CITY · INTERACTIVE CONCEPT SHOWCASE");
    expect(page).toContain("Chais Sabir Allah is represented here as an original creator-origin guardian avatar");
    expect(page).toContain("Thoth Hawk is an original cybernetic hawk sentinel");
    expect(page).toContain("Londyn is represented as an original young Lightkeeper navigator avatar");
    expect(page).toContain("symbolic story-world reset of memory, culture, and possibility");
    expect(page).toContain('route: "/game-worlds-studio"');
    expect(page).toContain('route: "/omniland-source-atlas"');
  });

  it("promotes Black Atlantic City in the central home-page video feature", () => {
    const home = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("Black Atlantic City.");
    expect(home).toContain('href="/sovereign-archive-chronicles#black-atlantic-city"');
    expect(home).toContain("Enter Black Atlantic City");
  });
});
