import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 592 — Cross-World Visual Storytelling", () => {
  it("registers the browser-local visual storytelling studio and the Creator Atlas handoff", () => {
    const app = read("client/src/App.tsx");
    const atlas = read("client/src/pages/CreatorAtlas.tsx");
    const page = read("client/src/pages/VisualStoryWorlds.tsx");

    expect(app).toContain('path={"/visual-story-worlds"}');
    expect(atlas).toContain('href: "/visual-story-worlds"');
    expect(page).toContain("SCROLLVERSE VISUAL STORY WORLDS");
    expect(page).toContain("TWELVE CONNECTED WORLDS");
    expect(page).toContain("NARRATION CUE · 8–15 SECOND STARTER");
    expect(page).toContain("Future Asset Display");
    expect(page).toContain("CROSS-WORLD HANDOFFS");
    expect(page).toContain("Crypto Artifact Lookbook");
    expect(page).toContain("Creator Broadcast Preparation");
    expect(page).toContain("NARRATION BRIDGE · 8–15 SECONDS");
    expect(page).toContain("Visual-Story Archive Method");
    expect(page).toContain("scrollverse-visual-story-archive");
  });

  it("keeps visual narration and future asset concepts separate from external execution", () => {
    const page = read("client/src/pages/VisualStoryWorlds.tsx");
    const design = read("docs/phase592-cross-world-visual-storytelling-design.md");

    expect(page).toContain("not generated audio");
    expect(page).toContain("does not generate or publish media");
    expect(page).toContain("mint an NFT");
    expect(page).toContain("it does not create, post, or distribute media");
    expect(design).toContain("Future Digital-Asset Display Boundary");
    expect(design).toContain("does not generate a video");
  });
});
