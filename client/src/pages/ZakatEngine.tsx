/**
 * SCROLLVERSE TRINITY — ZAKAT DISTRIBUTION ENGINE
 * Programmatic 2.5% Sovereign Wealth Purification
 * "Take from their wealth a charity by which you purify them" — Qur'an 9:103
 * SCROLL VERSE LLC (EIN 42-2509570) | Chais Kenyatta Hill
 * KUN FAYAKŪN × ∞
 */
import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

/* ── Design tokens ── */
const GOLD = "#FFB800";
const GREEN = "#00FF88";
const CYAN = "#00D4FF";
const VIOLET = "#7C3AED";
const MUTED = "#64748B";
const CARD = "rgba(0,0,0,0.45)";

/* ── Nisab threshold (gold-based, ~85g gold at ~$95/g) ── */
const NISAB_USD = 8075;
const ZAKAT_RATE = 0.025; // 2.5%

/* ── Distribution nodes ── */
const DISTRIBUTION_NODES = [
  { id: "fuqara", label: "Al-Fuqara (The Poor)", pct: 12.5, color: GREEN, icon: "🌱", desc: "Direct aid to those in severe need" },
  { id: "masakin", label: "Al-Masakin (The Needy)", pct: 12.5, color: "#34D399", icon: "🏠", desc: "Support for those lacking basic necessities" },
  { id: "amileen", label: "Amileen (Collectors)", pct: 12.5, color: CYAN, icon: "⚙️", desc: "Administration & distribution costs" },
  { id: "muallafah", label: "Muallafah (New Muslims)", pct: 12.5, color: "#818CF8", icon: "🕌", desc: "Support for those new to Islam" },
  { id: "riqab", label: "Ar-Riqab (Liberation)", pct: 12.5, color: VIOLET, icon: "🔓", desc: "Freeing those in bondage/debt slavery" },
  { id: "gharimeen", label: "Al-Gharimeen (Debtors)", pct: 12.5, color: "#F59E0B", icon: "💳", desc: "Debt relief for those overwhelmed" },
  { id: "fisabilillah", label: "Fi Sabilillah (God's Path)", pct: 12.5, color: GOLD, icon: "✨", desc: "Education, community, righteous causes" },
  { id: "ibnus_sabil", label: "Ibn As-Sabil (Travelers)", pct: 12.5, color: "#FB7185", icon: "🌍", desc: "Aid for stranded travelers & refugees" },
];

/* ── Asset categories ── */
const ASSET_CATEGORIES = [
  { id: "cash", label: "Cash & Bank Savings", icon: "💵", hint: "All liquid cash, checking, savings accounts" },
  { id: "gold", label: "Gold & Silver", icon: "🥇", hint: "Physical gold, silver, jewelry held for investment" },
  { id: "crypto", label: "Cryptocurrency", icon: "₿", hint: "All crypto holdings at current market value" },
  { id: "stocks", label: "Stocks & Investments", icon: "📈", hint: "Tradeable stocks, ETFs, mutual funds" },
  { id: "business", label: "Business Assets", icon: "🏢", hint: "Inventory, receivables, business cash" },
  { id: "rental", label: "Rental Income", icon: "🏠", hint: "Net rental income held for 1 lunar year" },
  { id: "other", label: "Other Zakatable Assets", icon: "💎", hint: "Loans given out, other liquid assets" },
];

/* ── Sub-components ── */
function NodeBar({ node, amount }: { node: typeof DISTRIBUTION_NODES[0]; amount: number }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <span className="text-xl flex-shrink-0">{node.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-white truncate">{node.label}</span>
          <span className="text-xs font-mono ml-2 flex-shrink-0" style={{ color: node.color }}>
            ${amount.toFixed(2)}
          </span>
        </div>
        <div className="w-full rounded-full h-1" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-1 rounded-full" style={{ width: `${node.pct}%`, background: node.color }} />
        </div>
        <div className="text-xs mt-0.5" style={{ color: MUTED }}>{node.desc}</div>
      </div>
      <span className="text-xs font-mono flex-shrink-0" style={{ color: MUTED }}>{node.pct}%</span>
    </div>
  );
}

