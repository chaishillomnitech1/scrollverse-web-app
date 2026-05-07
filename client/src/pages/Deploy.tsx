/**
 * ScrollVerse Trinity — Sovereign Contract Deployment Dashboard
 * Full Hardhat guide, contract ABI display, Polygon Mainnet instructions
 */
import { useState } from "react";
import { Link } from "wouter";

const SOVEREIGN_WALLET = "0x377956c1471d9ce142df6932895839243da23a2c";
const POLYGON_EXPLORER = "https://polygonscan.com";

const CONTRACTS = [
  {
    name: "$LONDC Token",
    symbol: "LONDC",
    type: "ERC-20",
    frequency: "528Hz",
    freqLabel: "DNA Repair / Love",
    color: "#00D4FF",
    description: "Sovereign currency of the ScrollVerse ecosystem. 144M total supply. 2.5% Zakat burn + 7.77% Zakat distribution on every transfer.",
    address: null,
    envKey: "LONDC_CONTRACT_ADDRESS",
    features: ["144,000,000 total supply", "2.5% Zakat burn per transfer", "7.77% auto-distribution", "Owner-controlled Zakat toggle"],
    abi: [
      "transfer(address to, uint256 amount) — auto-applies Zakat",
      "balanceOf(address account) view — uint256",
      "totalSupply() view — uint256",
      "toggleZakat(bool enabled) — onlyOwner",
      "setZakatVault(address _vault) — onlyOwner",
      "zakatEnabled() view — bool",
      "zakatVault() view — address",
      "event ZakatBurned(address indexed from, uint256 amount)",
      "event ZakatDistributed(address indexed from, uint256 amount)",
    ],
  },
  {
    name: "ZakatDistribution",
    symbol: "ZAKAT",
    type: "Vault",
    frequency: "963Hz",
    freqLabel: "Crown Chakra / Divine",
    color: "#FFB800",
    description: "Receives 7.77% of every $LONDC transfer. Distributes proportionally to Guardians. Sovereign wallet can withdraw at any time.",
    address: null,
    envKey: "ZAKAT_CONTRACT_ADDRESS",
    features: ["Receives 7.77% of all transfers", "44.44% to Guardian pool", "55.56% to Sovereign wallet", "Tier-weighted Guardian claims"],
    abi: [
      "distribute() — splits balance to Guardian pool + Sovereign",
      "sovereignWithdraw(uint256 amount) — onlyOwner",
      "totalGuardianPool() view — uint256",
      "guardianClaims(address) view — uint256",
      "event ZakatReceived(uint256 amount)",
      "event GuardianClaimed(address indexed guardian, uint256 amount)",
      "event SovereignWithdrew(uint256 amount)",
    ],
  },
  {
    name: "ScrollSoul NFT",
    symbol: "SOUL",
    type: "ERC-721",
    frequency: "432Hz",
    freqLabel: "Universal Harmony",
    color: "#00FF88",
    description: "Guardian identity NFTs. 144,000 max supply. 7.77% royalties on all secondary sales via EIP-2981.",
    address: null,
    envKey: "GUARDIAN_CONTRACT_ADDRESS",
    features: ["144,000 max supply", "4 Guardian tiers", "7.77% EIP-2981 royalties", "On-chain tier metadata"],
    abi: [
      "mint(uint8 tier) payable — costs 144 MATIC",
      "totalSupply() view — uint256",
      "tokenTier(uint256 tokenId) view — uint8",
      "royaltyInfo(uint256, uint256 salePrice) view — (address, uint256)",
      "setMintPrice(uint256 _price) — onlyOwner",
      "event ScrollSoulMinted(address indexed to, uint256 tokenId, uint8 tier)",
    ],
  },
];

const TIERS = [
  { tier: 1, name: "Guardian", price: "144 MATIC", color: "#00D4FF", usd: "$144" },
  { tier: 2, name: "Sovereign", price: "444 MATIC", color: "#FFB800", usd: "$444" },
  { tier: 3, name: "Ascendant", price: "1,444 MATIC", color: "#00FF88", usd: "$1,444" },
  { tier: 4, name: "AI Legion", price: "777 MATIC", color: "#9B59B6", usd: "$777" },
];

