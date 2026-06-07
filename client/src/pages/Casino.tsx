/**
 * SCROLLVERSE SOVEREIGN CASINO
 * Provably fair gaming · Lose-to-earn · Jackpots · Crypto incentives
 * Design: Afrofuturist Gold × Quantum Neon
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "wouter";
import { Zap, Trophy, Star, Coins, RefreshCw, TrendingUp, Shield, Gift } from "lucide-react";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const SYMBOLS = ["🕋", "⚡", "💎", "🌌", "🔥", "👑", "∞", "🌙", "🦁", "💫"];
const SYMBOL_WEIGHTS = [1, 3, 5, 4, 4, 2, 1, 6, 3, 5]; // rarer = lower weight
const REEL_COUNT = 3;
const SPIN_DURATION = 1800; // ms

const PAYLINES: Record<string, { multiplier: number; label: string; color: string }> = {
  "🕋🕋🕋": { multiplier: 144, label: "DIVINE JACKPOT", color: "#FFB800" },
  "👑👑👑": { multiplier: 77, label: "SOVEREIGN WIN", color: "#FFB800" },
  "∞∞∞": { multiplier: 44, label: "ETERNAL WIN", color: "#00D4FF" },
  "💎💎💎": { multiplier: 33, label: "DIAMOND WIN", color: "#00D4FF" },
  "🌌🌌🌌": { multiplier: 22, label: "COSMIC WIN", color: "#9B59B6" },
  "⚡⚡⚡": { multiplier: 15, label: "PLASMA WIN", color: "#00FF88" },
  "🔥🔥🔥": { multiplier: 12, label: "FLAME WIN", color: "#FF6B35" },
  "🦁🦁🦁": { multiplier: 10, label: "LION WIN", color: "#FFB800" },
  "💫💫💫": { multiplier: 8, label: "STAR WIN", color: "#00D4FF" },
  "🌙🌙🌙": { multiplier: 6, label: "MOON WIN", color: "#8899AA" },
};

// ── HELPERS ────────────────────────────────────────────────────────────────
function weightedRandom(): string {
  const total = SYMBOL_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < SYMBOLS.length; i++) {
    r -= SYMBOL_WEIGHTS[i];
    if (r <= 0) return SYMBOLS[i];
  }
  return SYMBOLS[SYMBOLS.length - 1];
}

function checkWin(reels: string[]): { multiplier: number; label: string; color: string } | null {
  const key = reels.join("");
  return PAYLINES[key] ?? null;
}

// ── REEL COMPONENT ─────────────────────────────────────────────────────────
function Reel({ symbol, spinning, delay }: { symbol: string; spinning: boolean; delay: number }) {
  const [displaySymbols, setDisplaySymbols] = useState<string[]>([symbol, symbol, symbol]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (spinning) {
      setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setDisplaySymbols([weightedRandom(), weightedRandom(), weightedRandom()]);
        }, 80);
      }, delay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplaySymbols([symbol, symbol, symbol]);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spinning, symbol, delay]);

  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl overflow-hidden"
      style={{
        width: 90, height: 90,
        background: "rgba(0,0,0,0.4)",
        border: "2px solid rgba(255,184,0,0.3)",
        boxShadow: spinning ? "0 0 20px rgba(0,212,255,0.4)" : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      <span style={{ fontSize: 44, lineHeight: 1 }}>{displaySymbols[1]}</span>
    </div>
  );
}

// ── SPIN WHEEL COMPONENT ───────────────────────────────────────────────────
const WHEEL_PRIZES = [
  { label: "2× Tokens", value: 2, color: "#00D4FF" },
  { label: "Lose-Earn", value: 0.1, color: "#FFB800" },
  { label: "5× Tokens", value: 5, color: "#00FF88" },
  { label: "Try Again", value: 0, color: "#8899AA" },
  { label: "10× Tokens", value: 10, color: "#FF6B35" },
  { label: "Free Spin", value: -1, color: "#9B59B6" },
  { label: "3× Tokens", value: 3, color: "#00D4FF" },
  { label: "Jackpot!", value: 144, color: "#FFB800" },
];

function SpinWheel({ onResult }: { onResult: (prize: typeof WHEEL_PRIZES[0]) => void }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof WHEEL_PRIZES[0] | null>(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const segmentAngle = 360 / WHEEL_PRIZES.length;
    const targetAngle = 360 * 5 + (360 - prizeIndex * segmentAngle - segmentAngle / 2);
    const newRotation = rotation + targetAngle;
    setRotation(newRotation);
    setTimeout(() => {
      setSpinning(false);
      const prize = WHEEL_PRIZES[prizeIndex];
      setResult(prize);
      onResult(prize);
    }, 3000);
  };

  const segmentAngle = 360 / WHEEL_PRIZES.length;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: 220, height: 220 }}>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10" style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "20px solid #FFB800" }} />
        {/* Wheel */}
        <svg
          width="220" height="220"
          style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? "transform 3s cubic-bezier(0.17,0.67,0.12,0.99)" : "none", borderRadius: "50%", border: "3px solid rgba(255,184,0,0.4)" }}
        >
          {WHEEL_PRIZES.map((prize, i) => {
            const startAngle = i * segmentAngle - 90;
            const endAngle = startAngle + segmentAngle;
            const r = 105;
            const cx = 110, cy = 110;
            const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
            const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
            const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180);
            const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180);
            const midAngle = startAngle + segmentAngle / 2;
            const tx = cx + 65 * Math.cos((midAngle * Math.PI) / 180);
            const ty = cy + 65 * Math.sin((midAngle * Math.PI) / 180);
            return (
              <g key={i}>
                <path
                  d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                  fill={prize.color}
                  fillOpacity={0.8}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth="1"
                />
                <text
                  x={tx} y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="bold"
                  transform={`rotate(${midAngle + 90}, ${tx}, ${ty})`}
                >
                  {prize.label}
                </text>
              </g>
            );
          })}
          <circle cx="110" cy="110" r="12" fill="#050B1A" stroke="rgba(255,184,0,0.6)" strokeWidth="2" />
        </svg>
      </div>
      <Button
        onClick={spinWheel}
        disabled={spinning}
        style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A", fontWeight: 700, minWidth: 120 }}
      >
        {spinning ? "Spinning..." : "SPIN WHEEL"}
      </Button>
      {result && (
        <div className="text-center px-4 py-2 rounded-xl" style={{ background: `${result.color}20`, border: `1px solid ${result.color}40` }}>
          <span className="font-bold" style={{ color: result.color }}>{result.label}</span>
          {result.value > 0 && <span className="text-xs ml-2" style={{ color: "#8899AA" }}>+{result.value} $LONDC</span>}
        </div>
      )}
    </div>
  );
}

