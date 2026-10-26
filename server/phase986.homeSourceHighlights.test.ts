import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("homepage source highlights", () => {
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("surfaces the latest creator lookbook and theatre highlights", () => {
    expect(home).toContain("Marie Sophia 721 Lookbook");
    expect(home).toContain("God Flow Workshop");
    expect(home).toContain("Motherload Omniverse Theatre");
    expect(home).toContain("Free Comic Book Series");
  });

  it("keeps the highlight cards visitor-controlled and source-labeled", () => {
    expect(home).toContain("Open source lookbook →");
    expect(home).toContain("creator-supplied source theater reference");
    expect(home).toContain("/meta-ai-artifacts-lookbooks");
  });
});
