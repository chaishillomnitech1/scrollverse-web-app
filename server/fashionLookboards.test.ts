import { describe, expect, it } from "vitest";
import { parseLookboardItemIds } from "./routers/fashionLookboards";

describe("fashion lookboard concept selection", () => {
  it("keeps only the supported Atlantis concept identifiers and removes duplicates", () => {
    expect(parseLookboardItemIds(["atl-01", "atl-05", "atl-01"])).toEqual(["atl-01", "atl-05"]);
  });

  it("rejects empty, unknown, and oversized concept selections", () => {
    expect(() => parseLookboardItemIds([])).toThrow();
    expect(() => parseLookboardItemIds(["atl-99"])).toThrow();
    expect(() => parseLookboardItemIds(["atl-01", "atl-02", "atl-03", "atl-04", "atl-05"])).toThrow();
  });
});
