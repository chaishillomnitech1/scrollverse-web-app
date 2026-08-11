/**
 * Supplied production blueprint recorded for planning and structural review.
 * It is not a source of truth for catalog approval, asset approval, Shopify,
 * pricing approval, impact disbursement, or commerce activation.
 */
export type SuppliedAtlantisPreflightItem = {
  setNumber: number;
  sku: string;
  title: string;
  financials: { baseCostUSD: number; retailPriceUSD: number };
  tokenGate: { pillar: string; minimumBalance: number };
  impact: { recipientReference: string; percentage: number };
  policyReferences: { refundUrl: string; termsUrl: string };
  assetReferences: { hero: string; detail: string; onBody: string };
};

export const atlantisSuppliedPreflightManifest = {
  sourceClassification: "USER_SUPPLIED_UNVERIFIED" as const,
  activationCapable: false as const,
  notes: "Structural planning data only. Asset references have not been resolved, reviewed, or added to catalog approval records.",
  regionalGrid: ["08401", "08330", "08360", "08232"],
  controlParameters: { failClosedActive: true, shopifyAuthorized: false, requiredImageCountPerSku: 3 },
  collection: [
    { setNumber: 1, sku: "XLVIII-ATL-POSEIDON-01", title: "Poseidon Heavy Tech Trench Layer", financials: { baseCostUSD: 120, retailPriceUSD: 498 }, tokenGate: { pillar: "MEIN-CORE", minimumBalance: 100 }, impact: { recipientReference: "Toronto youth design programs", percentage: 7 }, policyReferences: { refundUrl: "https://scrollverse.co", termsUrl: "https://scrollverse.co" }, assetReferences: { hero: "s3://omnitech-vault/atlantis/set1-hero-300dpi.png", detail: "s3://omnitech-vault/atlantis/set1-detail-300dpi.png", onBody: "s3://omnitech-vault/atlantis/set1-lookbook-300dpi.png" } },
    { setNumber: 2, sku: "XLVIII-ATL-NEPTUNE-02", title: "Neptune Modular Combat Shell Jacket", financials: { baseCostUSD: 95, retailPriceUSD: 348 }, tokenGate: { pillar: "ANDAR-DEPTH", minimumBalance: 100 }, impact: { recipientReference: "Canadian women in technology programs", percentage: 7 }, policyReferences: { refundUrl: "https://scrollverse.co", termsUrl: "https://scrollverse.co" }, assetReferences: { hero: "s3://omnitech-vault/atlantis/set2-hero-300dpi.png", detail: "s3://omnitech-vault/atlantis/set2-detail-300dpi.png", onBody: "s3://omnitech-vault/atlantis/set2-lookbook-300dpi.png" } },
    { setNumber: 3, sku: "XLVIII-ATL-TRIDENT-03", title: "Trident Utility Sherpa Core Vest", financials: { baseCostUSD: 70, retailPriceUSD: 278 }, tokenGate: { pillar: "BHEETAR-FRAMEWORK", minimumBalance: 100 }, impact: { recipientReference: "Ontario arts education programs", percentage: 7 }, policyReferences: { refundUrl: "https://scrollverse.co", termsUrl: "https://scrollverse.co" }, assetReferences: { hero: "s3://omnitech-vault/atlantis/set3-hero-300dpi.png", detail: "s3://omnitech-vault/atlantis/set3-detail-300dpi.png", onBody: "s3://omnitech-vault/atlantis/set3-lookbook-300dpi.png" } },
    { setNumber: 4, sku: "XLVIII-ATL-MARIANA-04", title: "Mariana Deep Indigo Tailored Blazer", financials: { baseCostUSD: 110, retailPriceUSD: 428 }, tokenGate: { pillar: "MEIN-MEDIUM", minimumBalance: 100 }, impact: { recipientReference: "Harlem pediatric community support", percentage: 10 }, policyReferences: { refundUrl: "https://scrollverse.co", termsUrl: "https://scrollverse.co" }, assetReferences: { hero: "s3://omnitech-vault/atlantis/set4-hero-300dpi.png", detail: "s3://omnitech-vault/atlantis/set4-detail-300dpi.png", onBody: "s3://omnitech-vault/atlantis/set4-lookbook-300dpi.png" } },
    { setNumber: 5, sku: "XLVIII-ATL-OCEANIC-05", title: "Oceanic Axis Quad-Zip Cargo", financials: { baseCostUSD: 85, retailPriceUSD: 298 }, tokenGate: { pillar: "MEIN-CORE", minimumBalance: 100 }, impact: { recipientReference: "Independent artists fund", percentage: 7 }, policyReferences: { refundUrl: "https://scrollverse.co", termsUrl: "https://scrollverse.co" }, assetReferences: { hero: "s3://omnitech-vault/atlantis/set5-hero-300dpi.png", detail: "s3://omnitech-vault/atlantis/set5-detail-300dpi.png", onBody: "s3://omnitech-vault/atlantis/set5-lookbook-300dpi.png" } },
    { setNumber: 6, sku: "XLVIII-ATL-ABYSSAL-06", title: "Abyssal Trilogy Double-Sole Footwear", financials: { baseCostUSD: 105, retailPriceUSD: 368 }, tokenGate: { pillar: "FACTORY-PASS", minimumBalance: 500 }, impact: { recipientReference: "NJ/NY design scholarship fund", percentage: 10 }, policyReferences: { refundUrl: "https://scrollverse.co", termsUrl: "https://scrollverse.co" }, assetReferences: { hero: "s3://omnitech-vault/atlantis/set6-hero-300dpi.png", detail: "s3://omnitech-vault/atlantis/set6-detail-300dpi.png", onBody: "s3://omnitech-vault/atlantis/set6-lookbook-300dpi.png" } },
    { setNumber: 7, sku: "XLVIII-ATL-METATRON-07", title: "Metatron Fibonacci Low-Chassis", financials: { baseCostUSD: 130, retailPriceUSD: 485 }, tokenGate: { pillar: "FACTORY-PASS", minimumBalance: 500 }, impact: { recipientReference: "NJ/NY design scholarship fund", percentage: 10 }, policyReferences: { refundUrl: "https://scrollverse.co", termsUrl: "https://scrollverse.co" }, assetReferences: { hero: "s3://omnitech-vault/atlantis/set7-hero-300dpi.png", detail: "s3://omnitech-vault/atlantis/set7-detail-300dpi.png", onBody: "s3://omnitech-vault/atlantis/set7-lookbook-300dpi.png" } },
  ] satisfies SuppliedAtlantisPreflightItem[],
};

