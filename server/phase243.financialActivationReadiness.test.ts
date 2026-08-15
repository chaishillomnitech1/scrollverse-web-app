import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
describe("Phase 243 — financial activation readiness", () => {
  const page = read("client/src/pages/FinancialActivationReadiness.tsx"); const app = read("client/src/App.tsx"); const home = read("client/src/pages/Home.tsx");
  it("registers a current-state financial activation map", () => { expect(app).toContain('Route path="/financial-activation-readiness"'); expect(home).toContain('href: "/financial-activation-readiness"'); expect(page).toContain("Financial functions must be real before they are called live."); });
  it("separates test commerce from card issuance, payouts, wallets, custody, and exchanges", () => { ["Sandbox / test", "Sovereign Card interface", "Creator payouts", "Wallets, token, and collectible records", "Banking, custody, lending, and exchange"].forEach((text) => expect(page).toContain(text)); });
  it("keeps all payment and transaction functions fail-closed from the readiness route", () => { expect(page).toContain("does not accept a payment, issue a card, open an account"); expect(page).toContain("does not accept a payment"); expect(page).toContain("Stripe test-versus-live"); });

  it("aligns the Sovereign Card surface with its actual program-readiness state", () => {
    const card = read("client/src/pages/SovereignCard.tsx");
    expect(card).toContain("PROGRAM READINESS");
    expect(card).toContain("NO CARD ISSUANCE");
    expect(card).toContain("No application, payment, account opening, card issuance");
    expect(card).toContain('href="/financial-activation-readiness"');
    expect(card).not.toContain("◉ LIVE ·");
  });
});
