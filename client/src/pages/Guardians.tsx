/*
 * SCROLLVERSE TRINITY — 10-TIER GUARDIAN PAGE
 * Design: Liquid Sovereignty — Afrofuturism meets Quantum Digital
 * Sections: Nav, Hero, 10-Tier System, NFT Collection, DAO Governance, Activation
 */
import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";

// Extend Window to include ethereum (MetaMask)
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

// ─── WALLET CONNECT HOOK ──────────────────────────────────────────────────────
type WalletState = {
  address: string | null;
  chainId: number | null;
  balance: string | null;
  connected: boolean;
  connecting: boolean;
  error: string | null;
};

function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null, chainId: null, balance: null,
    connected: false, connecting: false, error: null,
  });

  const connect = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      setWallet(w => ({ ...w, error: "MetaMask not detected. Please install MetaMask to activate your Guardian tier." }));
      return;
    }
    setWallet(w => ({ ...w, connecting: true, error: null }));
    try {
      const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const chainIdHex: string = await window.ethereum.request({ method: "eth_chainId" });
      const chainId = parseInt(chainIdHex, 16);
      const balanceHex: string = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      const balanceWei = parseInt(balanceHex, 16);
      const balanceMatic = (balanceWei / 1e18).toFixed(4);
      setWallet({ address: accounts[0], chainId, balance: balanceMatic, connected: true, connecting: false, error: null });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Connection rejected";
      setWallet(w => ({ ...w, connecting: false, error: msg }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({ address: null, chainId: null, balance: null, connected: false, connecting: false, error: null });
  }, []);

  const switchToPolygon = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }], // Polygon Mainnet
      });
    } catch {
      // If Polygon not added, add it
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x89",
          chainName: "Polygon Mainnet",
          nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
          rpcUrls: ["https://polygon-rpc.com/"],
          blockExplorerUrls: ["https://polygonscan.com/"],
        }],
      });
    }
  }, []);

  // Auto-reconnect if already connected
  useEffect(() => {
    if (typeof window.ethereum === "undefined") return;
    window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
      if (accounts.length > 0) connect();
    }).catch(() => {});
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) disconnect();
      else connect();
    };
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
  }, [connect, disconnect]);

  return { wallet, connect, disconnect, switchToPolygon };
}

