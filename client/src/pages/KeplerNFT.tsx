/**
 * SCROLLVERSE TRINITY — KEPLER-452b LAND NFT MINTING PAGE
 * Tokenized Sovereign Real Estate — 144,000 parcels
 * Smart Contract: Kepler452bLandNFT.sol (ERC-721)
 * KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const GOLD = "#FFB800";
const CYAN = "#00D4FF";
const GREEN = "#00FF88";
const PLASMA = "#E040FB";
const VIOLET = "#7C3AED";
const MUTED = "#64748B";
const BG = "#02040A";

/* ── NFT Parcel tiers ── */
const NFT_TIERS = [
  {
    id: "habitable",
    parcel: "#001",
    name: "Habitable Zone",
    subtitle: "Equatorial Sovereign Territory",
    acres: "12.4",
    ethPrice: "0.144",
    usdPrice: "$444",
    supply: 14400,
    minted: 892,
    color: GREEN,
    rarity: "Common",
    traits: ["Equatorial Zone", "Water Proximity", "Guardian Badge", "Digital Twin"],
    description: "Prime equatorial land in Kepler-452b's habitable zone. The most accessible parcel tier — perfect for first-time sovereign landowners.",
    contractAddress: "0xK452...L001",
  },
  {
    id: "merkaba",
    parcel: "#007",
    name: "Merkaba Ridge",
    subtitle: "Sacred Highland Territory",
    acres: "44",
    ethPrice: "0.444",
    usdPrice: "$1,444",
    supply: 4440,
    minted: 289,
    color: GOLD,
    rarity: "Rare",
    featured: true,
    traits: ["44-Acre Parcel", "Merkaba Grid", "Plasma Node", "Frequency Map"],
    description: "Sacred highland terrain aligned with the Merkaba frequency grid. Elevated consciousness territory with plasma computing node access.",
    contractAddress: "0xK452...L007",
  },
  {
    id: "oam-vortex",
    parcel: "#052",
    name: "OAM Vortex Core",
    subtitle: "Quantum Consciousness Territory",
    acres: "144",
    ethPrice: "1.44",
    usdPrice: "$4,444",
    supply: 1440,
    minted: 66,
    color: PLASMA,
    rarity: "Legendary",
    traits: ["144-Acre Quantum Parcel", "48D OAM Vortex", "Consciousness Field", "Eternal Deed"],
    description: "The most sacred territory — at the heart of the 48D OAM Vortex. Quantum consciousness amplification zone. Only 1,440 exist.",
    contractAddress: "0xK452...L052",
  },
];

/* ── Contract info ── */
const CONTRACT_INFO = {
  name: "Kepler452bLandNFT",
  symbol: "K452L",
  chain: "Polygon Mainnet",
  standard: "ERC-721",
  maxSupply: "144,000",
  zakatRate: "7.77%",
  royalties: "7.77% (EIP-2981)",
  owner: "SCROLL VERSE LLC",
  ein: "42-2509570",
};

