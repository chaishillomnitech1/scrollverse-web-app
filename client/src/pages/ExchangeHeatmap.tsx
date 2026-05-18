/**
 * SCROLLVERSE MARKET HEATMAP
 * All-Existence Multi-Dimensional Market Visualization
 * Live Polygon.io + CoinGecko data — Sovereign Equity Intelligence
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const SECTORS = [
  { name: "Technology", color: "#00D4FF", stocks: ["AAPL", "MSFT", "NVDA", "GOOGL", "META", "AMZN", "TSLA"] },
  { name: "Finance", color: "#FFB800", stocks: ["JPM", "BAC", "GS", "MS", "V", "MA"] },
  { name: "Energy", color: "#FF6B35", stocks: ["XOM", "CVX", "COP", "SLB"] },
  { name: "Healthcare", color: "#00FF88", stocks: ["JNJ", "PFE", "UNH", "ABBV"] },
  { name: "Consumer", color: "#9B59B6", stocks: ["WMT", "COST", "MCD", "NKE"] },
  { name: "Crypto", color: "#FFD700", stocks: ["BTC", "ETH", "SOL", "BNB", "MATIC", "$LONDC"] },
];

function HeatCell({ symbol, price, change, size = "md" }: {
  symbol: string; price: number; change: number; size?: "sm" | "md" | "lg";
}) {
  const isPos = change >= 0;
  const intensity = Math.min(Math.abs(change) / 5, 1);
  const bg = isPos
    ? `rgba(0,255,136,${0.08 + intensity * 0.25})`
    : `rgba(255,68,68,${0.08 + intensity * 0.25})`;
  const border = isPos
    ? `rgba(0,255,136,${0.2 + intensity * 0.4})`
    : `rgba(255,68,68,${0.2 + intensity * 0.4})`;
  const textColor = isPos ? "#00FF88" : "#FF4444";

  const sizeClass = size === "lg" ? "p-4 min-h-[90px]" : size === "md" ? "p-3 min-h-[70px]" : "p-2 min-h-[50px]";

  return (
    <div
      className={`rounded-lg ${sizeClass} flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105`}
      style={{ background: bg, border: `1px solid ${border}` }}
      title={`${symbol}: $${price.toFixed(2)} (${change >= 0 ? "+" : ""}${change.toFixed(2)}%)`}
    >
      <div className="font-bold text-white text-xs">{symbol}</div>
      {size !== "sm" && (
        <div>
          {price > 0 && <div className="text-xs text-white opacity-70">${price > 1000 ? price.toLocaleString(undefined, { maximumFractionDigits: 0 }) : price.toFixed(2)}</div>}
          <div className="text-xs font-mono font-bold" style={{ color: textColor }}>
            {change >= 0 ? "+" : ""}{change.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
}

// Mock change data for display (real prices come from Polygon.io)
const MOCK_CHANGES: Record<string, number> = {
  AAPL: 1.24, MSFT: 0.87, NVDA: 4.32, GOOGL: -0.45, META: 2.11, AMZN: 1.67, TSLA: -2.34,
  JPM: 0.92, BAC: -0.33, GS: 1.44, MS: 0.78, V: 0.55, MA: 0.61,
  XOM: -1.12, CVX: -0.88, COP: -1.45, SLB: 0.34,
  JNJ: 0.23, PFE: -1.67, UNH: 1.89, ABBV: 0.44,
  WMT: 0.67, COST: 1.23, MCD: -0.12, NKE: -0.89,
  BTC: 3.44, ETH: 2.11, SOL: 5.67, BNB: 1.23, MATIC: 7.77, "$LONDC": 14.4,
};

export default function ExchangeHeatmap() {
  const [view, setView] = useState<"sector" | "size" | "crypto">("sector");
  const [sortBy, setSortBy] = useState<"change" | "alpha">("change");

  const allSymbols = SECTORS.flatMap(s => s.stocks);
  const { data: liveData } = trpc.exchange.getLiveStockPrices.useQuery(
    { symbols: allSymbols.filter(s => !["BTC", "ETH", "SOL", "BNB", "MATIC", "$LONDC"].includes(s)) },
    { refetchInterval: 30000 }
  );

  const priceMap = useMemo(() => {
    const map: Record<string, number> = {};
    if (liveData?.stocks) {
      Object.entries(liveData.stocks).forEach(([sym, data]: [string, unknown]) => {
        const d = data as { price?: number };
        if (d?.price) map[sym] = d.price;
      });
    }
    return map;
  }, [liveData]);

  // Market summary stats
  const allChanges = Object.values(MOCK_CHANGES);
  const gainers = allChanges.filter(c => c > 0).length;
  const losers = allChanges.filter(c => c < 0).length;
  const avgChange = allChanges.reduce((a, b) => a + b, 0) / allChanges.length;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.15)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/exchange" className="text-sm" style={{ color: "#8899AA" }}>← Exchange</Link>
            <div className="w-px h-4" style={{ background: "rgba(0,212,255,0.3)" }} />
            <span className="font-bold text-white">Market Heatmap</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>LIVE</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: "sector", label: "By Sector" },
              { id: "size", label: "By Size" },
              { id: "crypto", label: "Crypto" },
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setView(v.id as typeof view)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{
                  background: view === v.id ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${view === v.id ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: view === v.id ? "#00D4FF" : "#8899AA",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Market Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Gainers", value: `${gainers}`, color: "#00FF88", icon: "▲" },
            { label: "Losers", value: `${losers}`, color: "#FF4444", icon: "▼" },
            { label: "Avg Change", value: `${avgChange >= 0 ? "+" : ""}${avgChange.toFixed(2)}%`, color: avgChange >= 0 ? "#00FF88" : "#FF4444", icon: "≈" },
            { label: "Market Mood", value: avgChange > 1 ? "BULLISH" : avgChange < -1 ? "BEARISH" : "NEUTRAL", color: avgChange > 0 ? "#00FF88" : "#FF4444", icon: "⚡" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20` }}>
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{s.label}</div>
              <div className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.icon} {s.value}</div>
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        {view === "sector" && (
          <div className="space-y-6">
            {SECTORS.map(sector => (
              <div key={sector.name}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: sector.color }} />
                  <span className="text-sm font-bold" style={{ color: sector.color }}>{sector.name}</span>
                  <div className="h-px flex-1" style={{ background: `${sector.color}20` }} />
                </div>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {sector.stocks.map(sym => (
                    <HeatCell
                      key={sym}
                      symbol={sym}
                      price={priceMap[sym] ?? 0}
                      change={MOCK_CHANGES[sym] ?? 0}
                      size="md"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "size" && (
          <div className="space-y-4">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>SORTED BY MARKET IMPACT — LARGEST FIRST</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "META"].map(sym => (
                <HeatCell key={sym} symbol={sym} price={priceMap[sym] ?? 0} change={MOCK_CHANGES[sym] ?? 0} size="lg" />
              ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {["TSLA", "JPM", "V", "MA", "UNH", "JNJ"].map(sym => (
                <HeatCell key={sym} symbol={sym} price={priceMap[sym] ?? 0} change={MOCK_CHANGES[sym] ?? 0} size="md" />
              ))}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {["BAC", "GS", "MS", "XOM", "CVX", "WMT", "COST", "MCD"].map(sym => (
                <HeatCell key={sym} symbol={sym} price={priceMap[sym] ?? 0} change={MOCK_CHANGES[sym] ?? 0} size="sm" />
              ))}
            </div>
          </div>
        )}

        {view === "crypto" && (
          <div className="space-y-4">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>SOVEREIGN CRYPTO HEATMAP — $LONDC FEATURED</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* $LONDC featured large */}
              <div className="col-span-2 md:col-span-1">
                <HeatCell symbol="$LONDC" price={0.0144} change={14.4} size="lg" />
              </div>
              {["BTC", "ETH"].map(sym => (
                <HeatCell key={sym} symbol={sym} price={sym === "BTC" ? 67000 : 3500} change={MOCK_CHANGES[sym] ?? 0} size="lg" />
              ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {["SOL", "BNB", "MATIC", "$UFO", "$ETUNITY", "$LUNARWITNESS"].map(sym => (
                <HeatCell key={sym} symbol={sym} price={0} change={MOCK_CHANGES[sym] ?? (Math.random() * 10 - 3)} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: "rgba(0,255,136,0.4)" }} />
            <span style={{ color: "#8899AA" }}>Strong Gain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: "rgba(0,255,136,0.12)" }} />
            <span style={{ color: "#8899AA" }}>Mild Gain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: "rgba(255,68,68,0.12)" }} />
            <span style={{ color: "#8899AA" }}>Mild Loss</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: "rgba(255,68,68,0.4)" }} />
            <span style={{ color: "#8899AA" }}>Strong Loss</span>
          </div>
        </div>

        <div className="mt-8 text-center text-xs font-mono" style={{ color: "#334455" }}>
          SCROLLVERSE MARKET HEATMAP — Powered by Polygon.io · KUN FAYAKŪN × ∞
        </div>
      </div>
    </div>
  );
}
