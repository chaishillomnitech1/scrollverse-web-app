import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const read = (file: string) => readFileSync(resolve(root, file), "utf-8");

describe("Phase 757 — multi-vector protected source intake", () => {
  it("registers the source record as a browser-local route", () => {
    const app = read("client/src/App.tsx");
    expect(app).toContain('path="/multi-vector-protected-source-intake" component={MultiVectorProtectedSourceIntake}');
  });

  it("preserves the five supplied vectors with bounded readiness handoffs", () => {
    const page = read("client/src/pages/MultiVectorProtectedSourceIntake.tsx");
    for (const title of ["Contract reference", "Song production brief", "App-icon vector", "Campaign provenance", "Shopify architecture"]) expect(page).toContain(title);
    for (const route of ["/financial-activation-readiness", "/media-release-concept-board", "/special-repository", "/campaign-activation-center", "/commerce-financial-readiness-board"]) expect(page).toContain(route);
    expect(page).toContain("PROTECTED MULTI-VECTOR SOURCE RECORD");
    expect(page).toContain("No embedded SVG, JSON, URL, contract reference, session claim");
  });

  it("documents source assertions without treating them as verified operating facts", () => {
    const notes = read("docs/phase757-multi-vector-source-intake.md");
    expect(notes).toContain("protected source material");
    expect(notes).toContain("source assertions");
    expect(notes).toContain("No chain query, contract connection, transaction, deployment, wallet action");
    expect(notes).toContain("No Shopify project creation, store connection, SKU creation");
  });
});
