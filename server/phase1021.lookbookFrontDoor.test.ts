import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Phase 1021 — direct lookbook front door", () => {
  it("renders non-playable artifact cards as direct internal links", () => {
    expect(home).toContain("item.video ? (");
    expect(home).toContain('<Link href={item.href}');
    expect(home).toContain("Open visual artifact");
  });

  it("keeps playable theater cards visitor-controlled", () => {
    expect(home).toContain("onClick={() => setSelectedId(item.id)}");
    expect(home).toContain('controls preload="none"');
    expect(home).toContain("playsInline");
    expect(home).not.toContain("autoPlay");
  });
});
