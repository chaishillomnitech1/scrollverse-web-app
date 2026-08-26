import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 225 XLVIII Blocks interiors monograph", () => {
  it("keeps the luxury editorial page source-labeled, collectible-ready, and reader-centered", () => {
    const page = read("client/src/pages/XLVIIIBlocksMonograph.tsx");
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const research = read("docs/phase225-xlviii-blocks-monograph-research.md");
    const collectible = read("docs/phase225-xlviii-blocks-collectible-readiness.md");
    expect(page).toContain("XLVIII");
    expect(page).toContain("SOURCE + READER LENS");
    expect(page).toContain("not minted, listed, or for sale");
    expect(page).toContain("Reader invitation:");
    expect(app).toContain('import XLVIIIBlocksMonograph from "./pages/XLVIIIBlocksMonograph"');
    expect(app).toContain('<Route path="/xlviii-blocks-monograph" component={XLVIIIBlocksMonograph} />');
    expect(home).toContain('href: "/xlviii-blocks-monograph"');
    expect(research).toContain("Visit Atlantic City");
    expect(research).toContain("ps-email-airdrop");
    expect(collectible).toContain("does not create an NFT");
  });
});
