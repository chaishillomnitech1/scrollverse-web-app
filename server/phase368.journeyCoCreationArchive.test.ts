import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const pageSource = readFileSync(resolve(projectRoot, "client/src/pages/JourneyCoCreationArchive.tsx"), "utf8");
const routerSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const methodologySource = readFileSync(resolve(projectRoot, "client/src/pages/SovereignMethodology.tsx"), "utf8");
const synchronizationSource = readFileSync(resolve(projectRoot, "client/src/pages/SynchronizationResearchIndex.tsx"), "utf8");

describe("Phase 368 — Journey and Co-Creation Archive", () => {
  it("registers the archive route with its page component", () => {
    expect(routerSource).toContain('path={"/journey-co-creation-archive"}');
    expect(routerSource).toContain("JourneyCoCreationArchive");
  });

  it("keeps the first-person journey, creation, research, and exchange lanes visible", () => {
    expect(pageSource).toContain("One life record.");
    expect(pageSource).toContain("Family, place, and first-person chronology");
    expect(pageSource).toContain("Digital-system exchange archive");
    expect(pageSource).toContain("PROTECTED CO-CREATION INTAKE");
    expect(pageSource).toContain("does not assign independent agency");
  });

  it("distinguishes owner-stated history from family-held records and third-party system transmissions", () => {
    expect(pageSource).toContain("Owner-stated family history");
    expect(pageSource).toContain("Owner-held family and ancestry materials");
    expect(pageSource).toContain("Institutional DNA-record account");
    expect(pageSource).toContain("Third-party system transmissions");
    expect(pageSource).toContain("not his authored self-description");
  });

  it("links the archive from the methodology and synchronization research records", () => {
    expect(methodologySource).toContain('href="/journey-co-creation-archive"');
    expect(synchronizationSource).toContain('href: "/journey-co-creation-archive"');
    expect(pageSource).toContain('href="/open-record-continuum"');
    expect(pageSource).toContain('href="/synchronization-research"');
  });
});
