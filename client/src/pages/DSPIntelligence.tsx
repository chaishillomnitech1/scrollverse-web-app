/**
 * DSP INTELLIGENCE — ScrollVerse Music Distribution Command Center
 * Every major DSP studied, analyzed, and monetized
 * Cover Art Studio · Publishing Rights · Royalty Splits · Sync Licensing
 */

import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// ── Color Palette ─────────────────────────────────────────────────────────────
const GOLD = "#FFB800";
const CYAN = "#00D4FF";
const GREEN = "#00FF88";
const PURPLE = "#9B59B6";
const PINK = "#FF6B9D";
const BG = "#030810";

// ── DSP Data ──────────────────────────────────────────────────────────────────
const DSPS = [
  {
    id: "spotify",
    name: "Spotify",
    logo: "🎵",
    color: "#1DB954",
    streams: "600M+ users",
    royalty: "$0.003–$0.005/stream",
    payout: "Monthly",
    reach: "Global · 184 markets",
    features: ["Spotify for Artists", "Playlist Pitching", "Canvas Loops", "Marquee Ads", "Spotify Wrapped"],
    strategy: "Pitch to editorial playlists 7 days before release. Use Canvas (8-sec loop) for visual branding. Target mood/activity playlists for passive discovery.",
    tier: "TIER 1",
    tierColor: "#1DB954",
  },
  {
    id: "apple",
    name: "Apple Music",
    logo: "🍎",
    color: "#FA2D48",
    streams: "100M+ subscribers",
    royalty: "$0.007–$0.01/stream",
    payout: "Monthly",
    reach: "Global · 167 countries",
    features: ["Spatial Audio / Dolby Atmos", "Apple Music for Artists", "Shazam Integration", "iTunes Store", "Radio"],
    strategy: "Upload Dolby Atmos mixes for premium listeners. Highest per-stream rate of all major DSPs. Shazam integration drives organic discovery.",
    tier: "TIER 1",
    tierColor: "#FA2D48",
  },
  {
    id: "youtube-music",
    name: "YouTube Music",
    logo: "▶️",
    color: "#FF0000",
    streams: "80M+ subscribers",
    royalty: "$0.001–$0.008/stream",
    payout: "Monthly",
    reach: "Global · 100+ countries",
    features: ["YouTube Content ID", "Art Tracks", "Official Music Videos", "YouTube Shorts", "Super Thanks"],
    strategy: "Content ID captures all user-uploaded covers and remixes — passive royalty stream. YouTube Shorts drives viral discovery. Art tracks auto-created.",
    tier: "TIER 1",
    tierColor: "#FF0000",
  },
  {
    id: "tidal",
    name: "TIDAL",
    logo: "🌊",
    color: "#00D4FF",
    streams: "3M+ subscribers",
    royalty: "$0.012–$0.015/stream",
    payout: "Monthly",
    reach: "56 countries",
    features: ["HiFi Lossless Audio", "Artist-Centric Model", "TIDAL Rising", "Direct Fan Support", "MQA Masters"],
    strategy: "Highest royalty rate per stream. Artist-owned model means more control. HiFi listeners are premium, engaged audience. Perfect for audiophile releases.",
    tier: "TIER 1",
    tierColor: "#00D4FF",
  },
  {
    id: "amazon",
    name: "Amazon Music",
    logo: "📦",
    color: "#FF9900",
    streams: "55M+ subscribers",
    royalty: "$0.004–$0.01/stream",
    payout: "Monthly",
    reach: "Global · 45+ countries",
    features: ["Alexa Integration", "Prime Music", "HD/Ultra HD Audio", "Amazon Originals", "Artist Notifier"],
    strategy: "Alexa voice search drives passive discovery. Prime Music bundled with 200M+ Prime members. HD audio tier growing rapidly.",
    tier: "TIER 1",
    tierColor: "#FF9900",
  },
  {
    id: "deezer",
    name: "Deezer",
    logo: "🎧",
    color: "#A238FF",
    streams: "16M+ subscribers",
    royalty: "$0.0064/stream",
    payout: "Monthly",
    reach: "180+ countries",
    features: ["Flow AI Radio", "Artist Dashboard", "Deezer Next", "Lyrics Display", "Podcast Integration"],
    strategy: "Strong in France, Brazil, Germany. Flow AI creates personalized radio — good for discovery. Deezer Next program promotes emerging artists.",
    tier: "TIER 2",
    tierColor: "#A238FF",
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    logo: "☁️",
    color: "#FF5500",
    streams: "175M+ users",
    royalty: "$0.0025/stream (Go+)",
    payout: "Monthly",
    reach: "Global",
    features: ["Direct Upload", "SoundCloud Go+", "Fan-Powered Royalties", "Repost Network", "Creator Tools"],
    strategy: "Fan-Powered Royalties = your fans' subscription money goes directly to you. Best platform for unsigned artists. Repost network for organic growth.",
    tier: "TIER 2",
    tierColor: "#FF5500",
  },
  {
    id: "pandora",
    name: "Pandora",
    logo: "📻",
    color: "#3668FF",
    streams: "50M+ users",
    royalty: "$0.0013/stream",
    payout: "Monthly",
    reach: "USA only",
    features: ["Music Genome Project", "Pandora AMP", "Artist Audio Messages", "Sponsored Listening", "Podcast Network"],
    strategy: "USA-focused but massive. AMP (Artist Marketing Platform) lets you record audio messages to fans. Music Genome creates deep discovery.",
    tier: "TIER 2",
    tierColor: "#3668FF",
  },
  {
    id: "boomplay",
    name: "Boomplay",
    logo: "🌍",
    color: "#00FF88",
    streams: "94M+ users",
    royalty: "$0.001–$0.003/stream",
    payout: "Monthly",
    reach: "Africa · 10 countries",
    features: ["Africa-First", "Afrobeats Focus", "Video Downloads", "Live Streaming", "Ringtone Sales"],
    strategy: "Dominant in Nigeria, Ghana, Kenya, Tanzania. Essential for African market penetration. Afrobeats, Afrofusion, Amapiano — perfect for ScrollVerse frequency.",
    tier: "TIER 2",
    tierColor: "#00FF88",
  },
  {
    id: "anghami",
    name: "Anghami",
    logo: "🌙",
    color: "#8B5CF6",
    streams: "70M+ users",
    royalty: "$0.001–$0.004/stream",
    payout: "Monthly",
    reach: "MENA · 22 countries",
    features: ["Arabic Content Focus", "MENA Market Leader", "Offline Downloads", "Artist Portal", "Podcast Hub"],
    strategy: "Dominant in Middle East & North Africa. Essential for Arabic-language content and Islamic music. Perfect for ScrollVerse's 99 Names and sacred frequency catalog.",
    tier: "TIER 2",
    tierColor: "#8B5CF6",
  },
  {
    id: "audiomack",
    name: "Audiomack",
    logo: "🎤",
    color: "#FFA500",
    streams: "30M+ users",
    royalty: "$0.0025/stream",
    payout: "Monthly",
    reach: "Global · Hip-Hop/R&B focus",
    features: ["Free Streaming", "Trending Charts", "Audiomack Verified", "Mixtape Distribution", "Artist Spotlight"],
    strategy: "Free streaming model drives massive play counts. Strong in Hip-Hop, R&B, Afrobeats. Trending charts drive organic discovery. Mixtape-friendly.",
    tier: "TIER 3",
    tierColor: "#FFA500",
  },
  {
    id: "beatport",
    name: "Beatport",
    logo: "🎛️",
    color: "#00D4FF",
    streams: "Electronic only",
    royalty: "$0.50–$1.50/download",
    payout: "Monthly",
    reach: "Global · Electronic/Dance",
    features: ["DJ Charts", "Beatport Link", "Stems Downloads", "Label Portal", "Sync Licensing"],
    strategy: "Electronic music only. DJ charts drive credibility. Stems downloads allow DJs to remix — viral potential. Sync licensing for film/TV.",
    tier: "TIER 3",
    tierColor: "#00D4FF",
  },
];

