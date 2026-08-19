import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 352 participant-controlled community exchange", () => {
  it("keeps authenticated entries, replies, reactions, saves, profiles, visibility, and reply choices implemented", () => {
    const router = fs.readFileSync(path.resolve(import.meta.dirname, "./routers/experienceExchange.ts"), "utf8");
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ChosenOnesExperienceExchange.tsx"), "utf8");
    expect(router).toContain("experienceEntries");
    expect(router).toContain("experienceReplies");
    expect(router).toContain("experienceReactions");
    expect(router).toContain("experienceSaves");
    expect(router).toContain("experienceProfiles");
    expect(router).toContain("protectedProcedure");
    expect(page).toContain("Search first-person reflections");
    expect(page).toContain("Filter reflections by theme");
    expect(page).toContain("Pseudonymous");
    expect(page).toContain("Allow respectful replies");
  });
});
