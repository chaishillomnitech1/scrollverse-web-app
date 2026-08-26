import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 842 — newly supplied creator destination expansion", () => {
  it("adds the supplied destinations as source-labeled concepts and direct pathways", () => {
    const atlas = readFileSync(resolve(import.meta.dirname, "../client/src/pages/OmnilandSourceAtlas.tsx"), "utf8");
    expect(atlas).toContain("Six central source lanes");
    expect(atlas).toContain("Global signal + coordination");
    expect(atlas).toContain("Portal + archive constellation");
    expect(atlas).toContain("https://globalmap.scrollverse.co");
    expect(atlas).toContain("https://scrollport-nen7uujp.manus.space");
    expect(atlas).toContain("https://scrollnexus-fhjsaie6.manus.space");
    expect(atlas).toContain("Midnight Archive");
    expect(atlas).toContain("Orbit Series + Seal");
    expect(atlas).toContain("does not reproduce restricted artwork");
  });
});
