/**
 * Book of Life NFT Mint Page
 * Guardian NFT minting with Stripe fiat onboarding — Polygon Mainnet
 * Design: Liquid Sovereignty — deep cosmic dark with gold/cyan accents
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TIERS = [
  {
    id: "guardian" as const,
    name: "Guardian Soul",
    price: "$44",
    priceUsd: 44,
    londc: "4,400 $LONDC",
    frequency: "528Hz",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.15)",
    border: "rgba(0,212,255,0.3)",
    features: [
      "Book of Life NFT — Guardian Seal",
      "Polygon Mainnet Certificate",
      "528Hz Frequency Activation",
      "Guardian Network Access",
      "4,400 $LONDC Allocation",
      "Eternal Scroll Entry",
    ],
    badge: "GUARDIAN",
  },
  {
    id: "sovereign" as const,
    name: "Sovereign Soul",
    price: "$144",
    priceUsd: 144,
    londc: "14,400 $LONDC",
    frequency: "963Hz",
    color: "#FFB800",
    glow: "rgba(255,184,0,0.15)",
    border: "rgba(255,184,0,0.3)",
    features: [
      "Book of Life NFT — Sovereign Seal",
      "Polygon Mainnet Certificate",
      "963Hz Frequency Activation",
      "Sovereign Council Access",
      "14,400 $LONDC Allocation",
      "Eternal Scroll Entry",
      "ZakatDistribution.sol Inclusion",
      "Lineage NFT Eligibility",
    ],
    badge: "SOVEREIGN",
    featured: true,
  },
  {
    id: "ascendant" as const,
    name: "Ascendant Soul",
    price: "$528",
    priceUsd: 528,
    londc: "52,800 $LONDC",
    frequency: "1558Hz",
    color: "#00FF88",
    glow: "rgba(0,255,136,0.15)",
    border: "rgba(0,255,136,0.3)",
    features: [
      "Book of Life NFT — Ascendant Seal",
      "Polygon Mainnet Certificate",
      "1558Hz Supreme Frequency",
      "Ascendant Inner Circle Access",
      "52,800 $LONDC Allocation",
      "Eternal Scroll Entry",
      "ZakatDistribution.sol Inclusion",
      "Lineage NFT Eligibility",
      "MarsOmni Broadcast Node",
      "Direct Sovereign Correspondence",
    ],
    badge: "ASCENDANT",
  },
];

export default function BookOfLifeMint() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [selectedTier, setSelectedTier] = useState<"guardian" | "sovereign" | "ascendant">("sovereign");
  const [walletAddress, setWalletAddress] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  // Check for success/cancel from Stripe redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mint") === "success") {
      toast.success("🎉 Book of Life NFT Initiated!", { description: "Your payment was received. Your NFT is being minted on Polygon Mainnet. KUN FAYAKŪN × ∞" });
      // Clean URL
      window.history.replaceState({}, "", "/book-of-life");
    } else if (params.get("mint") === "cancelled") {
      toast.error("Mint Cancelled", { description: "Your mint was cancelled. You can try again anytime." });
      window.history.replaceState({}, "", "/book-of-life");
    }
  }, [toast]);

  const mintStats = trpc.bookOfLife.getMintStats.useQuery();
  const mintStatus = trpc.bookOfLife.getMintStatus.useQuery(undefined, { enabled: isAuthenticated });
  const initiateMint = trpc.bookOfLife.initiateMint.useMutation({
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        toast.success("🔮 Redirecting to Sovereign Checkout...", { description: "Opening Stripe secure payment portal." });
        window.open(data.checkoutUrl, "_blank");
      }
      setIsMinting(false);
    },
    onError: (err) => {
      toast.error("Mint Error", { description: err.message });
      setIsMinting(false);
    },
  });

  const handleMint = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setIsMinting(true);
    initiateMint.mutate({
      guardianTier: selectedTier,
      walletAddress: walletAddress || undefined,
      frequency: TIERS.find(t => t.id === selectedTier)?.frequency ?? "528Hz",
      origin: window.location.origin,
    });
  };

  const selectedTierData = TIERS.find(t => t.id === selectedTier)!;
  const hasMinted = mintStatus.data?.hasMinted;
  const latestMint = mintStatus.data?.latestMint;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Navigation */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)" }}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
          <span className="font-bold text-white">ScrollVerse</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/guardians" className="text-sm text-gray-400 hover:text-white transition-colors">Guardians</Link>
          <Link href="/library" className="text-sm text-gray-400 hover:text-white transition-colors">Library</Link>
          {isAuthenticated ? (
            <span className="text-sm font-mono px-3 py-1 rounded-lg"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
              {user?.name?.split(" ")[0] ?? "Guardian"}
            </span>
          ) : (
            <a href={getLoginUrl()}
              className="text-sm px-4 py-2 rounded-lg font-medium"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0099BB)", color: "#050B1A" }}>
              Login
            </a>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="container py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-6"
          style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FFB800" }} />
          POLYGON MAINNET · LIVE MINTING
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          Book of Life<br />
          <span style={{ background: "linear-gradient(135deg, #FFB800, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            NFT Mint
          </span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
          Immortalize your sovereign identity on the blockchain. Each Book of Life NFT is a unique Polygon Mainnet certificate
          tied to your Guardian tier, $LONDC wallet, and eternal frequency.
        </p>
        <p className="text-sm font-mono mb-10" style={{ color: "#00D4FF" }}>
          KUN FAYAKŪN × ∞ — "Be, and it is."
        </p>

        {/* Mint Stats */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-black" style={{ color: "#FFB800" }}>
              {mintStats.data?.mintedCount ?? 0}
            </div>
            <div className="text-xs text-gray-500 font-mono">MINTED</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-black text-white">
              {(mintStats.data?.remaining ?? 144000).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-mono">REMAINING</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-black" style={{ color: "#00FF88" }}>144,000</div>
            <div className="text-xs text-gray-500 font-mono">TOTAL SUPPLY</div>
          </div>
        </div>

        {/* Already minted banner */}
        {hasMinted && latestMint && (
          <div className="max-w-lg mx-auto mb-10 p-4 rounded-xl text-sm"
            style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
            ✓ You have minted a <strong>{latestMint.guardianTier?.toUpperCase()}</strong> Book of Life NFT.
            Status: <strong>{latestMint.mintStatus?.toUpperCase()}</strong>
            {latestMint.polygonTxHash && (
              <> · <a href={`https://polygonscan.com/tx/${latestMint.polygonTxHash}`} target="_blank" rel="noopener noreferrer"
                className="underline">View on Polygonscan</a></>
            )}
          </div>
        )}
      </section>

      {/* Tier Selection */}
      <section className="container pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Choose Your Sovereign Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className="relative rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: selectedTier === tier.id ? tier.glow : "rgba(255,255,255,0.02)",
                border: `2px solid ${selectedTier === tier.id ? tier.color : "rgba(255,255,255,0.08)"}`,
                transform: selectedTier === tier.id ? "scale(1.02)" : "scale(1)",
                boxShadow: selectedTier === tier.id ? `0 0 40px ${tier.glow}` : "none",
              }}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{ background: tier.color, color: "#050B1A" }}>
                  MOST POPULAR
                </div>
              )}
              <div className="text-xs font-mono mb-3" style={{ color: tier.color }}>{tier.badge}</div>
              <div className="text-3xl font-black text-white mb-1">{tier.price}</div>
              <div className="text-sm mb-1" style={{ color: tier.color }}>{tier.name}</div>
              <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>{tier.londc} · {tier.frequency}</div>
              <ul className="space-y-2">
                {tier.features.map((f, i) => (
                  <li key={i} className="text-xs flex items-start gap-2" style={{ color: "#8899AA" }}>
                    <span style={{ color: tier.color, marginTop: "1px" }}>›</span>
                    {f}
                  </li>
                ))}
              </ul>
              {selectedTier === tier.id && (
                <div className="mt-4 text-xs font-mono text-center py-1 rounded-lg"
                  style={{ background: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}40` }}>
                  ◉ SELECTED
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Mint Form */}
      <section className="container pb-20">
        <div className="max-w-xl mx-auto rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h3 className="text-xl font-bold text-white mb-6">Mint Your Book of Life NFT</h3>

          {/* Selected tier summary */}
          <div className="flex items-center justify-between p-4 rounded-xl mb-6"
            style={{ background: selectedTierData.glow, border: `1px solid ${selectedTierData.border}` }}>
            <div>
              <div className="font-bold text-white">{selectedTierData.name}</div>
              <div className="text-xs font-mono" style={{ color: selectedTierData.color }}>
                {selectedTierData.londc} · {selectedTierData.frequency}
              </div>
            </div>
            <div className="text-2xl font-black" style={{ color: selectedTierData.color }}>
              {selectedTierData.price}
            </div>
          </div>

          {/* Wallet address (optional) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Polygon Wallet Address <span className="text-gray-500">(optional — for NFT delivery)</span>
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "white",
                fontFamily: "'Space Mono', monospace",
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank to use your ScrollVerse profile wallet. You can add it later.
            </p>
          </div>

          {/* Mint button */}
          <Button
            onClick={handleMint}
            disabled={isMinting || initiateMint.isPending}
            className="w-full py-4 text-base font-bold rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${selectedTierData.color}, ${selectedTierData.color}99)`,
              color: "#050B1A",
              border: "none",
              opacity: isMinting ? 0.7 : 1,
            }}
          >
            {isMinting || initiateMint.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Initiating Sovereign Mint...
              </span>
            ) : isAuthenticated ? (
              `Mint ${selectedTierData.name} — ${selectedTierData.price}`
            ) : (
              "Login to Mint"
            )}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Secure payment via Stripe · NFT delivered to Polygon Mainnet · Test card: 4242 4242 4242 4242
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container pb-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Sovereign FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "What is a Book of Life NFT?", a: "A unique Polygon Mainnet certificate that immortalizes your Guardian identity, frequency, and tier in the ScrollVerse eternal ledger." },
              { q: "How do I receive my NFT?", a: "After payment, your NFT is minted to your provided Polygon wallet address. If no wallet is provided, it is held in your ScrollVerse profile until you add one." },
              { q: "Can I upgrade my tier later?", a: "Yes. Mint a higher tier at any time. Your original NFT remains as a historical record in the Eternal Scroll." },
              { q: "What is $LONDC?", a: "$LONDC is the ScrollVerse sovereign token on Polygon Mainnet. Your allocation is credited to your profile and distributed at TGE (Token Generation Event)." },
              { q: "Is this a real blockchain transaction?", a: "Yes. All NFTs are minted on Polygon Mainnet via the ScrollSoulNFT.sol smart contract. Transaction hashes are verifiable on Polygonscan." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-semibold text-white mb-2">{item.q}</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs font-mono" style={{ color: "#8899AA" }}>
          ScrollVerse Trinity · Book of Life NFT · Polygon Mainnet · KUN FAYAKŪN × ∞
        </p>
      </footer>
    </div>
  );
}