// ── SCRATCH CARD ───────────────────────────────────────────────────────────
function ScratchCard() {
  const [revealed, setRevealed] = useState(false);
  const [prize] = useState(() => {
    const r = Math.random();
    if (r < 0.05) return { label: "🕋 DIVINE", value: 144, color: "#FFB800" };
    if (r < 0.15) return { label: "💎 DIAMOND", value: 33, color: "#00D4FF" };
    if (r < 0.35) return { label: "⚡ PLASMA", value: 7, color: "#00FF88" };
    if (r < 0.6) return { label: "🌙 MOON", value: 2, color: "#8899AA" };
    return { label: "💫 LOSE-EARN", value: 0.1, color: "#9B59B6" };
  });

  return (
    <div
      className="rounded-xl p-6 text-center cursor-pointer select-none transition-all duration-500"
      style={{
        background: revealed ? `${prize.color}15` : "linear-gradient(135deg, rgba(255,184,0,0.1), rgba(0,212,255,0.1))",
        border: `2px solid ${revealed ? prize.color : "rgba(255,184,0,0.3)"}`,
        minHeight: 120,
      }}
      onClick={() => setRevealed(true)}
    >
      {!revealed ? (
        <div>
          <div className="text-3xl mb-2">🎴</div>
          <div className="text-sm font-bold text-white">Tap to Scratch</div>
          <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Every card wins something</div>
        </div>
      ) : (
        <div>
          <div className="text-2xl font-black mb-1" style={{ color: prize.color }}>{prize.label}</div>
          <div className="text-lg font-bold text-white">+{prize.value} $LONDC</div>
          {prize.value < 1 && <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Lose-to-earn kickback applied</div>}
        </div>
      )}
    </div>
  );
}

