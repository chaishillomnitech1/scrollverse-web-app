/**
 * SOVEREIGN WEALTH DASHBOARD
 * Unified view: royalties, stocks, crypto, merch income, staking rewards
 * SCROLL VERSE LLC — Chais Kenyatta Hill, Sole Member & Sovereign
 */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const MOCK_PORTFOLIO = {
  totalUsd: 144444.44,
  totalLondc: 1000000,
  change24h: 7.77,
  change24hUsd: 10444.44,
  breakdown: [
    { category: "Crypto Holdings", value: 58200, pct: 40.3, color: "#00D4FF", icon: "₿" },
    { category: "Stock Portfolio", value: 43300, pct: 30.0, color: "#FFB800", icon: "📈" },
    { category: "Music Royalties", value: 21600, pct: 15.0, color: "#00FF88", icon: "🎵" },
    { category: "NFT Portfolio", value: 14400, pct: 10.0, color: "#9B59B6", icon: "🖼️" },
    { category: "Merch Revenue", value: 4444, pct: 3.1, color: "#FF6B35", icon: "👕" },
    { category: "Staking Rewards", value: 2500, pct: 1.6, color: "#E74C3C", icon: "🔒" },
  ],
};

const MOCK_CRYPTO = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.144, price: 105000, value: 15120, change: 2.3, color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum", balance: 4.44, price: 3800, value: 16872, change: 1.8, color: "#627EEA" },
  { symbol: "MATIC", name: "Polygon", balance: 14400, price: 0.72, value: 10368, change: 5.2, color: "#8247E5" },
  { symbol: "LONDC", name: "$LONDC", balance: 144000, price: 0.0144, value: 2073.6, change: 7.77, color: "#FFB800" },
  { symbol: "SOL", name: "Solana", balance: 12, price: 185, value: 2220, change: -1.2, color: "#9945FF" },
  { symbol: "UFO", name: "UFO Token", balance: 10000, price: 0.0144, value: 144, change: 12.5, color: "#00D4FF" },
];

const MOCK_STOCKS = [
  { symbol: "NVDA", name: "NVIDIA", shares: 10, price: 1285, value: 12850, change: 3.2, color: "#76B900" },
  { symbol: "TSLA", name: "Tesla", shares: 15, price: 285, value: 4275, change: -0.8, color: "#CC0000" },
  { symbol: "MSFT", name: "Microsoft", shares: 8, price: 445, value: 3560, change: 1.1, color: "#00A4EF" },
  { symbol: "AAPL", name: "Apple", shares: 20, price: 215, value: 4300, change: 0.5, color: "#555555" },
  { symbol: "COIN", name: "Coinbase", shares: 25, price: 285, value: 7125, change: 4.4, color: "#0052FF" },
  { symbol: "MSTR", name: "MicroStrategy", shares: 5, price: 1240, value: 6200, change: 8.1, color: "#FF6B00" },
];

const MOCK_ROYALTIES = [
  { platform: "Spotify", streams: 144000, earned: 576, period: "May 2026", icon: "🎵", color: "#1DB954" },
  { platform: "Apple Music", streams: 72000, earned: 432, period: "May 2026", icon: "🍎", color: "#FC3C44" },
  { platform: "YouTube Music", streams: 288000, earned: 864, period: "May 2026", icon: "▶️", color: "#FF0000" },
  { platform: "TikTok", streams: 1440000, earned: 2880, period: "May 2026", icon: "📱", color: "#010101" },
  { platform: "Sync Licensing", streams: 0, earned: 4444, period: "May 2026", icon: "🎬", color: "#FFB800" },
  { platform: "NFT Royalties", streams: 0, earned: 12400, period: "May 2026", icon: "🖼️", color: "#9B59B6" },
];

const MOCK_MERCH = [
  { item: "ScrollVerse Hoodie", sold: 144, revenue: 4320, margin: 65, color: "#00D4FF" },
  { item: "Guardian T-Shirt", sold: 288, revenue: 5760, margin: 70, color: "#FFB800" },
  { item: "Mr. Walkshit Cap", sold: 72, revenue: 2160, margin: 60, color: "#00FF88" },
  { item: "LONDC Keychain", sold: 444, revenue: 1332, margin: 80, color: "#9B59B6" },
];