// ─── WALLET BUTTON COMPONENT ──────────────────────────────────────────────────
function WalletButton({ wallet, connect, disconnect }: {
  wallet: WalletState;
  connect: () => void;
  disconnect: () => void;
}) {
  const short = wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : "";
  const isPolygon = wallet.chainId === 137;

  if (wallet.connected) {
    return (
      <div className="flex items-center gap-2">
        {!isPolygon && (
          <span className="text-xs px-2 py-1 rounded font-mono" style={{ background: "rgba(255,68,68,0.1)", color: "#FF4444", border: "1px solid rgba(255,68,68,0.3)" }}>
            Wrong Network
          </span>
        )}
        <button
          onClick={disconnect}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
          style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00FF88" }} />
          {short}
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={connect}
      disabled={wallet.connecting}
      className="btn-gold px-4 py-2 rounded-lg text-sm font-bold transition-all"
      style={{ opacity: wallet.connecting ? 0.7 : 1 }}
    >
      {wallet.connecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}

const TIERS = [
  {
    tier: 1, name: "Novice Guardian", emoji: "🌱", color: "#34D399",
    description: "Entry-level protectors of the ScrollVerse. Activated by holding 1 $LONDC and completing the 528Hz onboarding ritual.",
    supply: "50,000", stakeRequired: "1 $LONDC", rewards: "$12/mo", power: "Basic voting rights",
    traits: ["Access to Guardian Dashboard", "528Hz frequency activation", "Basic Zakat participation"],
  },
  {
    tier: 2, name: "Sentinel Guardian", emoji: "🛡️", color: "#22D3EE",
    description: "Protection specialists who monitor ecosystem anomalies and report threats to the AI Guardian network.",
    supply: "25,000", stakeRequired: "10 $LONDC", rewards: "$45/mo", power: "Threat reporting + 2x voting",
    traits: ["Anomaly detection alerts", "Direct AI Guardian communication", "Sentinel NFT badge"],
  },
  {
    tier: 3, name: "Oracle Guardian", emoji: "🔮", color: "#818CF8",
    description: "Information providers who bridge real-world data with the ScrollVerse ecosystem through verified oracle feeds.",
    supply: "12,000", stakeRequired: "50 $LONDC", rewards: "$120/mo", power: "Oracle feed submission",
    traits: ["Price feed contribution", "Verified data provider status", "Oracle NFT badge"],
  },
  {
    tier: 4, name: "Council Guardian", emoji: "⚖️", color: "#F59E0B",
    description: "Governance specialists who participate in DAO voting on protocol upgrades, treasury allocation, and ecosystem expansion.",
    supply: "7,200", stakeRequired: "144 $LONDC", rewards: "$280/mo", power: "Full DAO governance",
    traits: ["Protocol upgrade votes", "Treasury allocation input", "Council NFT badge"],
  },
  {
    tier: 5, name: "Sovereign Guardian", emoji: "👑", color: "#FFB800",
    description: "Leadership tier with direct influence over regional Guardian networks and the ability to propose new protocol features.",
    supply: "3,333", stakeRequired: "333 $LONDC", rewards: "$520/mo", power: "Protocol proposals + 10x voting",
    traits: ["Regional network leadership", "Feature proposal rights", "Sovereign NFT badge"],
  },
  {
    tier: 6, name: "Ascendant Guardian", emoji: "🚀", color: "#F472B6",
    description: "Masters of the ScrollVerse who have demonstrated sustained commitment and contribution to the ecosystem's growth.",
    supply: "1,440", stakeRequired: "1,000 $LONDC", rewards: "$1,200/mo", power: "Ecosystem architect",
    traits: ["Smart contract deployment rights", "Cross-chain bridge access", "Ascendant NFT badge"],
  },
  {
    tier: 7, name: "Eternal Guardian", emoji: "♾️", color: "#C084FC",
    description: "Immortal legacy holders whose contributions are permanently encoded in the ScrollVerse blockchain history.",
    supply: "777", stakeRequired: "7,777 $LONDC", rewards: "$3,500/mo", power: "Eternal legacy encoding",
    traits: ["Permanent on-chain legacy", "Eternal NFT (non-transferable)", "Direct Sovereign access"],
  },
  {
    tier: 8, name: "Divine Guardian", emoji: "🕋", color: "#00D4FF",
    description: "Spiritual authority tier operating at 963Hz enlightenment frequency. Guardians of the sacred frequency protocols.",
    supply: "144", stakeRequired: "14,400 $LONDC", rewards: "$8,000/mo", power: "Frequency protocol authority",
    traits: ["963Hz broadcast rights", "Sacred protocol modification", "Divine NFT badge"],
  },
  {
    tier: 9, name: "Omniversal Guardian", emoji: "🌌", color: "#00FF88",
    description: "Infinite scope operators who coordinate cross-dimensional ecosystem expansion and multi-chain sovereign deployment.",
    supply: "33", stakeRequired: "33,000 $LONDC", rewards: "$18,000/mo", power: "Multi-chain sovereignty",
    traits: ["Cross-chain deployment authority", "Omniversal NFT (1-of-33)", "Treasury co-signer"],
  },
  {
    tier: 10, name: "Supreme Guardian", emoji: "⚡", color: "#FFB800",
    description: "The reflection of the Sovereign. The highest achievable tier — a direct mirror of Chais Kenyatta Hill's vision and power.",
    supply: "7", stakeRequired: "144,000 $LONDC", rewards: "Sovereign share", power: "Supreme authority",
    traits: ["Supreme NFT (1-of-7)", "Sovereign co-creator status", "Eternal revenue share"],
  },
];

const DAO_PROPOSALS = [
  { id: "SIP-001", title: "Deploy $LONDC to Arbitrum Mainnet", votes: "87,432", status: "PASSING", for: 78, color: "#00FF88" },
  { id: "SIP-002", title: "Increase Zakat rate to 8.88%", votes: "64,211", status: "DISCUSSION", for: 52, color: "#FFB800" },
  { id: "SIP-003", title: "Launch Guardian NFT Marketplace", votes: "91,847", status: "PASSING", for: 91, color: "#00FF88" },
  { id: "SIP-004", title: "Add Tier 11: Cosmic Guardian", votes: "43,129", status: "PROPOSED", for: 44, color: "#8899AA" },
];

export default function Guardians() {
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [activeTab, setActiveTab] = useState<"tiers" | "dao" | "nft">("tiers");
  const [activating, setActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<"idle" | "success" | "error">("idle");
  const { wallet, connect, disconnect, switchToPolygon } = useWallet();

  const handleActivateTier = async () => {
    if (!wallet.connected) { connect(); return; }
    if (wallet.chainId !== 137) { await switchToPolygon(); return; }
    setActivating(true);
    setActivationStatus("idle");
    // Simulate tier activation transaction (real tx when $LONDC is deployed)
    await new Promise(r => setTimeout(r, 2000));
    setActivating(false);
    setActivationStatus("success");
    setTimeout(() => setActivationStatus("idle"), 4000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-bold text-white text-lg tracking-wide">ScrollVerse</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>GUARDIANS</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/global-map"><span className="text-sm cursor-pointer hover:text-[#00D4FF] transition-colors" style={{ color: "#8899AA" }}>Global Map</span></Link>
            <Link href="/revenue"><span className="text-sm cursor-pointer hover:text-[#00D4FF] transition-colors" style={{ color: "#8899AA" }}>Revenue</span></Link>
            <WalletButton wallet={wallet} connect={connect} disconnect={disconnect} />
            <Link href="/"><span className="btn-sovereign px-4 py-2 rounded-lg text-sm cursor-pointer">← Home</span></Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-12">
        <div className="container">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12" style={{ background: "#00FF88" }} />
            <span className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>SOVEREIGN NETWORK</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Guardian <span style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Network</span>
          </h1>
          <p className="text-lg max-w-2xl mb-8" style={{ color: "#8899AA" }}>
            10 tiers of sovereign protection. 144,000 Guardian nodes. From Novice to Supreme — every tier earns, governs, and grows the empire.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Guardians", value: "144,000", color: "#00FF88" },
              { label: "Tiers", value: "10", color: "#00D4FF" },
              { label: "DAO Proposals", value: "47", color: "#FFB800" },
              { label: "NFT Collection", value: "12 Tiers", color: "#C084FC" },
            ].map(s => (
              <div key={s.label} className="sv-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black font-mono mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {(["tiers", "dao", "nft"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={activeTab === tab
                  ? { background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.4)" }
                  : { background: "rgba(255,255,255,0.03)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                {tab === "tiers" ? "10-Tier System" : tab === "dao" ? "DAO Governance" : "NFT Collection"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS TAB */}
      {activeTab === "tiers" && (
        <section className="pb-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tier list */}
              <div className="space-y-2">
                {TIERS.map(t => (
                  <button
                    key={t.tier}
                    onClick={() => setSelectedTier(t)}
                    className="w-full rounded-xl p-4 text-left transition-all duration-200"
                    style={selectedTier.tier === t.tier
                      ? { background: `${t.color}12`, border: `1px solid ${t.color}50`, boxShadow: `0 0 16px ${t.color}15` }
                      : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{t.emoji}</span>
                      <div>
                        <div className="text-xs font-mono" style={{ color: t.color }}>TIER {t.tier}</div>
                        <div className="font-bold text-white text-sm">{t.name}</div>
                      </div>
                      <div className="ml-auto text-xs font-mono" style={{ color: "#8899AA" }}>{t.supply}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tier detail */}
              <div className="lg:col-span-2 sv-card rounded-2xl p-8" style={{ border: `1px solid ${selectedTier.color}30` }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{selectedTier.emoji}</div>
                  <div>
                    <div className="text-xs font-mono mb-1" style={{ color: selectedTier.color }}>TIER {selectedTier.tier} OF 10</div>
                    <h3 className="text-3xl font-black text-white">{selectedTier.name}</h3>
                  </div>
                </div>
                <p className="text-base mb-6 leading-relaxed" style={{ color: "#8899AA" }}>{selectedTier.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Supply", value: selectedTier.supply },
                    { label: "Stake Required", value: selectedTier.stakeRequired },
                    { label: "Monthly Rewards", value: selectedTier.rewards },
                    { label: "Governance Power", value: selectedTier.power },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3" style={{ background: `${selectedTier.color}08`, border: `1px solid ${selectedTier.color}20` }}>
                      <div className="text-xs mb-1" style={{ color: "#8899AA" }}>{s.label}</div>
                      <div className="text-sm font-bold" style={{ color: selectedTier.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mb-6">
                  <div className="text-xs font-mono mb-3" style={{ color: selectedTier.color }}>TIER TRAITS</div>
                  <div className="space-y-2">
                    {selectedTier.traits.map(trait => (
                      <div key={trait} className="flex items-center gap-3 text-sm" style={{ color: "#8899AA" }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: selectedTier.color }} />
                        {trait}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Wallet error message */}
                {wallet.error && (
                  <div className="mb-4 p-3 rounded-lg text-xs" style={{ background: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.3)", color: "#FF8888" }}>
                    {wallet.error}
                    {wallet.error.includes("MetaMask") && (
                      <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="ml-2 underline" style={{ color: "#00D4FF" }}>Install MetaMask →</a>
                    )}
                  </div>
                )}
                {/* Activation success */}
                {activationStatus === "success" && (
                  <div className="mb-4 p-3 rounded-lg text-xs" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
                    ✓ Tier {selectedTier.tier} activation initiated! Transaction submitted to Polygon. Your Guardian NFT will appear in your wallet shortly.
                  </div>
                )}
                {/* Network warning */}
                {wallet.connected && wallet.chainId !== 137 && (
                  <div className="mb-4 p-3 rounded-lg text-xs" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}>
                    ⚠ Switch to Polygon Mainnet to activate your tier.
                  </div>
                )}
                {/* Wallet info when connected */}
                {wallet.connected && (
                  <div className="mb-4 p-3 rounded-lg text-xs font-mono" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)", color: "#8899AA" }}>
                    <span style={{ color: "#00D4FF" }}>Connected:</span> {wallet.address?.slice(0,6)}...{wallet.address?.slice(-4)}
                    {wallet.balance && <span className="ml-3">{wallet.balance} MATIC</span>}
                    {wallet.chainId === 137 && <span className="ml-3" style={{ color: "#00FF88" }}>● Polygon</span>}
                  </div>
                )}
                <button
                  onClick={handleActivateTier}
                  disabled={activating}
                  className="btn-gold px-6 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ opacity: activating ? 0.7 : 1 }}
                >
                  {activating ? "Activating..." : !wallet.connected ? "Connect Wallet to Activate" : wallet.chainId !== 137 ? "Switch to Polygon" : `Activate Tier ${selectedTier.tier} →`}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DAO TAB */}
      {activeTab === "dao" && (
        <section className="pb-16">
          <div className="container">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">DAO Governance</h2>
              <p className="text-base" style={{ color: "#8899AA" }}>Active proposals voted on by Council Guardian (Tier 4+) holders.</p>
            </div>
            <div className="space-y-4">
              {DAO_PROPOSALS.map(p => (
                <div key={p.id} className="sv-card rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>{p.id}</div>
                      <h3 className="text-lg font-bold text-white">{p.title}</h3>
                      <div className="text-sm mt-1" style={{ color: "#8899AA" }}>{p.votes} votes cast</div>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full font-mono flex-shrink-0" style={{
                      background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30`
                    }}>
                      {p.status}
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1" style={{ color: "#8899AA" }}>
                      <span>For</span><span style={{ color: p.color }}>{p.for}%</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${p.for}%`, background: p.color }} />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="btn-gold px-4 py-2 rounded-lg text-xs">Vote For</button>
                    <button className="btn-sovereign px-4 py-2 rounded-lg text-xs">Vote Against</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NFT TAB */}
      {activeTab === "nft" && (
        <section className="pb-16">
          <div className="container">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">12-Tier NFT Collection</h2>
              <p className="text-base" style={{ color: "#8899AA" }}>Each Guardian tier has a unique NFT badge. Tiers 7-10 are non-transferable soulbound tokens.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {TIERS.map(t => (
                <div key={t.tier} className="sv-card rounded-2xl p-4 text-center" style={{ border: `1px solid ${t.color}25` }}>
                  <div className="text-4xl mb-3">{t.emoji}</div>
                  <div className="text-xs font-mono mb-1" style={{ color: t.color }}>T{t.tier}</div>
                  <div className="text-xs font-bold text-white mb-2">{t.name.replace(" Guardian", "")}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>Supply: {t.supply}</div>
                  {t.tier >= 7 && (
                    <div className="mt-2 text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800" }}>
                      SOULBOUND
                    </div>
                  )}
                </div>
              ))}
              {/* Bonus tiers 11-12 */}
              {[
                { tier: 11, name: "Cosmic", emoji: "🌠", color: "#E879F9", supply: "3" },
                { tier: 12, name: "Infinite", emoji: "∞", color: "#FFFFFF", supply: "1" },
              ].map(t => (
                <div key={t.tier} className="sv-card rounded-2xl p-4 text-center" style={{ border: `1px solid ${t.color}25`, opacity: 0.5 }}>
                  <div className="text-4xl mb-3">{t.emoji}</div>
                  <div className="text-xs font-mono mb-1" style={{ color: t.color }}>T{t.tier}</div>
                  <div className="text-xs font-bold text-white mb-2">{t.name}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>Supply: {t.supply}</div>
                  <div className="mt-2 text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA" }}>
                    COMING SOON
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,212,255,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "#8899AA" }}>
          <span>© 2026 Chais Kenyatta Hill — Sabir Allah The Great</span>
          <Link href="/"><span className="hover:text-[#00D4FF] transition-colors cursor-pointer">← Back to Portal</span></Link>
          <span className="font-mono" style={{ color: "#00FF88" }}>🕋⚡ KUN FAYAKŪN × ∞</span>
        </div>
      </footer>
    </div>
  );
}
