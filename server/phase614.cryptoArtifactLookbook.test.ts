import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/CryptoArtifactLookbook.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const design = fs.readFileSync(path.join(root, "docs/phase614-crypto-artifact-lookbook-design.md"), "utf8");

describe("Phase 614 Crypto Artifact Lookbook", () => {
  it("defines the source-labeled cross-promotion structure", () => {
    expect(design).toContain("Crypto Artifact Lookbook");
    expect(design).toContain("Artwork record");
    expect(design).toContain("Requires exact release record");
  });

  it("offers source-labeled artifact and preparation pathway cards", () => {
    expect(page).toContain("CRYPTO ARTIFACT LOOKBOOK");
    expect(page).toContain("Exchange-and-evolution artwork");
    expect(page).toContain("Creator activation dossier");
    expect(page).toContain("does not list an item");
    expect(page).toContain("Copy visible index");
  });

  it("registers the crypto artifact lookbook route", () => {
    expect(app).toContain('import CryptoArtifactLookbook from "./pages/CryptoArtifactLookbook"');
    expect(app).toContain('<Route path={"/crypto-artifact-lookbook"} component={CryptoArtifactLookbook} />');
  });
});
