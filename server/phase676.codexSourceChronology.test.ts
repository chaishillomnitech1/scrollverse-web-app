import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 676 Codex Source Chronology", () => {
  it("records the confirmed PR #213 documentation merge with its implementation boundary", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/CodexSourceChronology.tsx"), "utf8");
    expect(page).toContain("393ca29a5be316669ff25d3b8b6f124354504c8a");
    expect(page).toContain("35 / 46 passed");
    expect(page).toContain("does not complete the four proposed fixes");
  });

  it("preserves the shared ChatGPT record as a visible outline rather than an account export", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/CodexSourceChronology.tsx"), "utf8");
    expect(page).toContain("6a33a5db-d004-83ea-b787-62f71dd0f7ff");
    expect(page).toContain("ScrollVerse Chat Codex");
    expect(page).toContain("not an account export or complete transcript");
  });

  it("registers the chronology as a first-class portal route", () => {
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(app).toContain('path="/codex-source-chronology"');
    expect(app).toContain("CodexSourceChronology");
  });
});
