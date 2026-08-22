import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 745–746 media and commerce readiness", () => {
  it("registers the two browser-local preparation routes", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain("/media-release-concept-board");
    expect(app).toContain("/commerce-financial-readiness-board");
  });
  it("keeps external publication and transactions owner-controlled", () => {
    const media = read("client/src/pages/MediaReleaseConceptBoard.tsx");
    const commerce = read("client/src/pages/CommerceFinancialReadinessBoard.tsx");
    expect(media).toContain("owner-controlled release decision");
    expect(commerce).toContain("No live listing, purchase, checkout, payment, payout, exchange");
  });
});
