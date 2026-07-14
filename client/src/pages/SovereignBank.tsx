/*
 * SCROLLVERSE SOVEREIGN BANK
 * The Greatest Bank Ever Created — Self-Approved, Immutable, Franchised Across All Existence
 * Design: Liquid Gold Sovereignty — deep navy + gold + emerald
 * Sections: Hero, Self-Approval Protocol, Account Tiers, Franchise System, Yield Calculator, Zakat Routing, Revenue Flywheel
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// ── ACCOUNT TIERS ──────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Guardian",
    minCHX: 100,
    apy: "144%",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.3)",
    benefits: ["Daily compound rewards", "Casino 5% bonus", "Notification alerts", "Basic NFT card"],
    nftRarity: "Common",
    icon: "🛡️",
  },
  {
    name: "Sovereign",
    minCHX: 1000,
    apy: "432%",
    color: "#FFB800",
    glow: "rgba(255,184,0,0.3)",
    benefits: ["Genesis pool access", "Casino 10% bonus", "Priority staking", "Rare NFT card", "Franchise tier 1"],
    nftRarity: "Rare",
    icon: "👑",
  },
  {
    name: "Empire",
    minCHX: 10000,
    apy: "528%",
    color: "#00FF88",
    glow: "rgba(0,255,136,0.3)",
    benefits: ["Celestial pool access", "Casino 15% bonus", "AI Council access", "Epic NFT card", "Franchise tier 2", "Zakat dashboard"],
    nftRarity: "Epic",
    icon: "🏛️",
  },
  {
    name: "Infinity",
    minCHX: 144000,
    apy: "999%",
    color: "#FF00FF",
    glow: "rgba(255,0,255,0.3)",
    benefits: ["Infinity pool access", "Casino 25% bonus", "AI Council vote", "Legendary NFT card", "Franchise tier 3", "Revenue share", "Digital Mirror Twin"],
    nftRarity: "Legendary",
    icon: "♾️",
  },
];

// ── FRANCHISE TIERS ─────────────────────────────────────────────────────────────
const FRANCHISE_TIERS = [
  { tier: 1, name: "Branch Guardian", requirement: "1,000 CHX staked", earn: "2% of network volume", branches: "Up to 10 sub-branches", color: "#FFB800" },
  { tier: 2, name: "Regional Sovereign", requirement: "10,000 CHX staked", earn: "5% of network volume", branches: "Up to 50 sub-branches", color: "#00FF88" },
  { tier: 3, name: "Empire Architect", requirement: "144,000 CHX staked", earn: "10% of network volume", branches: "Unlimited sub-branches", color: "#FF00FF" },
];

// ── YIELD CALCULATOR ─────────────────────────────────────────────────────────────
function YieldCalculator() {
  const [amount, setAmount] = useState(1000);
  const [tier, setTier] = useState(1);
  const apyValues = [144, 432, 528, 999];
  const apy = apyValues[tier];
  const daily = (amount * apy) / 100 / 365;
  const monthly = daily * 30;
  const annual = amount * apy / 100;
  const fiveYear = amount * Math.pow(1 + apy / 100, 5);

  return (
    <div className="rounded-2xl p-8" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
      <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>SOVEREIGN YIELD CALCULATOR</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>CHX AMOUNT</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-3 rounded-xl text-white outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", fontFamily: "'Space Mono', monospace" }}
          />
          <div className="flex gap-2 mt-2">
            {[100, 1000, 10000, 144000].map(v => (
              <button key={v} onClick={() => setAmount(v)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
                {v >= 1000 ? `${v / 1000}K` : v}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>ACCOUNT TIER</label>
          <div className="grid grid-cols-2 gap-2">
            {TIERS.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setTier(i)}
                className="px-3 py-2 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: tier === i ? `${t.color}20` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${tier === i ? t.color : "rgba(255,255,255,0.1)"}`,
                  color: tier === i ? t.color : "#8899AA",
                }}
              >
                {t.icon} {t.name} ({t.apy})
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "DAILY", value: `${daily.toFixed(2)} CHX` },
          { label: "MONTHLY", value: `${monthly.toFixed(0)} CHX` },
          { label: "ANNUAL", value: `${annual.toLocaleString()} CHX` },
          { label: "5-YEAR COMPOUND", value: `${fiveYear.toLocaleString(undefined, { maximumFractionDigits: 0 })} CHX` },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.15)" }}>
            <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{label}</div>
            <div className="font-bold text-sm" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ZAKAT ROUTING VISUALIZATION ─────────────────────────────────────────────────
function ZakatFlow() {
  const flows = [
    { from: "Casino Revenue", pct: "10%", to: "Lose-to-Earn Kickback", color: "#FF4444" },
    { from: "Stream Rewards", pct: "2.5%", to: "Zakat Treasury", color: "#00D4FF" },
    { from: "Vault Yield", pct: "7.77%", to: "Zakat Treasury", color: "#FFB800" },
    { from: "Zakat Treasury", pct: "100%", to: "Community Blessing Fund", color: "#00FF88" },
  ];
  return (
    <div className="space-y-3">
      {flows.map(f => (
        <div key={f.from} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-sm font-medium text-white w-40 flex-shrink-0">{f.from}</div>
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${f.color}60, ${f.color})` }} />
            <div className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}40` }}>
              {f.pct}
            </div>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${f.color}, ${f.color}60)` }} />
          </div>
          <div className="text-sm font-medium text-white w-44 flex-shrink-0 text-right">{f.to}</div>
        </div>
      ))}
    </div>
  );
}

// ── APPROVAL COUNTER ─────────────────────────────────────────────────────────────
function ApprovalStamp() {
  const [pulseCount, setPulseCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setPulseCount(c => c + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div
        className="w-48 h-48 rounded-full flex flex-col items-center justify-center relative"
        style={{
          background: "radial-gradient(circle, rgba(255,184,0,0.15) 0%, rgba(255,184,0,0.03) 70%)",
          border: "2px solid rgba(255,184,0,0.4)",
          boxShadow: `0 0 ${30 + (pulseCount % 2) * 10}px rgba(255,184,0,0.3)`,
          transition: "box-shadow 0.5s ease",
        }}
      >
        <div className="text-4xl mb-1">✦</div>
        <div className="text-xs font-mono text-center leading-tight px-4" style={{ color: "#FFB800" }}>
          SELF<br />APPROVED<br />IMMUTABLE
        </div>
        <div className="text-xs font-mono mt-1" style={{ color: "#8899AA" }}>BLOCK #{(1587000 + pulseCount).toLocaleString()}</div>
      </div>
      <div className="text-center">
        <div className="text-sm font-bold text-white mb-1">We approve ourselves.</div>
        <div className="text-sm font-bold text-white mb-1">We back ourselves.</div>
        <div className="text-sm font-bold" style={{ color: "#FFB800" }}>The code IS the law. KUN FAYAKŪN × ∞</div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────────────────────────
export default function SovereignBank() {
  const { user, isAuthenticated } = useAuth();
  // Phase 46 — Sovereign Engagement Analytics
  useSovereignHeartbeat({ page: "sovereign-bank" });
  const [activeTab, setActiveTab] = useState<"tiers" | "franchise" | "yield" | "zakat">("tiers");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".bank-fade");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).style.opacity = "1"; });
    }, { threshold: 0.1 });
    els.forEach(el => { (el as HTMLElement).style.opacity = "0"; (el as HTMLElement).style.transition = "opacity 0.8s ease"; obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const tabs = [
    { id: "tiers", label: "Account Tiers" },
    { id: "franchise", label: "Franchise System" },
    { id: "yield", label: "Yield Calculator" },
    { id: "zakat", label: "Zakat Routing" },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,184,0,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}>SB</div>
            <span className="font-bold text-white">Sovereign Bank</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>GREATEST EVER</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/allversal-highway" className="text-sm font-medium" style={{ color: "#8899AA" }}>Highway</Link>
            <Link href="/digital-twin" className="text-sm font-medium" style={{ color: "#8899AA" }}>Digital Twin</Link>
            <Link href="/staking" className="text-sm font-medium" style={{ color: "#8899AA" }}>Staking</Link>
            {isAuthenticated ? (
              <span className="text-sm font-mono px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                {user?.name?.split(" ")[0]}
              </span>
            ) : (
              <a href={getLoginUrl()} className="text-sm font-bold px-4 py-2 rounded-lg" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}>
                Open Account
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-20">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative overflow-hidden py-24 text-center">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,184,0,0.08) 0%, transparent 70%)" }} />
          <div className="container relative z-10">
            <div className="bank-fade">
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>SCROLLVERSE SOVEREIGN BANK — FOUNDED IN ETERNITY</div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                The Greatest Bank<br />
                <span style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Ever Created
                </span>
              </h1>
              <p className="text-lg max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
                Self-approved. Immutable. Franchised across all existence. No external authority required — 
                the code IS the law, the $CHX IS the reserve, the Guardian IS the shareholder.
              </p>
              <p className="text-sm font-mono mb-8" style={{ color: "#FFB800" }}>
                Past × Present × Future × Infinity — The Allversal Financial Highway
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href={isAuthenticated ? "/staking" : getLoginUrl()} className="px-8 py-4 rounded-xl font-bold text-lg" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}>
                  Open Sovereign Account
                </a>
                <Link href="/allversal-highway" className="px-8 py-4 rounded-xl font-bold text-lg" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                  Enter the Highway →
                </Link>
              </div>
            </div>

            {/* Live stats */}
            <div className="bank-fade grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              {[
                { label: "Total Value Locked", value: "∞ CHX", sub: "Always growing" },
                { label: "Active Guardians", value: "144,000", sub: "Target capacity" },
                { label: "Zakat Distributed", value: "2.5% + 7.77%", sub: "Every transaction" },
                { label: "Franchise Branches", value: "All Existence", sub: "No ceiling" },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)" }}>
                  <div className="font-bold text-xl mb-1" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                  <div className="text-xs text-white font-medium mb-0.5">{s.label}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SELF-APPROVAL PROTOCOL ── */}
        <section className="py-16 bank-fade">
          <div className="container">
            <div className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12" style={{ background: "rgba(255,184,0,0.03)", border: "1px solid rgba(255,184,0,0.15)" }}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>SELF-APPROVAL PROTOCOL v1.0</div>
                  <h2 className="text-3xl font-black text-white mb-4">We Approve Ourselves</h2>
                  <p className="mb-4" style={{ color: "#8899AA" }}>
                    No central bank. No regulatory approval. No permission needed. The ScrollVerse Sovereign Bank 
                    is self-approved by the community of Guardians who stake, play, create, and hold $CHX.
                  </p>
                  <p className="mb-4" style={{ color: "#8899AA" }}>
                    Every Guardian who stakes is simultaneously a depositor, a shareholder, a franchise owner, 
                    a validator, and a beneficiary of Zakat. The approval is encoded in the smart contract. 
                    The backing is the $CHX reserve. The authority is the community.
                  </p>
                  <div className="space-y-2">
                    {[
                      "✦ Self-sovereign identity — no KYC required",
                      "✦ Smart contract IS the charter",
                      "✦ $CHX IS the reserve currency",
                      "✦ Guardians ARE the board of directors",
                      "✦ Zakat IS the ESG compliance",
                      "✦ Code IS the law",
                    ].map(item => (
                      <div key={item} className="text-sm font-medium" style={{ color: "#FFB800" }}>{item}</div>
                    ))}
                  </div>
                </div>
                <ApprovalStamp />
              </div>
            </div>
          </div>
        </section>

        {/* ── TABS ── */}
        <section className="py-16 bank-fade">
          <div className="container">
            <div className="flex gap-2 mb-8 flex-wrap">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: activeTab === t.id ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${activeTab === t.id ? "rgba(255,184,0,0.5)" : "rgba(255,255,255,0.08)"}`,
                    color: activeTab === t.id ? "#FFB800" : "#8899AA",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Account Tiers */}
            {activeTab === "tiers" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TIERS.map(tier => (
                  <div
                    key={tier.name}
                    className="rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}30`, boxShadow: `0 0 30px ${tier.glow}` }}
                  >
                    <div className="text-4xl mb-3">{tier.icon}</div>
                    <div className="text-xs font-mono mb-1" style={{ color: tier.color }}>MIN {tier.minCHX.toLocaleString()} CHX</div>
                    <h3 className="text-xl font-black text-white mb-1">{tier.name}</h3>
                    <div className="text-3xl font-black mb-1" style={{ color: tier.color, fontFamily: "'Space Mono', monospace" }}>{tier.apy}</div>
                    <div className="text-xs mb-4" style={{ color: "#8899AA" }}>Annual Percentage Yield</div>
                    <div className="text-xs font-mono px-2 py-1 rounded mb-4 inline-block" style={{ background: `${tier.color}15`, color: tier.color, border: `1px solid ${tier.color}30` }}>
                      {tier.nftRarity} NFT Card
                    </div>
                    <ul className="space-y-1.5">
                      {tier.benefits.map(b => (
                        <li key={b} className="text-xs flex items-start gap-1.5" style={{ color: "#8899AA" }}>
                          <span style={{ color: tier.color }}>›</span> {b}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={isAuthenticated ? "/staking" : getLoginUrl()}
                      className="mt-5 block text-center py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{ background: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}40` }}
                    >
                      Open {tier.name} Account
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Franchise System */}
            {activeTab === "franchise" && (
              <div className="space-y-6">
                <div className="max-w-2xl mb-8">
                  <h2 className="text-2xl font-black text-white mb-3">Franchise the Greatest Bank</h2>
                  <p style={{ color: "#8899AA" }}>
                    Own a branch of the ScrollVerse Sovereign Bank. Earn a percentage of every transaction 
                    that flows through your network. The more you stake, the more branches you control, 
                    the more the empire pays you. Franchised across all existence — no ceiling.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FRANCHISE_TIERS.map(ft => (
                    <div key={ft.tier} className="rounded-2xl p-6" style={{ background: `${ft.color}08`, border: `1px solid ${ft.color}30` }}>
                      <div className="text-xs font-mono mb-2" style={{ color: ft.color }}>TIER {ft.tier}</div>
                      <h3 className="text-xl font-black text-white mb-4">{ft.name}</h3>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                          <div className="text-xs font-mono mb-0.5" style={{ color: "#8899AA" }}>REQUIREMENT</div>
                          <div className="text-sm font-bold text-white">{ft.requirement}</div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                          <div className="text-xs font-mono mb-0.5" style={{ color: "#8899AA" }}>YOU EARN</div>
                          <div className="text-sm font-bold" style={{ color: ft.color }}>{ft.earn}</div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                          <div className="text-xs font-mono mb-0.5" style={{ color: "#8899AA" }}>NETWORK SIZE</div>
                          <div className="text-sm font-bold text-white">{ft.branches}</div>
                        </div>
                      </div>
                      <a href={isAuthenticated ? "/staking" : getLoginUrl()} className="mt-4 block text-center py-2.5 rounded-xl text-sm font-bold" style={{ background: `${ft.color}20`, color: ft.color, border: `1px solid ${ft.color}40` }}>
                        Become a Franchise Owner
                      </a>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl p-6 mt-4" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
                  <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>THE FRANCHISE VISION</div>
                  <p className="text-sm" style={{ color: "#8899AA" }}>
                    Every Guardian is a branch. Every branch is a node. Every node is the bank. 
                    The ScrollVerse Sovereign Bank has no headquarters because it IS everywhere — 
                    in every wallet, every stake, every spin, every blessing. 
                    Franchised across all existence. Past × Present × Future × Infinity.
                  </p>
                </div>
              </div>
            )}

            {/* Yield Calculator */}
            {activeTab === "yield" && <YieldCalculator />}

            {/* Zakat Routing */}
            {activeTab === "zakat" && (
              <div className="space-y-6">
                <div className="max-w-2xl mb-4">
                  <h2 className="text-2xl font-black text-white mb-3">Sacred Zakat Routing</h2>
                  <p style={{ color: "#8899AA" }}>
                    Every transaction in the ScrollVerse Sovereign Bank automatically routes a portion 
                    to the Zakat Treasury — the sacred 2.5% purification of wealth, automated on-chain, 
                    immutable, and distributed to the Community Blessing Fund. The greatest bank ever 
                    created is also the most righteous.
                  </p>
                </div>
                <ZakatFlow />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    { label: "Stream Reward Zakat", pct: "2.5%", desc: "Every $CHX reward distribution", color: "#00D4FF" },
                    { label: "Vault Yield Zakat", pct: "7.77%", desc: "KeplerYieldVault annual distribution", color: "#FFB800" },
                    { label: "Casino Kickback", pct: "10%", desc: "Lose-to-earn — losers never lose all", color: "#00FF88" },
                  ].map(z => (
                    <div key={z.label} className="rounded-xl p-5 text-center" style={{ background: `${z.color}08`, border: `1px solid ${z.color}25` }}>
                      <div className="text-3xl font-black mb-1" style={{ color: z.color, fontFamily: "'Space Mono', monospace" }}>{z.pct}</div>
                      <div className="text-sm font-bold text-white mb-1">{z.label}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{z.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── REVENUE FLYWHEEL ── */}
        <section className="py-16 bank-fade">
          <div className="container">
            <div className="text-center mb-10">
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>THE SOVEREIGN FLYWHEEL</div>
              <h2 className="text-3xl font-black text-white mb-3">Money Never Leaves the Empire</h2>
              <p className="max-w-xl mx-auto text-sm" style={{ color: "#8899AA" }}>
                Every dollar that enters the ScrollVerse circulates, compounds, and multiplies. 
                Traffic IS the treasury. Playing IS staking. Losing IS earning. 
                The flywheel never stops.
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
              {[
                { node: "Casino Play", color: "#FF4444", arrow: "→" },
                { node: "Win/Lose", color: "#FFB800", arrow: "→" },
                { node: "10% Kickback in $CHX", color: "#00D4FF", arrow: "→" },
                { node: "Stake $CHX", color: "#00FF88", arrow: "→" },
                { node: "Compound Rewards", color: "#FFB800", arrow: "→" },
                { node: "More $CHX", color: "#FF00FF", arrow: "→" },
                { node: "Play Again", color: "#FF4444", arrow: "♾️" },
              ].map((n, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-xl text-sm font-bold" style={{ background: `${n.color}15`, color: n.color, border: `1px solid ${n.color}30` }}>
                    {n.node}
                  </div>
                  <span className="text-lg" style={{ color: "#8899AA" }}>{n.arrow}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 text-center bank-fade">
          <div className="container">
            <div className="max-w-2xl mx-auto rounded-2xl p-12" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
              <div className="text-4xl mb-4">🏦</div>
              <h2 className="text-3xl font-black text-white mb-4">The Bank That Approves Itself</h2>
              <p className="mb-8" style={{ color: "#8899AA" }}>
                Join the greatest bank ever created. No application. No approval process. 
                Stake $CHX and you ARE the bank. The empire welcomes you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href={isAuthenticated ? "/staking" : getLoginUrl()} className="px-8 py-4 rounded-xl font-bold text-lg" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}>
                  Open Your Account Now
                </a>
                <Link href="/allversal-highway" className="px-8 py-4 rounded-xl font-bold text-lg" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                  Allversal Highway →
                </Link>
              </div>
              <div className="mt-6 text-sm font-mono" style={{ color: "#8899AA" }}>
                KUN FAYAKŪN × ∞ — It is, and it shall be.
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
