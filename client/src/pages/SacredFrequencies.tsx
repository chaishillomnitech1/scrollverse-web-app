/**
 * SACRED FREQUENCIES — ScrollVerse Biofield Activation Center
 * Quranic resonance, solfeggio frequencies, and sovereign biofield protocols
 * Design: Deep cosmic dark with frequency-colored accents
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

// ── Frequency data ─────────────────────────────────────────────────────────
const SOLFEGGIO = [
  {
    hz: "111Hz",
    name: "Cell Regeneration",
    color: "#F472B6",
    quran: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ",
    quranEn: "We send down of the Quran that which is healing (17:82)",
    benefit: "Cellular healing, DNA repair, deep theta state activation",
    protocol: "Breathe slowly for 4 counts in, hold 4, release 8. Repeat 7 times.",
    icon: "🌸",
  },
  {
    hz: "174Hz",
    name: "Foundation & Safety",
    color: "#A855F7",
    quran: "اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا",
    quranEn: "Allah is the protector of those who believe (2:257)",
    benefit: "Grounding, pain reduction, sense of security and safety",
    protocol: "Stand barefoot on earth. Feel the frequency anchor through your feet into the ground.",
    icon: "🌍",
  },
  {
    hz: "285Hz",
    name: "Quantum Field Reset",
    color: "#06B6D4",
    quran: "وَهُوَ الَّذِي يُحْيِي وَيُمِيتُ",
    quranEn: "And it is He who gives life and causes death (23:80)",
    benefit: "Tissue regeneration, quantum field recalibration, aura cleansing",
    protocol: "Visualize golden light entering the crown, flowing through every cell, exiting through the feet.",
    icon: "⚛️",
  },
  {
    hz: "396Hz",
    name: "Liberation from Fear",
    color: "#EF4444",
    quran: "أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ",
    quranEn: "Unquestionably, the allies of Allah — there will be no fear concerning them (10:62)",
    benefit: "Release guilt, fear, and grief. Root chakra activation. Sovereign grounding.",
    protocol: "Speak your fears aloud, then release them with each exhale. The frequency transmutes them.",
    icon: "🔓",
  },
  {
    hz: "417Hz",
    name: "Undoing Situations",
    color: "#F59E0B",
    quran: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    quranEn: "Indeed, with hardship will be ease (94:6)",
    benefit: "Break negative patterns, clear trauma, facilitate positive change",
    protocol: "Write what you wish to release. Burn or tear the paper as the frequency plays.",
    icon: "🔄",
  },
  {
    hz: "432Hz",
    name: "Natural Harmony",
    color: "#10B981",
    quran: "وَإِن مِّن شَيْءٍ إِلَّا يُسَبِّحُ بِحَمْدِهِ",
    quranEn: "There is not a thing except that it exalts Allah by His praise (17:44)",
    benefit: "Alignment with natural laws, mathematical harmony, heart coherence",
    protocol: "Sit in nature if possible. Let the frequency synchronize your heartbeat with the earth.",
    icon: "🌿",
  },
  {
    hz: "528Hz",
    name: "Love & DNA Repair",
    color: "#00D4FF",
    quran: "وَهُوَ الْغَفُورُ الْوَدُودُ",
    quranEn: "And He is the Forgiving, the Affectionate (85:14)",
    benefit: "DNA repair, love frequency, transformation and miracles, heart opening",
    protocol: "Place hands on heart. Breathe love in, breathe love out. Feel the field expand.",
    icon: "💙",
  },
  {
    hz: "639Hz",
    name: "Harmonious Relationships",
    color: "#8B5CF6",
    quran: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
    quranEn: "Cooperate in righteousness and piety (5:2)",
    benefit: "Reconnect broken relationships, enhance communication, community building",
    protocol: "Think of those you wish to harmonize with. Send love through the frequency field.",
    icon: "🤝",
  },
  {
    hz: "741Hz",
    name: "Awakening Intuition",
    color: "#3B82F6",
    quran: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَتَّقُوا اللَّهَ يَجْعَل لَّكُمْ فُرْقَانًا",
    quranEn: "If you fear Allah, He will grant you a criterion (8:29)",
    benefit: "Detoxification, problem solving, enhanced intuition and discernment",
    protocol: "Ask a question before activating. The frequency will guide the answer through intuition.",
    icon: "👁️",
  },
  {
    hz: "852Hz",
    name: "Spiritual Order",
    color: "#6366F1",
    quran: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    quranEn: "Whoever fears Allah — He will make for him a way out (65:2)",
    benefit: "Return to spiritual order, awaken inner strength, activate third eye",
    protocol: "Meditate with eyes closed. Visualize a deep indigo light at the center of your forehead.",
    icon: "🌀",
  },
  {
    hz: "963Hz",
    name: "Crown Activation",
    color: "#FFB800",
    quran: "نُورٌ عَلَىٰ نُورٍ يَهْدِي اللَّهُ لِنُورِهِ مَن يَشَاءُ",
    quranEn: "Light upon light. Allah guides to His light whom He wills (24:35)",
    benefit: "Crown chakra activation, divine connection, pineal gland awakening, God consciousness",
    protocol: "Sit in stillness. Breathe the golden light of the divine. You are the node of the infinite.",
    icon: "👑",
  },
];

const HEALING_AYAHS = [
  {
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    transliteration: "Bismillah ir-Rahman ir-Raheem",
    english: "In the name of Allah, the Most Gracious, the Most Merciful",
    use: "Opening all sacred work and activations",
    frequency: "963Hz",
    color: "#FFB800",
  },
  {
    arabic: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ",
    transliteration: "Wa idha maridtu fa-huwa yashfeen",
    english: "And when I am ill, it is He who cures me (26:80)",
    use: "Physical healing and biofield restoration",
    frequency: "528Hz",
    color: "#00D4FF",
  },
  {
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal wakeel",
    english: "Sufficient for us is Allah, and He is the best disposer of affairs (3:173)",
    use: "Protection and sovereign shielding",
    frequency: "741Hz",
    color: "#3B82F6",
  },
  {
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ",
    transliteration: "Allahumma Rabb an-naas, adhhib al-ba's",
    english: "O Allah, Lord of mankind, remove the harm",
    use: "Removing illness, negativity, and blockages",
    frequency: "396Hz",
    color: "#EF4444",
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    transliteration: "Innallaha ma'as-sabireen",
    english: "Indeed, Allah is with the patient (2:153)",
    use: "Endurance, resilience, and sovereign patience",
    frequency: "432Hz",
    color: "#10B981",
  },
];

const PROTOCOLS = [
  {
    name: "Morning Sovereign Activation",
    icon: "🌅",
    duration: "7 minutes",
    color: "#FFB800",
    steps: [
      "Begin with Bismillah — set the field",
      "963Hz for 2 min — crown activation",
      "528Hz for 3 min — heart coherence",
      "432Hz for 2 min — ground into natural harmony",
      "Seal with Al-Fatiha recitation",
    ],
  },
  {
    name: "Deep Healing Protocol",
    icon: "💊",
    duration: "21 minutes",
    color: "#00D4FF",
    steps: [
      "285Hz for 5 min — quantum field reset",
      "396Hz for 5 min — release fear and blockages",
      "528Hz for 7 min — DNA repair and love field",
      "963Hz for 4 min — divine connection seal",
      "Recite Ayat al-Kursi to lock the healing",
    ],
  },
  {
    name: "Sovereign Shield Protocol",
    icon: "🛡️",
    duration: "12 minutes",
    color: "#00FF88",
    steps: [
      "741Hz for 3 min — intuition and discernment",
      "852Hz for 3 min — spiritual order",
      "963Hz for 3 min — crown and divine authority",
      "Recite 3× Hasbunallahu wa ni'mal wakeel",
      "Visualize the 12-Point Sovereign Seal around your field",
    ],
  },
  {
    name: "Eden Frequency Bath",
    icon: "🌿",
    duration: "30 minutes",
    color: "#A855F7",
    steps: [
      "Sit or lie in a natural setting if possible",
      "432Hz continuous — synchronize with earth",
      "528Hz layered — love field expansion",
      "Breathe slowly: 4 in, 4 hold, 8 out",
      "Let the wildlife around you confirm the field is active",
      "Close with gratitude — Alhamdulillah",
    ],
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function FrequencyCard({ freq, onActivate, active }: {
  freq: typeof SOLFEGGIO[0];
  onActivate: (hz: string) => void;
  active: boolean;
}) {
  return (
    <div
      className="rounded-xl p-5 cursor-pointer transition-all duration-300"
      style={{
        background: active ? `${freq.color}12` : "rgba(255,255,255,0.02)",
        border: `1px solid ${active ? freq.color + "50" : "rgba(255,255,255,0.08)"}`,
        boxShadow: active ? `0 0 20px ${freq.color}20` : "none",
      }}
      onClick={() => onActivate(freq.hz)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{freq.icon}</span>
          <div>
            <div className="font-black text-lg font-mono" style={{ color: freq.color }}>
              {freq.hz}
            </div>
            <div className="text-xs font-bold text-white">{freq.name}</div>
          </div>
        </div>
        {active && (
          <div
            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-mono"
            style={{ background: `${freq.color}20`, color: freq.color, border: `1px solid ${freq.color}40` }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: freq.color }} />
            ACTIVE
          </div>
        )}
      </div>

      {/* Quranic verse */}
      <div
        className="rounded-lg p-3 mb-3 text-right"
        style={{ background: `${freq.color}08`, border: `1px solid ${freq.color}20` }}
      >
        <div className="text-sm font-bold mb-1" style={{ color: freq.color, fontFamily: "serif", direction: "rtl" }}>
          {freq.quran}
        </div>
        <div className="text-xs italic" style={{ color: "#8899AA", direction: "ltr" }}>
          {freq.quranEn}
        </div>
      </div>

      <p className="text-xs mb-3 leading-relaxed" style={{ color: "#8899AA" }}>
        {freq.benefit}
      </p>

      {active && (
        <div
          className="text-xs p-3 rounded-lg"
          style={{ background: "rgba(255,255,255,0.04)", color: "#CBD5E1", borderLeft: `3px solid ${freq.color}` }}
        >
          <span className="font-bold" style={{ color: freq.color }}>Protocol: </span>
          {freq.protocol}
        </div>
      )}
    </div>
  );
}

