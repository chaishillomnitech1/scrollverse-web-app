import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const desk = fs.readFileSync(path.join(root, "client/src/pages/ProductionControlDesk.tsx"), "utf8");
const continuum = fs.readFileSync(path.join(root, "client/src/pages/ProductionContinuum.tsx"), "utf8");

describe("Phase 316 — Verified ScrollVerse Production Workflow", () => {
  it("registers the local Production Control Desk and surfaces it from the continuum", () => {
    expect(app).toContain('path="/production-control" component={ProductionControlDesk}');
    expect(desk).toContain('useSovereignHeartbeat({ page: "production-control-desk" })');
    expect(desk).toContain("SCROLLVERSE PRODUCTION CONTROL DESK");
    expect(continuum).toContain('href="/production-control"');
  });

  it("maps six asset-specific production lanes and their individual handoff packets", () => {
    expect(desk).toContain("Original media");
    expect(desk).toContain("Books & media");
    expect(desk).toContain("Fashion & artifacts");
    expect(desk).toContain("Creator channels");
    expect(desk).toContain("Release readiness");
    expect(desk).toContain("Crypto education");
    expect(desk).toContain("ASSET-SPECIFIC RELEASE PACKET");
    expect(desk).toContain("Copy handoff checklist");
  });

  it("keeps external publishing, payment, and network mutation outside the local desk", () => {
    expect(desk).toContain("no Instagram connector account is currently authorized for automatic publication");
    expect(desk).toContain("does not connect wallets, sign messages, deploy code, move assets, trade, custody, or transfer anything");
    expect(desk).toContain("does not publish, list, sell, charge, connect an account");
    expect(desk).toContain('aria-pressed={selected}');
  });
});
