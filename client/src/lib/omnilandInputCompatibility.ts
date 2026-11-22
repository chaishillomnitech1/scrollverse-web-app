export type InputModeId =
  | "console-pad"
  | "xr-headset-glasses"
  | "tv"
  | "phone"
  | "keyboard"
  | "touch";

export type CapabilityState = "detected" | "available" | "browser support signal" | "fallback";

export type InputCompatibilityMode = {
  id: InputModeId;
  label: string;
  detail: string;
  capability: "gamepadApi" | "webXr" | "tv" | "phone" | "keyboard" | "touch";
};

export type OmnilandCapabilities = {
  gamepadApi: boolean;
  webXr: boolean;
  webGpu: boolean;
  pwa: boolean;
};

type NavigatorLike = {
  getGamepads?: () => ArrayLike<unknown> | null;
  xr?: unknown;
  gpu?: unknown;
  maxTouchPoints?: number;
  userAgent?: string;
  standalone?: boolean;
};

type WindowLike = {
  matchMedia?: (query: string) => { matches: boolean };
};

export const inputCompatibilityModes: readonly InputCompatibilityMode[] = [
  { id: "console-pad", label: "CONSOLE PADS", detail: "Use a player-owned game-system controller through the browser Gamepad API.", capability: "gamepadApi" },
  { id: "xr-headset-glasses", label: "OCULUS / META XR", detail: "Headsets and glasses can join when the browser reports WebXR support.", capability: "webXr" },
  { id: "tv", label: "TV", detail: "Bring the client to a connected TV and pair the input you already own.", capability: "tv" },
  { id: "phone", label: "PHONE", detail: "Use a phone as a touch-first client or companion input surface.", capability: "phone" },
  { id: "keyboard", label: "KEYBOARD", detail: "Keyboard fallback keeps the play path reachable without a controller.", capability: "keyboard" },
  { id: "touch", label: "TOUCH", detail: "Touch fallback supports phones, tablets, and touch displays.", capability: "touch" },
] as const;

function readNavigator(source?: NavigatorLike): NavigatorLike | undefined {
  if (source) return source;
  if (typeof navigator !== "undefined") return navigator as NavigatorLike;
  return undefined;
}

export function detectOmnilandCapabilities(source?: NavigatorLike): OmnilandCapabilities {
  const nav = readNavigator(source);
  const windowLike = typeof window !== "undefined" ? (window as WindowLike) : undefined;
  const gamepadApi = typeof nav?.getGamepads === "function";
  const webXr = Boolean(nav?.xr);
  const webGpu = Boolean(nav?.gpu);
  const touch = Boolean((nav?.maxTouchPoints ?? 0) > 0);
  const pwa = Boolean(
    nav?.standalone ||
      windowLike?.matchMedia?.("(display-mode: standalone)")?.matches,
  );

  return { gamepadApi, webXr, webGpu, pwa: Boolean(pwa) };
}

export function capabilityStateForMode(
  mode: InputCompatibilityMode,
  capabilities: OmnilandCapabilities,
): CapabilityState {
  if (mode.capability === "keyboard") return "fallback";
  if (mode.capability === "touch") return capabilities.gamepadApi || capabilities.webXr ? "available" : "fallback";
  if (mode.capability === "tv" || mode.capability === "phone") return "browser support signal";
  return capabilities[mode.capability] ? "detected" : "browser support signal";
}
