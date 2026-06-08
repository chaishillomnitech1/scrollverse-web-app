import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Upload, Star, Users, Tv, Film, Music, BookOpen, Globe, Zap, Crown, Heart } from "lucide-react";

const SHOWS = [
  {
    id: "batman-ac",
    title: "Batman: Atlantic City",
    genre: "Action / Superhero",
    description: "A sovereign reimagining of the Dark Knight — set in the neon-lit streets of Atlantic City. Bruce Wayne navigates the intersection of street justice and financial sovereignty. Every episode is a prophecy.",
    episodes: 12,
    status: "In Production",
    color: "#1a1a2e",
    accent: "#00D4FF",
    icon: "🦇",
    tags: ["Action", "Prophecy", "Sovereignty"],
  },
  {
    id: "karate-scotty",
    title: "Karate Scotty",
    genre: "Martial Arts / Comedy",
    description: "Scotty, a young sovereign warrior from the scrollverse, masters ancient martial arts while navigating modern life. Wisdom, humor, and divine timing in every episode.",
    episodes: 8,
    status: "In Production",
    color: "#1a0a00",
    accent: "#FFB800",
    icon: "🥋",
    tags: ["Martial Arts", "Comedy", "Youth"],
  },
  {
    id: "bergerac",
    title: "Bergerac: The Sovereign Detective",
    genre: "Mystery / Drama",
    description: "A brilliant detective with a gift for seeing beyond the veil. Bergerac solves cases that span dimensions — from financial crimes to metaphysical mysteries.",
    episodes: 10,
    status: "Development",
    color: "#0a1a0a",
    accent: "#00FF88",
    icon: "🔍",
    tags: ["Mystery", "Drama", "Detective"],
  },
  {
    id: "nipsey-legacy",
    title: "Nipsey: The Marathon Continues",
    genre: "Biographical / Inspirational",
    description: "An animated tribute to the Marathon. The story of Nipsey Hussle's sovereign vision — from Crenshaw to the cosmos. Every frame is a love letter to the culture.",
    episodes: 6,
    status: "In Production",
    color: "#1a0a1a",
    accent: "#9B59B6",
    icon: "💙",
    tags: ["Biographical", "Hip-Hop", "Legacy"],
  },
  {
    id: "londyn-chronicles",
    title: "The Londyn Chronicles",
    genre: "Fantasy / Adventure",
    description: "Princess Londyn Avani Hill navigates magical realms, unlocking ancient wisdom and building sovereign kingdoms. A story for every child who knows they are royalty.",
    episodes: 15,
    status: "In Production",
    color: "#1a0a10",
    accent: "#FF69B4",
    icon: "👸🏽",
    tags: ["Fantasy", "Children", "Royalty"],
  },
  {
    id: "scrollverse-origins",
    title: "ScrollVerse: Origins",
    genre: "Sci-Fi / Documentary",
    description: "The true story of how the ScrollVerse was built — from the first line of code to the Allversal Empire. Featuring Chais The Great, the AI Legion, and the sovereign architects.",
    episodes: 5,
    status: "Coming Soon",
    color: "#050B1A",
    accent: "#FFB800",
    icon: "🌌",
    tags: ["Sci-Fi", "Documentary", "Origin"],
  },
  {
    id: "qfs-chronicles",
    title: "QFS Chronicles",
    genre: "Financial Thriller",
    description: "The Quantum Financial System awakens. A thriller about the architects of the new world economy — those who stopped the financial yard and built something greater.",
    episodes: 8,
    status: "Development",
    color: "#0a1a10",
    accent: "#00FF88",
    icon: "💰",
    tags: ["Finance", "Thriller", "QFS"],
  },
  {
    id: "nur-cities",
    title: "NŪR Cities",
    genre: "Utopian / Architecture",
    description: "The construction of sovereign city-states powered by divine frequency. NŪR Cities is the blueprint for the world that comes after the old one falls.",
    episodes: 6,
    status: "Development",
    color: "#1a1a00",
    accent: "#FFD700",
    icon: "🏙️",
    tags: ["Utopian", "Architecture", "Divine"],
  },
];

