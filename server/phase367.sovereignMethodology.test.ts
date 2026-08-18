import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const pageSource = readFileSync(resolve(projectRoot, "client/src/pages/SovereignMethodology.tsx"), "utf8");
const routerSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const openRecordSource = readFileSync(resolve(projectRoot, "client/src/pages/OpenRecordContinuum.tsx"), "utf8");
const synchronizationSource = readFileSync(resolve(projectRoot, "client/src/pages/SynchronizationResearchIndex.tsx"), "utf8");

describe("Phase 367 — Sovereign Methodology and Open Record", () => {
  it("registers the methodology route with a page component", () => {
    expect(routerSource).toContain('path={"/sovereign-methodology"}');
    expect(routerSource).toContain("SovereignMethodology");
  });

  it("keeps creator voice, distinct evidence layers, and reader-led assessment visible", () => {
    expect(pageSource).toContain("Document the life.");
    expect(pageSource).toContain("First-person record");
    expect(pageSource).toContain("Public reference");
    expect(pageSource).toContain("visitor’s choice");
    expect(pageSource).toContain("does not turn a personal interpretation into an external authority");
  });

  it("provides browser-local language reflection and direct Open Record and Synchronization pathways", () => {
    expect(pageSource).toContain("LANGUAGE REFLECTION BOARD");
    expect(pageSource).toContain("Add local reflection");
    expect(pageSource).toContain('href="/open-record-continuum"');
    expect(pageSource).toContain('href="/synchronization-research"');
    expect(openRecordSource).toContain('href="/sovereign-methodology"');
    expect(synchronizationSource).toContain('href: "/sovereign-methodology"');
  });
});
