import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("Phase 654 — Portal runtime error repair", () => {
  it("adapts non-JSON upstream errors into a structured tRPC response and quiets rate-limit noise", () => {
    const main = read("client/src/main.tsx");
    expect(main).toContain("const jsonSafeTrpcFetch");
    expect(main).toContain('contentType.includes("application/json")');
    expect(main).toContain("Request limit reached. Please wait a moment and try again.");
    expect(main).toContain('code: response.status === 429 ? "TOO_MANY_REQUESTS" : "INTERNAL_SERVER_ERROR"');
    expect(main).toContain("fetch: jsonSafeTrpcFetch");
    expect(main).toContain("[API Query Rate Limit]");
    expect(main).toContain("[API Mutation Rate Limit]");
  });

  it("uses a unique discovery-card key when different records share one route", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain('key={`${item.href}-${item.title}`}');
    expect(home).not.toContain('OFFICIAL_ARTIFACT_PATHS.map(item => <Link key={item.href}');
  });
});
