import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync("client/src/App.tsx", "utf8");
const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const pagePath = "client/src/pages/DigitalshipAccessionDesk.tsx";

describe("Phase 904 — Digitalship Accession Desk", () => {
  it("adds a registered browser-local source-record route and central handoff", () => {
    const page = readFileSync(pagePath, "utf8");

    expect(app).toContain('const DigitalshipAccessionDesk = lazy(() => import("@/pages/DigitalshipAccessionDesk"))');
    expect(app).toContain('<Route path="/digitalship-accession" component={DigitalshipAccessionDesk} />');
    expect(home).toContain('href="/digitalship-accession"');
    expect(page).toContain("Digitalship Accession Desk");
    expect(page).toContain("RECOVER → PRESERVE → CLASSIFY → CONNECT → EXPAND → WRITE → VERIFY → PUBLISH → ARCHIVE → EVOLVE");
    expect(page).toContain("Browser-local record");
    expect(page).toContain("No file upload, external sharing, legal verification, financial action, account access, or publication action occurs here.");
  });

  it("records an exact source-selection decision locally without using or releasing the selected media", () => {
    const page = readFileSync(pagePath, "utf8");

    expect(page).toContain("EXACT SOURCE-SELECTION DECISION");
    expect(page).toContain("SOURCE FILENAME OR ID");
    expect(page).toContain("INTENDED STORY ROUTE");
    expect(page).toContain("DISPLAY TREATMENT");
    expect(page).toContain("selection:");
    expect(page).toContain("No selected file is opened, uploaded, embedded, played, transformed, or released by this record.");
  });
});
