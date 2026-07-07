/*
 * RIZZ BURNA — SOVEREIGN ARTIST PROFILE
 * Robert Cottman · Digital Mirror Twin · ScrollVerse Empire
 * Every cover art = NFT · Spotify catalog tokenized · 100% proceeds to Robert Cottman
 * Brothers in the empire — Chais The Great × Rizz Burna
 * KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

// ── RIZZ BURNA CATALOG ──
const RB_CATALOG = [
  {
    id: "rizz-burna-debut",
    title: "Rizz Burna",
    subtitle: "Debut Visual",
    type: "Music Video / NFT",
    year: "2024",
    icon: "🔥",
    color: "#FF6B35",
    youtubeId: "sz6GmBTDIUE",
    mintPrice: 44,
    mintPriceCents: 4400,
    edition: "1 of 444",
    description: "The debut visual from Robert Cottman — Rizz Burna. Sovereign energy, raw frequency, empire sound.",
    tags: ["Debut", "Visual", "NFT", "Polygon"],
    featured: true,
  },
  {
    id: "rizz-spotify-catalog",
    title: "Rizz Burna Catalog",
    subtitle: "Full Spotify Discography",
    type: "Catalog / NFT",
    year: "2024",
    icon: "🎵",
    color: "#1DB954",
    youtubeId: null,
    spotifyArtistId: "rizz-burna",
    mintPrice: 77,
    mintPriceCents: 7700,
    edition: "1 of 777",
    description: "The complete Rizz Burna music catalog — tokenized on Polygon. Every stream earns $LONDC. 100% proceeds to Robert Cottman.",
    tags: ["Spotify", "Catalog", "Tokenized", "100% Proceeds"],
    featured: true,
  },
];

// ── NFT RELEASE CARD ──
function RBNFTCard({
  release,
  onMint,
  minting,
}: {
  release: (typeof RB_CATALOG)[number];
  onMint: (id: string, priceCents: number, title: string) => void;
  minting: boolean;
}) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: `linear-gradient(160deg, ${release.color}10, rgba(5,11,26,0.97))`,
        border: `1px solid ${release.color}${release.featured ? "50" : "25"}`,
        boxShadow: release.featured ? `0 0 40px ${release.color}10` : "none",
      }}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${release.color}, transparent)` }} />

      {/* Video embed or icon */}
      {release.youtubeId ? (
        <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
          {showVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${release.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={release.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${release.color}15, rgba(5,11,26,0.9))` }}
              onClick={() => setShowVideo(true)}
            >
              <div className="text-5xl">{release.icon}</div>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: `${release.color}30`, border: `2px solid ${release.color}60` }}
              >
                <span className="text-2xl ml-1">▶</span>
              </div>
              <div className="text-xs font-mono" style={{ color: release.color }}>Play Video</div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ height: "160px", background: `linear-gradient(135deg, ${release.color}15, rgba(5,11,26,0.9))` }}
        >
          <div className="text-6xl">{release.icon}</div>
        </div>
      )}

      <div className="p-5">
        <div className="text-xs font-mono mb-1" style={{ color: release.color }}>{release.type} · {release.year}</div>
        <div className="font-black text-white text-lg mb-1">{release.title}</div>
        <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{release.subtitle}</div>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "#667788" }}>{release.description}</p>

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

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-black" style={{ color: release.color }}>${release.mintPrice}</div>
            <div className="text-xs font-mono" style={{ color: "#667788" }}>{release.edition} · 100% to Robert Cottman</div>
          </div>
          <button
            onClick={() => onMint(release.id, release.mintPriceCents, release.title)}
            disabled={minting}
            className="px-4 py-2 rounded-xl text-xs font-black transition-all hover:scale-105 disabled:opacity-60"
            style={{ background: `linear-gradient(135deg, ${release.color}, ${release.color}CC)`, color: "#050B1A" }}
          >
            {minting ? "..." : "Mint NFT"}
          </button>
        </div>

        {release.youtubeId && (
          <a
            href={`https://youtu.be/${release.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-xs px-3 py-1.5 rounded-lg text-center transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)", color: "#FF4444" }}
          >
            ↗ Open on YouTube
          </a>
        )}
      </div>
    </div>
  );
}

