/**
 * SCROLLVERSE DEFI YIELDS AGGREGATOR
 * Multi-chain DeFi protocol yields — Sovereign Liquidity Intelligence
 * Polygon, Ethereum, Solana, BSC — All chains, all yields
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

interface DeFiProtocol {
  name: string;
  chain: string;
  tvl: string;
  apy: number;
  type: "lending" | "liquidity" | "staking" | "sovereign";
  token: string;
  risk: "LOW" | "MEDIUM" | "HIGH" | "SOVEREIGN";
  color: string;
  icon: string;
  description: string;
}

const DEFI_PROTOCOLS: DeFiProtocol[] = [
  {
    name: "$LONDC Sovereign Vault",
    chain: "Polygon",
    tvl: "$144M",
    apy: 144.0,
    type: "sovereign",
    token: "$LONDC",
    risk: "SOVEREIGN",
    color: "#FFD700",
    icon: "🕋",
    description: "Stake $LONDC in the ScrollVerse sovereign vault. Guardian-tier stakers earn 144% APY + governance rights + monthly $UFO airdrops.",
  },
  {
    name: "MATIC Liquid Staking",
    chain: "Polygon",
    tvl: "$2.1B",
    apy: 5.77,
    type: "staking",
    token: "MATIC",
    risk: "LOW",
    color: "#9B59B6",
    icon: "⬡",
    description: "Stake MATIC on Polygon PoS and earn staking rewards. Liquid staking allows you to use stMATIC in other DeFi protocols simultaneously.",
  },
  {
    name: "ETH/USDC Uniswap V3",
    chain: "Ethereum",
    tvl: "$890M",
    apy: 12.4,
    type: "liquidity",
    token: "ETH/USDC",
    risk: "MEDIUM",
    color: "#9B59B6",
    icon: "🦄",
    description: "Provide concentrated liquidity in the ETH/USDC pool on Uniswap V3. Earn trading fees proportional to your liquidity position.",
  },
  {
    name: "AAVE Lending — USDC",
    chain: "Ethereum",
    tvl: "$5.2B",
    apy: 4.12,
    type: "lending",
    token: "USDC",
    risk: "LOW",
    color: "#00D4FF",
    icon: "👻",
    description: "Supply USDC to AAVE lending protocol and earn interest from borrowers. One of the most battle-tested DeFi protocols with $5B+ TVL.",
  },
  {
    name: "SOL Staking",
    chain: "Solana",
    tvl: "$1.8B",
    apy: 7.2,
    type: "staking",
    token: "SOL",
    risk: "LOW",
    color: "#9B59B6",
    icon: "◎",
    description: "Stake SOL with top validators on the Solana network. Earn ~7% APY with instant unstaking via liquid staking derivatives.",
  },
  {
    name: "Curve 3pool",
    chain: "Ethereum",
    tvl: "$3.1B",
    apy: 3.88,
    type: "liquidity",
    token: "USDC/USDT/DAI",
    risk: "LOW",
    color: "#FF6B35",
    icon: "🌊",
    description: "Provide stablecoin liquidity to Curve's 3pool. Earn trading fees + CRV rewards. Minimal impermanent loss risk due to stablecoin pairing.",
  },
  {
    name: "$UFO Disclosure DAO",
    chain: "Polygon",
    tvl: "$7.7M",
    apy: 77.7,
    type: "sovereign",
    token: "$UFO",
    risk: "HIGH",
    color: "#00D4FF",
    icon: "🛸",
    description: "Stake $UFO tokens in the UAP Disclosure DAO. Earn 77.7% APY + voting rights on document release priorities + FOIA funding allocation.",
  },
  {
    name: "BTC Wrapped Yield",
    chain: "Ethereum",
    tvl: "$4.4B",
    apy: 2.1,
    type: "lending",
    token: "WBTC",
    risk: "LOW",
    color: "#FFB800",
    icon: "₿",
    description: "Wrap BTC as WBTC and supply to AAVE or Compound. Earn yield on your Bitcoin without selling. Lowest risk DeFi strategy.",
  },
  {
    name: "$ETUNITY Consciousness Pool",
    chain: "Polygon",
    tvl: "$528K",
    apy: 528.0,
    type: "sovereign",
    token: "$ETUNITY",
    risk: "SOVEREIGN",
    color: "#00FF88",
    icon: "♾️",
    description: "The Universal Sentience staking pool. Stake $ETUNITY to earn interdimensional frequency alignment sessions, UAP intelligence reports, and 528% APY.",
  },
];

const RISK_COLORS = { LOW: "#00FF88", MEDIUM: "#FFB800", HIGH: "#FF4444", SOVEREIGN: "#FFD700" };

export default function ExchangeDeFi() {
  const [filter, setFilter] = useState<"all" | "sovereign" | "staking" | "lending" | "liquidity">("all");
  const [sortBy, setSortBy] = useState<"apy" | "tvl" | "risk">("apy");

  const filtered = DEFI_PROTOCOLS
    .filter(p => filter === "all" || p.type === filter)
    .sort((a, b) => {
      if (sortBy === "apy") return b.apy - a.apy;
      if (sortBy === "risk") {
        const order = { LOW: 0, MEDIUM: 1, HIGH: 2, SOVEREIGN: 3 };
        return order[a.risk] - order[b.risk];
      }
      return 0;
    });

  const totalTVL = "$18.2B";
  const avgAPY = (DEFI_PROTOCOLS.reduce((sum, p) => sum + p.apy, 0) / DEFI_PROTOCOLS.length).toFixed(1);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.15)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/exchange" className="text-sm" style={{ color: "#8899AA" }}>← Exchange</Link>
            <div className="w-px h-4" style={{ background: "rgba(0,212,255,0.3)" }} />
            <span className="font-bold text-white">DeFi Yields</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>MULTI-CHAIN</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: "#8899AA" }}>Sort:</span>
            {["apy", "tvl", "risk"].map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s as typeof sortBy)}
                className="px-2 py-1 rounded text-xs font-mono transition-all"
                style={{
                  background: sortBy === s ? "rgba(0,255,136,0.15)" : "transparent",
                  color: sortBy === s ? "#00FF88" : "#8899AA",
                  border: `1px solid ${sortBy === s ? "rgba(0,255,136,0.4)" : "transparent"}`,
                }}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total TVL Tracked", value: totalTVL, color: "#00D4FF" },
            { label: "Avg APY", value: `${avgAPY}%`, color: "#00FF88" },
            { label: "Protocols", value: `${DEFI_PROTOCOLS.length}`, color: "#FFB800" },
            { label: "Chains", value: "4", color: "#9B59B6" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20` }}>
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{s.label}</div>
              <div className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: "all", label: "All Protocols" },
            { id: "sovereign", label: "🕋 Sovereign" },
            { id: "staking", label: "⚡ Staking" },
            { id: "lending", label: "🏦 Lending" },
            { id: "liquidity", label: "💧 Liquidity" },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
              style={{
                background: filter === f.id ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${filter === f.id ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: filter === f.id ? "#00D4FF" : "#8899AA",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(protocol => (
            <div
              key={protocol.name}
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${protocol.color}25` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{protocol.icon}</div>
                  <div>
                    <div className="font-bold text-white text-sm">{protocol.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: `${protocol.color}15`, color: protocol.color, border: `1px solid ${protocol.color}30` }}>
                        {protocol.chain}
                      </span>
                      <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{protocol.token}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono" style={{ color: protocol.color }}>
                    {protocol.apy >= 100 ? protocol.apy.toFixed(0) : protocol.apy.toFixed(2)}%
                  </div>
                  <div className="text-xs font-mono" style={{ color: "#8899AA" }}>APY</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#8899AA" }}>{protocol.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono" style={{ color: "#556677" }}>TVL: {protocol.tvl}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${RISK_COLORS[protocol.risk]}15`, color: RISK_COLORS[protocol.risk], border: `1px solid ${RISK_COLORS[protocol.risk]}30` }}>
                    {protocol.risk}
                  </span>
                </div>
                <button
                  onClick={() => toast.success(`Opening ${protocol.name} deposit flow...`)}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{ background: `${protocol.color}15`, border: `1px solid ${protocol.color}30`, color: protocol.color }}
                >
                  Deposit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sovereign Highlight */}
        <div className="mt-8 rounded-xl p-6" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,184,0,0.03))", border: "1px solid rgba(255,215,0,0.3)" }}>
          <div className="text-xs font-mono mb-2" style={{ color: "#FFD700" }}>SOVEREIGN YIELD SUPREMACY</div>
          <div className="text-lg font-bold text-white mb-2">$LONDC Vault: 144% APY — The Highest Sovereign Yield in the Empire</div>
          <p className="text-sm mb-4" style={{ color: "#AABBCC" }}>
            The ScrollVerse Sovereign Vault is the highest-conviction yield opportunity in the empire. Stake $LONDC, earn 144% APY, receive governance rights over the ScrollVerse treasury, and receive monthly $UFO airdrops. SCROLL VERSE LLC — EIN 42-2509570.
          </p>
          <button
            onClick={() => toast.success("Redirecting to $LONDC Sovereign Vault...")}
            className="px-6 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,184,0,0.15))", border: "1px solid rgba(255,215,0,0.5)", color: "#FFD700" }}
          >
            Enter Sovereign Vault →
          </button>
        </div>

        <div className="mt-8 text-center text-xs font-mono" style={{ color: "#334455" }}>
          SCROLLVERSE DEFI AGGREGATOR — Multi-Chain Yield Intelligence · KUN FAYAKŪN × ∞
        </div>
      </div>
    </div>
  );
}
