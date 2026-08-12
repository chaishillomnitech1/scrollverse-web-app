export type ManusHeroStage = "OBSERVE" | "MAP" | "BUILD" | "VERIFY" | "RECORD";

export type ManusHeroCycle = {
  stage: ManusHeroStage;
  purpose: string;
  output: string;
  humanReview: boolean;
};

export const MANUS_HERO_CYCLES: ManusHeroCycle[] = [
  { stage: "OBSERVE", purpose: "Understand a creator, visitor, or system need without inventing context.", output: "Clear need statement", humanReview: false },
  { stage: "MAP", purpose: "Identify first-party routes, consent boundaries, and source-labelled external handoffs.", output: "Transparent pathway map", humanReview: false },
  { stage: "BUILD", purpose: "Create original ScrollVerse code, copy, documentation, or concept materials.", output: "Reviewable implementation", humanReview: false },
  { stage: "VERIFY", purpose: "Check types, tests, routes, and stated boundaries before release.", output: "Evidence record", humanReview: true },
  { stage: "RECORD", purpose: "Preserve a concise continuity note without exporting private chat, credentials, or hidden system data.", output: "Curated project memory", humanReview: true },
];

export function describeManusHeroCycle(stage: ManusHeroStage) {
  return MANUS_HERO_CYCLES.find(cycle => cycle.stage === stage) ?? null;
}
