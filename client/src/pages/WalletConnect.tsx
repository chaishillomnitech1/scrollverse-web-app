import { useState, useEffect } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

type WalletType = "metamask" | "coinbase" | "walletconnect" | "trust" | "phantom";

interface WalletInfo {
  id: WalletType;
  name: string;
  icon: string;
  description: string;
  chains: string[];
  color: string;
  deepLink?: string;
  installUrl: string;
}

const WALLETS: WalletInfo[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "The most popular Ethereum & Polygon wallet. Browser extension & mobile.",
    chains: ["Ethereum", "Polygon", "BSC", "Arbitrum", "Optimism"],
    color: "#E8831D",
    installUrl: "https://metamask.io/download/",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "Self-custody wallet by Coinbase. Supports all EVM chains.",
    chains: ["Ethereum", "Polygon", "Base", "Solana"],
    color: "#0052FF",
    installUrl: "https://www.coinbase.com/wallet/downloads",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    description: "Connect any mobile wallet via QR code. 300+ wallets supported.",
    chains: ["All EVM Chains", "Solana", "Cosmos"],
    color: "#3B99FC",
    installUrl: "https://walletconnect.com/",
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "🛡️",
    description: "Binance's official wallet. Multi-chain, mobile-first.",
    chains: ["Ethereum", "Polygon", "BSC", "Solana", "60+ chains"],
    color: "#3375BB",
    installUrl: "https://trustwallet.com/download",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    description: "Leading Solana wallet, now supporting Ethereum & Polygon.",
    chains: ["Solana", "Ethereum", "Polygon"],
    color: "#AB9FF2",
    installUrl: "https://phantom.app/download",
  },
];

const SUPPORTED_CHAINS = [
  { name: "Polygon", symbol: "MATIC", icon: "🔷", color: "#8247E5", rpc: "https://polygon-rpc.com", chainId: "0x89" },
  { name: "Ethereum", symbol: "ETH", icon: "⟠", color: "#627EEA", rpc: "https://mainnet.infura.io", chainId: "0x1" },
  { name: "BNB Chain", symbol: "BNB", icon: "🟡", color: "#F3BA2F", rpc: "https://bsc-dataseed.binance.org", chainId: "0x38" },
  { name: "Base", symbol: "ETH", icon: "🔵", color: "#0052FF", rpc: "https://mainnet.base.org", chainId: "0x2105" },
  { name: "Arbitrum", symbol: "ETH", icon: "🔵", color: "#28A0F0", rpc: "https://arb1.arbitrage.io", chainId: "0xa4b1" },
  { name: "Solana", symbol: "SOL", icon: "◎", color: "#9945FF", rpc: "https://api.mainnet-beta.solana.com", chainId: "—" },
];

function detectMetaMask(): boolean {
  return typeof window !== "undefined" && typeof (window as { ethereum?: { isMetaMask?: boolean } }).ethereum !== "undefined";
}

