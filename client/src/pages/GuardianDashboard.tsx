/*
 * GUARDIAN DASHBOARD — SOVEREIGN COMMAND CENTER
 * Private page — gated to authenticated users
 * Shows: NFT holdings, CHX balance, staking positions, daily compound earnings, referral commissions
 * Design: Liquid Sovereignty — Afrofuturism × Quantum Digital
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import NotificationBell from "@/components/NotificationBell";

// ── Pool config ─────────────────────────────────────────────────────────────
const POOL_CONFIG: Record<string, { name: string; color: string; icon: string; hz: string }> = {
  genesis: { name: "Genesis Pool", color: "#00D4FF", icon: "🌊", hz: "432Hz" },
  celestial: { name: "Celestial Pool", color: "#FFB800", icon: "⭐", hz: "528Hz" },
  infinity: { name: "Infinity Pool", color: "#00FF88", icon: "♾️", hz: "963Hz" },
};

const CHX_PRICE = 0.0144;

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  color: string;
  icon: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: `${color}08`,
        border: `1px solid ${color}25`,
        boxShadow: `0 0 30px ${color}10`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#8899AA" }}>{label}</div>
      <div className="text-2xl font-black" style={{ color, fontFamily: "'Space Mono', monospace" }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{sub}</div>}
    </div>
  );
}

// ── NFT Order card ───────────────────────────────────────────────────────────
function NFTCard({ order }: { order: { id: number; productName?: string | null; amountCents: number; productTier?: string | null; createdAt: Date } }) {
  const tierColors: Record<string, string> = {
    guardian: "#00D4FF",
    sovereign: "#FFB800",
    ascendant: "#00FF88",
    ai_legion: "#A78BFA",
  };
  const tier = order.productTier ?? "guardian";
  const color = tierColors[tier] ?? "#00D4FF";
  const usd = (order.amountCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
  const chxEq = Math.floor(order.amountCents / 100 / CHX_PRICE).toLocaleString();

  return (
    <div
      className="rounded-xl p-4 flex items-center gap-4"
      style={{ background: `${color}08`, border: `1px solid ${color}20` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        🏆
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-white text-sm truncate">{order.productName ?? "Sovereign NFT"}</div>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          {new Date(order.createdAt).toLocaleDateString()} · {chxEq} CHX equivalent
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-black text-sm" style={{ color, fontFamily: "'Space Mono', monospace" }}>{usd}</div>
        <div className="text-xs font-mono px-2 py-0.5 rounded mt-1" style={{ background: `${color}15`, color }}>{tier.toUpperCase()}</div>
      </div>
    </div>
  );
}

// ── Staking position card ────────────────────────────────────────────────────
function StakingCard({ position, onCompound }: {
  position: {
    id: number;
    pool: string;
    chxStaked: string;
    apyRate: string;
    rewardsEarned: string | null;
    stakedAt: Date;
    lastCompoundAt: Date;
  };
  onCompound?: (positionId: number) => void;
}) {
  const cfg = POOL_CONFIG[position.pool] ?? POOL_CONFIG.genesis;
  const chxStaked = parseFloat(position.chxStaked) || 0;
  const apy = parseFloat(position.apyRate) || 0;
  const dailyCHX = chxStaked * (apy / 365 / 100);
  const monthlyCHX = dailyCHX * 30;
  const yearlyCHX = chxStaked * (apy / 100);
  const rewardsEarned = parseFloat(position.rewardsEarned ?? "0") || 0;

  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: `${cfg.color}06`,
        border: `1px solid ${cfg.color}25`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }} />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{cfg.icon}</span>
          <div>
            <div className="font-black text-white text-sm">{cfg.name}</div>
            <div className="text-xs font-mono" style={{ color: cfg.color }}>{cfg.hz} · {apy}% APY</div>
            <div className="text-xs font-mono mt-0.5" style={{ color: "#00FF88" }}>🌿 {(yearlyCHX / 144).toFixed(1)} acres/yr restored</div>
          </div>
        </div>
        <div
          className="text-xs font-mono px-2 py-1 rounded-lg"
          style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
        >
          ● ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-xs" style={{ color: "#8899AA" }}>Staked</div>
          <div className="font-black text-sm" style={{ color: cfg.color, fontFamily: "'Space Mono', monospace" }}>
            {chxStaked.toLocaleString()} CHX
          </div>
          <div className="text-xs" style={{ color: "#8899AA" }}>
            ${(chxStaked * CHX_PRICE).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-xs" style={{ color: "#8899AA" }}>Rewards Earned</div>
          <div className="font-black text-sm" style={{ color: "#00FF88", fontFamily: "'Space Mono', monospace" }}>
            {rewardsEarned.toLocaleString()} CHX
          </div>
          <div className="text-xs" style={{ color: "#8899AA" }}>
            ${(rewardsEarned * CHX_PRICE).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 mb-4" style={{ borderTop: `1px solid ${cfg.color}15` }}>
        {[
          { label: "Daily", value: `+${dailyCHX.toFixed(0)} CHX` },
          { label: "Monthly", value: `+${monthlyCHX.toFixed(0)} CHX` },
          { label: "Yearly", value: `+${yearlyCHX.toFixed(0)} CHX` },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className="text-xs font-bold" style={{ color: cfg.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
            <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {onCompound && (
        <button
          onClick={() => onCompound(position.id)}
          className="w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${cfg.color}20, ${cfg.color}10)`,
            border: `1px solid ${cfg.color}40`,
            color: cfg.color,
          }}
        >
          ⚡ Compound Now
        </button>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function GuardianDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  // Phase 46 — Sovereign Engagement Analytics
  useSovereignHeartbeat({ page: "guardian-dashboard" });
  const [referralCopied, setReferralCopied] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl("/guardian-dashboard");
    }
  }, [authLoading, isAuthenticated]);

  // Data queries
  const { data: orders, isLoading: ordersLoading } = trpc.store.getMyOrders.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: stakingData, isLoading: stakingLoading, refetch: refetchStaking } = trpc.staking.getMyPositions.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: leaderboardData } = trpc.referral.getLeaderboard.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  // Phase 46 — Live session analytics from sovereign heartbeat
  const { data: heartbeatStats } = trpc.analytics.getHeartbeatStats.useQuery(undefined, {
    refetchInterval: 30_000, // refresh every 30s
  });
  const getReferralCode = trpc.referral.getMyReferralCode.useMutation();
  const [compoundMsg, setCompoundMsg] = useState<string | null>(null);
  const compoundMutation = trpc.staking.compoundRewards.useMutation({
    onSuccess: (result) => {
      setCompoundMsg(result.message);
      refetchStaking();
      setTimeout(() => setCompoundMsg(null), 4000);
    },
    onError: (err) => {
      setCompoundMsg(err.message);
      setTimeout(() => setCompoundMsg(null), 3000);
    },
  });

  const handleCompound = (positionId: number) => {
    compoundMutation.mutate({ positionId });
  };

  // Auto-fetch referral code on mount
  useEffect(() => {
    if (isAuthenticated) {
      getReferralCode.mutate();
    }
  }, [isAuthenticated]);

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A" }}>
        <div className="text-center">
          <div className="text-4xl mb-4">☥</div>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>VERIFYING SOVEREIGN IDENTITY...</div>
        </div>
      </div>
    );
  }

  const positions = stakingData?.positions ?? [];
  const nftOrders = (orders ?? []).filter(o => o.productTier !== "subscription");

  // Aggregate stats
  const totalCHXStaked = positions.reduce((sum, p) => sum + (parseFloat(p.chxStaked) || 0), 0);
  const totalRewardsEarned = positions.reduce((sum, p) => sum + (parseFloat(p.rewardsEarned ?? "0") || 0), 0);
  const totalDailyEarnings = positions.reduce((sum, p) => {
    const chx = parseFloat(p.chxStaked) || 0;
    const apy = parseFloat(p.apyRate) || 0;
    return sum + chx * (apy / 365 / 100);
  }, 0);
  const totalNFTValue = nftOrders.reduce((sum, o) => sum + o.amountCents, 0) / 100;
  const referralCode = getReferralCode.data;
  const referralLink = referralCode ? `${window.location.origin}/?ref=${referralCode.code}` : "";

  const handleCopyReferral = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setReferralCopied(true);
      setTimeout(() => setReferralCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,184,0,0.06) 0%, transparent 60%)" }} />

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
            <span className="font-black text-white text-lg">🛡️ Guardian Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Phase 47 — Live notification bell */}
            {isAuthenticated && <NotificationBell />}
            <div
              className="text-sm font-mono px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
            >
              ● {user?.name?.split(" ")[0] ?? "Guardian"}
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-8 relative z-10">
        {/* ── HEADER ── */}
        <div className="mb-8">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>SOVEREIGN COMMAND CENTER</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Welcome back, <span style={{ color: "#FFB800" }}>{user?.name?.split(" ")[0] ?? "Guardian"}</span>
          </h1>
          <p className="text-sm" style={{ color: "#8899AA" }}>
            Your sovereign portfolio, staking positions, and referral network — all in one place. KUN FAYAKŪN × ∞
          </p>
        </div>

        {/* ── TOP STATS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="CHX STAKED"
            value={`${totalCHXStaked.toLocaleString()}`}
            sub={`$${(totalCHXStaked * CHX_PRICE).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            color="#00D4FF"
            icon="💎"
          />
          <StatCard
            label="DAILY EARNINGS"
            value={`+${totalDailyEarnings.toFixed(0)} CHX`}
            sub={`$${(totalDailyEarnings * CHX_PRICE).toFixed(4)}/day`}
            color="#00FF88"
            icon="📈"
          />
          <StatCard
            label="REWARDS EARNED"
            value={`${totalRewardsEarned.toLocaleString()} CHX`}
            sub={`$${(totalRewardsEarned * CHX_PRICE).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            color="#FFB800"
            icon="🏆"
          />
          <StatCard
            label="NFT PORTFOLIO"
            value={`$${totalNFTValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            sub={`${nftOrders.length} asset${nftOrders.length !== 1 ? "s" : ""}`}
            color="#A78BFA"
            icon="🎨"
          />
        </div>

        {/* ── SOVEREIGN SESSIONS TODAY ── */}
        <div className="rounded-2xl p-6 mb-8 relative overflow-hidden" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
          {/* Subtle Ankh watermark */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl pointer-events-none select-none" style={{ opacity: 0.04, color: "#00D4FF" }}>☥</div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00D4FF" }}>SOVEREIGN SESSIONS TODAY</div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black" style={{ color: "#00D4FF", fontFamily: "'Space Mono', monospace" }}>
                  {heartbeatStats?.today.engaged ?? 0}
                </span>
                <span className="text-sm" style={{ color: "#8899AA" }}>engaged sessions</span>
              </div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
                {heartbeatStats?.today.deepEngaged ?? 0} deep (3min+) · {heartbeatStats?.today.engagementRate ?? 0}% engagement rate
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>
                  {heartbeatStats?.today.total ?? 0}
                </div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>TOTAL PINGS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#00FF88", fontFamily: "'Space Mono', monospace" }}>
                  {heartbeatStats?.today.deepEngaged ?? 0}
                </div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>DEEP ENGAGED</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#A78BFA", fontFamily: "'Space Mono', monospace" }}>
                  {heartbeatStats?.yesterday.engaged ?? 0}
                </div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>YESTERDAY</div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#8899AA" }}>LIVE · refreshes every 30s · {heartbeatStats?.date ?? "--"}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* ── STAKING POSITIONS ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00D4FF" }}>STAKING POSITIONS</div>
                <h2 className="text-xl font-black text-white">Active Pools</h2>
              </div>
              <Link href="/staking">
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:scale-105"
                  style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                  + Stake More →
                </span>
              </Link>
            </div>

            {stakingLoading ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-2xl mb-2 animate-pulse">⏳</div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>LOADING POSITIONS...</div>
              </div>
            ) : positions.length === 0 ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-3">💎</div>
                <div className="text-sm font-bold text-white mb-2">No Active Staking Positions</div>
                <p className="text-xs mb-4" style={{ color: "#8899AA" }}>Stake CHX to earn daily compound rewards at up to 999% APY.</p>
                <Link href="/staking">
                  <span className="inline-block text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #00D4FF, #0099BB)", color: "#050B1A" }}>
                    Start Staking →
                  </span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {compoundMsg && (
                  <div
                    className="rounded-xl px-4 py-3 text-xs font-mono"
                    style={{
                      background: compoundMsg.includes("Compounded") ? "rgba(0,255,136,0.1)" : "rgba(255,68,68,0.1)",
                      border: compoundMsg.includes("Compounded") ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(255,68,68,0.3)",
                      color: compoundMsg.includes("Compounded") ? "#00FF88" : "#FF4444",
                    }}
                  >
                    {compoundMsg}
                  </div>
                )}
                {positions.map(p => (
                  <StakingCard
                    key={p.id}
                    position={p}
                    onCompound={handleCompound}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── NFT HOLDINGS ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#A78BFA" }}>NFT HOLDINGS</div>
                <h2 className="text-xl font-black text-white">My Assets</h2>
              </div>
              <Link href="/nft">
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:scale-105"
                  style={{ background: "rgba(167,139,250,0.1)", color: "#A78BFA", border: "1px solid rgba(167,139,250,0.3)" }}>
                  Browse NFTs →
                </span>
              </Link>
            </div>

            {ordersLoading ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-2xl mb-2 animate-pulse">⏳</div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>LOADING HOLDINGS...</div>
              </div>
            ) : nftOrders.length === 0 ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-3">🎨</div>
                <div className="text-sm font-bold text-white mb-2">No NFT Holdings Yet</div>
                <p className="text-xs mb-4" style={{ color: "#8899AA" }}>Mint your first sovereign NFT from the marketplace.</p>
                <Link href="/nft">
                  <span className="inline-block text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #A78BFA, #7C3AED)", color: "white" }}>
                    Visit NFT Marketplace →
                  </span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {nftOrders.map(o => <NFTCard key={o.id} order={o} />)}
              </div>
            )}
          </div>
        </div>

        {/* ── REFERRAL COMMISSIONS ── */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: "linear-gradient(90deg, transparent, #00FF88, transparent)" }} />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00FF88" }}>REFERRAL COMMISSIONS</div>
              <h2 className="text-xl font-black text-white mb-1">Your Sovereign Link</h2>
              <p className="text-xs" style={{ color: "#8899AA" }}>
                Every Guardian you bring earns you <span style={{ color: "#00FF88" }}>reward tokens</span>. Share your code to grow the empire.
              </p>
            </div>

            {getReferralCode.isPending ? (
              <div className="text-xs font-mono animate-pulse" style={{ color: "#8899AA" }}>GENERATING CODE...</div>
            ) : referralCode ? (
              <div className="flex flex-col gap-3 min-w-0 md:min-w-[320px]">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Clicks", value: referralCode.clicks ?? 0, color: "#00D4FF" },
                    { label: "Conversions", value: referralCode.conversions ?? 0, color: "#FFB800" },
                    { label: "Reward Tokens", value: referralCode.rewardTokens ?? 0, color: "#00FF88" },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="text-lg font-black" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Code + copy */}
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 rounded-xl px-3 py-2 text-sm font-mono truncate"
                    style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}
                  >
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopyReferral}
                    className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                    style={{
                      background: referralCopied ? "rgba(0,255,136,0.2)" : "rgba(0,255,136,0.1)",
                      border: "1px solid rgba(0,255,136,0.4)",
                      color: "#00FF88",
                    }}
                  >
                    {referralCopied ? "✓ Copied!" : "🔗 Copy"}
                  </button>
                </div>
                {/* Share buttons */}
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just joined the ScrollVerse Empire as a Guardian. Join me: ${referralLink} #ScrollVerse #LONDC #Polygon`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-bold py-2 rounded-xl transition-all hover:scale-105"
                    style={{ background: "rgba(29,161,242,0.1)", border: "1px solid rgba(29,161,242,0.3)", color: "#1DA1F2" }}
                  >
                    𝕏 Share
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Join the ScrollVerse Empire — KUN FAYAKŪN × ∞")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-bold py-2 rounded-xl transition-all hover:scale-105"
                    style={{ background: "rgba(0,136,204,0.1)", border: "1px solid rgba(0,136,204,0.3)", color: "#0088CC" }}
                  >
                    ✈ Telegram
                  </a>
                </div>
              </div>
            ) : (
              <button
                onClick={() => getReferralCode.mutate()}
                className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #00FF88, #00CC66)", color: "#050B1A" }}
              >
                Generate My Sovereign Code
              </button>
            )}
          </div>
        </div>

        {/* ── REFERRAL LEADERBOARD ── */}
        {leaderboardData && leaderboardData.length > 0 && (
          <div
            className="rounded-2xl p-6 mb-8"
            style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.2)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#FFB800" }}>SOVEREIGN REFERRAL NETWORK</div>
                <h2 className="text-xl font-black text-white">Guardian Leaderboard</h2>
              </div>
              <div className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                TOP {Math.min(leaderboardData.length, 10)}
              </div>
            </div>
            <div className="space-y-2">
              {leaderboardData.slice(0, 10).map((entry, idx) => {
                const medals = ["🥇", "🥈", "🥉"];
                const medal = medals[idx] ?? `#${idx + 1}`;
                const isCurrentUser = referralCode?.code === entry.code;
                const rowColor = isCurrentUser ? "#FFB800" : idx < 3 ? ["#FFD700", "#C0C0C0", "#CD7F32"][idx] : "#8899AA";
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: isCurrentUser ? "rgba(255,184,0,0.08)" : "rgba(255,255,255,0.02)",
                      border: isCurrentUser ? "1px solid rgba(255,184,0,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="text-lg w-8 text-center flex-shrink-0">{medal}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: isCurrentUser ? "#FFB800" : "white" }}>
                        {entry.creatorName ?? "Guardian"}
                        {isCurrentUser && <span className="ml-2 text-xs font-mono" style={{ color: "#FFB800" }}>YOU</span>}
                      </div>
                      <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
                        {entry.conversions ?? 0} conversions · {entry.clicks ?? 0} clicks
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-sm" style={{ color: rowColor, fontFamily: "'Space Mono', monospace" }}>
                        {entry.rewardTokens ?? 0}
                      </div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>$LONDC</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── QUICK LINKS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "📈 IPO Portal", href: "/ipo", color: "#FFB800" },
            { label: "🏦 Sovereign Bank", href: "/sovereign-bank", color: "#00D4FF" },
            { label: "🎵 DSP Intelligence", href: "/dsp-intelligence", color: "#A78BFA" },
            { label: "🏆 NFT Marketplace", href: "/nft", color: "#00FF88" },
          ].map(l => (
            <Link key={l.href} href={l.href}>
              <div
                className="rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-[1.03]"
                style={{ background: `${l.color}08`, border: `1px solid ${l.color}25` }}
              >
                <div className="text-sm font-bold" style={{ color: l.color }}>{l.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div className="text-center py-6" style={{ borderTop: "1px solid rgba(255,184,0,0.1)" }}>
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            GUARDIAN DASHBOARD × SCROLLVERSE TRINITY × KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
