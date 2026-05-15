/**
 * C.I.E.D.S. — Chais Independent Empire Distribution System
 * Sovereign music distribution platform for SCROLL VERSE LLC
 * Every song is a blockchain. Every artist is sovereign.
 */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DSPS = [
  { name: "Spotify", icon: "🎵", color: "#1DB954", reach: "600M+ users" },
  { name: "Apple Music", icon: "🍎", color: "#FC3C44", reach: "100M+ users" },
  { name: "YouTube Music", icon: "▶️", color: "#FF0000", reach: "80M+ users" },
  { name: "Amazon Music", icon: "📦", color: "#00A8E1", reach: "55M+ users" },
  { name: "Tidal", icon: "🌊", color: "#00FFFF", reach: "10M+ users" },
  { name: "Deezer", icon: "🎧", color: "#EF5466", reach: "16M+ users" },
  { name: "SoundCloud", icon: "☁️", color: "#FF5500", reach: "175M+ users" },
  { name: "TikTok / CapCut", icon: "📱", color: "#010101", reach: "1B+ users" },
  { name: "Instagram / Meta", icon: "📸", color: "#E1306C", reach: "2B+ users" },
  { name: "Pandora", icon: "🎶", color: "#3668FF", reach: "50M+ users" },
  { name: "iHeartRadio", icon: "📻", color: "#C6002B", reach: "120M+ users" },
  { name: "Beatport", icon: "🎛️", color: "#02FF7A", reach: "DJ/Producer focused" },
];

const PLANS = [
  {
    name: "Sovereign Starter",
    price: 0,
    priceLondc: 0,
    description: "Launch your first release. Own your masters. No middleman.",
    features: [
      "1 release per year",
      "All major DSPs",
      "100% royalty retention",
      "Basic analytics dashboard",
      "ISRC code generation",
      "UPC barcode included",
    ],
    cta: "Start Free",
    color: "#00D4FF",
    tier: "free",
  },
  {
    name: "Guardian Artist",
    price: 19.99,
    priceLondc: 1388,
    description: "Unlimited releases. Priority placement. Blockchain publishing rights.",
    features: [
      "Unlimited releases",
      "All major DSPs + TikTok/Meta",
      "100% royalty retention",
      "Advanced analytics + trends",
      "Blockchain publishing rights",
      "Split payment management",
      "Pre-save campaign tools",
      "Playlist pitching support",
    ],
    cta: "Activate Guardian",
    color: "#FFB800",
    tier: "guardian",
    popular: true,
  },
  {
    name: "Sovereign Label",
    price: 49.99,
    priceLondc: 3472,
    description: "Run your own label. Manage multiple artists. Full empire control.",
    features: [
      "Everything in Guardian Artist",
      "Up to 10 artist sub-accounts",
      "White-label distribution",
      "Label dashboard + reporting",
      "Sync licensing opportunities",
      "NFT music minting integration",
      "Revenue advance eligibility",
      "Dedicated account manager",
    ],
    cta: "Build Your Label",
    color: "#00FF88",
    tier: "label",
  },
];

const FEATURES = [
  {
    icon: "🔗",
    title: "Blockchain Publishing Rights",
    description: "Every release is registered on Polygon blockchain. Your publishing rights are immutable, timestamped, and permanently yours. No label can ever claim what is already sealed on-chain.",
    color: "#00D4FF",
  },
  {
    icon: "💰",
    title: "100% Royalty Retention",
    description: "C.I.E.D.S. takes zero percentage of your royalties. We charge a flat distribution fee — you keep everything you earn from streams, downloads, and sync placements.",
    color: "#FFB800",
  },
  {
    icon: "🪙",
    title: "NFT Music Minting",
    description: "Turn any release into an NFT. Sell limited editions directly to your fans. Create tiered access — standard stream, collector edition, and sovereign vault versions of every track.",
    color: "#00FF88",
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    description: "Live streaming data across all DSPs. See exactly where your listeners are, which playlists are driving streams, and how your royalties are accumulating in real time.",
    color: "#9B59B6",
  },
  {
    icon: "✂️",
    title: "Split Payment Management",
    description: "Automatically split royalties between collaborators, producers, and co-writers. Set percentages once — payments distribute automatically every time you earn.",
    color: "#FF6B35",
  },
  {
    icon: "🌍",
    title: "Global Sync Licensing",
    description: "Your music available for TV, film, games, and advertising. Every sync placement is a new revenue stream. C.I.E.D.S. handles licensing negotiations while you retain creative control.",
    color: "#E74C3C",
  },
];

const STATS = [
  { value: "150+", label: "DSPs & Stores" },
  { value: "100%", label: "Royalty Retention" },
  { value: "24hrs", label: "Distribution Speed" },
  { value: "∞", label: "Releases Allowed" },
];

