import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 635 — Legion Continuity Lab", () => {
  it("registers the browser-local continuity route with front-door discovery", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(app).toContain('path={"/legion-continuity-lab"}');
    expect(home).toContain('href: "/legion-continuity-lab"');
  });

  it("preserves local task snapshots, correction records, pause intent, and disabled automation boundaries", () => {
    const page = read("client/src/pages/LegionContinuityLab.tsx");
    expect(page).toContain("SCROLLVERSE LEGION CONTINUITY LAB");
    expect(page).toContain("Local continuity snapshot exported.");
    expect(page).toContain("CORRECTION NEEDED");
    expect(page).toContain("PAUSED BY DEFAULT");
    expect(page).toContain("does not create an agent");
    expect(page).toContain("does not create another destination");
  });

  it("documents the private-archive preparation record and three disabled future operating paths", () => {
    const page = read("client/src/pages/LegionContinuityLab.tsx");
    const spec = read("docs/phase635-legion-continuity-lab-spec.md");
    expect(page).toContain("PRIVATE ARCHIVE REPOSITORY · PREPARATION ONLY");
    expect(page).toContain("Periodic reviewed sessions");
    expect(page).toContain("Deterministic recurring checks");
    expect(page).toContain("Persistent observation");
    expect(spec).toContain("Repository creation gate");
    expect(spec).toContain("No operating path is enabled");
  });
});
