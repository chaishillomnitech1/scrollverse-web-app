import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/DigitalShips.tsx"), "utf8");

describe("Phase 996 Chais mirror voice profile", () => {
  it("labels the voice as a browser-local opt-in presentation profile", () => {
    expect(source).toContain("CHAI_AI_VOICE_PROFILE");
    expect(source).toContain("New Jersey / New York urban cadence");
    expect(source).toContain("browser-local voice profile");
  });

  it("keeps voice playback opt-in with a visible transcript and stop path", () => {
    expect(source).toContain("Play Chais mirror cue");
    expect(source).toContain("Stop voice");
    expect(source).toContain("aria-live=\"polite\"");
    expect(source).toContain("Transcript");
    expect(source).toContain("speechSynthesis.cancel");
  });
});
