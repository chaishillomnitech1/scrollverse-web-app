import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "client/src/pages/ExchangeCrypto.tsx"), "utf8");
const appSource = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("ExchangeCrypto release-state correction", () => {
  it("keeps the exchange route registered as a market-readiness surface", () => {
    expect(appSource).toContain('<Route path={"/exchange/crypto"} component={ExchangeCrypto} />');
    expect(source).toContain('useSovereignHeartbeat({ page: "exchange-crypto-readiness" })');
    expect(source).toContain('MARKET + CONVERSION READINESS · NO EXCHANGE ACTIVE');
    expect(source).toContain('No price, pair, or order active.');
  });

  it("removes active pair, price, asset, buy-sell, signal, and exchange controls", () => {
    expect(source).not.toContain("CRYPTO_PAIRS");
    expect(source).not.toContain("QUANTUM_ASSETS");
    expect(source).not.toContain("MIRROR_SIGNALS");
    expect(source).not.toContain("BUY {selectedPair");
    expect(source).not.toContain("SELL {selectedPair");
    expect(source).not.toContain("trpc.exchange.getAssets");
    expect(source).toContain("This route does not display live or delayed market prices");
  });

  it("requires an exact owner-confirmed action before any exchange or financial step", () => {
    expect(source).toContain("BROWSER-LOCAL MARKET PACKET");
    expect(source).toContain("I confirm this draft does not authorize a price feed");
    expect(source).toContain("One exact current owner confirmation is required for that one action.");
    expect(source).toContain("PortalTrustLens");
  });
});
