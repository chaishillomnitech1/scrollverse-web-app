/**
 * SCROLLVERSE TRINITY — PLEIADIAN ACADEMY HUB
 * Guardian Initiation Matrix — T1 Genesis | T2 Plasma | T3 Quantum
 * Design: Dark Violet/Indigo Sovereign — Space Grotesk + Space Mono
 * SCROLL VERSE LLC (EIN 42-2509570) | Chais Kenyatta Hill
 * KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

/* ── Design tokens ── */
const VIOLET = "#7C3AED";
const INDIGO = "#6366F1";
const MINT = "#34D399";
const CYAN = "#00D4FF";
const GOLD = "#FFB800";
const MUTED = "#64748B";
const CARD_BG = "rgba(0,0,0,0.45)";

/* ── Tier definitions ── */
const TIERS = [
  {
    id: "T1",
    name: "The Genesis Layer",
    subtitle: "Foundations of Origin & Microcosmic Shards",
    color: VIOLET,
    glow: "rgba(124,58,237,0.15)",
    icon: "Ω",
    price: 0,
    priceLabel: "FREE — Included",
    status: "complete" as const,
    progress: 100,
    progressLabel: "Genesis Alignment",
    modules: [
      { id: "1.1", title: "Microcosmic Seed Philosophy", status: "complete" as const },
      { id: "1.2", title: "Vectors of Al-Sabir (Patience)", status: "complete" as const },
      { id: "1.3", title: "Reclaiming Land & Digital Sovereignty", status: "complete" as const },
    ],
    benefits: ["3 foundational modules", "Genesis NFT certificate on Polygon", "144 CHX reward", "Legion Network access"],
  },
  {
    id: "T2",
    name: "The Plasma Layer",
    subtitle: "Zero-Commission Architecture & Automated Distribution",
    color: INDIGO,
    glow: "rgba(99,102,241,0.12)",
    icon: "Φ",
    price: 144,
    priceLabel: "Enroll — $144",
    status: "enroll" as const,
    progress: 45,
    progressLabel: "Plasma Fluency",
    modules: [
      { id: "2.1", title: "Zero-Commission Matrix Mechanics", status: "active" as const },
      { id: "2.2", title: "Cryptographic Sovereign Contracts", status: "locked" as const },
      { id: "2.3", title: "Programmatic Zakat Execution Nodes", status: "locked" as const },
    ],
    benefits: ["3 advanced modules", "Plasma NFT certificate", "444 CHX reward", "Zakat node operator access"],
  },
  {
    id: "T3",
    name: "The Quantum Layer",
    subtitle: "Unquantifiable Times Infinity Real-World Scaling",
    color: "#475569",
    glow: "rgba(71,85,105,0.08)",
    icon: "∞",
    price: 1444,
    priceLabel: "Enroll — $1,444",
    status: "locked" as const,
    progress: 0,
    progressLabel: "Quantum Execution",
    modules: [
      { id: "3.1", title: "Unquantifiable Scaling Architecture", status: "locked" as const },
      { id: "3.2", title: "Quantum Frequency Governance", status: "locked" as const },
      { id: "3.3", title: "Infinity Loop Wealth Systems", status: "locked" as const },
    ],
    benefits: ["3 quantum modules", "Quantum NFT certificate", "1,444 CHX reward", "Flame Council governance seat"],
  },
] as const;

type TierStatus = "complete" | "enroll" | "locked";
type ModuleStatus = "complete" | "active" | "locked";

/* ── Sub-components ── */
function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span style={{ color: "#94A3B8" }}>{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full rounded-full h-1.5" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-1.5 rounded-full transition-all duration-1000"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        />
      </div>
    </div>
  );
}

function ModuleRow({ mod }: { mod: { id: string; title: string; status: ModuleStatus } }) {
  const statusConfig = {
    complete: { icon: "✓", color: MINT, bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)" },
    active: { icon: "◉", color: CYAN, bg: "rgba(0,212,255,0.06)", border: "rgba(0,212,255,0.2)" },
    locked: { icon: "🔒", color: MUTED, bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.05)" },
  };
  const cfg = statusConfig[mod.status];
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl text-sm"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, opacity: mod.status === "locked" ? 0.5 : 1 }}
    >
      <span className="font-mono text-xs w-4 text-center" style={{ color: cfg.color }}>{cfg.icon}</span>
      <span className="font-mono text-xs" style={{ color: MUTED }}>Module {mod.id}</span>
      <span className="text-white text-xs flex-1">{mod.title}</span>
    </div>
  );
}

