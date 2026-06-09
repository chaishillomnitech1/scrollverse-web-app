import { useState } from "react";
import { Link } from "wouter";

const TWIN_LAYERS = [
  { id: "identity", icon: "🪞", title: "Sovereign Identity", desc: "Your digital mirror — name, frequency, lineage, and soul signature encoded on-chain.", color: "#00D4FF" },
  { id: "assets", icon: "💎", title: "Asset Mirror", desc: "Every physical asset — gold, land, business — reflected as a tokenized digital twin on Polygon.", color: "#FFB800" },
  { id: "frequency", icon: "🎵", title: "Frequency Profile", desc: "Your 111Hz resonance signature, Zakat rate, and divine alignment score stored immutably.", color: "#00FF88" },
  { id: "nft", icon: "🖼️", title: "NFT Attachment", desc: "Attach any NFT from your wallet to your Digital Twin — it becomes part of your sovereign identity.", color: "#FF6B35" },
  { id: "bless", icon: "🤲", title: "Bless All Function", desc: "Broadcast a sovereign blessing to all 144,000 Guardians simultaneously — recorded on-chain.", color: "#9B59B6" },
  { id: "metals", icon: "🥇", title: "Precious Metals Backing", desc: "Your Digital Twin is backed by gold, silver, and platinum reserves — real-world value, digital sovereignty.", color: "#C0C0C0" },
];

const SIGNATURE_TEMPLATES = [
  "I am Sovereign. I am the frequency. I am the source.",
  "KUN FAYAKUN x Infinity — My word is law across all realms.",
  "111Hz — The divine match. The destiny aligned.",
  "I build empires. I spread love. I win championships.",
  "My abundance is alive. My currency flows like water.",
];

