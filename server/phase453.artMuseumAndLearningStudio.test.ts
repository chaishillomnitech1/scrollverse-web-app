import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const museum = readFileSync(resolve(root, "client/src/pages/ArtMuseum.tsx"), "utf8");
const studio = readFileSync(resolve(root, "client/src/pages/ArtLearningStudio.tsx"), "utf8");

describe("Phase 453 — ScrollVerse Art Museum and Art Learning Studio", () => {
  it("registers the dedicated museum and learning routes", () => {
    expect(router).toContain('path={"/art-museum"}');
    expect(router).toContain("ArtMuseum");
    expect(router).toContain('path={"/art-learning-studio"}');
    expect(router).toContain("ArtLearningStudio");
    expect(museum).toContain('useSovereignHeartbeat({ page: "art-museum" })');
    expect(studio).toContain('useSovereignHeartbeat({ page: "art-learning-studio" })');
  });

  it("keeps current physical collection entries source-labeled and connected to the Studio", () => {
    expect(museum).toContain("SV-PHYS-ART-001");
    expect(museum).toContain("Bridge of Faith");
    expect(museum).toContain("SV-PHYS-ART-002");
    expect(museum).toContain("Cosmic Knowledge Artwork");
    expect(museum).toContain('href="/art-learning-studio"');
    expect(museum).toContain("browser-local");
  });

  it("provides free exploration, source-labeled AI access, and browser-local creation tools", () => {
    expect(studio).toContain("ART LEARNING & PRACTICE STUDIO");
    expect(studio).toContain("AI ACCESS & CREATION STATION");
    expect(studio).toContain("The Met Collection");
    expect(studio).toContain("Google Arts & Culture");
    expect(studio).toContain("Hugging Face Spaces");
    expect(studio).toContain("BROWSER-LOCAL CREATION DESK");
    expect(studio).toContain("Copy creation prompt");
    expect(studio).toContain('href="/art-museum"');
  });

  it("does not present youth data collection, crypto incentives, payment, traffic revenue, or provider integrations as active", () => {
    expect(studio).toContain("does not ask young people to purchase");
    expect(studio).toContain("does not collect youth data");
    expect(studio).toContain("crypto incentives, payments, traffic revenue");
    expect(studio).toContain("operate external accounts");
    expect(studio).not.toMatch(/active crypto incentive|guaranteed traffic revenue|collect youth data now|connect provider account now/i);
  });
});