const DEPLOY_STEPS = [
  {
    step: "01",
    title: "Install Hardhat & Dependencies",
    description: "Clone the scrollverse-trinity repo and install Hardhat with the full toolbox for compilation, testing, and deployment.",
    code: `git clone https://github.com/chaishillomnitech1/scrollverse-trinity
cd scrollverse-trinity/contracts
npm install
npm install --save-dev @nomicfoundation/hardhat-toolbox
cp .env.example .env`,
    color: "#00D4FF",
  },
  {
    step: "02",
    title: "Configure Environment & hardhat.config.ts",
    description: "Set your deployer private key, Alchemy RPC URLs, and Polygonscan API key. NEVER use your sovereign wallet as deployer.",
    code: `# Edit .env with your values:
# DEPLOYER_PRIVATE_KEY=0x_your_deployer_private_key
# POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
# MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
# POLYGONSCAN_API_KEY=your_polygonscan_api_key
# SOVEREIGN_WALLET=0x377956c1471d9ce142df6932895839243da23a2c`,
    color: "#FFB800",
  },
  {
    step: "03",
    title: "Compile & Run Tests Locally",
    description: "Run the full Hardhat test suite against a local Hardhat node. All 3 contracts must pass before deploying to any network.",
    code: `# Compile contracts
npx hardhat compile

# Run all tests
npx hardhat test

# Run with gas reporter
REPORT_GAS=true npx hardhat test`,
    color: "#00FF88",
  },
  {
    step: "04",
    title: "Deploy to Mumbai Testnet",
    description: "Deploy all 3 contracts to Polygon Mumbai testnet first. Get free MATIC from the Mumbai faucet. Verify contracts on Polygonscan.",
    code: `# Get Mumbai testnet MATIC: https://faucet.polygon.technology/

# Deploy to Mumbai
npx hardhat run scripts/deploy.ts --network mumbai

# Verify contracts on Mumbai
npx hardhat verify --network mumbai <LONDC_ADDR> <ZAKAT_ADDR> <SOVEREIGN>
npx hardhat verify --network mumbai <NFT_ADDR> <SOVEREIGN>`,
    color: "#9B59B6",
  },
  {
    step: "05",
    title: "Deploy to Polygon Mainnet",
    description: "When Mumbai tests pass, deploy to Polygon Mainnet. Fund deployer with ~5 MATIC. The script deploys all 3 contracts and wires them automatically.",
    code: `# Deploy to Polygon Mainnet
npx hardhat run scripts/deploy.ts --network polygon

# Verify on Polygonscan
npx hardhat verify --network polygon <LONDC_ADDR> <ZAKAT_ADDR> <SOVEREIGN>
npx hardhat verify --network polygon <ZAKAT_ADDR> <LONDC_ADDR> <SOVEREIGN>
npx hardhat verify --network polygon <NFT_ADDR> <SOVEREIGN>

# Addresses saved to deployed-addresses.json`,
    color: "#FF6B35",
  },
  {
    step: "06",
    title: "Activate the Portal",
    description: "Add the deployed contract addresses to the Portal Secrets panel. Guardian counter, NFT minting, and $LONDC features go live instantly.",
    code: `# Portal Settings > Secrets — add:
# GUARDIAN_CONTRACT_ADDRESS=0x_your_nft_contract
# LONDC_CONTRACT_ADDRESS=0x_your_londc_contract
# ZAKAT_CONTRACT_ADDRESS=0x_your_zakat_contract

# Redeploy portal to activate on-chain features`,
    color: "#00D4FF",
  },
];

const GAS_ESTIMATES = [
  { contract: "LONDCToken", gas: "~1,800,000", cost: "~0.09 MATIC", color: "#00D4FF" },
  { contract: "ZakatDistribution", gas: "~800,000", cost: "~0.04 MATIC", color: "#FFB800" },
  { contract: "ScrollSoulNFT", gas: "~2,200,000", cost: "~0.11 MATIC", color: "#00FF88" },
  { contract: "Total", gas: "~4,800,000", cost: "~0.24 MATIC", color: "#FF6B35" },
];

