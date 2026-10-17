import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");

describe("Phase 949 — quality pass contracts", () => {
  it("keeps page zoom available and provides a homepage skip target", () => {
    const html = read("client/index.html");
    const home = read("client/src/pages/Home.tsx");
    expect(html).not.toContain("maximum-scale=1");
    expect(home).toContain('href="#main-content"');
    expect(home).toContain('id="main-content"');
  });

  it("labels the homepage iframe embeds and primary navigation", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain('aria-label="Primary navigation"');
    expect(home).toContain('title="Spotify artist player"');
    expect(home).toContain('aria-label="Mobile navigation"');
  });

  it("uses minified production assets after the baseline bundle audit", () => {
    const vite = read("vite.config.ts");
    expect(vite).not.toContain("minify: false");
    expect(vite).not.toContain("cssMinify: false");
  });
});
