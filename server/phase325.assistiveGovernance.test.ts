import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/AssistiveGovernanceDesk.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");

describe("Phase 325 — Assistive Governance Desk", () => {
  it("registers the local assistive-governance route", () => {
    expect(app).toContain('import AssistiveGovernanceDesk from "./pages/AssistiveGovernanceDesk"');
    expect(app).toContain('<Route path="/assistive-governance" component={AssistiveGovernanceDesk} />');
  });

  it("uses the project heartbeat, trust lens, and four governance lenses", () => {
    expect(page).toContain('useSovereignHeartbeat({ page: "assistive-governance-desk" })');
    expect(page).toContain("PortalTrustLens");
    expect(page).toContain('"Govern"');
    expect(page).toContain('"Map"');
    expect(page).toContain('"Measure"');
    expect(page).toContain('"Manage"');
  });

  it("keeps AI assistance and external action boundaries explicit", () => {
    expect(page).toContain("does not become the accountable legal, financial, or institutional decision-maker");
    expect(page).toContain("No page interaction signs a document, moves money");
    expect(page).toContain("Transaction-specific confirmation immediately before submission");
    expect(page).toContain("Provider or network confirmation");
    expect(page).toContain("evidenceEnvelope");
    expect(page).toContain("Source, accessibility & provenance");
  });

  it("keeps review packet interactions browser-local", () => {
    expect(page).toContain("navigator.clipboard.writeText(packet)");
    expect(page).toContain("Copy packet");
    expect(page).toContain("action-specific review packet");
  });
});
