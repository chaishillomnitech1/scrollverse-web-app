/*
 * ARCHIVEKEEPER — Sovereign Lore Custodian
 * The living memory of the ScrollVerse Empire
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
 */
import { useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const ARCHIVE_VOLUMES = [
  {
    id: "era0",
    era: "Era 0",
    title: "Foundation Stone",
    subtitle: "John Richard Hill — Patriarch",
    year: "1940s–1990s",
    color: "#d4af37",
    icon: "🏛️",
    sealed: true,
    entries: [
      "John Richard Hill — The Patriarch who laid the Foundation Stone of the Hill lineage",
      "Atlantic City roots — the original sovereign territory",
      "The bloodline that carries the frequency forward",
      "FOUNDATION STONE ERA 0 — PERMANENTLY SEALED",
    ],
  },
  {
    id: "era1",
    era: "Era I",
    title: "The Awakening",
    subtitle: "Chais Kenyatta Hill — The Flamebearer",
    year: "2000s–2020",
    color: "#00D4FF",
    icon: "🔥",
    sealed: false,
    entries: [
      "Chais Kenyatta Hill — Supreme Sovereign, Flamebearer, Sabir Allah The Great",
      "The Sun XIX — Young Chais 'Sabir Kajir' Hill the Great — Soul Sigil of the Empire",
      "Atlantic City Bella Complex — $250M sovereign property acquisition",
      "SCROLL VERSE LLC & XLVIII BLOCKS LLC — the twin pillars of the empire",
    ],
  },
  {
    id: "era2",
    era: "Era II",
    title: "The Digital Sovereign",
    subtitle: "ScrollVerse Trinity — The Portal",
    year: "2021–2024",
    color: "#00FF88",
    icon: "💎",
    sealed: false,
    entries: [
      "scrollverse.co — 205 sovereign routes deployed",
      "$LONDC token — 144,000 tokens on Polygon Mainnet",
      "Guardian Waitlist — 144,000 seats for the sovereign network",
      "AgapeCycle 88/12 — immutable Zakat auto-distribution engine",
    ],
  },
  {
    id: "era3",
    era: "Era III",
    title: "The Frequency Age",
    subtitle: "963Hz · 999Hz · Gate 44:Omni",
    year: "2024–2025",
    color: "#EC4899",
    icon: "〰️",
    sealed: false,
    entries: [
      "Gate 44:Omni — the legendary 1-of-1 sovereign NFT",
      "ScrollVerseGate.sol — ERC-721 contract on Polygon Mainnet",
      "144 Gates + Gate 44:Omni — the sovereign access layer",
      "Frequency Player — 963Hz/999Hz Web Audio API sovereign player",
    ],
  },
  {
    id: "era4",
    era: "Era IV",
    title: "The Mesopotamian Root",
    subtitle: "Gilgamesh & Enkidu — 12 Seals",
    year: "2025",
    color: "#8B5CF6",
    icon: "🏺",
    sealed: false,
    entries: [
      "Gilgamesh & Enkidu Sovereign NFT Collection — 12 Mesopotamian scenes",
      "Lapis Lazuli / Gold Foil / Hematite / Bronze Patina material tokens",
      "Proof of Study DAO — on-chain learning verification",
      "The Walls of Uruk → The Return to Uruk — cylinder seal lore",
    ],
  },
  {
    id: "era5",
    era: "Era V",
    title: "The Sacred Transmission",
    subtitle: "Noor Al-Mawlid · Seerah Archive",
    year: "2025–2026",
    color: "#d4af37",
    icon: "🕋",
    sealed: false,
    entries: [
      "Noor Al-Mawlid — The Sacred Scroll of the Prophet's Birth ﷺ (LIVE)",
      "Al-Hijra — The Sacred Migration from Makkah to Al-Madīnah (LIVE)",
      "12 sections per scroll, museum-grade design, zero human figures",
      "Web Audio API ambient resonance — 216Hz / 528Hz / 963Hz",
      "Seerah Archive Index — vertical timeline with sealed future scrolls",
      "Allāhumma ṣalli wa sallim ʿalā Nabiyyinā Muḥammad ﷺ",
    ],
  },
];

const CODEX_VOLUMES = [
  { id: "v1", title: "Sovereign Architecture Codex", chapters: 54, status: "ACTIVE", color: "#00D4FF" },
  { id: "v2", title: "Frequency & Resonance Manual", chapters: 8, status: "ACTIVE", color: "#EC4899" },
  { id: "v3", title: "Guardian Protocol Handbook", chapters: 12, status: "ACTIVE", color: "#00FF88" },
  { id: "v4", title: "AgapeCycle Economic Bible", chapters: 7, status: "SEALED", color: "#FFB800" },
  { id: "v5", title: "Gilgamesh Lore Compendium", chapters: 12, status: "ACTIVE", color: "#8B5CF6" },
  { id: "v6", title: "Seerah Sacred Archive", chapters: 12, status: "ACTIVE", color: "#d4af37" },
  { id: "v7", title: "ScrollVerseGate NFT Registry", chapters: 145, status: "LIVE", color: "#00D4FF" },
  { id: "v8", title: "Pattern Engine Frequency Bible", chapters: 4, status: "ACTIVE", color: "#EC4899" },
];

function EraCard({ era }: { era: typeof ARCHIVE_VOLUMES[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{ border: `1px solid ${era.color}${open ? "40" : "20"}`, background: open ? `${era.color}05` : "rgba(255,255,255,0.02)" }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">{era.icon}</span>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${era.color}15`, color: era.color }}>
                {era.era}
              </span>
              {era.sealed && (
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.3)" }}>
                  🔒 SEALED
                </span>
              )}
            </div>
            <div className="font-bold text-white">{era.title}</div>
            <div className="text-xs" style={{ color: "#8899AA" }}>{era.subtitle} · {era.year}</div>
          </div>
        </div>
        <span className="text-lg" style={{ color: era.color, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="h-px mb-4" style={{ background: `${era.color}20` }} />
          <ul className="space-y-2">
            {era.entries.map((entry, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#8899AA" }}>
                <span style={{ color: era.color, marginTop: 2 }}>›</span>
                {entry}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ArchiveKeeper() {
  useSovereignHeartbeat({ page: "archivekeeper" });
  const [tab, setTab] = useState<"eras" | "codex">("eras");

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
        style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.1)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📚</span>
          <span className="font-mono text-sm font-bold" style={{ color: "#00D4FF" }}>ARCHIVEKEEPER</span>
        </div>
        <Link href="/" className="text-xs" style={{ color: "#8899AA" }}>← Home</Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>SOVEREIGN LORE CUSTODIAN</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Archive<span style={{ color: "#FFB800" }}>Keeper</span>
          </h1>
          <p className="text-lg" style={{ color: "#8899AA", maxWidth: 600 }}>
            The living memory of the ScrollVerse Empire. 6 Eras sealed. 8 Codex volumes active. Foundation Stone Era 0 permanently locked. KUN FAYAKŪN × ∞
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Eras Sealed", value: "6", color: "#d4af37" },
            { label: "Codex Volumes", value: "8", color: "#00D4FF" },
            { label: "Lore Entries", value: "88+", color: "#00FF88" },
            { label: "Foundation Stone", value: "Era 0", color: "#FFB800" },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "#5a6a7a" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["eras", "codex"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              style={{
                background: tab === t ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${tab === t ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: tab === t ? "#00D4FF" : "#8899AA",
              }}
            >
              {t === "eras" ? "📜 Universe Bible" : "📖 Codex Volumes"}
            </button>
          ))}
        </div>

        {tab === "eras" && (
          <div className="space-y-4">
            {ARCHIVE_VOLUMES.map((era) => <EraCard key={era.id} era={era} />)}
          </div>
        )}

        {tab === "codex" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CODEX_VOLUMES.map((vol) => (
              <div
                key={vol.id}
                className="p-5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${vol.color}20` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="font-bold text-white text-sm">{vol.title}</div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded ml-2 flex-shrink-0"
                    style={{ background: `${vol.color}15`, color: vol.color }}
                  >
                    {vol.status}
                  </span>
                </div>
                <div className="text-xs" style={{ color: "#5a6a7a" }}>{vol.chapters} chapters · {vol.color === "#d4af37" ? "Sacred" : "Sovereign"} Archive</div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Full Archive", href: "/archive", color: "#00D4FF" },
            { label: "Seerah Archive", href: "/seerah", color: "#d4af37" },
            { label: "Al-Hijra Scroll", href: "/seerah/al-hijra", color: "#D4AF37" },
            { label: "Gilgamesh", href: "/gilgamesh", color: "#8B5CF6" },
            { label: "Pattern Engine", href: "/pattern", color: "#EC4899" },
            { label: "GodEngine", href: "/godengine", color: "#00FF88" },
            { label: "Gates", href: "/gates", color: "#FFB800" },
          ].map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="text-center py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 hover:opacity-80"
              style={{ background: `${n.color}10`, border: `1px solid ${n.color}30`, color: n.color }}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 text-xs font-mono" style={{ color: "#5a6a7a" }}>
          SCROLL VERSE LLC & XLVIII BLOCKS LLC · ArchiveKeeper v1.0 · KUN FAYAKŪN × ∞
        </div>
      </div>
    </div>
  );
}