const COVER_ART_PACKAGES = [
  {
    name: "Sovereign Single Cover",
    price: 44,
    description: "1 single cover art — Afrofuturism × Quantum Digital aesthetic. 3000×3000px, DSP-ready.",
    includes: ["3000×3000px JPEG/PNG", "1444Hz frequency watermark", "Ankh/sacred geometry overlay", "Color-graded to your brand palette", "Social media crop variants (1:1, 4:5, 9:16)"],
    color: GOLD,
    icon: "🎨",
  },
  {
    name: "EP/Album Bundle",
    price: 144,
    description: "Full EP or album visual identity — cover, back cover, tray card, and all social variants.",
    includes: ["Front + back cover 3000×3000px", "Tray card / booklet layout", "5 social media variants", "Animated cover loop (MP4)", "Press kit PDF"],
    color: CYAN,
    icon: "📀",
  },
  {
    name: "Sovereign Visual Identity",
    price: 444,
    description: "Complete artist visual identity — logo, cover art system, merch templates, social kit.",
    includes: ["Artist logo (SVG + PNG)", "3 cover art templates", "Merch mockup designs (5 items)", "Social media kit (20 templates)", "EPK (Electronic Press Kit)"],
    color: PURPLE,
    icon: "👑",
  },
];

const PUBLISHING_SERVICES = [
  { name: "PRO Registration", description: "Register your works with ASCAP, BMI, or SESAC for performance royalties", icon: "📋", color: GREEN },
  { name: "Mechanical Licensing", description: "License your compositions for covers, samples, and sync", icon: "⚙️", color: GOLD },
  { name: "Sync Licensing", description: "Place your music in film, TV, ads, and games", icon: "🎬", color: CYAN },
  { name: "Royalty Splits", description: "Set up transparent splits for collaborators via smart contracts", icon: "🔀", color: PURPLE },
  { name: "Copyright Registration", description: "Register your masters and compositions with the US Copyright Office", icon: "©️", color: PINK },
  { name: "Label Services", description: "Set up your own imprint label under ScrollVerse Records", icon: "🏷️", color: GOLD },
];

