import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/CreatorActivationDossier.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");

describe("Phase 612 creator-controlled activation dossier", () => {
  it("presents the independent held external lanes with exact-record controls", () => {
    expect(page).toContain("CREATOR-CONTROLLED ACTIVATION DOSSIER");
    expect(page).toContain("One exact record. ");
    expect(page).toContain("Londyn Polygon evidence");
    expect(page).toContain("Per-song production packet");
    expect(page).toContain("Every lane stays independent");
  });

  it("supports browser-local filtering and export without provider execution", () => {
    expect(page).toContain("Activation dossier filters");
    expect(page).toContain("Export local dossier");
    expect(page).toContain("No filter, copy, export, or route link creates provider access");
  });

  it("registers the activation dossier route", () => {
    expect(app).toContain('import CreatorActivationDossier from "./pages/CreatorActivationDossier"');
    expect(app).toContain('<Route path={"/activation-dossier"} component={CreatorActivationDossier} />');
  });
});
