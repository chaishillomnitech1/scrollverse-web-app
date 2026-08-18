import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const quantumResearch = fs.readFileSync(path.join(root, "client/src/pages/QuantumResearch.tsx"), "utf8");
const qfsLab = fs.readFileSync(path.join(root, "client/src/pages/QuantumFrequencyResearchLab.tsx"), "utf8");
const audit = fs.readFileSync(path.join(root, "client/src/pages/CapabilityAudit.tsx"), "utf8");

describe("Phase 335 — Quantum Research and QFS learning bridge", () => {
  it("registers the quantum research destination with heartbeat telemetry", () => {
    expect(app).toContain('path="/quantum-research" component={QuantumResearch}');
    expect(quantumResearch).toContain('useSovereignHeartbeat({ page: "quantum-research" })');
    expect(quantumResearch).toContain("SCROLLVERSE QUANTUM RESEARCH · FREE OPEN LEARNING");
  });

  it("separates experimental research from first-party QFS context", () => {
    expect(quantumResearch).toContain("Experimental research");
    expect(quantumResearch).toContain("Standards and migration research");
    expect(quantumResearch).toContain("Infrastructure research");
    expect(quantumResearch).toContain("First-party ScrollVerse perspective");
    expect(quantumResearch).toContain("does not operate a quantum computer");
  });

  it("connects QFS study and capability pages without suggesting a live financial system", () => {
    expect(qfsLab).toContain('href="/quantum-research"');
    expect(audit).toContain('href: "/quantum-research"');
    expect(quantumResearch).toContain("QFS RESEARCH BRIDGE");
    expect(quantumResearch).toContain("activate a QFS, bank interface, payment flow");
  });

  it("keeps the research-track control browser-local and accessible", () => {
    expect(quantumResearch).toContain('aria-pressed={selected}');
    expect(quantumResearch).toContain("The selection changes only this browser view.");
    expect(quantumResearch).toContain("SOURCE → LIMITATION → NEXT EVIDENCE");
  });

  it("connects evidence readiness to existing IP and accountable-governance workbenches", () => {
    expect(quantumResearch).toContain("LAWFUL EVIDENCE & GOVERNANCE READINESS");
    expect(quantumResearch).toContain('href="/ip-stewardship"');
    expect(quantumResearch).toContain('href="/assistive-governance"');
    expect(quantumResearch).toContain("Actual outcome");
    expect(quantumResearch).toContain("they do not by themselves create a registration");
  });
});
