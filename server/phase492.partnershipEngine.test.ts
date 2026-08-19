import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const engine = readFileSync(resolve(root, "client/src/pages/PartnershipEngine.tsx"), "utf8");
const blueprint = readFileSync(resolve(root, "client/src/pages/EnterpriseSystemsBlueprint.tsx"), "utf8");

describe("Phase 492 — Segmented Partnership Engine", () => {
  it("registers the approval-gated Partnership Engine and connects it from the Systems Blueprint", () => {
    expect(router).toContain('path="/partnership-engine"');
    expect(router).toContain("PartnershipEngine");
    expect(blueprint).toContain('href="/partnership-engine"');
    expect(blueprint).toContain("Partnership engine");
    expect(engine).toContain('useSovereignHeartbeat({ page: "partnership-engine" })');
  });

  it("offers tailored packages across creator, media, commerce, learning, AI, and high-impact control lanes", () => {
    expect(engine).toContain("Creator & Rights Operations");
    expect(engine).toContain("Media & Story Systems");
    expect(engine).toContain("Commerce Readiness Systems");
    expect(engine).toContain("Knowledge & Learning Commons");
    expect(engine).toContain("AI & Product Governance");
    expect(engine).toContain("High-Impact Action Controls");
    expect(engine).toContain("TAILORED SPECIALIST");
  });

  it("requires a named target, sender, channel, cadence, and exact confirmation before external outreach or scheduling", () => {
    expect(engine).toContain("Target organization or clearly defined recipient segment");
    expect(engine).toContain("Named sender and approved delivery channel");
    expect(engine).toContain("Cadence, time window, and suppression or opt-out rule");
    expect(engine).toContain("NO OUTREACH ACTIVE");
    expect(engine).toContain("does not send outreach, create a lead, schedule a task, contact an entity");
    expect(engine).toContain("The Portal can prepare the evidence and operating record; it does not create the schedule or send the outreach on this page.");
  });
});
