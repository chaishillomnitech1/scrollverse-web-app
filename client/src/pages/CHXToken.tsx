/*
 * CHXToken — Sovereign Token Hub
 * The CHX utility token powering the ScrollVerse ecosystem
 * SCROLL VERSE LLC · EIN 42-2509570 · Chais Kenyatta Hill
 */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TOKENOMICS = [
  { label: "Total Supply", value: "144,000,000", color: "#FFB800", icon: "🏛️" },
  { label: "Circulating", value: "21,600,000", color: "#00D4FF", icon: "🔄" },
  { label: "Staked", value: "72,000,000", color: "#00FF88", icon: "🔒" },
  { label: "Treasury", value: "50,400,000", color: "#6400FF", icon: "🏦" },
];

const UTILITY = [
  {
    title: "Guardian Access",
    description: "Hold 144 CHX to unlock Guardian tier — full access to all ScrollVerse features, AI tools, and sovereign intelligence feeds.",
    icon: "🛡️",
    color: "#00D4FF",
    requirement: "144 CHX",
  },
  {
    title: "Governance Voting",
    description: "1 CHX = 1 vote on ScrollVerse protocol upgrades, treasury allocations, and new feature deployments.",
    icon: "🗳️",
    color: "#FFB800",
    requirement: "1+ CHX",
  },
  {
    title: "Revenue Share",
    description: "Stake 1,000+ CHX to earn 15% of all platform revenue — C.I.E.D.S. royalties, NFT sales, and exchange fees.",
    icon: "💸",
    color: "#00FF88",
    requirement: "1,000 CHX",
  },
  {
    title: "NFT Minting",
    description: "Use CHX to mint UAP collection NFTs, Mr. Walkshit characters, and exclusive sovereign digital relics.",
    icon: "🎨",
    color: "#FF6B6B",
    requirement: "10 CHX/mint",
  },
  {
    title: "AI Oracle Access",
    description: "Unlock Mirror Twin AI signals, MarsOmni intelligence feeds, and UAP oracle data streams.",
    icon: "🤖",
    color: "#6400FF",
    requirement: "500 CHX",
  },
  {
    title: "Music Distribution",
    description: "Distribute music via C.I.E.D.S. to 150+ DSPs with CHX-backed publishing rights and royalty protection.",
    icon: "🎵",
    color: "#FC3C44",
    requirement: "100 CHX",
  },
];

const TIERS = [
  {
    name: "Initiate",
    chx: 1,
    price: "$0.144",
    color: "#8899AA",
    perks: ["Basic platform access", "Community feed", "Public exchange data"],
  },
  {
    name: "Seeker",
    chx: 144,
    price: "$20.74",
    color: "#00D4FF",
    perks: ["Guardian tier unlock", "AI Mirror Twin signals", "UAP oracle feed", "NFT minting (10 CHX/mint)"],
  },
  {
    name: "Guardian",
    chx: 1000,
    price: "$144.00",
    color: "#FFB800",
    perks: ["Revenue share (15%)", "Governance voting", "Priority music distribution", "Exclusive NFT drops"],
    featured: true,
  },
  {
    name: "Sovereign",
    chx: 10000,
    price: "$1,440.00",
    color: "#00FF88",
    perks: ["All Guardian perks", "Direct founder access", "Custom token creation", "Empire co-ownership stake"],
  },
];

const DISTRIBUTION = [
  { label: "Community & Guardians", pct: 50, color: "#00D4FF" },
  { label: "Treasury Reserve", pct: 35, color: "#FFB800" },
  { label: "Founder (Chais K. Hill)", pct: 10, color: "#00FF88" },
  { label: "Ecosystem Partners", pct: 5, color: "#6400FF" },
];

