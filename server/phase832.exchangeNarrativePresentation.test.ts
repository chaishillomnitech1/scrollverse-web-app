import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 832 — Exchange Narrative presentation", () => {
  it("centers source context and dedicated owner-approved pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Episode38ExchangeMatrix.tsx"), "utf8");
    expect(page).toContain("Exchange matrix. Source context. Dedicated pathways.");
    expect(page).toContain("dedicated provider, owner, and release records");
    expect(page).toContain("SIGNAL CONTEXT");
    expect(page).toContain("dedicated owner-approved pathway");
  });
});
