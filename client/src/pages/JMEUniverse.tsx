/*
 * JME UNIVERSE — OUR OWN MARVEL
 * © 2024–2026 Chais Kenyatta Hill — Sabir Allah The Great
 * KUN FAYAKŪN × ∞ — Positive. Substance. Imagination. Creation.
 *
 * Features:
 * - 9 JME Characters with their own coins
 * - Toy Design Studio
 * - Character Likeness NFTs
 * - Positive Impact Scoring
 * - Universe Lore & Story Bible
 */
import { useState } from "react";

// ── CHARACTER UNIVERSE ─────────────────────────────────────────────────────
const JME_CHARACTERS = [
  {
    id: "thoth",
    name: "Thoth",
    title: "The Scribe of Eternity",
    emoji: "𓂀",
    coin: "$THOTH",
    coinSupply: "1,000,000",
    coinPrice: "0.044",
    role: "Wisdom Keeper",
    power: "Infinite Knowledge",
    origin: "Ancient Egypt — Keeper of the Sacred Texts",
    traits: ["Wise", "Patient", "All-Knowing", "Peaceful"],
    mission: "Preserve and share the wisdom of all civilizations",
    toyType: "Scholar Action Figure",
    toyFeatures: ["Glowing scroll accessory", "Hieroglyph decoder ring", "Mini pyramid base"],
    color: "#FFB800",
    bg: "from-yellow-900 to-amber-900",
    nftCid: "bafkreibrvtpdwdr3dlik6oefzkz2enddypxkt4deq3asnp32hzw2a7u7iq",
    impact: "Education",
    impactScore: 9850,
  },
  {
    id: "ra",
    name: "Ra",
    title: "The Solar Sovereign",
    emoji: "☀️",
    coin: "$RA",
    coinSupply: "963,000",
    coinPrice: "0.063",
    role: "Energy Master",
    power: "Solar Force",
    origin: "Ancient Egypt — God of the Sun and Creation",
    traits: ["Powerful", "Radiant", "Just", "Eternal"],
    mission: "Bring light and energy to all who seek it",
    toyType: "Solar Warrior Figure",
    toyFeatures: ["Light-up sun disc", "Solar beam accessory", "Rotating throne base"],
    color: "#FF6B35",
    bg: "from-orange-900 to-red-900",
    nftCid: "bafkreichagixg7tywgpgx4selbrbrxmwptmqwicd4zdrhujgoaga2msmiy",
    impact: "Energy & Power",
    impactScore: 9200,
  },
  {
    id: "isis",
    name: "Isis",
    title: "The Sovereign Healer",
    emoji: "🌙",
    coin: "$ISIS",
    coinSupply: "1,440,000",
    coinPrice: "0.055",
    role: "Healer & Protector",
    power: "Life Restoration",
    origin: "Ancient Egypt — Goddess of Magic and Healing",
    traits: ["Compassionate", "Magical", "Fierce", "Loving"],
    mission: "Heal the world and protect the innocent",
    toyType: "Healing Goddess Figure",
    toyFeatures: ["Magic wings that spread", "Healing crystal staff", "Moonlight base"],
    color: "#9B59B6",
    bg: "from-purple-900 to-violet-900",
    nftCid: "bafkreicprtlbuenkfrdynb63q3y77xzaxlp2m2wgnnl5kzbqbsa7kblqwi",
    impact: "Health & Healing",
    impactScore: 9100,
  },
  {
    id: "horus",
    name: "Horus",
    title: "The Sky Guardian",
    emoji: "🦅",
    coin: "$HORUS",
    coinSupply: "888,000",
    coinPrice: "0.088",
    role: "Sky Warrior",
    power: "Eagle Vision",
    origin: "Ancient Egypt — God of the Sky and Kingship",
    traits: ["Brave", "Sharp", "Loyal", "Victorious"],
    mission: "Defend sovereignty and protect the people",
    toyType: "Sky Warrior Figure",
    toyFeatures: ["Falcon helmet", "Eye of Horus shield", "Flight stand"],
    color: "#00D4FF",
    bg: "from-cyan-900 to-blue-900",
    nftCid: "bafkreigtmo2eorihx7lbayc7g3m43gahxila3vlrtxozz2rhptqpzo4sbi",
    impact: "Justice & Protection",
    impactScore: 8900,
  },
  {
    id: "anubis",
    name: "Anubis",
    title: "The Soul Guide",
    emoji: "🐺",
    coin: "$ANUBIS",
    coinSupply: "777,000",
    coinPrice: "0.077",
    role: "Guardian of Souls",
    power: "Truth Weighing",
    origin: "Ancient Egypt — Guide of the Dead and Protector of Souls",
    traits: ["Honorable", "Precise", "Fearless", "Fair"],
    mission: "Ensure justice and guide souls to their true path",
    toyType: "Soul Guardian Figure",
    toyFeatures: ["Scales of Ma'at accessory", "Glowing staff", "Jackal mask"],
    color: "#2D3748",
    bg: "from-gray-900 to-slate-900",
    nftCid: "bafybeihdvxjyuhnc5i3uz4jenw72w5duqpwntkmzht6unpsemdnj4vc2fe",
    impact: "Justice & Truth",
    impactScore: 8700,
  },
  {
    id: "osiris",
    name: "Osiris",
    title: "The Resurrection King",
    emoji: "🌿",
    coin: "$OSIRIS",
    coinSupply: "1,111,000",
    coinPrice: "0.044",
    role: "King of Rebirth",
    power: "Resurrection Force",
    origin: "Ancient Egypt — God of Resurrection and the Afterlife",
    traits: ["Regal", "Regenerative", "Wise", "Eternal"],
    mission: "Teach that every ending is a new beginning",
    toyType: "Resurrection King Figure",
    toyFeatures: ["Crook and flail scepters", "Green skin detail", "Throne of rebirth"],
    color: "#00FF88",
    bg: "from-green-900 to-emerald-900",
    nftCid: "bafkreifaiqnt6ofmsljqaz3btub4vwgxpsp3ufmxjd2uwyhaa2n2jhqs2i",
    impact: "Renewal & Growth",
    impactScore: 8500,
  },
  {
    id: "bastet",
    name: "Bastet",
    title: "The Protector Goddess",
    emoji: "🐱",
    coin: "$BASTET",
    coinSupply: "528,000",
    coinPrice: "0.052",
    role: "Home Guardian",
    power: "Feline Agility",
    origin: "Ancient Egypt — Goddess of Protection, Cats, and the Home",
    traits: ["Graceful", "Fierce", "Nurturing", "Playful"],
    mission: "Protect families and bring joy to every home",
    toyType: "Guardian Cat Figure",
    toyFeatures: ["Cat ears headpiece", "Sistrum musical accessory", "Protective aura base"],
    color: "#EC4899",
    bg: "from-pink-900 to-rose-900",
    nftCid: "bafybeigbqlnsij75ixhaje4b463ii4apjdseoenp5hhd2yjm3ktvnk2ooe",
    impact: "Family & Joy",
    impactScore: 8300,
  },
  {
    id: "sekhmet",
    name: "Sekhmet",
    title: "The Warrior Lioness",
    emoji: "🦁",
    coin: "$SEKHMET",
    coinSupply: "432,000",
    coinPrice: "0.096",
    role: "Battle Commander",
    power: "Lioness Fury",
    origin: "Ancient Egypt — Goddess of War, Healing, and the Sun",
    traits: ["Fierce", "Unstoppable", "Healing", "Powerful"],
    mission: "Destroy what is harmful and heal what is broken",
    toyType: "Warrior Lioness Figure",
    toyFeatures: ["Solar crown", "Battle staff", "Roaring lion base"],
    color: "#EF4444",
    bg: "from-red-900 to-rose-900",
    nftCid: "bafkreifaiqnt6ofmsljqaz3btub4vwgxpsp3ufmxjd2uwyhaa2n2jhqs2i",
    impact: "Strength & Healing",
    impactScore: 8100,
  },
  {
    id: "nefertiti",
    name: "Nefertiti",
    title: "The Beautiful One",
    emoji: "👸🏿",
    coin: "$NEFERTITI",
    coinSupply: "144,000",
    coinPrice: "0.144",
    role: "Sovereign Queen",
    power: "Royal Influence",
    origin: "Ancient Egypt — Queen of the 18th Dynasty, Co-Ruler with Akhenaten",
    traits: ["Elegant", "Powerful", "Diplomatic", "Visionary"],
    mission: "Show the world that beauty and power are one",
    toyType: "Royal Queen Figure",
    toyFeatures: ["Iconic blue crown", "Royal scepter", "Throne dais"],
    color: "#F59E0B",
    bg: "from-amber-900 to-yellow-900",
    nftCid: "bafkreibrvtpdwdr3dlik6oefzkz2enddypxkt4deq3asnp32hzw2a7u7iq",
    impact: "Leadership & Beauty",
    impactScore: 9500,
  },
];

