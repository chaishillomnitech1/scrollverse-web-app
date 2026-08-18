import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const guidance = readFileSync(resolve(root, "client/src/pages/ShopifyStagedLaunchGuidance.tsx"), "utf8");

describe("Phase 480 — Shopify B2B evidence handoff", () => {
  it("adds only non-sensitive B2B context to the staged-launch guidance", () => {
    expect(guidance).toContain("Protected B2B evidence");
    expect(guidance).toContain("B2B restriction, company, market, and fulfillment indicators");
    expect(guidance).toContain("No customer, company, order, or provider workflow is made public or active from this route.");
  });

  it("retains the existing explicit no-provider-action boundary", () => {
    expect(guidance).toContain("NO PROVIDER ACTION");
    expect(guidance).toContain("does not create or change any Shopify, payment, checkout, payout, policy, inventory, tax, shipping, or market setting");
  });
});
