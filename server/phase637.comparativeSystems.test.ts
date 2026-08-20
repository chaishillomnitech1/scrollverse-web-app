import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const page = readFileSync(resolve(process.cwd(), "client/src/pages/ResearchAtlas.tsx"), "utf8");

describe("Phase 637 — Comparative Systems Atlas", () => {
  it("adds four source-labeled comparative districts to the Research Atlas", () => {
    expect(page).toContain('label: "Financial foundations"');
    expect(page).toContain('label: "Governance"');
    expect(page).toContain('label: "Public institutions"');
    expect(page).toContain('label: "Rights frameworks"');
  });

  it("keeps authoritative sources and visible scope limits on the comparative records", () => {
    expect(page).toContain("Global Financial Development Report");
    expect(page).toContain("Worldwide Governance Indicators");
    expect(page).toContain("Government at a Glance 2025");
    expect(page).toContain("Universal Declaration of Human Rights");
    expect(page).toContain("not individualized financial guidance");
    expect(page).toContain("rather than a self-executing treaty");
  });
});
