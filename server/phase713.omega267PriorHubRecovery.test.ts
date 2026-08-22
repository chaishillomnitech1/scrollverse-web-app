import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 713 — Ω.267 Prior-Hub Recovery", () => {
  it("preserves the supplied checkpoint reference without recreating unseen hub content", () => {
    const page = read("client/src/pages/Omega267PriorHubRecoveryGate.tsx");
    expect(page).toContain("385d5e79");
    expect(page).toContain("directSourcePresentInActiveWorkspace: false");
    expect(page).toContain("does not recreate an unseen hub");
    expect(page).toContain("source reattachment required");
  });

  it("registers the recovery route and cross-promotes it from the Empire Power Index", () => {
    const app = read("client/src/App.tsx");
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(app).toContain('path="/omega-267-prior-hub-recovery"');
    expect(index).toContain("POWER-22");
    expect(index).toContain("Ω.267 Prior-Hub Recovery");
    expect(index).toContain("30 CONNECTED POWER ROUTES");
  });

  it("keeps direct handoffs to the source registry and chronology", () => {
    const page = read("client/src/pages/Omega267PriorHubRecoveryGate.tsx");
    expect(page).toContain("/connected-source-registry");
    expect(page).toContain("/codex-source-chronology");
    expect(page).toContain("/empire-power-index");
  });
});
