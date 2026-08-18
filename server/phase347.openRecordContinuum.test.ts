import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const continuum = fs.readFileSync(path.join(root, "client/src/pages/OpenRecordContinuum.tsx"), "utf8");
const readiness = fs.readFileSync(path.join(root, "client/src/pages/PreRegistrationReadiness.tsx"), "utf8");

describe("Phase 347 — Open Record Continuum Manifesto", () => {
  it("registers the creator-directed continuity record with heartbeat telemetry", () => {
    expect(app).toContain('path="/open-record-continuum" component={OpenRecordContinuum}');
    expect(continuum).toContain('useSovereignHeartbeat({ page: "open-record-continuum" })');
    expect(continuum).toContain("OPEN RECORD · CONTINUUM MANIFESTO");
  });

  it("keeps first-party perspective, local results, public sources, and external outcomes distinct", () => {
    expect(continuum).toContain("First-party perspective");
    expect(continuum).toContain("Documented local result");
    expect(continuum).toContain("Public source trail");
    expect(continuum).toContain("Requires owner release");
    expect(continuum).toContain("does not represent external observers");
  });

  it("provides accessible principle selection and bounded browser-local copy feedback", () => {
    expect(continuum).toContain('role="tablist"');
    expect(continuum).toContain('role="tab"');
    expect(continuum).toContain('aria-selected={activePrinciple === index}');
    expect(continuum).toContain("Continuum reading brief copied.");
  });

  it("connects the manifesto with readiness, quantum, QFS, IP, and governance paths", () => {
    expect(continuum).toContain('href="/pre-registration-readiness"');
    expect(continuum).toContain('href="/quantum-research"');
    expect(continuum).toContain('href="/quantum-frequency-research-lab"');
    expect(continuum).toContain('href="/ip-stewardship"');
    expect(continuum).toContain('href="/assistive-governance"');
    expect(readiness).toContain('href="/open-record-continuum"');
  });
});
