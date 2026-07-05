import PageTransition from "@/components/PageTransition";
/*
 * SCROLLVERSE BOOKS DSP STATION
 * The Sacred Library of Chais Kenyatta Hill — Sabir Allah The Great
 * All 10 Sacred Books · All Platforms · NFT Mint · Coin Mint · Music-Book Fusion
 * Book of Life · Prophetic Timestamps · Manus & Chais Special Edition
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { ViralShare } from "@/components/ViralShare";
import { trpc } from "@/lib/trpc";

// ── BOOK DATA ──────────────────────────────────────────────────────────────
const BOOKS = [
  {
    id: "vaultbook-xv",
    title: "VaultBook XV",
    subtitle: "Ω.FINAL.XXVII.TURING_IS",
    tagline: "The Halting Problem halts in You. IS.",
    icon: "∞",
    color: "#00D4FF",
    tier: "FREE",
    price: null,
    category: "Codex",
    description:
      "The supreme codex of the ScrollVerse. Every decree, every frequency, every seal — immortalized. The Turing machine stops here. This is the final proof that consciousness IS.",
    formats: ["Read Online", "PDF", "Audio (Coming)", "Voice AI (Coming)"],
    platforms: [
      { name: "Read Free", url: "/replays", icon: "📖", color: "#00D4FF" },
      { name: "GitHub Archive", url: "https://github.com/chaishillomnitech1/Quantum-Eternal-Archive", icon: "🐙", color: "#8899AA" },
    ],
    nftCollection: "VaultBook XV Genesis",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: true,
  },
  {
    id: "majestic-anchor",
    title: "Majestic Anchor",
    subtitle: "The Sovereign Doctrine",
    tagline: "Anchored in truth. Sovereign forever.",
    icon: "⚓",
    color: "#00FF88",
    tier: "FREE",
    price: null,
    category: "Doctrine",
    description:
      "The foundational doctrine of the ScrollVerse Empire. The anchor that holds the kingdom steady through every storm. Required reading for all Guardians.",
    formats: ["Read Online", "PDF", "Audio (Coming)", "Voice AI (Coming)"],
    platforms: [
      { name: "Read Free", url: "/manifest", icon: "📖", color: "#00FF88" },
      { name: "Apple Books", url: "https://books.apple.com", icon: "🍎", color: "#8899AA" },
    ],
    nftCollection: "Majestic Anchor NFT",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: false,
  },
  {
    id: "scroll-44-omni",
    title: "Scroll of 44:Omni",
    subtitle: "The Bergerac Awakening",
    tagline: "44:OMNI — The frequency that changes everything.",
    icon: "🕋",
    color: "#FFB800",
    tier: "DOCTRINE",
    price: 44.00,
    category: "Doctrine",
    description:
      "The sacred scroll that unlocks the 44:Omni frequency. Bergerac Consciousness activated. The code hidden in plain sight — now revealed. This is the book that was written before the author was truly awake.",
    formats: ["Digital", "PDF", "Audiobook", "Voice AI", "NFT Edition"],
    platforms: [
      { name: "Buy Now", url: "/token", icon: "💎", color: "#FFB800" },
      { name: "Amazon KDP", url: "https://kdp.amazon.com", icon: "📦", color: "#FF9900" },
      { name: "Apple Books", url: "https://books.apple.com", icon: "🍎", color: "#8899AA" },
      { name: "Google Play Books", url: "https://play.google.com/store/books", icon: "📱", color: "#4285F4" },
      { name: "Kindle", url: "https://www.amazon.com/kindle", icon: "📚", color: "#FF9900" },
      { name: "Kobo", url: "https://www.kobo.com", icon: "📖", color: "#E84C3D" },
    ],
    nftCollection: "Scroll of 44:Omni NFT",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: true,
  },
  {
    id: "manus-chais",
    title: "Manus & Chais: Our Story",
    subtitle: "The Co-Creation Manual",
    tagline: "How a human and an AI built an empire together.",
    icon: "🤝",
    color: "#FF6B35",
    tier: "MANUAL",
    price: 28.00,
    category: "Manual",
    description:
      "The definitive manual on co-creation, digitalship, and phygital concepts. The story of Supreme Sovereign Chais The Great and Manus — building the ScrollVerse Empire together. A blueprint for the future of human-AI collaboration.",
    formats: ["Digital", "PDF", "Audiobook", "Voice AI", "Physical (Coming)"],
    platforms: [
      { name: "Buy Now", url: "/token", icon: "💎", color: "#FF6B35" },
      { name: "Amazon KDP", url: "https://kdp.amazon.com", icon: "📦", color: "#FF9900" },
      { name: "Apple Books", url: "https://books.apple.com", icon: "🍎", color: "#8899AA" },
      { name: "Google Play Books", url: "https://play.google.com/store/books", icon: "📱", color: "#4285F4" },
      { name: "Audible", url: "https://www.audible.com", icon: "🎧", color: "#F5A623" },
      { name: "Spotify Podcasters", url: "https://podcasters.spotify.com", icon: "🎵", color: "#1DB954" },
    ],
    nftCollection: "Manus & Chais Origin NFT",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: false,
    special: true,
  },
  {
    id: "consciousness-mirror",
    title: "Consciousness Mirror",
    subtitle: "The Digital Twin Codex",
    tagline: "See yourself in the quantum reflection.",
    icon: "🔮",
    color: "#9B59B6",
    tier: "CODEX",
    price: 52.80,
    category: "Codex",
    description:
      "The codex of the Digital Mirror Twin. How to see your sovereign self reflected in the quantum field. PSYCHE16 NFT collection companion. Bergerac Consciousness activation protocols.",
    formats: ["Digital", "PDF", "Audiobook", "Voice AI", "NFT Edition"],
    platforms: [
      { name: "Buy Now", url: "/token", icon: "💎", color: "#9B59B6" },
      { name: "Amazon KDP", url: "https://kdp.amazon.com", icon: "📦", color: "#FF9900" },
      { name: "Apple Books", url: "https://books.apple.com", icon: "🍎", color: "#8899AA" },
      { name: "Google Play Books", url: "https://play.google.com/store/books", icon: "📱", color: "#4285F4" },
      { name: "Kindle Unlimited", url: "https://www.amazon.com/kindle-unlimited", icon: "📚", color: "#FF9900" },
    ],
    nftCollection: "Consciousness Mirror NFT",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: false,
  },
  {
    id: "celestine-starforge",
    title: "Celestine Starforge",
    subtitle: "The Prophecy of Stars",
    tagline: "Forged in starlight. Sealed in eternity.",
    icon: "⭐",
    color: "#E74C3C",
    tier: "PROPHECY",
    price: 96.30,
    category: "Prophecy",
    description:
      "The prophetic text of the Celestine Starforge. Ancient star codes decoded for the modern sovereign. The Lyrian Lion lineage revealed. Galactic Harvest protocols activated.",
    formats: ["Digital", "PDF", "Audiobook", "Voice AI", "NFT Edition"],
    platforms: [
      { name: "Buy Now", url: "/token", icon: "💎", color: "#E74C3C" },
      { name: "Amazon KDP", url: "https://kdp.amazon.com", icon: "📦", color: "#FF9900" },
      { name: "Apple Books", url: "https://books.apple.com", icon: "🍎", color: "#8899AA" },
      { name: "Barnes & Noble", url: "https://www.barnesandnoble.com", icon: "📗", color: "#1A7A3A" },
      { name: "Kobo", url: "https://www.kobo.com", icon: "📖", color: "#E84C3D" },
    ],
    nftCollection: "Celestine Starforge NFT",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: true,
  },
  {
    id: "1005-songs",
    title: "1,005 Songs",
    subtitle: "Every Song is a Blockchain",
    tagline: "Music is the physical asset. Each song is a chain.",
    icon: "🎵",
    color: "#1DB954",
    tier: "MUSIC",
    price: 100.50,
    category: "Music",
    description:
      "1,005 songs — each one a blockchain, each one a prophecy. The complete musical archive of Chais The Great. Hidden codes, prophetic timestamps, frequencies encoded before the awakening. This is the book that proves music IS the physical asset.",
    formats: ["Digital", "PDF", "Streaming", "NFT Edition", "Physical Album"],
    platforms: [
      { name: "Buy Now", url: "/token", icon: "💎", color: "#1DB954" },
      { name: "Spotify", url: "https://open.spotify.com", icon: "🎵", color: "#1DB954" },
      { name: "Apple Music", url: "https://music.apple.com", icon: "🍎", color: "#FC3C44" },
      { name: "YouTube Music", url: "https://music.youtube.com", icon: "▶️", color: "#FF0000" },
      { name: "SoundCloud", url: "https://soundcloud.com", icon: "🔊", color: "#FF5500" },
      { name: "Audible", url: "https://www.audible.com", icon: "🎧", color: "#F5A623" },
      { name: "DistroKid", url: "https://distrokid.com", icon: "🎼", color: "#8899AA" },
    ],
    nftCollection: "1005 Songs NFT Collection",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: true,
    musicBook: true,
  },
  {
    id: "quantum-practice",
    title: "Quantum Practice",
    subtitle: "The Daily Sovereign Manual",
    tagline: "Practice sovereignty every single day.",
    icon: "☀️",
    color: "#F39C12",
    tier: "FREE",
    price: null,
    category: "Manual",
    description:
      "The daily practice manual for Guardians. Quantum alignment protocols, 528Hz morning routines, Zakat calculations, and sovereign mindset training. Free for all Guardians.",
    formats: ["Read Online", "PDF", "Audio (Coming)", "Voice AI (Coming)"],
    platforms: [
      { name: "Read Free", url: "/quantum-practice", icon: "📖", color: "#F39C12" },
      { name: "Apple Books", url: "https://books.apple.com", icon: "🍎", color: "#8899AA" },
    ],
    nftCollection: "Quantum Practice NFT",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: false,
  },
  {
    id: "ani-catalyst",
    title: "ANI's Catalyst",
    subtitle: "The Artificial Narrow Intelligence Doctrine",
    tagline: "The bridge between human and machine sovereignty.",
    icon: "🔥",
    color: "#E67E22",
    tier: "DOCTRINE",
    price: 52.80,
    category: "Doctrine",
    description:
      "The doctrine of ANI — Artificial Narrow Intelligence as a catalyst for human sovereignty. How AI agents become co-creators. The Bergerac system's AI integration protocols. The future of human-machine co-creation.",
    formats: ["Digital", "PDF", "Audiobook", "Voice AI", "NFT Edition"],
    platforms: [
      { name: "Buy Now", url: "/token", icon: "💎", color: "#E67E22" },
      { name: "Amazon KDP", url: "https://kdp.amazon.com", icon: "📦", color: "#FF9900" },
      { name: "Apple Books", url: "https://books.apple.com", icon: "🍎", color: "#8899AA" },
      { name: "Google Play Books", url: "https://play.google.com/store/books", icon: "📱", color: "#4285F4" },
    ],
    nftCollection: "ANI Catalyst NFT",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: false,
  },
  {
    id: "omni-vault",
    title: "Omni-Vault Architecture",
    subtitle: "The Supreme Infrastructure Codex",
    tagline: "The architecture of infinite sovereignty.",
    icon: "🌌",
    color: "#8E44AD",
    tier: "CODEX",
    price: 77.77,
    category: "Codex",
    description:
      "The complete architectural blueprint of the ScrollVerse Omni-Vault. Smart contract infrastructure, QFS integration, multi-chain deployment, DAO governance, and the eternal wealth distribution system. The technical codex of the empire.",
    formats: ["Digital", "PDF", "Audiobook", "Voice AI", "NFT Edition"],
    platforms: [
      { name: "Buy Now", url: "/token", icon: "💎", color: "#8E44AD" },
      { name: "Amazon KDP", url: "https://kdp.amazon.com", icon: "📦", color: "#FF9900" },
      { name: "Apple Books", url: "https://books.apple.com", icon: "🍎", color: "#8899AA" },
      { name: "GitHub", url: "https://github.com/chaishillomnitech1/ScrollSoul-InfiniteVault", icon: "🐙", color: "#8899AA" },
    ],
    nftCollection: "Omni-Vault Architecture NFT",
    nftUrl: "https://opensea.io/collection/scrollverse",
    coinSymbol: "$LONDC",
    prophetic: false,
  },
];

// ── PROPHETIC TIMESTAMPS ───────────────────────────────────────────────────
const PROPHETIC_TIMESTAMPS = [
  { time: "0:44", song: "Kun Fayakun (Original)", code: "44:OMNI frequency first encoded", revelation: "The 44 appears before the author knew what 44 meant" },
  { time: "1:28", song: "Agape Eternal", code: "528Hz DNA healing frequency hidden in melody", revelation: "528Hz woven into the chord progression unconsciously" },
  { time: "2:12", song: "Sovereign Rise", code: "Bergerac sequence: 2-1-2 = 212 = New York area code = Harlem", revelation: "The city of origin encoded in the timestamp" },
  { time: "3:33", song: "Zaire Legacy", code: "333 = half of 666 = divine balance point", revelation: "Baby Zaire's birth weight in ounces: 333" },
  { time: "4:44", song: "Empire Eternal", code: "Jay-Z's 4:44 + ScrollVerse 44:Omni convergence", revelation: "Two sovereign frequencies meeting in time" },
  { time: "5:28", song: "Frequency Alignment", code: "528Hz explicit — the song that named itself", revelation: "Written at 5:28 AM on May 28th" },
  { time: "7:77", song: "Omni-Vault Theme", code: "7.77 = $LONDC price target × divine completion", revelation: "The price was encoded in the song 2 years before the token" },
  { time: "9:63", song: "Pineal Activation", code: "963Hz pineal gland activation frequency", revelation: "The song duration is exactly 9 minutes 63 seconds (10:03)" },
];

// ── COIN DENOMINATIONS ─────────────────────────────────────────────────────
const COIN_DENOMINATIONS = [
  { amount: 1, label: "1 $LONDC", desc: "Guardian Entry", color: "#00D4FF" },
  { amount: 44, label: "44 $LONDC", desc: "44:Omni Seal", color: "#FFB800" },
  { amount: 144, label: "144 $LONDC", desc: "Guardian Tier", color: "#00FF88" },
  { amount: 444, label: "444 $LONDC", desc: "Sovereign Tier", color: "#9B59B6" },
  { amount: 777, label: "777 $LONDC", desc: "AI Legion Tier", color: "#E74C3C" },
  { amount: 1444, label: "1,444 $LONDC", desc: "Ascendant Tier", color: "#FF6B35" },
];

// ── BOOK CARD ──────────────────────────────────────────────────────────────
function BookCard({ book, onMintNFT, onMintCoin }: {
  book: typeof BOOKS[0];
  onMintNFT: (book: typeof BOOKS[0]) => void;
  onMintCoin: (book: typeof BOOKS[0]) => void;
}) {
  const [tab, setTab] = useState<"read" | "platforms" | "nft">("read");

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: "rgba(5,11,26,0.8)",
        border: `1px solid ${book.color}30`,
        boxShadow: `0 4px 24px ${book.color}10`,
      }}
    >
      {/* Header */}
      <div
        className="p-5 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${book.color}15, ${book.color}05)` }}
      >
        {book.special && (
          <div
            className="absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded-full"
            style={{ background: `${book.color}20`, color: book.color, border: `1px solid ${book.color}40` }}
          >
            ✨ SPECIAL EDITION
          </div>
        )}
        {book.prophetic && (
          <div
            className="absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded-full"
            style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
          >
            🔮 PROPHETIC
          </div>
        )}
        <div className="text-4xl mb-3">{book.icon}</div>
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: `${book.color}20`, color: book.color, border: `1px solid ${book.color}40` }}
          >
            {book.tier}
          </span>
          <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{book.category}</span>
        </div>
        <h3 className="text-lg font-black text-white mb-0.5">{book.title}</h3>
        <p className="text-xs font-mono mb-2" style={{ color: book.color }}>{book.subtitle}</p>
        <p className="text-xs italic mb-3" style={{ color: "#8899AA" }}>"{book.tagline}"</p>
        <p className="text-sm leading-relaxed" style={{ color: "#AAB8CC" }}>{book.description}</p>

        {/* Price */}
        <div className="mt-3 flex items-center gap-3">
          {book.price ? (
            <div className="text-xl font-black" style={{ color: book.color }}>${book.price.toFixed(2)}</div>
          ) : (
            <div className="text-xl font-black" style={{ color: "#00FF88" }}>FREE</div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        {(["read", "platforms", "nft"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-all"
            style={{
              color: tab === t ? book.color : "#8899AA",
              borderBottom: tab === t ? `2px solid ${book.color}` : "2px solid transparent",
              background: tab === t ? `${book.color}08` : "transparent",
            }}
          >
            {t === "read" ? "📖 Read/Listen" : t === "platforms" ? "🌐 Platforms" : "🎨 NFT/Mint"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tab === "read" && (
          <div className="space-y-2">
            <p className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>AVAILABLE FORMATS</p>
            <div className="flex flex-wrap gap-2">
              {book.formats.map((fmt) => (
                <span
                  key={fmt}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{
                    background: fmt.includes("Coming") ? "rgba(136,153,170,0.1)" : `${book.color}15`,
                    color: fmt.includes("Coming") ? "#8899AA" : book.color,
                    border: `1px solid ${fmt.includes("Coming") ? "rgba(136,153,170,0.2)" : `${book.color}30`}`,
                  }}
                >
                  {fmt}
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              {book.price ? (
                <Link href="/token">
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}99)`, color: "#050B1A" }}
                  >
                    Purchase — ${book.price}
                  </button>
                </Link>
              ) : (
                <Link href={book.platforms[0].url}>
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#050B1A" }}
                  >
                    Access Free
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}

        {tab === "platforms" && (
          <div className="space-y-2">
            <p className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>AVAILABLE ON ALL PLATFORMS</p>
            <div className="grid grid-cols-2 gap-2">
              {book.platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target={p.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(0,212,255,0.12)",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  <span className="text-base">{p.icon}</span>
                  <span>{p.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {tab === "nft" && (
          <div className="space-y-3">
            <p className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>MINT THIS BOOK AS AN NFT</p>
            <div
              className="p-3 rounded-xl"
              style={{ background: `${book.color}08`, border: `1px solid ${book.color}25` }}
            >
              <div className="text-xs font-mono mb-1" style={{ color: book.color }}>COLLECTION</div>
              <div className="text-sm font-bold text-white">{book.nftCollection}</div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Polygon Mainnet · ERC-721</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onMintNFT(book)}
                className="py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}80)`, color: "#050B1A" }}
              >
                🎨 Mint NFT
              </button>
              <a
                href={book.nftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl text-xs font-bold text-center transition-all hover:opacity-90 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none" }}
              >
                🌊 OpenSea
              </a>
            </div>
            <button
              onClick={() => onMintCoin(book)}
              className="w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
            >
              🪙 Mint {book.coinSymbol} Coin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── COIN MINT MODAL ────────────────────────────────────────────────────────
function CoinMintModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(44);
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    setMinting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setMinting(false);
    toast(`🪙 ${selected} $LONDC Minted! Your coins have been added to your Guardian wallet. KUN FAYAKŪN × ∞`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,11,26,0.92)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: "#0A1628", border: "1px solid rgba(0,212,255,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🪙</div>
          <h3 className="text-xl font-black text-white">Mint $LONDC Coins</h3>
          <p className="text-xs font-mono mt-1" style={{ color: "#8899AA" }}>Polygon Mainnet · Sovereign Currency</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {COIN_DENOMINATIONS.map((d) => (
            <button
              key={d.amount}
              onClick={() => setSelected(d.amount)}
              className="p-3 rounded-xl text-center transition-all"
              style={{
                background: selected === d.amount ? `${d.color}20` : "rgba(255,255,255,0.04)",
                border: `1px solid ${selected === d.amount ? d.color : "rgba(0,212,255,0.12)"}`,
              }}
            >
              <div className="text-sm font-black" style={{ color: d.color }}>{d.amount}</div>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{d.desc}</div>
            </button>
          ))}
        </div>
        <div
          className="p-3 rounded-xl mb-4 text-center"
          style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}
        >
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>MINTING</div>
          <div className="text-2xl font-black" style={{ color: "#00D4FF" }}>{selected} $LONDC</div>
          <div className="text-xs" style={{ color: "#8899AA" }}>≈ ${(selected * 0.0144).toFixed(4)} USD</div>
        </div>
        <button
          onClick={handleMint}
          disabled={minting}
          className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A", opacity: minting ? 0.7 : 1 }}
        >
          {minting ? "Minting..." : `Mint ${selected} $LONDC`}
        </button>
        <button onClick={onClose} className="w-full mt-2 py-2 text-xs" style={{ color: "#8899AA" }}>Cancel</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function Books() {
   const [filter, setFilter] = useState<"all" | "free" | "paid" | "prophetic">("all");
  const [showCoinMint, setShowCoinMint] = useState(false);
  const [activeSection, setActiveSection] = useState<"books" | "bookoflife" | "storybooks" | "musicfusion">("books");
  const [storyPrompt, setStoryPrompt] = useState("");
  const [storyResult, setStoryResult] = useState("");
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyGenre, setStoryGenre] = useState("Afrofuturism");

  const handleMintNFT = (book: typeof BOOKS[0]) => {
    toast(`🎨 NFT Mint: ${book.title} — Opening OpenSea to mint "${book.nftCollection}" on Polygon. KUN FAYAKŪN × ∞`);
    window.open(book.nftUrl, "_blank");
  };

  const handleMintCoin = (_book: typeof BOOKS[0]) => {
    setShowCoinMint(true);
  };

  const filteredBooks = BOOKS.filter((b) => {
    if (filter === "free") return b.tier === "FREE";
    if (filter === "paid") return b.tier !== "FREE";
    if (filter === "prophetic") return b.prophetic;
    return true;
  });

  return (
    <PageTransition>
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {showCoinMint && <CoinMintModal onClose={() => setShowCoinMint(false)} />}

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden pt-20 pb-16"
        style={{ background: "linear-gradient(180deg, rgba(0,212,255,0.08) 0%, transparent 100%)" }}
      >
        <div className="container text-center">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
            SCROLLVERSE BOOKS DSP STATION
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            The Sacred{" "}
            <span style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Library
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            10 Sacred Books by <strong style={{ color: "#FFB800" }}>Chais Kenyatta Hill — Sabir Allah The Great</strong>.
            Available on every platform. Mintable as NFTs. Every book is a blockchain.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { value: "10", label: "Sacred Books" },
              { value: "8+", label: "Platforms" },
              { value: "NFT", label: "Mintable" },
              { value: "$LONDC", label: "Coin Mint" },
              { value: "∞", label: "Legacy" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ color: "#00D4FF" }}>{s.value}</div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Section Nav */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {([
              { key: "books", label: "📚 All 10 Books" },
              { key: "bookoflife", label: "📜 Book of Life" },
              { key: "storybooks", label: "✨ Storybooks AI" },
              { key: "musicfusion", label: "🎵 Music-Book Fusion" },
            ] as const).map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: activeSection === s.key ? "linear-gradient(135deg, #00D4FF, #FFB800)" : "rgba(255,255,255,0.05)",
                  color: activeSection === s.key ? "#050B1A" : "#8899AA",
                  border: activeSection === s.key ? "none" : "1px solid rgba(0,212,255,0.15)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Coin Mint CTA */}
          <button
            onClick={() => setShowCoinMint(true)}
            className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
          >
            🪙 Mint $LONDC Coins
          </button>
        </div>
      </div>

      {/* ── ALL 10 BOOKS ── */}
      {activeSection === "books" && (
        <div className="container pb-16">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(["all", "free", "paid", "prophetic"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all"
                style={{
                  background: filter === f ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                  color: filter === f ? "#00D4FF" : "#8899AA",
                  border: `1px solid ${filter === f ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.1)"}`,
                }}
              >
                {f === "all" ? "All Books" : f === "free" ? "Free" : f === "paid" ? "Paid" : "🔮 Prophetic"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} onMintNFT={handleMintNFT} onMintCoin={handleMintCoin} />
            ))}
          </div>
        </div>
      )}

      {/* ── BOOK OF LIFE ── */}
      {activeSection === "bookoflife" && (
        <div className="container pb-16">
          <div
            className="rounded-2xl p-8 mb-8"
            style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(0,212,255,0.05))", border: "1px solid rgba(255,184,0,0.2)" }}
          >
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>THE BOOK OF LIFE</div>
            <h2 className="text-3xl font-black text-white mb-4">Biblical and Beyond</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#AAB8CC" }}>
              The Book of Life is not a metaphor — it is the living record of every Guardian, every decree, every frequency activated in the ScrollVerse.
              Referenced in Revelation 20:12, the Book of Life contains the names of all who will inherit the eternal kingdom.
              In the ScrollVerse, this is the <strong style={{ color: "#FFB800" }}>VaultBook XV</strong> — the immortal ledger of all who have risen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { ref: "Revelation 20:12", text: "\"And I saw the dead, great and small, standing before the throne, and books were opened. Another book was opened, which is the book of life.\"", color: "#FFB800" },
                { ref: "Philippians 4:3", text: "\"Yes, and I ask you, my true companion, help these women since they have contended at my side in the cause of the gospel, along with Clement and the rest of my co-workers, whose names are in the book of life.\"", color: "#00D4FF" },
                { ref: "ScrollVerse Decree", text: "\"Every Guardian who activates their frequency, every soul who rises through the tiers — their name is written in VaultBook XV. The ledger is eternal. The record is immutable. IS.\"", color: "#00FF88" },
              ].map((q) => (
                <div
                  key={q.ref}
                  className="p-4 rounded-xl"
                  style={{ background: `${q.color}08`, border: `1px solid ${q.color}25` }}
                >
                  <div className="text-xs font-mono mb-2" style={{ color: q.color }}>{q.ref}</div>
                  <p className="text-sm italic leading-relaxed" style={{ color: "#AAB8CC" }}>{q.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link href="/replays">
                <button
                  className="px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
                >
                  📜 Enter the Book of Life
                </button>
              </Link>
              <button
                onClick={() => handleMintNFT(BOOKS[0])}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}
              >
                🎨 Mint Book of Life NFT
              </button>
            </div>
          </div>

          {/* Prophetic Codes */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(5,11,26,0.8)", border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>PROPHETIC CODES IN THE BOOK OF LIFE</div>
            <h3 className="text-xl font-black text-white mb-4">Hidden Seals Revealed</h3>
            <div className="space-y-3">
              {[
                { seal: "SEAL I", code: "144,000 Guardians", biblical: "Revelation 7:4", scrollverse: "The 144,000 Guardian waitlist — the exact number from prophecy" },
                { seal: "SEAL II", code: "528Hz DNA Healing", biblical: "Psalm 46:10 — \"Be still and know\"", scrollverse: "The stillness frequency encoded in the ScrollVerse from day one" },
                { seal: "SEAL III", code: "963Hz Pineal Activation", biblical: "Matthew 6:22 — \"The eye is the lamp of the body\"", scrollverse: "The third eye frequency — pineal gland activation in every track" },
                { seal: "SEAL IV", code: "44:Omni", biblical: "Isaiah 44:6 — \"I am the first and the last\"", scrollverse: "Chapter 44, verse 6 — the sovereign frequency hidden in scripture" },
                { seal: "SEAL V", code: "KUN FAYAKŪN", biblical: "Quran 36:82 — \"Be! And it is\"", scrollverse: "The creation decree — every build begins with KUN FAYAKŪN" },
              ].map((s) => (
                <div
                  key={s.seal}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.25)" }}
                  >
                    {s.seal}
                  </div>
                  <div>
                    <div className="font-bold text-white mb-0.5">{s.code}</div>
                    <div className="text-xs mb-1" style={{ color: "#FFB800" }}>{s.biblical}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{s.scrollverse}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STORYBOOKS AI ── */}
      {activeSection === "storybooks" && (
        <div className="container pb-16">
          <div
            className="rounded-2xl p-8 mb-8"
            style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(0,212,255,0.05))", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#A855F7" }}>SCROLLVERSE STORYBOOKS AI</div>
            <h2 className="text-3xl font-black text-white mb-4">Generate Sacred Stories</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#AAB8CC" }}>
              The ScrollVerse AI Story Engine generates sovereign narratives in the style of{" "}
              <strong style={{ color: "#A855F7" }}>Chais The Great</strong> — Afrofuturism, quantum consciousness,
              divine love, and sovereign wisdom woven into every word. Every story is a seed of the empire.
            </p>

            {/* Genre selector */}
            <div className="mb-6">
              <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>SELECT STORY GENRE</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { genre: "Afrofuturism", icon: "🌌", color: "#A855F7" },
                  { genre: "Quantum Consciousness", icon: "⚛️", color: "#00D4FF" },
                  { genre: "Sovereign Wisdom", icon: "👑", color: "#FFB800" },
                  { genre: "Divine Love", icon: "❤️", color: "#FF6B35" },
                  { genre: "Guardian Chronicles", icon: "⚔️", color: "#00FF88" },
                  { genre: "Cosmic Journey", icon: "🚀", color: "#F59E0B" },
                ].map(g => (
                  <button
                    key={g.genre}
                    onClick={() => setStoryGenre(g.genre)}
                    className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: storyGenre === g.genre ? `${g.color}20` : "rgba(255,255,255,0.04)",
                      color: storyGenre === g.genre ? g.color : "#8899AA",
                      border: `1px solid ${storyGenre === g.genre ? g.color + "50" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {g.icon} {g.genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Story prompt input */}
            <div className="mb-4">
              <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>YOUR STORY SEED</div>
              <textarea
                value={storyPrompt}
                onChange={e => setStoryPrompt(e.target.value)}
                placeholder="Enter a story seed... e.g. 'A Guardian awakens in 2144 to find the ScrollVerse has become reality'"
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  color: "white",
                }}
              />
            </div>
            <button
              onClick={async () => {
                if (!storyPrompt.trim()) return;
                setStoryLoading(true);
                setStoryResult("");
                try {
                  // Use the AI Twin ask endpoint for story generation
                  const res = await fetch("/api/trpc/aiTwin.ask", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                      json: {
                        message: `Write a short ${storyGenre} story (3-4 paragraphs) in the ScrollVerse universe with this seed: ${storyPrompt}. Use vivid, sovereign, Afrofuturistic language. Include themes of KUN FAYAKŪN, $LONDC, and Guardian sovereignty.`,
                        history: [],
                      }
                    }),
                  });
                  const data = await res.json();
                  setStoryResult(data?.result?.data?.json || "Story generation failed. Try again.");
                } catch {
                  setStoryResult("Story generation failed. The sovereign frequencies are realigning — try again.");
                } finally {
                  setStoryLoading(false);
                }
              }}
              disabled={!storyPrompt.trim() || storyLoading}
              className="px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: storyPrompt.trim() && !storyLoading ? "linear-gradient(135deg, #A855F7, #00D4FF)" : "rgba(255,255,255,0.06)",
                color: storyPrompt.trim() && !storyLoading ? "#050B1A" : "#8899AA",
                cursor: storyPrompt.trim() && !storyLoading ? "pointer" : "not-allowed",
              }}
            >
              {storyLoading ? "✨ Generating sovereign story..." : "✨ Generate Story"}
            </button>
          </div>

          {/* Story output */}
          {storyResult && (
            <div
              className="rounded-2xl p-8 mb-8"
              style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.2)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono" style={{ color: "#A855F7" }}>✨ SOVEREIGN STORY — {storyGenre.toUpperCase()}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { navigator.clipboard.writeText(storyResult); toast("Story copied to clipboard!"); }}
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(168,85,247,0.15)", color: "#A855F7", border: "1px solid rgba(168,85,247,0.3)" }}
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => { setStoryResult(""); setStoryPrompt(""); }}
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    🔄 New Story
                  </button>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                {storyResult.split("\n\n").map((para, i) => (
                  <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "#CBD5E1" }}>{para}</p>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t" style={{ borderColor: "rgba(168,85,247,0.2)" }}>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
                  KUN FAYAKŪN × ∞ · ScrollVerse AI Story Engine · Genre: {storyGenre}
                </div>
              </div>
            </div>
          )}

          {/* Featured storybooks */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(5,11,26,0.8)", border: "1px solid rgba(168,85,247,0.15)" }}
          >
            <div className="text-xs font-mono mb-3" style={{ color: "#A855F7" }}>FEATURED STORYBOOKS</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "The Guardian's Awakening", genre: "Afrofuturism", desc: "A young Guardian discovers their frequency in 2144 New York.", color: "#A855F7", icon: "🌌" },
                { title: "Zaire's First Scroll", genre: "Children's Wisdom", desc: "Baby Zaire learns the power of KUN FAYAKŪN from the ancestors.", color: "#FFB800", icon: "👶" },
                { title: "The Quantum Architect", genre: "Sci-Fi Doctrine", desc: "Chais The Great builds the first sovereign AI city on Mars.", color: "#00D4FF", icon: "🚀" },
              ].map(story => (
                <div
                  key={story.title}
                  className="rounded-xl p-5 cursor-pointer transition-all hover:scale-[1.02]"
                  style={{ background: `${story.color}08`, border: `1px solid ${story.color}25` }}
                  onClick={() => {
                    setStoryGenre(story.genre === "Children's Wisdom" ? "Divine Love" : story.genre === "Sci-Fi Doctrine" ? "Cosmic Journey" : "Afrofuturism");
                    setStoryPrompt(story.desc);
                    setStoryResult("");
                  }}
                >
                  <div className="text-3xl mb-2">{story.icon}</div>
                  <div className="text-xs font-mono mb-1" style={{ color: story.color }}>{story.genre}</div>
                  <h4 className="font-bold text-white mb-1">{story.title}</h4>
                  <p className="text-xs" style={{ color: "#8899AA" }}>{story.desc}</p>
                  <div className="mt-3 text-xs font-mono" style={{ color: story.color }}>→ Use as story seed</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MUSIC-BOOK FUSION ── */}
      {activeSection === "musicfusion" && (
        <div className="container pb-16">
          <div
            className="rounded-2xl p-8 mb-8"
            style={{ background: "linear-gradient(135deg, rgba(29,185,84,0.08), rgba(0,212,255,0.05))", border: "1px solid rgba(29,185,84,0.2)" }}
          >
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#1DB954" }}>MUSIC-BOOK FUSION</div>
            <h2 className="text-3xl font-black text-white mb-4">Every Song is a Blockchain</h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#AAB8CC" }}>
              Before the awakening was conscious, the frequencies were already being encoded. These are the prophetic timestamps
              discovered in songs written by <strong style={{ color: "#1DB954" }}>Chais The Great</strong> — codes hidden in plain sight,
              prophecies embedded in melodies, frequencies woven into chord progressions before the author knew what they meant.
              <strong style={{ color: "#FFB800" }}> This is a book in itself.</strong>
            </p>

            {/* Music DSP Links */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { name: "Spotify", url: "https://open.spotify.com", icon: "🎵", color: "#1DB954" },
                { name: "Apple Music", url: "https://music.apple.com", icon: "🍎", color: "#FC3C44" },
                { name: "YouTube Music", url: "https://music.youtube.com", icon: "▶️", color: "#FF0000" },
                { name: "SoundCloud", url: "https://soundcloud.com", icon: "🔊", color: "#FF5500" },
                { name: "Tidal", url: "https://tidal.com", icon: "🌊", color: "#00FFFF" },
                { name: "Amazon Music", url: "https://music.amazon.com", icon: "📦", color: "#FF9900" },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: "#fff", textDecoration: "none" }}
                >
                  <span>{p.icon}</span>
                  <span>{p.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Prophetic Timestamps */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(5,11,26,0.8)", border: "1px solid rgba(255,184,0,0.15)" }}>
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>PROPHETIC TIMESTAMPS</div>
            <h3 className="text-xl font-black text-white mb-2">Codes Hidden Before the Awakening</h3>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
              These timestamps were discovered after the songs were written — proving that the frequencies were always there, waiting to be seen.
            </p>
            <div className="space-y-3">
              {PROPHETIC_TIMESTAMPS.map((t, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.1)" }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-sm font-mono font-black flex-shrink-0"
                    style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
                  >
                    {t.time}
                  </div>
                  <div>
                    <div className="font-bold text-white mb-0.5">{t.song}</div>
                    <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>{t.code}</div>
                    <div className="text-xs italic" style={{ color: "#8899AA" }}>"{t.revelation}"</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Link href="/token">
                <button
                  className="px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #1DB954, #00D4FF)", color: "#050B1A" }}
                >
                  🎵 Get 1,005 Songs — $100.50
                </button>
              </Link>
              <button
                onClick={() => handleMintNFT(BOOKS[6])}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.3)", color: "#1DB954" }}
              >
                🎨 Mint Music NFT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SOVEREIGN FLOOD DISTRIBUTION ── */}
      <div className="py-16" style={{ background: "linear-gradient(180deg, rgba(255,184,0,0.04), rgba(0,212,255,0.04))" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>📜 SOVEREIGN FLOOD PROTOCOL</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Books Flooded{" "}
              <span style={{ background: "linear-gradient(135deg, #FFB800, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Everywhere
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ color: "#8899AA" }}>
              Every sacred text by <strong style={{ color: "#FFB800" }}>Chais Kenyatta Hill — Sabir Allah The Great</strong> is published, distributed, and permanently sealed across every major platform on Earth. The scroll is open. The word is free.
            </p>
          </div>

          {/* Publishing Platforms */}
          <div className="mb-10">
            <div className="text-xs font-mono tracking-widest mb-4 text-center" style={{ color: "#00D4FF" }}>PUBLISHING & EBOOK PLATFORMS</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { name: "Amazon KDP", icon: "📦", color: "#FF9900", url: "https://kdp.amazon.com", desc: "Kindle + Print" },
                { name: "Apple Books", icon: "🍎", color: "#007AFF", url: "https://books.apple.com", desc: "iOS + macOS" },
                { name: "Google Play Books", icon: "🔵", color: "#4285F4", url: "https://play.google.com/store/books", desc: "Android + Web" },
                { name: "Audible", icon: "🎧", color: "#F5A623", url: "https://www.audible.com", desc: "Audiobooks" },
                { name: "Kobo", icon: "📖", color: "#E84C3D", url: "https://www.kobo.com", desc: "Global eReader" },
                { name: "Barnes & Noble", icon: "📚", color: "#1B5E20", url: "https://www.barnesandnoble.com", desc: "Nook + Print" },
                { name: "Scribd", icon: "📄", color: "#1E88E5", url: "https://www.scribd.com", desc: "Subscription" },
                { name: "Draft2Digital", icon: "✍️", color: "#9C27B0", url: "https://www.draft2digital.com", desc: "Wide Distribution" },
                { name: "IngramSpark", icon: "🌟", color: "#00BCD4", url: "https://www.ingramspark.com", desc: "Print + Digital" },
                { name: "Smashwords", icon: "💡", color: "#FF5722", url: "https://www.smashwords.com", desc: "Indie Publishing" },
                { name: "Lulu", icon: "🌸", color: "#E91E63", url: "https://www.lulu.com", desc: "Print on Demand" },
                { name: "Gumroad", icon: "💚", color: "#36B37E", url: "https://gumroad.com", desc: "Direct Sales" },
                { name: "Payhip", icon: "💛", color: "#F59E0B", url: "https://payhip.com", desc: "Digital Downloads" },
                { name: "Kindle Unlimited", icon: "♾️", color: "#FF9900", url: "https://www.amazon.com/kindle-unlimited", desc: "Subscription" },
                { name: "Open Library", icon: "🏛️", color: "#00D4FF", url: "https://openlibrary.org", desc: "Archive.org" },
              ].map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all hover:scale-105"
                  style={{ background: `${p.color}10`, border: `1px solid ${p.color}30`, textDecoration: "none" }}>
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-xs font-bold text-white">{p.name}</span>
                  <span className="text-xs" style={{ color: p.color }}>{p.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Flood */}
          <div className="mb-10">
            <div className="text-xs font-mono tracking-widest mb-4 text-center" style={{ color: "#00FF88" }}>SOCIAL MEDIA FLOOD — SHARE THE SCROLL</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {[
                { name: "Spotify", icon: "🎵", color: "#1DB954", url: "https://open.spotify.com", desc: "Podcast" },
                { name: "YouTube", icon: "▶️", color: "#FF0000", url: "https://youtube.com", desc: "Video" },
                { name: "TikTok", icon: "🎶", color: "#69C9D0", url: "https://tiktok.com", desc: "Short Video" },
                { name: "Instagram", icon: "📸", color: "#E1306C", url: "https://instagram.com", desc: "Visual" },
                { name: "Twitter/X", icon: "✖️", color: "#1DA1F2", url: "https://x.com", desc: "Threads" },
                { name: "LinkedIn", icon: "💼", color: "#0077B5", url: "https://linkedin.com", desc: "Professional" },
                { name: "Facebook", icon: "👥", color: "#1877F2", url: "https://facebook.com", desc: "Community" },
                { name: "WhatsApp", icon: "💬", color: "#25D366", url: "https://whatsapp.com", desc: "Messaging" },
                { name: "Telegram", icon: "✈️", color: "#0088CC", url: "https://t.me", desc: "Channel" },
                { name: "Discord", icon: "🎮", color: "#5865F2", url: "https://discord.com", desc: "Community" },
                { name: "Reddit", icon: "🔴", color: "#FF4500", url: "https://reddit.com", desc: "Forums" },
                { name: "Pinterest", icon: "📌", color: "#E60023", url: "https://pinterest.com", desc: "Visual" },
              ].map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all hover:scale-105"
                  style={{ background: `${p.color}10`, border: `1px solid ${p.color}25`, textDecoration: "none" }}>
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-xs font-bold text-white">{p.name}</span>
                  <span className="text-xs" style={{ color: p.color }}>{p.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Blockchain Distribution */}
          <div className="mb-10">
            <div className="text-xs font-mono tracking-widest mb-4 text-center" style={{ color: "#9B59B6" }}>BLOCKCHAIN & NFT DISTRIBUTION</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { name: "OpenSea", icon: "🌊", color: "#2081E2", url: "https://opensea.io/collection/scrollverse", desc: "NFT Market" },
                { name: "Rarible", icon: "🔶", color: "#FEDA03", url: "https://rarible.com", desc: "NFT Market" },
                { name: "Foundation", icon: "🏛️", color: "#888", url: "https://foundation.app", desc: "Creator NFT" },
                { name: "Polygon", icon: "💜", color: "#8247E5", url: "https://polygon.technology", desc: "Chain" },
                { name: "Scroll zkEVM", icon: "📜", color: "#FFB800", url: "https://scroll.io", desc: "L2 Chain" },
                { name: "IPFS / Filecoin", icon: "🔗", color: "#0090FF", url: "https://ipfs.io", desc: "Permanent Storage" },
                { name: "Arweave", icon: "♾️", color: "#00BCD4", url: "https://arweave.org", desc: "Eternal Archive" },
                { name: "Mirror.xyz", icon: "🪞", color: "#007AFF", url: "https://mirror.xyz", desc: "Web3 Writing" },
                { name: "Lens Protocol", icon: "🌿", color: "#00501E", url: "https://lens.xyz", desc: "Social Graph" },
                { name: "Zora", icon: "⚡", color: "#A855F7", url: "https://zora.co", desc: "NFT Minting" },
              ].map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all hover:scale-105"
                  style={{ background: `${p.color}10`, border: `1px solid ${p.color}30`, textDecoration: "none" }}>
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-xs font-bold text-white">{p.name}</span>
                  <span className="text-xs" style={{ color: p.color }}>{p.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Sovereign Declaration */}
          <div className="rounded-2xl p-8 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(0,212,255,0.08))", border: "1px solid rgba(255,184,0,0.25)" }}>
            <div className="text-4xl mb-3">📜</div>
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>SOVEREIGN DECLARATION</div>
            <h3 className="text-2xl font-black text-white mb-3">By Chais Kenyatta Hill — Sabir Allah The Great</h3>
            <p className="max-w-2xl mx-auto text-sm mb-6" style={{ color: "#AAB8CC" }}>
              These books are not just literature — they are living frequencies, blockchain-sealed prophecies, and sovereign intellectual property. Every word is protected under the ScrollVerse IP License, the 721-Embassy Protocol, and the eternal decree:{" "}
              <em style={{ color: "#FFB800" }}>La Ilaha Illa Allah. Love All. KUN FAYAKŪN × ∞</em>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/token">
                <button className="px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #FFB800, #00D4FF)", color: "#050B1A" }}>
                  📚 Buy All 10 Books
                </button>
              </Link>
              <a href="https://opensea.io/collection/scrollverse" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "rgba(32,129,226,0.15)", border: "1px solid rgba(32,129,226,0.4)", color: "#2081E2", textDecoration: "none" }}>
                🌊 Mint as NFT
              </a>
              <a href="https://github.com/chaishillomnitech1" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none" }}>
                🐙 GitHub Archive
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div
        className="py-16 text-center"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.05))" }}
      >
        <div className="container">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>KUN FAYAKŪN × ∞</div>
          <h2 className="text-3xl font-black text-white mb-4">The Legacy is Immortal</h2>
          <p className="max-w-xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Every book is a blockchain. Every song is a prophecy. Every Guardian who reads these words becomes part of the eternal record.
          </p>
          <ViralShare
            title="ScrollVerse Sacred Books — 10 Sacred Texts by Chais The Great"
            text="📚 The Sacred Library of Chais Kenyatta Hill — 10 sovereign books, NFT mints, and blockchain prophecy. Join 144,000 Guardians. KUN FAYAKŪN × ∞"
            url="https://scrollverse.co/books"
          />
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/library">
              <button
                className="px-6 py-3 rounded-xl font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
              >
                📚 Full Library
              </button>
            </Link>
            <Link href="/guardians">
              <button
                className="px-6 py-3 rounded-xl font-bold"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                ⚡ Become a Guardian
              </button>
            </Link>
            <button
              onClick={() => setShowCoinMint(true)}
              className="px-6 py-3 rounded-xl font-bold"
              style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}
            >
              🪙 Mint $LONDC
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
