import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 520 Chosen Ones route alias", () => {
  it("keeps the full experience-exchange path registered to prevent a public 404", () => {
    const router = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(router).toContain('path="/chosen-ones-exchange" component={ChosenOnesExperienceExchange}');
    expect(router).toContain('path="/chosen-ones-experience-exchange" component={ChosenOnesExperienceExchange}');
  });
});
