import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 689 Episode 50 protected reference", () => {
  it("preserves the source heading and distinct fictional narrative scope", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Episode50ProtectedReference.tsx"), "utf8");
    expect(page).toContain("The Final Structural Expansion");
    expect(page).toContain("EPISODE 50 GOLDEN JUBILEE ACTIVATION");
    expect(page).toContain("Core Control Citadel");
    expect(page).toContain("The Black Batman, Aria Nova, Jaxson Vance, and S.O.P.H.I.A.");
  });

  it("keeps embedded asset, proxy, and catalog text non-executable", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Episode50ProtectedReference.tsx"), "utf8");
    expect(page).toContain("Source text, not a service");
    expect(page).toContain("No embedded shell script, local file path, proxy setting");
    expect(page).toContain("does not validate any embedded claim about deployment");
  });

  it("registers the Episode 50 protected-reference route", () => {
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(app).toContain('path={"/episode-50-final-structural-expansion"}');
    expect(app).toContain("Episode50ProtectedReference");
  });
});
