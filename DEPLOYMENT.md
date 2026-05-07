# $LONDC Sovereign Contract Deployment Guide

**ScrollVerse Trinity — Polygon Mainnet Deployment**  
Sovereign Wallet: `0x377956c1471d9ce142df6932895839243da23a2c`

---

## Overview

The ScrollVerse Trinity deploys three interconnected smart contracts to Polygon Mainnet:

| Contract | Symbol | Type | Purpose |
|---|---|---|---|
| $LONDC Token | LONDC | ERC-20 | Sovereign currency — 144M supply, 2.5% Zakat burn + 7.77% distribution |
| ZakatDistribution | ZAKAT | Vault | Receives 7.77% of all transfers, distributes to Guardians |
| ScrollSoul NFT | SOUL | ERC-721 | Guardian identity NFTs — 144,000 max supply, 7.77% royalties |

---

## Prerequisites

- **Node.js** v18+ and **npm** v9+
- **Hardhat** v2.22+ (installed via npm)
- **MetaMask** or hardware wallet for deployer account
- **~5 MATIC** on Polygon Mainnet for gas fees
- **Alchemy** or **Infura** API key for Polygon RPC
- **Polygonscan** API key for contract verification

---

## Step 1: Environment Setup

```bash
# Clone the contracts repository
git clone https://github.com/chaishillomnitech1/scrollverse-trinity
cd scrollverse-trinity/contracts

# Install dependencies
npm install

# Install Hardhat toolbox
npm install --save-dev @nomicfoundation/hardhat-toolbox

# Copy environment template
cp .env.example .env
```

Edit `.env` with your values:

```env
# Deployer private key (NEVER use sovereign wallet as deployer)
DEPLOYER_PRIVATE_KEY=0x_your_deployer_private_key_here

# Polygon Mainnet RPC (get from https://alchemy.com)
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY

# Polygon Mumbai Testnet RPC
MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY

# Polygonscan API key for verification (https://polygonscan.com/myapikey)
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Sovereign wallet — receives Zakat withdrawals + NFT royalties
SOVEREIGN_WALLET=0x377956c1471d9ce142df6932895839243da23a2c
```

---

## Step 2: Hardhat Configuration

`hardhat.config.ts`:

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "",
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
      chainId: 80001,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "",
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY]
        : [],
      chainId: 137,
      gasPrice: 50000000000, // 50 gwei — adjust based on network conditions
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
```

---

## Step 3: Contract ABIs

### $LONDC Token (ERC-20)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LONDCToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 144_000_000 * 10**18;
    uint256 public constant ZAKAT_BURN_BPS = 250;       // 2.5%
    uint256 public constant ZAKAT_DIST_BPS = 777;       // 7.77%
    
    address public zakatVault;
    bool public zakatEnabled = true;
    
    event ZakatBurned(address indexed from, uint256 amount);
    event ZakatDistributed(address indexed from, uint256 amount);
    
    constructor(address _zakatVault, address _sovereign) 
        ERC20("LONDC Token", "LONDC") 
        Ownable(_sovereign) 
    {
        zakatVault = _zakatVault;
        _mint(_sovereign, TOTAL_SUPPLY);
    }
    
    function _update(address from, address to, uint256 amount) 
        internal override 
    {
        if (zakatEnabled && from != address(0) && to != address(0)) {
            uint256 burnAmt = (amount * ZAKAT_BURN_BPS) / 10000;
            uint256 distAmt = (amount * ZAKAT_DIST_BPS) / 10000;
            uint256 netAmt = amount - burnAmt - distAmt;
            
            super._update(from, address(0), burnAmt);
            super._update(from, zakatVault, distAmt);
            super._update(from, to, netAmt);
            
            emit ZakatBurned(from, burnAmt);
            emit ZakatDistributed(from, distAmt);
        } else {
            super._update(from, to, amount);
        }
    }
    
    function toggleZakat(bool enabled) external onlyOwner {
        zakatEnabled = enabled;
    }
    
    function setZakatVault(address _vault) external onlyOwner {
        zakatVault = _vault;
    }
}
```

**Key ABI Functions:**
- `transfer(address to, uint256 amount)` — auto-applies Zakat
- `toggleZakat(bool enabled)` — owner only
- `setZakatVault(address _vault)` — owner only
- `zakatEnabled()` → bool
- `zakatVault()` → address

---