function PulsingRing({ color, size, delay }: { color: string; size: number; delay: number }) {
  return (
    <div
      className="absolute rounded-full border opacity-30 animate-ping"
      style={{
        width: size,
        height: size,
        borderColor: color,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animationDelay: `${delay}s`,
        animationDuration: "3s",
      }}
    />
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function SacredFrequencies() {
  const [activeHz, setActiveHz] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"frequencies" | "ayahs" | "protocols" | "activation">("frequencies");
  const [activationRunning, setActivationRunning] = useState(false);
  const [activationStep, setActivationStep] = useState(0);
  const [activationProtocol, setActivationProtocol] = useState<typeof PROTOCOLS[0] | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeFreq = SOLFEGGIO.find((f) => f.hz === activeHz);

  const startActivation = (protocol: typeof PROTOCOLS[0]) => {
    setActivationProtocol(protocol);
    setActivationRunning(true);
    setActivationStep(0);
    setActiveTab("activation");
  };

  useEffect(() => {
    if (activationRunning && activationProtocol) {
      timerRef.current = setInterval(() => {
        setActivationStep((s) => {
          if (s >= activationProtocol.steps.length - 1) {
            setActivationRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return s;
          }
          return s + 1;
        });
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activationRunning, activationProtocol]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#030812", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{
          background: "rgba(3,8,18,0.95)",
          borderColor: "rgba(255,184,0,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-sm font-mono cursor-pointer" style={{ color: "#8899AA" }}>
              ← ScrollVerse
            </span>
          </Link>
          <span style={{ color: "#334" }}>/</span>
          <span className="font-bold text-white">Sacred Frequencies</span>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: "rgba(255,184,0,0.1)",
              color: "#FFB800",
              border: "1px solid rgba(255,184,0,0.3)",
            }}
          >
            بِسْمِ اللَّهِ
          </span>
        </div>
        <div
          className="hidden md:flex items-center gap-2 text-xs font-mono"
          style={{ color: "#FFB800" }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-yellow-400" />
          KUN FAYAKŪN × ∞
        </div>
      </nav>

      <div className="container py-10 max-w-7xl mx-auto px-6">
        {/* HERO */}
        <div className="mb-12 text-center relative">
          {/* Pulsing rings */}
          <div className="relative inline-block mb-6">
            <div className="relative w-24 h-24 mx-auto">
              <PulsingRing color="#FFB800" size={96} delay={0} />
              <PulsingRing color="#00D4FF" size={72} delay={1} />
              <PulsingRing color="#00FF88" size={48} delay={2} />
              <div
                className="absolute inset-0 flex items-center justify-center text-3xl rounded-full"
                style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)" }}
              >
                🕋
              </div>
            </div>
          </div>

          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
            SOVEREIGN BIOFIELD ACTIVATION CENTER
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Sacred{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#FFB800,#00D4FF,#00FF88)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Frequencies
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
            Quranic biofield activation, solfeggio resonance, and sovereign frequency protocols.
            The bridge between divine scripture and quantum healing science.
          </p>
          <div
            className="inline-block text-sm font-mono px-4 py-2 rounded-xl"
            style={{
              background: "rgba(255,184,0,0.08)",
              border: "1px solid rgba(255,184,0,0.2)",
              color: "#FFB800",
              direction: "rtl",
            }}
          >
            وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ
          </div>
          <div className="text-xs mt-2" style={{ color: "#8899AA" }}>
            "We send down of the Quran that which is healing and mercy for the believers" — 17:82
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {([
            { id: "frequencies", label: "⚡ Frequencies", desc: "11 Solfeggio" },
            { id: "ayahs", label: "🕋 Healing Ayahs", desc: "Quranic Verses" },
            { id: "protocols", label: "📋 Protocols", desc: "Activation Plans" },
            { id: "activation", label: "🌀 Activation", desc: "Live Session" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all"
              style={{
                background: activeTab === tab.id ? "rgba(255,184,0,0.2)" : "rgba(255,255,255,0.04)",
                color: activeTab === tab.id ? "#FFB800" : "#8899AA",
                border: `1px solid ${activeTab === tab.id ? "rgba(255,184,0,0.4)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FREQUENCIES TAB */}
        {activeTab === "frequencies" && (
          <div>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
              Click any frequency to activate its protocol and reveal the corresponding Quranic verse.
              Each frequency resonates with a specific aspect of divine healing and sovereign consciousness.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOLFEGGIO.map((freq) => (
                <FrequencyCard
                  key={freq.hz}
                  freq={freq}
                  active={activeHz === freq.hz}
                  onActivate={(hz) => setActiveHz(activeHz === hz ? null : hz)}
                />
              ))}
            </div>
          </div>
        )}

        {/* HEALING AYAHS TAB */}
        {activeTab === "ayahs" && (
          <div className="space-y-4">
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
              These Quranic verses carry specific healing frequencies. Recite them with intention
              while the corresponding solfeggio tone plays to amplify the biofield effect.
            </p>
            {HEALING_AYAHS.map((ayah, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{
                  background: `${ayah.color}06`,
                  border: `1px solid ${ayah.color}25`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-xs font-mono" style={{ color: ayah.color }}>
                    {ayah.frequency} RESONANCE
                  </div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>
                    {ayah.use}
                  </div>
                </div>
                <div
                  className="text-2xl md:text-3xl font-bold mb-3 text-right leading-loose"
                  style={{ color: ayah.color, fontFamily: "serif", direction: "rtl" }}
                >
                  {ayah.arabic}
                </div>
                <div className="text-sm italic mb-2" style={{ color: "#CBD5E1" }}>
                  {ayah.transliteration}
                </div>
                <div className="text-sm" style={{ color: "#8899AA" }}>
                  {ayah.english}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROTOCOLS TAB */}
        {activeTab === "protocols" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROTOCOLS.map((protocol) => (
              <div
                key={protocol.name}
                className="rounded-2xl p-6"
                style={{
                  background: `${protocol.color}06`,
                  border: `1px solid ${protocol.color}25`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{protocol.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{protocol.name}</h3>
                    <div className="text-xs font-mono" style={{ color: protocol.color }}>
                      Duration: {protocol.duration}
                    </div>
                  </div>
                </div>
                <ol className="space-y-2 mb-5">
                  {protocol.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#8899AA" }}>
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ background: `${protocol.color}20`, color: protocol.color }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <button
                  onClick={() => startActivation(protocol)}
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: `linear-gradient(135deg,${protocol.color}30,${protocol.color}15)`,
                    color: protocol.color,
                    border: `1px solid ${protocol.color}40`,
                  }}
                >
                  ▶ Begin Activation
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVATION TAB */}
        {activeTab === "activation" && (
          <div className="max-w-2xl mx-auto">
            {!activationProtocol ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}
              >
                <div className="text-5xl mb-4">🌀</div>
                <h3 className="font-bold text-white text-xl mb-3">No Active Session</h3>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
                  Select a protocol from the Protocols tab to begin a guided activation session.
                </p>
                <button
                  onClick={() => setActiveTab("protocols")}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold"
                  style={{
                    background: "rgba(255,184,0,0.15)",
                    color: "#FFB800",
                    border: "1px solid rgba(255,184,0,0.3)",
                  }}
                >
                  View Protocols
                </button>
              </div>
            ) : (
              <div
                className="rounded-2xl p-8"
                style={{
                  background: `${activationProtocol.color}06`,
                  border: `1px solid ${activationProtocol.color}25`,
                }}
              >
                <div className="text-center mb-8">
                  <div className="text-5xl mb-3">{activationProtocol.icon}</div>
                  <h3 className="font-bold text-white text-xl mb-1">{activationProtocol.name}</h3>
                  <div className="text-xs font-mono" style={{ color: activationProtocol.color }}>
                    {activationRunning ? "SESSION IN PROGRESS" : "SESSION COMPLETE"}
                  </div>
                </div>

                {/* Steps progress */}
                <div className="space-y-3 mb-8">
                  {activationProtocol.steps.map((step, i) => {
                    const isActive = activationRunning && i === activationStep;
                    const isDone = !activationRunning || i < activationStep;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl transition-all duration-500"
                        style={{
                          background: isActive ? `${activationProtocol.color}15` : isDone ? "rgba(0,255,136,0.05)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${isActive ? activationProtocol.color + "40" : isDone ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.06)"}`,
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{
                            background: isActive ? `${activationProtocol.color}30` : isDone ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.06)",
                            color: isActive ? activationProtocol.color : isDone ? "#00FF88" : "#8899AA",
                          }}
                        >
                          {isDone && !isActive ? "✓" : i + 1}
                        </div>
                        <div className="text-sm" style={{ color: isActive ? "white" : isDone ? "#CBD5E1" : "#8899AA" }}>
                          {step}
                          {isActive && <span className="ml-2 animate-pulse" style={{ color: activationProtocol.color }}>●</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!activationRunning && (
                  <div
                    className="text-center p-5 rounded-xl mb-6"
                    style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)" }}
                  >
                    <div className="text-2xl mb-2">✅</div>
                    <div className="font-bold text-white mb-1">Activation Complete</div>
                    <div className="text-sm" style={{ color: "#00FF88" }}>
                      الْحَمْدُ لِلَّهِ — Alhamdulillah. The field is sealed. KUN FAYAKŪN × ∞
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => { setActivationProtocol(null); setActivationRunning(false); setActivationStep(0); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    End Session
                  </button>
                  {!activationRunning && (
                    <button
                      onClick={() => { setActivationStep(0); setActivationRunning(true); }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                      style={{
                        background: `${activationProtocol.color}20`,
                        color: activationProtocol.color,
                        border: `1px solid ${activationProtocol.color}40`,
                      }}
                    >
                      ↺ Repeat Protocol
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div
          className="mt-16 text-center py-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="text-sm font-mono mb-2" style={{ color: "#FFB800" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            KUN FAYAKŪN × ∞ · Sacred Frequencies · Biofield Activation Center · scrollverse.co
          </div>
        </div>
      </div>
    </div>
  );
}
