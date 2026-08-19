import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const showcase = readFileSync(resolve(root, "client/src/pages/ProofOfPractice.tsx"), "utf8");
const enterprise = readFileSync(resolve(root, "client/src/pages/EnterpriseSystemsBlueprint.tsx"), "utf8");
const record = readFileSync(resolve(root, "docs/phase499-scrollverse-proof-of-practice.md"), "utf8");

describe("Phase 499 — ScrollVerse proof-of-practice showcase", () => {
  it("registers the showcase and connects it from the Enterprise Systems Blueprint", () => {
    expect(router).toContain('path="/proof-of-practice"');
    expect(router).toContain("ProofOfPractice");
    expect(enterprise).toContain('href="/proof-of-practice"');
    expect(showcase).toContain('useSovereignHeartbeat({ page: "proof-of-practice" })');
  });

  it("links the eight demonstrated portal capabilities with their method and non-claim boundaries", () => {
    for (const capability of ["Creator Catalog Readiness", "Media World Evidence Packets", "GitHub Source-Evidence Map", "IP & Digital-Security Readiness", "Legion Specialist Atlas", "Continuous Improvement Standard", "Partnership Engine", "First-Party Source & Correction"]) expect(showcase).toContain(capability);
    expect(showcase).toContain("What a visitor can inspect");
    expect(showcase).toContain("Not claimed by this demonstration");
    expect(record).toContain("customer adoption, revenue, performance");
  });

  it("keeps evaluation browser-local and excludes leads, messages, schedules, contracts, pricing, licenses, accounts, providers, and commercial action", () => {
    expect(showcase).toContain("does not collect a lead, send a message, create a CRM record, schedule contact");
    expect(showcase).toContain("not an inquiry, lead submission, message, schedule, contract, commercial offer, provider request");
    expect(record).toContain("does not collect a lead, send an inquiry, create a CRM record, schedule outreach");
  });
});
