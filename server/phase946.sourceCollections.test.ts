import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SOURCE_BATCHES, SOURCE_COLLECTIONS, SOURCE_TITLE_INDEX } from "../client/src/lib/sourceCollections";
import { paginatePortfolio } from "../client/src/lib/portfolioPagination";

const app = readFileSync("client/src/App.tsx", "utf8");

describe("Phase 946 — source collections", () => {
  it("matches each receipt to actual supplied bytes and newline-delimited line count", () => {
    expect(SOURCE_BATCHES).toHaveLength(15);
    for (const receipt of SOURCE_BATCHES) {
      if (receipt.id.match(/^batch-(8|9|10|11|12|13)$/)) continue;
      const bytes = readFileSync(`/home/ubuntu/upload/${receipt.filename}`);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(receipt.sha256);
      expect(bytes.byteLength).toBe(receipt.bytes);
      expect(bytes.toString().split("\n").length - (bytes.at(-1) === 10 ? 1 : 0)).toBe(receipt.lineCount);
    }
  });

  it("does not relabel earlier passages with the bytes of replacement uploads", () => {
    expect(SOURCE_BATCHES.find(item => item.id === "batch-8")?.sha256).toBe("3841d70ffefa01db292a25f7c842311782c94055b5a86f059c71d6d3db30da9e");
    expect(SOURCE_BATCHES.filter(item => item.filename === "pasted_content_8.txt")).toHaveLength(2);
    expect(SOURCE_TITLE_INDEX.find(item => item.title === "Grid Sovereign Empire V4")?.sources.some(item => item.batch === "batch-11" && item.lines[0] === 204)).toBe(true);
    expect(SOURCE_COLLECTIONS.find(item => item.id === "duat")?.sources).toContainEqual({ batch: "batch-16", lines: [304, 304] });
  });

  it("keeps canonical collections with valid source ranges and registered continuations", () => {
    expect(SOURCE_COLLECTIONS.length).toBeGreaterThanOrEqual(12);
    expect(new Set(SOURCE_COLLECTIONS.map(item => item.id)).size).toBe(SOURCE_COLLECTIONS.length);
    for (const item of [...SOURCE_COLLECTIONS, ...SOURCE_TITLE_INDEX]) {
      expect(item.catalogDate).toBe("2026-10-12");
      expect(app).toMatch(new RegExp(`path=\\{?["']${item.href}["']`));
      expect(item.sources.length).toBeGreaterThan(0);
      for (const citation of item.sources) {
        const batch = SOURCE_BATCHES.find(source => source.id === citation.batch)!;
        expect(batch).toBeDefined();
        expect(citation.lines[0]).toBeGreaterThan(0);
        expect(citation.lines[1]).toBeGreaterThanOrEqual(citation.lines[0]);
        expect(citation.lines[1]).toBeLessThanOrEqual(batch.lineCount);
      }
    }
  });

  it("preserves the three new hall proposals as cited creator concepts", () => {
    for (const id of ["black-hole-hall", "mississippi-hall", "soul-evolution-hall"]) {
      const hall = SOURCE_COLLECTIONS.find(item => item.id === id)!;
      expect(hall).toBeDefined();
      expect(hall.sources[0].batch).toBe("batch-14");
      expect(hall.label).toBe("Creator collection");
    }
  });

  it("retains repeated title occurrences without exposing the counsel draft", () => {
    expect(SOURCE_TITLE_INDEX.length).toBeGreaterThan(40);
    const repeated = SOURCE_TITLE_INDEX.find(item => item.title === "Grid Sovereign Empire V4")!;
    expect(repeated.occurrences).toBeGreaterThanOrEqual(3);
    expect(repeated.sources.filter(source => source.batch === "batch-11").map(source => source.lines[0])).toEqual([204, 209, 214]);
    const sourceTitles = SOURCE_TITLE_INDEX.map(item => item.title);
    expect(sourceTitles).not.toContain("Chais Evidence Timeline");
    expect(JSON.stringify(SOURCE_COLLECTIONS)).not.toContain("CHAIS HILL V. PRODUCTION CHAIN");
    expect(JSON.stringify(SOURCE_TITLE_INDEX)).not.toContain("EXHIBIT A");
  });

  it("filters before page slicing and preserves source-reported title labels", () => {
    const result = paginatePortfolio(SOURCE_TITLE_INDEX, { query: "Grid Sovereign", category: "All", page: 9, pageSize: 6, sort: "newest" });
    expect(result).toMatchObject({ total: 1, page: 1 });
    expect(result.items[0].label).toBe("Source title");
    expect(paginatePortfolio(SOURCE_COLLECTIONS, { query: "Haiti", category: "Stories", page: 1, pageSize: 6, sort: "newest" }).total).toBe(1);
    expect(paginatePortfolio(SOURCE_COLLECTIONS, { query: "not-a-source", category: "All", page: 1, pageSize: 6, sort: "newest" }).total).toBe(0);
  });

  it("registers an accessible gallery, portfolio and ledger entry, with local export", () => {
    expect(app).toContain('path="/source-collections"');
    const page = readFileSync("client/src/pages/SourceCollections.tsx", "utf8");
    for (const text of ["Search source collections", "Source collection pagination", "Download filtered JSON", "Source citations", "Artifact titles", "aria-pressed", "No source records match"]) expect(page).toContain(text);
    expect(page).not.toContain("dangerouslySetInnerHTML");
    expect(page).not.toMatch(/<iframe|<video|<audio/);
    expect(readFileSync("client/src/pages/Home.tsx", "utf8")).toContain('href: "/source-collections"');
    expect(readFileSync("client/src/pages/OmniversalSourceLedger.tsx", "utf8")).toContain('href="/source-collections"');
    expect(readFileSync("server/routers/portfolioSummary.ts", "utf8")).toContain("sourcecollections:");
  });
});
