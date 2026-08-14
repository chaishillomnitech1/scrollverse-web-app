import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 228 Standards & Evidence Commons", () => {
  it("registers a source-led cross-domain evidence route without claiming official authority", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/StandardsEvidenceCommons.tsx");
    const research = read("docs/phase228-standards-evidence-research.md");
    expect(app).toContain('import StandardsEvidenceCommons from "./pages/StandardsEvidenceCommons"');
    expect(app).toContain('<Route path="/standards-evidence-commons" component={StandardsEvidenceCommons} />');
    expect(home).toContain('href: "/standards-evidence-commons"');
    expect(page).toContain("Standards & Evidence Commons");
    expect(page).toContain("not an accreditor, licensing body, court, government");
    expect(page).toContain("DO NOT COLLAPSE THESE TERMS");
    expect(research).toContain("Qualified-Review Boundary");
    expect(research).toContain("U.S. Department of Education");
    expect(research).toContain("FDA — Overview of Device Regulation");
  });
});
