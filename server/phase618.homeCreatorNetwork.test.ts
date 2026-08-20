import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 618 homepage Creator Network handoff", () => {
  const home = fs.readFileSync(path.resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("includes Creator Network in the visitor discovery rail", () => {
    expect(home).toContain('title: "Creator Network"');
    expect(home).toContain('href: "/creator-network"');
    expect(home).toContain('kicker: "CROSS-PROMOTION"');
  });
});
