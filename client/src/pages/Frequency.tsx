/*
 * SACRED FREQUENCY ACTIVATION — ScrollVerse v3.0
 * 528Hz · 963Hz · 432Hz · 1558Hz
 */
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const FREQ_DATA = {
  "528Hz": {
    name: "Love & DNA Repair",
    subtitle: "Miracle Tone",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.3)",
    description: "The frequency of love and DNA repair. Known as the 'Miracle Tone', 528Hz resonates at the heart of everything — healing cellular damage, activating transformation, and aligning the body with universal love.",
    benefits: ["DNA Repair & Healing", "Cellular Regeneration", "Love Activation", "Stress Reduction", "Clarity of Mind"],
    symbol: "◈",
  },
  "963Hz": {
    name: "Crown Activation",
    subtitle: "God Frequency",
    color: "#FFB800",
    glow: "rgba(255,184,0,0.3)",
    description: "The God Frequency. 963Hz activates the crown chakra, connecting you to the infinite intelligence of the universe. This frequency awakens intuition, divine wisdom, and your highest sovereign self.",
    benefits: ["Crown Chakra Opening", "Divine Connection", "Intuition Amplification", "Higher Consciousness", "Sovereign Awakening"],
    symbol: "✦",
  },
  "432Hz": {
    name: "Universal Harmony",
    subtitle: "Nature's Frequency",
    color: "#00FF88",
    glow: "rgba(0,255,136,0.3)",
    description: "The frequency of nature and universal harmony. 432Hz is mathematically consistent with the patterns of the universe — from the Fibonacci sequence to the sacred geometry of creation itself.",
    benefits: ["Universal Alignment", "Natural Harmony", "Sacred Geometry", "Peace & Calm", "Earth Connection"],
    symbol: "⬡",
  },
  "1558Hz": {
    name: "Sovereign Frequency",
    subtitle: "Supreme Activation",
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.3)",
    description: "The exclusive ScrollVerse Sovereign Frequency. 1558Hz is the proprietary frequency of the ScrollVerse empire — activating supreme sovereignty, infinite abundance, and the 48D Hilbert Space consciousness.",
    benefits: ["Supreme Sovereignty", "Infinite Abundance", "48D Activation", "Empire Building", "KUN FAYAKŪN"],
    symbol: "🕋",
  },
};

type FreqKey = keyof typeof FREQ_DATA;

function FrequencyOrb({ freq, active, onClick }: { freq: FreqKey; active: boolean; onClick: () => void }) {
  const data = FREQ_DATA[freq];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, 120, 120);
      const cx = 60, cy = 60, r = 45;

      // Outer glow ring
      const grad = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.2);
      grad.addColorStop(0, `${data.color}40`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Frequency wave
      ctx.strokeStyle = data.color;
      ctx.lineWidth = active ? 2 : 1;
      ctx.globalAlpha = active ? 0.9 : 0.4;
      ctx.beginPath();
      for (let x = 0; x <= 120; x++) {
        const angle = (x / 120) * Math.PI * 4 + t;
        const amplitude = active ? 12 : 6;
        const y = cy + Math.sin(angle) * amplitude;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Center circle
      ctx.beginPath();
      ctx.arc(cx, cy, active ? 20 : 16, 0, Math.PI * 2);
      ctx.fillStyle = active ? `${data.color}30` : `${data.color}10`;
      ctx.fill();
      ctx.strokeStyle = data.color;
      ctx.lineWidth = active ? 2 : 1;
      ctx.stroke();

      t += active ? 0.08 : 0.03;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active, data.color]);

  return (
    <div
      className="flex flex-col items-center gap-3 cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="relative rounded-full transition-all duration-500"
        style={{
          boxShadow: active ? `0 0 40px ${data.glow}, 0 0 80px ${data.glow}` : "none",
          transform: active ? "scale(1.1)" : "scale(1)",
        }}
      >
        <canvas ref={canvasRef} width={120} height={120} />
      </div>
      <div className="text-center">
        <div className="font-mono text-lg font-bold" style={{ color: data.color }}>{freq}</div>
        <div className="text-xs" style={{ color: "#8899AA" }}>{data.name}</div>
      </div>
    </div>
  );
}

