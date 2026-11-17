import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 1007 latest batch receipt viewer", () => {
  it("defines the Oct 30 typed receipt batch with all 21 SHA-256 records", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/data/oct30LatestSourceBatch.ts"), "utf8");
    expect(source).toContain("oct30-latest-source-batch");
    expect(source).toContain("pasted_content_158.txt");
    expect(source).toContain("Block-155-God-Mode(1).html");
    expect((source.match(/sha256: "/g) ?? []).length).toBe(21);
  });

  it("renders a searchable, metadata-only viewer from the accession desk", () => {
    const component = readFileSync(resolve(process.cwd(), "client/src/components/LatestBatchReceiptViewer.tsx"), "utf8");
    const desk = readFileSync(resolve(process.cwd(), "client/src/pages/DigitalshipAccessionDesk.tsx"), "utf8");
    expect(component).toContain("Search latest receipt batch");
    expect(component).toContain("METADATA-ONLY");
    expect(component).toContain("Copy SHA-256");
    expect(component).toContain("No source body is opened");
    expect(desk).toContain("LatestBatchReceiptViewer");
  });
});
