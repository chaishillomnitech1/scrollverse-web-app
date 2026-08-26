import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const companionHub = readFileSync(resolve(root, "client/src/pages/AICompanionHub.tsx"), "utf8");
const artLearningStudio = readFileSync(resolve(root, "client/src/pages/ArtLearningStudio.tsx"), "utf8");
const atlas = readFileSync(resolve(root, "client/src/pages/ScrollVerseAtlas.tsx"), "utf8");

describe("Phase 465 — ScrollVerse AI Companion Hub", () => {
  it("registers the original AI Companion Hub route with sovereign activity tracking", () => {
    expect(router).toContain('path={"/ai-companion-hub"}');
    expect(router).toContain("AICompanionHub");
    expect(companionHub).toContain('useSovereignHeartbeat({ page: "ai-companion-hub" })');
    expect(companionHub).toContain("SCROLLVERSE AI COMPANION & CREATION HUB");
  });

  it("defines five original companion roles instead of copying a third-party companion system", () => {
    expect(companionHub).toContain("Archive Guide");
    expect(companionHub).toContain("Creation Navigator");
    expect(companionHub).toContain("Source Pathfinder");
    expect(companionHub).toContain("Release Lens");
    expect(companionHub).toContain("Legion Directory");
  });

  it("keeps the companion desk local-first with dedicated provider pathways", () => {
    expect(companionHub).toContain("The Hub centers original companion roles and browser-local preparation");
    expect(companionHub).toContain("provider account");
    expect(companionHub).toContain("voice/video");
    expect(companionHub).toContain("This draft begins in your browser");
    expect(companionHub).toContain("PortalTrustLens");
  });

  it("keeps the public capability map source-labeled and visitor-controlled", () => {
    expect(companionHub).toContain("Public GitHub Portfolio");
    expect(companionHub).toContain("ScrollVerse Omni Manifesto");
    expect(companionHub).toContain("follow the dedicated portfolio, access, and integration pathways");
    expect(companionHub).toContain("account, synchronization, and provider pathways kept visible");
  });

  it("connects the Companion Hub from the Art Learning Studio and ScrollVerse Atlas", () => {
    expect(artLearningStudio).toContain('href="/ai-companion-hub"');
    expect(artLearningStudio).toContain("AI Companion Hub");
    expect(atlas).toContain('href: "/ai-companion-hub"');
    expect(atlas).toContain('href="/ai-companion-hub"');
  });
});
