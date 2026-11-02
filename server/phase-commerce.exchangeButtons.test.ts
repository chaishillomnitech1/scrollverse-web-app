import { describe, expect, it } from "vitest";
import {
  POLYGON_CHAIN_ID,
  SALE_CONTRACT_ABI,
  STRIPE_PAYMENT_LINK,
  isContractConfigured,
  isStripeConfigured,
} from "../client/src/lib/commerceConfig";

describe("commerce config placeholders", () => {
  it("keeps placeholders unconfigured so checkout stays disabled", () => {
    expect(STRIPE_PAYMENT_LINK).toContain("REPLACE_WITH_YOUR_PAYMENT_LINK");
    expect(isStripeConfigured()).toBe(false);
    expect(isContractConfigured()).toBe(false);
  });

  it("accepts real-looking values", () => {
    expect(isStripeConfigured("https://buy.stripe.com/abc123")).toBe(true);
    expect(isContractConfigured("0x" + "a".repeat(40))).toBe(true);
    expect(isContractConfigured("0x123")).toBe(false);
  });

  it("targets Polygon and the buy() method", () => {
    expect(POLYGON_CHAIN_ID).toBe("0x89");
    expect(SALE_CONTRACT_ABI).toEqual(["function buy() payable"]);
  });
});
