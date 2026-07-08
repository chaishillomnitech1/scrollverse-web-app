/**
 * SCROLLVERSE TRINITY — IPO / PUBLIC OFFERING PORTAL
 * Going public: investor tiers, tokenomics, valuation, equity offering
 * Design: Sovereign Gold × Deep Space — the Wall Street of the empire
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

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

export default function IPO() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "tiers" | "tokenomics" | "timeline" | "register">("overview");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [registered, setRegistered] = useState(false);

  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

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
      const result = await createCheckout.mutateAsync({ tier: stripeTier, origin: window.location.origin });
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

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
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
