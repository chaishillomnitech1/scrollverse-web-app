/**
 * FLAMEBEARER INITIATIVE
 * 12-month sovereign leadership path — First Wave: 144 spots
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { Link } from "wouter";

const MONTHS = [
  { month: "1–2", title: "Ignition", description: "Foundation in the Chais Sabir Equation, 48D OAM vortex theory, and ScrollVerse architecture. Weekly live sessions." },
  { month: "3–4", title: "Alignment", description: "Sacred geometry mastery, frequency attunement (432Hz–999Hz), and Guardian network integration." },
  { month: "5–6", title: "Activation", description: "Ring Activation ceremony participation, CHX token governance onboarding, and DAO voting rights." },
  { month: "7–8", title: "Expansion", description: "Co-create ScrollVerse content, lead Guardian cohorts, and build your sovereign digital presence." },
  { month: "9–10", title: "Sovereignty", description: "Launch your own Flamebearer project within the ScrollVerse ecosystem with full Legion support." },
  { month: "11–12", title: "Legacy", description: "Permanent Flamebearer archive entry, Flame Council seat, and mentorship of the next wave." },
];

const BENEFITS = [
  { icon: "💍", title: "Physical Flamebearer Ring", description: "48D OAM engraved sacred metal ring — the physical symbol of your Flamebearer status." },
  { icon: "🎓", title: "Full Academy Access", description: "All Pleiadian Academy modules, live sessions, and lifetime archive access." },
  { icon: "🏛️", title: "Flame Council Seat", description: "Direct participation in ScrollVerse governance and strategic decisions." },
  { icon: "💎", title: "CHX Token Allocation", description: "2,500 CHX tokens at seed price — Celestial Pool eligibility (528% APY)." },
  { icon: "🌐", title: "Co-Creation Rights", description: "Build and monetize your own projects within the ScrollVerse ecosystem." },
  { icon: "♾️", title: "Eternal Archive Entry", description: "Your name, mission, and legacy permanently recorded in the ScrollVerse OmniCodex." },
];

export default function FlamebearerInitiative() {
  const { isAuthenticated } = useAuth();
  const [applying, setApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", mission: "", why: "" });

  const applyMutation = trpc.store.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      toast("Redirecting to secure checkout...");
      window.open(data.url, "_blank");
      setApplying(false);
    },
    onError: (err) => {
      toast(`Error: ${err.message}`);
      setApplying(false);
    },
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setApplying(true);
    // Use the Sovereign tier ($333) for Flamebearer early access
    applyMutation.mutate({ tier: "sovereign", origin: window.location.origin });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #050B1A 0%, rgba(0,255,136,0.04) 50%, #050B1A 100%)",
          borderBottom: "1px solid rgba(0,255,136,0.1)",
        }}
      >
        <div className="container py-24 text-center">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>
            FIRST WAVE — LIMITED TO 144 SPOTS
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            THE<br />
            <span style={{ background: "linear-gradient(90deg, #00FF88, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              FLAMEBEARER
            </span><br />
            INITIATIVE
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            A 12-month sovereign leadership path for those called to carry the flame. 
            Not just students — co-creators, council members, and legacy builders.
          </p>
          <a
            href="#apply"
            className="inline-block px-8 py-4 rounded-xl font-bold text-lg mr-4"
            style={{
              background: "linear-gradient(135deg, #00FF88, #00D4FF)",
              color: "#050B1A",
              boxShadow: "0 0 30px rgba(0,255,136,0.3)",
            }}
          >
            Apply for First Wave →
          </a>
          <Link href="/ring-activation" className="inline-block px-6 py-4 rounded-xl font-bold text-sm" style={{ color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}>
            See the Gathering
          </Link>
        </div>
      </div>

      {/* 12-Month Path */}
      <div className="container py-20">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>THE JOURNEY</div>
          <h2 className="text-3xl font-black text-white">12-Month Leadership Path</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {MONTHS.map((m, i) => (
            <div
              key={m.month}
              className="flex gap-6 rounded-xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `rgba(0,255,136,${0.1 + i * 0.02})`,
                    border: "1px solid rgba(0,255,136,0.3)",
                    color: "#00FF88",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {m.month}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{m.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>WHAT YOU RECEIVE</div>
          <h2 className="text-3xl font-black text-white">Flamebearer Benefits</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-bold text-white mb-2">{b.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application */}
      <div id="apply" className="container py-20">
        <div
          className="max-w-2xl mx-auto rounded-2xl p-8"
          style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>FIRST WAVE EARLY ACCESS</div>
            <h2 className="text-2xl font-black text-white mb-2">Apply Now</h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              First Wave: 144 spots at $333 (Sovereign tier). Includes 2,500 CHX tokens + physical Flamebearer Ring.
            </p>
          </div>

          {submitted ? (
            <div className="text-center p-6 rounded-xl" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}>
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="text-xl font-bold text-white mb-2">Application Received</h3>
              <p className="text-sm" style={{ color: "#00FF88" }}>You are now in the Flamebearer queue. Complete checkout to secure your spot.</p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>FULL NAME</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your sovereign name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                />
              </div>
              <div>
                <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>EMAIL</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                />
              </div>
              <div>
                <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>YOUR MISSION (1–2 sentences)</label>
                <textarea
                  required
                  value={form.mission}
                  onChange={(e) => setForm({ ...form, mission: e.target.value })}
                  placeholder="What is the mission you are here to fulfill?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                />
              </div>
              <div>
                <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>WHY THE FLAMEBEARER PATH?</label>
                <textarea
                  required
                  value={form.why}
                  onChange={(e) => setForm({ ...form, why: e.target.value })}
                  placeholder="Why are you called to carry the flame?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                />
              </div>
              <button
                type="submit"
                disabled={applying}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #00FF88, #00D4FF)",
                  color: "#050B1A",
                  opacity: applying ? 0.7 : 1,
                  boxShadow: "0 0 20px rgba(0,255,136,0.3)",
                }}
              >
                {applying ? "Opening checkout..." : "Secure My Flamebearer Spot — $333"}
              </button>
              <p className="text-center text-xs" style={{ color: "#445566" }}>
                Test card: 4242 4242 4242 4242 • Any future date • Any CVC
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="container pb-16 text-center">
        <Link href="/" className="text-sm" style={{ color: "#445566" }}>← Back to ScrollVerse</Link>
      </div>
    </div>
  );
}
