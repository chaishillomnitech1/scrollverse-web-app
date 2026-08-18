import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "client/src/pages/CryptoHub.tsx"), "utf8");
const appSource = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("CryptoHub release-state correction", () => {
  it("keeps the crypto route registered as a readiness surface", () => {
    expect(appSource).toContain('<Route path={"/crypto"} component={CryptoHub} />');
    expect(source).toContain('useSovereignHeartbeat({ page: "crypto-release-readiness" })');
    expect(source).toContain('CRYPTO + COLLECTOR READINESS · NO WALLET OR PAYMENT ACTIVE');
    expect(source).toContain('No crypto payment or mint active.');
  });

  it("removes direct wallet, chain balance, transfer, tier-price, and mint controls", () => {
    expect(source).not.toContain("eth_requestAccounts");
    expect(source).not.toContain("eth_sendTransaction");
    expect(source).not.toContain("eth_getBalance");
    expect(source).not.toContain("polygon-rpc.com");
    expect(source).not.toContain("0x377956c1471d9ce142df6932895839243da23a2c");
    expect(source).not.toContain("Queue ScrollSoul NFT Mint");
    expect(source).toContain("No wallet address, supported asset, exact amount, payment request, treasury balance");
  });

  it("requires an exact owner-confirmed action before any provider-side crypto or collector step", () => {
    expect(source).toContain("BROWSER-LOCAL RELEASE PACKET");
    expect(source).toContain("I confirm this draft does not authorize a wallet");
    expect(source).toContain("One exact current owner confirmation is required for that one action.");
    expect(source).toContain("PortalTrustLens");
  });
});
