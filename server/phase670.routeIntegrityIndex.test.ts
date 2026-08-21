import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = "/home/ubuntu/scrollverse-portal";
const page = fs.readFileSync(path.join(root, "client/src/pages/RouteIntegrityIndex.tsx"), "utf8");
const router = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");

describe("Phase 670 Route Integrity Index", () => {
  it("indexes creator, release, asset, and evidence routes with direct links", () => {
    expect(page).toContain("ROUTE INTEGRITY INDEX");
    expect(page).toContain("/three-lane-release-register");
    expect(page).toContain("/campaign-asset-registry");
    expect(page).toContain("/special-repository");
    expect(page).toContain("/episodic-operations-archive");
    expect(page).toContain("OPEN ROUTE");
  });

  it("registers the integrity page in the active portal router", () => {
    expect(router).toContain('path={"/route-integrity-index"}');
    expect(router).toContain("component={RouteIntegrityIndex}");
  });
});
