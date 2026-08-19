import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 521 continuation readiness register", () => {
  it("keeps input-dependent gates visible without external activation claims", () => {
    const page = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/pages/ContinuationReadinessRegister.tsx"), "utf8");
    const router = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(page).toContain("NEXT REQUIRED INPUT");
    expect(page).toContain("No provider request, transaction, schedule, payout, or configuration.");
    expect(page).toContain("No repository write or public upload.");
    expect(page).toContain("Copy local record");
    expect(router).toContain('path={"/continuation-readiness-register"} component={ContinuationReadinessRegister}');
  });
});
