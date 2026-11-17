import { describe, expect, it } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { MAINNET_CONFIRMATION, validateDeploymentConfig } = require("./deployment-preflight.cjs");

const validAmoy = {
  networkName: "amoy",
  chainId: 80002,
  deployerAddress: "0x1111111111111111111111111111111111111111",
  ownerMultisigAddress: "0x2222222222222222222222222222222222222222",
  platformWalletAddress: "0x3333333333333333333333333333333333333333",
  codexBaseUri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4k4j6j3s6h7s7y2x5q6p7r8",
  polygonscanApiKey: "test-api-key",
};

describe("ScrollVerse deployment preflight", () => {
  it("accepts a fully specified Amoy configuration", () => {
    expect(validateDeploymentConfig(validAmoy).chainId).toBe(80002);
  });

  it("rejects a chain ID mismatch", () => {
    expect(() => validateDeploymentConfig({ ...validAmoy, chainId: 137 })).toThrow(/chain ID/i);
  });

  it("rejects a missing or zero multisig address", () => {
    expect(() => validateDeploymentConfig({ ...validAmoy, ownerMultisigAddress: "" })).toThrow(/OWNER_MULTISIG_ADDRESS/i);
    expect(() => validateDeploymentConfig({ ...validAmoy, ownerMultisigAddress: "0x0000000000000000000000000000000000000000" })).toThrow(/OWNER_MULTISIG_ADDRESS/i);
  });

  it("requires the final owner to differ from the deployer", () => {
    expect(() => validateDeploymentConfig({ ...validAmoy, ownerMultisigAddress: validAmoy.deployerAddress })).toThrow(/separate multisig/i);
  });

  it("rejects placeholder metadata", () => {
    expect(() => validateDeploymentConfig({ ...validAmoy, codexBaseUri: "ipfs://QmPlaceholder/" })).toThrow(/real .* metadata URI/i);
  });

  it("requires an explorer API key for source verification", () => {
    expect(() => validateDeploymentConfig({ ...validAmoy, polygonscanApiKey: "" })).toThrow(/POLYGONSCAN_API_KEY/i);
  });

  it("requires a separate explicit confirmation for Polygon mainnet", () => {
    const mainnet = { ...validAmoy, networkName: "polygon", chainId: 137 };
    expect(() => validateDeploymentConfig(mainnet)).toThrow(/MAINNET_RELEASE_CONFIRMATION/i);
    expect(validateDeploymentConfig({ ...mainnet, mainnetConfirmation: MAINNET_CONFIRMATION }).chainId).toBe(137);
  });

  it("rejects unknown networks", () => {
    expect(() => validateDeploymentConfig({ ...validAmoy, networkName: "mumbai", chainId: 80001 })).toThrow(/Unsupported deployment network/i);
  });
});
