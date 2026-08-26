import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const pagePath = path.resolve(process.cwd(), "client/src/pages/EvidenceStandards.tsx");

describe("Phase 808 — Evidence Standards public presentation", () => {
  it("centers source quality, creator context, and reader pathways", () => {
    const page = fs.readFileSync(pagePath, "utf8");

    expect(page).toContain("Evidence in context.");
    expect(page).toContain("Creator record in view.");
    expect(page).toContain("SCROLLVERSE RECORD");
    expect(page).toContain("SOURCE CONTEXT &amp; NEXT PATH");
    expect(page).toContain("Imagination shares space with evidence.");
    expect(page).not.toContain("WHAT THIS IS NOT");
  });
});
