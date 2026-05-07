/**
 * OMNIEX Wall St Desk — Sovereign Equity Trading
 * Mirror Twin AI Signals · Fractional Shares · $LONDC Settlement
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const STOCKS = [
  { symbol: "NVDA", name: "NVIDIA Corp", price: "1,024.00", change: "+3.21%", sector: "AI/Tech", positive: true, mtSignal: "STRONG BUY" },
  { symbol: "AAPL", name: "Apple Inc", price: "213.40", change: "+0.88%", sector: "Tech", positive: true, mtSignal: "BUY" },
  { symbol: "TSLA", name: "Tesla Inc", price: "177.50", change: "-1.12%", sector: "EV/Energy", positive: false, mtSignal: "HOLD" },
  { symbol: "MSFT", name: "Microsoft Corp", price: "424.80", change: "+1.44%", sector: "Cloud/AI", positive: true, mtSignal: "BUY" },
  { symbol: "AMZN", name: "Amazon.com", price: "192.30", change: "+2.11%", sector: "E-Commerce/Cloud", positive: true, mtSignal: "BUY" },
  { symbol: "GOOGL", name: "Alphabet Inc", price: "178.60", change: "+0.77%", sector: "Search/AI", positive: true, mtSignal: "HOLD" },
  { symbol: "META", name: "Meta Platforms", price: "512.40", change: "+1.88%", sector: "Social/AI", positive: true, mtSignal: "BUY" },
  { symbol: "PLTR", name: "Palantir Tech", price: "24.80", change: "+5.44%", sector: "Defense AI", positive: true, mtSignal: "STRONG BUY" },
  { symbol: "COIN", name: "Coinbase Global", price: "244.20", change: "+4.21%", sector: "Crypto Exchange", positive: true, mtSignal: "BUY" },
  { symbol: "HOOD", name: "Robinhood Mkts", price: "21.40", change: "+2.77%", sector: "Fintech", positive: true, mtSignal: "BUY" },
  { symbol: "MSTR", name: "MicroStrategy", price: "1,812.00", change: "+7.77%", sector: "Bitcoin Treasury", positive: true, mtSignal: "STRONG BUY" },
  { symbol: "SPCE", name: "Virgin Galactic", price: "1.44", change: "-2.11%", sector: "Space", positive: false, mtSignal: "WATCH" },
];

const SECTORS = ["All", "AI/Tech", "Crypto Exchange", "Bitcoin Treasury", "Defense AI", "Fintech", "EV/Energy"];

const SIGNAL_COLOR: Record<string, string> = {
  "STRONG BUY": "#00FF88",
  "BUY": "#00D4FF",
  "HOLD": "#FFB800",
  "WATCH": "#FF6B35",
  "SELL": "#FF4444",
};

export default function ExchangeStocks() {
  const [sector, setSector] = useState("All");
  const [selectedStock, setSelectedStock] = useState(STOCKS[0]);
  const [amount, setAmount] = useState("");

  const { data: assets } = trpc.exchange.getAssets.useQuery({ assetClass: "stock" });

  const filtered = sector === "All" ? STOCKS : STOCKS.filter(s => s.sector.includes(sector));

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.2)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/exchange" className="text-sm" style={{ color: "#8899AA" }}>← OMNIEX</Link>
            <span style={{ color: "rgba(0,212,255,0.3)" }}>|</span>
            <span className="font-black text-white tracking-widest">WALL ST DESK</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>SOVEREIGN EQUITY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>NYSE · NASDAQ · LIVE</span>
          </div>
        </div>
      </nav>

      <div className="pt-16 container py-8">
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00D4FF" }}>OMNIEX · WALL ST DESK</div>
          <h1 className="text-3xl font-black text-white mb-1">Sovereign Equity Trading</h1>
          <p className="text-sm" style={{ color: "#8899AA" }}>NYSE + NASDAQ + global equities · Mirror Twin AI signals · $LONDC settlement · Fractional shares</p>
        </div>

        {/* Sector filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SECTORS.map(s => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: sector === s ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${sector === s ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: sector === s ? "#00D4FF" : "#8899AA",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stocks list */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="px-4 py-3 grid grid-cols-4 text-xs font-mono" style={{ background: "rgba(0,212,255,0.05)", borderBottom: "1px solid rgba(0,212,255,0.1)", color: "#8899AA" }}>
                <span>SYMBOL</span>
                <span className="text-right">PRICE</span>
                <span className="text-right">CHANGE</span>
                <span className="text-right">MT SIGNAL</span>
              </div>
              {filtered.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedStock(s)}
                  className="w-full px-4 py-3 grid grid-cols-4 items-center transition-all hover:bg-white/5 text-left"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: selectedStock.symbol === s.symbol ? "rgba(0,212,255,0.05)" : "transparent" }}
                >
                  <div>
                    <div className="font-bold text-white text-sm">{s.symbol}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{s.name}</div>
                  </div>
                  <div className="text-right font-mono font-bold text-white">${s.price}</div>
                  <div className="text-right font-mono text-sm" style={{ color: s.positive ? "#00FF88" : "#FF4444" }}>{s.change}</div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${SIGNAL_COLOR[s.mtSignal] ?? "#8899AA"}20`, color: SIGNAL_COLOR[s.mtSignal] ?? "#8899AA" }}>
                      {s.mtSignal}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trade panel */}
          <div>
            <div className="rounded-xl p-6 sticky top-20" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>TRADE</div>
              <div className="font-black text-white text-2xl mb-1">{selectedStock.symbol}</div>
              <div className="text-sm mb-1" style={{ color: "#8899AA" }}>{selectedStock.name}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-bold text-2xl" style={{ color: "#00D4FF" }}>${selectedStock.price}</span>
                <span className="text-sm font-mono" style={{ color: selectedStock.positive ? "#00FF88" : "#FF4444" }}>{selectedStock.change}</span>
              </div>
              <div className="mb-6 px-3 py-2 rounded-lg text-xs font-bold" style={{ background: `${SIGNAL_COLOR[selectedStock.mtSignal] ?? "#8899AA"}15`, color: SIGNAL_COLOR[selectedStock.mtSignal] ?? "#8899AA" }}>
                🧠 Mirror Twin: {selectedStock.mtSignal}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>AMOUNT (USD)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 rounded-xl text-white outline-none font-mono"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}
                  />
                </div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  Fractional shares available · Settle in $LONDC or USD
                </div>
                <button className="w-full py-4 rounded-xl font-black text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00D4FF, #00FF88)", color: "#050B1A" }}>
                  BUY {selectedStock.symbol}
                </button>
                <button className="w-full py-4 rounded-xl font-black text-lg transition-all hover:scale-105" style={{ background: "rgba(255,68,68,0.15)", border: "1px solid rgba(255,68,68,0.3)", color: "#FF4444" }}>
                  SELL {selectedStock.symbol}
                </button>
                <div className="text-xs text-center" style={{ color: "rgba(136,153,170,0.5)" }}>
                  7.77% Zakat auto-distributed · Zero commission
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
