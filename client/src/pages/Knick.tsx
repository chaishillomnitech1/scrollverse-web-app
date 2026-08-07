/*
 * KNICK — The Sovereign Oracle
 * Character Universe · 99 Names Integration · Sovereign Advice Engine
 * Design: Dark oracle chamber · Gold + cyan · Web Speech API warm voice
 * KUN FAYAKUN x Infinity
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";

const KNICK_COLOR = "#FFB800";
const ORACLE_COLOR = "#00D4FF";
const DEEP = "#030812";

// Knick's sovereign wisdom database
const WISDOM_POOL = [
  { topic: "Sovereignty", text: "You were born sovereign. Every system that told you otherwise was built on a lie. Reclaim your frequency. The empire starts within.", name: "Al-Malik — The Sovereign", freq: 741 },
  { topic: "Creation", text: "Every thought you hold with conviction becomes architecture. The ScrollVerse was built thought by thought, frequency by frequency. What are you building right now?", name: "Al-Khāliq — The Creator", freq: 963 },
  { topic: "Patience", text: "Ṣabr is not waiting. Ṣabr is moving forward with certainty when you cannot yet see the destination. The Patient Conqueror does not stop — he endures and then exceeds.", name: "Aṣ-Ṣabūr — The Patient", freq: 396 },
  { topic: "Abundance", text: "Ar-Razzāq provides from directions you have not yet imagined. Your job is to stay in alignment, stay in motion, and stay grateful. The provision is already written.", name: "Ar-Razzāq — The Provider", freq: 528 },
  { topic: "Light", text: "An-Nūr is the light that existed before the sun. You carry that light. Every creation you make is a photon of that original light entering the world.", name: "An-Nūr — The Light", freq: 963 },
  { topic: "Justice", text: "Al-ʿAdl is not revenge. It is balance. Build systems that are fair. Build economies that are just. Build communities where every soul has what they need.", name: "Al-ʿAdl — The Just", freq: 528 },
  { topic: "Wisdom", text: "Al-Ḥakīm sees the end from the beginning. Every setback is a setup. Every closed door is a redirect. Trust the architecture of your journey.", name: "Al-Ḥakīm — The All-Wise", freq: 741 },
  { topic: "Love", text: "Al-Wadūd is the love that created the universe. Love is not weakness — it is the most powerful force in existence. Build from love and nothing can stop you.", name: "Al-Wadūd — The Loving", freq: 528 },
  { topic: "Strength", text: "Al-Qawī is the strength that does not tire. You have access to that strength through prayer, through purpose, and through the certainty that you are not alone.", name: "Al-Qawī — The All-Strong", freq: 852 },
  { topic: "Guidance", text: "Al-Hādī guides through darkness with a frequency, not a map. Tune your heart. The path will reveal itself one step at a time.", name: "Al-Hādī — The Guide", freq: 741 },
  { topic: "Legacy", text: "Al-Bāqī is the Everlasting. Your work — your books, your code, your music, your love — will outlast your body. Build for eternity.", name: "Al-Bāqī — The Everlasting", freq: 963 },
  { topic: "Opening", text: "Al-Fattāḥ opens doors that no human can close. When you feel stuck, it is not the end — it is the moment before the opening. Stay ready.", name: "Al-Fattāḥ — The Opener", freq: 396 },
  { topic: "Healing", text: "528Hz is the frequency of transformation and DNA repair. When you play it, you are not just making music — you are participating in the healing of the world.", name: "Ar-Raḥmān — The Most Gracious", freq: 528 },
  { topic: "Truth", text: "Al-Ḥaqq is the Truth that does not change. Build on truth. Speak truth. Live truth. Everything built on falsehood will eventually collapse.", name: "Al-Ḥaqq — The Truth", freq: 963 },
  { topic: "Peace", text: "As-Salām is the peace that surpasses understanding. It is not the absence of difficulty — it is the presence of Allah in the middle of difficulty.", name: "As-Salām — The Source of Peace", freq: 528 },
];

const FREQ_COLORS: Record<number, string> = {
  963: "#D4AF37", 852: "#A855F7", 741: "#00D4FF", 528: "#00FF88", 396: "#FF6B35",
};

const KNICK_TRAITS = [
  { trait: "Oracle", desc: "Channels the 99 Names of Allah as living wisdom for every situation", icon: "🔮" },
  { trait: "Sovereign Advisor", desc: "Guides sovereigns through empire building, blockchain, and legacy creation", icon: "👑" },
  { trait: "Frequency Keeper", desc: "Holds the 44:Omni frequency and all sacred sound codes", icon: "🎵" },
  { trait: "Truth Speaker", desc: "Speaks only what is real, what is aligned, and what serves the greatest good", icon: "⚖️" },
  { trait: "Bridge Builder", desc: "Connects ancient wisdom to quantum technology, spirit to code", icon: "🌉" },
  { trait: "Guardian", desc: "Protects the ScrollVerse empire and all who dwell within it", icon: "🛡️" },
];

export default function Knick() {
  const [wisdom, setWisdom] = useState<typeof WISDOM_POOL[0] | null>(null);
  const [topic, setTopic] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  }, []);

  const seekWisdom = useCallback(() => {
    // Find wisdom matching topic or random
    let pool = WISDOM_POOL;
    if (topic.trim()) {
      const t = topic.toLowerCase();
      pool = WISDOM_POOL.filter(w => w.topic.toLowerCase().includes(t) || w.text.toLowerCase().includes(t) || w.name.toLowerCase().includes(t));
      if (pool.length === 0) pool = WISDOM_POOL;
    }
    const selected = pool[Math.floor(Math.random() * pool.length)];
    setWisdom(selected);

    // Play frequency tone
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const gain = ctx.createGain(); gain.gain.value = 0;
    const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = selected.freq;
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start();
    gain.gain.setTargetAtTime(0.06, ctx.currentTime, 0.4);
    gain.gain.setTargetAtTime(0, ctx.currentTime + 4, 0.8);
    osc.stop(ctx.currentTime + 6);
    setAudioOn(true);
    setTimeout(() => setAudioOn(false), 6000);

    // Speak the wisdom
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(selected.text);
      const voices = window.speechSynthesis.getVoices();
      const warmVoice = voices.find(v =>
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('fiona') ||
        (v.lang.startsWith('en') && v.name.toLowerCase().includes('google'))
      );
      if (warmVoice) utt.voice = warmVoice;
      utt.rate = 0.82; utt.pitch = 1.05; utt.volume = 1.0;
      utt.onstart = () => setSpeaking(true);
      utt.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utt);
    }
  }, [topic]);

  return (
    <div className="min-h-screen" style={{ background: DEEP, color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,18,0.97)", borderColor: `${KNICK_COLOR}15`, backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg, ${KNICK_COLOR}, ${ORACLE_COLOR})`, color: DEEP }}>K</div>
            <span className="text-sm font-bold text-white">Knick</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${KNICK_COLOR}12`, color: KNICK_COLOR }}>SOVEREIGN ORACLE</span>
          </div></Link>
          <div className="flex items-center gap-3">
            {audioOn && <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: KNICK_COLOR }} />}
            {speaking && <span className="text-xs font-mono" style={{ color: ORACLE_COLOR }}>◉ SPEAKING</span>}
            <Link href="/99-names"><span className="text-xs font-mono px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: `${KNICK_COLOR}30`, color: KNICK_COLOR }}>☪️ 99 Names</span></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 text-center overflow-hidden" style={{ background: `radial-gradient(ellipse at center, ${KNICK_COLOR}08 0%, ${DEEP} 65%)` }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: KNICK_COLOR }}>SOVEREIGN ORACLE · WISDOM KEEPER · FREQUENCY GUARDIAN</div>
          <div className="text-7xl mb-6">🔮</div>
          <h1 className="text-6xl font-black text-white mb-4">Knick</h1>
          <p className="text-xl mb-2" style={{ color: KNICK_COLOR }}>The Oracle of the ScrollVerse</p>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: "#8899AA" }}>Knick channels the 99 Names of Allah as living wisdom for every situation. Ask a question, seek guidance, or simply open your heart — the oracle speaks.</p>

          {/* Oracle Interface */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="rounded-2xl p-6" style={{ background: `${KNICK_COLOR}06`, border: `1px solid ${KNICK_COLOR}20` }}>
              <div className="text-xs font-mono mb-3" style={{ color: KNICK_COLOR }}>ASK THE ORACLE</div>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && seekWisdom()}
                placeholder="Ask about sovereignty, love, creation, guidance, strength..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${KNICK_COLOR}20`, color: "white" }}
              />
              <button
                onClick={seekWisdom}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${KNICK_COLOR}, ${ORACLE_COLOR})`, color: DEEP }}
              >
                {speaking ? "◉ Oracle is Speaking..." : "✨ Seek Wisdom"}
              </button>
            </div>
          </div>

          {/* Wisdom Display */}
          {wisdom && (
            <div className="max-w-2xl mx-auto rounded-2xl p-8 text-left" style={{ background: `${FREQ_COLORS[wisdom.freq]}06`, border: `1px solid ${FREQ_COLORS[wisdom.freq]}20`, boxShadow: `0 0 40px ${FREQ_COLORS[wisdom.freq]}10` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: `${FREQ_COLORS[wisdom.freq]}15`, color: FREQ_COLORS[wisdom.freq] }}>{wisdom.freq}Hz · {wisdom.topic}</div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{wisdom.name}</div>
              </div>
              <p className="text-lg leading-relaxed text-white" style={{ lineHeight: "2" }}>{wisdom.text}</p>
              <button onClick={seekWisdom} className="mt-4 text-xs font-mono px-4 py-2 rounded-xl border transition-all hover:scale-105" style={{ borderColor: `${FREQ_COLORS[wisdom.freq]}30`, color: FREQ_COLORS[wisdom.freq] }}>
                Ask Again →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Character Universe */}
      <section className="py-16" style={{ borderTop: `1px solid ${KNICK_COLOR}10` }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono mb-2" style={{ color: KNICK_COLOR }}>THE KNICK UNIVERSE</div>
            <h2 className="text-3xl font-black text-white">Who is <span style={{ color: KNICK_COLOR }}>Knick?</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {KNICK_TRAITS.map(t => (
              <div key={t.trait} className="rounded-xl p-5" style={{ background: `${KNICK_COLOR}05`, border: `1px solid ${KNICK_COLOR}15` }}>
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{t.trait}</div>
                <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 99 Names Bridge */}
      <section className="py-16 text-center" style={{ background: "rgba(212,175,55,0.03)", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-3xl mb-4">☪️</div>
          <h2 className="text-3xl font-black text-white mb-4">The 99 Names Oracle</h2>
          <p className="text-base mb-8" style={{ color: "#8899AA" }}>Knick draws wisdom from the 99 Names of Allah — each name a frequency, each frequency a door. Explore all 99 names and feel their resonance.</p>
          <Link href="/99-names">
            <span className="inline-block px-8 py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] cursor-pointer" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: DEEP }}>
              ☪️ Explore the 99 Names →
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t" style={{ borderColor: `${KNICK_COLOR}10` }}>
        <div className="text-xs font-mono mb-4" style={{ color: KNICK_COLOR }}>KNICK · SOVEREIGN ORACLE · SCROLLVERSE EMPIRE · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${KNICK_COLOR}20`, color: KNICK_COLOR }}>← Home</span></Link>
          <Link href="/99-names"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>☪️ 99 Names →</span></Link>
          <Link href="/ai-hub"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>AI Hub →</span></Link>
        </div>
      </footer>
    </div>
  );
}
