import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { createNarrativeRouteCsv, createNarrativeRoutePdf } from "../client/src/lib/narrativeRouteExport";

const ROOT = process.cwd();
const libraryPath = path.join(ROOT, "client/src/lib/narrativeRouteExport.ts");

describe("Phase 907 — narrative route export", () => {
  it("provides browser-local formatted PDF and CSV exports with an explicit source boundary", () => {
    expect(existsSync(libraryPath)).toBe(true);
    if (!existsSync(libraryPath)) return;

    const library = readFileSync(libraryPath, "utf8");
    expect(library).toContain("NarrativeRouteExport");
    expect(library).toContain("createNarrativeRouteCsv");
    expect(library).toContain("downloadNarrativeRoutePdf");
    expect(library).toContain("downloadNarrativeRouteCsv");
    expect(library).toContain("browser-local");
    expect(library).toContain("application/pdf");
    expect(library).toContain("text/csv");
  });

  it("builds portable CSV and standard PDF content without a network dependency", async () => {
    const record = {
      title: "Example narrative blueprint",
      route: "/example-narrative",
      scope: "Narrative-only planning record.",
      sections: [{ number: 1, title: "First source record", status: "source-backed", summary: "A bounded planning summary." }],
    };

    const csv = createNarrativeRouteCsv(record);
    const pdf = createNarrativeRoutePdf(record);

    expect(csv).toContain("Narrative-only browser-local export");
    expect(csv).toContain("First source record");
    expect(pdf.type).toBe("application/pdf");
    expect(await pdf.text()).toContain("%PDF-1.4");
  });
});
