import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const audit = fs.readFileSync(path.join(root, "client/src/pages/CapabilityAudit.tsx"), "utf8");
const continuum = fs.readFileSync(path.join(root, "client/src/pages/ProductionContinuum.tsx"), "utf8");

describe("Phase 314 — Concrete ScrollVerse Capability Audit", () => {
  it("registers a public capability audit route with engagement telemetry", () => {
    expect(app).toContain('path="/capability-audit" component={CapabilityAudit}');
    expect(audit).toContain('useSovereignHeartbeat({ page: "capability-audit" })');
    expect(audit).toContain("CONCRETE SCROLLVERSE CAPABILITY AUDIT");
    expect(continuum).toContain('href="/capability-audit"');
  });

  it("separates demonstrated local capabilities from research, external gates, and historic managed-publication incident status", () => {
    expect(audit).toContain('"Local now"');
    expect(audit).toContain('"Research"');
    expect(audit).toContain('"External gate"');
    expect(audit).toContain('"Historic incident"');
    expect(audit).toContain("No connector account is currently active");
    expect(audit).toContain("Historic checkpoint 2ba0cc6a is retained as incident evidence");
    expect(audit).toContain("Managed recovery and public delivery verified");
    expect(audit).toContain("does not activate a product, payment, wallet, token, contract");
  });

  it("keeps capability inspection browser-local and accessible", () => {
    expect(audit).toContain("CAPABILITY STATE FILTER");
    expect(audit).toContain('aria-pressed={active}');
    expect(audit).toContain("This filter runs in the current browser only.");
    expect(audit).toContain("AUDIT EVIDENCE");
  });
});
