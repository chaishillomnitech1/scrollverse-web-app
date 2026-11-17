import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pagePath = resolve(import.meta.dirname, "../client/src/pages/AILegionApex.tsx");

describe("Phase 999 Agent 25 convergence panel", () => {
  it("surfaces the source-labeled Legion 24 to 25 convergence record", () => {
    const source = readFileSync(pagePath, "utf8");
    expect(source).toContain("AGENT 25 · PERPETUAL ARCH");
    expect(source).toContain("BLOCK 176 LEGION 24 → CONVERGENCE MASTER VAULT");
    expect(source).toContain("25 registry records");
  });

  it("keeps the presentation browser-local and metadata-only", () => {
    const source = readFileSync(pagePath, "utf8");
    expect(source).toContain("Browser-local registry");
    expect(source).toContain("No external agent, repository, wallet, or account action is performed");
  });
});
