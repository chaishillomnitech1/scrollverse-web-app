import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const catalog = readFileSync("client/src/lib/connectorSurface.ts", "utf8");
const board = readFileSync("client/src/components/MonetizationPlanningBoard.tsx", "utf8");

describe("Phase 1043 — local revenue rails", () => {
  it("records PayPal as an owner-authorized payment connector", () => {
    expect(catalog).toContain('"paypal-payments"');
    expect(catalog).toContain("PayPal Checkout");
    expect(catalog).toContain("owner authorization or sign-in");
  });

  it("distinguishes owner-reported Shopify checkout evidence from verified access", () => {
    expect(board).toContain("OWNER-REPORTED CHECKOUT EVIDENCE");
    expect(board).toContain("TEST ORDER #1001");
    expect(board).toContain("$1.00");
    expect(board).toContain("CAPTURED AND PAID · OWNER-REPORTED");
    expect(board).toContain("AUTHORIZATION NOW REPORTED COMPLETE");
  });

  it("stages every revenue lane without activating payments or public rails", () => {
    for (const lane of ["STOREFRONT", "VAULT", "CONTENT SURFACES", "DISTRIBUTION", "PRE-ORDER", "LICENSING", "RAFFLE / REWARDS"]) {
      expect(board).toContain(lane);
    }
    expect(board).toContain("NO SPEND, PRICE CHANGE, OR PUBLIC LANE ACTIVATION");
    expect(board).toContain("PayPal");
  });
});
