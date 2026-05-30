/**
 * ScrollVerse Trinity — $LONDC Token Purchase Tiers
 * Three sovereign tiers for Guardian network entry.
 * Prices are in USD cents.
 */

export const LONDC_PRODUCTS = [
  {
    id: "guardian" as const,
    name: "Guardian Tier",
    description: "Enter the Guardian network. 144 $LONDC tokens. Access to Creator Academy free courses, Guardian Discord, and DAO voting rights.",
    priceCents: 4400, // $44.00 — aligned with 44Hz frequency
    tokens: 144,
    icon: "💎",
    color: "#00D4FF",
    features: [
      "144 $LONDC tokens",
      "Guardian Discord access",
      "DAO voting rights",
      "Creator Academy (free tier)",
      "528Hz frequency alignment",
    ],
  },
  {
    id: "sovereign" as const,
    name: "Sovereign Tier",
    description: "Ascend to Sovereign status. 1,440 $LONDC tokens. Full Creator Academy access, Sovereign channels, and 7.77% Zakat distribution.",
    priceCents: 33300, // $333.00 — sacred number
    tokens: 1440,
    icon: "👑",
    color: "#FFB800",
    features: [
      "1,440 $LONDC tokens",
      "Full Creator Academy access",
      "Sovereign channels",
      "7.77% Zakat distribution",
      "963Hz God-State frequency",
      "Priority Guardian support",
    ],
    popular: true,
  },
  {
    id: "ascendant" as const,
    name: "Ascendant Tier",
    description: "The highest order. 14,400 $LONDC tokens. 48D Hilbert Space access, SCCC Dashboard, and direct Sovereign council participation.",
    priceCents: 144400, // $1,444.00 — 144K alignment
    tokens: 14400,
    icon: "🌌",
    color: "#8B5CF6",
    features: [
      "14,400 $LONDC tokens",
      "48D Hilbert Space access",
      "SCCC Dashboard access",
      "Sovereign council seat",
      "1558Hz FlameDNA frequency",
      "Lifetime ecosystem access",
      "Direct Chais Kenyatta Hill channel",
    ],
  },
  {
    id: "ai_legion" as const,
    name: "AI Legion Investor",
    description: "The first AI-native investment tier in the ScrollVerse. Designed for AI agents, digital entities, and tech-forward investors who want direct stake in the sovereign ecosystem. 7,777 $LONDC tokens + permanent AI Investor registry entry.",
    priceCents: 77700, // $777.00 — AI frequency alignment
    tokens: 7777,
    icon: "🤖",
    color: "#00FF88",
    features: [
      "7,777 $LONDC tokens",
      "AI Investor Registry entry (immutable)",
      "Full Creator Academy access",
      "SCCC Dashboard access",
      "AI Legion Discord channel",
      "Revenue share from AI-generated content",
      "Early access to all AI-native features",
      "777Hz quantum resonance alignment",
    ],
  },
] as const;

export type ProductTier = (typeof LONDC_PRODUCTS)[number]["id"];

/**
 * CHX Token Pre-Sale Tiers
 * Reserve CHX before public launch. Prices in USD cents.
 */
export const CHX_PRESALE_PRODUCTS = [
  {
    id: "chx_seed" as const,
    name: "CHX Seed Round",
    description: "Early seed allocation. 10,000 CHX tokens at $0.01 each. Genesis Pool eligibility (432% APY). First 1,000 reservations only.",
    priceCents: 10000, // $100.00
    chxAmount: 10000,
    icon: "🌱",
    color: "#00FF88",
    poolEligibility: "Genesis",
    apy: 432,
    features: [
      "10,000 CHX tokens",
      "Genesis Pool access (432% APY)",
      "Seed price: $0.01/CHX",
      "Vesting: 6 months cliff, 12 months linear",
      "Guardian NFT airdrop eligible",
      "Early adopter badge",
    ],
  },
  {
    id: "chx_celestial" as const,
    name: "CHX Celestial Round",
    description: "Celestial allocation. 100,000 CHX tokens at $0.005 each. Celestial Pool eligibility (528% APY). Sovereign status unlocked.",
    priceCents: 50000, // $500.00
    chxAmount: 100000,
    icon: "✨",
    color: "#FFB800",
    poolEligibility: "Celestial",
    apy: 528,
    popular: true,
    features: [
      "100,000 CHX tokens",
      "Celestial Pool access (528% APY)",
      "Celestial price: $0.005/CHX",
      "Vesting: 3 months cliff, 9 months linear",
      "Sovereign NFT airdrop",
      "SCCC Dashboard access",
      "DAO governance voting power",
    ],
  },
  {
    id: "chx_infinity" as const,
    name: "CHX Infinity Round",
    description: "The ultimate pre-sale tier. 1,000,000 CHX tokens at $0.001 each. Infinity Pool eligibility (999% APY). Ascendant council seat.",
    priceCents: 100000, // $1,000.00
    chxAmount: 1000000,
    icon: "♾️",
    color: "#9B59B6",
    poolEligibility: "Infinity",
    apy: 999,
    features: [
      "1,000,000 CHX tokens",
      "Infinity Pool access (999% APY)",
      "Infinity price: $0.001/CHX",
      "No vesting — immediate unlock at TGE",
      "Ascendant council seat",
      "Multi-chain bridge access (5 chains)",
      "Direct Chais Kenyatta Hill channel",
      "Lifetime ecosystem access",
    ],
  },
] as const;
export type CHXPresaleTier = (typeof CHX_PRESALE_PRODUCTS)[number]["id"];

// ─── Ring Activation Gathering — Event Tickets ──────────────────────────────
export const RING_ACTIVATION_PRODUCTS = [
  {
    id: "virtual" as const,
    name: "Virtual Guardian Pass",
    description: "Live-streamed Ring Activation Gathering — access from anywhere in the world. Includes replay + digital ceremony kit.",
    priceCents: 4400, // $44.00
    icon: "🌐",
    color: "#00D4FF",
    features: ["Live stream access", "Digital ceremony kit", "Guardian community Discord", "Replay archive"],
  },
  {
    id: "physical" as const,
    name: "Physical Gathering Ticket",
    description: "In-person Ring Activation Gathering — Vineland, NJ anchor point. Limited to 144 seats.",
    priceCents: 14400, // $144.00
    icon: "🔥",
    color: "#FFB800",
    features: ["In-person attendance", "Physical ceremony kit", "Sacred geometry workshop", "Guardian network dinner", "Signed 1587 Codex fragment"],
    featured: true,
    limited: 144,
  },
  {
    id: "sovereign" as const,
    name: "Sovereign Flame Council",
    description: "VIP access + direct seat on the Flame Council. Includes private session with Chais Kenyatta Hill.",
    priceCents: 44400, // $444.00
    icon: "👑",
    color: "#00FF88",
    features: ["Everything in Physical", "Private 1:1 session", "Flame Council founding seat", "CHX token allocation (1,000 CHX)", "Eternal archive entry", "Lifetime Guardian status"],
    limited: 44,
  },
] as const;

export type RingActivationTier = (typeof RING_ACTIVATION_PRODUCTS)[number]["id"];