export function validateSuppliedAtlantisPreflight() {
  const structuralIssues: string[] = [];
  if (atlantisSuppliedPreflightManifest.collection.length !== 7) structuralIssues.push("The supplied manifest must describe exactly seven SKUs.");
  if (atlantisSuppliedPreflightManifest.activationCapable) structuralIssues.push("Preflight manifests must never be activation-capable.");
  if (atlantisSuppliedPreflightManifest.controlParameters.shopifyAuthorized) structuralIssues.push("Shopify authorization may not be inferred from a supplied blueprint.");

  for (const item of atlantisSuppliedPreflightManifest.collection) {
    if (!item.sku || item.financials.baseCostUSD <= 0 || item.financials.retailPriceUSD <= 0 || item.financials.retailPriceUSD < item.financials.baseCostUSD) structuralIssues.push(`${item.sku}: financial fields are structurally invalid.`);
    if (item.impact.percentage < 7 || item.impact.percentage > 10) structuralIssues.push(`${item.sku}: impact allocation must remain between 7% and 10%.`);
    if (!item.assetReferences.hero || !item.assetReferences.detail || !item.assetReferences.onBody) structuralIssues.push(`${item.sku}: three asset references are required for structural completeness.`);
  }

  return {
    sourceClassification: atlantisSuppliedPreflightManifest.sourceClassification,
    structuralReady: structuralIssues.length === 0,
    activationCapable: false as const,
    structuralIssues,
    activationNotice: "This preflight check never writes to the database, resolves asset paths, approves records, connects Shopify, creates products, or enables checkout.",
  };
}
