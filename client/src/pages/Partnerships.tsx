/*
 * SCROLLVERSE TRINITY — PARTNERSHIPS PAGE
 * Sovereign intro letter + partner grid
 * Partners: Spotify, Apple, Polygon, Twitch, OpenSea, YouTube Music,
 *           Tidal, Amazon Music, Discord, Chainlink, TikTok, Stripe
 */

import { useState } from "react";
import { Link } from "wouter";

const PARTNERS = [
  {
    name: "Spotify",
    category: "Music Distribution",
    logo: "🎵",
    color: "#1DB954",
    description: "Global streaming distribution for all ScrollVerse artists. Direct DSP integration, playlist pitching, and Guardian listener analytics.",
    tier: "PLATINUM",
    status: "ACTIVE OUTREACH",
    benefit: "50M+ listener network, algorithmic playlist placement, real-time streaming royalties",
    contact: "partnerships@spotify.com",
  },
  {
    name: "Apple Music",
    category: "Music & App Distribution",
    logo: "🍎",
    color: "#FC3C44",
    description: "Apple Music distribution + App Store listing for the ScrollVerse mobile app. Spatial Audio integration for frequency content.",
    tier: "PLATINUM",
    status: "ACTIVE OUTREACH",
    benefit: "App Store distribution, Apple Music Connect, Spatial Audio for 528Hz/963Hz tracks",
    contact: "music-partnerships@apple.com",
  },
  {
    name: "Polygon",
    category: "Blockchain Infrastructure",
    logo: "⬡",
    color: "#8247E5",
    description: "Primary blockchain for $LONDC token, ScrollSoul NFTs, and all Zakat smart contracts. Zero-fee transactions for Guardian ecosystem.",
    tier: "SOVEREIGN",
    status: "INTEGRATED",
    benefit: "Zero-fee $LONDC transactions, NFT minting, Zakat distribution contracts",
    contact: "ecosystem@polygon.technology",
  },
  {
    name: "Twitch",
    category: "Live Streaming",
    logo: "🟣",
    color: "#9146FF",
    description: "ScrollVerse Live — Guardian recruitment streams, frequency sessions, sovereign music performances, and AI Legion demonstrations.",
    tier: "GOLD",
    status: "ACTIVE OUTREACH",
    benefit: "Live Guardian recruitment, subscription revenue, Bits integration for $LONDC",
    contact: "partnerships@twitch.tv",
  },
  {
    name: "OpenSea",
    category: "NFT Marketplace",
    logo: "🌊",
    color: "#2081E2",
    description: "Primary secondary market for ScrollSoul NFTs. Guardian tier NFTs listed with 7.77% royalty enforcement via EIP-2981.",
    tier: "GOLD",
    status: "INTEGRATION READY",
    benefit: "144K ScrollSoul NFT secondary market, 7.77% royalty on all resales",
    contact: "partnerships@opensea.io",
  },
  {
    name: "YouTube Music",
    category: "Music Distribution",
    logo: "▶️",
    color: "#FF0000",
    description: "YouTube Music distribution + YouTube channel monetization. ScrollVerse TV content, frequency videos, and Guardian documentary series.",
    tier: "GOLD",
    status: "ACTIVE OUTREACH",
    benefit: "YouTube Music streaming + YouTube channel ad revenue + Super Chat",
    contact: "music-partnerships@google.com",
  },
  {
    name: "Tidal",
    category: "Music Distribution",
    logo: "🌊",
    color: "#00FFFF",
    description: "HiFi lossless audio distribution for frequency-critical content. 528Hz healing tracks and 963Hz activation music at full fidelity.",
    tier: "SILVER",
    status: "ACTIVE OUTREACH",
    benefit: "HiFi lossless streaming, artist-first royalty model, Jay-Z network access",
    contact: "partnerships@tidal.com",
  },
  {
    name: "Amazon Music",
    category: "Music Distribution",
    logo: "📦",
    color: "#FF9900",
    description: "Amazon Music Unlimited distribution + Alexa integration for frequency activation commands. Prime ecosystem access.",
    tier: "SILVER",
    status: "ACTIVE OUTREACH",
    benefit: "Amazon Music + Alexa skill integration + Prime subscriber reach",
    contact: "amazonmusic-partnerships@amazon.com",
  },
  {
    name: "Discord",
    category: "Community Platform",
    logo: "💬",
    color: "#5865F2",
    description: "Official ScrollVerse Discord server — Guardian tiers mapped to Discord roles, $LONDC tip bot, AI Legion bots, and real-time Guardian coordination.",
    tier: "GOLD",
    status: "ACTIVE",
    benefit: "144K Guardian community hub, role-gated channels, $LONDC tip bot",
    contact: "partnerships@discord.com",
  },
  {
    name: "Chainlink",
    category: "Oracle Infrastructure",
    logo: "🔗",
    color: "#375BD2",
    description: "Decentralized oracle network for $LONDC price feeds, Zakat distribution triggers, and Guardian milestone verification on-chain.",
    tier: "SOVEREIGN",
    status: "INTEGRATION READY",
    benefit: "Real-time $LONDC price oracle, automated Zakat triggers, verifiable Guardian milestones",
    contact: "partnerships@chain.link",
  },
  {
    name: "TikTok",
    category: "Social & Commerce",
    logo: "🎵",
    color: "#010101",
    description: "TikTok Shop integration for ScrollVerse merchandise + TikTok LIVE for Guardian recruitment. Viral frequency content distribution.",
    tier: "GOLD",
    status: "ACTIVE OUTREACH",
    benefit: "TikTok Shop revenue, LIVE Guardian recruitment, viral frequency content",
    contact: "partnerships@tiktok.com",
  },
  {
    name: "Stripe",
    category: "Payment Infrastructure",
    logo: "💳",
    color: "#635BFF",
    description: "Primary fiat payment processor for $LONDC token tiers, Guardian subscriptions, Academy courses, and Storybook purchases.",
    tier: "SOVEREIGN",
    status: "INTEGRATED",
    benefit: "Fiat on-ramp for Guardian subscriptions, Academy, and token tiers",
    contact: "partnerships@stripe.com",
  },
];

