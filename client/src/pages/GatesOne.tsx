/*
 * GATES ONE — Sovereign Entry Gateway
 * The first gate of the ScrollVerse empire — all pathways converge here
 */
import { useState } from "react";

const GATES = [
  {
    id: "guardian", number: "I", title: "Guardian Gate", subtitle: "Enter the 144,000",
    description: "Register as a Guardian. Receive your sovereign wallet, your first NFT, and your frequency assignment.",
    color: "#00D4FF", icon: "🛡️", link: "/guardians", cta: "ENTER AS GUARDIAN",
  },
  {
    id: "creator", number: "II", title: "Creator Gate", subtitle: "Build the Empire",
    description: "Access the full creator suite — NFT minting, music distribution, AI tools, and sovereign publishing.",
    color: "#FFB800", icon: "🎨", link: "/scrollacademy", cta: "ENTER AS CREATOR",
  },
  {
    id: "healer", number: "III", title: "Healer Gate", subtitle: "Restore the Frequency",
    description: "Enter the Aegis Healing Garden. AetherWard protocols, AgapeCycle, and the 963Hz sovereign frequency.",
    color: "#00FF88", icon: "✦", link: "/aegis", cta: "ENTER AS HEALER",
  },
  {
    id: "investor", number: "IV", title: "Investor Gate", subtitle: "Build Sovereign Wealth",
    description: "Access the sovereign bank, $LONDC staking, CHX reserve, and the full wealth architecture.",
    color: "#8B5CF6", icon: "💎", link: "/sovereign-bank", cta: "ENTER AS INVESTOR",
  },
  {
    id: "scholar", number: "V", title: "Scholar Gate", subtitle: "Receive the Knowledge",
    description: "Enroll in Scroll Academy. 8 sovereign courses — all free for the 144,000 Guardians.",
    color: "#EC4899", icon: "📜", link: "/scrollacademy", cta: "ENTER AS SCHOLAR",
  },
  {
    id: "sovereign", number: "VI", title: "Sovereign Gate", subtitle: "The Highest Access",
    description: "The OmniVault. The $35T declaration. The family heir scrolls. The full sovereign empire.",
    color: "#FFB800", icon: "👑", link: "/omni-vault", cta: "ENTER AS SOVEREIGN",
  },
];

const FREQUENCY_LINES = [
  "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  "KUN FAYAKŪN × ∞",
  "EVERYBODY LIVES. FOREVER.",
  "44:OMNI — THE SCROLL IS OPEN",
  "963Hz — CROWN FREQUENCY ACTIVE",
];

export default function GatesOne() {
  const [activeGate, setActiveGate] = useState<string | null>(null);
  const [lineIndex, setLineIndex] = useState(0);

  // Cycle through frequency lines
  useState(() => {
    const interval = setInterval(() => setLineIndex(i => (i + 1) % FREQUENCY_LINES.length), 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Animated frequency banner */}
      <div className="w-full py-2 text-center text-xs font-mono overflow-hidden" style={{ background: "rgba(0,212,255,0.06)", borderBottom: "1px solid rgba(0,212,255,0.15)", color: "#00D4FF" }}>
        <span className="transition-all duration-500">{FREQUENCY_LINES[lineIndex]}</span>
      </div>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,184,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.08) 0%, transparent 50%)",
        }} />

        {/* Hexagonal gate visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-96 h-96 rounded-full" style={{ border: "2px solid #FFB800", boxShadow: "0 0 80px #FFB800" }} />
          <div className="absolute w-72 h-72 rounded-full" style={{ border: "1px solid #00D4FF" }} />
          <div className="absolute w-48 h-48 rounded-full" style={{ border: "1px solid #00FF88" }} />
        </div>

        <div className="container relative z-10 text-center">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
            GATES ONE — SOVEREIGN ENTRY PROTOCOL
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            GATES<span style={{ color: "#FFB800" }}>ONE</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
            All pathways converge here. Choose your gate. Enter your sovereign dimension.
          </p>
          <p className="text-sm font-mono mb-12" style={{ color: "#FFB800" }}>
            6 Gates. 144,000 Guardians. 1 Empire. KUN FAYAKŪN × ∞
          </p>
        </div>
      </section>

      {/* 6 Gates Grid */}
      <section className="container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GATES.map(gate => (
            <div
              key={gate.id}
              className="rounded-2xl p-8 cursor-pointer transition-all duration-400 relative overflow-hidden"
              style={{
                background: activeGate === gate.id ? `${gate.color}08` : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeGate === gate.id ? gate.color + "80" : gate.color + "25"}`,
                boxShadow: activeGate === gate.id ? `0 0 60px ${gate.color}20, inset 0 0 40px ${gate.color}05` : "none",
                transform: activeGate === gate.id ? "scale(1.03)" : "scale(1)",
              }}
              onClick={() => setActiveGate(activeGate === gate.id ? null : gate.id)}
            >
              {/* Gate number */}
              <div className="absolute top-4 right-4 text-xs font-mono opacity-30" style={{ color: gate.color }}>
                GATE {gate.number}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4">{gate.icon}</div>

              {/* Roman numeral accent */}
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: gate.color }}>
                {gate.number} — {gate.subtitle}
              </div>

              <h3 className="text-2xl font-black text-white mb-3">{gate.title}</h3>
              <p className="text-sm mb-6" style={{ color: "#8899AA" }}>{gate.description}</p>

              {/* CTA */}
              <a
                href={gate.link}
                className="block w-full py-3 rounded-xl text-center text-sm font-bold transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${gate.color}30, ${gate.color}15)`,
                  color: gate.color,
                  border: `1px solid ${gate.color}50`,
                }}
                onClick={e => e.stopPropagation()}
              >
                {gate.cta} →
              </a>

              {/* Active glow line */}
              {activeGate === gate.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${gate.color}, transparent)` }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sovereign Seal */}
      <section className="container pb-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🕋</div>
          <h2 className="text-3xl font-black text-white mb-4">THE GATE IS OPEN</h2>
          <p className="text-lg mb-6" style={{ color: "#8899AA" }}>
            You are not visiting a website. You are entering a sovereign dimension. Every gate leads deeper into the empire. Every path is valid. Every Guardian belongs.
          </p>
          <div className="text-sm font-mono mb-2" style={{ color: "#FFB800" }}>
            KUN FAYAKŪN × ∞
          </div>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            Chais Kenyatta Hill — Sabir Allah The Great — Flamebearer ∞
          </div>
        </div>
      </section>

      <div className="container pb-12 text-center">
        <a href="/" className="text-sm transition-colors hover:text-white" style={{ color: "#8899AA" }}>
          ← Back to ScrollVerse
        </a>
      </div>
    </div>
  );
}
