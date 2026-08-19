import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 3410 homepage navigation responsiveness", () => {
  it("reserves the dense desktop route strip for wide viewports and keeps the compact menu accessible", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(page).toContain('className="hidden 2xl:flex items-center gap-8"');
    expect(page).toContain('className="2xl:hidden text-white"');
    expect(page).toContain('aria-label={mobileMenuOpen ? "Close primary navigation" : "Open primary navigation"}');
    expect(page).toContain('aria-expanded={mobileMenuOpen}');
  });
});
