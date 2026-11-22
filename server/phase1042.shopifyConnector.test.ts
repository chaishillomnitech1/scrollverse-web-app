import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const catalog = readFileSync("client/src/lib/connectorSurface.ts", "utf8");
const registry = readFileSync("client/src/components/SharedToolRegistry.tsx", "utf8");
const board = readFileSync("client/src/components/MonetizationPlanningBoard.tsx", "utf8");

describe("Phase 1042 — Shopify storefront connector", () => {
  it("records the XLVIIIblocks Shopify admin door without claiming access", () => {
    expect(catalog).toContain("shopify");
    expect(catalog).toContain("XLVIIIblocks");
    expect(catalog).toContain("https://admin.shopify.com/store/juv8tg-1n");
    expect(catalog).toContain("OWNER AUTHORIZATION REQUIRED");
    expect(registry).toContain("ADMIN DOOR");
    expect(registry).toContain("LOGIN REQUIRED");
  });

  it("links Shopify readiness to the storefront, pre-order, and raffle lanes", () => {
    expect(board).toContain("Shopify · XLVIIIblocks");
    expect(board).toContain("STOREFRONT");
    expect(board).toContain("PRE-ORDER");
    expect(board).toContain("RAFFLE / REWARDS");
    expect(board).toContain("LIVE ROUTE EVIDENCE REQUIRED");
  });
});
