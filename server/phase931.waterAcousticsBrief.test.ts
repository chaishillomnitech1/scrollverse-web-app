import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const briefPath = "docs/phase931-water-acoustics-experiment-brief.md";

describe("Phase 931 — Water Acoustics Experiment Brief", () => {
  it("defines measurable variables and keeps exploratory claims separate", () => {
    expect(existsSync(briefPath)).toBe(true);
    const brief = readFileSync(briefPath, "utf8");

    expect(brief).toContain("Claim → Source → Experiment → Measurement → Reproduction → Status");
    expect(brief).toContain("frequency, temperature, salinity, pressure, dissolved gas, and container geometry");
    expect(brief).toContain("Claims about water memory, intention, Akashic records, ley lines, or consciousness remain hypotheses");
    expect(brief).toContain("No experiment was run");
    expect(brief).toContain("No external publication, wallet, token, contract, payment, or deployment action occurred");
  });
});
