import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/ChosenOnesExperienceExchange.tsx"), "utf8");
const router = readFileSync(resolve(root, "server/routers/experienceExchange.ts"), "utf8");
const schema = readFileSync(resolve(root, "drizzle/schema.ts"), "utf8");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("Chosen Ones Experience Exchange", () => {
  it("registers a direct public community route", () => {
    expect(app).toContain('path="/chosen-ones-exchange"');
    expect(app).toContain("ChosenOnesExperienceExchange");
  });
  it("keeps first-person authorship, consent choices, and theme discovery visible", () => {
    expect(page).toContain("Your contribution, your words");
    expect(page).toContain("Allow respectful replies");
    expect(page).toContain("Search first-person reflections");
    expect(page).toContain("Participant-controlled profiles");
  });
  it("uses dedicated profiles, entries, replies, reactions, and saved reflections", () => {
    for (const table of ["experienceProfiles", "experienceEntries", "experienceReplies", "experienceReactions", "experienceSaves"]) expect(schema).toContain(table);
    for (const procedure of ["createEntry", "createReply", "toggleReaction", "toggleSave", "saveProfile"]) expect(router).toContain(procedure);
  });
});
