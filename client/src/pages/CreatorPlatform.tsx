/**
 * BRUDDAH Creator Platform
 * Creator profiles, Creator Coin Factory, Creator NFT Factory, Marketplace
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

function formatCents(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function StatCard({ label, value, color = "#00D4FF" }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
      <div className="text-xl font-black mb-1" style={{ color }}>{value}</div>
      <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{label}</div>
    </div>
  );
}

export default function CreatorPlatform() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"marketplace" | "profile" | "coins" | "nfts">("marketplace");
  const [profileForm, setProfileForm] = useState({ displayName: "", bio: "", walletAddress: "", coinSymbol: "", royaltyPercent: 10 });
  const [coinForm, setCoinForm] = useState({ name: "", symbol: "", totalSupply: 1_000_000, priceUsdCents: 1 });
  const [nftForm, setNftForm] = useState({ collectionName: "", description: "", maxSupply: 1000, priceUsdCents: 1000, royaltyPercent: 10 });
  const [successMsg, setSuccessMsg] = useState("");

  const { data: stats } = trpc.creator.getCreatorStats.useQuery(undefined, { refetchInterval: 30000 });
  const { data: allCreators } = trpc.creator.getAllCreators.useQuery({ page: 1, limit: 12 });
  const { data: allCoins } = trpc.creator.getAllCoins.useQuery({ page: 1, limit: 12 });
  const { data: allNFTs } = trpc.creator.getAllNFTs.useQuery({ page: 1, limit: 12 });
  const { data: myProfile, refetch: refetchProfile } = trpc.creator.getProfile.useQuery(undefined, { enabled: isAuthenticated });
  const { data: myCoins, refetch: refetchCoins } = trpc.creator.getMyCoins.useQuery(undefined, { enabled: isAuthenticated });
  const { data: myNFTs, refetch: refetchNFTs } = trpc.creator.getMyNFTs.useQuery(undefined, { enabled: isAuthenticated });

  const upsertProfile = trpc.creator.upsertProfile.useMutation({
    onSuccess: () => { refetchProfile(); setSuccessMsg("Profile saved!"); setTimeout(() => setSuccessMsg(""), 3000); },
  });

  const launchCoin = trpc.creator.launchCoin.useMutation({
    onSuccess: (data) => { refetchCoins(); setSuccessMsg(`$${data.symbol} launched!`); setTimeout(() => setSuccessMsg(""), 3000); setCoinForm({ name: "", symbol: "", totalSupply: 1_000_000, priceUsdCents: 1 }); },
  });

  const mintNFT = trpc.creator.mintNFTCollection.useMutation({
    onSuccess: () => { refetchNFTs(); setSuccessMsg("NFT Collection created!"); setTimeout(() => setSuccessMsg(""), 3000); setNftForm({ collectionName: "", description: "", maxSupply: 1000, priceUsdCents: 1000, royaltyPercent: 10 }); },
  });

  const tabs = [
    { id: "marketplace" as const, label: "🌐 Marketplace" },
    { id: "profile" as const, label: "👤 My Profile" },
    { id: "coins" as const, label: "🪙 Coin Factory" },
    { id: "nfts" as const, label: "🎨 NFT Factory" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
            </Link>
            <div>
              <div className="font-bold text-white text-sm">BRUDDAH Creator Platform</div>
              <div className="text-xs font-mono" style={{ color: "#FFB800" }}>SOVEREIGN CREATOR ECONOMY</div>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{user?.name}</div>
          ) : (
            <a href={getLoginUrl()} className="px-4 py-2 rounded-lg text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#020810" }}>
              Sign In
            </a>
          )}
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <StatCard label="CREATORS" value={(stats?.totalCreators ?? 0).toLocaleString()} color="#00D4FF" />
          <StatCard label="CREATOR COINS" value={(stats?.totalCoins ?? 0).toLocaleString()} color="#FFB800" />
          <StatCard label="TOTAL MARKET CAP" value={formatCents(stats?.totalMarketCapCents ?? 0)} color="#00FF88" />
          <StatCard label="NFT COLLECTIONS" value={(stats?.totalNFTCollections ?? 0).toLocaleString()} color="#FF6B35" />
          <StatCard label="NFTs MINTED" value={(stats?.totalNFTsMinted ?? 0).toLocaleString()} color="#9B59B6" />
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl text-center font-bold text-sm"
            style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
            ✓ {successMsg}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === tab.id ? "rgba(255,184,0,0.15)" : "rgba(255,255,255,0.03)",
                color: activeTab === tab.id ? "#FFB800" : "#8899AA",
                border: activeTab === tab.id ? "1px solid rgba(255,184,0,0.4)" : "1px solid rgba(255,255,255,0.06)",
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── MARKETPLACE TAB ── */}
        {activeTab === "marketplace" && (
          <div className="space-y-10">
            {/* Creators */}
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>SOVEREIGN CREATORS</div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(allCreators?.creators ?? []).map((c: Record<string, unknown>, i: number) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black mb-3"
                      style={{ background: "linear-gradient(135deg, #00D4FF20, #FFB80020)", border: "1px solid rgba(0,212,255,0.3)" }}>
                      {String(c.displayName ?? "?")[0]?.toUpperCase()}
                    </div>
                    <div className="font-bold text-white text-sm mb-1">{String(c.displayName ?? "")}</div>
                    {c.bio ? <div className="text-xs mb-3 line-clamp-2" style={{ color: "#8899AA" }}>{String(c.bio)}</div> : null}
                    <div className="flex gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>
                        {String(c.coinCount ?? 0)} coins
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800" }}>
                        {String(c.nftCount ?? 0)} NFTs
                      </span>
                    </div>
                  </div>
                ))}
                {(allCreators?.creators ?? []).length === 0 && (
                  <div className="col-span-4 text-center py-12" style={{ color: "#556677" }}>
                    <div className="text-4xl mb-3">🎨</div>
                    <div className="text-sm">Be the first sovereign creator. Set up your profile to launch your coin.</div>
                  </div>
                )}
              </div>
            </div>

            {/* Creator Coins */}
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>CREATOR COINS MARKETPLACE</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(allCoins ?? []).map((coin: Record<string, unknown>, i: number) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: "rgba(255,184,0,0.03)", border: "1px solid rgba(255,184,0,0.15)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-white">{String(coin.name ?? "")}</div>
                        <div className="text-xs font-mono" style={{ color: "#FFB800" }}>${String(coin.symbol ?? "")}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold" style={{ color: "#00FF88" }}>{formatCents(Number(coin.priceUsdCents ?? 0))}</div>
                        <div className="text-xs font-mono" style={{ color: "#556677" }}>per token</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-mono" style={{ color: "#8899AA" }}>
                      <span>Supply: {Number(coin.totalSupply ?? 0).toLocaleString()}</span>
                      <span>MCap: {formatCents(Number(coin.marketCapCents ?? 0))}</span>
                    </div>
                    <div className="mt-2 text-xs font-mono" style={{ color: "#556677" }}>by {String(coin.creatorName ?? "")}</div>
                  </div>
                ))}
                {(allCoins ?? []).length === 0 && (
                  <div className="col-span-3 text-center py-12" style={{ color: "#556677" }}>
                    <div className="text-4xl mb-3">🪙</div>
                    <div className="text-sm">No creator coins yet. Launch yours from the Coin Factory tab.</div>
                  </div>
                )}
              </div>
            </div>

            {/* NFT Collections */}
            <div>
              <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>NFT COLLECTIONS</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(allNFTs ?? []).map((nft: Record<string, unknown>, i: number) => (
                  <div key={i} className="rounded-xl p-5" style={{ background: "rgba(155,89,182,0.04)", border: "1px solid rgba(155,89,182,0.2)" }}>
                    <div className="font-bold text-white mb-1">{String(nft.collectionName ?? "")}</div>
                    {nft.description ? <div className="text-xs mb-3 line-clamp-2" style={{ color: "#8899AA" }}>{String(nft.description)}</div> : null}
                    <div className="flex justify-between text-xs font-mono" style={{ color: "#8899AA" }}>
                      <span>{Number(nft.totalMinted ?? 0)} / {Number(nft.maxSupply ?? 0)} minted</span>
                      <span style={{ color: "#9B59B6" }}>{formatCents(Number(nft.priceUsdCents ?? 0))}</span>
                    </div>
                    <div className="mt-2 text-xs font-mono" style={{ color: "#556677" }}>
                      {Number(nft.royaltyPercent ?? 0)}% royalty · by {String(nft.creatorName ?? "")}
                    </div>
                  </div>
                ))}
                {(allNFTs ?? []).length === 0 && (
                  <div className="col-span-3 text-center py-12" style={{ color: "#556677" }}>
                    <div className="text-4xl mb-3">🖼️</div>
                    <div className="text-sm">No NFT collections yet. Create yours from the NFT Factory tab.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div className="max-w-xl">
            {!isAuthenticated ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔐</div>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Sign in to create your creator profile</p>
         <a href={getLoginUrl()} className="px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#020810" }}>Sign In</a>
              </div>
            ) : (
              <div className="max-w-xl rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xs font-mono mb-6" style={{ color: "#8899AA" }}>
                  {myProfile ? "UPDATE YOUR CREATOR PROFILE" : "CREATE YOUR CREATOR PROFILE"}
                </div>
                <div className="space-y-4">
                  {[
                    { key: "displayName", label: "Creator Name *", placeholder: "e.g. Chais The Great" },
                    { key: "bio", label: "Bio", placeholder: "Your sovereign story..." },
                    { key: "walletAddress", label: "Polygon Wallet Address", placeholder: "0x..." },
                    { key: "coinSymbol", label: "Coin Symbol (for your future coin)", placeholder: "e.g. CHAIS" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{field.label}</label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={(profileForm as Record<string, string | number>)[field.key] as string ?? (myProfile as Record<string, unknown> | null)?.[field.key] as string ?? ""}
                        onChange={e => setProfileForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>Default Royalty % (0-30)</label>
                    <input
                      type="number" min={0} max={30}
                      value={profileForm.royaltyPercent}
                      onChange={e => setProfileForm(prev => ({ ...prev, royaltyPercent: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => upsertProfile.mutate({ ...profileForm, displayName: profileForm.displayName || String((myProfile as Record<string, unknown> | null)?.displayName ?? user?.name ?? "Creator") })}
                  disabled={upsertProfile.isPending}
                  className="mt-6 w-full py-3 rounded-xl font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#020810", opacity: upsertProfile.isPending ? 0.7 : 1 }}>
                  {upsertProfile.isPending ? "Saving..." : myProfile ? "Update Profile" : "Create Profile"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── COIN FACTORY TAB ── */}
        {activeTab === "coins" && (
          <div className="space-y-6">
            {!isAuthenticated ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔐</div>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Sign in to launch your creator coin</p>
                <a href={getLoginUrl()} className="px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#020810" }}>Sign In</a>
              </div>
            ) : (
              <>
                {/* Launch Form */}
                <div className="max-w-xl rounded-2xl p-6" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.2)" }}>
                  <div className="text-xs font-mono mb-6" style={{ color: "#FFB800" }}>🪙 LAUNCH YOUR CREATOR COIN</div>
                  {!myProfile && (
                    <div className="mb-4 p-3 rounded-xl text-xs font-mono" style={{ background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)", color: "#FF4444" }}>
                      ⚠️ Create your creator profile first (Profile tab)
                    </div>
                  )}
                  <div className="space-y-4">
                    {[
                      { key: "name", label: "Coin Name *", placeholder: "e.g. Chais Sovereign Coin" },
                      { key: "symbol", label: "Ticker Symbol *", placeholder: "e.g. CHAIS" },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{field.label}</label>
                        <input type="text" placeholder={field.placeholder}
                          value={(coinForm as Record<string, string | number>)[field.key] as string ?? ""}
                          onChange={e => setCoinForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>Total Supply</label>
                        <input type="number" value={coinForm.totalSupply}
                          onChange={e => setCoinForm(prev => ({ ...prev, totalSupply: Number(e.target.value) }))}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>Price (cents)</label>
                        <input type="number" value={coinForm.priceUsdCents}
                          onChange={e => setCoinForm(prev => ({ ...prev, priceUsdCents: Number(e.target.value) }))}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl text-xs font-mono" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)", color: "#8899AA" }}>
                      Market Cap: {formatCents(coinForm.totalSupply * coinForm.priceUsdCents)} · {coinForm.totalSupply.toLocaleString()} tokens at {formatCents(coinForm.priceUsdCents)}/token
                    </div>
                  </div>
                  <button
                    onClick={() => launchCoin.mutate(coinForm)}
                    disabled={launchCoin.isPending || !myProfile || !coinForm.name || !coinForm.symbol}
                    className="mt-6 w-full py-3 rounded-xl font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#020810", opacity: (launchCoin.isPending || !myProfile || !coinForm.name || !coinForm.symbol) ? 0.5 : 1 }}>
                    {launchCoin.isPending ? "Launching..." : "🚀 Launch Coin on Polygon"}
                  </button>
                </div>

                {/* My Coins */}
                {(myCoins ?? []).length > 0 && (
                  <div>
                    <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>YOUR COINS</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(myCoins ?? []).map((coin: Record<string, unknown>, i: number) => (
                        <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-white">{String(coin.name ?? "")}</div>
                              <div className="text-xs font-mono" style={{ color: "#FFB800" }}>${String(coin.symbol ?? "")}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold" style={{ color: "#00FF88" }}>{formatCents(Number(coin.marketCapCents ?? 0))}</div>
                              <div className="text-xs font-mono" style={{ color: "#556677" }}>market cap</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── NFT FACTORY TAB ── */}
        {activeTab === "nfts" && (
          <div className="space-y-6">
            {!isAuthenticated ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔐</div>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Sign in to create your NFT collection</p>
                <a href={getLoginUrl()} className="px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#020810" }}>Sign In</a>
              </div>
            ) : (
              <>
                {/* Mint Form */}
                <div className="max-w-xl rounded-2xl p-6" style={{ background: "rgba(155,89,182,0.04)", border: "1px solid rgba(155,89,182,0.2)" }}>
                  <div className="text-xs font-mono mb-6" style={{ color: "#9B59B6" }}>🎨 CREATE NFT COLLECTION</div>
                  {!myProfile && (
                    <div className="mb-4 p-3 rounded-xl text-xs font-mono" style={{ background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)", color: "#FF4444" }}>
                      ⚠️ Create your creator profile first (Profile tab)
                    </div>
                  )}
                  <div className="space-y-4">
                    {[
                      { key: "collectionName", label: "Collection Name *", placeholder: "e.g. Sovereign Scrolls" },
                      { key: "description", label: "Description", placeholder: "The story of your collection..." },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{field.label}</label>
                        <input type="text" placeholder={field.placeholder}
                          value={(nftForm as Record<string, string | number>)[field.key] as string ?? ""}
                          onChange={e => setNftForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { key: "maxSupply", label: "Max Supply" },
                        { key: "priceUsdCents", label: "Price (cents)" },
                        { key: "royaltyPercent", label: "Royalty %" },
                      ].map(field => (
                        <div key={field.key}>
                          <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{field.label}</label>
                          <input type="number"
                            value={(nftForm as Record<string, string | number>)[field.key] as number ?? 0}
                            onChange={e => setNftForm(prev => ({ ...prev, [field.key]: Number(e.target.value) }))}
                            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => mintNFT.mutate(nftForm)}
                    disabled={mintNFT.isPending || !myProfile || !nftForm.collectionName}
                    className="mt-6 w-full py-3 rounded-xl font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #9B59B6, #FF6B35)", color: "white", opacity: (mintNFT.isPending || !myProfile || !nftForm.collectionName) ? 0.5 : 1 }}>
                    {mintNFT.isPending ? "Creating..." : "🎨 Create NFT Collection on Polygon"}
                  </button>
                </div>

                {/* My NFTs */}
                {(myNFTs ?? []).length > 0 && (
                  <div>
                    <div className="text-xs font-mono mb-3" style={{ color: "#8899AA" }}>YOUR COLLECTIONS</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(myNFTs ?? []).map((nft: Record<string, unknown>, i: number) => (
                        <div key={i} className="rounded-xl p-4" style={{ background: "rgba(155,89,182,0.04)", border: "1px solid rgba(155,89,182,0.2)" }}>
                          <div className="font-bold text-white mb-1">{String(nft.collectionName ?? "")}</div>
                          <div className="flex justify-between text-xs font-mono" style={{ color: "#8899AA" }}>
                            <span>{Number(nft.totalMinted ?? 0)} / {Number(nft.maxSupply ?? 0)} minted</span>
                            <span style={{ color: "#9B59B6" }}>{formatCents(Number(nft.priceUsdCents ?? 0))}</span>
                          </div>
                          <div className="mt-1 text-xs font-mono" style={{ color: "#556677" }}>{Number(nft.royaltyPercent ?? 0)}% royalty on secondary sales</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
