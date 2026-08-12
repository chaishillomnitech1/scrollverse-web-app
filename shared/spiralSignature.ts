/**
 * Creator-owned ScrollVerse Spiral Signature concept set.
 *
 * These public asset references are visual identity concepts only. They are
 * intentionally separate from private release-material uploads, credentials,
 * and any formal IP registration record.
 */
export const SPIRAL_SIGNATURE = {
  name: "ScrollVerse Spiral Signature",
  status: "concept_review" as const,
  ownership: "creator_owned" as const,
  freeAccess: true,
  palette: {
    midnight: "#050B1A",
    cyan: "#00D4FF",
    gold: "#FFB800",
    green: "#00FF88",
  },
  principle: ["imagination", "wisdom", "care", "creator understanding"],
  lockup: "EST. 2026 · CTG",
  assets: {
    primary: "/manus-storage/scrollverse-spiral-signature-2026_15bfad34.png",
    emoji: "/manus-storage/scrollverse-spiral-emoji-2026_2a5bd801.png",
    seal: "/manus-storage/scrollverse-spiral-seal-2026_9534e318.png",
  },
  qrTargetPath: "/manus-hero",
  boundaries: [
    "Unregistered concept material pending formal clearance and release review.",
    "The QR identity path may not encode credentials, private keys, session data, or hidden instructions.",
    "No marketplace, token, or purchase function is activated by this identity set.",
  ],
} as const;

export type SpiralSignatureAssetKey = keyof typeof SPIRAL_SIGNATURE.assets;
