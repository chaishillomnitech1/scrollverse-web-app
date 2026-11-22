import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const page = readFileSync("client/src/pages/Omniland.tsx", "utf8");

describe("Phase 1038 — five-way coverage register", () => {
  it("names each evidence leg and keeps external registration states honest", () => {
    for (const marker of [
      "FIVE-WAY COVERAGE",
      "MANUS BUILD RECORD",
      "MUSE RECORD",
      "GIT REGISTRY",
      "VYDIA COMPOSITION",
      "ASCAP / PRO METADATA",
      "COPYRIGHT DOCUMENTATION",
      "LOCAL RECEIPT",
      "PREPARED METADATA",
      "EXTERNAL REGISTRATION",
      "NOT REGISTERED HERE",
    ]) {
      expect(page).toContain(marker);
    }
  });
});
