export type IpAssetKind =
  | "WORD_MARK"
  | "LOGO_OR_SIGIL"
  | "CODE_OR_BLUEPRINT"
  | "VISUAL_OR_MEDIA"
  | "STORY_OR_EDITORIAL"
  | "PRODUCT_OR_PACKAGING"
  | "INVENTION_OR_METHOD"
  | "CONFIDENTIAL_OPERATION"
  | "LICENSE_OR_REFERENCE";

export type IpEvidenceState = "NOT_STARTED" | "DOCUMENTED" | "REVIEW_READY";

export type IpAssetRecord = {
  name: string;
  kind: IpAssetKind;
  originNote: string;
  steward: string;
  evidenceState: IpEvidenceState;
  publicUse: boolean;
};

export type IpReadinessSummary = {
  total: number;
  documented: number;
  reviewReady: number;
  missingRecords: string[];
  status: "START_INVENTORY" | "DOCUMENT_ORIGIN" | "READY_FOR_PROFESSIONAL_REVIEW";
};

export const IP_ASSET_KINDS: Array<{ kind: IpAssetKind; label: string; purpose: string }> = [
  { kind: "WORD_MARK", label: "Names & Word Marks", purpose: "Names used to identify ScrollVerse experiences, studios, series, and services." },
  { kind: "LOGO_OR_SIGIL", label: "Logos & Sigils", purpose: "Original visual marks, icon families, and creator-facing symbols." },
  { kind: "CODE_OR_BLUEPRINT", label: "Code & Blueprints", purpose: "Original application code, protocols, architecture, and implementation plans." },
  { kind: "VISUAL_OR_MEDIA", label: "Visual & Media", purpose: "Illustrations, videos, audio, cover concepts, and visual-development assets." },
  { kind: "STORY_OR_EDITORIAL", label: "Stories & Editorial", purpose: "Original copy, world-building, comic briefs, podcast briefs, and documentation." },
  { kind: "PRODUCT_OR_PACKAGING", label: "Product & Packaging", purpose: "Original garment, footwear, accessory, packaging, and product-design materials pending rights and production review." },
  { kind: "INVENTION_OR_METHOD", label: "Inventions & Methods", purpose: "Original technical methods, implementation flows, and invention disclosures that may need patent or publication-timing review." },
  { kind: "CONFIDENTIAL_OPERATION", label: "Confidential Operations", purpose: "Non-public workflows, controls, and business information that may require restricted access and trade-secret handling." },
  { kind: "LICENSE_OR_REFERENCE", label: "Licenses & References", purpose: "Third-party references, partner materials, and licensed components that must remain separate from first-party ownership claims." },
];

export function evaluateIpReadiness(records: IpAssetRecord[]): IpReadinessSummary {
  const missingRecords = records
    .filter(record => !record.name.trim() || !record.originNote.trim() || !record.steward.trim() || record.evidenceState === "NOT_STARTED")
    .map(record => record.name.trim() || record.kind);
  const documented = records.filter(record => record.evidenceState !== "NOT_STARTED" && record.originNote.trim() && record.steward.trim()).length;
  const reviewReady = records.filter(record => record.evidenceState === "REVIEW_READY" && record.originNote.trim() && record.steward.trim()).length;
  const status = records.length === 0
    ? "START_INVENTORY"
    : missingRecords.length > 0
      ? "DOCUMENT_ORIGIN"
      : "READY_FOR_PROFESSIONAL_REVIEW";

  return { total: records.length, documented, reviewReady, missingRecords, status };
}
