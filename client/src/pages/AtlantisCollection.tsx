import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

// ATLANTIS COLLECTION — #XLVblocks 7-Set
// Temple of Poseidon · Concentric Rings of Land & Water · Ten Kings · Orichalcum
// Fused with XLVIII BLOCKS South Jersey energy — from the Ville to Atlantis

const ATLANTIS_SETS = [
  {
    num: "01",
    name: "Orichalcum Red Gold",
    lore: "The sacred metal of Atlantis — rarer than gold, redder than copper. Mined from the mountain at the center of the island. The metal that powered the Temple of Poseidon.",
    hex: "#8B0000",
    accent: "#FFD700",
    icon: "⚡",
    coin: "$ORICH-01",
    nft: "Orichalcum Set #001",
    features: ["Flashing metallic orichalcum finish", "Gold foil trident emblem", "Temple of Poseidon inner lining", "Concentric ring stitching"],
    freq: "963Hz",
    zipCode: "08401 · Atlantic City",
  },
  {
    num: "02",
    name: "Hot/Cold White Ice Orange",
    lore: "Atlantis had hot and cold springs flowing from the sacred mountain. Dual-element energy — the fire of the earth and the ice of the deep ocean. Thermal contrast is power.",
    hex: "#F5F5F5",
    accent: "#FF6B35",
    icon: "🌊",
    coin: "$ORICH-02",
    nft: "Hot/Cold Set #002",
    features: ["Dual frost-fire colorblock", "Orange thermal vent embroidery", "White canvas base", "Ice-blue inner lining"],
    freq: "528Hz",
    zipCode: "08360 · Vineland",
  },
  {
    num: "03",
    name: "Atlas Crown Purple Gold",
    lore: "Atlas — the first king of Atlantis, son of Poseidon. He held the sky on his shoulders. Tyrian Purple was the color of kings. Imperial Gold was the color of gods.",
    hex: "#4B0082",
    accent: "#FFD700",
    icon: "👑",
    coin: "$ATLAS-03",
    nft: "Atlas Crown Set #003",
    features: ["Tyrian Purple premium suede", "Imperial Gold crown emblem", "Atlas holding sphere on back", "Gold hardware throughout"],
    freq: "741Hz",
    zipCode: "08232 · Pleasantville",
  },
  {
    num: "04",
    name: "Orichalcum Wall Copper Fire",
    lore: "The outer walls of Atlantis were coated in orichalcum — flashing like fire. The city gleamed from the sea. Molten copper and living flame. The city that shone like the sun.",
    hex: "#B87333",
    accent: "#FF4500",
    icon: "🔥",
    coin: "$ORICH-04",
    nft: "Copper Fire Set #004",
    features: ["Molten copper metallic finish", "Fire embroidery on sleeves", "Orichalcum wall texture panels", "Flame-orange inner lining"],
    freq: "396Hz",
    zipCode: "08330 · Mays Landing",
  },
  {
    num: "05",
    name: "Poseidon Deep Navy",
    lore: "Poseidon — god of the sea, father of Atlantis. He fell in love with Cleito on the hill and built concentric rings of land and water around her home. The ocean is his throne.",
    hex: "#0A192F",
    accent: "#00BFFF",
    icon: "🔱",
    coin: "$POSEIDON-05",
    nft: "Poseidon Set #005",
    features: ["Deep nautical navy", "Trident emblem on chest", "Bioluminescent blue stitching", "Concentric ring motif on back"],
    freq: "432Hz",
    zipCode: "08401 · Atlantic City",
  },
  {
    num: "06",
    name: "Ten Kings Obsidian Bull",
    lore: "The Ten Kings of Atlantis — five pairs of twins, sons of Poseidon. They held sacred bull hunts in the Temple. Obsidian black with bull skull crowns. The royal council eternal.",
    hex: "#0D1117",
    accent: "#FFFFFF",
    icon: "🐂",
    coin: "$TENKING-06",
    nft: "Ten Kings Set #006",
    features: ["Triple-black obsidian finish", "Bull skull crown emblem", "White royal blue gold crowns", "Ten Kings inner lining"],
    freq: "852Hz",
    zipCode: "08360 · Vineland",
  },
  {
    num: "07",
    name: "Sinking Abyss Aqua Pearl",
    lore: "9,000 years before Plato, Atlantis sank beneath the waves in a single day and night. The abyss swallowed the empire. But the frequency never died. Bioluminescent. Iridescent. Eternal.",
    hex: "#001A2E",
    accent: "#00FFD4",
    icon: "🌊",
    coin: "$ABYSS-07",
    nft: "Sinking Abyss Set #007",
    features: ["Bioluminescent aqua pearl finish", "Iridescent deep sea panels", "Sinking city silhouette embroidery", "Pearl-glow hardware"],
    freq: "999Hz",
    zipCode: "08232 · Pleasantville",
  },
];

