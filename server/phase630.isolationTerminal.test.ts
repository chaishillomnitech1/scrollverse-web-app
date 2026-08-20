import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 630 — Sovereign Isolation Terminal", () => {
  it("registers the local audit-control terminal and homepage discovery route", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(app).toContain('path={"/sovereign-isolation-terminal"}');
    expect(home).toContain('href: "/sovereign-isolation-terminal"');
  });

  it("provides browser-local audit filtering, copy, and export without external transmission", () => {
    const terminal = read("client/src/pages/SovereignIsolationTerminal.tsx");
    expect(terminal).toContain("SOVEREIGN ISOLATION TERMINAL");
    expect(terminal).toContain("EXPORT JSON");
    expect(terminal).toContain("LOCAL AUDIT + RELEASE CONTROL");
    expect(terminal).toContain("cannot transmit audit data");
    expect(terminal).toContain("transmitted: false");
  });

  it("binds staged release gates to the specified connected evidence routes", () => {
    const terminal = read("client/src/pages/SovereignIsolationTerminal.tsx");
    const spec = read("docs/phase630-audit-control-spec.md");
    expect(terminal).toContain("STAGED RELEASE CHECKLIST");
    expect(terminal).toContain("Owner release record");
    expect(terminal).toContain("/activation-dossier");
    expect(terminal).toContain("/creator-brand-registry");
    expect(spec).toContain("Deployment state");
  });
});