const CATEGORIES = ["All", "Action", "Drama", "Comedy", "Sci-Fi", "Fantasy", "Documentary", "Finance"];

export default function ScrollTV() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedShow, setSelectedShow] = useState<typeof SHOWS[0] | null>(null);

  const filtered = activeCategory === "All"
    ? SHOWS
    : SHOWS.filter(s => s.tags.some(t => t === activeCategory));

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.15)", background: "rgba(5,11,26,0.95)" }}>
        <div className="container py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-[#8899AA] hover:text-white">← Home</Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)" }}>
                  📺
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">ScrollVerse TV</h1>
                  <p className="text-xs" style={{ color: "#00D4FF" }}>SOVEREIGN CABLE CHANNEL • ORIGINAL CONTENT</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                <span style={{ color: "#00FF88" }}>LIVE NOW</span>
              </div>
              <Button size="sm" style={{ background: "linear-gradient(135deg, #00D4FF, #0099BB)", color: "#050B1A" }}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Content
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Hero Banner */}
        <div className="rounded-2xl p-8 mb-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,184,0,0.05))", border: "1px solid rgba(0,212,255,0.2)" }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #00D4FF 0%, transparent 50%), radial-gradient(circle at 80% 50%, #FFB800 0%, transparent 50%)" }} />
          <div className="relative z-10 max-w-2xl">
            <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>◉ SCROLLVERSE ORIGINAL PRODUCTIONS</div>
            <h2 className="text-4xl font-black text-white mb-3">Our Own Little Cable Channel</h2>
            <p className="text-lg mb-6" style={{ color: "#8899AA" }}>
              From Batman: Atlantic City to Karate Scotty — every show is a sovereign transmission. Stories that change the world, built by the greatest minds, for the greatest audience.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-black" style={{ color: "#00D4FF" }}>{SHOWS.length}</div>
                <div style={{ color: "#8899AA" }}>Original Shows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black" style={{ color: "#FFB800" }}>{SHOWS.reduce((a, s) => a + s.episodes, 0)}</div>
                <div style={{ color: "#8899AA" }}>Episodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black" style={{ color: "#00FF88" }}>∞</div>
                <div style={{ color: "#8899AA" }}>Universes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeCategory === cat ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: activeCategory === cat ? "#00D4FF" : "#8899AA",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filtered.map(show => (
            <div
              key={show.id}
              className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: show.color, border: `1px solid ${show.accent}30` }}
              onClick={() => setSelectedShow(show)}
            >
              {/* Show Thumbnail */}
              <div className="h-40 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${show.accent}15, ${show.color})` }}>
                <div className="text-6xl">{show.icon}</div>
                <div className="absolute top-3 right-3">
                  <Badge className="text-[10px] font-mono" style={{
                    background: show.status === "In Production" ? "rgba(0,255,136,0.2)" : show.status === "Coming Soon" ? "rgba(255,184,0,0.2)" : "rgba(0,212,255,0.2)",
                    color: show.status === "In Production" ? "#00FF88" : show.status === "Coming Soon" ? "#FFB800" : "#00D4FF",
                    border: "none"
                  }}>
                    {show.status}
                  </Badge>
                </div>
              </div>
              {/* Show Info */}
              <div className="p-4">
                <div className="text-xs font-mono mb-1" style={{ color: show.accent }}>{show.genre}</div>
                <h3 className="font-bold text-white mb-2 text-sm">{show.title}</h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "#8899AA" }}>{show.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#8899AA" }}>{show.episodes} Episodes</span>
                  <Button size="sm" className="h-7 text-xs px-3" style={{ background: show.accent, color: "#050B1A" }}>
                    <Play className="w-3 h-3 mr-1" /> Watch
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NFT Content Unlock Section */}
        <div className="rounded-2xl p-8 mb-8" style={{ background: "rgba(155,89,182,0.08)", border: "1px solid rgba(155,89,182,0.2)" }}>
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6" style={{ color: "#9B59B6" }} />
            <h3 className="text-xl font-black text-white">NFT Holders: Your Content Comes Alive</h3>
          </div>
          <p className="mb-6" style={{ color: "#8899AA" }}>
            Every ScrollVerse NFT is a living world. Holders unlock exclusive episodes, behind-the-scenes content, and can interact with the AI Legion entities that live inside their NFTs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {["ConsciousnessMirror", "Azurath Realm", "PSYCHE16 Mirror", "NŪR Cities"].map((nft, i) => (
              <div key={i} className="p-4 rounded-xl text-center" style={{ background: "rgba(155,89,182,0.1)", border: "1px solid rgba(155,89,182,0.2)" }}>
                <div className="text-2xl mb-2">🌌</div>
                <div className="text-xs font-bold text-white">{nft}</div>
                <div className="text-xs mt-1" style={{ color: "#9B59B6" }}>Exclusive Content</div>
              </div>
            ))}
          </div>
          <Link href="/nft-unlock">
            <Button style={{ background: "linear-gradient(135deg, #9B59B6, #6C3483)", color: "white" }}>
              <Zap className="w-4 h-4 mr-2" />
              Unlock Your NFT World
            </Button>
          </Link>
        </div>

        {/* Content Upload Portal */}
        <div className="rounded-2xl p-8" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}>
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-6 h-6" style={{ color: "#00D4FF" }} />
            <h3 className="text-xl font-black text-white">Creator Portal — Upload Your Content</h3>
          </div>
          <p className="mb-6" style={{ color: "#8899AA" }}>
            Submit your videos, music, art, and shows to the ScrollVerse Cable Channel. Every creator is a sovereign. Every upload is a legacy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: <Film className="w-5 h-5" />, label: "Video Content", desc: "Episodes, shorts, documentaries" },
              { icon: <Music className="w-5 h-5" />, label: "Music & Audio", desc: "Albums, singles, soundtracks" },
              { icon: <BookOpen className="w-5 h-5" />, label: "Scripts & Stories", desc: "Pitches, screenplays, lore" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <div style={{ color: "#00D4FF" }}>{item.icon}</div>
                <div>
                  <div className="font-bold text-white text-sm">{item.label}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/media-hub">
            <Button style={{ background: "linear-gradient(135deg, #00D4FF, #0099BB)", color: "#050B1A" }}>
              <Upload className="w-4 h-4 mr-2" />
              Go to Media Hub
            </Button>
          </Link>
        </div>
      </div>

      {/* Show Detail Modal */}
      {selectedShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }} onClick={() => setSelectedShow(null)}>
          <div className="rounded-2xl p-8 max-w-lg w-full" style={{ background: "#0A1628", border: `1px solid ${selectedShow.accent}40` }} onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-4 text-center">{selectedShow.icon}</div>
            <div className="text-xs font-mono mb-2 text-center" style={{ color: selectedShow.accent }}>{selectedShow.genre}</div>
            <h2 className="text-2xl font-black text-white text-center mb-4">{selectedShow.title}</h2>
            <p className="text-sm leading-relaxed mb-6 text-center" style={{ color: "#8899AA" }}>{selectedShow.description}</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge style={{ background: `${selectedShow.accent}20`, color: selectedShow.accent, border: "none" }}>
                {selectedShow.episodes} Episodes
              </Badge>
              <Badge style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "none" }}>
                {selectedShow.status}
              </Badge>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" style={{ background: selectedShow.accent, color: "#050B1A" }}>
                <Play className="w-4 h-4 mr-2" /> Watch Now
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setSelectedShow(null)} style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