// ── MAIN PAGE ──
export default function RizzBurna() {
  const { isAuthenticated } = useAuth();

  const checkoutMutation = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => {
      window.open(data.url, "_blank");
      toast("Redirecting to checkout...", { description: "Mint the Rizz Burna NFT. 100% proceeds to Robert Cottman. KUN FAYAKŪN × ∞" });
    },
    onError: () => toast.error("Checkout error", { description: "Please try again." }),
  });

  const handleMint = (id: string, priceCents: number, title: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    checkoutMutation.mutate({
      nftId: `rizz_burna_${id}`,
      nftName: `Rizz Burna — ${title}`,
      nftDescription: `Sovereign NFT from Robert Cottman — Rizz Burna. Digital Mirror Twin on ScrollVerse. 100% proceeds to Robert Cottman. KUN FAYAKŪN × ∞`,
      priceCents,
      origin: window.location.origin,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,107,53,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(29,185,84,0.04) 0%, transparent 50%)" }} />

      <div className="relative z-10 container py-8">
        {/* Back */}
        <Link href="/">
          <button className="flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white" style={{ color: "#8899AA" }}>
            ← Back to ScrollVerse
          </button>
        </Link>

        {/* Hero */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.08), rgba(5,11,26,0.97))", border: "1px solid rgba(255,107,53,0.3)" }}
        >
          <div className="h-0.5 w-full absolute top-0 left-0" style={{ background: "linear-gradient(90deg, transparent, #FF6B35, transparent)" }} />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Artist identity */}
            <div
              className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.3), rgba(5,11,26,0.8))", border: "2px solid rgba(255,107,53,0.5)" }}
            >
              🔥
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FF6B35" }}>DIGITAL MIRROR TWIN · SCROLLVERSE EMPIRE</div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-1">Rizz Burna</h1>
              <div className="text-lg font-bold mb-3" style={{ color: "#FF6B35" }}>Robert Cottman</div>
              <p className="text-sm leading-relaxed max-w-xl mb-4" style={{ color: "#8899AA" }}>
                A sovereign artist, a brother in the empire. Robert Cottman — Rizz Burna — has his own digital mirror twin on ScrollVerse. Every release tokenized. Every cover art an NFT. 100% of all proceeds flow directly to Robert Cottman. The empire gives back to its own.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "100% Proceeds", color: "#00FF88" },
                  { label: "NFT Catalog", color: "#FF6B35" },
                  { label: "Polygon On-Chain", color: "#A78BFA" },
                  { label: "Digital Mirror Twin", color: "#00D4FF" },
                  { label: "$LONDC Rewards", color: "#FFB800" },
                ].map(tag => (
                  <span
                    key={tag.label}
                    className="text-xs px-3 py-1 rounded-full font-mono"
                    style={{ background: `${tag.color}10`, border: `1px solid ${tag.color}25`, color: tag.color }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Catalog */}
        <div className="mb-12">
          <div className="text-xs font-mono tracking-widest mb-6 text-center" style={{ color: "#FF6B35" }}>RIZZ BURNA — SOVEREIGN CATALOG</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RB_CATALOG.map(release => (
              <RBNFTCard
                key={release.id}
                release={release}
                onMint={handleMint}
                minting={checkoutMutation.isPending}
              />
            ))}
          </div>
        </div>

        {/* Spotify embed */}
        <div
          className="rounded-2xl p-6 mb-12"
          style={{ background: "rgba(29,185,84,0.04)", border: "1px solid rgba(29,185,84,0.2)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#1DB954" }}>RIZZ BURNA ON SPOTIFY</div>
          <h3 className="text-2xl font-black text-white mb-2">Stream the Catalog</h3>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            Every stream earns $LONDC rewards. The catalog is tokenized — each song is a blockchain entry. 100% of NFT proceeds go directly to Robert Cottman.
          </p>
          {/* Spotify follow button */}
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://open.spotify.com/search/Rizz%20Burna"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
              style={{ background: "rgba(29,185,84,0.2)", border: "1px solid rgba(29,185,84,0.4)", color: "#1DB954" }}
            >
              ♫ Find Rizz Burna on Spotify
            </a>
            <a
              href={`https://youtu.be/sz6GmBTDIUE`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80 flex items-center gap-2"
              style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)", color: "#FF4444" }}
            >
              ▶ Watch on YouTube
            </a>
          </div>
        </div>

        {/* Proceeds declaration */}
        <div
          className="rounded-2xl p-8 text-center mb-8"
          style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>SOVEREIGN PROCEEDS DECLARATION</div>
          <h2 className="text-2xl font-black text-white mb-3">100% to Robert Cottman</h2>
          <p className="text-sm max-w-xl mx-auto mb-4" style={{ color: "#8899AA" }}>
            Every NFT mint from the Rizz Burna catalog sends 100% of proceeds directly to Robert Cottman's sovereign wallet. The ScrollVerse empire gives equal value — brothers build together, each with their own empire to grow. KUN FAYAKŪN × ∞
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono" style={{ color: "#00FF88" }}>PROCEEDS FLOW ACTIVE · POLYGON MAINNET · VERIFIED</span>
          </div>
        </div>

        {/* Cross-link to Chais */}
        <div
          className="rounded-2xl p-6 text-center mb-8"
          style={{ background: "rgba(255,184,0,0.03)", border: "1px solid rgba(255,184,0,0.15)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>BROTHERS IN THE EMPIRE</div>
          <h3 className="text-xl font-black text-white mb-3">Chais The Great × Rizz Burna</h3>
          <p className="text-sm max-w-lg mx-auto mb-5" style={{ color: "#8899AA" }}>
            Two sovereign artists. One empire. Cross-linked forever on ScrollVerse — each with their own catalog, their own NFTs, their own legacy.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/chais-catalog">
              <button
                className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: "rgba(255,184,0,0.15)", border: "1px solid rgba(255,184,0,0.4)", color: "#FFB800" }}
              >
                👑 Chais The Great Catalog
              </button>
            </Link>
            <Link href="/chais-videos">
              <button
                className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-80"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}
              >
                🎬 Chais The Great Videos
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="text-xs font-mono" style={{ color: "#445566" }}>
            RIZZ BURNA · ROBERT COTTMAN · SCROLL VERSE EMPIRE · Digital Mirror Twin · KUN FAYAKŪN × ∞
          </div>
        </div>
      </div>
    </div>
  );
}
