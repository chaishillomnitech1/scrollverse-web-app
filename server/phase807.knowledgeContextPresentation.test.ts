import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const pagePath = path.resolve(process.cwd(), "client/src/pages/KnowledgeContext.tsx");

describe("Phase 807 — Knowledge Context public presentation", () => {
  it("connects source-led learning, interpretation, and reader choice without dismissive framing", () => {
    const page = fs.readFileSync(pagePath, "utf8");

    expect(page).toContain("SOURCE + INTERPRETATION LENS");
    expect(page).toContain("More than one lens—connected through the source.");
    expect(page).toContain("build their own informed reading");
    expect(page).toContain("PROTECTIVE PRACTICE");
    expect(page).toContain("Understand the model. Build with the record.");
    expect(page).not.toContain("INTERPRETATION BOUNDARY");
  });
});
