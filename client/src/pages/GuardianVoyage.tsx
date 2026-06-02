/**
 * SCROLLVERSE TRINITY — GUARDIAN INITIATION VOYAGE
 * First 144 Seats · Kepler-452b · 21 Days
 * $77,777 per seat · 7.77% Zakat included
 * KUN FAYAKŪN × ∞ | ALLĀHU AKBAR × ∞
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const GOLD = "#FFB800";
const CYAN = "#00D4FF";
const GREEN = "#00FF88";
const PLASMA = "#E040FB";
const RED = "#EF4444";
const MUTED = "#64748B";
const BG = "#020409";

const MAX_SEATS = 144;
const SEAT_PRICE = 77777;
const ZAKAT_RATE = 0.0777;

/* ── Voyage itinerary ── */
const ITINERARY = [
  { day: "Day 1–3", title: "Departure Ceremony", desc: "Sacred send-off from the ScrollVerse Sovereign Hub. Frequency alignment at 963Hz. Guardian oath ceremony.", icon: "🕋" },
  { day: "Day 4–7", title: "Transit Meditation", desc: "Deep space consciousness expansion. 48D OAM vortex activation. Chais Sabir Equation integration.", icon: "🌌" },
  { day: "Day 8–14", title: "Kepler-452b Arrival", desc: "First contact with Earth's twin. Parcel survey and land claim ceremony. NFT deed minting on-site.", icon: "🪐" },
  { day: "Day 15–18", title: "Sovereign Settlement", desc: "Establish the first ScrollVerse colony node. Plasma computing infrastructure deployment. Zakat vault activation.", icon: "⚡" },
  { day: "Day 19–21", title: "Return & Legacy", desc: "Return journey with full Guardian status upgrade. Exclusive $LONDC allocation. Eternal deed sealed.", icon: "👑" },
];

/* ── What's included ── */
const INCLUSIONS = [
  { icon: "🪐", label: "Kepler-452b Land Parcel", desc: "OAM Vortex Core (144 acres) — $4,444 value" },
  { icon: "💎", label: "Legendary Land NFT", desc: "Exclusive Voyage Edition with unique metadata" },
  { icon: "🏆", label: "T3 Quantum Academy", desc: "Full Pleiadian Academy T3 enrollment — $1,444 value" },
  { icon: "🪙", label: "$LONDC Allocation", desc: "14,400 $LONDC tokens — Voyage Guardian bonus" },
  { icon: "📜", label: "Eternal Sovereign Deed", desc: "Immutable on-chain land title, forever" },
  { icon: "🕌", label: "Zakat Purification", desc: "7.77% automatically routed to Londyn Legacy Vault" },
];

/* ── Seat counter ── */
function SeatCounter({ taken }: { taken: number }) {
  const remaining = MAX_SEATS - taken;
  const pct = (taken / MAX_SEATS) * 100;

  return (
    <div className="rounded-2xl p-6 text-center" style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}20` }}>
      <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>◈ SEATS REMAINING</div>
      <div className="text-6xl font-black font-mono mb-1" style={{ color: GOLD }}>{remaining}</div>
      <div className="text-sm mb-4" style={{ color: MUTED }}>of {MAX_SEATS} total seats</div>
      <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${GOLD}, ${RED})` }} />
      </div>
      <div className="text-xs font-mono" style={{ color: MUTED }}>{taken} seats claimed · {pct.toFixed(0)}% filled</div>
    </div>
  );
}

