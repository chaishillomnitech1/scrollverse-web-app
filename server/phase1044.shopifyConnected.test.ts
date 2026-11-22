import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const catalog = readFileSync("client/src/lib/connectorSurface.ts", "utf8");
const registry = readFileSync("client/src/components/SharedToolRegistry.tsx", "utf8");
const board = readFileSync("client/src/components/MonetizationPlanningBoard.tsx", "utf8");

describe("Phase 1044 — Shopify connected rail", () => {
  it("records the owner-reported authorized Shopify connector as connected", () => {
    expect(catalog).toContain('"shopify-xlviiiblocks"');
    expect(catalog).toContain("Shopify · XLVIIIblocks");
    expect(catalog).toContain("https://admin.shopify.com/store/juv8tg-1n");
    expect(catalog).toContain('"CONNECTED"');
  });

  it("surfaces the connected store in the shared registry and monetization board", () => {
    expect(registry).toContain("XLVIIIblocks");
    expect(registry).toContain("CONNECTED");
    expect(board).toContain("SHOPIFY · XLVIIIBLOCKS · CONNECTED");
    expect(board).toContain("Manus app installed");
    expect(board).toContain("Stores: XLVIIIblocks");
  });

  it("keeps PayPal gated and records that no purchase or payment was made", () => {
    expect(catalog).toContain("paypal-payments");
    expect(catalog).toContain("OWNER AUTHORIZATION REQUIRED");
    expect(board).toContain("NO PAYMENT, PLAN CHANGE, OR PURCHASE");
  });
});
