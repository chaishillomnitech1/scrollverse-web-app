import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("ScrollVerse Polygon release safety", () => {
  it("does not submit a placeholder Gate Keys transaction", () => {
    const source = read("client/src/pages/GateKeys.tsx");
    expect(source).toContain("GATE_KEYS_MINT_ENABLED = false");
    expect(source).not.toContain("eth_sendTransaction");
    expect(source).toContain("no wallet transaction was submitted");
  });

  it("does not report preview Guardian activation as an on-chain transaction", () => {
    const source = read("client/src/pages/Guardians.tsx");
    expect(source).toContain('activationStatus === "preview"');
    expect(source).not.toContain("Transaction submitted to Polygon");
    expect(source).toContain("illustrative planning values");
  });

  it("does not fall back to retired Polygon public RPC endpoints", () => {
    const paths = [
      "blockchain/hardhat.config.cjs",
      "blockchain/config/hardhat.config.cjs",
      "client/src/lib/commerce.ts",
      "client/src/lib/commerceConfig.ts",
      "client/src/pages/Dashboard.tsx",
      "client/src/pages/GateKeys.tsx",
      "client/src/pages/Guardians.tsx",
      "server/routers/guardian.ts",
      "server/routers/bridge.ts",
    ];
    for (const path of paths) {
      expect(read(path), path).not.toContain("polygon-rpc.com");
      expect(read(path), path).not.toContain("rpc-amoy.polygon.technology");
    }
  });

  it("keeps Amoy and Polygon mainnet on their correct chain IDs", () => {
    const source = read("blockchain/scripts/deployment-preflight.cjs");
    expect(source).toContain("amoy: 80002");
    expect(source).toContain("polygon: 137");
    expect(source).toContain("I_CONFIRM_SCROLLVERSE_POLYGON_MAINNET_DEPLOYMENT");
  });
});
