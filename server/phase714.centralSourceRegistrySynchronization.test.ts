import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const page = readFileSync(resolve(__dirname, "../client/src/pages/ConnectedSourceRegistry.tsx"), "utf-8");

describe("Phase 714 — Central Source Registry Synchronization", () => {
  it("adds both current recovery gates as research records", () => {
    expect(page).toContain("SRC-019");
    expect(page).toContain("Manus-Origin Historical Reference");
    expect(page).toContain("SRC-020");
    expect(page).toContain("Ω.267 Master Shoppable Meta Hub");
    expect(page).toContain("22 SOURCE RECORDS");
  });

  it("provides direct internal recovery-gate handoffs without converting them into public sources", () => {
    expect(page).toContain("localHref: \"/manus-origin-historical-recovery\"");
    expect(page).toContain("localHref: \"/omega-267-prior-hub-recovery\"");
    expect(page).toContain("Open browser-local recovery gate");
    expect(page).toContain("source.localHref ? <Link");
  });
});
