/*
 * CHAIS THE GREAT — SOVEREIGN VIDEO HUB
 * The City Web Series · Interviews · Behind the Music · Vevo Visuals
 * All YouTube assets associated with Chais The Great
 * KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link } from "wouter";

// ── VIDEO DATA ──
const VIDEOS = [
  // The City Web Series
  {
    id: "city-series-playlist",
    title: "The City — Full Web Series",
    subtitle: "Complete Playlist",
    category: "web-series",
    youtubeId: "ZJTj-qjCfWY",
    playlistId: "PL1r_hMd3vmhkPUvofEES0LK-dpBO1bdtW",
    isPlaylist: true,
    year: "2024",
    color: "#00D4FF",
    icon: "🌆",
    description: "The complete City web series — every episode. Sovereign street narratives by Chais The Great.",
    featured: true,
  },
  // Behind the Music / Interviews
  {
    id: "behind-music-1",
    title: "Behind the Music",
    subtitle: "Chais The Great Interview",
    category: "interview",
    youtubeId: "gPcyMh0wwGA",
    isPlaylist: false,
    year: "2024",
    color: "#FFB800",
    icon: "🎙️",
    description: "An intimate look behind the sovereign music — the story, the frequency, the mission.",
    featured: true,
  },
  // Vevo Visuals
  {
    id: "vevo-visual-1",
    title: "Sovereign Visual",
    subtitle: "Official Vevo",
    category: "vevo",
    youtubeId: "6lLHpTncToE",
    isPlaylist: false,
    year: "2024",
    color: "#FF6B35",
    icon: "🎬",
    description: "Official Vevo visual — Chais The Great sovereign music video.",
    featured: true,
  },
  {
    id: "vevo-visual-2",
    title: "FlameDNA Visual",
    subtitle: "Official Vevo",
    category: "vevo",
    youtubeId: "NoNw6pIPi6Y",
    isPlaylist: false,
    year: "2024",
    color: "#EC4899",
    icon: "🔥",
    description: "Official Vevo visual — FlameDNA frequency in motion. 1558Hz sovereign energy.",
    featured: false,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Videos", color: "#FFB800" },
  { id: "web-series", label: "The City", color: "#00D4FF" },
  { id: "interview", label: "Interviews", color: "#FFB800" },
  { id: "vevo", label: "Vevo Visuals", color: "#FF6B35" },
];

function VideoCard({
  video,
  onSelect,
  selected,
}: {
  video: (typeof VIDEOS)[number];
  onSelect: (v: (typeof VIDEOS)[number]) => void;
  selected: boolean;
}) {
  const embedSrc = video.isPlaylist
    ? `https://www.youtube.com/embed/videoseries?list=${video.playlistId}&rel=0&modestbranding=1`
    : `https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.01]"
      style={{
        background: selected ? `${video.color}10` : "rgba(255,255,255,0.02)",
        border: `1px solid ${selected ? video.color + "50" : video.color + "20"}`,
        boxShadow: selected ? `0 0 30px ${video.color}12` : "none",
      }}
      onClick={() => onSelect(video)}
    >
      {/* Top glow */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${video.color}, transparent)` }} />

      {/* Thumbnail / Player */}
      <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
        {selected ? (
          <iframe
            src={embedSrc}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${video.color}15, rgba(5,11,26,0.9))` }}
          >
            <div className="text-5xl">{video.icon}</div>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: `${video.color}30`, border: `2px solid ${video.color}60` }}
            >
              <span className="text-2xl ml-1">▶</span>
            </div>
            <div className="text-xs font-mono" style={{ color: video.color }}>Click to play</div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-mono" style={{ color: video.color }}>{video.category.toUpperCase()} · {video.year}</div>
          {video.featured && (
            <div className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${video.color}15`, border: `1px solid ${video.color}30`, color: video.color }}>
              FEATURED
            </div>
          )}
        </div>
        <div className="font-black text-white text-base mb-1">{video.title}</div>
        <div className="text-xs mb-2" style={{ color: "#8899AA" }}>{video.subtitle}</div>
        <p className="text-xs leading-relaxed" style={{ color: "#667788" }}>{video.description}</p>

        {/* YouTube link + Social sharing */}
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={video.isPlaylist
              ? `https://youtube.com/playlist?list=${video.playlistId}`
              : `https://youtu.be/${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)", color: "#FF4444" }}
          >
            ↗ Open on YouTube
          </a>
          {video.isPlaylist && (
            <div className="text-xs px-3 py-1.5 rounded-lg" style={{ background: `${video.color}10`, border: `1px solid ${video.color}25`, color: video.color }}>
              Full Playlist
            </div>
          )}
          {/* Twitter share */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🎬 ${video.title} — Chais The Great. Watch now:`)}&url=${encodeURIComponent(video.isPlaylist ? `https://youtube.com/playlist?list=${video.playlistId}` : `https://youtu.be/${video.youtubeId}`)}&hashtags=ScrollVerse,ChaisTheGreat,LONDC`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
            style={{ background: "rgba(29,161,242,0.1)", border: "1px solid rgba(29,161,242,0.3)", color: "#1DA1F2" }}
          >
            𝕏 Share
          </a>
          {/* Telegram share */}
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(video.isPlaylist ? `https://youtube.com/playlist?list=${video.playlistId}` : `https://youtu.be/${video.youtubeId}`)}&text=${encodeURIComponent(`🎬 ${video.title} — Chais The Great #ScrollVerse #LONDC`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
            style={{ background: "rgba(0,136,204,0.1)", border: "1px solid rgba(0,136,204,0.3)", color: "#0088CC" }}
          >
            ✈ Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ChaisVideos() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<(typeof VIDEOS)[number] | null>(VIDEOS[0]);

  const filtered = VIDEOS.filter(v => activeCategory === "all" || v.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 10%, rgba(0,212,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 90%, rgba(255,184,0,0.04) 0%, transparent 50%)" }} />

      <div className="relative z-10 container py-8">
        {/* Back */}
        <Link href="/">
          <button className="flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white" style={{ color: "#8899AA" }}>
            ← Back to ScrollVerse
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>CHAIS THE GREAT — VIDEO ARCHIVE</div>
          <h1
            className="text-5xl md:text-6xl font-black mb-4"
            style={{ background: "linear-gradient(135deg, #00D4FF, #ffffff, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            The Visual Empire
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            The City web series, behind the music, interviews, Vevo visuals — every video associated with Chais The Great, all in one sovereign archive.
          </p>

          {/* Category filter */}
          <div className="flex gap-2 justify-center flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all"
                style={{
                  background: activeCategory === cat.id ? `${cat.color}20` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeCategory === cat.id ? cat.color + "50" : "rgba(255,255,255,0.08)"}`,
                  color: activeCategory === cat.id ? cat.color : "#8899AA",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured player — The City full series */}
        {activeCategory === "all" && (
          <div className="mb-12">
            <div className="text-xs font-mono tracking-widest mb-4 text-center" style={{ color: "#00D4FF" }}>THE CITY — FULL WEB SERIES</div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(0,212,255,0.3)", boxShadow: "0 0 60px rgba(0,212,255,0.08)" }}
            >
              <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #00D4FF, transparent)" }} />
              <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PL1r_hMd3vmhkPUvofEES0LK-dpBO1bdtW&rel=0&modestbranding=1"
                  title="The City — Full Web Series by Chais The Great"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
                />
              </div>
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ background: "rgba(0,212,255,0.03)" }}>
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>WEB SERIES · FULL PLAYLIST · 2024</div>
                  <div className="font-black text-white text-xl">The City — Complete Series</div>
                  <div className="text-sm mt-1" style={{ color: "#8899AA" }}>Every episode of The City web series by Chais The Great</div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://youtube.com/playlist?list=PL1r_hMd3vmhkPUvofEES0LK-dpBO1bdtW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{ background: "rgba(255,0,0,0.15)", border: "1px solid rgba(255,0,0,0.3)", color: "#FF4444" }}
                  >
                    ↗ Full Playlist on YouTube
                  </a>
                  <Link href="/chais-catalog">
                    <button
                      className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-80"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
                    >
                      🎵 View Music Catalog
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video grid */}
        <div className="mb-12">
          <div className="text-xs font-mono tracking-widest mb-6 text-center" style={{ color: "#FFB800" }}>
            {activeCategory === "all" ? "ALL VIDEOS" : activeCategory.toUpperCase().replace("-", " ")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                onSelect={setSelectedVideo}
                selected={selectedVideo?.id === video.id}
              />
            ))}
          </div>
        </div>

        {/* Vevo Channel link */}
        <div
          className="rounded-2xl p-8 text-center mb-8"
          style={{ background: "rgba(255,107,53,0.04)", border: "1px solid rgba(255,107,53,0.2)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FF6B35" }}>OFFICIAL VEVO CHANNEL</div>
          <h3 className="text-2xl font-black text-white mb-3">Chais The Great on Vevo</h3>
          <p className="text-sm max-w-lg mx-auto mb-6" style={{ color: "#8899AA" }}>
            All official music videos, visuals, and Vevo exclusives. Every visual is a sovereign NFT — mint yours and earn $LONDC staking rewards.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://www.youtube.com/@ChaisTheGreat"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "rgba(255,0,0,0.15)", border: "1px solid rgba(255,0,0,0.3)", color: "#FF4444" }}
            >
              ▶ YouTube Channel
            </a>
            <Link href="/chais-catalog">
              <button
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
                style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)", color: "#FF6B35" }}
              >
                🖼️ Mint Visual NFTs
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            CHAIS THE GREAT · SCROLL VERSE LLC · All videos on YouTube · NFTs on Polygon · KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
