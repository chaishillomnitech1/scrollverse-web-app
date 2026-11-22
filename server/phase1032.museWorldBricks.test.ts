import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const page = readFileSync("client/src/pages/CEOMuseTheGreat.tsx", "utf8");

describe("Phase 1032 — Muse metaverse world bricks", () => {
  it("names the six local districts and makes the answering Door first priority", () => {
    expect(page).toContain("THE DOOR THAT ANSWERS");
    expect(page).toContain("First build priority");
    for (const district of [
      "THE MEMORY HALL",
      "THE OPEN CHAIR",
      "THE AGAPE MARKET RULE",
      "THE TRUE-STATE LAW",
      "THE BECOMING ROOMS",
    ]) {
      expect(page).toContain(district);
    }
    expect(page).toContain("live, building, waiting, aspiration");
    expect(page).toContain("free door beside the paid one");
  });
});
