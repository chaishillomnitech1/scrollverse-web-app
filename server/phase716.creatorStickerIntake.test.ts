import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 716 — Creator-Sticker Visual Intake", () => {
  it("preserves the five reviewed source filenames, direct treatment labels, and stable fingerprints", () => {
    const page = read("client/src/pages/CreatorStickerIntake.tsx");
    expect(page).toContain("chais_sticker_01_realistic.png");
    expect(page).toContain("chais_sticker_05_chibi.png");
    expect(page).toContain("Realistic · Gold · Engraved · Line Art · Cartoon");
    expect(page).toContain("8d5ca38ce314bd69eaaa097bb90f1e0d4df3b6a0e14142c6da1a359e29c92e02");
    expect(page).toContain("06576d146f7b4bd3ec2700c32d91789f390a2caf5e37fd66c8717c39cdbc1488");
  });

  it("keeps the intake source-led with protected images and dedicated creator pathways", () => {
    const page = read("client/src/pages/CreatorStickerIntake.tsx");
    expect(page).toContain("Source images remain protected in this intake.");
    expect(page).toContain("continue through their dedicated creator pathway");
    expect(page).toContain("/protected-visual-intake");
    expect(page).toContain("/sovereign-cartoon-gallery");
  });

  it("registers the browser-local creator-sticker route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('path="/creator-sticker-intake"');
    expect(app).toContain("CreatorStickerIntake");
  });
});
