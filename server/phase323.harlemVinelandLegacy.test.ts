import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/HarlemVinelandLegacy.tsx"), "utf8");
const routes = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const atlas = readFileSync(resolve(root, "client/src/pages/FashionArtifactAtlas.tsx"), "utf8");

describe("Phase 323 — Harlem–Vineland legacy record", () => {
  it("registers a dedicated legacy route", () => {
    expect(routes).toContain('import HarlemVinelandLegacy from "./pages/HarlemVinelandLegacy"');
    expect(routes).toContain('<Route path="/harlem-vineland-legacy" component={HarlemVinelandLegacy} />');
  });

  it("separates source records from the owner’s interpretation", () => {
    expect(page).toContain('ARCHIVE RECORD · SOURCE AND INTERPRETATION KEPT DISTINCT');
    expect(page).toContain('owner interpretation');
    expect(page).toContain('does not independently validate its weather source or infer causation');
  });

  it("keeps remembrance, commercial, token, and public-figure boundaries visible", () => {
    expect(page).toContain('not a fundraiser, benefit program, or incentive campaign');
    expect(page).toContain('does not create a token, sale, fundraiser, incentive, price, wallet, marketplace, or commercial offer');
    expect(page).toContain('does not display third-party sports/public-person likenesses as collection assets');
  });

  it("connects the protected legacy lane from the Fashion & Artifact Atlas", () => {
    expect(atlas).toContain('Harlem–Vineland Legacy');
    expect(atlas).toContain('href: "/harlem-vineland-legacy"');
  });
});
