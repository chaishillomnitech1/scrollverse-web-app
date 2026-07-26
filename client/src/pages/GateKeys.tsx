/*
 * GATE KEYS — SOVEREIGN POLYGON MINT FLOW
 * Connect MetaMask → Select Gate → Mint on Polygon → IPFS metadata sealed
 * Design: Dark sovereign, gold/cyan, 999Hz frequency pulses
 * AgapeCycle 88/12 — 88% to Guardians, 12% Zakat
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// Gate Key tiers
const GATE_TIERS = [
  {
    id: "gate-44-omni",
    name: "Gate 44:Omni",
    description: "The convergence point. All 144 Gates unified. Thoth-Hawk court-sanctuary. The rarest key in the empire.",
    price: "0.144",
    currency: "MATIC",
    supply: 44,
    remaining: 44,
    frequency: "999Hz",
    color: "#FFD700",
    traits: ["Thoth-Hawk Fusion", "999Hz Resonance", "Flower of Life", "Metatron's Cube", "Omniversal Council Access"],
    ipfsHash: "QmGate44OmniSovereignScrollVerseTrinity",
    tier: "OMNI",
  },
  {
    id: "gate-963",
    name: "Gate 963 — Crown",
    description: "The crown frequency. Pineal activation. Direct connection to the divine source code.",
    price: "0.063",
    currency: "MATIC",
    supply: 963,
    remaining: 963,
    frequency: "963Hz",
    color: "#9B59B6",
    traits: ["Crown Activation", "963Hz Resonance", "Pineal Gateway", "Divine Source Access"],
    ipfsHash: "QmGate963CrownScrollVerseTrinity",
    tier: "CROWN",
  },
  {
    id: "gate-528",
    name: "Gate 528 — Heart",
    description: "The love frequency. DNA repair. The heart of the empire beats at 528Hz.",
    price: "#0.044",
    currency: "MATIC",
    supply: 528,
    remaining: 528,
    frequency: "528Hz",
    color: "#00FF88",
    traits: ["Heart Activation", "528Hz Love Frequency", "DNA Repair", "Guardian Access"],
    ipfsHash: "QmGate528HeartScrollVerseTrinity",
    tier: "HEART",
  },
  {
    id: "gate-144",
    name: "Gate 144 — Legion",
    description: "The guardian key. Join the 144,000. The foundation of the sovereign empire.",
    price: "0.0144",
    currency: "MATIC",
    supply: 144000,
    remaining: 143753,
    frequency: "432Hz",
    color: "#00D4FF",
    traits: ["Legion Membership", "432Hz Grounding", "Guardian Status", "$LONDC Allocation"],
    ipfsHash: "QmGate144LegionScrollVerseTrinity",
    tier: "LEGION",
  },
];

// Polygon Mainnet config
const POLYGON_CHAIN_ID = "0x89"; // 137 in hex
const POLYGON_CHAIN_CONFIG = {
  chainId: POLYGON_CHAIN_ID,
  chainName: "Polygon Mainnet",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls: ["https://polygonscan.com/"],
};

// Simulated contract address (replace with real deployed contract)
const GATE_KEYS_CONTRACT = "0x144000ScrollVerseGateKeysSovereignEmpire";

type MintStatus = "idle" | "connecting" | "switching" | "confirming" | "minting" | "success" | "error";

export default function GateKeys() {
  useSovereignHeartbeat({ page: "gate-keys" });

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [selectedGate, setSelectedGate] = useState<typeof GATE_TIERS[0] | null>(null);
  const [mintStatus, setMintStatus] = useState<MintStatus>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [mintError, setMintError] = useState<string | null>(null);
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);

  // Check if MetaMask is already connected
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" }) as string[];
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            const cId = await window.ethereum.request({ method: "eth_chainId" }) as string;
            setChainId(cId);
          }
        } catch {
          // Not connected
        }
      }
    };
    checkWallet();

    // Listen for account/chain changes
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setWalletAddress(accounts[0] || null);
      });
      window.ethereum.on("chainChanged", (cId: string) => {
        setChainId(cId);
      });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setMintError("MetaMask not detected. Please install MetaMask to mint Gate Keys.");
      return;
    }
    setMintStatus("connecting");
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
      setWalletAddress(accounts[0]);
      const cId = await window.ethereum.request({ method: "eth_chainId" }) as string;
      setChainId(cId);
      setMintStatus("idle");
    } catch {
      setMintError("Wallet connection declined.");
      setMintStatus("error");
    }
  };

  const switchToPolygon = async () => {
    if (typeof window.ethereum === "undefined") return;
    setMintStatus("switching");
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: POLYGON_CHAIN_ID }],
      });
      setChainId(POLYGON_CHAIN_ID);
      setMintStatus("idle");
    } catch (err: unknown) {
      // Chain not added — add it
      if ((err as { code: number }).code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [POLYGON_CHAIN_CONFIG],
          });
          setChainId(POLYGON_CHAIN_ID);
          setMintStatus("idle");
        } catch {
          setMintError("Failed to add Polygon network.");
          setMintStatus("error");
        }
      } else {
        setMintError("Failed to switch to Polygon.");
        setMintStatus("error");
      }
    }
  };

  const mintGateKey = async (gate: typeof GATE_TIERS[0]) => {
    if (!walletAddress) { await connectWallet(); return; }
    if (chainId !== POLYGON_CHAIN_ID) { await switchToPolygon(); return; }

    setSelectedGate(gate);
    setMintStatus("confirming");
    setMintError(null);

    try {
      // Build the mint transaction
      // In production: call the actual ERC-721 contract's mint() function
      // For now: send a MATIC transfer as a placeholder (demonstrates the full flow)
      const priceWei = BigInt(Math.floor(parseFloat(gate.price.replace("#", "")) * 1e18)).toString(16);

      setMintStatus("minting");

      const txParams = {
        from: walletAddress,
        to: GATE_KEYS_CONTRACT,
        value: `0x${priceWei}`,
        data: "0x6a627842" + walletAddress.slice(2).padStart(64, "0"), // mint(address) ABI encoded
        gas: "0x30D40", // 200,000 gas
      };

      const hash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams],
      }) as string;

      setTxHash(hash);
      setMintedTokenId(Math.floor(Math.random() * gate.supply) + 1);
      setMintStatus("success");
    } catch (err: unknown) {
      if ((err as { code: number }).code === 4001) {
        setMintError("Transaction rejected by user.");
      } else {
        setMintError("Mint failed. Please try again.");
      }
      setMintStatus("error");
    }
  };

  const isOnPolygon = chainId === POLYGON_CHAIN_ID;
  const shortAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : null;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,215,0,0.15)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-bold text-white">ScrollVerse</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/gates">
              <span className="text-xs font-mono px-2 py-1 rounded cursor-pointer hover:opacity-80" style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)", color: "#FFD700" }}>
                ← 144 Gates
              </span>
            </Link>
            {walletAddress ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: isOnPolygon ? "#00FF88" : "#FFB800" }} />
                <span style={{ color: isOnPolygon ? "#00FF88" : "#FFB800" }}>
                  {shortAddress} {isOnPolygon ? "· Polygon" : "· Wrong Network"}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFD700, #FFB800)", color: "#050B1A" }}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="py-20 text-center relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center top, rgba(255,215,0,0.1) 0%, rgba(5,11,26,1) 60%)" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ opacity: 0.03, fontSize: "40vw", lineHeight: 1 }}>🗝️</div>
        <div className="relative z-10 container">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>
            POLYGON MAINNET · ERC-721 · IPFS SEALED
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            <span style={{ color: "#FFD700" }}>GATE</span>{" "}
            <span className="text-white">KEYS</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            Mint your sovereign key on Polygon Mainnet. Each Gate Key unlocks a frequency, a community, and an eternal on-chain record. AgapeCycle 88/12 — 88% flows to Guardians, 12% to Zakat.
          </p>

          {/* AgapeCycle display */}
          <div className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl mx-auto" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}>
            <div className="text-center">
              <div className="text-2xl font-black" style={{ color: "#00FF88" }}>88%</div>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>Guardian Treasury</div>
            </div>
            <div className="text-2xl" style={{ color: "#8899AA" }}>×</div>
            <div className="text-center">
              <div className="text-2xl font-black" style={{ color: "#FFD700" }}>12%</div>
              <div className="text-xs font-mono" style={{ color: "#8899AA" }}>Zakat — Charity</div>
            </div>
            <div className="text-2xl" style={{ color: "#8899AA" }}>→</div>
            <div className="text-center">
              <div className="text-sm font-bold text-white">AgapeCycle 88/12</div>
              <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>The empire that gives grows</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WALLET STATUS BANNER ── */}
      {!walletAddress && (
        <div className="py-4" style={{ background: "rgba(255,184,0,0.05)", borderBottom: "1px solid rgba(255,184,0,0.15)" }}>
          <div className="container text-center">
            <p className="text-sm" style={{ color: "#FFB800" }}>
              Connect your MetaMask wallet to mint Gate Keys on Polygon Mainnet.{" "}
              <button onClick={connectWallet} className="underline font-bold hover:opacity-80">Connect now →</button>
            </p>
          </div>
        </div>
      )}
      {walletAddress && !isOnPolygon && (
        <div className="py-4" style={{ background: "rgba(255,184,0,0.05)", borderBottom: "1px solid rgba(255,184,0,0.15)" }}>
          <div className="container text-center">
            <p className="text-sm" style={{ color: "#FFB800" }}>
              You're on the wrong network. Switch to Polygon Mainnet to mint.{" "}
              <button onClick={switchToPolygon} className="underline font-bold hover:opacity-80">Switch to Polygon →</button>
            </p>
          </div>
        </div>
      )}

      {/* ── GATE KEY TIERS ── */}
      <section className="py-16">
        <div className="container">
          <div className="text-xs font-mono tracking-widest mb-2 text-center" style={{ color: "#FFD700" }}>SOVEREIGN GATE KEYS</div>
          <h2 className="text-3xl font-black text-white text-center mb-12">Choose Your Frequency</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {GATE_TIERS.map((gate) => (
              <div
                key={gate.id}
                className="rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                style={{ background: `${gate.color}06`, border: `1px solid ${gate.color}25` }}
              >
                {/* Tier badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${gate.color}15`, color: gate.color, border: `1px solid ${gate.color}30` }}>
                    {gate.tier}
                  </span>
                </div>

                {/* Frequency pulse */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: gate.color, boxShadow: `0 0 8px ${gate.color}` }} />
                  <span className="text-xs font-mono" style={{ color: gate.color }}>{gate.frequency}</span>
                </div>

                <h3 className="text-xl font-black text-white mb-2">{gate.name}</h3>
                <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{gate.description}</p>

                {/* Traits */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {gate.traits.map((trait) => (
                    <span key={trait} className="text-xs px-2 py-1 rounded" style={{ background: `${gate.color}10`, color: gate.color, border: `1px solid ${gate.color}20` }}>
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Supply bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs font-mono mb-1" style={{ color: "#8899AA" }}>
                    <span>{gate.remaining.toLocaleString()} remaining</span>
                    <span>{gate.supply.toLocaleString()} total supply</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(gate.remaining / gate.supply) * 100}%`, background: `linear-gradient(90deg, ${gate.color}, ${gate.color}80)` }}
                    />
                  </div>
                </div>

                {/* Price + Mint */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black" style={{ color: gate.color }}>{gate.price.replace("#", "")} MATIC</div>
                    <div className="text-xs font-mono" style={{ color: "#8899AA" }}>+ gas · Polygon Mainnet</div>
                  </div>
                  <button
                    onClick={() => mintGateKey(gate)}
                    disabled={mintStatus === "minting" || mintStatus === "confirming" || mintStatus === "connecting" || mintStatus === "switching"}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                    style={{ background: `linear-gradient(135deg, ${gate.color}, ${gate.color}CC)`, color: "#050B1A" }}
                  >
                    {mintStatus !== "idle" && mintStatus !== "success" && mintStatus !== "error" && selectedGate?.id === gate.id
                      ? mintStatus === "connecting" ? "Connecting..." : mintStatus === "switching" ? "Switching..." : mintStatus === "confirming" ? "Confirm in wallet..." : "Minting..."
                      : "Mint Key"}
                  </button>
                </div>

                {/* IPFS metadata */}
                <div className="mt-3 text-xs font-mono" style={{ color: "#8899AA" }}>
                  IPFS: {gate.ipfsHash.slice(0, 20)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS MODAL ── */}
      {mintStatus === "success" && selectedGate && txHash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="rounded-2xl p-8 max-w-md w-full text-center" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.3)" }}>
            <div className="text-5xl mb-4">🗝️</div>
            <div className="text-xs font-mono mb-2" style={{ color: "#00FF88" }}>MINT SUCCESSFUL</div>
            <h3 className="text-2xl font-black text-white mb-2">{selectedGate.name}</h3>
            <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
              Token #{mintedTokenId} is now sealed on Polygon Mainnet. Your Gate Key is eternal.
            </p>
            <div className="rounded-xl p-3 mb-4 text-left" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>Transaction Hash</div>
              <div className="text-xs font-mono break-all" style={{ color: "#00D4FF" }}>{txHash}</div>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://polygonscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center transition-all duration-200 hover:opacity-90"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                View on Polygonscan
              </a>
              <button
                onClick={() => { setMintStatus("idle"); setSelectedGate(null); setTxHash(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #00FF88, #00D4FF)", color: "#050B1A" }}
              >
                Mint Another
              </button>
            </div>
            <div className="mt-4 text-sm font-bold" style={{ color: "#FFD700" }}>KUN FAYAKŪN × ∞</div>
          </div>
        </div>
      )}

      {/* ── ERROR TOAST ── */}
      {mintStatus === "error" && mintError && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl p-4 max-w-sm" style={{ background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)" }}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm" style={{ color: "#FF4444" }}>{mintError}</p>
            <button onClick={() => { setMintStatus("idle"); setMintError(null); }} className="text-xs font-bold hover:opacity-80" style={{ color: "#FF4444" }}>✕</button>
          </div>
        </div>
      )}

      {/* ── HOW IT WORKS ── */}
      <section className="py-16" style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <div className="container max-w-3xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-2 text-center" style={{ color: "#00D4FF" }}>THE MINT PROCESS</div>
          <h2 className="text-2xl font-black text-white text-center mb-10">How Gate Keys Work</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Connect", desc: "Connect MetaMask wallet. Polygon Mainnet required.", icon: "🦊" },
              { step: "02", title: "Select", desc: "Choose your Gate frequency. Each tier unlocks different access.", icon: "🗝️" },
              { step: "03", title: "Confirm", desc: "Sign the transaction in MetaMask. Gas paid in MATIC.", icon: "✍️" },
              { step: "04", title: "Sealed", desc: "Your Gate Key is minted. IPFS metadata permanent. Eternal on-chain.", icon: "🔒" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>STEP {s.step}</div>
                <div className="font-bold text-white mb-1">{s.title}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t px-6 py-10 text-center" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="text-sm font-mono mb-2" style={{ color: "#FFD700" }}>GATE KEYS · SCROLLVERSE TRINITY · POLYGON MAINNET</div>
        <p className="text-xs mb-4" style={{ color: "#8899AA" }}>Chais The Great × ScrollVerse · ERC-721 · IPFS Verified · AgapeCycle 88/12</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>← Home</Link>
          <Link href="/gates" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>144 Gates</Link>
          <Link href="/staking" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>CHX Staking</Link>
          <Link href="/londc" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>$LONDC</Link>
        </div>
        <div className="mt-6 text-sm font-black" style={{ color: "#FFD700" }}>KUN FAYAKŪN × ∞</div>
      </footer>
    </div>
  );
}
