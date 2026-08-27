import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 870 public world-observation path", () => {
  it("connects the Mirror to the existing public World Lens without implying external hardware access", () => {
    const mirror = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ChaisSabirAllahMirror.tsx"), "utf8");
    const worldLens = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/WorldLens.tsx"), "utf8");
    expect(mirror).toContain('title: "Open the World Lens"');
    expect(mirror).toContain('href: "/world-lens"');
    expect(mirror).toContain("without private tracking or hardware access");
    expect(mirror).toContain('title: "Open the ScrollVerse Global Map"');
    expect(mirror).toContain("https://globalmap.scrollverse.co");
    expect(mirror).toContain("static planning context");
    expect(worldLens).toContain("public research directory");
    expect(worldLens).toContain("does not track people");
  });
});
