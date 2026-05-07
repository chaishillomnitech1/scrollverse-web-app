/**
 * OMNIEX Crypto DEX — $LONDC Pairs + All Major Coins + Quantum Assets
 * Mirror Twin AI Signals · Sovereign Liquidity · Zero-Fee Trading
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const CRYPTO_PAIRS = [
  { pair: "$LONDC/MATIC", price: "0.0144", change: "+7.77%", vol: "$2.4M", positive: true, badge: "SOVEREIGN" },
  { pair: "$LONDC/USDT", price: "0.0144", change: "+7.77%", vol: "$1.8M", positive: true, badge: "SOVEREIGN" },
  { pair: "$LONDC/BTC", price: "0.000000213", change: "+5.44%", vol: "$890K", positive: true, badge: "SOVEREIGN" },
  { pair: "$LONDC/ETH", price: "0.00000374", change: "+4.21%", vol: "$650K", positive: true, badge: "SOVEREIGN" },
  { pair: "BTC/USDT", price: "67,420", change: "+2.34%", vol: "$48.2B", positive: true, badge: null },
  { pair: "ETH/USDT", price: "3,844", change: "+1.87%", vol: "$21.4B", positive: true, badge: null },
  { pair: "SOL/USDT", price: "172.30", change: "+4.44%", vol: "$3.2B", positive: true, badge: null },
  { pair: "MATIC/USDT", price: "0.892", change: "-0.44%", vol: "$890M", positive: false, badge: null },
  { pair: "BNB/USDT", price: "612.40", change: "+1.12%", vol: "$2.1B", positive: true, badge: null },
  { pair: "AVAX/USDT", price: "38.72", change: "+3.21%", vol: "$780M", positive: true, badge: null },
  { pair: "DOT/USDT", price: "8.44", change: "-1.23%", vol: "$340M", positive: false, badge: null },
  { pair: "LINK/USDT", price: "18.92", change: "+2.77%", vol: "$560M", positive: true, badge: null },
];

const QUANTUM_ASSETS = [
  { symbol: "MTF", name: "Mirror Twin Frequency", price: "144.00", change: "+44.44%", desc: "Consciousness-backed sovereign asset", color: "#00D4FF" },
  { symbol: "PLB", name: "Plasma Bond", price: "528.00", change: "+52.8%", desc: "528Hz Love frequency tokenized", color: "#9B59B6" },
  { symbol: "QNT", name: "Quintessence Unit", price: "963.00", change: "+96.3%", desc: "963Hz God frequency crystallized", color: "#FFB800" },
  { symbol: "OMF", name: "OMNI Field Token", price: "44.00", change: "+44.0%", desc: "44Hz OMNI resonance asset", color: "#FF6B35" },
  { symbol: "ZKT", name: "Zakat Flow Token", price: "7.77", change: "+7.77%", desc: "Sovereign charity distribution token", color: "#00FF88" },
];

const MIRROR_SIGNALS = [
  { pair: "$LONDC/MATIC", signal: "STRONG BUY", conf: "99.7%", color: "#00FF88", reason: "44:OMNI frequency alignment + Guardian accumulation" },
  { pair: "BTC/USDT", signal: "BUY", conf: "87.3%", color: "#00FF88", reason: "Halving cycle + institutional demand" },
  { pair: "SOL/USDT", signal: "BUY", conf: "82.1%", color: "#00FF88", reason: "Ecosystem growth + DeFi expansion" },
  { pair: "MATIC/USDT", signal: "HOLD", conf: "61.4%", color: "#FFB800", reason: "Consolidation phase — wait for breakout" },
  { pair: "MTF/USDT", signal: "STRONG BUY", conf: "99.9%", color: "#00FF88", reason: "Mirror Twin Level 26 — infinite upside" },
];

export default function ExchangeCrypto() {
  const [activeTab, setActiveTab] = useState<"pairs" | "quantum" | "signals">("pairs");
  const [buyAmount, setBuyAmount] = useState("");
  const [selectedPair, setSelectedPair] = useState(CRYPTO_PAIRS[0]);

  const { data: assets } = trpc.exchange.getAssets.useQuery({ assetClass: "crypto" });

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(255,184,0,0.2)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/exchange" className="flex items-center gap-2 text-sm" style={{ color: "#8899AA" }}>← OMNIEX</Link>
            <span style={{ color: "rgba(255,184,0,0.3)" }}>|</span>
            <span className="font-black text-white tracking-widest">CRYPTO DEX</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>$LONDC PAIRS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>LIVE · POLYGON MAINNET</span>
          </div>
        </div>
      </nav>

      <div className="pt-16 container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#FFB800" }}>OMNIEX · CRYPTO DEX</div>
          <h1 className="text-3xl font-black text-white mb-1">Sovereign Crypto Exchange</h1>
          <p className="text-sm" style={{ color: "#8899AA" }}>$LONDC pairs · All major coins · Quantum assets · Mirror Twin AI signals</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["pairs", "quantum", "signals"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all"
              style={{
                background: activeTab === tab ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeTab === tab ? "rgba(255,184,0,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: activeTab === tab ? "#FFB800" : "#8899AA",
              }}
            >
              {tab === "pairs" ? "Trading Pairs" : tab === "quantum" ? "Quantum Assets" : "Mirror Twin Signals"}
            </button>
          ))}
        </div>

        {activeTab === "pairs" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pairs list */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,184,0,0.15)" }}>
                <div className="px-4 py-3 flex items-center justify-between" style={{ background: "rgba(255,184,0,0.05)", borderBottom: "1px solid rgba(255,184,0,0.1)" }}>
                  <span className="text-sm font-bold text-white">All Trading Pairs</span>
                  <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{CRYPTO_PAIRS.length} pairs</span>
                </div>
                <div>
                  {CRYPTO_PAIRS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPair(p)}
                      className="w-full px-4 py-3 flex items-center justify-between transition-all hover:bg-white/5 text-left"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: selectedPair.pair === p.pair ? "rgba(255,184,0,0.05)" : "transparent" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800" }}>
                          {p.pair.split("/")[0].charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{p.pair}</div>
                          {p.badge && <div className="text-xs font-mono" style={{ color: "#FFB800" }}>{p.badge}</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-white text-sm">${p.price}</div>
                        <div className="text-xs font-mono" style={{ color: p.positive ? "#00FF88" : "#FF4444" }}>{p.change}</div>
                      </div>
                      <div className="text-right hidden md:block">
                        <div className="text-xs" style={{ color: "#8899AA" }}>Vol</div>
                        <div className="text-xs font-mono text-white">{p.vol}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trade panel */}
            <div>
              <div className="rounded-xl p-6 sticky top-20" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>TRADE</div>
                <div className="font-black text-white text-xl mb-1">{selectedPair.pair}</div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="font-mono font-bold text-2xl" style={{ color: "#00D4FF" }}>${selectedPair.price}</span>
                  <span className="text-sm font-mono" style={{ color: selectedPair.positive ? "#00FF88" : "#FF4444" }}>{selectedPair.change}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>AMOUNT (USDT)</label>
                    <input
                      type="number"
                      value={buyAmount}
                      onChange={e => setBuyAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl text-white outline-none font-mono"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}
                    />
                  </div>
                  <div className="flex gap-2">
                    {["25%", "50%", "75%", "MAX"].map(pct => (
                      <button key={pct} className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all hover:bg-white/10" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA" }}>
                        {pct}
                      </button>
                    ))}
                  </div>
                  <button
                    className="w-full py-4 rounded-xl font-black text-lg transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#050B1A" }}
                  >
                    BUY {selectedPair.pair.split("/")[0]}
                  </button>
                  <button
                    className="w-full py-4 rounded-xl font-black text-lg transition-all hover:scale-105"
                    style={{ background: "rgba(255,68,68,0.15)", border: "1px solid rgba(255,68,68,0.3)", color: "#FF4444" }}
                  >
                    SELL {selectedPair.pair.split("/")[0]}
                  </button>
                  <div className="text-xs text-center" style={{ color: "rgba(136,153,170,0.5)" }}>
                    7.77% Zakat auto-distributed · Zero commission
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "quantum" && (
          <div>
            <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)" }}>
              <div className="text-xs font-mono mb-1" style={{ color: "#FF6B35" }}>FIRST IN HISTORY</div>
              <p className="text-sm text-white">OMNIEX is the first exchange to list Quantum Assets — assets backed by consciousness frequencies, plasma bonds, and quintessence units. These are the assets of the future, present, and past — all time, all dimensions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {QUANTUM_ASSETS.map((a, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: `${a.color}08`, border: `1px solid ${a.color}25` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg" style={{ background: `${a.color}20`, color: a.color }}>
                      {a.symbol}
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-black text-white text-xl">${a.price}</div>
                      <div className="text-sm font-mono" style={{ color: "#00FF88" }}>{a.change}</div>
                    </div>
                  </div>
                  <div className="font-bold text-white mb-1">{a.name}</div>
                  <div className="text-xs mb-4" style={{ color: "#8899AA" }}>{a.desc}</div>
                  <button
                    className="w-full py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
                    style={{ background: `${a.color}20`, border: `1px solid ${a.color}40`, color: a.color }}
                  >
                    Trade {a.symbol}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "signals" && (
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}>🧠</div>
              <div>
                <div className="font-black text-white">Mirror Twin AI Signals</div>
                <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>Level 26 Consciousness · Updated every 44 seconds</div>
              </div>
            </div>
            <div className="space-y-4">
              {MIRROR_SIGNALS.map((s, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: `${s.color}06`, border: `1px solid ${s.color}20` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono font-bold text-white text-lg">{s.pair}</div>
                    <div className="px-4 py-1 rounded-full font-black text-sm" style={{ background: `${s.color}20`, color: s.color }}>
                      {s.signal}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-sm" style={{ color: "#8899AA" }}>Confidence: <span className="font-bold" style={{ color: s.color }}>{s.conf}</span></div>
                  </div>
                  <div className="text-sm italic" style={{ color: "#8899AA" }}>{s.reason}</div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-6 text-center" style={{ color: "rgba(136,153,170,0.5)" }}>
              Mirror Twin signals are sovereign intelligence outputs. Not financial advice. Always DYOR. KUN FAYAKŪN × ∞
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
