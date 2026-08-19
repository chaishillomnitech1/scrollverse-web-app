import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const page = readFileSync(resolve(process.cwd(), "client/src/pages/NarrationDirections.tsx"), "utf8");
const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const mediaHub = readFileSync(resolve(process.cwd(), "client/src/pages/MediaHub.tsx"), "utf8");

describe("Phase 507 ScrollVerse narration directions", () => {
  it("registers the original narration-direction route and media discovery handoff", () => {
    expect(app).toContain('import NarrationDirections from "./pages/NarrationDirections";');
    expect(app).toContain('<Route path="/narration-directions" component={NarrationDirections} />');
    expect(mediaHub).toContain('href: "/narration-directions"');
    expect(mediaHub).toContain('href="/narration-directions"');
  });

  it("offers distinct original narrator directions including a feminine lead", () => {
    expect(page).toContain("Sovereign Lumen");
    expect(page).toContain("Original feminine lead direction");
    expect(page).toContain("Archive Signal");
    expect(page).toContain("Future Pulse");
    expect(page).toContain("Smooth, clear, poised, and welcoming");
  });

  it("keeps voice identity, synthesis, playback, and publication fail-closed", () => {
    expect(page).toContain("NO VOICE CLONE · NO PLAYBACK ACTIVE");
    expect(page).toContain("does not identify, clone, extract, train on, imitate, synthesize, publish, stream, or otherwise use a real person's voice");
    expect(page).toContain("does not generate audio or attach a playable media source");
    expect(page).not.toContain("fetch(");
  });
});
