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

  it("records the authorized profile, public source index, and selected source pathways with limits", () => {
    for (const id of ["SV-GH-498-001", "SV-GH-498-002", "SV-GH-498-003", "SV-GH-498-004", "SV-GH-498-005"]) expect(map).toContain(id);
    expect(map).toContain("ScrollVerse Omni Manifesto");
    expect(record).toContain("676dc8d");
    expect(record).toContain("owner-authorized public source");
  });

  it("keeps source review passive and excludes code execution, private access, GitHub API, repository edits, publishing, and external claims", () => {
    expect(map).toContain("does not run code, access private material, extract secrets, invoke a GitHub API, edit a repository");
    expect(map).toContain("does not create a GitHub task, provider action, submission, post, issue, pull request, release, or repository change");
    expect(record).toContain("performs no repository edit, GitHub API call");
    expect(record).toContain("it does not establish rights clearance, deployment, payment, license");
  });
});
