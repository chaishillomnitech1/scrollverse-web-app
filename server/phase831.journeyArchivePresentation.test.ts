import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 831 — Journey Co-Creation Archive presentation", () => {
  it("centers collaboration history, source attribution, and dedicated records", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/JourneyCoCreationArchive.tsx"), "utf8");
    expect(page).toContain("can join the archive through an approved accessible record");
    expect(page).toContain("dedicated dialogue record");
    expect(page).toContain("remain visible beside the supplied system wording");
    expect(page).toContain("continue through their appropriate record and review pathway");
    expect(page).not.toContain("This lane does not establish database access");
  });
});
