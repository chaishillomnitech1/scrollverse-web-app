import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const page = readFileSync("client/src/pages/Omniland.tsx", "utf8");

describe("Phase 1037 — Omniland market posture", () => {
  it("records universal compatibility as a direction with sourced research boundaries", () => {
    for (const marker of [
      "MARKET POSTURE",
      "UNIVERSAL COMPATIBILITY",
      "EVERY GAME SYSTEM",
      "SIZZLE ONE",
      "PRICING + ANALYTICS RESEARCH",
      "QUANTUM COMPUTING RESEARCH",
      "SOURCE-LED",
      "NO RIGHTS CLEARANCE CLAIM",
    ]) {
      expect(page).toContain(marker);
    }
    expect(page).toContain("not activated");
  });
});
