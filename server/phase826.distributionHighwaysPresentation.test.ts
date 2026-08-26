import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 826 — Distribution Highways Map presentation", () => {
  it("centers creator distribution context and dedicated destination pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/DistributionHighwaysMap.tsx"), "utf8");
    expect(page).toContain("dedicated destination pathways");
    expect(page).toContain("SOURCE CONTEXT &amp; NEXT PATH");
    expect(page).not.toContain("A visible public route does not establish a partnership");
  });
});