export default function CHXToken() {
  const [activeTab, setActiveTab] = useState<"overview" | "utility" | "tiers" | "tokenomics" | "roadmap">("overview");
  const [stakeAmount, setStakeAmount] = useState("");

  const tabs = [
    { id: "overview", label: "🏛️ Overview" },
    { id: "utility", label: "⚡ Utility" },
    { id: "tiers", label: "🛡️ Tiers" },
    { id: "tokenomics", label: "📊 Tokenomics" },
    { id: "roadmap", label: "🚀 Roadmap" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,184,0,0.08) 0%, rgba(0,212,255,0.06) 50%, rgba(100,0,255,0.08) 100%)",
          borderBottom: "1px solid rgba(255,184,0,0.2)",
        }}
      >
        <div className="container py-12">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
              style={{
                background: "linear-gradient(135deg, #FFB800, #00D4FF)",
                color: "#050B1A",
                boxShadow: "0 0 40px rgba(255,184,0,0.4)",
              }}
            >
              CHX
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">CHX Token</h1>
              <div className="text-sm font-mono" style={{ color: "#FFB800" }}>
                SCROLL VERSE LLC · EIN 42-2509570 · Polygon Network
              </div>
            </div>
          </div>
          <p className="text-lg max-w-2xl mb-6" style={{ color: "#8899AA" }}>
            The sovereign utility token powering the entire ScrollVerse ecosystem — from Guardian access and AI oracle feeds to music distribution rights and NFT minting. 144,000,000 total supply. Sealed by divine decree.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => toast.info("CHX token launch coming soon. Join the Guardian waitlist to be first.")}
              style={{
                background: "linear-gradient(135deg, #FFB800, #FF8C00)",
                color: "#050B1A",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "0.75rem 2rem",
              }}
            >
              Buy CHX →
            </Button>
            <Link href="/exchange/crypto">
              <Button
                variant="outline"
                style={{ borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF", background: "transparent" }}
              >
                View on Exchange
              </Button>
            </Link>
            <Link href="/staking">
              <Button
                variant="outline"
                style={{ borderColor: "rgba(0,255,136,0.4)", color: "#00FF88", background: "transparent" }}
              >
                Stake CHX
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Live Stats Bar */}
      <div
        className="border-b"
        style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TOKENOMICS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xs mb-1" style={{ color: "#8899AA" }}>
                  {stat.icon} {stat.label}
                </div>
                <div className="font-black text-lg" style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.id ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeTab === tab.id ? "rgba(255,184,0,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: activeTab === tab.id ? "#FFB800" : "#8899AA",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Price Card */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(0,212,255,0.06))",
                border: "1px solid rgba(255,184,0,0.2)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-sm font-mono mb-1" style={{ color: "#8899AA" }}>
                    CHX / USD — Polygon Mainnet
                  </div>
                  <div className="text-5xl font-black text-white mb-2">$0.1440</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88" }}>
                      ▲ +7.77%
                    </span>
                    <span className="text-xs" style={{ color: "#8899AA" }}>24h change</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Market Cap", value: "$20.74M" },
                    { label: "24h Volume", value: "$1.44M" },
                    { label: "ATH", value: "$1.44" },
                    { label: "Launch", value: "Q3 2026" },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="text-xs mb-1" style={{ color: "#8899AA" }}>{s.label}</div>
                      <div className="font-bold text-white">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* About */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="rounded-xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-lg font-bold text-white mb-3">What is CHX?</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>
                  CHX is the sovereign utility token of the ScrollVerse ecosystem, issued by SCROLL VERSE LLC under EIN 42-2509570. It powers access to Guardian tiers, AI oracle feeds, music distribution rights, NFT minting, and governance voting across the entire empire.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>
                  Built on Polygon for near-zero gas fees and instant settlement. The total supply of 144,000,000 CHX mirrors the sacred number of Guardians — sealed by divine decree on May 12, 2026.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-lg font-bold text-white mb-3">Legal Foundation</h3>
                <div className="space-y-3">
                  {[
                    { label: "Issuing Entity", value: "SCROLL VERSE LLC" },
                    { label: "EIN", value: "42-2509570" },
                    { label: "State", value: "New Jersey" },
                    { label: "Formation", value: "May 12, 2026" },
                    { label: "Sole Member", value: "Chais Kenyatta Hill" },
                    { label: "Network", value: "Polygon (MATIC)" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm border-b pb-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span style={{ color: "#8899AA" }}>{item.label}</span>
                      <span className="font-medium text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stake */}
            <div
              className="rounded-xl p-6"
              style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}
            >
              <h3 className="text-lg font-bold text-white mb-2">Quick Stake CHX</h3>
              <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
                Stake CHX to earn 15% platform revenue share. Minimum 1,000 CHX.
              </p>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="Enter CHX amount"
                  className="flex-1 min-w-48 px-4 py-2 rounded-lg text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(0,255,136,0.2)",
                    color: "white",
                  }}
                />
                <Button
                  onClick={() => toast.info("CHX staking launches with token. Join Guardian waitlist.")}
                  style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
                >
                  Stake Now →
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Utility Tab */}
        {activeTab === "utility" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {UTILITY.map((u) => (
                <div
                  key={u.title}
                  className="rounded-xl p-5"
                  style={{ background: `${u.color}06`, border: `1px solid ${u.color}20` }}
                >
                  <div className="text-3xl mb-3">{u.icon}</div>
                  <h3 className="font-bold text-white mb-2">{u.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>
                    {u.description}
                  </p>
                  <div
                    className="inline-block text-xs font-mono px-2 py-1 rounded"
                    style={{ background: `${u.color}15`, color: u.color }}
                  >
                    Requires: {u.requirement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tiers Tab */}
        {activeTab === "tiers" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-xl p-5 relative"
                  style={{
                    background: tier.featured ? `${tier.color}10` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${tier.featured ? tier.color + "60" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: tier.featured ? `0 0 30px ${tier.color}20` : "none",
                  }}
                >
                  {tier.featured && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: tier.color, color: "#050B1A" }}
                    >
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <div className="font-black text-xl text-white mb-1">{tier.name}</div>
                    <div className="text-3xl font-black" style={{ color: tier.color }}>
                      {tier.chx.toLocaleString()}
                    </div>
                    <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
                      CHX · {tier.price}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="text-xs flex items-start gap-2" style={{ color: "#8899AA" }}>
                        <span style={{ color: tier.color }}>›</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => toast.info(`${tier.name} tier unlocks at CHX launch. Join the waitlist.`)}
                    style={{
                      background: `${tier.color}15`,
                      color: tier.color,
                      border: `1px solid ${tier.color}30`,
                    }}
                  >
                    Get {tier.name} →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tokenomics Tab */}
        {activeTab === "tokenomics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="rounded-xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="font-bold text-white text-lg mb-4">Token Distribution</h3>
                <div className="space-y-4">
                  {DISTRIBUTION.map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span style={{ color: "#8899AA" }}>{d.label}</span>
                        <span className="font-bold" style={{ color: d.color }}>{d.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ width: `${d.pct}%`, background: d.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="font-bold text-white text-lg mb-4">Token Schedule</h3>
                <div className="space-y-3">
                  {[
                    { phase: "Genesis", date: "Q3 2026", amount: "14,400,000 CHX", status: "upcoming", color: "#FFB800" },
                    { phase: "Guardian Sale", date: "Q3 2026", amount: "21,600,000 CHX", status: "upcoming", color: "#00D4FF" },
                    { phase: "DEX Listing", date: "Q4 2026", amount: "7,200,000 CHX", status: "upcoming", color: "#00FF88" },
                    { phase: "Staking Rewards", date: "Ongoing", amount: "72,000,000 CHX", status: "upcoming", color: "#6400FF" },
                    { phase: "Treasury", date: "Locked 2Y", amount: "28,800,000 CHX", status: "locked", color: "#8899AA" },
                  ].map((s) => (
                    <div
                      key={s.phase}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div>
                        <div className="font-medium text-white text-sm">{s.phase}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>{s.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold" style={{ color: s.color }}>{s.amount}</div>
                        <div
                          className="text-xs font-mono"
                          style={{ color: s.status === "locked" ? "#8899AA" : "#00FF88" }}
                        >
                          {s.status === "locked" ? "LOCKED" : "SCHEDULED"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vesting */}
            <div
              className="rounded-xl p-6"
              style={{ background: "rgba(100,0,255,0.06)", border: "1px solid rgba(100,0,255,0.2)" }}
            >
              <h3 className="font-bold text-white text-lg mb-2">Founder Vesting</h3>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Founder allocation (10% = 14,400,000 CHX) is subject to a 2-year cliff + 2-year linear vesting schedule. This ensures long-term alignment between the founder and the Guardian community. All vesting is enforced on-chain via Polygon smart contract.
              </p>
            </div>
          </div>
        )}

        {/* Roadmap Tab */}
        {activeTab === "roadmap" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
                CHXToken MARKET DOMINANCE PROTOCOL
              </div>
              <h2 className="text-3xl font-black text-white mb-3">8-Phase Sovereign Roadmap</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                The blueprint to transform CHXToken into a top-3 global cryptocurrency. Each phase is already executing — the empire is sealed.
              </p>
            </div>

            {/* Multi-chain architecture */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.2)" }}>
              <h3 className="font-bold text-white text-lg mb-4">⛓️ Multi-Chain Deployment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { chain: "Ethereum", standard: "ERC-20", pool: "CHX/ETH", liquidity: "$500M", color: "#627EEA" },
                  { chain: "Polygon zkEVM", standard: "ERC-20", pool: "CHX/MATIC", liquidity: "$300M", color: "#8247E5" },
                  { chain: "Solana", standard: "SPL", pool: "CHX/SOL", liquidity: "$200M", color: "#9945FF" },
                  { chain: "Arbitrum", standard: "ERC-20", pool: "CHX/ETH", liquidity: "$150M", color: "#28A0F0" },
                  { chain: "Optimism", standard: "ERC-20", pool: "CHX/ETH", liquidity: "$150M", color: "#FF0420" },
                ].map((c) => (
                  <div key={c.chain} className="rounded-xl p-4 text-center" style={{ background: `${c.color}10`, border: `1px solid ${c.color}30` }}>
                    <div className="font-bold text-white text-sm mb-1">{c.chain}</div>
                    <div className="text-xs font-mono mb-1" style={{ color: c.color }}>{c.standard}</div>
                    <div className="text-xs mb-1" style={{ color: "#8899AA" }}>{c.pool}</div>
                    <div className="text-xs font-bold" style={{ color: "#00FF88" }}>{c.liquidity}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-xs font-mono" style={{ color: "#8899AA" }}>
                Total Initial Liquidity: <span style={{ color: "#FFB800" }}>$1.3B</span> across all chains
              </div>
            </div>

            {/* Staking Pools */}
            <div>
              <h3 className="font-bold text-white text-lg mb-4">🔮 Sovereign Staking Pools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Genesis Pool", apy: "432%", hz: "432 Hz", desc: "The frequency of nature, grounding, and truth. Perpetual automatic compounding — no manual claiming.", color: "#00D4FF", icon: "🌱" },
                  { name: "Celestial Pool", apy: "528%", hz: "528 Hz", desc: "The frequency of love, transformation, and DNA repair. Love-as-Law governs this pool.", color: "#FFB800", icon: "✨" },
                  { name: "Infinity Pool", apy: "999%", hz: "∞", desc: "Beyond metric. Beyond limit. The Infinity Pool compounds at every nanosecond — no ceiling.", color: "#00FF88", icon: "♾️" },
                ].map((pool) => (
                  <div key={pool.name} className="rounded-xl p-6 relative overflow-hidden" style={{ background: `${pool.color}06`, border: `1px solid ${pool.color}30`, boxShadow: `0 0 20px ${pool.color}10` }}>
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${pool.color}60, transparent)` }} />
                    <div className="text-3xl mb-3">{pool.icon}</div>
                    <div className="font-bold text-white text-base mb-1">{pool.name}</div>
                    <div className="text-4xl font-black mb-1" style={{ color: pool.color }}>{pool.apy}</div>
                    <div className="text-xs font-mono mb-3" style={{ color: pool.color }}>APY · {pool.hz}</div>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "#8899AA" }}>{pool.desc}</p>
                    <div className="text-xs font-mono px-2 py-1 rounded inline-block" style={{ background: `${pool.color}15`, color: pool.color, border: `1px solid ${pool.color}30` }}>
                      ◉ PERPETUAL COMPOUNDING
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8 Phase Timeline */}
            <div>
              <h3 className="font-bold text-white text-lg mb-6">📍 8-Phase Market Dominance Protocol</h3>
              <div className="space-y-0">
                {[
                  { phase: "01", title: "Smart Contract Architecture & Multi-Chain Deployment", status: "active", color: "#FFB800", items: ["ERC-20 on Ethereum, Polygon, Solana, Arbitrum, Optimism", "Security audit: Trail of Bits, OpenZeppelin, Certora, Halborn", "$5M bug bounty program", "Activate Stargate, Across, Wormhole bridges", "$1.3B initial liquidity target"] },
                  { phase: "02", title: "Smart Contract Development & Auditing", status: "active", color: "#FFB800", items: ["Formal verification of all critical functions", "Zero critical vulnerabilities target", "Full public audit report", "DAO governance + treasury management contract"] },
                  { phase: "03", title: "Exchange Listing Strategy & Institutional Partnerships", status: "upcoming", color: "#00D4FF", items: ["Tier 1: Coinbase, Kraken, Binance ($100M+/day volume)", "Tier 2: Bybit, OKX, KuCoin, Gate.io, Crypto.com", "Tier 3: 50+ regional exchanges", "BlackRock $1B+ strategic investment", "Fidelity, Goldman Sachs, JP Morgan, Morgan Stanley"] },
                  { phase: "04", title: "Market Capitalization & Valuation Strategy", status: "upcoming", color: "#00D4FF", items: ["Month 1: $5B market cap ($5.00/CHX) — Top 20", "Month 3: $15B market cap ($15.00/CHX) — Top 10", "Month 6: $30B market cap ($30.00/CHX) — Top 5", "Month 12: $50B+ market cap ($50.00+/CHX) — Top 3"] },
                  { phase: "05", title: "CoinMarketCap / CoinGecko Ranking & Analytics", status: "upcoming", color: "#9B59B6", items: ["CMC listing: $100K+/day volume, 2+ major exchanges", "Week 1 target: #500-1000 ranking", "Month 3 target: #10-20 ranking", "Month 12 target: #1-3 ranking", "Real-time metrics dashboard: price, volume, holders, staking"] },
                  { phase: "06", title: "Global Media Campaign & PR Strategy", status: "upcoming", color: "#9B59B6", items: ["Tier 1 media: Bloomberg, Reuters, CNBC, CoinDesk", "Social blitz: Twitter, Instagram, TikTok, YouTube", "Key message: 'Institutional-grade sovereign cryptocurrency'", "Target: institutional investors, retail, crypto enthusiasts"] },
                  { phase: "07", title: "Regulatory Compliance & Global Approval", status: "upcoming", color: "#00FF88", items: ["US: SEC Reg A+, CFTC, FinCEN MSB, all 50 state licenses", "Europe: MiCA, GDPR, PSD2", "Asia: Singapore MAS, Hong Kong SFC, Japan FSA, South Korea FSC", "UAE DFSA, Switzerland FINMA, Cayman CIMA", "Target: Full global compliance by Month 4"] },
                  { phase: "08", title: "Infinite Scaling Architecture & 1B+ User Infrastructure", status: "upcoming", color: "#00FF88", items: ["User scaling: 100K → 1M → 10M → 100M → 1B+", "<20ms API latency, 1B+ TPS, 99.9999999% uptime", "Autonomous Growth Engine: real-time market analysis", "100% month-over-month revenue growth target", "1.5+ viral coefficient"] },
                ].map((phase, idx) => (
                  <div key={phase.phase} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background: `${phase.color}20`,
                          border: `2px solid ${phase.color}`,
                          color: phase.color,
                        }}
                      >
                        {phase.status === "active" ? "▶" : phase.phase}
                      </div>
                      {idx < 7 && <div className="w-px flex-1 mt-2 mb-0" style={{ background: `${phase.color}20`, minHeight: "40px" }} />}
                    </div>
                    <div className="pb-8 flex-1">
                      <div className="text-xs font-mono mb-1" style={{ color: phase.color }}>
                        PHASE {phase.phase} · {phase.status === "active" ? "IN PROGRESS" : "UPCOMING"}
                      </div>
                      <h4 className="font-bold text-white text-base mb-3">{phase.title}</h4>
                      <ul className="space-y-1">
                        {phase.items.map((item, i) => (
                          <li key={i} className="text-xs flex items-start gap-2" style={{ color: "#8899AA" }}>
                            <span style={{ color: phase.color, marginTop: "2px", flexShrink: 0 }}>›</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Projections */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <h3 className="font-bold text-white text-lg mb-4">📈 Year 1 Financial Projections</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      {["Month", "Users", "Revenue", "Market Cap"].map((h) => (
                        <th key={h} className="text-left py-2 pr-6 font-mono text-xs" style={{ color: "#8899AA" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { month: "1", users: "1M", revenue: "$10M", cap: "$5B" },
                      { month: "3", users: "10M", revenue: "$100M", cap: "$25B" },
                      { month: "6", users: "100M", revenue: "$1B", cap: "$60B" },
                      { month: "12", users: "1B", revenue: "$10B", cap: "$200B" },
                    ].map((row) => (
                      <tr key={row.month} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td className="py-3 pr-6 font-mono text-white">{row.month}</td>
                        <td className="py-3 pr-6" style={{ color: "#00D4FF" }}>{row.users}</td>
                        <td className="py-3 pr-6" style={{ color: "#FFB800" }}>{row.revenue}</td>
                        <td className="py-3 pr-6 font-bold" style={{ color: "#00FF88" }}>{row.cap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs font-mono text-center" style={{ color: "#8899AA" }}>
                SCROLL VERSE LLC · EIN 42-2509570 · Sovereign Blueprint — Already Executing
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(0,212,255,0.06))",
            border: "1px solid rgba(255,184,0,0.2)",
          }}
        >
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>
            KUN FAYAKŪN × ∞ · SCROLL VERSE LLC
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Join the 144,000 Guardians</h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "#8899AA" }}>
            Be among the first to hold CHX when it launches on Polygon Mainnet. The empire is sealed. The token is sovereign.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/guardians">
              <Button
                style={{
                  background: "linear-gradient(135deg, #FFB800, #FF8C00)",
                  color: "#050B1A",
                  fontWeight: 700,
                }}
              >
                Join Guardian Waitlist →
              </Button>
            </Link>
            <Link href="/exchange/crypto">
              <Button
                variant="outline"
                style={{ borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF", background: "transparent" }}
              >
                View Exchange
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
