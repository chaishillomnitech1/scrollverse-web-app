import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const guidance = fs.readFileSync(path.join(root, "client/src/pages/ShopifyStagedLaunchGuidance.tsx"), "utf8");
const readiness = fs.readFileSync(path.join(root, "client/src/pages/ShopifyStorefrontReadiness.tsx"), "utf8");

describe("Phase 471 — Shopify Staged Launch Guidance", () => {
  it("registers the source-labeled staged-launch route and links it from storefront readiness", () => {
    expect(app).toContain('path={"/shopify-staged-launch-guidance"} component={ShopifyStagedLaunchGuidance}');
    expect(guidance).toContain('useSovereignHeartbeat({ page: "shopify-staged-launch-guidance" })');
    expect(guidance).toContain("PortalTrustLens");
    expect(readiness).toContain('href="/shopify-staged-launch-guidance"');
  });

  it("provides item-level templates and international-market preparation without representing settings as configured", () => {
    expect(guidance).toContain("Music or digital edition");
    expect(guidance).toContain("Book or reader edition");
    expect(guidance).toContain("Fashion or artifact");
    expect(guidance).toContain("Collector edition");
    expect(guidance).toContain("Creator service");
    expect(guidance).toContain("INTERNATIONAL-MARKET READINESS");
    expect(guidance).toContain("A market checklist is not a market configuration.");
  });

  it("keeps products, payment methods, checkout, payouts, markets, and customer actions fail-closed", () => {
    expect(guidance).toContain("STAGED LAUNCH GUIDANCE · NO PROVIDER ACTION");
    expect(guidance).toContain("does not bind a store");
    expect(guidance).toContain("does not create or change any Shopify, payment, checkout, payout");
    expect(guidance).toContain("creates no product, collection, policy, inventory, price, currency, checkout");
    expect(guidance).toContain("EXACT ACTION GATE");
    expect(guidance).not.toContain("createHeartbeatJob");
  });
});
