import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

// FASHION EMPIRE — XLVIII BLOCKS × VNLND × Mays Landing
// Exceeds Off-White. Exceeds Yeezy. First brand to attach crypto incentive + digital coin.
// Every pair mints a $BLOCKS coin. Every logo tokenized. Every colorway an NFT set.

const COLORWAYS = [
  { name: "Night Drop Black", code: "08360", hex: "#0A0A0A", accent: "#FFB800", desc: "The origin. Vineland midnight. Gold foil zip-tie. The drop that started everything.", coin: "$BLOCKS-BLACK", nft: "Night Drop Collection #001" },
  { name: "Sage 485 GSM", code: "SAGE", hex: "#8FAF8A", accent: "#D4AF37", desc: "485 GSM heavyweight. Mays Landing compass on the back. The track suit that moves like armor.", coin: "$BLOCKS-SAGE", nft: "Sage Compass Collection #002" },
  { name: "Pleasantville Purple", code: "08232", hex: "#4B0082", accent: "#C9A0DC", desc: "The signature colorway. Named for Pleasantville, NJ. Royal, sovereign, unmistakable.", coin: "$BLOCKS-PURPLE", nft: "Pleasantville Collection #003" },
  { name: "Atlantic City Gold", code: "08401", hex: "#B8860B", accent: "#FFD700", desc: "The Bella Complex colorway. Atlantic City energy. The empire's crown jewel.", coin: "$BLOCKS-GOLD", nft: "Atlantic City Collection #004" },
  { name: "Mays Landing Cream", code: "08330", hex: "#F5F0E8", accent: "#8B7355", desc: "Clean. Minimal. The compass center. Cream on cream with tonal embroidery.", coin: "$BLOCKS-CREAM", nft: "Mays Landing Collection #005" },
  { name: "Sovereign Cyan", code: "CYAN", hex: "#003D4D", accent: "#00D4FF", desc: "ScrollVerse frequency color. 963Hz woven into the fabric. The digital-physical bridge.", coin: "$BLOCKS-CYAN", nft: "Sovereign Frequency Collection #006" },
  { name: "Zakat Green", code: "ZAKAT", hex: "#1A3A2A", accent: "#00FF88", desc: "12% of every sale goes to Zakat. The green that gives back. Agape woven in.", coin: "$BLOCKS-GREEN", nft: "Zakat Collection #007" },
];

const SNEAKER_MODELS = [
  {
    name: '"XLVIII FORCE"',
    tagline: "The Sovereign 1",
    desc: "Low-top silhouette. Deconstructed tongue with exposed stitching. Mays Landing compass on the heel tab. 08360 zip-tie on the lace loop. Every pair mints 48 $BLOCKS coins.",
    price: "$244",
    coin: "48 $BLOCKS",
    nft: "XLVIII Force #001",
    colorways: ["Night Drop Black", "Sage", "Atlantic City Gold"],
    manufacturer: "White-label partner: Asia Pacific Footwear Alliance",
    freq: "963Hz",
  },
  {
    name: '"VNLND RUNNER"',
    tagline: "The South Jersey Speed",
    desc: "Technical runner. 3M reflective panels. VNLND embroidered on the tongue. Pleasantville Purple colorway exclusive. Each pair mints a unique NFT with GPS coordinates of Vineland, NJ.",
    price: "$188",
    coin: "44 $BLOCKS",
    nft: "VNLND Runner #001",
    colorways: ["Pleasantville Purple", "Sovereign Cyan", "Night Drop Black"],
    manufacturer: "White-label partner: Guangzhou Sovereign Footwear Co.",
    freq: "741Hz",
  },
  {
    name: '"COMPASS HIGH"',
    tagline: "The Direction Setter",
    desc: "High-top basketball silhouette. Full Mays Landing compass on the ankle panel. Quilted upper in 485 GSM weight. The sneaker that points home. 88 $BLOCKS per pair — AgapeCycle built in.",
    price: "$333",
    coin: "88 $BLOCKS",
    nft: "Compass High #001",
    colorways: ["Mays Landing Cream", "Zakat Green", "Sage"],
    manufacturer: "White-label partner: Premium Footwear Solutions, Vietnam",
    freq: "528Hz",
  },
];

