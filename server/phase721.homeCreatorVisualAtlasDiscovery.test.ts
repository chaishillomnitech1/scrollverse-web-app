import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const home = readFileSync(resolve(__dirname, "../client/src/pages/Home.tsx"), "utf-8");

describe("Phase 721 — Homepage Creator-Visual Atlas Discovery", () => {
  it("adds the Creator Visual Intake Atlas to the source-discovery rail as research", () => {
    expect(home).toContain('href: "/creator-visual-intake-atlas"');
    expect(home).toContain('step: "09", title: "Creator Visual Atlas"');
    expect(home).toContain("11 protected visual metadata records · no image republication");
    expect(home).toContain('state: "research", color: "#FF6B9A"');
  });

  it("keeps the homepage Power Index discovery count aligned with the current map", () => {
    expect(home).toContain("26 connected project routes");
  });
});
