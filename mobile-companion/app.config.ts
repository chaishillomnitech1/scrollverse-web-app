import type { ExpoConfig } from "expo/config";

/** Source kit only: the owner chooses store-bound identifiers before native distribution. */
const config: ExpoConfig = {
  name: "ScrollVerse Mobile Companion",
  slug: "scrollverse-mobile-companion",
  version: "0.1.0",
  orientation: "portrait",
  scheme: "scrollversecompanion",
  userInterfaceStyle: "dark",
  newArchEnabled: true,
  ios: { supportsTablet: true },
  android: { edgeToEdgeEnabled: true },
  plugins: ["expo-router"],
  experiments: { typedRoutes: true },
};

export default config;
