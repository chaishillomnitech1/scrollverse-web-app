import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const registry = readFileSync(resolve(root, "client/src/pages/AssetRegistry.tsx"), "utf8");

describe("Phase 458 — Unified ScrollVerse Asset Registry", () => {
  it("registers the source-labeled Asset Registry route", () => {
    expect(router).toContain('path={"/asset-registry"}');
    expect(router).toContain("AssetRegistry");
    expect(registry).toContain('useSovereignHeartbeat({ page: "asset-registry" })');
    expect(registry).toContain("UNIFIED SCROLLVERSE ASSET REGISTRY");
  });

  it("connects physical art, music, books, research, systems, and collector concepts", () => {
    expect(registry).toContain("SV-PHYS-ART-001");
    expect(registry).toContain("SV-MUSIC-001");
    expect(registry).toContain("SV-BOOK-001");
    expect(registry).toContain("SV-RESEARCH-001");
    expect(registry).toContain("SV-SYS-001");
    expect(registry).toContain("SV-COLLECTOR-001");
    expect(registry).toContain('href: "/art-museum"');
    expect(registry).toContain('href: "/knowledge-commons"');
  });

  it("keeps payments, tokens, licenses, providers, payouts, and sales item-specific and inactive", () => {
    expect(registry).toContain("does not activate a payment highway");
    expect(registry).toContain("token, coin, public license, provider connection, sale, listing, payout");
    expect(registry).toContain("Each item keeps its own source, rights, public-display state, and release pathway");
  });
});
