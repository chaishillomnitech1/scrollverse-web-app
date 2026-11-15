/**
 * Hardhat Configuration — ScrollVerse Mainnet Deployment
 * KUN FAYAKUN x Infinity
 */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env.blockchain" });
const path = require("path");

const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const DEPLOYER_ACCOUNTS = DEPLOYER_KEY ? [DEPLOYER_KEY] : [];
const PROJECT_ROOT = path.resolve(__dirname, "../..");

const networks = { hardhat: { chainId: 31337 } };
if (process.env.AMOY_RPC_URL) networks.amoy = { url: process.env.AMOY_RPC_URL, accounts: DEPLOYER_ACCOUNTS, chainId: 80002, gasPrice: "auto" };
if (process.env.POLYGON_RPC_URL) networks.polygon = { url: process.env.POLYGON_RPC_URL, accounts: DEPLOYER_ACCOUNTS, chainId: 137, gasPrice: "auto" };
if (process.env.BASE_RPC_URL) networks.base = { url: process.env.BASE_RPC_URL, accounts: DEPLOYER_ACCOUNTS, chainId: 8453 };
if (process.env.ETH_RPC_URL) networks.ethereum = { url: process.env.ETH_RPC_URL, accounts: DEPLOYER_ACCOUNTS, chainId: 1 };

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.8.26", settings: { optimizer: { enabled: true, runs: 200 }, evmVersion: "cancun" } },
    ],
  },
  networks,
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonAmoy: process.env.POLYGONSCAN_API_KEY || "",
      base: process.env.BASESCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
    ],
  },
  paths: {
    sources: path.join(PROJECT_ROOT, "blockchain/contracts"),
    scripts: path.join(PROJECT_ROOT, "blockchain/scripts"),
    artifacts: path.join(PROJECT_ROOT, "blockchain/artifacts"),
    cache: path.join(PROJECT_ROOT, "blockchain/cache"),
  },
};
