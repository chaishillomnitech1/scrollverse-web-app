import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("Phase 703 — Homepage Archive Cross-Promotion", () => {
  it("links the Empire Power Index and the two new protected-source records from the archive rail", () => {
    const home = readFileSync(resolve(__dirname, "../client/src/pages/Home.tsx"), "utf-8");
    expect(home).toContain("/empire-power-index");
    expect(home).toContain("/protected-visual-intake");
    expect(home).toContain("/supplied-public-references");
  });

  it("retains operating-state labels for each new archive handoff", () => {
    const home = readFileSync(resolve(__dirname, "../client/src/pages/Home.tsx"), "utf-8");
    expect(home).toContain("Empire Power Index");
    expect(home).toContain("Visual Accession");
    expect(home).toContain("Public References");
    expect(home).toContain("state: \"research\"");
  });
});
