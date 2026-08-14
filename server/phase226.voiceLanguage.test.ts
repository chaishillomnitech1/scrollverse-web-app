import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 226 Voice and Language Studio", () => {
  it("keeps language and device-voice controls visitor-controlled while custom owner voice remains protected and inactive", () => {
    const page = read("client/src/pages/VoiceLanguageStudio.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const record = read("docs/phase226-owner-voice-readiness.md");
    expect(page).toContain("Voice & Language Studio");
    expect(page).toContain("VISITOR-CONTROLLED DEVICE PREVIEW");
    expect(page).toContain("Consent recorded. Custom voice not active.");
    expect(page).toContain("Stop / mute");
    expect(page).toContain("speechSynthesis");
    expect(app).toContain('import VoiceLanguageStudio from "./pages/VoiceLanguageStudio"');
    expect(app).toContain('<Route path="/voice-language-studio" component={VoiceLanguageStudio} />');
    expect(home).toContain('href: "/voice-language-studio"');
    expect(record).toContain("does not publish, train, clone, synthesize");
    expect(record).toContain("not used as a provider sample");
  });
});
