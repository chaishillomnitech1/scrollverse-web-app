import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const atlas = fs.readFileSync(path.join(root, "client/src/pages/FashionArtifactAtlas.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const home = fs.readFileSync(path.join(root, "client/src/pages/Home.tsx"), "utf8");

describe("Phase 296 — Fashion & Artifact Atlas", () => {
  it("registers a source-labeled visual discovery route with direct operating states", () => {
    expect(app).toContain('path="/fashion-artifact-atlas" component={FashionArtifactAtlas}');
    expect(atlas).toContain('useSovereignHeartbeat({ page: "fashion-artifact-atlas" })');
    expect(atlas).toContain("available now");
    expect(atlas).toContain("research");
    expect(atlas).toContain("requires owner release");
    expect(atlas).toContain("PortalTrustLens");
    expect(atlas).toContain("Copy release-record starter");
  });

  it("links fashion, artifacts, books, story worlds, and owner-supplied subsidiary pathways without enabling commerce", () => {
    expect(atlas).toContain('href="/fashion-empire"');
    expect(atlas).toContain('href="/books"');
    expect(atlas).toContain('href="/digital-ships"');
    expect(atlas).toContain('href: "/artifact-evidence-blueprint"');
    expect(atlas).toContain("scrollverse-4j2bciqz.manus.space");
    expect(atlas).toContain("live commerce actions here");
    expect(atlas).toContain("adult-supported participation");
  });

  it("surfaces the Atlas through the main ScrollVerse discovery page", () => {
    expect(home).toContain("Fashion & Artifact Atlas");
    expect(home).toContain('href: "/fashion-artifact-atlas"');
  });
});