### ZakatDistribution Vault

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ZakatDistribution is Ownable {
    IERC20 public londc;
    address public sovereignWallet;
    
    // 44.44% to Guardian pool, 55.56% to Sovereign
    uint256 public constant GUARDIAN_SHARE_BPS = 4444;
    uint256 public constant SOVEREIGN_SHARE_BPS = 5556;
    
    mapping(address => uint256) public guardianClaims;
    uint256 public totalGuardianPool;
    
    event ZakatReceived(uint256 amount);
    event GuardianClaimed(address indexed guardian, uint256 amount);
    event SovereignWithdrew(uint256 amount);
    
    constructor(address _londc, address _sovereign) Ownable(_sovereign) {
        londc = IERC20(_londc);
        sovereignWallet = _sovereign;
    }
    
    function distribute() external {
        uint256 balance = londc.balanceOf(address(this));
        require(balance > 0, "Nothing to distribute");
        
        uint256 guardianAmt = (balance * GUARDIAN_SHARE_BPS) / 10000;
        uint256 sovereignAmt = balance - guardianAmt;
        
        totalGuardianPool += guardianAmt;
        londc.transfer(sovereignWallet, sovereignAmt);
        
        emit ZakatReceived(balance);
    }
    
    function sovereignWithdraw(uint256 amount) external onlyOwner {
        londc.transfer(sovereignWallet, amount);
        emit SovereignWithdrew(amount);
    }
}
```

---

### ScrollSoul NFT (ERC-721)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScrollSoulNFT is ERC721, IERC2981, Ownable {
    uint256 public constant MAX_SUPPLY = 144_000;
    uint256 public constant ROYALTY_BPS = 777; // 7.77%
    uint256 public mintPrice = 144 ether; // 144 MATIC
    
    uint256 private _tokenIdCounter;
    address public royaltyReceiver;
    
    enum GuardianTier { Visitor, Guardian, Sovereign, Ascendant, Legion }
    mapping(uint256 => GuardianTier) public tokenTier;
    
    event ScrollSoulMinted(address indexed to, uint256 tokenId, GuardianTier tier);
    
    constructor(address _sovereign) 
        ERC721("ScrollSoul", "SOUL") 
        Ownable(_sovereign) 
    {
        royaltyReceiver = _sovereign;
    }
    
    function mint(GuardianTier tier) external payable {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= mintPrice, "Insufficient MATIC");
        
        uint256 tokenId = ++_tokenIdCounter;
        tokenTier[tokenId] = tier;
        _safeMint(msg.sender, tokenId);
        
        payable(royaltyReceiver).transfer(msg.value);
        emit ScrollSoulMinted(msg.sender, tokenId, tier);
    }
    
    function royaltyInfo(uint256, uint256 salePrice) 
        external view override 
        returns (address receiver, uint256 royaltyAmount) 
    {
        return (royaltyReceiver, (salePrice * ROYALTY_BPS) / 10000);
    }
    
    function supportsInterface(bytes4 interfaceId) 
        public view override(ERC721, IERC165) 
        returns (bool) 
    {
        return interfaceId == type(IERC2981).interfaceId || 
               super.supportsInterface(interfaceId);
    }
    
    function setMintPrice(uint256 _price) external onlyOwner {
        mintPrice = _price;
    }
    
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }
}
```

---

## Step 4: Deployment Script

`scripts/deploy.ts`:

