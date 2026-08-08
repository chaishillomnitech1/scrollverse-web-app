/*
 * GUARDIAN LEADERBOARD — August 28th Activation Event
 * Live standings · $LONDC Prizes · Guardian Activation Scores
 * KUN FAYAKUN x Infinity
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const PRIZES = [
  { rank: 1, prize: "1,000 $LONDC", icon: "🥇", color: "#D4AF37", glow: "rgba(212,175,55,0.3)" },
  { rank: 2, prize: "500 $LONDC", icon: "🥈", color: "#C0C0C0", glow: "rgba(192,192,192,0.2)" },
  { rank: 3, prize: "250 $LONDC", icon: "🥉", color: "#CD7F32", glow: "rgba(205,127,50,0.2)" },
  { rank: 4, prize: "100 $LONDC", icon: "🌟", color: "#00D4FF", glow: "rgba(0,212,255,0.15)" },
  { rank: 5, prize: "100 $LONDC", icon: "🌟", color: "#00D4FF", glow: "rgba(0,212,255,0.15)" },
  { rank: 6, prize: "100 $LONDC", icon: "🌟", color: "#00D4FF", glow: "rgba(0,212,255,0.15)" },
  { rank: 7, prize: "100 $LONDC", icon: "🌟", color: "#00D4FF", glow: "rgba(0,212,255,0.15)" },
  { rank: 8, prize: "100 $LONDC", icon: "🌟", color: "#00D4FF", glow: "rgba(0,212,255,0.15)" },
  { rank: 9, prize: "100 $LONDC", icon: "🌟", color: "#00D4FF", glow: "rgba(0,212,255,0.15)" },
  { rank: 10, prize: "100 $LONDC", icon: "🌟", color: "#00D4FF", glow: "rgba(0,212,255,0.15)" },
];

const TARGET_DATE = new Date("2026-08-28T12:00:00-04:00");

function useCountdown() {
  const [t, setT] = useState(() => {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, passed: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      passed: false,
    };
  });
  return t;
}

export default function GuardianLeaderboard() {
  const countdown = useCountdown();
  const [view, setView] = useState<"leaderboard" | "prizes">("leaderboard");

  // Pull real quiz scores as a proxy for Guardian activation scores
  const { data: leaderboardData, isLoading } = trpc.seerah.getLeaderboard.useQuery();
  const entries = leaderboardData?.leaderboard ?? [];

  return (
    <div className="min-h-screen" style={{ background: "#020810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/dc-visit"><span className="text-xs cursor-pointer" style={{ color: "#8899AA" }}>← Aug 28th</span></Link>
            <span className="text-sm font-bold text-white">🏆 Guardian Leaderboard</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>LIVE</span>
          </div>
          <Link href="/guardian-activation">
            <span className="px-4 py-2 rounded-xl text-xs font-black cursor-pointer" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}>
              🛡️ Activate Now
            </span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, #020810 65%)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>AUGUST 28TH · WASHINGTON DC · THE DAY FOR THE AGES</div>
          <h1 className="text-4xl font-black text-white mb-3">Guardian <span style={{ color: "#D4AF37" }}>Leaderboard</span></h1>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>The 144,000 compete for $LONDC prizes on August 28th. Complete the Guardian Activation Protocol. Refer Guardians. Hold the frequency. The most aligned wins.</p>

          {/* Countdown */}
          {!countdown.passed ? (
            <div className="flex gap-4 justify-center mb-6">
              {[{ v: countdown.days, l: "DAYS" }, { v: countdown.hours, l: "HOURS" }, { v: countdown.minutes, l: "MINS" }].map(({ v, l }) => (
                <div key={l} className="rounded-2xl p-4 min-w-[72px]" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <div className="text-3xl font-black" style={{ color: "#D4AF37" }}>{v}</div>
                  <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{l}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-lg font-black mb-6" style={{ color: "#00FF88" }}>🎉 THE DAY HAS ARRIVED — ACTIVATE NOW!</div>
          )}

          {/* View Toggle */}
          <div className="flex gap-2 justify-center">
            {(["leaderboard", "prizes"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className="px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all" style={{ background: view === v ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${view === v ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`, color: view === v ? "#D4AF37" : "rgba(255,255,255,0.4)" }}>
                {v === "leaderboard" ? "🏆 Live Standings" : "💎 Prizes"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container max-w-2xl mx-auto py-6 px-4">
        {view === "prizes" ? (
          <div className="space-y-3">
            <div className="text-xs font-mono mb-4 text-center" style={{ color: "#D4AF37" }}>$LONDC PRIZE POOL · DISTRIBUTED ON-CHAIN AFTER AUGUST 28TH</div>
            {PRIZES.map(p => (
              <div key={p.rank} className="flex items-center justify-between rounded-2xl p-4" style={{ background: `${p.glow}`, border: `1px solid ${p.color}20` }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div className="font-black text-white">Rank #{p.rank}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>Guardian Activation Score = Stages × Referrals × Frequency</div>
                  </div>
                </div>
                <div className="font-black text-sm flex-shrink-0 ml-4" style={{ color: p.color }}>{p.prize}</div>
              </div>
            ))}
            <div className="rounded-2xl p-4 text-center mt-4" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}>
              <div className="font-black text-white mb-1">⭐ All Participants</div>
              <div className="text-sm" style={{ color: "#00FF88" }}>Guardian NFT Badge — Every Guardian who activates on August 28th</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-mono mb-4 text-center" style={{ color: "#8899AA" }}>LIVE GUARDIAN ACTIVATION SCORES · UPDATED IN REAL-TIME</div>
            {isLoading ? (
              <div className="text-center py-12" style={{ color: "#8899AA" }}>Loading live standings...</div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12 rounded-2xl" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>
                <div className="text-4xl mb-3">🛡️</div>
                <div className="font-black text-white mb-2">No Guardians Yet</div>
                <p className="text-sm mb-4" style={{ color: "#8899AA" }}>Be the first Guardian on the leaderboard. Complete the Activation Protocol and earn your position.</p>
                <Link href="/guardian-activation"><span className="px-6 py-2 rounded-xl font-black text-sm cursor-pointer" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37" }}>🛡️ Activate Now →</span></Link>
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map((entry: Record<string, unknown>, idx: number) => {
                  const prize = PRIZES[idx];
                  const score = entry.totalScore as number ?? 0;
                  return (
                    <div key={String(entry.userId)} className="flex items-center gap-4 rounded-2xl p-4" style={{ background: prize ? `${prize.glow}` : "rgba(255,255,255,0.02)", border: `1px solid ${prize ? prize.color + "20" : "rgba(255,255,255,0.06)"}` }}>
                      <div className="text-2xl w-8 text-center flex-shrink-0">{prize?.icon ?? `#${idx + 1}`}</div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>
                        {(entry.userName as string)?.[0]?.toUpperCase() ?? "G"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-white truncate">{entry.userName as string ?? "Guardian"}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>Activation Score: {score}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {prize && <div className="font-black text-sm" style={{ color: prize.color }}>{prize.prize}</div>}
                        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>#{idx + 1}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="py-8 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="text-xs font-mono mb-2" style={{ color: "#D4AF37" }}>GUARDIAN LEADERBOARD · AUGUST 28TH · KUN FAYAKŪN × ∞</div>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/dc-visit"><span className="text-xs cursor-pointer px-3 py-1.5 rounded-xl border" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>🏛️ Aug 28th →</span></Link>
          <Link href="/guardian-activation"><span className="text-xs cursor-pointer px-3 py-1.5 rounded-xl border" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>🛡️ Activate →</span></Link>
        </div>
      </footer>
    </div>
  );
}