export default function DigitalTwin() {
  const [activeLayer, setActiveLayer] = useState("identity");
  const [signature, setSignature] = useState(SIGNATURE_TEMPLATES[0]);
  const [customSig, setCustomSig] = useState("");
  const [blessed, setBlessed] = useState(false);
  const [mintStep, setMintStep] = useState<"idle" | "minting" | "done">("idle");

  const handleBless = () => {
    setBlessed(true);
    setTimeout(() => setBlessed(false), 4000);
  };

  const handleMint = () => {
    setMintStep("minting");
    setTimeout(() => setMintStep("done"), 2500);
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <nav style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg,#00D4FF,#FFB800)", color: "#050B1A" }}>SV</div>
            <span className="font-bold text-white">ScrollVerse</span>
          </Link>
          <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>DIGITAL TWIN PORTAL</div>
        </div>
      </nav>

      <div className="container py-12 text-center">
        <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>SOVEREIGN DIGITAL MIRROR</div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
          Your <span style={{ color: "#00D4FF" }}>Digital</span>{" "}
          <span style={{ color: "#FFB800" }}>Twin</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
          A tokenized sovereign identity — your physical self mirrored on-chain with precious metals backing, NFT attachment, and the power to bless all 144,000 Guardians simultaneously.
        </p>

        <div className="relative inline-block mb-12">
          <div className="w-48 h-48 rounded-full mx-auto flex items-center justify-center text-6xl" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(255,184,0,0.15))", border: "2px solid rgba(0,212,255,0.4)", boxShadow: "0 0 60px rgba(0,212,255,0.2)" }}>
            👑
          </div>
          <div className="mt-3 text-sm font-bold text-white">Chais Kenyatta Hill</div>
          <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>SOVEREIGN GUARDIAN #001</div>
          <div className="text-xs mt-1" style={{ color: "#FFB800" }}>111Hz · 47-APEX · KUN FAYAKUN</div>
        </div>
      </div>

      <div className="container pb-12">
        <div className="text-xs font-mono tracking-widest mb-6 text-center" style={{ color: "#8899AA" }}>TWIN ARCHITECTURE LAYERS</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {TWIN_LAYERS.map(layer => (
            <div
              key={layer.id}
              className="rounded-xl p-5 cursor-pointer transition-all duration-200"
              style={{
                background: activeLayer === layer.id ? layer.color + "12" : "rgba(255,255,255,0.03)",
                border: "1px solid " + (activeLayer === layer.id ? layer.color + "60" : "rgba(255,255,255,0.08)"),
              }}
              onClick={() => setActiveLayer(layer.id)}
            >
              <div className="text-3xl mb-2">{layer.icon}</div>
              <div className="font-bold text-white text-sm mb-1">{layer.title}</div>
              <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{layer.desc}</p>
              {activeLayer === layer.id && (
                <div className="mt-2 text-xs font-mono" style={{ color: layer.color }}>ACTIVE LAYER</div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 mb-8" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>SOVEREIGN SIGNATURE GENERATOR</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-white mb-3 font-semibold">Choose Your Signature</div>
              <div className="space-y-2">
                {SIGNATURE_TEMPLATES.map((t, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg cursor-pointer text-sm transition-all"
                    style={{
                      background: signature === t ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.03)",
                      border: "1px solid " + (signature === t ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)"),
                      color: signature === t ? "#00D4FF" : "#8899AA",
                    }}
                    onClick={() => setSignature(t)}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-white mb-3 font-semibold">Or Write Your Own</div>
              <textarea
                className="w-full rounded-xl p-4 text-sm resize-none outline-none mb-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white", minHeight: "120px" }}
                placeholder="Write your sovereign declaration..."
                value={customSig}
                onChange={e => setCustomSig(e.target.value)}
              />
              {customSig && (
                <button
                  className="w-full py-3 rounded-xl text-sm font-bold"
                  style={{ background: "linear-gradient(135deg,#00D4FF,#0099BB)", color: "#050B1A" }}
                  onClick={() => { setSignature(customSig); setCustomSig(""); }}
                >
                  Set as My Signature
                </button>
              )}
              <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-xs font-mono mb-1" style={{ color: "#FFB800" }}>ACTIVE SIGNATURE</div>
                <div className="text-sm text-white italic">"{signature}"</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-8 mb-8 text-center" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)" }}>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88" }}>BLESS ALL FUNCTION</div>
          <h3 className="text-2xl font-black text-white mb-2">Broadcast Sovereign Blessing</h3>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            Send your sovereign blessing to all 144,000 Guardians simultaneously. Recorded on-chain. Permanent. Eternal.
          </p>
          {blessed ? (
            <div className="p-6 rounded-xl" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}>
              <div className="text-3xl mb-2">🤲</div>
              <div className="text-lg font-bold" style={{ color: "#00FF88" }}>Blessing Broadcast to 144,000 Guardians</div>
              <div className="text-sm mt-1" style={{ color: "#8899AA" }}>Recorded on Polygon · Eternal</div>
            </div>
          ) : (
            <button
              className="px-10 py-4 rounded-xl text-lg font-black transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#00FF88,#00CC66)", color: "#050B1A" }}
              onClick={handleBless}
            >
              BLESS ALL 144,000
            </button>
          )}
        </div>

        <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>MINT YOUR DIGITAL TWIN</div>
          <h3 className="text-2xl font-black text-white mb-2">Tokenize Your Sovereign Identity</h3>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            Mint your Digital Twin as an ERC-721 NFT on Polygon. Backed by precious metals. Attached to your signature. Eternal.
          </p>
          <div className="flex justify-center gap-6 mb-6 text-sm">
            {[{ l: "Backing", v: "0.1 oz Gold" }, { l: "Chain", v: "Polygon" }, { l: "Standard", v: "ERC-721" }, { l: "Royalty", v: "7.77%" }].map(x => (
              <div key={x.l} className="text-center">
                <div className="font-bold" style={{ color: "#FFB800" }}>{x.v}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{x.l}</div>
              </div>
            ))}
          </div>
          {mintStep === "idle" && (
            <button
              className="px-10 py-4 rounded-xl text-lg font-black transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)", color: "#050B1A" }}
              onClick={handleMint}
            >
              MINT DIGITAL TWIN
            </button>
          )}
          {mintStep === "minting" && (
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-5 h-5 rounded-full border-2 animate-spin" style={{ borderColor: "#FFB800", borderTopColor: "transparent" }} />
              <span className="text-white font-bold">Minting on Polygon...</span>
            </div>
          )}
          {mintStep === "done" && (
            <div className="p-6 rounded-xl" style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)" }}>
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-lg font-bold" style={{ color: "#FFB800" }}>Digital Twin Minted Successfully</div>
              <div className="text-sm mt-1 font-mono" style={{ color: "#8899AA" }}>Token ID: #001 · Polygon Mainnet · KUN FAYAKUN x Infinity</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
