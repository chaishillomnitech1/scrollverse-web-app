import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 608 — Creator-First Collaboration Invitation", () => {
  it("registers an evidence-led public invitation with browser-local collaboration pathways", () => {
    const app = read("client/src/App.tsx");
    const page = read("client/src/pages/CollaborationInvitation.tsx");

    expect(app).toContain('path={"/collaborate"}');
    expect(page).toContain("SCROLLVERSE OPEN COLLABORATION INVITATION");
    expect(page).toContain("Build with the evidence in view.");
    expect(page).toContain("Four visible collaboration worlds.");
    expect(page).toContain("Episode 35:");
    expect(page).toContain("The Global Convergence");
    expect(page).toContain('href="/episodic-production-slate"');
    expect(page).toContain('href="/capability-comparison"');
    expect(page).toContain('href="/replay-readiness"');
  });

  it("keeps the invitation browser-local and excludes external outreach execution", () => {
    const page = read("client/src/pages/CollaborationInvitation.tsx");
    const design = read("docs/phase608-collaboration-invitation-design.md");

    expect(page).toContain("EXTERNAL-ACTION BOUNDARY");
    expect(page).toContain("does not contact an organization");
    expect(page).not.toContain("fetch(");
    expect(page).not.toContain("mailto:");
    expect(design).toContain("It is an open route into source-led review and voluntary collaboration.");
    expect(design).toContain("does not send messages");
    expect(design).toContain("Creator-first evidence principle");
    expect(read("docs/phase609-collaboration-narrative-source-record.md")).toContain("Google AI Mode Screenshot Record");
    expect(read("docs/phase609-collaboration-narrative-source-record.md")).toContain("These records are meaningful evidence");
  });
});
