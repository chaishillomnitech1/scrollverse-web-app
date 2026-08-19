import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const station = readFileSync(resolve(root, "client/src/pages/WorldStation.tsx"), "utf8");
const showcase = readFileSync(resolve(root, "client/src/pages/ProofOfPractice.tsx"), "utf8");
const record = readFileSync(resolve(root, "docs/phase500-world-station-service-readiness.md"), "utf8");

describe("Phase 500 — ScrollVerse World Station service readiness", () => {
  it("registers the World Station and connects it to the proof-of-practice showcase", () => {
    expect(router).toContain('path="/world-station"');
    expect(router).toContain("WorldStation");
    expect(showcase).toContain('route: "/world-station"');
    expect(showcase).toContain("World Station Service Readiness");
    expect(station).toContain('useSovereignHeartbeat({ page: "world-station" })');
  });

  it("keeps public knowledge, reusable service lanes, source fields, and future operating options visible", () => {
    for (const lane of ["Websites & Experience Systems", "Creator Catalog & Media Systems", "Public Knowledge & Research Interfaces", "Operations & Service Blueprints", "Integration & Exchange Readiness"]) expect(station).toContain(lane);
    expect(station).toContain("Free knowledge stays available");
    expect(station).toContain("Named deterministic review operation");
    expect(station).toContain("Bounded research-assistance operation");
    expect(record).toContain("The World Station is a public-knowledge-first service studio.");
  });

  it("keeps briefs browser-local and excludes engagements, automation, client builds, payments, accounts, providers, and exchanges", () => {
    expect(station).toContain("PUBLIC KNOWLEDGE FIRST · NO AUTOMATION ACTIVE");
    expect(station).toContain("does not collect a lead, create a client record, quote a price, form a contract");
    expect(station).toContain("does not create the job");
    expect(record).toContain("A ready brief is not permission to create a client site, send a proposal, schedule a job");
  });
});
