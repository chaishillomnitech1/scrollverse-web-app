import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/ShopifyCrawlerAccessReadiness.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const guidance = fs.readFileSync(path.join(root, "client/src/pages/ShopifyStagedLaunchGuidance.tsx"), "utf8");

describe("Phase 513 Shopify Crawler-Access Readiness", () => {
  it("registers the credential-safe local readiness route and staged-launch handoff", () => {
    expect(app).toContain('path={"/shopify-crawler-access-readiness"}');
    expect(guidance).toContain('href="/shopify-crawler-access-readiness"');
  });

  it("requires a narrow target, purpose, fields, controls, and exact gate", () => {
    expect(page).toContain("Exact public target");
    expect(page).toContain("Allowed public fields only");
    expect(page).toContain("Stop condition");
    expect(page).toContain("Exact action gate");
  });

  it("excludes signature use and any crawler, store, customer, or commerce activation", () => {
    expect(page).toContain("never reads, copies, stores, exposes, or uses signature values");
    expect(page).toContain("does not send a request, access a store, bypass a password, read account/customer data, or modify Shopify");
  });
});