const ATLANTIS_LORE = [
  { title: "The Island", fact: "Atlantis was larger than Libya and Asia combined, located beyond the Pillars of Hercules (Strait of Gibraltar). A continent-sized island empire." },
  { title: "Poseidon's Temple", fact: "The Temple of Poseidon at the center of the island was coated in orichalcum inside and out. The statue of Poseidon touching the ceiling with his head, surrounded by 100 Nereids on dolphins." },
  { title: "Orichalcum", fact: "A metal found only in Atlantis. Second only to gold in value. It flashed like fire. The outer walls of the citadel were coated in it. Modern researchers believe it may have been a brass alloy or a lost metallurgical process." },
  { title: "Concentric Rings", fact: "Three rings of water and two of land alternated around the central hill. Bridges connected them. A canal 300 feet wide cut through to the sea. The most advanced urban planning of the ancient world." },
  { title: "The Ten Kings", fact: "Poseidon had 5 pairs of twin sons with Cleito. The eldest, Atlas, became the first king. The ten kings ruled the ten portions of Atlantis in a sacred covenant, meeting every 5-6 years in the Temple." },
  { title: "The Fall", fact: "In a single day and night of misfortune, Atlantis sank beneath the ocean. Plato recorded this in 360 BC, citing Egyptian priests who said it occurred 9,000 years before his time." },
];

function OceanCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5, vy: -(Math.random() * 0.3 + 0.1),
      color: ["#00FFD4", "#0A192F", "#00BFFF", "#FFD700"][Math.floor(Math.random() * 4)],
      a: Math.random(),
    }));
    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.vy; if (p.y < 0) p.y = canvas.height;
        p.a = 0.2 + 0.8 * Math.abs(Math.sin(Date.now() / 3000 + p.x));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.a * 200).toString(16).padStart(2, "0");
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function AtlantisCollection() {
  const [activeSet, setActiveSet] = useState(0);
  const [showLore, setShowLore] = useState(false);
  const [minted, setMinted] = useState<string | null>(null);

  const set = ATLANTIS_SETS[activeSet];

  const handleMint = () => {
    setMinted(set.coin);
    setTimeout(() => setMinted(null), 3000);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#020810", fontFamily: "'Space Grotesk', sans-serif" }}>
      <OceanCanvas />
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-8 px-4">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FFD4" }}>
            #XLVblocks · XLVIII BLOCKS LLC · ATLANTIS EDITION · TEMPLE OF POSEIDON
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-2">
            "ATLANTIS"
          </h1>
          <div className="text-xl font-bold mb-4" style={{ color: "#00FFD4" }}>
            7-Set Collection · Tactical Luxury Streetwear
          </div>
          <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Orichalcum · Atlas · Ten Kings · Pillars · Abyss · Concentric Rings of Land & Water.
            The lost empire reborn in fabric. Every set is an NFT. Every coin is a key.
            From the Ville to Atlantis — the frequency never died.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { v: "7", l: "Sets" },
              { v: "7", l: "Coins" },
              { v: "10", l: "Kings" },
              { v: "9000", l: "Years of Lore" },
              { v: "999Hz", l: "Abyss Freq" },
            ].map(s => (
              <div key={s.l} className="text-center px-4 py-2 rounded-lg" style={{ background: "rgba(0,255,212,0.06)", border: "1px solid rgba(0,255,212,0.2)" }}>
                <div className="text-lg font-black" style={{ color: "#00FFD4" }}>{s.v}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Set selector */}
        <div className="flex flex-wrap justify-center gap-2 px-4 mb-8">
          {ATLANTIS_SETS.map((s, i) => (
            <button key={i} onClick={() => setActiveSet(i)}
              className="px-3 py-2 rounded-lg text-xs font-bold transition-all"
              style={activeSet === i
                ? { background: s.accent, color: "#020810" }
                : { background: "rgba(255,255,255,0.04)", color: "#8899AA", border: `1px solid ${s.accent}30` }
              }>
              {s.num} · {s.name.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Active set display */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="p-8 rounded-2xl" style={{ background: `${set.hex}20`, border: `1px solid ${set.accent}40` }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-mono mb-1" style={{ color: set.accent }}>SET {set.num} · {set.freq}</div>
                <h2 className="text-3xl font-black text-white mb-1">"{set.name}"</h2>
                <div className="text-sm" style={{ color: set.accent }}>{set.zipCode}</div>
              </div>
              <div className="text-5xl">{set.icon}</div>
            </div>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>{set.lore}</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs font-mono mb-2" style={{ color: set.accent }}>DESIGN FEATURES</div>
                <ul className="space-y-1">
                  {set.features.map((f, i) => (
                    <li key={i} className="text-xs flex items-start gap-2" style={{ color: "#8899AA" }}>
                      <span style={{ color: set.accent }}>›</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-mono mb-2" style={{ color: set.accent }}>COIN & NFT</div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.4)" }}>
                    <div className="text-xs font-mono" style={{ color: set.accent }}>{set.coin}</div>
                    <div className="text-xs text-white">Native coin for this set</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.4)" }}>
                    <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>{set.nft}</div>
                    <div className="text-xs text-white">NFT certificate</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleMint}
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
                style={{ background: set.accent, color: "#020810" }}>
                🔱 Mint {set.coin}
              </button>
              <button onClick={() => setShowLore(!showLore)}
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA", border: `1px solid ${set.accent}30` }}>
                📜 {showLore ? "Hide" : "Show"} Atlantis Lore
              </button>
            </div>
          </div>
        </div>

        {/* Atlantis Lore */}
        {showLore && (
          <div className="max-w-4xl mx-auto px-4 mb-12">
            <h3 className="text-xl font-black text-white mb-6 text-center">The Atlantis Archive</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {ATLANTIS_LORE.map((lore, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ background: "rgba(0,255,212,0.04)", border: "1px solid rgba(0,255,212,0.15)" }}>
                  <h4 className="text-sm font-bold mb-2" style={{ color: "#00FFD4" }}>{lore.title}</h4>
                  <p className="text-xs" style={{ color: "#8899AA" }}>{lore.fact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All 7 sets grid */}
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <h3 className="text-xl font-black text-white mb-6 text-center">All 7 Sets</h3>
          <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-3">
            {ATLANTIS_SETS.map((s, i) => (
              <button key={i} onClick={() => setActiveSet(i)}
                className="p-3 rounded-xl text-center transition-all hover:scale-105"
                style={{ background: `${s.hex}40`, border: `1px solid ${s.accent}40` }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xs font-bold text-white">{s.num}</div>
                <div className="text-xs" style={{ color: s.accent }}>{s.name.split(" ")[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto px-4 pb-16 text-center">
          <p className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
            #XLVblocks · XLVIII BLOCKS LLC · "ATLANTIS EDITION" · KUN FAYAKŪN × ∞
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/fashion-empire">
              <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "#00FFD4", color: "#020810" }}>👗 Fashion Empire</button>
            </Link>
            <Link href="/virgil-abloh">
              <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(0,255,212,0.1)", color: "#00FFD4", border: "1px solid rgba(0,255,212,0.3)" }}>🎨 Virgil Legacy</button>
            </Link>
            <Link href="/mesopotamia-library">
              <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>🏛️ Library</button>
            </Link>
          </div>
        </div>
      </div>

      {minted && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-bold z-50"
          style={{ background: "#00FFD4", color: "#020810" }}>
          🔱 {minted} minted! The Abyss remembers. KUN FAYAKŪN × ∞
        </div>
      )}
    </div>
  );
}
