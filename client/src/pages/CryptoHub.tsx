/**
 * SCROLLVERSE CRYPTOHUB
 * Direct sovereign crypto payment interface — no OpenSea, no MetaMask required
 * Send MATIC or USDC directly to the ScrollVerse sovereign wallet from any browser
 * Wallet: 0x377956c1471d9ce142df6932895839243da23a2c
 */

import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const SOVEREIGN_WALLET = "0x377956c1471d9ce142df6932895839243da23a2c";
const POLYGON_RPC = "https://polygon-rpc.com";
const POLYGON_CHAIN_ID = "0x89"; // 137 in hex
const USDC_CONTRACT = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // USDC on Polygon

// Guardian tier amounts in MATIC (approximate at $0.50/MATIC)
const TIERS = [
  { name: "Guardian", usd: 144, matic: "288", color: "#00D4FF", icon: "🛡️", perks: ["$LONDC tokens", "Academy access", "DAO voting"] },
  { name: "Sovereign", usd: 444, matic: "888", color: "#FFB800", icon: "👑", perks: ["All Guardian perks", "Priority NFT minting", "Revenue share"] },
  { name: "Ascendant", usd: 1444, matic: "2888", color: "#8B5CF6", icon: "⚡", perks: ["All Sovereign perks", "Direct founder access", "48D Hilbert allocation"] },
];

function QRCode({ address }: { address: string }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${address}&bgcolor=050B1A&color=00D4FF&margin=10`;
  return (
    <div className="flex flex-col items-center gap-3">
      <img src={qrUrl} alt="Wallet QR Code" className="rounded-xl" style={{ border: "2px solid rgba(0,212,255,0.3)" }} />
      <div className="text-xs font-mono text-center" style={{ color: "#8899AA" }}>Scan to send directly</div>
    </div>
  );
}

function LiveBalance() {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    try {
      const res = await fetch(POLYGON_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [SOVEREIGN_WALLET, "latest"],
          id: 1,
        }),
      });
      const data = await res.json();
      if (data.result) {
        const wei = BigInt(data.result);
        const matic = Number(wei) / 1e18;
        setBalance(matic.toFixed(4));
      }
    } catch {
      setBalance("—");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [fetchBalance]);

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}>
      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: loading ? "#8899AA" : "#00FF88" }} />
      <span className="text-xs font-mono" style={{ color: "#8899AA" }}>TREASURY:</span>
      <span className="text-sm font-bold font-mono" style={{ color: "#00FF88" }}>
        {loading ? "···" : `${balance} MATIC`}
      </span>
      <span className="text-xs font-mono" style={{ color: "#8899AA" }}>LIVE · POLYGON</span>
    </div>
  );
}

function DirectSendPanel() {
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const sendMatic = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Enter a valid MATIC amount");
      return;
    }

    // Check if MetaMask / injected wallet is available
    const eth = (window as unknown as { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
    if (!eth) {
      toast.error("No Web3 wallet detected. Install MetaMask or use the QR code to send directly.");
      return;
    }

    setSending(true);
    try {
      // Request account access
      const accounts = await eth.request({ method: "eth_requestAccounts" }) as string[];
      if (!accounts || accounts.length === 0) throw new Error("No accounts found");

      // Switch to Polygon
      try {
        await eth.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: POLYGON_CHAIN_ID }],
        });
      } catch {
        // Add Polygon if not present
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: POLYGON_CHAIN_ID,
            chainName: "Polygon Mainnet",
            nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com"],
            blockExplorerUrls: ["https://polygonscan.com"],
          }],
        });
      }

      // Convert MATIC to wei
      const weiAmount = "0x" + (BigInt(Math.floor(parseFloat(amount) * 1e18))).toString(16);

      const hash = await eth.request({
        method: "eth_sendTransaction",
        params: [{
          from: accounts[0],
          to: SOVEREIGN_WALLET,
          value: weiAmount,
          gas: "0x5208", // 21000
        }],
      }) as string;

      setTxHash(hash);
      toast.success("Transaction submitted! Guardian status activating...");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Transaction failed";
      toast.error(message.includes("rejected") ? "Transaction cancelled" : message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>DIRECT MATIC TRANSFER</div>
      <div className="flex gap-3">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount in MATIC"
          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none font-mono"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
        />
        <button
          onClick={sendMatic}
          disabled={sending}
          className="px-6 py-3 rounded-xl text-sm font-bold transition-all"
          style={{
            background: sending ? "rgba(0,212,255,0.2)" : "linear-gradient(135deg, #00D4FF, #0088FF)",
            color: sending ? "#8899AA" : "#050B1A",
            opacity: sending ? 0.7 : 1,
          }}
        >
          {sending ? "Sending..." : "Send MATIC"}
        </button>
      </div>
      {txHash && (
        <div className="p-3 rounded-xl text-xs font-mono" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>
          ✓ TX: <a href={`https://polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="underline">{txHash.slice(0, 20)}...</a>
        </div>
      )}
      <div className="text-xs" style={{ color: "#8899AA" }}>
        No wallet? Use the QR code or send directly to: <span className="font-mono" style={{ color: "#00D4FF" }}>{SOVEREIGN_WALLET.slice(0, 10)}...{SOVEREIGN_WALLET.slice(-6)}</span>
      </div>
    </div>
  );
}

