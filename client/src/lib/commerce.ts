// PLACEHOLDERS: owner must replace these before enabling live checkout. No secrets belong here.
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK";
export const SALE_CONTRACT_ADDRESS = "REPLACE_WITH_VERIFIED_SALE_CONTRACT";
export const SALE_ABI = ["function buy() payable"] as const;
// Placeholder price in MATIC.
export const DEFAULT_PRICE_MATIC = "10";

export const POLYGON_CHAIN_ID = 137;
export const POLYGON_CHAIN_PARAMS = {
  chainId: "0x89",
  chainName: "Polygon Mainnet",
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: ["https://polygon-rpc.com"],
  blockExplorerUrls: ["https://polygonscan.com"],
};

export type TxStatus =
  | { kind: "idle" }
  | { kind: "connecting" }
  | { kind: "checking-network" }
  | { kind: "pending"; hash: string }
  | { kind: "success"; hash: string }
  | { kind: "error"; message: string };

export function isPlaceholder(value: string): boolean {
  return value.includes("REPLACE_WITH");
}

export function isValidAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export function describeStatus(status: TxStatus): string {
  switch (status.kind) {
    case "idle": return "Wallet: not connected";
    case "connecting": return "Connecting wallet...";
    case "checking-network": return "Checking network...";
    case "pending": return `Pending: ${status.hash}`;
    case "success": return `Success: ${status.hash}`;
    case "error": return `Error: ${status.message}`;
  }
}

export function readableError(err: unknown): string {
  const e = err as { code?: number | string; shortMessage?: string; message?: string } | null;
  if (e?.code === 4001 || e?.code === "ACTION_REJECTED") return "Request rejected in wallet.";
  return e?.shortMessage ?? e?.message ?? "Unknown error.";
}
