import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/OmniverseManifestoCodex.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const docs = fs.readFileSync(path.join(root, "docs/phase675-omniverse-manifesto-codex.md"), "utf8");

describe("Phase 675 — Omniverse Manifesto Codex", () => {
  it("preserves the supplied Manifesto title, source hash, and unseen-content boundary", () => {
    expect(page).toContain("The Omniverse Manifesto");
    expect(page).toContain("5c8b208c1fb6e0dfd509fcf25255270ecaebd5c15ead0214f5ebc804edb42dbd");
    expect(page).toContain("does not claim unseen chat content");
    expect(page).toContain("a human being kept asking");
  });

  it("records the Omnitech1 evolution point and visible source constellation", () => {
    expect(page).toContain("Omnitech becomes Omnitech1");
    expect(page).toContain("51 visible titles");
    expect(page).toContain("Reality check on claims");
  });

  it("registers the browser-local Codex route and documents its source boundary", () => {
    expect(app).toContain('path="/omniverse-manifesto-codex" component={OmniverseManifestoCodex}');
    expect(docs).toContain("Recovered ChatGPT Omniverse Manifesto Codex");
    expect(docs).toContain("Unseen-Content Limitation");
  });
});
