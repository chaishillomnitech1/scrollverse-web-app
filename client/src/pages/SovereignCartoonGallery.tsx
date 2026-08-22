import { useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { toast } from "sonner";

const PIECES = [
  {
    id: "SV-001",
    title: "Red Lamp Session",
    song: "Londyn's Lullaby Lifetime Instruction",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Two sovereigns in a private lounge, Bob Marley watching over — the quiet before the movement.",
    style: "Lounge · Duo · Intimate",
    art: "/manus-storage/sv-nft-01-red-lamp-session_a7bd34f1.png",
    color: "#FFB800",
  },
  {
    id: "SV-002",
    title: "Wood Grain Royalty",
    song: "Walk It Talk It",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Street-to-boardroom energy against raw timber — blazer meets ripped denim, Jordans on both feet.",
    style: "Street · Duo · Overhead",
    art: "/manus-storage/sv-nft-02-wood-grain-royalty_a0212510.png",
    color: "#00D4FF",
  },
  {
    id: "SV-003",
    title: "Corduroy & Orioles",
    song: "Never Giving Up",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Venue night, velvet coat, Baltimore pride — two figures holding their frequency under neon.",
    style: "Venue · Duo · Neon",
    art: "/manus-storage/sv-nft-03-corduroy-and-orioles_faa33592.png",
    color: "#FF6B35",
  },
  {
    id: "SV-004",
    title: "Warriors in the Room",
    song: "BUDDY CRAWFORD",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "The whole squad assembled, Aaliyah varsity, Warriors blue — a gathering of tribes.",
    style: "Group · Venue · Energy",
    art: "/manus-storage/sv-nft-04-warriors-in-the-room_d57c5a1c.png",
    color: "#FFB800",
  },
  {
    id: "SV-005",
    title: "The Architect Descends",
    song: "cool master",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Fendi-wrapped, Nike-suited, hands open like a conductor — identity concealed, energy undeniable.",
    style: "Solo · Cinematic · Mysterious",
    art: "/manus-storage/sv-nft-05-architect-descends_9d2fdffd.png",
    color: "#B98CFF",
  },
  {
    id: "SV-006",
    title: "The Architect Descends — II",
    song: "cool master",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Same session, second angle — the pendant catches light, the hands speak a different phrase.",
    style: "Solo · Cinematic · Alternate",
    art: "/manus-storage/sv-nft-06-architect-descends-ii_d5eef6a6.png",
    color: "#8899AA",
  },
  {
    id: "SV-007",
    title: "Bulls & Burgundy",
    song: "Chase Too Fast",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Red Bulls cap, camera in hand, burgundy Adidas — two creators in the venue doorway, the night just beginning.",
    style: "Venue · Duo · Entrance",
    art: "/manus-storage/sv-nft-07-bulls-and-burgundy_744d76c0.png",
    color: "#FF3B30",
  },
  {
    id: "SV-008",
    title: "Steps of Intention",
    song: "Day by Day",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Sitting on concrete steps in the sun, chain down, Jordan 1s — quiet focus before the move.",
    style: "Solo · Outdoor · Contemplative",
    art: "/manus-storage/sv-nft-08-steps-of-intention_b072aa93.png",
    color: "#FFB800",
  },
  {
    id: "SV-009",
    title: "Spectrum Sovereign",
    song: "Walk It Talk It",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Full-body rainbow puffer, STP cap, multicolor sneakers — the whole room watching one frequency.",
    style: "Solo · Club · Full Body",
    art: "/manus-storage/sv-nft-09-spectrum-sovereign_1025b4be.png",
    color: "#00FF88",
  },
  {
    id: "SV-010",
    title: "Steps of Intention — II",
    song: "Day by Day",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Same session, different angle — the light hits the chain differently, same stillness.",
    style: "Solo · Outdoor · Profile",
    art: "/manus-storage/sv-nft-10-steps-of-intention-ii_a64dc541.png",
    color: "#FFB800",
  },
  {
    id: "SV-011",
    title: "Smoke Busters — The Artifact",
    song: "Fuck Up the Change",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Stay Puft reimagined as a sovereign street figure — cracked, chained, holding the Oaktree sign — original product art.",
    style: "Product Art · Collector · Original",
    art: "/manus-storage/sv-nft-11-smoke-busters-artifact_9bf17055.png",
    color: "#B98CFF",
  },
  {
    id: "SV-012",
    title: "Spectrum Sovereign — Photo by Rizz",
    song: "Walk It Talk It",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Professional photographer's frame of the same rainbow puffer moment — official documentation.",
    style: "Solo · Club · Professional",
    art: "/manus-storage/sv-nft-12-spectrum-sovereign-rizz_4c634af0.png",
    color: "#00D4FF",
  },
  {
    id: "SV-013",
    title: "The Conversation",
    song: "Nobody",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Two men in a kitchen space, Rugrats hoodie, blue Jordans, hands moving — the real meeting happens between the words.",
    style: "Duo · Indoor · Creative",
    art: "/manus-storage/sv-nft-13-the-conversation_b2d64d54.png",
    color: "#00FF88",
  },
  {
    id: "SV-014",
    title: "Spectrum Sovereign — III",
    song: "Walk It Talk It",
    songUrl: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    concept: "Third angle of the same rainbow puffer session — the full silhouette, the crowd behind.",
    style: "Solo · Club · Silhouette",
    art: "/manus-storage/sv-nft-14-spectrum-sovereign-iii_61f9876b.png",
    color: "#FF6B9A",
  },
];

export default function SovereignCartoonGallery() {
  useSovereignHeartbeat({ page: "sovereign-cartoon-gallery" });
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Solo", "Duo", "Group", "Product Art"];
  const filtered = filter === "All" ? PIECES : PIECES.filter(p => p.style.includes(filter));
  const active = selected ? PIECES.find(p => p.id === selected) : null;

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`Token ID ${id} copied`);
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.15)", background: "rgba(0,212,255,0.03)" }}>
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="text-xs font-mono" style={{ color: "#8899AA" }}>← ScrollVerse</Link>
            <span style={{ color: "#8899AA" }}>/</span>
            <span className="text-xs font-mono" style={{ color: "#00D4FF" }}>Sovereign Gallery</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Sovereign Cartoon Gallery</h1>
          <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
            Original illustrated artworks transformed from first-party photos. Each piece is named, paired with a Chais the Great catalog track, and assigned a sovereign token record. Owner-created. Expandable as the journey continues.
          </p>
          <PortalTrustLens
            lane="Visual Archive"
            source="Owner-supplied first-party photos · Chais the Great Spotify catalog"
            readiness="Available now — artwork generated, token records browser-local"
            boundary="No NFT has been minted, listed, sold, or transferred. No blockchain action has occurred."
          />
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b" style={{ borderColor: "rgba(255,184,0,0.1)" }}>
        <div className="container py-3 flex flex-wrap gap-6">
          {[
            { label: "Total Pieces", value: "14" },
            { label: "Catalog Songs", value: "8" },
            { label: "Series", value: "3" },
            { label: "Status", value: "BROWSER-LOCAL · NO MINT" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{s.label}</div>
              <div className="text-sm font-bold" style={{ color: "#FFB800" }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-mono transition-all"
              style={{
                background: filter === f ? "#00D4FF" : "rgba(0,212,255,0.08)",
                color: filter === f ? "#050B1A" : "#00D4FF",
                border: "1px solid rgba(0,212,255,0.3)",
              }}
            >
              {f}
            </button>
          ))}
          <span className="text-xs font-mono self-center ml-2" style={{ color: "#8899AA" }}>{filtered.length} pieces</span>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
          {filtered.map(piece => (
            <div
              key={piece.id}
              className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group"
              style={{
                border: selected === piece.id ? `2px solid ${piece.color}` : "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                transform: selected === piece.id ? "scale(1.02)" : "scale(1)",
              }}
              onClick={() => setSelected(selected === piece.id ? null : piece.id)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={piece.art}
                  alt={piece.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(5,11,26,0.85)", color: piece.color, border: `1px solid ${piece.color}40` }}>
                    {piece.id}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="text-xs font-bold text-white truncate mb-0.5">{piece.title}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>♪ {piece.song}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {active && (
          <div className="rounded-2xl p-6 mb-10" style={{ border: `1px solid ${active.color}30`, background: `${active.color}05` }}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-full md:w-48">
                <img src={active.art} alt={active.title} className="w-full rounded-xl" style={{ border: `2px solid ${active.color}50` }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${active.color}20`, color: active.color }}>
                    {active.id}
                  </span>
                  <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{active.style}</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-2">{active.title}</h2>
                <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{active.concept}</p>
                <div className="rounded-xl p-4 mb-4" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>CATALOG PAIRING</div>
                  <div className="font-bold text-white mb-1">♪ {active.song}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>Chais the Great · Full publishing control · 90/10 Vydia distribution</div>
                  <a href={active.songUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs font-mono" style={{ color: "#00D4FF" }}>
                    Open on Spotify →
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyId(active.id)}
                    className="px-4 py-2 rounded-lg text-xs font-mono"
                    style={{ background: `${active.color}20`, color: active.color, border: `1px solid ${active.color}40` }}
                  >
                    Copy Token ID
                  </button>
                  <button
                    onClick={() => { navigator.clipboard.writeText(`${active.id} · ${active.title} · ${active.song} · ${active.concept}`); toast.success("Record copied"); }}
                    className="px-4 py-2 rounded-lg text-xs font-mono"
                    style={{ background: "rgba(0,212,255,0.08)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
                  >
                    Copy Full Record
                  </button>
                  <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg text-xs font-mono" style={{ background: "rgba(255,255,255,0.04)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Intake slot */}
        <div className="rounded-2xl p-6 mb-8" style={{ border: "1px dashed rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.02)" }}>
          <div className="text-xs font-mono mb-2" style={{ color: "#00FF88" }}>OPEN INTAKE SLOT</div>
          <h3 className="text-lg font-bold text-white mb-1">Add the Next Piece</h3>
          <p className="text-sm" style={{ color: "#8899AA" }}>
            Send a new photo and it becomes the next sovereign token record — named, illustrated, and paired with a catalog track. The gallery grows with the journey.
          </p>
        </div>

        {/* Archive handoffs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Evolution Lookbook", path: "/evolution-lookbook", color: "#FFB800", desc: "Full fashion and visual catalog" },
            { label: "Special Repository", path: "/special-repository", color: "#B98CFF", desc: "Artifact accession and collector records" },
            { label: "Spotify Catalog", href: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr", color: "#00FF88", desc: "Chais the Great · Full publishing control" },
          ].map(h => (
            <div key={h.label} className="rounded-xl p-4" style={{ border: `1px solid ${h.color}20`, background: `${h.color}05` }}>
              <div className="text-xs font-mono mb-1" style={{ color: h.color }}>HANDOFF</div>
              <div className="font-bold text-white mb-1">{h.label}</div>
              <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{h.desc}</div>
              {h.path ? (
                <Link href={h.path} className="text-xs font-mono" style={{ color: h.color }}>Open →</Link>
              ) : (
                <a href={h.href} target="_blank" rel="noopener noreferrer" className="text-xs font-mono" style={{ color: h.color }}>Open →</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
