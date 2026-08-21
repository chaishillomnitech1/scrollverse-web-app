import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

describe("Phase 663 — Star Dust source evidence", () => {
  it("keeps reusable GitHub contract references distinct from Star Dust authorization", () => {
    const register = read("client/src/pages/ThreeLaneReleaseRegister.tsx");
    const evidence = read("docs/phase663-star-dust-source-evidence.md");
    expect(register).toContain("Neither is a verified Star Dust contract source");
    expect(evidence).toContain("Pantheon-Protocol-TGLD-Smart-Contracts");
    expect(evidence).toContain("vibranium-sovereignty-protocol");
    expect(evidence).toContain("not a Star Dust deployment package");
    expect(evidence).toContain("requires owner release");
  });
});
