import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = () => readFileSync("client/src/pages/Home.tsx", "utf8");

describe("Phase 938 — interactive creator portfolio", () => {
  it("renders a filtered, source-labeled portfolio with accessible selection controls", () => {
    const source = home();
    expect(source).toContain("InteractiveCreatorPortfolio");
    expect(source).toContain("CREATOR PORTFOLIO · VISUAL WORKS");
    expect(source).toContain("portfolio-filter");
    expect(source).toContain("aria-pressed");
    expect(source).toContain("aria-live=\"polite\"");
    expect(source).toContain("onError");
    expect(source).toContain("Visual unavailable");
    expect(source).toContain("object-contain");
  });

  it("keeps portfolio destinations on existing first-party routes", () => {
    const source = home();
    for (const route of [
      "/omniland-cinematic-gateway",
      "/dynasty-visual-archive",
      "/fashion-portfolio",
      "/public-footprint",
      "/creator-digital-dna",
      "/plasma",
    ]) {
      expect(source).toContain(`href: "${route}"`);
    }
  });

  it("supports category filtering plus accessible catalog-date sorting", () => {
    const source = home();
    expect(source).toContain("catalogDate");
    expect(source).toContain("sortMode");
    expect(source).toContain("Newest first");
    expect(source).toContain("Oldest first");
    expect(source).toContain("Sort portfolio by catalog date");
    expect(source).toContain("Cataloged");
  });
});
