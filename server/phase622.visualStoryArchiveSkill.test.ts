import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 622 — Visual-Story Archive Skill", () => {
  it("records the reusable visual archive workflow in the browser-local story-world route", () => {
    const page = read("client/src/pages/VisualStoryWorlds.tsx");
    const record = read("docs/phase622-visual-story-archive-skill.md");

    expect(page).toContain("REUSABLE CREATOR METHOD · AVAILABLE NOW");
    expect(page).toContain("Visual-Story Archive Method");
    expect(page).toContain("scrollverse-visual-story-archive");
    expect(page).toContain("01 · REVIEW");
    expect(page).toContain("02 · EXHIBIT");
    expect(page).toContain("03 · CONNECT");
    expect(record).toContain("managed asset delivery");
    expect(record).toContain("cross-world narration handoff");
  });

  it("keeps the reusable method distinct from external artifact activation", () => {
    const record = read("docs/phase622-visual-story-archive-skill.md");

    expect(record).toContain("does not pin, mint, list, price, deploy, transfer");
    expect(record).toContain("browser-local records");
  });
});
