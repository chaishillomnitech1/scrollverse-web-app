import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 697–698 — Source Convergence and Sovereignty Infrastructure", () => {
  it("preserves the five protected source records and their duplicate relationship", () => {
    const page = read("client/src/pages/ProtectedSourceConvergence.tsx");
    expect(page).toContain("Pasted_content_04.txt");
    expect(page).toContain("Pasted_content_26.txt");
    expect(page).toContain("byte-identical");
    expect(page).toContain("No paywall, API billing");
  });

  it("documents portability through official Vercel, Netlify, and Railway references", () => {
    const page = read("client/src/pages/SovereigntyInfrastructureRecord.tsx");
    expect(page).toContain("https://vercel.com/docs/deployments");
    expect(page).toContain("https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/");
    expect(page).toContain("https://docs.railway.com/guides/static-hosting");
    expect(page).toContain("scrollverse.co");
  });

  it("registers both new pages and carries the consoleless Omniland roadmap", () => {
    const app = read("client/src/App.tsx");
    const gameWorlds = read("client/src/pages/GameWorldsStudio.tsx");
    expect(app).toContain("/protected-source-convergence");
    expect(app).toContain("/sovereignty-infrastructure-record");
    expect(gameWorlds).toContain("OMNILAND_DEVICE_PATHS");
    expect(gameWorlds).toContain("Console compatibility");
    expect(gameWorlds).toContain("CONSOLELESS UNIVERSE ROADMAP");
  });
});
