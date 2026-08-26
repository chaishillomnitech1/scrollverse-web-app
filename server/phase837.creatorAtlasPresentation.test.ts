import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 837 — Creator Atlas public presentation", () => {
  it("centers creator discovery and dedicated external pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/CreatorAtlas.tsx"), "utf8");
    expect(page).toContain("This Atlas makes creator discovery, source context, and operating labels visible");
    expect(page).toContain("other external operations continue through their dedicated pathways");
    expect(page).not.toContain("This route does not create an account");
  });
});
