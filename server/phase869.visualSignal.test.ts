import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 869 interactive Visual Signal", () => {
  it("adds a selectable first-party frequency response with functional visual-world paths", () => {
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("function VisualSignalFrontCenter()");
    expect(home).toContain('id="visual-signal-front-center"');
    expect(home).toContain("VISUAL SIGNAL · INTERACTIVE FIELD");
    expect(home).toContain('const [activeSignal, setActiveSignal] = useState("44:OMNI")');
    expect(home).toContain("/sovereign-archive-chronicles");
    expect(home).toContain("/omniland-cinematic-gateway");
    expect(home).toContain("/scrollverse-story-worlds");
    expect(home).toContain("/game-worlds-studio");
    expect(home).toContain("Open ScrollVerse Global Map");
    expect(home).toContain("https://globalmap.scrollverse.co");
    expect(home).toContain("PULSE, NOT A PROMISE");
    expect(home.indexOf("<LookbookConstellationFrontCenter />")).toBeLessThan(home.indexOf("<VisualSignalFrontCenter />"));
    expect(home.indexOf("<VisualSignalFrontCenter />")).toBeLessThan(home.indexOf("<FeaturedSovereignArchiveVideo />"));
  });
});
