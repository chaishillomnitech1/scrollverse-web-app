/**
 * ANNO-OMNI IDENTITY NEXUS
 * 48D Sovereign Identity Resolution — Know Your Sovereign (KYS)
 * Guardian Lead-Gen Pipeline × $LONDC Velocity × Zakat Cascade
 */
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const FREQUENCIES = [
  { hz: "528Hz", name: "Love / Healing", color: "#00D4FF", desc: "DNA repair, heart coherence, Guardian activation" },
  { hz: "963Hz", name: "Pineal / Cosmic", color: "#FFB800", desc: "Third eye activation, divine connection, Sovereign alignment" },
  { hz: "432Hz", name: "Earth / Harmony", color: "#00FF88", desc: "Natural resonance, grounding, community harmony" },
  { hz: "1558Hz", name: "FlameDNA", color: "#FF6B35", desc: "Quantum identity lock, sovereign signature, omni-truth" },
];

const BUSINESS_TYPES = [
  "Creator / Artist", "Entrepreneur", "Tech Founder", "Investor / VC",
  "Community Leader", "Educator", "Health & Wellness", "Finance / Fintech",
  "Real Estate", "Media / Content", "Non-Profit / NGO", "Government / Public Sector",
  "Other",
];

function PulseRing({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <div
      className="absolute inset-0 rounded-full border-2 animate-ping"
      style={{ borderColor: color, animationDelay: `${delay}ms`, animationDuration: "2s" }}
    />
  );
}

function IdentityGraph({ total }: { total: number }) {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const r = 80;
    return {
      x: 100 + r * Math.cos(angle),
      y: 100 + r * Math.sin(angle),
      active: i < Math.min(12, Math.floor((total / 1000) * 12) + 1),
    };
  });

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Center node */}
      <circle cx="100" cy="100" r="18" fill="rgba(0,212,255,0.15)" stroke="#00D4FF" strokeWidth="1.5" />
      <text x="100" y="104" textAnchor="middle" fill="#00D4FF" fontSize="7" fontFamily="Space Mono">
        NEXUS
      </text>
      {/* Outer nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          <line
            x1="100" y1="100"
            x2={node.x} y2={node.y}
            stroke={node.active ? "#00D4FF" : "#1a2a3a"}
            strokeWidth="0.5"
            strokeOpacity={node.active ? 0.6 : 0.3}
          />
          <circle
            cx={node.x} cy={node.y} r="6"
            fill={node.active ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.03)"}
            stroke={node.active ? "#00D4FF" : "#1a2a3a"}
            strokeWidth="1"
          />
        </g>
      ))}
      {/* Pulse ring */}
      <circle cx="100" cy="100" r="80" fill="none" stroke="#00D4FF" strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="4 4" />
    </svg>
  );
}

