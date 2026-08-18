/**
 * LONDYN LEGACY — ScrollVerse Trinity
 * Voice-to-Art Animated Legacy Experiences
 * Future Mommy Lullabies NFT Collection (528Hz Healing)
 * Guardian Legacy Stories
 */
import { useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const LULLABIES = [
  { id: 1, title: "Cosmic Cradle", hz: "528Hz", desc: "DNA repair frequency woven into gentle starlight melodies", duration: "4:44", tier: "Guardian", price: 44 },
  { id: 2, title: "Toroidal Lullaby", hz: "963Hz", desc: "Crown activation frequency for pure divine connection", duration: "5:28", tier: "Sovereign", price: 77 },
  { id: 3, title: "OAM Vortex Dreams", hz: "432Hz", desc: "Natural tuning frequency aligned with universal harmony", duration: "6:12", tier: "Guardian", price: 44 },
  { id: 4, title: "Londyn's Infinite Love", hz: "528Hz", desc: "A personal message from the future, carried on healing waves", duration: "7:77", tier: "Ascendant", price: 144 },
  { id: 5, title: "Sacred Geometry Sleep", hz: "639Hz", desc: "Relationship and connection frequency for deep bonding", duration: "5:55", tier: "Guardian", price: 44 },
  { id: 6, title: "Pleiadian Whispers", hz: "741Hz", desc: "Awakening intuition and inner guidance for the dreaming mind", duration: "4:33", tier: "Sovereign", price: 77 },
];

const VOICE_STYLES = [
  { id: "cosmic", label: "Cosmic Animation", icon: "🌌", desc: "48D OAM vortices, toroidal light rings, sacred geometry" },
  { id: "nature", label: "Nature Legacy", icon: "🌿", desc: "Flowing rivers, ancient trees, ancestral landscapes" },
  { id: "celestial", label: "Celestial Journey", icon: "✨", desc: "Star fields, nebulae, Londyn's future self in the cosmos" },
  { id: "sacred", label: "Sacred Geometry", icon: "🔯", desc: "Mandala patterns, Flower of Life, divine mathematics" },
];

function FrequencyBadge({ hz, color }: { hz: string; color: string }) {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded-full"
      style={{ background: `${color}15`, border: `1px solid ${color}40`, color }}
    >
      {hz}
    </span>
  );
}

