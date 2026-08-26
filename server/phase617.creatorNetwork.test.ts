import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = fs.readFileSync(path.join(root, "client/src/pages/CreatorNetwork.tsx"), "utf8");
const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const atlas = fs.readFileSync(path.join(root, "client/src/pages/CreatorAtlas.tsx"), "utf8");

describe("Phase 617 Creator Network", () => {
  it("organizes cross-promotion into five creator network lanes", () => {
    expect(page).toContain("SCROLLVERSE CREATOR NETWORK");
    expect(page).toContain("Visual archive");
    expect(page).toContain("Apps and systems");
    expect(page).toContain("Learning and books");
    expect(page).toContain("Media and broadcast");
    expect(page).toContain("Collaboration and readiness");
  });

  it("keeps route handoffs source-labeled and browser-local", () => {
    expect(page).toContain("CROSS-PROMOTION · PUBLIC CHOICE");
    expect(page).toContain("keeps its source context visible");
    expect(page).toContain("dedicated connection pathways");
    expect(page).toContain("/crypto-artifact-lookbook");
    expect(page).toContain("/activation-dossier");
  });

  it("registers the Creator Network and connects it from the Creator Atlas", () => {
    expect(app).toContain('import CreatorNetwork from "./pages/CreatorNetwork"');
    expect(app).toContain('<Route path="/creator-network" component={CreatorNetwork} />');
    expect(atlas).toContain('href: "/creator-network"');
  });
});
