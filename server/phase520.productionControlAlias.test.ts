import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Phase 520 Production Control Desk route alias", () => {
  it("keeps the descriptive production-control-desk URL registered to prevent a public 404", () => {
    const router = fs.readFileSync(path.resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");
    expect(router).toContain('path="/production-control" component={ProductionControlDesk}');
    expect(router).toContain('path="/production-control-desk" component={ProductionControlDesk}');
  });
});
