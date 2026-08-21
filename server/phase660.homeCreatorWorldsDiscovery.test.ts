import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");

describe("Phase 660 — Homepage Creator Worlds Discovery", () => {
  it("adds every completed creator-world route to the visible homepage discovery rail", () => {
    expect(home).toContain('href: "/central-hub-source-record"');
    expect(home).toContain('href: "/original-episode-slate"');
    expect(home).toContain('href: "/game-worlds-studio"');
    expect(home).toContain('href: "/film-animation-studio"');
    expect(home).toContain('href: "/brand-identity-record"');
    expect(home).toContain('href: "/special-repository"');
  });

  it("retains the visitor-directed discovery rail and its source-led operating language", () => {
    expect(home).toContain("VisitorDiscoveryRail");
    expect(home).toContain("Every route stays source-led and visitor-directed.");
    expect(home).toContain("AGGREGATE DISCOVERY NOTE");
  });
});
