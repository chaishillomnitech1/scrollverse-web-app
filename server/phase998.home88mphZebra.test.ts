import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const homePath = resolve(import.meta.dirname, "../client/src/pages/Home.tsx");

describe("Phase 998 homepage 88MPH and Zebra doorways", () => {
  it("surfaces source-labeled Back to the Future motion with a click-to-play route", () => {
    const source = readFileSync(homePath, "utf8");
    expect(source).toContain("Back to the Future · 88MPH");
    expect(source).toContain("Click to play");
    expect(source).toContain('href: "/chais-videos"');
  });

  it("surfaces the Zebra brand as a front-door visual artifact", () => {
    const source = readFileSync(homePath, "utf8");
    expect(source).toContain("Zebra Brand · Free Name Toggle");
    expect(source).toContain("ZEBRA");
    expect(source).toContain('href: "/meta-ai-artifacts-lookbooks"');
  });
});
