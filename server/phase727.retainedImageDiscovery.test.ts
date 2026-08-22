import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 727 — Retained Image Intake Discovery Synchronization", () => {
  it("adds the retained-image intake to the expanded 26-route Power Index as research evidence", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(index).toContain("POWER-26");
    expect(index).toContain("Retained Image Intake");
    expect(index).toContain("/retained-image-intake");
    expect(index).toContain("26 CONNECTED POWER ROUTES");
  });

  it("adds the route to the Route Integrity Index and aligns visible creator-visual metadata count", () => {
    const routes = read("client/src/pages/RouteIntegrityIndex.tsx");
    const home = read("client/src/pages/Home.tsx");
    expect(routes).toContain('path: "/retained-image-intake"');
    expect(routes).toContain("strict financial and external-claim boundaries");
    expect(home).toContain("11 protected visual metadata records");
  });
});
