import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const delivery = fs.readFileSync(path.join(root, "client/src/pages/DeliveryResilience.tsx"), "utf8");
const audit = fs.readFileSync(path.join(root, "client/src/pages/CapabilityAudit.tsx"), "utf8");
const intake = fs.readFileSync(path.join(root, "client/src/pages/MasterInstructionIntake.tsx"), "utf8");

describe("Phase 469 — Public Delivery-State Reconciliation", () => {
  it("presents managed recovery and public-route availability as the current delivery state", () => {
    expect(delivery).toContain("MANAGED RECOVERY VERIFIED · PUBLIC ROUTES AVAILABLE");
    expect(delivery).toContain("Managed recovery completed; public routes are verified.");
    expect(delivery).toContain("Checkpoint `6a62b4c2` reconciled the historic publisher-visible divergence");
    expect(delivery).toContain("Recovery checkpoint `86b83d2d` restored the managed deployment path");
  });

  it("retains the former conflict only as historic incident evidence", () => {
    expect(delivery).toContain("historic conflict is retained as incident evidence");
    expect(audit).toContain('"Historic incident"');
    expect(audit).toContain("Managed recovery and public delivery verified");
    expect(intake).toContain("former conflict remains an incident record, not the active state");
  });

  it("keeps external provider and financial boundaries distinct from portal delivery verification", () => {
    expect(delivery).toContain("does not claim provider-side commerce, account configuration, payment, trade, rights clearance");
    expect(delivery).not.toContain("LOCAL RECORD · MANAGED DELIVERY PENDING");
    expect(delivery).not.toContain("managed checkpoint is blocked by a publisher-visible merge conflict");
  });
});
