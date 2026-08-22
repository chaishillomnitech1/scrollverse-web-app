import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 717 — Creator-Sticker Discovery Synchronization", () => {
  it("adds the intake record to the expanded Empire Power Index as research evidence", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(index).toContain("POWER-23");
    expect(index).toContain("Creator-Sticker Intake");
    expect(index).toContain("/creator-sticker-intake");
    expect(index).toContain("31 CONNECTED POWER ROUTES");
  });

  it("adds the intake record to the Route Integrity Index as a research evidence route", () => {
    const index = read("client/src/pages/RouteIntegrityIndex.tsx");
    expect(index).toContain('path: "/creator-sticker-intake"');
    expect(index).toContain("Five protected visual source records");
    expect(index).toContain('state: "research", group: "Evidence"');
  });
});
