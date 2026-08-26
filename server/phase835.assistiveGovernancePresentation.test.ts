import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 835 — Assistive Governance public presentation", () => {
  it("leads with accountable source context and dedicated action records", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/AssistiveGovernanceDesk.tsx"), "utf8");
    expect(page).toContain("dedicated external record when specifically established");
    expect(page).toContain("appropriate accountable record");
    expect(page).toContain("appropriate independent record");
    expect(page).toContain("dedicated accountable pathway");
    expect(page).toContain("No page interaction signs a document, moves money");
    expect(page).not.toContain("It does not establish external legal, banking");
  });
});
