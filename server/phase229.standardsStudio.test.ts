import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 229 Standards Studio", () => {
  it("registers the first-party methodology route with correction, conflict, and non-official authority boundaries", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/StandardsStudio.tsx");
    const research = read("docs/phase229-standards-studio-research.md");
    expect(app).toContain('import StandardsStudio from "./pages/StandardsStudio"');
    expect(app).toContain('<Route path="/standards-studio" component={StandardsStudio} />');
    expect(home).toContain('href: "/standards-studio"');
    expect(page).toContain("ScrollVerse Standards Studio");
    expect(page).toContain("VISIBLE REVIEW STATES");
    expect(page).toContain("not government, court, regulatory, accreditation");
    expect(page).toContain("Conflict disclosure");
    expect(research).toContain("Original ScrollVerse Methodology");
    expect(research).toContain("must never be styled as an external accreditation");
  });
});
