import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const studio = fs.readFileSync(path.join(root, "client/src/pages/VoiceLanguageStudio.tsx"), "utf8");

describe("Phase 305 — human-forward voice experience", () => {
  it("offers original natural delivery profiles and visitor-controlled listening", () => {
    expect(studio).toContain("Warm Storyteller");
    expect(studio).toContain("Cool Host");
    expect(studio).toContain("Clear Guide");
    expect(studio).toContain("Playful Spark");
    expect(studio).toContain("Play selected device voice");
    expect(studio).toContain("Stop / mute");
  });

  it("keeps person-specific voice imitation behind consent and source gates", () => {
    expect(studio).toContain("does not upload text, train a voice, clone a person");
    expect(studio).toContain("clear recorded consent");
    expect(studio).toContain("recognizable voice, laugh, or emotional signature");
    expect(studio).toContain("AI-generated");
  });
});
