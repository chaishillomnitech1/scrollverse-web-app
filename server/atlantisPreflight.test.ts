import { describe, expect, it } from "vitest";
import { atlantisSuppliedPreflightManifest, validateSuppliedAtlantisPreflight } from "../config/drops/atlantisSuppliedPreflight";

describe("source-labeled Atlantis preflight manifest", () => {
  it("preserves seven structurally complete supplied SKU blueprints without becoming a commerce activation path", () => {
    const result = validateSuppliedAtlantisPreflight();
    expect(atlantisSuppliedPreflightManifest.sourceClassification).toBe("USER_SUPPLIED_UNVERIFIED");
    expect(atlantisSuppliedPreflightManifest.collection).toHaveLength(7);
    expect(atlantisSuppliedPreflightManifest.collection.every(item => Object.values(item.assetReferences).every(reference => reference.startsWith("s3://")))).toBe(true);
    expect(result.structuralReady).toBe(true);
    expect(result.activationCapable).toBe(false);
    expect(result.activationNotice).toContain("never writes to the database");
  });
});
