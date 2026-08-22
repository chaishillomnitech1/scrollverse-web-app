import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 683 Connected Source Registry", () => {
  it("records all supplied portal, shared-file, and protected-attachment references", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ConnectedSourceRegistry.tsx"), "utf8");
    expect(page).toContain("18 SOURCE RECORDS · VISIBLE SCOPE");
    expect(page).toContain("https://scrollport-ccbm4cgm.manus.space/catalog");
    expect(page).toContain("https://scrollverse-3mddshgp.manus.space/");
    expect(page).toContain("Pasted_content_100_01");
  });

  it("keeps planning, metrics, release, checkout, and protected-source boundaries explicit", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ConnectedSourceRegistry.tsx"), "utf8");
    expect(page).toContain("Planning and projection language is not external-performance verification");
    expect(page).toContain("Reported figures are not an independent user, revenue, or performance audit");
    expect(page).toContain("Visible cart controls do not establish checkout");
    expect(page).toContain("Protected source is not executed");
  });

  it("registers the connected source registry as a portal route and homepage handoff", () => {
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(app).toContain('path="/connected-source-registry"');
    expect(app).toContain("ConnectedSourceRegistry");
    expect(home).toContain('href="/connected-source-registry"');
  });

  it("preserves the current-feed research set with clear attribution and no-account-action limits", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/YouTubeCurrentFeedResearch.tsx"), "utf8");
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(page).toContain("VZJUmiCO25E");
    expect(page).toContain("A4wl8qdZ2h0");
    expect(page).toContain("h8VWhpH3pCw");
    expect(page).toContain("Feed context is not channel ownership");
    expect(page).toContain("No video was played, liked, shared, saved, posted");
    expect(app).toContain('path={"/youtube-current-feed-research"}');
    expect(app).toContain("YouTubeCurrentFeedResearch");
  });
});
