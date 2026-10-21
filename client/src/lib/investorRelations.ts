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

export function filterInvestorRelationRecords(kind: "all" | InvestorRelationRecord["kind"]) {
  return INVESTOR_RELATIONS_RECORDS.filter((record) => kind === "all" || record.kind === kind);
}

export function sortInvestorRelationRecords(
  records: readonly InvestorRelationRecord[],
  sort: "title-asc" | "title-desc" | "kind",
) {
  return [...records].sort((a, b) => {
    if (sort === "kind") return a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title);
    const comparison = a.title.localeCompare(b.title);
    return sort === "title-desc" ? -comparison : comparison;
  });
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export function buildInvestorRelationsCsv(records: readonly InvestorRelationRecord[] = INVESTOR_RELATIONS_RECORDS) {
  const header = ["id", "kind", "title", "description", "sourceLabel", "displayScope", "href"];
  const rows = records.map((record) => [record.id, record.kind, record.title, record.description, record.sourceLabel, record.displayScope, record.href]);
  return [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function buildInvestorRelationsPdfText(records: readonly InvestorRelationRecord[] = INVESTOR_RELATIONS_RECORDS) {
  const summary = getInvestorRelationSummary(records);
  return [
    "ScrollVerse Investor Relations Catalog",
    "Source-labeled local display",
    `Records: ${summary.total} · Still: ${summary.stills} · Motion: ${summary.motion}`,
    "",
    ...records.map((record) => `${record.title} | ${record.kind} | ${record.sourceLabel}`),
  ].join("\n");
}
