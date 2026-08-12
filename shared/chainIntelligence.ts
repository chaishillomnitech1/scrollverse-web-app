export type ChainEvidenceStatus = "SOURCE-LINKED" | "EXTERNAL-EXPLORER" | "FIRST-PARTY ROUTE" | "EVIDENCE REQUIRED";

export const CHAIN_STATUS_COLORS: Record<ChainEvidenceStatus, string> = {
  "SOURCE-LINKED": "#00D4FF",
  "EXTERNAL-EXPLORER": "#B98CFF",
  "FIRST-PARTY ROUTE": "#00FF88",
  "EVIDENCE REQUIRED": "#FFB800",
};

export const CHAIN_NETWORK_CONTEXT = {
  name: "Scroll Mainnet",
  chainId: "534352",
  rpcUrl: "https://rpc.scroll.io/",
  explorerUrl: "https://scrollscan.com/",
  sourceUrl: "https://docs.scroll.io/en/developers/",
  status: "SOURCE-LINKED" as const,
  note: "Network context from Scroll developer documentation. A network setting or explorer link does not authorize a transaction or verify a wallet, balance, contract, or asset claim.",
};

export const CHAIN_INTELLIGENCE_RECORDS = [
  {
    title: "Wallet gateway",
    href: "/wallet",
    status: "FIRST-PARTY ROUTE" as const,
    detail: "A user-controlled wallet connection surface. Provider choices, balances, and signatures remain separate from this tracker.",
  },
  {
    title: "Token education",
    href: "/token",
    status: "FIRST-PARTY ROUTE" as const,
    detail: "A $LONDC-oriented discovery and product route. It does not by itself establish a live contract, value, custody, or transferable balance.",
  },
  {
    title: "NFT route",
    href: "/nft",
    status: "FIRST-PARTY ROUTE" as const,
    detail: "A collection and tier presentation route. Navigation does not prove ownership, rights, mint execution, or a commercial outcome.",
  },
  {
    title: "Nexus archive",
    href: "/nexus",
    status: "FIRST-PARTY ROUTE" as const,
    detail: "A first-party archive and digital-asset narrative surface with source references and release boundaries.",
  },
  {
    title: "Scrollscan explorer",
    href: "https://scrollscan.com/",
    status: "EXTERNAL-EXPLORER" as const,
    detail: "A third-party L2 explorer handoff for public blocks, addresses, contracts, tokens, and transactions on Scroll.",
  },
  {
    title: "Owner-supplied public chain record",
    href: "/creator-operations",
    status: "EVIDENCE REQUIRED" as const,
    detail: "A public address, contract, transaction hash, or content record can be staged with provenance before the tracker presents it as a verified reference.",
  },
] as const;

export const CHAIN_INTERPRETATION_RULES = [
  "A source URL identifies where a record came from; it is not a statement that ScrollVerse controls the source.",
  "An explorer observation is external reporting and should be read with its network, timestamp, and identifier context.",
  "A public reference is not a legal ownership determination, valuation, custody arrangement, investment recommendation, or authorization to move funds.",
  "Evidence-required records remain visibly incomplete until their source, provenance, and release context are reviewed.",
] as const;
