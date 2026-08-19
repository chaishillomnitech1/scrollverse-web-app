import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 519 learning pathways discovery", () => {
  it("keeps public sources and protected first-party context source-labeled and browser-local", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/LearningPathways.tsx"), "utf8");
    const router = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(page).toContain("SOURCE-LABELED LEARNING");
    expect(page).toContain("Owner-provided protected chronology context");
    expect(page).toContain("No source is presented as an endorsement, credential, required conclusion");
    expect(page).toContain("Copy local learning note");
    expect(router).toContain('path={"/learning-pathways"} component={LearningPathways}');
  });
});
