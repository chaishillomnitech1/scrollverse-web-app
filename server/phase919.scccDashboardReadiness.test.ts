import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..");
const read = (file: string) => readFileSync(path.resolve(root, file), "utf8");

describe("Phase 919 — SCCC dashboard readiness language", () => {
  it("labels SCCC values as read-only source-backed status instead of unqualified live claims", () => {
    const dashboard = read("client/src/pages/Dashboard.tsx");
    const globalDashboard = read("client/src/pages/GlobalDashboard.tsx");

    expect(dashboard).toContain("SCCC DATA STATUS · READ-ONLY");
    expect(dashboard).toContain("No wallet, token, payment, contract, or release action occurs through this dashboard.");
    expect(dashboard).toContain("PUBLIC RPC LOOKUP · READ-ONLY");
    expect(dashboard).toContain("SOURCE REFERENCES · READ-ONLY");
    expect(dashboard).not.toContain("SOVEREIGN TREASURY · POLYGON MAINNET · LIVE");
    expect(dashboard).not.toContain("ECOSYSTEM ASSETS LIVE ON IPFS · POLYGON MAINNET");

    expect(globalDashboard).toContain("DATABASE SNAPSHOT · READ-ONLY");
    expect(globalDashboard).toContain("No wallet, token, payment, contract, or release action occurs through this dashboard.");
    expect(globalDashboard).not.toContain("Live empire metrics");
  });
});
