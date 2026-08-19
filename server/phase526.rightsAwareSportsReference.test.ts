import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 526 rights-aware sports reference route", () => {
  it("removes unsupported sports minting and commercial language while preserving source and rights gates", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/KnicksNFT.tsx"), "utf8");
    expect(page).toContain("SPORTS REFERENCE · RIGHTS-AWARE REVIEW · NO COMMERCIAL ACTION");
    expect(page).toContain("No prediction, score, contract, token, NFT, wager, price, mint, checkout, payout");
    expect(page).toContain("purpose-specific authorization");
    expect(page).not.toContain("createNFTCheckoutSession");
    expect(page).not.toContain("MINT PROPHECY");
  });
});