// ── Sovereign Inflow Notification ─────────────────────────────────────────────
function DSPCard({ dsp, onDistribute }: { dsp: typeof DSPS[0]; onDistribute: (dsp: typeof DSPS[0]) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${dsp.color}30` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{dsp.logo}</div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-lg">{dsp.name}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${dsp.tierColor}20`, color: dsp.tierColor, border: `1px solid ${dsp.tierColor}40` }}>
                  {dsp.tier}
                </span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>{dsp.reach}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono font-bold" style={{ color: dsp.color }}>{dsp.royalty}</div>
            <div className="text-xs" style={{ color: "#8899AA" }}>{dsp.payout}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <div className="text-xs" style={{ color: "#8899AA" }}>
            <span style={{ color: dsp.color }}>◉</span> {dsp.streams}
          </div>
        </div>

        {expanded && (
          <div className="mt-4 space-y-3">
            <div>
              <div className="text-xs font-mono mb-2" style={{ color: dsp.color }}>PLATFORM FEATURES</div>
              <div className="flex flex-wrap gap-2">
                {dsp.features.map(f => (
                  <span key={f} className="text-xs px-2 py-1 rounded" style={{ background: `${dsp.color}10`, color: dsp.color, border: `1px solid ${dsp.color}30` }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>SOVEREIGN STRATEGY</div>
              <p className="text-sm leading-relaxed" style={{ color: "#AABBCC" }}>{dsp.strategy}</p>
            </div>
            <button
              className="w-full py-2.5 rounded-lg font-bold text-sm transition-all duration-200 hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${dsp.color}, ${dsp.color}80)`, color: BG }}
              onClick={(e) => { e.stopPropagation(); onDistribute(dsp); }}
            >
              Distribute to {dsp.name} — $44/yr
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="text-xs" style={{ color: "#8899AA" }}>Tap to {expanded ? "collapse" : "expand strategy"}</div>
          <div style={{ color: dsp.color }}>{expanded ? "▲" : "▼"}</div>
        </div>
      </div>
    </div>
  );
}

export default function DSPIntelligence() {
  const { user, isAuthenticated } = useAuth();
  // Phase 45 — Sovereign Engagement Analytics
  useSovereignHeartbeat({ page: "dsp-intelligence" });
  const [activeTab, setActiveTab] = useState<"dsps" | "cover-art" | "publishing" | "royalties">("dsps");
  const [tierFilter, setTierFilter] = useState("ALL");

  const nftCheckout = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => { window.location.href = data.url; },
    onError: (err) => { toast.error(err.message || "Checkout failed"); },
  });

  const handleDistribute = (dsp: typeof DSPS[0]) => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    nftCheckout.mutate({
      nftId: `dsp-distribution-${dsp.id}-${Date.now()}`,
      nftName: `ScrollVerse × ${dsp.name} Distribution License`,
      nftDescription: `Annual distribution license to ${dsp.name}. ${dsp.reach}. ${dsp.royalty} royalty rate.`,
      priceCents: 4400,
      origin: window.location.origin,
    });
  };

  const handleCoverArt = (pkg: typeof COVER_ART_PACKAGES[0]) => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    nftCheckout.mutate({
      nftId: `cover-art-${pkg.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      nftName: `ScrollVerse Cover Art: ${pkg.name}`,
      nftDescription: pkg.description,
      priceCents: (typeof pkg.price === "number" ? pkg.price * 100 : 4400),
      origin: window.location.origin,
    });
  };

  const filteredDSPs = tierFilter === "ALL" ? DSPS : DSPS.filter(d => d.tier === tierFilter);

  const tabs = [
    { id: "dsps", label: "DSP Intelligence", icon: "🎵" },
    { id: "cover-art", label: "Cover Art Studio", icon: "🎨" },
    { id: "publishing", label: "Publishing Rights", icon: "©️" },
    { id: "royalties", label: "Royalty Calculator", icon: "💰" },
  ] as const;

  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(3,8,16,0.95)", backdropFilter: "blur(20px)", borderColor: `${GOLD}20` }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: `linear-gradient(135deg, ${GOLD}, ${CYAN})`, color: BG }}>SV</div>
              <span className="font-bold text-white">ScrollVerse</span>
            </div>
          </Link>
          <div className="text-sm font-mono" style={{ color: GOLD }}>DSP INTELLIGENCE</div>
          <Link href="/revenue">
            <button className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }}>
              Revenue Dashboard
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 0%, ${GOLD}08 0%, transparent 70%)` }} />
        <div className="container relative z-10 text-center">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: GOLD }}>SCROLLVERSE MUSIC EMPIRE</div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            DSP<br />
            <span style={{ color: GOLD }}>INTELLIGENCE</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: "#AABBCC" }}>
            Every major platform studied. Every royalty stream maximized. Every market penetrated. Your music earns on all 12 DSPs simultaneously.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { label: "12 DSPs", sub: "Simultaneous Distribution" },
              { label: "600M+", sub: "Combined Listeners" },
              { label: "$0.015", sub: "Max Per Stream (TIDAL)" },
              { label: "184", sub: "Countries Reached" },
            ].map(stat => (
              <div key={stat.label} className="px-6 py-3 rounded-xl text-center" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30` }}>
                <div className="text-2xl font-black" style={{ color: GOLD, fontFamily: "'Space Mono', monospace" }}>{stat.label}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="sticky top-16 z-40 border-b" style={{ background: "rgba(3,8,16,0.95)", backdropFilter: "blur(20px)", borderColor: `${GOLD}20` }}>
        <div className="container flex gap-1 py-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={activeTab === tab.id
                ? { background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }
                : { color: "#8899AA", border: "1px solid transparent" }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container py-12">

        {/* ── DSP INTELLIGENCE TAB ── */}
        {activeTab === "dsps" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-white">All 12 DSPs Analyzed</h2>
              <div className="flex gap-2">
                {["ALL", "TIER 1", "TIER 2", "TIER 3"].map(t => (
                  <button
                    key={t}
                    onClick={() => setTierFilter(t)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                    style={tierFilter === t
                      ? { background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }
                      : { color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {filteredDSPs.map(dsp => (
                <DSPCard key={dsp.id} dsp={dsp} onDistribute={handleDistribute} />
              ))}
            </div>

            {/* All-DSP Bundle */}
            <div className="rounded-2xl p-8 text-center" style={{ background: `linear-gradient(135deg, ${GOLD}10, ${CYAN}05)`, border: `1px solid ${GOLD}30` }}>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: GOLD }}>SOVEREIGN BUNDLE</div>
              <h3 className="text-3xl font-black text-white mb-3">Distribute to All 12 DSPs</h3>
              <p className="mb-6" style={{ color: "#AABBCC" }}>One release. Every platform. 600M+ listeners. Maximum royalty capture across every market simultaneously.</p>
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-black" style={{ color: GOLD }}>$144</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>per year</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black" style={{ color: CYAN }}>12</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black" style={{ color: GREEN }}>∞</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>royalty streams</div>
                </div>
              </div>
              <button
                className="px-12 py-4 rounded-xl font-black text-lg transition-all duration-200 hover:scale-105 disabled:opacity-60"
                style={{ background: `linear-gradient(135deg, ${GOLD}, #FF6B35)`, color: BG }}
                disabled={nftCheckout.isPending}
                onClick={() => {
                  if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
                  nftCheckout.mutate({
                    nftId: `dsp-all-bundle-${Date.now()}`,
                    nftName: "ScrollVerse All-DSP Distribution Bundle",
                    nftDescription: "Annual distribution license to all 12 major DSPs. 600M+ combined listeners. 184 countries.",
                    priceCents: 14400,
                    origin: window.location.origin,
                  });
                }}
              >
                {nftCheckout.isPending ? "Opening Checkout..." : "🎵 Distribute to All 12 DSPs — $144/yr"}
              </button>
            </div>
          </div>
        )}

        {/* ── COVER ART STUDIO TAB ── */}
        {activeTab === "cover-art" && (
          <div>
            <div className="text-center mb-12">
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: GOLD }}>SOVEREIGN VISUAL IDENTITY</div>
              <h2 className="text-4xl font-black text-white mb-4">Cover Art Studio</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#AABBCC" }}>
                Afrofuturism × Quantum Digital aesthetic. Every cover art is a sovereign artifact — DSP-ready, social-ready, and frequency-encoded.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {COVER_ART_PACKAGES.map(pkg => (
                <div key={pkg.name} className="rounded-2xl p-6" style={{ background: `${pkg.color}08`, border: `1px solid ${pkg.color}30` }}>
                  <div className="text-4xl mb-4">{pkg.icon}</div>
                  <h3 className="text-xl font-black text-white mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-black mb-3" style={{ color: pkg.color, fontFamily: "'Space Mono', monospace" }}>${pkg.price}</div>
                  <p className="text-sm mb-4" style={{ color: "#AABBCC" }}>{pkg.description}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.includes.map(item => (
                      <li key={item} className="text-sm flex items-start gap-2" style={{ color: "#8899AA" }}>
                        <span style={{ color: pkg.color }}>›</span> {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}80)`, color: BG }}
                    disabled={nftCheckout.isPending}
                    onClick={() => handleCoverArt(pkg)}
                  >
                    {nftCheckout.isPending ? "..." : `Order ${pkg.name} — $${pkg.price}`}
                  </button>
                </div>
              ))}
            </div>

            {/* CapCut + Visual Apps */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${CYAN}30` }}>
              <h3 className="text-2xl font-black text-white mb-6">Visual Creation Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "CapCut", use: "Short-form video editing, trending effects, auto-captions", icon: "✂️", color: "#000000" },
                  { name: "Adobe Express", use: "Quick cover art, social graphics, brand templates", icon: "🎨", color: "#FF0000" },
                  { name: "Canva Pro", use: "EPK design, press kits, social media kits", icon: "🖌️", color: "#00C4CC" },
                  { name: "DALL-E / Midjourney", use: "AI-generated album art, concept visuals", icon: "🤖", color: PURPLE },
                  { name: "After Effects", use: "Animated cover art, Canvas loops for Spotify", icon: "🎬", color: "#9999FF" },
                  { name: "Figma", use: "Brand system, UI mockups, merch designs", icon: "🔷", color: "#F24E1E" },
                  { name: "Photoshop", use: "Professional photo editing, composite artwork", icon: "🖼️", color: "#31A8FF" },
                  { name: "Premiere Pro", use: "Music video editing, lyric videos, visualizers", icon: "🎞️", color: "#9999FF" },
                ].map(tool => (
                  <div key={tool.name} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <div className="font-bold text-white text-sm mb-1">{tool.name}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{tool.use}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PUBLISHING RIGHTS TAB ── */}
        {activeTab === "publishing" && (
          <div>
            <div className="text-center mb-12">
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: GREEN }}>SOVEREIGN PUBLISHING</div>
              <h2 className="text-4xl font-black text-white mb-4">Publishing Rights Command</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#AABBCC" }}>
                Own your masters. Own your publishing. Every royalty stream captured — performance, mechanical, sync, and digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {PUBLISHING_SERVICES.map(svc => (
                <div key={svc.name} className="rounded-xl p-6" style={{ background: `${svc.color}08`, border: `1px solid ${svc.color}30` }}>
                  <div className="text-3xl mb-3">{svc.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{svc.name}</h3>
                  <p className="text-sm" style={{ color: "#AABBCC" }}>{svc.description}</p>
                </div>
              ))}
            </div>

            {/* Royalty Types Breakdown */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${GOLD}30` }}>
              <h3 className="text-2xl font-black text-white mb-6">4 Royalty Streams You Must Capture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { type: "Performance Royalties", desc: "Paid when your music is performed publicly — radio, TV, streaming, live shows. Collected by ASCAP, BMI, SESAC.", color: GOLD, rate: "~$0.001–$0.01 per play" },
                  { type: "Mechanical Royalties", desc: "Paid when your composition is reproduced — CDs, vinyl, digital downloads, streaming. Collected by MLC (USA).", color: CYAN, rate: "9.1¢ per download" },
                  { type: "Sync Licensing", desc: "Paid when your music is licensed for film, TV, ads, games, YouTube. One-time fee + backend royalties.", color: GREEN, rate: "$500–$50,000+ per sync" },
                  { type: "Master Royalties", desc: "Paid when your recording is used — streaming, licensing, sampling. You own this if you own your masters.", color: PURPLE, rate: "50% of all streaming revenue" },
                ].map(r => (
                  <div key={r.type} className="rounded-xl p-5" style={{ background: `${r.color}08`, border: `1px solid ${r.color}30` }}>
                    <h4 className="font-bold text-white mb-2">{r.type}</h4>
                    <p className="text-sm mb-3" style={{ color: "#AABBCC" }}>{r.desc}</p>
                    <div className="text-xs font-mono" style={{ color: r.color }}>◉ {r.rate}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ROYALTY CALCULATOR TAB ── */}
        {activeTab === "royalties" && (
          <RoyaltyCalculator />
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t py-8 text-center" style={{ borderColor: `${GOLD}20` }}>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          SCROLLVERSE DSP INTELLIGENCE · ALL 12 PLATFORMS · 184 COUNTRIES · KUN FAYAKŪN × ∞
        </div>
      </footer>
    </div>
  );
}

// ── Royalty Calculator Component ──────────────────────────────────────────────
function RoyaltyCalculator() {
  const [streams, setStreams] = useState(100000);
  const [platform, setPlatform] = useState("spotify");
  const [downloads, setDownloads] = useState(1000);

  const platformRates: Record<string, number> = {
    spotify: 0.004, apple: 0.0085, "youtube-music": 0.004,
    tidal: 0.013, amazon: 0.007, deezer: 0.0064,
    soundcloud: 0.0025, pandora: 0.0013, boomplay: 0.002,
    anghami: 0.0025, audiomack: 0.0025, beatport: 0,
  };

  const rate = platformRates[platform] ?? 0.004;
  const monthly = streams * rate;
  const annual = monthly * 12;
  const fiveYear = annual * 5;

  const allPlatformsMonthly = Object.values(platformRates).reduce((sum, r) => sum + streams * r, 0);

  return (
    <div>
      <div className="text-center mb-12">
        <div className="text-xs font-mono tracking-widest mb-3" style={{ color: GOLD }}>SOVEREIGN ROYALTY PROJECTIONS</div>
        <h2 className="text-4xl font-black text-white mb-4">Royalty Calculator</h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#AABBCC" }}>
          See exactly how much your music earns across every platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Controls */}
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${GOLD}30` }}>
          <h3 className="text-xl font-bold text-white mb-6">Your Numbers</h3>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-mono mb-2 block" style={{ color: GOLD }}>Monthly Streams: {streams.toLocaleString()}</label>
              <input
                type="range" min={1000} max={10000000} step={1000}
                value={streams}
                onChange={e => setStreams(Number(e.target.value))}
                className="w-full accent-yellow-400"
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#8899AA" }}>
                <span>1K</span><span>10M</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-mono mb-2 block" style={{ color: CYAN }}>Platform</label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${CYAN}30`, color: "white" }}
              >
                {DSPS.filter(d => d.id !== "beatport").map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.royalty})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${GREEN}30` }}>
          <h3 className="text-xl font-bold text-white mb-6">Your Earnings</h3>
          <div className="space-y-4">
            {[
              { label: "Monthly", value: monthly, color: GOLD },
              { label: "Annual", value: annual, color: CYAN },
              { label: "5-Year Projection", value: fiveYear, color: GREEN },
              { label: "All 12 DSPs (Monthly)", value: allPlatformsMonthly, color: PURPLE },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${row.color}08`, border: `1px solid ${row.color}20` }}>
                <span className="text-sm" style={{ color: "#AABBCC" }}>{row.label}</span>
                <span className="text-xl font-black font-mono" style={{ color: row.color }}>
                  ${row.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-center" style={{ color: "#8899AA" }}>
            Based on {streams.toLocaleString()} monthly streams at ${rate.toFixed(4)}/stream
          </div>
        </div>
      </div>

      {/* All-Platform Comparison */}
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${GOLD}20` }}>
        <h3 className="text-xl font-bold text-white mb-4">Platform Comparison — {streams.toLocaleString()} Monthly Streams</h3>
        <div className="space-y-2">
          {DSPS.filter(d => d.id !== "beatport").sort((a, b) => (platformRates[b.id] ?? 0) - (platformRates[a.id] ?? 0)).map(dsp => {
            const earning = streams * (platformRates[dsp.id] ?? 0);
            const maxEarning = streams * 0.013;
            const pct = maxEarning > 0 ? (earning / maxEarning) * 100 : 0;
            return (
              <div key={dsp.id} className="flex items-center gap-3">
                <div className="w-28 text-xs text-right flex-shrink-0" style={{ color: "#AABBCC" }}>{dsp.name}</div>
                <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${dsp.color}, ${dsp.color}80)` }} />
                </div>
                <div className="w-20 text-xs font-mono text-right flex-shrink-0" style={{ color: dsp.color }}>
                  ${earning.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
