import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const atlas = readFileSync(resolve(root, "client/src/pages/ScrollVerseAtlas.tsx"), "utf8");
const empire = readFileSync(resolve(root, "client/src/pages/EmpireRoutingMap.tsx"), "utf8");

describe("Phase 494 — First-party co-creation discovery handoffs", () => {
  it("adds the source-labeled first-party co-creation record to the central ScrollVerse Atlas", () => {
    expect(atlas).toContain('label: "First-Party Co-Creation Record", href: "/first-party-co-creation"');
    expect(atlas).toContain("Read First-Party Co-Creation Record");
    expect(atlas).toContain("Family, research & methodology");
  });

  it("adds the first-party record to the Empire Routing Map’s free discovery paths", () => {
    expect(empire).toContain('title: "First-Party Co-Creation Record", href: "/first-party-co-creation"');
    expect(empire).toContain("Owner-authored co-creation account with source trail");
    expect(empire).toContain("FREE DISCOVERY + LEARNING PATHS");
  });

  it("preserves direct visitor choice and item-specific release boundaries in the connected maps", () => {
    expect(atlas).toContain("Reader-directed");
    expect(atlas).toContain("release conditions");
    expect(empire).toContain("ROUTING IS NOT ACTIVATION");
    expect(empire).toContain("separately gated");
  });
});