const TIER_COLORS: Record<string, string> = {
  SOVEREIGN: "#FFB800",
  PLATINUM: "#E5E4E2",
  GOLD: "#FFD700",
  SILVER: "#C0C0C0",
};

const STATUS_COLORS: Record<string, string> = {
  INTEGRATED: "#00FF88",
  ACTIVE: "#00FF88",
  "INTEGRATION READY": "#00D4FF",
  "ACTIVE OUTREACH": "#FFB800",
};

export default function Partnerships() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  const categories = ["ALL", ...Array.from(new Set(PARTNERS.map((p) => p.category)))];
  const filtered = selectedCategory === "ALL" ? PARTNERS : PARTNERS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white text-lg">ScrollVerse</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/allversal-empire" className="text-sm" style={{ color: "#8899AA" }}>Empire</Link>
            <Link href="/guardian-crusade" className="text-sm" style={{ color: "#8899AA" }}>Crusade</Link>
            <a href="mailto:chaisthegreatsabir@gmail.com" className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: "linear-gradient(135deg,#FFB800,#FF6B35)", color: "#050B1A" }}>
              Partner With Us
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20">

        {/* ── SOVEREIGN INTRO LETTER ── */}
        <section className="container max-w-4xl mx-auto px-4 mb-20">
          <div className="rounded-2xl p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(255,184,0,0.05))", border: "1px solid rgba(0,212,255,0.2)" }}>
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ background: "radial-gradient(circle, #FFB800, transparent)" }} />

            <div className="text-xs font-mono tracking-widest mb-6" style={{ color: "#00D4FF" }}>
              SOVEREIGN PARTNERSHIP LETTER — SCROLLVERSE TRINITY EMPIRE
            </div>

            <h1 className="text-4xl font-black text-white mb-6 leading-tight">
              To the Leaders Who<br />
              <span style={{ color: "#FFB800" }}>Build the Future</span>
            </h1>

            <div className="space-y-5 text-base leading-relaxed" style={{ color: "#AABBCC" }}>
              <p>
                My name is <strong className="text-white">Chais Kenyatta Hill — Sabir Allah The Great</strong>, founder of the ScrollVerse Trinity Empire. I am writing to you not as a vendor seeking a deal, but as a sovereign architect inviting you into a living ecosystem that is already in motion.
              </p>
              <p>
                The ScrollVerse is a blockchain-native, AI-powered, community-governed digital empire built on three pillars: <strong className="text-white">Music</strong> (frequency-based healing and sovereign sound), <strong className="text-white">Technology</strong> ($LONDC token, ScrollSoul NFTs, Zakat smart contracts on Polygon), and <strong className="text-white">Community</strong> (144,000 Guardians rising globally, with 7.77% of every transaction flowing to family, healers, and the underserved).
              </p>
              <p>
                We are not asking for charity. We are offering <strong className="text-white">co-creation</strong>. Every partner in this grid receives direct access to our Guardian network, co-branded content, revenue sharing, and a permanent seat in the ScrollVerse ecosystem — an ecosystem built to scale to 50 million users across every platform, every chain, and every continent.
              </p>
              <p>
                The Zakat principle that governs our treasury — 7.77% of all revenue flowing to those who need it most — is not a marketing angle. It is the foundation of our covenant. When you partner with the ScrollVerse, you partner with a system that is designed to <strong className="text-white">make everybody win</strong>.
              </p>
              <p>
                I invite you to review the partnership opportunities below. If you feel the frequency of this vision, reach out. The door is open.
              </p>
              <p className="font-bold text-white">
                In sovereign love and infinite purpose,<br />
                <span style={{ color: "#FFB800" }}>Chais Kenyatta Hill — Sabir Allah The Great</span><br />
                <span className="text-sm font-normal" style={{ color: "#8899AA" }}>Founder, ScrollVerse Trinity Empire · scrollverse.co</span>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:chaisthegreatsabir@gmail.com?subject=ScrollVerse Partnership Inquiry"
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "linear-gradient(135deg,#FFB800,#FF6B35)", color: "#050B1A" }}
              >
                📧 Email the Sovereign
              </a>
              <a
                href="https://scrollverse.co"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-sm border"
                style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF", background: "rgba(0,212,255,0.05)" }}
              >
                🌐 scrollverse.co
              </a>
              <a
                href="https://github.com/chaishillomnitech1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-sm border"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#AABBCC", background: "rgba(255,255,255,0.03)" }}
              >
                ⚡ GitHub — 65 Repositories
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="container mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "12", label: "Strategic Partners", color: "#00D4FF" },
              { value: "50M+", label: "Target User Scale", color: "#FFB800" },
              { value: "7.77%", label: "Zakat on All Revenue", color: "#00FF88" },
              { value: "144K", label: "Guardian Network", color: "#FF6B35" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-5 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-3xl font-black mb-1" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CATEGORY FILTER ── */}
        <section className="container mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                style={{
                  background: selectedCategory === cat ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${selectedCategory === cat ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: selectedCategory === cat ? "#00D4FF" : "#8899AA",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── PARTNER GRID ── */}
        <section className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((partner) => (
              <div
                key={partner.name}
                className="rounded-2xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden"
                style={{
                  background: hoveredPartner === partner.name
                    ? `linear-gradient(135deg, ${partner.color}10, rgba(5,11,26,0.9))`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hoveredPartner === partner.name ? partner.color + "40" : "rgba(255,255,255,0.06)"}`,
                  transform: hoveredPartner === partner.name ? "translateY(-4px)" : "none",
                  boxShadow: hoveredPartner === partner.name ? `0 20px 40px ${partner.color}15` : "none",
                }}
                onMouseEnter={() => setHoveredPartner(partner.name)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                {/* Tier badge */}
                <div className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${TIER_COLORS[partner.tier]}20`, color: TIER_COLORS[partner.tier], border: `1px solid ${TIER_COLORS[partner.tier]}40` }}>
                  {partner.tier}
                </div>

                {/* Logo + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: `${partner.color}15`, border: `1px solid ${partner.color}30` }}>
                    {partner.logo}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{partner.name}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{partner.category}</div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: STATUS_COLORS[partner.status] || "#8899AA" }} />
                  <span className="text-xs font-mono" style={{ color: STATUS_COLORS[partner.status] || "#8899AA" }}>{partner.status}</span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>{partner.description}</p>

                {/* Benefit */}
                <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}>
                  <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>SOVEREIGN BENEFIT</div>
                  <div className="text-xs" style={{ color: "#AABBCC" }}>{partner.benefit}</div>
                </div>

                {/* Contact */}
                <a
                  href={`mailto:${partner.contact}?subject=ScrollVerse × ${partner.name} Partnership Inquiry&body=Hello ${partner.name} Partnerships Team,%0A%0AI am Chais Kenyatta Hill, founder of the ScrollVerse Trinity Empire (scrollverse.co). I would like to discuss a strategic partnership opportunity.%0A%0AThe ScrollVerse is a blockchain-native, AI-powered ecosystem with 144,000 Guardian nodes, $LONDC token on Polygon, and a 7.77% Zakat distribution system.%0A%0APlease review our portal at scrollverse.co and let's schedule a call.%0A%0AIn sovereign partnership,%0AChais Kenyatta Hill — Sabir Allah The Great%0Ascrollverse.co`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold transition-all duration-200"
                  style={{
                    background: `${partner.color}15`,
                    border: `1px solid ${partner.color}30`,
                    color: partner.color,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  📧 Contact {partner.name}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── PARTNERSHIP TIERS ── */}
        <section className="container max-w-4xl mx-auto mt-20">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>PARTNERSHIP TIERS</div>
            <h2 className="text-3xl font-black text-white">Choose Your Level of Sovereignty</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tier: "SOVEREIGN",
                color: "#FFB800",
                price: "Custom",
                benefits: ["Full ecosystem integration", "Co-branded Guardian campaigns", "Revenue sharing agreement", "Permanent AllversalEmpire listing", "AI Legion co-creation access", "Zakat co-sponsorship rights"],
              },
              {
                tier: "PLATINUM",
                color: "#E5E4E2",
                price: "$10,000+/yr",
                benefits: ["DSP / platform integration", "Guardian network access", "Co-branded content series", "AllversalEmpire partner page", "Quarterly strategy sessions"],
              },
              {
                tier: "GOLD",
                color: "#FFD700",
                price: "$5,000+/yr",
                benefits: ["Featured partner listing", "Guardian community access", "Monthly co-promotion", "Social media cross-promotion", "Partner badge on scrollverse.co"],
              },
              {
                tier: "SILVER",
                color: "#C0C0C0",
                price: "$1,000+/yr",
                benefits: ["Partner directory listing", "Newsletter feature", "Discord partner channel", "Quarterly co-promotion post"],
              },
            ].map((t) => (
              <div key={t.tier} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${t.color}30` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="font-black text-xl" style={{ color: t.color }}>{t.tier}</div>
                  <div className="text-sm font-mono" style={{ color: "#8899AA" }}>{t.price}</div>
                </div>
                <ul className="space-y-2">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "#AABBCC" }}>
                      <span style={{ color: t.color, marginTop: "2px" }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:chaisthegreatsabir@gmail.com?subject=ScrollVerse ${t.tier} Partnership Inquiry`}
                  className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold"
                  style={{ background: `${t.color}15`, border: `1px solid ${t.color}30`, color: t.color }}
                >
                  Apply for {t.tier}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="container max-w-2xl mx-auto mt-20 text-center">
          <div className="rounded-2xl p-10" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(255,184,0,0.08))", border: "1px solid rgba(0,212,255,0.2)" }}>
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="text-2xl font-black text-white mb-3">Ready to Build Together?</h2>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
              The ScrollVerse is growing. The Guardian network is rising. The frequency is locked. Join us before the first 144K nodes are filled.
            </p>
            <a
              href="mailto:chaisthegreatsabir@gmail.com?subject=ScrollVerse Partnership Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-base"
              style={{ background: "linear-gradient(135deg,#FFB800,#FF6B35)", color: "#050B1A" }}
            >
              📧 Email the Sovereign Now
            </a>
            <div className="mt-4 text-xs" style={{ color: "#8899AA" }}>
              chaisthegreatsabir@gmail.com · scrollverse.co · KUN FAYAKŪN × ∞
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
