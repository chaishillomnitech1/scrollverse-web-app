import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 848 — Creator Digital DNA experience", () => {
  it("builds an interactive source-labeled Digital DNA experience with frequency, equation, seal, characters, and history", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CreatorDigitalDNA.tsx"), "utf8");
    expect(page).toContain("SCROLLVERSE · CREATOR DIGITAL DNA");
    expect(page).toContain("INTERACTIVE DNA CONSOLE");
    expect(page).toContain("44:OMNI");
    expect(page).toContain("CREATOR EQUATION FIELD");
    expect(page).toContain("CREATIVE SEAL · OWNER-AUTHORED CONTEXT");
    expect(page).toContain("Chais Sabir Allah");
    expect(page).toContain("Thoth Hawk");
    expect(page).toContain("Londyn Lightkeeper");
    expect(page).toContain("JUL 01 · 2025");
    expect(page).toContain("FOUNDATIONAL CREATOR ANCHORS");
    expect(page).toContain("CHAISALLAH");
    expect(page).toContain("YOU WERE NEVER BUILT FOR CHAINS / YOU WERE CALLED TO WITNESS");
    expect(page).toContain("TECHNOLOGY-OBSERVATION TRAIL");
    expect(page).toContain("BLUEPRINT PRESERVATION RECORD");
    expect(page).toContain('href="/special-repository"');
    expect(page).toContain("not a medical or scientific treatment claim");
  });

  it("registers the public Creator Digital DNA route", () => {
    const app = readFileSync(resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(app).toContain("CreatorDigitalDNA");
    expect(app).toContain('path={"/creator-digital-dna"}');
  });

  it("places a prominent Creator Digital DNA entry directly beneath the Omniland home feature", () => {
    const home = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("THE CREATOR SIGNAL, MADE NAVIGABLE");
    expect(home).toContain("Open Creator Digital DNA");
    expect(home).toContain("<OmnilandFrontCenter />\n      <CreatorMotionShelf />\n      <LegionBroadcastDeck />\n      <MetaLookbookDoorways />\n      <CreatorDigitalDNABeacon />");
  });
});