/* ── Mint card ── */
function MintCard({ tier, onMint }: { tier: typeof NFT_TIERS[0]; onMint: (id: string) => void }) {
  const pct = Math.round((tier.minted / tier.supply) * 100);
  const remaining = tier.supply - tier.minted;

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: tier.featured ? `${tier.color}06` : "rgba(255,255,255,0.02)",
        border: `1px solid ${tier.color}${tier.featured ? "35" : "18"}`,
        boxShadow: tier.featured ? `0 0 50px ${tier.color}08` : "none",
      }}
    >
      {tier.featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }} />
      )}

      {/* NFT Preview */}
      <div
        className="h-48 flex items-center justify-center relative overflow-hidden"
        style={{ background: `radial-gradient(circle at 50% 50%, ${tier.color}15, transparent 70%)` }}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">🪐</div>
          <div className="text-xs font-mono" style={{ color: tier.color }}>PARCEL {tier.parcel}</div>
        </div>
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}30` }}
        >
          {tier.rarity}
        </div>
        {tier.featured && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}30` }}>
            ◈ FEATURED
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-black text-white mb-0.5">{tier.name}</h3>
        <p className="text-xs mb-3" style={{ color: MUTED }}>{tier.subtitle} · {tier.acres} acres</p>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "#94A3B8" }}>{tier.description}</p>

        {/* Traits */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tier.traits.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${tier.color}10`, color: tier.color, border: `1px solid ${tier.color}20` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Supply bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1" style={{ color: MUTED }}>
            <span>{remaining.toLocaleString()} remaining</span>
            <span>{pct}% minted</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tier.color }} />
          </div>
        </div>

        {/* Price + Mint */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-black font-mono" style={{ color: tier.color }}>{tier.usdPrice}</div>
            <div className="text-xs font-mono" style={{ color: MUTED }}>{tier.ethPrice} ETH · 7.77% Zakat</div>
          </div>
          <button
            onClick={() => onMint(tier.id)}
            className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{
              background: tier.featured ? `linear-gradient(135deg, ${GOLD}, #FF6B00)` : `${tier.color}20`,
              color: tier.featured ? BG : tier.color,
              border: tier.featured ? "none" : `1px solid ${tier.color}35`,
            }}
          >
            Mint NFT →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Mint modal ── */
