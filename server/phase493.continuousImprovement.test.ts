import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const page = readFileSync(resolve(root, "client/src/pages/ContinuousImprovementStandard.tsx"), "utf8");

describe("Phase 493 — Governed Continuous Improvement Standard", () => {
  it("registers the source-labeled continuous-improvement route and heartbeat", () => {
    expect(router).toContain('path="/continuous-improvement-standard"');
    expect(router).toContain("ContinuousImprovementStandard");
    expect(page).toContain('useSovereignHeartbeat({ page: "continuous-improvement-standard" })');
    expect(page).toContain("SCROLLVERSE CONTINUOUS-IMPROVEMENT STANDARD");
  });

  it("covers route integrity, accessibility, evidence quality, security, release state, and recovery", () => {
    expect(page).toContain("Route Integrity");
    expect(page).toContain("Accessible Experience");
    expect(page).toContain("Evidence Quality");
    expect(page).toContain("Security Boundaries");
    expect(page).toContain("Release-State Accuracy");
    expect(page).toContain("Recovery & Correction");
  });

  it("keeps improvement review local and rejects autonomous external self-healing claims", () => {
    expect(page).toContain("RECOVERY-READY, NOT UNGOVERNED");
    expect(page).toContain("does not mean silent changes to providers, accounts, payments, contracts, or external systems");
    expect(page).toContain("does not schedule recurring work, claim autonomous self-healing");
    expect(page).toContain("does not deploy code, alter a provider, contact a third party, schedule a job");
  });
});
