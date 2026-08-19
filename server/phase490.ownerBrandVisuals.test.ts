import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const registry = readFileSync(resolve(root, "client/src/pages/AssetRegistry.tsx"), "utf8");
const catalog = readFileSync(resolve(root, "docs/phase490-owner-brand-visual-asset-catalog.md"), "utf8");

describe("Phase 490 — Owner-brand visual asset catalog", () => {
  it("records every selected owner-brand display set with stable source identifiers", () => {
    expect(catalog).toContain("SV-VIS-490-001");
    expect(catalog).toContain("SV-VIS-490-002");
    expect(catalog).toContain("SV-VIS-490-003");
    expect(catalog).toContain("SV-VIS-490-004");
    expect(catalog).toContain("d74437ea196166fa57d0ebba741b50d54659b4583e8e31222a37e001a20eef8d");
    expect(catalog).toContain("f94005fea366ad953e3ce20b1f89f6e796863180d190e98d87aa5bf69a0f2a56");
  });

  it("adds source-bound owner-brand visual references to the public Asset Registry", () => {
    expect(registry).toContain("Chais Bust Trilogy");
    expect(registry).toContain("Chais Sticker Editions");
    expect(registry).toContain("Holographic Brand Pack");
    expect(registry).toContain("ScrollVerse Black & Gold Poster");
    expect(registry).toContain("/manus-storage/chais_bust_gold_transparent_4f1b33be.png");
    expect(registry).toContain('href: "/first-party-co-creation"');
  });

  it("keeps protected social and photo candidates outside the public display set and preserves item-level release gates", () => {
    expect(catalog).toContain("Protected social candidate");
    expect(catalog).toContain("Protected external-reference screenshot");
    expect(catalog).toContain("source and rights review required");
    expect(catalog).toContain("does not convert a file identifier into a copyright registration");
    expect(registry).toContain("No product, checkout, or commercial offer is active.");
    expect(registry).toContain("does not establish reproduction rights, a product listing, price, inventory, checkout, token, or sale");
  });
});
