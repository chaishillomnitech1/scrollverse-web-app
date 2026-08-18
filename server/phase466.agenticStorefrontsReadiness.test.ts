import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const page = readFileSync(resolve(root, "client/src/pages/AgenticStorefrontsReadiness.tsx"), "utf8");

describe("Phase 466 — Shopify Agentic Storefronts Readiness", () => {
  it("registers a source-labeled readiness route with activity tracking", () => {
    expect(router).toContain('path={"/agentic-storefronts-readiness"}');
    expect(router).toContain("AgenticStorefrontsReadiness");
    expect(page).toContain('useSovereignHeartbeat({ page: "agentic-storefronts-readiness" })');
    expect(page).toContain("SHOPIFY AGENTIC STOREFRONTS READINESS");
  });

  it("preserves the visible prospective-channel and zero-product catalog state", () => {
    expect(page).toContain("ChatGPT");
    expect(page).toContain("Microsoft Copilot");
    expect(page).toContain("Other channels");
    expect(page).toContain("Shop");
    expect(page).toContain("0 products in Catalog");
    expect(page).toContain("Add your first product");
    expect(page).toContain("Update policies");
  });

  it("keeps release fields item-specific and Shopify actions inactive", () => {
    expect(page).toContain("Exact item identifier, source, creator, and date");
    expect(page).toContain("Price, currency, tax, refund, shipping, market, and eligibility record where applicable");
    expect(page).toContain("does not accept supplemental terms");
    expect(page).toContain("enable managed behavior");
    expect(page).toContain("activate checkout");
    expect(page).toContain("PortalTrustLens");
  });

  it("connects established storefront and release-control routes without implying a live channel", () => {
    expect(page).toContain('href="/shopify-storefront-readiness"');
    expect(page).toContain('href="/premium-storefront-program"');
    expect(page).toContain('href="/product-release-pipeline"');
    expect(page).toContain('href="/activation-register"');
  });
});
