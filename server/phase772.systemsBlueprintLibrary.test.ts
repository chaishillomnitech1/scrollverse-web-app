import fs from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => fs.readFileSync(path, "utf8");
const page = read("client/src/pages/SystemsBlueprintLibrary.tsx");

describe("Phase 772 — Systems Blueprint Library", () => {
  it("registers the browser-local blueprint library route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import SystemsBlueprintLibrary from "./pages/SystemsBlueprintLibrary"');
    expect(app).toContain('path="/systems-blueprint-library" component={SystemsBlueprintLibrary}');
  });
  it("preserves five source-led study cards and public foundations", () => {
    for (const title of ["Purpose and affected participants", "Evidence and provenance", "Interoperability boundary", "Evaluation and review", "Reversible release"]) expect(page).toContain(title);
    expect(page).toContain("NIST AI Risk Management Framework");
    expect(page).toContain("W3C AI Agent Protocol Community Group");
    expect(page).toContain("OECD AI Principles");
  });
  it("keeps system comparison browser-local and external implementation bounded", () => {
    expect(page).toContain("does not implement a protocol, deploy an agent");
    expect(page).toContain("does not state that ScrollVerse implements, exceeds, controls, replaces, or interoperates");
    expect(page).toContain("Copy local blueprint card");
    for (const route of ["/apex-digital-intelligence-research", "/game-worlds-studio", "/portfolio-evidence-hub", "/external-action-governance-study"]) expect(page).toContain(route);
  });
});
