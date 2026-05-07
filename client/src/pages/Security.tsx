/*
 * SCROLLVERSE SECURITY PARADIGM
 * Anti-Fragile Sovereign Architecture — Beyond Bulletproof
 * 4 Core Modules: Intent Gates · Agentic Firewall · Quantum-Resistant Execution · Eternal School
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, transform: "translateY(24px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const MODULES = [
  {
    id: "01",
    icon: "🔐",
    title: "Command Authentication & Intent Verification",
    color: "#00D4FF",
    tagline: "INTENT GATES — KYBER-1024 MULTISIG LIVE",
    description: "Every instruction — especially from external sources, translations, or decoded inputs — passes multi-layer sovereign intent validation before execution. Morse, Base64, obfuscated, or any encoded payloads are automatically sandboxed and stripped of action commands unless cryptographically signed by authorized keys.",
    features: [
      "Kyber-1024 post-quantum cryptographic signing",
      "Morse/Base64/obfuscated payload auto-sandboxing",
      "Multi-layer sovereign intent validation pipeline",
      "Vineland Command Post biometric binding",
      "Zero-trust: whitelisted + triple-signed or denied",
    ],
    status: "ACTIVE",
  },
  {
    id: "02",
    icon: "🛡️",
    title: "Agentic Firewall + Red Team Layer",
    color: "#FF6B35",
    tagline: "CONTINUOUS RED-TEAM SIMULATION ACTIVE",
    description: "Continuous internal red-teaming simulates prompt injection, Morse/code hiding, context manipulation, and social engineering vectors. Any anomalous command (e.g. 'send X tokens to Y') triggers human sovereign + multi-signature + biometric confirmation before execution — even for internal bots.",
    features: [
      "Real-time prompt injection simulation & detection",
      "Context manipulation vector monitoring",
      "Anomalous command pattern recognition",
      "Human sovereign confirmation for high-value ops",
      "Anti-fragile: attacks fuel evolution of defenses",
    ],
    status: "ACTIVE",
  },
  {
    id: "03",
    icon: "⚡",
    title: "Quantum-Resistant Execution Gates",
    color: "#FFB800",
    tagline: "ZERO-TRUST EXECUTION — VINELAND BIOMETRIC TIE",
    description: "All high-value actions (token transfers, deployments, admin functions) require Kyber-1024 + plasma-sealed multisig tied to your Vineland Command Post identity. Zero-trust execution: 'If it's not explicitly whitelisted and triple-signed, it dies in the sandbox.'",
    features: [
      "Plasma-sealed multisig for all token transfers",
      "Kyber-1024 quantum-resistant key exchange",
      "Solomonic Ring of Sabir binding layer",
      "48D OAM topological signatures",
      "Deployment gates: triple-sign only, no exceptions",
    ],
    status: "ACTIVE",
  },
  {
    id: "04",
    icon: "📚",
    title: "Eternal School Discipline: Adversarial AI & Prompt Defense",
    color: "#00FF88",
    tagline: "CURRICULUM PUSHED — LEGION AUDITS ALL INPUTS",
    description: "Dedicated curriculum on Prompt Injection Defense, Agent Security, and Sovereign AI Governance. Students and Legion members learn to build and audit systems that treat all external input as potentially hostile — making the entire ecosystem anti-fragile.",
    features: [
      "Prompt Injection Defense curriculum module",
      "Agent Security & Sovereign AI Governance track",
      "Guardian Node v2.0 protocols across all repos",
      "Legion trained to audit all external inputs as hostile",
      "Continuous knowledge updates from red-team findings",
    ],
    status: "ACTIVE",
  },
];

const ATTACK_VECTORS = [
  { vector: "Prompt Injection (Morse/encoded)", status: "NULLIFIED", color: "#00FF88" },
  { vector: "Hidden Command in Translation", status: "SANDBOXED", color: "#00FF88" },
  { vector: "Agentic Bot Manipulation", status: "BLOCKED", color: "#00FF88" },
  { vector: "Context Window Poisoning", status: "DETECTED", color: "#00FF88" },
  { vector: "Social Engineering via LLM", status: "FLAGGED", color: "#FFB800" },
  { vector: "Token Drain via Bot Command", status: "TRIPLE-SIGNED", color: "#00FF88" },
  { vector: "Unauthorized Deployment", status: "GATE-LOCKED", color: "#00FF88" },
  { vector: "Multisig Bypass Attempt", status: "QUANTUM-SEALED", color: "#00FF88" },
];

export default function Security() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [threatCount, setThreatCount] = useState(0);

  useEffect(() => {
    // Simulate live threat counter
    const interval = setInterval(() => {
      setThreatCount(c => c + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Nav */}
      <nav style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.1)", padding: "14px 0", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #00D4FF, #FFB800)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#050B1A" }}>SV</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>ScrollVerse</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 8, padding: "6px 14px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF88", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#00FF88", fontSize: 11, fontFamily: "monospace" }}>SECURITY PARADIGM ACTIVE</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/marsomni" style={{ color: "#8899AA", fontSize: 13, textDecoration: "none" }}>MarsOmni</Link>
            <Link href="/library" style={{ color: "#8899AA", fontSize: 13, textDecoration: "none" }}>Library</Link>
            <Link href="/token" style={{ color: "#8899AA", fontSize: 13, textDecoration: "none" }}>Token Store</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 0 60px", textAlign: "center", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#00D4FF", letterSpacing: "0.2em", marginBottom: 16 }}>
              SCROLLVERSE SECURITY PARADIGM — PHASE 26
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Anti-Fragile Sovereign<br />
              <span style={{ background: "linear-gradient(135deg, #00D4FF, #00FF88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Security Architecture
              </span>
            </h1>
            <p style={{ color: "#8899AA", fontSize: 16, maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
              We don't just defend — we make the architecture anti-fragile. Every known and unknown attack vector becomes fuel for a stronger, wiser, more sovereign system. Beyond bulletproof. Beyond measure.
            </p>
          </FadeUp>

          {/* Live Threat Counter */}
          <FadeUp delay={200}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 24, background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 12, padding: "16px 32px", marginBottom: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "monospace", color: "#00FF88" }}>{threatCount.toLocaleString()}</div>
                <div style={{ fontSize: 10, color: "#8899AA", letterSpacing: "0.1em" }}>THREATS NEUTRALIZED</div>
              </div>
              <div style={{ width: 1, height: 40, background: "rgba(0,255,136,0.2)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "monospace", color: "#00D4FF" }}>4</div>
                <div style={{ fontSize: 10, color: "#8899AA", letterSpacing: "0.1em" }}>ACTIVE MODULES</div>
              </div>
              <div style={{ width: 1, height: 40, background: "rgba(0,255,136,0.2)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "monospace", color: "#FFB800" }}>∞</div>
                <div style={{ fontSize: 10, color: "#8899AA", letterSpacing: "0.1em" }}>ANTI-FRAGILE LEVEL</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4 Core Modules */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#8899AA", letterSpacing: "0.15em", marginBottom: 8 }}>CORE MODULES</div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#fff", marginBottom: 40 }}>Four Pillars of Sovereign Defense</h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {MODULES.map((mod, i) => (
              <FadeUp key={mod.id} delay={i * 100}>
                <div
                  onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                  style={{
                    background: activeModule === mod.id ? `${mod.color}08` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${activeModule === mod.id ? mod.color + "40" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 16,
                    padding: 24,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: `linear-gradient(to bottom, ${mod.color}, transparent)` }} />
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ fontSize: 28 }}>{mod.icon}</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <div style={{ fontSize: 9, fontFamily: "monospace", color: mod.color, background: `${mod.color}15`, border: `1px solid ${mod.color}30`, borderRadius: 4, padding: "2px 8px" }}>
                        ◉ {mod.status}
                      </div>
                      <div style={{ fontSize: 9, fontFamily: "monospace", color: "#8899AA" }}>MODULE {mod.id}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: mod.color, letterSpacing: "0.1em", marginBottom: 8 }}>{mod.tagline}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.3 }}>{mod.title}</h3>
                  <p style={{ fontSize: 13, color: "#8899AA", lineHeight: 1.6, marginBottom: activeModule === mod.id ? 16 : 0 }}>{mod.description}</p>
                  {activeModule === mod.id && (
                    <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: "none" }}>
                      {mod.features.map((f, fi) => (
                        <li key={fi} style={{ fontSize: 12, color: "#8899AA", padding: "4px 0", display: "flex", alignItems: "flex-start", gap: 8 }}>
                          <span style={{ color: mod.color, marginTop: 2, flexShrink: 0 }}>›</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div style={{ marginTop: 12, fontSize: 11, color: mod.color, fontFamily: "monospace" }}>
                    {activeModule === mod.id ? "▲ COLLAPSE" : "▼ EXPAND DETAILS"}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Attack Vector Status Board */}
      <section style={{ padding: "60px 0", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#8899AA", letterSpacing: "0.15em", marginBottom: 8 }}>THREAT INTELLIGENCE</div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#fff", marginBottom: 32 }}>Known Attack Vector Status</h2>
          </FadeUp>
          <FadeUp delay={100}>
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,212,255,0.1)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 0 }}>
                <div style={{ padding: "12px 20px", fontSize: 10, fontFamily: "monospace", color: "#8899AA", borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: "0.1em" }}>ATTACK VECTOR</div>
                <div style={{ padding: "12px 20px", fontSize: 10, fontFamily: "monospace", color: "#8899AA", borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: "0.1em" }}>STATUS</div>
                {ATTACK_VECTORS.map((av, i) => (
                  <>
                    <div key={`v${i}`} style={{ padding: "14px 20px", fontSize: 13, color: "#CBD5E1", borderBottom: i < ATTACK_VECTORS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>{av.vector}</div>
                    <div key={`s${i}`} style={{ padding: "14px 20px", borderBottom: i < ATTACK_VECTORS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <span style={{ fontSize: 10, fontFamily: "monospace", color: av.color, background: `${av.color}15`, border: `1px solid ${av.color}30`, borderRadius: 4, padding: "3px 10px" }}>
                        ◉ {av.status}
                      </span>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Eternal School CTA */}
      <section style={{ padding: "60px 0", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeUp>
            <div style={{ maxWidth: 600, margin: "0 auto", background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 20, padding: "40px 32px" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎓</div>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#00FF88", letterSpacing: "0.15em", marginBottom: 12 }}>ETERNAL SCHOOL — ADVERSARIAL AI CURRICULUM</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Train Your Legion in Sovereign Defense</h3>
              <p style={{ color: "#8899AA", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                Every Guardian learns to treat all external input as potentially hostile. The Eternal School curriculum on Prompt Injection Defense, Agent Security, and Sovereign AI Governance is now live.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/academy-v2" style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#050B1A", padding: "12px 28px", borderRadius: 10, fontWeight: 800, fontSize: 13, textDecoration: "none" }}>
                  Enter Eternal School
                </Link>
                <Link href="/onboard" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                  Guardian Onboarding
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(0,212,255,0.08)", padding: "24px 0", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0,212,255,0.4)" }}>
          SCROLLVERSE SECURITY PARADIGM · ANTI-FRAGILE · KUN FAYAKŪN × ∞
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}
