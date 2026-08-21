import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 651 — Special Repository and Artifact Readiness", () => {
  it("shows stable accession records, a recorded source hash, local export, and no external action", () => {
    const page = read("client/src/pages/SpecialRepository.tsx");
    expect(page).toContain('useSovereignHeartbeat({ page: "special-repository" })');
    expect(page).toContain("SV-DIGI-BRAND-001");
    expect(page).toContain("SV-DIGI-EPISODE-046");
    expect(page).toContain("SV-DIGI-OBS-001");
    expect(page).toContain("SV-DIGI-FILM-001");
    expect(page).toContain("71844b9d4c74dfe8268e95f2fcbc31812240e3f3c4a3832efa399626ddccf207");
    expect(page).toContain('externalAction: "none"');
  });

  it("registers the route and preserves exact release fields in the accession model", () => {
    const app = read("client/src/App.tsx");
    const model = read("docs/phase651-special-repository-accession-model.md");
    expect(app).toContain('import SpecialRepository from "./pages/SpecialRepository"');
    expect(app).toContain('<Route path={"/special-repository"} component={SpecialRepository} />');
    expect(model).toContain("`accession ID`, `representation mode`, `chain and network`");
    expect(model).toContain("No secret, private key, seed phrase");
  });
});
