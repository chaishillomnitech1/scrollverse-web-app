import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 902 — Creator Workflow Route Finder", () => {
  it("adds a browser-local filter with accessible results and no external route source", () => {
    const atlas = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/PlanningAtlas.tsx"), "utf8");

    expect(atlas).toContain("routeFinderQuery");
    expect(atlas).toContain("matchingWorkflowNodes");
    expect(atlas).toContain("Find a workflow route");
    expect(atlas).toContain('aria-label="Filter the six first-party creator workflow routes"');
    expect(atlas).toContain("route results");
    expect(atlas).toContain("The finder opens only the six registered first-party planning routes.");
    expect(atlas).not.toContain("fetch(");
  });
});
