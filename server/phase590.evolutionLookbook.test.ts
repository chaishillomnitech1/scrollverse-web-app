import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 590 — Evolution Lookbook", () => {
  it("registers the browser-local public-choice lookbook and its main-page discovery handoff", () => {
    const app = read("client/src/App.tsx");
    const home = read("client/src/pages/Home.tsx");
    const page = read("client/src/pages/EvolutionLookbook.tsx");

    expect(app).toContain('path={"/evolution-lookbook"}');
    expect(home).toContain('href: "/evolution-lookbook"');
    expect(page).toContain("OWNER-AUTHORED VISUAL EXHIBIT · PUBLIC CHOICE");
    expect(page).toContain("PUBLIC BROWSER EXHIBIT");
    expect(page).toContain("Twenty-five visual accessions");
    expect(page).toContain("CREATOR-FIRST COLLECTION LENSES");
    expect(page).toContain("SOURCE-LABELED COLLECTION GROUPS");
    expect(page).toContain("Motion");
    expect(page).toContain("SV-EVO-015");
    expect(page).toContain("SV-EVO-016");
    expect(page).toContain("SV-EVO-017");
    expect(page).toContain("SV-EVO-018");
    expect(page).toContain("SV-EVO-019");
    expect(page).toContain("SV-EVO-020");
    expect(page).toContain("SV-EVO-021");
    expect(page).toContain("SV-EVO-022");
    expect(page).toContain("SV-EVO-023");
    expect(page).toContain("SV-EVO-024");
    expect(page).toContain("SV-EVO-025");
    expect(page).toContain("Vineland Signal Studio");
    expect(page).toContain("Threefold Signal Diagram");
    expect(page).toContain("XLVIII Blocks Chronicles: The Sovereign Grid Awakens");
    expect(page).toContain("AI Legion: Apex Knowledge Visual");
    expect(page).toContain("ChaisTheGreat: Visual Empire Protector");
    expect(page).toContain("Chais: Holographic Identity Pack");
    expect(page).toContain("Chais: Black-and-Gold Sovereign Poster");
    expect(page).toContain("STR8 DROP: Chest Crest Apparel Record");
    expect(page).toContain("STR8 DROP: Front Crest Apparel Record");
    expect(page).toContain("STR8 DROP: Purity Brand Apparel Record");
    expect(page).toContain('href="/creator-books"');
    expect(page).toContain('href="/tutorial-studio"');
  });

  it("keeps token, pricing, marketplace, and legal-outcome claims outside the active exhibit", () => {
    const page = read("client/src/pages/EvolutionLookbook.tsx");
    const evidence = read("docs/phase590-evolution-lookbook-asset-evidence.md");

    expect(page).toContain("This page is a visual exhibit");
    expect(page).toContain("not as a live financial, token, or marketplace feed");
    expect(evidence).toContain("artwork content");
    expect(evidence).toContain("No price, profit, token, contract");
  });

  it("keeps a complete source and duplicate-cluster record for the visual intake", () => {
    const evidence = read("docs/phase590-evolution-lookbook-asset-evidence.md");
    const manifest = read("docs/phase590-direct-source-manifest.md");

    expect(evidence).toContain("Full Direct-Source Manifest");
    expect(manifest).toContain("Per-File Source Record");
    expect(manifest).toContain("Duplicate-Hash Clusters");
    expect(manifest).toContain("SV-EVO-015");
    expect(manifest).toContain("requires owner display review");
  });

  it("adds direct-review evidence for the newest browser-local visual accessions", () => {
    const review = read("docs/phase596-evolution-lookbook-visual-review.md");

    expect(review).toContain("SV-EVO-016");
    expect(review).toContain("SV-EVO-017");
    expect(review).toContain("9f0a66b3996d687231fd44f6d11827ffaacdf83e00aae07f1ba328dc4000db48");
    expect(review).toContain("0b0acfa24ee9e44a759db7d261ff77b9ed0c1e0cdc8c5212e00b21846aecb966");
  });

  it("keeps third-party music references separate while documenting the selected comic-cover accession", () => {
    const review = read("docs/phase597-evolution-lookbook-visual-review.md");

    expect(review).toContain("SV-EVO-018-CANDIDATE");
    expect(review).toContain("requires an item-specific public display decision");
    expect(review).toContain("SV-EVO-018");
    expect(review).toContain("dcdf8d93bd0765515d506eb8c82ec05bb22c0759762e01ef7d9918bf9535edef");
  });

  it("documents the AI Legion visual while keeping named music-storyboard material out of the public exhibit", () => {
    const review = read("docs/phase598-evolution-lookbook-visual-review.md");

    expect(review).toContain("SV-EVO-019-CANDIDATE");
    expect(review).toContain("requires an item-specific public-display decision");
    expect(review).toContain("SV-EVO-019");
    expect(review).toContain("b0b7f16d8fe9a1643930ee0cb70c9eaf748d5f415225758fbc896622c009459a");
  });

  it("preserves third-party-marked fashion concepts while documenting the owner-branded character visual", () => {
    const review = read("docs/phase599-creator-first-visual-source-set-review.md");

    expect(review).toContain("SV-EVO-020-CANDIDATE");
    expect(review).toContain("requires an item-specific public-display decision");
    expect(review).toContain("SV-EVO-020");
    expect(review).toContain("36ef0ce10030346c4cbe530f08c3d99303bfd08706bacb3394402f877107c935");
  });

  it("documents the reviewed identity visual pack and poster as artwork-only accessions", () => {
    const review = read("docs/phase600-visual-source-boundary-review.md");

    expect(review).toContain("SV-EVO-021");
    expect(review).toContain("SV-EVO-022");
    expect(review).toContain("7b46ca25db1f07078afc9ed9de6d0708c7677c7d5ea94beeed5ce3fe5a1fc6d0");
    expect(review).toContain("f94005fea366ad953e3ce20b1f89f6e796863180d190e98d87aa5bf69a0f2a56");
  });

  it("documents physical apparel photographs as display-only archive accessions", () => {
    const review = read("docs/phase601-unrepresented-visual-archive-review.md");

    expect(review).toContain("SV-PHYS-APP-001");
    expect(review).toContain("SV-PHYS-APP-002");
    expect(review).toContain("f36759c13421aaecf45c38f4dc330f1b9fcd5241a635e6e3acc24807b6508157");
    expect(review).toContain("c8e05fb9f6ee2d13f39d7e46deaf65fd67dec2b54eb1484986df132bc369d939");
  });

  it("documents the Purity Brand apparel image while retaining the third-party-marked fashion board as a protected reference", () => {
    const review = read("docs/phase604-continued-archive-review.md");

    expect(review).toContain("SV-PHYS-APP-003");
    expect(review).toContain("SV-REF-FASH-004");
    expect(review).toContain("not selected for browser-local exhibit");
    expect(review).toContain("c2bf7852723018d12ace40a7bc5b9ee1d98dfed9c0548cd413358ef3260b8312");
  });
});
