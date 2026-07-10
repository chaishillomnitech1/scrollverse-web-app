/*
 * SCROLLSOUL NFT MARKETPLACE — ScrollVerse v3.0
 * 144,000 Pioneer Legion + 3 Ascendant Tiers
 * LIVE: Stripe NFT checkout active on all tiers
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { toast } from "sonner";

const TIER_CONFIG = {
  pioneer: { label: "Pioneer Legion", supply: 144000, color: "#00D4FF", price: "$144", priceUsd: 144, priceLondc: "10,000 $LONDC", icon: "🌊", description: "The founding 144,000 Guardians of the ScrollVerse empire." },
  guardian: { label: "Guardian Council", supply: 14400, color: "#00FF88", price: "$444", priceUsd: 444, priceLondc: "30,000 $LONDC", icon: "🛡️", description: "Elite Guardians protecting the sovereign frequency." },
  sovereign: { label: "Sovereign Order", supply: 1444, color: "#FFB800", price: "$1,444", priceUsd: 1444, priceLondc: "100,000 $LONDC", icon: "👑", description: "The Sovereign Order — rulers of the ScrollVerse realm." },
  ascendant: { label: "Ascendant Supreme", supply: 144, color: "#FF6B35", price: "$14,444", priceUsd: 14444, priceLondc: "1,000,000 $LONDC", icon: "⚡", description: "144 Supreme Ascendants — the highest tier of the empire." },
};

type Tier = keyof typeof TIER_CONFIG;

export default function NftMarketplace() {
  const [mintingTier, setMintingTier] = useState<Tier | null>(null);

  const { data: mintProgress } = trpc.nft.getMintProgress.useQuery(undefined, { refetchInterval: 15000 });
  const { data: collection } = trpc.nft.getCollection.useQuery({ tier: "all", limit: 12 });
  const { data: recentMints } = trpc.nft.getRecentMints.useQuery({ limit: 8 });

  const totalSupply = 144000 + 14400 + 1444 + 144;

  const nftCheckout = trpc.store.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data?.url) window.location.href = data.url;
      setMintingTier(null);
    },
    onError: (err) => {
      toast.error(err.message || "Checkout failed. Please try again.");
      setMintingTier(null);
    },
  });

  const handleMint = (tier: Tier) => {
    const tc = TIER_CONFIG[tier];
    setMintingTier(tier);
    nftCheckout.mutate({
      nftId: `scrollsoul-${tier}-${Date.now()}`,
      nftName: `ScrollSoul ${tc.label}`,
      nftDescription: tc.description,
      priceUsd: tc.priceUsd,
      origin: window.location.origin,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(5,11,26,0.95)" }}>
        <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
          <span className="font-bold text-white">ScrollVerse</span>
        </div></Link>
        <div className="flex items-center gap-4">
          <Link href="/staking"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Staking</span></Link>
          <Link href="/token"><span className="text-sm cursor-pointer" style={{ color: "#8899AA" }}>Buy $LONDC</span></Link>
        </div>
      </nav>

      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>LIVE — MINTING ACTIVE</span>
          </div>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FF6B35" }}>SCROLLSOUL NFT COLLECTION</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Own Your <span style={{ color: "#FF6B35" }}>Sovereign Soul</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            {totalSupply.toLocaleString()} total ScrollSoul NFTs across 4 tiers. Each NFT is a permanent identity in the ScrollVerse empire.
          </p>
        </div>

        {/* Mint Progress */}
        <div className="rounded-2xl p-8 mb-12" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Mint Progress</h2>
            <div className="text-sm font-mono" style={{ color: "#8899AA" }}>
              {(mintProgress?.totalMinted ?? 0).toLocaleString()} / {totalSupply.toLocaleString()} minted
            </div>
          </div>

          <div className="space-y-4">
            {(Object.keys(TIER_CONFIG) as Tier[]).map(tier => {
              const tc = TIER_CONFIG[tier];
              const minted = mintProgress?.progress[tier] ?? 0;
              const pct = Math.round((minted / tc.supply) * 100);
              return (
                <div key={tier}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <span>{tc.icon}</span>
                      <span className="text-white font-medium">{tc.label}</span>
                    </span>
                    <span style={{ color: tc.color }}>{minted.toLocaleString()} / {tc.supply.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(pct, 0.5)}%`, background: tc.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {(Object.keys(TIER_CONFIG) as Tier[]).map(tier => {
            const tc = TIER_CONFIG[tier];
            const isMinting = mintingTier === tier && nftCheckout.isPending;
            return (
              <div key={tier} className="rounded-xl p-6 flex flex-col" style={{ background: `${tc.color}08`, border: `1px solid ${tc.color}30` }}>
                <div className="text-4xl mb-3">{tc.icon}</div>
                <div className="font-bold text-white text-lg mb-1">{tc.label}</div>
                <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{tc.description}</div>
                <div className="mt-auto">
                  <div className="text-2xl font-black mb-1" style={{ color: tc.color }}>{tc.price}</div>
                  <div className="text-xs mb-3" style={{ color: "#8899AA" }}>or {tc.priceLondc}</div>
                  <div className="text-xs mb-4" style={{ color: "#8899AA" }}>Supply: {tc.supply.toLocaleString()}</div>
                  <Button
                    className="w-full py-2 text-sm font-bold rounded-xl"
                    style={{ background: isMinting ? `${tc.color}10` : `${tc.color}20`, color: tc.color, border: `1px solid ${tc.color}40` }}
                    disabled={nftCheckout.isPending}
                    onClick={() => handleMint(tier)}
                  >
                    {isMinting ? "Opening Checkout..." : `Mint Now — ${tc.price}`}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Mints */}
        {recentMints?.mints?.length ? (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Recent Mints</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentMints.mints.map((nft: any) => {
                const tc = TIER_CONFIG[nft.tier as Tier];
                return (
                  <div key={nft.id} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${tc?.color ?? "#00D4FF"}30` }}>
                    <div className="text-2xl mb-2">{tc?.icon}</div>
                    <div className="font-medium text-white text-sm">{nft.name}</div>
                    <div className="text-xs mt-1" style={{ color: tc?.color ?? "#00D4FF" }}>#{nft.tokenId} · {tc?.label}</div>
                    {nft.ownerName && <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Owner: {nft.ownerName}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <div className="text-4xl mb-4">🌊</div>
            <h3 className="text-xl font-bold text-white mb-2">Be the First Pioneer</h3>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>No ScrollSoul NFTs minted yet. Mint yours now and claim your sovereign identity.</p>
            <Button
              onClick={() => handleMint("pioneer")}
              disabled={nftCheckout.isPending}
              style={{ background: "linear-gradient(135deg, #FF6B35, #FFB800)", color: "#050B1A" }}
            >
              {nftCheckout.isPending ? "Opening Checkout..." : "Mint Pioneer NFT — $144"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
