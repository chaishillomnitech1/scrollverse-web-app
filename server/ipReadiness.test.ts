import { describe, expect, it } from "vitest";
import { evaluateIpReadiness } from "@shared/ipReadiness";

describe("ScrollVerse IP readiness evaluator", () => {
  it("requires an inventory before an asset package can be reviewed", () => {
    expect(evaluateIpReadiness([])).toMatchObject({
      total: 0,
      documented: 0,
      reviewReady: 0,
      status: "START_INVENTORY",
    });
  });

  it("flags missing origin or stewardship information instead of implying protection", () => {
    const summary = evaluateIpReadiness([
      { name: "Aegis Aperture", kind: "LOGO_OR_SIGIL", originNote: "", steward: "ScrollVerse", evidenceState: "DOCUMENTED", publicUse: false },
      { name: "Source Thread", kind: "LOGO_OR_SIGIL", originNote: "Original concept file", steward: "", evidenceState: "NOT_STARTED", publicUse: false },
    ]);

    expect(summary.status).toBe("DOCUMENT_ORIGIN");
    expect(summary.missingRecords).toEqual(["Aegis Aperture", "Source Thread"]);
    expect(summary.documented).toBe(0);
  });

  it("only marks a fully documented asset inventory ready for professional review", () => {
    const summary = evaluateIpReadiness([
      { name: "ScrollVerse", kind: "WORD_MARK", originNote: "First-party project naming record", steward: "ScrollVerse", evidenceState: "REVIEW_READY", publicUse: true },
      { name: "Aegis Aperture", kind: "LOGO_OR_SIGIL", originNote: "Original concept mark source record", steward: "ScrollVerse", evidenceState: "REVIEW_READY", publicUse: false },
    ]);

    expect(summary).toMatchObject({ total: 2, documented: 2, reviewReady: 2, missingRecords: [], status: "READY_FOR_PROFESSIONAL_REVIEW" });
  });
});
