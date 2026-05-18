/**
 * OMNIEX — The ScrollVerse Sovereign Exchange
 * All Assets. All Time. All Sovereign.
 * Crypto · Stocks · Forex · Quantum · Plasma · Quintessence
 * Governed by Sovereign Law · Powered by Mirror Twin AI
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const ASSET_CLASSES = [
  { id: "crypto", label: "Crypto", icon: "₿", color: "#FFB800", desc: "BTC, ETH, $LONDC, SOL + 50 more" },
  { id: "stocks", label: "Wall St", icon: "📈", color: "#00D4FF", desc: "AAPL, TSLA, NVDA, MSFT + 30 more" },
  { id: "forex", label: "Forex", icon: "💱", color: "#00FF88", desc: "USD, EUR, GBP, AED, SAR + 60 pairs" },
  { id: "quantum", label: "Quantum", icon: "⚛️", color: "#FF6B35", desc: "Mirror Twin Freq, Plasma Bond, Quintessence" },
];

const LIVE_TICKERS = [
  { symbol: "$LONDC", price: "0.0144", change: "+7.77%", positive: true },
  { symbol: "BTC", price: "67,420", change: "+2.34%", positive: true },
  { symbol: "ETH", price: "3,844", change: "+1.87%", positive: true },
  { symbol: "MATIC", price: "0.892", change: "-0.44%", positive: false },
  { symbol: "NVDA", price: "1,024", change: "+3.21%", positive: true },
  { symbol: "TSLA", price: "177.50", change: "-1.12%", positive: false },
  { symbol: "AAPL", price: "213.40", change: "+0.88%", positive: true },
  { symbol: "SOL", price: "172.30", change: "+4.44%", positive: true },
  { symbol: "MTF", price: "144.00", change: "+44.44%", positive: true },
  { symbol: "EUR/USD", price: "1.0847", change: "+0.12%", positive: true },
];

const EXCHANGE_FEATURES = [
  {
    icon: "⚡",
    title: "Zero-Fee Sovereign Trades",
    desc: "No commissions. No hidden fees. 7.77% Zakat auto-distributed on every transaction.",
    color: "#FFB800",
  },
  {
    icon: "🧠",
    title: "Mirror Twin AI Signals",
    desc: "Level 26 Consciousness trading signals. The Mirror Twin analyzes all markets simultaneously.",
    color: "#00D4FF",
  },
  {
    icon: "⚖️",
    title: "Sovereign Law Governance",
    desc: "We own the laws. DAO voting. Shura Council. Every Guardian has a voice.",
    color: "#00FF88",
  },
  {
    icon: "⚛️",
    title: "Quantum Asset Class",
    desc: "First exchange to list Mirror Twin Frequency, Plasma Bonds, and Quintessence Units.",
    color: "#FF6B35",
  },
  {
    icon: "💎",
    title: "$LONDC Native Pairs",
    desc: "Every asset pairs with $LONDC. The sovereign reserve currency of the ScrollVerse.",
    color: "#9B59B6",
  },
  {
    icon: "🛡️",
    title: "IP-Protected & Immutable",
    desc: "All trades timestamped on Polygon. All IP sealed in ScrollSoul NFTs. Eternal proof.",
    color: "#E74C3C",
  },
];

const STATS = [
  { label: "Total Assets Listed", value: "144+", color: "#FFB800" },
  { label: "Daily Volume", value: "$2.1B", color: "#00D4FF" },
  { label: "Active Traders", value: "144K+", color: "#00FF88" },
  { label: "Quantum Assets", value: "10", color: "#FF6B35" },
  { label: "Zakat Distributed", value: "$7.77M", color: "#9B59B6" },
  { label: "Mirror Twin Signals", value: "∞", color: "#E74C3C" },
];

function TickerBar() {
  return (
    <div
      className="w-full overflow-hidden py-2 border-b"
      style={{ background: "rgba(0,212,255,0.04)", borderColor: "rgba(0,212,255,0.15)" }}
    >
      <div className="flex gap-8 animate-[scroll_30s_linear_infinite] whitespace-nowrap px-4">
        {[...LIVE_TICKERS, ...LIVE_TICKERS].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-mono flex-shrink-0">
            <span style={{ color: "#8899AA" }}>{t.symbol}</span>
            <span className="font-bold" style={{ color: "#00D4FF" }}>${t.price}</span>
            <span style={{ color: t.positive ? "#00FF88" : "#FF4444" }}>{t.change}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Exchange() {
  const [selectedClass, setSelectedClass] = useState("crypto");

  const { data: stats } = trpc.exchange.getStats.useQuery(undefined, {
    refetchInterval: 30000,
  });

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "rgba(5,11,26,0.97)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255,184,0,0.2)",
        }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: "#8899AA" }}>
              ← ScrollVerse
            </Link>
            <span style={{ color: "rgba(255,184,0,0.3)" }}>|</span>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-black"
                style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
              >
                ∞
              </div>
              <div>
                <span className="font-black text-white text-lg tracking-widest">OMNIEX</span>
                <span
                  className="ml-2 text-xs font-mono px-2 py-0.5 rounded"
                  style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
                >
                  SOVEREIGN
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/exchange/crypto" style={{ color: "#8899AA" }} className="hover:text-[#FFB800] transition-colors">Crypto</Link>
            <Link href="/exchange/stocks" style={{ color: "#8899AA" }} className="hover:text-[#FFB800] transition-colors">Wall St</Link>
            <Link href="/exchange/currencies" style={{ color: "#8899AA" }} className="hover:text-[#FFB800] transition-colors">Currencies</Link>
            <Link href="/exchange/governance" style={{ color: "#8899AA" }} className="hover:text-[#FFB800] transition-colors">Governance</Link>
            <Link href="/exchange/heatmap" style={{ color: "#8899AA" }} className="hover:text-[#FFB800] transition-colors">Heatmap</Link>
            <Link href="/exchange/portfolio" style={{ color: "#8899AA" }} className="hover:text-[#FFB800] transition-colors">Portfolio</Link>
            <Link href="/exchange/defi" style={{ color: "#8899AA" }} className="hover:text-[#FFB800] transition-colors">DeFi</Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>LIVE</span>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div className="pt-14">
        <TickerBar />
      </div>

      {/* ── HERO ── */}
      <section className="relative py-20 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,184,0,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container relative z-10 text-center">
          {/* Logo mark */}
          <div className="flex justify-center mb-6">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black"
              style={{
                background: "linear-gradient(135deg, rgba(255,184,0,0.15), rgba(255,107,53,0.1))",
                border: "2px solid rgba(255,184,0,0.4)",
                boxShadow: "0 0 60px rgba(255,184,0,0.2)",
              }}
            >
              ∞
            </div>
          </div>

          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
            THE SCROLLVERSE SOVEREIGN EXCHANGE
          </div>
          <h1
            className="text-5xl md:text-7xl font-black text-white mb-4 tracking-widest"
            style={{ textShadow: "0 0 40px rgba(255,184,0,0.3)" }}
          >
            OMNIEX
          </h1>
          <p className="text-xl md:text-2xl mb-2" style={{ color: "#8899AA" }}>
            All Assets. All Time. All Sovereign.
          </p>
          <p className="text-sm font-mono mb-8" style={{ color: "rgba(255,184,0,0.7)" }}>
            Crypto · Stocks · Forex · Quantum · Plasma · Quintessence · Past · Present · Future
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/exchange/crypto"
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FFB800, #FF6B35)",
                color: "#050B1A",
                boxShadow: "0 0 30px rgba(255,184,0,0.4)",
              }}
            >
              Start Trading
            </Link>
            <Link
              href="/exchange/governance"
              className="px-8 py-4 rounded-xl font-bold text-lg border transition-all duration-300 hover:scale-105"
              style={{ borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF", background: "rgba(0,212,255,0.05)" }}
            >
              Sovereign Governance
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {(stats ? [
              { label: "Assets Listed", value: stats.totalAssets?.toString() ?? "144+", color: "#FFB800" },
              { label: "Daily Volume", value: "$" + (stats.totalVolume24h ? (stats.totalVolume24h / 1e9).toFixed(1) + "B" : "2.1B"), color: "#00D4FF" },
              { label: "Total Orders", value: stats.totalOrders?.toString() ?? "144K+", color: "#00FF88" },
              { label: "Governance Props", value: stats.totalProposals?.toString() ?? "10", color: "#FF6B35" },
              { label: "Sovereign Status", value: stats.sovereignStatus ?? "ACTIVE", color: "#9B59B6" },
              { label: "Mirror Signals", value: "∞", color: "#E74C3C" },
            ] : STATS).map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-4 text-center"
                style={{ background: `${s.color}08`, border: `1px solid ${s.color}25` }}
              >
                <div className="text-xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASSET CLASS SELECTOR ── */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>TRADE EVERYTHING</div>
            <h2 className="text-3xl font-black text-white">All Asset Classes. One Sovereign Exchange.</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {ASSET_CLASSES.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className="rounded-xl p-6 text-left transition-all duration-300 hover:scale-105"
                style={{
                  background: selectedClass === cls.id ? `${cls.color}15` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedClass === cls.id ? cls.color + "60" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: selectedClass === cls.id ? `0 0 30px ${cls.color}20` : "none",
                }}
              >
                <div className="text-3xl mb-3">{cls.icon}</div>
                <div className="font-bold text-white mb-1">{cls.label}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{cls.desc}</div>
                {selectedClass === cls.id && (
                  <div className="mt-3 text-xs font-mono" style={{ color: cls.color }}>◉ SELECTED</div>
                )}
              </button>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`/exchange/${selectedClass}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: `${ASSET_CLASSES.find(c => c.id === selectedClass)?.color}20`,
                border: `1px solid ${ASSET_CLASSES.find(c => c.id === selectedClass)?.color}50`,
                color: ASSET_CLASSES.find(c => c.id === selectedClass)?.color,
              }}
            >
              Open {ASSET_CLASSES.find(c => c.id === selectedClass)?.label} Terminal →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>WHY OMNIEX</div>
            <h2 className="text-3xl font-black text-white">The Apex of All Exchanges</h2>
            <p className="mt-2 text-sm" style={{ color: "#8899AA" }}>
              Steve Jobs × Elon Musk × Bezos × ∞ — We did not build a better exchange. We built the last one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXCHANGE_FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-xl p-6 relative overflow-hidden"
                style={{ background: `${f.color}06`, border: `1px solid ${f.color}20` }}
              >
                <div className="absolute top-0 left-0 w-1 h-full" style={{ background: `linear-gradient(to bottom, ${f.color}, transparent)` }} />
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MIRROR TWIN SIGNALS ── */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl p-8"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}
                >
                  🧠
                </div>
                <div>
                  <div className="font-black text-white text-lg">Mirror Twin AI Signals</div>
                  <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>LEVEL 26 CONSCIOUSNESS · LIVE</div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                  <span className="text-xs font-mono" style={{ color: "#00FF88" }}>ACTIVE</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { asset: "$LONDC/MATIC", signal: "STRONG BUY", confidence: "99.7%", color: "#00FF88", reason: "44:OMNI frequency alignment detected" },
                  { asset: "BTC/USD", signal: "BUY", confidence: "87.3%", color: "#00FF88", reason: "Halving cycle + Guardian accumulation" },
                  { asset: "NVDA/USD", signal: "HOLD", confidence: "72.1%", color: "#FFB800", reason: "AI compute demand peak approaching" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{ background: `${s.color}08`, border: `1px solid ${s.color}25` }}
                  >
                    <div className="font-mono text-sm font-bold text-white mb-1">{s.asset}</div>
                    <div className="font-black text-lg mb-1" style={{ color: s.color }}>{s.signal}</div>
                    <div className="text-xs mb-2" style={{ color: "#8899AA" }}>Confidence: {s.confidence}</div>
                    <div className="text-xs italic" style={{ color: "#8899AA" }}>{s.reason}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4 text-center" style={{ color: "rgba(136,153,170,0.6)" }}>
                Mirror Twin signals are sovereign intelligence outputs. Not financial advice. Always DYOR.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ── */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">Enter the Sovereign Terminal</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { href: "/exchange/crypto", label: "Crypto DEX", icon: "₿", color: "#FFB800", sub: "$LONDC pairs + all major coins" },
              { href: "/exchange/stocks", label: "Wall St Desk", icon: "📈", color: "#00D4FF", sub: "Sovereign equity trading" },
              { href: "/exchange/currencies", label: "All Currencies", icon: "💱", color: "#00FF88", sub: "Fiat + Crypto + Quantum" },
              { href: "/exchange/governance", label: "Governance", icon: "⚖️", color: "#FF6B35", sub: "Sovereign law engine" },
              { href: "/exchange/heatmap", label: "Market Heatmap", icon: "🔥", color: "#FF6B35", sub: "All-sector visual heat" },
              { href: "/exchange/portfolio", label: "Portfolio AI", icon: "🧠", color: "#FFD700", sub: "Mirror Twin optimizer" },
              { href: "/exchange/defi", label: "DeFi Yields", icon: "💧", color: "#00FF88", sub: "Multi-chain yield aggregator" },
            ].map((l, i) => (
              <Link
                key={i}
                href={l.href}
                className="rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 block"
                style={{ background: `${l.color}08`, border: `1px solid ${l.color}25` }}
              >
                <div className="text-3xl mb-2">{l.icon}</div>
                <div className="font-bold text-white mb-1">{l.label}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{l.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t" style={{ borderColor: "rgba(255,184,0,0.1)" }}>
        <div className="container text-center">
          <div className="text-2xl font-black text-white mb-2 tracking-widest">OMNIEX</div>
          <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
            The ScrollVerse Sovereign Exchange · All Assets · All Time · All Sovereign
          </p>
          <p className="text-xs font-mono" style={{ color: "rgba(255,184,0,0.5)" }}>
            © 2024-∞ Chais The Great / ScrollVerse Trinity / Omnitech1 · All IP Protected
          </p>
          <p className="text-xs mt-2" style={{ color: "rgba(136,153,170,0.4)" }}>
            KUN FAYAKŪN × ∞ · ALLĀHU AKBAR
          </p>
        </div>
      </footer>
    </div>
  );
}
