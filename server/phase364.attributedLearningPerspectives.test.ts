import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 364 attributed learning perspectives", () => {
  it("keeps first-party family context private-aware and public source perspectives distinct from portal conclusions", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/SynchronizationResearchIndex.tsx"), "utf8");
    expect(page).toContain("FAMILY_REMEMBRANCE");
    expect(page).toContain("visual source remains part of the private intake record");
    expect(page).toContain("SUPPLIED SOURCE EXPANSION · READER-DIRECTED");
    expect(page).toContain("SOURCE-STATED; INDEPENDENTLY UNRESOLVED");
    expect(page).toContain("ALTERNATIVE-PERSPECTIVE SOURCE EXPANSION");
    expect(page).toContain("SOURCE-PRESENTED; INDEPENDENTLY UNRESOLVED");
  });
});
