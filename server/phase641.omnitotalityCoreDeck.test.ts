import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const page = readFileSync(resolve(process.cwd(), "client/src/pages/OmnitotalityCoreDeck.tsx"), "utf8");
const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");

describe("Phase 641 — Omnitotality Core Deck Protected Reference", () => {
  it("preserves the four source-led preparation records", () => {
    expect(page).toContain("Tactical Mantle Visual System");
    expect(page).toContain("Guardian Array Release Record");
    expect(page).toContain("Master IP Reel Direction");
    expect(page).toContain("Episode 24: Absolute Expansion");
  });

  it("keeps the supplied checkout, mint, media, ledger, and runtime assertions out of active state", () => {
    expect(page).toContain("not a live ScrollVerse product, checkout, inventory, or transaction state");
    expect(page).toContain("No mint, contract, wallet, biometric record, Polygon zkEVM broadcast, token, or blockchain node is active");
    expect(page).toContain("No master track, reel, 4K media file, streaming player, IPFS hub");
    expect(page).toContain("not a live ScrollVerse product, checkout, inventory, or transaction state");
  });

  it("registers the browser-local protected reference route", () => {
    expect(app).toContain('path={"/omnitotality-core-deck"}');
    expect(app).toContain("OmnitotalityCoreDeck");
  });
});
