import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const homePath = path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx");
const homeSource = fs.readFileSync(homePath, "utf8");

describe("Phase 351 — Penny for My Thoughts discovery entry", () => {
  it("keeps the owner-supplied video and channel as safe external discovery paths", () => {
    expect(homeSource).toContain('id="penny-for-your-thoughts"');
    expect(homeSource).toContain("https://youtu.be/bZD3SWfzMDU?is=sONmAVZDnSyUe90H");
    expect(homeSource).toContain("https://www.youtube.com/channel/UCYh1XrtkwYycAnqydDwyjzQ");
    expect(homeSource).toContain('target="_blank"');
    expect(homeSource).toContain('rel="noopener noreferrer"');
  });

  it("states the Spotify evidence gap instead of fabricating a music attachment", () => {
    expect(homeSource).toContain("Artist-controlled Spotify URL");
    expect(homeSource).toContain("public discovery and source record");
    expect(homeSource).toContain("completed asset-specific rights and contributor record");
  });
});
