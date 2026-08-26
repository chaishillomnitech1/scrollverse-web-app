import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), "utf8");

describe("Phase 611 — Connected Systems Map", () => {
  it("registers seven browser-local systems with their connected destinations", () => {
    const app = read("client/src/App.tsx");
    const page = read("client/src/pages/ConnectedSystemsMap.tsx");

    expect(app).toContain('path={"/connected-systems"}');
    expect(page).toContain("CONNECTED SYSTEMS MAP");
    expect(page).toContain("Seven visible paths.");
    expect(page).toContain("Creator archive core");
    expect(page).toContain("Replay readiness suite");
    expect(page).toContain("Collaboration review");
    expect(page).toContain('route: "/creator-collection-records"');
    expect(page).toContain('route: "/replay-readiness"');
    expect(page).toContain('route: "/collaborate"');
  });

  it("keeps the module map source-led and excludes external execution", () => {
    const page = read("client/src/pages/ConnectedSystemsMap.tsx");
    const record = read("docs/phase611-connected-systems-source-map.md");

    expect(page).toContain("SOURCE-FIRST SYSTEMS PRINCIPLE");
    expect(page).toContain("The map makes creator systems, source trails, and operating labels visible");
    expect(page).toContain("dedicated operational pathway");
    expect(page).not.toContain("fetch(");
    expect(record).toContain("Current Browser-Local Systems Overview");
    expect(record).toContain("Creator-First Interpretation");
  });
});
