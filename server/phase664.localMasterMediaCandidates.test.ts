import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("Phase 664 — Local master-media candidates", () => {
  it("shows only verified technical metadata and retains per-file release gates", () => {
    const register = read("client/src/pages/ThreeLaneReleaseRegister.tsx");
    const inventory = read("docs/phase664-local-master-media-candidates.md");
    expect(register).toContain("LOCAL INTAKE INVENTORY");
    expect(register).toContain("METADATA ONLY");
    expect(register).toContain("does not infer title, contributor, use authorization");
    expect(inventory).toContain("IMG_3688.MOV");
    expect(inventory).toContain("426c113236fb9100e8800aeedb3dd82de81518c837a528f4e38712aec487465e");
    expect(inventory).toContain("local candidate only");
  });
});
