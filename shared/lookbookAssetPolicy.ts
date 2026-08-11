export type AssetReviewResult = { eligible: boolean; reasons: string[] };

/**
 * Validate only source references for a review manifest. This does not upload,
 * transform, approve, publish, or associate an asset with inventory.
 */
export function validateLookbookAssetReferences(references: string[]): AssetReviewResult {
  const reasons: string[] = [];
  if (!references.length) reasons.push("No asset references were provided.");
  for (const reference of references) {
    const normalized = reference.trim().toLowerCase();
    if (!normalized) reasons.push("An asset reference is empty.");
    else if (normalized.startsWith("s3://")) reasons.push(`${reference}: use a browser-deliverable secure URL, not an s3:// placeholder.`);
    else if (normalized.includes("placeholder") || normalized.includes("staging")) reasons.push(`${reference}: placeholder or staging references cannot be approved product imagery.`);
    else if (!normalized.startsWith("https://") && !normalized.startsWith("/manus-storage/")) reasons.push(`${reference}: use HTTPS or a managed storage path.`);
  }
  return { eligible: reasons.length === 0, reasons };
}
