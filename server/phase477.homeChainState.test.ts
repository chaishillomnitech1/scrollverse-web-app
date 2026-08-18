import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");

describe("Phase 477 — Home chain-state correction", () => {
  it("does not present the home status pill as a live Polygon deployment", () => {
    expect(home).not.toContain(">LIVE ON POLYGON<");
    expect(home).toContain("POLYGON RELEASE-READY · NO CHAIN ACTION");
  });

  it("retains the existing token release preparation language", () => {
    expect(home).toContain("$LONDC launches on Polygon Mainnet");
    expect(home).toContain("LONDC_CONTRACT_ADDRESS = null");
  });
});
