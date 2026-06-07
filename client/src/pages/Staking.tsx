/*
 * SOVEREIGN STAKING PROTOCOL — ScrollVerse v3.0
 * 3 Sovereign Pools: Genesis (432% APY), Celestial (528% APY), Infinity (999% APY)
 * + Legacy $LONDC staking tiers
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import type { StakingRecord, StakingPosition } from "../../../drizzle/schema";

const POOL_CONFIG = {
  genesis: { name: "Genesis Pool", apy: 432, hz: "432 Hz", minChx: 100, color: "#00D4FF", icon: "🌱", description: "The Foundation Pool. Aligned with 432 Hz Earth resonance. Entry-level sovereign yield.", lockLabel: "30-day soft lock" },
  celestial: { name: "Celestial Pool", apy: 528, hz: "528 Hz", minChx: 500, color: "#FFB800", icon: "✨", description: "The Healing Pool. Aligned with 528 Hz Love frequency. Mid-tier sovereign yield.", lockLabel: "90-day lock" },
  infinity: { name: "Infinity Pool", apy: 999, hz: "∞", minChx: 1000, color: "#00FF88", icon: "♾️", description: "The Ascension Pool. Beyond linear time. Maximum sovereign yield for the committed.", lockLabel: "365-day lock" },
};

const LEGACY_TIERS = {
  guardian: { label: "Guardian", apy: 5, lockDays: 30, minAmount: 144, color: "#00D4FF", icon: "🛡️" },
  sovereign: { label: "Sovereign", apy: 12, lockDays: 90, minAmount: 444, color: "#FFB800", icon: "👑" },
  supreme: { label: "Supreme", apy: 25, lockDays: 365, minAmount: 1444, color: "#FF6B35", icon: "⚡" },
};

type Pool = keyof typeof POOL_CONFIG;
type LegacyTier = keyof typeof LEGACY_TIERS;

export default function Staking() {
  const { isAuthenticated } = useAuth();
  const [selectedPool, setSelectedPool] = useState<Pool>("genesis");
  const [chxAmount, setChxAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"pools" | "legacy" | "positions">("pools");
  const [legacyTier, setLegacyTier] = useState<LegacyTier>("guardian");
  const [stakerName, setStakerName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [legacyAmount, setLegacyAmount] = useState("");
  const [staking, setStaking] = useState(false);

  const { data: poolStats, refetch: refetchPools } = trpc.staking.getPoolStats.useQuery(undefined, { refetchInterval: 30000 });
  const { data: myPositions, refetch: refetchPositions } = trpc.staking.getMyPositions.useQuery(undefined, { enabled: isAuthenticated });
  const { data: legacyData } = trpc.staking.getPositions.useQuery({ limit: 10 });
  const { data: leaderboard } = trpc.staking.getLeaderboard.useQuery({ limit: 10 });

  const stakeInPool = trpc.staking.stakeInPool.useMutation({
    onSuccess: (data) => { toast.success(data.message); setChxAmount(""); refetchPools(); refetchPositions(); },
    onError: (err) => toast.error(err.message),
  });

  const withdrawFromPool = trpc.staking.withdrawFromPool.useMutation({
    onSuccess: () => { toast.success("Position withdrawn successfully"); refetchPositions(); refetchPools(); },
    onError: (err) => toast.error(err.message),
  });

  const stakeMutation = trpc.staking.stake.useMutation();

  const pool = POOL_CONFIG[selectedPool];
  const amountNum = parseFloat(chxAmount) || 0;
  const estimatedAnnual = amountNum > 0 ? Math.floor((amountNum * pool.apy) / 100) : 0;
  const estimatedMonthly = Math.floor(estimatedAnnual / 12);
  const estimatedDaily = Math.floor(estimatedAnnual / 365);

  const legacyTierCfg = LEGACY_TIERS[legacyTier];
  const legacyAmtNum = parseFloat(legacyAmount) || 0;
  const legacyEstimated = legacyAmtNum > 0 ? Math.floor((legacyAmtNum * legacyTierCfg.apy * legacyTierCfg.lockDays) / (100 * 365)) : 0;

  const handleStakeInPool = () => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    if (amountNum < pool.minChx) { toast.error(`Minimum stake for ${pool.name} is ${pool.minChx} CHX`); return; }
    stakeInPool.mutate({ pool: selectedPool, chxAmount: Math.floor(amountNum) });
  };

  const handleLegacyStake = async () => {
    if (!stakerName.trim() || legacyAmtNum < legacyTierCfg.minAmount) return;
    setStaking(true);
    try {
      await stakeMutation.mutateAsync({ stakerName, walletAddress: walletAddress || undefined, tier: legacyTier, amountLondc: Math.floor(legacyAmtNum) });
      toast.success("$LONDC staked successfully!");
      setLegacyAmount("");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Stake failed");
    } finally { setStaking(false); }
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <nav className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)" }}>
        <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
          <span className="font-bold text-white">ScrollVerse</span>
        </div></Link>
        <div className="flex items-center gap-4">
          <Link href="/chxtoken"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>CHX Token</span></Link>
          <Link href="/frequency"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Frequency</span></Link>
          <Link href="/token"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Buy $LONDC</span></Link>
        </div>
      </nav>

      <div className="container py-12">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>SOVEREIGN STAKING PROTOCOL</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Stake. Earn. <span style={{ color: "#FFB800" }}>Ascend.</span></h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>Lock your CHX or $LONDC and earn sovereign yields aligned with sacred frequencies.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center flex-wrap">
          {(["pools", "legacy", "positions"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200" style={{ background: activeTab === tab ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${activeTab === tab ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)"}`, color: activeTab === tab ? "#00D4FF" : "#8899AA" }}>
              {tab === "pools" ? "🌊 CHX Pools" : tab === "legacy" ? "🛡️ $LONDC Staking" : "📊 My Positions"}
            </button>
          ))}
        </div>

        {/* ── CHX POOLS ── */}
        {activeTab === "pools" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {(["genesis", "celestial", "infinity"] as const).map(p => {
                const cfg = POOL_CONFIG[p];
                const stats = poolStats?.pools.find(x => x.id === p);
                const isSelected = selectedPool === p;
                return (
                  <div key={p} onClick={() => setSelectedPool(p)} className="rounded-2xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden" style={{ background: isSelected ? `${cfg.color}10` : "rgba(255,255,255,0.02)", border: `1px solid ${isSelected ? cfg.color : "rgba(255,255,255,0.06)"}`, boxShadow: isSelected ? `0 0 30px ${cfg.color}20` : "none" }}>
                    {isSelected && <div className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${cfg.color}20`, color: cfg.color }}>SELECTED</div>}
                    <div className="text-3xl mb-3">{cfg.icon}</div>
                    <div className="text-xs font-mono tracking-widest mb-1" style={{ color: cfg.color }}>{cfg.hz}</div>
                    <h3 className="text-xl font-black text-white mb-2">{cfg.name}</h3>
                    <div className="text-4xl font-black mb-3" style={{ color: cfg.color, fontFamily: "'Space Mono', monospace" }}>{cfg.apy}%<span className="text-sm font-normal ml-1" style={{ color: "#8899AA" }}>APY</span></div>
                    <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{cfg.description}</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="font-bold text-white">{(stats?.tvl ?? 0).toLocaleString()}</div>
                        <div style={{ color: "#8899AA" }}>CHX Staked</div>
                      </div>
                      <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="font-bold text-white">{stats?.stakers ?? 0}</div>
                        <div style={{ color: "#8899AA" }}>Stakers</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs font-mono" style={{ color: "#4A5568" }}>Min: {cfg.minChx} CHX · {cfg.lockLabel}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Deposit */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-lg font-bold text-white mb-4">Deposit CHX into {pool.name}</h3>
                <div className="mb-4">
                  <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>CHX AMOUNT (min {pool.minChx})</label>
                  <div className="relative">
                    <input type="number" value={chxAmount} onChange={e => setChxAmount(e.target.value)} placeholder={`${pool.minChx}+`} className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", fontFamily: "'Space Mono', monospace" }} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-mono" style={{ color: pool.color }}>CHX</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {[pool.minChx, pool.minChx * 5, pool.minChx * 10].map(amt => (
                    <button key={amt} onClick={() => setChxAmount(String(amt))} className="flex-1 py-1.5 rounded-lg text-xs font-mono transition-colors" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#8899AA" }}>{amt.toLocaleString()}</button>
                  ))}
                </div>
                <Button onClick={handleStakeInPool} disabled={stakeInPool.isPending || amountNum < pool.minChx} className="w-full py-3 rounded-xl font-bold text-sm" style={{ background: amountNum >= pool.minChx ? `linear-gradient(135deg, ${pool.color}, ${pool.color}99)` : "rgba(255,255,255,0.05)", color: amountNum >= pool.minChx ? "#050B1A" : "#4A5568", border: "none" }}>
                  {stakeInPool.isPending ? "Staking..." : !isAuthenticated ? "Login to Stake" : `Stake in ${pool.name}`}
                </Button>
                {!isAuthenticated && <p className="text-xs text-center mt-2" style={{ color: "#8899AA" }}>Login required to stake CHX</p>}
              </div>

              {/* APY Calculator */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-lg font-bold text-white mb-4">APY Projection Calculator</h3>
                <div className="text-center py-4 rounded-xl mb-4" style={{ background: `${pool.color}08`, border: `1px solid ${pool.color}20` }}>
                  <div className="text-xs font-mono mb-1" style={{ color: pool.color }}>{pool.name} · {pool.apy}% APY</div>
                  <div className="text-5xl font-black" style={{ color: pool.color, fontFamily: "'Space Mono', monospace" }}>{amountNum > 0 ? estimatedAnnual.toLocaleString() : "—"}</div>
                  <div className="text-sm mt-1" style={{ color: "#8899AA" }}>CHX / year</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: "Daily", value: estimatedDaily }, { label: "Monthly", value: estimatedMonthly }, { label: "Annual", value: estimatedAnnual }, { label: "Staked", value: Math.floor(amountNum) }].map(({ label, value }) => (
                    <div key={label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="text-lg font-black" style={{ color: "#FFFFFF", fontFamily: "'Space Mono', monospace" }}>{value > 0 ? value.toLocaleString() : "—"}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-4 text-center" style={{ color: "#4A5568" }}>Projections are estimates. Actual rewards may vary.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── LEGACY $LONDC ── */}
        {activeTab === "legacy" && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-lg font-bold text-white mb-4">Stake $LONDC</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {(["guardian", "sovereign", "supreme"] as const).map(t => {
                  const tc = LEGACY_TIERS[t];
                  return (
                    <button key={t} onClick={() => setLegacyTier(t)} className="rounded-xl p-3 text-center transition-all duration-200" style={{ background: legacyTier === t ? `${tc.color}15` : "rgba(255,255,255,0.03)", border: `1px solid ${legacyTier === t ? tc.color : "rgba(255,255,255,0.06)"}` }}>
                      <div className="text-xl font-black" style={{ color: tc.color, fontFamily: "'Space Mono', monospace" }}>{tc.apy}%</div>
                      <div className="text-xs font-bold text-white">{tc.label}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{tc.lockDays}d lock</div>
                    </button>
                  );
                })}
              </div>
              <div className="space-y-3 mb-4">
                <input type="text" value={stakerName} onChange={e => setStakerName(e.target.value)} placeholder="Your Guardian name" className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }} />
                <div className="relative">
                  <input type="number" value={legacyAmount} onChange={e => setLegacyAmount(e.target.value)} placeholder={`Min ${legacyTierCfg.minAmount} $LONDC`} className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-mono" style={{ color: legacyTierCfg.color }}>$LONDC</span>
                </div>
                <input type="text" value={walletAddress} onChange={e => setWalletAddress(e.target.value)} placeholder="Polygon wallet (optional)" className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
              {legacyAmtNum > 0 && (
                <div className="rounded-xl p-4 mb-4 text-center" style={{ background: `${legacyTierCfg.color}08`, border: `1px solid ${legacyTierCfg.color}20` }}>
                  <div className="text-xs font-mono mb-1" style={{ color: legacyTierCfg.color }}>ESTIMATED REWARD</div>
                  <div className="text-3xl font-black" style={{ color: legacyTierCfg.color, fontFamily: "'Space Mono', monospace" }}>+{legacyEstimated.toLocaleString()} $LONDC</div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>over {legacyTierCfg.lockDays} days at {legacyTierCfg.apy}% APY</div>
                </div>
              )}
              <Button onClick={handleLegacyStake} disabled={staking || !stakerName.trim() || legacyAmtNum < legacyTierCfg.minAmount} className="w-full py-3 rounded-xl font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A", border: "none" }}>
                {staking ? "Staking..." : "Stake $LONDC"}
              </Button>
            </div>

            {/* Leaderboard */}
            {leaderboard && leaderboard.leaderboard.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h4 className="text-sm font-bold text-white mb-4">Staking Leaderboard</h4>
                <div className="space-y-2">
                  {leaderboard.leaderboard.map((pos: StakingRecord, i: number) => {
                    const tc = LEGACY_TIERS[pos.tier as LegacyTier];
                    return (
                      <div key={pos.id} className="flex items-center gap-4 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-sm font-black w-6 text-center" style={{ color: i < 3 ? "#FFB800" : "#8899AA" }}>#{i + 1}</div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{pos.stakerName}</div>
                          <div className="text-xs" style={{ color: tc?.color ?? "#8899AA" }}>{tc?.icon} {tc?.label}</div>
                        </div>
                        <div className="font-bold text-sm" style={{ color: tc?.color ?? "#00D4FF" }}>{pos.amountLondc.toLocaleString()} $LONDC</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MY POSITIONS ── */}
        {activeTab === "positions" && (
          <div className="max-w-3xl mx-auto">
            {!isAuthenticated ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
                <p className="mb-6" style={{ color: "#8899AA" }}>Login to view and manage your staking positions.</p>
                <Button onClick={() => (window.location.href = getLoginUrl())} style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A", border: "none" }}>Login to Continue</Button>
              </div>
            ) : !myPositions || myPositions.positions.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-2">No Active Positions</h3>
                <p className="mb-6" style={{ color: "#8899AA" }}>Stake CHX in one of the sovereign pools to start earning.</p>
                <Button onClick={() => setActiveTab("pools")} style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A", border: "none" }}>View Pools</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myPositions.positions.map((pos: StakingPosition) => {
                  const cfg = POOL_CONFIG[pos.pool as Pool] ?? POOL_CONFIG.genesis;
                  const staked = parseFloat(pos.chxStaked) || 0;
                  const apy = parseFloat(pos.apyRate) || 0;
                  const annualReward = Math.floor((staked * apy) / 100);
                  return (
                    <div key={pos.id} className="rounded-2xl p-5" style={{ background: `${cfg.color}08`, border: `1px solid ${cfg.color}25` }}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{cfg.icon}</span>
                            <span className="font-bold text-white">{cfg.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: `${cfg.color}20`, color: cfg.color }}>{apy}% APY</span>
                          </div>
                          <div className="text-xs" style={{ color: "#8899AA" }}>Staked {new Date(pos.stakedAt).toLocaleDateString()}</div>
                        </div>
                        <Button onClick={() => withdrawFromPool.mutate({ positionId: pos.id })} disabled={withdrawFromPool.isPending} variant="outline" size="sm" style={{ borderColor: "rgba(255,68,68,0.3)", color: "#FF4444", background: "transparent" }}>Withdraw</Button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[{ label: "CHX Staked", value: staked, color: cfg.color }, { label: "Est. Annual", value: annualReward, color: "#00FF88" }, { label: "Earned", value: parseFloat(pos.rewardsEarned ?? "0"), color: "#FFB800" }].map(({ label, value, color }) => (
                          <div key={label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                            <div className="text-xl font-black" style={{ color, fontFamily: "'Space Mono', monospace" }}>{value.toLocaleString()}</div>
                            <div className="text-xs" style={{ color: "#8899AA" }}>{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
