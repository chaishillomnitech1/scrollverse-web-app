import fs from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => fs.readFileSync(path, "utf8");
const page = read("client/src/pages/ApexDigitalIntelligenceResearch.tsx");

describe("Phase 768 — Apex Digital Intelligence Research and Discovery", () => {
  it("registers the browser-local research route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import ApexDigitalIntelligenceResearch from "./pages/ApexDigitalIntelligenceResearch"');
    expect(app).toContain('path="/apex-digital-intelligence-research" component={ApexDigitalIntelligenceResearch}');
  });

  it("preserves authoritative sources and five study tracks", () => {
    expect(page).toContain("NIST AI Risk Management Framework");
    expect(page).toContain("OECD AI Principles");
    expect(page).toContain("Evidence-grounded intelligence");
    expect(page).toContain("Agent workflow design");
    expect(page).toContain("Evaluation and measurement");
    expect(page).toContain("Human-centered applied design");
    expect(page).toContain("Creative systems research");
  });

  it("keeps all research outputs browser-local and external action bounded", () => {
    expect(page).toContain("does not deploy an agent");
    expect(page).toContain("Copy local study prompt");
    expect(page).toContain("/game-systems-research-blueprint");
    expect(page).toContain("/connected-source-registry");
    expect(page).toContain("/digital-mirror-twin");
    expect(page).toContain("/portfolio-evidence-hub");
    expect(read("client/src/pages/GameSystemsResearchBlueprint.tsx")).toContain('href="/apex-digital-intelligence-research"');
  });
});
