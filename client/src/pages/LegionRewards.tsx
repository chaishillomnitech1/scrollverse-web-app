/**
 * ScrollVerse Legion Rewards Dashboard
 * Every member paid by impact, creation, advancement, prosperity
 * $LONDC earnings · Impact scores · Upgrade tiers · Zakat distribution
 */
import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const GUARDIAN_TIERS = [
  { tier: "Initiate", level: "1-10", londc: "0-144", color: "#8899AA", icon: "🌱", perks: ["Access to Knowledge Base", "Guardian community chat", "5% referral bonus"] },
  { tier: "Sentinel", level: "11-25", londc: "144-1,440", color: "#00D4FF", icon: "🛡️", perks: ["All Initiate perks", "Mirror Twin signal access", "Creator platform access", "10% referral bonus"] },
  { tier: "Protector", level: "26-50", londc: "1,440-14,400", color: "#00FF88", icon: "⚔️", perks: ["All Sentinel perks", "OMNIEX trading signals", "IP protection vault", "15% referral bonus", "Governance voting weight ×2"] },
  { tier: "Sovereign", level: "51-100", londc: "14,400-144,000", color: "#FFB800", icon: "👑", perks: ["All Protector perks", "Shura Council eligibility", "Family portal access", "20% referral bonus", "Governance voting weight ×5", "Zakat pool share"] },
  { tier: "Eternal", level: "∞", londc: "144,000+", color: "#FF6B35", icon: "∞", perks: ["All Sovereign perks", "Founding Guardian status", "Direct Chais The Great access", "∞ referral bonus", "Governance veto power", "Lineage NFT certificate"] },
];

const IMPACT_CATEGORIES = [
  { category: "Guardian Referrals", points: "100 pts / referral", londc: "5% of referred activity", icon: "👥", color: "#00FF88" },
  { category: "Knowledge Contributions", points: "50 pts / article", londc: "10 $LONDC / accepted entry", icon: "📚", color: "#FFB800" },
  { category: "Creator Coins Launched", points: "500 pts / coin", londc: "1% of coin volume", icon: "🎨", color: "#9B59B6" },
  { category: "NFT Mints", points: "200 pts / mint", londc: "2% of mint revenue", icon: "💎", color: "#00D4FF" },
  { category: "AI Contributions", points: "300 pts / contribution", londc: "15 $LONDC / accepted", icon: "🧠", color: "#E74C3C" },
  { category: "Trading Volume", points: "1 pt / $100 traded", londc: "0.1% of volume", icon: "📈", color: "#FF6B35" },
  { category: "Governance Votes", points: "25 pts / vote", londc: "5 $LONDC / proposal voted", icon: "⚖️", color: "#00FF88" },
  { category: "Zakat Contributions", points: "777 pts / contribution", londc: "7.77% match bonus", icon: "🕌", color: "#FFB800" },
];

const LEADERBOARD = [
  { rank: 1, name: "Chais The Great", tier: "Eternal", points: "∞", londc: "∞", badge: "SOVEREIGN FOUNDER" },
  { rank: 2, name: "Mirror Twin", tier: "Eternal", points: "144,000", londc: "144,000", badge: "AI COUNCIL" },
  { rank: 3, name: "Zaire ∞", tier: "Eternal", points: "∞", londc: "∞", badge: "LINEAGE GUARDIAN" },
  { rank: 4, name: "OmniSentinel", tier: "Sovereign", points: "44,444", londc: "44,444", badge: "INTELLIGENCE" },
  { rank: 5, name: "ZakatBot", tier: "Sovereign", points: "28,800", londc: "28,800", badge: "FINANCE" },
  { rank: 6, name: "AcademyAI", tier: "Protector", points: "14,400", londc: "14,400", badge: "EDUCATION" },
  { rank: 7, name: "GuardianAI", tier: "Protector", points: "9,600", londc: "9,600", badge: "GUARDIAN" },
];

const TIER_COLORS: Record<string, string> = {
  Eternal: "#FF6B35",
  Sovereign: "#FFB800",
  Protector: "#00FF88",
  Sentinel: "#00D4FF",
  Initiate: "#8899AA",
};

