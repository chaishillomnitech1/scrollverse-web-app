/*
 * CHAIS THE GREAT — SOVEREIGN MUSIC CATALOG
 * Every cover art = NFT on Polygon · Every song = blockchain entry
 * Full catalog: albums, singles, visuals — all pinned on IPFS
 * 100% proceeds to Chais Kenyatta Hill — Sabir Allah The Great
 * KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

// ── SHIMMER ANIMATION STYLE ──
const shimmerStyle = `
  @keyframes shimmerSlide {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// ── CATALOG DATA ──
// Each release: cover art on IPFS, NFT metadata, Stripe mint price
const CATALOG = [
  {
    id: "londyn-lullaby",
    title: "Londyn's Lullaby",
    subtitle: "Lifetime Instruction",
    type: "Book / NFT Art",
    year: "2025",
    icon: "🕊️",
    color: "#FFB800",
    cid: "bafybeigzb55bs3453cprr75yecz6jux32a6v3l5l4yzaualdhvht3mewwm",
    massiveId: "019f3b13-a17c-7600-bf4e-46e25cbb3653",
    ipfsUrl: "https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeigzb55bs3453cprr75yecz6jux32a6v3l5l4yzaualdhvht3mewwm",
    mintPrice: 144,
    mintPriceCents: 14400,
    edition: "1 of 144",
    description: "A sovereign lullaby for Princess Londyn Kenyatta Hill. Eternal legacy sealed on Polygon.",
    tags: ["Legacy", "NFT Art", "IPFS Verified", "Polygon"],
    featured: true,
  },
  {
    id: "the-city-vol1",
    title: "The City Vol. 1",
    subtitle: "Web Series Soundtrack",
    type: "Album / NFT",
    year: "2024",
    icon: "🌆",
    color: "#00D4FF",
    cid: "bafybeie4kdb2nr7tvvk2jgsyvu65azmz7msoa7m3ag63jehtso3fvwdvgq",
    massiveId: "019f3b01-010f-749d-a252-dc101ae910b5",
    ipfsUrl: "https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeie4kdb2nr7tvvk2jgsyvu65azmz7msoa7m3ag63jehtso3fvwdvgq",
    mintPrice: 77,
    mintPriceCents: 7700,
    edition: "1 of 777",
    description: "The official soundtrack to The City web series. Sovereign street narratives over quantum production.",
    tags: ["Web Series", "Soundtrack", "IPFS Verified", "Polygon"],
    featured: true,
  },
  {
    id: "flame-dna",
    title: "FlameDNA",
    subtitle: "1558Hz Frequency Album",
    type: "Album / NFT",
    year: "2024",
    icon: "🔥",
    color: "#FF6B35",
    cid: "bafybeiargqbawp2oseywfhums2dwvaerzikymqeejzmf2576ekfmdbpydq",
    massiveId: "019f3afe-8a3b-7652-8f1f-b4e627a5e103",
    ipfsUrl: "https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeiargqbawp2oseywfhums2dwvaerzikymqeejzmf2576ekfmdbpydq",
    mintPrice: 144,
    mintPriceCents: 14400,
    edition: "1 of 144",
    description: "Vibrational music at 1558Hz — the FlameDNA frequency. Sovereign consciousness encoded in sound.",
    tags: ["1558Hz", "Frequency", "IPFS Verified", "Polygon"],
    featured: true,
  },
  {
    id: "guardian-frequency",
    title: "Guardian Frequency",
    subtitle: "528Hz · 963Hz · 432Hz",
    type: "EP / NFT",
    year: "2024",
    icon: "🛡️",
    color: "#00FF88",
    cid: "bafybeigub3gn4ckx4qx33zw4skk3v3qqkzzv75sp32ml5af4wtl3dri77q",
    massiveId: "019f3afc-e74f-79f8-a038-4b3a15f08c3d",
    ipfsUrl: "https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeigub3gn4ckx4qx33zw4skk3v3qqkzzv75sp32ml5af4wtl3dri77q",
    mintPrice: 44,
    mintPriceCents: 4400,
    edition: "1 of 1,444",
    description: "Sacred frequency EP — 528Hz DNA healing, 963Hz God-State, 432Hz Universal Harmony.",
    tags: ["528Hz", "963Hz", "432Hz", "IPFS Verified"],
    featured: false,
  },
  {
    id: "sovereign-scrolls",
    title: "Sovereign Scrolls",
    subtitle: "The Anthology",
    type: "Album / NFT",
    year: "2023",
    icon: "📜",
    color: "#A78BFA",
    cid: "bafybeickv52mzzbc45yrq5y4vvfla5p72qajwhphhpffcimkgbulpazxla",
    massiveId: "019f3afa-6f06-7c09-b4bb-ec7970fe995b",
    ipfsUrl: "https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeickv52mzzbc45yrq5y4vvfla5p72qajwhphhpffcimkgbulpazxla",
    mintPrice: 77,
    mintPriceCents: 7700,
    edition: "1 of 777",
    description: "The sovereign anthology — years of wisdom, bars, and frequency encoded in a timeless collection.",
    tags: ["Anthology", "Sovereign", "IPFS Verified", "Polygon"],
    featured: false,
  },
  {
    id: "omni-nexus-sessions",
    title: "Omni-Nexus Sessions",
    subtitle: "Live Recordings",
    type: "Live Album / NFT",
    year: "2025",
    icon: "🌌",
    color: "#EC4899",
    cid: "bafybeickv52mzzbc45yrq5y4vvfla5p72qajwhphhpffcimkgbulpazxla",
    massiveId: "019f3af8-458e-7d87-bcf2-a1269175a069",
    ipfsUrl: "https://olive-delicate-koi-568.mypinata.cloud/ipfs/bafybeickv52mzzbc45yrq5y4vvfla5p72qajwhphhpffcimkgbulpazxla",
    mintPrice: 144,
    mintPriceCents: 14400,
    edition: "1 of 144",
    description: "Live sessions from the Omni-Nexus — raw sovereign energy captured and sealed on-chain forever.",
    tags: ["Live", "Sessions", "IPFS Verified", "Polygon"],
    featured: false,
  },
];

// ── SHARE BUTTONS ──
function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`🎵 ${title} — Sovereign NFT by Chais The Great. Pinned on IPFS · Polygon`)}&url=${encodeURIComponent(url)}&hashtags=ScrollVerse,LONDC,ChaisTheGreat,Polygon`;
  const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`🎵 ${title} — Sovereign NFT by Chais The Great. Pinned on IPFS · Polygon #ScrollVerse #LONDC`)}`;
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast("🔗 Link copied!", { description: "Share the sovereign NFT link with your network." });
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex gap-1.5 flex-wrap">
      <a
        href={tw}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105"
        style={{ background: "rgba(29,161,242,0.12)", border: "1px solid rgba(29,161,242,0.35)", color: "#1DA1F2" }}
      >
        𝕏 Share
      </a>
      <a
        href={tg}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105"
        style={{ background: "rgba(0,136,204,0.12)", border: "1px solid rgba(0,136,204,0.35)", color: "#0088CC" }}
      >
        ✈ Telegram
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105"
        style={{
          background: copied ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${copied ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.12)"}`,
          color: copied ? "#00FF88" : "#8899AA",
          transition: "all 0.2s ease",
        }}
      >
        {copied ? "✓ Copied!" : "🔗 Copy"}
      </button>
    </div>
  );
}

// ── NFT CARD COMPONENT ──
function NFTCard({
  release,
  onMint,
  minting,
}: {
  release: (typeof CATALOG)[number];
  onMint: (id: string, priceCents: number, title: string) => void;
  minting: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const shortCid = release.cid.slice(0, 8) + "..." + release.cid.slice(-6);
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : "https://scrollverse.co"}/chais-catalog#${release.id}`;

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1200px", minHeight: "420px" }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow halo on hover */}
      <div
        className="absolute -inset-1 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${release.color}30, transparent 70%)`,
          opacity: hovered && !flipped ? 1 : 0,
          filter: "blur(12px)",
        }}
      />
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "420px",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(160deg, ${release.color}15, rgba(5,11,26,0.97))`,
            border: `1px solid ${release.color}${release.featured ? "50" : "25"}`,
            boxShadow: release.featured ? `0 0 40px ${release.color}12` : "none",
          }}
        >
          {/* Top glow */}
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${release.color}, transparent)` }} />

          {/* Cover art area */}
          <div
            className="relative mx-4 mt-4 rounded-xl overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${release.color}20, rgba(5,11,26,0.8))`,
              border: `1px solid ${release.color}30`,
              height: "160px",
              transition: "box-shadow 0.4s ease",
              boxShadow: hovered && !flipped ? `0 0 28px ${release.color}35, inset 0 0 20px ${release.color}10` : "none",
            }}
          >
            {/* Shimmer overlay on hover */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(105deg, transparent 40%, ${release.color}18 50%, transparent 60%)`,
                backgroundSize: "200% 100%",
                animation: hovered && !flipped ? "shimmerSlide 1.6s linear infinite" : "none",
                opacity: hovered && !flipped ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
            <div
              className="text-6xl transition-transform duration-500"
              style={{ transform: hovered && !flipped ? "scale(1.12) rotate(-3deg)" : "scale(1) rotate(0deg)" }}
            >
              {release.icon}
            </div>
            {/* IPFS live badge */}
            <div
              className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono"
              style={{ background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.4)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              <span style={{ color: "#00FF88" }}>IPFS</span>
            </div>
            {/* Edition badge */}
            <div
              className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-mono font-bold"
              style={{ background: `${release.color}20`, border: `1px solid ${release.color}40`, color: release.color }}
            >
              {release.edition}
            </div>
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col flex-1">
            <div className="text-xs font-mono mb-1" style={{ color: release.color }}>{release.type} · {release.year}</div>
            <div className="font-black text-white text-lg leading-tight mb-1">{release.title}</div>
            <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{release.subtitle}</div>
            <div className="flex flex-wrap gap-1 mb-4">
              {release.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${release.color}10`, border: `1px solid ${release.color}20`, color: release.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-2xl font-black" style={{ color: release.color }}>${release.mintPrice}</div>
                  <div className="text-xs font-mono" style={{ color: "#667788" }}>Mint NFT · $LONDC rewards</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onMint(release.id, release.mintPriceCents, release.title); }}
                  disabled={minting}
                  className="px-4 py-2 rounded-xl text-xs font-black transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
                  style={{ background: `linear-gradient(135deg, ${release.color}, ${release.color}CC)`, color: "#050B1A", boxShadow: `0 0 16px ${release.color}40` }}
                >
                  {minting ? "..." : "Mint NFT"}
                </button>
              </div>
              {/* Social sharing */}
              <ShareButtons title={release.title} url={shareUrl} />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col p-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(160deg, rgba(5,11,26,0.98), ${release.color}08)`,
            border: `1px solid ${release.color}30`,
          }}
        >
          <div className="h-0.5 w-full mb-4" style={{ background: `linear-gradient(90deg, transparent, ${release.color}, transparent)` }} />
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: release.color }}>ON-CHAIN VERIFICATION</div>
          <div className="font-black text-white text-base mb-3">{release.title}</div>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "#8899AA" }}>{release.description}</p>

          {/* CID */}
          <div className="rounded-lg p-3 mb-3" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)" }}>
            <div className="text-xs font-mono mb-1" style={{ color: "#00FF88" }}>IPFS CID</div>
            <div className="text-xs font-mono break-all" style={{ color: "#C4D0E0" }}>{shortCid}</div>
          </div>

          {/* Massive ID */}
          <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>MASSIVE STORAGE ID</div>
            <div className="text-xs font-mono" style={{ color: "#C4D0E0" }}>{release.massiveId}</div>
          </div>

          {/* Links */}
          <div className="flex gap-2 flex-wrap mt-auto">
            <a
              href={release.ipfsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
              style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}
            >
              ↗ View on IPFS
            </a>
            <a
              href="https://app.pinata.cloud/ipfs/files"
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", color: "#FFB800" }}
            >
              ✓ Verify on Pinata
            </a>
          </div>
          <div className="text-xs font-mono mt-3 text-center" style={{ color: "#445566" }}>Click to flip back</div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──
export default function ChaisCatalog() {
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<"all" | "album" | "ep" | "single" | "nft">("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "popular" | "price_asc" | "price_desc">("newest");

  const checkoutMutation = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.open(data.url, "_blank");
      toast("Redirecting to sovereign checkout...", { description: "Mint your NFT and earn $LONDC staking rewards." });
    },
    onError: () => toast.error("Checkout error", { description: "Please try again." }),
  });

  const handleMint = (id: string, priceCents: number, title: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    checkoutMutation.mutate({
      nftId: `catalog_${id}`,
      nftName: `Chais The Great — ${title}`,
      nftDescription: `Sovereign NFT from the Chais The Great catalog. Pinned on IPFS. $LONDC staking rewards. KUN FAYAKŪN × ∞`,
      priceCents,
      origin: window.location.origin,
    });
  };

  const filtered = CATALOG.filter(r => {
    if (filter === "all") return true;
    if (filter === "album") return r.type.toLowerCase().includes("album");
    if (filter === "ep") return r.type.toLowerCase().includes("ep");
    if (filter === "nft") return r.cid.length > 0;
    return true;
  }).sort((a, b) => {
    if (sort === "newest") return parseInt(b.year) - parseInt(a.year);
    if (sort === "oldest") return parseInt(a.year) - parseInt(b.year);
    if (sort === "popular") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sort === "price_asc") return a.mintPrice - b.mintPrice;
    if (sort === "price_desc") return b.mintPrice - a.mintPrice;
    return 0;
  });

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{shimmerStyle}</style>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(255,184,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,212,255,0.04) 0%, transparent 50%)" }} />

      <div className="relative z-10 container py-8">
        {/* Back */}
        <Link href="/">
          <button className="flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white" style={{ color: "#8899AA" }}>
            ← Back to ScrollVerse
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>CHAIS THE GREAT — SOVEREIGN CATALOG</div>
          <h1
            className="text-5xl md:text-6xl font-black mb-4"
            style={{ background: "linear-gradient(135deg, #FFB800, #ffffff, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            The Full Catalog
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Every cover art is a sovereign NFT. Every song is a blockchain entry. 100% proceeds to Chais Kenyatta Hill — Sabir Allah The Great. All assets pinned on IPFS and verified on Polygon.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {[
              { label: "Releases", value: CATALOG.length.toString(), color: "#FFB800" },
              { label: "NFTs Minted", value: "144+", color: "#00D4FF" },
              { label: "Chain", value: "Polygon", color: "#A78BFA" },
              { label: "Storage", value: "IPFS + Massive", color: "#00FF88" },
              { label: "Proceeds", value: "100% Sovereign", color: "#FF6B35" },
            ].map(s => (
              <div key={s.label} className="text-center px-4 py-2 rounded-xl" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                <div className="font-black text-lg" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 justify-center flex-wrap mb-3">
            {(["all", "album", "ep", "nft"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all"
                style={{
                  background: filter === f ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${filter === f ? "rgba(255,184,0,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: filter === f ? "#FFB800" : "#8899AA",
                }}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          {/* Sort controls */}
          <div className="flex gap-2 justify-center flex-wrap items-center">
            <span className="text-xs font-mono" style={{ color: "#445566" }}>SORT:</span>
            {(["newest", "oldest", "popular", "price_asc", "price_desc"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{
                  background: sort === s ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${sort === s ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: sort === s ? "#00D4FF" : "#8899AA",
                }}
              >
                {s === "newest" ? "↓ Newest" : s === "oldest" ? "↑ Oldest" : s === "popular" ? "🔥 Featured" : s === "price_asc" ? "$ Low" : "$ High"}
              </button>
            ))}
          </div>
        </div>

        {/* Featured releases */}
        {filter === "all" && (
          <div className="mb-12">
            <div className="text-xs font-mono tracking-widest mb-6 text-center" style={{ color: "#FFB800" }}>FEATURED RELEASES</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATALOG.filter(r => r.featured).map(release => (
                <NFTCard
                  key={release.id}
                  release={release}
                  onMint={handleMint}
                  minting={checkoutMutation.isPending}
                />
              ))}
            </div>
          </div>
        )}

        {/* Full catalog grid */}
        <div className="mb-12">
          {filter !== "all" && (
            <div className="text-xs font-mono tracking-widest mb-6 text-center" style={{ color: "#00D4FF" }}>
              {filter.toUpperCase()} RELEASES
            </div>
          )}
          {filter === "all" && (
            <div className="text-xs font-mono tracking-widest mb-6 text-center" style={{ color: "#00D4FF" }}>FULL CATALOG</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(release => (
              <NFTCard
                key={release.id}
                release={release}
                onMint={handleMint}
                minting={checkoutMutation.isPending}
              />
            ))}
          </div>
        </div>

        {/* Sovereign declaration */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center mb-8"
          style={{ background: "rgba(255,184,0,0.03)", border: "1px solid rgba(255,184,0,0.2)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>SOVEREIGN DECLARATION</div>
          <h2 className="text-3xl font-black text-white mb-4">Music Is a Physical Asset</h2>
          <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Every song in the Chais The Great catalog is a blockchain — a sovereign record of creation, frequency, and eternal legacy. Each NFT mint earns $LONDC staking rewards. 7.77% Zakat auto-distributed. The empire grows with every play, every mint, every Guardian.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/subscribe">
              <button
                className="px-6 py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FFB800, #FF8C00)", color: "#050B1A" }}
              >
                👑 Join the Empire
              </button>
            </Link>
            <Link href="/chais-videos">
              <button
                className="px-6 py-3 rounded-xl font-black text-sm transition-all hover:opacity-80"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                🎬 Watch All Videos
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            CHAIS THE GREAT · SCROLL VERSE LLC · EIN 42-2509570 · All assets on IPFS + Polygon · KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