const LOGOS = [
  { name: "XLVIII BLOCKS", desc: "Atlantic City. The 48 blocks of the empire. Gold foil on black. The anchor.", coin: "$BLOCKS-XLVIII", nft: "XLVIII Blocks Logo NFT #001", color: "#FFB800" },
  { name: "VNLND", desc: "Vineland, NJ. Minimal. Architectural. Cumberland County NJ™. The origin.", coin: "$BLOCKS-VNLND", nft: "VNLND Logo NFT #001", color: "#00D4FF" },
  { name: "Mays Landing Compass", desc: "08330. The compass rose. N·E·S·W. Atlantic County. The direction of the empire.", coin: "$BLOCKS-COMPASS", nft: "Compass Logo NFT #001", color: "#00FF88" },
  { name: "ScrollVerse Trinity", desc: "The digital-physical bridge. Frequency-coded. 963Hz woven in. The universe brand.", coin: "$BLOCKS-SV", nft: "ScrollVerse Logo NFT #001", color: "#9B59B6" },
];

const MANUFACTURERS = [
  { name: "Asia Pacific Footwear Alliance", region: "Vietnam & Indonesia", specialty: "Premium athletic + lifestyle", moq: "500 pairs", lead: "90 days", tier: "TIER 1" },
  { name: "Guangzhou Sovereign Footwear Co.", region: "Guangzhou, China", specialty: "Technical runners + high-tops", moq: "300 pairs", lead: "75 days", tier: "TIER 1" },
  { name: "Premium Footwear Solutions", region: "Ho Chi Minh City, Vietnam", specialty: "Basketball + high-performance", moq: "400 pairs", lead: "85 days", tier: "TIER 1" },
  { name: "Printful Apparel", region: "USA + EU warehouses", specialty: "Print-on-demand hoodies, tees, sweatsuits", moq: "1 unit", lead: "5–7 days", tier: "POD" },
  { name: "Printify Premium", region: "Global network", specialty: "Embroidery + premium apparel", moq: "1 unit", lead: "7–10 days", tier: "POD" },
];

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3, a: Math.random(),
      color: ["#FFB800", "#D4AF37", "#FFFFFF"][Math.floor(Math.random() * 3)],
    }));
    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a = 0.3 + 0.7 * Math.abs(Math.sin(Date.now() / 2500 + s.x));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(s.a * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function FashionEmpire() {
  const [activeTab, setActiveTab] = useState<"colorways" | "sneakers" | "logos" | "matrix" | "virgil">("colorways");
  const [mintedCoin, setMintedCoin] = useState<string | null>(null);

  const handleMint = (coin: string) => {
    setMintedCoin(coin);
    setTimeout(() => setMintedCoin(null), 3000);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <StarCanvas />
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-8 px-4">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
            XLVIII BLOCKS LLC · SCROLL VERSE LLC · SOUTH JERSEY SOVEREIGN
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-2">
            "FASHION EMPIRE"
          </h1>
          <div className="text-xl font-bold mb-4" style={{ color: "#FFB800" }}>
            The First Brand to Attach Crypto Incentive to Every Pair
          </div>
          <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Every sneaker mints a $BLOCKS coin. Every logo is tokenized. Every colorway is an NFT set.
            White-label supply chain. Multiple manufacturers. Passive and aggressive income.
            Virgil's 3% rule applied to the entire fashion-music-entertainment industry.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { v: "7", l: "Colorways" },
              { v: "3", l: "Sneaker Models" },
              { v: "4", l: "Logo Coins" },
              { v: "5", l: "Manufacturers" },
              { v: "$BLOCKS", l: "Native Coin" },
            ].map(s => (
              <div key={s.l} className="text-center px-4 py-2 rounded-lg" style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-lg font-black" style={{ color: "#FFB800" }}>{s.v}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 px-4 mb-8">
          {(["colorways", "sneakers", "logos", "matrix", "virgil"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
              style={activeTab === tab
                ? { background: "#FFB800", color: "#050B1A" }
                : { background: "rgba(255,184,0,0.08)", color: "#8899AA", border: "1px solid rgba(255,184,0,0.2)" }
              }>
              {tab === "matrix" ? "Manufacturer Matrix" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-16">
          {/* Colorways */}
          {activeTab === "colorways" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-6 text-center">7-Colorway Collection</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COLORWAYS.map((cw, i) => (
                  <div key={i} className="p-5 rounded-xl overflow-hidden relative" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${cw.accent}30` }}>
                    <div className="w-full h-16 rounded-lg mb-4 flex items-center justify-center" style={{ background: cw.hex, border: `2px solid ${cw.accent}40` }}>
                      <span className="text-xs font-mono font-bold" style={{ color: cw.accent }}>"{cw.code}"</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{cw.name}</h3>
                    <p className="text-xs mb-3" style={{ color: "#8899AA" }}>{cw.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${cw.accent}15`, color: cw.accent }}>{cw.coin}</span>
                      <button onClick={() => handleMint(cw.coin)}
                        className="text-xs px-3 py-1 rounded font-bold transition-all hover:opacity-80"
                        style={{ background: cw.accent, color: "#050B1A" }}>
                        Mint NFT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {mintedCoin && (
                <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-bold z-50"
                  style={{ background: "#FFB800", color: "#050B1A" }}>
                  ✅ {mintedCoin} minted! NFT incoming. KUN FAYAKŪN × ∞
                </div>
              )}
            </div>
          )}

          {/* Sneakers */}
          {activeTab === "sneakers" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-2 text-center">Sneaker Models</h2>
              <p className="text-sm text-center mb-8" style={{ color: "#8899AA" }}>
                First sneaker brand to attach crypto incentive. Every pair mints $BLOCKS coins.
              </p>
              <div className="space-y-6">
                {SNEAKER_MODELS.map((sneaker, i) => (
                  <div key={i} className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,184,0,0.15)" }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-black text-white">{sneaker.name}</h3>
                        <div className="text-sm font-bold" style={{ color: "#FFB800" }}>{sneaker.tagline}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black" style={{ color: "#00FF88" }}>{sneaker.price}</div>
                        <div className="text-xs font-mono" style={{ color: "#FFB800" }}>{sneaker.coin} per pair</div>
                      </div>
                    </div>
                    <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{sneaker.desc}</p>
                    <div className="grid md:grid-cols-3 gap-3 mb-4">
                      <div className="p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.3)" }}>
                        <div className="text-xs font-mono mb-1" style={{ color: "#FFB800" }}>COLORWAYS</div>
                        <div className="text-xs text-white">{sneaker.colorways.join(" · ")}</div>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.3)" }}>
                        <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>NFT</div>
                        <div className="text-xs text-white">{sneaker.nft}</div>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.3)" }}>
                        <div className="text-xs font-mono mb-1" style={{ color: "#00FF88" }}>FREQUENCY</div>
                        <div className="text-xs text-white">{sneaker.freq}</div>
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{sneaker.manufacturer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logos */}
          {activeTab === "logos" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-2 text-center">Logo Coins & NFT Sets</h2>
              <p className="text-sm text-center mb-8" style={{ color: "#8899AA" }}>
                Every logo is tokenized. Every mascot has a coin. Every design is an NFT set.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {LOGOS.map((logo, i) => (
                  <div key={i} className="p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${logo.color}30` }}>
                    <h3 className="text-lg font-black mb-1" style={{ color: logo.color }}>"{logo.name}"</h3>
                    <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{logo.desc}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${logo.color}15`, color: logo.color }}>{logo.coin}</span>
                      <span className="text-xs" style={{ color: "#8899AA" }}>{logo.nft}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 rounded-2xl text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-lg font-bold text-white mb-2">The $BLOCKS Ecosystem</div>
                <p className="text-sm" style={{ color: "#8899AA" }}>
                  $BLOCKS is the native coin of the XLVIII BLOCKS fashion empire. Every purchase mints coins.
                  Every logo has its own sub-coin. Every colorway is an NFT set.
                  The entire fashion-music-entertainment industry unified under one sovereign token economy.
                </p>
              </div>
            </div>
          )}

          {/* Manufacturer Matrix */}
          {activeTab === "matrix" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-2 text-center">Manufacturer Matrix</h2>
              <p className="text-sm text-center mb-8" style={{ color: "#8899AA" }}>
                Multiple manufacturers handle supply and demand. White-label bleeding seamlessly into culture.
              </p>
              <div className="space-y-4">
                {MANUFACTURERS.map((mfr, i) => (
                  <div key={i} className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,184,0,0.15)" }}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-bold text-white">{mfr.name}</h3>
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{
                        background: mfr.tier === "TIER 1" ? "rgba(0,255,136,0.1)" : "rgba(0,212,255,0.1)",
                        color: mfr.tier === "TIER 1" ? "#00FF88" : "#00D4FF",
                        border: `1px solid ${mfr.tier === "TIER 1" ? "rgba(0,255,136,0.3)" : "rgba(0,212,255,0.3)"}`
                      }}>{mfr.tier}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "Region", value: mfr.region },
                        { label: "Specialty", value: mfr.specialty },
                        { label: "MOQ", value: mfr.moq },
                        { label: "Lead Time", value: mfr.lead },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="text-xs font-mono mb-0.5" style={{ color: "#8899AA" }}>{item.label}</div>
                          <div className="text-xs text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Virgil tab */}
          {activeTab === "virgil" && (
            <div className="text-center">
              <h2 className="text-2xl font-black text-white mb-4">The Virgil Blueprint</h2>
              <p className="text-sm mb-8 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
                Virgil Abloh proved that a kid from the Midwest could become the most influential designer in the world.
                We apply his 3% rule to every product, every coin, every drop.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { rule: "3% Rule", desc: "Change something 3% and it becomes entirely new. We take the sneaker, add the zip code, add the coin — 3% shift, infinite impact.", color: "#FFB800" },
                  { rule: "Quotation Marks", desc: '"XLVIII BLOCKS" "VNLND" "08360" — quotation marks question the archetype. They say: this is not just a brand. This is a statement.', color: "#00D4FF" },
                  { rule: "Industrial Archetypes", desc: "Zip ties. Compass roses. City codes. Virgil used construction tape. We use South Jersey geography. The archetype is the message.", color: "#00FF88" },
                ].map(item => (
                  <div key={item.rule} className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}30` }}>
                    <h3 className="text-lg font-bold mb-2" style={{ color: item.color }}>{item.rule}</h3>
                    <p className="text-sm" style={{ color: "#8899AA" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/virgil-abloh">
                <button className="px-8 py-3 rounded-xl font-bold" style={{ background: "#FFB800", color: "#050B1A" }}>
                  🎨 Full Virgil Legacy Page
                </button>
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: "rgba(255,184,0,0.1)" }}>
            <p className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              XLVIII BLOCKS LLC · SCROLL VERSE LLC · "08360" · KUN FAYAKŪN × ∞
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/virgil-abloh">
                <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "#FFB800", color: "#050B1A" }}>🎨 Virgil Legacy</button>
              </Link>
              <Link href="/sovereign-card">
                <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>💳 Sovereign Card</button>
              </Link>
              <Link href="/channel-codex">
                <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>🎵 Channel Codex</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
