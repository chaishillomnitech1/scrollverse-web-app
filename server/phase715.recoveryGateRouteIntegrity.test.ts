import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const page = readFileSync(resolve(__dirname, "../client/src/pages/RouteIntegrityIndex.tsx"), "utf-8");

describe("Phase 715 — Recovery-Gate Route Integrity Synchronization", () => {
  it("lists the Manus-origin recovery route as a research evidence record", () => {
    expect(page).toContain('path: "/manus-origin-historical-recovery"');
    expect(page).toContain("Manus-Origin Historical Recovery");
    expect(page).toContain("owner-identified historical shared-source pointer");
  });

  it("lists the Ω.267 recovery route as a research evidence record", () => {
    expect(page).toContain('path: "/omega-267-prior-hub-recovery"');
    expect(page).toContain("Ω.267 Prior-Hub Recovery");
    expect(page).toContain("Master Shoppable Meta Hub checkpoint reference");
  });
});
