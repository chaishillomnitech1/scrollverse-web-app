import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (file: string) => readFileSync(resolve(root, file), "utf8");

describe("Phase 329 — IP stewardship map", () => {
  const page = read("client/src/pages/IPStewardshipMap.tsx");
  const app = read("client/src/App.tsx");
  const readiness = read("client/src/pages/IpReadinessNavigator.tsx");

  it("registers the local IP stewardship route", () => {
    expect(app).toContain('import IPStewardshipMap from "./pages/IPStewardshipMap"');
    expect(app).toContain('<Route path="/ip-stewardship" component={IPStewardshipMap} />');
  });

  it("separates local stewardship packets from registration and ownership claims", () => {
    expect(page).toContain("It does not clear a mark, grant a patent, register copyright");
    expect(page).toContain("not automatically cleared, registered, exclusive");
    expect(page).toContain("not a patent application, patentability opinion, or granted patent");
  });

  it("supports the five evidence-first IP lanes and browser-local packet builder", () => {
    ["copyright", "trademark", "patent", "trade-secret", "license"].forEach(lane => expect(page).toContain(`id: \"${lane}\"`));
    expect(page).toContain("BROWSER-LOCAL PACKET BUILDER");
    expect(page).toContain("Copy {lane.label} Packet");
  });

  it("links IP readiness to the new stewardship experience", () => {
    expect(readiness).toContain('href="/ip-stewardship"');
    expect(readiness).toContain("IP Stewardship");
  });
});
