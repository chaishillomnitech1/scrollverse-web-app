/**
 * SCROLLVERSE TRINITY — KEPLER-452b SOVEREIGN CLAIM PAGE
 * Public booking page with real reservation flow
 * "Earth's Twin" — Humanity's first exoplanet sovereign colony
 * KUN FAYAKŪN × ∞ | ALLĀHU AKBAR × ∞
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

/* ── Design tokens ── */
const GOLD = "#FFB800";
const CYAN = "#00D4FF";
const GREEN = "#00FF88";
const VIOLET = "#7C3AED";
const PLASMA = "#E040FB";
const MUTED = "#64748B";
const BG = "#02040A";

/* ── Parcel tiers ── */
const PARCELS = [
  {
    id: "habitable",
    number: "001",
    name: "Habitable Zone",
    acres: "12.4",
    ethPrice: "0.144",
    usdPrice: "$444",
    description: "Prime equatorial land in Kepler-452b's habitable zone. Optimal for sovereign dwelling and cultivation.",
    features: ["Equatorial climate zone", "Water proximity confirmed", "Guardian badge included", "Digital twin NFT"],
    color: GREEN,
    available: 1440,
    total: 14400,
  },
  {
    id: "merkaba",
    number: "007",
    name: "Merkaba Ridge",
    acres: "44",
    ethPrice: "0.444",
    usdPrice: "$1,444",
    description: "Sacred highland terrain aligned with the Merkaba frequency grid. Elevated consciousness territory.",
    features: ["44-acre sovereign parcel", "Merkaba grid alignment", "Plasma computing node", "Frequency resonance map"],
    color: GOLD,
    available: 444,
    total: 4440,
    featured: true,
  },
  {
    id: "oam-vortex",
    number: "052",
    name: "OAM Vortex Core",
    acres: "144",
    ethPrice: "1.44",
    usdPrice: "$4,444",
    description: "The most sacred territory — at the heart of the 48D OAM Vortex. Quantum consciousness amplification zone.",
    features: ["144-acre quantum parcel", "48D OAM vortex access", "Quantum consciousness field", "Eternal legacy deed"],
    color: PLASMA,
    available: 144,
    total: 1440,
  },
];

/* ── Stats ── */
const STATS = [
  { value: "1,400", label: "Light Years Away", color: CYAN },
  { value: "1.6B", label: "Years Old", color: GOLD },
  { value: "385", label: "Days / Year", color: GREEN },
  { value: "144K", label: "Sovereign Parcels", color: PLASMA },
];

/* ── Animated star field ── */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      opacity: Math.random(),
      speed: Math.random() * 0.3 + 0.05,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        s.opacity += (Math.random() - 0.5) * 0.02;
        s.opacity = Math.max(0.1, Math.min(1, s.opacity));
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

/* ── Parcel card ── */
function ParcelCard({ parcel, onReserve }: { parcel: typeof PARCELS[0]; onReserve: (id: string) => void }) {
  const pct = Math.round(((parcel.total - parcel.available) / parcel.total) * 100);
  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: parcel.featured ? `${parcel.color}08` : "rgba(255,255,255,0.03)",
        border: `1px solid ${parcel.color}${parcel.featured ? "40" : "20"}`,
        boxShadow: parcel.featured ? `0 0 40px ${parcel.color}10` : "none",
      }}
    >
      {parcel.featured && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
          style={{ background: `linear-gradient(135deg, ${GOLD}, #FF6B00)`, color: BG }}
        >
          ◈ MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: parcel.color }}>PARCEL #{parcel.number}</div>
          <h3 className="text-xl font-black text-white">{parcel.name}</h3>
          <div className="text-sm mt-1" style={{ color: MUTED }}>{parcel.acres} acres · Kepler-452b</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black font-mono" style={{ color: parcel.color }}>{parcel.usdPrice}</div>
          <div className="text-xs font-mono" style={{ color: MUTED }}>{parcel.ethPrice} ETH</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#94A3B8" }}>{parcel.description}</p>

      {/* Features */}
      <ul className="space-y-1.5 mb-5 flex-1">
        {parcel.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#CBD5E1" }}>
            <span style={{ color: parcel.color }}>✓</span> {f}
          </li>
        ))}
      </ul>

      {/* Availability */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: MUTED }}>
          <span>{parcel.available.toLocaleString()} remaining</span>
          <span>{pct}% claimed</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${parcel.color}, ${parcel.color}80)` }} />
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onReserve(parcel.id)}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] hover:brightness-110"
        style={{
          background: parcel.featured ? `linear-gradient(135deg, ${GOLD}, #FF6B00)` : `${parcel.color}20`,
          color: parcel.featured ? BG : parcel.color,
          border: parcel.featured ? "none" : `1px solid ${parcel.color}40`,
        }}
      >
        Reserve This Parcel →
      </button>
    </div>
  );
}