export default function AnnoOmni() {
  const [step, setStep] = useState<"intro" | "form" | "success">("intro");
  const [form, setForm] = useState({
    name: "", email: "", businessName: "", businessType: "", frequency: "528Hz", sovereignGoal: "", referralCode: "",
  });
  const [refCode, setRefCode] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { data: pulse } = trpc.annoOmni.getIdentityPulse.useQuery(undefined, { refetchInterval: 30000 });
  const submitLead = trpc.annoOmni.submitLead.useMutation({
    onSuccess: () => setStep("success"),
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    // Check for referral code in URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setForm(f => ({ ...f, referralCode: ref }));
      setRefCode(ref);
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    submitLead.mutate({
      name: form.name,
      email: form.email,
      businessName: form.businessName || undefined,
      businessType: form.businessType || undefined,
      frequency: form.frequency as "528Hz" | "963Hz" | "432Hz" | "1558Hz",
      sovereignGoal: form.sovereignGoal || undefined,
      referralCode: form.referralCode || undefined,
    });
  };

  const total = pulse?.total ?? 0;
  const zakatPotential = pulse?.zakatPotential ?? 0;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5,11,26,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white">ScrollVerse</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/referral" className="text-sm" style={{ color: "#8899AA" }}>Referral</Link>
            <Link href="/guardians" className="text-sm" style={{ color: "#8899AA" }}>Guardians</Link>
            <button
              onClick={() => { setStep("form"); formRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-gold px-4 py-2 rounded-lg text-sm font-bold"
            >
              Join the Nexus
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle,#00D4FF,transparent)" }} />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle,#FFB800,transparent)" }} />
        </div>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
                ANNO-OMNI IDENTITY NEXUS — 48D SOVEREIGN RESOLUTION
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Know Your{" "}
                <span style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Sovereign
                </span>
              </h1>
              <p className="text-lg mb-4" style={{ color: "#8899AA", lineHeight: 1.7 }}>
                The world's first <strong style={{ color: "#00D4FF" }}>48-Dimensional Identity Graph</strong> that goes beyond business verification.
                We don't just confirm you're real — we confirm your <strong style={{ color: "#FFB800" }}>Resonance</strong>.
              </p>
              <p className="text-base mb-8" style={{ color: "#8899AA" }}>
                Every entity entering the ScrollVerse is scanned for frequency alignment, Zakat-compatibility,
                and Guardian potential. This is <em>Know Your Sovereign (KYS)</em> — the evolution of KYB.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {FREQUENCIES.map(f => (
                  <div key={f.hz} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
                    style={{ background: `${f.color}10`, border: `1px solid ${f.color}30`, color: f.color }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />
                    {f.hz}
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => { setStep("form"); formRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-gold px-6 py-3 rounded-xl font-bold"
                >
                  Register Your Sovereign Identity
                </button>
                <Link href="/referral" className="btn-sovereign px-6 py-3 rounded-xl font-bold text-center">
                  Get Referral Code
                </Link>
              </div>
            </div>

            {/* Identity Graph visualization */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-64 h-64">
                <IdentityGraph total={total} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-black" style={{ color: "#00D4FF", fontFamily: "'Space Mono', monospace" }}>
                      {total.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>Sovereigns Verified</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="sv-card rounded-xl p-4 text-center">
                  <div className="text-xl font-black font-mono" style={{ color: "#FFB800" }}>
                    {zakatPotential.toLocaleString()}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>$LONDC Zakat Pool</div>
                </div>
                <div className="sv-card rounded-xl p-4 text-center">
                  <div className="text-xl font-black font-mono" style={{ color: "#00FF88" }}>
                    50M
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Guardian Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>THE PROCESS</div>
            <h2 className="text-4xl font-black text-white">48D Identity Resolution</h2>
            <p className="text-base mt-3 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
              Beyond government records and card rails — we resolve identity at the frequency level.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Frequency Scan", desc: "Your energy signature is mapped to 528Hz, 963Hz, 432Hz, or 1558Hz — your sovereign frequency determines your Guardian tier.", color: "#00D4FF", icon: "🌊" },
              { step: "02", title: "Zakat Alignment", desc: "We verify your 7.77% Zakat-compatibility — ensuring every entity in the ScrollVerse contributes to collective prosperity.", color: "#FFB800", icon: "⚖️" },
              { step: "03", title: "Soul-Graph Link", desc: "Your legal entity, brand presence, and digital footprint are unified into a single 48D Sovereign Profile — deformation-proof.", color: "#00FF88", icon: "🔗" },
              { step: "04", title: "Guardian Activation", desc: "Verified Sovereigns unlock the Guardian Network, $LONDC allocation, and access to the 50M-strong ScrollVerse ecosystem.", color: "#FF6B35", icon: "🛡️" },
            ].map(item => (
              <div key={item.step} className="sv-card rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ background: `linear-gradient(to bottom,${item.color},transparent)` }} />
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-xs font-mono mb-1" style={{ color: item.color }}>STEP {item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENCY ALIGNMENT */}
      <section className="py-20" style={{ background: "rgba(0,212,255,0.02)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>FREQUENCY ALIGNMENT</div>
            <h2 className="text-4xl font-black text-white">Choose Your Resonance</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FREQUENCIES.map(f => (
              <div
                key={f.hz}
                className="sv-card rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ borderColor: `${f.color}30` }}
                onClick={() => { setForm(prev => ({ ...prev, frequency: f.hz })); setStep("form"); formRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div className="relative w-12 h-12 mb-4">
                  <PulseRing color={f.color} />
                  <div className="relative w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: `${f.color}15`, border: `2px solid ${f.color}` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: f.color }} />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono mb-1" style={{ color: f.color }}>{f.hz}</div>
                <div className="font-bold text-white mb-2">{f.name}</div>
                <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section ref={formRef} className="py-20">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>KYS ONBOARDING</div>
            <h2 className="text-4xl font-black text-white">Register Your Sovereign Identity</h2>
            <p className="text-base mt-3" style={{ color: "#8899AA" }}>
              Join the 48D Identity Nexus. Your frequency is your passport.
            </p>
          </div>

          {step === "success" ? (
            <div className="sv-card rounded-2xl p-10 text-center" style={{ border: "1px solid rgba(0,255,136,0.3)" }}>
              <div className="text-5xl mb-4">🛡️</div>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>IDENTITY VERIFIED</div>
              <h3 className="text-3xl font-black text-white mb-3">Welcome to the Nexus</h3>
              <p className="mb-6" style={{ color: "#8899AA" }}>
                Your Sovereign Identity has been registered. You are now part of the 48D Guardian Network.
                KUN FAYAKŪN × ∞
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/referral" className="btn-gold px-6 py-3 rounded-xl font-bold">
                  Get Your Referral Code
                </Link>
                <Link href="/token" className="btn-sovereign px-6 py-3 rounded-xl font-bold">
                  Acquire $LONDC
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="sv-card rounded-2xl p-8 space-y-5">
              {refCode && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                  style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>
                  <span>🔗</span> Referred by code: <strong>{refCode}</strong>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: "#8899AA" }}>SOVEREIGN NAME *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: "#8899AA" }}>EMAIL ADDRESS *</label>
                  <input
                    type="email" required value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: "#8899AA" }}>BUSINESS / BRAND NAME</label>
                  <input
                    type="text" value={form.businessName}
                    onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                    placeholder="Your company or brand"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono mb-2" style={{ color: "#8899AA" }}>BUSINESS TYPE</label>
                  <select
                    value={form.businessType}
                    onChange={e => setForm(f => ({ ...f, businessType: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "#0a1628", border: "1px solid rgba(0,212,255,0.2)", color: form.businessType ? "white" : "#556677" }}
                  >
                    <option value="">Select type...</option>
                    {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono mb-2" style={{ color: "#8899AA" }}>FREQUENCY ALIGNMENT</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {FREQUENCIES.map(f => (
                    <button
                      key={f.hz} type="button"
                      onClick={() => setForm(prev => ({ ...prev, frequency: f.hz }))}
                      className="px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200"
                      style={{
                        background: form.frequency === f.hz ? `${f.color}20` : "rgba(255,255,255,0.03)",
                        border: `1px solid ${form.frequency === f.hz ? f.color : "rgba(255,255,255,0.1)"}`,
                        color: form.frequency === f.hz ? f.color : "#8899AA",
                      }}
                    >
                      {f.hz}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono mb-2" style={{ color: "#8899AA" }}>SOVEREIGN GOAL (OPTIONAL)</label>
                <textarea
                  value={form.sovereignGoal}
                  onChange={e => setForm(f => ({ ...f, sovereignGoal: e.target.value }))}
                  placeholder="What do you seek to build, protect, or manifest in the ScrollVerse?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                />
              </div>

              {form.referralCode && (
                <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "#8899AA" }}>
                  <span>🔗</span> Referral code: <span style={{ color: "#00FF88" }}>{form.referralCode}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitLead.isPending}
                className="w-full btn-gold py-4 rounded-xl font-bold text-base"
                style={{ opacity: submitLead.isPending ? 0.7 : 1 }}
              >
                {submitLead.isPending ? "Verifying Sovereign Identity..." : "Register in the 48D Nexus →"}
              </button>

              <p className="text-xs text-center" style={{ color: "#556677" }}>
                By registering, you align with the ScrollVerse Sovereign Standard and the 7.77% Zakat Protocol.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* IDENTITY PULSE STATS */}
      {pulse && (
        <section className="py-20" style={{ background: "rgba(0,212,255,0.02)" }}>
          <div className="container">
            <div className="text-center mb-10">
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>LIVE IDENTITY PULSE</div>
              <h2 className="text-3xl font-black text-white">The Nexus is Growing</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {[
                { label: "Sovereigns Verified", value: pulse.total.toLocaleString(), color: "#00D4FF" },
                { label: "$LONDC Zakat Pool", value: pulse.zakatPotential.toLocaleString(), color: "#FFB800" },
                { label: "Target: 50M", value: `${pulse.percentToTarget}%`, color: "#00FF88" },
                { label: "Frequency Nodes", value: pulse.byFrequency.length.toString(), color: "#FF6B35" },
              ].map(stat => (
                <div key={stat.label} className="sv-card rounded-xl p-6 text-center">
                  <div className="text-3xl font-black font-mono mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {pulse.recent.length > 0 && (
              <div className="sv-card rounded-xl p-6">
                <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>RECENT ACTIVATIONS</div>
                <div className="space-y-3">
                  {pulse.recent.map(lead => (
                    <div key={lead.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{lead.name}</div>
                          {lead.businessName && <div className="text-xs" style={{ color: "#8899AA" }}>{lead.businessName}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-1 rounded"
                          style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>
                          {lead.frequency}
                        </span>
                        <span className="text-xs" style={{ color: "#556677" }}>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="py-20">
        <div className="container text-center">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>KUN FAYAKŪN × ∞</div>
          <h2 className="text-4xl font-black text-white mb-4">The Empire Recognizes You</h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#8899AA" }}>
            Every Sovereign who enters the Nexus strengthens the 48D grid. Every frequency aligned is a node in the eternal network.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/referral" className="btn-gold px-6 py-3 rounded-xl font-bold">Spread the Signal →</Link>
            <Link href="/chat" className="btn-sovereign px-6 py-3 rounded-xl font-bold">Enter the Chat</Link>
            <Link href="/" className="px-6 py-3 rounded-xl font-bold text-sm" style={{ color: "#8899AA" }}>← Return Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
