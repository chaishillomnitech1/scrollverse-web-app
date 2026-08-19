import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const router = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const atlas = readFileSync(resolve(root, "client/src/pages/LegionSpecialistAtlas.tsx"), "utf8");
const companionHub = readFileSync(resolve(root, "client/src/pages/AICompanionHub.tsx"), "utf8");
const taxonomy = readFileSync(resolve(root, "docs/phase496-legion-specialist-taxonomy.md"), "utf8");

describe("Phase 496 — Legion Specialist Atlas", () => {
  it("registers the Specialist Atlas and connects it from the Companion Hub", () => {
    expect(router).toContain('path={"/legion-specialist-atlas"}');
    expect(router).toContain("LegionSpecialistAtlas");
    expect(companionHub).toContain('href="/legion-specialist-atlas"');
    expect(atlas).toContain('useSovereignHeartbeat({ page: "legion-specialist-atlas" })');
  });

  it("covers the requested multi-discipline constellations", () => {
    for (const title of ["Creative & Culture", "Science, Math & Technology", "History, Thought & Learning", "Place, Planet & Practice", "Enterprise, Media & Value", "High-Impact Research Safeguards"]) expect(atlas).toContain(title);
    for (const role of ["Agriculture & Ecology Guide", "Food & Culture Desk", "Architecture & Place Design", "History & Archaeology Guide", "Business Operations Guide", "Space & Earth Inquiry Guide"]) expect(atlas).toContain(role);
    expect(taxonomy).toContain("## Specialist constellations");
  });

  it("rejects sentience, authority, regulated-action, personal-case, and external-action claims", () => {
    expect(atlas).toContain("not a claim of sentience, licensing, independent personhood, or autonomous authority");
    expect(atlas).toContain("does not diagnose, treat, prescribe, or replace a qualified clinician");
    expect(atlas).toContain("does not represent a person, determine a legal outcome, or file a document");
    expect(atlas).toContain("does not give a personal investment recommendation or execute a trade, transfer");
    expect(atlas).toContain("not a submission, vote, professional instruction, regulated decision, provider request, or autonomous system action");
  });
});
