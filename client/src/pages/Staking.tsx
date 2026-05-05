/*
 * GUARDIAN STAKING DASHBOARD — ScrollVerse v3.0
 * Multi-Tier: Guardian 5% / Sovereign 12% / Supreme 25% APY
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const TIER_CONFIG = {
  guardian: { label: "Guardian", apy: "5%", apyBp: 500, lockDays: 30, minAmount: 144, color: "#00D4FF", icon: "🛡️", description: "Entry-level sovereign staking. Lock 144+ $LONDC for 30 days." },
  sovereign: { label: "Sovereign", apy: "12%", apyBp: 1200, lockDays: 90, minAmount: 444, color: "#FFB800", icon: "👑", description: "Mid-tier sovereign staking. Lock 444+ $LONDC for 90 days." },
  supreme: { label: "Supreme", apy: "25%", apyBp: 2500, lockDays: 365, minAmount: 1444, color: "#FF6B35", icon: "⚡", description: "Maximum sovereign staking. Lock 1,444+ $LONDC for 365 days." },
};

type Tier = keyof typeof TIER_CONFIG;

export default function Staking() {
  const [selectedTier, setSelectedTier] = useState<Tier>("guardian");
  const [stakerName, setStakerName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [staking, setStaking] = useState(false);
  const [stakeResult, setStakeResult] = useState<{ estimatedReward: number; unlocksAt: Date; message: string } | null>(null);

  const { data: positions } = trpc.staking.getPositions.useQuery({ limit: 20 }, { refetchInterval: 10000 });
  const { data: leaderboard } = trpc.staking.getLeaderboard.useQuery({ limit: 10 });
  const stakeMutation = trpc.staking.stake.useMutation();

  const tier = TIER_CONFIG[selectedTier];
  const amountNum = parseFloat(amount) || 0;
  const estimatedReward = amountNum > 0 ? Math.floor((amountNum * tier.apyBp * tier.lockDays) / (10000 * 365)) : 0;

  const handleStake = async () => {
    if (!stakerName.trim() || amountNum < tier.minAmount) return;
    setStaking(true);
    try {
      const result = await stakeMutation.mutateAsync({
        stakerName,
        walletAddress: walletAddress || undefined,
        tier: selectedTier,
        amountLondc: Math.floor(amountNum),
      });
      setStakeResult({ estimatedReward: result.estimatedReward, unlocksAt: result.unlocksAt, message: result.message });
    } catch (e) {
      console.error(e);
    } finally {
      setStaking(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(5,11,26,0.95)" }}>
        <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
          <span className="font-bold text-white">ScrollVerse</span>
        </div></Link>
        <div className="flex items-center gap-4">
          <Link href="/frequency"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Frequency</span></Link>
          <Link href="/governance"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>DAO</span></Link>
          <Link href="/token"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Buy $LONDC</span></Link>
        </div>
      </nav>

      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>GUARDIAN STAKING PROTOCOL</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Stake. Earn. <span style={{ color: "#FFB800" }}>Ascend.</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            Lock your $LONDC and earn sovereign yields. The longer you hold, the greater your empire grows.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="rounded-xl p-6 text-center" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
            <div className="text-3xl font-black" style={{ color: "#00D4FF" }}>{(positions?.totalStaked ?? 0).toLocaleString()}</div>
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>$LONDC Total Staked</div>
          </div>
          <div className="rounded-xl p-6 text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
            <div className="text-3xl font-black" style={{ color: "#FFB800" }}>{positions?.activeStakers ?? 0}</div>
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Active Stakers</div>
          </div>
          <div className="rounded-xl p-6 text-center" style={{ background: "rgba(255,107,53,0.05)", border: "1px solid rgba(255,107,53,0.2)" }}>
            <div className="text-3xl font-black" style={{ color: "#FF6B35" }}>25%</div>
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Max APY (Supreme)</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Tier Selection + Staking Form */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Choose Your Tier</h2>

            <div className="space-y-4 mb-8">
              {(Object.keys(TIER_CONFIG) as Tier[]).map(t => {
                const tc = TIER_CONFIG[t];
                const isSelected = selectedTier === t;
                return (
                  <div
                    key={t}
                    onClick={() => setSelectedTier(t)}
                    className="rounded-xl p-5 cursor-pointer transition-all duration-300"
                    style={{
                      background: isSelected ? `${tc.color}10` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isSelected ? tc.color + "60" : "rgba(255,255,255,0.05)"}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{tc.icon}</span>
                        <div>
                          <div className="font-bold text-white">{tc.label} Tier</div>
                          <div className="text-xs" style={{ color: "#8899AA" }}>Min {tc.minAmount.toLocaleString()} $LONDC · {tc.lockDays} days</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black" style={{ color: tc.color }}>{tc.apy}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>APY</div>
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: "#8899AA" }}>{tc.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Staking Form */}
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <h3 className="font-bold text-white mb-4">Stake $LONDC</h3>

              {stakeResult ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">🎉</div>
                  <div className="font-bold text-white text-lg mb-2">Stake Confirmed!</div>
                  <div className="text-sm mb-1" style={{ color: tier.color }}>
                    Estimated Reward: {stakeResult.estimatedReward.toLocaleString()} $LONDC
                  </div>
                  <div className="text-xs mb-4" style={{ color: "#8899AA" }}>
                    Unlocks: {new Date(stakeResult.unlocksAt).toLocaleDateString()}
                  </div>
                  <Button onClick={() => setStakeResult(null)} variant="outline" style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF" }}>
                    Stake More
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>GUARDIAN NAME</label>
                    <input type="text" value={stakerName} onChange={e => setStakerName(e.target.value)} placeholder="Your name..." className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>WALLET ADDRESS (OPTIONAL)</label>
                    <input type="text" value={walletAddress} onChange={e => setWalletAddress(e.target.value)} placeholder="0x..." className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
                  </div>
                  <div>
                    <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>AMOUNT ($LONDC)</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={`Min ${tier.minAmount}`} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
                  </div>

                  {amountNum > 0 && (
                    <div className="rounded-lg p-3 text-sm" style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}30` }}>
                      <div className="flex justify-between">
                        <span style={{ color: "#8899AA" }}>Estimated Reward</span>
                        <span style={{ color: tier.color }}>{estimatedReward.toLocaleString()} $LONDC</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span style={{ color: "#8899AA" }}>Lock Period</span>
                        <span className="text-white">{tier.lockDays} days</span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleStake}
                    disabled={staking || !stakerName.trim() || amountNum < tier.minAmount}
                    className="w-full py-4 font-bold rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}88)`, color: "#050B1A" }}
                  >
                    {staking ? "STAKING..." : `STAKE ${tier.label.toUpperCase()}`}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Leaderboard + Active Positions */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Staking Leaderboard</h2>
            <div className="space-y-3 mb-8">
              {leaderboard?.leaderboard?.length ? (
                leaderboard.leaderboard.map((pos: any, i: any) => {
                  const tc = TIER_CONFIG[pos.tier as Tier];
                  return (
                    <div key={pos.id} className="flex items-center gap-4 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="text-lg font-black w-8 text-center" style={{ color: i < 3 ? "#FFB800" : "#8899AA" }}>#{i + 1}</div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{pos.stakerName}</div>
                        <div className="text-xs" style={{ color: tc?.color ?? "#8899AA" }}>{tc?.icon} {tc?.label} · {tc?.apy} APY</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: tc?.color ?? "#00D4FF" }}>{pos.amountLondc.toLocaleString()}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>$LONDC</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-sm" style={{ color: "#8899AA" }}>
                  Be the first Guardian to stake. The empire awaits.
                </div>
              )}
            </div>

            {/* Recent Positions */}
            <h3 className="text-sm font-mono mb-3" style={{ color: "#8899AA" }}>RECENT POSITIONS</h3>
            <div className="space-y-2">
              {positions?.positions?.slice(0, 5).map((pos: any) => {
                const tc = TIER_CONFIG[pos.tier as Tier];
                return (
                  <div key={pos.id} className="flex items-center justify-between px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: tc?.color ?? "#00D4FF" }} />
                      <span className="text-sm text-white">{pos.stakerName}</span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: tc?.color ?? "#00D4FF" }}>+{pos.amountLondc.toLocaleString()} $LONDC</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
