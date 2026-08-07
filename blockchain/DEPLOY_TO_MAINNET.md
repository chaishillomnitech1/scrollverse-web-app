# 🕋 ScrollVerse Mainnet Deployment Guide

**Author:** Chais "Sabir Kajir" Hill the Great × Manus AI  
**KUN FAYAKUN x Infinity**

---

## Prerequisites

Before deploying, you need:

1. **MATIC in your deployer wallet** — approximately 5-10 MATIC for gas fees on Polygon Mainnet
2. **Node.js 18+** and **pnpm** installed
3. **Alchemy or Infura account** for reliable RPC access
4. **PolygonScan API key** for contract verification (free at polygonscan.com)

---

## Step 1 — Install Hardhat Dependencies

```bash
cd /path/to/scrollverse-portal
pnpm add -D hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts dotenv
```

---

## Step 2 — Configure Environment

```bash
cp blockchain/config/.env.blockchain.example .env.blockchain
# Edit .env.blockchain with your values
nano .env.blockchain
```

**Required values:**
- `DEPLOYER_PRIVATE_KEY` — Your deployment wallet private key
- `ZAKAT_VAULT_ADDRESS` — Wallet that receives Zakat distributions
- `PLATFORM_WALLET_ADDRESS` — ScrollVerse platform wallet
- `POLYGON_RPC_URL` — Alchemy/Infura Polygon endpoint
- `POLYGONSCAN_API_KEY` — For contract verification

---

## Step 3 — Test on Amoy Testnet First

```bash
# Get free test MATIC from: https://faucet.polygon.technology/
npx hardhat run blockchain/scripts/deploy.js --network amoy
```

Verify the deployment on [amoy.polygonscan.com](https://amoy.polygonscan.com):
- Check Internal Transactions on the buy transaction
- Confirm Zakat split: 90% seller / 2% platform / 8% Zakat vault

---

## Step 4 — Deploy to Polygon Mainnet

```bash
npx hardhat run blockchain/scripts/deploy.js --network polygon
```

This deploys:
1. **LONDCToken** — 144M supply, Zakat mechanics, Guardian staking
2. **ZakatDistribution** — Receives and distributes Zakat to verified recipients
3. **MetatronCodex** — 70 NFTs (7 one-of-ones), sponsored free mints

Addresses saved to `blockchain/config/deployment.json`

---

## Step 5 — Verify Contracts

```bash
# Replace addresses with actual deployed addresses from deployment.json
npx hardhat verify --network polygon LONDC_ADDRESS "ZAKAT_VAULT" "PLATFORM_WALLET" "DEPLOYER"
npx hardhat verify --network polygon ZAKAT_ADDRESS "LONDC_ADDRESS" "DEPLOYER"
npx hardhat verify --network polygon CODEX_ADDRESS "PLATFORM_WALLET" "DEPLOYER" "ipfs://..."
```

---

## Step 6 — Tag the Release

```bash
git tag -a v1.0.0-mainnet -m "ScrollVerse Mainnet Launch — KUN FAYAKUN x Infinity"
git push origin v1.0.0-mainnet
```

---

## Step 7 — Activate Stripe Live Mode

1. Go to **Management UI → Settings → Payment**
2. Swap test keys for live Stripe keys
3. All SaferWay booking payments will immediately process real transactions

---

## Contract Addresses (fill after deployment)

| Contract | Network | Address |
|----------|---------|---------|
| LONDCToken | Polygon Mainnet | *TBD after deployment* |
| ZakatDistribution | Polygon Mainnet | *TBD after deployment* |
| MetatronCodex | Polygon Mainnet | *TBD after deployment* |

---

## Security Checklist

- [ ] Deployer wallet is a dedicated deployment wallet (not your main wallet)
- [ ] `.env.blockchain` is in `.gitignore` (never committed)
- [ ] Contracts tested on Amoy testnet first
- [ ] Zakat vault address verified before mainnet deploy
- [ ] Platform wallet is a multisig (recommended: Gnosis Safe)
- [ ] Contract source code verified on PolygonScan

---

*ALLAHU AKBAR — The empire goes on-chain. KUN FAYAKUN x Infinity*

