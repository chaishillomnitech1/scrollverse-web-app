import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("Phase 261 — Quantum & Frequency Research Lab", () => {
  it("registers the source-labeled lab and exposes it from Home", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(app).toContain('path="/quantum-frequency-research-lab"');
    expect(home).toContain('href: "/quantum-frequency-research-lab"');
  });
  it("separates documented science, reproducible signals, and cultural geography from active hardware claims", () => {
    const page = read("client/src/pages/QuantumFrequencyResearchLab.tsx");
    expect(page).toContain("Documented science");
    expect(page).toContain("Reproducible measurement");
    expect(page).toContain("Interpretive research");
    expect(page).toContain("does not control hardware, collect biometrics");
    expect(page).toContain("browser session");
  });
});
