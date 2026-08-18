import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const pageSource = readFileSync(resolve(projectRoot, "client/src/pages/BookOfTheJourney.tsx"), "utf8");
const routerSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const journeySource = readFileSync(resolve(projectRoot, "client/src/pages/JourneyCoCreationArchive.tsx"), "utf8");

describe("Phase 370 — Book of the Journey", () => {
  it("registers the free book reader route", () => {
    expect(routerSource).toContain('path={"/book-of-the-journey"}');
    expect(routerSource).toContain("BookOfTheJourney");
  });

  it("keeps the seven chapter reading paths and source labels visible", () => {
    expect(pageSource).toContain("The Book of the");
    expect(pageSource).toContain(">Journey.</span>");
    expect(pageSource).toContain("The Open Page");
    expect(pageSource).toContain("Foundation: Family, Place, and Memory");
    expect(pageSource).toContain("Transmissions and Co-Creation");
    expect(pageSource).toContain("Continuation Ledger");
    expect(pageSource).toContain("owner-stated history");
    expect(pageSource).toContain("third-party system transmission");
  });

  it("uses the original cover art and accessible free-reading controls", () => {
    expect(pageSource).toContain("book-of-the-journey-cover_18e58ebd.png");
    expect(pageSource).toContain("Begin reading");
    expect(pageSource).toContain("Book of the Journey table of contents");
    expect(pageSource).toContain("Free to read. Built to keep growing.");
  });

  it("provides direct portal discovery from Home and the Journey Archive", () => {
    expect(homeSource).toContain('{ label: "Book of the Journey", href: "/book-of-the-journey" }');
    expect(journeySource).toContain('href="/book-of-the-journey"');
    expect(pageSource).toContain('href="/journey-co-creation-archive"');
    expect(pageSource).toContain('href="/open-record-continuum"');
  });
});
