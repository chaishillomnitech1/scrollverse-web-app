import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const page = (name: string) => fs.readFileSync(path.resolve(import.meta.dirname, `../client/src/pages/${name}`), "utf8");

describe("Phase 303 cross-lane creator-directed presentation", () => {
  it("keeps catalog, books, media, artifact, and activation discovery source-labeled and state-specific", () => {
    const catalog = page("DirectFanCatalog.tsx");
    const books = page("BooksMediaReadiness.tsx");
    const media = page("JuniorMovies.tsx");
    const artifacts = page("AssetRegistry.tsx");
    const activation = page("ActivationRegister.tsx");

    expect(catalog).toContain("creator-directed catalog records");
    expect(catalog).toContain("does not set a price, accept a payment, create a checkout");
    expect(books).toContain("A factual front door for ScrollVerse books");
    expect(books).toContain("Each record separates a readable route");
    expect(media).toContain("original concept lanes for development, not released episodes");
    expect(media).toContain("SOURCE-LABELED PROGRAM PATH");
    expect(artifacts).toContain("OPERATING STATE");
    expect(activation).toContain("Live visitor paths are built item by item, never guessed into existence");
  });
});