export default function WalletConnect() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<WalletType | null>(null);
  const [connecting, setConnecting] = useState<WalletType | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    setHasMetaMask(detectMetaMask());
    // Check if already connected
    const eth = (window as { ethereum?: { request: (args: { method: string }) => Promise<string[]>; on: (event: string, cb: (accounts: string[]) => void) => void } }).ethereum;
    if (eth) {
      eth.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setConnectedAddress(accounts[0]);
          setConnectedWallet("metamask");
        }
      }).catch(() => {});
    }
  }, []);

  const connectMetaMask = async () => {
    const eth = (window as { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<string[]>; on: (event: string, cb: (accounts: string[]) => void) => void } }).ethereum;
    if (!eth) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    setConnecting("metamask");
    try {
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setConnectedAddress(accounts[0]);
        setConnectedWallet("metamask");
        toast.success("MetaMask connected!", {
          description: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
        // Try to switch to Polygon
        try {
          await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x89" }] });
          setChainId("0x89");
        } catch {
          // Chain not added, add it
          try {
            await eth.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
                rpcUrls: ["https://polygon-rpc.com"],
                blockExplorerUrls: ["https://polygonscan.com"],
              }],
            });
            setChainId("0x89");
          } catch {
            // ignore
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Connection rejected";
      toast.error("Connection failed", { description: msg });
    } finally {
      setConnecting(null);
    }
  };

  const connectWallet = async (wallet: WalletInfo) => {
    if (wallet.id === "metamask") {
      await connectMetaMask();
      return;
    }
    // For other wallets, open their install/app page with a helpful message
    setConnecting(wallet.id);
    setTimeout(() => {
      toast.info(`Opening ${wallet.name}`, {
        description: "Install the wallet, then return to connect via MetaMask-compatible mode.",
      });
      window.open(wallet.installUrl, "_blank");
      setConnecting(null);
    }, 500);
  };

  const disconnect = () => {
    setConnectedAddress(null);
    setConnectedWallet(null);
    setChainId(null);
    toast.success("Wallet disconnected");
  };

  const copyAddress = () => {
    if (connectedAddress) {
      navigator.clipboard.writeText(connectedAddress);
      toast.success("Address copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>
                SV
              </div>
              <span className="font-bold text-white">ScrollVerse</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(139,92,246,0.15)", color: "#8B5CF6", border: "1px solid rgba(139,92,246,0.3)" }}>
                WALLET
              </span>
            </div>
          </Link>
          {connectedAddress && (
            <div className="flex items-center gap-3">
              <div className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }} onClick={copyAddress}>
                ◉ {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
              </div>
              <button onClick={disconnect} className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ color: "#FF4444", border: "1px solid rgba(255,68,68,0.3)" }}>
                Disconnect
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="container py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#8B5CF6" }}>
            MULTI-CHAIN WALLET GATEWAY
          </div>
          <h1 className="text-5xl font-black text-white mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>
            Connect Your<br />
            <span style={{ background: "linear-gradient(135deg, #8B5CF6, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sovereign Wallet
            </span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#8899AA" }}>
            Connect any wallet across Polygon, Ethereum, BNB Chain, Base, Arbitrum, and Solana. Your $LONDC tokens live on Polygon Mainnet.
          </p>
        </div>

        {/* Connected state */}
        {connectedAddress && (
          <div className="max-w-lg mx-auto mb-12 rounded-2xl p-6 text-center" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <div className="text-3xl mb-3">✅</div>
            <div className="text-lg font-bold text-white mb-1">Wallet Connected</div>
            <div className="text-sm font-mono mb-3" style={{ color: "#00FF88" }}>
              {connectedAddress}
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={copyAddress} className="text-xs px-4 py-2 rounded-lg" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                Copy Address
              </button>
              <Link href="/token">
                <button className="text-xs px-4 py-2 rounded-lg font-bold" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}>
                  Buy $LONDC
                </button>
              </Link>
            </div>
            {chainId === "0x89" && (
              <div className="mt-3 text-xs font-mono" style={{ color: "#8247E5" }}>
                🔷 Connected to Polygon Mainnet
              </div>
            )}
          </div>
        )}

        {/* Wallet grid */}
        {!connectedAddress && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
            {WALLETS.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => connectWallet(wallet)}
                disabled={connecting === wallet.id}
                className="rounded-xl p-6 text-left transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                style={{
                  background: `${wallet.color}08`,
                  border: `1px solid ${wallet.color}25`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{wallet.icon}</div>
                  <div>
                    <div className="font-bold text-white">{wallet.name}</div>
                    {wallet.id === "metamask" && !hasMetaMask && (
                      <div className="text-xs" style={{ color: "#FFB800" }}>Not installed</div>
                    )}
                    {wallet.id === "metamask" && hasMetaMask && (
                      <div className="text-xs" style={{ color: "#00FF88" }}>Detected ✓</div>
                    )}
                  </div>
                </div>
                <p className="text-xs mb-3" style={{ color: "#8899AA" }}>{wallet.description}</p>
                <div className="flex flex-wrap gap-1">
                  {wallet.chains.slice(0, 3).map((chain) => (
                    <span key={chain} className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: `${wallet.color}15`, color: wallet.color }}>
                      {chain}
                    </span>
                  ))}
                  {wallet.chains.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA" }}>
                      +{wallet.chains.length - 3}
                    </span>
                  )}
                </div>
                <div className="mt-4 text-xs font-bold text-center py-2 rounded-lg" style={{ background: `${wallet.color}20`, color: wallet.color }}>
                  {connecting === wallet.id ? "Connecting..." : `Connect ${wallet.name}`}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Supported chains */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Supported Networks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SUPPORTED_CHAINS.map((chain) => (
              <div
                key={chain.name}
                className="rounded-xl p-4 text-center"
                style={{ background: `${chain.color}08`, border: `1px solid ${chain.color}20` }}
              >
                <div className="text-2xl mb-2">{chain.icon}</div>
                <div className="text-sm font-bold" style={{ color: chain.color }}>{chain.name}</div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{chain.symbol}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Info section */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="rounded-2xl p-8" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="text-2xl mb-3">🔷</div>
            <h3 className="font-bold text-white mb-2">$LONDC Lives on Polygon</h3>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              The $LONDC token is deployed on Polygon Mainnet for near-zero gas fees and instant transactions. Connect your wallet, switch to Polygon, and your Guardian tier tokens will be visible immediately after purchase.
            </p>
            <Link href="/token">
              <button className="mt-4 px-6 py-2.5 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}>
                Get $LONDC Tokens →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
