import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 892 Dynasty Visual Archive", () => {
  it("keeps creator-supplied assets source-labeled, non-transactional, locally exportable, and connected to first-party story planning", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/DynastyVisualArchive.tsx"), "utf8");
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");

    expect(page).toContain("DYNASTY VISUAL ARCHIVE");
    expect(page).toContain("CREATOR-SUPPLIED · SOURCE-LABELED · NON-TRANSACTIONAL");
    expect(page).toContain("Black Titanium Reader");
    expect(page).toContain("Sovereign Seal Artwork");
    expect(page).toContain("Golden Pyramid Storm");
    expect(page).toContain("Five supplied designs. One non-transactional gallery.");
    expect(page).toContain("scrollverse-dynasty-visual-archive-local-record.json");
    expect(page).toContain("SOURCE RECORD, NOT A RELEASE.");
    expect(page).toContain('href="/episode-brief-builder"');
    expect(page).toContain('href="/seven-episode-series"');
    expect(page).toContain('href="/special-repository"');
    expect(page).not.toContain("fetch(");
    expect(app).toContain('path="/dynasty-visual-archive"');
    expect(home).toContain('id="dynasty-visual-archive-beacon"');
    expect(home).toContain("Open Dynasty Visual Archive");
  });
});
