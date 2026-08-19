import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
describe("Phase 517 Legion specialist profile expansion", () => {
  it("registers the specialist profile route", () => { const app = read("client/src/App.tsx"); expect(app).toContain('import LegionSpecialistProfiles from "./pages/LegionSpecialistProfiles"'); expect(app).toContain('<Route path="/legion-specialist-profiles" component={LegionSpecialistProfiles} />'); });
  it("shows high-impact safeguards and browser-local profile preparation", () => { const page = read("client/src/pages/LegionSpecialistProfiles.tsx"); expect(page).toContain("Medical Research Navigator"); expect(page).toContain("Legal Source Navigator"); expect(page).toContain("Financial Literacy Navigator"); expect(page).toContain("PUBLIC-IMPROVEMENT PROPOSAL"); expect(page).toContain("No diagnosis, treatment, prescribing"); expect(page).toContain("No personal investment recommendation"); });
  it("links profiles from the atlas without autonomous external action", () => { const atlas = read("client/src/pages/LegionSpecialistAtlas.tsx"); const page = read("client/src/pages/LegionSpecialistProfiles.tsx"); expect(atlas).toContain('href="/legion-specialist-profiles"'); expect(page).toContain("not a submission, vote, instruction, provider request, or autonomous action"); });
});
