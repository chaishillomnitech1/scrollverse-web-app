import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Subscribe.tsx"), "utf8");

describe("Phase 481 — subscription release-state correction", () => {
  it("presents membership concepts as release-gated preparation rather than active offers", () => {
    expect(source).toContain("MEMBERSHIP RELEASE READINESS · NO SUBSCRIPTION ACTIVE");
    expect(source).toContain("requires owner release");
    expect(source).toContain("not active subscriptions, price offers, token allocations, staking programs, access entitlements, card products, or checkout flows");
  });

  it("removes customer-data, checkout, subscription, and token-action mechanics", () => {
    expect(source).not.toContain("createNFTCheckoutSession");
    expect(source).not.toContain("guardian.subscribe");
    expect(source).not.toContain("priceCents");
    expect(source).not.toContain("Enter your email");
    expect(source).toContain("does not create an account, collect an email, register a waitlist, set a price, open checkout, accept payment");
  });

  it("preserves exact release fields and explicit no-action boundaries", () => {
    expect(source).toContain("Exact tier or offer identifier and version");
    expect(source).toContain("Exact owner release and post-release public verification");
    expect(source).toContain("does not authorize a subscription, payment, reward, token, NFT, access entitlement, card, customer record, or provider action");
  });
});
