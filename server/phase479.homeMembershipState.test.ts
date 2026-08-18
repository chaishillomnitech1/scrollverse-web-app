import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");

describe("Phase 479 — Home payment and membership-state correction", () => {
  it("presents payment and delivery pillars as release readiness rather than active provider infrastructure", () => {
    expect(home).toContain("Payment Release Readiness");
    expect(home).toContain("Webhook Release Preparation");
    expect(home).toContain("Sovereign Email Preparation");
    expect(home).toContain("Managed Delivery Record");
    expect(home).not.toContain("Full live-mode Stripe environment");
    expect(home).not.toContain("Mailchimp Automation");
  });

  it("removes active membership pricing, staking, and subscription implications from the home call to action", () => {
    expect(home).toContain("GUARDIAN RELEASE READINESS");
    expect(home).toContain("No subscription, staking reward, distribution, or paid access is active from this panel.");
    expect(home).toContain("Review Guardian readiness");
    expect(home).not.toContain("Guardian $44 · Sovereign $77 · Flamebearer $144");
    expect(home).not.toContain("Subscribe Now");
  });
});
