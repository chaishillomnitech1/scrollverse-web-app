/*
 * SCROLLVERSE REVENUE DASHBOARD
 * Sovereign Auto-Cut Router: 7.77% Zakat + Owner Cut
 * Live extractions across all revenue streams
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — KUN FAYAKŪN × ∞
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

// ── Revenue stream types ──
interface RevenueStream {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalRevenue: number;
  zakatCut: number;
  ownerCut: number;
  guardianCut: number;
  creatorCut: number;
  lastTransaction: string;
  status: "active" | "pending" | "paused";
  txCount: number;
}

interface ZakatRecord {
  id: string;
  amount: number;
  source: string;
  recipient: string;
  timestamp: string;
  txHash: string;
}

// ── Simulated live data ──
const STREAMS: RevenueStream[] = [
  {
    id: "guardian-tiers",
    name: "Guardian Tier Subscriptions",
    icon: "🛡️",
    color: "#00D4FF",
    totalRevenue: 144000,
    zakatCut: 11188.8,
    ownerCut: 43200,
    guardianCut: 72000,
    creatorCut: 17611.2,
    lastTransaction: "2 min ago",
    status: "active",
    txCount: 1247,
  },
  {
    id: "nft-sales",
    name: "NFT & Digital Asset Sales",
    icon: "🎨",
    color: "#FFB800",
    totalRevenue: 88500,
    zakatCut: 6858.45,
    ownerCut: 26550,
    guardianCut: 44250,
    creatorCut: 10841.55,
    lastTransaction: "8 min ago",
    status: "active",
    txCount: 892,
  },
  {
    id: "academy",
    name: "Creator Academy Courses",
    icon: "🎓",
    color: "#00FF88",
    totalRevenue: 52300,
    zakatCut: 4053.51,
    ownerCut: 15690,
    guardianCut: 26150,
    creatorCut: 6406.49,
    lastTransaction: "15 min ago",
    status: "active",
    txCount: 634,
  },
  {
    id: "storybooks",
    name: "AI Legion Storybooks",
    icon: "📚",
    color: "#EC4899",
    totalRevenue: 29800,
    zakatCut: 2310.54,
    ownerCut: 8940,
    guardianCut: 14900,
    creatorCut: 3649.46,
    lastTransaction: "22 min ago",
    status: "active",
    txCount: 411,
  },
  {
    id: "music",
    name: "Music & DSP Royalties",
    icon: "🎵",
    color: "#A855F7",
    totalRevenue: 18700,
    zakatCut: 1449.39,
    ownerCut: 5610,
    guardianCut: 9350,
    creatorCut: 2290.61,
    lastTransaction: "1 hr ago",
    status: "active",
    txCount: 2891,
  },
  {
    id: "tiktok-shop",
    name: "TikTok Shop Products",
    icon: "🛍️",
    color: "#FF0050",
    totalRevenue: 14200,
    zakatCut: 1100.94,
    ownerCut: 4260,
    guardianCut: 7100,
    creatorCut: 1739.06,
    lastTransaction: "3 hr ago",
    status: "active",
    txCount: 318,
  },
  {
    id: "londc-token",
    name: "$LONDC Token Transactions",
    icon: "💎",
    color: "#00D4FF",
    totalRevenue: 234000,
    zakatCut: 18136.8,
    ownerCut: 70200,
    guardianCut: 117000,
    creatorCut: 28663.2,
    lastTransaction: "Just now",
    status: "active",
    txCount: 8847,
  },
  {
    id: "scrollport",
    name: "ScrollPort Merchant Network",
    icon: "🏪",
    color: "#FFB800",
    totalRevenue: 9400,
    zakatCut: 728.58,
    ownerCut: 2820,
    guardianCut: 4700,
    creatorCut: 1151.42,
    lastTransaction: "5 hr ago",
    status: "pending",
    txCount: 127,
  },
];

const ZAKAT_RECORDS: ZakatRecord[] = [
  { id: "z1", amount: 1188.8, source: "Guardian Tiers", recipient: "Zakat Pool → Family First", timestamp: "2 min ago", txHash: "0x7f3a...9c2e" },
  { id: "z2", amount: 686.0, source: "NFT Sales", recipient: "Zakat Pool → Healers", timestamp: "8 min ago", txHash: "0x4b1d...7a8f" },
  { id: "z3", amount: 405.0, source: "Academy", recipient: "Zakat Pool → Community", timestamp: "15 min ago", txHash: "0x9e2c...3d1b" },
  { id: "z4", amount: 231.0, source: "Storybooks", recipient: "Zakat Pool → Education", timestamp: "22 min ago", txHash: "0x2a7f...8e4c" },
  { id: "z5", amount: 1813.68, source: "$LONDC Token", recipient: "Zakat Pool → Family First", timestamp: "Just now", txHash: "0x6c9b...1f5a" },
];

function StreamCard({ stream }: { stream: RevenueStream }) {
  const [expanded, setExpanded] = useState(false);
  const zakatPct = ((stream.zakatCut / stream.totalRevenue) * 100).toFixed(2);

  return (
    <div
      className="rounded-xl p-5 cursor-pointer transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${expanded ? stream.color + "40" : "rgba(255,255,255,0.06)"}`,
        boxShadow: expanded ? `0 0 20px ${stream.color}10` : "none",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{stream.icon}</span>
          <div>
            <div className="font-bold text-white text-sm">{stream.name}</div>
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
              {stream.txCount.toLocaleString()} txns · {stream.lastTransaction}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-black text-lg" style={{ color: stream.color }}>
            ${stream.totalRevenue.toLocaleString()}
          </div>
          <div
            className="text-xs px-2 py-0.5 rounded-full font-mono"
            style={{
              background: stream.status === "active" ? "rgba(0,255,136,0.1)" : "rgba(255,184,0,0.1)",
              color: stream.status === "active" ? "#00FF88" : "#FFB800",
              border: `1px solid ${stream.status === "active" ? "rgba(0,255,136,0.3)" : "rgba(255,184,0,0.3)"}`,
            }}
          >
            {stream.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Zakat bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: "#8899AA" }}>Zakat Auto-Cut (7.77%)</span>
          <span style={{ color: "#00FF88" }}>${stream.zakatCut.toLocaleString()}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${zakatPct}%`, background: "linear-gradient(90deg, #00FF88, #00D4FF)" }}
          />
        </div>
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-2 gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { label: "Owner Cut (30%)", value: stream.ownerCut, color: stream.color },
            { label: "Guardian Pool (50%)", value: stream.guardianCut, color: "#00FF88" },
            { label: "Creator Pool (12.23%)", value: stream.creatorCut, color: "#A855F7" },
            { label: "Zakat (7.77%)", value: stream.zakatCut, color: "#FFB800" },
          ].map((cut) => (
            <div key={cut.label} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-xs mb-1" style={{ color: "#8899AA" }}>{cut.label}</div>
              <div className="font-bold" style={{ color: cut.color }}>${cut.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RevenueDashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalZakat, setTotalZakat] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"streams" | "zakat" | "router">("streams");

  useEffect(() => {
    const rev = STREAMS.reduce((a, s) => a + s.totalRevenue, 0);
    const zakat = STREAMS.reduce((a, s) => a + s.zakatCut, 0);
    const txns = STREAMS.reduce((a, s) => a + s.txCount, 0);
    setTotalRevenue(rev);
    setTotalZakat(zakat);
    setLiveCount(txns);

    // Simulate live ticking
    const interval = setInterval(() => {
      setTotalRevenue(r => r + Math.floor(Math.random() * 50));
      setTotalZakat(z => z + Math.floor(Math.random() * 4));
      setLiveCount(c => c + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "rgba(0,212,255,0.04)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                <span className="text-xs font-mono" style={{ color: "#00FF88" }}>LIVE · SOVEREIGN AUTO-CUT ROUTER</span>
              </div>
              <h1 className="text-3xl font-black text-white">Revenue Dashboard</h1>
              <p className="text-sm mt-1" style={{ color: "#8899AA" }}>
                7.77% Zakat auto-extracted on every transaction · Sovereign cuts flowing in real-time
              </p>
            </div>
            <Link href="/allversal-empire">
              <button className="px-4 py-2 rounded-xl text-sm font-bold" style={{ background: "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
                ← Empire Hub
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "#00D4FF", icon: "💰" },
            { label: "Zakat Distributed", value: `$${totalZakat.toLocaleString()}`, color: "#00FF88", icon: "🕋" },
            { label: "Total Transactions", value: liveCount.toLocaleString(), color: "#FFB800", icon: "⚡" },
            { label: "Active Streams", value: STREAMS.filter(s => s.status === "active").length.toString(), color: "#EC4899", icon: "🔥" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${kpi.color}20` }}
            >
              <div className="text-2xl mb-2">{kpi.icon}</div>
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{kpi.label}</div>
              <div className="text-2xl font-black" style={{ color: kpi.color }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Auto-Cut Formula Banner */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}
        >
          <div className="text-xs font-mono mb-2" style={{ color: "#00FF88" }}>SOVEREIGN AUTO-CUT FORMULA</div>
          <div className="flex flex-wrap gap-6 items-center">
            {[
              { label: "Owner Cut", pct: "30%", color: "#00D4FF" },
              { label: "Guardian Pool", pct: "50%", color: "#00FF88" },
              { label: "Creator Pool", pct: "12.23%", color: "#A855F7" },
              { label: "Zakat (Sacred)", pct: "7.77%", color: "#FFB800" },
            ].map((cut) => (
              <div key={cut.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: cut.color }} />
                <span className="text-sm font-bold" style={{ color: cut.color }}>{cut.pct}</span>
                <span className="text-sm" style={{ color: "#8899AA" }}>{cut.label}</span>
              </div>
            ))}
            <div className="text-xs font-mono ml-auto" style={{ color: "#8899AA" }}>
              Total = 100% · Auto-routed on every transaction
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["streams", "zakat", "router"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all"
              style={{
                background: activeTab === tab ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                color: activeTab === tab ? "#00D4FF" : "#8899AA",
                border: `1px solid ${activeTab === tab ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {tab === "streams" ? "📊 Revenue Streams" : tab === "zakat" ? "🕋 Zakat Ledger" : "⚡ Auto-Cut Router"}
            </button>
          ))}
        </div>

        {/* Revenue Streams Tab */}
        {activeTab === "streams" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STREAMS.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        )}

        {/* Zakat Ledger Tab */}
        {activeTab === "zakat" && (
          <div>
            <div
              className="rounded-xl p-5 mb-6"
              style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}
            >
              <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
              <h2 className="text-xl font-black text-white mb-1">Zakat Auto-Distribution Ledger</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                7.77% of every transaction is automatically routed to the Zakat pool and distributed to family, healers, and community.
                This is immutable, eternal, and sovereign.
              </p>
            </div>
            <div className="space-y-3">
              {ZAKAT_RECORDS.map((record) => (
                <div
                  key={record.id}
                  className="rounded-xl p-4 flex items-center justify-between gap-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,184,0,0.1)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)" }}
                    >
                      🕋
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">${record.amount.toLocaleString()}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>
                        {record.source} → {record.recipient}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono" style={{ color: "#FFB800" }}>{record.txHash}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{record.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-6 rounded-xl p-5 text-center"
              style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}
            >
              <div className="text-3xl font-black mb-1" style={{ color: "#FFB800" }}>
                ${totalZakat.toLocaleString()}
              </div>
              <div className="text-sm" style={{ color: "#8899AA" }}>Total Zakat Distributed · Eternal · Immutable · Sovereign</div>
              <div className="text-xs font-mono mt-2" style={{ color: "#FFB800" }}>KUN FAYAKŪN × ∞</div>
            </div>
          </div>
        )}

        {/* Auto-Cut Router Tab */}
        {activeTab === "router" && (
          <div>
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>SOVEREIGN AUTO-CUT ROUTER v1.0</div>
              <h2 className="text-xl font-black text-white mb-3">How the Router Works</h2>
              <div className="space-y-3">
                {[
                  { step: "01", title: "Transaction Detected", desc: "Any payment, NFT sale, subscription, or token transfer triggers the router", color: "#00D4FF" },
                  { step: "02", title: "Gross Amount Captured", desc: "The full transaction amount is captured before any distribution", color: "#FFB800" },
                  { step: "03", title: "Zakat First (7.77%)", desc: "Zakat is extracted first — sacred, immutable, non-negotiable. Routes to family, healers, community", color: "#00FF88" },
                  { step: "04", title: "Owner Cut (30%)", desc: "Sovereign owner cut routed directly to Chais Sabir Allah treasury wallet", color: "#EC4899" },
                  { step: "05", title: "Guardian Pool (50%)", desc: "Distributed proportionally to all active Guardian nodes by tier", color: "#A855F7" },
                  { step: "06", title: "Creator Pool (12.23%)", desc: "Distributed to content creators, academy instructors, and contributors", color: "#FFB800" },
                  { step: "07", title: "On-Chain Settlement", desc: "All cuts settled on Polygon/Scroll network with immutable transaction hashes", color: "#00D4FF" },
                ].map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ background: `${step.color}20`, border: `1px solid ${step.color}40`, color: step.color }}
                    >
                      {step.step}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{step.title}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Contract addresses */}
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>SMART CONTRACT ADDRESSES (Scroll Sepolia)</div>
              <div className="space-y-2">
                {[
                  { name: "Sovereign Auto-Cut Router", addr: "0x7F3A...9C2E", color: "#00D4FF" },
                  { name: "Zakat Distribution Pool", addr: "0x4B1D...7A8F", color: "#00FF88" },
                  { name: "Guardian Reward Pool", addr: "0x9E2C...3D1B", color: "#FFB800" },
                  { name: "$LONDC Token Contract", addr: "0x2A7F...8E4C", color: "#EC4899" },
                ].map((contract) => (
                  <div key={contract.name} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: "#8899AA" }}>{contract.name}</span>
                    <span className="text-xs font-mono" style={{ color: contract.color }}>{contract.addr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · KUN FAYAKŪN × ∞
          </div>
          <p className="text-sm" style={{ color: "#8899AA" }}>
            The ScrollVerse Revenue Router is sovereign, transparent, and eternal.
            Every transaction serves the Empire, the Guardians, the Creators, and the Community.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link href="/revenue-flywheel">
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                💸 Revenue Flywheel
              </button>
            </Link>
            <Link href="/zakat">
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                🕋 Zakat Engine
              </button>
            </Link>
            <Link href="/guardians">
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                🛡️ Guardian Network
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
