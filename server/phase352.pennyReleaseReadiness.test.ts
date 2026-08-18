import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const homePath = path.resolve(import.meta.dirname, "../client/src/pages/Home.tsx");
const packetPath = path.resolve(import.meta.dirname, "../docs/phase352-penny-for-your-thoughts-release-readiness.md");
const homeSource = fs.readFileSync(homePath, "utf8");
const packetSource = fs.readFileSync(packetPath, "utf8");

describe("Phase 352 — Penny for Your Thoughts release readiness", () => {
  it("connects the discovery entry to the established release-readiness path", () => {
    expect(homeSource).toContain('href="/pre-registration-readiness"');
    expect(homeSource).toContain("Release-readiness path");
    expect(homeSource).toContain('data-penny-spotlight');
    expect(homeSource).toContain("/manus-storage/penny-for-your-thoughts-cover_2f3469b7.jpg");
    expect(homeSource).toContain("Produced By J Do$A");
  });

  it("keeps NFT, coin, sale, and blockchain actions behind asset-specific rights records", () => {
    expect(packetSource).toContain("requires owner release");
    expect(packetSource).toContain("Cover-art contributor release");
    expect(packetSource).toContain("Before any **NFT, token, coin, sale, transfer, mint, or blockchain deployment**");
    expect(packetSource).toContain("No supply, price, proceeds allocation, token utility, or financial return is proposed");
  });
});
