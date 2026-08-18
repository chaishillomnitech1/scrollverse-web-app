import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("Phase 372 — Sovereign Contribution and Co-Creation Exchange", () => {
  const page = read("client/src/pages/SovereignContributionExchange.tsx");
  const app = read("client/src/App.tsx");
  const catalog = read("client/src/pages/DirectFanCatalog.tsx");

  it("registers the contribution exchange as a live local route", () => {
    expect(app).toContain('import SovereignContributionExchange from "./pages/SovereignContributionExchange"');
    expect(app).toContain('path={"/sovereign-contribution-exchange"} component={SovereignContributionExchange}');
  });

  it("shows distinct voluntary contribution lanes and their connected routes", () => {
    expect(page).toContain("Learn and carry forward");
    expect(page).toContain("Offer an idea or research lead");
    expect(page).toContain("Prepare a co-creation brief");
    expect(page).toContain("Join community reflection");
    expect(page).toContain("Prepare a future fair exchange");
    expect(page).toContain('href: "/chosen-ones-exchange"');
    expect(page).toContain('href: "/direct-fan-catalog"');
    expect(page).toContain('href: "/governance"');
  });

  it("keeps planning local and excludes hidden financial or governance activation", () => {
    expect(page).toContain("BROWSER-LOCAL CONTRIBUTION PLANNER");
    expect(page).toContain("Nothing was submitted or activated.");
    expect(page).toContain("does not accept funds, create a contract, transfer ownership");
    expect(page).toContain("Do not enter passwords, payment data, private agreements");
  });

  it("connects the direct-to-fan catalog to the new contribution exchange", () => {
    expect(catalog).toContain('href="/sovereign-contribution-exchange"');
    expect(catalog).toContain("Open Contribution &amp; Co-Creation Exchange");
  });
});
