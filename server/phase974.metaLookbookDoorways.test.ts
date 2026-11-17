import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Phase 974 Meta AI lookbook doorways", () => {
  it("surfaces a vivid thumbnail-led Meta AI and lookbook strip", () => {
    expect(home).toContain("META AI ARTIFACTS &amp; LOOKBOOKS");
    expect(home).toContain('href: "/meta-ai-artifacts-lookbooks"');
    expect(home).toContain('href: "/crypto-artifact-lookbook"');
    expect(home).toContain('href: "/evolution-lookbook"');
    expect(home).toContain('href: "/visual-story-worlds"');
    expect(home).toContain("href={doorway.href}");
    expect(home).toContain("SourceVisual");
    expect(home).toContain("Vivid source thumbnails");
  });
});
