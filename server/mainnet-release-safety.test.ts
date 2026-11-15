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

  it("classifies staking compounding as off-chain ledger accounting", () => {
    const job = read("server/jobs/compoundRewards.ts");
    const router = read("server/routers/staking.ts");
    const heartbeat = read("server/jobs/heartbeat.ts");
    expect(job).toContain("off-chain ledger accounting");
    expect(job).toContain("No token transfer or on-chain staking transaction was performed.");
    expect(router).toContain('executionMode: "off_chain_ledger"');
    expect(heartbeat).toContain("Estimated rewards recorded in the off-chain application ledger");
  });

  it("labels the staking interface as off-chain application-ledger mode", () => {
    const source = read("client/src/pages/Staking.tsx");
    expect(source).toContain("Application-ledger mode");
    expect(source).toContain("does not transfer CHX or $LONDC");
    expect(source).toContain("not guaranteed payouts");
  });

  it("transfers initial token supply to the multisig and verifies final contract ownership", () => {
    const source = read("blockchain/scripts/deploy.js");
    expect(source).toContain("londc.transfer(config.ownerMultisigAddress, initialSupply)");
    expect(source).toContain("multisigTokenBalance !== initialSupply");
    expect(source).toContain("deployerTokenBalance !== 0n");
    expect(source).toContain("londc.owner()");
    expect(source).toContain("zakat.owner()");
    expect(source).toContain("codex.owner()");
    expect(source).toContain("ownershipVerification");
  });

  it("keeps Amoy and Polygon mainnet on their correct chain IDs", () => {
    const source = read("blockchain/scripts/deployment-preflight.cjs");
    expect(source).toContain("amoy: 80002");
    expect(source).toContain("polygon: 137");
    expect(source).toContain("I_CONFIRM_SCROLLVERSE_POLYGON_MAINNET_DEPLOYMENT");
  });
});