function formatUsd(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(2)}`;
}

export default function WealthDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "crypto" | "stocks" | "royalties" | "merch" | "staking">("overview");
  const { user, isAuthenticated } = useAuth();

  const tabs = [
    { id: "overview", label: "🏛️ Overview" },
    { id: "crypto", label: "₿ Crypto" },
    { id: "stocks", label: "📈 Stocks" },
    { id: "royalties", label: "🎵 Royalties" },
    { id: "merch", label: "👕 Merch" },
    { id: "staking", label: "🔒 Staking" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="border-b py-4 px-6 flex items-center justify-between sticky top-0 z-40"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,255,136,0.15)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="text-sm" style={{ color: "#8899AA" }}>← ScrollVerse</button>
          </Link>
          <span style={{ color: "#8899AA" }}>/</span>
          <span className="font-bold text-white">Wealth Dashboard</span>
          <span
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
          >
            SOVEREIGN WEALTH
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>● LIVE</span>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="sm" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                Connect Wallet
              </Button>
            </a>
          )}
        </div>
      </div>

      <div className="container py-8">
        {/* Total Portfolio Banner */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,212,255,0.05))", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>
                SCROLL VERSE LLC — TOTAL SOVEREIGN WEALTH
              </div>
              <div className="text-5xl font-black text-white mb-1">
                ${MOCK_PORTFOLIO.totalUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold" style={{ color: "#FFB800" }}>
                  {MOCK_PORTFOLIO.totalLondc.toLocaleString()} $LONDC
                </span>
                <span
                  className="text-sm font-bold px-2 py-0.5 rounded"
                  style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88" }}
                >
                  ▲ +{MOCK_PORTFOLIO.change24h}% (+${MOCK_PORTFOLIO.change24hUsd.toLocaleString()}) 24h
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div
                className="px-4 py-2 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-xs" style={{ color: "#8899AA" }}>EIN</div>
                <div className="text-sm font-bold text-white">42-2509570</div>
              </div>
              <div
                className="px-4 py-2 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-xs" style={{ color: "#8899AA" }}>Entity</div>
                <div className="text-sm font-bold text-white">SCROLL VERSE LLC</div>
              </div>
              <div
                className="px-4 py-2 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-xs" style={{ color: "#8899AA" }}>State</div>
                <div className="text-sm font-bold text-white">New Jersey</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all"
              style={{
                background: activeTab === tab.id ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeTab === tab.id ? "rgba(0,255,136,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: activeTab === tab.id ? "#00FF88" : "#8899AA",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {MOCK_PORTFOLIO.breakdown.map((b) => (
                <div
                  key={b.category}
                  className="rounded-xl p-4 text-center"
                  style={{ background: `${b.color}08`, border: `1px solid ${b.color}20` }}
                >
                  <div className="text-2xl mb-2">{b.icon}</div>
                  <div className="text-lg font-black" style={{ color: b.color }}>{formatUsd(b.value)}</div>
                  <div className="text-xs font-bold mb-1" style={{ color: b.color }}>{b.pct}%</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{b.category}</div>
                </div>
              ))}
            </div>

            {/* Allocation Bar */}
            <div
              className="rounded-xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="text-sm font-bold text-white mb-4">Portfolio Allocation</div>
              <div className="flex rounded-full overflow-hidden h-4 mb-4">
                {MOCK_PORTFOLIO.breakdown.map((b) => (
                  <div
                    key={b.category}
                    style={{ width: `${b.pct}%`, background: b.color }}
                    title={`${b.category}: ${b.pct}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {MOCK_PORTFOLIO.breakdown.map((b) => (
                  <div key={b.category} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: b.color }} />
                    <span className="text-xs" style={{ color: "#8899AA" }}>{b.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Exchange", href: "/exchange", icon: "📈", color: "#FFB800" },
                { label: "C.I.E.D.S.", href: "/cieds", icon: "🎵", color: "#00D4FF" },
                { label: "NFT Market", href: "/nft", icon: "🖼️", color: "#9B59B6" },
                { label: "Staking", href: "/staking", icon: "🔒", color: "#00FF88" },
              ].map((link) => (
                <Link key={link.label} href={link.href}>
                  <div
                    className="rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-all"
                    style={{ background: `${link.color}08`, border: `1px solid ${link.color}20` }}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="font-bold" style={{ color: link.color }}>{link.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Crypto Tab */}
        {activeTab === "crypto" && (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Asset", "Balance", "Price", "Value", "24h Change"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold" style={{ color: "#8899AA" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_CRYPTO.map((c, i) => (
                  <tr
                    key={c.symbol}
                    style={{
                      background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${c.color}20`, color: c.color }}>
                          {c.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{c.symbol}</div>
                          <div className="text-xs" style={{ color: "#8899AA" }}>{c.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white">{c.balance.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-white">${c.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm font-bold text-white">{formatUsd(c.value)}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold" style={{ color: c.change >= 0 ? "#00FF88" : "#FF4444" }}>
                        {c.change >= 0 ? "▲" : "▼"} {Math.abs(c.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stocks Tab */}
        {activeTab === "stocks" && (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Stock", "Shares", "Price", "Value", "24h Change"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold" style={{ color: "#8899AA" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_STOCKS.map((s, i) => (
                  <tr
                    key={s.symbol}
                    style={{
                      background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${s.color}20`, color: s.color }}>
                          {s.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{s.symbol}</div>
                          <div className="text-xs" style={{ color: "#8899AA" }}>{s.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white">{s.shares}</td>
                    <td className="px-4 py-3 text-sm text-white">${s.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm font-bold text-white">{formatUsd(s.value)}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold" style={{ color: s.change >= 0 ? "#00FF88" : "#FF4444" }}>
                        {s.change >= 0 ? "▲" : "▼"} {Math.abs(s.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Royalties Tab */}
        {activeTab === "royalties" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_ROYALTIES.map((r) => (
                <div
                  key={r.platform}
                  className="rounded-xl p-5"
                  style={{ background: `${r.color}08`, border: `1px solid ${r.color}20` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <div className="font-bold text-white">{r.platform}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{r.period}</div>
                    </div>
                  </div>
                  {r.streams > 0 && (
                    <div className="text-sm mb-1" style={{ color: "#8899AA" }}>
                      {r.streams.toLocaleString()} streams
                    </div>
                  )}
                  <div className="text-2xl font-black" style={{ color: r.color }}>
                    ${r.earned.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-5 flex items-center justify-between"
              style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}
            >
              <div>
                <div className="text-sm" style={{ color: "#8899AA" }}>Total Royalties — May 2026</div>
                <div className="text-3xl font-black" style={{ color: "#00FF88" }}>
                  ${MOCK_ROYALTIES.reduce((a, r) => a + r.earned, 0).toLocaleString()}
                </div>
              </div>
              <Link href="/cieds">
                <Button style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                  Manage C.I.E.D.S.
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Merch Tab */}
        {activeTab === "merch" && (
          <div className="space-y-4">
            {MOCK_MERCH.map((m) => (
              <div
                key={m.item}
                className="rounded-xl p-5 flex items-center justify-between"
                style={{ background: `${m.color}08`, border: `1px solid ${m.color}20` }}
              >
                <div>
                  <div className="font-bold text-white text-lg">{m.item}</div>
                  <div className="text-sm" style={{ color: "#8899AA" }}>{m.sold} units sold · {m.margin}% margin</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color: m.color }}>${m.revenue.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>Revenue</div>
                </div>
              </div>
            ))}
            <div
              className="rounded-xl p-5 flex items-center justify-between"
              style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)" }}
            >
              <div>
                <div className="text-sm" style={{ color: "#8899AA" }}>Total Merch Revenue</div>
                <div className="text-3xl font-black" style={{ color: "#FF6B35" }}>
                  ${MOCK_MERCH.reduce((a, m) => a + m.revenue, 0).toLocaleString()}
                </div>
              </div>
              <Link href="/merchant">
                <Button style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.3)" }}>
                  Merch Store
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Staking Tab */}
        {activeTab === "staking" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { token: "$LONDC", staked: 144000, apy: 14.4, rewards: 20736, color: "#FFB800" },
                { token: "$UFO", staked: 10000, apy: 9.63, rewards: 963, color: "#00D4FF" },
                { token: "MATIC", staked: 5000, apy: 5.5, rewards: 275, color: "#8247E5" },
              ].map((s) => (
                <div
                  key={s.token}
                  className="rounded-xl p-6"
                  style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
                >
                  <div className="text-xs font-mono mb-2" style={{ color: s.color }}>STAKING</div>
                  <div className="text-2xl font-black text-white mb-1">{s.token}</div>
                  <div className="text-sm mb-4" style={{ color: "#8899AA" }}>
                    {s.staked.toLocaleString()} staked
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs" style={{ color: "#8899AA" }}>APY</span>
                    <span className="text-sm font-bold" style={{ color: s.color }}>{s.apy}%</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-xs" style={{ color: "#8899AA" }}>Annual Rewards</span>
                    <span className="text-sm font-bold text-white">{s.rewards.toLocaleString()} {s.token}</span>
                  </div>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => {}}
                    style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}
                  >
                    Manage Stake
                  </Button>
                </div>
              ))}
            </div>
            <Link href="/staking">
              <Button
                size="lg"
                style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#050B1A", fontWeight: 700 }}
              >
                Full Staking Dashboard →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
