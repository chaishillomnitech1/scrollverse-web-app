import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root=path.resolve(import.meta.dirname,"..");
describe("Phase 743 · Omniland contribution blueprint",()=>{it("keeps contribution voluntary and non-exclusive",()=>{const p=fs.readFileSync(path.join(root,"client/src/pages/OmnilandGameSystemsContribution.tsx"),"utf8");expect(p).toContain("Open to voluntary adoption");expect(p).toContain("does not claim control");expect(p).toContain("No partner, license, subsidiary");});it("registers the contribution route",()=>expect(fs.readFileSync(path.join(root,"client/src/App.tsx"),"utf8")).toContain('path="/omniland-game-systems-contribution"'));});
