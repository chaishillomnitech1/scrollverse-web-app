import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 751–752 active pathways and release-gates audit", () => {
  it("registers the browser-local audit and exposes it in the Empire Index", () => {
    const app = read("client/src/App.tsx");
    const empire = read("client/src/pages/EmpireIndex.tsx");

    expect(app).toContain('path="/active-pathways-release-gates-audit"');
    expect(app).toContain("ActivePathwaysReleaseGatesAudit");
    expect(empire).toContain('route: "/active-pathways-release-gates-audit"');
  });

  it("maps the current portal pathways using direct operating-state labels", () => {
    const audit = read("client/src/pages/ActivePathwaysReleaseGatesAudit.tsx");

    expect(audit).toContain('"available now"');
    expect(audit).toContain('"research"');
    expect(audit).toContain('"requires owner release"');
    expect(audit).toContain("Omniland delivery and input research");
    expect(audit).toContain("Media, film, and channel preparation");
    expect(audit).toContain("Wear concept-to-production preparation");
    expect(audit).toContain("Commerce and financial highways planning");
    expect(audit).toContain("Protected evidence and creator continuity");
  });

  it("keeps external operations as explicit owner-controlled gates", () => {
    const audit = read("client/src/pages/ActivePathwaysReleaseGatesAudit.tsx");

    expect(audit).toContain("Social and account actions");
    expect(audit).toContain("separate Shopify-configured project or fork");
    expect(audit).toContain("Production and vendor activation");
    expect(audit).toContain("No checkout, payment, payout, exchange, wallet connection, transfer");
    expect(audit).toContain("separate external Game Systems repository");
  });
});