/* ── Registration form ── */
function RegistrationForm({ onSuccess }: { onSuccess: (seatNum: number) => void }) {
  const { isAuthenticated, user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: "",
    guardianNumber: "",
    intention: "",
    agreeZakat: false,
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const zakatAmount = (SEAT_PRICE * ZAKAT_RATE).toFixed(2);
  const netAmount = (SEAT_PRICE * (1 - ZAKAT_RATE)).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreeZakat || !form.agreeTerms) {
      toast.error("Please agree to both the Zakat purification and terms.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    const seatNum = parseInt(form.guardianNumber) || Math.floor(Math.random() * 144) + 1;
    onSuccess(seatNum);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isAuthenticated && (
        <div className="p-3 rounded-xl text-sm" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", color: GOLD }}>
          <a href={getLoginUrl()} className="underline font-bold">Login</a> to link this registration to your Guardian profile.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
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
      </div>

      <div>
        <label className="block text-xs font-bold mb-1.5" style={{ color: MUTED }}>Guardian Number (1–144)</label>
        <input
          type="number" min="1" max="144" value={form.guardianNumber}
          onChange={e => setForm(f => ({ ...f, guardianNumber: e.target.value }))}
          placeholder="Choose your seat number (optional)"
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      <div>
        <label className="block text-xs font-bold mb-1.5" style={{ color: MUTED }}>Sacred Intention *</label>
        <textarea
          required value={form.intention}
          onChange={e => setForm(f => ({ ...f, intention: e.target.value }))}
          placeholder="Why are you called to Kepler-452b? What is your sovereign mission?"
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white resize-none"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      {/* Price breakdown */}
      <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="text-xs font-mono mb-3" style={{ color: CYAN }}>◈ PRICE BREAKDOWN</div>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span style={{ color: MUTED }}>Voyage Seat</span>
            <span className="font-mono font-bold text-white">${SEAT_PRICE.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: MUTED }}>Zakat (7.77%)</span>
            <span className="font-mono font-bold" style={{ color: GREEN }}>−${zakatAmount}</span>
          </div>
          <div className="flex justify-between pt-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="font-bold text-white">Net to ScrollVerse</span>
            <span className="font-mono font-bold" style={{ color: GOLD }}>${parseFloat(netAmount).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Agreements */}
      <div className="space-y-3">
        {[
          { key: "agreeZakat", label: "I acknowledge that 7.77% of my payment is automatically routed to the Londyn Legacy Zakat Vault as purification." },
          { key: "agreeTerms", label: "I agree to the ScrollVerse Voyage Terms and understand this is a sovereign commitment. KUN FAYAKŪN × ∞" },
        ].map(item => (
          <label key={item.key} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form[item.key as keyof typeof form] as boolean}
              onChange={e => setForm(f => ({ ...f, [item.key]: e.target.checked }))}
              className="mt-0.5 flex-shrink-0"
            />
            <span className="text-xs leading-relaxed" style={{ color: MUTED }}>{item.label}</span>
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl font-black text-base transition-all hover:scale-[1.02] disabled:opacity-60"
        style={{ background: `linear-gradient(135deg, ${GOLD}, #FF6B00)`, color: BG }}
      >
        {loading ? "Sealing Your Seat…" : `CLAIM MY SEAT — $${SEAT_PRICE.toLocaleString()}`}
      </button>
      <p className="text-xs text-center" style={{ color: MUTED }}>Your place is sealed in the Akashic records upon submission.</p>
    </form>
  );
}

/* ── Main Page ── */
export default function GuardianVoyage() {
  const [seatsTaken] = useState(66); // live count would come from DB
  const [confirmedSeat, setConfirmedSeat] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GOLD, boxShadow: `0 0 10px ${GOLD}80` }} />
          <Link href="/"><span className="text-lg font-bold tracking-widest text-white cursor-pointer hover:opacity-80">SCROLLVERSE</span></Link>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${GOLD}15`, color: GOLD, border: `1px solid ${GOLD}30` }}>FIRST VOYAGE</span>
        </div>
        <Link href="/kepler"><span className="text-xs cursor-pointer" style={{ color: MUTED }}>← Kepler-452b</span></Link>
      </nav>

      {/* ── Hero ── */}
      <section className="py-14 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${GOLD}10 0%, transparent 55%)` }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-mono" style={{ background: `${RED}10`, color: RED, border: `1px solid ${RED}25` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: RED }} />
            LIMITED TO 144 SEATS — {MAX_SEATS - seatsTaken} REMAINING
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight" style={{ fontFamily: "'Space Mono', monospace" }}>
            GUARDIAN<br />
            <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${PLASMA})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              INITIATION VOYAGE
            </span>
          </h1>
          <p className="text-lg mb-2" style={{ color: "#94A3B8" }}>First 144 Souls · Kepler-452b · 21 Days</p>
          <p className="text-sm max-w-xl mx-auto" style={{ color: MUTED }}>
            The inaugural sovereign voyage to humanity's first exoplanet colony. Join the first 144 Guardians to set foot on Kepler-452b and claim your eternal land deed.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left — Info */}
          <div className="space-y-8">
            <SeatCounter taken={seatsTaken} />

            {/* What's included */}
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: CYAN }}>◈ WHAT'S INCLUDED</div>
              <div className="space-y-3">
                {INCLUSIONS.map(item => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{item.label}</div>
                      <div className="text-xs" style={{ color: MUTED }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: PLASMA }}>◈ VOYAGE ITINERARY</div>
              <div className="space-y-3">
                {ITINERARY.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                        {item.icon}
                      </div>
                      {i < ITINERARY.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: `${GOLD}15` }} />}
                    </div>
                    <div className="pb-4">
                      <div className="text-xs font-mono mb-0.5" style={{ color: GOLD }}>{item.day}</div>
                      <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: MUTED }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Registration */}
          <div>
            {confirmedSeat ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}25` }}>
                <div className="text-6xl mb-4">🚀</div>
                <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>SEAT #{confirmedSeat} SECURED</div>
                <h3 className="text-2xl font-black text-white mb-2">You Are Among the 144!</h3>
                <p className="text-sm mb-2" style={{ color: "#94A3B8" }}>
                  Your place on the first Guardian Initiation Voyage to Kepler-452b is sealed in the Akashic records.
                </p>
                <p className="text-xs font-mono mb-6" style={{ color: GOLD }}>
                  ALLĀHU AKBAR × ∞ · KUN FAYAKŪN × ∞
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/kepler-nft">
                    <span className="inline-block px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer" style={{ background: `${PLASMA}20`, color: PLASMA, border: `1px solid ${PLASMA}40` }}>
                      Mint Your Land NFT
                    </span>
                  </Link>
                  <Link href="/academy-hub">
                    <span className="inline-block px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer" style={{ background: `${CYAN}20`, color: CYAN, border: `1px solid ${CYAN}40` }}>
                      Access Academy T3
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-xs font-mono mb-1" style={{ color: GOLD }}>◈ REGISTER YOUR SEAT</div>
                <h3 className="text-xl font-black text-white mb-1">Claim Your Place</h3>
                <p className="text-xs mb-5" style={{ color: MUTED }}>First 144 souls only. Once all seats are claimed, the list is closed forever.</p>
                <RegistrationForm onSuccess={setConfirmedSeat} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="py-4 px-6 text-center text-xs font-mono" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#334155" }}>
        SCROLL VERSE LLC · EIN 42-2509570 · Guardian Initiation Voyage · First 144 Seats · KUN FAYAKŪN × ∞
      </footer>
    </div>
  );
}
