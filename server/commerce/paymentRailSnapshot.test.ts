import { describe, expect, it } from "vitest";
import { getPaymentRailSnapshot } from "./paymentRailSnapshot";

describe("sovereign payment rail snapshot", () => {
  it("fails closed when no provider configuration exists", () => {
    const snapshot = getPaymentRailSnapshot({}, "2026-11-14T00:00:00.000Z");
    expect(snapshot.executionEnabled).toBe(false);
    expect(snapshot.card.state).toBe("not-configured");
    expect(snapshot.bankTransfer.state).toBe("partner-required");
    expect(snapshot.onchain.state).toBe("mainnet-contract-required");
    expect(snapshot.walletConnect.state).toBe("walletconnect-project-id-required");
    expect(snapshot.storefront.state).toBe("storefront-credentials-required");
  });

  it("never treats a Stripe test key as live processing", () => {
    const snapshot = getPaymentRailSnapshot({ STRIPE_SECRET_KEY: "sk_test_example" });
    expect(snapshot.card.state).toBe("test-mode-only");
    expect(snapshot.card.secretValuesExposed).toBe(false);
    expect(JSON.stringify(snapshot)).not.toContain("sk_test_example");
  });

  it("labels a live-key presence as unverified rather than active", () => {
    const snapshot = getPaymentRailSnapshot({ STRIPE_SECRET_KEY: "sk_live_example" });
    expect(snapshot.card.state).toBe("live-key-present-unverified");
    expect(snapshot.executionEnabled).toBe(false);
  });

  it("requires complete Coinbase Payment Acceptance configuration", () => {
    const partial = getPaymentRailSnapshot({
      COINBASE_CDP_API_KEY_ID: "configured",
      COINBASE_CDP_API_KEY_SECRET: "configured",
      COINBASE_PAYMENT_OPERATOR_ID: "operator-1",
    });
    expect(partial.coinbasePayments.state).toBe("coinbase-cdp-credentials-required");

    const complete = getPaymentRailSnapshot({
      COINBASE_CDP_API_KEY_ID: "configured",
      COINBASE_CDP_API_KEY_SECRET: "configured",
      COINBASE_PAYMENT_OPERATOR_ID: "operator-1",
      COINBASE_PAYMENT_WEBHOOK_SECRET: "configured",
    });
    expect(complete.coinbasePayments.state).toBe("coinbase-cdp-configured-unverified");
    expect(complete.executionEnabled).toBe(false);
  });

  it("requires all ACH partner configuration fields", () => {
    const partial = getPaymentRailSnapshot({
      SV_ACH_PROVIDER: "bank-partner",
      SV_ACH_MERCHANT_ID: "merchant-1",
      SV_ACH_API_KEY: "configured",
    });
    expect(partial.bankTransfer.state).toBe("partner-required");

    const complete = getPaymentRailSnapshot({
      SV_ACH_PROVIDER: "bank-partner",
      SV_ACH_MERCHANT_ID: "merchant-1",
      SV_ACH_API_KEY: "configured",
      SV_ACH_WEBHOOK_SECRET: "configured",
    });
    expect(complete.bankTransfer.state).toBe("configured-unverified");
  });

  it("accepts only a mainnet chain plus a valid EVM address as configuration evidence", () => {
    const address = "0x" + "a".repeat(40);
    const mainnet = getPaymentRailSnapshot({
      SV_CHECKOUT_CHAIN_ID: "137",
      SV_CHECKOUT_CONTRACT_ADDRESS: address,
    });
    expect(mainnet.onchain.state).toBe("mainnet-contract-present-needs-independent-verification");

    const testnet = getPaymentRailSnapshot({
      SV_CHECKOUT_CHAIN_ID: "80002",
      SV_CHECKOUT_CONTRACT_ADDRESS: address,
    });
    expect(testnet.onchain.state).toBe("mainnet-contract-required");
  });

  it("reports WalletConnect configuration without claiming a working SDK", () => {
    const snapshot = getPaymentRailSnapshot({
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: "public-project-id",
    });
    expect(snapshot.walletConnect.projectIdConfigured).toBe(true);
    expect(snapshot.walletConnect.state).toBe("walletconnect-configured-sdk-unverified");
    expect(snapshot.walletConnect.wallets).toContain("Robinhood Wallet");
  });
});
