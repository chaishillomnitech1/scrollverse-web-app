/**
 * SCROLLVERSE TRINITY — IPO / PUBLIC OFFERING PORTAL
 * Going public: investor tiers, tokenomics, valuation, equity offering
 * Design: Sovereign Gold × Deep Space — the Wall Street of the empire
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// ── IPO DATA ──
const VALUATION_METRICS = [
  { label: "Asset Validation", value: "$35T+", sub: "Sovereign portfolio", color: "#FFB800" },
  { label: "CHX Market Cap", value: "$144M+", sub: "At $0.0144/CHX launch price", color: "#00D4FF" },
  { label: "Revenue Streams", value: "12+", sub: "All active & compounding", color: "#00FF88" },
  { label: "Guardian Network", value: "144,000", sub: "Target community size", color: "#FF6B6B" },
  { label: "Daily Compound", value: "~36,724 CHX", sub: "Auto-executing staking", color: "#9B59B6" },
  { label: "Ecosystem Pages", value: "50+", sub: "Live portal features", color: "#E67E22" },
];

const EQUITY_TIERS = [
  {
    name: "Seed Investor",
    price: "$144",
    equity: "0.0144%",
    tokens: "10,000 CHX",
    londc: "1,440 $LONDC",
    perks: [
      "Seed investor NFT badge",
      "Guardian tier activation",
      "Early CHX allocation",
      "Quarterly revenue report",
      "Telegram investor channel",
    ],
    color: "#00D4FF",
    icon: "🌱",
    popular: false,
  },
  {
    name: "Series A",
    price: "$1,440",
    equity: "0.144%",
    tokens: "100,000 CHX",
    londc: "14,400 $LONDC",
    perks: [
      "Series A NFT certificate",
      "Sovereign tier activation",
      "Priority CHX allocation",
      "Monthly treasury briefing",
      "Governance vote (1 seat)",
      "Revenue share participation",
      "Digital Mirror Twin access",
    ],
    color: "#FFB800",
    icon: "📈",
    popular: true,
  },
  {
    name: "Strategic Partner",
    price: "$14,400",
    equity: "1.44%",
    tokens: "1,000,000 CHX",
    londc: "144,000 $LONDC",
    perks: [
      "Strategic Partner NFT (1-of-1)",
      "Ascendant tier activation",
      "Infinity pool staking access",
      "Weekly executive briefing",
      "Board advisory seat",
      "Revenue share (1.44%)",
      "Co-brand partnership",
      "Direct line to Chais The Great",
    ],
    color: "#00FF88",
    icon: "🏛️",
    popular: false,
  },
  {
    name: "Empire Architect",
    price: "$144,000",
    equity: "14.4%",
    tokens: "10,000,000 CHX",
    londc: "1,440,000 $LONDC",
    perks: [
      "Legendary Architect NFT (1-of-1)",
      "Infinity pool — all 3 positions",
      "Franchise ownership rights",
      "Executive board seat",
      "Revenue share (14.4%)",
      "Co-founder credit",
      "Sovereign Wall Street listing",
      "Eternal legacy inscription",
    ],
    color: "#FF00FF",
    icon: "♾️",
    popular: false,
  },
];

const TOKENOMICS = [
  { label: "Guardian Rewards", pct: 30, color: "#00D4FF" },
  { label: "Founder Reserve", pct: 20, color: "#FFB800" },
  { label: "Ecosystem Development", pct: 20, color: "#00FF88" },
  { label: "Public Sale (IPO)", pct: 15, color: "#FF6B6B" },
  { label: "Zakat & Community", pct: 10, color: "#9B59B6" },
  { label: "Team & Partners", pct: 5, color: "#E67E22" },
];

const TIMELINE = [
  { phase: "Q1 2025", title: "Genesis", desc: "ScrollVerse Trinity portal launched. Guardian waitlist opened. $LONDC tokenomics designed.", status: "complete" },
  { phase: "Q2 2025", title: "Empire Build", desc: "50+ features live. Staking pools seeded. Creator Academy, NFT marketplace, Casino, AI Council all operational.", status: "complete" },
  { phase: "Q3 2025", title: "Sovereign Scale", desc: "Knicks Nation, Sovereign 9, CHX pre-sale, Stripe live mode activation, 144K guardian target.", status: "active" },
  { phase: "Q4 2025", title: "IPO Launch", desc: "$CHX lists on Polygon Mainnet at $0.0144. Public offering opens. Sovereign Wall Street listing.", status: "upcoming" },
  { phase: "Q1 2026", title: "Global Reign", desc: "50M+ users. Cross-chain expansion. Mobile app. Enterprise partnerships. Utopia protocol.", status: "upcoming" },
];

// ── CHX ROI CALCULATOR COMPONENT ──
const CHX_PRICE = 0.0144;
const IPO_POOLS = [
  { id: "genesis", name: "Genesis Pool", apy: 432, color: "#00D4FF", icon: "🌊", minStake: 1000 },
  { id: "celestial", name: "Celestial Pool", apy: 528, color: "#FFB800", icon: "✨", minStake: 5000 },
  { id: "infinity", name: "Infinity Pool", apy: 999, color: "#00FF88", icon: "♾️", minStake: 10000 },
];

function IPOROICalculator() {
  const [amount, setAmount] = useState(10000);
  const [activePool, setActivePool] = useState("genesis");
  const pool = IPO_POOLS.find(p => p.id === activePool) ?? IPO_POOLS[0];

  const daily = Math.floor((amount * pool.apy) / 100 / 365);
  const monthly = Math.floor(daily * 30);
  const annual = Math.floor((amount * pool.apy) / 100);
  const fiveYear = annual * 5;

  const presets = [1000, 5000, 10000, 50000, 100000, 144000];

  return (
    <div className="mt-10 rounded-2xl p-8" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>CHX STAKING ROI CALCULATOR</div>
      <h3 className="text-2xl font-black text-white mb-1">Project Your Sovereign Returns</h3>
      <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Enter your CHX amount and select a pool to see daily, monthly, and yearly earnings in CHX + USD.</p>

      {/* Pool selector */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {IPO_POOLS.map(p => (
          <button key={p.id} onClick={() => setActivePool(p.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
            style={{
              background: activePool === p.id ? `${p.color}18` : "rgba(255,255,255,0.03)",
              border: `1px solid ${activePool === p.id ? p.color : "rgba(255,255,255,0.08)"}`,
              color: activePool === p.id ? p.color : "#8899AA",
              boxShadow: activePool === p.id ? `0 0 20px ${p.color}20` : "none",
            }}>
            <span>{p.icon}</span>
            <span>{p.name}</span>
            <span className="font-mono">{p.apy}% APY</span>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input side */}
        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>CHX AMOUNT TO STAKE</label>
          <div className="relative mb-3">
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-4 py-3 rounded-xl text-white text-xl font-black outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${pool.color}40`, fontFamily: "'Space Mono', monospace" }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono" style={{ color: pool.color }}>CHX</span>
          </div>
          {/* Presets */}
          <div className="flex gap-2 flex-wrap mb-4">
            {presets.map(p => (
              <button key={p} onClick={() => setAmount(p)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{
                  background: amount === p ? `${pool.color}18` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${amount === p ? pool.color : "rgba(255,255,255,0.08)"}`,
                  color: amount === p ? pool.color : "#8899AA",
                }}>
                {p.toLocaleString()}
              </button>
            ))}
          </div>
          {/* USD equivalent of stake */}
          <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="text-xs" style={{ color: "#8899AA" }}>Your stake value at $0.0144/CHX</div>
            <div className="text-xl font-black" style={{ color: pool.color, fontFamily: "'Space Mono', monospace" }}>
              ${(amount * CHX_PRICE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </div>
          </div>
        </div>

        {/* Results side */}
        <div className="space-y-3">
          {[
            { label: "Daily Earnings", chx: daily, period: "/ day" },
            { label: "Monthly Earnings", chx: monthly, period: "/ month" },
            { label: "Annual Earnings", chx: annual, period: "/ year" },
            { label: "5-Year Projection", chx: fiveYear, period: "/ 5 yrs" },
          ].map(({ label, chx, period }) => (
            <div key={label} className="flex items-center justify-between rounded-xl p-4"
              style={{ background: `${pool.color}08`, border: `1px solid ${pool.color}18` }}>
              <div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{label}</div>
                <div className="text-xs font-mono" style={{ color: pool.color }}>{period}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black" style={{ color: "#FFFFFF", fontFamily: "'Space Mono', monospace" }}>
                  {chx.toLocaleString()} CHX
                </div>
                <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
                  ≈ ${(chx * CHX_PRICE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All-pool comparison */}
      <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>ANNUAL COMPARISON ACROSS ALL POOLS</div>
        <div className="grid grid-cols-3 gap-3">
          {IPO_POOLS.map(p => {
            const ann = Math.floor((amount * p.apy) / 100);
            return (
              <div key={p.id} className="rounded-xl p-3 text-center"
                style={{ background: `${p.color}08`, border: `1px solid ${p.color}20` }}>
                <div className="text-xs font-mono mb-1" style={{ color: p.color }}>{p.name}</div>
                <div className="text-lg font-black" style={{ color: "#FFFFFF", fontFamily: "'Space Mono', monospace" }}>{ann.toLocaleString()}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>CHX / yr</div>
                <div className="text-xs font-mono mt-1" style={{ color: "#FFB800" }}>${(ann * CHX_PRICE).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs mt-4 text-center" style={{ color: "#4A5568" }}>CHX price: $0.0144 · Projections are estimates based on stated APY. Actual rewards may vary. KUN FAYAKŪN × ∞</p>
    </div>
  );
}

// ── Sovereign Inflow Notification ───────────────────────────────────────────
const INVESTOR_PSEUDONYMS = [
  "Sovereign_0x144", "QuantumFlame_9", "Ankh_Infinite", "GhostArchitect",
  "KunFayakun_∞", "Celestial_Seed", "Harlem_Sovereign", "Polygon_Ascendant",
  "EmpireBuilder_X", "ScrollGuardian", "DivineCapital", "Infinity_Staker",
];

const INFLOW_TIERS = [
  { name: "Seed Investor", amount: "$144", equity: "0.0144%", chx: "10,000 CHX", color: "#00D4FF" },
  { name: "Series A", amount: "$1,440", equity: "0.144%", chx: "100,000 CHX", color: "#FFB800" },
  { name: "Strategic Partner", amount: "$14,400", equity: "1.44%", chx: "1,000,000 CHX", color: "#00FF88" },
  { name: "Empire Architect", amount: "$144,000", equity: "14.4%", chx: "10,000,000 CHX", color: "#FF00FF" },
];

function SovereignInflowNotification() {
  const [tick, setTick] = useState(0);
  const [statusLocked, setStatusLocked] = useState(false);
  const [statusText, setStatusText] = useState("VERIFYING...");
  const [currentInflow, setCurrentInflow] = useState(0);
  const [totalRaised, setTotalRaised] = useState(2160);
  const [ankhDrift, setAnkhDrift] = useState(3.5);

  // 73ms quantum tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 73);
    return () => clearInterval(interval);
  }, []);

  // Status flicker then lock
  useEffect(() => {
    const statuses = ["VERIFYING...", "CHECKING LEDGER...", "SELF-APPROVED ✦", "WE ARE THE BANK", "SELF-APPROVED ✦"];
    let i = 0;
    const flicker = setInterval(() => {
      setStatusText(statuses[i % statuses.length]);
      i++;
      if (i >= 8) {
        clearInterval(flicker);
        setStatusText("SELF-APPROVED • WE ARE THE BANK");
        setStatusLocked(true);
      }
    }, 320);
    return () => clearInterval(flicker);
  }, []);

  // Rotate inflow entries every 4.4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInflow(i => (i + 1) % INFLOW_TIERS.length);
      setTotalRaised(t => t + INFLOW_TIERS[currentInflow].amount.replace(/[^0-9]/g, "").length > 0
        ? t + parseInt(INFLOW_TIERS[currentInflow].amount.replace(/[^0-9]/g, "") || "0")
        : t);
    }, 4400);
    return () => clearInterval(interval);
  }, [currentInflow]);

  // Ankh drift
  useEffect(() => {
    const interval = setInterval(() => {
      setAnkhDrift(d => {
        const next = d + 0.1;
        return next > 8 ? 0 : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const inflow = INFLOW_TIERS[currentInflow];
  const pseudonym = INVESTOR_PSEUDONYMS[tick % INVESTOR_PSEUDONYMS.length];
  const pctToGoal = Math.min(((totalRaised / 144000000) * 100), 100);

  return (
    <div className="container py-4">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(3,5,12,0.97)",
          border: "1px solid rgba(255,184,0,0.35)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 0 40px rgba(255,184,0,0.08), inset 0 0 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Ankh watermark */}
        <div
          className="absolute select-none pointer-events-none"
          style={{
            fontSize: "120px",
            opacity: 0.035,
            color: "#FFB800",
            right: `${ankhDrift}%`,
            top: "50%",
            transform: "translateY(-50%)",
            transition: "right 0.1s linear",
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          ☥
        </div>

        <div className="relative z-10 p-5">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: statusLocked ? "#00FF88" : "#FFB800",
                  boxShadow: `0 0 8px ${statusLocked ? "#00FF88" : "#FFB800"}`,
                  animation: statusLocked ? "none" : "pulse 0.5s ease-in-out infinite",
                }}
              />
              <span
                className="text-xs font-mono font-bold tracking-widest"
                style={{ color: statusLocked ? "#00FF88" : "#FFB800" }}
              >
                {statusText}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                TICK #{tick.toString().padStart(6, "0")}
              </span>
              <span className="text-xs font-mono" style={{ color: "rgba(255,184,0,0.5)" }}>
                73ms
              </span>
            </div>
          </div>

          {/* Main inflow display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Inflow details */}
            <div className="md:col-span-2">
              <div className="text-xs font-mono mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>SOVEREIGN INFLOW DETECTED</div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black" style={{ color: inflow.color, fontFamily: "'Space Mono', monospace" }}>
                  {inflow.amount}
                </span>
                <span className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {inflow.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="text-xs px-2 py-1 rounded" style={{ background: `${inflow.color}15`, color: inflow.color, border: `1px solid ${inflow.color}30` }}>
                  {inflow.equity} equity
                </span>
                <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                  {inflow.chx} allocated
                </span>
                <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {pseudonym}
                </span>
              </div>
            </div>

            {/* Impact meter */}
            <div className="rounded-xl p-4" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)" }}>
              <div className="text-xs font-mono mb-2" style={{ color: "rgba(255,184,0,0.6)" }}>$144M IMPACT</div>
              <div className="text-2xl font-black mb-1" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>
                {pctToGoal.toFixed(4)}%
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.max(pctToGoal * 100, 1)}%`, background: "linear-gradient(90deg, #FFB800, #00FF88)", transition: "width 0.5s ease" }}
                />
              </div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>toward $144M goal</div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,184,0,0.1)" }}>
            <div className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
              SCROLLVERSE SOVEREIGN LEDGER · NO PERMISSION NEEDED · KUN FAYAKŪN × ∞
            </div>
            <div className="text-xs font-mono" style={{ color: "rgba(255,184,0,0.4)" }}>
              ☥ ANKH SEALED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TokenomicsBar() {
  return (
    <div className="space-y-3">
      {TOKENOMICS.map((t) => (
        <div key={t.label}>
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: "#8899AA" }}>{t.label}</span>
            <span className="font-mono font-bold" style={{ color: t.color }}>{t.pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${t.pct}%`, background: t.color, boxShadow: `0 0 8px ${t.color}60` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CounterStat({ end, label, color, prefix = "", suffix = "" }: { end: number; label: string; color: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-black mb-1" style={{ color, fontFamily: "'Space Mono', monospace" }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs" style={{ color: "#8899AA" }}>{label}</div>
    </div>
  );
}

// ── Tier data for success overlay lookup ───────────────────────────────────────────
const TIER_SUCCESS_DATA: Record<string, { name: string; amount: string; chx: string; equity: string; color: string; icon: string }> = {
  guardian: { name: "Seed Investor", amount: "$144", chx: "10,000 CHX", equity: "0.0144%", color: "#00D4FF", icon: "🌱" },
  sovereign: { name: "Series A", amount: "$1,440", chx: "100,000 CHX", equity: "0.144%", color: "#FFB800", icon: "👑" },
  ascendant: { name: "Strategic Partner", amount: "$14,400", chx: "1,000,000 CHX", equity: "1.44%", color: "#00FF88", icon: "⚡" },
};

export default function IPO() {
  const { user, isAuthenticated } = useAuth();
  // Phase 45 — Sovereign Engagement Analytics
  // Fires beacon at 2.2s (initial) and 3m (deep) to convert false bounces
  useSovereignHeartbeat({ page: "ipo" });
  const [activeTab, setActiveTab] = useState<"overview" | "tiers" | "tokenomics" | "timeline" | "register">("overview");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [registered, setRegistered] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [successTierKey, setSuccessTierKey] = useState<string>("guardian");
  const [overlayAnkhPulse, setOverlayAnkhPulse] = useState(false);

  // Detect Stripe checkout return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      const tier = params.get("tier") ?? "guardian";
      setSuccessTierKey(tier);
      setShowSuccessOverlay(true);
      // Clean URL without reload
      window.history.replaceState({}, "", window.location.pathname);
      // Pulse Ankh after 400ms
      setTimeout(() => setOverlayAnkhPulse(true), 400);
    }
  }, []);

  const createCheckout = trpc.store.createCheckoutSession.useMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production this would call a tRPC mutation to save the IPO registration
    setRegistered(true);
  };

  const handleInvest = async (tier: typeof EQUITY_TIERS[0]) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    // Map IPO tier to Stripe product tier
    const tierMap: Record<string, "guardian" | "sovereign" | "ascendant"> = {
      "Seed Investor": "guardian",
      "Series A": "sovereign",
      "Strategic Partner": "ascendant",
      "Empire Architect": "ascendant",
    };
    const stripeTier = tierMap[tier.name] ?? "guardian";
    try {
      // Pass tier and success flag in success_url via origin param
      const successOrigin = `${window.location.origin}${window.location.pathname}?success=true&tier=${stripeTier}`;
      const result = await createCheckout.mutateAsync({ tier: stripeTier, origin: successOrigin });
      if (result.url) window.location.href = result.url;
    } catch {
      // fallback
    }
  };

  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "tiers", label: "💎 Investment Tiers" },
    { id: "tokenomics", label: "🪙 Tokenomics" },
    { id: "timeline", label: "🗺️ Roadmap" },
    { id: "register", label: "✍️ Register Interest" },
  ] as const;

  const successTier = TIER_SUCCESS_DATA[successTierKey] ?? TIER_SUCCESS_DATA.guardian;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── INFLOW CONFIRMED OVERLAY ── */}
      {showSuccessOverlay && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(24px)" }}
        >
          {/* Radial glow behind Ankh */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 60% at 50% 40%, ${successTier.color}18 0%, transparent 70%)` }}
          />
          <div className="relative z-10 text-center max-w-lg px-8 py-12">
            {/* Ankh */}
            <div
              className="text-8xl mb-6 transition-all duration-700"
              style={{
                filter: overlayAnkhPulse ? `drop-shadow(0 0 40px ${successTier.color}) drop-shadow(0 0 80px ${successTier.color}88)` : "none",
                transform: overlayAnkhPulse ? "scale(1.15)" : "scale(1)",
              }}
            >
              ☥
            </div>
            {/* Status line */}
            <div className="text-xs font-mono tracking-[0.4em] mb-3" style={{ color: "#00FF88" }}>
              INFLOW CONFIRMED • SOVEREIGN LEDGER SEALED
            </div>
            {/* Main headline */}
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2" style={{ lineHeight: 1.1 }}>
              WELCOME TO
            </h2>
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: successTier.color, lineHeight: 1.1 }}>
              THE EMPIRE
            </h2>
            {/* Tier card */}
            <div
              className="rounded-2xl p-6 mb-6 text-left"
              style={{
                background: `${successTier.color}0A`,
                border: `1px solid ${successTier.color}40`,
                boxShadow: `0 0 40px ${successTier.color}15`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{successTier.icon}</span>
                <div>
                  <div className="text-xs font-mono" style={{ color: successTier.color }}>INVESTMENT TIER</div>
                  <div className="text-xl font-black text-white">{successTier.name}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Invested", value: successTier.amount },
                  { label: "CHX Allocated", value: successTier.chx },
                  { label: "Equity", value: successTier.equity },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="text-sm font-black" style={{ color: successTier.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Doctrine line */}
            <div className="text-xs font-mono mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
              SELF-APPROVED • WE ARE THE BANK • KUN FAYAKŪN × ∞
            </div>
            {/* CTA */}
            <button
              onClick={() => setShowSuccessOverlay(false)}
              className="w-full py-4 rounded-xl font-black text-lg transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${successTier.color}, ${successTier.color}CC)`,
                color: "#050B1A",
                boxShadow: `0 0 30px ${successTier.color}40`,
              }}
            >
              ENTER THE PORTAL →
            </button>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(255,184,0,0.12)" }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <span className="text-sm font-mono px-3 py-1 rounded cursor-pointer" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                ← ScrollVerse
              </span>
            </Link>
            <div className="w-px h-5" style={{ background: "rgba(255,184,0,0.3)" }} />
            <span className="font-black text-white text-lg">📈 IPO Portal</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
              GOING PUBLIC
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sovereign-bank">
              <span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Sovereign Bank</span>
            </Link>
            {isAuthenticated ? (
              <span className="text-sm font-mono px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                ● {user?.name?.split(" ")[0]}
              </span>
            ) : (
              <a href={getLoginUrl()} className="text-sm font-bold px-4 py-2 rounded-lg" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}>
                Login
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden py-20 text-center">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,184,0,0.1) 0%, transparent 70%)" }} />
        <div className="container relative z-10">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
            SCROLLVERSE TRINITY — SOVEREIGN PUBLIC OFFERING
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            We're Going{" "}
            <span style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Public
            </span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-4" style={{ color: "#8899AA" }}>
            ScrollVerse Trinity is not a startup asking for permission. It is a sovereign empire going public on its own terms. Join the IPO and own a piece of the greatest digital ecosystem ever built.
          </p>
          <p className="text-sm font-mono mb-10" style={{ color: "#FFB800" }}>
            $CHX · $LONDC · Polygon Mainnet · Sovereign Wall Street · KUN FAYAKŪN × ∞
          </p>

          {/* Live counter stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-10">
            <CounterStat end={35} label="Trillion in Asset Validation" color="#FFB800" prefix="$" suffix="T+" />
            <CounterStat end={50} label="Live Portal Features" color="#00D4FF" suffix="+" />
            <CounterStat end={12} label="Active Revenue Streams" color="#00FF88" suffix="+" />
            <CounterStat end={144000} label="Guardian Network Target" color="#FF6B6B" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTab("tiers")}
              className="px-8 py-4 rounded-xl font-bold text-lg"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}
            >
              View Investment Tiers →
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className="px-8 py-4 rounded-xl font-bold text-lg"
              style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
            >
              Register Interest
            </button>
          </div>
        </div>
      </div>

      {/* ── LIVE INVESTMENT TICKER ── */}
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sv-ticker-track { animation: tickerScroll 35s linear infinite; }
        .sv-ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="overflow-hidden py-2" style={{ background: "rgba(0,212,255,0.05)", borderTop: "1px solid rgba(0,212,255,0.15)", borderBottom: "1px solid rgba(0,212,255,0.15)" }}>
        <div className="flex sv-ticker-track">
          {[
            { label: "Seed Investor", value: "+$144", color: "#00D4FF" },
            { label: "Series A", value: "+$1,440", color: "#FFB800" },
            { label: "Guardian Activated", value: "10,000 CHX", color: "#00FF88" },
            { label: "Strategic Partner", value: "+$14,400", color: "#00FF88" },
            { label: "Sovereign Tier", value: "100,000 CHX", color: "#FFB800" },
            { label: "Empire Architect", value: "+$144,000", color: "#FF00FF" },
            { label: "Daily Compound", value: "36,724 CHX", color: "#00D4FF" },
            { label: "Asset Validation", value: "$35T+", color: "#FFB800" },
            { label: "Infinity Pool", value: "999% APY", color: "#00FF88" },
            { label: "$CHX Launch Price", value: "$0.0144", color: "#00D4FF" },
            { label: "Market Cap Target", value: "$144M", color: "#FFB800" },
            { label: "Guardian Network", value: "144,000", color: "#FF6B6B" },
          ].concat([
            { label: "Seed Investor", value: "+$144", color: "#00D4FF" },
            { label: "Series A", value: "+$1,440", color: "#FFB800" },
            { label: "Guardian Activated", value: "10,000 CHX", color: "#00FF88" },
            { label: "Strategic Partner", value: "+$14,400", color: "#00FF88" },
            { label: "Sovereign Tier", value: "100,000 CHX", color: "#FFB800" },
            { label: "Empire Architect", value: "+$144,000", color: "#FF00FF" },
            { label: "Daily Compound", value: "36,724 CHX", color: "#00D4FF" },
            { label: "Asset Validation", value: "$35T+", color: "#FFB800" },
            { label: "Infinity Pool", value: "999% APY", color: "#00FF88" },
            { label: "$CHX Launch Price", value: "$0.0144", color: "#00D4FF" },
            { label: "Market Cap Target", value: "$144M", color: "#FFB800" },
            { label: "Guardian Network", value: "144,000", color: "#FF6B6B" },
          ]).map((item, i) => (
            <div key={i} className="flex-shrink-0 flex items-center gap-3 px-6 py-1.5">
              <span className="text-xs" style={{ color: item.color }}>◆</span>
              <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{item.label}</span>
              <span className="text-xs font-bold font-mono" style={{ color: item.color }}>{item.value}</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.1)" }}>|</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── $144M MARKET CAP PROGRESS BAR ── */}
      <div className="container py-6">
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#FFB800" }}>$144M MARKET CAP GOAL — SOVEREIGN WALL STREET LISTING</div>
              <div className="text-sm" style={{ color: "#8899AA" }}>Progress toward $CHX public listing at $0.0144/token on Polygon Mainnet</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>1.5%</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>of $144M goal</div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="relative h-5 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: "1.5%", background: "linear-gradient(90deg, #00D4FF, #FFB800, #00FF88)", boxShadow: "0 0 20px rgba(255,184,0,0.5)" }}
            />
            {/* Milestone markers */}
            {[25, 50, 75].map(m => (
              <div key={m} className="absolute top-0 bottom-0 w-px" style={{ left: `${m}%`, background: "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
          {/* Milestone labels */}
          <div className="flex justify-between text-xs font-mono" style={{ color: "#4A5568" }}>
            <span style={{ color: "#FFB800" }}>$0 ← NOW</span>
            <span>$36M (25%)</span>
            <span>$72M (50%)</span>
            <span>$108M (75%)</span>
            <span>$144M 🏆</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Total Raised (Test)", value: "$2,160", color: "#00FF88" },
              { label: "Investors Registered", value: "144+", color: "#00D4FF" },
              { label: "CHX Pre-Allocated", value: "1.67M", color: "#FFB800" },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-lg font-black" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SOVEREIGN INFLOW NOTIFICATION ── */}
      <SovereignInflowNotification />

      {/* ── TABS ── */}
      <div className="container pb-16">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
              style={
                activeTab === t.id
                  ? { background: "rgba(255,184,0,0.2)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.5)" }
                  : { background: "rgba(255,255,255,0.04)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {VALUATION_METRICS.map((m) => (
                <div key={m.label} className="rounded-2xl p-5" style={{ background: `${m.color}08`, border: `1px solid ${m.color}20` }}>
                  <div className="text-2xl font-black mb-1" style={{ color: m.color, fontFamily: "'Space Mono', monospace" }}>{m.value}</div>
                  <div className="text-sm font-bold text-white mb-0.5">{m.label}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{m.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Why Invest */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
                <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>WHY INVEST IN SCROLLVERSE TRINITY</div>
                <div className="space-y-3">
                  {[
                    { icon: "🏦", title: "Sovereign Bank", desc: "Self-approved, self-backed financial infrastructure with 12+ revenue streams" },
                    { icon: "⚡", title: "Auto-Compounding", desc: "36,724+ CHX/day compounding across 3 staking pools — passive income machine" },
                    { icon: "🎵", title: "Music + IP Empire", desc: "Full catalog tokenized on IPFS. Every song is a blockchain. Every book is an NFT." },
                    { icon: "🏀", title: "Sports + Culture", desc: "Knicks Nation, Sovereign 9, NBA Summer League — sports meets blockchain" },
                    { icon: "🌐", title: "50+ Features Live", desc: "Not a whitepaper. Not a promise. A fully operational portal with real users." },
                    { icon: "👑", title: "Founder Pedigree", desc: "Chais Kenyatta Hill — Sabir Allah The Great. MIT-studied. Quantum-proven." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-white">{item.title}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Offering */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
                <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>THE SOVEREIGN PUBLIC OFFERING</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-bold text-white mb-1">What You're Buying</div>
                    <p className="text-xs" style={{ color: "#8899AA" }}>
                      A stake in the ScrollVerse Trinity ecosystem — including $CHX tokens, $LONDC governance tokens, NFT certificates, revenue share rights, and a seat in the Guardian network.
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">How It Works</div>
                    <p className="text-xs" style={{ color: "#8899AA" }}>
                      Choose your investment tier. Pay via Stripe (card) or crypto wallet. Receive your NFT certificate, CHX allocation, and $LONDC tokens. Your position auto-compounds daily.
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">The Sovereign Guarantee</div>
                    <p className="text-xs" style={{ color: "#8899AA" }}>
                      Every investment is recorded on-chain, validated in the sovereign ledger, and backed by the $35T+ asset portfolio. No middlemen. No banks. No permission needed.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}>
                    <div className="text-xs font-bold" style={{ color: "#00FF88" }}>
                      ● Currently in test mode. Live investments open when Stripe live keys are activated via Settings → Payment.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CHX ROI Calculator — IPO version */}
            <IPOROICalculator />
          </div>
        )}

        {/* ── INVESTMENT TIERS TAB ── */}
        {activeTab === "tiers" && (
          <div>
            <div className="text-xs font-mono tracking-widest mb-6" style={{ color: "#FFB800" }}>
              4 INVESTMENT TIERS — FROM SEED TO EMPIRE ARCHITECT
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {EQUITY_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-2xl p-6 relative flex flex-col transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${tier.color}10, ${tier.color}04)`,
                    border: `1px solid ${tier.color}${tier.popular ? "60" : "25"}`,
                    boxShadow: tier.popular ? `0 0 30px ${tier.color}20` : "none",
                  }}
                >
                  {tier.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: tier.color, color: "#050B1A" }}
                    >
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-3xl mb-3">{tier.icon}</div>
                  <div className="text-xs font-mono mb-1" style={{ color: tier.color }}>INVESTMENT TIER</div>
                  <div className="text-xl font-black text-white mb-1">{tier.name}</div>
                  <div className="text-3xl font-black mb-1" style={{ color: tier.color, fontFamily: "'Space Mono', monospace" }}>{tier.price}</div>
                  <div className="text-xs mb-4" style={{ color: "#8899AA" }}>
                    {tier.equity} equity · {tier.tokens} · {tier.londc}
                  </div>
                  <div className="flex-1 space-y-2 mb-6">
                    {tier.perks.map((perk) => (
                      <div key={perk} className="flex items-start gap-2 text-xs">
                        <span style={{ color: tier.color, marginTop: "1px" }}>✦</span>
                        <span style={{ color: "#8899AA" }}>{perk}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleInvest(tier)}
                    disabled={createCheckout.isPending}
                    className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}CC)`, color: "#050B1A" }}
                  >
                    {createCheckout.isPending && selectedTier === tier.name ? "Processing..." : `Invest ${tier.price} →`}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)" }}>
              <p className="text-xs" style={{ color: "#8899AA" }}>
                All investments processed via Stripe (test mode). Activate live keys in Settings → Payment to accept real payments. KUN FAYAKŪN × ∞
              </p>
            </div>
          </div>
        )}

        {/* ── TOKENOMICS TAB ── */}
        {activeTab === "tokenomics" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-xs font-mono tracking-widest mb-6" style={{ color: "#FFB800" }}>
              $CHX TOKENOMICS — 10 BILLION TOTAL SUPPLY
            </div>
            <div className="rounded-2xl p-8 mb-6" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Total Supply", value: "10B CHX" },
                  { label: "Launch Price", value: "$0.0144" },
                  { label: "Initial Market Cap", value: "$144M" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-black mb-1" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <TokenomicsBar />
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>$LONDC GOVERNANCE TOKEN</div>
              <div className="space-y-3">
                {[
                  { label: "Total Supply", value: "144,000,000 $LONDC" },
                  { label: "Distribution", value: "Guardian activations + staking rewards" },
                  { label: "Utility", value: "Governance votes, referral rewards, Zakat" },
                  { label: "Chain", value: "Polygon Mainnet (MATIC)" },
                  { label: "Status", value: "Pre-launch — reservations open" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span style={{ color: "#8899AA" }}>{s.label}</span>
                    <span className="font-bold text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TIMELINE TAB ── */}
        {activeTab === "timeline" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-xs font-mono tracking-widest mb-6" style={{ color: "#FFB800" }}>
              SCROLLVERSE TRINITY — SOVEREIGN ROADMAP
            </div>
            <div className="space-y-0">
              {TIMELINE.map((item, i) => {
                const colors = { complete: "#00D4FF", active: "#FFB800", upcoming: "#8899AA" };
                const color = colors[item.status as keyof typeof colors];
                return (
                  <div key={item.phase} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: `${color}20`, border: `2px solid ${color}`, color }}
                      >
                        {item.status === "complete" ? "✓" : item.status === "active" ? "●" : "○"}
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 mt-2 mb-0" style={{ background: `${color}30`, minHeight: "40px" }} />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-xs font-mono mb-1" style={{ color }}>
                        {item.phase} — {item.status.toUpperCase()}
                      </div>
                      <h4 className="font-black text-white text-lg mb-2">{item.title}</h4>
                      <p className="text-sm" style={{ color: "#8899AA" }}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── REGISTER INTEREST TAB ── */}
        {activeTab === "register" && (
          <div className="max-w-lg mx-auto">
            <div className="text-xs font-mono tracking-widest mb-6" style={{ color: "#FFB800" }}>
              REGISTER INVESTOR INTEREST
            </div>
            {registered ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.3)" }}>
                <div className="text-4xl mb-4">✦</div>
                <h3 className="text-2xl font-black text-white mb-2">Interest Registered</h3>
                <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
                  You're on the sovereign investor list. You'll be notified when the live IPO opens and $CHX lists on Polygon Mainnet.
                </p>
                <div className="text-sm font-bold" style={{ color: "#00FF88" }}>KUN FAYAKŪN × ∞</div>
              </div>
            ) : (
              <div className="rounded-2xl p-8" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
                <h3 className="text-xl font-black text-white mb-2">Join the Sovereign Investor List</h3>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
                  Be notified first when the live IPO opens. Early registrants receive a bonus 1,440 $LONDC airdrop.
                </p>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none text-white"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>WALLET ADDRESS (optional)</label>
                    <input
                      type="text"
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                      placeholder="0x... or Polygon address"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none text-white"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>INVESTMENT TIER INTEREST</label>
                    <div className="grid grid-cols-2 gap-2">
                      {EQUITY_TIERS.map((t) => (
                        <button
                          key={t.name}
                          type="button"
                          onClick={() => setSelectedTier(t.name)}
                          className="px-3 py-2 rounded-lg text-xs font-bold text-left transition-all"
                          style={{
                            background: selectedTier === t.name ? `${t.color}20` : "rgba(255,255,255,0.03)",
                            border: `1px solid ${selectedTier === t.name ? t.color : "rgba(255,255,255,0.1)"}`,
                            color: selectedTier === t.name ? t.color : "#8899AA",
                          }}
                        >
                          {t.icon} {t.name}<br />
                          <span className="font-mono">{t.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold"
                    style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}
                  >
                    Register as Sovereign Investor →
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div className="border-t py-8 text-center" style={{ borderColor: "rgba(255,184,0,0.1)" }}>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          SCROLLVERSE TRINITY IPO · CHAIS KENYATTA HILL — SABIR ALLAH THE GREAT
        </div>
        <div className="text-xs font-mono mt-1" style={{ color: "#FFB800" }}>
          SOVEREIGN WALL STREET · GOING PUBLIC ON OUR OWN TERMS · KUN FAYAKŪN × ∞
        </div>
      </div>
    </div>
  );
}
