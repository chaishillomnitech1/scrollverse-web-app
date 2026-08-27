import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";

export const PORTAL_ORIGIN = "https://scrollverse.co";
export const PORTAL_PATHS = {
  signal: "/",
  omniland: "/omniland",
  cinematicGateway: "/omniland-cinematic-gateway",
  digitalDna: "/creator-digital-dna",
  mirror: "/chais-sabir-allah-mirror",
  create: "/episode-brief-builder",
  sources: "/connected-source-registry",
  specialRepository: "/special-repository",
  worldLens: "/world-lens",
} as const;

export async function openPortal(path: (typeof PORTAL_PATHS)[keyof typeof PORTAL_PATHS]) {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  await Linking.openURL(`${PORTAL_ORIGIN}${path}`);
}
