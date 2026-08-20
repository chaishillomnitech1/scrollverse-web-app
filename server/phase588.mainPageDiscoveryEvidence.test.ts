import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 588 — Main-page discovery and aggregate evidence", () => {
  it("adds an evidence-labeled visual tutorial handoff and registered discovery routes on the homepage", () => {
    const home = read("client/src/pages/Home.tsx");

    expect(home).toContain("function VisitorDiscoveryRail()");
    expect(home).toContain("Owner-shared aggregate portal observations guide this local discovery rail");
    expect(home).toContain('href="/tutorial-studio"');
    expect(home).toContain('href: "/junior-movies"');
    expect(home).toContain('href: "/creator-operations-intelligence"');
    expect(home).toContain("<VisitorDiscoveryRail />");
  });

  it("records the source, privacy, and no-action limits of the aggregate observations", () => {
    const evidence = read("docs/phase588-shared-session-and-aggregate-analytics-evidence.md");

    expect(evidence).toContain("aggregate dashboard observations");
    expect(evidence).toContain("No material was available for verification or integration");
    expect(evidence).toContain("do not independently establish external deployment");
    expect(evidence).toContain("must not expose personal data");
  });
});
