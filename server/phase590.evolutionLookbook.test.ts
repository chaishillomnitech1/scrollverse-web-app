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
    expect(page).toContain("Nineteen visual accessions");
    expect(page).toContain("CREATOR-FIRST COLLECTION LENSES");
    expect(page).toContain("SOURCE-LABELED COLLECTION GROUPS");
    expect(page).toContain("Motion");
    expect(page).toContain("SV-EVO-015");
    expect(page).toContain("SV-EVO-016");
    expect(page).toContain("SV-EVO-017");
    expect(page).toContain("SV-EVO-018");
    expect(page).toContain("SV-EVO-019");
    expect(page).toContain("Vineland Signal Studio");
    expect(page).toContain("Threefold Signal Diagram");
    expect(page).toContain("XLVIII Blocks Chronicles: The Sovereign Grid Awakens");
    expect(page).toContain("AI Legion: Apex Knowledge Visual");
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
});
