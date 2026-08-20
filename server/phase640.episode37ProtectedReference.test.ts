import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const page = readFileSync(resolve(process.cwd(), "client/src/pages/Episode37LedgerSync.tsx"), "utf8");
const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");

describe("Phase 640 — Episode 37 Protected Reference", () => {
  it("preserves the narrative, schema, edge, and royalty source components", () => {
    expect(page).toContain("The Immutable Ledger Sync");
    expect(page).toContain("Schema Validator Pattern");
    expect(page).toContain("Environment-Specific Security Review");
    expect(page).toContain("Exact-Record Ledger Readiness");
  });

  it("keeps unverified runtime, blockchain, and deployment assertions out of active state", () => {
    expect(page).toContain("No server deployment, Nginx change, chain listener, wallet connection, transfer, or automated process is active");
    expect(page).toContain("not deployed, verified, editable, or active");
    expect(page).toContain("No RPC listener, blockchain event loop, wallet, token, transfer, contract");
  });

  it("registers the browser-local Episode 37 route", () => {
    expect(app).toContain('path={"/episode-37-ledger-sync"}');
    expect(app).toContain("Episode37LedgerSync");
  });
});
