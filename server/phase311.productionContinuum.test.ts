import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const continuum = fs.readFileSync(path.join(root, "client/src/pages/ProductionContinuum.tsx"), "utf8");
const channels = fs.readFileSync(path.join(root, "client/src/pages/CreatorChannelHub.tsx"), "utf8");
const trustLens = fs.readFileSync(path.join(root, "client/src/components/PortalTrustLens.tsx"), "utf8");

describe("Phase 311 — Episode 7 Cross-Lane Discovery Integration", () => {
  it("registers the creator-directed Production Continuum route", () => {
    expect(app).toContain('path="/production-continuum" component={ProductionContinuum}');
    expect(continuum).toContain('useSovereignHeartbeat({ page: "production-continuum" })');
    expect(continuum).toContain("SCROLLVERSE PRODUCTION CONTINUUM");
    expect(continuum).toContain("Beacon Arc 07");
  });

  it("connects original production to media, fashion, books, community, evidence, and crypto discovery without activation claims", () => {
    expect(continuum).toContain('href: "/original-media-readiness"');
    expect(continuum).toContain('href: "/fashion-artifact-atlas"');
    expect(continuum).toContain('href: "/books-media-readiness"');
    expect(continuum).toContain('href: "/creator-channel-hub"');
    expect(continuum).toContain('href="/crypto-systems-atlas"');
    expect(continuum).toContain("does not activate a token, reward, wallet, contract");
  });

  it("surfaces the route from creator channels and keeps trust copy creator-directed", () => {
    expect(channels).toContain('href="/production-continuum"');
    expect(channels).toContain("Production Continuum");
    expect(trustLens).toContain("presents the creator’s first-party ScrollVerse materials directly");
    expect(trustLens).toContain("do not redefine the creator’s direction");
  });

  it("keeps discovery filtering and channel search local and keyboard-addressable", () => {
    expect(continuum).toContain("BROWSER-LOCAL ROUTE FILTER");
    expect(continuum).toContain('aria-pressed={laneFilter === value}');
    expect(continuum).toContain("does not change an item’s release or network state");
    expect(continuum).toContain("aria-label={`Open ${label}: ${title}`}");
    expect(channels).toContain("Search creator channel titles, lanes, and notes");
    expect(channels).toContain("Search this local registry");
    expect(channels).toContain("focus-visible:ring-2");
  });
});
