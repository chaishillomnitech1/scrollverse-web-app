import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 1011 creator reference batch", () => {
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("surfaces the Nov 1 creator-reference records on the motion shelf", () => {
    expect(home).toContain("PHASE 1011 CREATOR REFERENCE BATCH");
    expect(home).toContain("Scrollverse-Sovereign-Motion-Scenes.html");
    expect(home).toContain("Black-Batman-Chronicles-Ep.html");
    expect(home).toContain("Playable-Game-Ui-Sovereign.html");
  });

  it("keeps the batch metadata-only with direct accession routing", () => {
    expect(home).toContain("HTML source bodies remain outside the UI");
    expect(home).toContain("No rendering or execution");
    expect(home).toContain("Review receipt");
  });
});
