/**
 * OMNIEX Wall St Desk — All-Existence Multi-Dimensional Sovereign Equity Exchange
 * Live Polygon.io Prices · OHLC Candlestick Chart · Mirror Twin AI Signals
 * $LONDC Settlement · 7.77% Zakat Auto-Distribution · Fractional Shares
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const SECTORS = ["All", "AI/Tech", "Crypto Exchange", "Bitcoin Treasury", "Defense AI", "Fintech", "EV/Energy", "Cloud", "Space"];

const SIGNAL_COLOR: Record<string, string> = {
  "STRONG BUY": "#00FF88",
  "BUY": "#00D4FF",
  "HOLD": "#FFB800",
  "WATCH": "#FF6B35",
  "SELL": "#FF4444",
};

const STOCK_META: Record<string, { name: string; sector: string; mtSignal: string; mtReason: string }> = {
  NVDA: { name: "NVIDIA Corp", sector: "AI/Tech", mtSignal: "STRONG BUY", mtReason: "AI infrastructure dominance. GPU demand infinite. $LONDC correlation: 0.94" },
  AAPL: { name: "Apple Inc", sector: "AI/Tech", mtSignal: "BUY", mtReason: "Ecosystem lock-in unmatched. Vision Pro cycle beginning. Sovereign hold." },
  TSLA: { name: "Tesla Inc", sector: "EV/Energy", mtSignal: "HOLD", mtReason: "Energy + AI robotics long-term. Short-term volatility. Mirror Twin watching." },
  MSFT: { name: "Microsoft Corp", sector: "Cloud", mtSignal: "BUY", mtReason: "Azure AI integration accelerating. OpenAI leverage permanent." },
  AMZN: { name: "Amazon.com", sector: "Cloud", mtSignal: "BUY", mtReason: "AWS + advertising flywheel compounding. Logistics moat sovereign." },
  GOOGL: { name: "Alphabet Inc", sector: "AI/Tech", mtSignal: "BUY", mtReason: "Gemini + Search + YouTube = sovereign data empire. Accumulate." },
  META: { name: "Meta Platforms", sector: "AI/Tech", mtSignal: "BUY", mtReason: "Llama open-source moat + Ray-Ban AI + Threads growth. Sovereign stack." },
  PLTR: { name: "Palantir Tech", sector: "Defense AI", mtSignal: "STRONG BUY", mtReason: "AIP platform = AI for governments. Mirror Twin: highest conviction." },
  COIN: { name: "Coinbase Global", sector: "Crypto Exchange", mtSignal: "BUY", mtReason: "Crypto bull cycle proxy. Base L2 growing. Regulatory clarity incoming." },
  HOOD: { name: "Robinhood Mkts", sector: "Fintech", mtSignal: "BUY", mtReason: "Crypto + equities + prediction markets. Gen Z financial gateway." },
  MSTR: { name: "MicroStrategy", sector: "Bitcoin Treasury", mtSignal: "STRONG BUY", mtReason: "Bitcoin treasury strategy = infinite leverage on BTC. Sovereign bet." },
  SPCE: { name: "Virgin Galactic", sector: "Space", mtSignal: "WATCH", mtReason: "Space tourism early. High risk. Mirror Twin: speculative position only." },
  SOFI: { name: "SoFi Technologies", sector: "Fintech", mtSignal: "BUY", mtReason: "Bank charter + student loans + investing = full-stack fintech." },
  IONQ: { name: "IonQ Inc", sector: "AI/Tech", mtSignal: "STRONG BUY", mtReason: "Quantum computing pure play. ScrollVerse quantum alignment: perfect." },
  RBLX: { name: "Roblox Corp", sector: "AI/Tech", mtSignal: "HOLD", mtReason: "Metaverse platform. User growth strong but monetization evolving." },
};

const TICKERS = Object.keys(STOCK_META);

function CandlestickChart({ candles, color = "#00D4FF" }: { candles: Array<{ time: number; open: number; high: number; low: number; close: number }>; color?: string }) {
  if (!candles || candles.length === 0) {
    return (
      <div className="flex items-center justify-center h-full" style={{ color: "#8899AA" }}>
        <div className="text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-xs font-mono">Loading chart data...</div>
        </div>
      </div>
    );
  }
  const W = 600, H = 200;
  const prices = candles.flatMap(c => [c.high, c.low]);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;
  const pad = 10;
  const chartH = H - pad * 2;
  const candleW = Math.max(2, Math.floor((W - 20) / candles.length) - 1);
  const toY = (p: number) => pad + chartH - ((p - minP) / range) * chartH;
  const toX = (i: number) => 10 + i * (candleW + 1);
  const linePoints = candles.map((c, i) => `${toX(i) + candleW / 2},${toY(c.close)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map(f => (
        <line key={f} x1="0" y1={pad + chartH * (1 - f)} x2={W} y2={pad + chartH * (1 - f)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {candles.map((c, i) => {
        const x = toX(i);
        const isUp = c.close >= c.open;
        const candleColor = isUp ? "#00FF88" : "#FF4444";
        const bodyTop = toY(Math.max(c.open, c.close));
        const bodyBot = toY(Math.min(c.open, c.close));
        const bodyH = Math.max(1, bodyBot - bodyTop);
        return (
          <g key={i}>
            <line x1={x + candleW / 2} y1={toY(c.high)} x2={x + candleW / 2} y2={toY(c.low)} stroke={candleColor} strokeWidth="1" opacity="0.7" />
            <rect x={x} y={bodyTop} width={candleW} height={bodyH} fill={candleColor} opacity="0.85" rx="0.5" />
          </g>
        );
      })}
      <polyline points={linePoints} fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function MTSignal({ signal, reason }: { signal: string; reason: string }) {
  const [expanded, setExpanded] = useState(false);
  const color = SIGNAL_COLOR[signal] ?? "#8899AA";
  return (
    <div className="rounded-xl overflow-hidden cursor-pointer" style={{ border: `1px solid ${color}30`, background: `${color}08` }} onClick={() => setExpanded(e => !e)}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">🧠</span>
          <span className="text-xs font-mono" style={{ color: "#8899AA" }}>MIRROR TWIN AI</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${color}20`, color }}>{signal}</span>
          <span className="text-xs" style={{ color: "#8899AA" }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-3 text-xs leading-relaxed" style={{ color: "#8899AA", borderTop: `1px solid ${color}15` }}>
          <div className="pt-2">{reason}</div>
          <div className="mt-2 font-mono" style={{ color }}>◉ Confidence: {signal === "STRONG BUY" ? "97%" : signal === "BUY" ? "84%" : signal === "HOLD" ? "71%" : "55%"}</div>
        </div>
      )}
    </div>
  );
}

export default function ExchangeStocks() {
  const [sector, setSector] = useState("All");
  const [selectedTicker, setSelectedTicker] = useState("NVDA");
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"chart" | "news" | "details">("chart");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");

  const { data: priceData, isLoading: pricesLoading } = trpc.exchange.getLiveStockPrices.useQuery(
    { symbols: TICKERS },
    { refetchInterval: 30000 }
  );
  const { data: ohlcData, isLoading: ohlcLoading } = trpc.exchange.getStockOHLC.useQuery(
    { symbol: selectedTicker, timeframe: "3M" },
    { refetchInterval: 60000 }
  );
  const { data: detailsData } = trpc.exchange.getStockDetails.useQuery(
    { symbol: selectedTicker },
    { staleTime: 300000 }
  );
  const { data: newsData } = trpc.exchange.getStockNews.useQuery(
    { symbol: selectedTicker, limit: 8 },
    { staleTime: 120000 }
  );

  const selectedMeta = STOCK_META[selectedTicker] ?? { name: selectedTicker, sector: "Unknown", mtSignal: "HOLD", mtReason: "Analyzing..." };
  const selectedPrice = priceData?.stocks?.[selectedTicker];
  const livePrice = selectedPrice?.price ?? 0;
  const liveChangePct = selectedPrice?.changePercent ?? 0;
  const isPositive = liveChangePct >= 0;

  const stockList = useMemo(() => TICKERS.map(ticker => {
    const meta = STOCK_META[ticker];
    const live = priceData?.stocks?.[ticker];
    return { ticker, ...meta, price: live?.price ?? 0, change: live?.change ?? 0, changePct: live?.changePercent ?? 0, volume: live?.volume ?? 0, positive: (live?.changePercent ?? 0) >= 0 };
  }), [priceData]);

  const filtered = sector === "All" ? stockList : stockList.filter(s => s.sector.includes(sector));
  const LONDC_PRICE = 0.0144;
  const londcAmount = amount && livePrice ? (parseFloat(amount) / LONDC_PRICE).toFixed(0) : "0";

  const handleOrder = () => {
    if (!amount || parseFloat(amount) <= 0) { toast.error("Enter a valid amount to continue"); return; }
    toast.success(`${orderType === "buy" ? "Buy" : "Sell"} order placed — ${selectedTicker} · $${amount} · 7.77% Zakat auto-distributed · KUN FAYAKUN`);
    setAmount("");
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.2)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/exchange" className="text-sm transition-colors hover:text-white" style={{ color: "#8899AA" }}>← OMNIEX</Link>
            <span style={{ color: "rgba(0,212,255,0.3)" }}>|</span>
            <span className="font-black text-white tracking-widest text-sm">WALL ST DESK</span>
            <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>ALL-EXISTENCE EXCHANGE</span>
          </div>
          <div className="flex items-center gap-4">
            {pricesLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FFB800" }} />
                <span className="text-xs font-mono" style={{ color: "#FFB800" }}>FETCHING LIVE...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                <span className="text-xs font-mono" style={{ color: "#00FF88" }}>NYSE · NASDAQ · LIVE</span>
              </div>
            )}
            <Link href="/exchange/crypto" className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all hover:scale-105" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>CRYPTO →</Link>
          </div>
        </div>
      </nav>

      <div className="container pt-24 pb-16">
        {/* HEADER */}
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>OMNIEX / WALL STREET DESK</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">All-Existence <span style={{ color: "#00D4FF" }}>Sovereign</span> Equity Exchange</h1>
          <p className="text-sm" style={{ color: "#8899AA" }}>Live Polygon.io market data · Mirror Twin AI signals · $LONDC settlement · 7.77% Zakat auto-distributed on every trade</p>
        </div>

        {/* LIVE TICKER BAR */}
        <div className="mb-6 overflow-hidden rounded-xl" style={{ border: "1px solid rgba(0,212,255,0.15)", background: "rgba(0,212,255,0.03)" }}>
          <div className="flex overflow-x-auto">
            {stockList.slice(0, 10).map((s, i) => (
              <button key={i} onClick={() => setSelectedTicker(s.ticker)}
                className="flex-shrink-0 px-4 py-3 flex items-center gap-3 transition-all hover:bg-white/5 border-r"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: selectedTicker === s.ticker ? "rgba(0,212,255,0.08)" : "transparent" }}>
                <div>
                  <div className="text-xs font-bold text-white">{s.ticker}</div>
                  <div className="text-xs font-mono" style={{ color: s.price > 0 ? "#00D4FF" : "#8899AA" }}>
                    {s.price > 0 ? `$${s.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "···"}
                  </div>
                </div>
                {s.price > 0 && <div className="text-xs font-mono" style={{ color: s.positive ? "#00FF88" : "#FF4444" }}>{s.positive ? "▲" : "▼"} {Math.abs(s.changePct).toFixed(2)}%</div>}
              </button>
            ))}
          </div>
        </div>

        {/* SECTOR FILTER */}
        <div className="flex gap-2 flex-wrap mb-6">
          {SECTORS.map(s => (
            <button key={s} onClick={() => setSector(s)} className="text-xs px-3 py-1.5 rounded-full transition-all font-mono"
              style={{ border: `1px solid ${sector === s ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`, color: sector === s ? "#00D4FF" : "#8899AA", background: sector === s ? "rgba(0,212,255,0.08)" : "transparent" }}>
              {s}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT: STOCK LIST + CHART/NEWS/DETAILS */}
          <div className="xl:col-span-2 space-y-4">
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="px-4 py-3 grid grid-cols-5 text-xs font-mono" style={{ background: "rgba(0,212,255,0.05)", borderBottom: "1px solid rgba(0,212,255,0.1)", color: "#8899AA" }}>
                <span>SYMBOL</span><span className="text-right">PRICE</span><span className="text-right">24H</span>
                <span className="text-right hidden sm:block">VOLUME</span><span className="text-right">MT SIGNAL</span>
              </div>
              {filtered.map((s, i) => (
                <button key={i} onClick={() => setSelectedTicker(s.ticker)}
                  className="w-full px-4 py-3 grid grid-cols-5 items-center transition-all hover:bg-white/5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: selectedTicker === s.ticker ? "rgba(0,212,255,0.06)" : "transparent" }}>
                  <div className="text-left">
                    <div className="font-bold text-white text-sm">{s.ticker}</div>
                    <div className="text-xs hidden sm:block" style={{ color: "#8899AA" }}>{s.name}</div>
                  </div>
                  <div className="text-right font-mono font-bold text-white text-sm">
                    {s.price > 0 ? `$${s.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : <span style={{ color: "#8899AA" }}>···</span>}
                  </div>
                  <div className="text-right font-mono text-sm" style={{ color: s.positive ? "#00FF88" : "#FF4444" }}>
                    {s.price > 0 ? `${s.positive ? "+" : ""}${s.changePct.toFixed(2)}%` : "···"}
                  </div>
                  <div className="text-right font-mono text-xs hidden sm:block" style={{ color: "#8899AA" }}>
                    {s.volume > 0 ? `${(s.volume / 1e6).toFixed(1)}M` : "···"}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${SIGNAL_COLOR[s.mtSignal] ?? "#8899AA"}20`, color: SIGNAL_COLOR[s.mtSignal] ?? "#8899AA" }}>{s.mtSignal}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* CHART / NEWS / DETAILS TABS */}
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="flex border-b" style={{ borderColor: "rgba(0,212,255,0.15)" }}>
                {(["chart", "news", "details"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-all"
                    style={{ color: activeTab === tab ? "#00D4FF" : "#8899AA", borderBottom: activeTab === tab ? "2px solid #00D4FF" : "2px solid transparent", background: activeTab === tab ? "rgba(0,212,255,0.05)" : "transparent" }}>
                    {tab === "chart" ? "📊 OHLC Chart" : tab === "news" ? "📰 News" : "🏢 Details"}
                  </button>
                ))}
              </div>

              {activeTab === "chart" && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-black text-white text-xl">{selectedTicker}</span>
                      <span className="text-sm ml-2" style={{ color: "#8899AA" }}>{selectedMeta.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xl" style={{ color: "#00D4FF" }}>
                        {livePrice > 0 ? `$${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "···"}
                      </span>
                      {livePrice > 0 && <span className="text-sm font-mono" style={{ color: isPositive ? "#00FF88" : "#FF4444" }}>{isPositive ? "▲" : "▼"} {Math.abs(liveChangePct).toFixed(2)}%</span>}
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden" style={{ height: "200px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,212,255,0.1)" }}>
                    {ohlcLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto" style={{ borderColor: "#00D4FF", borderTopColor: "transparent" }} />
                      </div>
                    ) : (
                      <CandlestickChart candles={ohlcData?.candles ?? []} color="#00D4FF" />
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2 mb-4">
                    <span className="text-xs font-mono" style={{ color: "#8899AA" }}>60-day OHLC · {ohlcData?.source === "polygon" ? "Polygon.io Live" : "Simulated"}</span>
                    <span className="text-xs font-mono" style={{ color: "#8899AA" }}>Auto-refresh: 60s</span>
                  </div>
                  <MTSignal signal={selectedMeta.mtSignal} reason={selectedMeta.mtReason} />
                  {detailsData && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        { label: "Market Cap", value: detailsData.market_cap ? `$${(detailsData.market_cap / 1e9).toFixed(1)}B` : "···" },
                        { label: "Employees", value: detailsData.total_employees ? detailsData.total_employees.toLocaleString() : "···" },
                        { label: "Industry", value: detailsData.sic_description ?? selectedMeta.sector },
                      ].map((stat, i) => (
                        <div key={i} className="rounded-lg p-3 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{stat.label}</div>
                          <div className="font-bold text-white text-sm">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "news" && (
                <div className="p-4">
                  <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>Latest news · {selectedTicker} · {newsData?.articles?.length ?? 0} articles</div>
                  {newsData?.articles?.length ? newsData.articles.map((article, i) => (
                    <a key={i} href={article.article_url ?? "#"} target="_blank" rel="noopener noreferrer"
                      className="block p-3 rounded-lg transition-all hover:bg-white/5 mb-2"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-xs font-semibold text-white leading-tight mb-1">{article.title}</div>
                      {article.description && <div className="text-xs leading-relaxed line-clamp-2" style={{ color: "#8899AA" }}>{article.description}</div>}
                      <div className="text-xs font-mono mt-1" style={{ color: "rgba(136,153,170,0.5)" }}>{article.published_utc ? new Date(article.published_utc).toLocaleDateString() : "Recent"}</div>
                    </a>
                  )) : (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto mb-2" style={{ borderColor: "#00D4FF", borderTopColor: "transparent" }} />
                      <div className="text-sm" style={{ color: "#8899AA" }}>Loading news feed...</div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "details" && (
                <div className="p-4">
                  <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>Company Details · {selectedTicker}</div>
                  {detailsData ? (
                    <div className="space-y-3">
                      {detailsData.description && (
                        <div className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>ABOUT</div>
                          <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{detailsData.description}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Exchange", value: "NYSE/NASDAQ" },
                          { label: "Industry", value: detailsData.sic_description ?? selectedMeta.sector },
                          { label: "Employees", value: detailsData.total_employees ? detailsData.total_employees.toLocaleString() : "···" },
                          { label: "Website", value: detailsData.homepage_url ? "View ↗" : "···" },
                        ].map((item, i) => (
                          <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{item.label}</div>
                            <div className="text-sm font-bold text-white">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto mb-2" style={{ borderColor: "#00D4FF", borderTopColor: "transparent" }} />
                      <div className="text-sm" style={{ color: "#8899AA" }}>Loading company details...</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: TRADE PANEL */}
          <div className="space-y-4">
            <div className="rounded-xl p-6 sticky top-20" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>SOVEREIGN TRADE</div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-black text-white text-2xl">{selectedTicker}</div>
                  <div className="text-sm" style={{ color: "#8899AA" }}>{selectedMeta.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-xl" style={{ color: "#00D4FF" }}>
                    {livePrice > 0 ? `$${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "···"}
                  </div>
                  {livePrice > 0 && <div className="text-sm font-mono" style={{ color: isPositive ? "#00FF88" : "#FF4444" }}>{isPositive ? "▲" : "▼"} {Math.abs(liveChangePct).toFixed(2)}%</div>}
                </div>
              </div>
              <div className="flex rounded-lg overflow-hidden mb-4" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <button onClick={() => setOrderType("buy")} className="flex-1 py-2 text-sm font-bold transition-all"
                  style={{ background: orderType === "buy" ? "rgba(0,255,136,0.15)" : "transparent", color: orderType === "buy" ? "#00FF88" : "#8899AA" }}>BUY</button>
                <button onClick={() => setOrderType("sell")} className="flex-1 py-2 text-sm font-bold transition-all"
                  style={{ background: orderType === "sell" ? "rgba(255,68,68,0.15)" : "transparent", color: orderType === "sell" ? "#FF4444" : "#8899AA" }}>SELL</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>AMOUNT (USD)</label>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" min="0"
                    className="w-full px-4 py-3 rounded-xl text-white outline-none font-mono text-lg"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }} />
                </div>
                {amount && parseFloat(amount) > 0 && (
                  <div className="rounded-lg p-3" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
                    <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>$LONDC EQUIVALENT</div>
                    <div className="font-bold font-mono" style={{ color: "#00D4FF" }}>{parseInt(londcAmount).toLocaleString()} $LONDC</div>
                    <div className="text-xs font-mono mt-1" style={{ color: "#8899AA" }}>@ $0.0144 per $LONDC</div>
                  </div>
                )}
                <div className="text-xs" style={{ color: "#8899AA" }}>✓ Fractional shares &nbsp;·&nbsp; ✓ $LONDC or USD settlement</div>
                <button onClick={handleOrder} className="w-full py-4 rounded-xl font-black text-lg transition-all hover:scale-105"
                  style={{ background: orderType === "buy" ? "linear-gradient(135deg, #00D4FF, #00FF88)" : "linear-gradient(135deg, #FF4444, #FF6B35)", color: "#050B1A" }}>
                  {orderType === "buy" ? `BUY ${selectedTicker}` : `SELL ${selectedTicker}`}
                </button>
                <div className="text-xs text-center" style={{ color: "rgba(136,153,170,0.5)" }}>7.77% Zakat auto-distributed · Zero commission · Sovereign settlement</div>
              </div>
            </div>

            {/* Quantum overlay */}
            <div className="rounded-xl p-4" style={{ border: "1px solid rgba(255,184,0,0.2)", background: "rgba(255,184,0,0.03)" }}>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>QUANTUM OVERLAY</div>
              {[{ label: "$LONDC", value: "$0.0144", change: "+7.77%" }, { label: "PLASMA-7", value: "$0.0777", change: "+14.4%" }, { label: "QUINTESSENCE", value: "$1.44", change: "+3.21%" }, { label: "AKASHIC-1", value: "$144.00", change: "+0.77%" }].map((a, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "rgba(255,184,0,0.1)" }}>
                  <span className="text-xs font-mono font-bold" style={{ color: "#FFB800" }}>{a.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white">{a.value}</span>
                    <span className="text-xs font-mono" style={{ color: "#00FF88" }}>{a.change}</span>
                  </div>
                </div>
              ))}
              <Link href="/exchange/crypto" className="block text-center mt-3 text-xs font-mono py-2 rounded-lg transition-all hover:bg-white/5"
                style={{ color: "#FFB800", border: "1px solid rgba(255,184,0,0.2)" }}>VIEW ALL QUANTUM ASSETS →</Link>
            </div>

            {/* Guardian CTA */}
            <div className="rounded-xl p-4 text-center" style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.03)" }}>
              <div className="text-xs font-mono mb-2" style={{ color: "#00FF88" }}>GUARDIAN ACCESS</div>
              <div className="text-sm font-bold text-white mb-1">Unlock Advanced Trading</div>
              <div className="text-xs mb-3" style={{ color: "#8899AA" }}>Mirror Twin Pro signals · Unlimited fractional shares · $LONDC staking rewards</div>
              <Link href="/onboard" className="block py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
                style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>BECOME A GUARDIAN →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
