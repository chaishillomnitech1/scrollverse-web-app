import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 636 — ScrollVerse Research Atlas", () => {
  it("registers the public research route with front-door discovery", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(app).toContain('path={"/research-atlas"}');
    expect(home).toContain('href: "/research-atlas"');
  });

  it("includes six source-led interdisciplinary districts with local correction and export controls", () => {
    const page = read("client/src/pages/ResearchAtlas.tsx");
    for (const district of ["Physics", "Mathematics", "Science", "Philosophy", "Design methods", "Creator practice"]) expect(page).toContain(district);
    expect(page).toContain("Local research record copied.");
    expect(page).toContain("Local research record exported.");
    expect(page).toContain("Browser-local correction note");
    expect(page).toContain("The Atlas does not establish a scientific claim");
  });

  it("preserves the verified source log and clear scope limits", () => {
    const log = read("docs/phase636-foundational-source-log.md");
    for (const source of ["About CERN", "Millennium Prize Problems", "About NASA Science", "Stanford Encyclopedia of Philosophy", "The Double Diamond", "Practice as Research"]) expect(log).toContain(source);
    expect(log).toContain("discovery anchors, not exhaustive coverage");
  });
});
