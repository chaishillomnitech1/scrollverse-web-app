import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
describe("Phase 741 Omniland and Master Registry records", () => {
  it("keeps consoleless delivery as designed and platform access gated", () => { const page = read("client/src/pages/OmnilandConsolelessDelivery.tsx"); expect(page).toContain("REQUIRES OWNER RELEASE"); expect(page).toContain("No episode, video, soundtrack"); });
  it("keeps the Master Registry evidence-led rather than an active crawler", () => { const page = read("client/src/pages/OmniMasterRegistryRecord.tsx"); expect(page).toContain("not an active crawler"); expect(page).toContain("VERIFIED"); });
  it("registers both source-led routes", () => { const app = read("client/src/App.tsx"); expect(app).toContain("/omniland-consoleless-delivery"); expect(app).toContain("/omni-master-registry"); });
});
