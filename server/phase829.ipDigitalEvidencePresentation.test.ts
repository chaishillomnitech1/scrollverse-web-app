import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 829 — IP Digital Evidence Navigator presentation", () => {
  it("organizes source context and dedicated qualified-review pathways in its copied planning record", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/IpDigitalEvidenceNavigator.tsx"), "utf8");
    expect(page).toContain("BROWSER-LOCAL SOURCE RECORD");
    expect(page).toContain("Source context and next review question");
    expect(page).toContain("Record pathway: This draft organizes evidence category");
    expect(page).toContain("appropriate official or qualified-review record");
    expect(page).not.toContain("Record rule: This draft identifies evidence category and next review.");
  });
});
