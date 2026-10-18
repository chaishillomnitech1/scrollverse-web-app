import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const app = readFileSync("client/src/App.tsx", "utf8");
const archive = readFileSync("client/src/pages/MetaAILegionArchive.tsx", "utf8");

describe("Phase 950 accessibility and discovery controls", () => {
  it("exposes a persistent homepage light/dark theme control", () => {
    expect(app).toContain('<ThemeProvider defaultTheme="dark" switchable>');
    expect(home).toContain('aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}');
    expect(home).toContain('aria-pressed={theme === "dark"}');
  });

  it("provides archive filter feedback and a keyboard-reachable reset", () => {
    expect(archive).toContain('aria-live="polite"');
    expect(archive).toContain('aria-label="Clear archive filters"');
    expect(archive).toContain('setQuery("")');
    expect(archive).toContain('setCollection("All")');
  });
});
