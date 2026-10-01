import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const receiptPath = "docs/phase940-screen-recording-intake-register.md";

describe("Phase 940 — screen-recording intake register", () => {
  it("records the selected files and their unavailable local state", () => {
    expect(existsSync(receiptPath)).toBe(true);
    const source = readFileSync(receiptPath, "utf8");
    expect(source).toContain("ScreenRecording_08-25-202621-47-00_1.mp4");
    expect(source).toContain("ScreenRecording_08-25-202621-46-33_1.mp4");
    expect(source).toContain("not present in the active workspace");
    expect(source).toContain("private source review");
  });

  it("keeps the public media gate explicit", () => {
    const source = readFileSync(receiptPath, "utf8");
    expect(source).toContain("no upload");
    expect(source).toContain("no embedding");
    expect(source).toContain("no republication");
    expect(source).toContain("original source URL");
    expect(source).toContain("release permission");
  });
});
