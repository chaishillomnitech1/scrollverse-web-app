import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexPath = "docs/phase927-source-labeled-storybook-index.md";

describe("Phase 927 — Source-Labeled Story-book Index", () => {
  it("keeps nine volume slots separate from unrecovered external artifacts", () => {
    expect(existsSync(indexPath)).toBe(true);
    const index = readFileSync(indexPath, "utf8");

    expect(index).toContain("pasted_content_4.txt");
    expect(index).toContain("Nine volume slots");
    expect(index).toContain("Volume 01");
    expect(index).toContain("Volume 09");
    expect(index).toContain("No external artifact was opened");
    expect(index).toContain("No token, wallet, contract, payment, or publication action occurred");
  });
});
