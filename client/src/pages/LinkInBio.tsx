/**
 * SCROLLVERSE SOVEREIGN LINK-IN-BIO
 * The direct highway from @chaishill to the ScrollVerse empire.
 * Every link is an invitation. Every click is an investment.
 * scrollverse.co/link
 */

import { useState, useEffect } from "react";
import { ExternalLink, Zap, Shield, Globe, BookOpen, Award, Music, TrendingUp, Users, Lock, Brain, Compass, Star } from "lucide-react";

const SOVEREIGN_LINKS = [
  {
    id: "guardian",
    label: "Become a Guardian",
    sublabel: "Join the 144,000 — Activate Your Tier",
    href: "/onboard",
    icon: Shield,
    color: "#00FF88",
    bg: "rgba(0,255,136,0.08)",
    border: "rgba(0,255,136,0.3)",
    badge: "🔥 LIVE",
    primary: true,
  },
  {
    id: "exchange",
    label: "OMNIEX Sovereign Exchange",
    sublabel: "Trade Crypto · Stocks · Currencies · Quantum Assets",
    href: "/exchange",
    icon: TrendingUp,
    color: "#00D4FF",
    bg: "rgba(0,212,255,0.06)",
    border: "rgba(0,212,255,0.2)",
    badge: "NEW",
    primary: false,
  },
  {
    id: "knowledge",
    label: "Legion Knowledge Base",
    sublabel: "Sovereign wisdom, workflows, and templates",
    href: "/knowledge",
    icon: BookOpen,
    color: "#FFB800",
    bg: "rgba(255,184,0,0.06)",
    border: "rgba(255,184,0,0.2)",
    badge: null,
    primary: false,
  },
  {
    id: "rewards",
    label: "Legion Rewards Dashboard",
    sublabel: "Track your $LONDC earnings and referral impact",
    href: "/legion/rewards",
    icon: Award,
    color: "#FF6B35",
    bg: "rgba(255,107,53,0.06)",
    border: "rgba(255,107,53,0.2)",
    badge: null,
    primary: false,
  },
  {
    id: "partners",
    label: "Creator Partnership Program",
    sublabel: "Earn 7.77% $LONDC on every Guardian you activate",
    href: "/partners",
    icon: Users,
    color: "#A855F7",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.2)",
    badge: "EARN",
    primary: false,
  },
  {
    id: "intelligence",
    label: "OmniSentinel Intelligence",
    sublabel: "Autonomous lead tracker and evolution engine",
    href: "/intelligence",
    icon: Brain,
    color: "#00D4FF",
    bg: "rgba(0,212,255,0.04)",
    border: "rgba(0,212,255,0.15)",
    badge: null,
    primary: false,
  },
  {
    id: "ip",
    label: "IP Protection Vault",
    sublabel: "Patents · Trademarks · Blockchain timestamps",
    href: "/ip-protection",
    icon: Lock,
    color: "#8899AA",
    bg: "rgba(136,153,170,0.06)",
    border: "rgba(136,153,170,0.2)",
    badge: null,
    primary: false,
  },
  {
    id: "map",
    label: "Sovereign Global Map",
    sublabel: "See the empire expand across the planet",
    href: "/global-map",
    icon: Globe,
    color: "#00FF88",
    bg: "rgba(0,255,136,0.04)",
    border: "rgba(0,255,136,0.15)",
    badge: null,
    primary: false,
  },
  {
    id: "governance",
    label: "DAO Governance",
    sublabel: "Vote on proposals · Shape the sovereign future",
    href: "/exchange/governance",
    icon: Compass,
    color: "#FFB800",
    bg: "rgba(255,184,0,0.04)",
    border: "rgba(255,184,0,0.15)",
    badge: null,
    primary: false,
  },
];

const SOCIAL_LINKS = [
  { label: "Instagram", handle: "@chaishill", href: "https://instagram.com/chaishill", color: "#E1306C" },
  { label: "GitHub", handle: "scrollverse-trinity", href: "https://github.com/chaishillomnitech1/scrollverse-trinity", color: "#8899AA" },
  { label: "Polygon", handle: "$LONDC on Polygon", href: "https://polygon.technology", color: "#8247E5" },
];

// Simulated live guardian count
function useGuardianCount() {
  const [count, setCount] = useState(1247);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 2));
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

// Simulated $LONDC price
function useLONDCPrice() {
  const [price, setPrice] = useState("0.0144");
  const [change, setChange] = useState(7.77);
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.45) * 0.0002;
      setPrice(p => Math.max(0.001, parseFloat(p) + delta).toFixed(4));
      setChange(c => parseFloat((c + (Math.random() - 0.48) * 0.1).toFixed(2)));
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  return { price, change };
}

