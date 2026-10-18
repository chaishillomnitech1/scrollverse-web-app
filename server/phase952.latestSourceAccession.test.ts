import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(
  readFileSync("docs/source-review-oct18/latest-upload-manifest.json", "utf8"),
) as {
  records: Array<{
    filename: string;
    sha256: string;
    bytes: number;
    classification: string;
    displayScope: string;
  }>;
};

describe("Phase 952 — latest creator source accession", () => {
  it("preserves the newly supplied pasted records with byte identifiers", () => {
    const names = manifest.records.map((record) => record.filename);
    for (const name of [
      "pasted_content_23.txt",
      "pasted_content_24.txt",
      "pasted_content_25.txt",
      "pasted_content_26.txt",
      "pasted_content_27.txt",
      "pasted_content_28.txt",
      "pasted_content_29.txt",
      "pasted_content_30.txt",
      "pasted_content_31.txt",
      "pasted_content_32.txt",
      "pasted_content_33.txt",
      "pasted_content_34.txt",
    ]) {
      expect(names).toContain(name);
    }
    for (const record of manifest.records.filter((item) => item.filename.startsWith("pasted_content_2"))) {
      expect(record.bytes).toBeGreaterThan(0);
      expect(record.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(record.displayScope).toBe("metadata-only");
    }
  });

  it("keeps supplied media and implementation bundles outside the deployable display scope", () => {
    const media = manifest.records.filter((record) =>
      /\.(mp4|wav|jpg|jpeg|webp)$/i.test(record.filename),
    );
    expect(media.length).toBeGreaterThan(5);
    expect(media.every((record) => record.displayScope === "metadata-only")).toBe(true);

    const implementation = manifest.records.filter((record) =>
      /\.(zip|sol|ts|tsx|py|jsx|css|html|json)$/i.test(record.filename),
    );
    expect(implementation.length).toBeGreaterThan(5);
    expect(implementation.every((record) => record.displayScope === "metadata-only")).toBe(true);
  });
});
