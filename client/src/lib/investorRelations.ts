import { metaLegionArtworks, theaterScreenings } from "./metaLegionArchive";

export type InvestorRelationRecord = {
  id: string;
  kind: "still" | "motion";
  title: string;
  description: string;
  sourceLabel: string;
  displayScope: "source-labeled local display";
  image?: string;
  video?: string;
  poster?: string;
  href: string;
};

export const INVESTOR_RELATIONS_RECORDS: InvestorRelationRecord[] = [
  ...metaLegionArtworks.slice(0, 6).map((artwork) => ({
    id: `ir-${artwork.id}`,
    kind: "still" as const,
    title: artwork.title,
    description: artwork.description,
    sourceLabel: `${artwork.evidenceLabel} · ${artwork.collection}`,
    displayScope: "source-labeled local display" as const,
    image: artwork.fullImage,
    href: "/meta-ai-legion-archive",
  })),
  ...theaterScreenings.map((screening) => ({
    id: `ir-${screening.id}`,
    kind: "motion" as const,
    title: screening.title,
    description: screening.description,
    sourceLabel: "creator-supplied · deliberate-play theater reference",
    displayScope: "source-labeled local display" as const,
    video: screening.video,
    poster: screening.poster,
    href: "/meta-ai-legion-archive",
  })),
];

export function getInvestorRelationSummary(records: readonly InvestorRelationRecord[]) {
  return {
    total: records.length,
    stills: records.filter((record) => record.kind === "still").length,
    motion: records.filter((record) => record.kind === "motion").length,
    externalActions: "none" as const,
  };
}
