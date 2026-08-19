import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 3290 creator-directed presentation", () => {
  it("keeps the accomplishments archive creator-authored while preserving visitor choice", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/AccomplishmentsArchive.tsx"), "utf8");
    expect(page).toContain("The creator presents; visitors choose their path");
    expect(page).toContain("creator-authored knowledge");
    expect(page).toContain("does not redefine the creator’s record or operating state");
  });
});
