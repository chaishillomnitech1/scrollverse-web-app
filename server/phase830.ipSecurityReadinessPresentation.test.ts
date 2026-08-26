import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 830 — IP Security Readiness presentation", () => {
  it("connects creator readiness sources to their dedicated review pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/IPSecurityReadiness.tsx"), "utf8");
    expect(page).toContain("each contribute their own source field and review path");
    expect(page).toContain("official search and review records");
    expect(page).toContain("Keep confidential material in protected records");
    expect(page).toContain("Next pathway: This packet prepares source context");
    expect(page).not.toContain("Boundary: This packet does not file a copyright");
  });
});
