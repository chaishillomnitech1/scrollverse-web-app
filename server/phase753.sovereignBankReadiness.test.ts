import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = () => fs.readFileSync(path.join(root, "client/src/pages/SovereignBank.tsx"), "utf8");

describe("Phase 753 · Sovereign Bank charter and readiness blueprint", () => {
  it("replaces self-approval and yield-product language with bank-grade readiness milestones", () => {
    const source = page();
    expect(source).toContain("Build a financial institution that earns trust through");
    expect(source).toContain("Charter and accountable governance");
    expect(source).toContain("Business plan and capital readiness");
    expect(source).toContain("Risk, AML, consumer, and control program");
    expect(source).not.toContain("SELF-APPROVED");
    expect(source).not.toContain("SOVEREIGN YIELD CALCULATOR");
  });

  it("keeps regulated financial capabilities behind explicit evidence and owner-controlled gates", () => {
    const source = page();
    expect(source).toContain("Not yet a chartered bank");
    expect(source).toContain("No customer accounts, deposits, custody, payments, loans, yield products");
    expect(source).toContain("Deposit insurance may be represented only for deposits at an FDIC-insured bank");
    expect(source).toContain("No wallet, custody, payment, account, ledger, transaction, or provider connection");
  });

  it("links primary regulatory sources and preserves the existing sovereign-bank route", () => {
    const source = page();
    const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
    expect(source).toContain("Applications for Deposit Insurance");
    expect(source).toContain("Comptroller’s Licensing Manual");
    expect(source).toContain("Bank Holding Company Filings");
    expect(source).toContain("BSA/AML Examination Manual");
    expect(app).toContain('path={"/sovereign-bank"} component={SovereignBank}');
  });
});