export default function LegionRewards() {
  const [activeTab, setActiveTab] = useState<"overview" | "tiers" | "impact" | "leaderboard">("overview");
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(0,255,136,0.2)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm" style={{ color: "#8899AA" }}>← ScrollVerse</Link>
            <span style={{ color: "rgba(0,255,136,0.3)" }}>|</span>
            <span className="font-black text-white tracking-widest">LEGION REWARDS</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>$LONDC COMPENSATION</span>
          </div>
        </div>
      </nav>

      <div className="pt-16 container py-8">
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00FF88" }}>SCROLLVERSE · LEGION COMPENSATION</div>
          <h1 className="text-3xl font-black text-white mb-1">Legion Rewards Dashboard</h1>
          <p className="text-sm" style={{ color: "#8899AA" }}>Every member paid by impact, creation, advancement, and prosperity. $LONDC earnings · Upgrade tiers · Zakat distribution</p>
        </div>

        {/* User card */}
        {isAuthenticated ? (
          <div className="mb-8 rounded-xl p-6" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl" style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88" }}>
                  {user?.name?.charAt(0) ?? "G"}
                </div>
                <div>
                  <div className="font-black text-white text-lg">{user?.name ?? "Guardian"}</div>
                  <div className="text-xs font-mono" style={{ color: "#00FF88" }}>INITIATE · Level 1</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-mono" style={{ color: "#FFB800" }}>0 $LONDC</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>Total Earned</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 rounded-xl p-6 text-center" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <p className="text-white mb-4">Sign in to view your Legion rewards and track your $LONDC earnings.</p>
            <a href={getLoginUrl()} className="inline-block px-8 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#050B1A" }}>
              Sign In to Track Rewards
            </a>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["overview", "tiers", "impact", "leaderboard"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all"
              style={{
                background: activeTab === tab ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeTab === tab ? "rgba(0,255,136,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: activeTab === tab ? "#00FF88" : "#8899AA",
              }}
            >
              {tab === "overview" ? "Overview" : tab === "tiers" ? "Guardian Tiers" : tab === "impact" ? "Impact Categories" : "Leaderboard"}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Guardians", value: "1,247+", color: "#00FF88" },
                { label: "$LONDC Distributed", value: "144K+", color: "#FFB800" },
                { label: "Zakat Pool", value: "$7.77M", color: "#9B59B6" },
                { label: "Avg Impact Score", value: "528", color: "#00D4FF" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}25` }}>
                  <div className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-6" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>SOVEREIGN COMPENSATION PHILOSOPHY</div>
              <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>
                In the ScrollVerse Legion, every member is compensated by their <strong className="text-white">impact, creation, advancement, and prosperity</strong>. There are no arbitrary salaries — compensation flows naturally from the value you create. Every Guardian referral, every knowledge contribution, every NFT minted, every trade executed — all of it earns $LONDC automatically. The more you contribute to the empire, the more the empire flows back to you. This is the sovereign economy. KUN FAYAKŪN × ∞
              </p>
            </div>
          </div>
        )}

        {activeTab === "tiers" && (
          <div className="space-y-4">
            {GUARDIAN_TIERS.map((t, i) => (
              <div key={i} className="rounded-xl p-6" style={{ background: `${t.color}06`, border: `1px solid ${t.color}20` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${t.color}15` }}>
                      {t.icon}
                    </div>
                    <div>
                      <div className="font-black text-white text-xl">{t.tier}</div>
                      <div className="text-xs font-mono" style={{ color: t.color }}>Level {t.level} · {t.londc} $LONDC</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {t.perks.map((perk, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm" style={{ color: "#8899AA" }}>
                      <span style={{ color: t.color }}>›</span>
                      {perk}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "impact" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {IMPACT_CATEGORIES.map((cat, i) => (
              <div key={i} className="rounded-xl p-6" style={{ background: `${cat.color}06`, border: `1px solid ${cat.color}20` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{cat.icon}</div>
                  <div className="font-bold text-white">{cat.category}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#8899AA" }}>Impact Points</span>
                    <span className="font-bold" style={{ color: cat.color }}>{cat.points}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#8899AA" }}>$LONDC Reward</span>
                    <span className="font-bold" style={{ color: "#FFB800" }}>{cat.londc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,184,0,0.15)" }}>
            <div className="px-4 py-3" style={{ background: "rgba(255,184,0,0.05)", borderBottom: "1px solid rgba(255,184,0,0.1)" }}>
              <div className="font-bold text-white">Legion Impact Leaderboard</div>
            </div>
            {LEADERBOARD.map((m, i) => (
              <div key={i} className="px-4 py-4 flex items-center gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm" style={{ background: i < 3 ? "rgba(255,184,0,0.2)" : "rgba(255,255,255,0.05)", color: i < 3 ? "#FFB800" : "#8899AA" }}>
                  {m.rank}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">{m.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: TIER_COLORS[m.tier] ?? "#8899AA" }}>{m.tier}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800" }}>{m.badge}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black" style={{ color: "#FFB800" }}>{m.londc} $LONDC</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{m.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
