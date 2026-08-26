import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const pagePath = path.resolve(process.cwd(), "client/src/pages/BookOfLife.tsx");

describe("Phase 804 — Book of Life public presentation", () => {
  it("keeps creator context and release pathways welcoming without repeated defensive disclaimers", () => {
    const page = fs.readFileSync(pagePath, "utf8");

    expect(page).toContain("creator context for readers to explore");
    expect(page).toContain("Explore each entry alongside the original track");
    expect(page).toContain("Follow the release pathway for future edition updates");
    expect(page).toContain("future collectible activity will open through its dedicated release experience");
    expect(page).not.toContain("This is not evidence that The Book of Life is published there.");
    expect(page).not.toContain("This card does not establish that a full edition is available.");
  });
});
