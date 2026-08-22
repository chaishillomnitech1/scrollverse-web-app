import fs from "node:fs";
import { describe, expect, it } from "vitest";
const page = fs.readFileSync("client/src/pages/MediaEvidenceBridge.tsx", "utf8");
describe("Phase 777 — Media Evidence Bridge", () => {
  it("registers the new source-to-production preparation route", () => { const app = fs.readFileSync("client/src/App.tsx", "utf8"); expect(app).toContain('import MediaEvidenceBridge from "./pages/MediaEvidenceBridge"'); expect(app).toContain('path="/media-evidence-bridge" component={MediaEvidenceBridge}'); });
  it("keeps archive, music, and creative preparation lanes distinct from release", () => { for (const phrase of ["Archive pilot evidence", "Music and narration evidence", "Original creative packet", "RIGHTS-AWARE SCOPE", "OWNER-CONTROLLED RELEASE CONDITION", "Copy local preparation record"]) expect(page).toContain(phrase); expect(page).toContain("does not generate media"); });
  it("connects only to safe creative preparation and release-gate handoffs", () => { for (const route of ["/connected-statements-music-evidence", "/archive", "/film-animation-studio", "/music-creator-release-readiness", "/active-pathways-release-gates-audit"]) expect(page).toContain(route); });
});
