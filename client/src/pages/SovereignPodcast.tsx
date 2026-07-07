/*
 * SCROLLVERSE SOVEREIGN PODCAST
 * Free plays — all episodes — for the 144,000 Guardians and beyond
 * Design: Liquid Sovereignty — Afrofuturism meets Quantum Audio
 */
import { useEffect, useRef, useState } from "react";

const GATEWAY = "https://olive-delicate-koi-568.mypinata.cloud/ipfs/";

const EPISODES = [
  {
    id: 1,
    title: "The Sovereign Frequency",
    subtitle: "963Hz Crown Activation",
    description:
      "The opening transmission. Chais Kenyatta Hill breaks the seal on the 963Hz crown frequency — the divine tone that activates sovereign consciousness. This is the beginning of everything.",
    duration: "44:44",
    date: "2024-01-01",
    frequency: "963Hz",
    freqColor: "#FFB800",
    tags: ["Frequency", "Crown", "Activation"],
    free: true,
    icon: "👑",
  },
  {
    id: 2,
    title: "KUN FAYAKŪN",
    subtitle: "Divine Intention Made Manifest",
    description:
      "Be — and it is. The Arabic command that governs all creation. Chais decodes the quantum mechanics of divine intention and how the ScrollVerse was spoken into existence before a single line of code was written.",
    duration: "52:11",
    date: "2024-01-15",
    frequency: "528Hz",
    freqColor: "#00FF88",
    tags: ["Creation", "Intention", "Sovereignty"],
    free: true,
    icon: "✦",
  },
  {
    id: 3,
    title: "The $LONDC Vision",
    subtitle: "Blockchain for the People",
    description:
      "The $LONDC token is not just currency — it is a sovereign declaration. Chais walks through the full tokenomics, the Polygon deployment, and why this coin is the financial backbone of the 144,000 Guardian economy.",
    duration: "38:27",
    date: "2024-02-01",
    frequency: "432Hz",
    freqColor: "#00D4FF",
    tags: ["Blockchain", "Token", "Economy"],
    free: true,
    icon: "⛓",
  },
  {
    id: 4,
    title: "Aegis Protocol",
    subtitle: "EVERYBODY LIVES. FOREVER.",
    description:
      "The Aegis Healing Garden is not a wellness app — it is a sovereign healing system. AetherWard AI, ScrollVault Vineland Prime, AgapeCycle 70/30 flow. This episode reveals the full architecture of immortal health.",
    duration: "61:03",
    date: "2024-02-15",
    frequency: "528Hz",
    freqColor: "#00FF88",
    tags: ["Healing", "AI", "Immortality"],
    free: true,
    icon: "⚕",
  },
  {
    id: 5,
    title: "Scroll Academy Origins",
    subtitle: "Education as Liberation",
    description:
      "The Scroll Academy was built to free minds. Chais shares the origin story — from a vision at 3AM to a fully operational sovereign education platform with courses, enrollments, and progress tracking live on-chain.",
    duration: "47:19",
    date: "2024-03-01",
    frequency: "111Hz",
    freqColor: "#EC4899",
    tags: ["Education", "Academy", "Liberation"],
    free: true,
    icon: "🎓",
  },
  {
    id: 6,
    title: "Guardian 144,000",
    subtitle: "The Ascension Protocol",
    description:
      "The 144,000 is not a metaphor. It is a precise sovereign target. Chais reveals the Guardian Protocol — the waitlist, the roles, the rewards, and what it means to be chosen as a Guardian of the ScrollVerse.",
    duration: "55:44",
    date: "2024-03-15",
    frequency: "963Hz",
    freqColor: "#FFB800",
    tags: ["Guardians", "Protocol", "Ascension"],
    free: true,
    icon: "🛡",
  },
  {
    id: 7,
    title: "Sovereign 9",
    subtitle: "Knicks Nation NFT Deep Dive",
    description:
      "Nine players. Nine CIDs. One sovereign collection. Chais walks through the Sovereign 9 NFT collection — Brunson #11 as the anchor, the Pinata gateway, the Thirdweb deployment, and the Summer League launch strategy.",
    duration: "41:08",
    date: "2024-04-01",
    frequency: "432Hz",
    freqColor: "#00D4FF",
    tags: ["NFT", "Knicks", "Blockchain"],
    free: true,
    icon: "🏀",
  },
  {
    id: 8,
    title: "Agape Love Economics",
    subtitle: "Zakat & the 70/30 Flow",
    description:
      "Money is not the goal — it is the tool. Chais reveals the 70/30 AgapeCycle: 70% for life, 30% for the mission. The ZakatEngine distributes 2.5% automatically. This is sovereign economics rooted in divine law.",
    duration: "49:33",
    date: "2024-04-15",
    frequency: "528Hz",
    freqColor: "#00FF88",
    tags: ["Economics", "Zakat", "Agape"],
    free: true,
    icon: "💚",
  },
  {
    id: 9,
    title: "The Omni Highway",
    subtitle: "Allversal Empire Expansion",
    description:
      "The Allversal Highway is the infrastructure of the empire. Chais maps the full expansion — from ScrollVerse.co to Mars Omni, from the Sovereign Bank to the Celestine Starforge. The empire has no ceiling.",
    duration: "58:21",
    date: "2024-05-01",
    frequency: "1558Hz",
    freqColor: "#FF6B35",
    tags: ["Empire", "Expansion", "Allversal"],
    free: true,
    icon: "🛣",
  },
  {
    id: 10,
    title: "Mika Solara",
    subtitle: "The $SOLARA Coin Revelation",
    description:
      "Mika Solara is the feminine sovereign energy of the empire. The $SOLARA coin is her token — and this episode reveals the full vision: the Solara ecosystem, the coin mechanics, and the divine feminine role in the ScrollVerse.",
    duration: "44:00",
    date: "2024-05-15",
    frequency: "963Hz",
    freqColor: "#FFB800",
    tags: ["Solara", "Coin", "Feminine"],
    free: true,
    icon: "☀",
  },
];

