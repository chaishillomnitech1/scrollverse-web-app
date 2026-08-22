import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 759 — Transmissions and Source Convergence Register", () => {
  it("registers the convergence route and exposes it from the connected source registry", () => {
    expect(read("client/src/App.tsx")).toContain('path="/transmissions-source-convergence" component={TransmissionsSourceConvergence}');
    const registry = read("client/src/pages/ConnectedSourceRegistry.tsx");
    expect(registry).toContain("SRC-021");
    expect(registry).toContain('localHref: "/transmissions-source-convergence"');
  });

  it("maps all three protected records to their browser-local handoffs", () => {
    const page = read("client/src/pages/TransmissionsSourceConvergence.tsx");
    for (const title of ["Financial Continuum", "Multi-Vector Intake", "Global Orbital Matrix"]) expect(page).toContain(title);
    for (const route of ["/capital-readiness", "/media-release-concept-board", "/commerce-financial-readiness-board", "/original-media-readiness", "/future-infrastructure-blueprint", "/game-worlds-studio"]) expect(page).toContain(route);
  });

  it("retains the explicit non-execution boundary", () => {
    const page = read("client/src/pages/TransmissionsSourceConvergence.tsx");
    expect(page).toContain("The register does not execute embedded code, validate operational assertions, access accounts, configure services, publish media, create contracts, activate commerce, connect providers, or initiate financial, network, or infrastructure actions.");
  });
});
