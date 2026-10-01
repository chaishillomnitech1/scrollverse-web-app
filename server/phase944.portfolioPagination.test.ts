import { describe, expect, it } from "vitest";
import { paginatePortfolio } from "../client/src/lib/portfolioPagination";

const items = [
  { id: "a", title: "Aurora Gate", detail: "Cinematic world", category: "Worlds", label: "ORIGINAL", catalogDate: "2026-10-01" },
  { id: "b", title: "Dynasty Coin", detail: "Gold artifact", category: "Artifacts", label: "ARCHIVE", catalogDate: "2026-09-29" },
  { id: "c", title: "Music Outlet", detail: "Public releases", category: "Music", label: "OUTLET", catalogDate: "2026-09-25" },
  { id: "d", title: "Fashion Archive", detail: "Wearable looks", category: "Artifacts", label: "ORIGINAL", catalogDate: "2026-09-27" },
  { id: "e", title: "Digital DNA", detail: "Creator story", category: "Systems", label: "RECORD", catalogDate: "2026-09-24" },
];
const base = { category: "All", query: "", sort: "newest" as const, page: 1, pageSize: 2 };

describe("portfolio pagination", () => {
  it("renders only the requested page in date order without changing source order", () => {
    expect(paginatePortfolio(items, base)).toMatchObject({ total: 5, pageCount: 3, page: 1, items: [{ id: "a" }, { id: "b" }] });
    expect(paginatePortfolio(items, { ...base, page: 2 }).items.map(item => item.id)).toEqual(["d", "c"]);
    expect(items.map(item => item.id)).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("combines category and case-insensitive keyword before calculating pages", () => {
    expect(paginatePortfolio(items, { ...base, category: "Artifacts", query: " GOLD " })).toMatchObject({ total: 1, pageCount: 1, items: [{ id: "b" }] });
    expect(paginatePortfolio(items, { ...base, query: "archive" }).total).toBe(2);
  });

  it("clamps a stale page and keeps an empty result on page one", () => {
    expect(paginatePortfolio(items, { ...base, category: "Music", page: 9 })).toMatchObject({ total: 1, page: 1, pageCount: 1, items: [{ id: "c" }] });
    expect(paginatePortfolio(items, { ...base, query: "missing", page: 8 })).toMatchObject({ total: 0, page: 1, pageCount: 1, items: [] });
  });

  it("sorts oldest first and does not create an empty extra page at an exact multiple", () => {
    expect(paginatePortfolio(items, { ...base, category: "Artifacts", sort: "oldest", page: 2 })).toMatchObject({ total: 2, pageCount: 1, page: 1, items: [{ id: "d" }, { id: "b" }] });
  });
});
