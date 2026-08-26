import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 838 — Connected Systems Map public presentation", () => {
  it("centers creator systems and dedicated external operational pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/ConnectedSystemsMap.tsx"), "utf8");
    expect(page).toContain("external deployment, partner, hardware, and autonomous-process records continuing through their dedicated pathways");
    expect(page).toContain("The map makes creator systems, source trails, and operating labels visible");
    expect(page).toContain("background work each continue through their dedicated operational pathway");
    expect(page).not.toContain("The map does not activate external systems");
  });
});