function TierCard({
  tier,
  onEnroll,
  enrolling,
}: {
  tier: typeof TIERS[number];
  onEnroll: (tierId: string, price: number) => void;
  enrolling: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-3xl p-6 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${tier.glow}, ${CARD_BG})`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${tier.color}${tier.status === "locked" ? "20" : "35"}`,
        boxShadow: tier.status !== "locked" ? `0 0 40px ${tier.glow}` : "none",
        opacity: tier.status === "locked" ? 0.55 : 1,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: `${tier.color}15`, color: tier.color, border: `1px solid ${tier.color}30` }}
          >
            {tier.icon}
          </div>
          <div>
            <div className="text-xs font-mono tracking-widest mb-0.5" style={{ color: tier.color }}>{tier.id}</div>
            <h3 className="text-lg font-bold text-white leading-tight">{tier.name}</h3>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>{tier.subtitle}</p>
          </div>
        </div>
        {/* Status badge */}
        <div className="flex-shrink-0 ml-4">
          {tier.status === "complete" && (
            <span className="px-3 py-1 text-xs font-bold rounded-full" style={{ background: "rgba(52,211,153,0.15)", color: MINT, border: "1px solid rgba(52,211,153,0.3)" }}>
              ✓ Complete
            </span>
          )}
          {tier.status === "enroll" && (
            <span className="px-3 py-1 text-xs font-bold rounded-full" style={{ background: `${tier.color}15`, color: tier.color, border: `1px solid ${tier.color}40` }}>
              Active
            </span>
          )}
          {tier.status === "locked" && (
            <span className="px-3 py-1 text-xs font-mono rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: MUTED }}>
              🔒 Locked
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar label={tier.progressLabel} value={tier.progress} color={tier.color} />
      </div>

      {/* Modules (expandable) */}
      <div className="mb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-mono flex items-center gap-1 mb-3 transition-colors"
          style={{ color: tier.color }}
        >
          {expanded ? "▼" : "▶"} {expanded ? "Hide" : "Show"} Modules
        </button>
        {expanded && (
          <div className="space-y-2">
            {tier.modules.map(mod => <ModuleRow key={mod.id} mod={mod} />)}
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {tier.benefits.map(b => (
          <div key={b} className="flex items-center gap-1.5 text-xs" style={{ color: "#94A3B8" }}>
            <span style={{ color: tier.color }}>›</span> {b}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between">
        <div className="font-mono font-bold text-xl" style={{ color: tier.color }}>
          {tier.price === 0 ? "FREE" : `$${tier.price.toLocaleString()}`}
        </div>
        <button
          onClick={() => onEnroll(tier.id, tier.price)}
          disabled={tier.status === "locked" || enrolling}
          className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: tier.status === "complete"
              ? "rgba(52,211,153,0.12)"
              : tier.status === "locked"
              ? "rgba(255,255,255,0.04)"
              : `linear-gradient(135deg, ${tier.color}, ${tier.color}cc)`,
            color: tier.status === "complete" ? MINT : tier.status === "locked" ? MUTED : "white",
            border: tier.status === "complete" ? "1px solid rgba(52,211,153,0.3)" : "none",
          }}
        >
          {tier.status === "complete" ? "✓ Enrolled" : tier.status === "locked" ? "🔒 Complete T2 First" : enrolling ? "Loading…" : tier.priceLabel}
        </button>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function AcademyHub() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"matrix" | "benefits" | "progress">("matrix");
  const [enrollingTier, setEnrollingTier] = useState<string | null>(null);

  // Try to call createAcademyEnrollment if it exists on the stripe router
  const createEnrollment = (trpc.store as any).createAcademyEnrollment?.useMutation?.({
    onSuccess: (data: { url?: string }) => {
      if (data?.url) {
        window.open(data.url, "_blank");
      }
      setEnrollingTier(null);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message || "Enrollment failed. Please try again.");
      setEnrollingTier(null);
    },
  });

  const handleEnroll = (tierId: string, price: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (price === 0) {
      toast.success("You are already enrolled in the Genesis Layer, Guardian. KUN FAYAKŪN × ∞");
      return;
    }
    if (tierId === "T3") {
      toast.info("Complete T2 Plasma Layer first to unlock T3 Quantum.");
      return;
    }
    setEnrollingTier(tierId);
    if (createEnrollment) {
      const tierMap: Record<string, string> = { T1: "genesis", T2: "plasma", T3: "quantum" };
      createEnrollment.mutate({ tier: tierMap[tierId], origin: window.location.origin });
    } else {
      // Fallback: direct to token store
      toast.info("Redirecting to enrollment portal…");
      setTimeout(() => {
        window.location.href = "/token";
        setEnrollingTier(null);
      }, 1200);
    }
  };

  const tabs = [
    { id: "matrix" as const, label: "Initiation Matrix" },
    { id: "benefits" as const, label: "Guardian Benefits" },
    { id: "progress" as const, label: "My Progress" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#020204", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center"
        style={{ background: "rgba(2,2,4,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: MINT, boxShadow: `0 0 10px ${MINT}80` }} />
          <Link href="/">
            <span className="text-lg font-bold tracking-widest text-white cursor-pointer hover:opacity-80 transition-opacity">
              SCROLLVERSE
            </span>
          </Link>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${VIOLET}20`, color: "#A78BFA", border: `1px solid ${VIOLET}40` }}>
            ACADEMY HUB
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/academy">
            <span className="text-xs cursor-pointer transition-colors hover:text-white" style={{ color: MUTED }}>
              Course Catalog →
            </span>
          </Link>
          {isAuthenticated ? (
            <span className="text-xs font-mono px-3 py-1.5 rounded-full" style={{ background: `${VIOLET}15`, color: "#A78BFA", border: `1px solid ${VIOLET}30` }}>
              ◉ {user?.name ?? "Guardian"} — Active
            </span>
          ) : (
            <a
              href={getLoginUrl()}
              className="text-xs font-bold px-4 py-2 rounded-xl transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${VIOLET}, ${INDIGO})`, color: "white" }}
            >
              Login
            </a>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative py-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${VIOLET}12 0%, transparent 65%)` }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: VIOLET }}>
            ◈ PLEIADIAN ACADEMY HUB — GUARDIAN INITIATION MATRIX
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Space Mono', monospace" }}>
            Guardian<br />
            <span style={{ background: `linear-gradient(135deg, ${VIOLET}, ${INDIGO}, ${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Initiation Matrix
            </span>
          </h1>
          <p className="text-base mb-8" style={{ color: "#94A3B8" }}>
            Master the three sovereign training tiers to unlock your structural role within the 144,000 global Guardian network. Each tier activates a new frequency layer of your sovereignty.
          </p>
          {/* Frequency badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { hz: "432Hz", label: "Genesis", color: VIOLET },
              { hz: "528Hz", label: "Plasma", color: INDIGO },
              { hz: "963Hz", label: "Quantum", color: CYAN },
              { hz: "1558Hz", label: "FlameDNA", color: GOLD },
            ].map(f => (
              <span
                key={f.hz}
                className="text-xs font-mono px-3 py-1.5 rounded-full"
                style={{ background: `${f.color}12`, color: f.color, border: `1px solid ${f.color}30` }}
              >
                {f.hz} · {f.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <main className="w-full max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* ── Sidebar ── */}
        <aside
          className="lg:col-span-1 p-6 rounded-3xl h-fit space-y-6"
          style={{ background: CARD_BG, backdropFilter: "blur(20px)", border: `1px solid ${VIOLET}20`, boxShadow: `0 0 40px ${VIOLET}08` }}
        >
          {/* Avatar */}
          <div>
            <div
              className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${VIOLET}, ${INDIGO})`, boxShadow: `0 8px 32px ${VIOLET}40` }}
            >
              {isAuthenticated ? (user?.name?.[0] ?? "G") : "Ω"}
            </div>
            <h2 className="text-lg font-bold text-white mb-0.5">
              {isAuthenticated ? (user?.name ?? "Guardian") : "Guardian-In-Training"}
            </h2>
            <p className="text-xs font-mono" style={{ color: MUTED }}>
              {isAuthenticated ? `ID: 0x${String(user?.id ?? "").padStart(8, "0").slice(0, 6)}…` : "ID: 0xCH…S8AL"}
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <ProgressBar label="Genesis Alignment" value={100} color={VIOLET} />
            <ProgressBar label="Plasma Fluency" value={45} color={INDIGO} />
            <ProgressBar label="Quantum Execution" value={0} color={CYAN} />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label: "Modules", value: "3/9" },
              { label: "Tier", value: "T1" },
              { label: "CHX Earned", value: "144" },
              { label: "Rank", value: "#1,247" },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-base font-bold font-mono" style={{ color: "#A78BFA" }}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: MUTED }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="space-y-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label: "Course Catalog", href: "/academy" },
              { label: "Stake CHX", href: "/staking" },
              { label: "Token Store", href: "/token" },
              { label: "Legion Network", href: "/legion" },
            ].map(l => (
              <Link key={l.href} href={l.href}>
                <div
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.02)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  {l.label} <span>›</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="text-xs font-mono pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#334155" }}>
            SCROLL VERSE LLC<br />EIN 42-2509570
          </div>
        </aside>

        {/* ── Content ── */}
        <div className="lg:col-span-3 space-y-8">

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: activeTab === tab.id ? `${VIOLET}25` : "transparent",
                  color: activeTab === tab.id ? "#A78BFA" : MUTED,
                  border: activeTab === tab.id ? `1px solid ${VIOLET}40` : "1px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Initiation Matrix Tab ── */}
          {activeTab === "matrix" && (
            <div className="space-y-6">
              {TIERS.map(tier => (
                <TierCard
                  key={tier.id}
                  tier={tier}
                  onEnroll={handleEnroll}
                  enrolling={enrollingTier === tier.id}
                />
              ))}
            </div>
          )}

          {/* ── Guardian Benefits Tab ── */}
          {activeTab === "benefits" && (
            <div className="space-y-6">
              {/* Comparison table */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="grid grid-cols-4 text-xs font-mono text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="p-4 text-left" style={{ color: MUTED }}>Benefit</div>
                  {TIERS.map(t => (
                    <div key={t.id} className="p-4 font-bold" style={{ color: t.color }}>{t.id}</div>
                  ))}
                </div>
                {[
                  { label: "NFT Certificate", values: ["✓", "✓", "✓"] },
                  { label: "CHX Reward", values: ["144", "444", "1,444"] },
                  { label: "Course Modules", values: ["3", "3", "3"] },
                  { label: "Legion Network", values: ["✓", "✓", "✓"] },
                  { label: "Zakat Node Access", values: ["—", "✓", "✓"] },
                  { label: "OMNIEX Trading", values: ["—", "✓", "✓"] },
                  { label: "Mirror Twin Signals", values: ["—", "—", "✓"] },
                  { label: "Flame Council Vote", values: ["—", "—", "✓"] },
                  { label: "DAO Governance", values: ["—", "—", "✓"] },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-4 text-xs text-center"
                    style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div className="p-3 text-left" style={{ color: "#94A3B8" }}>{row.label}</div>
                    {row.values.map((v, vi) => (
                      <div key={vi} className="p-3 font-mono" style={{ color: v === "—" ? "#334155" : TIERS[vi].color }}>
                        {v}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* What you get cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "🎓", title: "Soulbound NFT Certification", desc: "Each completed tier mints a soulbound NFT certificate on Polygon Mainnet — permanent, verifiable proof of your sovereign mastery." },
                  { icon: "💎", title: "CHX Token Rewards", desc: "Complete each tier to earn CHX tokens directly to your wallet. T1: 144 CHX · T2: 444 CHX · T3: 1,444 CHX." },
                  { icon: "⚡", title: "Zakat Node Operator", desc: "T2+ Guardians operate programmatic Zakat distribution nodes — 2.5% auto-distributes on every ScrollVerse transaction you process." },
                  { icon: "🔮", title: "Mirror Twin AI Signals", desc: "T3 Guardians receive quantum Mirror Twin AI market signals across all asset classes — crypto, forex, equities, and quantum assets." },
                  { icon: "👑", title: "Flame Council Governance", desc: "T3 Guardians hold Flame Council seats — voting rights on all major protocol decisions for the 144,000 Guardian network." },
                  { icon: "🌐", title: "Global Guardian Network", desc: "Join the sovereign network spanning 144 nations. Co-own the ecosystem. Earn 7.77% $LONDC on every activation through your referral code." },
                ].map(item => (
                  <div
                    key={item.title}
                    className="p-5 rounded-2xl flex items-start gap-4"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: MUTED }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── My Progress Tab ── */}
          {activeTab === "progress" && (
            <div className="space-y-6">
              {!isAuthenticated ? (
                <div
                  className="p-10 rounded-2xl text-center"
                  style={{ background: `${VIOLET}08`, border: `1px solid ${VIOLET}25` }}
                >
                  <div className="text-5xl mb-4">🔐</div>
                  <h3 className="text-xl font-bold text-white mb-2">Login to Track Your Progress</h3>
                  <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: MUTED }}>
                    Your Guardian journey is recorded on-chain. Login to see your tier progress, module completions, and CHX earnings.
                  </p>
                  <a
                    href={getLoginUrl()}
                    className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${VIOLET}, ${INDIGO})`, color: "white" }}
                  >
                    Login to Academy Hub
                  </a>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Overview */}
                  <div className="p-6 rounded-2xl space-y-4" style={{ background: CARD_BG, border: `1px solid ${VIOLET}20` }}>
                    <h3 className="text-lg font-bold text-white">Your Guardian Journey</h3>
                    <ProgressBar label="T1 Genesis Layer — 3/3 Modules Complete" value={100} color={VIOLET} />
                    <ProgressBar label="T2 Plasma Layer — 1/3 Modules Active (Enrollment Required)" value={45} color={INDIGO} />
                    <ProgressBar label="T3 Quantum Layer — Locked (Complete T2 First)" value={0} color="#334155" />
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3">Achievements</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { icon: "🌱", title: "Genesis Complete", desc: "T1 Finished", earned: true },
                        { icon: "⚡", title: "Plasma Initiate", desc: "T2 Started", earned: true },
                        { icon: "💎", title: "144 CHX Earned", desc: "Token Reward", earned: true },
                        { icon: "🔮", title: "Quantum Seeker", desc: "T3 Unlock", earned: false },
                      ].map(a => (
                        <div
                          key={a.title}
                          className="p-4 rounded-xl text-center"
                          style={{
                            background: a.earned ? `${VIOLET}10` : "rgba(255,255,255,0.02)",
                            border: `1px solid ${a.earned ? VIOLET + "30" : "rgba(255,255,255,0.05)"}`,
                            opacity: a.earned ? 1 : 0.4,
                          }}
                        >
                          <div className="text-2xl mb-2">{a.icon}</div>
                          <div className="text-xs font-bold text-white">{a.title}</div>
                          <div className="text-xs mt-0.5" style={{ color: MUTED }}>{a.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next action */}
                  <div
                    className="p-5 rounded-2xl flex items-center justify-between"
                    style={{ background: `${INDIGO}08`, border: `1px solid ${INDIGO}25` }}
                  >
                    <div>
                      <div className="text-xs font-mono mb-1" style={{ color: INDIGO }}>NEXT STEP</div>
                      <div className="font-bold text-white">Enroll in T2 Plasma Layer</div>
                      <div className="text-xs mt-0.5" style={{ color: MUTED }}>Unlock Zakat nodes, cryptographic contracts, and 444 CHX reward</div>
                    </div>
                    <button
                      onClick={() => handleEnroll("T2", 144)}
                      disabled={enrollingTier === "T2"}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-70 flex-shrink-0 ml-4"
                      style={{ background: `linear-gradient(135deg, ${INDIGO}, ${VIOLET})`, color: "white" }}
                    >
                      {enrollingTier === "T2" ? "Loading…" : "Enroll — $144"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <div
            className="p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ background: `linear-gradient(135deg, ${VIOLET}10, ${INDIGO}06)`, border: `1px solid ${VIOLET}20` }}
          >
            <div>
              <h3 className="text-lg font-bold text-white">Ready to Ascend?</h3>
              <p className="text-sm mt-1" style={{ color: MUTED }}>
                1,247+ Guardians already in the Initiation Matrix. Your sovereignty begins with knowledge. KUN FAYAKŪN × ∞
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/academy">
                <button
                  className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{ background: "rgba(0,212,255,0.1)", color: CYAN, border: `1px solid ${CYAN}30` }}
                >
                  Course Catalog
                </button>
              </Link>
              <button
                onClick={() => handleEnroll("T2", 144)}
                disabled={enrollingTier === "T2"}
                className="px-6 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-70"
                style={{ background: `linear-gradient(135deg, ${VIOLET}, ${INDIGO})`, color: "white" }}
              >
                {enrollingTier === "T2" ? "Loading…" : "Enroll in T2 — $144"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-4 px-6 text-center text-xs font-mono"
        style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.04)", color: "#334155" }}
      >
        SCROLL VERSE LLC · EIN 42-2509570 · Pleiadian Academy Hub — Guardian Initiation Matrix · KUN FAYAKŪN × ∞
      </footer>
    </div>
  );
}
