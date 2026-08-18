import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "client/src/pages/NftMarketplace.tsx"), "utf8");
const appSource = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("Phase 483 — ScrollSoul collector release state", () => {
  it("keeps the NFT route source-labeled and ready for release rather than active minting", () => {
    expect(appSource).toContain('<Route path={"/nft"} component={NftMarketplace} />');
    expect(appSource).toContain('<Route path={"/nft-marketplace"} component={NftMarketplace} />');
    expect(source).toContain('useSovereignHeartbeat({ page: "nft-marketplace" })');
    expect(source).toContain("SCROLLSOUL · COLLECTOR RELEASE READINESS");
    expect(source).toContain("Original collector records. No mint or checkout active.");
    expect(source).toContain("Sun on Us — 11:11");
  });

  it("removes active checkout mutations, price, supply, wallet, and recent-mint implications", () => {
    expect(source).not.toContain("createNFTCheckoutSession");
    expect(source).not.toContain("priceCents");
    expect(source).not.toContain("LIVE — MINTING ACTIVE");
    expect(source).not.toContain("Recent Mints");
    expect(source).toContain("No contract, supply, price, $LONDC amount, checkout, or token issuance is set.");
    expect(source).toContain("does not authorize a contract, chain, mint, wallet, token, NFT, price, supply, checkout, payment, transfer, listing, delivery, payout, or provider action");
  });

  it("requires exact collector release gates before any irreversible action", () => {
    expect(source).toContain("REQUIRED BEFORE ANY MINT OR LISTING");
    expect(source).toContain("Collector readiness is not an automatic mint authority.");
    expect(source).toContain("One exact current owner confirmation is required for that one action.");
    expect(source).toContain("PortalTrustLens");
  });
});
