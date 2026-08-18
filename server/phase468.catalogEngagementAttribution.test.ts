import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const page = fs.readFileSync(path.join(root, "client/src/pages/CatalogEngagementAttribution.tsx"), "utf8");

describe("Phase 468 — Catalog Engagement & Attribution Foundation", () => {
  it("registers the browser-local catalog engagement route", () => {
    expect(app).toContain('path={"/catalog-engagement"} component={CatalogEngagementAttribution}');
    expect(page).toContain('useSovereignHeartbeat({ page: "catalog-engagement-attribution" })');
    expect(page).toContain("CATALOG ENGAGEMENT · BROWSER-LOCAL");
    expect(page).toContain("PortalTrustLens");
  });

  it("keeps named local briefs tied to transparent catalog and visitor-path records", () => {
    expect(page).toContain("CHAIS X");
    expect(page).toContain("Book of the Journey");
    expect(page).toContain("Browser-local attribution brief");
    expect(page).toContain("ATTRIBUTION LAYERS");
    expect(page).toContain("Future result gate");
  });

  it("fails closed on audience data, provider connections, financial claims, and campaign actions", () => {
    expect(page).toContain("no pixel, analytics account, audience profile, listener count, provider export, email, payment, wallet, or external action is connected");
    expect(page).toContain("does not set tracking pixels, read analytics, collect visitor data, create an audience segment, send a campaign, connect a provider, process payment, create a sale, or make a financial claim");
    expect(page).toContain("There are no metrics, conversion values, listener totals, campaign results, or revenue figures");
    expect(page).toContain("cannot send a campaign, read a dashboard, create a segment, alter a provider, or claim a commercial outcome");
  });
});
