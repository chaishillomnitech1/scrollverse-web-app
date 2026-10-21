import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (file: string) => readFileSync(file, "utf8");

describe("Phase 965 discovery, chart, and navigation polish", () => {
  it("keeps Source Collections discovery controls explicit and resettable", () => {
    const page = read("client/src/pages/SourceCollections.tsx");
    expect(page).toContain('aria-label="Search source collections"');
    expect(page).toContain("Filter source category");
    expect(page).toContain("Clear filters");
    expect(page).toContain("aria-live=\"polite\"");
  });

  it("exposes an accessible interactive catalog visualization on Investor Relations", () => {
    const page = read("client/src/pages/InvestorRelations.tsx");
    expect(page).toContain("Catalog composition");
    expect(page).toContain("aria-label=\"Catalog composition chart\"");
    expect(page).toContain("Show only");
    expect(page).toContain("bar");
  });

  it("provides a truthful, reduced-motion-safe route loading surface", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('aria-busy="true"');
    expect(app).toContain("motion-reduce:animate-none");
    expect(app).toContain("Loading first-party route");
  });
});
