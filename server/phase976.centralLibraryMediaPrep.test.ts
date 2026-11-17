import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 976 central-library media preparation", () => {
  it("keeps the reviewed recordings source-labeled and private until permission context exists", () => {
    const record = readFileSync(resolve(process.cwd(), "docs/phase795-central-library-media-preparation.md"), "utf8");
    expect(record).toContain("Central-Library Media Preparation Record");
    expect(record).toContain("ScreenRecording_08-25-202621-47-00_1.mp4");
    expect(record).toContain("ScreenRecording_08-25-202621-46-33_1.mp4");
    expect(record).toContain("Hold privately");
    expect(record).toContain("no upload, embedding, publication");
    expect(record).toContain("original source URL");
  });
});
