import { describe, expect, it } from "vitest";
import {
  ACCESSION_RECORDS,
  buildAccessionCsv,
  getAccessionPreviewKind,
  paginateAccessionRecords,
} from "@/lib/accessionRecords";

describe("Phase 954 — accession navigation", () => {
  it("paginates records with stable page metadata", () => {
    const result = paginateAccessionRecords(ACCESSION_RECORDS, 2, 10);
    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(10);
    expect(result.totalPages).toBe(Math.ceil(ACCESSION_RECORDS.length / 10));
    expect(result.records).toHaveLength(10);
    expect(result.records[0].filename).toBe(ACCESSION_RECORDS[10].filename);
  });

  it("exports filtered records as escaped CSV with a stable header", () => {
    const csv = buildAccessionCsv(ACCESSION_RECORDS.slice(0, 1));
    expect(csv.split("\n")[0]).toBe("filename,bytes,sha256,classification,displayScope,accessionDate");
    expect(csv).toContain("pasted_content_23.txt,45900,");
    expect(csv).toContain("2026-10-18");
  });

  it("classifies a related file preview without opening or playing the source", () => {
    expect(getAccessionPreviewKind("image_20261017_163556.jpg")).toBe("image");
    expect(getAccessionPreviewKind("Cosmic_Comedian_The_Big_Bang_Gag.mp4")).toBe("video");
    expect(getAccessionPreviewKind("pasted_content_23.txt")).toBe("text");
    expect(getAccessionPreviewKind("unknown.bin")).toBe("metadata");
  });
});
