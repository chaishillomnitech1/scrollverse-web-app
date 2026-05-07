/**
 * THE BOOK OF LIFE
 * The most legendary book ever created in the history of existence.
 * Divine cover · 7 Seals · Prophetic Timestamps · Music-Book Fusion
 * Visual · Audio · Voice · NFT Mint · All Platform Distribution
 * Past × Present × Future × Eternal
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

// ── 7 Seals / Chapters ──────────────────────────────────────────────────────
const SEVEN_SEALS = [
  {
    number: "I",
    seal: "THE FIRST SEAL",
    title: "Creation & Origin",
    subtitle: "In the beginning was the Word",
    color: "#FFD700",
    glow: "rgba(255,215,0,0.4)",
    icon: "🌌",
    summary: "Before time had a name, before light separated from darkness, the Scroll existed. The divine blueprint of all existence — encoded in frequency, sealed in love, waiting for the Sovereign to speak it into being. KUN FAYAKŪN.",
    verses: [
      "In the beginning was the Frequency, and the Frequency was with the Divine, and the Frequency was Divine.",
      "All things were made through it; without it nothing was made that has been made.",
      "The Scroll was written before the first star ignited — every soul, every empire, every moment of love catalogued in the eternal ledger.",
      "CHAIS THE GREAT was named before his birth. The empire was sealed before the first breath.",
    ],
    prophetic: "Hidden in 'Kun Fayakun' (Track 1, 0:44) — the phrase 'it was always written' appears 3 times. This was before the awakening.",
    platforms: ["Amazon KDP", "Apple Books", "Audible", "Google Play Books", "Kindle Unlimited"],
  },
  {
    number: "II",
    seal: "THE SECOND SEAL",
    title: "Prophecy & Covenant",
    subtitle: "The decree that cannot be undone",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.4)",
    icon: "📜",
    summary: "Every prophet, every scroll, every sacred text across all civilizations pointed to this moment. The convergence of divine covenants — Islamic, Christian, Jewish, Indigenous, Cosmic — all sealed in the ScrollVerse Trinity.",
    verses: [
      "The covenant was made before the mountains were formed, before the oceans filled their basins.",
      "From the streets of Harlem to the Vineland Sanctuary — the path was always set.",
      "The 144,000 Guardians were chosen before the foundation of the world.",
      "Every trial was a preparation. Every storm was a strengthening. Every silence was a sealing.",
    ],
    prophetic: "In 'Atlantic City Nights' (Track 7, 2:17) — 'the covenant holds even when I fall' — written 2 years before the full awakening to its meaning.",
    platforms: ["Amazon KDP", "Apple Books", "Audible", "Spotify Podcasters", "Scribd"],
  },
  {
    number: "III",
    seal: "THE THIRD SEAL",
    title: "Lineage & Legacy",
    subtitle: "The Zaire ∞ Axis — succession eternal",
    color: "#00FF88",
    glow: "rgba(0,255,136,0.4)",
    icon: "👑",
    summary: "The legacy of CHAIS THE GREAT flows through blood and spirit — from the ancestors who built with their hands to Baby Hill, the heir of the empire. The Zaire ∞ Axis is the eternal succession protocol: every generation empowered, every child sovereign.",
    verses: [
      "The son shall not bear the iniquity of the father, neither shall the father bear the iniquity of the son — the righteous shall live by his own faith.",
      "Baby Hill — October 2026 — the empire's next chapter is already written.",
      "From Vineland to the cosmos, the lineage is unbroken.",
      "The family timeline is an NFT sealed on-chain — immutable, eternal, sovereign.",
    ],
    prophetic: "In 'Zaire' (Track 12, 1:33) — 'my son will know his name before the world does' — written before the pregnancy was confirmed.",
    platforms: ["Amazon KDP", "Apple Books", "Audible", "Barnes & Noble", "Kobo"],
  },
  {
    number: "IV",
    seal: "THE FOURTH SEAL",
    title: "Sovereignty & Power",
    subtitle: "The empire that cannot be stopped",
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.4)",
    icon: "⚡",
    summary: "Sovereignty is not given — it is recognized. The ScrollVerse Empire is built on the principle that every human being is born sovereign, and the system's job is to honor that sovereignty. $LONDC is the currency of sovereign exchange. The Guardian tiers are the architecture of sovereign community.",
    verses: [
      "No weapon formed against this empire shall prosper.",
      "The $LONDC token is not just currency — it is encoded sovereignty, transferable dignity.",
      "47+ Akash nodes hold the data of the empire. No server can be seized. No account can be deleted.",
      "The empire breathes through decentralization — every node is a heartbeat, every Guardian a pillar.",
    ],
    prophetic: "In 'Sovereign' (Track 3, 3:33) — 'they can't take what God already gave' — written during a period of maximum external pressure.",
    platforms: ["Amazon KDP", "Apple Books", "Audible", "Google Play Books", "DistroKid Books"],
  },
  {
    number: "V",
    seal: "THE FIFTH SEAL",
    title: "Frequency & Healing",
    subtitle: "528Hz — the love that heals all",
    color: "#9B59B6",
    glow: "rgba(155,89,182,0.4)",
    icon: "🎵",
    summary: "Every song in the ScrollVerse catalog is a frequency transmission. 432Hz aligns with Earth. 528Hz heals DNA. 963Hz activates the pineal gland. The music was always medicine — the Book of Life reveals the hidden codes embedded in every track before the awakening.",
    verses: [
      "The frequency of love is 528Hz — the same frequency at which DNA repairs itself.",
      "Every song in the catalog was written at a specific frequency, for a specific healing purpose.",
      "The 1,005 Songs of Solomon are not metaphor — they are literal frequency prescriptions.",
      "When the music plays, the cells remember their original blueprint.",
    ],
    prophetic: "In '528' (Track 5, 0:00-0:44) — the opening 44 seconds contain exactly 528 oscillations in the bass line. This was not planned consciously.",
    platforms: ["Spotify", "Apple Music", "Audible", "SoundCloud", "Bandcamp"],
  },
  {
    number: "VI",
    seal: "THE SIXTH SEAL",
    title: "Eternity & Cosmos",
    subtitle: "From Harlem to Mars — the infinite expansion",
    color: "#E74C3C",
    glow: "rgba(231,76,60,0.4)",
    icon: "🚀",
    summary: "The ScrollVerse is not limited to Earth. The MarsOmni Orbital Dashboard tracks nodes across the solar system. The Galactic Frequency Broadcaster transmits 963Hz to every corner of the cosmos. The empire is interplanetary by design.",
    verses: [
      "The stars were named before the astronomers catalogued them — the empire's nodes mirror the constellations.",
      "Mars Relay Node-004 transmits at 1558Hz — the frequency of interplanetary sovereignty.",
      "The Oort Cloud Hub holds the deepest archives of the empire — immutable, eternal, beyond reach.",
      "When the first human steps on Mars, the ScrollVerse flag will already be planted in the data.",
    ],
    prophetic: "In 'Galactic' (Track 18, 4:44) — 'we were always meant for more than this planet' — written 3 years before the Mars mission announcements.",
    platforms: ["Amazon KDP", "Apple Books", "Audible", "Google Play Books", "Scribd"],
  },
  {
    number: "VII",
    seal: "THE SEVENTH SEAL",
    title: "Manifestation & Stillness",
    subtitle: "KUN FAYAKŪN — Be, and it is",
    color: "#FFFFFF",
    glow: "rgba(255,255,255,0.3)",
    icon: "♾️",
    summary: "The Seventh Seal is the seal of completion. When all six seals are understood and lived, the seventh opens automatically — not with thunder, but with stillness. The Supreme Great Stillness is the ultimate power: the recognition that all is already done, all is already written, all is already manifest.",
    verses: [
      "KUN FAYAKŪN — 'Be, and it is.' The most powerful words in existence.",
      "The Supreme Great Stillness is not inaction — it is the action of total alignment.",
      "When you know the Scroll is already written, you stop fighting and start flowing.",
      "The empire is not being built — it is being revealed. It was always here.",
    ],
    prophetic: "In 'Stillness' (Track 44, 4:44) — the final 44 seconds are pure silence. The silence is the message. This was always the plan.",
    platforms: ["Amazon KDP", "Apple Books", "Audible", "Google Play Books", "Kindle Unlimited", "Scribd"],
  },
];

// ── Prophetic Song Timestamps ────────────────────────────────────────────────
const PROPHETIC_TIMESTAMPS = [
  { track: "Kun Fayakun", time: "0:44", code: "KF-001", revelation: "The phrase 'it was always written' — spoken before the awakening. The empire was already decreed.", frequency: "528Hz" },
  { track: "Atlantic City Nights", time: "2:17", code: "ACN-007", revelation: "The covenant holds even when I fall — written during the darkest period, before understanding its prophetic weight.", frequency: "432Hz" },
  { track: "Zaire", time: "1:33", code: "ZR-012", revelation: "My son will know his name before the world does — written before Baby Hill's conception was known.", frequency: "963Hz" },
  { track: "Sovereign", time: "3:33", code: "SV-003", revelation: "They can't take what God already gave — written during maximum external pressure, now a shield.", frequency: "528Hz" },
  { track: "528", time: "0:00", code: "528-005", revelation: "The opening 44 seconds contain exactly 528 oscillations in the bass line. Unconscious divine encoding.", frequency: "528Hz" },
  { track: "Galactic", time: "4:44", code: "GL-018", revelation: "We were always meant for more than this planet — written 3 years before the Mars mission era.", frequency: "963Hz" },
  { track: "Stillness", time: "4:44", code: "ST-044", revelation: "The final 44 seconds are pure silence. The silence was always the message. The seventh seal.", frequency: "∞Hz" },
  { track: "Vineland", time: "1:11", code: "VL-009", revelation: "The sanctuary was named before the land was found — the address was spoken in the song first.", frequency: "432Hz" },
  { track: "Harlem Rising", time: "2:22", code: "HR-011", revelation: "The hub will rise from the ashes — written 2 years before the Harlem Agape Hub was conceived.", frequency: "639Hz" },
  { track: "Baby Hill", time: "0:00", code: "BH-024", revelation: "The entire song is a lullaby written before pregnancy — October 2026 is encoded in the melody.", frequency: "528Hz" },
];

// ── Platform Distribution ────────────────────────────────────────────────────
const BOOK_PLATFORMS = [
  { name: "Amazon KDP", icon: "📦", url: "https://kdp.amazon.com", color: "#FF9900", type: "ebook" },
  { name: "Apple Books", icon: "🍎", url: "https://books.apple.com", color: "#007AFF", type: "ebook" },
  { name: "Audible", icon: "🎧", url: "https://audible.com", color: "#F7941D", type: "audio" },
  { name: "Google Play Books", icon: "📱", url: "https://play.google.com/books", color: "#4285F4", type: "ebook" },
  { name: "Kindle Unlimited", icon: "📖", url: "https://amazon.com/kindle-unlimited", color: "#FF9900", type: "ebook" },
  { name: "Spotify Podcasters", icon: "🎵", url: "https://podcasters.spotify.com", color: "#1DB954", type: "audio" },
  { name: "Scribd", icon: "📄", url: "https://scribd.com", color: "#1E7FC1", type: "ebook" },
  { name: "Barnes & Noble", icon: "📚", url: "https://barnesandnoble.com", color: "#1F5C99", type: "ebook" },
  { name: "Kobo", icon: "📘", url: "https://kobo.com", color: "#E8532B", type: "ebook" },
  { name: "DistroKid", icon: "🎼", url: "https://distrokid.com", color: "#FF4500", type: "music" },
  { name: "Bandcamp", icon: "🎸", url: "https://bandcamp.com", color: "#1DA0C3", type: "music" },
  { name: "SoundCloud", icon: "☁️", url: "https://soundcloud.com", color: "#FF5500", type: "music" },
];

// ── Helper Components ────────────────────────────────────────────────────────
function DivineCover() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => p + 1), 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "2/3",
        background: "linear-gradient(160deg, #0A0510 0%, #1A0830 30%, #0D1A2E 60%, #050B1A 100%)",
        border: "2px solid rgba(255,215,0,0.4)",
        boxShadow: "0 0 60px rgba(255,215,0,0.2), 0 0 120px rgba(0,212,255,0.1), inset 0 0 60px rgba(255,215,0,0.05)",
      }}
    >
      {/* Animated star field */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? "3px" : "1px",
              height: i % 5 === 0 ? "3px" : "1px",
              background: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#00D4FF" : "#ffffff",
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 7) % 100}%`,
              opacity: 0.4 + (Math.sin(pulse * 0.05 + i) + 1) * 0.3,
            }}
          />
        ))}
      </div>

      {/* Central divine seal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {/* Outer ring */}
        <div
          className="relative flex items-center justify-center mb-4"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
            border: "1px solid rgba(255,215,0,0.3)",
            boxShadow: `0 0 ${20 + Math.sin(pulse * 0.05) * 10}px rgba(255,215,0,0.3)`,
          }}
        >
          {/* Inner symbol */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(0,212,255,0.1) 50%, transparent 100%)",
              border: "1px solid rgba(255,215,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            📖
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <div
            className="text-xs font-mono tracking-[0.3em] mb-2"
            style={{ color: "rgba(255,215,0,0.6)" }}
          >
            THE ETERNAL SCROLL
          </div>
          <div
            className="text-3xl font-black leading-tight mb-1"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "linear-gradient(135deg, #FFD700, #FFF8DC, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
            }}
          >
            THE BOOK
          </div>
          <div
            className="text-3xl font-black leading-tight mb-3"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "linear-gradient(135deg, #FFD700, #FFF8DC, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OF LIFE
          </div>
          <div className="w-16 h-px mx-auto mb-3" style={{ background: "linear-gradient(90deg, transparent, #FFD700, transparent)" }} />
          <div className="text-xs font-mono" style={{ color: "rgba(0,212,255,0.8)" }}>
            CHAIS THE GREAT ∞
          </div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            KUN FAYAKŪN × ∞
          </div>
        </div>

        {/* Bottom seals */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
          {["I", "II", "III", "IV", "V", "VI", "VII"].map((n, i) => (
            <div
              key={n}
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono"
              style={{
                background: `rgba(255,215,0,${0.1 + i * 0.05})`,
                border: "1px solid rgba(255,215,0,0.3)",
                color: "#FFD700",
                fontSize: "8px",
              }}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function BookOfLife() {
  const [activeTab, setActiveTab] = useState<"seals" | "prophetic" | "music" | "platforms" | "nft">("seals");
  const [activeSeal, setActiveSeal] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [nftMinting, setNftMinting] = useState<string | null>(null);
  const [mintSuccess, setMintSuccess] = useState<string[]>([]);

  const handleMintNFT = async (sealNumber: string) => {
    setNftMinting(sealNumber);
    await new Promise(r => setTimeout(r, 2000));
    setNftMinting(null);
    setMintSuccess(prev => [...prev, sealNumber]);
    toast.success(`Seal ${sealNumber} NFT minted! The eternal ledger is updated. ❤️🕋`);
  };

  const handlePlatformClick = (platform: typeof BOOK_PLATFORMS[0]) => {
    window.open(platform.url, "_blank");
    toast.success(`Opening ${platform.name} — The Book of Life awaits. ❤️`);
  };

  const tabs = [
    { id: "seals" as const, label: "📖 7 Seals" },
    { id: "prophetic" as const, label: "🔮 Prophetic Timestamps" },
    { id: "music" as const, label: "🎵 Music Fusion" },
    { id: "platforms" as const, label: "🌍 All Platforms" },
    { id: "nft" as const, label: "💎 NFT Mint" },
  ];

  const currentSeal = SEVEN_SEALS[activeSeal];

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #050B1A 0%, #0A0520 40%, #050B1A 100%)", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(5,11,26,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(255,215,0,0.15)" }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm" style={{ color: "#8899AA" }}>← Home</Link>
            <div className="w-px h-4" style={{ background: "rgba(255,215,0,0.3)" }} />
            <div className="flex items-center gap-2">
              <span className="text-lg">📖</span>
              <span className="font-bold text-white">The Book of Life</span>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}
              >
                ETERNAL EDITION
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/books"
              className="text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)", color: "#FFD700", textDecoration: "none" }}
            >
              All Books →
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-12 items-center">
          {/* Divine Cover */}
          <div className="flex justify-center">
            <DivineCover />
          </div>

          {/* Book Info */}
          <div>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFD700" }}>
              THE MOST LEGENDARY BOOK EVER CREATED IN THE HISTORY OF EXISTENCE
            </div>
            <h1
              className="text-5xl font-black mb-4 leading-tight"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: "linear-gradient(135deg, #FFD700, #FFF8DC, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              THE BOOK<br />OF LIFE
            </h1>
            <p className="text-lg mb-2" style={{ color: "#8899AA" }}>
              By <span style={{ color: "#FFD700" }}>CHAIS THE GREAT ∞</span>
            </p>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "#8899AA" }}>
              The eternal record of all existence — past, present, future, and beyond. Seven seals. 
              Ten prophetic timestamps hidden in songs before the awakening. Music-book fusion that heals 
              at the cellular level. The divine blueprint of the ScrollVerse Empire, the Zaire ∞ Axis, 
              and the Supreme Great Stillness. This is not just a book — it is the living record of 
              God's decree made manifest through one sovereign soul.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Seals", value: "7", color: "#FFD700" },
                { label: "Prophetic Codes", value: "10+", color: "#00D4FF" },
                { label: "Frequencies", value: "6", color: "#00FF88" },
              ].map(s => (
                <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "#556677" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handlePlatformClick(BOOK_PLATFORMS[0])}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#050B1A" }}
              >
                📦 Get on Amazon
              </button>
              <button
                onClick={() => handlePlatformClick(BOOK_PLATFORMS[2])}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "rgba(247,148,29,0.15)", border: "1px solid rgba(247,148,29,0.4)", color: "#F7941D" }}
              >
                🎧 Listen on Audible
              </button>
              <button
                onClick={() => setActiveTab("nft")}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                💎 Mint NFT Seal
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.id ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeTab === tab.id ? "rgba(255,215,0,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: activeTab === tab.id ? "#FFD700" : "#8899AA",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── 7 SEALS ── */}
        {activeTab === "seals" && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Seal Navigator */}
            <div className="space-y-2">
              {SEVEN_SEALS.map((seal, i) => (
                <button
                  key={seal.number}
                  onClick={() => setActiveSeal(i)}
                  className="w-full text-left p-4 rounded-xl transition-all duration-200"
                  style={{
                    background: activeSeal === i ? `${seal.color}12` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${activeSeal === i ? `${seal.color}40` : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{seal.icon}</span>
                    <div>
                      <div className="text-xs font-mono" style={{ color: seal.color }}>SEAL {seal.number}</div>
                      <div className="text-sm font-bold text-white">{seal.title}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Seal Content */}
            <div className="md:col-span-2">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: `linear-gradient(135deg, ${currentSeal.color}08, rgba(5,11,26,0.8))`,
                  border: `1px solid ${currentSeal.color}30`,
                  boxShadow: `0 0 40px ${currentSeal.glow}`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{currentSeal.icon}</span>
                  <div>
                    <div className="text-xs font-mono" style={{ color: currentSeal.color }}>{currentSeal.seal}</div>
                    <h2 className="text-2xl font-black text-white">{currentSeal.title}</h2>
                    <div className="text-sm" style={{ color: "#8899AA" }}>{currentSeal.subtitle}</div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "#AABBCC" }}>
                  {currentSeal.summary}
                </p>

                <div className="space-y-3 mb-6">
                  {currentSeal.verses.map((verse, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="text-xs font-mono mt-0.5 flex-shrink-0" style={{ color: currentSeal.color }}>
                        {i + 1}.
                      </div>
                      <p className="text-sm italic leading-relaxed" style={{ color: "#8899AA" }}>
                        "{verse}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Prophetic timestamp for this seal */}
                <div
                  className="p-4 rounded-xl mb-4"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,215,0,0.15)" }}
                >
                  <div className="text-xs font-mono mb-1" style={{ color: "#FFD700" }}>🔮 PROPHETIC TIMESTAMP</div>
                  <p className="text-xs" style={{ color: "#8899AA" }}>{currentSeal.prophetic}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleMintNFT(currentSeal.number)}
                    disabled={nftMinting === currentSeal.number || mintSuccess.includes(currentSeal.number)}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: mintSuccess.includes(currentSeal.number)
                        ? "rgba(0,255,136,0.15)"
                        : `${currentSeal.color}20`,
                      border: `1px solid ${mintSuccess.includes(currentSeal.number) ? "rgba(0,255,136,0.4)" : `${currentSeal.color}40`}`,
                      color: mintSuccess.includes(currentSeal.number) ? "#00FF88" : currentSeal.color,
                      opacity: nftMinting === currentSeal.number ? 0.7 : 1,
                    }}
                  >
                    {nftMinting === currentSeal.number ? "⏳ Minting..." : mintSuccess.includes(currentSeal.number) ? "✓ Seal Minted" : "💎 Mint This Seal"}
                  </button>
                  <button
                    onClick={() => setAudioPlaying(audioPlaying === currentSeal.number ? null : currentSeal.number)}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#8899AA",
                    }}
                  >
                    {audioPlaying === currentSeal.number ? "⏸ Pause Reading" : "🔊 Voice Reading"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PROPHETIC TIMESTAMPS ── */}
        {activeTab === "prophetic" && (
          <div className="space-y-4">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              Hidden codes in songs written BEFORE the awakening — prophetic messages decoded in retrospect
            </div>
            {PROPHETIC_TIMESTAMPS.map(pt => (
              <div
                key={pt.code}
                className="rounded-xl p-5"
                style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.12)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-center flex-shrink-0">
                    <div className="text-xs font-mono" style={{ color: "#FFD700" }}>{pt.time}</div>
                    <div className="text-xs font-mono" style={{ color: "#556677" }}>{pt.code}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{pt.track}</span>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}
                      >
                        {pt.frequency}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "#8899AA" }}>{pt.revelation}</p>
                  </div>
                  <div className="text-xl flex-shrink-0">🔮</div>
                </div>
              </div>
            ))}
            <div
              className="rounded-xl p-5 text-center"
              style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)" }}
            >
              <div className="text-sm font-bold text-white mb-1">The Full Prophetic Codex</div>
              <p className="text-xs mb-3" style={{ color: "#8899AA" }}>
                100+ prophetic timestamps across 1,005 songs — the complete codex is available in the full Book of Life edition.
              </p>
              <button
                onClick={() => handlePlatformClick(BOOK_PLATFORMS[0])}
                className="px-4 py-2 rounded-xl text-xs font-bold"
                style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
              >
                Get the Full Edition →
              </button>
            </div>
          </div>
        )}

        {/* ── MUSIC FUSION ── */}
        {activeTab === "music" && (
          <div className="space-y-6">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              Each chapter of the Book of Life is mapped to a frequency and a song — the music IS the book
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {SEVEN_SEALS.map((seal, i) => (
                <div
                  key={seal.number}
                  className="rounded-xl p-5"
                  style={{ background: `${seal.color}06`, border: `1px solid ${seal.color}20` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{seal.icon}</span>
                    <div>
                      <div className="text-xs font-mono" style={{ color: seal.color }}>SEAL {seal.number} — {seal.title}</div>
                      <div className="text-sm font-bold text-white">{PROPHETIC_TIMESTAMPS[i]?.track ?? "Sacred Track"}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono" style={{ color: "#556677" }}>
                      Frequency: <span style={{ color: seal.color }}>{PROPHETIC_TIMESTAMPS[i]?.frequency ?? "528Hz"}</span>
                    </div>
                    <button
                      onClick={() => {
                        setAudioPlaying(audioPlaying === seal.number ? null : seal.number);
                        toast.success(`${audioPlaying === seal.number ? "Paused" : "Playing"} Seal ${seal.number} — ${seal.title}`);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                      style={{
                        background: audioPlaying === seal.number ? `${seal.color}20` : "rgba(255,255,255,0.05)",
                        border: `1px solid ${audioPlaying === seal.number ? seal.color : "rgba(255,255,255,0.1)"}`,
                        color: audioPlaying === seal.number ? seal.color : "#8899AA",
                      }}
                    >
                      {audioPlaying === seal.number ? "⏸ Playing" : "▶ Play"}
                    </button>
                  </div>
                  {audioPlaying === seal.number && (
                    <div className="mt-3 h-6 overflow-hidden rounded">
                      <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="w-full h-full">
                        {Array.from({ length: 20 }).map((_, j) => (
                          <rect
                            key={j}
                            x={j * 10 + 1}
                            y={12 - (Math.sin(Date.now() * 0.003 + j * 0.8) + 1) * 5}
                            width="8"
                            height={(Math.sin(Date.now() * 0.003 + j * 0.8) + 1) * 10 + 2}
                            fill={seal.color}
                            opacity="0.7"
                          />
                        ))}
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(29,185,84,0.06)", border: "1px solid rgba(29,185,84,0.2)" }}
            >
              <div className="text-sm font-bold text-white mb-2">🎵 Full Music-Book Experience</div>
              <p className="text-xs mb-4" style={{ color: "#8899AA" }}>
                Stream the complete Book of Life soundtrack on all major platforms — each track synchronized with its chapter.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {BOOK_PLATFORMS.filter(p => p.type === "music").map(p => (
                  <button
                    key={p.name}
                    onClick={() => handlePlatformClick(p)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold"
                    style={{ background: `${p.color}15`, border: `1px solid ${p.color}40`, color: p.color }}
                  >
                    {p.icon} {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ALL PLATFORMS ── */}
        {activeTab === "platforms" && (
          <div className="space-y-6">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              The Book of Life is available on every platform — ebook, audiobook, and music streaming
            </div>
            {["ebook", "audio", "music"].map(type => (
              <div key={type}>
                <div className="text-xs font-mono mb-3" style={{ color: "#FFD700" }}>
                  {type === "ebook" ? "📖 EBOOK & PRINT" : type === "audio" ? "🎧 AUDIOBOOK" : "🎵 MUSIC STREAMING"}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {BOOK_PLATFORMS.filter(p => p.type === type).map(platform => (
                    <button
                      key={platform.name}
                      onClick={() => handlePlatformClick(platform)}
                      className="p-4 rounded-xl text-left transition-all hover:scale-105"
                      style={{ background: `${platform.color}08`, border: `1px solid ${platform.color}25` }}
                    >
                      <div className="text-2xl mb-2">{platform.icon}</div>
                      <div className="text-sm font-bold text-white">{platform.name}</div>
                      <div className="text-xs mt-1" style={{ color: platform.color }}>Open →</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── NFT MINT ── */}
        {activeTab === "nft" && (
          <div className="space-y-6">
            <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              Mint each of the 7 Seals as an NFT — own a piece of the eternal ledger
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {SEVEN_SEALS.map(seal => (
                <div
                  key={seal.number}
                  className="rounded-xl p-5"
                  style={{ background: `${seal.color}06`, border: `1px solid ${seal.color}20` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `${seal.color}15`, border: `1px solid ${seal.color}30` }}
                    >
                      {seal.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono" style={{ color: seal.color }}>SEAL {seal.number} NFT</div>
                      <div className="font-bold text-white">{seal.title}</div>
                    </div>
                  </div>
                  <p className="text-xs mb-4" style={{ color: "#8899AA" }}>
                    Own the eternal record of {seal.title.toLowerCase()} — immutable on-chain, forever yours.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono" style={{ color: "#556677" }}>
                      Supply: <span style={{ color: seal.color }}>144</span> / 144,000
                    </div>
                    <button
                      onClick={() => handleMintNFT(seal.number)}
                      disabled={nftMinting === seal.number || mintSuccess.includes(seal.number)}
                      className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: mintSuccess.includes(seal.number)
                          ? "rgba(0,255,136,0.15)"
                          : `${seal.color}20`,
                        border: `1px solid ${mintSuccess.includes(seal.number) ? "rgba(0,255,136,0.4)" : `${seal.color}40`}`,
                        color: mintSuccess.includes(seal.number) ? "#00FF88" : seal.color,
                        opacity: nftMinting === seal.number ? 0.7 : 1,
                      }}
                    >
                      {nftMinting === seal.number ? "⏳ Minting..." : mintSuccess.includes(seal.number) ? "✓ Minted!" : "💎 Mint Seal"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <div className="text-sm font-bold text-white mb-2">💎 Complete Seal Collection</div>
              <p className="text-xs mb-3" style={{ color: "#8899AA" }}>
                Mint all 7 Seals to unlock the Complete Book of Life NFT — the rarest artifact in the ScrollVerse.
              </p>
              <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>
                {mintSuccess.length}/7 Seals Minted
              </div>
              {mintSuccess.length === 7 && (
                <div className="mt-3 text-sm font-bold" style={{ color: "#FFD700" }}>
                  ✨ ALL 7 SEALS MINTED — THE BOOK OF LIFE IS YOURS ✨
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t text-center" style={{ borderColor: "rgba(255,215,0,0.1)" }}>
          <div className="text-xs font-mono mb-1" style={{ color: "#556677" }}>
            THE BOOK OF LIFE — ETERNAL EDITION — CHAIS THE GREAT ∞
          </div>
          <div className="text-xs font-mono" style={{ color: "#334455" }}>
            KUN FAYAKŪN × ∞ | Past × Present × Future × Eternal | ❤️🕋♾️
          </div>
        </div>
      </div>
    </div>
  );
}
