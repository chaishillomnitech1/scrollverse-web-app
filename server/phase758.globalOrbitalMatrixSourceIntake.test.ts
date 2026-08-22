import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 758 — Global Orbital Matrix protected source intake", () => {
  it("registers the source record as a browser-local route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('path="/global-orbital-matrix-source-intake" component={GlobalOrbitalMatrixSourceIntake}');
  });

  it("preserves every supplied orbital vector with a bounded research handoff", () => {
    const page = read("client/src/pages/GlobalOrbitalMatrixSourceIntake.tsx");
    for (const title of ["Episode 67 narrative", "Satellite and orbital references", "Benchmark script", "Telemetry ingress configuration", "Infrastructure catalog", "External-agent reference"]) expect(page).toContain(title);
    for (const route of ["/original-media-readiness", "/future-infrastructure-blueprint", "/sovereignty-infrastructure-record", "/connected-source-registry", "/active-pathways-release-gates-audit"]) expect(page).toContain(route);
    expect(page).toContain("PROTECTED ORBITAL SOURCE RECORD");
    expect(page).toContain("No embedded script, Nginx block, satellite reference, telemetry endpoint");
  });

  it("documents asserted orbital status as protected source content rather than an active system", () => {
    const notes = read("docs/phase758-global-orbital-matrix-source-intake.md");
    expect(notes).toContain("protected source context");
    expect(notes).toContain("Non-executable source reference");
    expect(notes).toContain("No Nginx configuration, process, firewall, telemetry endpoint, or server change");
    expect(notes).toContain("No account, connector, agent, API, or external-service action");
  });
});
