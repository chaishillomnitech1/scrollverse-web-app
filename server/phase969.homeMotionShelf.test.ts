import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Phase 969 homepage motion shelf", () => {
  it("surfaces the source-labeled motion shelf with the long ant reference", () => {
    expect(home).toContain("CreatorMotionShelf");
    expect(home).toContain("Ant Nation · 2:08 creator-supplied motion reference");
    expect(home).toContain("[STRIPPED106bytes].mp4");
    expect(home).toContain("128.54 seconds");
  });

  it("keeps existing motion playback deliberate and accessible", () => {
    expect(home).toContain("theaterScreenings.map");
    expect(home).toContain('preload="none"');
    expect(home).toContain('controls');
    expect(home).toContain("SOURCE-LABELED LOCAL MOTION SHELF");
  });
});
