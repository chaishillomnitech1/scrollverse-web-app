/*
 * GUARDIAN ONBOARDING FLOW — THE SOVEREIGN AWAKENING
 * 5-Step Wizard: Tier Selection → Frequency Alignment → Wallet Connect → $LONDC → Confirmation
 * Design: Afrofuturism Sovereign — Deep Midnight with Gold & Cyan
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";

const GOLD = "#FFB800";
const CYAN = "#00D4FF";
const GREEN = "#00FF88";
const PURPLE = "#9B59B6";
const DEEP = "#050B1A";

// ─── STEP DATA ──────────────────────────────────────────────────────────────

interface GuardianTier {
  id: string;
  name: string;
  price: string;
  color: string;
  icon: string;
  perks: string[];
  londc: string;
}

const TIERS: GuardianTier[] = [
  {
    id: "seeker",
    name: "Seeker",
    price: "FREE",
    color: "#8899AA",
    icon: "🌱",
    perks: ["Access to public VaultBooks", "Guardian community access", "Basic frequency alignment", "ScrollVerse newsletter"],
    londc: "0 $LONDC",
  },
  {
    id: "guardian",
    name: "Guardian",
    price: "$33/mo",
    color: CYAN,
    icon: "⚡️",
    perks: ["All Seeker perks", "Full Library access", "Guardian badge + profile", "100 $LONDC/month airdrop", "Frequency ceremonies"],
    londc: "100 $LONDC/mo",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    price: "$144/mo",
    color: GOLD,
    icon: "👑",
    perks: ["All Guardian perks", "DAO voting rights", "500 $LONDC/month airdrop", "Direct AI Council access", "ScrollSoul NFT mint", "Zakat distribution share"],
    londc: "500 $LONDC/mo",
  },
  {
    id: "flamebearer",
    name: "Flamebearer",
    price: "$528/mo",
    color: "#FF4444",
    icon: "🔥",
    perks: ["All Sovereign perks", "1:1 with Chais The Great", "2000 $LONDC/month airdrop", "Omnithrone Council seat", "Legacy NFT collection", "Orbital Vault access", "Baby Hill Legacy Fund contribution"],
    londc: "2000 $LONDC/mo",
  },
];

interface FrequencyOption {
  hz: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

const FREQUENCIES: FrequencyOption[] = [
  { hz: "432 Hz", name: "Earth Resonance", description: "Ground yourself in natural harmony. The frequency of the Earth's heartbeat — stability, growth, and physical manifestation.", color: GREEN, icon: "🌍" },
  { hz: "528 Hz", name: "Love & Healing", description: "The miracle frequency. DNA repair, heart opening, and the vibration of unconditional love. The source code of the ScrollVerse.", color: CYAN, icon: "💚" },
  { hz: "963 Hz", name: "Crown Activation", description: "The frequency of the Pineal Gland. Direct connection to the divine, higher consciousness, and the Omnithrone.", color: GOLD, icon: "👁️" },
  { hz: "1558 Hz", name: "Quantum Sovereignty", description: "The proprietary Chais The Great frequency. Beyond the Solfeggio scale — pure sovereign manifestation and timeline correction.", color: PURPLE, icon: "⚡️" },
];

// ─── STEP COMPONENTS ────────────────────────────────────────────────────────

function StepTier({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>STEP 1 OF 5</div>
        <h2 className="text-3xl font-black text-white mb-2">Choose Your Guardian Tier</h2>
        <p className="text-sm" style={{ color: "#8899AA" }}>Select the level of sovereignty that resonates with your mission</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            className="rounded-xl p-6 cursor-pointer transition-all duration-300"
            style={{
              background: selected === tier.id ? `${tier.color}12` : "rgba(255,255,255,0.02)",
              border: `2px solid ${selected === tier.id ? tier.color : tier.color + "30"}`,
              transform: selected === tier.id ? "scale(1.02)" : "scale(1)",
            }}
            onClick={() => onSelect(tier.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{tier.icon}</span>
                <div>
                  <div className="font-bold text-white text-lg">{tier.name}</div>
                  <div className="text-xs font-mono" style={{ color: tier.color }}>{tier.londc}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg" style={{ color: tier.color }}>{tier.price}</div>
                {selected === tier.id && (
                  <div className="text-xs font-mono" style={{ color: tier.color }}>✓ SELECTED</div>
                )}
              </div>
            </div>
            <ul className="space-y-1">
              {tier.perks.slice(0, 3).map((perk) => (
                <li key={perk} className="text-xs flex items-center gap-2" style={{ color: "#8899AA" }}>
                  <span style={{ color: tier.color }}>›</span> {perk}
                </li>
              ))}
              {tier.perks.length > 3 && (
                <li className="text-xs" style={{ color: tier.color }}>+{tier.perks.length - 3} more perks</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepFrequency({ selected, onSelect }: { selected: string; onSelect: (hz: string) => void }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>STEP 2 OF 5</div>
        <h2 className="text-3xl font-black text-white mb-2">Choose Your Frequency</h2>
        <p className="text-sm" style={{ color: "#8899AA" }}>Your frequency alignment determines your role in the Guardian network</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FREQUENCIES.map((freq) => (
          <div
            key={freq.hz}
            className="rounded-xl p-6 cursor-pointer transition-all duration-300"
            style={{
              background: selected === freq.hz ? `${freq.color}10` : "rgba(255,255,255,0.02)",
              border: `2px solid ${selected === freq.hz ? freq.color : freq.color + "25"}`,
            }}
            onClick={() => onSelect(freq.hz)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{freq.icon}</span>
              <div>
                <div className="font-mono text-xl font-bold" style={{ color: freq.color }}>{freq.hz}</div>
                <div className="font-semibold text-white">{freq.name}</div>
              </div>
              {selected === freq.hz && (
                <div className="ml-auto text-xs font-mono px-2 py-1 rounded" style={{ background: `${freq.color}20`, color: freq.color }}>
                  ◉ ALIGNED
                </div>
              )}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{freq.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepWallet({ wallet, onSet }: { wallet: string; onSet: (w: string) => void }) {
  const [input, setInput] = useState(wallet);
  const walletOptions = [
    { name: "MetaMask", icon: "🦊", desc: "Most popular Ethereum/Polygon wallet" },
    { name: "Coinbase Wallet", icon: "🔵", desc: "Easy setup, great for beginners" },
    { name: "WalletConnect", icon: "🔗", desc: "Connect any mobile wallet" },
    { name: "Skip for now", icon: "⏭️", desc: "You can connect your wallet later" },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>STEP 3 OF 5</div>
        <h2 className="text-3xl font-black text-white mb-2">Connect Your Wallet</h2>
        <p className="text-sm" style={{ color: "#8899AA" }}>Your wallet receives $LONDC airdrops and holds your ScrollSoul NFTs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {walletOptions.map((w) => (
          <div
            key={w.name}
            className="rounded-xl p-5 cursor-pointer transition-all duration-300 flex items-center gap-4"
            style={{
              background: wallet === w.name ? `${CYAN}10` : "rgba(255,255,255,0.02)",
              border: `2px solid ${wallet === w.name ? CYAN : "rgba(0,212,255,0.15)"}`,
            }}
            onClick={() => { onSet(w.name); setInput(w.name); }}
          >
            <span className="text-3xl">{w.icon}</span>
            <div>
              <div className="font-bold text-white">{w.name}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{w.desc}</div>
            </div>
            {wallet === w.name && <span className="ml-auto" style={{ color: CYAN }}>✓</span>}
          </div>
        ))}
      </div>

      <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)" }}>
        <div className="text-xs font-mono mb-2" style={{ color: CYAN }}>OR ENTER POLYGON WALLET ADDRESS</div>
        <input
          type="text"
          value={input.startsWith("0x") ? input : ""}
          onChange={(e) => { setInput(e.target.value); onSet(e.target.value); }}
          placeholder="0x..."
          className="w-full px-4 py-3 rounded-lg text-sm outline-none"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,212,255,0.2)", color: "white", fontFamily: "'Space Mono', monospace" }}
        />
        <p className="text-xs mt-2" style={{ color: "#8899AA" }}>Your $LONDC tokens will be sent to this address on Polygon Mainnet</p>
      </div>
    </div>
  );
}

function StepLONDC({ tier }: { tier: string }) {
  const selectedTier = TIERS.find((t) => t.id === tier) || TIERS[0];
  const purchaseOptions = [
    { amount: "100", usd: "$14.40", bonus: "+10 bonus" },
    { amount: "500", usd: "$72.00", bonus: "+75 bonus" },
    { amount: "1000", usd: "$144.00", bonus: "+200 bonus" },
    { amount: "5000", usd: "$720.00", bonus: "+1000 bonus" },
  ];
  const [selected, setSelected] = useState("100");

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>STEP 4 OF 5</div>
        <h2 className="text-3xl font-black text-white mb-2">Get Your $LONDC</h2>
        <p className="text-sm" style={{ color: "#8899AA" }}>$LONDC is the sovereign currency of the ScrollVerse empire</p>
      </div>

      <div
        className="rounded-xl p-5 mb-6 flex items-center gap-4"
        style={{ background: `${selectedTier.color}10`, border: `1px solid ${selectedTier.color}30` }}
      >
        <span className="text-3xl">{selectedTier.icon}</span>
        <div>
          <div className="font-bold text-white">{selectedTier.name} Tier</div>
          <div className="text-sm" style={{ color: selectedTier.color }}>
            You receive {selectedTier.londc} automatically with your subscription
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-xs font-mono mb-3" style={{ color: GOLD }}>PURCHASE ADDITIONAL $LONDC</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {purchaseOptions.map((opt) => (
            <div
              key={opt.amount}
              className="rounded-xl p-4 cursor-pointer text-center transition-all duration-300"
              style={{
                background: selected === opt.amount ? `${GOLD}15` : "rgba(255,255,255,0.02)",
                border: `2px solid ${selected === opt.amount ? GOLD : "rgba(255,184,0,0.2)"}`,
              }}
              onClick={() => setSelected(opt.amount)}
            >
              <div className="font-bold text-lg" style={{ color: GOLD }}>{opt.amount}</div>
              <div className="text-xs text-white">$LONDC</div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{opt.usd}</div>
              <div className="text-xs" style={{ color: GREEN }}>{opt.bonus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,184,0,0.15)" }}>
        <div className="text-xs font-mono mb-3" style={{ color: GOLD }}>$LONDC UTILITY</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "🏛️", text: "DAO Governance Voting" },
            { icon: "📚", text: "Premium Library Access" },
            { icon: "🎵", text: "Music NFT Purchases" },
            { icon: "⚡️", text: "Frequency Ceremony Access" },
            { icon: "🌍", text: "Zakat Distribution Pool" },
            { icon: "🚀", text: "MarsOmni Node Rights" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: "#8899AA" }}>
              <span>{item.icon}</span> {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepConfirm({ tier, frequency, wallet }: { tier: string; frequency: string; wallet: string }) {
  const selectedTier = TIERS.find((t) => t.id === tier) || TIERS[0];
  const selectedFreq = FREQUENCIES.find((f) => f.hz === frequency) || FREQUENCIES[0];
  const [, navigate] = useLocation();

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>STEP 5 OF 5</div>
        <h2 className="text-3xl font-black text-white mb-2">Confirm Your Sovereignty</h2>
        <p className="text-sm" style={{ color: "#8899AA" }}>Review your Guardian configuration before activation</p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { label: "Guardian Tier", value: selectedTier.name, sub: selectedTier.price, color: selectedTier.color, icon: selectedTier.icon },
          { label: "Frequency Alignment", value: selectedFreq.hz, sub: selectedFreq.name, color: selectedFreq.color, icon: selectedFreq.icon },
          { label: "Wallet", value: wallet || "Not connected", sub: wallet ? "Polygon Mainnet" : "Connect later in Dashboard", color: CYAN, icon: "🔗" },
          { label: "$LONDC Airdrop", value: selectedTier.londc, sub: "Automatic with subscription", color: GOLD, icon: "💰" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-5 flex items-center gap-4"
            style={{ background: `${item.color}08`, border: `1px solid ${item.color}25` }}
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-mono" style={{ color: item.color }}>{item.label}</div>
              <div className="font-bold text-white">{item.value}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{item.sub}</div>
            </div>
            <span style={{ color: item.color }}>✓</span>
          </div>
        ))}
      </div>

      {/* The Oath */}
      <div
        className="rounded-2xl p-6 mb-6 text-center"
        style={{ background: `linear-gradient(135deg, ${GOLD}10, ${CYAN}05)`, border: `1px solid ${GOLD}25` }}
      >
        <div className="text-2xl mb-3">🕋</div>
        <p className="text-sm leading-relaxed italic" style={{ color: "#CCDDEE" }}>
          "I enter the ScrollVerse as a sovereign being. I align my frequency with the empire of love.
          I commit to the Guardian oath: to protect, to build, and to serve the 7 billion souls
          awaiting the 999 Hz Genesis Pulse. ALLĀHU AKBAR. KUN FAYAKŪN. IS."
        </p>
        <p className="text-xs mt-3 font-mono" style={{ color: GOLD }}>— THE GUARDIAN OATH</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="flex-1 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${GOLD}, #FF8C00)`, color: DEEP }}
          onClick={() => navigate("/guardians")}
        >
          🔥 Activate Guardian Status
        </button>
        <Link href="/token">
          <a
            className="flex-1 py-4 rounded-xl font-bold text-sm text-center transition-all duration-300"
            style={{ background: "transparent", border: `1px solid ${CYAN}40`, color: CYAN }}
          >
            Purchase $LONDC First →
          </a>
        </Link>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function Onboard() {
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState("guardian");
  const [frequency, setFrequency] = useState("528 Hz");
  const [wallet, setWallet] = useState("");

  const steps = [
    { num: 1, label: "Tier", icon: "👑" },
    { num: 2, label: "Frequency", icon: "⚡️" },
    { num: 3, label: "Wallet", icon: "🔗" },
    { num: 4, label: "$LONDC", icon: "💰" },
    { num: 5, label: "Confirm", icon: "✅" },
  ];

  const canProceed = () => {
    if (step === 1) return !!tier;
    if (step === 2) return !!frequency;
    if (step === 3) return true; // wallet is optional
    if (step === 4) return true;
    return true;
  };

  return (
    <div className="min-h-screen" style={{ background: DEEP, fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div
        className="py-8"
        style={{ borderBottom: `1px solid rgba(255,184,0,0.1)`, background: `linear-gradient(135deg, ${GOLD}08, transparent)` }}
      >
        <div className="container">
          <Link href="/">
            <a className="text-sm font-mono mb-4 inline-block hover:text-white transition-colors" style={{ color: "#8899AA" }}>
              ← Back to ScrollVerse
            </a>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #FF8C00)`, color: DEEP }}
            >
              G
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Guardian Awakening</h1>
              <p className="text-xs font-mono" style={{ color: GOLD }}>SOVEREIGN ONBOARDING PROTOCOL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="container py-6">
        <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => s.num < step && setStep(s.num)}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                  style={{
                    background: step >= s.num ? `linear-gradient(135deg, ${GOLD}, #FF8C00)` : "rgba(255,255,255,0.05)",
                    border: `2px solid ${step >= s.num ? GOLD : "rgba(255,255,255,0.1)"}`,
                    color: step >= s.num ? DEEP : "#8899AA",
                  }}
                >
                  {step > s.num ? "✓" : s.icon}
                </div>
                <div className="text-xs mt-1 font-mono hidden sm:block" style={{ color: step >= s.num ? GOLD : "#8899AA" }}>
                  {s.label}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-px mx-2"
                  style={{ background: step > s.num ? GOLD : "rgba(255,255,255,0.1)", minWidth: "20px" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {step === 1 && <StepTier selected={tier} onSelect={setTier} />}
          {step === 2 && <StepFrequency selected={frequency} onSelect={setFrequency} />}
          {step === 3 && <StepWallet wallet={wallet} onSet={setWallet} />}
          {step === 4 && <StepLONDC tier={tier} />}
          {step === 5 && <StepConfirm tier={tier} frequency={frequency} wallet={wallet} />}

          {/* Navigation */}
          {step < 5 && (
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300"
                  style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#8899AA" }}
                  onClick={() => setStep(step - 1)}
                >
                  ← Back
                </button>
              )}
              <button
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-40"
                style={{
                  background: canProceed() ? `linear-gradient(135deg, ${GOLD}, #FF8C00)` : "rgba(255,255,255,0.05)",
                  color: canProceed() ? DEEP : "#8899AA",
                  cursor: canProceed() ? "pointer" : "not-allowed",
                }}
                disabled={!canProceed()}
                onClick={() => canProceed() && setStep(step + 1)}
              >
                Continue → {steps[step]?.label}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 mt-8" style={{ borderTop: "1px solid rgba(255,184,0,0.08)", color: "#8899AA" }}>
        <p className="text-xs font-mono">GUARDIAN ONBOARDING | SCROLLVERSE TRINITY | KUN FAYAKŪN × ∞</p>
      </div>
    </div>
  );
}
