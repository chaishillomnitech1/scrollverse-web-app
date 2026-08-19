import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/CreatorExchangeGovernanceReadiness.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");

describe("Phase 502 Creator Exchange Governance Readiness", () => {
  it("registers the dedicated local readiness route and its creator-exchange handoff", () => {
    expect(app).toContain('path="/creator-exchange-governance-readiness"');
    expect(page).toContain('href="/creator-exchange-navigator"');
  });

  it("keeps participation preparation local and explicitly fail-closed", () => {
    expect(page).toContain("LOCAL PARTICIPATION RECORD");
    expect(page).toContain("does not create a participant account, listing, contract, quote, payment, payout, custody position, wallet connection, token, mint, trade, transfer");
  });

  it("requires source, rights, accessibility, consent, and an exact action gate", () => {
    expect(page).toContain("Source and work record");
    expect(page).toContain("Participation and consent");
    expect(page).toContain("Accessibility or delivery note");
    expect(page).toContain("EXACT ACTION GATE");
  });
});
