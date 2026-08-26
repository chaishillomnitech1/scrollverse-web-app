import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 820 — Brand Identity Record presentation", () => {
  it("centers creator identity context and dedicated release pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/BrandIdentityRecord.tsx"), "utf8");
    expect(page).toContain("This record keeps the creator identity, mark, mascot, and source trail visible.");
    expect(page).toContain("DEDICATED RELEASE PATH");
    expect(page).not.toContain("EXACT RELEASE GATE");
  });
});
