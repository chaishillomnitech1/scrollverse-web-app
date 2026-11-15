const EXPECTED_CHAIN_IDS = Object.freeze({
  amoy: 80002,
  polygonAmoy: 80002,
  polygon: 137,
});

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const MAINNET_CONFIRMATION = "I_CONFIRM_SCROLLVERSE_POLYGON_MAINNET_DEPLOYMENT";

function requiredAddress(name, value) {
  if (typeof value !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(value) || value.toLowerCase() === ZERO_ADDRESS) {
    throw new Error(name + " must be a valid, non-zero EVM address.");
  }
  return value;
}

function validateDeploymentConfig(input) {
  const expectedChainId = EXPECTED_CHAIN_IDS[input.networkName];
  if (!expectedChainId) {
    throw new Error("Unsupported deployment network. Select Amoy (80002) or Polygon mainnet (137).");
  }

  if (Number(input.chainId) !== expectedChainId) {
    throw new Error("Selected network chain ID does not match the configured deployment network.");
  }

  const deployerAddress = requiredAddress("Deployer address", input.deployerAddress);
  const ownerMultisigAddress = requiredAddress("OWNER_MULTISIG_ADDRESS", input.ownerMultisigAddress);
  const platformWalletAddress = requiredAddress("PLATFORM_WALLET_ADDRESS", input.platformWalletAddress);

  if (deployerAddress.toLowerCase() === ownerMultisigAddress.toLowerCase()) {
    throw new Error("The final owner must be a separate multisig address, not the deployer EOA.");
  }

  const codexBaseUri = input.codexBaseUri;
  if (
    typeof codexBaseUri !== "string" ||
    !/^(ipfs:\/\/|ar:\/\/|https:\/\/)/i.test(codexBaseUri) ||
    /placeholder|replace[-_ ]?me|your[-_ ]?uri|todo/i.test(codexBaseUri)
  ) {
    throw new Error("CODEX_BASE_URI must be a real ipfs://, ar://, or https:// metadata URI.");
  }

  if (typeof input.polygonscanApiKey !== "string" || input.polygonscanApiKey.trim().length === 0) {
    throw new Error("POLYGONSCAN_API_KEY is required for post-deployment source verification.");
  }

  if (input.networkName === "polygon" && input.mainnetConfirmation !== MAINNET_CONFIRMATION) {
    throw new Error("Polygon mainnet is blocked without the exact MAINNET_RELEASE_CONFIRMATION value.");
  }

  return {
    networkName: input.networkName,
    chainId: expectedChainId,
    deployerAddress,
    ownerMultisigAddress,
    platformWalletAddress,
    codexBaseUri,
  };
}

module.exports = {
  EXPECTED_CHAIN_IDS,
  MAINNET_CONFIRMATION,
  validateDeploymentConfig,
};
