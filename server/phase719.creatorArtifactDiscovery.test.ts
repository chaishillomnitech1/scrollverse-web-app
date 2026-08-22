import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 719 — Creator-Artifact Discovery Synchronization", () => {
  it("adds the artifact intake to the expanded Empire Power Index as research evidence", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(index).toContain("POWER-24");
    expect(index).toContain("Creator-Artifact Intake");
    expect(index).toContain("/creator-artifact-intake");
    expect(index).toContain("30 CONNECTED POWER ROUTES");
  });

  it("adds the artifact intake to the Route Integrity Index as a research evidence route", () => {
    const index = read("client/src/pages/RouteIntegrityIndex.tsx");
    expect(index).toContain('path: "/creator-artifact-intake"');
    expect(index).toContain("Five protected badge, variant-set, and sculptural-bust source records");
    expect(index).toContain('state: "research", group: "Evidence"');
  });
});
