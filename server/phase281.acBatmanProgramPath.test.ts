import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 281 AC Batman cross-surface program path", () => {
  it("keeps the Junior Movies discovery card source-labeled and non-playable", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/JuniorMovies.tsx"), "utf8");
    expect(page).toContain("AC Batman · protected-context production pathway");
    expect(page).toContain("does not embed character imagery");
    expect(page).toContain("does not embed character imagery, claim an available episode, use a third-party likeness, or open a player");
    expect(page).toContain('href="/media-world-evidence-packets"');
  });
});
