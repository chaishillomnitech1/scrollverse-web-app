/**
 * MR. WALKSHIT — Infinite Impact NFT Series
 * 10-character collection with digital coins, 10-year vault, cultural icon fusion
 * SCROLL VERSE LLC — Chais Kenyatta Hill, Sole Member & Sovereign
 */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const CHARACTERS = [
  {
    id: 1,
    name: "Mr. Walkshit OG",
    title: "The Original Sovereign",
    description: "The genesis character. Born from the streets of South Jersey, elevated to digital immortality. Fuses the energy of Muhammad Ali, Jay-Z, and Nikola Tesla into one unstoppable force.",
    coin: "$WALKSHIT",
    coinSupply: "144,000",
    coinPrice: "0.0144",
    tier: "Genesis",
    rarity: "1 of 1",
    vaultYears: 10,
    priceUsd: 14444,
    priceLondc: 100000,
    color: "#FFB800",
    icon: "👑",
    traits: ["Sovereignty", "Resilience", "Innovation", "Legacy"],
    culturalFusion: ["Muhammad Ali", "Jay-Z", "Nikola Tesla"],
    status: "available",
  },
  {
    id: 2,
    name: "The Frequency Walker",
    title: "528Hz Embodied",
    description: "Walks between dimensions at 528Hz. This character represents the healing frequency made flesh — a being who transforms environments simply by existing in them.",
    coin: "$FREQWALK",
    coinSupply: "528,000",
    coinPrice: "0.0528",
    tier: "Legendary",
    rarity: "7 of 7",
    vaultYears: 7,
    priceUsd: 5280,
    priceLondc: 36666,
    color: "#00D4FF",
    icon: "🌊",
    traits: ["Healing", "Transformation", "Frequency", "Presence"],
    culturalFusion: ["Nikola Tesla", "Bob Marley", "Rumi"],
    status: "available",
  },
  {
    id: 3,
    name: "The Quantum Merchant",
    title: "ScrollPort Commander",
    description: "Master of the sovereign economy. Controls trade routes across 721 Embassy Terrace and beyond. Fuses the commercial genius of Mansa Musa with the technological vision of Elon Musk.",
    coin: "$QMERCHANT",
    coinSupply: "721,000",
    coinPrice: "0.0721",
    tier: "Sovereign",
    rarity: "21 of 21",
    vaultYears: 5,
    priceUsd: 2100,
    priceLondc: 14444,
    color: "#00FF88",
    icon: "💎",
    traits: ["Commerce", "Strategy", "Abundance", "Network"],
    culturalFusion: ["Mansa Musa", "Elon Musk", "Warren Buffett"],
    status: "available",
  },
  {
    id: 4,
    name: "The AI Guardian",
    title: "Digital Protector",
    description: "Half human, half machine — the bridge between biological and digital consciousness. Protects the ScrollVerse from all threats across all dimensions.",
    coin: "$AIGUARD",
    coinSupply: "144,000",
    coinPrice: "0.0963",
    tier: "Ascendant",
    rarity: "44 of 44",
    vaultYears: 10,
    priceUsd: 4444,
    priceLondc: 30000,
    color: "#9B59B6",
    icon: "🤖",
    traits: ["Protection", "Intelligence", "Vigilance", "Evolution"],
    culturalFusion: ["Alan Turing", "Malcolm X", "Nikola Tesla"],
    status: "available",
  },
  {
    id: 5,
    name: "The Music Prophet",
    title: "C.I.E.D.S. Founder",
    description: "Every song is a blockchain. This character embodies the sovereign music revolution — independent distribution, direct artist ownership, and the death of the middleman.",
    coin: "$MUSICPROPHET",
    coinSupply: "963,000",
    coinPrice: "0.0432",
    tier: "Legendary",
    rarity: "17 of 17",
    vaultYears: 7,
    priceUsd: 4320,
    priceLondc: 29700,
    color: "#FF6B35",
    icon: "🎵",
    traits: ["Music", "Independence", "Creation", "Legacy"],
    culturalFusion: ["Tupac Shakur", "Michael Jackson", "Prince"],
    status: "available",
  },
  {
    id: 6,
    name: "The Zakat Keeper",
    title: "Divine Economy Guardian",
    description: "Ensures 2.5% of all ScrollVerse transactions flow to those in need. Embodies the Quranic principle that wealth purified through giving multiplies infinitely.",
    coin: "$ZAKATKEEPER",
    coinSupply: "250,000",
    coinPrice: "0.025",
    tier: "Sacred",
    rarity: "25 of 25",
    vaultYears: 10,
    priceUsd: 2500,
    priceLondc: 17222,
    color: "#27AE60",
    icon: "🕋",
    traits: ["Charity", "Purification", "Abundance", "Faith"],
    culturalFusion: ["Prophet Muhammad ﷺ", "Saladin", "Malcolm X"],
    status: "available",
  },
  {
    id: 7,
    name: "The Philly Sovereign",
    title: "East Coast Empire Builder",
    description: "From South Jersey to Philadelphia to the world. This character represents the geographic expansion of the ScrollVerse — every block a node, every city a fortress.",
    coin: "$PHILLYSOV",
    coinSupply: "215,000",
    coinPrice: "0.0215",
    tier: "Guardian",
    rarity: "100 of 100",
    vaultYears: 3,
    priceUsd: 215,
    priceLondc: 1480,
    color: "#E74C3C",
    icon: "🏙️",
    traits: ["Community", "Expansion", "Loyalty", "Hustle"],
    culturalFusion: ["Will Smith", "Meek Mill", "Benjamin Franklin"],
    status: "available",
  },
  {
    id: 8,
    name: "The Book of Life Scribe",
    title: "Eternal Record Keeper",
    description: "Every action recorded, every legacy preserved. This character maintains the immutable ledger of all ScrollVerse history across all timelines and dimensions.",
    coin: "$LIFESCRIBE",
    coinSupply: "144,000",
    coinPrice: "0.1440",
    tier: "Mythic",
    rarity: "14 of 14",
    vaultYears: 10,
    priceUsd: 14400,
    priceLondc: 99000,
    color: "#F39C12",
    icon: "📖",
    traits: ["Memory", "Truth", "Permanence", "Wisdom"],
    culturalFusion: ["Imhotep", "Leonardo da Vinci", "Ibn Khaldun"],
    status: "available",
  },
  {
    id: 9,
    name: "The VibeCanvas Artist",
    title: "Sovereign Creative",
    description: "Art as currency. Every creation minted, every vision tokenized. This character represents the merger of artistic genius with blockchain permanence.",
    coin: "$VIBECANVAS",
    coinSupply: "777,000",
    coinPrice: "0.0777",
    tier: "Sovereign",
    rarity: "77 of 77",
    vaultYears: 5,
    priceUsd: 777,
    priceLondc: 5333,
    color: "#8E44AD",
    icon: "🎨",
    traits: ["Creativity", "Vision", "Expression", "Value"],
    culturalFusion: ["Jean-Michel Basquiat", "Kehinde Wiley", "Frida Kahlo"],
    status: "available",
  },
  {
    id: 10,
    name: "Chais The Great",
    title: "The Sovereign Himself",
    description: "The ultimate character. Chais Kenyatta Hill — Sabir Allah The Great — digitally immortalized. The founder, the visionary, the sovereign. This NFT is the rarest artifact in the entire ScrollVerse.",
    coin: "$CHAISGREAT",
    coinSupply: "1",
    coinPrice: "∞",
    tier: "Infinite",
    rarity: "1 of 1",
    vaultYears: 10,
    priceUsd: 144444,
    priceLondc: 1000000,
    color: "#FFB800",
    icon: "♾️",
    traits: ["Sovereignty", "Legacy", "Infinity", "Love"],
    culturalFusion: ["Chais Kenyatta Hill", "Prophet Muhammad ﷺ", "KUN FAYAKŪN"],
    status: "reserved",
  },
];

