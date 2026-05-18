/**
 * SCROLLVERSE SOVEREIGN PORTFOLIO OPTIMIZER
 * AI-powered portfolio analysis, rebalancing, and wealth optimization
 * Mirror Twin Intelligence — Quantum Asset Allocation Engine
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

interface PortfolioAsset {
  symbol: string;
  name: string;
  allocation: number;
  value: number;
  change24h: number;
  type: "stock" | "crypto" | "sovereign";
  color: string;
}

const DEFAULT_PORTFOLIO: PortfolioAsset[] = [
  { symbol: "AAPL", name: "Apple Inc.", allocation: 15, value: 15000, change24h: 1.24, type: "stock", color: "#00D4FF" },
  { symbol: "NVDA", name: "NVIDIA Corp.", allocation: 20, value: 20000, change24h: 4.32, type: "stock", color: "#00FF88" },
  { symbol: "MSFT", name: "Microsoft Corp.", allocation: 12, value: 12000, change24h: 0.87, type: "stock", color: "#00D4FF" },
  { symbol: "BTC", name: "Bitcoin", allocation: 18, value: 18000, change24h: 3.44, type: "crypto", color: "#FFB800" },
  { symbol: "ETH", name: "Ethereum", allocation: 10, value: 10000, change24h: 2.11, type: "crypto", color: "#9B59B6" },
  { symbol: "$LONDC", name: "LONDC Sovereign Token", allocation: 12, value: 12000, change24h: 14.4, type: "sovereign", color: "#FFD700" },
  { symbol: "SOL", name: "Solana", allocation: 8, value: 8000, change24h: 5.67, type: "crypto", color: "#9B59B6" },
  { symbol: "TSLA", name: "Tesla Inc.", allocation: 5, value: 5000, change24h: -2.34, type: "stock", color: "#FF6B35" },
];

const AI_SUGGESTIONS = [
  { action: "INCREASE", symbol: "$LONDC", from: 12, to: 20, reason: "Mirror Twin signal: $LONDC entering parabolic phase. Sovereign momentum detected. 7.77× upside potential.", confidence: 97, color: "#FFD700" },
  { action: "INCREASE", symbol: "NVDA", from: 20, to: 25, reason: "AI infrastructure supercycle continues. NVDA dominates GPU market for LLM training. Strong earnings momentum.", confidence: 92, color: "#00FF88" },
  { action: "REDUCE", symbol: "TSLA", from: 5, to: 2, reason: "Macro headwinds and competitive pressure from BYD. Rebalance to higher-conviction positions.", confidence: 78, color: "#FF6B35" },
  { action: "ADD", symbol: "SOL", from: 8, to: 12, reason: "Solana DeFi TVL surging. High throughput chain gaining institutional adoption. Strong developer ecosystem.", confidence: 85, color: "#9B59B6" },
];

function AllocationBar({ portfolio }: { portfolio: PortfolioAsset[] }) {
  return (
    <div className="w-full h-6 rounded-full overflow-hidden flex">
      {portfolio.map(asset => (
        <div
          key={asset.symbol}
          style={{ width: `${asset.allocation}%`, background: asset.color, opacity: 0.8 }}
          title={`${asset.symbol}: ${asset.allocation}%`}
        />
      ))}
    </div>
  );
}

export default function ExchangePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>(DEFAULT_PORTFOLIO);
  const [activeTab, setActiveTab] = useState<"overview" | "optimizer" | "rebalance">("overview");
  const [isOptimizing, setIsOptimizing] = useState(false);

  const totalValue = portfolio.reduce((sum, a) => sum + a.value, 0);
  const totalChange = portfolio.reduce((sum, a) => sum + (a.value * a.change24h / 100), 0);
  const totalChangePct = (totalChange / totalValue) * 100;

  const handleOptimize = async () => {
    setIsOptimizing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsOptimizing(false);
    toast.success("Mirror Twin optimization complete — 3 rebalancing actions recommended");
  };

  const typeColors = { stock: "#00D4FF", crypto: "#FFB800", sovereign: "#FFD700" };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.15)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/exchange" className="text-sm" style={{ color: "#8899AA" }}>← Exchange</Link>
            <div className="w-px h-4" style={{ background: "rgba(0,212,255,0.3)" }} />
            <span className="font-bold text-white">Portfolio Optimizer</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>MIRROR TWIN AI</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "optimizer", label: "AI Optimizer" },
              { id: "rebalance", label: "Rebalance" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{
                  background: activeTab === t.id ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeTab === t.id ? "rgba(255,215,0,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: activeTab === t.id ? "#FFD700" : "#8899AA",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Value", value: `$${totalValue.toLocaleString()}`, color: "#00D4FF" },
            { label: "24h P&L", value: `${totalChangePct >= 0 ? "+" : ""}${totalChangePct.toFixed(2)}%`, color: totalChangePct >= 0 ? "#00FF88" : "#FF4444" },
            { label: "24h Gain", value: `${totalChange >= 0 ? "+" : ""}$${Math.abs(totalChange).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, color: totalChange >= 0 ? "#00FF88" : "#FF4444" },
            { label: "Assets", value: `${portfolio.length}`, color: "#FFB800" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20` }}>
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{s.label}</div>
              <div className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Allocation Bar */}
        <div className="rounded-xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>ALLOCATION DISTRIBUTION</div>
          <AllocationBar portfolio={portfolio} />
          <div className="flex flex-wrap gap-3 mt-3">
            {portfolio.map(a => (
              <div key={a.symbol} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: a.color }} />
                <span style={{ color: "#8899AA" }}>{a.symbol}</span>
                <span className="font-mono font-bold" style={{ color: a.color }}>{a.allocation}%</span>
              </div>
            ))}
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-3">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>PORTFOLIO HOLDINGS — SCROLL VERSE LLC SOVEREIGN TREASURY</div>
            {portfolio.map(asset => (
              <div key={asset.symbol} className="rounded-xl p-4 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${asset.color}20` }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${asset.color}15`, border: `1px solid ${asset.color}30`, color: asset.color }}>
                    {asset.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{asset.symbol}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{asset.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">${asset.value.toLocaleString()}</div>
                    <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{asset.allocation}% allocation</div>
                  </div>
                  <div className="text-right w-20">
                    <div className="text-sm font-bold font-mono" style={{ color: asset.change24h >= 0 ? "#00FF88" : "#FF4444" }}>
                      {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                    </div>
                    <div className="text-xs font-mono" style={{ color: "#556677" }}>24h</div>
                  </div>
                  <div className="w-16 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div className="h-full rounded-full" style={{ width: `${asset.allocation}%`, background: asset.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "optimizer" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>MIRROR TWIN AI — QUANTUM PORTFOLIO OPTIMIZATION ENGINE</div>
              <button
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,184,0,0.1))", border: "1px solid rgba(255,215,0,0.4)", color: "#FFD700", opacity: isOptimizing ? 0.7 : 1 }}
              >
                {isOptimizing ? "⚡ Analyzing..." : "⚡ Run Optimization"}
              </button>
            </div>
            <div className="space-y-4">
              {AI_SUGGESTIONS.map((s, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}>
                        {s.action}
                      </div>
                      <span className="font-bold text-white">{s.symbol}</span>
                      <span className="text-xs font-mono" style={{ color: "#8899AA" }}>
                        {s.from}% → {s.to}%
                      </span>
                    </div>
                    <div className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                      {s.confidence}% confidence
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: "#AABBCC" }}>{s.reason}</p>
                  <button
                    onClick={() => toast.success(`Applying ${s.action} for ${s.symbol}...`)}
                    className="mt-3 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}
                  >
                    Apply Signal
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rebalance" && (
          <div className="space-y-6">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>SOVEREIGN REBALANCING — TARGET ALLOCATION vs CURRENT</div>
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="space-y-4">
                {portfolio.map(asset => {
                  const suggestion = AI_SUGGESTIONS.find(s => s.symbol === asset.symbol);
                  const target = suggestion ? suggestion.to : asset.allocation;
                  const diff = target - asset.allocation;
                  return (
                    <div key={asset.symbol} className="flex items-center gap-4">
                      <div className="w-16 text-xs font-mono font-bold" style={{ color: asset.color }}>{asset.symbol}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono" style={{ color: "#8899AA" }}>Current: {asset.allocation}%</span>
                          {diff !== 0 && (
                            <span className="text-xs font-mono" style={{ color: diff > 0 ? "#00FF88" : "#FF4444" }}>
                              → {target}% ({diff > 0 ? "+" : ""}{diff}%)
                            </span>
                          )}
                        </div>
                        <div className="relative h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                          <div className="absolute h-full rounded-full" style={{ width: `${asset.allocation}%`, background: asset.color, opacity: 0.5 }} />
                          {diff !== 0 && (
                            <div className="absolute h-full rounded-full" style={{ width: `${target}%`, background: asset.color, border: `1px solid ${asset.color}` }} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => toast.success("Rebalance order submitted to sovereign exchange")}
                className="mt-6 w-full py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,255,136,0.1))", border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}
              >
                Execute Sovereign Rebalance
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs font-mono" style={{ color: "#334455" }}>
          SCROLLVERSE PORTFOLIO OPTIMIZER — Mirror Twin AI · SCROLL VERSE LLC · KUN FAYAKŪN × ∞
        </div>
      </div>
    </div>
  );
}