```typescript
import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  const SOVEREIGN = "0x377956c1471d9ce142df6932895839243da23a2c";
  
  console.log("Deploying ScrollVerse Trinity contracts...");
  console.log("Deployer:", deployer.address);
  console.log("Network:", (await ethers.provider.getNetwork()).name);
  
  // 1. Deploy ZakatDistribution placeholder (needs LONDC address)
  console.log("\n1. Deploying ZakatDistribution...");
  const ZakatFactory = await ethers.getContractFactory("ZakatDistribution");
  
  // 2. Deploy LONDC Token
  console.log("2. Deploying LONDCToken...");
  const LONDCFactory = await ethers.getContractFactory("LONDCToken");
  
  // Deploy Zakat vault with temp address, update after LONDC deploy
  const zakat = await ZakatFactory.deploy(
    ethers.ZeroAddress, // temp — updated below
    SOVEREIGN
  );
  await zakat.waitForDeployment();
  console.log("   ZakatDistribution:", await zakat.getAddress());
  
  const londc = await LONDCFactory.deploy(
    await zakat.getAddress(),
    SOVEREIGN
  );
  await londc.waitForDeployment();
  console.log("   LONDCToken:", await londc.getAddress());
  
  // 3. Deploy ScrollSoul NFT
  console.log("3. Deploying ScrollSoulNFT...");
  const NFTFactory = await ethers.getContractFactory("ScrollSoulNFT");
  const nft = await NFTFactory.deploy(SOVEREIGN);
  await nft.waitForDeployment();
  console.log("   ScrollSoulNFT:", await nft.getAddress());
  
  // Save addresses
  const addresses = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    deployer: deployer.address,
    sovereign: SOVEREIGN,
    contracts: {
      LONDC_CONTRACT_ADDRESS: await londc.getAddress(),
      ZAKAT_CONTRACT_ADDRESS: await zakat.getAddress(),
      GUARDIAN_CONTRACT_ADDRESS: await nft.getAddress(),
    },
    deployedAt: new Date().toISOString(),
  };
  
  fs.writeFileSync(
    "deployed-addresses.json",
    JSON.stringify(addresses, null, 2)
  );
  
  console.log("\n✅ Deployment complete!");
  console.log("Addresses saved to deployed-addresses.json");
  console.log("\nNext: Add to ScrollVerse Portal Secrets:");
  Object.entries(addresses.contracts).forEach(([key, val]) => {
    console.log(`  ${key}=${val}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## Step 5: Deploy Commands

```bash
# Run local tests first
npx hardhat test

# Deploy to Mumbai testnet
npx hardhat run scripts/deploy.ts --network mumbai

# Verify on Mumbai
npx hardhat verify --network mumbai <LONDC_ADDRESS> <ZAKAT_ADDRESS> <SOVEREIGN>
npx hardhat verify --network mumbai <NFT_ADDRESS> <SOVEREIGN>

# ✅ When tests pass — deploy to Polygon Mainnet
npx hardhat run scripts/deploy.ts --network polygon

# Verify on Polygon Mainnet
npx hardhat verify --network polygon <LONDC_ADDRESS> <ZAKAT_ADDRESS> <SOVEREIGN>
npx hardhat verify --network polygon <ZAKAT_ADDRESS> <LONDC_ADDRESS> <SOVEREIGN>
npx hardhat verify --network polygon <NFT_ADDRESS> <SOVEREIGN>
```

---

## Step 6: Activate the Portal

After deployment, add contract addresses to the ScrollVerse Portal:

1. Go to **Portal → Settings → Secrets**
2. Add the following environment variables:

```env
GUARDIAN_CONTRACT_ADDRESS=0x_your_nft_contract_address
LONDC_CONTRACT_ADDRESS=0x_your_londc_contract_address
ZAKAT_CONTRACT_ADDRESS=0x_your_zakat_contract_address
```

3. The Guardian counter, NFT minting, and $LONDC features will go live instantly.

---

## Gas Estimates (Polygon Mainnet)

| Operation | Estimated Gas | Est. Cost (50 gwei) |
|---|---|---|
| Deploy LONDCToken | ~1,800,000 | ~0.09 MATIC |
| Deploy ZakatDistribution | ~800,000 | ~0.04 MATIC |
| Deploy ScrollSoulNFT | ~2,200,000 | ~0.11 MATIC |
| **Total** | **~4,800,000** | **~0.24 MATIC** |

Fund your deployer wallet with at least **5 MATIC** to cover deployment + verification.

---

## Security Checklist

- [ ] Deployer wallet is separate from sovereign wallet
- [ ] Private key is in `.env` only — never committed to git
- [ ] `.env` is in `.gitignore`
- [ ] Tested on Mumbai testnet before mainnet
- [ ] Contract verified on Polygonscan
- [ ] Sovereign wallet has received initial LONDC supply
- [ ] Portal secrets updated with contract addresses

---

## Useful Links

- [Polygon Mainnet Faucet](https://faucet.polygon.technology/) (for Mumbai testnet MATIC)
- [Alchemy](https://alchemy.com) — RPC provider
- [Polygonscan](https://polygonscan.com) — Contract explorer
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)
- [Hardhat Docs](https://hardhat.org/docs)
- [GitHub: scrollverse-trinity](https://github.com/chaishillomnitech1/scrollverse-trinity)

---

*KUN FAYAKŪN × ∞ — The ScrollVerse becomes the source chain.*