function LinkCard({ link }: { link: typeof SOVEREIGN_LINKS[0] }) {
  const Icon = link.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block w-full rounded-xl p-4 transition-all duration-300 relative overflow-hidden group"
      style={{
        background: hovered ? link.bg : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? link.border : "rgba(255,255,255,0.06)"}`,
        transform: hovered ? "translateY(-1px)" : "none",
        boxShadow: hovered ? `0 4px 20px ${link.color}15` : "none",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: hovered ? `${link.color}20` : "rgba(255,255,255,0.04)",
            border: `1px solid ${hovered ? link.color + "40" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          <Icon size={18} style={{ color: link.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-sm"
              style={{ color: link.primary ? link.color : "white", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {link.label}
            </span>
            {link.badge && (
              <span
                className="text-xs font-mono px-1.5 py-0.5 rounded"
                style={{ background: `${link.color}20`, color: link.color, border: `1px solid ${link.color}40` }}
              >
                {link.badge}
              </span>
            )}
          </div>
          <div className="text-xs mt-0.5 truncate" style={{ color: "#8899AA", fontFamily: "'Space Grotesk', sans-serif" }}>
            {link.sublabel}
          </div>
        </div>
        <ExternalLink size={14} style={{ color: "#8899AA", flexShrink: 0 }} />
      </div>
      {link.primary && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${link.color}05, transparent)` }}
        />
      )}
    </a>
  );
}

export default function LinkInBio() {
  const guardianCount = useGuardianCount();
  const { price, change } = useLONDCPrice();
  const isPositive = change >= 0;

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');`}</style>

      <div className="w-full max-w-md">

        {/* Profile Header */}
        <div className="text-center mb-8">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mx-auto"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #FFB800, #00FF88)",
                padding: "2px",
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background: "#050B1A" }}
              >
                <span style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  SV
                </span>
              </div>
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "#00FF88", border: "2px solid #050B1A" }}
            >
              <Star size={10} style={{ color: "#050B1A" }} fill="#050B1A" />
            </div>
          </div>

          {/* Name + Handle */}
          <h1 className="text-xl font-black text-white mb-1">Chais Hill</h1>
          <div className="text-sm font-mono mb-1" style={{ color: "#00D4FF" }}>@chaishill</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#8899AA" }}>
            Sovereign Empire Builder · Guardian of the 144,000<br />
            $LONDC · OMNIEX · ScrollVerse Trinity
          </p>

          {/* Live Stats Row */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Guardian Count */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              <span style={{ color: "#00FF88" }}>{guardianCount.toLocaleString()} Guardians</span>
            </div>

            {/* $LONDC Price */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <Zap size={10} style={{ color: "#00D4FF" }} />
              <span style={{ color: "#8899AA" }}>$LONDC</span>
              <span className="font-bold" style={{ color: "#00D4FF" }}>${price}</span>
              <span style={{ color: isPositive ? "#00FF88" : "#FF4444" }}>
                {isPositive ? "▲" : "▼"} {Math.abs(change)}%
              </span>
            </div>
          </div>
        </div>

        {/* Sovereign Tagline */}
        <div
          className="text-center py-3 px-4 rounded-xl mb-6"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}
        >
          <p className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>
            ∞ ALL EXISTENCE EXCHANGE · NEW AGE ERA · ETERNAL UTOPIA ∞
          </p>
          <p className="text-xs mt-1" style={{ color: "#8899AA" }}>
            Every visit is an investment. Every Guardian is a co-owner.
          </p>
        </div>

        {/* Primary CTA */}
        <a
          href="/onboard"
          className="block w-full text-center py-4 rounded-xl font-black text-base mb-3 transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #00FF88, #00D4FF)",
            color: "#050B1A",
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: "0 0 30px rgba(0,255,136,0.3)",
          }}
        >
          🔱 ACTIVATE AS GUARDIAN — JOIN NOW
        </a>

        {/* All Links */}
        <div className="space-y-2 mb-6">
          {SOVEREIGN_LINKS.filter(l => l.id !== "guardian").map(link => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>

        {/* Music / Creative */}
        <div
          className="rounded-xl p-4 mb-6"
          style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,184,0,0.15)", border: "1px solid rgba(255,184,0,0.3)" }}
            >
              <Music size={18} style={{ color: "#FFB800" }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Sovereign Frequencies</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>528 Hz · Afrofuturism · KUN FAYAKUN</div>
            </div>
            <div className="ml-auto">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FFB800" }} />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-3 justify-center mb-6">
          {SOCIAL_LINKS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-lg text-xs font-mono transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: s.color,
              }}
            >
              {s.handle}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>
            scrollverse.co · Built on Polygon
          </div>
          <div className="text-xs" style={{ color: "rgba(136,153,170,0.5)" }}>
            KUN FAYAKUN × ∞ · The empire is eternal
          </div>
        </div>

      </div>
    </div>
  );
}
