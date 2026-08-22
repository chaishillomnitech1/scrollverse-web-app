import fs from "node:fs";
import { describe, expect, it } from "vitest";
const page = fs.readFileSync("client/src/pages/ConnectedStatementsMusicEvidence.tsx", "utf8");
const doc = fs.readFileSync("docs/phase776-sovereign-archive-pilot-source-record.md", "utf8");
describe("Phase 776 — Sovereign Archive pilot source record", () => {
  it("preserves the directly visible pilot metadata without converting it into an operating claim", () => { for (const phrase of ["Sovereign Archive pilot source record", "60-second English vertical pilot", "Original visual pilot v0.2.0", "2D / 3D hybrid animation", "original score + narration", "Preview record", "The Memory Commons"]) expect(page).toContain(phrase); expect(page).toContain("do not verify ownership, rights, clearance"); });
  it("links the source record to safe browser-local creative preparation paths", () => { expect(page).toContain('/film-animation-studio'); expect(page).toContain('/music-creator-release-readiness'); expect(doc).toContain("No action was taken on SovereignHub"); });
});
