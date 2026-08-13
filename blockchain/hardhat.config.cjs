/**
 * ScrollVerse blockchain workspace configuration.
 * Use this blockchain-root config for local preflight and any future selected-network deployment.
 */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env.blockchain" });

const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const DEPLOYER_ACCOUNTS = DEPLOYER_KEY ? [DEPLOYER_KEY] : [];

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.8.26", settings: { optimizer: { enabled: true, runs: 200 }, evmVersion: "cancun" } },
    ],
  },
  networks: {
    polygon: { url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com", accounts: DEPLOYER_ACCOUNTS, chainId: 137, gasPrice: "auto" },
    amoy: { url: process.env.AMOY_RPC_URL || "https://rpc-amoy.polygon.technology", accounts: DEPLOYER_ACCOUNTS, chainId: 80002, gasPrice: "auto" },
    base: { url: process.env.BASE_RPC_URL || "https://mainnet.base.org", accounts: DEPLOYER_ACCOUNTS, chainId: 8453 },
    ethereum: { url: process.env.ETH_RPC_URL || `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`, accounts: DEPLOYER_ACCOUNTS, chainId: 1 },
  },
  etherscan: {
    apiKey: { polygon: process.env.POLYGONSCAN_API_KEY || "", polygonAmoy: process.env.POLYGONSCAN_API_KEY || "", base: process.env.BASESCAN_API_KEY || "", mainnet: process.env.ETHERSCAN_API_KEY || "" },
    customChains: [{ network: "polygonAmoy", chainId: 80002, urls: { apiURL: "https://api-amoy.polygonscan.com/api", browserURL: "https://amoy.polygonscan.com" } }],
  },
  paths: { sources: "./contracts", scripts: "./scripts", artifacts: "./artifacts", cache: "./cache" },
};
