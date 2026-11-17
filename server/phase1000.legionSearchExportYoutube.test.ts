import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const legionPath = resolve(import.meta.dirname, "../client/src/pages/AILegionApex.tsx");
const homePath = resolve(import.meta.dirname, "../client/src/pages/Home.tsx");
const skillPath = resolve(import.meta.dirname, "../../skills/scrollverse-source-led-portfolio/SKILL.md");

describe("Phase 1000 Legion search, export, and YouTube sync", () => {
  it("provides an accessible Agent 25 search and export flow", () => {
    const source = readFileSync(legionPath, "utf8");
    expect(source).toContain("Search the 25-record convergence vault");
    expect(source).toContain("Export filtered vault summary");
    expect(source).toContain("aria-label=\"Export filtered vault summary\"");
    expect(source).toContain("aria-live=\"polite\"");
    expect(source).toContain("LEGION_CONVERGENCE_RECORDS.filter");
  });

  it("gives convergence records keyboard-visible hover feedback", () => {
    const source = readFileSync(legionPath, "utf8");
    expect(source).toContain("hover:border-[#00FF88]/60");
    expect(source).toContain("focus-visible:outline");
    expect(source).toContain("aria-label={`Local Legion record");
  });

  it("keeps the homepage YouTube references synchronized and visitor-directed", () => {
    const source = readFileSync(homePath, "utf8");
    expect(source).toContain("SYNCHRONIZATION_MEDIA_REFERENCES.map");
    expect(source).toContain("YouTube synchronization rail");
    expect(source).toContain("Source-labeled · visitor chooses the player");
  });

  it("documents the reusable pattern", () => {
    const source = readFileSync(skillPath, "utf8");
    expect(source).toContain("Legion convergence");
    expect(source).toContain("browser-local text export");
    expect(source).toContain("synchronized YouTube reference rail");
  });
});
