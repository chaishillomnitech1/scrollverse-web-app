import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 639 — ScrollVerse Continuity Index", () => {
  it("registers the Continuity Index route and public discovery entry", () => {
    expect(read("client/src/App.tsx")).toContain('path={"/scrollverse-continuity-index"}');
    expect(read("client/src/pages/Home.tsx")).toContain('href: "/scrollverse-continuity-index"');
  });

  it("indexes the active workspace across source, catalog, world, evidence, control, gate, and session records", () => {
    const page = read("client/src/pages/ScrollVerseContinuityIndex.tsx");
    for (const domain of ["SOURCE", "CATALOG", "WORLD", "EVIDENCE", "CONTROL", "GATE", "SESSION"]) expect(page).toContain(domain);
    for (const title of ["Creator visual source archive", "Gemini Storybook collection", "Catalog + Cover Art Storyworlds", "Digital Intelligence Safeguards", "Sovereign Isolation Terminal", "Attached Manus session intake"]) expect(page).toContain(title);
  });

  it("keeps local export and external-session source boundaries explicit", () => {
    const page = read("client/src/pages/ScrollVerseContinuityIndex.tsx");
    const spec = read("docs/phase639-continuity-index-spec.md");
    expect(page).toContain("Continuity Index exported locally.");
    expect(page).toContain("Unattached or unrelated chats are not assumed");
    expect(page).toContain("remoteSessionAccessAssumed: false");
    expect(spec).toContain("Other Manus sessions require an owner-attached session reference");
  });
});