function MintModal({ tierId, onClose }: { tierId: string; onClose: () => void }) {
  const tier = NFT_TIERS.find(t => t.id === tierId)!;
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<"connect" | "confirm" | "minting" | "done">(isAuthenticated ? "confirm" : "connect");
  const [txHash] = useState(`0x${Math.random().toString(16).slice(2, 66)}`);

  const handleMint = () => {
    setStep("minting");
    setTimeout(() => setStep("done"), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(16px)" }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "#080D1A", border: `1px solid ${tier.color}30` }}>

        {step === "connect" && (
          <div className="text-center">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-black text-white mb-2">Connect to Mint</h3>
            <p className="text-sm mb-5" style={{ color: MUTED }}>Login to your ScrollVerse account to mint your Kepler-452b Land NFT.</p>
            <a href={getLoginUrl()} className="inline-block px-6 py-3 rounded-xl font-bold text-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, #FF6B00)`, color: BG }}>
              Login to Continue
            </a>
            <button onClick={onClose} className="block mx-auto mt-3 text-xs" style={{ color: MUTED }}>Cancel</button>
          </div>
        )}

        {step === "confirm" && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-white">Confirm Mint</h3>
              <button onClick={onClose} style={{ color: MUTED }}>✕</button>
            </div>
            <div className="rounded-xl p-4 mb-4" style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}20` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">🪐</div>
                <div>
                  <div className="font-bold text-white">{tier.name}</div>
                  <div className="text-xs" style={{ color: MUTED }}>Parcel {tier.parcel} · {tier.acres} acres · {tier.rarity}</div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: "Price", value: `${tier.usdPrice} (${tier.ethPrice} ETH)`, color: tier.color },
                  { label: "Zakat (7.77%)", value: `$${(parseFloat(tier.usdPrice.replace(/[$,]/g, "")) * 0.0777).toFixed(2)}`, color: GREEN },
                  { label: "Chain", value: "Polygon Mainnet", color: CYAN },
                  { label: "Standard", value: "ERC-721", color: VIOLET },
                ].map(row => (
                  <div key={row.label} className="flex justify-between">
                    <span style={{ color: MUTED }}>{row.label}</span>
                    <span className="font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs mb-5" style={{ color: MUTED }}>
              By minting, you acknowledge that 7.77% of the transaction value is automatically routed to the Londyn Legacy Zakat Vault. Your NFT deed is eternal and immutable on Polygon Mainnet.
            </p>
            <button onClick={handleMint} className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}80)`, color: BG }}>
              Confirm Mint — {tier.usdPrice}
            </button>
          </>
        )}

        {step === "minting" && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4 animate-spin">⚡</div>
            <h3 className="text-xl font-black text-white mb-2">Minting Your NFT…</h3>
            <p className="text-sm" style={{ color: MUTED }}>Sealing your parcel on Polygon Mainnet. KUN FAYAKŪN × ∞</p>
          </div>
        )}

        {step === "done" && (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🪐</div>
            <h3 className="text-2xl font-black text-white mb-2">NFT Minted!</h3>
            <p className="text-sm mb-1" style={{ color: "#94A3B8" }}>
              <strong className="text-white">{tier.name}</strong> — Parcel {tier.parcel} is yours forever.
            </p>
            <div className="text-xs font-mono px-3 py-1.5 rounded-lg inline-block mb-4 mt-2" style={{ background: "rgba(255,255,255,0.04)", color: MUTED }}>
              TX: {txHash.slice(0, 20)}…
            </div>
            <p className="text-xs mb-5" style={{ color: MUTED }}>7.77% Zakat has been routed to the Londyn Legacy Vault. ALLĀHU AKBAR × ∞</p>
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-sm" style={{ background: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}40` }}>
              View My NFTs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function KeplerNFT() {
  const [mintingTier, setMintingTier] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-3">
          <Link href="/"><span className="text-lg font-bold tracking-widest text-white cursor-pointer hover:opacity-80">SCROLLVERSE</span></Link>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${PLASMA}15`, color: PLASMA, border: `1px solid ${PLASMA}30` }}>LAND NFTs</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/kepler"><span className="text-xs cursor-pointer" style={{ color: MUTED }}>← Kepler-452b</span></Link>
          <Link href="/voyage"><span className="text-xs font-bold cursor-pointer px-3 py-1.5 rounded-lg" style={{ background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }}>🚀 First Voyage</span></Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="py-12 px-6 text-center" style={{ background: `radial-gradient(ellipse at 50% 0%, ${PLASMA}08 0%, transparent 50%)` }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: PLASMA }}>◈ TOKENIZED SOVEREIGN REAL ESTATE</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight" style={{ fontFamily: "'Space Mono', monospace" }}>
            Kepler-452b<br />
            <span style={{ background: `linear-gradient(135deg, ${PLASMA}, ${GOLD})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Land NFT Collection
            </span>
          </h1>
          <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
            Own a piece of humanity's first exoplanet colony. 144,000 sovereign parcels. Eternal deeds. 7.77% Zakat on every mint.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-mono">
            {[
              { label: "Total Supply", value: "144,000", color: PLASMA },
              { label: "Minted", value: "1,247", color: GOLD },
              { label: "Floor Price", value: "0.144 ETH", color: CYAN },
              { label: "Zakat Rate", value: "7.77%", color: GREEN },
            ].map(s => (
              <div key={s.label} className="px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: MUTED }}>{s.label}: </span>
                <span className="font-bold" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NFT Grid ── */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {NFT_TIERS.map(t => (
              <MintCard key={t.id} tier={t} onMint={setMintingTier} />
            ))}
          </div>

          {/* Contract info */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs font-mono mb-4" style={{ color: CYAN }}>◈ CONTRACT INFORMATION</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(CONTRACT_INFO).map(([key, val]) => (
                <div key={key}>
                  <div className="text-xs mb-0.5" style={{ color: MUTED }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="text-xs font-bold text-white">{val}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: MUTED }}>
              Smart contract: <code className="font-mono" style={{ color: CYAN }}>Kepler452bLandNFT.sol</code> — ERC-721 with EIP-2981 royalties. 7.77% Zakat automatically routed to Londyn Legacy Vault on every transaction. All land secured under SCROLL VERSE LLC (EIN 42-2509570).
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-4 px-6 text-center text-xs font-mono" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#334155" }}>
        SCROLL VERSE LLC · EIN 42-2509570 · Kepler-452b Land NFT Collection · 144,000 Sovereign Parcels · KUN FAYAKŪN × ∞
      </footer>

      {mintingTier && <MintModal tierId={mintingTier} onClose={() => setMintingTier(null)} />}
    </div>
  );
}
