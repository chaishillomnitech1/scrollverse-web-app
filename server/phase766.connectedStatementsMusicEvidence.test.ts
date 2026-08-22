import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 766 — Connected statements and music evidence review", () => {
  it("registers the source-bounded evidence route", () => {
    expect(read("client/src/App.tsx")).toContain('path="/connected-statements-music-evidence" component={ConnectedStatementsMusicEvidence}');
  });

  it("connects the music catalog to the evidence review and preserves the three evidence lanes", () => {
    expect(read("client/src/pages/Music.tsx")).toContain('href="/connected-statements-music-evidence"');
    const page = read("client/src/pages/ConnectedStatementsMusicEvidence.tsx");
    for (const label of ["Connected repository continuity", "Notification access boundary", "Music catalog and listening record", "/music-creator-release-readiness"]) expect(page).toContain(label);
  });

  it("keeps notifications, music operations, and external claims bounded", () => {
    const page = read("client/src/pages/ConnectedStatementsMusicEvidence.tsx");
    expect(page).toContain("The accessible GitHub notification endpoint returned an integration access restriction");
    expect(page).toContain("This route does not access private GitHub notifications, read email, modify a repository, upload music");
    expect(read("docs/phase766-connected-statements-music-evidence-review.md")).toContain("The authenticated notification API returned an access restriction");
  });
});
