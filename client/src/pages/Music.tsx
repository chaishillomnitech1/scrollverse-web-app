/**
 * CHAIS THE GREAT — MUSIC CATALOG & INVESTMENT PORTAL
 * The sovereign DSP — direct-to-fan, crypto-enabled, investment-grade music
 * Every stream, every purchase, every investment flows directly to the creator
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

const SPOTIFY_ARTIST_ID = "3P0GWluMPNZ2xSCVffVGAr";
const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr";

// Full catalog from Vydia + Spotify
const CATALOG = [
  { id: 1, title: "CHAIS X", vydia: "https://vyd.co/ChaisTheGreatThrowingStones", year: "2024", genre: "Hip-Hop", tier: "GUARDIAN" },
  { id: 2, title: "LETTER", vydia: "https://vyd.co/PnbRockVibes", year: "2024", genre: "R&B", tier: "FREE" },
  { id: 3, title: "Ghetto Gospel", vydia: "https://vyd.co/ChaisTheGreatGhettoGospel", year: "2024", genre: "Hip-Hop", tier: "FREE" },
  { id: 4, title: "Bama", vydia: "https://vyd.co/Bama", year: "2024", genre: "Hip-Hop", tier: "FREE" },
  { id: 5, title: "No Recipe", vydia: "https://vyd.co/NoRecipe", year: "2024", genre: "Hip-Hop", tier: "FREE" },
  { id: 6, title: "Walk It Talk It", vydia: "https://vyd.co/WalkItTalkIt", year: "2024", genre: "Hip-Hop", tier: "FREE" },
  { id: 7, title: "Just a Friend (Premix)", vydia: null, year: "2023", genre: "R&B", tier: "GUARDIAN" },
  { id: 8, title: "Chase Too Fast", vydia: null, year: "2023", genre: "Hip-Hop", tier: "FREE" },
  { id: 9, title: "Never Giving Up", vydia: null, year: "2023", genre: "Hip-Hop", tier: "FREE" },
  { id: 10, title: "The Goat You Just Met", vydia: null, year: "2023", genre: "Hip-Hop", tier: "GUARDIAN" },
  { id: 11, title: "Penny for Your Thoughts", vydia: null, year: "2023", genre: "R&B", tier: "FREE" },
  { id: 12, title: "Nobody", vydia: null, year: "2023", genre: "Hip-Hop", tier: "FREE" },
  { id: 13, title: "Late Night", vydia: null, year: "2022", genre: "R&B", tier: "FREE" },
  { id: 14, title: "Apeshyt", vydia: null, year: "2022", genre: "Hip-Hop", tier: "FREE" },
  { id: 15, title: "Promise Land", vydia: null, year: "2022", genre: "Hip-Hop", tier: "GUARDIAN" },
  { id: 16, title: "Chasing My Idols Titles", vydia: null, year: "2022", genre: "Hip-Hop", tier: "FREE" },
  { id: 17, title: "What's It Gonna Take?", vydia: null, year: "2022", genre: "Hip-Hop", tier: "FREE" },
  { id: 18, title: "Jordan", vydia: null, year: "2022", genre: "Hip-Hop", tier: "GUARDIAN" },
  { id: 19, title: "Chasing My Idols Titles Vol. 2", vydia: null, year: "2022", genre: "Hip-Hop", tier: "FREE" },
  { id: 20, title: "PNB Vibez", vydia: "https://vyd.co/PnbRockVibes", year: "2022", genre: "R&B", tier: "FREE" },
  { id: 21, title: "Paradise in AC", vydia: null, year: "2021", genre: "R&B", tier: "FREE" },
  { id: 22, title: "I Need to Know", vydia: null, year: "2021", genre: "R&B", tier: "FREE" },
  { id: 23, title: "The Town", vydia: null, year: "2021", genre: "Hip-Hop", tier: "FREE" },
  { id: 24, title: "Day by Day", vydia: null, year: "2021", genre: "Hip-Hop", tier: "FREE" },
  { id: 25, title: "LEGENDARY", vydia: null, year: "2021", genre: "Hip-Hop", tier: "GUARDIAN" },
  { id: 26, title: "Bringing Me Down", vydia: null, year: "2021", genre: "R&B", tier: "FREE" },
  { id: 27, title: "F*** Up the Change", vydia: null, year: "2021", genre: "Hip-Hop", tier: "FREE" },
  { id: 28, title: "Top Shelf", vydia: null, year: "2020", genre: "Hip-Hop", tier: "GUARDIAN" },
  { id: 29, title: "That's It That's It", vydia: null, year: "2020", genre: "Hip-Hop", tier: "FREE" },
  { id: 30, title: "Smoking Exotic", vydia: null, year: "2020", genre: "Hip-Hop", tier: "FREE" },
  { id: 31, title: "Road to the Riches", vydia: null, year: "2020", genre: "Hip-Hop", tier: "GUARDIAN" },
  { id: 32, title: "CHAIS X LETTER", vydia: null, year: "2024", genre: "Hip-Hop", tier: "GUARDIAN" },
];

const TIER_COLORS: Record<string, string> = {
  FREE: "#8899AA",
  GUARDIAN: "#00D4FF",
  SOVEREIGN: "#FFB800",
};

const INVESTMENT_TIERS = [
  {
    name: "Stream Supporter",
    price: "$14.40",
    priceUSD: 1440,
    tokens: "144 $LONDC",
    perks: [
      "Full catalog access — 32+ tracks",
      "Early release previews",
      "Guardian Discord access",
      "144 $LONDC tokens",
      "Streaming revenue share (0.1%)",
    ],
    color: "#00D4FF",
    cta: "Support the Movement",
  },
  {
    name: "Music Investor",
    price: "$144",
    priceUSD: 14400,
    tokens: "1,444 $LONDC",
    perks: [
      "Everything in Stream Supporter",
      "1% music revenue share",
      "Executive Producer credit",
      "1,444 $LONDC tokens",
      "Exclusive unreleased tracks",
      "1-on-1 with Chais The Great",
    ],
    color: "#FFB800",
    cta: "Invest in the Legacy",
    featured: true,
  },
  {
    name: "Sovereign Partner",
    price: "$444",
    priceUSD: 44400,
    tokens: "4,444 $LONDC",
    perks: [
      "Everything in Music Investor",
      "5% music revenue share",
      "Co-producer credit on next album",
      "4,444 $LONDC tokens",
      "NFT of signed album artwork",
      "Quarterly royalty reports",
      "Zakat distribution rights",
    ],
    color: "#00FF88",
    cta: "Become a Sovereign Partner",
  },
];

export default function Music() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"ALL" | "FREE" | "GUARDIAN">("ALL");
  const [search, setSearch] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const subscribe = trpc.guardian.subscribe.useMutation({
    onSuccess: () => {
      setEmailSubmitted(true);
      toast.success("You are now in the ScrollVerse music community!");
    },
    onError: (err) => toast.error(err.message),
  });

  const filtered = CATALOG.filter((t) => {
    const matchFilter = filter === "ALL" || t.tier === filter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.includes("@")) return;
    subscribe.mutate({ email: emailInput });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="relative overflow-hidden py-20 px-4"
        style={{
          background: "linear-gradient(135deg, #050B1A 0%, #0A1628 50%, #050B1A 100%)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: Math.random() * 4 + 1 + "px",
                height: Math.random() * 4 + 1 + "px",
                background: i % 2 === 0 ? "#00D4FF" : "#FFB800",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDelay: Math.random() * 3 + "s",
              }}
            />
          ))}
        </div>
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-mono" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
            🎵 CHAIS THE GREAT — SOVEREIGN DSP
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>
            THE MUSIC
          </h1>
          <p className="text-xl mb-2" style={{ color: "#8899AA" }}>
            32+ Tracks · Direct-to-Fan · Crypto-Enabled · Investment-Grade
          </p>
          <p className="text-sm max-w-2xl mx-auto mb-8" style={{ color: "#556677" }}>
            Every stream is an investment. Every purchase is a stake in the legacy. Chais The Great is not just music — it is a sovereign economy where fans become partners, listeners become investors, and art becomes immutable wealth.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={SPOTIFY_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: "#1DB954", color: "white" }}
            >
              🎧 Listen on Spotify
            </a>
            <a
              href="https://dashboard.vydia.com/d2/files/audio/albums"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF" }}
            >
              📀 Full Catalog on Vydia
            </a>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Spotify Embed */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🎵 Stream Now — Chais The Great
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.2)" }}>
            <iframe
              src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>

        {/* Investment Pitch */}
        <div
          className="rounded-2xl p-8 mb-12"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(255,184,0,0.05))", border: "1px solid rgba(255,184,0,0.2)" }}
        >
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>WHY MUSIC IS THE INVESTMENT</div>
            <h2 className="text-3xl font-black text-white mb-4">Listening IS Investing</h2>
            <p className="text-base max-w-3xl mx-auto" style={{ color: "#8899AA", lineHeight: "1.8" }}>
              Traditional DSPs pay artists $0.003–$0.005 per stream. ScrollVerse flips the model: your streams, purchases, and investments flow <strong style={{ color: "#00D4FF" }}>directly to Chais The Great</strong> with zero middlemen. Every $LONDC token you hold is a stake in the catalog. As the music grows, your tokens grow. This is the first sovereign music economy on Polygon — where fans and artists share the same frequency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎵", title: "Stream = Stake", desc: "Every stream on the ScrollVerse DSP earns you $LONDC micro-rewards. Listening is literally investing." },
              { icon: "💎", title: "Direct Revenue Share", desc: "Music Investors receive 1–5% of catalog revenue quarterly, paid in MATIC or USDC to your wallet." },
              { icon: "♾️", title: "Immutable Royalties", desc: "ScrollSoul NFTs carry 7.77% EIP-2981 royalties on every secondary sale — forever, on-chain, unstoppable." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-6 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: "#8899AA" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Tiers */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>MUSIC INVESTMENT TIERS</div>
            <h2 className="text-3xl font-black text-white">Invest in the Legacy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INVESTMENT_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl p-6 relative"
                style={{
                  background: tier.featured ? `linear-gradient(135deg, ${tier.color}10, rgba(5,11,26,0.9))` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${tier.color}${tier.featured ? "60" : "30"}`,
                  transform: tier.featured ? "scale(1.03)" : "scale(1)",
                }}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ background: tier.color, color: "#050B1A" }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="text-xs font-mono mb-2" style={{ color: tier.color }}>{tier.name.toUpperCase()}</div>
                <div className="text-4xl font-black mb-1" style={{ color: tier.color, fontFamily: "'Space Mono', monospace" }}>{tier.price}</div>
                <div className="text-sm mb-4" style={{ color: "#8899AA" }}>{tier.tokens}</div>
                <ul className="space-y-2 mb-6">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="text-sm flex items-start gap-2" style={{ color: "#AABBCC" }}>
                      <span style={{ color: tier.color, marginTop: "2px" }}>›</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link href="/token">
                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: tier.featured ? tier.color : `${tier.color}20`,
                      color: tier.featured ? "#050B1A" : tier.color,
                      border: `1px solid ${tier.color}40`,
                    }}
                  >
                    {tier.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Track Catalog */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00D4FF" }}>FULL CATALOG</div>
              <h2 className="text-2xl font-black text-white">32+ Sovereign Tracks</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["ALL", "FREE", "GUARDIAN"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                  style={{
                    background: filter === f ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${filter === f ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                    color: filter === f ? "#00D4FF" : "#8899AA",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <input
            type="text"
            placeholder="Search tracks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl mb-6 outline-none text-sm"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((track, i) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.08)" }}
                onClick={() => {
                  if (track.vydia) {
                    window.open(track.vydia, "_blank");
                  } else {
                    window.open(SPOTIFY_ARTIST_URL, "_blank");
                  }
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${TIER_COLORS[track.tier]}20`, color: TIER_COLORS[track.tier], border: `1px solid ${TIER_COLORS[track.tier]}30` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{track.title}</div>
                  <div className="text-xs" style={{ color: "#556677" }}>{track.genre} · {track.year}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${TIER_COLORS[track.tier]}15`, color: TIER_COLORS[track.tier], border: `1px solid ${TIER_COLORS[track.tier]}30` }}>
                    {track.tier}
                  </span>
                  {track.vydia ? (
                    <span className="text-xs" style={{ color: "#00FF88" }}>▶</span>
                  ) : (
                    <span className="text-xs" style={{ color: "#1DB954" }}>🎧</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Capture */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(0,212,255,0.05))", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>JOIN THE MUSIC COMMUNITY</div>
          <h3 className="text-2xl font-black text-white mb-2">Get Direct Access</h3>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            Register your email to receive new releases, investment opportunities, and exclusive content directly from Chais The Great — no DSP, no middleman.
          </p>
          {emailSubmitted ? (
            <div className="p-4 rounded-xl text-sm font-bold" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
              ✓ You are now in the sovereign music community. Welcome, Guardian.
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
              />
              <button
                type="submit"
                disabled={subscribe.isPending}
                className="px-6 py-3 rounded-xl font-bold text-sm flex-shrink-0"
                style={{ background: "#00FF88", color: "#050B1A" }}
              >
                {subscribe.isPending ? "..." : "Join"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer nav */}
      <div className="container pb-8 flex flex-wrap gap-4 justify-center">
        <Link href="/" className="text-sm hover:text-white transition-colors" style={{ color: "#556677" }}>← Home</Link>
        <Link href="/token" className="text-sm hover:text-white transition-colors" style={{ color: "#556677" }}>Token Store</Link>
        <Link href="/crypto" className="text-sm hover:text-white transition-colors" style={{ color: "#556677" }}>CryptoHub</Link>
        <Link href="/connect" className="text-sm hover:text-white transition-colors" style={{ color: "#556677" }}>Connect</Link>
      </div>
    </div>
  );
}
