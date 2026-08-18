import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const engine = fs.readFileSync(path.join(root, "client/src/pages/InstagramStoryEngine.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const channels = fs.readFileSync(path.join(root, "client/src/pages/CreatorChannelHub.tsx"), "utf8");

describe("Phase 298 — Instagram Global Story Engine", () => {
  it("registers the public preparation route with the verified schedule and clear account gate", () => {
    expect(app).toContain('path="/instagram-story-engine" component={InstagramStoryEngine}');
    expect(engine).toContain('useSovereignHeartbeat({ page: "instagram-story-engine" })');
    expect(engine).toContain("07:00, 12:00, and 18:00 America/New_York");
    expect(engine).toContain("Instagram connector is disabled");
    expect(engine).toContain("no active authorized account is selected");
    expect(engine).toContain("PortalTrustLens");
  });

  it("covers the requested original content pillars and evidence record without enabling an external post", () => {
    expect(engine).toContain("Fashion Signatures");
    expect(engine).toContain("Original Story Worlds");
    expect(engine).toContain("ScrollStorm Process");
    expect(engine).toContain("Build Proof");
    expect(engine).toContain("Afrofuturist Design");
    expect(engine).toContain("permalink/result");
    expect(engine).toContain("does not connect, reconnect, authorize, post to");
  });

  it("links the Story Engine from the Creator Channel Hub", () => {
    expect(channels).toContain('href="/instagram-story-engine"');
    expect(channels).toContain("Instagram Story Engine");
  });
});