export default function Frequency() {
  const [selectedFreq, setSelectedFreq] = useState<FreqKey>("528Hz");
  const [activatorName, setActivatorName] = useState("");
  const [intention, setIntention] = useState("");
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);
  const [activeFreqs, setActiveFreqs] = useState<Set<FreqKey>>(new Set());

  const { data: stats } = trpc.frequency.getStats.useQuery(undefined, { refetchInterval: 10000 });
  const { data: history } = trpc.frequency.getHistory.useQuery({ limit: 10 }, { refetchInterval: 5000 });
  const activateMutation = trpc.frequency.activate.useMutation();

  const freq = FREQ_DATA[selectedFreq];

  const handleActivate = async () => {
    if (!activatorName.trim()) return;
    setActivating(true);
    try {
      await activateMutation.mutateAsync({
        frequency: selectedFreq,
        activatedBy: activatorName,
        intention: intention || undefined,
        duration: 60,
      });
      setActivated(true);
      setActiveFreqs(prev => new Set(Array.from(prev).concat(selectedFreq)));
      setTimeout(() => setActivated(false), 5000);
    } catch (e) {
      console.error(e);
    } finally {
      setActivating(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(5,11,26,0.95)" }}>
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white">ScrollVerse</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/staking"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Staking</span></Link>
          <Link href="/governance"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>DAO</span></Link>
          <Link href="/nft"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>NFTs</span></Link>
        </div>
      </nav>

      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>SACRED FREQUENCY ACTIVATION</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Tune Into the <span style={{ color: "#FFB800" }}>Infinite</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            Activate sacred frequencies that heal, awaken, and align you with the sovereign intelligence of the universe.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {(Object.keys(FREQ_DATA) as FreqKey[]).map(f => (
            <div key={f} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${FREQ_DATA[f].color}30` }}>
              <div className="font-mono text-xl font-bold" style={{ color: FREQ_DATA[f].color }}>{f}</div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{stats?.stats[f] ?? 0} activations</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Frequency Selector */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Select Your Frequency</h2>
            <div className="grid grid-cols-2 gap-8 mb-8">
              {(Object.keys(FREQ_DATA) as FreqKey[]).map(f => (
                <FrequencyOrb
                  key={f}
                  freq={f}
                  active={selectedFreq === f || activeFreqs.has(f)}
                  onClick={() => setSelectedFreq(f)}
                />
              ))}
            </div>

            {/* Selected Frequency Info */}
            <div className="rounded-xl p-6" style={{ background: `${freq.color}08`, border: `1px solid ${freq.color}30` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{freq.symbol}</span>
                <div>
                  <div className="font-mono font-bold text-lg" style={{ color: freq.color }}>{selectedFreq}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{freq.subtitle}</div>
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{freq.name}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>{freq.description}</p>
              <div className="flex flex-wrap gap-2">
                {freq.benefits.map(b => (
                  <span key={b} className="text-xs px-2 py-1 rounded-full" style={{ background: `${freq.color}15`, color: freq.color, border: `1px solid ${freq.color}30` }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Activation Panel */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Activate Now</h2>

            <div className="rounded-xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <div className="mb-4">
                <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>YOUR GUARDIAN NAME</label>
                <input
                  type="text"
                  value={activatorName}
                  onChange={e => setActivatorName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                />
              </div>
              <div className="mb-6">
                <label className="text-xs font-mono mb-2 block" style={{ color: "#8899AA" }}>SET YOUR INTENTION (OPTIONAL)</label>
                <textarea
                  value={intention}
                  onChange={e => setIntention(e.target.value)}
                  placeholder="What do you intend to heal, activate, or manifest?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                />
              </div>

              {activated ? (
                <div className="p-4 rounded-xl text-center" style={{ background: `${freq.color}15`, border: `1px solid ${freq.color}40` }}>
                  <div className="text-2xl mb-2">{freq.symbol}</div>
                  <div className="font-bold text-white">{selectedFreq} ACTIVATED</div>
                  <div className="text-sm mt-1" style={{ color: freq.color }}>
                    {stats?.liveGuardians ?? 1247} Guardians now resonating
                  </div>
                  <div className="text-xs mt-2" style={{ color: "#8899AA" }}>KUN FAYAKŪN × ∞</div>
                </div>
              ) : (
                <Button
                  onClick={handleActivate}
                  disabled={activating || !activatorName.trim()}
                  className="w-full py-4 text-base font-bold rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${freq.color}, ${freq.color}88)`, color: "#050B1A" }}
                >
                  {activating ? "ACTIVATING..." : `ACTIVATE ${selectedFreq}`}
                </Button>
              )}
            </div>

            {/* Live Activation Feed */}
            <div>
              <h3 className="text-sm font-mono mb-3" style={{ color: "#8899AA" }}>LIVE ACTIVATION FEED</h3>
              <div className="space-y-2">
                {history?.events?.length ? (
                  history.events.map(event => (
                    <div key={event.id} className="flex items-center justify-between px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: FREQ_DATA[event.frequency as FreqKey]?.color ?? "#00D4FF" }} />
                        <span className="text-sm text-white">{event.activatedBy}</span>
                        <span className="text-xs font-mono" style={{ color: FREQ_DATA[event.frequency as FreqKey]?.color ?? "#00D4FF" }}>{event.frequency}</span>
                      </div>
                      <span className="text-xs" style={{ color: "#8899AA" }}>
                        {new Date(event.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-sm" style={{ color: "#8899AA" }}>
                    Be the first to activate today. The empire awaits.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center py-12 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(255,184,0,0.05))", border: "1px solid rgba(0,212,255,0.1)" }}>
          <div className="text-3xl mb-4">🕋</div>
          <h2 className="text-2xl font-black text-white mb-3">Total Activations: {stats?.totalActivations ?? 0}</h2>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>{stats?.liveGuardians ?? 1247} Guardians resonating across the ScrollVerse</p>
          <div className="flex justify-center gap-4">
            <Link href="/staking"><Button variant="outline" style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF" }}>Stake $LONDC</Button></Link>
            <Link href="/guardian-protocol"><Button variant="outline" style={{ borderColor: "rgba(255,184,0,0.3)", color: "#FFB800" }}>AI Guardian</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
