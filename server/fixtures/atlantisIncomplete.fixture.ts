/**
 * Non-production test data only. The `.invalid` domain is deliberately
 * non-resolving, and every record remains unapproved. This fixture must never
 * be written to the catalog database or displayed as production catalog data.
 */
const ATLANTIS_SKUS = [
  "XLVIII-ATL-POSEIDON-01",
  "XLVIII-ATL-NEPTUNE-02",
  "XLVIII-ATL-TRIDENT-03",
  "XLVIII-ATL-MARIANA-04",
  "XLVIII-ATL-OCEANIC-05",
  "XLVIII-ATL-ABYSSAL-06",
  "XLVIII-ATL-METATRON-07",
];

export const incompleteAtlantisFixture = {
  hasShopifyAuthorization: false,
  config: {
    shopifyAuthorized: false,
    shopifyShopDomain: null,
    taxPolicyUrl: null,
    shippingPolicyUrl: null,
    refundPolicyUrl: null,
    customerSupportEmail: null,
    impactDisclosureUrl: null,
  },
  manufacturers: [{ id: 1, agreementUrl: null, sampleEvidenceUrl: null, complianceStatus: "PENDING" as const }],
  recipients: [{ id: 1, agreementUrl: null, paymentDestination: null, allocationBasisPoints: 0, status: "PENDING" as const }],
  skus: ATLANTIS_SKUS.map(sku => ({
    sku,
    manufacturerId: 1,
    impactRecipientId: 1,
    baseCostCents: 0,
    retailPriceCents: 0,
    taxClassification: null,
    fulfillmentCenter: null,
    refundPolicyUrl: null,
    productionStatus: "DRAFT" as const,
  })),
  assets: ATLANTIS_SKUS.flatMap(sku =>
    (["HERO", "DETAIL", "ON_BODY"] as const).map(assetKind => ({
      sku,
      assetKind,
      assetUrl: `https://fixtures.invalid/atlantis/${sku.toLowerCase()}/${assetKind.toLowerCase()}.webp`,
      reviewStatus: "PENDING" as const,
    })),
  ),
};

export const ATLANTIS_FIXTURE_DISCLAIMER =
  "Non-production fixture only. It contains no real images, suppliers, agreements, prices, recipient terms, or Shopify authorization.";
