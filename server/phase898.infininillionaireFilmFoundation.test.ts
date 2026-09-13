import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

function readProjectFile(relativePath: string) {
  return readFileSync(resolve(projectRoot, relativePath), "utf8");
}

describe("Phase 898 — INFININILLIONAIRE Film Foundation planning pathway", () => {
  it("presents the public source label and its supported five-part creator-authored cinematic arc", () => {
    const page = readProjectFile("client/src/pages/InfininillionaireFilmFoundation.tsx");

    expect(page).toContain("INFININILLIONAIRE Film Foundation");
    expect(page).toContain("Queensbridge");
    expect(page).toContain("Quantum Mansion");
    expect(page).toContain("Beyond the Veil");
    expect(page).toContain("Before the World Blows");
    expect(page).toContain("THOTHIBIS");
    expect(page).toContain("creator-authored cinematic planning record");
    expect(page).toContain("No production, rights clearance, financial, token, account, or release action occurs here.");
  });

  it("keeps the reviewed public repository external and connects only first-party planning paths", () => {
    const page = readProjectFile("client/src/pages/InfininillionaireFilmFoundation.tsx");

    expect(page).toContain("https://github.com/chaishillomnitech1/infininillionaire-film-foundation-phase-66-omega");
    expect(page).toContain('href="/seven-episode-series"');
    expect(page).toContain('href="/episode-brief-builder"');
    expect(page).toContain('href="/special-repository"');
  });

  it("registers the public route and central homepage handoff", () => {
    const app = readProjectFile("client/src/App.tsx");
    const home = readProjectFile("client/src/pages/Home.tsx");

    expect(app).toContain('lazy(() => import("@/pages/InfininillionaireFilmFoundation"))');
    expect(app).toContain('path="/infininillionaire-film-foundation"');
    expect(home).toContain('href="/infininillionaire-film-foundation"');
    expect(home).toContain("INFININILLIONAIRE Film Foundation");
  });

  it("preserves the source review and its excluded public-action boundaries", () => {
    const record = readProjectFile("docs/phase895-infininillionaire-film-foundation-source-review.md");

    expect(record).toContain("Queensbridge");
    expect(record).toContain("one commit");
    expect(record).toContain("does not authorize changes to the external repository");
    expect(record).toContain("financial");
    expect(record).toContain("Personal birth");
  });
});