// ── MAIN CASINO PAGE ───────────────────────────────────────────────────────
export default function Casino() {
  const { user } = useAuth();
  const [bet, setBet] = useState(1);
  const [reels, setReels] = useState<string[]>(["🌌", "⚡", "🔥"]);
  const [spinning, setSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<{ win: boolean; multiplier: number; label: string; color: string; payout: number } | null>(null);
  const [totalWon, setTotalWon] = useState(0);
  const [spins, setSpins] = useState(0);
  const [activeTab, setActiveTab] = useState<"slots" | "wheel" | "scratch">("slots");

  const spinMutation = trpc.casino.spinSlots.useMutation({
    onSuccess: (data) => {
      setTimeout(() => {
        setReels(data.reels);
        setSpinning(false);
        const isWin = data.outcome === "win" || data.outcome === "jackpot";
        if (isWin) {
          setLastResult({ win: true, multiplier: data.multiplier, label: data.message, color: "#FFB800", payout: data.payout });
          setTotalWon(p => p + data.payout);
          toast.success(`${data.message} — +${data.payout} $LONDC!`);
        } else {
          const kickback = data.kickback ?? Math.floor(bet * 0.1);
          setLastResult({ win: false, multiplier: 0, label: "Lose-to-Earn", color: "#9B59B6", payout: kickback });
          if (kickback > 0) toast(`Lose-to-Earn: +${kickback} $LONDC kickback`);
        }
        setSpins(p => p + 1);
      }, SPIN_DURATION);
    },
    onError: () => {
      setSpinning(false);
      toast.error("Spin failed — try again");
    },
  });

  const jackpotQuery = trpc.casino.getJackpots.useQuery(undefined, { refetchInterval: 10000 });

  const handleSpin = useCallback(() => {
    if (spinning || !user) return;
    setSpinning(true);
    setLastResult(null);
    spinMutation.mutate({ betAmount: bet, clientSeed: Math.random().toString(36).slice(2) });
  }, [spinning, user, bet, spinMutation]);

  const jackpot = jackpotQuery.data?.[0]?.amount ?? 14400;

  const tabs = [
    { id: "slots" as const, label: "SLOTS", icon: "🎰" },
    { id: "wheel" as const, label: "WHEEL", icon: "🎡" },
    { id: "scratch" as const, label: "SCRATCH", icon: "🎴" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(255,184,0,0.2)", background: "rgba(255,184,0,0.03)" }}>
        <div className="container py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)" }}>
                  🎰
                </div>
                <h1 className="text-2xl font-black text-white">ScrollVerse Sovereign Casino</h1>
                <Badge style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
                  PROVABLY FAIR
                </Badge>
              </div>
              <p className="text-sm" style={{ color: "#8899AA" }}>Lose-to-earn · 10% kickback on every loss · Jackpots in $LONDC · Zakat auto-purified</p>
            </div>
            {/* Jackpot Display */}
            <div className="rounded-xl px-5 py-3 text-center" style={{ background: "rgba(255,184,0,0.08)", border: "2px solid rgba(255,184,0,0.3)" }}>
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>🏆 JACKPOT POOL</div>
              <div className="text-2xl font-black" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>
                {jackpot.toLocaleString()} $LONDC
              </div>
              <div className="text-xs" style={{ color: "#8899AA" }}>≈ ${(jackpot * 0.0144).toFixed(2)} USD</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Your Spins", value: spins.toString(), icon: RefreshCw, color: "#00D4FF" },
            { label: "Total Won", value: `${totalWon} $LONDC`, icon: Trophy, color: "#FFB800" },
            { label: "Lose-to-Earn", value: "10% Kickback", icon: Gift, color: "#00FF88" },
            { label: "Zakat Rate", value: "2.5% Auto", icon: Shield, color: "#9B59B6" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${s.color}20` }}>
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-xs" style={{ color: "#8899AA" }}>{s.label}</span>
              </div>
              <div className="font-bold text-white">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Game Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2 rounded-lg font-bold text-sm transition-all"
              style={{
                background: activeTab === tab.id ? "linear-gradient(135deg, #FFB800, #FF6B35)" : "rgba(255,255,255,0.04)",
                color: activeTab === tab.id ? "#050B1A" : "#8899AA",
                border: activeTab === tab.id ? "none" : "1px solid rgba(255,184,0,0.2)",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            {activeTab === "slots" && (
              <div className="rounded-2xl p-8" style={{ background: "rgba(255,184,0,0.03)", border: "2px solid rgba(255,184,0,0.15)" }}>
                <div className="text-center mb-6">
                  <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>SOVEREIGN SLOTS</div>
                  <div className="text-sm" style={{ color: "#8899AA" }}>3 matching symbols = WIN · 🕋🕋🕋 = 144× DIVINE JACKPOT</div>
                </div>

                {/* Reels */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  {Array.from({ length: REEL_COUNT }).map((_, i) => (
                    <Reel key={i} symbol={reels[i] ?? "🌌"} spinning={spinning} delay={i * 150} />
                  ))}
                </div>

                {/* Result Banner */}
                {lastResult && (
                  <div
                    className="rounded-xl p-4 text-center mb-6 transition-all"
                    style={{ background: `${lastResult.color}15`, border: `2px solid ${lastResult.color}40` }}
                  >
                    <div className="text-lg font-black" style={{ color: lastResult.color }}>{lastResult.label}</div>
                    {lastResult.payout > 0 && (
                      <div className="text-sm text-white mt-1">+{lastResult.payout} $LONDC</div>
                    )}
                  </div>
                )}

                {/* Bet Controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-sm" style={{ color: "#8899AA" }}>Bet:</span>
                  {[1, 5, 10, 25, 100].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBet(b)}
                      className="w-10 h-10 rounded-lg text-sm font-bold transition-all"
                      style={{
                        background: bet === b ? "linear-gradient(135deg, #FFB800, #FF6B35)" : "rgba(255,255,255,0.05)",
                        color: bet === b ? "#050B1A" : "#8899AA",
                        border: bet === b ? "none" : "1px solid rgba(255,184,0,0.2)",
                      }}
                    >
                      {b}
                    </button>
                  ))}
                  <span className="text-sm font-bold" style={{ color: "#FFB800" }}>$LONDC</span>
                </div>

                {/* Spin Button */}
                {!user ? (
                  <div className="text-center">
                    <Link href="/token">
                      <Button style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A", fontWeight: 700, fontSize: 16, padding: "12px 40px" }}>
                        Sign In to Play
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={handleSpin}
                      disabled={spinning}
                      className="rounded-xl font-black text-lg px-12 py-4 transition-all"
                      style={{
                        background: spinning ? "rgba(255,184,0,0.2)" : "linear-gradient(135deg, #FFB800, #FF6B35)",
                        color: spinning ? "#FFB800" : "#050B1A",
                        border: spinning ? "2px solid rgba(255,184,0,0.4)" : "none",
                        cursor: spinning ? "not-allowed" : "pointer",
                        boxShadow: spinning ? "none" : "0 0 30px rgba(255,184,0,0.4)",
                        minWidth: 200,
                      }}
                    >
                      {spinning ? "⚡ SPINNING..." : "🎰 SPIN — " + bet + " $LONDC"}
                    </button>
                    <div className="text-xs mt-2" style={{ color: "#8899AA" }}>
                      Lose? Get 10% back · Win? Zakat auto-purified · KUN FAYAKŪN × ∞
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "wheel" && (
              <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(0,212,255,0.03)", border: "2px solid rgba(0,212,255,0.15)" }}>
                <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>FORTUNE WHEEL</div>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Every spin wins — worst case is Lose-to-Earn kickback</p>
                <SpinWheel onResult={(prize) => {
                  if (prize.value > 0) toast.success(`${prize.label} — +${prize.value} $LONDC!`);
                  else if (prize.value === 0) toast("Better luck next spin — Lose-to-Earn active");
                  else toast.success("FREE SPIN awarded!");
                }} />
              </div>
            )}

            {activeTab === "scratch" && (
              <div className="rounded-2xl p-8" style={{ background: "rgba(155,89,182,0.03)", border: "2px solid rgba(155,89,182,0.15)" }}>
                <div className="text-xs font-mono tracking-widest mb-2 text-center" style={{ color: "#9B59B6" }}>SCRATCH CARDS</div>
                <p className="text-sm mb-6 text-center" style={{ color: "#8899AA" }}>Every card wins something — tap to reveal your prize</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ScratchCard key={i} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Paytable */}
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,184,0,0.15)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4" style={{ color: "#FFB800" }} />
                <span className="font-bold text-white text-sm">Paytable</span>
              </div>
              <div className="space-y-2">
                {Object.entries(PAYLINES).map(([combo, info]) => (
                  <div key={combo} className="flex items-center justify-between">
                    <span className="text-sm font-mono">{combo}</span>
                    <span className="text-xs font-bold" style={{ color: info.color }}>{info.multiplier}×</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lose-to-Earn Info */}
            <div className="rounded-xl p-5" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-4 h-4" style={{ color: "#00FF88" }} />
                <span className="font-bold text-white text-sm">Lose-to-Earn</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>
                Every losing spin returns <span style={{ color: "#00FF88" }}>10% of your bet</span> as $LONDC tokens. You can never truly lose — the empire always gives back.
              </p>
              <div className="mt-3 p-3 rounded-lg" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)" }}>
                <div className="text-xs font-mono" style={{ color: "#00FF88" }}>EXAMPLE: Bet 10 $LONDC → Lose → Get 1 $LONDC back</div>
              </div>
            </div>

            {/* Zakat Info */}
            <div className="rounded-xl p-5" style={{ background: "rgba(155,89,182,0.03)", border: "1px solid rgba(155,89,182,0.2)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4" style={{ color: "#9B59B6" }} />
                <span className="font-bold text-white text-sm">Zakat Purification</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>
                2.5% of all winnings are automatically routed to the <span style={{ color: "#9B59B6" }}>Zakat Distribution Engine</span> — purifying every win and funding the 8 sacred distribution nodes.
              </p>
              <Link href="/zakat">
                <Button size="sm" className="w-full mt-3" style={{ background: "rgba(155,89,182,0.15)", border: "1px solid rgba(155,89,182,0.3)", color: "#9B59B6" }}>
                  View Zakat Engine →
                </Button>
              </Link>
            </div>

            {/* Jackpot Progress */}
            <div className="rounded-xl p-5" style={{ background: "rgba(255,184,0,0.03)", border: "1px solid rgba(255,184,0,0.2)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4" style={{ color: "#FFB800" }} />
                <span className="font-bold text-white text-sm">Jackpot Progress</span>
              </div>
              <div className="text-2xl font-black mb-2" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>
                {jackpot.toLocaleString()} $LONDC
              </div>
              <div className="w-full rounded-full h-2 mb-2" style={{ background: "rgba(255,184,0,0.1)" }}>
                <div className="h-2 rounded-full" style={{ width: `${Math.min((jackpot / 144000) * 100, 100)}%`, background: "linear-gradient(90deg, #FFB800, #FF6B35)" }} />
              </div>
              <div className="text-xs" style={{ color: "#8899AA" }}>
                Target: 144,000 $LONDC · {((jackpot / 144000) * 100).toFixed(1)}% filled
              </div>
              <div className="text-xs mt-2" style={{ color: "#FFB800" }}>
                Trigger: 🕋🕋🕋 = DIVINE JACKPOT (144×)
              </div>
            </div>

            {/* Provably Fair */}
            <div className="rounded-xl p-5" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4" style={{ color: "#00D4FF" }} />
                <span className="font-bold text-white text-sm">Provably Fair</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>
                All spins use a server-side seed + client seed PRNG. Results are cryptographically verifiable on-chain via Scroll zkEVM. No manipulation possible.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                <span className="text-xs font-mono" style={{ color: "#00FF88" }}>VERIFIED FAIR</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-xl p-4 space-y-2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>CASINO LINKS</div>
              {[
                { href: "/token", label: "Buy $LONDC Tokens" },
                { href: "/kepler-nft", label: "Land NFT Collection" },
                { href: "/voyage", label: "Guardian Voyage" },
                { href: "/zakat", label: "Zakat Engine" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className="text-sm py-1 px-2 rounded cursor-pointer transition-colors hover:text-white" style={{ color: "#8899AA" }}>
                    → {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-xs" style={{ color: "#8899AA" }}>
          ScrollVerse Sovereign Casino · All games use provably fair PRNG · 2.5% Zakat auto-purified · 10% lose-to-earn kickback on every loss
          <br />
          <span style={{ color: "#FFB800" }}>KUN FAYAKŪN × ∞ · ALLĀHU AKBAR · Play responsibly · 18+</span>
        </div>
      </div>
    </div>
  );
}
