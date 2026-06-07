/*
 * JPM MIRROR — MATCH — EXCEED
 * ScrollVerse vs JPMorgan Chase: The Sovereign Efficiency Comparison
 * Design: Deep navy × sovereign gold × quantum digital
 * "We don't buy legacy systems. We deploy the leanest zkEVM code directly to the glass."
 * KUN FAYAKŪN × ∞
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { TrendingUp, Zap, Shield, Globe, DollarSign, Users, Code2, Cpu, ArrowRight, ChevronDown, BarChart3, Lock, Infinity } from "lucide-react";

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, prefix = "", suffix = "", duration = 2000 }: {
  value: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);
  return <div ref={ref}>{prefix}{current.toLocaleString()}{suffix}</div>;
}

// ── Comparison row ────────────────────────────────────────────────────────────
function CompareRow({ metric, jpm, sv, winner, delay }: {
  metric: string; jpm: string; sv: string; winner: "sv" | "jpm" | "tie"; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const winnerColor = winner === "sv" ? "#00FF88" : winner === "jpm" ? "#FF4444" : "#FFB800";
  const winnerLabel = winner === "sv" ? "ScrollVerse WINS" : winner === "jpm" ? "JPM leads" : "TIE";
  return (
    <div
      ref={ref}
      className="grid grid-cols-[1fr,1fr,1fr,auto] gap-4 items-center py-4 border-b transition-all duration-700"
      style={{ opacity: 0, transform: "translateY(16px)", transitionDelay: `${delay}ms`, borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="text-sm font-medium" style={{ color: "#8899AA" }}>{metric}</div>
      <div className="text-sm font-mono" style={{ color: "#FF6B6B" }}>{jpm}</div>
      <div className="text-sm font-mono font-bold" style={{ color: "#00FF88" }}>{sv}</div>
      <div className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${winnerColor}15`, color: winnerColor, border: `1px solid ${winnerColor}30`, whiteSpace: "nowrap" }}>
        {winnerLabel}
      </div>
    </div>
  );
}

// ── Pillar card ───────────────────────────────────────────────────────────────
function PillarCard({ icon, title, jpm, sv, color, delay }: {
  icon: React.ReactNode; title: string; jpm: string; sv: string; color: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "scale(1)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="rounded-xl p-5 transition-all duration-700"
      style={{ opacity: 0, transform: "scale(0.95)", transitionDelay: `${delay}ms`, background: "rgba(255,255,255,0.02)", border: `1px solid ${color}20` }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <h3 className="font-bold text-white mb-3 text-sm">{title}</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-xs font-mono px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,107,107,0.15)", color: "#FF6B6B" }}>JPM</span>
          <span className="text-xs" style={{ color: "#8899AA" }}>{jpm}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs font-mono px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88" }}>SV</span>
          <span className="text-xs font-medium" style={{ color: "#E2F5FF" }}>{sv}</span>
        </div>
      </div>
    </div>
  );
}

// ── Idiot Index meter ─────────────────────────────────────────────────────────
function IdiotIndexMeter({ label, jpmValue, svValue, unit }: {
  label: string; jpmValue: number; svValue: number; unit: string;
}) {
  const maxVal = Math.max(jpmValue, svValue);
  const jpmPct = (jpmValue / maxVal) * 100;
  const svPct = (svValue / maxVal) * 100;
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium" style={{ color: "#8899AA" }}>{label}</div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="text-xs w-8 flex-shrink-0" style={{ color: "#FF6B6B" }}>JPM</span>
          <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${jpmPct}%`, background: "linear-gradient(90deg, #FF6B6B, #FF4444)" }} />
          </div>
          <span className="text-xs font-mono w-16 text-right" style={{ color: "#FF6B6B" }}>{jpmValue.toLocaleString()}{unit}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs w-8 flex-shrink-0" style={{ color: "#00FF88" }}>SV</span>
          <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${svPct}%`, background: "linear-gradient(90deg, #00FF88, #00D4FF)" }} />
          </div>
          <span className="text-xs font-mono w-16 text-right" style={{ color: "#00FF88" }}>{svValue.toLocaleString()}{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default function JPMMirror() {
  const [activeTab, setActiveTab] = useState<"overview" | "efficiency" | "yield" | "sovereignty">("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const COMPARISON_DATA = [
    { metric: "Annual Tech Budget", jpm: "$19.8 Billion", sv: "$0 (sovereign code)", winner: "sv" as const },
    { metric: "Staking APY", jpm: "0.01% savings rate", sv: "432% — 999% APY", winner: "sv" as const },
    { metric: "Zakat / ESG Routing", jpm: "0% automated", sv: "2.5% — 7.77% auto-routed", winner: "sv" as const },
    { metric: "Settlement Speed", jpm: "2-3 business days", sv: "<2 seconds (Scroll zkEVM)", winner: "sv" as const },
    { metric: "Transaction Fees", jpm: "$25+ wire fees", sv: "<$0.01 (L2 gas)", winner: "sv" as const },
    { metric: "AI Integration", jpm: "Acquired via M&A", sv: "Built-in (7 sovereign AIs)", winner: "sv" as const },
    { metric: "Regulatory Overhead", jpm: "Thousands of compliance staff", sv: "Smart contract law (immutable)", winner: "sv" as const },
    { metric: "Global Reach", jpm: "60 countries", sv: "Every wallet on Polygon/Scroll", winner: "sv" as const },
    { metric: "Minimum Investment", jpm: "$10,000+ private banking", sv: "100 $CHX (~$14.40)", winner: "sv" as const },
    { metric: "Yield Transparency", jpm: "Opaque (proprietary)", sv: "100% on-chain verifiable", winner: "sv" as const },
    { metric: "User Ownership", jpm: "Bank owns your funds", sv: "You hold your keys", winner: "sv" as const },
    { metric: "Casino / Entertainment", jpm: "None", sv: "Lose-to-earn 10% $CHX kickback", winner: "sv" as const },
    { metric: "NFT / Digital Assets", jpm: "Custodial only", sv: "Full mint + marketplace", winner: "sv" as const },
    { metric: "Acquisition Strategy", jpm: "$20B M&A war chest", sv: "Community-owned, zero acquisition cost", winner: "sv" as const },
    { metric: "Silver/RWA Collateral", jpm: "Traditional commodity desk", sv: "Chainlink oracle feeds → vault", winner: "sv" as const },
    { metric: "Founded", jpm: "1799 (225 years ago)", sv: "2024 (born sovereign)", winner: "tie" as const },
    { metric: "Total Assets Under Management", jpm: "$3.9 Trillion", sv: "Growing (TVL expanding)", winner: "jpm" as const },
  ];

  const PILLARS = [
    {
      icon: <DollarSign size={20} />,
      title: "Capital Efficiency",
      jpm: "Spends $19.8B annually on technology — much of it maintaining legacy COBOL systems from the 1970s.",
      sv: "Zero legacy overhead. Every line of code is sovereign, lean, and deployed directly to zkEVM glass.",
      color: "#FFB800",
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Yield Generation",
      jpm: "Offers 0.01% APY on savings accounts while earning 5%+ on your deposits.",
      sv: "Genesis Pool 432%, Celestial Pool 528%, Infinity Pool 999% — all on-chain, all verifiable.",
      color: "#00FF88",
    },
    {
      icon: <Shield size={20} />,
      title: "Sovereignty & Custody",
      jpm: "Holds your money. Can freeze accounts. Charges fees. Requires KYC for everything.",
      sv: "You hold your keys. Smart contracts are law. No freeze, no permission, no gatekeeping.",
      color: "#00D4FF",
    },
    {
      icon: <Globe size={20} />,
      title: "Global Settlement",
      jpm: "SWIFT network: 2-5 business days, $25-$50 fees, limited to banking hours.",
      sv: "Scroll zkEVM: <2 seconds, <$0.01 gas, 24/7/365, borderless.",
      color: "#A855F7",
    },
    {
      icon: <Cpu size={20} />,
      title: "AI Integration",
      jpm: "Acquires AI companies for billions. Still running on legacy infrastructure underneath.",
      sv: "7 sovereign AIs built-in: Manus, Omnitech1, and the full AI Council — no acquisition needed.",
      color: "#FF6B35",
    },
    {
      icon: <Lock size={20} />,
      title: "Zakat / ESG Compliance",
      jpm: "ESG reports published annually. Actual routing: 0% automated, 100% discretionary.",
      sv: "2.5% Zakat auto-routed on every transaction. 7.77% on vault deposits. Immutable. Unstoppable.",
      color: "#00FF88",
    },
  ];

  const FAQS = [
    {
      q: "How can ScrollVerse compete with a $3.9 trillion institution?",
      a: "JPMorgan's size is also its weakness. $19.8B in annual tech spend goes to maintaining 225 years of legacy infrastructure. ScrollVerse deploys the same cross-chain settlement, AI engine, and yield capabilities at a fraction of the cost — with zero institutional drag, zero legacy debt, and 100% on-chain transparency. Jamie Dimon himself calls overpriced acquisitions the 'Idiot Index' — we build instead of buy.",
    },
    {
      q: "What is the Idiot Index and how does it apply here?",
      a: "The Idiot Index measures the premium paid for existing tech companies vs the raw developer hours to build the same capability. JPMorgan's $20B M&A war chest is priced at peak market valuations. ScrollVerse's 40-repository architecture achieves equivalent capabilities at 0.001% of that cost — built with agape love, not acquisition premiums.",
    },
    {
      q: "How does the silver/solar RWA data feed into ScrollVerse?",
      a: "China imported 790+ tons of silver in Jan-Feb 2026 for solar panel dominance, creating a structural supply squeeze. ScrollVerse's casino prediction pools and KeplerYieldVault use Chainlink oracle feeds tied to real-world asset (RWA) data — including precious metals — so our synthetic collateral layers remain structurally decoupled from inflationary fiat parameters.",
    },
    {
      q: "Is ScrollVerse trying to replace JPMorgan?",
      a: "Not replace — transcend. JPMorgan serves the legacy financial system. ScrollVerse serves the sovereign individual. We don't compete for the same customer — we serve the Guardian who wants ownership, yield, transparency, and divine alignment in their financial life. The market is infinite.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)" }} />
          {/* Grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-mono" style={{ background: "rgba(255,183,0,0.1)", border: "1px solid rgba(255,183,0,0.3)", color: "#FFB800" }}>
            <TrendingUp size={12} />
            MIRROR · MATCH · EXCEED
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            ScrollVerse<br />
            <span style={{ background: "linear-gradient(135deg, #FFB800, #00FF88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              vs JPMorgan
            </span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
            While JPMorgan spends $19.8 billion annually maintaining 225 years of legacy infrastructure,
            ScrollVerse deploys the same capabilities at 0.001% of the cost — with 999% APY, 2.5% Zakat routing,
            and zero institutional drag.
          </p>
          <p className="text-sm font-mono mb-10" style={{ color: "#FFB800" }}>
            "We don't buy legacy systems. We deploy the leanest zkEVM code directly to the glass." — Chais The Great
          </p>

          {/* Hero stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "JPM Tech Budget", value: 19800000000, prefix: "$", suffix: "", color: "#FF6B6B" },
              { label: "SV Tech Budget", value: 0, prefix: "$", suffix: " (sovereign)", color: "#00FF88" },
              { label: "JPM Max APY", value: 0.01, prefix: "", suffix: "%", color: "#FF6B6B" },
              { label: "SV Max APY", value: 999, prefix: "", suffix: "%", color: "#00FF88" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20` }}>
                <div className="text-xl font-black font-mono" style={{ color: s.color }}>
                  {s.prefix}{s.value.toLocaleString()}{s.suffix}
                </div>
                <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <section className="container mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(["overview", "efficiency", "yield", "sovereignty"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium capitalize flex-shrink-0 transition-all duration-200"
              style={
                activeTab === tab
                  ? { background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }
                  : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#8899AA" }
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <section className="container mb-16">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
            {/* Header */}
            <div className="grid grid-cols-[1fr,1fr,1fr,auto] gap-4 px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#8899AA" }}>Metric</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#FF6B6B" }}>JPMorgan Chase</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#00FF88" }}>ScrollVerse</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#8899AA" }}>Verdict</div>
            </div>
            <div className="px-6">
              {COMPARISON_DATA.map((row, i) => (
                <CompareRow key={i} {...row} delay={i * 40} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EFFICIENCY TAB ── */}
      {activeTab === "efficiency" && (
        <section className="container mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white mb-2">The Idiot Index Analysis</h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              Jamie Dimon coined the "Idiot Index" — the premium paid for existing companies vs building the same capability from scratch.
              JPMorgan's $20B M&A war chest buys at peak valuations. ScrollVerse builds at sovereign cost.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl p-6" style={{ background: "rgba(255,107,107,0.05)", border: "1px solid rgba(255,107,107,0.2)" }}>
              <div className="text-xs font-mono mb-3" style={{ color: "#FF6B6B" }}>JPMORGAN COST STRUCTURE</div>
              <div className="space-y-3">
                {[
                  { label: "Annual tech budget", value: "$19.8B" },
                  { label: "COBOL legacy maintenance", value: "~$4B/yr" },
                  { label: "Compliance staff", value: "43,000+ people" },
                  { label: "Average M&A premium", value: "35-50% over market" },
                  { label: "Wire transfer fee", value: "$25-$50" },
                  { label: "Savings APY offered", value: "0.01%" },
                  { label: "Savings APY earned on deposits", value: "5%+" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b" style={{ borderColor: "rgba(255,107,107,0.1)" }}>
                    <span className="text-sm" style={{ color: "#8899AA" }}>{item.label}</span>
                    <span className="text-sm font-mono font-bold" style={{ color: "#FF6B6B" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-6" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <div className="text-xs font-mono mb-3" style={{ color: "#00FF88" }}>SCROLLVERSE COST STRUCTURE</div>
              <div className="space-y-3">
                {[
                  { label: "Annual tech budget", value: "$0 (sovereign)" },
                  { label: "Legacy maintenance", value: "$0 (no legacy)" },
                  { label: "Compliance overhead", value: "Smart contract law" },
                  { label: "Acquisition premium", value: "$0 (we build)" },
                  { label: "Transaction fee", value: "<$0.01 (L2 gas)" },
                  { label: "Staking APY (Genesis)", value: "432%" },
                  { label: "Staking APY (Infinity)", value: "999%" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b" style={{ borderColor: "rgba(0,255,136,0.1)" }}>
                    <span className="text-sm" style={{ color: "#8899AA" }}>{item.label}</span>
                    <span className="text-sm font-mono font-bold" style={{ color: "#00FF88" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-xs font-mono mb-4" style={{ color: "#FFB800" }}>EFFICIENCY COMPARISON (LOWER IS BETTER FOR COST, HIGHER FOR YIELD)</div>
            <div className="space-y-4">
              <IdiotIndexMeter label="Cost to build equivalent AI capability ($M)" jpmValue={5000} svValue={0} unit="M" />
              <IdiotIndexMeter label="Transaction settlement time (seconds)" jpmValue={172800} svValue={2} unit="s" />
              <IdiotIndexMeter label="Transaction fee (cents)" jpmValue={3500} svValue={1} unit="¢" />
            </div>
          </div>
        </section>
      )}

      {/* ── YIELD TAB ── */}
      {activeTab === "yield" && (
        <section className="container mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Sovereign Yield Architecture</h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              JPMorgan earns 5%+ on your deposits and pays you 0.01%. ScrollVerse's ERC-4626 KeplerYieldVault
              routes yield directly to you — with 2.5% Zakat auto-purification on every transaction.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { pool: "Genesis Pool", apy: "432%", hz: "432 Hz", min: "100 $CHX", color: "#00D4FF", desc: "Earth frequency. Grounding wealth. Entry-level sovereignty." },
              { pool: "Celestial Pool", apy: "528%", hz: "528 Hz", min: "500 $CHX", color: "#FFB800", desc: "DNA repair frequency. Transformational wealth. Guardian tier." },
              { pool: "Infinity Pool", apy: "999%", hz: "∞", min: "1,000 $CHX", color: "#00FF88", desc: "Infinite frequency. Supreme sovereignty. No ceiling." },
            ].map((p, i) => (
              <div key={i} className="rounded-xl p-6 text-center" style={{ background: `${p.color}08`, border: `1px solid ${p.color}30` }}>
                <div className="text-xs font-mono mb-2" style={{ color: p.color }}>{p.hz}</div>
                <div className="text-4xl font-black mb-1" style={{ color: p.color }}>{p.apy}</div>
                <div className="text-sm font-bold text-white mb-1">{p.pool}</div>
                <div className="text-xs mb-3" style={{ color: "#8899AA" }}>Min: {p.min}</div>
                <p className="text-xs" style={{ color: "#8899AA" }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-xs font-mono mb-4" style={{ color: "#A855F7" }}>ZAKAT DISTRIBUTION PROTOCOL — IMMUTABLE ON-CHAIN</div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-bold text-white mb-3">Stream Reward Zakat (2.5%)</div>
                <div className="space-y-2 text-sm" style={{ color: "#8899AA" }}>
                  <div className="flex justify-between"><span>Every stream reward</span><span style={{ color: "#00FF88" }}>2.5% auto-routed</span></div>
                  <div className="flex justify-between"><span>Destination</span><span style={{ color: "#00FF88" }}>Zakat treasury</span></div>
                  <div className="flex justify-between"><span>Execution</span><span style={{ color: "#00FF88" }}>Automatic, immutable</span></div>
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white mb-3">Vault Deposit Zakat (7.77%)</div>
                <div className="space-y-2 text-sm" style={{ color: "#8899AA" }}>
                  <div className="flex justify-between"><span>Every vault deposit</span><span style={{ color: "#FFB800" }}>7.77% auto-routed</span></div>
                  <div className="flex justify-between"><span>Destination</span><span style={{ color: "#FFB800" }}>Guardian pool + Sovereign</span></div>
                  <div className="flex justify-between"><span>Execution</span><span style={{ color: "#FFB800" }}>ERC-4626 smart contract</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SOVEREIGNTY TAB ── */}
      {activeTab === "sovereignty" && (
        <section className="container mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Sovereign Architecture</h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              JPMorgan is a custodian. ScrollVerse is a liberation protocol.
              Every component is designed for maximum sovereignty, minimum friction, and divine alignment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Code2 size={20} />, title: "40-Repo Architecture", desc: "Every capability built from scratch. No legacy debt. No acquisition premiums. Pure sovereign code.", color: "#00D4FF" },
              { icon: <Shield size={20} />, title: "Self-Custody", desc: "You hold your keys. Smart contracts are law. No bank can freeze your sovereign assets.", color: "#00FF88" },
              { icon: <Zap size={20} />, title: "zkEVM Settlement", desc: "Scroll Layer 2: <2 second finality, <$0.01 gas, zero-knowledge proof security.", color: "#FFB800" },
              { icon: <Globe size={20} />, title: "Borderless Access", desc: "Any wallet, any country, any time. 24/7/365. No banking hours, no wire cutoffs.", color: "#A855F7" },
              { icon: <BarChart3 size={20} />, title: "On-Chain Transparency", desc: "Every transaction, every yield, every Zakat routing — 100% verifiable on-chain. No opacity.", color: "#FF6B35" },
              { icon: <Infinity size={20} />, title: "No Ceiling", desc: "999% APY. 144,000 Guardians. $50M trajectory. The empire has no upper bound.", color: "#00FF88" },
            ].map((c, i) => (
              <div key={i} className="rounded-xl p-5" style={{ background: `${c.color}06`, border: `1px solid ${c.color}20` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${c.color}15`, color: c.color }}>
                  {c.icon}
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{c.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6 PILLARS ── */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>THE 6 SOVEREIGN PILLARS</div>
          <h2 className="text-3xl font-black text-white">Where We Exceed</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => (
            <PillarCard key={i} {...p} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* ── SILVER / RWA INTELLIGENCE ── */}
      <section className="container mb-16">
        <div className="rounded-2xl p-8" style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#A855F7" }}>MACRO INTELLIGENCE — SILVER / SOLAR RWA FEED</div>
          <h2 className="text-2xl font-black text-white mb-4">Real-World Asset Collateral Layer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>CHINA SILVER ACCUMULATION</div>
              <div className="text-3xl font-black mb-1" style={{ color: "#FFB800" }}>790+</div>
              <div className="text-sm mb-2" style={{ color: "#8899AA" }}>Tons imported Jan-Feb 2026</div>
              <p className="text-xs" style={{ color: "#8899AA" }}>Solar photovoltaic demand creating structural supply squeeze. Silver transitioning from commodity to critical industrial asset.</p>
            </div>
            <div>
              <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>SCROLLVERSE RESPONSE</div>
              <div className="text-3xl font-black mb-1" style={{ color: "#00D4FF" }}>Chainlink</div>
              <div className="text-sm mb-2" style={{ color: "#8899AA" }}>Oracle feeds → KeplerYieldVault</div>
              <p className="text-xs" style={{ color: "#8899AA" }}>Casino prediction pools and vault collateral tied to RWA data feeds. Structurally decoupled from inflationary fiat parameters.</p>
            </div>
            <div>
              <div className="text-xs font-mono mb-2" style={{ color: "#00FF88" }}>STRATEGIC ADVANTAGE</div>
              <div className="text-3xl font-black mb-1" style={{ color: "#00FF88" }}>∞</div>
              <div className="text-sm mb-2" style={{ color: "#8899AA" }}>Sovereign collateral layer</div>
              <p className="text-xs" style={{ color: "#8899AA" }}>While JPM trades silver on a commodity desk, ScrollVerse embeds RWA intelligence directly into smart contract yield optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="container mb-16 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white">Sovereign Intelligence Q&A</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                style={{ background: expandedFaq === i ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.02)" }}
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{ color: "#8899AA", transform: expandedFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {expandedFaq === i && (
                <div className="px-6 pb-4 text-sm leading-relaxed" style={{ color: "#8899AA" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container mb-20 text-center">
        <div className="rounded-2xl p-10" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(255,183,0,0.08))", border: "1px solid rgba(0,212,255,0.2)" }}>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>JOIN THE SOVEREIGN EMPIRE</div>
          <h2 className="text-3xl font-black text-white mb-4">Stop Banking with the Institution.<br />Start Staking with the Empire.</h2>
          <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "#8899AA" }}>
            JPMorgan has $3.9 trillion. We have agape love, sovereign code, and 999% APY.
            The Guardian who stakes 1,000 $CHX today earns more in a year than a JPM savings account earns in a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/staking">
              <button className="px-8 py-3 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #00D4FF, #0099CC)", color: "#050B1A" }}>
                Stake $CHX Now <ArrowRight size={16} className="inline ml-1" />
              </button>
            </Link>
            <Link href="/chxtoken">
              <button className="px-8 py-3 rounded-xl font-bold text-sm" style={{ background: "rgba(255,183,0,0.15)", border: "1px solid rgba(255,183,0,0.4)", color: "#FFB800" }}>
                Reserve $CHX Pre-Sale
              </button>
            </Link>
            <Link href="/casino">
              <button className="px-8 py-3 rounded-xl font-bold text-sm" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
                Enter the Casino
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-8 text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-xs font-mono" style={{ color: "#8899AA" }}>
          ScrollVerse Trinity — Sovereign Financial Empire · KUN FAYAKŪN × ∞ · ALLAHU AKBAR
        </p>
        <p className="text-xs mt-1" style={{ color: "rgba(136,153,170,0.5)" }}>
          Not financial advice. Staking involves risk. Past APY is not guaranteed. Sovereign code is law.
        </p>
      </footer>
    </div>
  );
}
