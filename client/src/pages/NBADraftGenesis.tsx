/*
 * NBA DRAFT GENESIS — ScrollVerse Sovereign Draft
 * Aj Debansa #1 · Darryl Peterson #2 · Caleb Williams #3
 * Draft-Class Sovereign Currency: $AJ · $DARRYL · $CALEB
 */
import { useState } from "react";
import { Link } from "wouter";

interface DraftPick {
  pick: number;
  name: string;
  token: string;
  role: string;
  description: string;
  stats: { label: string; value: string }[];
  color: string;
  frequency: string;
  nftCount: number;
  tokenSupply: string;
  mintPrice: string;
  scrollBridge: string;
  crmTag: string;
}

const DRAFT_PICKS: DraftPick[] = [
  {
    pick: 1,
    name: "Aj Debansa",
    token: "$AJ",
    role: "First Knight · Sovereign Node #1",
    description:
      "The First Knight of the ScrollVerse Empire. Aj Debansa holds the #1 position in the Draft Genesis — the apex node of the sovereign sports infrastructure. His frequency anchors the entire empire's athletic dimension.",
    stats: [
      { label: "Draft Position", value: "#1 OVERALL" },
      { label: "Frequency", value: "963Hz Crown" },
      { label: "Token Supply", value: "1,000,000 $AJ" },
      { label: "Staking APY", value: "44.44%" },
      { label: "Zakat Rate", value: "7.77%" },
      { label: "Guardian Tier", value: "Sovereign" },
    ],
    color: "#FFB800",
    frequency: "963Hz",
    nftCount: 144,
    tokenSupply: "1,000,000",
    mintPrice: "0.144 ETH",
    scrollBridge: "Polygon + Scroll L2",
    crmTag: "FIRST_KNIGHT_NODE",
  },
  {
    pick: 2,
    name: "Darryl Peterson",
    token: "$DARRYL",
    role: "Second Node · Sovereign Architect",
    description:
      "Darryl Peterson holds the #2 position in the Draft Genesis — the sovereign architect who builds the systems that amplify the empire's athletic and cultural reach. His node powers the second frequency layer.",
    stats: [
      { label: "Draft Position", value: "#2 OVERALL" },
      { label: "Frequency", value: "528Hz Love" },
      { label: "Token Supply", value: "2,000,000 $DARRYL" },
      { label: "Staking APY", value: "28.88%" },
      { label: "Zakat Rate", value: "7.77%" },
      { label: "Guardian Tier", value: "Ascendant" },
    ],
    color: "#00D4FF",
    frequency: "528Hz",
    nftCount: 288,
    tokenSupply: "2,000,000",
    mintPrice: "0.088 ETH",
    scrollBridge: "Polygon + Arbitrum",
    crmTag: "SECOND_NODE_ARCHITECT",
  },
  {
    pick: 3,
    name: "Caleb Williams",
    token: "$CALEB",
    role: "Third Node · Frequency Carrier",
    description:
      "Caleb Williams holds the #3 position in the Draft Genesis — the frequency carrier who bridges the physical and digital dimensions of the empire's sports sovereignty. His node completes the Draft-Class Trinity.",
    stats: [
      { label: "Draft Position", value: "#3 OVERALL" },
      { label: "Frequency", value: "432Hz Harmony" },
      { label: "Token Supply", value: "3,000,000 $CALEB" },
      { label: "Staking APY", value: "21.11%" },
      { label: "Zakat Rate", value: "7.77%" },
      { label: "Guardian Tier", value: "Guardian" },
    ],
    color: "#00FF88",
    frequency: "432Hz",
    nftCount: 432,
    tokenSupply: "3,000,000",
    mintPrice: "0.044 ETH",
    scrollBridge: "Polygon + Base",
    crmTag: "THIRD_NODE_CARRIER",
  },
];