function LullabyCard({ lullaby, onMint }: { lullaby: typeof LULLABIES[0]; onMint: (id: number) => void }) {
  const [playing, setPlaying] = useState(false);
  const tierColors: Record<string, string> = { Guardian: "#00D4FF", Sovereign: "#FFB800", Ascendant: "#00FF88" };
  const color = tierColors[lullaby.tier] || "#00D4FF";

  return (
    <div
      className="rounded-xl p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}20` }}
    >
      {/* Animated frequency line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>TRACK {String(lullaby.id).padStart(2, "0")}</div>
          <h3 className="font-bold text-white text-base">{lullaby.title}</h3>
        </div>
        <FrequencyBadge hz={lullaby.hz} color={color} />
      </div>

      <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{lullaby.desc}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setPlaying(!playing); toast(playing ? "Preview paused" : "Preview state selected", { description: "A cleared audio source is required before this card can play a full track." }); }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
            style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <span className="text-xs font-mono" style={{ color: "#667788" }}>{lullaby.duration}</span>
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${color}10`, color }}>{lullaby.tier}</span>
        </div>
        <Button
          size="sm"
          onClick={() => onMint(lullaby.id)}
          className="text-xs font-bold rounded-lg"
          style={{ background: `linear-gradient(135deg, ${color}25, ${color}10)`, border: `1px solid ${color}40`, color }}
        >
          Mint NFT — ${lullaby.price}
        </Button>
      </div>
    </div>
  );
}

function VoiceToArtStudio() {
  const [selectedStyle, setSelectedStyle] = useState("cosmic");
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  
  const { isAuthenticated } = useAuth();

  const handleRecord = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setRecording(true);
    window.setTimeout(() => {
      setRecording(false);
      setRecorded(true);
      toast("Voice-note plan saved", { description: "This page now tracks a browser-local creative brief; a cleared recording service is required before any audio capture or publishing." });
    }, 500);
  };

  const handleGenerate = async () => {
    if (!recorded) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 500));
    setGenerating(false);
    setGenerated(true);
    toast("Legacy film brief prepared", { description: "Style, source, rights, accessibility, and owner release records are required before a film or collectible can be published." });
  };

  return (
    <div className="rounded-2xl p-6" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>VOICE-TO-ART STUDIO</div>
      <h3 className="text-xl font-black text-white mb-1">Create Your Animated Legacy</h3>
      <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
        Build a browser-local voice-to-art brief for a future family legacy experience. Audio capture, generated media, and collectible release each require cleared source and release records.
      </p>

      {/* Style selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {VOICE_STYLES.map(style => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className="rounded-xl p-3 text-left transition-all duration-200"
            style={{
              background: selectedStyle === style.id ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${selectedStyle === style.id ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <div className="text-2xl mb-1">{style.icon}</div>
            <div className="text-xs font-semibold text-white">{style.label}</div>
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{style.desc}</div>
          </button>
        ))}
      </div>

      {/* Recording controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <button
          onClick={handleRecord}
          disabled={recording}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all"
          style={{
            background: recording ? "rgba(255,68,68,0.2)" : "rgba(0,212,255,0.15)",
            border: `1px solid ${recording ? "rgba(255,68,68,0.5)" : "rgba(0,212,255,0.4)"}`,
            color: recording ? "#FF4444" : "#00D4FF",
          }}
        >
          {recording ? (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Preparing brief…
            </>
          ) : (
            <>🎙 {recorded ? "Refresh Voice Brief" : "Start Voice Brief"}</>
          )}
        </button>

        {recorded && (
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="px-6 py-3 font-bold rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.3), rgba(255,184,0,0.1))", border: "1px solid rgba(255,184,0,0.5)", color: "#FFB800" }}
          >
            {generating ? "✨ Preparing Film Brief…" : "✨ Prepare Legacy Film Brief"}
          </Button>
        )}

        {generated && (
          <Button
            className="px-6 py-3 font-bold rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.3), rgba(0,255,136,0.1))", border: "1px solid rgba(0,255,136,0.5)", color: "#00FF88" }}
          >
              🎬 Open collectible readiness
          </Button>
        )}
      </div>

      {generated && (
        <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
          <div className="text-sm font-bold" style={{ color: "#00FF88" }}>✓ Legacy Film Brief Prepared</div>
          <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
            Style: {VOICE_STYLES.find(s => s.id === selectedStyle)?.label} · next step: source, permission, accessibility, and release evidence
          </div>
        </div>
      )}
    </div>
  );
}

export default function LondynLegacy() {
  
  const { isAuthenticated } = useAuth();
  const handleMint = (id: number) => {
    const lullaby = LULLABIES.find(l => l.id === id);
    if (!lullaby) return;
    toast("Collectible readiness selected", { description: `${lullaby.title} is recorded for source, rights, accessibility, and owner-release review before any mint or checkout.` });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,184,0,0.04) 0%, transparent 50%)" }} />

      <div className="relative z-10 container py-8">
        {/* Back nav */}
        <Link href="/">
          <button className="flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white" style={{ color: "#8899AA" }}>
            ← Back to ScrollVerse
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>LONDYN LEGACY PORTAL</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Future Mommy Lullabies
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Sacred healing frequencies woven into animated legacy experiences. Every lullaby is a blockchain. Every voice note becomes an immortal film.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {["528Hz DNA Repair", "963Hz Crown Activation", "432Hz Universal Harmony"].map(tag => (
              <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── #LONDYN LULLABY — LIFETIME INSTRUCTION ── */}
        <div className="mb-14">
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #0a0318, #0d0520, #0a0318)", border: "1px solid rgba(255,184,0,0.25)" }}
          >
            {/* Starfield shimmer */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 30%, rgba(255,184,0,0.08) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(0,212,255,0.06) 0%, transparent 50%)" }} />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12">
              {/* Book Cover Art */}
              <div className="flex-shrink-0 relative group">
                <div
                  className="absolute -inset-3 rounded-2xl opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: "linear-gradient(135deg, #FFB800, #A78BFA, #00D4FF)" }}
                />
                <img
                  src="https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeigzb55bs3453cprr75yecz6jux32a6v3l5l4yzaualdhvht3mewwm"
                  alt="Londyn's Lullaby — Lifetime Instruction by Chais The Great"
                  className="relative rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  style={{ width: "240px", height: "360px", objectFit: "cover", border: "2px solid rgba(255,184,0,0.4)" }}
                />
                {/* IPFS Verified Badge */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap"
                  style={{ background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.4)", color: "#00FF88" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  VERIFIED ON IPFS
                </div>
              </div>

              {/* Info Panel */}
              <div className="flex-1 text-center lg:text-left">
                <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>#LONDYNLULLABY · LIFETIME INSTRUCTION</div>
                <h2
                  className="text-4xl md:text-5xl font-black mb-2 leading-tight"
                  style={{ background: "linear-gradient(135deg, #FFB800, #ffffff, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  Londyn's Lullaby
                </h2>
                <div className="text-lg font-bold mb-4" style={{ color: "#C4D0E0" }}>Lifetime Instruction</div>
                <div className="text-sm mb-1" style={{ color: "#8899AA" }}>By <span style={{ color: "#FFB800" }}>Chais The Great</span> — Chais Kenyatta Hill · Sabir Allah The Great</div>

                <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: "#8899AA" }}>
                  A sacred book of lifetime instruction — lullabies, wisdom, and sovereign love letters written from a father to his daughter Londyn. Every word is a frequency. Every page is a blockchain. Every lesson is eternal.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
                  {[
                    { label: "Format", value: "Book + NFT", color: "#FFB800" },
                    { label: "Chain", value: "Polygon", color: "#A78BFA" },
                    { label: "Frequency", value: "528Hz", color: "#00D4FF" },
                    { label: "Editions", value: "144", color: "#00FF88" },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className="font-black text-base" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs" style={{ color: "#667788" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* IPFS Verification block */}
                <div
                  className="rounded-xl p-4 mb-5 text-left"
                  style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                    <span className="text-xs font-mono font-bold" style={{ color: "#00FF88" }}>ON-CHAIN · POLYGON · IPFS VERIFIED</span>
                  </div>
                  <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>
                    CID: <span style={{ color: "#C4D0E0" }}>bafybeigzb55bs3453cprr75yecz6jux32a6v3l5l4yzaualdhvht3mewwm</span>
                  </div>
                  <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
                    Storage ID: <span style={{ color: "#C4D0E0" }}>019f3b13-a17c-7600-bf4e-46e25cbb3653</span>
                  </div>
                  <div className="flex gap-3 mt-3 flex-wrap">
                    <a
                      href="https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeigzb55bs3453cprr75yecz6jux32a6v3l5l4yzaualdhvht3mewwm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
                    >
                      ↗ View on IPFS
                    </a>
                    <a
                      href="https://app.pinata.cloud/ipfs/files"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                      style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}
                    >
                      ✓ Verify on Pinata
                    </a>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                  <button
                    onClick={() => { toast("Collection readiness open", { description: "This collection needs its source, rights, metadata, accessibility, and owner-release record before any collectible action." }); }}
                    className="px-6 py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
                  >
                    👑 View collection readiness
                  </button>
                  <a
                    href="https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeigzb55bs3453cprr75yecz6jux32a6v3l5l4yzaualdhvht3mewwm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#C4D0E0" }}
                  >
                    📖 View Book Art
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom sovereign seal */}
            <div
              className="relative z-10 text-center py-4 px-8"
              style={{ borderTop: "1px solid rgba(255,184,0,0.1)", background: "rgba(255,184,0,0.03)" }}
            >
              <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
                KUN FAYAKŪN × ∞ — Londyn Kenyatta Hill · Princess of the ScrollVerse Empire · Eternal Legacy Sealed on Polygon
              </div>
            </div>
          </div>
        </div>

        {/* Voice-to-Art Studio */}
        <div className="mb-12">
          <VoiceToArtStudio />
        </div>

        {/* Lullaby NFT Collection */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#FFB800" }}>LIMITED COLLECTION</div>
              <h2 className="text-2xl font-black text-white">Future Mommy Lullabies NFT</h2>
              <p className="text-sm mt-1" style={{ color: "#8899AA" }}>6 tracks · 528Hz healing · Mintable on Polygon · Each song is a blockchain</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: "#FFB800" }}>144</div>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>editions each</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LULLABIES.map(lullaby => (
              <LullabyCard key={lullaby.id} lullaby={lullaby} onMint={handleMint} />
            ))}
          </div>
        </div>

        {/* Guardian Legacy Stories CTA */}
        <div className="rounded-2xl p-8 text-center mb-8" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)" }}>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>GUARDIAN LEGACY STORIES</div>
          <h3 className="text-2xl font-black text-white mb-3">First Public Screening — Coming Soon</h3>
          <p className="text-sm max-w-lg mx-auto mb-6" style={{ color: "#8899AA" }}>
            Collaborative animated series featuring Guardian stories from across the empire. Submit your legacy story and become part of the immortal ScrollVerse narrative.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/guardian-stories">
              <Button className="px-8 py-3 font-bold rounded-xl" style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.25), rgba(0,255,136,0.1))", border: "1px solid rgba(0,255,136,0.4)", color: "#00FF88" }}>
                View Guardian Stories
              </Button>
            </Link>
            <Link href="/codex-1587">
              <Button variant="outline" className="px-8 py-3 font-bold rounded-xl" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>
                1587 Codex Physical Drop
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            SCROLL VERSE LLC · EIN 42-2509570 · Vineland, NJ · KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
