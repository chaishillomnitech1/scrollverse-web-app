import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 201 — Google Immutable Proof bounded review", () => {
  const review = read("docs/phase201-google-immutable-proof-source-review.md");

  it("records supplied material as source-labeled, not independently observed deployment evidence", () => {
    expect(review).toContain("public URL supplied; content not independently observed in this review");
    expect(review).toContain("owner-supplied reference material");
  });

  it("keeps execution, secret, webhook, financial, and network actions fail-closed", () => {
    expect(review).toContain("No supplied code, shell script, Yul block, contract, circuit");
    expect(review).toContain("No repository token, webhook endpoint, curl request, remote hook");
    expect(review).toContain("No visibility setting was changed");
  });
});
