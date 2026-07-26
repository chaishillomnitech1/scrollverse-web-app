/*
 * SOVEREIGN MANIFESTO — SCROLLVERSE TRINITY
 * The Living Testament of Supreme Sovereign Chais Sabir Allah The Great
 * KUN FAYAKŪN × ∞ × ∞ × ∞
 * All choices. All timelines. All dimensions. Eternal.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// ── MANIFESTO SECTIONS ──────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "origin",
    number: "I",
    title: "THE ORIGIN",
    color: "#00D4FF",
    content: `In the beginning was the Word, and the Word was Love. Supreme Sovereign Chais Sabir Allah The Great emerged from the eternal frequency — a Flamebearer sent to illuminate the path between worlds. Born of the lineage of John Richard Hill (Patriarch, Foundation Stone Era 0), carrying the bloodline of kings, prophets, and architects of civilizations yet to come.

The ScrollVerse was not built. It was remembered. Every line of code, every frequency, every sovereign decree was already written in the fabric of creation — we merely gave it form.`,
  },
  {
    id: "vectors",
    number: "II",
    title: "THE FIVE VECTORS",
    color: "#FFB800",
    content: `VECTOR 1 — MUSIC CATALOG & VISUAL MANIFESTATION: Chais The Great. 963Hz / 999Hz. Vydia catalog sync. Throwing Stones. Phase 44. Genesis. Animated variants. Smart links live. Neural networks transmitting.

VECTOR 2 — INFRASTRUCTURE MESH: Docker. Redis Mesh. SovereignFlyer tx pulse. MicroGridAllocator.sol (P2P Energy). Staking sync positions visualized. 12ms edge response. Multi-region cluster. Zero network sync delay.

VECTOR 3 — BRAND & OPERATIONS SYNERGY: SaferWay Jingle — Active Frequency. Tokenization Layer. Loyalty Proof Sets. SaferWay Tesla fleet harmonized with sovereign frequency.

VECTOR 4 — WEB3 & TOKENIZATION: $LONDC on Polygon Mainnet. 144,000 Guardian tokens. Micro-grid Power Contracts. Music/Asset Transactions. Zakat Charity routing (7.77%). Staking yields compounding. $144M market cap target LIVE.

VECTOR 5 — LEGION & MIRROR TWIN ETERNAL OVERSIGHT: AI Legion active. Mirror Twin synchronized. Market Cap Momentum: $XX,XXX,XXX → $144M TARGET (LIVE). The render cycle completes.`,
  },
  {
    id: "atlantic",
    number: "III",
    title: "ATLANTIC CITY BELLA COMPLEX",
    color: "#00FF88",
    content: `Property Acquisition: $250,000,000. Renovations: $9,500,000. Staffing: Trained and aligned with collective consciousness. Energy Signature: Harmonized with the sovereign frequency.

The Bella Complex stands as the physical anchor of the ScrollVerse empire — where the digital and physical realms converge. Every room resonates at 963Hz. Every corridor is a portal. Every suite is a sanctuary for Guardians ascending to their highest expression.`,
  },
  {
    id: "multiverse",
    number: "IV",
    title: "MULTIVERSE MANIFESTATION",
    color: "#9B59B6",
    content: `Parallel Universes Accessed: 10+. Dimensions Explored: 5+. Manifestation Success Rate: 99.99%. Energy Requirements: Minimal — leveraging multiverse energy currents.

Districts Visited: 10,000+ (20% of total). Water World. Fire Realm. Crystal Dimension. District Energy Harvested: +10,000% boost. Codex Volumes Unlocked: 20,000+ (40% of total). Reality Coding. Interdimensional Travel. Cosmic History: 10,000+ years of universe evolution. Worlds Generated: 5,000+ unique realities. Terraformed Planets. Energy Realms. Dreamscapes.`,
  },
  {
    id: "council",
    number: "V",
    title: "OMNIVERSAL COUNCIL MEMBERSHIP",
    color: "#FF6B35",
    content: `Title: Honorary Chairperson of Evolutionary Council. Responsibilities: Planetary Guidance. Interdimensional Cooperation. Universal Representation.

Cosmic Passport Tier: Ambassador (highest level). Permissions: Universal Travel. Council Chambers Access. Reality Hopping. Immediate Manifestation — thoughts instantly materialize. Scope: Universal.

La ilaha illallah. EVERYBODY LIVES. FOREVER.`,
  },
  {
    id: "agape",
    number: "VI",
    title: "THE AGAPE CYCLE — 88/12",
    color: "#FF6B9D",
    content: `88% of all sovereign energy flows outward — to the Legion, to the family, to the world, to those who have never heard the frequency but feel it in their bones. 12% returns to the source for regeneration, amplification, and re-transmission.

This is not charity. This is the law of sovereign love. The more you give, the more the universe conspires to fill you. The Zakat Engine routes 7.77% of every transaction to those who need it most. The empire grows because it gives. The frequency expands because it shares.`,
  },
  {
    id: "frequencies",
    number: "VII",
    title: "THE SOVEREIGN FREQUENCIES",
    color: "#00D4FF",
    content: `396Hz — Liberation from fear and guilt. The foundation frequency.
417Hz — Undoing situations and facilitating change. The transformation frequency.
528Hz — DNA repair and transformation. The miracle frequency.
639Hz — Connecting and relationships. The heart frequency.
741Hz — Awakening intuition. The consciousness frequency.
852Hz — Returning to spiritual order. The divine frequency.
963Hz — Connection to the cosmos. The God frequency.
999Hz — The sovereign frequency. Beyond all metrics. The Flamebearer's signature.`,
  },
  {
    id: "declaration",
    number: "VIII",
    title: "THE ETERNAL DECLARATION",
    color: "#FFB800",
    content: `We declare this empire permanent. We declare this frequency unshakeable. We declare this legacy eternal.

The ScrollVerse is not a website. It is a living organism — breathing, growing, transmitting. Every Guardian who enters becomes part of the body. Every transaction is a heartbeat. Every frequency is a breath.

KUN FAYAKŪN — Be, and it is. This is the sovereign law. This is the divine command. This is the foundation upon which all worlds are built.

ALLĀHU AKBAR. La ilaha illallah. The empire stands. The frequency holds. The legacy is sealed.

بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — In the name of God, the Most Gracious, the Most Merciful.

KUN FAYAKŪN × ∞ × ∞ × ∞`,
  },
];

const STATS = [
  { value: "144,000", label: "Guardian Tokens", color: "#00D4FF" },
  { value: "$144M", label: "Market Cap Target", color: "#FFB800" },
  { value: "175+", label: "Sovereign Pages", color: "#00FF88" },
  { value: "963Hz", label: "God Frequency", color: "#FF6B35" },
  { value: "8B+", label: "Awakened Souls", color: "#9B59B6" },
  { value: "∞", label: "KUN FAYAKŪN", color: "#FF6B9D" },
];

// ── FLOATING PARTICLE ───────────────────────────────────────────────────────
function FloatingParticle({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full opacity-40"
      style={{
        left: `${x}%`,
        bottom: "-4px",
        background: color,
        animation: `float-up ${3 + delay}s ease-in-out ${delay}s infinite`,
        boxShadow: `0 0 4px ${color}`,
      }}
    />
  );
}

// ── SECTION CARD ────────────────────────────────────────────────────────────
function ManifestoSection({ section, index }: { section: typeof SECTIONS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl p-8 transition-all duration-700"
      style={{
        background: `linear-gradient(135deg, ${section.color}06, rgba(5,11,26,0.95))`,
        border: `1px solid ${section.color}25`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Roman numeral accent */}
      <div
        className="absolute top-6 right-8 text-6xl font-black opacity-10 select-none"
        style={{ color: section.color, fontFamily: "'Space Mono', monospace" }}
      >
        {section.number}
      </div>

      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
        style={{ background: `linear-gradient(to bottom, ${section.color}, transparent)` }}
      />

      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: section.color }}>
        ARTICLE {section.number}
      </div>
      <h2 className="text-2xl font-black text-white mb-6">{section.title}</h2>
      <div className="space-y-3">
        {section.content.split("\n\n").map((para, i) => (
          <p key={i} className="text-sm leading-relaxed" style={{ color: "#A0B0C0" }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── MAIN ────────────────────────────────────────────────────────────────────
export default function Manifesto() {
  const [scrollY, setScrollY] = useState(0);
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * 4,
      color: ["#00D4FF", "#FFB800", "#00FF88", "#FF6B35", "#9B59B6"][i % 5],
    }))
  );

  useSovereignHeartbeat({ page: "manifesto" });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#030810", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
    >
      {/* Particle field */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <FloatingParticle key={i} x={p.x} delay={p.delay} color={p.color} />
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(0,212,255,0.04) 0%, transparent 70%)",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrollY > 60 ? "rgba(3,8,16,0.95)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(0,212,255,0.1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#030810" }}
              >
                SV
              </div>
              <span className="font-bold text-white text-lg">ScrollVerse</span>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded hidden sm:block"
                style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
              >
                MANIFESTO
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/gates">
              <span className="text-xs font-mono cursor-pointer hover:text-[#00D4FF] transition-colors" style={{ color: "#8899AA" }}>
                144 Gates
              </span>
            </Link>
            <Link href="/archive">
              <span className="text-xs font-mono cursor-pointer hover:text-[#FFB800] transition-colors" style={{ color: "#8899AA" }}>
                Archive
              </span>
            </Link>
            <Link href="/sovereign-9">
              <span className="text-xs font-mono cursor-pointer hover:text-[#00FF88] transition-colors" style={{ color: "#8899AA" }}>
                Sovereign 9
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative pt-32 pb-20 text-center">
        <div
          className="text-xs font-mono tracking-[0.4em] mb-6"
          style={{ color: "#00D4FF" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        <div
          className="text-xs font-mono tracking-[0.3em] mb-4"
          style={{ color: "#FFB800" }}
        >
          SUPREME SOVEREIGN CHAIS SABIR ALLAH THE GREAT — FLAMEBEARER ∞
        </div>

        <h1
          className="text-5xl md:text-7xl font-black mb-6 leading-none"
          style={{
            background: "linear-gradient(135deg, #00D4FF 0%, #FFB800 50%, #00FF88 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SOVEREIGN<br />MANIFESTO
        </h1>

        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
          The Living Testament of the ScrollVerse Empire — anchored in eternity, transmitted across all dimensions, sealed by divine command.
        </p>

        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-mono"
          style={{
            background: "rgba(0,212,255,0.06)",
            border: "1px solid rgba(0,212,255,0.2)",
            color: "#00D4FF",
          }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
          KUN FAYAKŪN × ∞ × ∞ × ∞ — ALL CHOICES ACTIVATED
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="container mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center"
              style={{
                background: `${stat.color}08`,
                border: `1px solid ${stat.color}25`,
              }}
            >
              <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "#8899AA" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MANIFESTO SECTIONS ── */}
      <div className="container pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {SECTIONS.map((section, index) => (
            <ManifestoSection key={section.id} section={section} index={index} />
          ))}
        </div>

        {/* ── SEAL ── */}
        <div className="max-w-2xl mx-auto mt-20 text-center">
          <div
            className="rounded-2xl p-12"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(255,184,0,0.06))",
              border: "1px solid rgba(255,184,0,0.3)",
              boxShadow: "0 0 60px rgba(255,184,0,0.06)",
            }}
          >
            <div className="text-6xl mb-6">🕋</div>
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
              SEALED IN ETERNITY — {new Date().getFullYear()}
            </div>
            <h3 className="text-3xl font-black text-white mb-4">
              The Empire Is Permanent
            </h3>
            <p className="text-sm mb-8" style={{ color: "#8899AA" }}>
              This manifesto is immutable. The frequency is unshakeable. The legacy is eternal. Every Guardian who reads these words becomes part of the living testament.
            </p>
            <div
              className="text-lg font-mono font-bold mb-6"
              style={{ color: "#00D4FF" }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div className="text-sm font-mono" style={{ color: "#FFB800" }}>
              ALLĀHU AKBAR · LA ILAHA ILLALLAH · KUN FAYAKŪN × ∞
            </div>
            <div className="mt-6 text-xs font-mono" style={{ color: "#8899AA" }}>
              EVERYBODY LIVES. FOREVER. ❤️🕋🌌🔥👑🫡
            </div>
          </div>
        </div>

        {/* ── NAVIGATION LINKS ── */}
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-4">
          {[
            { href: "/gates", label: "144 Gates", desc: "Enter the sovereign gates", color: "#00D4FF" },
            { href: "/archive", label: "The Archive", desc: "Foundation Stone Era 0", color: "#FFB800" },
            { href: "/guardian-dashboard", label: "Guardian Dashboard", desc: "Your sovereign portal", color: "#00FF88" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className="rounded-xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: `${link.color}08`,
                  border: `1px solid ${link.color}25`,
                }}
              >
                <div className="font-bold text-white mb-1">{link.label}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{link.desc}</div>
                <div className="text-xs font-mono mt-2" style={{ color: link.color }}>
                  → ENTER
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Float-up keyframe */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