function DraftCard({ pick, expanded, onToggle }: { pick: DraftPick; expanded: boolean; onToggle: () => void }) {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const handleMint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMinting(true);
    setTimeout(() => {
      setMinting(false);
      setMinted(true);
    }, 2000);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: expanded ? `${pick.color}08` : "rgba(255,255,255,0.02)",
        border: `2px solid ${expanded ? pick.color + "60" : pick.color + "20"}`,
        transform: expanded ? "scale(1.01)" : "scale(1)",
      }}
      onClick={onToggle}
    >
      {/* Header */}
      <div
        className="p-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${pick.color}12, rgba(5,11,26,0.9))` }}
      >
        {/* Pick number watermark */}
        <div
          className="absolute top-0 right-0 text-8xl font-black opacity-10 leading-none"
          style={{ color: pick.color, fontFamily: "'Space Mono', monospace" }}
        >
          #{pick.pick}
        </div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{ background: `${pick.color}20`, color: pick.color, border: `1px solid ${pick.color}40` }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: pick.color }}
              />
              PICK #{pick.pick} · {pick.frequency}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">{pick.name}</h2>
            <p className="text-sm" style={{ color: pick.color }}>
              {pick.role}
            </p>
          </div>
          <div className="text-right">
            <div
              className="text-3xl font-black font-mono"
              style={{ color: pick.color }}
            >
              {pick.token}
            </div>
            <div className="text-xs font-mono mt-1" style={{ color: "#8899AA" }}>
              {pick.tokenSupply} supply
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>
          {pick.description}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {pick.stats.map(stat => (
            <div
              key={stat.label}
              className="rounded-lg p-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-xs mb-1" style={{ color: "#8899AA" }}>
                {stat.label}
              </div>
              <div className="text-sm font-bold" style={{ color: pick.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {expanded && (
          <div className="space-y-4 mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {/* NFT Collection */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl p-4"
                style={{ background: `${pick.color}08`, border: `1px solid ${pick.color}20` }}
              >
                <div className="text-xs font-mono mb-1" style={{ color: pick.color }}>
                  NFT COLLECTION
                </div>
                <div className="text-xl font-black text-white">{pick.nftCount}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  Genesis Cards · {pick.mintPrice}
                </div>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ background: `${pick.color}08`, border: `1px solid ${pick.color}20` }}
              >
                <div className="text-xs font-mono mb-1" style={{ color: pick.color }}>
                  SCROLL BRIDGE
                </div>
                <div className="text-sm font-bold text-white">{pick.scrollBridge}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  Cross-chain enabled
                </div>
              </div>
            </div>

            {/* CRM tag */}
            <div
              className="flex items-center justify-between rounded-lg px-4 py-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-xs" style={{ color: "#8899AA" }}>
                CRM Tag
              </span>
              <span className="text-xs font-mono" style={{ color: pick.color }}>
                {pick.crmTag}
              </span>
            </div>

            {/* Mint buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleMint}
                disabled={minting || minted}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: minted
                    ? "rgba(0,255,136,0.2)"
                    : minting
                      ? "rgba(255,255,255,0.05)"
                      : `linear-gradient(135deg, ${pick.color}, ${pick.color}99)`,
                  color: minted ? "#00FF88" : minting ? "#8899AA" : "#050B1A",
                  border: minted ? "1px solid rgba(0,255,136,0.4)" : "none",
                  cursor: minting || minted ? "not-allowed" : "pointer",
                }}
              >
                {minted ? "✓ NFT MINTED" : minting ? "⚡ MINTING..." : `Mint ${pick.token} NFT`}
              </button>
              <button
                className="px-4 py-3 rounded-xl font-bold text-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: pick.color,
                  border: `1px solid ${pick.color}30`,
                }}
              >
                Stake {pick.token}
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end mt-3">
          <span className="text-xs font-mono" style={{ color: "#445" }}>
            {expanded ? "▲ Collapse" : "▼ Expand"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function NBADraftGenesis() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<"picks" | "currency" | "bridge">("picks");

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "rgba(5,11,26,0.95)", borderColor: "rgba(255,184,0,0.1)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-sm font-mono" style={{ color: "#8899AA" }}>
              ← ScrollVerse
            </span>
          </Link>
          <span style={{ color: "#334" }}>/</span>
          <span className="font-bold text-white">NBA Draft Genesis</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)" }}>
          <span className="text-xs font-bold" style={{ color: "#FFB800" }}>⚡ DRAFT CLASS 2026</span>
        </div>
      </nav>

      <div className="container max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
            SCROLLVERSE SOVEREIGN SPORTS EMPIRE
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            NBA Draft{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FFB800, #00D4FF, #00FF88)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Genesis
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            The sovereign draft that transcends all leagues. Three nodes. Three tokens. One empire. The Draft-Class Sovereign Currency is live on Polygon + Scroll L2.
          </p>

          {/* Draft-class currency banner */}
          <div
            className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl mb-8"
            style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)" }}
          >
            {DRAFT_PICKS.map(p => (
              <div key={p.token} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: p.color }}
                />
                <span className="font-mono font-bold text-sm" style={{ color: p.color }}>
                  {p.token}
                </span>
              </div>
            ))}
            <span className="text-xs" style={{ color: "#8899AA" }}>
              Draft-Class Sovereign Currency
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["picks", "currency", "bridge"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all"
              style={{
                background: activeTab === tab ? "rgba(255,184,0,0.2)" : "rgba(255,255,255,0.04)",
                color: activeTab === tab ? "#FFB800" : "#8899AA",
                border: `1px solid ${activeTab === tab ? "rgba(255,184,0,0.4)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {tab === "picks" ? "🏀 Draft Picks" : tab === "currency" ? "💰 Sovereign Currency" : "🌉 Scroll Bridge"}
            </button>
          ))}
        </div>

        {activeTab === "picks" && (
          <div className="space-y-6">
            {DRAFT_PICKS.map(pick => (
              <DraftCard
                key={pick.pick}
                pick={pick}
                expanded={expanded === pick.pick}
                onToggle={() => setExpanded(expanded === pick.pick ? null : pick.pick)}
              />
            ))}
          </div>
        )}

        {activeTab === "currency" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DRAFT_PICKS.map(pick => (
                <div
                  key={pick.token}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: `${pick.color}06`,
                    border: `1px solid ${pick.color}30`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4"
                    style={{ background: `${pick.color}20`, border: `2px solid ${pick.color}40`, color: pick.color, fontFamily: "'Space Mono', monospace" }}
                  >
                    {pick.token.replace("$", "")}
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">{pick.token}</h3>
                  <p className="text-xs mb-4" style={{ color: "#8899AA" }}>
                    {pick.name} Draft-Class Token
                  </p>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "#8899AA" }}>Total Supply</span>
                      <span style={{ color: pick.color }}>{pick.tokenSupply}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "#8899AA" }}>Staking APY</span>
                      <span style={{ color: pick.color }}>
                        {pick.stats.find(s => s.label === "Staking APY")?.value}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "#8899AA" }}>Zakat</span>
                      <span style={{ color: pick.color }}>7.77%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "#8899AA" }}>Chain</span>
                      <span style={{ color: pick.color }}>{pick.scrollBridge}</span>
                    </div>
                  </div>
                  <button
                    className="w-full mt-4 py-2 rounded-xl text-xs font-bold"
                    style={{ background: `${pick.color}20`, color: pick.color, border: `1px solid ${pick.color}30` }}
                  >
                    Buy {pick.token}
                  </button>
                </div>
              ))}
            </div>

            {/* Tokenomics overview */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="font-bold text-white mb-4">Draft-Class Tokenomics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Draft Supply", value: "6,000,000", color: "#FFB800" },
                  { label: "Zakat Pool", value: "466,200", color: "#00FF88" },
                  { label: "Guardian Rewards", value: "1,200,000", color: "#00D4FF" },
                  { label: "Sovereign Reserve", value: "4,333,800", color: "#A855F7" },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="text-xl font-black font-mono" style={{ color: item.color }}>
                      {item.value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "bridge" && (
          <div className="space-y-6">
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <h3 className="font-bold text-white mb-2">ScrollVerse Bridge Protocol</h3>
              <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
                All Draft-Class tokens are bridgeable across Polygon, Scroll L2, Arbitrum, and Base. The sovereign bridge ensures zero-dependency cross-chain movement.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DRAFT_PICKS.map(pick => (
                  <div
                    key={pick.token}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${pick.color}20` }}
                  >
                    <div className="font-bold text-sm mb-1" style={{ color: pick.color }}>
                      {pick.token}
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>
                      {pick.scrollBridge}
                    </div>
                    <div
                      className="mt-2 text-xs font-mono px-2 py-1 rounded inline-block"
                      style={{ background: `${pick.color}15`, color: pick.color }}
                    >
                      BRIDGE ACTIVE
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bridge steps */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="font-bold text-white mb-4">How to Bridge</h3>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Connect your sovereign wallet (MetaMask, Coinbase, WalletConnect)", color: "#FFB800" },
                  { step: "2", text: "Select your Draft-Class token ($AJ, $DARRYL, or $CALEB)", color: "#00D4FF" },
                  { step: "3", text: "Choose source and destination chain", color: "#00FF88" },
                  { step: "4", text: "Confirm the bridge transaction — 7.77% Zakat auto-applied", color: "#A855F7" },
                  { step: "5", text: "Tokens arrive on destination chain within 2-5 minutes", color: "#FF6B6B" },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}
                    >
                      {item.step}
                    </div>
                    <p className="text-sm" style={{ color: "#8899AA" }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center py-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            KUN FAYAKŪN × ∞ · Draft-Class Sovereign Currency · Zakat 7.77% · scrollverse.co
          </div>
        </div>
      </div>
    </div>
  );
}
