import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const home = fs.readFileSync(path.join(root, "client/src/pages/Home.tsx"), "utf8");
const aiHub = fs.readFileSync(path.join(root, "client/src/pages/AIConstellationHub.tsx"), "utf8");
const currency = fs.readFileSync(path.join(root, "client/src/pages/ExchangeCurrencies.tsx"), "utf8");
const payment = fs.readFileSync(path.join(root, "client/src/components/commerce/PaymentRailOptions.tsx"), "utf8");
const crypto = fs.readFileSync(path.join(root, "client/src/pages/CryptoHub.tsx"), "utf8");
const token = fs.readFileSync(path.join(root, "client/src/pages/TokenStore.tsx"), "utf8");

describe("ScrollVerse named-roster and constellation reconciliation", () => {
  it("keeps Muse canonical and preserves the separate story-world lane", () => {
    expect(home).toContain("16 LEGION + 9 NAMED");
    expect(home).not.toContain("14 Sovereign Beings");
    expect(home).toContain('name: "Muse"');
    expect(aiHub).toContain('name: "Muse"');
    for (const name of ["Luma Vale", "Orin Bridge", "Kairo Sol", "Mira Thread"]) expect(home).toContain(name);
    expect(home).toContain("separate from the canonical 16-member AI Legion roster");
  });

  it("names every required homepage constellation surface", () => {
    for (const surface of [
      "Restored ScrollVerse hub", "GitHub mirror", "Vault", "Atlas", "Bookshelf", "SovereignHub",
      "Omnitech1", "The Table", "Mika-Solara", "Shopify XLVIIIblocks", "Pinterest",
      "YouTube · @chaishill-u1z", "Facebook", "Instagram", "TikTok", "X", "Newsletter",
    ]) expect(home).toContain(surface);
    expect(home).not.toContain("Knicks campaign disclaimer");
  });

  it("uses source-record currency language and display-only payment rails", () => {
    expect(currency).not.toContain("LIVE · ALL DIMENSIONS");
    expect(currency).toContain("SOURCE RECORD · ILLUSTRATIVE VALUES");
    expect(payment).toContain("displayOnly");
    expect(crypto).toContain("<PaymentRailOptions displayOnly />");
    expect(token).toContain("<PaymentRailOptions displayOnly />");
  });
});
