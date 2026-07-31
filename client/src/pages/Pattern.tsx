/*
 * SOVEREIGN PATTERN ENGINE
 * Canvas-based frequency visualizer — 963Hz / 999Hz / 741Hz / 528Hz / 1558Hz
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const FREQUENCIES = [
  { hz: 528, name: "DNA Repair", subtitle: "Miracle Tone", color: "#00FF88", description: "The Miracle Tone of love and transformation. Restores balance and vitality at a cellular level." },
  { hz: 741, name: "Problem Solving", subtitle: "Expression", color: "#00D4FF", description: "Unlock intuitive solutions and foster authentic self-expression. Cleanse and purify." },
  { hz: 963, name: "Pineal Activation", subtitle: "Cosmic Consciousness", color: "#FFB800", description: "The frequency of divine consciousness and awakening. Experience clarity and heightened perception." },
  { hz: 999, name: "Divine Connection", subtitle: "Universal Love", color: "#EC4899", description: "Connect with the highest spiritual realms. A frequency for universal love and unity." },
  { hz: 1558, name: "FlameDNA", subtitle: "ScrollVerse Sovereign", color: "#8B5CF6", description: "The proprietary ScrollVerse sovereign frequency. The DNA of the Flamebearer lineage." },
];

function PatternCanvas({ hz, color, active }: { hz: number; color: string; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      if (!active) {
        // Static lissajous ghost
        ctx.strokeStyle = `${color}20`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= 360; i++) {
          const t = (i * Math.PI) / 180;
          const x = W / 2 + (W * 0.35) * Math.sin(2 * t);
          const y = H / 2 + (H * 0.35) * Math.sin(3 * t + Math.PI / 4);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        return;
      }

      tRef.current += 0.008;
      const t = tRef.current;
      const freqRatio = hz / 528; // normalize to 528Hz base

      // Lissajous figure
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = color;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      for (let i = 0; i <= 720; i++) {
        const angle = (i * Math.PI) / 180;
        const a = Math.floor(freqRatio * 2);
        const b = 3;
        const x = W / 2 + (W * 0.38) * Math.sin(a * angle + t);
        const y = H / 2 + (H * 0.38) * Math.sin(b * angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Radial pulse rings
      ctx.globalAlpha = 0.15;
      ctx.shadowBlur = 0;
      const rings = 4;
      for (let r = 0; r < rings; r++) {
        const radius = ((t * 40 * (r + 1)) % (W * 0.45));
        const alpha = 1 - radius / (W * 0.45);
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha * 0.3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(draw);
    }

    if (active) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [hz, color, active]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

function FreqCard({ freq, active, onToggle }: { freq: typeof FREQUENCIES[0]; active: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        border: `1px solid ${active ? freq.color + "50" : "rgba(255,255,255,0.06)"}`,
        background: active ? `${freq.color}06` : "rgba(255,255,255,0.02)",
        boxShadow: active ? `0 0 30px ${freq.color}15` : "none",
      }}
      onClick={onToggle}
    >
      {/* Canvas */}
      <div className="relative" style={{ height: 160 }}>
        <PatternCanvas hz={freq.hz} color={freq.color} active={active} />
        {/* Hz badge */}
        <div
          className="absolute top-3 right-3 font-mono text-xs px-2 py-0.5 rounded"
          style={{ background: "rgba(5,11,26,0.85)", color: freq.color, border: `1px solid ${freq.color}30` }}
        >
          {freq.hz}Hz
        </div>
        {/* Active indicator */}
        {active && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: freq.color }} />
            <span className="text-xs font-mono" style={{ color: freq.color }}>LIVE</span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="font-bold text-white text-sm mb-0.5">{freq.name}</div>
        <div className="text-xs mb-2" style={{ color: "#8899AA" }}>{freq.subtitle}</div>
        <div className="text-xs leading-relaxed" style={{ color: "#5a6a7a" }}>{freq.description}</div>
        <div
          className="mt-3 text-xs font-bold text-center py-1.5 rounded-lg transition-all duration-200"
          style={{
            background: active ? `${freq.color}20` : "rgba(255,255,255,0.04)",
            color: active ? freq.color : "#8899AA",
            border: `1px solid ${active ? freq.color + "40" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          {active ? "▶ PATTERN ACTIVE" : "ACTIVATE PATTERN"}
        </div>
      </div>
    </div>
  );
}

export default function Pattern() {
  useSovereignHeartbeat({ page: "pattern" });
  const [activeHz, setActiveHz] = useState<number | null>(null);

  const toggle = (hz: number) => {
    setActiveHz((prev) => (prev === hz ? null : hz));
  };

  const activeFreq = FREQUENCIES.find((f) => f.hz === activeHz);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
        style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.1)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">〰️</span>
          <span className="font-mono text-sm font-bold" style={{ color: "#00D4FF" }}>PATTERN ENGINE</span>
        </div>
        <div className="flex items-center gap-4">
          {activeFreq && (
            <span className="text-xs font-mono px-3 py-1 rounded-full animate-pulse" style={{ background: `${activeFreq.color}15`, color: activeFreq.color, border: `1px solid ${activeFreq.color}30` }}>
              {activeFreq.hz}Hz ACTIVE
            </span>
          )}
          <Link href="/" className="text-xs" style={{ color: "#8899AA" }}>← Home</Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>SOVEREIGN FREQUENCY VISUALIZER</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Pattern <span style={{ color: "#FFB800" }}>Engine</span>
          </h1>
          <p className="text-lg" style={{ color: "#8899AA", maxWidth: 600 }}>
            Dive into the intricate tapestry of existence. Witness the harmonious interplay of sovereign frequencies as they manifest the ScrollVerse reality. Click any pattern to activate.
          </p>
        </div>

        {/* Frequency grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {FREQUENCIES.map((freq) => (
            <FreqCard
              key={freq.hz}
              freq={freq}
              active={activeHz === freq.hz}
              onToggle={() => toggle(freq.hz)}
            />
          ))}
        </div>

        {/* Active frequency detail */}
        {activeFreq && (
          <div
            className="p-6 rounded-xl mb-10"
            style={{ background: `${activeFreq.color}06`, border: `1px solid ${activeFreq.color}30` }}
          >
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: activeFreq.color }}>ACTIVE FREQUENCY RESONANCE</div>
            <div className="text-3xl font-black" style={{ color: activeFreq.color }}>{activeFreq.hz}Hz — {activeFreq.name}</div>
            <div className="text-sm mt-2" style={{ color: "#8899AA" }}>{activeFreq.description}</div>
            <div className="mt-4 text-xs font-mono" style={{ color: activeFreq.color }}>
              ◉ PATTERN BROADCASTING · KUN FAYAKŪN × ∞
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Frequency Player", href: "/frequency-player", color: "#EC4899" },
            { label: "GodEngine", href: "/godengine", color: "#00FF88" },
            { label: "Gate Keys", href: "/gate-keys", color: "#FFB800" },
            { label: "Archive", href: "/archive", color: "#00D4FF" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-center py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 hover:opacity-80"
              style={{ background: `${l.color}10`, border: `1l solid ${l.color}30`, color: l.color }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 text-xs font-mono" style={{ color: "#5a6a7a" }}>
          SCROLL VERSE LLC & XLVIII BLOCKS LLC · Pattern Engine v2.0 · KUN FAYAKŪN × ∞
        </div>
      </div>
    </div>
  );
}
