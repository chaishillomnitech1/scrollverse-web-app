import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const pagePath = path.resolve(process.cwd(), "client/src/pages/GitHubEvidenceMap.tsx");

describe("Phase 806 — GitHub evidence public presentation", () => {
  it("presents the creator portfolio through source context, reader review, and dedicated next paths", () => {
    const page = fs.readFileSync(pagePath, "utf8");

    expect(page).toContain("Follow the creator trail.");
    expect(page).toContain("OWNER-AUTHORIZED SOURCES · READER-LED REVIEW · CREATOR PORTFOLIO");
    expect(page).toContain("SOURCE-TRAIL STANDARD");
    expect(page).toContain("Source context and next path");
    expect(page).toContain("Continue through evidence, context, and correction.");
    expect(page).not.toContain("Choose a source, then inspect scope and limits.");
  });
});
