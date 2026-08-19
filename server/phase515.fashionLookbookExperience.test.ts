import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 515 immersive fashion lookbook experience", () => {
  it("registers the immersive fashion lookbook route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('import FashionLookbookExperience from "./pages/FashionLookbookExperience"');
    expect(app).toContain('<Route path="/fashion-lookbook-experience" component={FashionLookbookExperience} />');
  });

  it("keeps original visual worlds interactive and source-labeled", () => {
    const page = read("client/src/pages/FashionLookbookExperience.tsx");
    expect(page).toContain("Six Sigil Field Study");
    expect(page).toContain("Night Drop Signal");
    expect(page).toContain("Sinking Abyss Light Study");
    expect(page).toContain("VIEWING MOOD");
    expect(page).toContain("SILHOUETTE SELECTOR");
    expect(page).toContain("CURRENT CONCEPT RECORD");
  });

  it("keeps the visual experience fail-closed and discoverable from key fashion paths", () => {
    const page = read("client/src/pages/FashionLookbookExperience.tsx");
    const home = read("client/src/pages/Home.tsx");
    const empire = read("client/src/pages/FashionEmpire.tsx");
    const meta = read("client/src/pages/MetaAIArtifactsLookbooks.tsx");
    expect(page).toContain("does not create a garment, sample, vendor order, product record, inventory, price, license, campaign, media player, listing, checkout, payment, token, wallet action, or publication");
    expect(home).toContain('href: "/fashion-lookbook-experience"');
    expect(empire).toContain('href="/fashion-lookbook-experience"');
    expect(meta).toContain('href="/fashion-lookbook-experience"');
  });
});
