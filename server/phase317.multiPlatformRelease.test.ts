import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const desk = fs.readFileSync(path.join(root, "client/src/pages/MultiPlatformReleaseDesk.tsx"), "utf8");
const control = fs.readFileSync(path.join(root, "client/src/pages/ProductionControlDesk.tsx"), "utf8");

describe("Phase 317 — Multi-Platform Production and Episode 8 Intake", () => {
  it("registers the release-destinations route and links it from production control", () => {
    expect(app).toContain('path="/release-destinations" component={MultiPlatformReleaseDesk}');
    expect(desk).toContain('useSovereignHeartbeat({ page: "multi-platform-release-desk" })');
    expect(desk).toContain("MULTI-PLATFORM RELEASE DESK");
    expect(control).toContain('href="/release-destinations"');
  });

  it("maps destination-specific packets for portal, YouTube, Instagram, short-form, DSP, and podcast lanes", () => {
    expect(desk).toContain("ScrollVerse release route");
    expect(desk).toContain("YouTube video or channel");
    expect(desk).toContain("Instagram post, Reel, or Story");
    expect(desk).toContain("Short-form video destination");
    expect(desk).toContain("DSP and music delivery");
    expect(desk).toContain("Podcast and spoken release");
    expect(desk).toContain("DESTINATION-SPECIFIC REQUIRED PACKET");
    expect(desk).toContain("Copy release packet");
  });

  it("keeps publishing and platform connections as verified external-result gates", () => {
    expect(desk).toContain("No YouTube connector or authorized account was established");
    expect(desk).toContain("Instagram connector is disabled and has no active authorized account");
    expect(desk).toContain("does not post, upload, schedule a platform action, create a channel");
    expect(desk).toContain("aria-pressed={selected}");
  });
});
