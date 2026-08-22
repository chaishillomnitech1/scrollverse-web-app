import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 765 — AutoEmpire source and portfolio readiness intake", () => {
  it("registers the browser-local AutoEmpire source route", () => {
    expect(read("client/src/App.tsx")).toContain('path="/autoempire-source-intake" component={AutoEmpireSourceIntake}');
  });

  it("preserves visible automotive, source-interface, and finance-presentation observations with local handoffs", () => {
    const page = read("client/src/pages/AutoEmpireSourceIntake.tsx");
    for (const label of ["Automotive concept collection", "Source and isolation interface", "Finance and commerce presentation", "/portfolio-asset-evidence-inventory", "/xlviiiblocks-proposal-canvas"]) expect(page).toContain(label);
  });

  it("keeps account context and external operations bounded", () => {
    const page = read("client/src/pages/AutoEmpireSourceIntake.tsx");
    expect(page).toContain("The supplied Google notice confirms authorized context—not a blanket account action.");
    expect(page).toContain("This route does not access email, change account settings, connect a provider, verify or operate vehicle inventory");
    expect(read("docs/phase765-autoempire-source-intake.md")).toContain("It does not direct email review, account-setting changes, provider connection, payment activity");
  });
});
