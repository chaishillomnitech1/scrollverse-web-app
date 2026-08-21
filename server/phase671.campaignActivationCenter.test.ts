import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/CampaignActivationCenter.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const sourceLog = fs.readFileSync(path.join(root, "docs/phase671-github-campaign-sources.md"), "utf8");

describe("Phase 671 campaign activation center", () => {
  it("registers the browser-local campaign activation route", () => {
    expect(app).toContain('path={"/campaign-activation-center"}');
    expect(app).toContain("CampaignActivationCenter");
  });

  it("keeps the campaign sources first-party and source-linked", () => {
    expect(page).toContain("chais-hill-portfolio");
    expect(page).toContain("scrollverse-expansion-hub");
    expect(page).toContain("ChaisTheGreatApp-GodMode");
    expect(page).toContain("scrollverse_commerce");
    expect(sourceLog).toContain("First-Party Sources Reviewed");
  });

  it("provides local brief controls with an explicit external launch boundary", () => {
    expect(page).toContain("Campaign activation sequence");
    expect(page).toContain("Copy brief");
    expect(page).toContain("Export JSON");
    expect(page).toContain("does not post, buy advertising, send outreach");
  });

  it("connects campaign briefs to managed ScrollVerse routes", () => {
    expect(page).toContain("/campaign-asset-registry");
    expect(page).toContain("/brand-identity-record");
    expect(page).toContain("/original-episode-slate");
    expect(page).toContain("/first-party-sites-register");
  });
});
