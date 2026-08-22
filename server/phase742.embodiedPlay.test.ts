import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
describe("Phase 742 · Omniland embodied play", () => {
  it("keeps conventional and embodied input paths together", () => { const p=fs.readFileSync(path.join(root,"client/src/pages/OmnilandEmbodiedPlay.tsx"),"utf8"); expect(p).toContain("Linear controls remain first-class"); expect(p).toContain("Motion-agnostic alternatives"); expect(p).toContain("No wearable, suit, headset"); });
  it("registers the route", () => expect(fs.readFileSync(path.join(root,"client/src/App.tsx"),"utf8")).toContain('path="/omniland-embodied-play"'));
});
