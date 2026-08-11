import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readProjectFile = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("Phase 94 route map", () => {
  const app = readProjectFile("client/src/App.tsx");

  it("registers each Fashion Empire route with its page component", () => {
    expect(app).toContain('import VirgilAbloh from "./pages/VirgilAbloh"');
    expect(app).toContain('import FashionEmpire from "./pages/FashionEmpire"');
    expect(app).toContain('import AtlantisCollection from "./pages/AtlantisCollection"');
    expect(app).toContain('import EmpireIndex from "./pages/EmpireIndex"');
    expect(app).toContain('<Route path="/virgil-abloh" component={VirgilAbloh} />');
    expect(app).toContain('<Route path="/fashion-empire" component={FashionEmpire} />');
    expect(app).toContain('<Route path="/atlantis-collection" component={AtlantisCollection} />');
    expect(app).toContain('<Route path="/empire-index" component={EmpireIndex} />');
  });

  it("registers the MEIN lookbook and keeps it explicitly proprietary", () => {
    const mein = readProjectFile("client/src/pages/MeinLookbook.tsx");
    expect(app).toContain('import MeinLookbook from "./pages/MeinLookbook"');
    expect(app).toContain('<Route path="/mein" component={MeinLookbook} />');
    expect(mein).toContain("PROPRIETARY COLLECTION CONCEPT");
    expect(mein).toContain("Partner-approval required");
    expect(mein).toContain("does not claim an affiliation");
    expect(mein).toContain("ATLANTIS_CONCEPT_GALLERY");
    expect(mein).toContain("CONCEPT — NOT APPROVED FOR SALE");
    expect(mein).toContain("A generated concept visual cannot satisfy the three-image approval requirement");
  });

  it("preserves the seven-set Atlantis collection and searchable Empire Index", () => {
    const atlantis = readProjectFile("client/src/pages/AtlantisCollection.tsx");
    const index = readProjectFile("client/src/pages/EmpireIndex.tsx");
    const catalog = readProjectFile("client/src/data/atlantisCatalog.ts");
    expect(atlantis).toContain("const ATLANTIS_SETS = [");
    expect(atlantis).toContain("Sinking Abyss Aqua Pearl");
    expect(atlantis).toContain("Temple of Poseidon");
    expect(index).toContain("Every artifact.");
    expect(index).toContain("Search routes, archives, collections, protocols");
    expect(catalog).toContain("export const ATLANTIS_CATALOG");
    expect(catalog).toContain("id: \"atl-07\"");
    expect(catalog).toContain("SUPPLIER_VERIFICATION_PENDING");
    expect(catalog).toContain("AWAITING_APPROVED_IMAGE");
    expect(catalog).toContain("CHECKOUT_DISABLED");
    expect(index).toContain("ATLANTIS_CATALOG, ATLANTIS_FILTERS");
    expect(index).toContain("Filter all seven technical packs.");
    expect(index).toContain("setAtlantisCategory");
    expect(index).toContain("setAtlantisFrequency");
    expect(index).toContain("setAtlantisRegion");
    expect(index).toContain("setAtlantisAssetStatus");
    expect(index).toContain("setAtlantisCommerceStatus");
  });
});