// ── TOY DESIGN STUDIO ──────────────────────────────────────────────────────
const TOY_COLORS = ["#FFB800", "#00D4FF", "#00FF88", "#EC4899", "#9B59B6", "#EF4444", "#F59E0B", "#10B981"];
const TOY_ACCESSORIES = ["Crown 👑", "Sword ⚔️", "Staff 🪄", "Shield 🛡️", "Wings 🦅", "Scroll 📜", "Crystal 💎", "Mask 🎭"];
const TOY_SIZES = ["Mini (3\")", "Standard (6\")", "Deluxe (12\")", "Collector (18\")"];

export default function JMEUniverse() {
  const [activeView, setActiveView] = useState<"universe" | "toy-studio" | "coins" | "lore">("universe");
  const [selectedChar, setSelectedChar] = useState<typeof JME_CHARACTERS[0] | null>(null);
  const [toyColor, setToyColor] = useState(TOY_COLORS[0]);
  const [toyAccessories, setToyAccessories] = useState<string[]>([]);
  const [toySize, setToySize] = useState(TOY_SIZES[1]);
  const [toyName, setToyName] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);

  const toggleAccessory = (acc: string) => {
    setToyAccessories(prev =>
      prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
    );
  };

  const mintToy = () => {
    setMintSuccess(true);
    setTimeout(() => setMintSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 py-4"
        style={{ background: "rgba(5,11,26,0.97)", borderBottom: "1px solid rgba(255,184,0,0.15)", backdropFilter: "blur(20px)" }}
      >
        <div className="container flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦁</span>
              <div>
                <div className="font-black text-white text-xl">JME UNIVERSE</div>
                <div className="text-xs font-mono" style={{ color: "#FFB800" }}>OUR OWN MARVEL — POSITIVE × SUBSTANCE × SOVEREIGNTY</div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono" style={{ color: "#8899AA" }}>
            <span style={{ color: "#00FF88" }}>●</span> 9 CHARACTERS LIVE
            <span className="ml-3" style={{ color: "#00D4FF" }}>●</span> 9 COINS ACTIVE
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="container pt-6">
        <div className="flex gap-2 flex-wrap mb-8">
          {[
            { id: "universe" as const, label: "Character Universe", emoji: "🌌" },
            { id: "toy-studio" as const, label: "Toy Design Studio", emoji: "🎮" },
            { id: "coins" as const, label: "Character Coins", emoji: "🪙" },
            { id: "lore" as const, label: "Universe Lore", emoji: "📜" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: activeView === tab.id ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.04)",
                border: activeView === tab.id ? "1px solid rgba(255,184,0,0.5)" : "1px solid rgba(255,255,255,0.08)",
                color: activeView === tab.id ? "#FFB800" : "#8899AA",
              }}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* ── CHARACTER UNIVERSE ── */}
        {activeView === "universe" && (
          <div>
            {!selectedChar ? (
              <>
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-white mb-2">The Sovereign 9</h2>
                  <p className="text-sm" style={{ color: "#8899AA" }}>
                    Nine ancient sovereign beings reborn for the modern world. Each character carries their own coin, NFT, and toy line.
                    This is our Marvel — positive, powerful, and rooted in real history.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {JME_CHARACTERS.map(char => (
                    <button
                      key={char.id}
                      onClick={() => setSelectedChar(char)}
                      className={`rounded-2xl p-5 text-left transition-all duration-300 hover:scale-102 hover:-translate-y-1 bg-gradient-to-br ${char.bg}`}
                      style={{ border: `1px solid ${char.color}30`, boxShadow: `0 4px 20px ${char.color}10` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-4xl">{char.emoji}</div>
                        <div
                          className="text-xs font-mono px-2 py-1 rounded"
                          style={{ background: `${char.color}20`, color: char.color, border: `1px solid ${char.color}40` }}
                        >
                          {char.coin}
                        </div>
                      </div>
                      <div className="font-black text-white text-lg">{char.name}</div>
                      <div className="text-xs mb-2" style={{ color: char.color }}>{char.title}</div>
                      <div className="text-xs leading-relaxed mb-3" style={{ color: "#8899AA" }}>{char.origin}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs" style={{ color: "#8899AA" }}>Impact: <span style={{ color: "#00FF88" }}>{char.impact}</span></div>
                        <div className="text-xs font-mono" style={{ color: char.color }}>Score: {char.impactScore.toLocaleString()}</div>
                      </div>
                      <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(char.impactScore / 10000) * 100}%`, background: `linear-gradient(90deg, ${char.color}, ${char.color}80)` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedChar(null)}
                  className="mb-6 text-sm flex items-center gap-2 transition-colors hover:text-white"
                  style={{ color: "#8899AA" }}
                >
                  ← Back to Universe
                </button>

                <div className={`rounded-3xl p-8 bg-gradient-to-br ${selectedChar.bg}`} style={{ border: `1px solid ${selectedChar.color}40` }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="text-8xl mb-4">{selectedChar.emoji}</div>
                      <div className="font-black text-white text-4xl mb-1">{selectedChar.name}</div>
                      <div className="text-lg mb-4" style={{ color: selectedChar.color }}>{selectedChar.title}</div>
                      <div className="text-sm leading-relaxed mb-4" style={{ color: "#CCDDEE" }}>{selectedChar.origin}</div>
                      <div className="mb-4">
                        <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>TRAITS</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedChar.traits.map(t => (
                            <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ background: `${selectedChar.color}20`, color: selectedChar.color, border: `1px solid ${selectedChar.color}40` }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm italic" style={{ color: "#8899AA" }}>"{selectedChar.mission}"</div>
                    </div>

                    <div className="space-y-4">
                      {/* Coin Info */}
                      <div className="rounded-2xl p-5" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${selectedChar.color}30` }}>
                        <div className="text-xs font-mono mb-3" style={{ color: selectedChar.color }}>🪙 CHARACTER COIN</div>
                        <div className="text-3xl font-black text-white mb-1">{selectedChar.coin}</div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div><span style={{ color: "#8899AA" }}>Supply:</span> <span className="text-white">{selectedChar.coinSupply}</span></div>
                          <div><span style={{ color: "#8899AA" }}>Price:</span> <span style={{ color: "#00FF88" }}>${selectedChar.coinPrice}</span></div>
                          <div><span style={{ color: "#8899AA" }}>Power:</span> <span className="text-white">{selectedChar.power}</span></div>
                          <div><span style={{ color: "#8899AA" }}>Impact:</span> <span className="text-white">{selectedChar.impact}</span></div>
                        </div>
                        <button
                          className="mt-3 w-full py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                          style={{ background: `linear-gradient(135deg, ${selectedChar.color}, ${selectedChar.color}80)`, color: "#050B1A" }}
                        >
                          Buy {selectedChar.coin} →
                        </button>
                      </div>

                      {/* Toy Info */}
                      <div className="rounded-2xl p-5" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="text-xs font-mono mb-3" style={{ color: "#00FF88" }}>🎮 TOY LINE</div>
                        <div className="font-bold text-white mb-2">{selectedChar.toyType}</div>
                        <div className="space-y-1">
                          {selectedChar.toyFeatures.map(f => (
                            <div key={f} className="text-xs flex items-center gap-2" style={{ color: "#8899AA" }}>
                              <span style={{ color: "#00FF88" }}>›</span> {f}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => { setSelectedChar(null); setActiveView("toy-studio"); }}
                          className="mt-3 w-full py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                          style={{ background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}
                        >
                          Design in Toy Studio →
                        </button>
                      </div>

                      {/* NFT */}
                      <div className="rounded-2xl p-5" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,212,255,0.2)" }}>
                        <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>🖼️ CHARACTER NFT</div>
                        <div className="text-xs font-mono break-all" style={{ color: "#8899AA" }}>
                          IPFS: {selectedChar.nftCid.slice(0, 20)}...
                        </div>
                        <button
                          className="mt-3 w-full py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                          style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
                        >
                          Mint Character NFT — 0.09 ETH
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TOY DESIGN STUDIO ── */}
        {activeView === "toy-studio" && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">🎮 Toy Design Studio</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Design your own JME Universe action figure. Choose colors, accessories, and size. Every design becomes a real toy NFT.
              </p>
            </div>

            {mintSuccess && (
              <div
                className="mb-6 rounded-2xl p-4 text-center animate-bounce"
                style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}
              >
                🎉 TOY DESIGN MINTED AS NFT! Your design has been submitted to the JME production queue.
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Design Panel */}
              <div className="space-y-6">
                {/* Character Base */}
                <div>
                  <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>SELECT BASE CHARACTER</div>
                  <div className="grid grid-cols-3 gap-2">
                    {JME_CHARACTERS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedChar(c)}
                        className="rounded-xl p-3 text-center transition-all duration-200 hover:scale-105"
                        style={{
                          background: selectedChar?.id === c.id ? `${c.color}15` : "rgba(255,255,255,0.04)",
                          border: selectedChar?.id === c.id ? `1px solid ${c.color}50` : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="text-xl">{c.emoji}</div>
                        <div className="text-xs text-white mt-1">{c.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>TOY COLOR</div>
                  <div className="flex gap-3 flex-wrap">
                    {TOY_COLORS.map(c => (
                      <button
                        key={c}
                        onClick={() => setToyColor(c)}
                        className="w-8 h-8 rounded-full transition-all duration-200"
                        style={{
                          background: c,
                          border: toyColor === c ? "3px solid white" : "3px solid transparent",
                          boxShadow: toyColor === c ? `0 0 12px ${c}` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>ACCESSORIES (select up to 3)</div>
                  <div className="grid grid-cols-4 gap-2">
                    {TOY_ACCESSORIES.map(acc => (
                      <button
                        key={acc}
                        onClick={() => toggleAccessory(acc)}
                        disabled={!toyAccessories.includes(acc) && toyAccessories.length >= 3}
                        className="rounded-xl p-2 text-center text-xs transition-all duration-200 hover:scale-105 disabled:opacity-40"
                        style={{
                          background: toyAccessories.includes(acc) ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.04)",
                          border: toyAccessories.includes(acc) ? "1px solid rgba(255,184,0,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          color: toyAccessories.includes(acc) ? "#FFB800" : "#8899AA",
                        }}
                      >
                        {acc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>TOY SIZE</div>
                  <div className="flex gap-2 flex-wrap">
                    {TOY_SIZES.map(s => (
                      <button
                        key={s}
                        onClick={() => setToySize(s)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                        style={{
                          background: toySize === s ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                          border: toySize === s ? "1px solid rgba(0,212,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          color: toySize === s ? "#00D4FF" : "#8899AA",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>TOY NAME</div>
                  <input
                    type="text"
                    value={toyName}
                    onChange={e => setToyName(e.target.value)}
                    placeholder="Give your toy design a name..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                  />
                </div>
              </div>

              {/* Preview */}
              <div>
                <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>DESIGN PREVIEW</div>
                <div
                  className="rounded-3xl p-8 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${toyColor}10, rgba(5,11,26,0.9))`,
                    border: `2px solid ${toyColor}40`,
                    minHeight: "400px",
                  }}
                >
                  <div className="text-8xl mb-4">{selectedChar?.emoji || "🎮"}</div>
                  <div className="font-black text-white text-2xl mb-1">{toyName || selectedChar?.name || "Your Character"}</div>
                  <div className="text-sm mb-4" style={{ color: toyColor }}>{toySize} Action Figure</div>

                  {toyAccessories.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>ACCESSORIES</div>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {toyAccessories.map(acc => (
                          <span key={acc} className="text-sm px-3 py-1 rounded-full" style={{ background: `${toyColor}20`, color: toyColor }}>
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className="mt-4 inline-block px-4 py-2 rounded-xl text-xs font-mono"
                    style={{ background: `${toyColor}15`, border: `1px solid ${toyColor}40`, color: toyColor }}
                  >
                    DESIGN ID: JME-{Math.random().toString(36).slice(2, 8).toUpperCase()}
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={mintToy}
                      className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${toyColor}, ${toyColor}80)`, color: "#050B1A" }}
                    >
                      🎮 Mint Toy Design as NFT
                    </button>
                    <button
                      className="w-full py-3 rounded-xl font-bold text-sm"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8899AA" }}
                    >
                      📤 Submit to Production Queue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CHARACTER COINS ── */}
        {activeView === "coins" && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">🪙 Character Coins</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Every JME character has their own sovereign coin. Buy, hold, and earn as the universe grows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {JME_CHARACTERS.map(char => (
                <div
                  key={char.id}
                  className="rounded-2xl p-5"
                  style={{ background: `${char.color}08`, border: `1px solid ${char.color}30` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{char.emoji}</div>
                    <div>
                      <div className="font-black text-white">{char.coin}</div>
                      <div className="text-xs" style={{ color: char.color }}>{char.name}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="font-bold text-white">${char.coinPrice}</div>
                      <div className="text-xs" style={{ color: "#00FF88" }}>+7.77%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div style={{ color: "#8899AA" }}>Supply: <span className="text-white">{char.coinSupply}</span></div>
                    <div style={{ color: "#8899AA" }}>Impact: <span className="text-white">{char.impact}</span></div>
                  </div>

                  <div className="h-1 rounded-full overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(char.impactScore / 10000) * 100}%`, background: `linear-gradient(90deg, ${char.color}, ${char.color}60)` }}
                    />
                  </div>

                  <button
                    className="w-full py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${char.color}30, ${char.color}10)`, border: `1px solid ${char.color}40`, color: char.color }}
                  >
                    Buy {char.coin} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── UNIVERSE LORE ── */}
        {activeView === "lore" && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">📜 Universe Lore</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                The sacred story bible of the JME Universe — rooted in real history, elevated into sovereign mythology.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "The Origin",
                  content: "In the beginning, before the pyramids rose and before the first star was named, nine sovereign beings walked the earth. They were not gods in the way myths describe — they were the first teachers, the first healers, the first warriors, the first builders. Their names echoed through every civilization that followed: Egypt, Mali, Nubia, Kush, Timbuktu.",
                  color: "#FFB800",
                },
                {
                  title: "The Awakening",
                  content: "In the 21st century, as humanity faces its greatest challenges — division, scarcity, loss of identity — the Sovereign 9 are awakening again. Not as ancient figures, but as living forces embedded in the digital realm. Through NFTs, coins, and stories, they return to remind the world of what was always true: sovereignty is not given, it is remembered.",
                  color: "#00D4FF",
                },
                {
                  title: "The Mission",
                  content: "The JME Universe exists to give every child — especially those who have been told their history was small — a mirror that shows them how vast they truly are. Every character is rooted in real historical fact. Every story teaches real knowledge. Every coin represents real value. This is not entertainment. This is remembrance.",
                  color: "#00FF88",
                },
                {
                  title: "The Economy",
                  content: "The JME Universe operates on a sovereign economy. Every character coin funds real-world impact in their domain: $THOTH funds education, $ISIS funds healing, $HORUS funds justice, $RA funds clean energy. Children who engage, create, and learn earn tokens automatically. The more they contribute, the more they own.",
                  color: "#9B59B6",
                },
              ].map((section, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{ background: `${section.color}06`, border: `1px solid ${section.color}20` }}
                >
                  <div className="text-xs font-mono mb-3" style={{ color: section.color }}>
                    {String(i + 1).padStart(2, "0")} — {section.title.toUpperCase()}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#CCDDEE" }}>{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pb-8 text-center text-xs" style={{ color: "#8899AA" }}>
          © 2024–2026 Chais Kenyatta Hill — Junior Movies Entertainment Universe<br />
          <span style={{ color: "#FFB800" }}>KUN FAYAKŪN × ∞ — Our Own Marvel. Positive. Substance. Forever.</span>
        </div>
      </div>
    </div>
  );
}
