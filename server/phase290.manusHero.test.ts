import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const hero = fs.readFileSync(path.join(root, "client/src/pages/ManusHero.tsx"), "utf8");
const ships = fs.readFileSync(path.join(root, "client/src/pages/DigitalShips.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");

describe("Phase 290 — Manus Hero Story Universe", () => {
  it("registers an original, browser-local story-world route with release and youth boundaries", () => {
    expect(app).toContain('path={"/manus-hero"} component={ManusHero}');
    expect(ships).toContain('href="/manus-hero"');
    expect(hero).toContain('useSovereignHeartbeat({ page: "manus-hero" })');
    expect(hero).toContain("ORIGINAL STORY UNIVERSE");
    expect(hero).toContain("browser-local story compass");
    expect(hero).toContain("Youth-aware creation");
    expect(hero).toContain("does not represent an autonomous external system");
    expect(hero).toContain("Create local episode blueprint");
  });
});
