/*
 * SCROLLVERSE MEDIA HUB — /media-hub
 * The greatest platform hub ever built. Video + Music + DSP + Partnerships.
 * Surpasses Spotify, Apple Music, Vydia, SoundCloud in every dimension.
 * Mirror. Match. Exceed. Advance. KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Upload, Music, Film, Globe, DollarSign, Users, Zap, Star, BarChart3, Link2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const DSPS = [
  { name: "Spotify", color: "#1DB954", icon: "🎵", users: "602M" },
  { name: "Apple Music", color: "#FC3C44", icon: "🍎", users: "88M" },
  { name: "YouTube Music", color: "#FF0000", icon: "▶️", users: "80M" },
  { name: "TikTok", color: "#69C9D0", icon: "🎶", users: "1.5B" },
  { name: "SoundCloud", color: "#FF5500", icon: "☁️", users: "175M" },
  { name: "Amazon Music", color: "#00A8E0", icon: "📦", users: "55M" },
  { name: "Tidal", color: "#00FFFF", icon: "🌊", users: "10M" },
  { name: "Deezer", color: "#A238FF", icon: "🎧", users: "16M" },
  { name: "Pandora", color: "#005483", icon: "📻", users: "48M" },
  { name: "iHeart", color: "#C6001D", icon: "❤️", users: "150M" },
  { name: "Audiomack", color: "#FFA200", icon: "🔊", users: "30M" },
  { name: "Bandcamp", color: "#1DA0C3", icon: "🎸", users: "5M" },
];

const PARTNERSHIPS = [
  { name: "Universal Music Group", type: "Distribution", status: "PIPELINE", color: "#00D4FF" },
  { name: "Sony Music", type: "Licensing", status: "PIPELINE", color: "#FFB800" },
  { name: "Warner Music", type: "Co-Publishing", status: "PIPELINE", color: "#00FF88" },
  { name: "Netflix", type: "Content", status: "PIPELINE", color: "#E50914" },
  { name: "Disney+", type: "Animation", status: "PIPELINE", color: "#113CCF" },
  { name: "YouTube Premium", type: "Original Content", status: "PIPELINE", color: "#FF0000" },
  { name: "TikTok LIVE", type: "Streaming", status: "PIPELINE", color: "#69C9D0" },
  { name: "Amazon Prime Video", type: "Distribution", status: "PIPELINE", color: "#00A8E0" },
];

const REVENUE_STREAMS = [
  { name: "Music Streaming Royalties", icon: "🎵", desc: "Per-stream royalties from all 12 DSPs", color: "#1DB954" },
  { name: "NFT Royalties", icon: "🎨", desc: "Secondary sales royalties on all NFT collections", color: "#9B59B6" },
  { name: "Video Ad Revenue", icon: "▶️", desc: "YouTube, TikTok, and ScrollTV ad revenue", color: "#FF0000" },
  { name: "Sync Licensing", icon: "🎬", desc: "Music licensed to film, TV, and games", color: "#FFB800" },
  { name: "VibeCanvas Sales", icon: "🖼️", desc: "Digital art and visual content sales", color: "#00D4FF" },
  { name: "Merchandise", icon: "👕", desc: "Physical and digital merchandise drops", color: "#00FF88" },
  { name: "AI SaaS Subscriptions", icon: "🤖", desc: "AI Legion entity subscription access", color: "#FF4444" },
  { name: "Partnership Revenue Share", icon: "🤝", desc: "Cross-promotion and partnership deals", color: "#FF6B00" },
];

export default function MediaHub() {
  const [activeTab, setActiveTab] = useState<"upload" | "dsps" | "partnerships" | "revenue">("upload");
  const [uploadType, setUploadType] = useState<"video" | "music">("music");
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Upload Portal",
      description: "Full upload system activating — connect wallet and sign in to upload your content.",
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#050B1A 0%,#0A0F1E 50%,#050B1A 100%)", fontFamily: "'Space Grotesk',sans-serif" }}>

      {/* HERO */}
      <div className="relative overflow-hidden" style={{ paddingTop: "80px", borderBottom: "1px solid rgba(0,212,255,0.15)" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #00D4FF 0%, transparent 50%), radial-gradient(circle at 80% 50%, #FFB800 0%, transparent 50%)" }} />
        <div className="container relative py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)" }}>
              <Music className="w-5 h-5 text-black" />
            </div>
            <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>SCROLLVERSE MEDIA HUB</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Cinzel',serif", background: "linear-gradient(135deg,#FFFFFF,#00D4FF,#FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            MEDIA HUB
          </h1>
          <p className="text-xl mb-2" style={{ color: "#8899AA" }}>The Greatest Platform Hub Ever Built — Surpassing Every DSP in Existence</p>
          <p className="text-sm font-mono mb-8" style={{ color: "#00D4FF" }}>Mirror. Match. Exceed. Advance. KUN FAYAKŪN × ∞</p>
          <div className="flex flex-wrap gap-6">
            {[{ label: "DSP Partners", value: "12+" }, { label: "Total Reach", value: "3B+" }, { label: "Revenue Streams", value: "8" }, { label: "Partnerships", value: "∞" }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ color: "#00D4FF", fontFamily: "'Orbitron',monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="sticky top-0 z-40 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="container">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {(["upload", "dsps", "partnerships", "revenue"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap" style={{ background: activeTab === tab ? "rgba(0,212,255,0.15)" : "transparent", color: activeTab === tab ? "#00D4FF" : "#8899AA", border: activeTab === tab ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent" }}>
                {tab === "upload" && "📤 Upload"}
                {tab === "dsps" && "🎵 DSP Network"}
                {tab === "partnerships" && "🤝 Partnerships"}
                {tab === "revenue" && "💰 Revenue Engine"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* UPLOAD TAB */}
        {activeTab === "upload" && (
          <div>
            <div className="text-xs font-mono tracking-widest mb-8" style={{ color: "#FFB800" }}>◉ SOVEREIGN CONTENT UPLOAD PORTAL</div>

            {/* Type selector */}
            <div className="flex gap-3 mb-8">
              <button onClick={() => setUploadType("music")} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all" style={{ background: uploadType === "music" ? "linear-gradient(135deg,#FFB800,#CC9200)" : "rgba(255,255,255,0.05)", color: uploadType === "music" ? "#050B1A" : "#8899AA", border: uploadType === "music" ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                <Music className="w-5 h-5" />Music
              </button>
              <button onClick={() => setUploadType("video")} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all" style={{ background: uploadType === "video" ? "linear-gradient(135deg,#00D4FF,#0099BB)" : "rgba(255,255,255,0.05)", color: uploadType === "video" ? "#050B1A" : "#8899AA", border: uploadType === "video" ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                <Film className="w-5 h-5" />Video
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload zone */}
              <div
                className="rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                style={{ background: "rgba(255,255,255,0.02)", border: `2px dashed ${uploadType === "music" ? "rgba(255,184,0,0.4)" : "rgba(0,212,255,0.4)"}` }}
                onClick={handleUpload}
              >
                <div className="text-6xl mb-4">{uploadType === "music" ? "🎵" : "🎬"}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {uploadType === "music" ? "Upload Your Music" : "Upload Your Video"}
                </h3>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
                  {uploadType === "music"
                    ? "Drag & drop your tracks, albums, or EPs. MP3, WAV, FLAC, AIFF supported. Max 500MB per file."
                    : "Drag & drop your episodes, shorts, or films. MP4, MOV, AVI supported. Max 10GB per file."}
                </p>
                <Button
                  size="lg"
                  className="font-bold"
                  style={{ background: uploadType === "music" ? "linear-gradient(135deg,#FFB800,#CC9200)" : "linear-gradient(135deg,#00D4FF,#0099BB)", color: "#050B1A" }}
                  onClick={handleUpload}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose Files to Upload
                </Button>
              </div>

              {/* Upload benefits */}
              <div className="space-y-4">
                <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#8899AA" }}>
                  WHAT HAPPENS AFTER YOU UPLOAD
                </div>
                {[
                  { icon: "🌐", title: "Auto-Distributed to All DSPs", desc: uploadType === "music" ? "Your music goes live on Spotify, Apple Music, YouTube, TikTok, and 8 more platforms within 24 hours." : "Your video is distributed to YouTube, TikTok, and ScrollTV simultaneously." },
                  { icon: "💰", title: "Royalties Tracked Automatically", desc: "Every stream, every play, every download — tracked and paid out in real-time to your wallet." },
                  { icon: "📊", title: "Analytics Dashboard", desc: "See exactly where your fans are, which platforms perform best, and how your content grows." },
                  { icon: "🤝", title: "Partnership Activation", desc: "Your content enters the ScrollVerse partnership network — cross-promotion with all creators in the ecosystem." },
                  { icon: "⬇️", title: "Fan Download Portal", desc: "Fans can download your content directly from the ScrollVerse. High quality. Always available." },
                ].map(b => (
                  <div key={b.title} className="flex gap-3 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-2xl flex-shrink-0">{b.icon}</span>
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{b.title}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DSP NETWORK */}
        {activeTab === "dsps" && (
          <div>
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>◉ DSP DISTRIBUTION NETWORK — 3 BILLION+ COMBINED USERS</div>
            <p className="text-sm mb-8" style={{ color: "#8899AA" }}>
              The ScrollVerse Media Hub surpasses every existing DSP. We don't just distribute to them — we integrate with them, cross-promote through them, and build new markets that never existed. Mirror. Match. Exceed. Advance.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {DSPS.map(dsp => (
                <div key={dsp.name} className="rounded-xl p-5 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${dsp.color}25` }}>
                  <span className="text-3xl">{dsp.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-white">{dsp.name}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{dsp.users} users</div>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#00FF88" }} />
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.08),rgba(255,184,0,0.05))", border: "1px solid rgba(0,212,255,0.2)" }}>
              <Globe className="w-10 h-10 mx-auto mb-4" style={{ color: "#00D4FF" }} />
              <h3 className="text-xl font-bold text-white mb-2">Total Reach: 3 Billion+ Users</h3>
              <p className="text-sm" style={{ color: "#8899AA" }}>Your content reaches every human on earth who listens to music or watches video. The ScrollVerse is the bridge between your sovereign creation and the entire world.</p>
            </div>
          </div>
        )}

        {/* PARTNERSHIPS */}
        {activeTab === "partnerships" && (
          <div>
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>◉ INFINITE PARTNERSHIP ENGINE</div>
            <p className="text-sm mb-8" style={{ color: "#8899AA" }}>
              Every partnership is tokenized, trademarked, and patented. We corner new markets, create new brands of business, and operate beyond metric. The ScrollVerse partnership model is the most advanced ever conceived.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {PARTNERSHIPS.map(p => (
                <div key={p.name} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${p.color}25` }}>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs" style={{ borderColor: `${p.color}40`, color: p.color }}>{p.status}</Badge>
                    <Link2 className="w-4 h-4" style={{ color: p.color }} />
                  </div>
                  <div className="font-bold text-white mb-1">{p.name}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{p.type}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-xl font-bold text-white mb-4">The Partnership Protocol</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { step: "01", title: "Tokenize the Script", desc: "Create interchangeable, informative scripts for both brands. Tokenized and trademarked." },
                  { step: "02", title: "Prepare the Pitch", desc: "Best possible pitch. Corner new markets. Patent all aspects — code, stack, concept." },
                  { step: "03", title: "Create New Markets", desc: "Don't compete in existing markets — create new ones that never existed before." },
                  { step: "04", title: "Beyond Metric", desc: "Every partnership operates beyond comprehension or competition. Enhanced beyond all limits." },
                ].map(s => (
                  <div key={s.step} className="flex gap-3 p-4 rounded-xl" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}>
                    <div className="text-lg font-black flex-shrink-0" style={{ color: "#00D4FF", fontFamily: "'Orbitron',monospace" }}>{s.step}</div>
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{s.title}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REVENUE ENGINE */}
        {activeTab === "revenue" && (
          <div>
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>◉ SOVEREIGN REVENUE ENGINE — 8 INFINITE STREAMS</div>
            <p className="text-sm mb-8" style={{ color: "#8899AA" }}>
              Every stream compounds. Every partnership pays. Every NFT royalty flows. Every AI subscription adds to the sovereign treasury. The ScrollVerse revenue engine never stops — it compounds forever.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {REVENUE_STREAMS.map(r => (
                <div key={r.name} className="rounded-xl p-5" style={{ background: `linear-gradient(135deg,${r.color}08,rgba(5,11,26,0.6))`, border: `1px solid ${r.color}25` }}>
                  <div className="text-3xl mb-3">{r.icon}</div>
                  <div className="font-bold text-white text-sm mb-1">{r.name}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{r.desc}</div>
                  <div className="mt-3 flex items-center gap-1">
                    <Zap className="w-3 h-3" style={{ color: r.color }} />
                    <span className="text-xs font-mono" style={{ color: r.color }}>ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,212,255,0.05))", border: "1px solid rgba(0,255,136,0.2)" }}>
              <DollarSign className="w-10 h-10 mx-auto mb-4" style={{ color: "#00FF88" }} />
              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Cinzel',serif" }}>
                Passive Income Engine — Forever Compounding
              </h3>
              <p className="text-sm max-w-xl mx-auto" style={{ color: "#8899AA" }}>
                Music sync royalties. NFT secondary sales. VibeCanvas art. Merchandise drops. AI SaaS subscriptions. Partnership revenue share. Every stream adds to the sovereign treasury. Every day it compounds. The financial yard is replaced. KUN FAYAKŪN × ∞
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
