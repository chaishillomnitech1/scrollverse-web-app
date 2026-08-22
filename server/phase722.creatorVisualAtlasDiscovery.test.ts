import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 722 — Creator-Visual Atlas Index Synchronization", () => {
  it("adds the atlas to the 25-route Empire Power Index as research evidence", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(index).toContain("POWER-25");
    expect(index).toContain("Creator Visual Intake Atlas");
    expect(index).toContain("/creator-visual-intake-atlas");
    expect(index).toContain("26 CONNECTED POWER ROUTES");
  });

  it("adds the atlas to the Route Integrity Index as a research evidence route", () => {
    const index = read("client/src/pages/RouteIntegrityIndex.tsx");
    expect(index).toContain('path: "/creator-visual-intake-atlas"');
    expect(index).toContain("Unified browser-local map of eleven protected creator-visual metadata records");
    expect(index).toContain('state: "research", group: "Evidence"');
  });
});
