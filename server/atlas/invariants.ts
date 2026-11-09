/**
 * Deterministic allocation invariants used by the Sovereign audit workflow.
 *
 * These values encode the project-supplied 90/10 split. They do not execute
 * payments, define a legal entitlement, or verify any wallet or treasury.
 */
export const BASIS_POINT_CONFIGURATION = Object.freeze({
  total: 10_000,
  sovereign: 9_000,
  producer: 1_000,
});

export const CIVIC_SEAL_REFERENCE = "0xATLANTIS_CIVIC_082824";

export function assertBasisPointSplit(
  sovereignBasisPoints: number,
  producerBasisPoints: number,
): void {
  const values = [sovereignBasisPoints, producerBasisPoints];

  if (values.some((value) => !Number.isInteger(value) || value < 0)) {
    throw new RangeError("Basis-point allocations must be non-negative integers.");
  }

  if (sovereignBasisPoints + producerBasisPoints !== BASIS_POINT_CONFIGURATION.total) {
    throw new RangeError("Basis-point allocations must sum to exactly 10000.");
  }
}

export function validateConfiguredInvariants(): true {
  assertBasisPointSplit(
    BASIS_POINT_CONFIGURATION.sovereign,
    BASIS_POINT_CONFIGURATION.producer,
  );

  if (!CIVIC_SEAL_REFERENCE.startsWith("0x") || CIVIC_SEAL_REFERENCE.length < 4) {
    throw new Error("Civic Seal reference is missing or malformed.");
  }

  return true;
}
