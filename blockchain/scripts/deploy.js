/**
 * ScrollVerse controlled deployment script.
 *
 * Amoy is the required Polygon PoS rehearsal network (chain ID 80002).
 * Polygon mainnet is chain ID 137 and remains separately gated.
 *
 * Required secure environment:
 *   DEPLOYER_PRIVATE_KEY
 *   AMOY_RPC_URL or POLYGON_RPC_URL (selected network only)
 *   OWNER_MULTISIG_ADDRESS (must contain deployed contract code)
 *   PLATFORM_WALLET_ADDRESS
 *   CODEX_BASE_URI (ipfs://, ar://, or https://; never a placeholder)
 *   POLYGONSCAN_API_KEY
 *   MAINNET_RELEASE_CONFIRMATION (mainnet only; exact phrase below)
 *
 * This script does not create a Safe, perform an audit, or replace owner approval.
 */

const hre = require("hardhat");
const { ethers } = hre;
const fs = require("fs");
const path = require("path");
const { validateDeploymentConfig } = require("./deployment-preflight.cjs");

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error("No deployer signer is configured. Set DEPLOYER_PRIVATE_KEY in the secure environment.");
  }

  const network = await ethers.provider.getNetwork();
  const config = validateDeploymentConfig({
    networkName: hre.network.name,
    chainId: network.chainId.toString(),
    deployerAddress: deployer.address,
    ownerMultisigAddress: process.env.OWNER_MULTISIG_ADDRESS,
    platformWalletAddress: process.env.PLATFORM_WALLET_ADDRESS,
    codexBaseUri: process.env.CODEX_BASE_URI,
    polygonscanApiKey: process.env.POLYGONSCAN_API_KEY,
    mainnetConfirmation: process.env.MAINNET_RELEASE_CONFIRMATION,
  });

  const ownerCode = await ethers.provider.getCode(config.ownerMultisigAddress);
  if (!ownerCode || ownerCode === "0x") {
    throw new Error("OWNER_MULTISIG_ADDRESS has no contract code on the selected network. Deploy and verify the multisig first.");
  }

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("\nScrollVerse controlled deployment preflight");
  console.log("============================================");
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", network.chainId.toString());
  console.log("Deployer:", deployer.address);
  console.log("Owner multisig:", config.ownerMultisigAddress);
  console.log("Platform wallet:", config.platformWalletAddress);
  console.log("Deployer balance:", ethers.formatEther(balance), "POL");
  console.log("Multisig contract code: present");
  console.log("No private key or API key will be printed.");

  const outputPath = path.resolve(__dirname, "../config/deployment.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const deployment = {
    schemaVersion: 1,
    status: "DEPLOYMENT_IN_PROGRESS",
    network: hre.network.name,
    chainId: network.chainId.toString(),
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    ownerMultisig: config.ownerMultisigAddress,
    platformWallet: config.platformWalletAddress,
    metadataBaseUri: config.codexBaseUri,
    contracts: {},
    deploymentTransactions: {},
    setupTransactions: {},
    verification: "PENDING — verify exact compiler, optimizer, constructor arguments, and source on the selected explorer",
  };
  const persistDeployment = () => {
    fs.writeFileSync(outputPath, JSON.stringify(deployment, null, 2) + "\n", { mode: 0o600 });
  };
  persistDeployment();

  // Deploy with the deployer as temporary owner so setup can finish;
  // ownership is transferred to the multisig before completion.
  const LONDCToken = await ethers.getContractFactory("LONDCToken");
  const londc = await LONDCToken.deploy(
    config.ownerMultisigAddress,
    config.platformWalletAddress,
    deployer.address
  );
  await londc.waitForDeployment();
  const londcAddress = await londc.getAddress();
  deployment.contracts.LONDCToken = londcAddress;
  deployment.deploymentTransactions.LONDCToken = londc.deploymentTransaction()?.hash || null;
  persistDeployment();

  const ZakatDistribution = await ethers.getContractFactory("ZakatDistribution");
  const zakat = await ZakatDistribution.deploy(londcAddress, deployer.address);
  await zakat.waitForDeployment();
  const zakatAddress = await zakat.getAddress();
  deployment.contracts.ZakatDistribution = zakatAddress;
  deployment.deploymentTransactions.ZakatDistribution = zakat.deploymentTransaction()?.hash || null;
  persistDeployment();

  const vaultUpdate = await londc.setZakatVault(zakatAddress);
  await vaultUpdate.wait();
  deployment.setupTransactions.setZakatVault = vaultUpdate.hash;
  persistDeployment();

  const MetatronCodex = await ethers.getContractFactory("MetatronCodex");
  const codex = await MetatronCodex.deploy(
    config.platformWalletAddress,
    deployer.address,
    config.codexBaseUri
  );
  await codex.waitForDeployment();
  const codexAddress = await codex.getAddress();
  deployment.contracts.MetatronCodex = codexAddress;
  deployment.deploymentTransactions.MetatronCodex = codex.deploymentTransaction()?.hash || null;
  persistDeployment();

  const tokenOwnership = await londc.transferOwnership(config.ownerMultisigAddress);
  await tokenOwnership.wait();
  deployment.setupTransactions.tokenOwnership = tokenOwnership.hash;
  persistDeployment();

  const zakatOwnership = await zakat.transferOwnership(config.ownerMultisigAddress);
  await zakatOwnership.wait();
  deployment.setupTransactions.zakatOwnership = zakatOwnership.hash;
  persistDeployment();

  const codexOwnership = await codex.transferOwnership(config.ownerMultisigAddress);
  await codexOwnership.wait();
  deployment.setupTransactions.codexOwnership = codexOwnership.hash;
  deployment.status = "DEPLOYED_PENDING_EXTERNAL_VERIFICATION";
  deployment.ownershipStatus = "TRANSFERRED_TO_MULTISIG";
  persistDeployment();

  console.log("\nDeployment record written:", outputPath);
  console.log("LONDC:", londcAddress);
  console.log("ZakatDistribution:", zakatAddress);
  console.log("MetatronCodex:", codexAddress);
  console.log("Ownership transferred to multisig:", config.ownerMultisigAddress);
  console.log("Status remains pending external source verification and independent review.");
}

main().catch((error) => {
  console.error("Deployment stopped:", error.message);
  process.exitCode = 1;
});
