import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 754 — polished financial and business presentation", () => {
  it("uses business-ready language and explicit operating-state labels on the commerce board", () => {
    const page = read("client/src/pages/CommerceFinancialReadinessBoard.tsx");
    expect(page).toContain("Clear state. Clear owner. Clear next step.");
    expect(page).toContain("Available now");
    expect(page).toContain("In readiness");
    expect(page).toContain("Requires verified activation");
    expect(page).toContain("No live listing, purchase, checkout, payment, payout, exchange, wallet connection, transfer, or financial claim is activated here.");
  });

  it("presents OMNIEX as market exploration and exchange readiness rather than an active venue", () => {
    const page = read("client/src/pages/Exchange.tsx");
    expect(page).toContain("MARKET INTELLIGENCE & EXCHANGE READINESS");
    expect(page).toContain("Research is useful. Operating claims are earned.");
    expect(page).toContain("not an exchange, broker, custodian, money transmitter, investment adviser");
    expect(page).not.toContain("Start Trading");
    expect(page).not.toContain("STRONG BUY");
  });

  it("retains the evidence-led Sovereign Bank readiness route", () => {
    const page = read("client/src/pages/SovereignBank.tsx");
    expect(page).toContain("Build a financial institution that earns trust through");
    expect(page).toContain("Not yet a chartered bank");
  });
});
