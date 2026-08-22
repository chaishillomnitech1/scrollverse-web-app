import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 730 — Generic Retained-Image Discovery Synchronization", () => {
  it("adds the generic retained-image route to the 27-route Power Index as research evidence", () => {
    const index = read("client/src/pages/EmpirePowerIndex.tsx");
    expect(index).toContain("POWER-27");
    expect(index).toContain("Generic Retained Image Intake");
    expect(index).toContain("/generic-retained-image-intake");
    expect(index).toContain("27 CONNECTED POWER ROUTES");
  });

  it("adds direct path recovery through the Route Integrity Index", () => {
    const routes = read("client/src/pages/RouteIntegrityIndex.tsx");
    expect(routes).toContain('path: "/generic-retained-image-intake"');
    expect(routes).toContain("confirmed byte-identical pair");
    expect(routes).toContain('state: "research", group: "Evidence"');
  });
});
