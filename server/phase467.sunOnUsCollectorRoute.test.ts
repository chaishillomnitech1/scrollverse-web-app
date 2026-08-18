import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const collectorRoute = readFileSync(resolve(root, "client/src/pages/SunOnUs1111.tsx"), "utf8");
const assetRegistry = readFileSync(resolve(root, "client/src/pages/AssetRegistry.tsx"), "utf8");

describe("Phase 467 — Sun on Us — 11:11 collector route", () => {
  it("registers the source-labeled collector route and tracks its local visit", () => {
    expect(router).toContain('path={"/sun-on-us-1111"}');
    expect(router).toContain("SunOnUs1111");
    expect(collectorRoute).toContain('useSovereignHeartbeat({ page: "sun-on-us-1111" })');
    expect(collectorRoute).toContain("Sun on Us — 11:11");
  });

  it("keeps all three prepared artworks, their stable IDs, and evidence details visible", () => {
    expect(collectorRoute).toContain("SV-SUN-1111-001");
    expect(collectorRoute).toContain("SV-SUN-1111-002");
    expect(collectorRoute).toContain("SV-SUN-1111-003");
    expect(collectorRoute).toContain("Solar Witness");
    expect(collectorRoute).toContain("Natural Light");
    expect(collectorRoute).toContain("Journey Witness");
    expect(collectorRoute).toContain("SHA-256 FILE IDENTIFIER");
    expect(collectorRoute).toContain("owner-identified visual feature");
  });

  it("preserves the owner-authored anchor and all decisive mint gates without claiming deployment", () => {
    expect(collectorRoute).toContain("The world gonna walk with me on this journey");
    expect(collectorRoute).toContain("NON-DEPLOYABLE MINT-READINESS GATES");
    expect(collectorRoute).toContain("Exact chain and network");
    expect(collectorRoute).toContain("does not create a wallet");
    expect(collectorRoute).toContain("mint, transfer, list, price, sell, pay");
    expect(collectorRoute).toContain("PortalTrustLens");
  });

  it("connects the Asset Registry to the dedicated collector route", () => {
    expect(assetRegistry).toContain("SV-SUN-1111");
    expect(assetRegistry).toContain('href: "/sun-on-us-1111"');
    expect(collectorRoute).toContain('href="/asset-registry"');
    expect(collectorRoute).toContain('href="/product-release-pipeline"');
  });
});
