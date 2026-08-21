import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
const index = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/RouteIntegrityIndex.tsx"), "utf8");

describe("Phase 673 campaign discovery handoffs", () => {
  it("adds the Campaign Activation Center to homepage discovery", () => {
    expect(home).toContain('title: "Campaign Activation Center"');
    expect(home).toContain('href: "/campaign-activation-center"');
  });

  it("adds the Campaign Activation Center to the route recovery index", () => {
    expect(index).toContain('path: "/campaign-activation-center"');
    expect(index).toContain("First-party campaign briefs and browser-local Story or Event planning.");
  });
});
