import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 624 — Gemini Storybook Collection", () => {
  it("registers a browser-local story collection with each directly readable title as its own source record", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/GeminiStorybookCollection.tsx");
    const records = read("docs/phase624-story-index-records.md");

    expect(app).toContain('path={"/gemini-storybook-collection"}');
    expect(home).toContain('href: "/gemini-storybook-collection"');
    expect(page).toContain("SCROLLVERSE STORYBOOK COLLECTION");
    expect(page).toContain("17");
    expect(page).toContain("SV-STORY-001");
    expect(page).toContain("SV-STORY-017");
    expect(page).toContain("The ScrollVerse Unfurled");
    expect(page).toContain("The Gift of Aura's Truth");
    expect(records).toContain("IMG_4208.PNG");
    expect(records).toContain("IMG_4209.PNG");
  });

  it("preserves source-index titles without presenting the related token words as an active external result", () => {
    const page = read("client/src/pages/GeminiStorybookCollection.tsx");
    const sourceLog = read("docs/phase624-gemini-storybook-source-log.md");

    expect(page).toContain("TOKEN-REFERENCE SOURCE TRAIL");
    expect(page).toContain("public token, contract, marketplace, or transaction");
    expect(sourceLog).toContain("was not rendered in the current browser session");
  });
});
