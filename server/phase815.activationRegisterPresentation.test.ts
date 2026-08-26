import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 815 — Activation Register public presentation", () => {
  it("centers activation records, visible consequences, and dedicated pathways", () => {
    const page = readFileSync(resolve(import.meta.dirname, "../client/src/pages/ActivationRegister.tsx"), "utf8");
    expect(page).toContain("ACTIVATION REGISTER · VISIBLE PATHWAYS");
    expect(page).toContain("CURRENT PATHWAY STATE");
    expect(page).toContain("Name the action. Show the consequence. Follow the record.");
    expect(page).not.toContain("ACTIVATION REGISTER · NO EXTERNAL ACTION");
  });
});
