import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 889 seven-episode source-led series", () => {
  it("provides seven original fictional episode arcs, local export, public-record intake boundaries, and registered first-party pathways", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/SevenEpisodeSeries.tsx"), "utf8");
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");

    expect(page).toContain("Seven doors.");
    expect(page).toContain("const EPISODES");
    expect(page).toContain('number: "01"');
    expect(page).toContain('number: "07"');
    expect(page).toContain("The Maker’s Mirror");
    expect(page).toContain("scrollverse-seven-episode-series-plan.json");
    expect(page).toContain("BROWSER-LOCAL PUBLIC-RECORD INTAKE");
    expect(page).toContain("No specific public legal document has been provided in this workspace");
    expect(page).toContain("RECORD, NOT A RULING.");
    expect(page).toContain('href="/episode-brief-builder"');
    expect(page).toContain('href="/connected-source-registry"');
    expect(page).not.toContain("fetch(");
    expect(app).toContain('path="/seven-episode-series"');
    expect(home).toContain('id="seven-episode-series-beacon"');
    expect(home).toContain("Open Seven-Episode Series");
  });
});
