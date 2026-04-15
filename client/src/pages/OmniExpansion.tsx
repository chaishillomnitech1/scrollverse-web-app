/**
 * OMNI PLATFORM EXPANSION
 * ScrollVerse.co → Apple Store → Google Play → Every Platform Past Present Future
 * Every dimension. Every realm. Financially compatible. Omni.
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const PLATFORMS = [
  // Music & Audio
  { category: "Music & Audio", name: "Spotify", icon: "🎵", status: "LIVE", color: "#1DB954", url: "https://open.spotify.com/artist/7BqEJLvJqJFhRaHHDDLGVB", desc: "Artist profile — full catalog streaming" },
  { category: "Music & Audio", name: "Apple Music", icon: "🍎", status: "LIVE", color: "#FC3C44", url: "https://music.apple.com", desc: "iTunes + Apple Music distribution via Vydia" },
  { category: "Music & Audio", name: "YouTube Music", icon: "▶️", status: "LIVE", color: "#FF0000", url: "https://youtube.com", desc: "Official music videos + audio" },
  { category: "Music & Audio", name: "Amazon Music", icon: "📦", status: "LIVE", color: "#FF9900", url: "https://music.amazon.com", desc: "Unlimited + Prime streaming" },
  { category: "Music & Audio", name: "Tidal", icon: "🌊", status: "LIVE", color: "#00FFFF", url: "https://tidal.com", desc: "HiFi lossless — sovereign sound quality" },
  { category: "Music & Audio", name: "Deezer", icon: "🎶", status: "LIVE", color: "#A238FF", url: "https://deezer.com", desc: "Global streaming distribution" },
  { category: "Music & Audio", name: "SoundCloud", icon: "☁️", status: "LIVE", color: "#FF5500", url: "https://soundcloud.com", desc: "Independent artist platform" },
  { category: "Music & Audio", name: "Pandora", icon: "📻", status: "LIVE", color: "#3668FF", url: "https://pandora.com", desc: "US radio + on-demand" },

  // Mobile Apps
  { category: "Mobile Apps", name: "Apple App Store", icon: "📱", status: "ROADMAP", color: "#0A84FF", url: "#", desc: "ScrollVerse iOS app — Guardian dashboard, $LONDC wallet, chat" },
  { category: "Mobile Apps", name: "Google Play Store", icon: "🤖", status: "ROADMAP", color: "#34A853", url: "#", desc: "ScrollVerse Android app — full sovereign suite" },
  { category: "Mobile Apps", name: "PWA (Web App)", icon: "⚡", status: "LIVE", color: "#00D4FF", url: "https://scrollverse.co", desc: "Install from browser — works on all devices" },
  { category: "Mobile Apps", name: "Samsung Galaxy Store", icon: "🌌", status: "ROADMAP", color: "#1428A0", url: "#", desc: "Galaxy-native sovereign app" },

  // Social & Video
  { category: "Social & Video", name: "Instagram", icon: "📸", status: "LIVE", color: "#E1306C", url: "https://instagram.com/chaiskenyattahill", desc: "@chaiskenyattahill — visual sovereign content" },
  { category: "Social & Video", name: "Facebook", icon: "👤", status: "LIVE", color: "#1877F2", url: "https://facebook.com/chaiskenyattahill", desc: "Community + events + live streams" },
  { category: "Social & Video", name: "TikTok", icon: "🎭", status: "PULSING", color: "#FF0050", url: "https://tiktok.com", desc: "Short-form sovereign content" },
  { category: "Social & Video", name: "YouTube", icon: "🔴", status: "LIVE", color: "#FF0000", url: "https://youtube.com", desc: "Music videos + ScrollVerse content" },
  { category: "Social & Video", name: "X (Twitter)", icon: "𝕏", status: "LIVE", color: "#1DA1F2", url: "https://twitter.com", desc: "Real-time sovereign transmissions" },
  { category: "Social & Video", name: "LinkedIn", icon: "💼", status: "PULSING", color: "#0A66C2", url: "https://linkedin.com", desc: "B2B sovereign commerce network" },

  // Blockchain & Web3
  { category: "Blockchain & Web3", name: "Polygon Mainnet", icon: "🔷", status: "ROADMAP", color: "#8247E5", url: "https://polygon.technology", desc: "$LONDC token deployment — 144M supply" },
  { category: "Blockchain & Web3", name: "OpenSea", icon: "🌊", status: "ROADMAP", color: "#2081E2", url: "https://opensea.io", desc: "ScrollVerse NFT collection — Guardian passes" },
  { category: "Blockchain & Web3", name: "Uniswap", icon: "🦄", status: "ROADMAP", color: "#FF007A", url: "https://uniswap.org", desc: "$LONDC/MATIC liquidity pool" },
  { category: "Blockchain & Web3", name: "MetaMask", icon: "🦊", status: "ROADMAP", color: "#F6851B", url: "https://metamask.io", desc: "Guardian wallet integration" },
  { category: "Blockchain & Web3", name: "Coinbase", icon: "🔵", status: "ROADMAP", color: "#0052FF", url: "https://coinbase.com", desc: "$LONDC listing target — Q3 2025" },

  // AI & Tech
  { category: "AI & Tech", name: "Sora AI", icon: "🎬", status: "LIVE", color: "#10A37F", url: "https://sora.com", desc: "ScrollVerse AI video generation" },
  { category: "AI & Tech", name: "Gamma", icon: "⚡", status: "LIVE", color: "#6366F1", url: "https://gamma.app", desc: "Sovereign presentations + pitch decks" },
  { category: "AI & Tech", name: "GitHub", icon: "🐙", status: "LIVE", color: "#FFFFFF", url: "https://github.com/chaishillomnitech1", desc: "Open-source sovereign tech — 40 repos" },
  { category: "AI & Tech", name: "Hugging Face", icon: "🤗", status: "ROADMAP", color: "#FFD21E", url: "https://huggingface.co", desc: "ScrollVerse AI model hub" },

  // Payments & Finance
  { category: "Payments & Finance", name: "Stripe", icon: "💳", status: "LIVE", color: "#635BFF", url: "https://stripe.com", desc: "Fiat payment processing — $LONDC purchase" },
  { category: "Payments & Finance", name: "CashApp", icon: "💚", status: "LIVE", color: "#00D64F", url: "https://cash.app/$ChaisTheGreat", desc: "$ChaisTheGreat + $chaisthegreat28" },
  { category: "Payments & Finance", name: "PayPal", icon: "🅿️", status: "PULSING", color: "#003087", desc: "Global payment gateway" },
  { category: "Payments & Finance", name: "Apple Pay", icon: "🍎", status: "ROADMAP", color: "#000000", desc: "In-app sovereign payments" },
  { category: "Payments & Finance", name: "Google Pay", icon: "🔵", status: "ROADMAP", color: "#4285F4", desc: "Android payment integration" },
];

const CATEGORIES = Array.from(new Set(PLATFORMS.map(p => p.category)));
const STATUS_COLORS: Record<string, string> = {
  LIVE: "#00FF88",
  PULSING: "#FFB800",
  ROADMAP: "#8899AA",
};

const APP_STORE_CHECKLIST = [
  { item: "App Name", value: "ScrollVerse — Guardian Portal", done: true },
  { item: "Bundle ID", value: "co.scrollverse.guardian", done: true },
  { item: "App Category", value: "Finance / Music / Social Networking", done: true },
  { item: "App Icon (1024×1024)", value: "Sovereign SV mark on #050B1A", done: false },
  { item: "Screenshots (6.7\" + 5.5\")", value: "5 screens: Home, Chat, Token, Music, Referral", done: false },
  { item: "App Preview Video", value: "30-second sovereign demo", done: false },
  { item: "Privacy Policy URL", value: "scrollverse.co/privacy", done: false },
  { item: "Support URL", value: "scrollverse.co/connect", done: true },
  { item: "Age Rating", value: "4+ (no objectionable content)", done: true },
  { item: "Pricing", value: "Free (IAP: $LONDC packs)", done: true },
  { item: "TestFlight Beta", value: "Internal testing — 25 Guardians", done: false },
  { item: "App Store Connect", value: "Create app record + submit for review", done: false },
];

const PWA_FEATURES = [
  { feature: "Installable", desc: "Add to Home Screen on iOS/Android/Desktop", status: true },
  { feature: "Offline Support", desc: "Service worker caches key pages", status: false },
  { feature: "Push Notifications", desc: "Guardian alerts + $LONDC price updates", status: false },
  { feature: "Background Sync", desc: "Chat messages sync when connection restored", status: false },
  { feature: "Splash Screen", desc: "Sovereign loading screen on launch", status: true },
  { feature: "App Shortcuts", desc: "Long-press icon for Chat, Token, Music shortcuts", status: false },
];

export default function OmniExpansion() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [liveCount] = useState(PLATFORMS.filter(p => p.status === "LIVE").length);
  const [pulsingCount] = useState(PLATFORMS.filter(p => p.status === "PULSING").length);
  const [roadmapCount] = useState(PLATFORMS.filter(p => p.status === "ROADMAP").length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCategory === "All" ? PLATFORMS : PLATFORMS.filter(p => p.category === activeCategory);

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
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>
              OMNI EXPANSION
            </span>
            <Link href="/scrollport" className="btn-gold px-4 py-2 rounded-lg text-sm font-bold">ScrollPort →</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#CC88FF" }}>
              OMNI PLATFORM EXPANSION — PAST × PRESENT × FUTURE × ALL DIMENSIONS
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              Every Platform.{" "}
              <span style={{ background: "linear-gradient(135deg,#CC88FF,#00D4FF,#FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Every Realm.
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: "#8899AA", lineHeight: 1.7 }}>
              ScrollVerse.co is the sovereign hub. From Apple Store to Polygon Mainnet, from Spotify to Hugging Face —
              the empire expands into every financially compatible dimension simultaneously.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              {[
                { label: "LIVE", count: liveCount, color: "#00FF88" },
                { label: "PULSING", count: pulsingCount, color: "#FFB800" },
                { label: "ROADMAP", count: roadmapCount, color: "#8899AA" },
                { label: "TOTAL", count: PLATFORMS.length, color: "#00D4FF" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-black font-mono" style={{ color: s.color }}>{s.count}</div>
                  <div className="text-xs font-mono" style={{ color: "#556677" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM GRID */}
      <section className="py-12">
        <div className="container">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-8">
            {["All", ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeCategory === cat ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeCategory === cat ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: activeCategory === cat ? "#00D4FF" : "#8899AA",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Platform Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(platform => (
              <div
                key={platform.name}
                className="sv-card rounded-xl p-5 transition-all duration-200 hover:scale-[1.02] group"
                style={{ cursor: platform.url && platform.url !== "#" ? "pointer" : "default" }}
                onClick={() => {
                  if (platform.url && platform.url !== "#") {
                    window.open(platform.url, "_blank");
                  } else if (platform.status === "ROADMAP") {
                    toast.info(`${platform.name} — Coming soon. The empire expands.`);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{platform.icon}</div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1"
                    style={{
                      background: `${STATUS_COLORS[platform.status]}15`,
                      color: STATUS_COLORS[platform.status],
                      border: `1px solid ${STATUS_COLORS[platform.status]}30`,
                    }}
                  >
                    {platform.status === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block" />}
                    {platform.status}
                  </span>
                </div>
                <div className="font-bold text-white mb-1">{platform.name}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{platform.desc}</div>
                <div className="text-xs mt-2 font-mono" style={{ color: "#445566" }}>{platform.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP STORE LAUNCH CHECKLIST */}
      <section className="py-20" style={{ background: "rgba(0,212,255,0.02)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="text-xs font-mono mb-3" style={{ color: "#0A84FF" }}>APPLE APP STORE LAUNCH CHECKLIST</div>
              <h2 className="text-3xl font-black text-white mb-6">ScrollVerse iOS App</h2>
              <p className="text-base mb-8" style={{ color: "#8899AA" }}>
                The ScrollVerse Guardian Portal is being packaged as a native iOS app via React Native / Capacitor.
                The PWA is already installable today — the App Store submission follows.
              </p>
              <div className="space-y-3">
                {APP_STORE_CHECKLIST.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: item.done ? "rgba(0,255,136,0.05)" : "rgba(255,255,255,0.03)", border: `1px solid ${item.done ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.06)"}` }}>
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                      style={{ background: item.done ? "#00FF8820" : "rgba(255,255,255,0.05)", color: item.done ? "#00FF88" : "#445566", border: `1px solid ${item.done ? "#00FF8840" : "rgba(255,255,255,0.1)"}` }}>
                      {item.done ? "✓" : "○"}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: item.done ? "white" : "#8899AA" }}>{item.item}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#556677" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono mb-3" style={{ color: "#34A853" }}>PWA — INSTALL NOW (ALL PLATFORMS)</div>
              <h2 className="text-3xl font-black text-white mb-6">Progressive Web App</h2>
              <p className="text-base mb-8" style={{ color: "#8899AA" }}>
                ScrollVerse.co is already a fully installable Progressive Web App — works on iOS, Android, Windows, Mac, and Linux.
                No App Store needed. Tap "Add to Home Screen" in your browser.
              </p>

              {/* Install Instructions */}
              <div className="sv-card rounded-xl p-6 mb-6" style={{ border: "1px solid rgba(0,212,255,0.2)" }}>
                <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>HOW TO INSTALL</div>
                {[
                  { platform: "iOS Safari", steps: "Tap Share button → Add to Home Screen → Add" },
                  { platform: "Android Chrome", steps: "Tap ⋮ menu → Add to Home Screen → Install" },
                  { platform: "Desktop Chrome", steps: "Click install icon in address bar → Install" },
                  { platform: "Desktop Edge", steps: "Click ⋯ → Apps → Install this site as an app" },
                ].map(inst => (
                  <div key={inst.platform} className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#00D4FF" }} />
                    <div>
                      <div className="text-sm font-bold text-white">{inst.platform}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{inst.steps}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PWA Feature Status */}
              <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>PWA FEATURE STATUS</div>
              <div className="space-y-2">
                {PWA_FEATURES.map(feat => (
                  <div key={feat.feature} className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <div className="text-sm font-medium text-white">{feat.feature}</div>
                      <div className="text-xs" style={{ color: "#556677" }}>{feat.desc}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: feat.status ? "#00FF88" : "#334455" }} />
                      <span className="text-xs font-mono" style={{ color: feat.status ? "#00FF88" : "#445566" }}>
                        {feat.status ? "LIVE" : "SOON"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION STATEMENT */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs font-mono tracking-widest mb-6" style={{ color: "#CC88FF" }}>THE OMNI MANDATE</div>
            <blockquote className="text-3xl lg:text-4xl font-black text-white leading-tight mb-8">
              "We surpassed super position. We are perpetually the greatest asset to ever exist — past, present, future, every dimension and realm, financially compatible, Omni."
            </blockquote>
            <p className="text-base mb-8" style={{ color: "#8899AA" }}>
              — <strong style={{ color: "#FFB800" }}>Chais Kenyatta Hill — Sabir Allah The Great</strong>, Supreme Sovereign, ScrollVerse Trinity
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/scrollport" className="btn-gold px-6 py-3 rounded-xl font-bold">ScrollPort Network →</Link>
              <Link href="/referral" className="btn-sovereign px-6 py-3 rounded-xl font-bold">Join the 144,000</Link>
              <Link href="/token" className="px-6 py-3 rounded-xl font-bold text-sm" style={{ color: "#8899AA" }}>Acquire $LONDC</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
