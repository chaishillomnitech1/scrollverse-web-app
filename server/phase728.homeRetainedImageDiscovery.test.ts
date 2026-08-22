import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const home = readFileSync(resolve(__dirname, "../client/src/pages/Home.tsx"), "utf-8");

describe("Phase 728 — Homepage Retained-Image Discovery Synchronization", () => {
  it("adds the retained-image evidence record to homepage archive discovery", () => {
    expect(home).toContain('href: "/retained-image-intake"');
    expect(home).toContain("Retained Image Intake");
    expect(home).toContain("Five protected screenshot records · evidence boundaries");
    expect(home).toContain('step: "10"');
  });

  it("aligns homepage discovery counts with the active archive maps", () => {
    expect(home).toContain("27 connected project routes");
    expect(home).toContain("11 protected visual metadata records · no image republication");
  });
});