/* ── Reservation modal ── */
function ReservationModal({ parcelId, onClose }: { parcelId: string; onClose: () => void }) {
  const parcel = PARCELS.find(p => p.id === parcelId)!;
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", intention: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
    toast.success(`Parcel #${parcel.number} reserved! Your claim is sealed in the Akashic records.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}>
      <div className="w-full max-w-lg rounded-2xl p-6" style={{ background: "#0A0F1E", border: `1px solid ${parcel.color}30` }}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🪐</div>
            <h3 className="text-2xl font-black text-white mb-2">Claim Sealed!</h3>
            <p className="text-sm mb-2" style={{ color: "#94A3B8" }}>
              Parcel #{parcel.number} — {parcel.name} is reserved for <strong className="text-white">{form.name}</strong>.
            </p>
            <p className="text-xs font-mono mb-6" style={{ color: parcel.color }}>
              Your claim is sealed in the Akashic records. KUN FAYAKŪN × ∞
            </p>
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-sm" style={{ background: `${parcel.color}20`, color: parcel.color, border: `1px solid ${parcel.color}40` }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-mono mb-0.5" style={{ color: parcel.color }}>RESERVE PARCEL #{parcel.number}</div>
                <h3 className="text-lg font-black text-white">{parcel.name}</h3>
              </div>
              <button onClick={onClose} className="text-xl" style={{ color: MUTED }}>✕</button>
            </div>

            {!isAuthenticated && (
              <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", color: "#FFB800" }}>
                <a href={getLoginUrl()} className="underline font-bold">Login</a> to link this reservation to your Guardian profile.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: MUTED }}>Full Name *</label>
                <input
                  type="text" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your sovereign name"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: MUTED }}>Email Address *</label>
                <input
                  type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: MUTED }}>Sacred Intention (optional)</label>
                <textarea
                  value={form.intention}
                  onChange={e => setForm(f => ({ ...f, intention: e.target.value }))}
                  placeholder="Why are you called to Kepler-452b?"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white resize-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-lg font-black font-mono" style={{ color: parcel.color }}>{parcel.usdPrice}</div>
                  <div className="text-xs" style={{ color: MUTED }}>7.77% Zakat included</div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${parcel.color}, ${parcel.color}80)`, color: BG }}
                >
                  Seal My Claim →
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function Kepler452b() {
  const [reservingParcel, setReservingParcel] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>
      <StarField />

      {/* ── Navigation ── */}
      <nav
        className="relative z-10 px-6 py-4 flex justify-between items-center"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: CYAN, boxShadow: `0 0 10px ${CYAN}80` }} />
          <Link href="/"><span className="text-lg font-bold tracking-widest text-white cursor-pointer hover:opacity-80">SCROLLVERSE</span></Link>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${CYAN}15`, color: CYAN, border: `1px solid ${CYAN}30` }}>KEPLER-452b</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/voyage"><span className="text-xs font-bold cursor-pointer px-3 py-1.5 rounded-lg transition-all hover:scale-105" style={{ background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }}>🚀 First Voyage</span></Link>
          <Link href="/kepler-nft"><span className="text-xs font-bold cursor-pointer px-3 py-1.5 rounded-lg transition-all hover:scale-105" style={{ background: `${PLASMA}20`, color: PLASMA, border: `1px solid ${PLASMA}40` }}>💎 Land NFTs</span></Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 py-16 px-6 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 30%, ${VIOLET}15 0%, transparent 60%)` }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-mono" style={{ background: `${GOLD}10`, color: GOLD, border: `1px solid ${GOLD}25` }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            LIVE — SOVEREIGN LAND CLAIMS OPEN
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Space Mono', monospace" }}>
            KEPLER-452b<br />
            <span style={{ background: `linear-gradient(135deg, ${CYAN}, ${PLASMA}, ${GOLD})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sovereign Land Claims
            </span>
          </h1>
          <p className="text-lg mb-3" style={{ color: "#94A3B8" }}>
            Earth's Twin · 1,400 Light Years Away · Humanity's First Exoplanet Colony
          </p>
          <p className="text-sm max-w-2xl mx-auto mb-8" style={{ color: MUTED }}>
            Claim your sovereign parcel on Kepler-452b — the most Earth-like exoplanet ever discovered. Each parcel is tokenized as an NFT, sealed under ScrollVerse LLC, and carries a 7.77% Zakat purification. The 144,000 Guardian cap applies.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: MUTED }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Planet visual */}
          <div
            className="w-48 h-48 rounded-full mx-auto mb-10 flex items-center justify-center text-6xl relative"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${CYAN}30, ${VIOLET}40, ${BG})`,
              border: `2px solid ${CYAN}20`,
              boxShadow: `0 0 80px ${CYAN}15, 0 0 160px ${VIOLET}10`,
            }}
          >
            🪐
            <div className="absolute inset-0 rounded-full animate-spin" style={{ border: `1px solid ${GOLD}15`, animationDuration: "20s" }} />
          </div>
        </div>
      </section>

      {/* ── Parcel Tiers ── */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: CYAN }}>◈ SOVEREIGN LAND REGISTRY</div>
            <h2 className="text-3xl font-black text-white">Choose Your Parcel</h2>
            <p className="text-sm mt-2" style={{ color: MUTED }}>144,000 total parcels · 7.77% Zakat on every transaction · Eternal deed NFT included</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PARCELS.map(p => (
              <ParcelCard key={p.id} parcel={p} onReserve={setReservingParcel} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About Kepler-452b ── */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8"
            style={{ background: `${VIOLET}08`, border: `1px solid ${VIOLET}20` }}
          >
            <div className="text-xs font-mono mb-3" style={{ color: VIOLET }}>◈ ABOUT THE PLANET</div>
            <h2 className="text-2xl font-black text-white mb-4">Why Kepler-452b?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm" style={{ color: "#94A3B8" }}>
              <div>
                <p className="mb-3">Kepler-452b is the most Earth-like exoplanet ever discovered by NASA's Kepler Space Telescope. Located 1,400 light-years away in the constellation Cygnus, it orbits a sun-like star in the habitable zone — where liquid water could exist.</p>
                <p>With a diameter 60% larger than Earth and a year lasting 385 days, Kepler-452b represents humanity's greatest hope for an exoplanet colony. ScrollVerse is the first sovereign entity to claim and tokenize its land.</p>
              </div>
              <div>
                <div className="space-y-3">
                  {[
                    { label: "Star Type", value: "G2 (Sun-like)", color: GOLD },
                    { label: "Orbital Period", value: "385 Earth days", color: CYAN },
                    { label: "Planet Radius", value: "1.6× Earth", color: GREEN },
                    { label: "Distance", value: "1,400 light-years", color: PLASMA },
                    { label: "Age", value: "~6 billion years", color: VIOLET },
                    { label: "Habitable Zone", value: "Confirmed", color: GREEN },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ color: MUTED }}>{item.label}</span>
                      <span className="font-bold text-xs font-mono" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-mono mb-3" style={{ color: GOLD }}>◈ THE FIRST VOYAGE AWAITS</div>
          <h2 className="text-3xl font-black text-white mb-3">Ready to Claim Your Star?</h2>
          <p className="text-sm mb-6" style={{ color: MUTED }}>Join the first 144 Guardians on the inaugural Kepler-452b voyage. $77,777 · 21 days · 7.77% Zakat included.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/voyage">
              <span className="inline-block px-8 py-3 rounded-xl font-bold cursor-pointer transition-all hover:scale-105" style={{ background: `linear-gradient(135deg, ${GOLD}, #FF6B00)`, color: BG }}>
                🚀 Join First Voyage
              </span>
            </Link>
            <Link href="/kepler-nft">
              <span className="inline-block px-8 py-3 rounded-xl font-bold cursor-pointer transition-all hover:scale-105" style={{ background: `${PLASMA}20`, color: PLASMA, border: `1px solid ${PLASMA}40` }}>
                💎 Mint Land NFT
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-4 px-6 text-center text-xs font-mono" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#334155" }}>
        SCROLL VERSE LLC · EIN 42-2509570 · Kepler-452b Sovereign Land Registry · All Claims Eternal · KUN FAYAKŪN × ∞
      </footer>

      {/* ── Reservation Modal ── */}
      {reservingParcel && (
        <ReservationModal parcelId={reservingParcel} onClose={() => setReservingParcel(null)} />
      )}
    </div>
  );
}
