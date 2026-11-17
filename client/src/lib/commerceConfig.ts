// Placeholder checkout values. Replace after merge; buttons stay disabled until real values are set.
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK";
export const SALE_CONTRACT_ADDRESS = "REPLACE_WITH_VERIFIED_SALE_CONTRACT";
export const SALE_CONTRACT_ABI = ["function buy() payable"] as const;
export const PRICE_POL = "10"; // placeholder price, in POL
export const PRICE_MATIC = PRICE_POL; // Backward-compatible legacy export.

export const POLYGON_CHAIN_ID = "0x89";
export const POLYGON_CHAIN_PARAMS = {
  chainId: POLYGON_CHAIN_ID,
  chainName: "Polygon Mainnet",
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: import.meta.env.VITE_POLYGON_RPC_URL ? [import.meta.env.VITE_POLYGON_RPC_URL] : [],
  blockExplorerUrls: ["https://polygonscan.com"],
};

export function isPlaceholder(value: string): boolean {
  return value.includes("REPLACE");
}

export function isStripeConfigured(link: string = STRIPE_PAYMENT_LINK): boolean {
  return !isPlaceholder(link) && /^https:\/\/buy\.stripe\.com\/\S+$/.test(link);
}

export function isContractConfigured(address: string = SALE_CONTRACT_ADDRESS): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}