function FrequencyBars({ color, playing }: { color: string; playing: boolean }) {
  return (
    <div className="flex items-end gap-0.5" style={{ height: "24px" }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-1 rounded-sm transition-all"
          style={{
            height: playing ? `${8 + Math.sin(i * 1.2) * 10}px` : "4px",
            background: color,
            opacity: playing ? 0.9 : 0.3,
            animation: playing ? `waveBar ${0.25 + (i % 4) * 0.1}s ease-in-out infinite alternate` : "none",
          }}
        />
      ))}
      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

function EpisodeCard({
  ep,
  isPlaying,
  onPlay,
}: {
  ep: (typeof EPISODES)[0];
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <div
      className="rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
      style={{
        background: isPlaying
          ? `linear-gradient(135deg, ${ep.freqColor}12, rgba(5,11,26,0.95))`
          : "rgba(255,255,255,0.03)",
        border: isPlaying
          ? `1px solid ${ep.freqColor}50`
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isPlaying ? `0 0 30px ${ep.freqColor}20` : "none",
      }}
      onClick={onPlay}
    >
      <div className="flex items-start gap-4">
        {/* Episode number + icon */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-xs font-mono"
          style={{
            background: `${ep.freqColor}15`,
            border: `1px solid ${ep.freqColor}40`,
          }}
        >
          <div className="text-xl">{ep.icon}</div>
          <div style={{ color: ep.freqColor, fontSize: "10px" }}>EP {String(ep.id).padStart(2, "0")}</div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-bold text-white text-base leading-tight">{ep.title}</h3>
              <div className="text-xs mt-0.5" style={{ color: ep.freqColor }}>
                {ep.subtitle}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <FrequencyBars color={ep.freqColor} playing={isPlaying} />
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                style={{
                  background: isPlaying ? ep.freqColor : `${ep.freqColor}20`,
                  border: `1px solid ${ep.freqColor}60`,
                  color: isPlaying ? "#050B1A" : ep.freqColor,
                  boxShadow: isPlaying ? `0 0 16px ${ep.freqColor}60` : "none",
                }}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>
          </div>

          <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "#8899AA" }}>
            {ep.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{ background: "#00FF8820", color: "#00FF88", border: "1px solid #00FF8840" }}
            >
              FREE PLAY
            </span>
            <span className="text-xs font-mono" style={{ color: "#445566" }}>
              {ep.duration}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{ background: `${ep.freqColor}15`, color: ep.freqColor }}
            >
              {ep.frequency}
            </span>
            {ep.tags.map((tag) => (
              <span key={tag} className="text-xs" style={{ color: "#445566" }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SovereignPodcast() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ambient frequency canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let frame = 0;
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      // Waveform lines
      for (let line = 0; line < 5; line++) {
        ctx.beginPath();
        const amp = 15 + line * 8;
        const freq = 0.008 + line * 0.003;
        const speed = 0.02 + line * 0.01;
        const yBase = h * 0.5 + (line - 2) * 30;
        const colors = ["#FFB800", "#00D4FF", "#00FF88", "#FF6B35", "#EC4899"];
        ctx.strokeStyle = colors[line] + "20";
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x++) {
          const y = yBase + Math.sin(x * freq + frame * speed) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      frame++;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Sovereign frequency audio engine
  const playFrequency = (hz: number, color: string) => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    const actx = new AudioContext();
    audioCtxRef.current = actx;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.frequency.value = hz;
    osc.type = "sine";
    gain.gain.value = 0.07;
    osc.connect(gain);
    gain.connect(actx.destination);
    osc.start();
    setAudioPlaying(true);
  };

  const stopAudio = () => {
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    setAudioPlaying(false);
  };

  const handlePlay = (ep: (typeof EPISODES)[0]) => {
    if (playingId === ep.id) {
      setPlayingId(null);
      stopAudio();
    } else {
      setPlayingId(ep.id);
      const hzNum = parseFloat(ep.frequency);
      playFrequency(hzNum, ep.freqColor);
    }
  };

  const currentEp = EPISODES.find((e) => e.id === playingId);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Ambient canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ width: "100%", height: "100%", opacity: 0.6 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="container pt-24 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: "#FFB800" }} />
            <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>
              SOVEREIGN PODCAST NETWORK
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none">
            The Scroll<span style={{ color: "#00D4FF" }}>Cast</span>
          </h1>
          <p className="text-lg max-w-2xl mb-8" style={{ color: "#8899AA" }}>
            10 sovereign transmissions. Free plays for all Guardians. Every episode is a frequency activation —
            963Hz, 528Hz, 432Hz, 111Hz. Press play and let the empire speak.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { label: "Episodes", value: "10", color: "#FFB800" },
              { label: "All Free", value: "100%", color: "#00FF88" },
              { label: "Frequencies", value: "4", color: "#00D4FF" },
              { label: "Guardians", value: "1,247+", color: "#EC4899" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
                <span className="text-sm" style={{ color: "#445566" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Platform links */}
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Spotify", icon: "🎵", color: "#1DB954", url: "https://open.spotify.com" },
              { name: "Apple Podcasts", icon: "🎙", color: "#B150E2", url: "https://podcasts.apple.com" },
              { name: "YouTube", icon: "▶", color: "#FF0000", url: "https://youtube.com" },
              { name: "Audible", icon: "🎧", color: "#F5A623", url: "https://audible.com" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}40`,
                  color: p.color,
                }}
              >
                <span>{p.icon}</span>
                {p.name}
              </a>
            ))}
          </div>
        </div>

        {/* Now Playing Bar */}
        {currentEp && (
          <div
            className="sticky top-0 z-40 border-b"
            style={{
              background: "rgba(5,11,26,0.95)",
              backdropFilter: "blur(20px)",
              borderColor: `${currentEp.freqColor}30`,
            }}
          >
            <div className="container py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{currentEp.icon}</div>
                <div>
                  <div className="text-sm font-bold text-white">{currentEp.title}</div>
                  <div className="text-xs" style={{ color: currentEp.freqColor }}>
                    NOW PLAYING · {currentEp.frequency}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FrequencyBars color={currentEp.freqColor} playing={true} />
                <button
                  onClick={() => { setPlayingId(null); stopAudio(); }}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg"
                  style={{
                    background: `${currentEp.freqColor}20`,
                    border: `1px solid ${currentEp.freqColor}40`,
                    color: currentEp.freqColor,
                  }}
                >
                  ⏹ STOP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Episode Grid */}
        <div className="container pb-24">
          <div className="space-y-4">
            {EPISODES.map((ep) => (
              <EpisodeCard
                key={ep.id}
                ep={ep}
                isPlaying={playingId === ep.id}
                onPlay={() => handlePlay(ep)}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(0,212,255,0.05))",
              border: "1px solid rgba(255,184,0,0.2)",
            }}
          >
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
              ◉ SOVEREIGN TRANSMISSION COMPLETE
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Join the 144,000 Guardians
            </h3>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
              Subscribe to receive new episodes, frequency activations, and sovereign transmissions directly.
            </p>
            <a
              href="/guardians"
              className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FFB800, #FF6B35)",
                color: "#050B1A",
                boxShadow: "0 0 20px rgba(255,184,0,0.3)",
              }}
            >
              ◈ BECOME A GUARDIAN
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