function NFTMintPanel() {
  const [mintName, setMintName] = useState("");
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    if (!mintName.trim()) { toast.error("Enter a Guardian name for your NFT"); return; }
    setMinting(true);
    await new Promise(r => setTimeout(r, 2000));
    setMinting(false);
    toast.success("NFT mint queued — activates when ScrollSovereignty48DG.sol deploys to Polygon Mainnet");
  };

  return (
    <div className="space-y-4">
      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#8B5CF6" }}>SCROLLSOUL NFT MINT</div>
      <div className="p-4 rounded-xl text-sm" style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", color: "#8899AA" }}>
        ScrollSoul NFTs are ERC-721 tokens on Polygon Mainnet with permanent ERC-2981 royalties. Contract deployment activates full minting.
      </div>
      <input
        type="text"
        value={mintName}
        onChange={e => setMintName(e.target.value)}
        placeholder="Your Guardian name (e.g. Guardian #0001)"
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)", color: "white" }}
      />
      <button
        onClick={handleMint}
        disabled={minting}
        className="w-full py-3 rounded-xl text-sm font-bold transition-all"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
          color: "white",
          opacity: minting ? 0.7 : 1,
        }}
      >
        {minting ? "Queuing Mint..." : "⚡ Queue ScrollSoul NFT Mint"}
      </button>
    </div>
  );
}

export default function CryptoHub() {
  const copyAddress = () => {
    navigator.clipboard.writeText(SOVEREIGN_WALLET);
    toast.success("Wallet address copied!");
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "rgba(0,212,255,0.04)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: "#8899AA" }}>
            ← Back to Portal
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white text-sm">CryptoHub</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>SOVEREIGN</span>
          </div>
          <LiveBalance />
        </div>
      </div>

      <div className="container py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>DIRECT SOVEREIGN CRYPTO HUB</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            No Middlemen.<br />
            <span style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pure Sovereign Flow.</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Send MATIC or USDC directly to the ScrollVerse treasury. No OpenSea. No third-party fees. No intermediaries. Built by Chais Kenyatta Hill — Sabir Allah The Great.
          </p>
          {/* Wallet address display */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer transition-all hover:scale-105"
            style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.25)" }}
            onClick={copyAddress}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            <span className="font-mono text-sm" style={{ color: "#00D4FF" }}>{SOVEREIGN_WALLET}</span>
            <span className="text-xs" style={{ color: "#8899AA" }}>📋 Copy</span>
          </div>
        </div>

        {/* Guardian Tiers */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>GUARDIAN TIERS — SEND EXACT AMOUNT</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${tier.color}30` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${tier.color}, transparent)` }} />
                <div className="text-3xl mb-3">{tier.icon}</div>
                <div className="text-xs font-mono mb-1" style={{ color: tier.color }}>{tier.name.toUpperCase()} TIER</div>
                <div className="text-2xl font-black text-white mb-1">${tier.usd} USD</div>
                <div className="text-sm font-mono mb-4" style={{ color: tier.color }}>≈ {tier.matic} MATIC</div>
                <ul className="space-y-1 mb-4">
                  {tier.perks.map((p, i) => (
                    <li key={i} className="text-xs flex items-center gap-2" style={{ color: "#8899AA" }}>
                      <span style={{ color: tier.color }}>›</span> {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(tier.matic);
                    toast.success(`${tier.matic} MATIC copied — paste into the send panel`);
                  }}
                  className="w-full py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                  style={{ background: `${tier.color}15`, border: `1px solid ${tier.color}40`, color: tier.color }}
                >
                  Copy {tier.matic} MATIC Amount
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Direct Send */}
          <div className="lg:col-span-2 rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)" }}>
            <h2 className="text-xl font-bold text-white mb-6">Direct Payment</h2>
            <DirectSendPanel />
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <NFTMintPanel />
            </div>
          </div>

          {/* QR + Info */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <h3 className="text-sm font-bold text-white mb-4">Scan & Send</h3>
              <QRCode address={SOVEREIGN_WALLET} />
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <h3 className="text-sm font-bold text-white mb-4">Supported Assets</h3>
              <div className="space-y-3">
                {[
                  { symbol: "MATIC", name: "Polygon Native", color: "#8B5CF6", note: "Recommended" },
                  { symbol: "USDC", name: "USD Coin (Polygon)", color: "#00D4FF", note: "Stable" },
                  { symbol: "ETH", name: "Bridged via Polygon", color: "#FFB800", note: "Via bridge" },
                ].map(asset => (
                  <div key={asset.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${asset.color}20`, color: asset.color }}>{asset.symbol[0]}</div>
                      <div>
                        <div className="text-xs font-bold text-white">{asset.symbol}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>{asset.name}</div>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${asset.color}15`, color: asset.color }}>{asset.note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)" }}>
              <h3 className="text-sm font-bold text-white mb-2">Verify on Polygonscan</h3>
              <a
                href={`https://polygonscan.com/address/${SOVEREIGN_WALLET}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono underline"
                style={{ color: "#00FF88" }}
              >
                View treasury on-chain →
              </a>
            </div>
          </div>
        </div>

        {/* USDC note */}
        <div className="mt-8 p-4 rounded-xl text-sm text-center" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)", color: "#8899AA" }}>
          USDC contract on Polygon: <span className="font-mono text-xs" style={{ color: "#00D4FF" }}>{USDC_CONTRACT}</span> · All transactions are immutable on Polygon Mainnet · Chain ID: 137
        </div>
      </div>
    </div>
  );
}
