import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 580 Creator Books Publishing Desk", () => {
  it("registers a source-led books desk with per-title accessibility and release controls", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const desk = read("client/src/pages/CreatorBooksPublishingDesk.tsx");

    expect(app).toContain('import CreatorBooksPublishingDesk from "./pages/CreatorBooksPublishingDesk"');
    expect(app).toContain('<Route path={"/creator-books"} component={CreatorBooksPublishingDesk} />');
    expect(home).toContain('title: "Creator Books Publishing Desk"');
    expect(home).toContain('label: "Creator Books", href: "/creator-books"');
    expect(desk).toContain("Creator Books Publishing Desk");
    expect(desk).toContain("Book of the Journey");
    expect(desk).toContain("Owner Manuscript Archive");
    expect(desk).toContain("Visual & Voice Editions");
    expect(desk).toContain("ACCESSIBILITY IS PART OF THE EDITION");
    expect(desk).toContain("EXACT OWNER-RELEASE GATE");
    expect(desk).toContain("No manuscript upload, cover generation, narrator creation, retailer or distributor connection");
    expect(desk).toContain("Copy release brief");
  });
});
