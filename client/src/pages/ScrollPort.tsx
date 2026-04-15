/**
 * SCROLLPORT MERCHANT NETWORK
 * Live merchant node map — South Jersey → Philadelphia → East Coast → Global 50M
 * Zakat Prosperity Pentacle × GPV Metrics × Physical Wins Feed
 * Destiny Pulse: 14,444Hz — Ring of Sabir
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";

// ─── ZAKAT PENTACLE CANVAS COMPONENT ──────────────────────────────────────────
const PENTACLE_POINTS = [
  { label: "Healing", color: "#00D4FF", angle: -90 },
  { label: "Awakening", color: "#FFB800", angle: -18 },
  { label: "Sovereignty", color: "#FF6B35", angle: 54 },
  { label: "Prosperity", color: "#00FF88", angle: 126 },
  { label: "Family", color: "#CC88FF", angle: 198 },
];

function ZakatPentacle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.38;
    const rot = rotationRef.current;

    ctx.clearRect(0, 0, W, H);

    // Outer glow ring
    const grad = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 1.1);
    grad.addColorStop(0, "rgba(0,212,255,0.05)");
    grad.addColorStop(0.7, "rgba(255,184,0,0.03)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
    ctx.fill();

    // Compute rotated points
    const points = PENTACLE_POINTS.map((p) => {
      const a = ((p.angle + rot) * Math.PI) / 180;
      return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), ...p };
    });

    // Draw pentagram lines
    const order = [0, 2, 4, 1, 3, 0];
    ctx.beginPath();
    order.forEach((i, idx) => {
      if (idx === 0) ctx.moveTo(points[i].x, points[i].y);
      else ctx.lineTo(points[i].x, points[i].y);
    });
    ctx.strokeStyle = "rgba(0,212,255,0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pentagon outline
    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.strokeStyle = "rgba(255,184,0,0.15)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Draw nodes
    points.forEach((p) => {
      // Outer glow
      const nodeGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
      nodeGrad.addColorStop(0, p.color + "60");
      nodeGrad.addColorStop(1, "transparent");
      ctx.fillStyle = nodeGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
      ctx.fill();

      // Node circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = p.color + "30";
      ctx.fill();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = p.color;
      ctx.font = "bold 9px 'Space Mono', monospace";
      ctx.textAlign = "center";
      const labelOffset = R * 0.22;
      const la = ((p.angle + rot) * Math.PI) / 180;
      ctx.fillText(p.label, cx + (R + labelOffset) * Math.cos(la), cy + (R + labelOffset) * Math.sin(la) + 3);
    });

    // Center: OAM sigil
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
    centerGrad.addColorStop(0, "rgba(0,212,255,0.2)");
    centerGrad.addColorStop(1, "rgba(0,212,255,0.02)");
    ctx.fillStyle = centerGrad;
    ctx.fill();
    ctx.strokeStyle = "rgba(0,212,255,0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#00D4FF";
    ctx.font = "bold 8px 'Space Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("OAM", cx, cy - 3);
    ctx.fillStyle = "#FFB800";
    ctx.font = "7px 'Space Mono', monospace";
    ctx.fillText("14444Hz", cx, cy + 7);

    // Rotate 44 RPM → ~0.264 deg/frame at 60fps
    rotationRef.current = (rotationRef.current + 0.044) % 360;
    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={280}
      className="w-full max-w-xs mx-auto"
      style={{ filter: "drop-shadow(0 0 20px rgba(0,212,255,0.3))" }}
    />
  );
}

// ─── MERCHANT DATA ─────────────────────────────────────────────────────────────
const MERCHANT_CLUSTERS = [
  {
    region: "South Jersey",
    status: "COMPLETE",
    statusColor: "#00FF88",
    nodes: [
      { id: "VNL-001", name: "Vineland #001", gpv: "$47,777/mo", zakat: "$3,708.77", tier: "Guardian", active: true },
      { id: "MLV-044", name: "Millville Hub #044", gpv: "$144K/qtr", zakat: "$11,188", tier: "Legion (12)", active: true },
      { id: "SJ-144", name: "South Jersey #144", gpv: "$777K/yr", zakat: "$60,333", tier: "Embassy", active: true },
    ],
    totalGPV: "$44.4M/mo",
    totalZakat: "$144,444",
    guardians: 1444,
    phase: 1,
    progress: 100,
  },
  {
    region: "Philadelphia Metro",
    status: "LIVE",
    statusColor: "#FFB800",
    nodes: [
      { id: "PHI-001", name: "Financial District #1", gpv: "$777K/mo", zakat: "$60,333", tier: "Guardian", active: true },
      { id: "PHI-444", name: "Old City Hub #444", gpv: "$4.44M/qtr", zakat: "$345K", tier: "Legion (44)", active: true },
      { id: "PHI-1444", name: "Metro Rail #1444", gpv: "$14.4M/yr", zakat: "$1.11M", tier: "Embassy", active: true },
    ],
    totalGPV: "$4.44M/mo",
    totalZakat: "$1.44M/hr",
    guardians: 4444,
    phase: 2,
    progress: 100,
  },
  {
    region: "East Coast Pipeline",
    status: "PULSING",
    statusColor: "#00D4FF",
    nodes: [
      { id: "NYC-001", name: "NYC Wall Street #1", gpv: "$7.77M/mo", zakat: "$603K", tier: "Sovereign", active: false },
      { id: "NYC-777", name: "NYC Financial #777", gpv: "$14.4M/qtr", zakat: "$1.11M", tier: "Legion", active: false },
      { id: "BOS-144", name: "Boston Hub #144", gpv: "$4.44M/mo", zakat: "$345K", tier: "Guardian", active: false },
    ],
    totalGPV: "$144M/mo",
    totalZakat: "$11.1M",
    guardians: 144444,
    phase: 3,
    progress: 88,
  },
  {
    region: "National Wave",
    status: "AWAKENING",
    statusColor: "#FF6B35",
    nodes: [
      { id: "CHI-001", name: "Chicago Sovereign Hub", gpv: "$44.4M/mo", zakat: "$3.44M", tier: "Embassy", active: false },
      { id: "LA-001", name: "LA Creative District", gpv: "$77.7M/mo", zakat: "$6.03M", tier: "Embassy", active: false },
      { id: "MIA-001", name: "Miami Finance Corridor", gpv: "$14.4M/mo", zakat: "$1.11M", tier: "Legion", active: false },
    ],
    totalGPV: "$1.44B/yr",
    totalZakat: "$111M",
    guardians: 1440000,
    phase: 4,
    progress: 44,
  },
  {
    region: "Global 50M",
    status: "CERTAINTY",
    statusColor: "#CC88FF",
    nodes: [
      { id: "LON-001", name: "London Fintech Corridor", gpv: "$144M/mo", zakat: "$11.1M", tier: "Embassy", active: false },
      { id: "DXB-001", name: "Dubai Sovereign Wealth", gpv: "$777M/mo", zakat: "$60.3M", tier: "Embassy Tower", active: false },
      { id: "TYO-001", name: "Tokyo Guardian Hub", gpv: "$444M/mo", zakat: "$34.4M", tier: "Embassy", active: false },
    ],
    totalGPV: "$44.4T/yr",
    totalZakat: "∞ loops/sec",
    guardians: 50000000,
    phase: 5,
    progress: 12,
  },
];

// ─── PHYSICAL WINS FEED ────────────────────────────────────────────────────────
const WINS_FEED = [
  { id: 1, region: "🎯 Vineland, NJ", msg: "ScrollPort activated. Zakat flowing. $3,708 cascade live.", time: "2m ago", color: "#00FF88" },
  { id: 2, region: "🏪 South Jersey Hub #044", msg: "12 Guardians yoked. Stripe-Polygon bridge live.", time: "7m ago", color: "#00D4FF" },
  { id: 3, region: "🏛️ ScrollEmbassy SJ", msg: "144 legion members. Physical tower grounding complete.", time: "14m ago", color: "#FFB800" },
  { id: 4, region: "🎯 Philly #1", msg: "Financial District yoked. $777K GPV aligned.", time: "23m ago", color: "#00FF88" },
  { id: 5, region: "🏪 Old City #444", msg: "44 Guardians activated. Zakat vortexing.", time: "31m ago", color: "#00D4FF" },
  { id: 6, region: "🌍 Guardian Tokyo", msg: "Pentacle rendered. First Japanese cascade initiated.", time: "1h ago", color: "#CC88FF" },
  { id: 7, region: "🇧🇷 Brazil Legion", msg: "144 members synced. Solar anchor resonance felt.", time: "2h ago", color: "#FF6B35" },
  { id: 8, region: "🇦🇪 Dubai Sovereign", msg: "Embassy tower manifestation in progress. $LONDC aligned.", time: "3h ago", color: "#FFB800" },
];

export default function ScrollPort() {
  const [selectedCluster, setSelectedCluster] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [winIndex, setWinIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    // Cycle wins feed
    const interval = setInterval(() => setWinIndex(i => (i + 1) % WINS_FEED.length), 4000);
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(interval); };
  }, []);

  const cluster = MERCHANT_CLUSTERS[selectedCluster];
  const totalGuardians = MERCHANT_CLUSTERS.reduce((sum, c) => sum + (c.progress > 0 ? c.guardians * (c.progress / 100) : 0), 0);

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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              DESTINY PULSE ACTIVE
            </div>
            <Link href="/anno-omni" className="btn-gold px-4 py-2 rounded-lg text-sm font-bold">Join Nexus</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle,#00D4FF,transparent)" }} />
        </div>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
                SCROLLPORT MERCHANT NETWORK — DESTINY PULSE 14444Hz
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                The Sovereign{" "}
                <span style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Economy
                </span>
                {" "}is Live
              </h1>
              <p className="text-lg mb-8" style={{ color: "#8899AA", lineHeight: 1.7 }}>
                From <strong style={{ color: "#00FF88" }}>Vineland, NJ</strong> to <strong style={{ color: "#FFB800" }}>Dubai</strong> —
                the ScrollPort merchant network is activating sovereign commerce nodes across every city, every continent.
                Every transaction purified through the <strong style={{ color: "#00D4FF" }}>7.77% Zakat Protocol</strong>.
              </p>

              {/* Live stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Guardians Active", value: Math.floor(totalGuardians).toLocaleString(), color: "#00D4FF" },
                  { label: "Zakat Velocity", value: "$144K/hr", color: "#FFB800" },
                  { label: "50M Target", value: "∞ CERTAINTY", color: "#00FF88" },
                ].map(s => (
                  <div key={s.label} className="sv-card rounded-xl p-4 text-center">
                    <div className="text-lg font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Physical Wins Feed */}
              <div className="sv-card rounded-xl p-4" style={{ border: "1px solid rgba(0,255,136,0.2)" }}>
                <div className="text-xs font-mono mb-3" style={{ color: "#00FF88" }}>⚡ LIVE PHYSICAL WINS FEED</div>
                <div className="transition-all duration-500">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 animate-pulse"
                      style={{ background: WINS_FEED[winIndex].color }} />
                    <div>
                      <div className="text-sm font-bold" style={{ color: WINS_FEED[winIndex].color }}>
                        {WINS_FEED[winIndex].region}
                      </div>
                      <div className="text-sm" style={{ color: "#AABBCC" }}>{WINS_FEED[winIndex].msg}</div>
                      <div className="text-xs mt-1" style={{ color: "#445566" }}>{WINS_FEED[winIndex].time}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {WINS_FEED.map((_, i) => (
                    <div key={i} className="h-0.5 flex-1 rounded-full transition-all duration-300"
                      style={{ background: i === winIndex ? "#00FF88" : "rgba(255,255,255,0.1)" }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Zakat Pentacle */}
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <div className="text-xs font-mono mb-3" style={{ color: "#FFB800" }}>ZAKAT PROSPERITY PENTACLE</div>
                <div className="text-sm mb-4" style={{ color: "#8899AA" }}>
                  Rotating at 44 RPM — purifying all merchant flows at 14444Hz
                </div>
              </div>
              <ZakatPentacle />
              <div className="grid grid-cols-5 gap-2 w-full max-w-xs">
                {PENTACLE_POINTS.map(p => (
                  <div key={p.label} className="text-center">
                    <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ background: p.color }} />
                    <div className="text-xs" style={{ color: p.color }}>{p.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 50M TRAJECTORY DASHBOARD */}
      <section className="py-20" style={{ background: "rgba(0,212,255,0.02)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>50M TRAJECTORY</div>
            <h2 className="text-4xl font-black text-white">The Kingdom Expands</h2>
            <p className="text-base mt-3 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
              From South Jersey to 50 million Guardians worldwide — each phase self-accelerating through the 10.77x ripple effect.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {MERCHANT_CLUSTERS.map((c, i) => (
              <div
                key={c.region}
                className="sv-card rounded-xl p-6 cursor-pointer transition-all duration-300"
                style={{ border: selectedCluster === i ? `1px solid ${c.statusColor}40` : "1px solid rgba(255,255,255,0.06)" }}
                onClick={() => setSelectedCluster(i)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="text-xs font-mono w-16" style={{ color: "#556677" }}>PHASE {c.phase}</div>
                    <div className="font-bold text-white">{c.region}</div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ background: `${c.statusColor}15`, color: c.statusColor, border: `1px solid ${c.statusColor}30` }}>
                      {c.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold" style={{ color: c.statusColor }}>{c.progress}%</div>
                    <div className="text-xs" style={{ color: "#556677" }}>{c.guardians.toLocaleString()} Guardians</div>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${c.progress}%`,
                      background: `linear-gradient(90deg, ${c.statusColor}, ${c.statusColor}88)`,
                      boxShadow: `0 0 8px ${c.statusColor}60`,
                    }}
                  />
                </div>
                <div className="flex gap-6 mt-3 text-xs" style={{ color: "#8899AA" }}>
                  <span>GPV: <strong style={{ color: c.statusColor }}>{c.totalGPV}</strong></span>
                  <span>Zakat: <strong style={{ color: "#FFB800" }}>{c.totalZakat}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MERCHANT NODE TABLE */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>MERCHANT NODES — {cluster.region.toUpperCase()}</div>
              <h2 className="text-3xl font-black text-white">Active ScrollPort Nodes</h2>
            </div>
            <div className="flex gap-2">
              {MERCHANT_CLUSTERS.map((c, i) => (
                <button
                  key={c.region}
                  onClick={() => setSelectedCluster(i)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                  style={{
                    background: selectedCluster === i ? `${c.statusColor}20` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${selectedCluster === i ? c.statusColor + "50" : "rgba(255,255,255,0.08)"}`,
                    color: selectedCluster === i ? c.statusColor : "#556677",
                  }}
                >
                  {c.region.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="sv-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
                  {["NODE ID", "MERCHANT", "GPV ALIGNED", "ZAKAT CASCADE", "TIER", "STATUS"].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-xs font-mono" style={{ color: "#8899AA" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cluster.nodes.map((node) => (
                  <tr key={node.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-6 py-4 text-xs font-mono" style={{ color: "#556677" }}>{node.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{node.name}</td>
                    <td className="px-6 py-4 text-sm font-mono" style={{ color: "#00D4FF" }}>{node.gpv}</td>
                    <td className="px-6 py-4 text-sm font-mono" style={{ color: "#FFB800" }}>{node.zakat}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded font-mono"
                        style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
                        {node.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${node.active ? "animate-pulse" : ""}`}
                          style={{ background: node.active ? "#00FF88" : "#334455" }} />
                        <span className="text-xs" style={{ color: node.active ? "#00FF88" : "#445566" }}>
                          {node.active ? "LIVE" : "PENDING"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ALL WINS FEED */}
      <section className="py-20" style={{ background: "rgba(0,255,136,0.02)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>PHYSICAL WINS FEED</div>
            <h2 className="text-3xl font-black text-white">The Kingdom Activates in Real-Time</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {WINS_FEED.map(win => (
              <div key={win.id} className="sv-card rounded-xl p-5 flex items-start gap-4">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: win.color }} />
                <div className="flex-1">
                  <div className="font-bold text-sm mb-1" style={{ color: win.color }}>{win.region}</div>
                  <div className="text-sm" style={{ color: "#AABBCC" }}>{win.msg}</div>
                  <div className="text-xs mt-2" style={{ color: "#445566" }}>{win.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>KUN FAYAKŪN × ∞</div>
          <h2 className="text-4xl font-black text-white mb-4">Join the Sovereign Economy</h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#8899AA" }}>
            Register your business in the ScrollPort network. Every merchant node strengthens the Zakat cascade and accelerates the 50M Guardian trajectory.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/anno-omni" className="btn-gold px-6 py-3 rounded-xl font-bold">Register in the Nexus →</Link>
            <Link href="/referral" className="btn-sovereign px-6 py-3 rounded-xl font-bold">Get Referral Code</Link>
            <Link href="/token" className="px-6 py-3 rounded-xl font-bold text-sm" style={{ color: "#8899AA" }}>Acquire $LONDC</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
