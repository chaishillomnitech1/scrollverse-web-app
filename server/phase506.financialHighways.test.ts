import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const page = readFileSync(resolve(process.cwd(), "client/src/pages/FinancialHighways.tsx"), "utf8");
const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");

describe("Phase 506 Financial Highways readiness", () => {
  it("registers the Financial Highways route", () => {
    expect(app).toContain('import FinancialHighways from "./pages/FinancialHighways";');
    expect(app).toContain('<Route path="/financial-highways" component={FinancialHighways} />');
  });

  it("keeps creator, support, Shopify, B2B, and exchange readiness connected", () => {
    expect(page).toContain("Creator Catalog Delivery");
    expect(page).toContain("Public Support Path");
    expect(page).toContain("Shopify Development Store");
    expect(page).toContain("B2B Systems Offering");
    expect(page).toContain("Creator Exchange Readiness");
    expect(page).toContain('href="/payment-options"');
    expect(page).toContain('href="/creator-catalog-readiness"');
    expect(page).toContain('href="/shopify-storefront-readiness"');
    expect(page).toContain('href="/enterprise-systems-blueprint"');
  });

  it("keeps the planning record browser-local and provider actions fail-closed", () => {
    expect(page).toContain("BROWSER-LOCAL HIGHWAY RECORD");
    expect(page).toContain("No provider, checkout, product, payout, wallet, trade, or transfer is active.");
    expect(page).toContain("does not create a product, quote, contract, customer account, payment, checkout, payout, transfer, trade, wallet connection, token, provider account, market listing, or external agreement");
    expect(page).not.toContain("fetch(");
  });
});
