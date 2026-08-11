import { describe, expect, it } from "vitest";
import { EXPECTED_ATLANTIS_SKUS, evaluateAtlantisCommerceGate } from "./routers/atlantisCatalog";

function readyGateInput() {
  return {
    hasShopifyAuthorization: true,
    config: {
      shopifyAuthorized: true,
      shopifyShopDomain: "example.myshopify.com",
      taxPolicyUrl: "https://example.com/policies/tax",
      shippingPolicyUrl: "https://example.com/policies/shipping",
      refundPolicyUrl: "https://example.com/policies/refunds",
      customerSupportEmail: "support@example.com",
      impactDisclosureUrl: "https://example.com/impact",
    },
    manufacturers: [{ id: 1, agreementUrl: "https://example.com/agreement", sampleEvidenceUrl: "https://example.com/sample", complianceStatus: "APPROVED" as const }],
    recipients: [{ id: 1, agreementUrl: "https://example.com/recipient-agreement", paymentDestination: "recipient-ledger-reference", allocationBasisPoints: 800, status: "APPROVED" as const }],
    skus: EXPECTED_ATLANTIS_SKUS.map(sku => ({ sku, manufacturerId: 1, impactRecipientId: 1, baseCostCents: 10000, retailPriceCents: 18000, taxClassification: "apparel", fulfillmentCenter: "regional-node", refundPolicyUrl: "https://example.com/policies/refunds", productionStatus: "APPROVED" as const })),
    assets: EXPECTED_ATLANTIS_SKUS.flatMap(sku => (["HERO", "DETAIL", "ON_BODY"] as const).map(assetKind => ({ sku, assetKind, assetUrl: `https://example.com/assets/${sku}/${assetKind}.webp`, reviewStatus: "APPROVED" as const }))),
  };
}

describe("Atlantis commerce activation gate", () => {
  it("stays locked with no catalog records", () => {
    const result = evaluateAtlantisCommerceGate({ hasShopifyAuthorization: false, skus: [], manufacturers: [], recipients: [], assets: [] });
    expect(result.ready).toBe(false);
    expect(result.activationStatus).toBe("LOCKED");
    expect(result.blockers).toContain("Shopify authorization is not connected to the server.");
    expect(result.blockers.filter(blocker => blocker.includes("SKU record is missing."))).toHaveLength(7);
  });

  it("requires the full approved hero, detail, and on-body image set for every SKU", () => {
    const input = readyGateInput();
    input.assets = input.assets.filter(asset => !(asset.sku === EXPECTED_ATLANTIS_SKUS[0] && asset.assetKind === "ON_BODY"));
    const result = evaluateAtlantisCommerceGate(input);
    expect(result.ready).toBe(false);
    expect(result.blockers).toContain(`${EXPECTED_ATLANTIS_SKUS[0]}: approved on-body image is required.`);
  });

  it("permits a ready state only when the whole server-side evidence set is complete", () => {
    const result = evaluateAtlantisCommerceGate(readyGateInput());
    expect(result.ready).toBe(true);
    expect(result.activationStatus).toBe("READY");
    expect(result.blockers).toHaveLength(0);
    expect(result.completedSkuCount).toBe(7);
  });
});
