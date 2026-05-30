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
            onClick={() => setPlaying(!playing)}
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
    setTimeout(() => {
      setRecording(false);
      setRecorded(true);
      toast("Voice captured ✓", { description: "Your love note is ready to transform into art." });
    }, 3000);
  };

  const handleGenerate = async () => {
    if (!recorded) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 3500));
    setGenerating(false);
    setGenerated(true);
    toast("Legacy Experience Created! 🌌", { description: "Your animated legacy film is ready to mint as an NFT." });
  };

  return (
    <div className="rounded-2xl p-6" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>VOICE-TO-ART STUDIO</div>
      <h3 className="text-xl font-black text-white mb-1">Create Your Animated Legacy</h3>
      <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
        Record a voice message → Instantly generates an animated short film with 528Hz soundscape + sacred geometry.
        Output: Shareable video + mintable NFT.
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
              Recording... (3s demo)
            </>
          ) : (
            <>🎙 {recorded ? "Re-Record Voice Note" : "Record Voice Note"}</>
          )}
        </button>

        {recorded && (
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="px-6 py-3 font-bold rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.3), rgba(255,184,0,0.1))", border: "1px solid rgba(255,184,0,0.5)", color: "#FFB800" }}
          >
            {generating ? "✨ Generating Animation..." : "✨ Generate Legacy Film"}
          </Button>
        )}

        {generated && (
          <Button
            className="px-6 py-3 font-bold rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.3), rgba(0,255,136,0.1))", border: "1px solid rgba(0,255,136,0.5)", color: "#00FF88" }}
          >
            🎬 Mint as NFT — $77
          </Button>
        )}
      </div>

      {generated && (
        <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
          <div className="text-sm font-bold" style={{ color: "#00FF88" }}>✓ Legacy Film Generated</div>
          <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
            Style: {VOICE_STYLES.find(s => s.id === selectedStyle)?.label} · 528Hz embedded · Sacred geometry overlay active · Ready to mint on Polygon
          </div>
        </div>
      )}
    </div>
  );
}

export default function LondynLegacy() {
  
  const { isAuthenticated } = useAuth();
  const checkoutMutation = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.open(data.url, "_blank");
      toast("Redirecting to checkout...", { description: "Complete your NFT mint on Stripe." });
    },
    onError: () => toast.error("Checkout error", { description: "Please try again." }),
  });

  const handleMint = (id: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    const lullaby = LULLABIES.find(l => l.id === id);
    if (!lullaby) return;
    checkoutMutation.mutate({
      nftId: `londyn_lullaby_${id}`,
      nftName: `Londyn Legacy Lullaby NFT — ${lullaby.title}`,
      nftDescription: `A 528Hz healing lullaby from the Londyn Legacy collection.`,
      priceCents: lullaby.price * 100,
      origin: window.location.origin,
    });
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
