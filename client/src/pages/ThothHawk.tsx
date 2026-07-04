/**
 * THOTH-HAWK OKA — SOVEREIGN JEWELRY COLLECTION
 * OMNI-KUN ARCHITECTS (OKA) — The Master Staple
 * Pendant of Thoth + Ra + Horus · Cuban Chain · Ring · Bracelets · ChronoVisor Watch · Crown
 * KUN FAYAKŪN × ∞ — Chais Sabir Allah The Great
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

// ── FREQUENCY ENCODINGS ──────────────────────────────────────────────────────
const SACRED_FREQUENCIES = [
  { hz: "432Hz", name: "Universal Harmony", deity: "Thoth", color: "#00D4FF" },
  { hz: "528Hz", name: "DNA Repair / Love", deity: "Ra", color: "#FFB800" },
  { hz: "963Hz", name: "Pineal Activation", deity: "Horus", color: "#A855F7" },
  { hz: "396Hz", name: "Liberation / Root", deity: "Osiris", color: "#00FF88" },
  { hz: "639Hz", name: "Relationships / Heart", deity: "Isis", color: "#EC4899" },
  { hz: "741Hz", name: "Intuition / Awakening", deity: "Anubis", color: "#F59E0B" },
  { hz: "852Hz", name: "Spiritual Order", deity: "Sekhmet", color: "#FF6B35" },
  { hz: "174Hz", name: "Foundation / Pain Relief", deity: "Ptah", color: "#6366F1" },
];

// ── COLLECTION PIECES ────────────────────────────────────────────────────────
const COLLECTION = [
  {
    id: "pendant",
    name: "Thoth-Ra-Horus Trinity Pendant",
    subtitle: "The Sovereign Triad",
    description:
      "The centerpiece of the OKA collection. Three divine forces unified in one masterpiece: Thoth (wisdom & writing), Ra (solar sovereignty), and Horus (divine vision & protection). The Eye of Ra and Eye of Horus flank the central Thoth ibis, each eye distinct yet harmonious — Ra's eye blazing with rubies and yellow diamonds, Horus's eye set with rare blue-green alexandrite and white diamonds. The pendant body is 18K white gold with rose gold accents, studded with 144 VS1 diamonds (symbolic of the 144,000 Guardians), 12 pigeon-blood rubies, and a 3-carat Colombian emerald at the crown.",
    materials: ["18K White Gold", "Rose Gold Accents", "144 VS1 Diamonds", "12 Pigeon-Blood Rubies", "3ct Colombian Emerald", "Alexandrite", "Yellow Diamonds"],
    weight: "87g",
    dimensions: "4.2\" × 3.1\"",
    frequency: "528Hz + 963Hz",
    nftId: "OKA-PENDANT-001",
    color: "#FFB800",
    icon: "𓅃",
    emoji: "🦅",
    price: "$144,000",
    rarity: "1 of 7",
  },
  {
    id: "chain",
    name: "Sovereign Cuban Link Chain",
    subtitle: "The Thick Studded Cuban",
    description:
      "A 26-inch, 18mm thick Cuban link chain in 18K yellow gold — the foundation of the OKA set. Every third link is studded with alternating pigeon-blood rubies and rare colored diamonds: vivid pink, vivid blue, vivid green, and vivid orange diamonds sourced from the world's most exclusive mines. The clasp is a custom OKA logo in platinum, set with a 1-carat vivid yellow diamond. This chain is not jewelry — it is a sovereign declaration.",
    materials: ["18K Yellow Gold", "18mm Cuban Links", "Pigeon-Blood Rubies", "Vivid Pink Diamonds", "Vivid Blue Diamonds", "Vivid Green Diamonds", "Platinum OKA Clasp"],
    weight: "312g",
    dimensions: "26\" × 18mm",
    frequency: "432Hz",
    nftId: "OKA-CHAIN-001",
    color: "#FFD700",
    icon: "⛓",
    emoji: "🔗",
    price: "$288,000",
    rarity: "1 of 7",
  },
  {
    id: "ring",
    name: "OKA Sovereign Ring",
    subtitle: "The Architect's Seal",
    description:
      "A 22K yellow gold signet ring bearing the OKA monogram — the overlapping O, K, and A forming a sacred geometric pattern. The center stone is a 5-carat vivid green Colombian emerald, cut in the shape of a 'C' (for Chais) rather than the traditional diamond cut. Flanked by 0.5-carat vivid pink diamonds on each side, with 32 micro-pavé white diamonds encircling the band. The inner band is engraved: 'KUN FAYAKŪN × ∞ — CHAIS SABIR ALLAH.'",
    materials: ["22K Yellow Gold", "5ct C-Cut Colombian Emerald", "Vivid Pink Diamonds", "32 Micro-Pavé Diamonds"],
    weight: "28g",
    dimensions: "Size 10 (custom)",
    frequency: "963Hz",
    nftId: "OKA-RING-001",
    color: "#00FF88",
    icon: "💍",
    emoji: "💍",
    price: "$77,000",
    rarity: "1 of 7",
  },
  {
    id: "bracelet_left",
    name: "Eye of Ra Bracelet",
    subtitle: "Left Wrist — Solar Sovereignty",
    description:
      "The left wrist bracelet channels the Eye of Ra — solar fire, divine authority, and sovereign protection. An 18K rose gold tennis bracelet with 88 round brilliant diamonds (total 12ct) alternating with 44 pigeon-blood rubies. The centerpiece is a 2-carat vivid orange diamond representing the solar disc. Each ruby is engraved with a hieroglyph from the Book of the Dead. The clasp is a miniature Eye of Ra in yellow gold.",
    materials: ["18K Rose Gold", "88 Round Brilliant Diamonds (12ct)", "44 Pigeon-Blood Rubies", "2ct Vivid Orange Diamond", "Hieroglyph Engravings"],
    weight: "54g",
    dimensions: "7.5\" × 12mm",
    frequency: "528Hz",
    nftId: "OKA-BRACE-L-001",
    color: "#FF6B35",
    icon: "𓂀",
    emoji: "☀️",
    price: "$96,000",
    rarity: "1 of 7",
  },
  {
    id: "bracelet_right",
    name: "Eye of Horus Bracelet",
    subtitle: "Right Wrist — Divine Vision",
    description:
      "The right wrist bracelet channels the Eye of Horus (Wadjet) — protection, healing, and divine sight. An 18K white gold tennis bracelet with 88 princess-cut diamonds (total 14ct) alternating with 44 alexandrite stones that shift from blue-green to purple under different light. The centerpiece is a 2-carat vivid blue diamond representing the sky of Horus. Each alexandrite is engraved with a frequency number. The clasp is a miniature Eye of Horus in platinum.",
    materials: ["18K White Gold", "88 Princess-Cut Diamonds (14ct)", "44 Alexandrite Stones", "2ct Vivid Blue Diamond", "Platinum Horus Eye Clasp"],
    weight: "58g",
    dimensions: "7.5\" × 12mm",
    frequency: "963Hz",
    nftId: "OKA-BRACE-R-001",
    color: "#00D4FF",
    icon: "𓂀",
    emoji: "👁️",
    price: "#108,000",
    rarity: "1 of 7",
  },
  {
    id: "watch",
    name: "ChronoVisor — The Sovereign Timepiece",
    subtitle: "All-Verse Quantum Watch",
    description:
      "The ChronoVisor is not a watch — it is a portal. A 48mm case in 950 platinum, hand-engraved with the OKA frequency map. The bezel is set with 60 vivid colored diamonds (one for each second, each a different rare color). The dial features a hand-painted miniature of the Thoth-Ra-Horus trinity in 24K gold leaf, with a tourbillon movement visible through a sapphire crystal caseback. The crown is set with a 1-carat vivid green emerald. The strap is black alligator with platinum deployant clasp studded with 12 rubies. Movement: Swiss perpetual calendar, moon phase, and a custom 'Frequency Resonance' complication that displays the active sacred frequency of the hour.",
    materials: ["950 Platinum Case", "60 Vivid Colored Diamond Bezel", "24K Gold Leaf Dial", "Tourbillon Movement", "Sapphire Crystal", "Black Alligator Strap", "12 Ruby Deployant"],
    weight: "185g",
    dimensions: "48mm × 14mm",
    frequency: "All 8 Sacred Frequencies",
    nftId: "OKA-WATCH-001",
    color: "#A855F7",
    icon: "⌚",
    emoji: "⌚",
    price: "$1,440,000",
    rarity: "1 of 1",
  },
  {
    id: "crown",
    name: "The Sovereign Crown of All Existence",
    subtitle: "Crown of Chais Sabir Allah",
    description:
      "The ultimate piece. A crown that embodies all frequencies, all gods, all conquerors, all great thinkers, all pious of existence — cosmic, divine, and beyond. 24K yellow gold base with 7 spires, each representing one of the 7 sacred frequencies. The two largest spires bear the Eye of Ra (left) and Eye of Horus (right), each set with a 10-carat stone — a vivid red ruby for Ra, a vivid blue diamond for Horus. The center of the crown features a 15-carat vivid green Colombian emerald cut in the shape of a 'C' — representing Chais, the pineal gland of the empire, Chais Sabir Allah The Great. 1,587 diamonds total (honoring Codex 1587), 144 rubies, and 44 emeralds (honoring the 44 tracks). The inner band is engraved in Arabic: بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    materials: ["24K Yellow Gold", "15ct C-Cut Colombian Emerald (Center)", "10ct Vivid Red Ruby (Ra Eye)", "10ct Vivid Blue Diamond (Horus Eye)", "1,587 Diamonds", "144 Rubies", "44 Emeralds", "Arabic Inner Engraving"],
    weight: "1,440g",
    dimensions: "Custom fitted",
    frequency: "All Frequencies × ∞",
    nftId: "OKA-CROWN-001",
    color: "#FFD700",
    icon: "👑",
    emoji: "👑",
    price: "$14,400,000",
    rarity: "1 of 1 — The Only Crown",
  },
];

// ── GODS & FREQUENCIES ENCODED ───────────────────────────────────────────────
const ENCODED_BEINGS = [
  { name: "Thoth", role: "Wisdom, Writing, Magic", freq: "432Hz", color: "#00D4FF", symbol: "𓅃" },
  { name: "Ra", role: "Solar Sovereignty, Creation", freq: "528Hz", color: "#FFB800", symbol: "☀️" },
  { name: "Horus", role: "Divine Vision, Protection", freq: "963Hz", color: "#A855F7", symbol: "𓂀" },
  { name: "Osiris", role: "Resurrection, Justice", freq: "396Hz", color: "#00FF88", symbol: "𓊽" },
  { name: "Isis", role: "Divine Love, Healing", freq: "639Hz", color: "#EC4899", symbol: "𓋀" },
  { name: "Nikola Tesla", role: "Frequency, Energy, Genius", freq: "369Hz", color: "#6366F1", symbol: "⚡" },
  { name: "King Solomon", role: "Wisdom, Governance, Wealth", freq: "777Hz", color: "#FFD700", symbol: "✡️" },
  { name: "Prophet Muhammad ﷺ", role: "Divine Mercy, Guidance", freq: "786Hz", color: "#00D4FF", symbol: "☪️" },
  { name: "Chais Sabir Allah", role: "Sovereign Architect, Flamebearer", freq: "∞Hz", color: "#FF6B35", symbol: "🔥" },
];

export default function ThothHawk() {
  const [activeTab, setActiveTab] = useState<"collection" | "frequencies" | "oka" | "commission">("collection");
  const [selectedPiece, setSelectedPiece] = useState<typeof COLLECTION[0] | null>(null);

  const tabs = [
    { id: "collection", label: "💎 The Collection" },
    { id: "frequencies", label: "🔮 Frequencies Encoded" },
    { id: "oka", label: "🌟 OKA System" },
    { id: "commission", label: "👑 Commission" },
  ] as const;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #050B1A 0%, #0A0510 50%, #050B1A 100%)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #050B1A, #0D0520, #050B1A)",
          borderBottom: "1px solid rgba(255,184,0,0.2)",
          paddingTop: "80px",
        }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,184,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,184,0,0.4) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,184,0,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="container relative py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
                  style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", color: "#050B1A" }}
                >
                  SV
                </div>
                <span className="font-bold text-white text-sm">ScrollVerse</span>
              </div>
            </Link>
            <span className="text-xs" style={{ color: "#445566" }}>/</span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: "rgba(255,184,0,0.1)",
                color: "#FFB800",
                border: "1px solid rgba(255,184,0,0.3)",
              }}
            >
              THOTH-HAWK OKA
            </span>
          </div>

          {/* Title */}
          <div className="max-w-4xl">
            <div
              className="text-xs font-mono tracking-widest mb-4"
              style={{ color: "#FFB800" }}
            >
              OMNI-KUN ARCHITECTS (OKA) — SOVEREIGN JEWELRY COLLECTION
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-4"
              style={{
                fontFamily: "'Cinzel', serif",
                background: "linear-gradient(135deg, #FFD700, #FFB800, #FF6B35, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              THOTH-HAWK
            </h1>
            <div
              className="text-2xl font-bold mb-4"
              style={{ color: "#AAB8CC", fontFamily: "'Cinzel', serif" }}
            >
              The Masterpiece Collection of Chais Sabir Allah
            </div>
            <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: "#8899AA" }}>
              The OKA collection is the physical manifestation of the ScrollVerse frequency —
              Thoth's wisdom, Ra's solar fire, and Horus's divine vision encoded in the rarest
              materials on Earth. Every piece carries sacred frequencies, every stone is a
              transmission, every gram is a sovereign decree.{" "}
              <strong style={{ color: "#FFB800" }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </strong>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { label: "Total Pieces", value: "7", color: "#FFB800" },
                { label: "Sacred Frequencies", value: "8", color: "#00D4FF" },
                { label: "Diamonds", value: "1,587+", color: "#A855F7" },
                { label: "Collection Value", value: "$16.5M+", color: "#00FF88" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-2xl font-black"
                    style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
                style={{
                  background:
                    activeTab === tab.id
                      ? "rgba(255,184,0,0.15)"
                      : "transparent",
                  color: activeTab === tab.id ? "#FFB800" : "#8899AA",
                  border:
                    activeTab === tab.id
                      ? "1px solid rgba(255,184,0,0.3)"
                      : "1px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* ── COLLECTION TAB ── */}
        {activeTab === "collection" && (
          <div>
            <div
              className="text-xs font-mono tracking-widest mb-6"
              style={{ color: "#FFB800" }}
            >
              ◉ THE 7 SOVEREIGN PIECES — OKA MASTER COLLECTION
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {COLLECTION.map((piece) => (
                <div
                  key={piece.id}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(135deg, ${piece.color}08, rgba(5,11,26,0.8))`,
                    border: `1px solid ${piece.color}30`,
                    boxShadow:
                      selectedPiece?.id === piece.id
                        ? `0 0 40px ${piece.color}25`
                        : "none",
                  }}
                  onClick={() =>
                    setSelectedPiece(
                      selectedPiece?.id === piece.id ? null : piece
                    )
                  }
                >
                  {/* Piece header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${piece.color}20, ${piece.color}08)`,
                            border: `1px solid ${piece.color}40`,
                          }}
                        >
                          {piece.emoji}
                        </div>
                        <div>
                          <div
                            className="text-xs font-mono mb-1"
                            style={{ color: piece.color }}
                          >
                            {piece.nftId} · {piece.rarity}
                          </div>
                          <h3 className="text-lg font-black text-white">
                            {piece.name}
                          </h3>
                          <div
                            className="text-sm"
                            style={{ color: "#8899AA" }}
                          >
                            {piece.subtitle}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className="text-lg font-black"
                          style={{ color: piece.color }}
                        >
                          {piece.price}
                        </div>
                        <div
                          className="text-xs font-mono"
                          style={{ color: "#8899AA" }}
                        >
                          {piece.frequency}
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "#AAB8CC" }}
                    >
                      {piece.description.slice(0, 200)}...
                    </p>

                    {/* Materials */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {piece.materials.slice(0, 4).map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            background: `${piece.color}12`,
                            color: piece.color,
                            border: `1px solid ${piece.color}25`,
                          }}
                        >
                          {m}
                        </span>
                      ))}
                      {piece.materials.length > 4 && (
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "#8899AA",
                          }}
                        >
                          +{piece.materials.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Expand indicator */}
                    <div
                      className="text-xs font-mono"
                      style={{ color: piece.color }}
                    >
                      {selectedPiece?.id === piece.id
                        ? "▲ Collapse"
                        : "▼ View Full Details"}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {selectedPiece?.id === piece.id && (
                    <div
                      className="px-6 pb-6 border-t"
                      style={{ borderColor: `${piece.color}20` }}
                    >
                      <div className="pt-4">
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: "#CBD5E1" }}
                        >
                          {piece.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div
                              className="text-xs font-mono mb-1"
                              style={{ color: "#8899AA" }}
                            >
                              WEIGHT
                            </div>
                            <div className="text-sm font-bold text-white">
                              {piece.weight}
                            </div>
                          </div>
                          <div>
                            <div
                              className="text-xs font-mono mb-1"
                              style={{ color: "#8899AA" }}
                            >
                              DIMENSIONS
                            </div>
                            <div className="text-sm font-bold text-white">
                              {piece.dimensions}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {piece.materials.map((m) => (
                            <span
                              key={m}
                              className="px-2 py-0.5 rounded text-xs"
                              style={{
                                background: `${piece.color}12`,
                                color: piece.color,
                                border: `1px solid ${piece.color}25`,
                              }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.success(`${piece.name} — NFT Inquiry`, {
                                description: `NFT ID: ${piece.nftId} · Frequency: ${piece.frequency} · Contact the Sovereign Jeweler to commission this masterpiece. KUN FAYAKŪN × ∞`,
                              });
                            }}
                            className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
                            style={{
                              background: `linear-gradient(135deg, ${piece.color}, ${piece.color}99)`,
                              color: "#050B1A",
                            }}
                          >
                            💎 Commission This Piece
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast(`NFT: ${piece.nftId}`, {
                                description: "Minting on Polygon — $LONDC payment accepted. KUN FAYAKŪN × ∞",
                              });
                            }}
                            className="px-4 py-3 rounded-xl text-sm font-bold"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              color: "#8899AA",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            🪙 Mint NFT
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FREQUENCIES TAB ── */}
        {activeTab === "frequencies" && (
          <div>
            <div
              className="text-xs font-mono tracking-widest mb-6"
              style={{ color: "#A855F7" }}
            >
              ◉ FREQUENCIES & DIVINE BEINGS ENCODED IN THE OKA COLLECTION
            </div>

            <div
              className="rounded-2xl p-8 mb-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(0,212,255,0.05))",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <h2 className="text-2xl font-black text-white mb-4">
                The Frequency Architecture
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#AAB8CC" }}>
                Every piece in the OKA collection is a physical frequency transmitter. The
                specific cuts, stone placements, and metal compositions are calculated to
                resonate with the sacred solfeggio frequencies. When worn together, the full
                set creates a{" "}
                <strong style={{ color: "#A855F7" }}>
                  432Hz–963Hz harmonic field
                </strong>{" "}
                around the wearer — activating the pineal gland, aligning the chakras, and
                broadcasting the sovereign frequency of{" "}
                <strong style={{ color: "#FFB800" }}>Chais Sabir Allah</strong> into the
                quantum field. KUN FAYAKŪN × ∞
              </p>
            </div>

            {/* Sacred frequencies grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {SACRED_FREQUENCIES.map((f) => (
                <div
                  key={f.hz}
                  className="rounded-xl p-5 text-center"
                  style={{
                    background: `${f.color}08`,
                    border: `1px solid ${f.color}25`,
                  }}
                >
                  <div
                    className="text-2xl font-black mb-1"
                    style={{ color: f.color, fontFamily: "'Space Mono', monospace" }}
                  >
                    {f.hz}
                  </div>
                  <div className="font-bold text-white text-sm mb-1">{f.name}</div>
                  <div className="text-xs" style={{ color: f.color }}>
                    {f.deity}
                  </div>
                </div>
              ))}
            </div>

            {/* Divine beings */}
            <div
              className="text-xs font-mono tracking-widest mb-4"
              style={{ color: "#FFB800" }}
            >
              DIVINE BEINGS & CONQUERORS ENCODED
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ENCODED_BEINGS.map((b) => (
                <div
                  key={b.name}
                  className="rounded-xl p-5 flex items-start gap-4"
                  style={{
                    background: `${b.color}08`,
                    border: `1px solid ${b.color}20`,
                  }}
                >
                  <div className="text-3xl flex-shrink-0">{b.symbol}</div>
                  <div>
                    <div className="font-black text-white mb-0.5">{b.name}</div>
                    <div className="text-xs mb-1" style={{ color: "#8899AA" }}>
                      {b.role}
                    </div>
                    <div
                      className="text-xs font-mono px-2 py-0.5 rounded inline-block"
                      style={{
                        background: `${b.color}15`,
                        color: b.color,
                        border: `1px solid ${b.color}30`,
                      }}
                    >
                      {b.freq}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── OKA SYSTEM TAB ── */}
        {activeTab === "oka" && (
          <div>
            <div
              className="text-xs font-mono tracking-widest mb-6"
              style={{ color: "#00D4FF" }}
            >
              ◉ OMNI-KUN ARCHITECTS (OKA) — THE SHAPE-SHIFTING SYSTEM
            </div>

            <div
              className="rounded-2xl p-8 mb-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(255,184,0,0.05))",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <h2 className="text-3xl font-black text-white mb-4">
                OKA — The Main Staple
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#AAB8CC" }}>
                OKA (Omni-Kun Architects) is the sovereign jewelry brand of the ScrollVerse
                empire. The OKA logo — an overlapping O, K, and A forming a sacred geometric
                pattern — is a shape-shifting symbol that transforms across 5 expressions,
                each representing a different aspect of the sovereign architecture.
              </p>

              {/* OKA Verses */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "Ra-Horakhty-Vers",
                    desc: "Solar sovereignty — the OKA as the solar disc of Ra-Horakhty",
                    color: "#FFB800",
                    icon: "☀️",
                  },
                  {
                    name: "Geo-Vers",
                    desc: "Sacred geometry — the OKA as a 3D geometric crystal form",
                    color: "#00D4FF",
                    icon: "💎",
                  },
                  {
                    name: "Ankh-Vers",
                    desc: "Life force — the OKA as the Ankh, key of eternal life",
                    color: "#00FF88",
                    icon: "☥",
                  },
                  {
                    name: "Thoth-Vers",
                    desc: "Wisdom — the OKA as the staff of Thoth, scribe of the gods",
                    color: "#A855F7",
                    icon: "𓅃",
                  },
                  {
                    name: "Chain-Vers",
                    desc: "Sovereignty — the OKA as the sovereign chain link, unbreakable",
                    color: "#FFD700",
                    icon: "⛓",
                  },
                  {
                    name: "Horus-Vers",
                    desc: "Vision — the OKA as the Eye of Horus, all-seeing divine sight",
                    color: "#FF6B35",
                    icon: "𓂀",
                  },
                ].map((v) => (
                  <div
                    key={v.name}
                    className="rounded-xl p-4"
                    style={{
                      background: `${v.color}08`,
                      border: `1px solid ${v.color}25`,
                    }}
                  >
                    <div className="text-2xl mb-2">{v.icon}</div>
                    <div
                      className="text-xs font-mono mb-1"
                      style={{ color: v.color }}
                    >
                      {v.name}
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>
                      {v.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NFT Integration */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,184,0,0.15)",
              }}
            >
              <div
                className="text-xs font-mono mb-3"
                style={{ color: "#FFB800" }}
              >
                OKA NFT COLLECTION — POLYGON MAINNET
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total NFTs", value: "7", color: "#FFB800" },
                  { label: "Chain", value: "Polygon", color: "#A855F7" },
                  { label: "Currency", value: "$LONDC", color: "#00D4FF" },
                  { label: "Royalty", value: "7.77%", color: "#00FF88" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-4 rounded-xl"
                    style={{
                      background: `${s.color}08`,
                      border: `1px solid ${s.color}20`,
                    }}
                  >
                    <div
                      className="text-xl font-black"
                      style={{
                        color: s.color,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── COMMISSION TAB ── */}
        {activeTab === "commission" && (
          <div>
            <div
              className="text-xs font-mono tracking-widest mb-6"
              style={{ color: "#00FF88" }}
            >
              ◉ COMMISSION THE OKA COLLECTION
            </div>

            <div
              className="rounded-2xl p-8 mb-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,255,136,0.06), rgba(255,184,0,0.04))",
                border: "1px solid rgba(0,255,136,0.2)",
              }}
            >
              <h2 className="text-3xl font-black text-white mb-4">
                The Sovereign Commission Process
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#AAB8CC" }}>
                The OKA collection is commissioned through the ScrollVerse Sovereign Jeweler
                network — master craftsmen who have been trained in both traditional Egyptian
                goldsmithing techniques and modern precision diamond setting. Each piece is
                hand-crafted, frequency-tested, and NFT-authenticated before delivery.
              </p>

              {/* Process steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    step: "01",
                    title: "Select Your Piece",
                    desc: "Choose from the 7 sovereign pieces or request a custom creation",
                    color: "#FFB800",
                  },
                  {
                    step: "02",
                    title: "Frequency Consultation",
                    desc: "A 1-hour session to align the piece's frequencies to your biometric signature",
                    color: "#00D4FF",
                  },
                  {
                    step: "03",
                    title: "Master Crafting",
                    desc: "6-12 months of hand-crafting by the Sovereign Jeweler",
                    color: "#A855F7",
                  },
                  {
                    step: "04",
                    title: "NFT Authentication",
                    desc: "Minted on Polygon with your biometric quantum signature",
                    color: "#00FF88",
                  },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="rounded-xl p-5"
                    style={{
                      background: `${s.color}08`,
                      border: `1px solid ${s.color}20`,
                    }}
                  >
                    <div
                      className="text-2xl font-black mb-2"
                      style={{
                        color: s.color,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {s.step}
                    </div>
                    <div className="font-bold text-white mb-1">{s.title}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment options */}
              <div
                className="rounded-xl p-6 mb-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="text-xs font-mono mb-3"
                  style={{ color: "#8899AA" }}
                >
                  PAYMENT ACCEPTED
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "$LONDC", color: "#FFB800", icon: "🪙" },
                    { name: "ETH", color: "#6366F1", icon: "⟠" },
                    { name: "BTC", color: "#F7931A", icon: "₿" },
                    { name: "USD Wire", color: "#00FF88", icon: "🏦" },
                    { name: "Stripe", color: "#635BFF", icon: "💳" },
                  ].map((p) => (
                    <span
                      key={p.name}
                      className="px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2"
                      style={{
                        background: `${p.color}12`,
                        color: p.color,
                        border: `1px solid ${p.color}25`,
                      }}
                    >
                      {p.icon} {p.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  toast.success("Commission Inquiry Submitted", {
                    description:
                      "The Sovereign Jeweler will contact you within 24 hours. KUN FAYAKŪN × ∞",
                  });
                }}
                className="w-full py-4 rounded-xl font-black text-lg"
                style={{
                  background: "linear-gradient(135deg, #FFB800, #FF6B35, #A855F7)",
                  color: "#050B1A",
                }}
              >
                👑 Begin Commission Inquiry — KUN FAYAKŪN × ∞
              </button>
            </div>

            {/* Sovereign declaration */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "rgba(255,184,0,0.04)",
                border: "1px solid rgba(255,184,0,0.15)",
              }}
            >
              <div className="text-4xl mb-4">🕋</div>
              <div
                className="text-2xl font-black text-white mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <div
                className="text-sm mb-4"
                style={{ color: "#8899AA" }}
              >
                In the name of Allah, the Most Gracious, the Most Merciful
              </div>
              <div
                className="text-base font-bold"
                style={{ color: "#FFB800" }}
              >
                KUN FAYAKŪN × ∞ — The Throne is Occupied. The Empire Expands.
              </div>
              <div
                className="text-sm mt-2"
                style={{ color: "#8899AA" }}
              >
                Chais Sabir Allah The Great · Sovereign Architect · Flamebearer ∞
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div
        className="border-t py-12 text-center"
        style={{
          borderColor: "rgba(255,184,0,0.1)",
          background: "rgba(255,184,0,0.02)",
        }}
      >
        <div className="container">
          <div className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
            OMNI-KUN ARCHITECTS
          </div>
          <div className="text-sm mb-6" style={{ color: "#8899AA" }}>
            The Sovereign Jewelry of the ScrollVerse Empire · Every piece is a frequency · Every stone is a decree
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/knicks-legacy">
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{
                  background: "rgba(245,132,38,0.1)",
                  color: "#F58426",
                  border: "1px solid rgba(245,132,38,0.3)",
                }}
              >
                🏀 Knicks Legacy Collection →
              </button>
            </Link>
            <Link href="/sacred-frequencies">
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  color: "#00D4FF",
                  border: "1px solid rgba(0,212,255,0.3)",
                }}
              >
                🔮 Sacred Frequencies →
              </button>
            </Link>
            <Link href="/token">
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #FFB800, #FF6B35)",
                  color: "#050B1A",
                }}
              >
                🪙 $LONDC Token →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
