import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 680 Omniverse Manifesto Chronology", () => {
  it("builds a six-arc source navigation chronology without claiming timestamps", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/OmniverseManifestoChronology.tsx"), "utf8");
    expect(page).toContain("Archive Continuity");
    expect(page).toContain("Keep the arc.");
    expect(page).toContain("not a timestamped transcript");
    expect(page).toContain("does not infer dates, unseen content, causality");
  });

  it("includes the first-party merge and protected attachment events as bounded archive anchors", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/OmniverseManifestoChronology.tsx"), "utf8");
    expect(page).toContain("393ca29");
    expect(page).toContain("does not implement the four proposed fixes");
    expect(page).toContain("PROTECTED SOURCE ACCESSION");
  });

  it("registers the chronology as a portal route", () => {
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(app).toContain('path="/omniverse-manifesto-chronology"');
    expect(app).toContain("OmniverseManifestoChronology");
  });
});
