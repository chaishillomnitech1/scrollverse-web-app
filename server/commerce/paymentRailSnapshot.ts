export type PaymentRailState =
  | "not-configured"
  | "test-mode-only"
  | "live-key-present-unverified"
  | "partner-required"
  | "configured-unverified"
  | "coinbase-cdp-credentials-required"
  | "coinbase-cdp-configured-unverified"
  | "mainnet-contract-required"
  | "mainnet-contract-present-needs-independent-verification"
  | "walletconnect-project-id-required"
  | "walletconnect-configured-sdk-unverified"
  | "storefront-credentials-required"
  | "storefront-credentials-present-needs-catalog-verification";

export type PaymentRailSnapshot = {
  generatedAt: string;
  executionEnabled: false;
  model: "merchant-direct-provider-orchestration";
  card: { state: PaymentRailState; provider: "Stripe"; secretValuesExposed: false };
  bankTransfer: { state: PaymentRailState; provider: string | null; settlement: "merchant-bank-account-via-approved-bank-partner" };
  coinbasePayments: { state: PaymentRailState; provider: "Coinbase Developer Platform Payment Acceptance"; settlement: "merchant-directed USDC"; credentialsPresent: boolean };
  onchain: { state: PaymentRailState; chainId: number | null; contractAddressPresent: boolean; signing: "customer-wallet-only" };
  walletConnect: { state: PaymentRailState; projectIdConfigured: boolean; wallets: string[] };
  storefront: { state: PaymentRailState; credentialsPresent: boolean };
};

const MAINNET_CHAIN_IDS = new Set([1, 10, 137, 42161, 8453, 534352]);
const EVM_ADDRESS = /^0x[a-fA-F0-9]{40}$/;

function present(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Read-only capability snapshot. This function never creates a charge,
 * checkout session, wallet connection, signature, transfer, or payout.
 * It reports configuration presence, not provider approval or live operation.
 */
export function getPaymentRailSnapshot(
  env: Record<string, string | undefined> = process.env,
  generatedAt = new Date().toISOString(),
): PaymentRailSnapshot {
  const stripeKey = env.STRIPE_SECRET_KEY ?? "";
  const cardState: PaymentRailState = stripeKey.startsWith("sk_test_")
    ? "test-mode-only"
    : stripeKey.startsWith("sk_live_")
      ? "live-key-present-unverified"
      : "not-configured";

  const achProvider = present(env.SV_ACH_PROVIDER) ? env.SV_ACH_PROVIDER!.trim() : null;
  const achConfigured = Boolean(
    achProvider &&
    present(env.SV_ACH_MERCHANT_ID) &&
    present(env.SV_ACH_API_KEY) &&
    present(env.SV_ACH_WEBHOOK_SECRET),
  );

  const coinbaseConfigured = Boolean(
    present(env.COINBASE_CDP_API_KEY_ID) &&
    present(env.COINBASE_CDP_API_KEY_SECRET) &&
    present(env.COINBASE_PAYMENT_OPERATOR_ID) &&
    present(env.COINBASE_PAYMENT_WEBHOOK_SECRET),
  );

  const rawChainId = Number(env.SV_CHECKOUT_CHAIN_ID);
  const chainId = Number.isSafeInteger(rawChainId) && rawChainId > 0 ? rawChainId : null;
  const contractAddressPresent = EVM_ADDRESS.test(env.SV_CHECKOUT_CONTRACT_ADDRESS ?? "");
  const onchainConfigured = Boolean(
    contractAddressPresent &&
    chainId !== null &&
    MAINNET_CHAIN_IDS.has(chainId),
  );

  const walletConnectConfigured = present(
    env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? env.VITE_WALLETCONNECT_PROJECT_ID,
  );
  const storefrontConfigured = Boolean(
    present(env.SHOPIFY_STORE_DOMAIN) &&
    present(env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
  );

  return {
    generatedAt,
    executionEnabled: false,
    model: "merchant-direct-provider-orchestration",
    card: {
      state: cardState,
      provider: "Stripe",
      secretValuesExposed: false,
    },
    bankTransfer: {
      state: achConfigured ? "configured-unverified" : "partner-required",
      provider: achProvider,
      settlement: "merchant-bank-account-via-approved-bank-partner",
    },
    coinbasePayments: {
      state: coinbaseConfigured ? "coinbase-cdp-configured-unverified" : "coinbase-cdp-credentials-required",
      provider: "Coinbase Developer Platform Payment Acceptance",
      settlement: "merchant-directed USDC",
      credentialsPresent: coinbaseConfigured,
    },
    onchain: {
      state: onchainConfigured
        ? "mainnet-contract-present-needs-independent-verification"
        : "mainnet-contract-required",
      chainId,
      contractAddressPresent,
      signing: "customer-wallet-only",
    },
    walletConnect: {
      state: walletConnectConfigured
        ? "walletconnect-configured-sdk-unverified"
        : "walletconnect-project-id-required",
      projectIdConfigured: walletConnectConfigured,
      wallets: ["MetaMask", "Coinbase Wallet", "Robinhood Wallet", "Other WalletConnect-compatible wallets"],
    },
    storefront: {
      state: storefrontConfigured
        ? "storefront-credentials-present-needs-catalog-verification"
        : "storefront-credentials-required",
      credentialsPresent: storefrontConfigured,
    },
  };
}
