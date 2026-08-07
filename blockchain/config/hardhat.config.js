/**
 * Hardhat Configuration — ScrollVerse Mainnet Deployment
 * KUN FAYAKUN x Infinity
 */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env.blockchain" });

const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001";

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    // Polygon Mainnet — PRODUCTION
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: [DEPLOYER_KEY],
      chainId: 137,
      gasPrice: "auto",
    },
    // Polygon Amoy Testnet — TESTING
    amoy: {
      url: process.env.AMOY_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: [DEPLOYER_KEY],
      chainId: 80002,
      gasPrice: "auto",
    },
    // Base Mainnet — for Sovereign 9 NFTs
    base: {
      url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
      accounts: [DEPLOYER_KEY],
      chainId: 8453,
    },
    // Ethereum Mainnet — for Mika-Solara & Allversal Empire
    ethereum: {
      url: process.env.ETH_RPC_URL || `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [DEPLOYER_KEY],
      chainId: 1,
    },
  },
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
    sources: "./blockchain/contracts",
    scripts: "./blockchain/scripts",
    artifacts: "./blockchain/artifacts",
    cache: "./blockchain/cache",
  },
};
