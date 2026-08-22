import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const home = readFileSync(resolve(__dirname, "../client/src/pages/Home.tsx"), "utf-8");

describe("Phase 731 — Homepage Generic Retained-Image Discovery", () => {
  it("adds the generic retained-image evidence route to the archive discovery rail", () => {
    expect(home).toContain('href: "/generic-retained-image-intake"');
    expect(home).toContain('step: "11", title: "Generic Retained Image Intake"');
    expect(home).toContain("Five protected photo/apparel files · no image republication");
    expect(home).toContain('state: "research", color: "#FFB800"');
  });

  it("aligns the homepage Power Index count with the current 27-route map", () => {
    expect(home).toContain("29 connected project routes");
  });
});
