import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const quote = "Influence is currency. Power without principle is poison.";

describe("Phase 373 — Principle and Currency ethical anchor", () => {
  it("places the corrected owner-authored quote on the primary home journey", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain(quote);
    expect(home).toContain("OWNER-AUTHORED · ETHICAL ANCHOR");
  });

  it("places the quote on direct-to-fan and contribution exchange pathways", () => {
    const catalog = read("client/src/pages/DirectFanCatalog.tsx");
    const exchange = read("client/src/pages/SovereignContributionExchange.tsx");
    expect(catalog).toContain(quote);
    expect(catalog).toContain("DIRECT-TO-FAN ETHICAL ANCHOR");
    expect(exchange).toContain(quote);
    expect(exchange).toContain("CONTRIBUTION ETHICAL ANCHOR");
  });

  it("does not retain the earlier uncorrected draft wording", () => {
    const sources = ["client/src/pages/Home.tsx", "client/src/pages/DirectFanCatalog.tsx", "client/src/pages/SovereignContributionExchange.tsx", "docs/phase373-principle-currency-ethical-anchor.md"].map(read).join("\n");
    expect(sources).not.toContain("Influence in currency power without principle is poison.");
  });
});
