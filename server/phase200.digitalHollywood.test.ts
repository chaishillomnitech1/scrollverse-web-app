import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 200 — Digital Hollywood safeguards", () => {
  const studio = read("client/src/pages/DigitalHollywoodStudio.tsx");
  const app = read("client/src/App.tsx");
  const home = read("client/src/pages/Home.tsx");
  const junior = read("client/src/pages/JuniorMoviesStudio.tsx");
  const visuals = read("client/src/pages/Visuals.tsx");
  const music = read("client/src/pages/Music.tsx");

  it("registers and discovers the first-party Digital Hollywood route", () => {
    expect(app).toContain('import DigitalHollywoodStudio from "./pages/DigitalHollywoodStudio"');
    expect(app).toContain('<Route path="/digital-hollywood-studio" component={DigitalHollywoodStudio} />');
    expect(home).toContain('href: "/digital-hollywood-studio"');
  });

  it("keeps youth, accessibility, and commercial-release controls visible", () => {
    expect(studio).toContain("YOUTH-SUPPORTED PARTICIPATION");
    expect(studio).toContain("ACCESSIBLE MEDIA");
    expect(studio).toContain("RELEASE READINESS");
    expect(studio).toContain("No content is uploaded, distributed, sold, licensed, minted, tokenized");
  });

  it("removes simulated youth rewards and active collectible claims from remediated media surfaces", () => {
    expect(junior).toContain("No wallet, token, NFT, coin, public upload, prize, or marketplace function is active.");
    expect(junior).not.toContain("$JME Tokens");
    expect(junior).not.toContain("added to your wallet");
    expect(visuals).toContain("No mint, wallet, marketplace, token, sale, or health claim is active from this page.");
    expect(music).toContain("No investment, revenue share, token, purchase, payout, or wallet function is active.");
  });
});
