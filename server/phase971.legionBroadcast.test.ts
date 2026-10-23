import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Phase 971 local Legion broadcast deck", () => {
  it("surfaces a podcast doorway and the local AI Legion route", () => {
    expect(home).toContain("ScrollCast");
    expect(home).toContain('href="/podcast"');
    expect(home).toContain('href="/ai-legion-apex"');
    expect(home).toContain("AI LEGION BROADCAST DECK");
  });

  it("provides avatar-led idea cards and an opt-in continuous voice sequence", () => {
    expect(home).toContain("LEGION_AVATARS");
    expect(home).toContain("Start voice sequence");
    expect(home).toContain("speechSynthesis");
    expect(home).toContain("aria-live=\"polite\"");
    expect(home).toContain("browser-local");
  });
});
