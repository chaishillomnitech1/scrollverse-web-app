import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 819 — Assistive Governance Desk presentation", () => {
  it("connects creator governance records to their dedicated external pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/AssistiveGovernanceDesk.tsx"), "utf8");
    expect(page).toContain("A local governance record with dedicated pathways");
    expect(page).not.toContain("A local governance record; not legal personhood");
  });
});
