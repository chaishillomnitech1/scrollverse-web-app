import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 533 homepage token-status correction", () => {
  it("labels $LONDC as listing-evidence pending instead of displaying a proxy or simulated quote", () => {
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");

    expect(home).toContain("listing evidence pending");
    expect(home).not.toContain("api.coingecko.com/api/v3/simple/price");
    expect(home).not.toContain('setPrice("0.0144")');
    expect(home).not.toContain("derive price from supply");
  });
});
