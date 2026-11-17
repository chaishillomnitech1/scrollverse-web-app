import { describe, expect, it } from "vitest";
import {
  assertBasisPointSplit,
  BASIS_POINT_CONFIGURATION,
  CIVIC_SEAL_REFERENCE,
  validateConfiguredInvariants,
} from "./invariants";

describe("ScrollVerse deterministic invariant gate", () => {
  it("accepts the configured 9000/1000 basis-point split", () => {
    expect(() =>
      assertBasisPointSplit(
        BASIS_POINT_CONFIGURATION.sovereign,
        BASIS_POINT_CONFIGURATION.producer,
      ),
    ).not.toThrow();
    expect(BASIS_POINT_CONFIGURATION.sovereign + BASIS_POINT_CONFIGURATION.producer).toBe(10_000);
  });

  it("rejects allocations that do not total 10000 basis points", () => {
    expect(() => assertBasisPointSplit(9_000, 999)).toThrow(/sum to exactly 10000/);
    expect(() => assertBasisPointSplit(9_001, 1_000)).toThrow(/sum to exactly 10000/);
  });

  it("rejects fractional and negative allocations", () => {
    expect(() => assertBasisPointSplit(9_000.5, 999.5)).toThrow(/non-negative integers/);
    expect(() => assertBasisPointSplit(-1, 10_001)).toThrow(/non-negative integers/);
  });

  it("retains the supplied Civic Seal reference as an identifier, not a chain proof", () => {
    expect(CIVIC_SEAL_REFERENCE).toBe("0xATLANTIS_CIVIC_082824");
    expect(validateConfiguredInvariants()).toBe(true);
  });
});
