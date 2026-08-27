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

async function provideHandoffFeedback() {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // Haptics are optional; a device-specific feedback failure must not block navigation.
  }
}

export async function openPortal(path: (typeof PORTAL_PATHS)[keyof typeof PORTAL_PATHS]) {
  const destination = `${PORTAL_ORIGIN}${path}`;
  const canOpen = await Linking.canOpenURL(destination);

  if (!canOpen) {
    throw new Error("This ScrollVerse destination cannot be opened on this device.");
  }

  await provideHandoffFeedback();
  await Linking.openURL(destination);
}
