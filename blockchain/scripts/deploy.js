/**
 * ScrollVerse Mainnet Deployment Script
 * Author: Chais "Sabir Kajir" Hill the Great × Manus AI
 *
 * USAGE:
 *   Testnet (Amoy):  npx hardhat run scripts/deploy.js --network amoy
 *   Mainnet:         npx hardhat run scripts/deploy.js --network polygon
 *
 * REQUIRED ENV VARS (in .env):
 *   DEPLOYER_PRIVATE_KEY=0x...
 *   ZAKAT_VAULT_ADDRESS=0x...
 *   PLATFORM_WALLET_ADDRESS=0x...
 *   CODEX_BASE_URI=ipfs://...
 *   POLYGONSCAN_API_KEY=...
 *
 * KUN FAYAKUN x Infinity
 */

const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("\n🕋 ScrollVerse Sovereign Deployment");
  console.log("====================================");
  console.log(`Deployer: ${deployer.address}`);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Balance: ${ethers.formatEther(balance)} MATIC\n`);

  const ZAKAT_VAULT = process.env.ZAKAT_VAULT_ADDRESS || deployer.address;
  const PLATFORM_WALLET = process.env.PLATFORM_WALLET_ADDRESS || deployer.address;
  const CODEX_BASE_URI = process.env.CODEX_BASE_URI || "ipfs://QmPlaceholder/";

  // ── 1. Deploy LONDC Token ─────────────────────────────────────────────────
  console.log("⚡ Deploying LONDC Token...");
  const LONDCToken = await ethers.getContractFactory("LONDCToken");
  const londc = await LONDCToken.deploy(ZAKAT_VAULT, PLATFORM_WALLET, deployer.address);
  await londc.waitForDeployment();
  const londcAddress = await londc.getAddress();
  console.log(`✅ LONDC Token: ${londcAddress}`);

  // ── 2. Deploy ZakatDistribution ───────────────────────────────────────────
  console.log("⚡ Deploying ZakatDistribution...");
  const ZakatDistribution = await ethers.getContractFactory("ZakatDistribution");
  const zakat = await ZakatDistribution.deploy(londcAddress, deployer.address);
  await zakat.waitForDeployment();
  const zakatAddress = await zakat.getAddress();
  console.log(`✅ ZakatDistribution: ${zakatAddress}`);

  // Update LONDC to point to real Zakat vault
  await londc.setZakatVault(zakatAddress);
  console.log(`✅ LONDC Zakat vault updated to: ${zakatAddress}`);

  // ── 3. Deploy MetatronCodex NFT ───────────────────────────────────────────
  console.log("⚡ Deploying MetatronCodex NFT...");
  const MetatronCodex = await ethers.getContractFactory("MetatronCodex");
  const codex = await MetatronCodex.deploy(PLATFORM_WALLET, deployer.address, CODEX_BASE_URI);
  await codex.waitForDeployment();
  const codexAddress = await codex.getAddress();
  console.log(`✅ MetatronCodex: ${codexAddress}`);

  // ── 4. Save deployment addresses ─────────────────────────────────────────
  const deployment = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      LONDCToken: londcAddress,
      ZakatDistribution: zakatAddress,
      MetatronCodex: codexAddress,
    },
  };

  fs.writeFileSync(
    "./blockchain/config/deployment.json",
    JSON.stringify(deployment, null, 2)
  );
  console.log("\n📄 Deployment saved to blockchain/config/deployment.json");

  // ── 5. Verification commands ──────────────────────────────────────────────
  console.log("\n🔍 Verify on PolygonScan:");
  console.log(`npx hardhat verify --network polygon ${londcAddress} "${ZAKAT_VAULT}" "${PLATFORM_WALLET}" "${deployer.address}"`);
  console.log(`npx hardhat verify --network polygon ${zakatAddress} "${londcAddress}" "${deployer.address}"`);
  console.log(`npx hardhat verify --network polygon ${codexAddress} "${PLATFORM_WALLET}" "${deployer.address}" "${CODEX_BASE_URI}"`);

  console.log("\n🕋 KUN FAYAKUN x Infinity — Deployment Complete");
  console.log("==============================================");
  console.log(`LONDC:    ${londcAddress}`);
  console.log(`Zakat:    ${zakatAddress}`);
  console.log(`Codex:    ${codexAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
