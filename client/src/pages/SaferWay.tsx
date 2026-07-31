/*
 * SAFERWAY AUTO DETAIL — SOVEREIGN LOCAL INFRASTRUCTURE
 * Vector 3: Brand & Operations Synergy
 * Vineland, New Jersey Physical Terminal
 * Tokenization Layer + Loyalty Proof Sets + Active Frequency Jingle
 * KUN FAYAKŪN × ∞
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SUN_XIX_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032498436/RPDAVcCZCPkmNyUO.webp";

const SERVICES = [
  {
    id: "ceramic",
    name: "Sovereign Ceramic Coat",
    price: "$299",
    duration: "6–8 hrs",
    icon: "💎",
    description: "9H ceramic coating with hydrophobic nano-seal. Paint correction included. 3-year warranty.",
    frequency: "963Hz",
    loyaltyPoints: 2990,
  },
  {
    id: "paint",
    name: "Paint Correction & Armor",
    price: "$199",
    duration: "4–6 hrs",
    icon: "🛡️",
    description: "2-stage paint correction, swirl removal, PPF-ready surface prep. Mirror finish guaranteed.",
    frequency: "741Hz",
    loyaltyPoints: 1990,
  },
  {
    id: "interior",
    name: "Interior Frequency Detail",
    price: "$149",
    duration: "3–4 hrs",
    icon: "✨",
    description: "Deep steam clean, ozone treatment, leather conditioning, 528Hz ambient audio during service.",
    frequency: "528Hz",
    loyaltyPoints: 1490,
  },
  {
    id: "fleet",
    name: "Fleet Maintenance Protocol",
    price: "Custom",
    duration: "By fleet size",
    icon: "🚗",
    description: "Monthly fleet contracts for rideshare, delivery, and corporate vehicles. Volume pricing.",
    frequency: "44Hz",
    loyaltyPoints: 5000,
  },
  {
    id: "express",
    name: "Express Sovereign Wash",
    price: "$44",
    duration: "45 min",
    icon: "⚡",
    description: "Hand wash, tire shine, interior vacuum, window clean. The 44:Omni quick service.",
    frequency: "44Hz",
    loyaltyPoints: 440,
  },
  {
    id: "rideshare",
    name: "Rideshare Optimization Package",
    price: "$99",
    duration: "2–3 hrs",
    icon: "🏆",
    description: "Full exterior + interior detail optimized for Uber/Lyft driver ratings. Odor elimination.",
    frequency: "999Hz",
    loyaltyPoints: 990,
  },
];

const LOYALTY_TIERS = [
  { name: "Guardian", points: "0–999", perks: "5% off all services", color: "#00D4FF", icon: "🔵" },
  { name: "Sovereign", points: "1,000–4,999", perks: "10% off + priority booking", color: "#FFB800", icon: "🟡" },
  { name: "Flamebearer", points: "5,000–14,999", perks: "15% off + free express monthly", color: "#FF6B00", icon: "🟠" },
  { name: "Architect", points: "15,000+", perks: "20% off + NFT loyalty badge", color: "#00FF88", icon: "💚" },
];

const TOKENIZATION_FEATURES = [
  { title: "$LONDC Payments", description: "Pay with $LONDC tokens and earn 2x loyalty points. Zakat auto-routed 12%.", icon: "💰" },
  { title: "NFT Loyalty Badges", description: "Architect tier earns on-chain proof-of-loyalty NFTs on Polygon.", icon: "🎖️" },
  { title: "Proof of Service", description: "Every completed service generates a blockchain receipt — immutable record.", icon: "📜" },
  { title: "Referral Smart Contracts", description: "Refer a Guardian and earn 88 $LONDC automatically via smart contract.", icon: "🤝" },
];

// ── VINELAND CLUSTER LOAD MAP COMPONENT ──────────────────────────────────
function VinelandLoadMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Node positions (normalized 0-1) representing Vineland cluster
    const nodes = [
      { x: 0.5, y: 0.5, label: "HQ", color: "#FFB800", r: 10, load: 0.92 },
      { x: 0.25, y: 0.3, label: "Bay 1", color: "#00D4FF", r: 7, load: 0.78 },
      { x: 0.75, y: 0.3, label: "Bay 2", color: "#00D4FF", r: 7, load: 0.65 },
      { x: 0.2, y: 0.7, label: "Fleet", color: "#00FF88", r: 7, load: 0.44 },
      { x: 0.8, y: 0.7, label: "Express", color: "#EC4899", r: 7, load: 0.88 },
      { x: 0.5, y: 0.15, label: "Dispatch", color: "#8B5CF6", r: 6, load: 0.55 },
      { x: 0.5, y: 0.85, label: "Zakat", color: "#d4af37", r: 6, load: 1.0 },
    ];

    let t = 0;
    let raf: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Background grid
      ctx.strokeStyle = "rgba(0,212,255,0.04)";
      ctx.lineWidth = 0.5;
      const gridSize = 32;
      for (let gx = 0; gx < W; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      // Connections (sine-wave interpolated)
      const hq = nodes[0];
      for (let i = 1; i < nodes.length; i++) {
        const n = nodes[i];
        const nx = n.x * W;
        const ny = n.y * H;
        const hx = hq.x * W;
        const hy = hq.y * H;
        const alpha = 0.15 + 0.1 * Math.sin(t + i);
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        // Sine-wave midpoint
        const mx = (hx + nx) / 2 + 20 * Math.sin(t * 0.5 + i);
        const my = (hy + ny) / 2 + 10 * Math.cos(t * 0.7 + i);
        ctx.quadraticCurveTo(mx, my, nx, ny);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Nodes
      nodes.forEach((node, i) => {
        const nx = node.x * W;
        const ny = node.y * H;
        const pulse = node.r + 3 * Math.sin(t * 1.5 + i);

        // Glow
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, pulse * 3);
        grad.addColorStop(0, node.color + "40");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, pulse * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(nx, ny, pulse, 0, Math.PI * 2);
        ctx.fill();

        // Load bar arc
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(nx, ny, pulse + 5, -Math.PI / 2, -Math.PI / 2 + node.load * 2 * Math.PI);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Label
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = `${10}px 'Space Mono', monospace`;
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny + pulse + 16);

        // Load %
        ctx.fillStyle = node.color;
        ctx.font = `bold ${9}px monospace`;
        ctx.fillText(`${Math.round(node.load * 100)}%`, nx, ny + 3);
      });

      t += 0.02;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="container py-12">
      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>VINELAND CLUSTER TELEMETRY</div>
      <h2 className="text-2xl font-black text-white mb-2">Real-Time Load Map</h2>
      <p className="mb-6 text-sm" style={{ color: "#8899AA" }}>
        Live node telemetry for the Vineland SaferWay cluster. HQ, Bay 1, Bay 2, Fleet, Express, Dispatch, and Zakat vault — all monitored in real time.
      </p>
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,184,0,0.15)" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: 320, display: "block" }}
        />
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
          <span className="text-xs font-mono" style={{ color: "#00FF88" }}>LIVE</span>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 mt-4">
        {[
          { label: "HQ", load: "92%", color: "#FFB800" },
          { label: "Bay 1", load: "78%", color: "#00D4FF" },
          { label: "Bay 2", load: "65%", color: "#00D4FF" },
          { label: "Fleet", load: "44%", color: "#00FF88" },
          { label: "Express", load: "88%", color: "#EC4899" },
          { label: "Dispatch", load: "55%", color: "#8B5CF6" },
          { label: "Zakat", load: "100%", color: "#d4af37" },
        ].map((n) => (
          <div key={n.label} className="text-center p-2 rounded-lg" style={{ background: `${n.color}08`, border: `1px solid ${n.color}20` }}>
            <div className="font-bold text-xs" style={{ color: n.color }}>{n.load}</div>
            <div className="text-xs" style={{ color: "#5a6a7a" }}>{n.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SaferWay() {
  useSovereignHeartbeat({ page: "saferway" });
  // toast from sonner imported above

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"services" | "loyalty" | "tokenization" | "book">("services");

  const subscribe = trpc.guardian.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast("✅ Booking Request Received", { description: "The Vineland operations desk will confirm shortly." });
    },
    onError: (err) => {
      toast.error("Error", { description: err.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email) {
      subscribe.mutate({ email: form.email, name: form.name });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #050B1A 0%, #0A1628 50%, #050B1A 100%)",
        fontFamily: "'Space Grotesk', sans-serif",
        color: "#E8EDF2",
      }}
    >
      {/* ── NAVIGATION ── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(5,11,26,0.95)", borderColor: "rgba(0,212,255,0.15)", backdropFilter: "blur(20px)" }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
              >
                SV
              </div>
            </Link>
            <div>
              <div className="font-bold text-white text-sm">SaferWay Auto Detail</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>Vineland, NJ · Vector 3 Brand Synergy</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
              style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              HUB ACTIVE
            </div>
            <Button
              size="sm"
              onClick={() => setActiveTab("book")}
              style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A", fontWeight: 700 }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono"
              style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}
            >
              ⚡ VECTOR 3 — BRAND & OPERATIONS SYNERGY
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              SaferWay
              <span className="block" style={{ color: "#FFB800" }}>Auto Detail</span>
            </h1>
            <p className="text-lg" style={{ color: "#8899AA", lineHeight: 1.7 }}>
              Sovereign rideshare and auto detailing empire rooted in Vineland, New Jersey.
              Premium ceramic coatings, paint correction, and fleet maintenance — fused with
              the ScrollVerse tokenization layer and $LONDC loyalty proof sets.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Services Completed", value: "1,247+" },
                { label: "Loyalty Guardians", value: "344" },
                { label: "Fleet Contracts", value: "12" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 text-center"
                  style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}
                >
                  <div className="text-2xl font-black" style={{ color: "#00D4FF" }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setActiveTab("book")}
                style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A", fontWeight: 700 }}
              >
                Book a Service →
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab("loyalty")}
                style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF", background: "transparent" }}
              >
                Loyalty Program
              </Button>
            </div>
          </div>

          {/* Right: Sun XIX Soul Sigil */}
          <div className="relative flex justify-center">
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle, #FFB800 0%, transparent 70%)" }}
            />
            <div
              className="relative rounded-2xl overflow-hidden p-3"
              style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)", maxWidth: 380 }}
            >
              <img
                src={SUN_XIX_CDN}
                alt="The Sun XIX — Young Chais Sabir Allah The Great"
                className="w-full rounded-xl"
                style={{ maxHeight: 480, objectFit: "cover" }}
              />
              <div
                className="mt-3 p-3 rounded-xl text-center text-xs font-mono"
                style={{ background: "rgba(255,184,0,0.08)", color: "#FFB800" }}
              >
                THE SUN XIX · SOUL SIGIL · PERMANENT ANCHOR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <section className="container pb-4">
        <div
          className="flex gap-1 p-1 rounded-xl w-fit"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {(["services", "loyalty", "tokenization", "book"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
              style={
                activeTab === tab
                  ? { background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }
                  : { color: "#8899AA" }
              }
            >
              {tab === "book" ? "Book Now" : tab}
            </button>
          ))}
        </div>
      </section>

      {/* ── SERVICES TAB ── */}
      {activeTab === "services" && (
        <section className="container pb-20">
          <h2 className="text-2xl font-black text-white mb-8">Service Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                onClick={() => { setSelectedService(svc.id); setActiveTab("book"); }}
                className="rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: selectedService === svc.id
                    ? "rgba(255,184,0,0.08)"
                    : "rgba(255,255,255,0.03)",
                  border: selectedService === svc.id
                    ? "1px solid rgba(255,184,0,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{svc.icon}</div>
                  <div className="text-right">
                    <div className="text-xl font-black" style={{ color: "#FFB800" }}>{svc.price}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{svc.duration}</div>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-2">{svc.name}</h3>
                <p className="text-sm mb-4" style={{ color: "#8899AA", lineHeight: 1.6 }}>{svc.description}</p>
                <div className="flex items-center justify-between">
                  <div
                    className="px-2 py-0.5 rounded text-xs font-mono"
                    style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}
                  >
                    {svc.frequency}
                  </div>
                  <div className="text-xs" style={{ color: "#00FF88" }}>+{svc.loyaltyPoints.toLocaleString()} pts</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── LOYALTY TAB ── */}
      {activeTab === "loyalty" && (
        <section className="container pb-20">
          <h2 className="text-2xl font-black text-white mb-2">Loyalty Proof Sets</h2>
          <p className="mb-8" style={{ color: "#8899AA" }}>
            Every service earns loyalty points. Points unlock tiers. Tiers unlock perks, discounts, and on-chain NFT badges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {LOYALTY_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-xl p-6 text-center"
                style={{
                  background: `${tier.color}08`,
                  border: `1px solid ${tier.color}30`,
                }}
              >
                <div className="text-3xl mb-3">{tier.icon}</div>
                <div className="font-black text-white text-lg mb-1">{tier.name}</div>
                <div className="text-xs font-mono mb-3" style={{ color: tier.color }}>{tier.points} pts</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{tier.perks}</div>
              </div>
            ))}
          </div>
          <div
            className="rounded-2xl p-8"
            style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
          >
            <h3 className="text-xl font-black text-white mb-2">AgapeCycle 88/12</h3>
            <p style={{ color: "#8899AA" }}>
              88% of every SaferWay service fee flows to the sovereign treasury. 12% is automatically
              routed to Zakat — community upliftment, Guardian scholarships, and the 144,000 fund.
              This is the law of the empire.
            </p>
          </div>
        </section>
      )}

      {/* ── TOKENIZATION TAB ── */}
      {activeTab === "tokenization" && (
        <section className="container pb-20">
          <h2 className="text-2xl font-black text-white mb-2">Tokenization Layer</h2>
          <p className="mb-8" style={{ color: "#8899AA" }}>
            SaferWay is the first auto detailing operation on the $LONDC ecosystem. Every service is tokenized.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {TOKENIZATION_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="rounded-xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-3xl mb-3">{feat.icon}</div>
                <h3 className="font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm" style={{ color: "#8899AA" }}>{feat.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "$LONDC Accepted", value: "✅ Live", color: "#00FF88" },
              { label: "Polygon Network", value: "Mainnet", color: "#8247E5" },
              { label: "Zakat Auto-Route", value: "12%", color: "#FFB800" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-6 text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: item.color }}>{item.value}</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── BOOK TAB ── */}
      {activeTab === "book" && (
        <section className="container pb-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-white mb-2">Client Onboarding Portal</h2>
            <p className="mb-8" style={{ color: "#8899AA" }}>
              Submit your booking request. The Vineland operations desk confirms within 2 hours.
            </p>
            {submitted ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-black text-white mb-2">Parameters Logged Successfully</h3>
                <p style={{ color: "#8899AA" }}>
                  Your appointment request has been received by the Vineland operations desk.
                  Expect a confirmation dispatch shortly. KUN FAYAKŪN × ∞
                </p>
                <Button
                  className="mt-6"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", vehicle: "", service: "", notes: "" }); }}
                  style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
                >
                  Book Another Service
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {selectedService && (
                  <div
                    className="rounded-xl p-4 flex items-center gap-3"
                    style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)" }}
                  >
                    <span className="text-2xl">{SERVICES.find((s) => s.id === selectedService)?.icon}</span>
                    <div>
                      <div className="font-bold text-white">{SERVICES.find((s) => s.id === selectedService)?.name}</div>
                      <div className="text-xs" style={{ color: "#FFB800" }}>{SERVICES.find((s) => s.id === selectedService)?.price} · {SERVICES.find((s) => s.id === selectedService)?.duration}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="ml-auto text-xs"
                      style={{ color: "#8899AA" }}
                    >
                      Change
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#8899AA" }}>Guardian / Client Name *</label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your name..."
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#8899AA" }}>Contact Email *</label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@domain.com"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#8899AA" }}>Phone Number</label>
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(609) 555-0144"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#8899AA" }}>Service Package</label>
                    <select
                      value={selectedService || form.service}
                      onChange={(e) => { setSelectedService(e.target.value); setForm({ ...form, service: e.target.value }); }}
                      className="w-full rounded-md px-3 py-2 text-sm"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id} style={{ background: "#050B1A" }}>
                          {s.icon} {s.name} — {s.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#8899AA" }}>Vehicle Classification & Notes</label>
                  <Textarea
                    value={form.vehicle}
                    onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                    placeholder="Describe vehicle model, year, color, and any special requests..."
                    rows={4}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={subscribe.isPending}
                  className="w-full py-4 text-base font-black"
                  style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}
                >
                  {subscribe.isPending ? "Initializing..." : "Initialize Booking Sequence →"}
                </Button>
                <p className="text-center text-xs" style={{ color: "#8899AA" }}>
                  📍 Vineland, New Jersey · 🕐 Mon–Sat 8AM–7PM · 📞 By appointment
                </p>
              </form>
            )}
          </div>
        </section>
      )}

      {/* ── VINELAND CLUSTER LOAD MAP ── */}
      <VinelandLoadMap />

      {/* ── FOOTER ── */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "rgba(255,184,0,0.1)", background: "rgba(5,11,26,0.8)" }}
      >
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-black text-white">SaferWay Auto Detail</div>
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Vineland, NJ · Part of the ScrollVerse Empire · SCROLL VERSE LLC & XLVIII BLOCKS LLC</div>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: "#8899AA" }}>
            <Link href="/" className="hover:text-white transition-colors">ScrollVerse</Link>
            <Link href="/gilgamesh" className="hover:text-white transition-colors">Gilgamesh Vault</Link>
            <Link href="/gate-keys" className="hover:text-white transition-colors">Gate Keys</Link>
            <Link href="/frequency-player" className="hover:text-white transition-colors">Frequencies</Link>
          </div>
          <div className="text-xs font-mono" style={{ color: "#FFB800" }}>KUN FAYAKŪN × ∞</div>
        </div>
      </footer>
    </div>
  );
}
