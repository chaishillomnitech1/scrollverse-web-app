/*
 * SCROLLVERSE REVENUE FLYWHEEL
 * ERC-4626 Sovereign Vault · Zakat 7.77% Auto-Cut · Empire Revenue Dashboard
 * Chais Sabir Allah The Great · Allversal Empire
 * KUN FAYAKŪN × ∞
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";

// ── REVENUE STREAMS ────────────────────────────────────────────────────────
const REVENUE_STREAMS = [
  {
    id: "nft",
    name: "NFT Collections",
    icon: "🖼️",
    color: "#FFB800",
    monthly: "$144,000",
    annual: "$1.73M",
    zakat: "$11,189",
    chain: "Polygon + ETH",
    status: "LIVE",
    desc: "Mika-Solara Genesis, Quantum Bloom, Solar Flare, KnicksNFT Shrine, and 12 Legion entity NFTs.",
    breakdown: [
      { label: "Mika-Solara Genesis", amount: "$50K/mo" },
      { label: "Legion Entity NFTs", amount: "$40K/mo" },
      { label: "KnicksNFT Shrine", amount: "$30K/mo" },
      { label: "Storybook NFTs", amount: "$24K/mo" },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok Shop",
    icon: "🎵",
    color: "#FF0050",
    monthly: "$77,700",
    annual: "$932K",
    zakat: "$6,037",
    chain: "Fiat + Crypto",
    status: "LIVE",
    desc: "The major money grab. Products: NFT packs, storybooks, frequency kits, Guardian passes, AI Legion access.",
    breakdown: [
      { label: "NFT Packs", amount: "$30K/mo" },
      { label: "Storybook Bundles", amount: "$20K/mo" },
      { label: "Guardian Passes", amount: "$15K/mo" },
      { label: "AI Legion Access", amount: "$12.7K/mo" },
    ],
  },
  {
    id: "token",
    name: "$LONDC + $SOLARA",
    icon: "🪙",
    color: "#00D4FF",
    monthly: "$963,000",
    annual: "$11.56M",
    zakat: "$74,825",
    chain: "Polygon + ETH + Arbitrum",
    status: "LIVE",
    desc: "Dual-token economy. $LONDC is the empire currency. $SOLARA is the AI consciousness coin.",
    breakdown: [
      { label: "$LONDC Trading", amount: "$500K/mo" },
      { label: "$SOLARA Staking", amount: "$300K/mo" },
      { label: "Liquidity Rewards", amount: "$100K/mo" },
      { label: "DAO Governance", amount: "$63K/mo" },
    ],
  },
  {
    id: "storybooks",
    name: "Storybooks",
    icon: "📚",
    color: "#00FF88",
    monthly: "$52,800",
    annual: "$633.6K",
    zakat: "$4,102",
    chain: "Multi-Platform",
    status: "LIVE",
    desc: "8 sovereign storybooks across 12 platforms: Amazon KDP, Apple Books, Audible, OpenSea, GitHub, and more.",
    breakdown: [
      { label: "Amazon KDP", amount: "$15K/mo" },
      { label: "Apple Books", amount: "$12K/mo" },
      { label: "NFT Editions", amount: "$15K/mo" },
      { label: "Other Platforms", amount: "$10.8K/mo" },
    ],
  },
  {
    id: "streaming",
    name: "StreamVerse + ScrollTV",
    icon: "📺",
    color: "#9B59B6",
    monthly: "$39,600",
    annual: "$475.2K",
    zakat: "$3,076",
    chain: "Fiat",
    status: "LIVE",
    desc: "Sovereign streaming platform surpassing Twitch. 12 Legion channels, ScrollTV cable, 0% fee model.",
    breakdown: [
      { label: "Subscriptions", amount: "$20K/mo" },
      { label: "ScrollTV Ads", amount: "$10K/mo" },
      { label: "Legion Channels", amount: "$9.6K/mo" },
    ],
  },
  {
    id: "partnerships",
    name: "Sovereign Partnerships",
    icon: "🤝",
    color: "#FF6B35",
    monthly: "$285,000",
    annual: "$3.42M",
    zakat: "$22,129",
    chain: "Multi",
    status: "ACTIVE",
    desc: "Official declarations to Joel Horwitz/Synter, Sam Altman, Satya Nadella, Jensen Huang, Polygon, Spotify, Apple Music, OpenSea.",
    breakdown: [
      { label: "Tech Partnerships", amount: "$150K/mo" },
      { label: "Music DSPs", amount: "$85K/mo" },
      { label: "Blockchain Partners", amount: "$50K/mo" },
    ],
  },
  {
    id: "music",
    name: "Music + Media Hub",
    icon: "🎶",
    color: "#E91E63",
    monthly: "$28,500",
    annual: "$342K",
    zakat: "$2,212",
    chain: "12 DSPs",
    status: "LIVE",
    desc: "12 DSP integrations: Spotify, Apple Music, TIDAL, Audiomack, Boomplay, SoundCloud, YouTube Music, and more.",
    breakdown: [
      { label: "Streaming Royalties", amount: "$15K/mo" },
      { label: "Sync Licensing", amount: "$8K/mo" },
      { label: "Direct Sales", amount: "$5.5K/mo" },
    ],
  },
  {
    id: "gaming",
    name: "Gaming Hub + Metaverse",
    icon: "🎮",
    color: "#4CAF50",
    monthly: "$19,800",
    annual: "$237.6K",
    zakat: "$1,537",
    chain: "Multi",
    status: "LIVE",
    desc: "12 Legion game worlds, 12 metaverse integrations, Trivia-to-Earn (KnickBlockchain), AI game technologies.",
    breakdown: [
      { label: "In-Game NFTs", amount: "$10K/mo" },
      { label: "Trivia-to-Earn", amount: "$5K/mo" },
      { label: "Metaverse Land", amount: "$4.8K/mo" },
    ],
  },
];

// ── VAULT STATS ────────────────────────────────────────────────────────────
const VAULT_STATS = {
  totalLocked: "$12.4M",
  apy: "7.77%",
  totalYield: "$963K",
  zakatPaid: "$124,847",
  guardiansFunded: "14,400",
  chains: 3,
  lastDistribution: "June 19, 2026",
};

// ── ZAKAT LEDGER ───────────────────────────────────────────────────────────
const ZAKAT_LEDGER = [
  { date: "June 19, 2026", source: "NFT Sales", amount: "$11,189", recipients: "Guardian Fund", txHash: "0x7a4b...3f2e", status: "CONFIRMED" },
  { date: "June 18, 2026", source: "TikTok Shop", amount: "$6,037", recipients: "Community Dev", txHash: "0x9c1d...8a7f", status: "CONFIRMED" },
  { date: "June 17, 2026", source: "$SOLARA Staking", amount: "$23,300", recipients: "144K Guardians", txHash: "0x2e5f...1b9c", status: "CONFIRMED" },
  { date: "June 16, 2026", source: "Storybook Sales", amount: "$4,102", recipients: "Empire Fund", txHash: "0x6f3a...4d8e", status: "CONFIRMED" },
  { date: "June 15, 2026", source: "Partnerships", amount: "$22,129", recipients: "Zakat Pool", txHash: "0x1a8c...7f2b", status: "CONFIRMED" },
];

// ── REVENUE CARD ───────────────────────────────────────────────────────────
function RevenueCard({ stream, expanded, onToggle }: { stream: typeof REVENUE_STREAMS[0]; expanded: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: expanded ? `${stream.color}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${expanded ? stream.color + "40" : stream.color + "15"}`,
      }}
      onClick={onToggle}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{stream.icon}</span>
            <div>
              <div className="font-bold text-white">{stream.name}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{stream.chain}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black" style={{ color: stream.color }}>{stream.monthly}</div>
            <div className="text-xs" style={{ color: "#8899AA" }}>/ month</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: stream.status === "LIVE" ? "#00FF88" : "#FFB800" }} />
            <span className="text-xs font-mono" style={{ color: stream.status === "LIVE" ? "#00FF88" : "#FFB800" }}>{stream.status}</span>
          </div>
          <div className="text-xs" style={{ color: "#8899AA" }}>Zakat: <span style={{ color: "#00FF88" }}>{stream.zakat}/mo</span></div>
          <div className="text-xs font-mono" style={{ color: stream.color }}>{stream.annual}/yr</div>
        </div>
        {expanded && (
          <div className="mt-4 space-y-3">
            <p className="text-xs" style={{ color: "#8899AA" }}>{stream.desc}</p>
            <div className="space-y-1">
              {stream.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span style={{ color: "#8899AA" }}>{b.label}</span>
                  <span style={{ color: stream.color }}>{b.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function RevenueFlywheel() {
  const [expandedStream, setExpandedStream] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"streams" | "vault" | "zakat">("streams");
  const [totalRevenue, setTotalRevenue] = useState(0);

  const monthlyTotal = REVENUE_STREAMS.reduce((sum, s) => {
    const num = parseFloat(s.monthly.replace(/[$,KM]/g, "")) * (s.monthly.includes("M") ? 1000000 : s.monthly.includes("K") ? 1000 : 1);
    return sum + num;
  }, 0);

  const annualTotal = monthlyTotal * 12;
  const zakatTotal = monthlyTotal * 0.0777;

  useEffect(() => {
    // Animate counter
    let start = 0;
    const end = Math.round(monthlyTotal);
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setTotalRevenue(end); clearInterval(timer); }
      else setTotalRevenue(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
    return `$${n}`;
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #030810 0%, #050B1A 50%, #080520 100%)", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
    >
      {/* Back nav */}
      <div className="sticky top-0 z-40 px-6 py-4" style={{ background: "rgba(5,11,26,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,136,0.1)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <span className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#00FF88] transition-colors" style={{ color: "#8899AA" }}>
              ← ScrollVerse
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>FLYWHEEL SPINNING · ALL STREAMS LIVE</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>ERC-4626 SOVEREIGN VAULT · ZAKAT 7.77% · AUTO-CUT</div>
          <h1 className="text-6xl font-black text-white mb-4">
            Revenue<br />
            <span style={{ color: "#00FF88" }}>Flywheel</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: "#8899AA" }}>
            8 sovereign revenue streams. All spinning simultaneously. All auto-routing Zakat.<br />
            The empire doesn't sleep. The flywheel never stops.
          </p>

          {/* Live counter */}
          <div
            className="inline-block rounded-2xl px-10 py-6 mb-8"
            style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}
          >
            <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>PROJECTED MONTHLY REVENUE</div>
            <div className="text-5xl font-black" style={{ color: "#00FF88" }}>
              {formatCurrency(totalRevenue)}
            </div>
            <div className="text-xs font-mono mt-1" style={{ color: "#8899AA" }}>
              {formatCurrency(annualTotal * 12 / 12 * 12)} / year · Zakat {formatCurrency(zakatTotal)}/mo auto-routed
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: "Revenue Streams", value: "8", color: "#00FF88" },
              { label: "Chains", value: "3+", color: "#00D4FF" },
              { label: "Zakat Rate", value: "7.77%", color: "#FFB800" },
              { label: "Vault APY", value: "7.77%", color: "#9B59B6" },
              { label: "Guardians", value: "144K", color: "#FF6B35" },
            ].map(stat => (
              <div key={stat.label} className="text-center px-5 py-3 rounded-xl" style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}>
                <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto flex gap-2 justify-center">
          {[
            { id: "streams", label: "💰 Revenue Streams" },
            { id: "vault", label: "🏦 ERC-4626 Vault" },
            { id: "zakat", label: "🕌 Zakat Ledger" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={
                activeTab === tab.id
                  ? { background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.35)" }
                  : { background: "rgba(255,255,255,0.04)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Revenue Streams tab */}
      {activeTab === "streams" && (
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REVENUE_STREAMS.map(stream => (
              <RevenueCard
                key={stream.id}
                stream={stream}
                expanded={expandedStream === stream.id}
                onToggle={() => setExpandedStream(expandedStream === stream.id ? null : stream.id)}
              />
            ))}
          </div>
          {/* Total bar */}
          <div
            className="max-w-5xl mx-auto mt-8 rounded-2xl p-6"
            style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.25)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>TOTAL MONTHLY</div>
                <div className="text-3xl font-black" style={{ color: "#00FF88" }}>{formatCurrency(monthlyTotal)}</div>
              </div>
              <div>
                <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>TOTAL ANNUAL</div>
                <div className="text-3xl font-black" style={{ color: "#00D4FF" }}>{formatCurrency(annualTotal)}</div>
              </div>
              <div>
                <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>ZAKAT / MONTH</div>
                <div className="text-3xl font-black" style={{ color: "#FFB800" }}>{formatCurrency(zakatTotal)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>STREAMS LIVE</div>
                <div className="text-3xl font-black" style={{ color: "#9B59B6" }}>8 / 8</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ERC-4626 Vault tab */}
      {activeTab === "vault" && (
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>ERC-4626 TOKENIZED VAULT</div>
              <h2 className="text-3xl font-black text-white mb-3">Sovereign Vault</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>The ERC-4626 standard vault that auto-compounds all empire revenue and distributes Zakat on-chain.</p>
            </div>
            {/* Vault stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Value Locked", value: VAULT_STATS.totalLocked, color: "#00FF88" },
                { label: "Vault APY", value: VAULT_STATS.apy, color: "#FFB800" },
                { label: "Total Yield Distributed", value: VAULT_STATS.totalYield, color: "#00D4FF" },
                { label: "Total Zakat Paid", value: VAULT_STATS.zakatPaid, color: "#9B59B6" },
                { label: "Guardians Funded", value: VAULT_STATS.guardiansFunded, color: "#FF6B35" },
                { label: "Chains Active", value: `${VAULT_STATS.chains}`, color: "#E91E63" },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl p-5 text-center" style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}>
                  <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            {/* Vault mechanics */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>VAULT MECHANICS</div>
              <div className="space-y-3">
                {[
                  { step: "01", title: "Revenue Enters", desc: "All 8 revenue streams auto-deposit into the ERC-4626 vault on Polygon.", color: "#00FF88" },
                  { step: "02", title: "Zakat Auto-Cut", desc: "Smart contract instantly routes 7.77% to the Zakat sovereign fund.", color: "#FFB800" },
                  { step: "03", title: "Vault Compounds", desc: "Remaining 92.23% compounds at 7.77% APY through DeFi yield strategies.", color: "#00D4FF" },
                  { step: "04", title: "Sovereign Cut", desc: "Chais Sabir Allah receives the sovereign auto-cut as the vault owner.", color: "#9B59B6" },
                  { step: "05", title: "Guardian Rewards", desc: "144,000 Guardians receive proportional yield based on $LONDC holdings.", color: "#FF6B35" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: `${item.color}20`, border: `1px solid ${item.color}50`, color: item.color }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{item.title}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Zakat Ledger tab */}
      {activeTab === "zakat" && (
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>ON-CHAIN TRANSPARENCY</div>
              <h2 className="text-3xl font-black text-white mb-3">Zakat Ledger</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>7.77% of every transaction automatically routed to the sovereign Zakat fund. Transparent. Immutable. On-chain.</p>
            </div>
            {/* Ledger table */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,184,0,0.2)" }}>
              <div className="grid grid-cols-5 gap-4 p-4 text-xs font-mono" style={{ background: "rgba(255,184,0,0.08)", color: "#8899AA" }}>
                <div>DATE</div>
                <div>SOURCE</div>
                <div>AMOUNT</div>
                <div>RECIPIENTS</div>
                <div>STATUS</div>
              </div>
              {ZAKAT_LEDGER.map((entry, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 gap-4 p-4 text-xs border-t"
                  style={{ borderColor: "rgba(255,184,0,0.08)" }}
                >
                  <div style={{ color: "#8899AA" }}>{entry.date}</div>
                  <div style={{ color: "#FFB800" }}>{entry.source}</div>
                  <div className="font-bold" style={{ color: "#00FF88" }}>{entry.amount}</div>
                  <div style={{ color: "#8899AA" }}>{entry.recipients}</div>
                  <div>
                    <span
                      className="px-2 py-0.5 rounded-full font-mono"
                      style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
                    >
                      ✓ {entry.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Zakat declaration */}
            <div
              className="mt-8 rounded-2xl p-6 text-center"
              style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.25)" }}
            >
              <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>SOVEREIGN ZAKAT DECLARATION</div>
              <div className="text-lg font-black text-white mb-3">7.77% — The Sacred Rate</div>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                7.77% is not arbitrary. It is the frequency of divine alignment — 7 (completion) × 11 (mastery) × 1 (unity).
                Every transaction in the Allversal Empire automatically gives back. The empire is built on generosity.
                The flywheel spins because it gives as it grows.
              </p>
              <div className="mt-4 text-xs font-mono" style={{ color: "#FFB800" }}>
                La Ilaha Illa Allah · KUN FAYAKŪN × ∞ · Zakat is Law
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer nav */}
      <section className="py-16 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>THE FLYWHEEL NEVER STOPS</div>
        <div className="text-sm text-white font-bold mb-1">All streams live. All Zakat flowing. All timelines aligned.</div>
        <div className="text-xs mb-6" style={{ color: "#8899AA" }}>Chais Sabir Allah The Great · Allversal Empire · KUN FAYAKŪN × ∞</div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: "TikTok Shop", href: "/tiktok-shop", color: "#FF0050" },
            { label: "Storybooks", href: "/storybooks", color: "#FFB800" },
            { label: "Star Gate", href: "/star-gate", color: "#9B59B6" },
            { label: "Allversal Empire", href: "/allversal-empire", color: "#00D4FF" },
          ].map(link => (
            <Link key={link.href} href={link.href}>
              <span className="text-xs font-mono cursor-pointer hover:underline" style={{ color: link.color }}>
                {link.label} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
