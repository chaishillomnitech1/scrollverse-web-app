import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf-8");

describe("Phase 701 — Supplied Replay and Prior-Portal Record", () => {
  it("preserves all three replay sources and the prior Command Center", () => {
    const page = read("client/src/pages/SuppliedPublicReferences.tsx");
    expect(page).toContain("ajUx1OrfDpJAs4yffByeSx");
    expect(page).toContain("gA41PnvAUmSFvMGnXFUq2X");
    expect(page).toContain("wLBwFQQQ6uqoc2Tn2mAWbR");
    expect(page).toContain("scrollverse-jqwuy5bt.manus.space");
  });

  it("keeps preview and credential boundaries explicit", () => {
    const page = read("client/src/pages/SuppliedPublicReferences.tsx");
    expect(page).toContain("behind credentials");
    expect(page).toContain("No billing, paywall");
    expect(page).toContain("externalAction: \"none\"");
  });

  it("registers the supplied public reference route", () => {
    expect(read("client/src/App.tsx")).toContain("/supplied-public-references");
  });
});
