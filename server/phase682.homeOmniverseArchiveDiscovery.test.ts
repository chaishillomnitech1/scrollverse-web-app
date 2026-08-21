import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 682 homepage Omniverse archive discovery", () => {
  it("adds direct homepage handoffs for each completed source-led archive route", () => {
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("OMNIVERSE ARCHIVE · SOURCE-LED DISCOVERY");
    expect(home).toContain('href: "/omniverse-manifesto-codex"');
    expect(home).toContain('href: "/omniverse-manifesto-master-index"');
    expect(home).toContain('href: "/omniverse-manifesto-chronology"');
    expect(home).toContain('href: "/omniverse-manifesto-nodes"');
    expect(home).toContain('href: "/protected-attachment-accession"');
  });

  it("uses direct current-state labels and retains source boundaries", () => {
    const home = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
    expect(home).toContain("AVAILABLE NOW · BROWSER-LOCAL ARCHIVE ROUTES");
    expect(home).toContain("This rail is a navigation layer");
    expect(home).toContain("unseen conversations, protected files, account histories");
  });
});
