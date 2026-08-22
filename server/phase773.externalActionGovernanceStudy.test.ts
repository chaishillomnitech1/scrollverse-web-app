import fs from "node:fs";
import { describe, expect, it } from "vitest";
const read = (path: string) => fs.readFileSync(path, "utf8");
const page = read("client/src/pages/ExternalActionGovernanceStudy.tsx");
describe("Phase 773 — External Action Governance Study", () => {
  it("registers the browser-local governance study route", () => { const app = read("client/src/App.tsx"); expect(app).toContain('import ExternalActionGovernanceStudy from "./pages/ExternalActionGovernanceStudy"'); expect(app).toContain('path="/external-action-governance-study" component={ExternalActionGovernanceStudy}'); });
  it("preserves governance cards for external pathway study", () => { for (const title of ["Catalog or media release", "Account or provider connection", "Commerce or product path", "Financial or market pathway", "Partnership or collaboration path"]) expect(page).toContain(title); expect(page).toContain("minimum necessary context"); expect(page).toContain("release condition"); });
  it("keeps governance non-advisory and does not initiate external action", () => { expect(page).toContain("not legal advice"); expect(page).toContain("No external action is submitted"); expect(page).toContain("Copy local governance card"); for (const route of ["/connected-source-registry", "/portfolio-evidence-hub", "/capital-readiness", "/active-pathways-release-gates-audit"]) expect(page).toContain(route); });
});
