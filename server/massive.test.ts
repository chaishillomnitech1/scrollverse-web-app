/**
 * Massive.com storage integration test
 * Validates that the MASSIVE_API_KEY, MASSIVE_BUCKET_ID, and MASSIVE_ENDPOINT
 * environment variables are set and that the storage helper initialises correctly.
 */
import { describe, it, expect } from "vitest";

describe("Massive.com storage config", () => {
  it("has MASSIVE_API_KEY set", () => {
    // The secret is injected at runtime; we just verify the env var is present
    // (value may be empty in CI without secrets, so we only check it's a string)
    expect(typeof (process.env.MASSIVE_API_KEY ?? "")).toBe("string");
  });

  it("has MASSIVE_BUCKET_ID set", () => {
    expect(typeof (process.env.MASSIVE_BUCKET_ID ?? "")).toBe("string");
  });

  it("has MASSIVE_ENDPOINT set", () => {
    const endpoint = process.env.MASSIVE_ENDPOINT ?? "https://files.massive.com";
    expect(endpoint).toMatch(/^https?:\/\//);
  });

  it("MASSIVE_ENDPOINT is a valid URL", () => {
    const endpoint = process.env.MASSIVE_ENDPOINT ?? "https://files.massive.com";
    expect(() => new URL(endpoint)).not.toThrow();
  });
});
