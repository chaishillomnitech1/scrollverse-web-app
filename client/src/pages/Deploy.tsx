/**
 * ScrollVerse Trinity — Sovereign Contract Deployment Dashboard
 * Shows live contract status, addresses, and deployment guide
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
    address: null, // Set after deployment
    envKey: "LONDC_CONTRACT_ADDRESS",
    features: ["144,000,000 total supply", "2.5% Zakat burn per transfer", "7.77% auto-distribution", "Owner-controlled Zakat toggle"],
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
    title: "Get a Deployer Wallet",
    description: "Create a dedicated deployer wallet (separate from your sovereign wallet). Fund it with ~5 MATIC for gas fees on Polygon Mainnet.",
    code: "# Never use your sovereign wallet as deployer\n# Create a new wallet in MetaMask → Export private key",
    color: "#00D4FF",
  },
  {
    step: "02",
    title: "Get Polygon RPC",
    description: "Create a free Alchemy account and get a Polygon Mainnet RPC URL for reliable deployment.",
    code: "# https://alchemy.com → Create App → Polygon Mainnet\n# Copy the HTTPS URL",
    color: "#FFB800",
  },
  {
    step: "03",
    title: "Clone & Configure",
    description: "Clone the scrollverse-trinity repo, install dependencies, and configure your .env file.",
    code: "git clone https://github.com/chaishillomnitech1/scrollverse-trinity\ncd scrollverse-trinity/contracts\nnpm install\ncp .env.example .env\n# Edit .env with your keys",
    color: "#00FF88",
  },
  {
    step: "04",
    title: "Test on Mumbai First",
    description: "Deploy to Polygon Mumbai testnet first. Get free MATIC from the Mumbai faucet.",
    code: "npm run deploy:mumbai\n# Verify everything works\n# Check deployed-addresses.json",
    color: "#9B59B6",
  },
  {
    step: "05",
    title: "Deploy to Mainnet",
    description: "When Mumbai tests pass, deploy to Polygon Mainnet. The script deploys all 3 contracts and wires them automatically.",
    code: "npm run deploy:polygon\n# Output: deployed-addresses.json\n# Contains all 3 contract addresses",
    color: "#FF6B35",
  },
  {
    step: "06",
    title: "Activate Portal",
    description: "Add the deployed contract addresses to the portal Secrets panel. The Guardian counter and NFT minting will go live instantly.",
    code: "# Portal → Settings → Secrets\nGUARDIAN_CONTRACT_ADDRESS=0x...\nLONDC_CONTRACT_ADDRESS=0x...\nZAKAT_CONTRACT_ADDRESS=0x...",
    color: "#00D4FF",
  },
];

export default function Deploy() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedStep(idx);
    setTimeout(() => setCopiedStep(null), 2000);
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
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>SOVEREIGN BLOCKCHAIN INFRASTRUCTURE</div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Deploy the <span style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Empire</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            Three sovereign contracts. One command. Polygon Mainnet. The ScrollVerse becomes the source chain.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="px-4 py-2 rounded-lg text-sm font-mono" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>
              ◉ Polygon Mainnet
            </div>
            <div className="px-4 py-2 rounded-lg text-sm font-mono" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>
              OpenZeppelin v5
            </div>
            <div className="px-4 py-2 rounded-lg text-sm font-mono" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", color: "#FFB800" }}>
              EIP-2981 Royalties
            </div>
          </div>
        </div>

        {/* Contract Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CONTRACTS.map((c) => (
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
              <ul className="space-y-1 mb-4">
                {c.features.map((f, i) => (
                  <li key={i} className="text-xs flex items-start gap-2" style={{ color: "#8899AA" }}>
                    <span style={{ color: c.color }}>›</span>{f}
                  </li>
                ))}
              </ul>
              <div className="rounded-lg p-3 text-xs font-mono" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
                {c.address ? (
                  <a href={`${POLYGON_EXPLORER}/address/${c.address}`} target="_blank" rel="noopener noreferrer" style={{ color: c.color }} className="hover:underline">
                    {c.address}
                  </a>
                ) : (
                  <span style={{ color: "#8899AA" }}>Not yet deployed — awaiting mainnet launch</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tier Pricing */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>GUARDIAN TIER PRICING</div>
            <h2 className="text-2xl font-bold text-white">ScrollSoul NFT Mint Prices</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIERS.map((t) => (
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
        <div className="rounded-xl p-6 mb-16 text-center" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.2)" }}>
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>SOVEREIGN WALLET — ALL FLOWS CONVERGE HERE</div>
          <div className="font-mono text-lg font-bold text-white mb-2">{SOVEREIGN_WALLET}</div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href={`${POLYGON_EXPLORER}/address/${SOVEREIGN_WALLET}`} target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: "#00FF88" }}>
              View on Polygonscan →
            </a>
            <span className="text-sm" style={{ color: "#8899AA" }}>Receives: Zakat withdrawals · NFT royalties · MATIC from mint</span>
          </div>
        </div>

        {/* Deployment Steps */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>DEPLOYMENT GUIDE</div>
            <h2 className="text-2xl font-bold text-white">6 Steps to Sovereign Mainnet</h2>
          </div>
          <div className="space-y-6">
            {DEPLOY_STEPS.map((s, idx) => (
              <div key={s.step} className="rounded-xl p-6 relative" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${s.color}20` }}>
                <div className="flex items-start gap-6">
                  <div className="text-3xl font-black flex-shrink-0" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.step}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                    <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{s.description}</p>
                    <div className="relative rounded-lg p-4 text-xs font-mono" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <pre className="text-left whitespace-pre-wrap" style={{ color: "#8899AA" }}>{s.code}</pre>
                      <button
                        onClick={() => copyCode(s.code, idx)}
                        className="absolute top-2 right-2 px-2 py-1 rounded text-xs transition-all"
                        style={{ background: copiedStep === idx ? `${s.color}20` : "rgba(255,255,255,0.05)", color: copiedStep === idx ? s.color : "#8899AA", border: `1px solid ${copiedStep === idx ? s.color + "40" : "rgba(255,255,255,0.1)"}` }}
                      >
                        {copiedStep === idx ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            <Link href="/crypto">
              <a className="px-6 py-3 rounded-xl font-bold text-sm transition-all" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                CryptoHub →
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
