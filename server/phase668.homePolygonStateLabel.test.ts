import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 668 homepage Polygon state label", () => {
  it("uses a source-led reference label rather than a stale release-ready claim", () => {
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("POLYGON REFERENCE · NO CHAIN ACTION");
    expect(home).not.toContain("POLYGON RELEASE-READY · NO CHAIN ACTION");
  });
});
