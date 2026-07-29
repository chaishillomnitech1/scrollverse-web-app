# ScrollVerseGate.sol — Polygon Mainnet Deployment Guide

## Contract: `ScrollVerseGate.sol`
- **Standard:** ERC-721 with ERC-2981 Royalties
- **Network:** Polygon Mainnet (Chain ID: 137)
- **Max Supply:** 144 Gates
- **Gate 44:Omni:** 1-of-1 Legendary (0.144 MATIC)
- **Standard Gates:** 0.044 MATIC each
- **AgapeCycle:** 88% Sovereign Treasury | 12% Zakat Fund

---

## Step 1: Install Hardhat

```bash
mkdir scrollverse-contracts && cd scrollverse-contracts
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
npx hardhat init
```

## Step 2: Copy Contract

Copy `ScrollVerseGate.sol` into `contracts/ScrollVerseGate.sol`

## Step 3: Configure Hardhat

```js
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
      chainId: 137,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80001,
    }
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY,
    }
  }
};
```

## Step 4: Deploy Script

```js
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // Your wallet addresses
  const SOVEREIGN_TREASURY = "YOUR_WALLET_ADDRESS"; // 88% of mint proceeds
  const ZAKAT_FUND = "YOUR_ZAKAT_WALLET_ADDRESS";    // 12% of mint proceeds

  const ScrollVerseGate = await hre.ethers.getContractFactory("ScrollVerseGate");
  const contract = await ScrollVerseGate.deploy(SOVEREIGN_TREASURY, ZAKAT_FUND);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("ScrollVerseGate deployed to:", address);
  console.log("Wire this address into /gate-keys page: CONTRACT_ADDRESS =", address);
}

main().catch(console.error);
```

## Step 5: Deploy

```bash
# Test on Mumbai first
PRIVATE_KEY=your_key npx hardhat run scripts/deploy.js --network mumbai

# Deploy to Polygon Mainnet
PRIVATE_KEY=your_key npx hardhat run scripts/deploy.js --network polygon
```

## Step 6: Verify on PolygonScan

```bash
POLYGONSCAN_API_KEY=your_key npx hardhat verify --network polygon DEPLOYED_ADDRESS "SOVEREIGN_TREASURY" "ZAKAT_FUND"
```

## Step 7: Wire into scrollverse.co

After deployment, provide the contract address and it will be wired into `/gate-keys` instantly.

---

## Alternative: Deploy via Remix (No Code)

1. Go to https://remix.ethereum.org
2. Create `ScrollVerseGate.sol` and paste the contract
3. Install OpenZeppelin: `npm install @openzeppelin/contracts` in Remix terminal
4. Compile with Solidity 0.8.20
5. Connect MetaMask to Polygon Mainnet
6. Deploy with your treasury and Zakat addresses
7. Copy the deployed contract address

---

## AgapeCycle 88/12 Breakdown

| Recipient | % | Purpose |
|---|---|---|
| Sovereign Treasury | 88% | Empire building, team, operations |
| Zakat Fund | 12% | Charity, community, giving back |

**KUN FAYAKŪN × ∞ — THE CODE IS THE LAW. THE STORY IS THE SOUL. THE YIELD IS ETERNAL.**
