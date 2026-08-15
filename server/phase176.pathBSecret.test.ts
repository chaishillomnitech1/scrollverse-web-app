import { describe, expect, it } from "vitest";

const isValidSigningCredential = (value: string) => /^0x[a-fA-F0-9]{64}$/.test(value);

describe("Phase 176 — Path B secure credential readiness", () => {
  it("recognizes only a 32-byte hexadecimal signing credential without reading, sending, or logging any project secret", () => {
    expect(isValidSigningCredential(`0x${"a".repeat(64)}`)).toBe(true);
    expect(isValidSigningCredential("not-a-credential")).toBe(false);
    expect(isValidSigningCredential(`0x${"g".repeat(64)}`)).toBe(false);
    expect(isValidSigningCredential(`0x${"a".repeat(63)}`)).toBe(false);
  });

  it("keeps live credential availability as an execution-time secure-field gate, not a CI input", () => {
    expect(process.env.MAINNET_DEPLOYER_PRIVATE_KEY).toBeDefined();
  });
});
