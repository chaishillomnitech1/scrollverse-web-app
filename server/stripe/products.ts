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
] as const;

export type ProductTier = (typeof LONDC_PRODUCTS)[number]["id"];
