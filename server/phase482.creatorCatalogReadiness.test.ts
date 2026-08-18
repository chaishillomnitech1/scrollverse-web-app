import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const routeSource = readFileSync(resolve(root, "client/src/pages/CreatorCatalogReadiness.tsx"), "utf8");
const appSource = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const directFanSource = readFileSync(resolve(root, "client/src/pages/DirectFanCatalog.tsx"), "utf8");
const atlasSource = readFileSync(resolve(root, "client/src/pages/ScrollVerseAtlas.tsx"), "utf8");
const routingMapSource = readFileSync(resolve(root, "client/src/pages/EmpireRoutingMap.tsx"), "utf8");

describe("Phase 482 — creator-owned catalog readiness", () => {
  it("registers the unified full-catalog readiness route and Direct-to-Fan handoff", () => {
    expect(appSource).toContain('import CreatorCatalogReadiness from "./pages/CreatorCatalogReadiness"');
    expect(appSource).toContain('<Route path={"/creator-catalog-readiness"} component={CreatorCatalogReadiness} />');
    expect(directFanSource).toContain('href="/creator-catalog-readiness"');
    expect(atlasSource).toContain('href: "/creator-catalog-readiness"');
    expect(routingMapSource).toContain('href: "/creator-catalog-readiness"');
  });

  it("keeps catalog categories source-labeled and item-level", () => {
    expect(routeSource).toContain('useSovereignHeartbeat({ page: "creator-catalog-readiness" })');
    expect(routeSource).toContain("Sun on Us — 11:11");
    expect(routeSource).toContain("Owner-held Art Museum Records");
    expect(routeSource).toContain("Enterprise Systems Blueprint");
    expect(routeSource).toContain("One item. One complete release record.");
  });

  it("requires exact release records and prevents provider-side catalog or checkout action", () => {
    expect(routeSource).toContain("FULL CATALOG READINESS · NO CHECKOUT ACTIVE");
    expect(routeSource).toContain("Exact owner release, correction path, rollback condition, and post-release verification");
    expect(routeSource).toContain("does not create a Shopify product, collection, catalog, inventory, price, checkout, payment, payout, order, customer record, fulfillment, market, tax, shipping rate, wallet action, token, NFT, or external provider change");
    expect(routeSource).toContain("A full catalog is not a blank-check checkout.");
  });
});
