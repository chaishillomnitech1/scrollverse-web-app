import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "client/src/pages/SynchronizationResearchIndex.tsx"), "utf8");

describe("Hill family remembrance and pattern research", () => {
  it("presents the owner-supplied family chronology as a source record", () => {
    expect(page).toContain("HILL FAMILY REMEMBRANCE · SOURCE RECORD");
    expect(page).toContain("Marie Angela Hill");
    expect(page).toContain("August 18, 2002");
    expect(page).toContain("August 28, 1978 · 7:00 PM");
  });
  it("links independent learning paths for gematria, mathematics, physics, philosophy, and methods", () => {
    for (const lane of ["Gematria", "Mathematics", "Physics", "Philosophy", "Methods"]) expect(page).toContain(`lane: "${lane}"`);
    expect(page).toContain("www.britannica.com/topic/gematria");
    expect(page).toContain("www.nist.gov/si-redefinition/second-introduction");
    expect(page).toContain("www.nationalacademies.org/read/25303/chapter/10");
  });
});
