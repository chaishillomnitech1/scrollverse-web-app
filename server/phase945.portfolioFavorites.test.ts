import { describe, expect, it } from "vitest";
import { readPortfolioFavorites, togglePortfolioFavorite, writePortfolioFavorites } from "../client/src/lib/portfolioFavorites";
import { paginatePortfolio } from "../client/src/lib/portfolioPagination";

const ids = ["omniland", "dynasty", "fashion", "music", "dna", "plasma", "storyworlds"];
const records = ids.map((id, index) => ({ id, title: id, category: "Worlds", detail: id, label: "SOURCE", catalogDate: `2026-10-${String(index + 1).padStart(2, "0")}` }));
const base = { category: "All", query: "", sort: "newest" as const, page: 1, pageSize: 2 };

function memoryStorage(value: string | null = null) {
  const values = new Map<string, string>();
  if (value !== null) values.set("scrollverse-portfolio-favorites-v1", value);
  return {
    getItem(key: string) { return values.get(key) ?? null; },
    setItem(key: string, item: string) { values.set(key, item); },
  };
}

describe("Phase 945 — browser-local portfolio favorites", () => {
  it("ignores malformed data, duplicates and unknown artifact IDs", () => {
    expect(readPortfolioFavorites(memoryStorage("not json"), ids)).toEqual([]);
    expect(readPortfolioFavorites(memoryStorage(JSON.stringify({ entries: ["music", "music", "secret", 9, "dna"] })), ids)).toEqual(["music", "dna"]);
    expect(readPortfolioFavorites(memoryStorage(JSON.stringify(["music", "secret", "dna"])), ids)).toEqual([]);
  });

  it("can bookmark and unbookmark a card, then restore the same state on a new read", () => {
    const storage = memoryStorage();
    const saved = togglePortfolioFavorite([], "dynasty", ids);
    expect(saved).toEqual(["dynasty"]);
    expect(writePortfolioFavorites(storage, saved)).toBe(true);
    expect(readPortfolioFavorites(storage, ids)).toEqual(["dynasty"]);
    expect(togglePortfolioFavorite(saved, "dynasty", ids)).toEqual([]);
    expect(togglePortfolioFavorite(saved, "unlisted", ids)).toEqual(saved);
  });

  it("stays usable if browser storage is disabled", () => {
    const blocked = { getItem(): string { throw new Error("blocked"); }, setItem(): void { throw new Error("blocked"); } };
    expect(readPortfolioFavorites(blocked, ids)).toEqual([]);
    expect(writePortfolioFavorites(blocked, ["music"])).toBe(false);
  });

  it("filters saved items before pagination and clamps an old page", () => {
    expect(paginatePortfolio(records, { ...base, favorites: ["dynasty", "music"], page: 8 })).toMatchObject({ total: 2, page: 1, pageCount: 1 });
    expect(paginatePortfolio(records, { ...base, favorites: ["dynasty", "music"] }).items.map(item => item.id)).toEqual(["music", "dynasty"]);
    expect(paginatePortfolio(records, { ...base, favorites: [] })).toMatchObject({ total: 0, page: 1, items: [] });
    expect(paginatePortfolio(records, base).total).toBe(7);
  });
});
