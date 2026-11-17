import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 995 performance and accessible gallery feedback", () => {
  it("keeps the route loader dimensionally stable and reduced-motion safe", () => {
    const source = read("client/src/App.tsx");
    expect(source).toContain("scrollverse-orbit-loader");
    expect(source).toContain("aspect-square");
    expect(source).toContain("motion-reduce:animate-none");
    expect(source).toContain("aria-label=\"Loading ScrollVerse route\"");
  });

  it("provides keyboard-visible artifact hover and focus feedback", () => {
    const source = read("client/src/components/Block145Gallery.tsx");
    expect(source).toContain("aria-label={`Open metadata for ${receipt.filename}`}");
    expect(source).toContain("focus-visible:outline");
    expect(source).toContain("group-focus-within");
    expect(source).toContain("motion-reduce:transition-none");
  });

  it("documents measurable local performance and accessibility checks", () => {
    const skill = read("/home/ubuntu/skills/scrollverse-source-led-portfolio/SKILL.md");
    expect(skill).toContain("layout shift");
    expect(skill).toContain("60fps");
    expect(skill).toContain("keyboard-visible hover");
  });
});