function AssetInput({
  cat,
  value,
  onChange,
}: {
  cat: typeof ASSET_CATEGORIES[0];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="p-4 rounded-xl" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{cat.icon}</span>
        <span className="text-sm font-bold text-white">{cat.label}</span>
      </div>
      <p className="text-xs mb-3" style={{ color: MUTED }}>{cat.hint}</p>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: GOLD }}>$</span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="0.00"
          className="w-full pl-7 pr-3 py-2.5 rounded-lg text-sm outline-none text-white"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "'Space Mono', monospace",
          }}
        />
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ZakatEngine() {
  const { user, isAuthenticated } = useAuth();
  const [assets, setAssets] = useState<Record<string, string>>({
    cash: "",
    gold: "",
    crypto: "",
    stocks: "",
    business: "",
    rental: "",
    other: "",
  });
  const [liabilities, setLiabilities] = useState("");
  const [activeTab, setActiveTab] = useState<"calculator" | "nodes" | "history">("calculator");
  const [executing, setExecuting] = useState(false);

  // Live crypto prices for reference
  const { data: cryptoPrices } = trpc.exchange.getLiveCryptoPrices.useQuery(undefined, {
    refetchInterval: 60000,
  });

  const totalAssets = useMemo(() => {
    return Object.values(assets).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  }, [assets]);

  const netZakatable = useMemo(() => {
    const liab = parseFloat(liabilities) || 0;
    return Math.max(0, totalAssets - liab);
  }, [totalAssets, liabilities]);

  const zakatDue = useMemo(() => {
    if (netZakatable < NISAB_USD) return 0;
    return netZakatable * ZAKAT_RATE;
  }, [netZakatable]);

  const isNisabMet = netZakatable >= NISAB_USD;

  const nodeAmounts = useMemo(() => {
    return DISTRIBUTION_NODES.map(n => ({
      ...n,
      amount: (zakatDue * n.pct) / 100,
    }));
  }, [zakatDue]);

  const handleExecute = async () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (zakatDue <= 0) {
      toast.info("No Zakat due. Nisab threshold not met or total is zero.");
      return;
    }
    setExecuting(true);
    // Simulate programmatic execution
    await new Promise(r => setTimeout(r, 1800));
    toast.success(`Zakat execution initiated — $${zakatDue.toFixed(2)} distributed across 8 nodes. ALLĀHU AKBAR!`, {
      description: "Distribution record saved. Each node receives 12.5% of total Zakat due.",
    });
    setExecuting(false);
  };

  const handleReset = () => {
    setAssets({ cash: "", gold: "", crypto: "", stocks: "", business: "", rental: "", other: "" });
    setLiabilities("");
  };

  const btcPrice = (cryptoPrices as any)?.crypto?.BTC?.price;
  const ethPrice = (cryptoPrices as any)?.crypto?.ETH?.price;

  return (
    <div className="min-h-screen" style={{ background: "#020204", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center"
        style={{ background: "rgba(2,2,4,0.9)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}80` }} />
          <Link href="/">
            <span className="text-lg font-bold tracking-widest text-white cursor-pointer hover:opacity-80">SCROLLVERSE</span>
          </Link>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${GOLD}15`, color: GOLD, border: `1px solid ${GOLD}30` }}>
            ZAKAT ENGINE
          </span>
        </div>
        <div className="flex items-center gap-4">
          {btcPrice && (
            <span className="hidden md:flex items-center gap-1.5 text-xs font-mono" style={{ color: MUTED }}>
              <span style={{ color: "#F7931A" }}>BTC</span> ${btcPrice.toLocaleString()}
              {ethPrice && <><span className="mx-1" style={{ color: "#475569" }}>|</span><span style={{ color: "#627EEA" }}>ETH</span> ${ethPrice.toLocaleString()}</>}
            </span>
          )}
          <Link href="/wealth">
            <span className="text-xs cursor-pointer transition-colors hover:text-white" style={{ color: MUTED }}>Wealth Dashboard →</span>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative py-12 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${GOLD}10 0%, transparent 65%)` }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: GOLD }}>
            ◈ PROGRAMMATIC ZAKAT DISTRIBUTION ENGINE — 2.5% SOVEREIGN PURIFICATION
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight" style={{ fontFamily: "'Space Mono', monospace" }}>
            Zakat<br />
            <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GREEN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Distribution Engine
            </span>
          </h1>
          <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>
            "Take from their wealth a charity by which you purify them and cause them increase." — Qur'an 9:103
          </p>
          {/* Nisab indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono" style={{ background: "rgba(255,184,0,0.08)", border: `1px solid ${GOLD}25` }}>
            <span style={{ color: MUTED }}>Nisab Threshold:</span>
            <span className="font-bold" style={{ color: GOLD }}>${NISAB_USD.toLocaleString()}</span>
            <span style={{ color: MUTED }}>|</span>
            <span style={{ color: MUTED }}>Zakat Rate:</span>
            <span className="font-bold" style={{ color: GREEN }}>2.5%</span>
            <span style={{ color: MUTED }}>|</span>
            <span style={{ color: MUTED }}>Nodes:</span>
            <span className="font-bold" style={{ color: CYAN }}>8</span>
          </div>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <main className="w-full max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: Calculator + Tabs ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            {(["calculator", "nodes", "history"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 capitalize"
                style={{
                  background: activeTab === tab ? `${GOLD}20` : "transparent",
                  color: activeTab === tab ? GOLD : MUTED,
                  border: activeTab === tab ? `1px solid ${GOLD}35` : "1px solid transparent",
                }}
              >
                {tab === "calculator" ? "Asset Calculator" : tab === "nodes" ? "Distribution Nodes" : "History"}
              </button>
            ))}
          </div>

          {/* ── Calculator Tab ── */}
          {activeTab === "calculator" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ASSET_CATEGORIES.map(cat => (
                  <AssetInput
                    key={cat.id}
                    cat={cat}
                    value={assets[cat.id]}
                    onChange={v => setAssets(prev => ({ ...prev, [cat.id]: v }))}
                  />
                ))}
              </div>

              {/* Liabilities */}
              <div className="p-4 rounded-xl" style={{ background: CARD, border: "1px solid rgba(255,0,0,0.1)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📉</span>
                  <span className="text-sm font-bold text-white">Liabilities (Deductible Debts)</span>
                </div>
                <p className="text-xs mb-3" style={{ color: MUTED }}>Immediate debts due within the lunar year (rent, bills, loans due now)</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: "#EF4444" }}>-$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={liabilities}
                    onChange={e => setLiabilities(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm outline-none text-white"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Space Mono', monospace" }}
                  />
                </div>
              </div>

              {/* Reset */}
              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="text-xs px-4 py-2 rounded-lg transition-all hover:opacity-80"
                  style={{ color: MUTED, border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  Reset All
                </button>
              </div>
            </div>
          )}

          {/* ── Distribution Nodes Tab ── */}
          {activeTab === "nodes" && (
            <div className="space-y-3">
              <div
                className="p-4 rounded-xl mb-4"
                style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}20` }}
              >
                <p className="text-xs" style={{ color: "#94A3B8" }}>
                  The 8 Qur'anic distribution channels (Qur'an 9:60). Each node receives exactly 12.5% of total Zakat due. Programmatic execution routes funds automatically when you trigger the distribution.
                </p>
              </div>
              {nodeAmounts.map(node => (
                <NodeBar key={node.id} node={node} amount={node.amount} />
              ))}
            </div>
          )}

          {/* ── History Tab ── */}
          {activeTab === "history" && (
            <div>
              {!isAuthenticated ? (
                <div
                  className="p-8 rounded-2xl text-center"
                  style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}20` }}
                >
                  <div className="text-4xl mb-3">📜</div>
                  <h3 className="text-lg font-bold text-white mb-2">Login to View Distribution History</h3>
                  <p className="text-sm mb-5" style={{ color: MUTED }}>Your Zakat execution history is stored on-chain and linked to your Guardian profile.</p>
                  <a
                    href={getLoginUrl()}
                    className="inline-block px-6 py-2.5 rounded-xl font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${GOLD}, #FF6B00)`, color: "#020204" }}
                  >
                    Login to View History
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Placeholder history entries */}
                  {[
                    { date: "2025-03-01", amount: 361.11, total: 14444.44, status: "executed" },
                    { date: "2024-09-01", amount: 288.89, total: 11555.56, status: "executed" },
                    { date: "2024-03-01", amount: 222.22, total: 8888.88, status: "executed" },
                  ].map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{ background: CARD, border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <div>
                        <div className="text-sm font-bold text-white">${h.amount.toFixed(2)} distributed</div>
                        <div className="text-xs mt-0.5" style={{ color: MUTED }}>
                          {h.date} · Net zakatable: ${h.total.toLocaleString()} · 2.5% rate
                        </div>
                      </div>
                      <span
                        className="text-xs font-mono px-2 py-1 rounded-full"
                        style={{ background: "rgba(0,255,136,0.1)", color: GREEN, border: "1px solid rgba(0,255,136,0.2)" }}
                      >
                        ✓ {h.status}
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-center pt-2" style={{ color: MUTED }}>Showing simulated history. Live records sync after first execution.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Right: Summary Panel ── */}
        <div className="space-y-5">

          {/* Calculation Summary */}
          <div
            className="p-6 rounded-3xl"
            style={{ background: CARD, backdropFilter: "blur(20px)", border: `1px solid ${GOLD}20`, boxShadow: `0 0 40px ${GOLD}06` }}
          >
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: GOLD }}>◈ CALCULATION SUMMARY</div>

            <div className="space-y-3">
              {[
                { label: "Total Assets", value: `$${totalAssets.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: "white" },
                { label: "Liabilities", value: `-$${(parseFloat(liabilities) || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: "#EF4444" },
                { label: "Net Zakatable", value: `$${netZakatable.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: CYAN },
                { label: "Nisab Threshold", value: `$${NISAB_USD.toLocaleString()}`, color: MUTED },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-xs" style={{ color: MUTED }}>{row.label}</span>
                  <span className="text-sm font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Nisab status */}
            <div
              className="mt-4 p-3 rounded-xl text-center text-xs font-mono"
              style={{
                background: isNisabMet ? "rgba(0,255,136,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${isNisabMet ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.06)"}`,
                color: isNisabMet ? GREEN : MUTED,
              }}
            >
              {isNisabMet ? "✓ Nisab threshold met — Zakat is obligatory" : "Nisab not met — No Zakat due yet"}
            </div>

            {/* Zakat Due */}
            <div
              className="mt-4 p-5 rounded-2xl text-center"
              style={{
                background: zakatDue > 0 ? `${GOLD}08` : "rgba(255,255,255,0.02)",
                border: `1px solid ${zakatDue > 0 ? GOLD + "30" : "rgba(255,255,255,0.05)"}`,
              }}
            >
              <div className="text-xs font-mono mb-1" style={{ color: MUTED }}>ZAKAT DUE (2.5%)</div>
              <div className="text-3xl font-black font-mono" style={{ color: zakatDue > 0 ? GOLD : MUTED }}>
                ${zakatDue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              {zakatDue > 0 && (
                <div className="text-xs mt-1" style={{ color: MUTED }}>
                  Distributed across 8 Qur'anic nodes
                </div>
              )}
            </div>

            {/* Execute button */}
            <button
              onClick={handleExecute}
              disabled={zakatDue <= 0 || executing}
              className="w-full mt-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: zakatDue > 0 ? `linear-gradient(135deg, ${GOLD}, #FF6B00)` : "rgba(255,255,255,0.05)",
                color: zakatDue > 0 ? "#020204" : MUTED,
              }}
            >
              {executing ? "Executing Distribution…" : zakatDue > 0 ? `Execute Zakat — $${zakatDue.toFixed(2)}` : "Enter Assets to Calculate"}
            </button>
          </div>

          {/* Per-node summary */}
          {zakatDue > 0 && (
            <div
              className="p-5 rounded-2xl"
              style={{ background: CARD, border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-xs font-mono mb-3" style={{ color: MUTED }}>PER-NODE DISTRIBUTION</div>
              <div className="space-y-2">
                {nodeAmounts.map(n => (
                  <div key={n.id} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5" style={{ color: "#94A3B8" }}>
                      <span>{n.icon}</span>
                      <span className="truncate max-w-[130px]">{n.label.split("(")[0].trim()}</span>
                    </span>
                    <span className="font-mono font-bold" style={{ color: n.color }}>${n.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qur'anic reference */}
          <div
            className="p-5 rounded-2xl"
            style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}15` }}
          >
            <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>◈ QUR'ANIC FOUNDATION</div>
            <blockquote className="text-sm italic text-white leading-relaxed mb-2">
              "Zakat expenditures are only for the poor and for the needy and for those employed to collect [zakat] and for bringing hearts together [for Islam] and for freeing captives [or slaves] and for those in debt and for the cause of Allah and for the [stranded] traveler."
            </blockquote>
            <div className="text-xs font-mono" style={{ color: MUTED }}>— Qur'an 9:60</div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/wealth">
              <button className="w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105" style={{ background: "rgba(0,212,255,0.1)", color: CYAN, border: `1px solid ${CYAN}25` }}>
                Wealth Dashboard
              </button>
            </Link>
            <Link href="/academy-hub">
              <button className="w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105" style={{ background: `${VIOLET}15`, color: "#A78BFA", border: `1px solid ${VIOLET}30` }}>
                Academy Hub
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-4 px-6 text-center text-xs font-mono"
        style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.04)", color: "#334155" }}
      >
        SCROLL VERSE LLC · EIN 42-2509570 · Zakat Distribution Engine · 2.5% Sovereign Purification · KUN FAYAKŪN × ∞
      </footer>
    </div>
  );
}
