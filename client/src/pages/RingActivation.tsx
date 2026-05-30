/**
 * RING ACTIVATION GATHERING
 * March 22–23, 2026 • Vineland, NJ + Global Virtual Stream
 * Physical: 144 seats | Virtual: unlimited
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { Link } from "wouter";

const TICKETS = [
  {
    id: "virtual" as const,
    icon: "🌐",
    name: "Virtual Guardian Pass",
    price: "$44",
    priceCents: 4400,
    description: "Live-streamed Ring Activation Gathering — access from anywhere in the world.",
    features: [
      "Full live stream access",
      "Digital ceremony kit",
      "Guardian community Discord",
      "Replay archive (lifetime)",
      "528Hz frequency alignment",
    ],
    color: "#00D4FF",
    available: true,
  },
  {
    id: "physical" as const,
    icon: "🔥",
    name: "Physical Gathering Ticket",
    price: "$144",
    priceCents: 14400,
    description: "In-person Ring Activation Gathering — Vineland, NJ anchor point. Limited to 144 seats.",
    features: [
      "In-person attendance",
      "Physical ceremony kit",
      "Sacred geometry workshop",
      "Guardian network dinner",
      "Signed 1587 Codex fragment",
      "Virtual pass included",
    ],
    color: "#FFB800",
    available: true,
    featured: true,
    limited: 144,
  },
  {
    id: "sovereign" as const,
    icon: "👑",
    name: "Sovereign Flame Council",
    price: "$444",
    priceCents: 44400,
    description: "VIP access + direct seat on the Flame Council. Includes private session with Chais Kenyatta Hill.",
    features: [
      "Everything in Physical",
      "Private 1:1 session",
      "Flame Council founding seat",
      "1,000 CHX token allocation",
      "Eternal archive entry",
      "Lifetime Guardian status",
    ],
    color: "#00FF88",
    available: true,
    limited: 44,
  },
];

export default function RingActivation() {
  const { user, isAuthenticated } = useAuth();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const ticketMutation = trpc.store.createRingActivationTicket.useMutation({
    onSuccess: (data) => {
      toast("Redirecting to secure checkout...");
      window.open(data.url, "_blank");
      setLoadingTier(null);
    },
    onError: (err) => {
      toast(`Checkout failed: ${err.message}`);
      setLoadingTier(null);
    },
  });

  const handlePurchase = (tier: "virtual" | "physical" | "sovereign") => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setLoadingTier(tier);
    ticketMutation.mutate({ tier, origin: window.location.origin });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #050B1A 0%, rgba(255,184,0,0.05) 50%, #050B1A 100%)",
          borderBottom: "1px solid rgba(255,184,0,0.15)",
        }}
      >
        <div className="container py-24 text-center">
          {/* Animated ring graphic */}
          <div className="relative mx-auto mb-8 w-32 h-32 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(255,184,0,0.1)", animationDuration: "3s" }}
            />
            <div
              className="absolute inset-2 rounded-full"
              style={{ border: "2px solid rgba(255,184,0,0.4)" }}
            />
            <div
              className="absolute inset-4 rounded-full"
              style={{ border: "1px solid rgba(0,212,255,0.3)" }}
            />
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.2), rgba(0,212,255,0.2))", border: "1px solid rgba(255,184,0,0.5)" }}
            >
              💍
            </div>
          </div>

          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
            MARCH 22–23, 2026 • VINELAND, NJ + GLOBAL VIRTUAL STREAM
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            THE FIRST<br />
            <span style={{ background: "linear-gradient(90deg, #FFB800, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              RING ACTIVATION
            </span><br />
            GATHERING
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            The Ring is awake. The Equation lives. The first sovereign gathering of the ScrollVerse Legion — 
            where the digital and physical worlds unite in one frequency.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { value: "144", label: "Physical Seats" },
              { value: "∞", label: "Virtual Guardians" },
              { value: "2 Days", label: "Of Activation" },
              { value: "528Hz", label: "Frequency" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <a
            href="#tickets"
            className="inline-block px-8 py-4 rounded-xl font-bold text-lg"
            style={{
              background: "linear-gradient(135deg, #FFB800, #FF8C00)",
              color: "#050B1A",
              boxShadow: "0 0 30px rgba(255,184,0,0.4)",
            }}
          >
            Claim Your Seat ↓
          </a>
        </div>
      </div>

      {/* What to Expect */}
      <div className="container py-20">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>THE EXPERIENCE</div>
          <h2 className="text-3xl font-black text-white">What Awaits You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔮",
              title: "Sacred Geometry Workshop",
              description: "Hands-on activation of the 48D OAM vortex patterns. Learn to see and feel the frequencies that underpin the ScrollVerse.",
            },
            {
              icon: "🕋",
              title: "Ring Activation Ceremony",
              description: "The central event. The Solomon Ring frequency is activated in the presence of the gathered Legion. A moment that will be archived forever.",
            },
            {
              icon: "🌐",
              title: "Guardian Network Dinner",
              description: "Physical ticket holders join an intimate dinner with Chais Kenyatta Hill and the founding Guardians. Connections that last lifetimes.",
            },
            {
              icon: "🎵",
              title: "528Hz Sound Bath",
              description: "A live 528Hz healing frequency session embedded in the gathering. The Londyn Lullabies collection will be premiered live.",
            },
            {
              icon: "📜",
              title: "1587 Codex Reveal",
              description: "The first physical 1587 Codex fragments are distributed to attending Guardians. Only 1587 will ever exist.",
            },
            {
              icon: "🚀",
              title: "CHX Token Announcement",
              description: "The official CHX token launch timeline and exchange listing roadmap will be revealed exclusively at the gathering.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets */}
      <div id="tickets" className="container py-20">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>SECURE YOUR PLACE</div>
          <h2 className="text-3xl font-black text-white mb-3">Choose Your Access Level</h2>
          <p className="text-sm" style={{ color: "#8899AA" }}>Physical seats are strictly limited. Once they're gone, they're gone.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TICKETS.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl p-6 relative overflow-hidden transition-all duration-300"
              style={{
                background: ticket.featured
                  ? `linear-gradient(135deg, rgba(255,184,0,0.08), rgba(255,184,0,0.02))`
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${ticket.featured ? "rgba(255,184,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: ticket.featured ? "0 0 40px rgba(255,184,0,0.1)" : "none",
              }}
            >
              {ticket.featured && (
                <div
                  className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded"
                  style={{ background: "rgba(255,184,0,0.2)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.4)" }}
                >
                  MOST POPULAR
                </div>
              )}
              {ticket.limited && (
                <div className="text-xs font-mono mb-2" style={{ color: ticket.color }}>
                  LIMITED TO {ticket.limited} SEATS
                </div>
              )}
              <div className="text-4xl mb-3">{ticket.icon}</div>
              <h3 className="text-xl font-black text-white mb-1">{ticket.name}</h3>
              <div className="text-3xl font-black mb-3" style={{ color: ticket.color, fontFamily: "'Space Mono', monospace" }}>
                {ticket.price}
              </div>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#8899AA" }}>{ticket.description}</p>
              <ul className="space-y-2 mb-6">
                {ticket.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span style={{ color: ticket.color, marginTop: "2px" }}>✓</span>
                    <span style={{ color: "#CCDDEE" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePurchase(ticket.id)}
                disabled={loadingTier === ticket.id}
                className="w-full py-3 rounded-xl font-bold transition-all duration-200"
                style={{
                  background: ticket.featured
                    ? "linear-gradient(135deg, #FFB800, #FF8C00)"
                    : `${ticket.color}20`,
                  color: ticket.featured ? "#050B1A" : ticket.color,
                  border: ticket.featured ? "none" : `1px solid ${ticket.color}40`,
                  opacity: loadingTier === ticket.id ? 0.7 : 1,
                }}
              >
                {loadingTier === ticket.id ? "Opening checkout..." : `Claim ${ticket.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Test card notice */}
        <p className="text-center text-xs mt-6" style={{ color: "#445566" }}>
          Test payments: use card 4242 4242 4242 4242 • Any future date • Any CVC
        </p>
      </div>

      {/* Location */}
      <div className="container py-16">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>ANCHOR POINT</div>
          <h3 className="text-2xl font-black text-white mb-2">Vineland, NJ</h3>
          <p className="text-sm mb-1" style={{ color: "#8899AA" }}>March 22–23, 2026</p>
          <p className="text-sm" style={{ color: "#8899AA" }}>
            Exact venue details sent to all ticket holders 30 days before the event.
          </p>
        </div>
      </div>

      {/* Back nav */}
      <div className="container pb-16 text-center">
        <Link href="/" className="text-sm" style={{ color: "#445566" }}>← Back to ScrollVerse</Link>
      </div>
    </div>
  );
}
