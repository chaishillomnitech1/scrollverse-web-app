import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const commons = readFileSync(resolve(root, "client/src/pages/KnowledgeCommons.tsx"), "utf8");
const perspectives = readFileSync(resolve(root, "client/src/pages/ScrollVersePerspectives.tsx"), "utf8");

describe("Phase 456 — Knowledge Commons and ScrollVerse Perspectives", () => {
  it("registers source-led Commons and original-writing imprint routes", () => {
    expect(router).toContain('path={"/knowledge-commons"}');
    expect(router).toContain("KnowledgeCommons");
    expect(router).toContain('path={"/scrollverse-perspectives"}');
    expect(router).toContain("ScrollVersePerspectives");
    expect(commons).toContain('useSovereignHeartbeat({ page: "knowledge-commons" })');
    expect(perspectives).toContain('useSovereignHeartbeat({ page: "scrollverse-perspectives" })');
  });

  it("keeps initial manuscript, history, and comparative-reading pathways source-labeled", () => {
    expect(commons).toContain("Nag Hammadi Archive");
    expect(commons).toContain("Digital Dead Sea Scrolls");
    expect(commons).toContain("Electronic Babylonian Library");
    expect(commons).toContain("Sefaria");
    expect(commons).toContain("Corpus Coranicum");
    expect(commons).toContain("FRASER");
    expect(commons).toContain("does not copy restricted texts in full");
    expect(commons).toContain('href="/scrollverse-perspectives"');
  });

  it("keeps original-book concepts and paid-edition work release-gated", () => {
    expect(perspectives).toContain("SCROLLVERSE PERSPECTIVES");
    expect(perspectives).toContain("The Open Scroll");
    expect(perspectives).toContain("Money, Systems, and Memory");
    expect(perspectives).toContain("REQUIRES OWNER RELEASE");
    expect(perspectives).toContain("does not publish a manuscript");
    expect(perspectives).toContain("list a book");
    expect(perspectives).not.toMatch(/book available now|price set|active storefront listing|payment destination active/i);
  });
});
