import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 825 — Creator Sticker Intake presentation", () => {
  it("centers creator source context and dedicated pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CreatorStickerIntake.tsx"), "utf8");
    expect(page).toContain("Source images remain protected in this intake.");
    expect(page).toContain("dedicated creator pathway");
    expect(page).not.toContain("This record does not infer ownership, rights, identity, release state");
  });
});
