import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 879 mobile companion discovery", () => {
  it("makes the source-led companion blueprint visible without claiming a submitted store application", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/MobileCompanion.tsx"), "utf8");
    const app = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(page).toContain("NATIVE EXPERIENCE BLUEPRINT");
    expect(page).toContain("MOBILE COMPANION · PREPARATION ACTIVE");
    expect(page).toContain("store builds are not submitted");
    expect(page).toContain('href: "/episode-brief-builder"');
    expect(page).toContain('href: "/chais-sabir-allah-mirror"');
    expect(page).toContain('href: "/connected-source-registry"');
    expect(app).toContain('path="/mobile-companion"');
    expect(home).toContain('href="/mobile-companion"');
    expect(home).toContain("Explore the Mobile Companion blueprint");
  });
});
