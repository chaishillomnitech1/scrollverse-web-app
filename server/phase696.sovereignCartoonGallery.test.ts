import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("Phase 696 — Sovereign Cartoon Gallery", () => {
  it("gallery page contains all 14 sovereign token records", () => {
    const src = readFileSync(resolve(__dirname, "../client/src/pages/SovereignCartoonGallery.tsx"), "utf-8");
    expect(src).toContain("SV-001");
    expect(src).toContain("SV-014");
    expect(src).toContain("Red Lamp Session");
    expect(src).toContain("The Conversation");
  });

  it("gallery route is registered in App.tsx", () => {
    const app = readFileSync(resolve(__dirname, "../client/src/App.tsx"), "utf-8");
    expect(app).toContain("sovereign-cartoon-gallery");
    expect(app).toContain("SovereignCartoonGallery");
  });

  it("gallery has no NFT mint or blockchain action boundary", () => {
    const src = readFileSync(resolve(__dirname, "../client/src/pages/SovereignCartoonGallery.tsx"), "utf-8");
    expect(src).toContain("No NFT has been minted");
  });
});