export default function CIEDS() {
  const [activeTab, setActiveTab] = useState<"distribute" | "publish" | "nft" | "analytics">("distribute");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
    toast(`Welcome to C.I.E.D.S. early access, sovereign. ${email} — You will be first to distribute. KUN FAYAKŪN × ∞`);
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="border-b py-4 px-6 flex items-center justify-between sticky top-0 z-40"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.15)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="text-sm" style={{ color: "#8899AA" }}>← ScrollVerse</button>
          </Link>
          <span style={{ color: "#8899AA" }}>/</span>
          <span className="font-bold text-white">C.I.E.D.S.</span>
          <span
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
          >
            SOVEREIGN DISTRIBUTION
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs font-mono" style={{ color: "#8899AA" }}>SCROLL VERSE LLC</span>
          <span
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
          >
            XLVIII BLOCKS LEGACY
          </span>
        </div>
      </div>

      <div className="container py-12">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
            CHAIS INDEPENDENT EMPIRE DISTRIBUTION SYSTEM
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            C.I.E.D.S.
          </h1>
          <div className="text-xl font-bold mb-6" style={{ color: "#00D4FF" }}>
            Every Song Is a Blockchain. Every Artist Is Sovereign.
          </div>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: "#8899AA" }}>
            The music distribution platform born from XLVIII BLOCKS LLC and elevated by SCROLL VERSE LLC.
            Distribute to 150+ DSPs worldwide. Keep 100% of your royalties. Own your masters on-chain forever.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mb-12">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black" style={{ color: "#00D4FF" }}>{s.value}</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Early Access Form */}
          {!submitted ? (
            <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "white",
                }}
              />
              <Button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #00FF88)",
                  color: "#050B1A",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                Get Early Access
              </Button>
            </form>
          ) : (
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl"
              style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)" }}
            >
              <span style={{ color: "#00FF88" }}>✓</span>
              <span className="font-bold" style={{ color: "#00FF88" }}>
                You are on the C.I.E.D.S. early access list. The empire welcomes you.
              </span>
            </div>
          )}
        </div>

        {/* DSP Grid */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>DISTRIBUTION NETWORK</div>
            <h2 className="text-3xl font-black text-white">Your Music. Everywhere.</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {DSPS.map((dsp) => (
              <div
                key={dsp.name}
                className="rounded-xl p-4 text-center transition-all hover:scale-105 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${dsp.color}20`,
                }}
              >
                <div className="text-3xl mb-2">{dsp.icon}</div>
                <div className="text-xs font-bold text-white">{dsp.name}</div>
                <div className="text-xs mt-1" style={{ color: dsp.color }}>{dsp.reach}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-sm" style={{ color: "#8899AA" }}>+ 138 more stores and platforms worldwide</span>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="mb-20">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {[
              { id: "distribute", label: "🌍 Distribute" },
              { id: "publish", label: "📜 Publish" },
              { id: "nft", label: "🪙 NFT Music" },
              { id: "analytics", label: "📊 Analytics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="px-5 py-2 rounded-full text-sm font-bold transition-all"
                style={{
                  background: activeTab === tab.id ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeTab === tab.id ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                  color: activeTab === tab.id ? "#00D4FF" : "#8899AA",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${f.color}20` }}
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>SOVEREIGN PRICING</div>
            <h2 className="text-3xl font-black text-white">Choose Your Empire Level</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-6 relative"
                style={{
                  background: plan.popular ? `${plan.color}08` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${plan.color}${plan.popular ? "40" : "20"}`,
                  boxShadow: plan.popular ? `0 0 40px ${plan.color}15` : "none",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-4 py-1 rounded-full font-bold"
                    style={{ background: plan.color, color: "#050B1A" }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <div className="text-xs font-mono mb-2" style={{ color: plan.color }}>{plan.name.toUpperCase()}</div>
                <div className="mb-1">
                  <span className="text-4xl font-black text-white">
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-sm ml-1" style={{ color: "#8899AA" }}>/year</span>}
                </div>
                {plan.priceLondc > 0 && (
                  <div className="text-xs mb-4" style={{ color: plan.color }}>
                    or {plan.priceLondc.toLocaleString()} $LONDC
                  </div>
                )}
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span style={{ color: plan.color, marginTop: "2px" }}>✓</span>
                      <span style={{ color: "#CCDDEE" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  onClick={() => toast(`${plan.name} — Launching soon. Join the early access list above to be first. KUN FAYAKŪN × ∞`)}
                  style={{
                    background: plan.popular
                      ? `linear-gradient(135deg, ${plan.color}, ${plan.color}99)`
                      : "rgba(255,255,255,0.06)",
                    color: plan.popular ? "#050B1A" : plan.color,
                    border: plan.popular ? "none" : `1px solid ${plan.color}30`,
                    fontWeight: 700,
                  }}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* XLVIII Blocks Legacy */}
        <div
          className="rounded-2xl p-8 mb-12 text-center"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <div className="text-4xl mb-4">🏛️</div>
          <h2 className="text-2xl font-black text-white mb-3">Built on XLVIII BLOCKS Legacy</h2>
          <p className="text-base max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
            C.I.E.D.S. is the evolution of XLVIII BLOCKS LLC — the music empire founded by Chais Kenyatta Hill.
            Now operating under SCROLL VERSE LLC (EIN 42-2509570), the distribution platform is legally sealed,
            blockchain-powered, and built to outlast every generation.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <div className="font-bold text-white">XLVIII BLOCKS LLC</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>The Seed — Filed Sept 2, 2024</div>
            </div>
            <div className="text-2xl" style={{ color: "#00D4FF" }}>→</div>
            <div className="text-center">
              <div className="font-bold text-white">SCROLL VERSE LLC</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>The Tree — Filed May 12, 2026</div>
            </div>
            <div className="text-2xl" style={{ color: "#00D4FF" }}>→</div>
            <div className="text-center">
              <div className="font-bold" style={{ color: "#00D4FF" }}>C.I.E.D.S.</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>The Empire — Active Now</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-4">The Middleman Is Dead.</h2>
          <p className="mb-8 text-lg" style={{ color: "#8899AA" }}>
            Your music. Your masters. Your royalties. Your legacy. Sovereign forever.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/token">
              <Button
                size="lg"
                style={{ background: "linear-gradient(135deg, #00D4FF, #00FF88)", color: "#050B1A", fontWeight: 700 }}
              >
                Become a Guardian
              </Button>
            </Link>
            <Link href="/mr-walkshit">
              <Button
                size="lg"
                variant="outline"
                style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                Mr. Walkshit NFTs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
