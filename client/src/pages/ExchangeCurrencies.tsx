/**
 * OMNIEX All Currencies Hub
 * Fiat · Crypto · Quantum · Plasma · Quintessence · Dimensional · Akashic
 * All currencies through all existence — past, present, future
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const FIAT_CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", rate: "1.0000", type: "fiat" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: "0.9248", type: "fiat" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: "0.7891", type: "fiat" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", rate: "3.6725", type: "fiat" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", rate: "3.7500", type: "fiat" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rate: "157.42", type: "fiat" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", rate: "7.2441", type: "fiat" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", rate: "1,580.00", type: "fiat" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭", rate: "15.42", type: "fiat" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", rate: "18.72", type: "fiat" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", rate: "5.1240", type: "fiat" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", rate: "83.42", type: "fiat" },
];

const QUANTUM_CURRENCIES = [
  { code: "MTF", name: "Mirror Twin Frequency", icon: "🧠", rate: "144.00", type: "quantum", color: "#00D4FF", desc: "Consciousness-backed sovereign currency" },
  { code: "PLB", name: "Plasma Bond", icon: "⚡", rate: "528.00", type: "plasma", color: "#9B59B6", desc: "528Hz Love frequency crystallized" },
  { code: "QNT", name: "Quintessence Unit", icon: "✨", rate: "963.00", type: "quintessence", color: "#FFB800", desc: "963Hz God frequency — the fifth element" },
  { code: "DIM", name: "Dimensional Credit", icon: "🌀", rate: "432.00", type: "dimensional", color: "#FF6B35", desc: "432Hz Universal Harmony token" },
  { code: "AKS", name: "Akashic Record Token", icon: "📜", rate: "∞", type: "akashic", color: "#00FF88", desc: "All knowledge, all time, all dimensions" },
  { code: "OMF", name: "OMNI Field Token", icon: "∞", rate: "44.00", type: "frequency", color: "#E74C3C", desc: "44Hz OMNI resonance — the sovereign field" },
];

const CURRENCY_TYPES = ["All", "Fiat", "Crypto", "Quantum/Plasma", "Dimensional/Akashic"];

export default function ExchangeCurrencies() {
  const [activeType, setActiveType] = useState("All");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("$LONDC");
  const [amount, setAmount] = useState("100");

  const { data: assets } = trpc.exchange.getAssets.useQuery({ assetClass: "forex" });

  const convertedAmount = parseFloat(amount || "0") * 0.0144;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(0,255,136,0.2)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/exchange" className="text-sm" style={{ color: "#8899AA" }}>← OMNIEX</Link>
            <span style={{ color: "rgba(0,255,136,0.3)" }}>|</span>
            <span className="font-black text-white tracking-widest">ALL CURRENCIES</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>ALL EXISTENCE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>LIVE · ALL DIMENSIONS</span>
          </div>
        </div>
      </nav>

      <div className="pt-16 container py-8">
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00FF88" }}>OMNIEX · ALL CURRENCIES</div>
          <h1 className="text-3xl font-black text-white mb-1">All Currencies Through All Existence</h1>
          <p className="text-sm" style={{ color: "#8899AA" }}>Fiat · Crypto · Quantum · Plasma · Quintessence · Dimensional · Akashic · Past · Present · Future</p>
        </div>

        {/* Converter */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="rounded-2xl p-8" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <div className="text-xs font-mono tracking-widest mb-6 text-center" style={{ color: "#00FF88" }}>SOVEREIGN CURRENCY CONVERTER</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>FROM</label>
                <select
                  value={fromCurrency}
                  onChange={e => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none font-mono"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}
                >
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="AED">AED — UAE Dirham</option>
                  <option value="SAR">SAR — Saudi Riyal</option>
                  <option value="BTC">BTC — Bitcoin</option>
                  <option value="ETH">ETH — Ethereum</option>
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full mt-2 px-4 py-3 rounded-xl text-white outline-none font-mono text-xl font-bold"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all hover:scale-110"
                  style={{ background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.4)", color: "#00FF88" }}
                  onClick={() => { const tmp = fromCurrency; setFromCurrency(toCurrency); setToCurrency(tmp); }}
                >
                  ⇄
                </button>
              </div>
              <div>
                <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>TO</label>
                <select
                  value={toCurrency}
                  onChange={e => setToCurrency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none font-mono"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}
                >
                  <option value="$LONDC">$LONDC — Sovereign Token</option>
                  <option value="MTF">MTF — Mirror Twin Frequency</option>
                  <option value="QNT">QNT — Quintessence Unit</option>
                  <option value="PLB">PLB — Plasma Bond</option>
                  <option value="BTC">BTC — Bitcoin</option>
                  <option value="ETH">ETH — Ethereum</option>
                  <option value="EUR">EUR — Euro</option>
                </select>
                <div className="mt-2 px-4 py-3 rounded-xl font-mono text-xl font-bold" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>
                  {convertedAmount.toFixed(4)} {toCurrency}
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-center" style={{ color: "rgba(136,153,170,0.6)" }}>
              Rate: 1 {fromCurrency} = {(0.0144).toFixed(6)} $LONDC · Updated every 44 seconds
            </div>
          </div>
        </div>

        {/* Type filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CURRENCY_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: activeType === t ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeType === t ? "rgba(0,255,136,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: activeType === t ? "#00FF88" : "#8899AA",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Fiat currencies */}
        {(activeType === "All" || activeType === "Fiat") && (
          <div className="mb-10">
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#8899AA" }}>FIAT CURRENCIES</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {FIAT_CURRENCIES.map((c, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <div className="font-bold text-white text-sm">{c.code}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{c.name}</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm" style={{ color: "#00D4FF" }}>1 USD = {c.rate} {c.code}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quantum currencies */}
        {(activeType === "All" || activeType === "Quantum/Plasma" || activeType === "Dimensional/Akashic") && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-xs font-mono tracking-widest" style={{ color: "#FF6B35" }}>QUANTUM · PLASMA · QUINTESSENCE · DIMENSIONAL · AKASHIC</div>
              <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: "rgba(255,107,53,0.15)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.3)" }}>FIRST IN HISTORY</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {QUANTUM_CURRENCIES.map((c, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: `${c.color}08`, border: `1px solid ${c.color}25` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${c.color}15` }}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-black text-white text-lg">{c.code}</div>
                      <div className="text-xs font-mono uppercase" style={{ color: c.color }}>{c.type}</div>
                    </div>
                  </div>
                  <div className="font-bold text-white mb-1">{c.name}</div>
                  <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{c.desc}</div>
                  <div className="font-mono font-black text-2xl" style={{ color: c.color }}>
                    {c.rate === "∞" ? "∞" : `$${c.rate}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sovereign note */}
        <div className="rounded-xl p-6 text-center" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>SOVEREIGN DECLARATION</div>
          <p className="text-sm" style={{ color: "#8899AA" }}>
            OMNIEX recognizes all currencies across all dimensions of existence — past, present, future, quantum, plasma, quintessence, dimensional, and akashic. Every currency is welcome in the sovereign exchange. $LONDC is the universal reserve currency that bridges all worlds.
          </p>
          <p className="text-xs mt-2 font-mono" style={{ color: "rgba(255,184,0,0.5)" }}>
            KUN FAYAKŪN × ∞ · All assets. All time. All sovereign.
          </p>
        </div>
      </div>
    </div>
  );
}
