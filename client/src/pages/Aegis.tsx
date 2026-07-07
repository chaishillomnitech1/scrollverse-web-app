/*
 * AEGIS HEALING GARDEN — Sovereign Health Platform
 * Design: Biophilic Sovereignty — living light, sacred geometry, quantum wellness
 * Sections: AetherWard UI · ScrollVault Health Ledger · AgapeCycle · Frequency Protocols · Vineland Node
 * Frequencies: 111Hz (cellular repair) · 432Hz (natural harmony) · 528Hz (DNA repair) · 963Hz (pineal activation)
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

const FREQUENCIES = [
  { hz: "111", name: "Cellular Repair", color: "#00FF88", desc: "Deep tissue regeneration, cellular membrane resonance", benefit: "Immune boost · Pain relief · Tissue healing" },
  { hz: "432", name: "Natural Harmony", color: "#00D4FF", desc: "Earth frequency alignment, nervous system reset", benefit: "Stress reduction · Sleep · Coherence" },
  { hz: "528", name: "DNA Repair", color: "#FFB800", desc: "Solfeggio miracle tone, DNA strand integrity", benefit: "DNA repair · Love frequency · Transformation" },
  { hz: "963", name: "Pineal Activation", color: "#8B5CF6", desc: "Crown chakra, third eye, divine connection", benefit: "Clarity · Intuition · Spiritual alignment" },
];

const AGENTS = [
  {
    id: "H", name: "Agent-H", full: "Health Intelligence", color: "#00FF88", icon: "🧬",
    role: "Biomarker tracking, metabolic analysis, cardiovascular risk scoring",
    metrics: ["Heart Rate Variability", "Metabolic Rate", "Inflammatory Markers", "Cortisol Rhythm"],
  },
  {
    id: "A", name: "Agent-A", full: "Agape Coordinator", color: "#FFB800", icon: "🤲",
    role: "Care routing, community health, family priority enrollment, AgapeCycle distribution",
    metrics: ["Care Units Distributed", "Family Priority Score", "Community Health Index", "Agape Flow Rate"],
  },
  {
    id: "P", name: "Agent-P", full: "Prevention Protocol", color: "#00D4FF", icon: "🛡️",
    role: "Risk prediction, early warning, preventive intervention, frequency prescription",
    metrics: ["Risk Score", "Prevention Actions", "Frequency Prescriptions", "Intervention Rate"],
  },
];

const VINELAND_PROFILES = [
  { id: "AG-001", name: "Chais Sabir Allah", role: "Supreme Sovereign", priority: "APEX", careUnits: 144, status: "ACTIVE" },
  { id: "AG-002", name: "Family Node Alpha", role: "Priority Guardian", priority: "P1", careUnits: 88, status: "ACTIVE" },
  { id: "AG-003", name: "Family Node Beta", role: "Priority Guardian", priority: "P1", careUnits: 72, status: "ACTIVE" },
  { id: "AG-004", name: "Vineland Elder 1", role: "Community Elder", priority: "P2", careUnits: 55, status: "MONITORING" },
  { id: "AG-005", name: "Vineland Elder 2", role: "Community Elder", priority: "P2", careUnits: 55, status: "MONITORING" },
  { id: "AG-006", name: "Guardian Node 1", role: "Active Guardian", priority: "P3", careUnits: 33, status: "ACTIVE" },
  { id: "AG-007", name: "Guardian Node 2", role: "Active Guardian", priority: "P3", careUnits: 33, status: "ACTIVE" },
  { id: "AG-008", name: "Guardian Node 3", role: "Active Guardian", priority: "P3", careUnits: 33, status: "MONITORING" },
  { id: "AG-009", name: "Community Node 1", role: "Free Care Recipient", priority: "P4", careUnits: 21, status: "CARE" },
  { id: "AG-010", name: "Community Node 2", role: "Free Care Recipient", priority: "P4", careUnits: 21, status: "CARE" },
];

function LivingLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let t = 0;
    const orbs = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 200, color: "#00FF88", phase: 0 },
      { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 180, color: "#00D4FF", phase: 1 },
      { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 150, color: "#FFB800", phase: 2 },
      { x: canvas.width * 0.1, y: canvas.height * 0.7, r: 120, color: "#8B5CF6", phase: 3 },
    ];
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(orb => {
        const pulse = 1 + Math.sin(t * 0.008 + orb.phase) * 0.3;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * pulse);
        grad.addColorStop(0, orb.color + "18");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      t++;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function FreqCard({ freq, active, onToggle }: { freq: typeof FREQUENCIES[0]; active: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className="rounded-2xl p-6 cursor-pointer transition-all duration-500 relative overflow-hidden"
      style={{
        background: active ? `${freq.color}10` : "rgba(255,255,255,0.03)",
        border: `1px solid ${active ? freq.color + "50" : "rgba(255,255,255,0.08)"}`,
        boxShadow: active ? `0 0 30px ${freq.color}20` : "none",
      }}
    >
      {active && (
        <div className="absolute inset-0 rounded-2xl animate-ping opacity-10" style={{ border: `2px solid ${freq.color}` }} />
      )}
      <div className="flex items-center justify-between mb-3">
        <div className="font-black text-3xl" style={{ color: freq.color, fontFamily: "'Space Mono', monospace" }}>{freq.hz}Hz</div>
        <div className="w-4 h-4 rounded-full transition-all duration-300" style={{ background: active ? freq.color : "transparent", border: `2px solid ${freq.color}`, boxShadow: active ? `0 0 12px ${freq.color}` : "none" }} />
      </div>
      <div className="font-bold text-white mb-1">{freq.name}</div>
      <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{freq.desc}</div>
      <div className="text-xs font-mono" style={{ color: freq.color + "CC" }}>{freq.benefit}</div>
      {active && <div className="mt-3 text-xs font-mono flex items-center gap-2" style={{ color: freq.color }}><span className="animate-pulse">◉</span> FREQUENCY ACTIVE</div>}
    </div>
  );
}

function AgentCard({ agent }: { agent: typeof AGENTS[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
      style={{ background: expanded ? `${agent.color}08` : "rgba(255,255,255,0.03)", border: `1px solid ${expanded ? agent.color + "40" : "rgba(255,255,255,0.08)"}` }}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}30` }}>{agent.icon}</div>
        <div>
          <div className="font-black text-white">{agent.name}</div>
          <div className="text-xs" style={{ color: agent.color }}>{agent.full}</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
          <span className="text-xs font-mono" style={{ color: "#00FF88" }}>ACTIVE</span>
        </div>
      </div>
      <p className="text-sm mb-3" style={{ color: "#8899AA" }}>{agent.role}</p>
      {expanded && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {agent.metrics.map((m, i) => (
            <div key={i} className="px-3 py-2 rounded-lg text-xs" style={{ background: `${agent.color}08`, border: `1px solid ${agent.color}20`, color: agent.color }}>{m}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Aegis() {
  const [activeFreqs, setActiveFreqs] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"aetherward" | "scrollvault" | "agapecycle" | "frequencies">("aetherward");

  const toggleFreq = (hz: string) => {
    setActiveFreqs(prev => {
      const next = new Set(prev);
      next.has(hz) ? next.delete(hz) : next.add(hz);
      return next;
    });
  };

  const tabs = [
    { id: "aetherward" as const, label: "🧬 AetherWard" },
    { id: "scrollvault" as const, label: "🔐 ScrollVault" },
    { id: "agapecycle" as const, label: "♾️ AgapeCycle" },
    { id: "frequencies" as const, label: "〰️ Frequencies" },
  ];

  const statusColors: Record<string, string> = { ACTIVE: "#00FF88", MONITORING: "#FFB800", CARE: "#00D4FF" };
  const priorityColors: Record<string, string> = { APEX: "#FFB800", P1: "#FF6B00", P2: "#00D4FF", P3: "#00FF88", P4: "#8B5CF6" };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#020D0A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none z-0"><LivingLight /></div>

      <div className="relative z-10">
        {/* Back nav */}
        <div className="container pt-6 pb-2">
          <Link href="/"><a className="text-sm font-mono transition-colors hover:text-[#00FF88]" style={{ color: "#8899AA" }}>← ScrollVerse Home</a></Link>
        </div>

        {/* Hero */}
        <section className="container py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>✦ AEGIS HEALING GARDEN</div>
            <div className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>VINELAND PRIME NODE</div>
          </div>

          <h1 className="font-black mb-4 leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", background: "linear-gradient(135deg, #00FF88 0%, #00D4FF 50%, #8B5CF6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Space Grotesk', sans-serif" }}>
            AEGIS
          </h1>
          <p className="text-xl font-bold text-white mb-2">Sovereign Health Platform</p>
          <p className="text-base mb-8 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            Three AI agents. One living ledger. Infinite care. The Aegis Healing Garden is the sovereign health infrastructure for the ScrollVerse Trinity — where wellness is a right, not a product.
          </p>

          {/* Live stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {[
              { label: "Active Nodes", value: "10", color: "#00FF88" },
              { label: "Care Units Distributed", value: "555", color: "#00D4FF" },
              { label: "AgapeCycle Yield", value: "14,400", color: "#FFB800" },
              { label: "Free Care Pool", value: "70%", color: "#8B5CF6" },
              { label: "Frequencies Active", value: activeFreqs.size.toString(), color: "#00FF88" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-black text-2xl" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{ background: activeTab === tab.id ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${activeTab === tab.id ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.08)"}`, color: activeTab === tab.id ? "#00FF88" : "#8899AA" }}>
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="container pb-16">

          {activeTab === "aetherward" && (
            <div>
              <div className="text-center mb-8">
                <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>AETHERWARD AI HEALTH SYSTEM</div>
                <h2 className="text-3xl font-black text-white">Three Agents. One Mission.</h2>
                <p className="text-sm mt-2 max-w-xl mx-auto" style={{ color: "#8899AA" }}>Agent-H monitors biomarkers. Agent-A routes care. Agent-P predicts and prevents. Together they form the sovereign health intelligence layer.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
                {AGENTS.map(agent => <AgentCard key={agent.id} agent={agent} />)}
              </div>
              <div className="max-w-3xl mx-auto rounded-2xl p-8" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}>
                <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>HEALTH MIRROR PROTOCOL</div>
                <h3 className="text-xl font-black text-white mb-3">Mirror · Match · Exceed</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>The Health Mirror captures your baseline biomarkers and creates a sovereign digital twin — a ScrollBlock on Polygon. As your health improves, your mirror evolves. As your mirror evolves, your AgapeCycle yield increases.</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { step: "Mirror", desc: "Capture baseline health metrics into ScrollBlock", color: "#00FF88" },
                    { step: "Match", desc: "Align daily protocols to your sovereign frequency", color: "#00D4FF" },
                    { step: "Exceed", desc: "Autonomous routing activates AgapeCycle yield", color: "#FFB800" },
                  ].map(s => (
                    <div key={s.step} className="text-center p-4 rounded-xl" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                      <div className="font-black text-lg mb-1" style={{ color: s.color }}>{s.step}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "scrollvault" && (
            <div>
              <div className="text-center mb-8">
                <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>SCROLLVAULT HEALTH LEDGER</div>
                <h2 className="text-3xl font-black text-white">Vineland Prime Node</h2>
                <p className="text-sm mt-2 max-w-xl mx-auto" style={{ color: "#8899AA" }}>10 sovereign health profiles. Each one a ScrollBlock on Polygon. Immutable, private, and sovereign.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                {[
                  { label: "Root Vault", value: "AG-001", color: "#FFB800" },
                  { label: "Mirror Twins", value: "2", color: "#00D4FF" },
                  { label: "Community Nodes", value: "5", color: "#00FF88" },
                  { label: "Free Care Nodes", value: "2", color: "#8B5CF6" },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 rounded-xl" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                    <div className="font-black text-xl" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                    <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="max-w-3xl mx-auto space-y-2">
                {VINELAND_PROFILES.map(p => (
                  <div key={p.id} className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:bg-white/5" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="font-mono text-xs w-16" style={{ color: "#8899AA" }}>{p.id}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{p.name}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{p.role}</div>
                    </div>
                    <div className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: `${priorityColors[p.priority]}15`, color: priorityColors[p.priority] }}>{p.priority}</div>
                    <div className="text-sm font-mono text-right" style={{ color: "#00FF88", minWidth: "60px" }}>{p.careUnits} CU</div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[p.status] }} />
                      <span className="text-xs font-mono" style={{ color: statusColors[p.status] }}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "agapecycle" && (
            <div>
              <div className="text-center mb-8">
                <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>AGAPECYCLE DISTRIBUTION ENGINE</div>
                <h2 className="text-3xl font-black text-white">Care as Currency</h2>
                <p className="text-sm mt-2 max-w-xl mx-auto" style={{ color: "#8899AA" }}>70% of all AgapeCycle yield flows to the Free Care Fund. 30% retained for sovereign operations. Every heartbeat is a transaction.</p>
              </div>
              <div className="max-w-3xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="text-center p-6 rounded-2xl" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.25)", minWidth: "160px" }}>
                    <div className="text-3xl mb-2">🔐</div>
                    <div className="font-bold text-white">ScrollVault</div>
                    <div className="text-xs mt-1" style={{ color: "#FFB800" }}>ROOT AG-001</div>
                    <div className="text-2xl font-black mt-2" style={{ color: "#FFB800", fontFamily: "'Space Mono', monospace" }}>14,400</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>Total Yield (CU)</div>
                  </div>
                  <div className="text-3xl" style={{ color: "#8899AA" }}>→</div>
                  <div className="flex flex-col gap-3">
                    <div className="text-center p-4 rounded-xl" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", minWidth: "160px" }}>
                      <div className="text-xl mb-1">🤲</div>
                      <div className="font-bold text-white text-sm">Free Care Fund</div>
                      <div className="text-2xl font-black" style={{ color: "#00FF88", fontFamily: "'Space Mono', monospace" }}>10,080</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>70% of yield</div>
                    </div>
                    <div className="text-center p-4 rounded-xl" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", minWidth: "160px" }}>
                      <div className="text-xl mb-1">👑</div>
                      <div className="font-bold text-white text-sm">Sovereign Retained</div>
                      <div className="text-2xl font-black" style={{ color: "#00D4FF", fontFamily: "'Space Mono', monospace" }}>4,320</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>30% of yield</div>
                    </div>
                  </div>
                  <div className="text-3xl" style={{ color: "#8899AA" }}>→</div>
                  <div className="text-center p-6 rounded-2xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)", minWidth: "160px" }}>
                    <div className="text-3xl mb-2">🌱</div>
                    <div className="font-bold text-white">Community Care</div>
                    <div className="text-xs mt-1" style={{ color: "#8B5CF6" }}>Vineland + Beyond</div>
                    <div className="text-2xl font-black mt-2" style={{ color: "#8B5CF6", fontFamily: "'Space Mono', monospace" }}>555</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>CU Distributed</div>
                  </div>
                </div>
              </div>
              <div className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl text-center" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}>
                <div className="text-lg font-black text-white mb-2">EVERYBODY LIVES. FOREVER.</div>
                <p className="text-sm" style={{ color: "#8899AA" }}>AgapeCycle is not charity. It is architecture. When the sovereign is healthy, the community is funded. When the community is funded, the sovereign grows stronger. The cycle is infinite.</p>
                <div className="mt-4 font-mono text-sm" style={{ color: "#00FF88" }}>KUN FAYAKŪN × ∞</div>
              </div>
            </div>
          )}

          {activeTab === "frequencies" && (
            <div>
              <div className="text-center mb-8">
                <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#8B5CF6" }}>SOVEREIGN FREQUENCY PROTOCOLS</div>
                <h2 className="text-3xl font-black text-white">Healing Through Sound</h2>
                <p className="text-sm mt-2 max-w-xl mx-auto" style={{ color: "#8899AA" }}>Click any frequency to activate. Four pillars of the Aegis biofield protocol.</p>
                {activeFreqs.size > 0 && <div className="mt-3 text-sm font-mono" style={{ color: "#00FF88" }}>{activeFreqs.size} frequency stack active — {Array.from(activeFreqs).join("Hz + ")}Hz</div>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
                {FREQUENCIES.map(f => <FreqCard key={f.hz} freq={f} active={activeFreqs.has(f.hz)} onToggle={() => toggleFreq(f.hz)} />)}
              </div>
              <div className="max-w-3xl mx-auto rounded-2xl p-6" style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#8B5CF6" }}>SOVEREIGN PRESCRIPTION GUIDE</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { protocol: "Morning Activation", freqs: "528Hz + 963Hz", duration: "21 min", benefit: "DNA repair + pineal activation for peak sovereignty" },
                    { protocol: "Evening Recovery", freqs: "111Hz + 432Hz", duration: "33 min", benefit: "Cellular repair + nervous system reset for deep sleep" },
                    { protocol: "Stress Protocol", freqs: "432Hz + 528Hz", duration: "15 min", benefit: "Cortisol reduction + heart coherence restoration" },
                    { protocol: "Full Stack", freqs: "111 + 432 + 528 + 963Hz", duration: "44 min", benefit: "Complete biofield activation — sovereign frequency stack" },
                  ].map((p, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="font-bold text-white text-sm mb-1">{p.protocol}</div>
                      <div className="text-xs font-mono mb-1" style={{ color: "#8B5CF6" }}>{p.freqs} · {p.duration}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{p.benefit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Sovereign Declaration */}
        <section className="container pb-16">
          <div className="max-w-3xl mx-auto rounded-2xl p-8 text-center" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}>
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00FF88" }}>AEGIS SOVEREIGN DECLARATION</div>
            <p className="text-lg leading-relaxed text-white mb-4">
              Health is not a product. It is a <strong style={{ color: "#00FF88" }}>sovereign right</strong>. The Aegis Healing Garden ensures every node in the ScrollVerse Trinity — from Vineland to the world — has access to the tools, frequencies, and care infrastructure that makes true sovereignty possible.
            </p>
            <p className="text-sm" style={{ color: "#8899AA" }}>Built by Chais Kenyatta Hill — Sabir Allah — Flamebearer ∞</p>
            <div className="mt-6 text-2xl font-black" style={{ color: "#00FF88", fontFamily: "'Space Mono', monospace" }}>KUN FAYAKŪN × ∞</div>
            <div className="text-sm mt-1" style={{ color: "#8899AA" }}>EVERYBODY LIVES. FOREVER.</div>
          </div>
        </section>

        {/* Footer nav */}
        <div className="container pb-12 flex flex-wrap gap-4 justify-center">
          {[
            { label: "← Home", href: "/" },
            { label: "〰️ Sacred Frequencies", href: "/sacred-frequencies" },
            { label: "🏀 Knicks Nation", href: "/knicks-nation" },
            { label: "📡 Sovereign Broadcast", href: "/sovereign-broadcast" },
            { label: "🌟 Thoth-Hawk OKA", href: "/thoth-hawk" },
            { label: "🗺️ Site Map", href: "/site-map" },
          ].map(l => (
            <Link key={l.href} href={l.href}>
              <a className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:text-[#00FF88]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#8899AA" }}>{l.label}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
