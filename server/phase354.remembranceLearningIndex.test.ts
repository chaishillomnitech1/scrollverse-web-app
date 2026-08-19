import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 354 remembrance and learning research index", () => {
  it("keeps first-party remembrance, source-labeled learning, privacy boundaries, and related route handoffs visible", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/SynchronizationResearchIndex.tsx"), "utf8");
    expect(page).toContain("HILL FAMILY REMEMBRANCE · SOURCE RECORD");
    expect(page).toContain("visual source remains part of the private intake record");
    expect(page).toContain("PATTERN, MEANING, AND METHODS LIBRARY");
    expect(page).toContain("Historical textual interpretation");
    expect(page).toContain('href="/harlem-vineland-legacy"');
    expect(page).toContain('href="/chosen-ones-exchange"');
  });
});
