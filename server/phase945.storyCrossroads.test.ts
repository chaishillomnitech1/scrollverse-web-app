import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeFile = "client/src/pages/StoryWorldCrossroads.tsx";

describe("Phase 945 — first-party story and Legion handoffs", () => {
  it("registers a source-attributed local story room with two distinguishable lanes", () => {
    expect(existsSync(routeFile)).toBe(true);
    const app = readFileSync("client/src/App.tsx", "utf8");
    expect(app).toContain('path="/story-world-crossroads"');
    const story = readFileSync(routeFile, "utf8");
    for (const label of ["Black Batman", "Curtis Bordley", "FlameCourt", "with water but with fire", "source-led"]) expect(story.toLowerCase()).toContain(label.toLowerCase());
    expect(story).toContain('href="/digitalship-accession"');
    expect(story).toContain('href="/ai-legion-apex"');
    expect(story).toContain('href="/new-dominion-story-blueprint"');
  });

  it("attributes the franchise source to its exact referenced task, not this portal's replay", () => {
    const story = readFileSync(routeFile, "utf8");
    expect(story).toContain("rxwWRT5PcDJCiv7GU5i6hG");
    expect(story).not.toContain('href="https://manus.im/share/JQyCbdE152xEIkgUplmagw"');
  });

  it("provides a discoverable portfolio route and a return handoff from the active Legion page", () => {
    const home = readFileSync("client/src/pages/Home.tsx", "utf8");
    expect(home).toContain('href: "/story-world-crossroads"');
    const legion = readFileSync("client/src/pages/AILegionApex.tsx", "utf8");
    expect(legion).toContain('href="/story-world-crossroads"');
  });
});
