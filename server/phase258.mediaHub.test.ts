import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("Phase 258 — interactive media-hub readiness", () => {
  it("uses a verified public listening handoff and browser-local participation rather than decorative media claims", () => {
    const mediaHub = read("client/src/pages/MediaHub.tsx");
    expect(mediaHub).toContain("Verified public listening source");
    expect(mediaHub).toContain("https://open.spotify.com/embed/artist/");
    expect(mediaHub).toContain("BROWSER-LOCAL AUDIENCE ROOM");
    expect(mediaHub).toContain("browser-local until a cleared release source");
  });

  it("makes Scroll TV program and episode states directly navigable to existing studio and catalog pathways", () => {
    const scrollTv = read("client/src/pages/ScrollTV.tsx");
    expect(scrollTv).toContain("SCROLL TV · PROGRAMMING DESK");
    expect(scrollTv).toContain("/digital-hollywood-studio");
    expect(scrollTv).toContain("/creator-media-packet");
    expect(scrollTv).toContain("BROWSER-LOCAL PROGRAM ROOM");
  });
});
