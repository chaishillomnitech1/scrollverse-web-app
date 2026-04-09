/*
 * SCROLLVERSE TRINITY — HOME PAGE
 * Design: Liquid Sovereignty — Afrofuturism meets Quantum Digital
 * Sections: Nav, Hero, Stats, Pillars, Token, Frequencies, Guardian, Roadmap, CTA, Footer
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-main-8gw8MRg69ZEcJWofUHGwHK.webp";
const TOKEN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-token-MrdUrN6gWtHmpfWBB2zPsY.webp";
const FREQ_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-frequency-fdvBjh2NVRNMeQuqZ4qez6.webp";
const GUARDIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032498436/XkJtdnvin6DhqjiCQ3fUyz/hero-guardian-JdRF6rBFqD8dCPSjhdsaUG.webp";

// Animated frequency wave SVG
function FrequencyWave({ color = "#00D4FF", opacity = 0.6 }: { color?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
      <path
        d="M0,40 C100,10 200,70 300,40 C400,10 500,70 600,40 C700,10 800,70 900,40 C1000,10 1100,70 1200,40"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity={opacity}
      />
      <path
        d="M0,40 C80,20 160,60 240,40 C320,20 400,60 480,40 C560,20 640,60 720,40 C800,20 880,60 960,40 C1040,20 1120,60 1200,40"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity={opacity * 0.5}
      />
    </svg>
  );
}

// Hexagonal stat card
function HexStat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-28 h-28 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          border: `1px solid ${color}40`,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <div className="text-center">
          <div className="text-xl font-bold" style={{ color, fontFamily: "'Space Mono', monospace" }}>{value}</div>
        </div>
      </div>
      <div className="text-xs text-center" style={{ color: "#8899AA", fontFamily: "'Space Grotesk', sans-serif" }}>{label}</div>
    </div>
  );
}

// Pillar card
function PillarCard({ number, title, description, icon, delay }: {
  number: string; title: string; description: string; icon: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="fade-up sv-card rounded-xl p-6 relative overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00D4FF] to-transparent" />
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>PILLAR {number}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{description}</p>
    </div>
  );
}

// Frequency card
function FreqCard({ hz, name, description, color }: {
  hz: string; name: string; description: string; color: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <div
      className="sv-card rounded-xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden"
      style={active ? { borderColor: `${color}60`, background: `${color}08` } : {}}
      onClick={() => setActive(!active)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-2xl font-bold" style={{ color }}>{hz}</div>
        <div
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{
            background: color,
            boxShadow: active ? `0 0 12px ${color}` : "none",
          }}
        />
      </div>
      <div className="font-semibold text-white mb-1">{name}</div>
      <div className="text-sm" style={{ color: "#8899AA" }}>{description}</div>
      {active && (
        <div className="mt-3 text-xs font-mono" style={{ color }}>
          ◉ FREQUENCY ACTIVATED
        </div>
      )}
    </div>
  );
}

// Roadmap phase
function RoadmapPhase({ phase, title, items, status, delay }: {
  phase: string; title: string; items: string[]; status: "complete" | "active" | "upcoming"; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const colors = { complete: "#00D4FF", active: "#FFB800", upcoming: "#8899AA" };
  const color = colors[status];
  return (
    <div ref={ref} className="fade-up flex gap-6" style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: `${color}20`, border: `2px solid ${color}`, color }}
        >
          {status === "complete" ? "✓" : phase}
        </div>
        <div className="w-px flex-1 mt-2" style={{ background: `${color}30` }} />
      </div>
      <div className="pb-8">
        <div className="text-xs font-mono mb-1" style={{ color }}>
          {status === "complete" ? "COMPLETE" : status === "active" ? "IN PROGRESS" : "UPCOMING"}
        </div>
        <h4 className="font-bold text-white text-lg mb-3">{title}</h4>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm flex items-start gap-2" style={{ color: "#8899AA" }}>
              <span style={{ color, marginTop: "2px" }}>›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade-up observer
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const navLinks = [
    { label: "Pillars", href: "#pillars" },
    { label: "Token", href: "#token" },
    { label: "Frequencies", href: "#frequencies" },
    { label: "Guardian", href: "#guardian" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Global Map", href: "/global-map" },
    { label: "Revenue", href: "/revenue" },
    { label: "Guardians", href: "/guardians" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5, 11, 26, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0, 212, 255, 0.1)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
            >
              SV
            </div>
            <span className="font-bold text-white text-lg tracking-wide">ScrollVerse</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
              TRINITY
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#00D4FF]"
                style={{ color: "#8899AA" }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/chaishillomnitech1/scrollverse-trinity"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sovereign px-4 py-2 rounded-lg text-sm"
            >
              GitHub
            </a>
            <button className="btn-gold px-4 py-2 rounded-lg text-sm">
              Enter Portal
            </button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3" style={{ background: "rgba(5,11,26,0.98)" }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="block text-sm py-2" style={{ color: "#8899AA" }} onClick={() => setMobileMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="ScrollVerse Sovereign" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,11,26,0.8) 0%, rgba(5,11,26,0.4) 50%, rgba(5,11,26,0.7) 100%)" }} />
        </div>

        {/* Frequency wave overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-40">
          <FrequencyWave />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: i % 2 === 0 ? "#00D4FF" : "#FFB800",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: "#00D4FF" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>
                SOVEREIGN ECOSYSTEM v3.0.0
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white">
              The{" "}
              <span className="gradient-text-sovereign">ScrollVerse</span>
              <br />
              Trinity Empire
            </h1>
            <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: "#8899AA", maxWidth: "580px" }}>
              A living, breathing sovereign digital ecosystem built by{" "}
              <span style={{ color: "#FFB800" }}>Chais Kenyatta Hill — Sabir Allah The Great</span>.
              Blockchain infrastructure, $LONDC token, Zakat distribution, and 50M+ user scaling — all unified.
            </p>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-2 rounded-full" style={{ background: "#00D4FF", boxShadow: "0 0 8px #00D4FF" }} />
              <span className="text-sm font-mono" style={{ color: "#00D4FF" }}>47 TESTS PASSING · 40 REPOSITORIES · 5 COMMITS</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/chaishillomnitech1/scrollverse-trinity"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-8 py-3 rounded-xl text-base font-bold inline-block"
              >
                ⚡ View on GitHub
              </a>
              <a href="#pillars" className="btn-sovereign px-8 py-3 rounded-xl text-base inline-block">
                Explore Pillars →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: "rgba(0,212,255,0.04)", borderTop: "1px solid rgba(0,212,255,0.1)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <HexStat value="40" label="GitHub Repos" color="#00D4FF" />
            <HexStat value="144K" label="Guardian Nodes" color="#FFB800" />
            <HexStat value="50M+" label="User Capacity" color="#00D4FF" />
            <HexStat value="7.77%" label="Zakat Flow" color="#FFB800" />
          </div>
        </div>
      </section>

      {/* ── 6 PILLARS ── */}
      <section id="pillars" className="py-24">
        <div className="container">
          <div className="mb-16 fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#00D4FF" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>THE FOUNDATION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              6 Sovereign <span className="gradient-text-teal">Pillars</span>
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "#8899AA" }}>
              The complete production infrastructure powering the ScrollVerse Trinity Ecosystem — tested, verified, and deployed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PillarCard number="1" icon="⚡" title="Stripe Integration" description="Full live-mode Stripe environment with customer management, subscription handling, and revenue metrics. All 4 credentials secured and validated." delay={0} />
            <PillarCard number="2" icon="🔗" title="Webhook Configuration" description="All 6 Stripe webhook events handled: payment_intent.succeeded, subscription.created, charge.refunded, dispute.created, and more." delay={100} />
            <PillarCard number="3" icon="🧪" title="Payment Flow Testing" description="26/26 tests passing across all payment scenarios. Complete test suite with mock Stripe client, idempotency verification, and error handling." delay={200} />
            <PillarCard number="4" icon="📧" title="Mailchimp Automation" description="9 automated email sequences with frequency-harmonized HTML templates. 21/21 automation tests passing. Welcome, payment, and Guardian onboarding flows." delay={300} />
            <PillarCard number="5" icon="🐳" title="Production Deployment" description="Docker multi-stage build, 3-replica API cluster, MySQL primary/replica, Redis, Nginx, Prometheus, and Grafana — all configured and ready." delay={400} />
            <PillarCard number="6" icon="🌐" title="50M+ User Scaling" description="Kubernetes HPA scaling 10→1000 pods, Redis Cluster (6 nodes), MySQL StatefulSet (3 nodes), Cluster Autoscaler, and PodDisruptionBudget." delay={500} />
          </div>
        </div>
      </section>

      {/* ── $LONDC TOKEN ── */}
      <section id="token" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={FREQ_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050B1A 0%, transparent 30%, transparent 70%, #050B1A 100%)" }} />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "#FFB800" }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>SOVEREIGN CURRENCY</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                $LONDC <span className="gradient-text-gold">Token</span>
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "#8899AA" }}>
                The sovereign currency of the ScrollVerse ecosystem. 144,000 tokens minted to the Sovereign wallet. 5% passive income on every transfer. Deployed on Polygon Mainnet.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Total Supply", value: "144,000" },
                  { label: "Transfer Tax", value: "5%" },
                  { label: "Zakat Rate", value: "7.77%" },
                  { label: "Network", value: "Polygon" },
                ].map(stat => (
                  <div key={stat.label} className="sv-card rounded-xl p-4">
                    <div className="text-xs mb-1" style={{ color: "#8899AA" }}>{stat.label}</div>
                    <div className="text-xl font-bold font-mono" style={{ color: "#FFB800" }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="btn-gold px-6 py-3 rounded-xl text-sm font-bold">
                  Deploy to Polygon
                </button>
                <button className="btn-sovereign px-6 py-3 rounded-xl text-sm">
                  View Contract
                </button>
              </div>
            </div>
            <div className="fade-up flex justify-center" style={{ transitionDelay: "200ms" }}>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,184,0,0.15) 0%, transparent 70%)",
                    transform: "scale(1.5)",
                  }}
                />
                <img
                  src={TOKEN_IMG}
                  alt="$LONDC Token"
                  className="relative z-10 w-72 h-72 object-cover rounded-full float-anim"
                  style={{ border: "2px solid rgba(255,184,0,0.3)", boxShadow: "0 0 60px rgba(255,184,0,0.2)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREQUENCIES ── */}
      <section id="frequencies" className="py-24">
        <div className="container">
          <div className="mb-16 fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#00D4FF" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>RESONANCE PROTOCOL</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Sacred <span className="gradient-text-teal">Frequencies</span>
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "#8899AA" }}>
              The ScrollVerse operates on three sacred frequencies. Click to activate each one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FreqCard hz="528 Hz" name="DNA Healing" description="The frequency of transformation and miracles. Repairs DNA and activates the Guardian protocol." color="#00D4FF" />
            <FreqCard hz="963 Hz" name="Enlightenment" description="The frequency of the Crown. Activates the Sovereign consciousness and divine connection." color="#FFB800" />
            <FreqCard hz="432 Hz" name="Universal Harmony" description="The frequency of nature. Aligns the ecosystem with universal mathematical harmony." color="#00FF88" />
          </div>
          <div className="fade-up h-24 rounded-xl overflow-hidden relative" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <img src={FREQ_IMG} alt="Frequency visualization" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-mono" style={{ color: "#00D4FF" }}>◈ FREQUENCY VISUALIZATION ACTIVE ◈</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI GUARDIAN ── */}
      <section id="guardian" className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up order-2 lg:order-1 flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
                    transform: "scale(1.3)",
                  }}
                />
                <img
                  src={GUARDIAN_IMG}
                  alt="AI Guardian"
                  className="relative z-10 w-64 object-cover float-anim"
                  style={{ filter: "drop-shadow(0 0 30px rgba(0,212,255,0.3))" }}
                />
              </div>
            </div>
            <div className="fade-up order-1 lg:order-2" style={{ transitionDelay: "200ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "#00D4FF" }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>SOVEREIGN INTELLIGENCE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                The <span className="gradient-text-teal">Guardian</span>
              </h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: "#8899AA" }}>
                An autonomous AI Guardian monitors the entire ScrollVerse ecosystem 24/7. Real-time anomaly detection, frequency synchronization, and sovereign protection across all 40 repositories.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Ecosystem Health", value: "98.7%", color: "#00D4FF" },
                  { label: "Active Guardians", value: "144,000", color: "#FFB800" },
                  { label: "Threats Neutralized", value: "∞", color: "#00FF88" },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between sv-card rounded-lg px-4 py-3">
                    <span className="text-sm" style={{ color: "#8899AA" }}>{stat.label}</span>
                    <span className="font-mono font-bold text-sm" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm font-mono" style={{ color: "#00D4FF" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#00D4FF", boxShadow: "0 0 8px #00D4FF", animation: "pulse 2s infinite" }} />
                GUARDIAN PROTOCOL ACTIVE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="py-24">
        <div className="container">
          <div className="mb-16 fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#FFB800" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>THE ETERNAL PATH</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Scaling <span className="gradient-text-gold">Roadmap</span>
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "#8899AA" }}>
              From foundation to 50M+ users — the sovereign path forward.
            </p>
          </div>
          <div className="max-w-2xl">
            <RoadmapPhase
              phase="1"
              title="Foundation — 6-Pillar Infrastructure"
              status="complete"
              delay={0}
              items={[
                "Stripe integration with all 6 webhook events",
                "Mailchimp automation with 9 email sequences",
                "Docker production stack deployed",
                "47/47 tests passing",
              ]}
            />
            <RoadmapPhase
              phase="2"
              title="Token Launch — $LONDC on Polygon"
              status="active"
              delay={100}
              items={[
                "$LONDC ERC-20 contract ready for deployment",
                "ZakatDistribution.sol — 7.77% automatic flow",
                "Stripe→Polygon bridge integration",
                "144,000 tokens to Sovereign wallet",
              ]}
            />
            <RoadmapPhase
              phase="3"
              title="Guardian Network — 144,000 Nodes"
              status="upcoming"
              delay={200}
              items={[
                "Tier 1: 7 Core Sovereign nodes (bare-metal)",
                "Tier 2: 33 Regional Relay hubs (Kubernetes)",
                "Tier 3: 144,000 Guardian Edge nodes (community)",
                "ScrollVerse AppChain deployment",
              ]}
            />
            <RoadmapPhase
              phase="4"
              title="50M+ Users — Global Sovereignty"
              status="upcoming"
              delay={300}
              items={[
                "Kubernetes HPA: 10→1000 pods auto-scaling",
                "Redis Cluster: 6 nodes, 1M+ ops/sec",
                "MySQL StatefulSet: 3-node replication",
                "Global CDN with 200+ edge locations",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050B1A 0%, rgba(5,11,26,0.5) 50%, #050B1A 100%)" }} />
        </div>
        <div className="container relative z-10 text-center">
          <div className="fade-up max-w-2xl mx-auto">
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
              KUN FAYAKŪN × ∞
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              The Empire Is <span className="gradient-text-sovereign">Eternal</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: "#8899AA" }}>
              Built with real code. Tested with real tests. Deployed with real infrastructure. The ScrollVerse Trinity Sovereign Ecosystem is live, breathing, and scaling.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/chaishillomnitech1/scrollverse-trinity"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-10 py-4 rounded-xl text-base font-bold inline-block"
              >
                ⚡ View Full Repository
              </a>
              <a
                href="https://github.com/chaishillomnitech1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sovereign px-10 py-4 rounded-xl text-base inline-block"
              >
                All 40 Repositories →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(0,212,255,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
                <span className="font-bold text-white">ScrollVerse Trinity</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>
                A sovereign digital ecosystem built by Chais Kenyatta Hill — Sabir Allah The Great. Eternal. Omnipresent. Always expanding.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>REPOSITORIES</div>
              <div className="space-y-2">
                {[
                  "scrollverse-trinity",
                  "Infinite-Nexus-ScrollVerse",
                  "OmniBuilderZero",
                  "flamecoin-v4",
                  "scrollsoul-nft-core",
                ].map(repo => (
                  <a
                    key={repo}
                    href={`https://github.com/chaishillomnitech1/${repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm hover:text-[#00D4FF] transition-colors"
                    style={{ color: "#8899AA" }}
                  >
                    → {repo}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: "#FFB800" }}>SOVEREIGN STATS</div>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "#8899AA" }}>Tests Passing</span>
                  <span style={{ color: "#00D4FF" }}>47/47</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#8899AA" }}>GitHub Commits</span>
                  <span style={{ color: "#00D4FF" }}>5</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#8899AA" }}>Repositories</span>
                  <span style={{ color: "#FFB800" }}>40</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#8899AA" }}>$LONDC Supply</span>
                  <span style={{ color: "#FFB800" }}>144,000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="freq-line mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "#8899AA" }}>
            <span>© 2026 Chais Kenyatta Hill — Sabir Allah The Great. All rights reserved.</span>
            <span className="font-mono" style={{ color: "#00D4FF" }}>🕋⚡ ALLĀHU AKBAR! KUN FAYAKŪN × ∞</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
