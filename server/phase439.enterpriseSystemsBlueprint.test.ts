import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/EnterpriseSystemsBlueprint.tsx"), "utf8");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("Phase 439 — Enterprise Systems Blueprint", () => {
  it("registers a practical source-led B2B systems route", () => {
    expect(router).toContain('path="/enterprise-systems-blueprint"');
    expect(router).toContain("EnterpriseSystemsBlueprint");
    expect(page).toContain('useSovereignHeartbeat({ page: "enterprise-systems-blueprint" })');
    expect(page).toContain("SCROLLVERSE SYSTEMS BLUEPRINT");
    expect(page).toContain("Release Record Blueprint");
    expect(page).toContain("Source Trail Blueprint");
    expect(page).toContain("Action-Gate Blueprint");
    expect(page).toContain("Creator Operations Pilot");
  });

  it("keeps the buyer brief browser-local and rejects unverified commercial or provider claims", () => {
    expect(page).toContain("browser-local");
    expect(page).toContain("Copy local discovery brief");
    expect(page).toContain("One defined workflow. One source trail. One owner. One acceptance record.");
    expect(page).toContain("does not contact a buyer");
    expect(page).toContain("does not create a contract");
    expect(page).toContain("create a CRM record");
    expect(page).toContain("promise commercial performance");
    expect(page).toContain("scrollverse-omni-manifesto");
    expect(page).not.toMatch(/guaranteed revenue|customer adopted|approved partnership|enable payment now|connect crm now/i);
  });
});
