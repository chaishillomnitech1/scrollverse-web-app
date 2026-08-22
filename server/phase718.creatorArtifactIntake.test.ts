import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 718 — Creator-Artifact Visual Intake", () => {
  it("preserves all five reviewed source files, visible treatment labels, and stable fingerprints", () => {
    const page = read("client/src/pages/CreatorArtifactIntake.tsx");
    expect(page).toContain("chais_sticker_06_badge.png");
    expect(page).toContain("chais_bust_stone_transparent.png");
    expect(page).toContain("Badge · Variant Set · Relief · Bust");
    expect(page).toContain("5f90c9265cbaf5c7bc82b134753c7e81a27787ddfed12a4a6e9c7f99d349295a");
    expect(page).toContain("8446083309fc4c2bce31b2283f1ffa32d96c018008ecbff20714d0a9c973251d");
  });

  it("keeps the artifact record browser-local and source-led without republishing images or claiming commercial state", () => {
    const page = read("client/src/pages/CreatorArtifactIntake.tsx");
    expect(page).toContain("Source images are not republished here.");
    expect(page).toContain("does not infer identity, ownership, rights, release state");
    expect(page).toContain("tokenization, inventory, sale state, or commercial availability");
    expect(page).toContain("/creator-sticker-intake");
  });

  it("registers the browser-local creator-artifact route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('path="/creator-artifact-intake"');
    expect(app).toContain("CreatorArtifactIntake");
  });
});
