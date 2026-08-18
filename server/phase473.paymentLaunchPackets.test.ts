import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/PaymentLaunchPackets.tsx"), "utf8");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const paymentMap = readFileSync(resolve(root, "client/src/pages/PaymentOptionsMap.tsx"), "utf8");

describe("Phase 473 — Payment Launch Packets", () => {
  it("registers the browser-local Stripe and Shopify storefront-copy packet route", () => {
    expect(app).toContain('import PaymentLaunchPackets from "./pages/PaymentLaunchPackets"');
    expect(app).toContain('path={"/payment-launch-packets"}');
    expect(page).toContain('useSovereignHeartbeat({ page: "payment-launch-packets" })');
    expect(page).toContain("CURRENT PORTAL STRIPE PATH");
    expect(page).toContain("SEPARATE SHOPIFY STOREFRONT-COPY PATH");
  });

  it("keeps release packet fields item-specific and copyable only in the browser", () => {
    expect(page).toContain("Item identifier and version");
    expect(page).toContain("Price, currency, tax basis, and delivery definition");
    expect(page).toContain("Owner release, provider-visible result, publication timestamp, and correction route");
    expect(page).toContain("BROWSER-LOCAL DRAFT");
    expect(page).toContain("navigator.clipboard.writeText");
  });

  it("preserves no-provider-action boundaries and the Payment Options handoff", () => {
    expect(page).toContain("does not create checkout, a payment link, a product, price, inventory, transfer, payout, token, provider setting, customer communication, or external submission");
    expect(page).toContain("Before any Stripe action");
    expect(page).toContain("Before any Shopify action");
    expect(paymentMap).toContain('href="/payment-launch-packets"');
  });
});
