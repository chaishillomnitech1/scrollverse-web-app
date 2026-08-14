import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 226 Open Knowledge Verse", () => {
  it("connects source-labeled learning paths with a local study aid and no credential claims", () => {
    const page = read("client/src/pages/OpenKnowledgeVerse.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const audit = read("docs/phase226-education-system-audit.md");
    expect(page).toContain("Open Knowledge Verse");
    expect(page).toContain("BROWSER-LOCAL STUDY CARD");
    expect(page).toContain("does not create a learner profile or record");
    expect(page).toContain("not a conformance certification");
    expect(app).toContain('import OpenKnowledgeVerse from "./pages/OpenKnowledgeVerse"');
    expect(app).toContain('<Route path="/open-knowledge-verse" component={OpenKnowledgeVerse} />');
    expect(home).toContain('href: "/open-knowledge-verse"');
    expect(audit).toContain("W3C");
    expect(audit).toContain("CAST");
    expect(audit).toContain("UNESCO");
  });
});
