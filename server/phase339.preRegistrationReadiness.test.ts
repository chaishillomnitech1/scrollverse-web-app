import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const readiness = fs.readFileSync(path.join(root, "client/src/pages/PreRegistrationReadiness.tsx"), "utf8");
const quantum = fs.readFileSync(path.join(root, "client/src/pages/QuantumResearch.tsx"), "utf8");
const qfs = fs.readFileSync(path.join(root, "client/src/pages/QuantumFrequencyResearchLab.tsx"), "utf8");
const ip = fs.readFileSync(path.join(root, "client/src/pages/IPStewardshipMap.tsx"), "utf8");
const governance = fs.readFileSync(path.join(root, "client/src/pages/AssistiveGovernanceDesk.tsx"), "utf8");

describe("Phase 339 — Pre-registration and evidence readiness", () => {
  it("registers the browser-local readiness destination with heartbeat telemetry", () => {
    expect(app).toContain('path="/pre-registration-readiness" component={PreRegistrationReadiness}');
    expect(readiness).toContain('useSovereignHeartbeat({ page: "pre-registration-readiness" })');
    expect(readiness).toContain("SCROLLVERSE PRE-REGISTRATION DESK");
  });

  it("separates local preparation from official or external outcomes", () => {
    expect(readiness).toContain("browser-local preparation record only");
    expect(readiness).toContain("does not submit, file, register, notarize, license, fund, sell, publish");
    expect(readiness).toContain("not an official registry, filing office, court, bank");
  });

  it("keeps the record builder accessible and bounded to the current browser view", () => {
    expect(readiness).toContain('id="pre-registration-title"');
    expect(readiness).toContain('id="pre-registration-source"');
    expect(readiness).toContain('id="pre-registration-access"');
    expect(readiness).toContain("Create browser-local record");
    expect(readiness).toContain("The record appears here.");
  });

  it("connects quantum, QFS, IP, and governance learning surfaces to the readiness record", () => {
    expect(readiness).toContain('href="/quantum-research"');
    expect(readiness).toContain('href="/quantum-frequency-research-lab"');
    expect(readiness).toContain('href="/ip-stewardship"');
    expect(readiness).toContain('href="/assistive-governance"');
    expect(quantum).toContain('href="/pre-registration-readiness"');
    expect(qfs).toContain('href="/pre-registration-readiness"');
    expect(ip).toContain('href="/pre-registration-readiness"');
    expect(governance).toContain('href="/pre-registration-readiness"');
  });
});
