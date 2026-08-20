import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 590 — Evolution Lookbook", () => {
  it("registers the browser-local public-choice lookbook and its main-page discovery handoff", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/EvolutionLookbook.tsx");

    expect(app).toContain('path={"/evolution-lookbook"}');
    expect(home).toContain('href: "/evolution-lookbook"');
    expect(page).toContain("OWNER-AUTHORED VISUAL EXHIBIT · PUBLIC CHOICE");
    expect(page).toContain("PUBLIC BROWSER EXHIBIT");
    expect(page).toContain("Fifteen visual accessions");
    expect(page).toContain("CREATOR-FIRST COLLECTION LENSES");
    expect(page).toContain("Motion");
    expect(page).toContain("SV-EVO-015");
    expect(page).toContain('href="/creator-books"');
    expect(page).toContain('href="/tutorial-studio"');
  });

  it("keeps token, pricing, marketplace, and legal-outcome claims outside the active exhibit", () => {
    const page = read("client/src/pages/EvolutionLookbook.tsx");
    const evidence = read("docs/phase590-evolution-lookbook-asset-evidence.md");

    expect(page).toContain("This page is a visual exhibit");
    expect(page).toContain("not as a live financial, token, or marketplace feed");
    expect(evidence).toContain("artwork content");
    expect(evidence).toContain("No price, profit, token, contract");
  });
});
