import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const page = readFileSync(resolve(root, "client/src/pages/IPSecurityReadiness.tsx"), "utf8");
const record = readFileSync(resolve(root, "docs/phase497-ip-and-digital-security-readiness.md"), "utf8");

describe("Phase 497 — IP and digital-security readiness", () => {
  it("registers the IP and security route and preserves the evidence navigator alias", () => {
    expect(router).toContain('path="/ip-security-readiness"');
    expect(router).toContain("IPSecurityReadiness");
    expect(router).toContain('path="/ip-digital-evidence"');
    expect(page).toContain('useSovereignHeartbeat({ page: "ip-security-readiness" })');
  });

  it("covers creative, brand, invention, confidential-information, likeness, and security-control readiness fields", () => {
    for (const lane of ["Creative work", "Name, logo, or brand identifier", "Invention or technical method", "Confidential method or business information", "Name, portrait, voice, or likeness"]) expect(page).toContain(lane);
    for (const control of ["Secret isolation", "Access and role control", "Encryption in transit", "Encryption at rest", "Audit and correction record", "Recovery and rotation"]) expect(page).toContain(control);
    expect(record).toContain("U.S. Copyright Office");
    expect(record).toContain("Cybersecurity Framework");
  });

  it("routes filings, rights conclusions, secret transfer, configurations, tokens, wallets, and provider changes through dedicated readiness pathways", () => {
    expect(page).toContain("Next pathway: This packet prepares source context");
    expect(page).toContain("does not give legal advice, file a registration, determine rights or clearance, store a secret");
    expect(page).toContain("not a statement that a control is configured, tested, certified, “military-grade,”");
    expect(record).toContain("does not file a copyright, trademark, patent, or any other registration");
    expect(record).toContain("require a specific asset, jurisdiction, record, destination, consequence, and exact current owner confirmation");
  });
});