const HARDHAT_CONFIG = `import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "",
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      chainId: 80001,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "",
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      chainId: 137,
      gasPrice: 50000000000,
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
};

export default config;`;

export default function Deploy() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedContract, setExpandedContract] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"guide" | "abi" | "config" | "gas">("guide");

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(5,11,26,0.95)" }}>
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 text-white hover:text-[#00D4FF] transition-colors">
              <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-semibold">ScrollVerse</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>CONTRACTS</span>
            </a>
          </Link>
          <a href="https://github.com/chaishillomnitech1/scrollverse-trinity" target="_blank" rel="noopener noreferrer" className="text-sm font-mono px-4 py-2 rounded-lg transition-all" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
            GitHub →
          </a>
        </div>
      </div>

      <div className="container py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>SOVEREIGN BLOCKCHAIN INFRASTRUCTURE</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            $LONDC Deployment
            <span className="block text-2xl md:text-3xl mt-2" style={{ color: "#FFB800" }}>Polygon Mainnet · Hardhat · ERC-20 + ERC-721</span>
          </h1>
          <p className="text-base max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Full Hardhat deployment guide for the ScrollVerse Trinity smart contracts. Deploy $LONDC token, ZakatDistribution vault, and ScrollSoul NFT to Polygon Mainnet.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="px-4 py-2 rounded-lg text-sm font-mono" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>◉ Polygon Mainnet</div>
            <div className="px-4 py-2 rounded-lg text-sm font-mono" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>Hardhat v2.22+</div>
            <div className="px-4 py-2 rounded-lg text-sm font-mono" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", color: "#FFB800" }}>EIP-2981 Royalties</div>
            <div className="px-4 py-2 rounded-lg text-sm font-mono" style={{ background: "rgba(155,89,182,0.08)", border: "1px solid rgba(155,89,182,0.2)", color: "#9B59B6" }}>OpenZeppelin v5</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(["guide", "abi", "config", "gas"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all"
              style={activeTab === tab
                ? { background: "linear-gradient(135deg, #00D4FF, #0099BB)", color: "#050B1A" }
                : { background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {tab === "guide" ? "📋 Deploy Guide" : tab === "abi" ? "📜 Contract ABIs" : tab === "config" ? "⚙️ Hardhat Config" : "⛽ Gas Estimates"}
            </button>
          ))}
        </div>

        {/* Tab: Deploy Guide */}
        {activeTab === "guide" && (
          <div className="space-y-6 mb-16">
            {DEPLOY_STEPS.map((s, idx) => (
              <div key={s.step} className="rounded-xl p-6 relative" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${s.color}20` }}>
                <div className="flex items-start gap-6">
                  <div className="text-3xl font-black flex-shrink-0" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.step}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                    <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{s.description}</p>
                    <div className="relative rounded-lg p-4 text-xs font-mono" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <pre className="text-left whitespace-pre-wrap overflow-x-auto" style={{ color: "#8899AA" }}>{s.code}</pre>
                      <button
                        onClick={() => copyCode(s.code, `step-${idx}`)}
                        className="absolute top-2 right-2 px-2 py-1 rounded text-xs transition-all"
                        style={{ background: copiedCode === `step-${idx}` ? `${s.color}20` : "rgba(255,255,255,0.05)", color: copiedCode === `step-${idx}` ? s.color : "#8899AA", border: `1px solid ${copiedCode === `step-${idx}` ? s.color + "40" : "rgba(255,255,255,0.1)"}` }}
                      >
                        {copiedCode === `step-${idx}` ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Contract ABIs */}
        {activeTab === "abi" && (
          <div className="space-y-6 mb-16">
            {CONTRACTS.map((c, idx) => (
              <div key={c.name} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${c.color}20` }}>
                <button
                  onClick={() => setExpandedContract(expandedContract === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}30` }}>
                      {c.symbol}
                    </div>
                    <div>
                      <div className="font-bold text-white">{c.name}</div>
                      <div className="text-xs font-mono" style={{ color: c.color }}>{c.type} · {c.frequency} {c.freqLabel}</div>
                    </div>
                  </div>
                  <div className="text-sm" style={{ color: "#8899AA" }}>{expandedContract === idx ? "▲ Collapse" : "▼ View ABI"}</div>
                </button>
                {expandedContract === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{c.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {c.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "#8899AA" }}>
                          <span style={{ color: c.color }}>›</span> {f}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg p-4" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="text-xs font-mono mb-2" style={{ color: c.color }}>// ABI FUNCTIONS & EVENTS</div>
                      {c.abi.map((fn, i) => (
                        <div key={i} className="text-xs font-mono py-1" style={{ color: fn.startsWith("event") ? "#FFB800" : "#8899AA", borderBottom: i < c.abi.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                          {fn}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs font-mono px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#8899AA" }}>
                      {c.address ? (
                        <a href={`${POLYGON_EXPLORER}/address/${c.address}`} target="_blank" rel="noopener noreferrer" style={{ color: c.color }}>{c.address}</a>
                      ) : (
                        <span>Not yet deployed — set <span style={{ color: c.color }}>{c.envKey}</span> after deployment</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab: Hardhat Config */}
        {activeTab === "config" && (
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">hardhat.config.ts</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>Full Hardhat configuration for Polygon Mainnet + Mumbai testnet with Polygonscan verification.</p>
            </div>
            <div className="relative rounded-xl p-6" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <pre className="text-xs font-mono text-left whitespace-pre-wrap overflow-x-auto" style={{ color: "#8899AA" }}>{HARDHAT_CONFIG}</pre>
              <button
                onClick={() => copyCode(HARDHAT_CONFIG, "hardhat-config")}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{ background: copiedCode === "hardhat-config" ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.05)", color: copiedCode === "hardhat-config" ? "#00D4FF" : "#8899AA", border: `1px solid ${copiedCode === "hardhat-config" ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.1)"}` }}
              >
                {copiedCode === "hardhat-config" ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <div className="mt-6 rounded-xl p-6" style={{ background: "rgba(255,184,0,0.03)", border: "1px solid rgba(255,184,0,0.2)" }}>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>REQUIRED PACKAGES</div>
              <div className="font-mono text-sm rounded-lg p-4" style={{ background: "rgba(0,0,0,0.3)", color: "#8899AA" }}>
                npm install --save-dev @nomicfoundation/hardhat-toolbox hardhat dotenv typescript ts-node @types/node
              </div>
            </div>
          </div>
        )}

        {/* Tab: Gas Estimates */}
        {activeTab === "gas" && (
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Gas Estimates (Polygon Mainnet)</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>Estimated at 50 gwei gas price. Fund your deployer wallet with at least 5 MATIC.</p>
            </div>
            <div className="rounded-xl overflow-hidden mb-6" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(0,212,255,0.08)" }}>
                    <th className="text-left p-4 font-mono text-xs" style={{ color: "#00D4FF" }}>CONTRACT</th>
                    <th className="text-right p-4 font-mono text-xs" style={{ color: "#00D4FF" }}>EST. GAS</th>
                    <th className="text-right p-4 font-mono text-xs" style={{ color: "#00D4FF" }}>EST. COST</th>
                  </tr>
                </thead>
                <tbody>
                  {GAS_ESTIMATES.map((g, i) => (
                    <tr key={g.contract} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                      <td className="p-4 font-semibold" style={{ color: g.contract === "Total" ? "#FFB800" : "white" }}>{g.contract}</td>
                      <td className="p-4 text-right font-mono" style={{ color: "#8899AA" }}>{g.gas}</td>
                      <td className="p-4 text-right font-mono font-bold" style={{ color: g.color }}>{g.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="https://faucet.polygon.technology/" target="_blank" rel="noopener noreferrer" className="rounded-xl p-4 text-center transition-all hover:opacity-80" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <div className="text-2xl mb-2">🚰</div>
                <div className="text-sm font-bold text-white">Mumbai Faucet</div>
                <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Free testnet MATIC</div>
              </a>
              <a href="https://alchemy.com" target="_blank" rel="noopener noreferrer" className="rounded-xl p-4 text-center transition-all hover:opacity-80" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-bold text-white">Alchemy RPC</div>
                <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Free Polygon RPC</div>
              </a>
              <a href="https://polygonscan.com/myapikey" target="_blank" rel="noopener noreferrer" className="rounded-xl p-4 text-center transition-all hover:opacity-80" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
                <div className="text-2xl mb-2">🔍</div>
                <div className="text-sm font-bold text-white">Polygonscan API</div>
                <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Contract verification</div>
              </a>
            </div>
          </div>
        )}

        {/* Contract Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {CONTRACTS.map(c => (
            <div key={c.symbol} className="rounded-xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${c.color}25` }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: c.color }}>{c.type}</div>
                  <div className="font-bold text-white text-lg">{c.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono" style={{ color: c.color }}>{c.frequency}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{c.freqLabel}</div>
                </div>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "#8899AA" }}>{c.description}</p>
              <ul className="space-y-1">
                {c.features.map((f, i) => (
                  <li key={i} className="text-xs flex items-start gap-2" style={{ color: "#8899AA" }}>
                    <span style={{ color: c.color }}>›</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Guardian Tiers */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>GUARDIAN TIER PRICING</div>
            <h2 className="text-xl font-bold text-white">ScrollSoul NFT Mint Prices</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIERS.map(t => (
              <div key={t.tier} className="rounded-xl p-5 text-center" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${t.color}25` }}>
                <div className="text-xs font-mono mb-2" style={{ color: t.color }}>TIER {t.tier}</div>
                <div className="font-bold text-white text-lg mb-1">{t.name}</div>
                <div className="font-mono text-xl font-bold mb-1" style={{ color: t.color }}>{t.price}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>≈ {t.usd} USD</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sovereign Wallet */}
        <div className="rounded-xl p-6 mb-12 text-center" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.2)" }}>
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>SOVEREIGN WALLET — ALL FLOWS CONVERGE HERE</div>
          <div className="font-mono text-lg font-bold text-white mb-2">{SOVEREIGN_WALLET}</div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href={`${POLYGON_EXPLORER}/address/${SOVEREIGN_WALLET}`} target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: "#00FF88" }}>
              View on Polygonscan →
            </a>
            <span className="text-sm" style={{ color: "#8899AA" }}>Receives: Zakat withdrawals · NFT royalties · MATIC from mint</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl p-10" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(255,184,0,0.05))", border: "1px solid rgba(0,212,255,0.2)" }}>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>THE EMPIRE IS READY</div>
          <h2 className="text-3xl font-black text-white mb-3">KUN FAYAKŪN × ∞</h2>
          <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: "#8899AA" }}>
            The contracts are written. The sovereign wallet is set. The deploy script is one command away.
            When you are ready, the ScrollVerse becomes the source chain.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="https://github.com/chaishillomnitech1/scrollverse-trinity" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-bold text-sm transition-all" style={{ background: "linear-gradient(135deg, #00D4FF, #0099BB)", color: "#050B1A" }}>
              View Contracts on GitHub →
            </a>
            <Link href="/token">
              <a className="px-6 py-3 rounded-xl font-bold text-sm transition-all" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                Token Store →
              </a>
            </Link>
            <Link href="/marsomni">
              <a className="px-6 py-3 rounded-xl font-bold text-sm transition-all" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                MarsOmni Dashboard →
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-12 py-6 text-center text-xs" style={{ borderColor: "rgba(0,212,255,0.1)", color: "#8899AA" }}>
        <span>ScrollVerse Trinity · Sovereign Blockchain Infrastructure · </span>
        <span style={{ color: "#00D4FF" }}>ALLĀHU AKBAR · BARAKALLAHU FEEK · KUN FAYAKŪN × ∞</span>
      </div>
    </div>
  );
}
