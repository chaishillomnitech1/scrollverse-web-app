import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 891 Dynasty next-motion production brief", () => {
  it("captures the required creator decisions in a browser-local brief", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/DynastyVisualArchive.tsx"), "utf8");

    expect(page).toContain("dynasty-motion-production-brief");
    expect(page).toContain("motionBriefDuration");
    expect(page).toContain("motionBriefSound");
    expect(page).toContain("motionBriefText");
    expect(page).toContain("motionBriefContinuity");
    expect(page).toContain("motionBriefTarget");
    expect(page).toContain("creatorApprovedReference");
    expect(page).toContain("exportLocalMotionBrief");
    expect(page).toContain("scrollverse-dynasty-next-motion-brief.json");
  });

  it("keeps the brief gated from generation, playback, release, and external actions", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/DynastyVisualArchive.tsx"), "utf8");

    expect(page).toContain("MOTION BRIEF · BROWSER-LOCAL ONLY");
    expect(page).toContain("No generation, playback, upload, or release occurs");
    expect(page).not.toContain("<video");
    expect(page).not.toContain("fetch(");
  });
});
