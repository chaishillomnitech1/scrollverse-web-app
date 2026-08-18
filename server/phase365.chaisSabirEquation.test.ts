import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const equation = readFileSync(resolve(root, "client/src/pages/ChaisSabirEquation.tsx"), "utf8");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const synchronization = readFileSync(resolve(root, "client/src/pages/SynchronizationResearchIndex.tsx"), "utf8");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("Chais Sabir Equation and Pattern Study", () => {
  it("registers the study route and visible cross-portal paths", () => {
    expect(app).toContain('path={"/chais-sabir-equation"} component={ChaisSabirEquation}');
    expect(home).toContain('href: "/chais-sabir-equation"');
    expect(home).toContain('href: "/synchronization-research"');
    expect(synchronization).toContain('href="/chais-sabir-equation"');
  });

  it("preserves the owner-supplied record with reproducible method inputs", () => {
    for (const text of ["August 28, 1978", "7:00 PM", "Harlem, New York", "OWNER-STATED PROPHET SEAL & FREQUENCY CONTEXT", "KUN FAYAKŪN × ∞", "HEBREW GEMATRIA · BASE VALUES", "GREEK ISOPSEPHY · MILESIAN VALUES", "DECIMAL DIGITS · DIGITAL ROOT", "CELESTIAL-POSITION INPUT RECORD"]) expect(equation).toContain(text);
    expect(equation).toContain('useSovereignHeartbeat({ page: "chais-sabir-equation" })');
    expect(equation).toContain("PortalTrustLens");
  });

  it("keeps the legacy collection action fail-closed and browser-local", () => {
    expect(equation).toContain("LEGACY COLLECTION READINESS");
    expect(equation).toContain("Save browser-local readiness record");
    expect(equation).toContain("scrollverse-chais-sabir-legacy-readiness");
    expect(equation).toContain("does not mint, sell, price, list, connect a wallet, or start a transaction");
    expect(equation).toContain("requires owner release");
  });
});
