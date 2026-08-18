import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "client/src/pages/TokenStore.tsx"), "utf8");
const appSource = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("$LONDC Token Store release-state correction", () => {
  it("keeps the token route registered as a release-readiness surface", () => {
    expect(appSource).toContain('<Route path={"/token"} component={TokenStore} />');
    expect(source).toContain('useSovereignHeartbeat({ page: "token-release-readiness" })');
    expect(source).toContain('TOKEN + EDITION READINESS · NO CHECKOUT ACTIVE');
    expect(source).toContain('No token sale or checkout active.');
  });

  it("removes active checkout, token-sale, wallet, and book-purchase execution", () => {
    expect(source).not.toContain("createCheckoutSession");
    expect(source).not.toContain("createBookCheckoutSession");
    expect(source).not.toContain("window.open(url");
    expect(source).not.toContain("0x377956c1471d9ce142df6932895839243da23a2c");
    expect(source).not.toContain("4242 4242 4242 4242");
    expect(source).toContain("No contract, network, supply, allocation, price, exchange, wallet, custody, transfer, reward, governance enrollment, or sale is set.");
  });

  it("requires one exact owner-confirmed action before external token, book, or payment changes", () => {
    expect(source).toContain("BROWSER-LOCAL RELEASE PACKET");
    expect(source).toContain("I confirm this draft does not authorize a contract");
    expect(source).toContain("One exact current owner confirmation is required for that one action.");
    expect(source).toContain("PortalTrustLens");
  });
});
