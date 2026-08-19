import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "client/src/pages/WalletConnect.tsx"), "utf8");
const appSource = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");

describe("WalletConnect release-state correction", () => {
  it("keeps the wallet route registered as a readiness surface", () => {
    expect(appSource).toContain('<Route path={"/wallet"} component={WalletConnect} />');
    expect(source).toContain('useSovereignHeartbeat({ page: "wallet-access-readiness" })');
    expect(source).toContain('WALLET ACCESS READINESS · NO CONNECTION ACTIVE');
    expect(source).toContain('No account, address, or transaction active.');
  });

  it("removes provider detection, account connection, network switching, downloads, and address display", () => {
    expect(source).not.toContain("eth_requestAccounts");
    expect(source).not.toContain("eth_accounts");
    expect(source).not.toContain("wallet_switchEthereumChain");
    expect(source).not.toContain("wallet_addEthereumChain");
    expect(source).not.toContain("window.open");
    expect(source).not.toContain("connectedAddress");
    expect(source).not.toContain("SUPPORTED_CHAINS");
    expect(source).toContain("This route does not detect an extension");
  });

  it("keeps packet preparation browser-local and requires an exact owner-confirmed action", () => {
    expect(source).toContain("BROWSER-LOCAL WALLET ACCESS PACKET");
    expect(source).toContain("I confirm this browser-local draft does not authorize wallet detection");
    expect(source).toContain("exact current owner release");
    expect(source).toContain("PortalTrustLens");
  });
});
