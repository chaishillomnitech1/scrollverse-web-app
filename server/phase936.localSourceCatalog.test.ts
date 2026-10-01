import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const catalogPath = "docs/phase936-local-source-catalog.md";

describe("Phase 936 — local historical source catalog", () => {
  it("indexes supplied source records and preserves non-operative boundaries", () => {
    expect(existsSync(catalogPath)).toBe(true);
    const catalog = readFileSync(catalogPath, "utf8");
    expect(catalog).toContain("Local Historical Source Catalog");
    expect(catalog).toContain("phase923-new-creator-source-receipt.md");
    expect(catalog).toContain("phase934-mobile-store-readiness-record.md");
    expect(catalog).toContain("phase935-scrollcmd-source-receipt.md");
    expect(catalog).toContain("scrollcmd-dkhxx9gf.manus.space");
    expect(catalog).toContain("manus.im/app");
    expect(catalog).toContain("No external material was opened");
    expect(catalog).toContain("No publication, deployment, account, wallet, token, contract, payment, store, or repository action");
  });
});