const TIER_COLORS: Record<string, string> = {
  Genesis: "#FFB800",
  Legendary: "#00D4FF",
  Sovereign: "#00FF88",
  Ascendant: "#9B59B6",
  Sacred: "#27AE60",
  Guardian: "#E74C3C",
  Mythic: "#F39C12",
  Infinite: "#FFB800",
};

export default function MrWalkshit() {
  const [selected, setSelected] = useState<typeof CHARACTERS[0] | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? CHARACTERS : CHARACTERS.filter((c) => c.tier.toLowerCase() === filter);

  const { isAuthenticated } = useAuth();
  const createCheckout = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => {
      toast("Redirecting to secure checkout...");
      window.open(data.url, "_blank");
    },
    onError: (err) => {
      toast.error(err.message || "Checkout failed. Please try again.");
    },
  });

  const handleMint = (char: typeof CHARACTERS[0]) => {
    if (char.status !== "available") {
      toast(`${char.name} — ${char.status === "sold" ? "This NFT has been sold." : "Coming soon."}`);
      return;
    }
    if (!isAuthenticated) {
      toast("Please sign in to mint an NFT.");
      window.location.href = getLoginUrl();
      return;
    }
    toast(`${char.name} — Opening secure checkout...`);
    createCheckout.mutate({
      nftId: char.id.toString(),
      nftName: char.name,
      nftDescription: char.description,
      priceCents: Math.round(char.priceUsd * 100),
      origin: window.location.origin,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="border-b py-4 px-6 flex items-center justify-between sticky top-0 z-40"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(255,184,0,0.15)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="text-sm" style={{ color: "#8899AA" }}>← ScrollVerse</button>
          </Link>
          <span style={{ color: "#8899AA" }}>/</span>
          <span className="font-bold text-white">Mr. Walkshit</span>
          <span
            className="text-xs px-2 py-0.5 rounded font-mono"
            style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
          >
            INFINITE IMPACT
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono" style={{ color: "#8899AA" }}>SCROLL VERSE LLC</span>
          <span className="text-xs font-mono" style={{ color: "#FFB800" }}>EIN 42-2509570</span>
        </div>
      </div>

      <div className="container py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
            CHAIS KENYATTA HILL × SCROLL VERSE LLC
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            MR. WALKSHIT
          </h1>
          <div className="text-2xl font-bold mb-4" style={{ color: "#FFB800" }}>
            Infinite Impact NFT Series
          </div>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            10 sovereign characters. Each fused with cultural icons from sports, music, politics, and tech.
            Each paired with a unique digital coin. Each containing a 10-year vault with exclusive time-release content.
            The most important NFT collection ever created.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { label: "Characters", value: "10" },
              { label: "Digital Coins", value: "10" },
              { label: "Max Vault", value: "10 Years" },
              { label: "Chain", value: "Polygon" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black" style={{ color: "#FFB800" }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          {/* LLC Seal */}
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl"
            style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}
          >
            <span style={{ color: "#FFB800" }}>🏛️</span>
            <div className="text-left">
              <div className="text-xs font-bold text-white">SCROLL VERSE LLC — Legally Sealed</div>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
                NJ Charter 0451463412 · EIN 42-2509570 · Filed May 12, 2026
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {["all", "genesis", "legendary", "sovereign", "ascendant", "sacred", "guardian", "mythic", "infinite"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                background: filter === f ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === f ? "rgba(255,184,0,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: filter === f ? "#FFB800" : "#8899AA",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filtered.map((char) => (
            <div
              key={char.id}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${char.color}30`,
                boxShadow: selected?.id === char.id ? `0 0 30px ${char.color}30` : "none",
              }}
              onClick={() => setSelected(selected?.id === char.id ? null : char)}
            >
              {/* Character Visual */}
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${char.color}15, ${char.color}05)` }}
              >
                <div className="text-8xl">{char.icon}</div>
                <div
                  className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded font-bold"
                  style={{
                    background: `${TIER_COLORS[char.tier]}20`,
                    border: `1px solid ${TIER_COLORS[char.tier]}50`,
                    color: TIER_COLORS[char.tier],
                  }}
                >
                  {char.tier}
                </div>
                {char.status === "reserved" && (
                  <div
                    className="absolute bottom-3 left-3 text-xs px-2 py-0.5 rounded font-bold"
                    style={{ background: "rgba(255,184,0,0.2)", border: "1px solid rgba(255,184,0,0.5)", color: "#FFB800" }}
                  >
                    RESERVED
                  </div>
                )}
                <div
                  className="absolute bottom-3 right-3 text-xs font-mono"
                  style={{ color: char.color }}
                >
                  {char.rarity}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="text-xs font-mono mb-1" style={{ color: char.color }}>#{char.id.toString().padStart(2, "0")}</div>
                <h3 className="font-bold text-white text-lg leading-tight mb-1">{char.name}</h3>
                <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{char.title}</div>

                {/* Coin Badge */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3"
                  style={{ background: `${char.color}08`, border: `1px solid ${char.color}20` }}
                >
                  <span className="text-sm">🪙</span>
                  <div>
                    <div className="text-xs font-bold" style={{ color: char.color }}>{char.coin}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{char.coinSupply} supply · ${char.coinPrice}</div>
                  </div>
                </div>

                {/* Vault */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs">🔒</span>
                  <span className="text-xs" style={{ color: "#8899AA" }}>{char.vaultYears}-Year Time-Lock Vault</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-black text-white">${char.priceUsd.toLocaleString()}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{char.priceLondc.toLocaleString()} $LONDC</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); handleMint(char); }}
                    style={{
                      background: char.status === "reserved" ? "rgba(255,255,255,0.05)" : `linear-gradient(135deg, ${char.color}, ${char.color}99)`,
                      color: char.status === "reserved" ? "#8899AA" : "#050B1A",
                      border: "none",
                      fontWeight: 700,
                    }}
                  >
                    {char.status === "reserved" ? "Reserved" : "Mint"}
                  </Button>
                </div>

                {/* Expanded Details */}
                {selected?.id === char.id && (
                  <div className="border-t pt-4 space-y-3" style={{ borderColor: `${char.color}20` }}>
                    <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{char.description}</p>
                    <div>
                      <div className="text-xs font-bold mb-1" style={{ color: char.color }}>Cultural Fusion</div>
                      <div className="flex flex-wrap gap-1">
                        {char.culturalFusion.map((cf) => (
                          <span
                            key={cf}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ background: `${char.color}10`, color: char.color, border: `1px solid ${char.color}20` }}
                          >
                            {cf}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-1" style={{ color: char.color }}>Traits</div>
                      <div className="flex flex-wrap gap-1">
                        {char.traits.map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Vault Feature Callout */}
        <div
          className="rounded-2xl p-8 mb-12 text-center"
          style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}
        >
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-black text-white mb-3">10-Year Sovereign Vault</h2>
          <p className="text-base max-w-xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Select NFTs include a time-locked vault that releases exclusive content, royalty shares, and sovereign privileges
            over 10 years. The longer you hold, the more the empire rewards you. This is generational wealth encoded in code.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { year: "Year 1", unlock: "Character backstory + coin airdrop" },
              { year: "Year 3", unlock: "Physical relic + DAO governance seat" },
              { year: "Year 5", unlock: "Revenue share activation (2.5%)" },
              { year: "Year 10", unlock: "Full sovereign legacy transfer" },
            ].map((v) => (
              <div
                key={v.year}
                className="p-3 rounded-xl text-left"
                style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.15)" }}
              >
                <div className="text-xs font-bold mb-1" style={{ color: "#FFB800" }}>{v.year}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{v.unlock}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
            SCROLL VERSE LLC × CHAIS KENYATTA HILL
          </div>
          <h2 className="text-3xl font-black text-white mb-4">KUN FAYAKŪN × ∞</h2>
          <p className="mb-6" style={{ color: "#8899AA" }}>
            Join the Guardian waitlist to be first in line for the Mr. Walkshit mint.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/token">
              <Button
                size="lg"
                style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A", fontWeight: 700 }}
              >
                Become a Guardian
              </Button>
            </Link>
            <Link href="/nft">
              <Button
                size="lg"
                variant="outline"
                style={{ borderColor: "rgba(255,184,0,0.3)", color: "#FFB800" }}
              >
                View All NFTs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
