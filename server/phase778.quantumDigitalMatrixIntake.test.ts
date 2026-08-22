import fs from "node:fs";
import { describe, expect, it } from "vitest";
const page = fs.readFileSync("client/src/pages/QuantumDigitalMagicSourceRecord.tsx", "utf8");
describe("Phase 778 — Quantum Digital Matrix protected source intake", () => {
  it("registers the protected source record route", () => { const app = fs.readFileSync("client/src/App.tsx", "utf8"); expect(app).toContain('import QuantumDigitalMagicSourceRecord from "./pages/QuantumDigitalMagicSourceRecord"'); expect(app).toContain('path="/quantum-digital-magic-source-record" component={QuantumDigitalMagicSourceRecord}'); });
  it("preserves the four reference lanes without executing embedded claims", () => { for (const phrase of ["Episode 71 creative reference", "Local retrieval harness reference", "Ingress and telemetry reference", "Asset catalog and protected reference links", "No embedded script was run", "No Nginx configuration"]) expect(page).toContain(phrase); });
  it("connects to browser-local original planning and release-gate routes", () => { for (const route of ["/media-evidence-bridge", "/film-animation-studio", "/active-pathways-release-gates-audit"]) expect(page).toContain(route); });
});
