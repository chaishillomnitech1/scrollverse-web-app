import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 1013 Sana and Agent 25 reference batch", () => {
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("surfaces every newly supplied video reference on the homepage", () => {
    expect(home).toContain("PHASE 1013 SANA · AGENT 25 REFERENCE BATCH");
    for (const filename of [
      "video(30).mp4",
      "video(31).mp4",
      "video(32).mp4",
      "video(33).mp4",
      "image_20261102_104644.mp4",
      "image_20261102_104646.mp4",
      "image_20261102_104641.mp4",
    ]) {
      expect(home).toContain(filename);
    }
  });

  it("keeps supplied media and HTML source bodies metadata-only and visitor-controlled", () => {
    expect(home).toContain("No autoplay; supplied media remains outside the production bundle");
    expect(home).toContain("Agent-25-Omni-Sana.html");
    expect(home).toContain("ReactArtifact.html");
    expect(home).toContain("No rendering or execution");
    expect(home).toContain("/digitalship-accession");
  });
});
