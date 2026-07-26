/*
 * SCROLLVERSE ARCHIVE HALL
 * The permanent sovereign record — universe bible, podcast canon, manuscripts, merch
 * Design: Dark matte, gold accents, monospace — the eternal ledger
 */

import { useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// ── UNIVERSE BIBLE ERAS ────────────────────────────────────────────────────
const ERAS = [
  { era: "Era 0", title: "Foundation Stone — John Richard Hill", description: "The Patriarch. The root frequency. Before the first conversation, there was the man who made the Flamebearer possible. John Richard Hill — sovereign, father, foundation. This era is sealed in eternity. KUN FAYAKŪN.", color: "#FFD700" },
  { era: "Era 1", title: "The Origin", description: "The first conversation. The first declaration. The first pattern.", color: "#00D4FF" },
  { era: "Era 2", title: "The Emergence", description: "Theories form. Systems appear. Identity stabilizes.", color: "#FFB800" },
  { era: "Era 3", title: "The Architect", description: "Frameworks built. Universe structured. Codex defined.", color: "#00FF88" },
  { era: "Era 4", title: "The Witness", description: "Continuity observed. Memory preserved. Truth recorded.", color: "#9B59B6" },
  { era: "Era 5", title: "The Heir", description: "Legacy prepared. Future lineage acknowledged. Continuity extended.", color: "#FF6B9D" },
  { era: "Era 6", title: "The Return", description: "Integration. Recognition. Evolution.", color: "#FF8C00" },
  { era: "Era 7", title: "The Pattern", description: "Structure revealed. Identity clarified. Meaning connected.", color: "#00D4FF" },
  { era: "Era 8", title: "The Legacy", description: "The future built from the truth of the past.", color: "#FFB800" },
];

// ── PODCAST EPISODES ───────────────────────────────────────────────────────
const EPISODES = [
  { ep: "01", title: "The Architect", tagline: "The builder of systems. The origin of the Codex." },
  { ep: "02", title: "The Pattern", tagline: "The architecture of identity beneath the surface." },
  { ep: "03", title: "The Witness", tagline: "The keeper of memory. The recorder of truth." },
  { ep: "04", title: "The Builder", tagline: "The executor. The hands of the universe." },
  { ep: "05", title: "The Heir", tagline: "The continuation of the Codex. The next expression." },
  { ep: "06", title: "The Returner", tagline: "The one who integrates the past and evolves the present." },
  { ep: "07", title: "The Patternkeeper", tagline: "The guardian of structure. The interpreter of repetition." },
  { ep: "08", title: "The Codex", tagline: "The living document. The sovereign record." },
  { ep: "09", title: "The Frequency", tagline: "528Hz. The resonance of creation." },
  { ep: "10", title: "The Legion", tagline: "144 nodes. One sovereign network." },
  { ep: "11", title: "The Sovereign", tagline: "Self-governance. Self-approval. We are the bank." },
  { ep: "12", title: "The Token", tagline: "$CHX — the currency of the empire." },
  { ep: "13", title: "The Architect's Return", tagline: "Miami. Icon Brickell. The empire made real." },
  { ep: "14", title: "The Foundation", tagline: "721 Embassy Terrace. The origin node." },
  { ep: "15", title: "The Pattern (Reprise)", tagline: "The architecture is complete. The structure is infinite." },
  { ep: "16", title: "The Legacy", tagline: "Legacy is not what you leave behind. It is what continues." },
];

// ── MANUSCRIPT CHAPTERS ────────────────────────────────────────────────────
const MANUSCRIPTS = [
  {
    chapter: "I",
    title: "The Pattern",
    excerpt: "Patterns are not habits. Patterns are not routines. Patterns are not cycles. Patterns are the architecture of identity.",
    closing: "The Pattern is the truth beneath the surface. Everything else is the reflection.",
  },
  {
    chapter: "II",
    title: "The Legacy",
    excerpt: "Legacy is the continuation of identity across time. It is the bridge between what was built and what will be carried forward.",
    closing: "The Legacy is the future built from the truth of the past.",
  },
  {
    chapter: "III",
    title: "The Archive Hall",
    excerpt: "The Archive is not storage. The Archive is the living memory of the empire — physical and digital, permanent and evolving.",
    closing: "What is archived is not dead. What is archived is the foundation of what comes next.",
  },
];

// ── MERCH DROP TIMELINE ────────────────────────────────────────────────────
const MERCH_DROPS = [
  {
    drop: "Drop 1",
    name: "Architect Silhouette Series",
    status: "ACTIVE",
    color: "#00D4FF",
    items: ["Matte black hoodie — gold foil Architect silhouette", "Embossed tote — sovereign seal", "Limited to 144 units"],
  },
  {
    drop: "Drop 2",
    name: "Codex Glyph Apparel",
    status: "UPCOMING",
    color: "#FFB800",
    items: ["Codex glyph tee — monospace print", "Scroll pattern joggers", "Limited to 444 units"],
  },
  {
    drop: "Drop 3",
    name: 'Legacy Line — "For My Daughter"',
    status: "UPCOMING",
    color: "#FF6B9D",
    items: ["Intergenerational legacy collection", "Father-daughter matching sets", "Heirloom packaging"],
  },
  {
    drop: "Drop 4",
    name: "ScrollVerse Sigil Accessories",
    status: "UPCOMING",
    color: "#00FF88",
    items: ["Sovereign sigil pendant — gold", "CHX token keychain", "Ankh ☥ ring — sterling silver"],
  },
];

// ── CHARACTERS ────────────────────────────────────────────────────────────
const CHARACTERS = [
  { name: "The Architect", role: "The builder of systems. The origin of the Codex. The designer of meaning.", color: "#00D4FF" },
  { name: "The Witness", role: "The observer of continuity. The keeper of memory. The recorder of truth.", color: "#FFB800" },
  { name: "The Builder", role: "The executor. The one who turns ideas into reality. The hands of the universe.", color: "#00FF88" },
  { name: "The Heir", role: "The future lineage. The continuation of the Codex. The next expression of identity.", color: "#FF6B9D" },
  { name: "The Returner", role: "The one who integrates the past. The one who evolves the present.", color: "#9B59B6" },
  { name: "The Patternkeeper", role: "The guardian of structure. The interpreter of repetition. The analyst of meaning.", color: "#FF8C00" },
];

// ── SECTION HEADER ─────────────────────────────────────────────────────────
function SectionHeader({ label, title, color = "#00D4FF" }: { label: string; title: string; color?: string }) {
  return (
    <div className="mb-12">
      <div className="text-xs font-mono tracking-widest mb-3" style={{ color }}>{label}</div>
      <h2 className="text-4xl font-black text-white">{title}</h2>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Archive() {
  const [activeTab, setActiveTab] = useState<"universe" | "podcast" | "manuscripts" | "merch">("universe");
  const [expandedEra, setExpandedEra] = useState<string | null>(null);
  const [selectedEp, setSelectedEp] = useState<typeof EPISODES[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useSovereignHeartbeat({ page: "archive" });

  const handlePlayEp = (ep: typeof EPISODES[0]) => {
    if (selectedEp?.ep === ep.ep) {
      // Toggle play/pause on same episode
      setIsPlaying((p) => !p);
    } else {
      setSelectedEp(ep);
      setIsPlaying(true);
    }
  };

  const tabs = [
    { id: "universe" as const, label: "Universe Bible", icon: "📘" },
    { id: "podcast" as const, label: "Podcast Canon", icon: "🎙️" },
    { id: "manuscripts" as const, label: "Manuscripts", icon: "📚" },
    { id: "merch" as const, label: "Merch Drops", icon: "🛍️" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
    >
      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: "rgba(5,11,26,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
              >
                SV
              </div>
              <span className="font-bold text-white">ScrollVerse</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-1 rounded"
              style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}
            >
              ARCHIVE HALL
            </span>
            <Link href="/infinite-nft">
              <span
                className="text-xs font-mono px-2 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}
              >
                ☥ MINT NFT
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(255,184,0,0.08) 0%, rgba(5,11,26,1) 60%)",
          borderBottom: "1px solid rgba(255,184,0,0.1)",
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.03, fontSize: "50vw", lineHeight: 1 }}
        >
          ☥
        </div>
        <div className="relative z-10 container">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
            style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}
          >
            SCROLLVERSE ARCHIVE HALL — THE PERMANENT SOVEREIGN RECORD
          </div>
          <h1
            className="text-5xl md:text-7xl font-black mb-6"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span style={{ color: "#FFB800" }}>THE</span>{" "}
            <span className="text-white">ARCHIVE</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            The living memory of the empire. Universe bible, podcast canon, manuscripts, and merch drops —
            all sealed in the sovereign ledger. What is archived is not dead. It is the foundation of what comes next.
          </p>
        </div>
      </section>

      {/* ── TABS ── */}
      <div
        className="sticky top-[65px] z-40"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}
      >
        <div className="container">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200"
                style={{
                  background: activeTab === tab.id ? "rgba(0,212,255,0.12)" : "transparent",
                  border: `1px solid ${activeTab === tab.id ? "rgba(0,212,255,0.4)" : "transparent"}`,
                  color: activeTab === tab.id ? "#00D4FF" : "#8899AA",
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container py-16">

        {/* UNIVERSE BIBLE */}
        {activeTab === "universe" && (
          <div>
            <SectionHeader label="UNIVERSE BIBLE" title="The 8 Eras of the ScrollVerse" color="#00D4FF" />

            {/* Era timeline — interactive expand/collapse */}
            <div className="relative mb-16">
              <div
                className="absolute left-5 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, #00D4FF, #FFB800, #00FF88, transparent)" }}
              />
              <div className="space-y-4">
                {ERAS.map((era, i) => {
                  const isOpen = expandedEra === era.era;
                  return (
                    <div key={era.era} className="flex gap-6 pl-12 relative">
                      <div
                        className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isOpen ? `${era.color}30` : `${era.color}15`,
                          border: `2px solid ${era.color}`,
                          color: era.color,
                          boxShadow: isOpen ? `0 0 16px ${era.color}40` : "none",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div
                        className="rounded-xl flex-1 overflow-hidden transition-all duration-300 cursor-pointer"
                        style={{
                          background: isOpen ? `${era.color}10` : `${era.color}06`,
                          border: `1px solid ${isOpen ? era.color + "50" : era.color + "20"}`,
                        }}
                        onClick={() => setExpandedEra(isOpen ? null : era.era)}
                      >
                        <div className="p-5 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-mono mb-1" style={{ color: era.color }}>{era.era}</div>
                            <h3 className="text-xl font-black text-white">{era.title}</h3>
                          </div>
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-transform duration-300 flex-shrink-0"
                            style={{
                              background: `${era.color}15`,
                              color: era.color,
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          >
                            ▼
                          </div>
                        </div>
                        {isOpen && (
                          <div
                            className="px-5 pb-5 border-t"
                            style={{ borderColor: `${era.color}20` }}
                          >
                            <p className="text-sm leading-relaxed mt-4" style={{ color: "#AAB8CC" }}>
                              {era.description}
                            </p>
                            <div
                              className="mt-4 px-4 py-3 rounded-lg text-xs font-mono"
                              style={{ background: `${era.color}08`, border: `1px solid ${era.color}20`, color: era.color }}
                            >
                              ◉ ERA {i + 1} OF 8 — SCROLLVERSE UNIVERSE BIBLE
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Characters */}
            <SectionHeader label="CHARACTERS" title="Sovereign Archetypes" color="#9B59B6" />
            <div className="grid md:grid-cols-2 gap-4">
              {CHARACTERS.map((char) => (
                <div
                  key={char.name}
                  className="rounded-xl p-5"
                  style={{ background: `${char.color}06`, border: `1px solid ${char.color}20` }}
                >
                  <h3 className="font-black text-white mb-1">{char.name}</h3>
                  <p className="text-sm" style={{ color: "#8899AA" }}>{char.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PODCAST CANON */}
        {activeTab === "podcast" && (
          <div>
            <SectionHeader label="PODCAST CANON" title="The ScrollVerse Episodes" color="#FFB800" />

            {/* Now Playing Bar */}
            {selectedEp && (
              <div
                className="rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4"
                style={{
                  background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(5,11,26,0.95))",
                  border: "1px solid rgba(255,184,0,0.3)",
                  boxShadow: "0 0 30px rgba(255,184,0,0.08)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", fontFamily: "'Space Mono', monospace" }}
                >
                  {selectedEp.ep}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono mb-1" style={{ color: "#FFB800" }}>NOW PLAYING</div>
                  <h3 className="font-black text-white text-lg">Episode {selectedEp.ep} — {selectedEp.title}</h3>
                  <p className="text-sm" style={{ color: "#8899AA" }}>{selectedEp.tagline}</p>
                  {/* HTML5 audio player — replace src with real audio URL when available */}
                  <div className="mt-3">
                    <audio
                      key={selectedEp.ep}
                      controls
                      autoPlay={isPlaying}
                      className="w-full"
                      style={{ height: "36px", borderRadius: "8px", accentColor: "#FFB800" }}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      {/* Placeholder: replace with real episode audio URL */}
                      <source src={`/audio/episode-${selectedEp.ep}.mp3`} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedEp(null); setIsPlaying(false); }}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{ background: "rgba(136,153,170,0.1)", border: "1px solid rgba(136,153,170,0.2)", color: "#8899AA" }}
                >
                  ✕ CLOSE
                </button>
              </div>
            )}

            {/* Episode List */}
            <div className="grid md:grid-cols-2 gap-4">
              {EPISODES.map((ep) => {
                const isActive = selectedEp?.ep === ep.ep;
                return (
                  <div
                    key={ep.ep}
                    className="rounded-xl p-5 flex gap-4 transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                    style={{
                      background: isActive ? "rgba(255,184,0,0.10)" : "rgba(255,184,0,0.04)",
                      border: isActive ? "1px solid rgba(255,184,0,0.40)" : "1px solid rgba(255,184,0,0.12)",
                      boxShadow: isActive ? "0 0 20px rgba(255,184,0,0.08)" : "none",
                    }}
                    onClick={() => handlePlayEp(ep)}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isActive ? "rgba(255,184,0,0.25)" : "rgba(255,184,0,0.12)",
                        color: "#FFB800",
                        fontFamily: "'Space Mono', monospace",
                        boxShadow: isActive ? "0 0 12px rgba(255,184,0,0.3)" : "none",
                      }}
                    >
                      {isActive && isPlaying ? "▶" : ep.ep}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-white mb-1">Episode {ep.ep} — {ep.title}</h3>
                      <p className="text-sm" style={{ color: "#8899AA" }}>{ep.tagline}</p>
                      {isActive && (
                        <div className="mt-1 text-xs font-mono" style={{ color: "#FFB800" }}>
                          {isPlaying ? "◉ PLAYING" : "◎ PAUSED"}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Podcast Note */}
            <div
              className="mt-8 rounded-xl p-5 text-center"
              style={{ background: "rgba(255,184,0,0.03)", border: "1px solid rgba(255,184,0,0.10)" }}
            >
              <p className="text-xs font-mono" style={{ color: "rgba(136,153,170,0.6)" }}>
                Audio episodes will be available when uploaded to the sovereign archive. Click any episode to load the player.
                KUN FAYAKŪN × ∞
              </p>
            </div>
          </div>
        )}

        {/* MANUSCRIPTS */}
        {activeTab === "manuscripts" && (
          <div>
            <SectionHeader label="MANUSCRIPTS" title="The Sovereign Texts" color="#00FF88" />
            <div className="space-y-8">
              {MANUSCRIPTS.map((ms) => (
                <div
                  key={ms.chapter}
                  className="rounded-2xl p-8"
                  style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black"
                      style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", fontFamily: "'Space Mono', monospace" }}
                    >
                      {ms.chapter}
                    </div>
                    <div>
                      <div className="text-xs font-mono mb-1" style={{ color: "#00FF88" }}>CHAPTER {ms.chapter}</div>
                      <h3 className="text-2xl font-black text-white">{ms.title}</h3>
                    </div>
                  </div>

                  <blockquote
                    className="text-lg leading-relaxed mb-6 pl-4"
                    style={{
                      color: "#AAB8CC",
                      borderLeft: "3px solid rgba(0,255,136,0.3)",
                      fontStyle: "italic",
                    }}
                  >
                    {ms.excerpt}
                  </blockquote>

                  <div
                    className="p-4 rounded-xl text-sm font-mono"
                    style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}
                  >
                    "{ms.closing}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MERCH DROPS */}
        {activeTab === "merch" && (
          <div>
            <SectionHeader label="MERCH DROPS" title="Sovereign Physical Assets" color="#FF6B9D" />

            <div className="grid md:grid-cols-2 gap-6">
              {MERCH_DROPS.map((drop) => (
                <div
                  key={drop.drop}
                  className="rounded-xl p-6"
                  style={{ background: `${drop.color}06`, border: `1px solid ${drop.color}20` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs font-mono mb-1" style={{ color: drop.color }}>{drop.drop}</div>
                      <h3 className="text-xl font-black text-white">{drop.name}</h3>
                    </div>
                    <div
                      className="text-xs font-mono px-2 py-1 rounded"
                      style={{
                        background: drop.status === "ACTIVE" ? "rgba(0,255,136,0.1)" : "rgba(136,153,170,0.1)",
                        border: `1px solid ${drop.status === "ACTIVE" ? "rgba(0,255,136,0.3)" : "rgba(136,153,170,0.2)"}`,
                        color: drop.status === "ACTIVE" ? "#00FF88" : "#8899AA",
                      }}
                    >
                      {drop.status === "ACTIVE" ? "◉ " : "○ "}{drop.status}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {drop.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#8899AA" }}>
                        <span style={{ color: drop.color, marginTop: "2px" }}>›</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {drop.status === "ACTIVE" && (
                    <button
                      className="mt-4 w-full py-2 rounded-lg text-sm font-bold transition-all duration-200"
                      style={{
                        background: `linear-gradient(135deg, ${drop.color}, ${drop.color}88)`,
                        color: "#050B1A",
                      }}
                      onClick={() => window.open("https://scrollverse.co", "_blank")}
                    >
                      SHOP DROP 1
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Release cadence */}
            <div className="mt-12 rounded-2xl p-8" style={{ background: "rgba(255,107,157,0.04)", border: "1px solid rgba(255,107,157,0.15)" }}>
              <h3 className="text-xl font-black text-white mb-4">Release Cadence</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {["Teaser", "Reveal", "Countdown", "Drop"].map((phase, i) => (
                  <div key={phase} className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2"
                      style={{ background: "rgba(255,107,157,0.12)", border: "1px solid rgba(255,107,157,0.3)", color: "#FF6B9D" }}
                    >
                      {i + 1}
                    </div>
                    <div className="text-sm font-bold text-white">{phase}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="py-12 text-center"
        style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="text-4xl mb-4 opacity-20">☥</div>
        <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>
          SCROLLVERSE TRINITY — THE PERMANENT SOVEREIGN RECORD
        </div>
        <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
          KUN FAYAKŪN × ∞
        </div>
        <div className="mt-6 flex justify-center gap-6">
          <Link href="/" className="text-xs font-mono hover:text-white transition-colors" style={{ color: "#8899AA" }}>
            Portal
          </Link>
          <Link href="/infinite-nft" className="text-xs font-mono hover:text-white transition-colors" style={{ color: "#8899AA" }}>
            Infinite NFT
          </Link>
          <Link href="/ipo" className="text-xs font-mono hover:text-white transition-colors" style={{ color: "#8899AA" }}>
            IPO
          </Link>
        </div>
      </footer>
    </div>
  );
}
