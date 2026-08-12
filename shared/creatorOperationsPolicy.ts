export const CREATOR_OPERATIONS_BOUNDARY = "Completeness feedback only; this is not external-store acceptance, not legal clearance, and not commercial approval.";

export function canSubmitReleaseAssetForFeedback(reviewStatus: string) {
  return reviewStatus === "DRAFT" || reviewStatus === "NEEDS_INFO";
}
