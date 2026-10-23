import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Phase 970 Facebook motion accessibility", () => {
  it("includes the supplied Facebook reel as a source-labeled theater reference", () => {
    expect(home).toContain("2042773263104950");
    expect(home).toContain("Facebook motion reference");
    expect(home).toContain("Creator-supplied Facebook reel");
    expect(home).toContain("allowFullScreen");
  });

  it("keeps full-audio click-to-play available while respecting reduced motion", () => {
    expect(home).toContain("autoplay=0");
    expect(home).not.toContain("autoPlay={!reducedMotion}");
    expect(home).toContain("playsInline");
    expect(home).toContain('prefers-reduced-motion: reduce');
    expect(home).not.toContain("mute=1");
    expect(home).toContain("data-reduced-motion");
  });
});
