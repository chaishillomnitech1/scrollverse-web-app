import { describe, expect, it } from "vitest";
import {
  getStaticSovereignCatalog,
  isMissingOptionalLibraryTableError,
} from "./routers/library";

describe("optional library table fallback", () => {
  it("recognizes a missing scrollverse_books table error", () => {
    expect(
      isMissingOptionalLibraryTableError(
        new Error("Failed query: select `id` from `scrollverse_books` limit ?")
      )
    ).toBe(true);
  });

  it("does not swallow unrelated database failures", () => {
    expect(isMissingOptionalLibraryTableError(new Error("connection reset"))).toBe(false);
  });

  it("provides a stable static catalog when the optional table is unavailable", () => {
    const catalog = getStaticSovereignCatalog();
    expect(catalog.length).toBeGreaterThan(0);
    expect(catalog[0]).toMatchObject({
      slug: "vaultbook-xv-scroll-of-scrolls",
      title: "VaultBook XV: The Scroll of Scrolls",
      downloadCount: 0,
    });
  });
});
