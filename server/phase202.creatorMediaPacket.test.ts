import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
describe("Phase 202 — Creator Media Packet", () => {
  const packet = read("client/src/pages/CreatorMediaPacket.tsx");
  const app = read("client/src/App.tsx");
  const home = read("client/src/pages/Home.tsx");
  it("registers a discoverable Creator Media Packet route", () => { expect(app).toContain('Route path="/creator-media-packet"'); expect(home).toContain('href: "/creator-media-packet"'); });
  it("keeps packet creation browser-local with rights, accessibility, youth, and release boundaries", () => { expect(packet).toContain("LOCAL EXPORT ONLY"); expect(packet).toContain("Youth participation decision"); expect(packet).toContain("Accessibility plan"); expect(packet).toContain("No upload, provider delivery, contact import, distribution, licensing, sale, wallet, token, mint, payment, payout, or public release"); });
});
