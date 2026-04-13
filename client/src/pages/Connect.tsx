/**
 * SCROLLVERSE CONNECT — Sovereign Social Hub
 * All channels, all platforms, direct to the source
 * Chais The Great · XLVIIIblocks · Omnitech1
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const SOCIAL_LINKS = [
  {
    category: "MUSIC",
    color: "#1DB954",
    links: [
      { name: "Spotify — Chais The Great", url: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr?si=StI0AHIuSg-IePYoVsYhfA", icon: "🎧", desc: "Full catalog — stream and invest" },
      { name: "Vydia Distribution", url: "https://dashboard.vydia.com/d2/files/audio/albums", icon: "📀", desc: "Official distribution dashboard" },
      { name: "Throwing Stones", url: "https://vyd.co/ChaisTheGreatThrowingStones", icon: "🎵", desc: "CHAIS X — latest release" },
      { name: "Ghetto Gospel", url: "https://vyd.co/ChaisTheGreatGhettoGospel", icon: "🎵", desc: "Sovereign frequency track" },
      { name: "No Recipe", url: "https://vyd.co/NoRecipe", icon: "🎵", desc: "Pure authentic flow" },
      { name: "Walk It Talk It", url: "https://vyd.co/WalkItTalkIt", icon: "🎵", desc: "Living proof" },
      { name: "Bama", url: "https://vyd.co/Bama", icon: "🎵", desc: "Roots and legacy" },
      { name: "PNB Vibez", url: "https://vyd.co/PnbRockVibes", icon: "🎵", desc: "Tribute frequency" },
    ],
  },
  {
    category: "SOCIAL",
    color: "#E1306C",
    links: [
      { name: "Instagram — @chaisthegreat_mrwalk", url: "https://www.instagram.com/chaisthegreat_mrwalk?igsh=MTB6cnhxbzRnNnZtMw%3D%3D&utm_source=qr", icon: "📸", desc: "Daily sovereign content" },
      { name: "Facebook — Chais The Great", url: "https://www.facebook.com/share/17muPs8T9G/?mibextid=wwXIfr", icon: "👥", desc: "Community and updates" },
      { name: "Facebook — XLVIIIblocks", url: "https://www.facebook.com/share/1Gyxq1ddF3/?mibextid=wwXIfr", icon: "🏛️", desc: "XLVIIIblocks Tech official" },
      { name: "Sora — Omnitech1", url: "https://sora.chatgpt.com/profile/omnit1", icon: "🎬", desc: "AI video content — Omnitech1" },
    ],
  },
  {
    category: "TECH & VISION",
    color: "#00D4FF",
    links: [
      { name: "GitHub — chaishillomnitech1", url: "https://github.com/chaishillomnitech1/scrollverse-trinity", icon: "💻", desc: "ScrollVerse Trinity — open source sovereign code" },
      { name: "Gamma — Sovereign System", url: "https://manus.im/share/qb5dt8DV4xE84uYWeuRK52", icon: "⚡", desc: "Omnitech1 Sovereign System: Divine AI Infrastructure for Legacy Mastery" },
      { name: "ScrollVerse Portal", url: "https://scrollverse.co", icon: "🌌", desc: "The sovereign empire — scrollverse.co" },
    ],
  },
  {
    category: "DIRECT SUPPORT",
    color: "#00FF88",
    links: [
      { name: "CashApp — $ChaisTheGreat", url: "https://cash.app/$ChaisTheGreat", icon: "💸", desc: "Direct support — sovereign flow" },
      { name: "CashApp — $chaisthegreat28", url: "https://cash.app/$chaisthegreat28", icon: "💸", desc: "Alternative direct payment" },
    ],
  },
];

const STATS = [
  { label: "Tracks Released", value: "32+" },
  { label: "Platforms", value: "8+" },
  { label: "Social Channels", value: "6" },
  { label: "GitHub Repos", value: "40+" },
];

export default function Connect() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = (url: string, name: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(name);
      toast.success(`Copied: ${name}`);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="relative overflow-hidden py-20 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #050B1A 0%, #0A1628 50%, #050B1A 100%)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-mono" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
          🌐 SOVEREIGN SOCIAL HUB
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>
          CONNECT
        </h1>
        <p className="text-xl mb-2" style={{ color: "#8899AA" }}>
          Chais The Great · XLVIIIblocks Tech · Omnitech1 · ScrollVerse
        </p>
        <p className="text-sm max-w-2xl mx-auto mb-8" style={{ color: "#556677" }}>
          Every channel. Every platform. Direct to the source. No middlemen, no gatekeepers — sovereign contact across all dimensions of the digital empire.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black" style={{ color: "#00D4FF", fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "#556677" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-12 space-y-12">
        {SOCIAL_LINKS.map((section) => (
          <div key={section.category}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: `${section.color}30` }} />
              <div className="text-xs font-mono tracking-widest px-4 py-1 rounded-full" style={{ background: `${section.color}15`, color: section.color, border: `1px solid ${section.color}30` }}>
                {section.category}
              </div>
              <div className="h-px flex-1" style={{ background: `${section.color}30` }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.links.map((link) => (
                <div
                  key={link.name}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.01] group"
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${section.color}15` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${section.color}15`, border: `1px solid ${section.color}30` }}
                  >
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm truncate">{link.name}</div>
                    <div className="text-xs" style={{ color: "#556677" }}>{link.desc}</div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyLink(link.url, link.name)}
                      className="p-2 rounded-lg text-xs transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA" }}
                      title="Copy link"
                    >
                      {copied === link.name ? "✓" : "⧉"}
                    </button>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-xs transition-all hover:scale-110"
                      style={{ background: `${section.color}20`, color: section.color, border: `1px solid ${section.color}30` }}
                    >
                      ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Direct Message CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.05), rgba(0,212,255,0.05))", border: "1px solid rgba(255,184,0,0.2)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>DIRECT CONTACT</div>
          <h3 className="text-2xl font-black text-white mb-2">Reach the Sovereign Directly</h3>
          <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: "#8899AA" }}>
            For partnerships, investment inquiries, music licensing, or Guardian community questions — connect directly. No filters. No gatekeepers. Sovereign-to-sovereign.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.instagram.com/chaisthegreat_mrwalk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "#E1306C", color: "white" }}
            >
              📸 DM on Instagram
            </a>
            <a
              href="https://cash.app/$ChaisTheGreat"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "#00D632", color: "white" }}
            >
              💸 Send via CashApp
            </a>
            <Link href="/chat">
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}
              >
                💬 Join Community Chat
              </button>
            </Link>
          </div>
        </div>

        {/* Share this page */}
        <div className="text-center">
          <div className="text-xs font-mono mb-4" style={{ color: "#556677" }}>SHARE THE SOVEREIGN HUB</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "Twitter/X", url: `https://twitter.com/intent/tweet?text=Connect%20with%20Chais%20The%20Great%20%E2%80%94%20Sovereign%20Music%20%26%20Tech%20Empire%20%F0%9F%94%A5&url=https://scrollverse.co/connect`, color: "#1DA1F2" },
              { label: "Telegram", url: `https://t.me/share/url?url=https://scrollverse.co/connect&text=Connect%20with%20Chais%20The%20Great%20%E2%80%94%20ScrollVerse%20Sovereign%20Hub`, color: "#2AABEE" },
              { label: "WhatsApp", url: `https://wa.me/?text=Connect%20with%20Chais%20The%20Great%20%E2%80%94%20ScrollVerse%20Sovereign%20Hub%20https://scrollverse.co/connect`, color: "#25D366" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{ background: `${s.color}20`, border: `1px solid ${s.color}40`, color: s.color }}
              >
                Share on {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container pb-8 flex flex-wrap gap-4 justify-center">
        <Link href="/" className="text-sm hover:text-white transition-colors" style={{ color: "#556677" }}>← Home</Link>
        <Link href="/music" className="text-sm hover:text-white transition-colors" style={{ color: "#556677" }}>Music</Link>
        <Link href="/chat" className="text-sm hover:text-white transition-colors" style={{ color: "#556677" }}>Community Chat</Link>
        <Link href="/token" className="text-sm hover:text-white transition-colors" style={{ color: "#556677" }}>Token Store</Link>
      </div>
    </div>
  );
}
