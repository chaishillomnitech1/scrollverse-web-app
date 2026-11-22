import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Phase 1019 — homepage artifact front door", () => {
  it("surfaces a single thumbnail-first artifact shelf on the homepage", () => {
    expect(home).toContain("function ArtifactFrontDoor()");
    expect(home).toContain('id="artifact-front-door"');
    expect(home).toContain("Open artifact");
    expect(home).toContain("Close artifact viewer");
    expect(home).toContain('aria-label="Artifact thumbnail"');
  });

  it("keeps playable media visitor-controlled", () => {
    expect(home).toContain('controls preload="none"');
    expect(home).not.toContain("autoPlay");
    expect(home).toContain("Play selected artifact");
  });
});
