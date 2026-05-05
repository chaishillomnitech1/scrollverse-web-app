/**
 * CATALYST NFT MINTING PAGE
 * ANI's idea immortalized as Universal Relics on Polygon
 * 144,000 Pioneer Legion supply — each NFT is a frequency key to the ScrollVerse
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const TIER_DATA = {
  pioneer: { name: "Pioneer", color: "#00D4FF", frequency: "528Hz", description: "The foundation of the 144,000. First to answer the call.", icon: "🛡️" },
  guardian: { name: "Guardian", color: "#00FF88", frequency: "963Hz", description: "Activated sovereign. Frequency match confirmed.", icon: "⚡" },
  sovereign: { name: "Sovereign", color: "#FFB800", frequency: "1558Hz", description: "Elevated consciousness. Multi-chain resonance.", icon: "👑" },
  supreme: { name: "Supreme", color: "#FF6B35", frequency: "44:Omni", description: "Divine manifestation tier. Scroll of 44:Omni embodied.", icon: "♾️" },
};

export default function CatalystNft() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mintedNft, setMintedNft] = useState<{
    tokenId: string; resonanceScore: number; frequencyKey: string; tier: string; ipfsHash: string; message: string;
  } | null>(null);

  const { data: preview, refetch: refetchPreview } = trpc.catalyst.getResonanceScore.useQuery(
    { name, email },
    { enabled: name.length > 1 && email.includes("@") }
  );
  const { data: stats } = trpc.catalyst.getCollectionStats.useQuery();
  const { data: recentMints } = trpc.catalyst.getRecentMints.useQuery();

  const mintMutation = trpc.catalyst.mintNFT.useMutation({
    onSuccess: (data) => setMintedNft(data as typeof mintedNft),
  });

  const tierInfo = preview?.tier ? TIER_DATA[preview.tier as keyof typeof TIER_DATA] : null;
  const pioneersLeft = stats?.pioneersLeft ?? 144000;
  const totalMinted = stats?.totalMinted ?? 0;
  const progressPercent = Math.round((totalMinted / 144000) * 100);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(255,107,53,0.2)", background: "rgba(255,107,53,0.03)" }}>
        <div className="container py-8">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FF6B35" }}>CATALYST NFT · PIONEER LEGION · 144,000 SUPPLY</div>
          <h1 className="text-4xl font-black text-white mb-2">Mint Your Catalyst NFT</h1>
          <p className="text-lg" style={{ color: "#8899AA" }}>
            ANI's idea immortalized. Every NFT is a frequency key to the ScrollVerse.
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Supply Progress */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(255,107,53,0.05)", border: "1px solid rgba(255,107,53,0.2)" }}>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-4">
            <div>
              <div className="text-2xl font-black text-white">{totalMinted.toLocaleString()} <span className="text-base" style={{ color: "#8899AA" }}>minted</span></div>
              <div className="text-sm" style={{ color: "#FF6B35" }}>{pioneersLeft.toLocaleString()} Pioneer spots remaining</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black" style={{ color: "#FF6B35" }}>{progressPercent}%</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>of 144,000 claimed</div>
            </div>
          </div>
          <div className="w-full h-3 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-3 rounded-full" style={{ width: `${Math.max(progressPercent, 1)}%`, background: "linear-gradient(90deg, #FF6B35, #FFB800)" }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mint Form */}
          <div>
            {mintedNft ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(0,255,136,0.05)", border: "2px solid rgba(0,255,136,0.3)" }}>
                <div className="text-5xl mb-4">🎉</div>
                <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>CATALYST NFT MINTED</div>
                <h2 className="text-2xl font-black text-white mb-4">Welcome to the Pioneer Legion</h2>
                <div className="space-y-3 text-left mb-6">
                  <div className="flex justify-between">
                    <span style={{ color: "#8899AA" }}>Token ID</span>
                    <span className="text-white font-mono text-xs">{mintedNft.tokenId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#8899AA" }}>Resonance Score</span>
                    <span className="font-bold" style={{ color: "#00FF88" }}>{mintedNft.resonanceScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#8899AA" }}>Frequency Key</span>
                    <span className="font-bold" style={{ color: "#00D4FF" }}>{mintedNft.frequencyKey}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#8899AA" }}>Tier</span>
                    <span className="font-bold capitalize" style={{ color: TIER_DATA[mintedNft.tier as keyof typeof TIER_DATA]?.color ?? "#FFB800" }}>
                      {TIER_DATA[mintedNft.tier as keyof typeof TIER_DATA]?.icon} {mintedNft.tier}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#8899AA" }}>IPFS Hash</span>
                    <span className="text-white font-mono text-xs">{mintedNft.ipfsHash.slice(0, 20)}...</span>
                  </div>
                </div>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>{mintedNft.message}</p>
                <button
                  onClick={() => { setMintedNft(null); setName(""); setEmail(""); }}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #00FF88)" }}
                >
                  Mint Another NFT
                </button>
              </div>
            ) : (
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,107,53,0.2)" }}>
                <h2 className="text-xl font-bold text-white mb-6">Claim Your Frequency Key</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono tracking-widest mb-2 block" style={{ color: "#8899AA" }}>GUARDIAN NAME</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your sovereign name"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,53,0.2)", color: "white" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono tracking-widest mb-2 block" style={{ color: "#8899AA" }}>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,53,0.2)", color: "white" }}
                    />
                  </div>

                  {/* Resonance Preview */}
                  {preview && tierInfo && (
                    <div className="rounded-xl p-4" style={{ background: `${tierInfo.color}08`, border: `1px solid ${tierInfo.color}30` }}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-xs font-mono" style={{ color: tierInfo.color }}>RESONANCE DETECTED</div>
                          <div className="text-2xl font-black text-white">{preview.score}<span className="text-sm">/100</span></div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl">{tierInfo.icon}</div>
                          <div className="text-sm font-bold" style={{ color: tierInfo.color }}>{tierInfo.name} Tier</div>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="h-2 rounded-full" style={{ width: `${preview.score}%`, background: tierInfo.color }} />
                      </div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{tierInfo.description}</div>
                      <div className="text-xs font-mono mt-1" style={{ color: tierInfo.color }}>Frequency Key: {preview.frequencyKey}</div>
                    </div>
                  )}

                  <button
                    onClick={() => mintMutation.mutate({ guardianName: name, guardianEmail: email })}
                    disabled={!name || !email.includes("@") || mintMutation.isPending}
                    className="w-full py-4 rounded-xl text-sm font-black text-white transition-all"
                    style={{
                      background: name && email.includes("@") ? "linear-gradient(135deg, #FF6B35, #FFB800)" : "rgba(255,255,255,0.1)",
                      opacity: mintMutation.isPending ? 0.7 : 1,
                    }}
                  >
                    {mintMutation.isPending ? "Minting on Polygon..." : "🔥 Mint Catalyst NFT — FREE"}
                  </button>
                  <p className="text-xs text-center" style={{ color: "#8899AA" }}>
                    Pioneer minting is free. Polygon gas fees apply at Mainnet launch.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tier Guide + Recent Mints */}
          <div className="space-y-6">
            {/* Tier Guide */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <h3 className="text-lg font-bold text-white mb-4">NFT Tier Guide</h3>
              <div className="space-y-3">
                {Object.entries(TIER_DATA).map(([key, tier]) => (
                  <div key={key} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}20` }}>
                    <div className="text-xl">{tier.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{tier.name}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${tier.color}20`, color: tier.color }}>{tier.frequency}</span>
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>{tier.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collection Stats */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <h3 className="text-lg font-bold text-white mb-4">Collection Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Supreme", value: stats?.supremeCount ?? 0, color: "#FF6B35" },
                  { label: "Sovereign", value: stats?.sovereignCount ?? 0, color: "#FFB800" },
                  { label: "Guardian", value: stats?.guardianCount ?? 0, color: "#00FF88" },
                  { label: "Pioneer", value: stats?.pioneerCount ?? 0, color: "#00D4FF" },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                    <div className="text-xl font-black" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Mints */}
            {recentMints && recentMints.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <h3 className="text-lg font-bold text-white mb-4">Recent Mints</h3>
                <div className="space-y-2">
                  {recentMints.slice(0, 5).map((nft: any) => (
                    <div key={nft.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                      <div>
                        <div className="text-sm text-white">{nft.guardianName ?? "Anonymous Guardian"}</div>
                        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{nft.frequencyKey}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold capitalize" style={{ color: TIER_DATA[nft.tier as keyof typeof TIER_DATA]?.color ?? "#00D4FF" }}>
                          {TIER_DATA[nft.tier as keyof typeof TIER_DATA]?.icon} {nft.tier}
                        </div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>Score: {nft.resonanceScore}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
