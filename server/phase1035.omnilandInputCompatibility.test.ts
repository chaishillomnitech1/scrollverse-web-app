import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { detectOmnilandCapabilities, inputCompatibilityModes } from "../client/src/lib/omnilandInputCompatibility";

const page = readFileSync("client/src/pages/Omniland.tsx", "utf8");

describe("Phase 1035 — Omniland input compatibility", () => {
  it("documents bring-your-own-input compatibility without proprietary hardware", () => {
    expect(page).toContain("BRING YOUR OWN INPUT");
    expect(page).toContain("NO PROPRIETARY CONTROLLER");
    for (const marker of ["console pads", "Oculus", "Meta", "headsets", "glasses", "TV", "phone", "keyboard", "touch", "Gamepad API", "WebXR", "WebGPU", "PWA"]) {
      expect(page).toContain(marker);
    }
    expect(inputCompatibilityModes.map((mode) => mode.id)).toEqual(expect.arrayContaining([
      "console-pad",
      "xr-headset-glasses",
      "tv",
      "phone",
      "keyboard",
      "touch",
    ]));
    expect(page).not.toContain("Buy a controller");
    expect(page).not.toContain("Purchase controller");
  });

  it("keeps capability detection browser-safe and honest in non-browser environments", () => {
    expect(detectOmnilandCapabilities(undefined)).toEqual({
      gamepadApi: false,
      webXr: false,
      webGpu: false,
      pwa: false,
    });
  });

  it("records the direct and partner lanes under the Omniland umbrella", () => {
    expect(page).toContain("PARTNER / LICENSING LANE");
    expect(page).toContain("stream-compatible");
    expect(page).toContain("established game systems");
    expect(page).toContain("console-less versions");
    expect(page).toContain("licenses");
  });
});
