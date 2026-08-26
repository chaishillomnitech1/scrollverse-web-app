import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const map = readFileSync(resolve(root, "client/src/pages/GitHubEvidenceMap.tsx"), "utf8");
const constellation = readFileSync(resolve(root, "client/src/pages/GitHubConstellation.tsx"), "utf8");
const record = readFileSync(resolve(root, "docs/phase498-authorized-github-source-evidence-map.md"), "utf8");

describe("Phase 498 — Authorized GitHub source-evidence map", () => {
  it("registers the local evidence map and routes to it from GitHub Constellation", () => {
    expect(router).toContain('path="/github-evidence-map"');
    expect(router).toContain("GitHubEvidenceMap");
    expect(constellation).toContain('href="/github-evidence-map"');
    expect(map).toContain('useSovereignHeartbeat({ page: "github-evidence-map" })');
  });

  it("records the authorized profile, public source index, and selected source pathways with source context", () => {
    for (const id of ["SV-GH-498-001", "SV-GH-498-002", "SV-GH-498-003", "SV-GH-498-004", "SV-GH-498-005"]) expect(map).toContain(id);
    expect(map).toContain("ScrollVerse Omni Manifesto");
    expect(record).toContain("676dc8d");
    expect(record).toContain("owner-authorized public source");
  });

  it("keeps source review connected to its dedicated external-action records", () => {
    expect(map).toContain("This map preserves public source context for reader-led review");
    expect(map).toContain("Repository activity, private material, credentials, publication, releases, and other external actions travel through their own approved records and workflows");
    expect(map).toContain("Source context and next path");
    expect(record).toContain("performs no repository edit, GitHub API call");
    expect(record).toContain("it does not establish rights clearance, deployment, payment, license");
  });
});
