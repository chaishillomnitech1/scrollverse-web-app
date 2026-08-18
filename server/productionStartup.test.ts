import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const startup = readFileSync(resolve(import.meta.dirname, "_core/index.ts"), "utf8");

describe("managed production startup", () => {
  it("binds production directly to the platform-provided port without selecting an unmonitored fallback", () => {
    expect(startup).toContain('const isProduction = process.env.NODE_ENV === "production"');
    expect(startup).toContain("const port = isProduction ? preferredPort : await findAvailablePort(preferredPort)");
    expect(startup).toContain('server.listen(port, "0.0.0.0"');
  });

  it("retains flexible available-port selection only for local development", () => {
    expect(startup).toContain("if (!isProduction && port !== preferredPort)");
    expect(startup).toContain("findAvailablePort(preferredPort)");
  });
});
