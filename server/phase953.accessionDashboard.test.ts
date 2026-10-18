import { describe, expect, it } from "vitest";
import {
  ACCESSION_RECORDS,
  filterAccessionRecords,
  getAccessionProfile,
  getAccessionStatusSummary,
} from "@/lib/accessionRecords";

describe("Phase 953 — accession records dashboard", () => {
  it("filters by filename, classification, and display scope", () => {
    expect(filterAccessionRecords(ACCESSION_RECORDS, "Cosmic_Comedian").map((record) => record.filename)).toContain("Cosmic_Comedian_The_Big_Bang_Gag.mp4");
    expect(filterAccessionRecords(ACCESSION_RECORDS, "implementation/archive").every((record) => record.classification.includes("implementation"))).toBe(true);
    expect(filterAccessionRecords(ACCESSION_RECORDS, "metadata-only").length).toBe(ACCESSION_RECORDS.length);
  });

  it("returns an honest local status summary without implying media availability", () => {
    const summary = getAccessionStatusSummary(ACCESSION_RECORDS);
    expect(summary.total).toBe(ACCESSION_RECORDS.length);
    expect(summary.metadataOnly).toBe(ACCESSION_RECORDS.length);
    expect(summary.media).toBeGreaterThan(10);
    expect(summary.externalActions).toBe("none");
  });

  it("provides a read-only profile with exact hash and metadata for a selected record", () => {
    const record = ACCESSION_RECORDS[0];
    expect(getAccessionProfile(record.filename)).toEqual({
      filename: record.filename,
      bytes: record.bytes,
      sha256: record.sha256,
      classification: record.classification,
      displayScope: "metadata-only",
      accessionDate: "2026-10-18",
    });
    expect(getAccessionProfile("missing-record")).toBeNull();
  });
});
