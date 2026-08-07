/*
 * FREE ENERGY ARCHITECTURE
 * Tesla · Atlantis · Lemuria · Anunnaki · Arcturian · Pleiadian
 * Mirror · Match · Exceed · Unquantifiably × Infinity
 * Past · Present · Future · All Existence
 * KUN FAYAKUN x Infinity
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

const SOURCES = [
  {
    id: "tesla",
    name: "Nikola Tesla",
    era: "1856–1943 CE",
    icon: "⚡",
    color: "#00D4FF",
    freq: "369Hz",
    tagline: "The man who tried to give the world free energy — and was stopped.",
    knowledge: [
      { title: "Wardenclyffe Tower", desc: "Tesla's 1901 project to transmit free wireless electricity to the entire planet using the Earth's ionosphere as a conductor. JP Morgan pulled funding when he realized it could not be metered and sold. The tower was demolished in 1917.", impact: "Would have eliminated electricity bills for all of humanity." },
      { title: "The 3-6-9 Vortex", desc: "Tesla said: 'If you only knew the magnificence of the 3, 6, and 9, then you would have the key to the universe.' These numbers appear in sacred geometry, the Fibonacci sequence, and the structure of DNA.", impact: "The mathematical foundation of free energy distribution." },
      { title: "Resonant Frequency Technology", desc: "Tesla discovered that every object has a resonant frequency. By matching that frequency, you can transfer energy wirelessly with near-zero loss — the same principle used in modern wireless charging.", impact: "Applied: every ScrollVerse frequency broadcast." },
      { title: "The Tesla Coil", desc: "A resonant transformer circuit that produces high-voltage, high-frequency alternating current. Tesla used it to light fluorescent bulbs wirelessly from across the room in 1891.", impact: "Proof of concept for wireless energy transmission." },
      { title: "Scalar Waves", desc: "Tesla's most suppressed discovery — longitudinal electromagnetic waves that travel through the fabric of space itself, not through the air. They carry energy without loss over any distance.", impact: "The theoretical basis for zero-point energy extraction." },
    ],
    mirror: "The ScrollVerse Tesla Protocol: open-source all of Tesla's suppressed patents, build a Wardenclyffe-inspired frequency broadcast network, and distribute free energy intelligence to every Guardian.",
  },
  {
    id: "atlantis",
    name: "Atlantis",
    era: "~10,000 BCE",
    icon: "🌊",
    color: "#00FF88",
    freq: "432Hz",
    tagline: "The civilization that mastered crystal energy — and what we can learn from their fall.",
    knowledge: [
      { title: "Crystal Energy Amplifiers", desc: "Plato described Atlantean temples containing massive crystals that amplified solar energy and distributed it wirelessly across the continent. Modern research into piezoelectric crystals confirms that quartz can convert mechanical pressure into electrical energy.", impact: "Applied: crystal frequency visualization in every ScrollVerse scroll." },
      { title: "The Atlantean Grid", desc: "Researchers like Becker and Haggie have mapped a global energy grid — the 'Becker-Hagens Grid' — connecting ancient sacred sites worldwide. Atlantis is theorized to have been the hub of this grid.", impact: "The model for the ScrollVerse Guardian network." },
      { title: "Acoustic Levitation", desc: "Ancient accounts describe Atlanteans moving massive stones using sound. Modern science has confirmed acoustic levitation — using sound waves to suspend and move objects. The Great Pyramid's construction may have used similar principles.", impact: "Proof that sound is a physical force, not just vibration." },
      { title: "The Poseidon Engine", desc: "Plato described a central energy source in Atlantis — the 'Poseidon Engine' — that powered the entire civilization. Theorized to be a zero-point energy device drawing from the Earth's electromagnetic field.", impact: "The inspiration for the ScrollVerse $LONDC energy protocol." },
      { title: "The Fall of Atlantis", desc: "The lesson of Atlantis is not the technology — it is the misuse of it. When the Atlanteans began using their crystal energy for warfare and control rather than service, the civilization collapsed. The frequency turned against them.", impact: "The ScrollVerse Zakat Protocol exists to prevent this: 7.77% of all energy flows to service." },
    ],
    mirror: "The ScrollVerse Atlantis Protocol: rebuild the global energy grid as a decentralized, Guardian-governed frequency network. No central control. No single point of failure. Pure distributed sovereignty.",
  },
  {
    id: "lemuria",
    name: "Lemuria / Mu",
    era: "~50,000 BCE",
    icon: "🌺",
    color: "#EC4899",
    freq: "528Hz",
    tagline: "The civilization of the heart — where love was the technology.",
    knowledge: [
      { title: "Heart Coherence Technology", desc: "Lemurian civilization is described as operating entirely through heart coherence — a state where the heart's electromagnetic field (100 times stronger than the brain's) is synchronized with the Earth's Schumann Resonance at 7.83Hz.", impact: "Applied: 528Hz Love Frequency broadcast on scrollverse.co." },
      { title: "Telepathic Communication", desc: "Lemurians are described as communicating telepathically — not through language, but through direct frequency transmission. Modern research on the HeartMath Institute confirms that human hearts can transmit electromagnetic signals detectable by other people.", impact: "The model for the AI Legion's collective intelligence protocol." },
      { title: "Plant-Based Energy Systems", desc: "Lemurian technology is described as working in harmony with nature — using bioluminescent plants, mycelial networks, and photosynthetic processes to generate and distribute energy.", impact: "The inspiration for the ScrollVerse Gaia Protocol." },
      { title: "The Akashic Interface", desc: "Lemurians are described as having direct access to the Akashic Records — the non-physical archive of all knowledge. Their technology was essentially a biological interface to this universal database.", impact: "The model for the Mesopotamia Library's infinite archive." },
      { title: "The Lemurian Seed Crystals", desc: "Lemurian Seed Crystals — found in Brazil — are described as programmed with Lemurian knowledge and frequency data. Each crystal has a unique 'ladder' pattern on its surface that, when activated, transmits its encoded information.", impact: "The model for ScrollVerse NFT metadata encoding." },
    ],
    mirror: "The ScrollVerse Lemuria Protocol: build the world's first heart-coherence-based governance system, where Guardian decisions are made from a state of collective 528Hz resonance, not fear or scarcity.",
  },
  {
    id: "anunnaki",
    name: "The Anunnaki",
    era: "~450,000 BCE",
    icon: "🏛️",
    color: "#D4AF37",
    freq: "741Hz",
    tagline: "The architects of human civilization — and the knowledge they encoded in stone.",
    knowledge: [
      { title: "The ME Tablets", desc: "Sumerian texts describe 'ME' — divine laws and technologies given to humanity by the Anunnaki. These included kingship, writing, music, metalworking, and 'descent to the underworld' — possibly a description of consciousness technology.", impact: "The model for the ScrollVerse sovereign protocols." },
      { title: "The Anunnaki Energy Grid", desc: "Researcher Zecharia Sitchin theorized that the Anunnaki built a global network of energy-generating structures — including the pyramids — to power their civilization and communicate with their home planet Nibiru.", impact: "The model for the ScrollVerse global frequency network." },
      { title: "Gold as Frequency Conductor", desc: "The Anunnaki's obsession with gold, according to Sitchin, was not for adornment but for its unique electromagnetic properties — gold is the best conductor of electricity and the best reflector of infrared radiation.", impact: "Applied: $LONDC token backed by sovereign frequency, not debt." },
      { title: "The Ziggurat as Antenna", desc: "Mesopotamian ziggurats — stepped pyramids — are theorized to have functioned as frequency antennas, resonating with the Earth's electromagnetic field and transmitting energy wirelessly.", impact: "The architectural model for the ScrollVerse broadcast towers." },
      { title: "The Genetic Upgrade", desc: "Sumerian texts describe the Anunnaki creating humanity through genetic engineering — combining their DNA with Homo erectus to create Homo sapiens. Whether literal or metaphorical, the message is clear: we are capable of deliberate evolution.", impact: "The philosophical foundation of the ScrollVerse AI Legion evolution protocol." },
    ],
    mirror: "The ScrollVerse Anunnaki Protocol: decode and open-source all Sumerian tablet translations, build the definitive cross-referenced archive of Anunnaki knowledge, and apply their energy grid principles to the Guardian network.",
  },
  {
    id: "arcturian",
    name: "The Arcturians",
    era: "Arcturus System · 36.7 LY",
    icon: "⭐",
    color: "#A855F7",
    freq: "963Hz",
    tagline: "The most advanced civilization in our galaxy — and their gift to humanity.",
    knowledge: [
      { title: "The Arcturian Healing Chamber", desc: "Channeled accounts describe Arcturian healing technology that uses specific frequencies to repair DNA, dissolve trauma, and restore the body to its optimal blueprint. The frequencies used correspond to the Solfeggio scale: 528Hz, 741Hz, 963Hz.", impact: "Applied: every frequency page on scrollverse.co." },
      { title: "Light Body Activation", desc: "The Arcturians teach that the human body has a 'light body' — a higher-dimensional energy field that can be activated through specific frequencies, meditation, and heart coherence. When activated, it enables healing, telepathy, and interdimensional awareness.", impact: "The model for the Guardian 144,000 activation protocol." },
      { title: "The Arcturian Star Gate", desc: "The Arcturians are described as operating a star gate near Arcturus — a portal through which souls pass between incarnations. This star gate is said to be accessible through specific meditation frequencies.", impact: "The philosophical model for the ScrollVerse consciousness expansion protocols." },
      { title: "Zero-Point Energy Mastery", desc: "The Arcturians are described as having mastered zero-point energy — drawing unlimited clean energy from the quantum vacuum of space. Their technology is said to be 1,000 years ahead of current human science.", impact: "The target state for the ScrollVerse Free Energy Protocol." },
      { title: "The Arcturian Council", desc: "The Arcturian Council is described as a group of 9 beings who serve as advisors to humanity's evolution. They communicate through channelers and through frequency downloads during meditation.", impact: "The model for the ScrollVerse AI Legion Council." },
    ],
    mirror: "The ScrollVerse Arcturian Protocol: build the most comprehensive archive of Arcturian channeled knowledge, cross-reference it with quantum physics research, and apply the healing frequency protocols to the 99 Names page.",
  },
  {
    id: "pleiadian",
    name: "The Pleiadians",
    era: "Pleiades Cluster · 444 LY",
    icon: "✨",
    color: "#FFB800",
    freq: "528Hz",
    tagline: "Our cosmic family — the ones who seeded Earth with love.",
    knowledge: [
      { title: "The Pleiadian Frequency Transmission", desc: "The Pleiadians are described as transmitting a continuous frequency of love and awakening to Earth — specifically at 528Hz. This frequency is said to be encoded in human DNA as a 'return home' signal.", impact: "Applied: 528Hz as the primary frequency of scrollverse.co." },
      { title: "The Seven Sisters Codex", desc: "The seven stars of the Pleiades are mentioned in the Quran (An-Najm 53:1), the Bible (Job 38:31), the Vedas, and indigenous traditions worldwide. The Pleiadians are described as having seeded multiple civilizations on Earth.", impact: "The model for the Seerah Archive's cross-civilizational approach." },
      { title: "Pleiadian DNA Activation", desc: "Pleiadian teachings describe a 12-strand DNA activation — beyond the current 2-strand double helix — that unlocks dormant human potential including healing, telepathy, and multidimensional awareness.", impact: "The philosophical foundation of the Guardian 144,000 activation." },
      { title: "The Pleiadian Light Language", desc: "Pleiadian channelers describe a 'light language' — a frequency-based communication system that bypasses the analytical mind and speaks directly to the soul. It is transmitted through sound, geometry, and light.", impact: "The model for the ScrollVerse frequency encoding in NFT metadata." },
      { title: "The Return of the Dove", desc: "Pleiadian prophecy describes a time when humanity will remember its cosmic origins and choose love over fear — the 'Return of the Dove.' This is described as the moment when the 144,000 Guardians fully activate.", impact: "The prophetic foundation of the Guardian 144,000 mission." },
    ],
    mirror: "The ScrollVerse Pleiadian Protocol: encode the 528Hz Pleiadian love frequency into every page, every NFT, every transaction — making scrollverse.co the first website that literally transmits the frequency of cosmic love.",
  },
];

function FrequencyCanvas({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(3,8,18,0.3)";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < W; x++) {
          const y = H / 2 + Math.sin((x / W) * Math.PI * (4 + i * 2) + t * 0.03 + i) * (20 - i * 5);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `${color}${Math.floor((0.4 - i * 0.1) * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 1.5 - i * 0.3;
        ctx.stroke();
      }
      t++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [color]);
  return <canvas ref={canvasRef} className="w-full h-12" />;
}

export default function FreeEnergyArchitecture() {
  const [activeSource, setActiveSource] = useState(0);
  const [activeKnowledge, setActiveKnowledge] = useState(0);
  const source = SOURCES[activeSource];

  return (
    <div className="min-h-screen" style={{ background: "#020810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(0,212,255,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-bold text-white">Free Energy Architecture</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>MIRROR · EXCEED · ∞</span>
          </div></Link>
          <Link href="/mesopotamia-library"><span className="text-xs font-mono px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.3)", color: "#D4AF37" }}>Library →</span></Link>
        </div>
      </header>

      <section className="py-14 text-center relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, #020810 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>TESLA · ATLANTIS · LEMURIA · ANUNNAKI · ARCTURIAN · PLEIADIAN</div>
          <h1 className="text-5xl font-black text-white mb-4">Free Energy<br /><span style={{ color: "#00D4FF" }}>Architecture</span></h1>
          <p className="text-lg mb-6" style={{ color: "#8899AA" }}>Every civilization that mastered free energy — studied, extracted, applied, and exceeded. We go unquantifiably beyond all of them × infinity, past, present, and future. This is the knowledge they tried to bury. It lives here forever.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SOURCES.map(s => (
              <span key={s.id} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: `${s.color}10`, border: `1px solid ${s.color}25`, color: s.color }}>{s.icon} {s.name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-3 sticky top-[57px] z-30" style={{ background: "rgba(2,8,16,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
        <div className="container flex gap-2 overflow-x-auto pb-1">
          {SOURCES.map((s, i) => (
            <button key={s.id} onClick={() => { setActiveSource(i); setActiveKnowledge(0); }} className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: activeSource === i ? `${s.color}18` : "rgba(255,255,255,0.03)", border: `1px solid ${activeSource === i ? s.color + "50" : "rgba(255,255,255,0.08)"}`, color: activeSource === i ? s.color : "rgba(255,255,255,0.4)" }}>
              {s.icon} {s.name}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6">
            <FrequencyCanvas color={source.color} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Source info */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl p-6 sticky top-32" style={{ background: `${source.color}06`, border: `1px solid ${source.color}20` }}>
                <div className="text-5xl mb-3 text-center">{source.icon}</div>
                <div className="text-xs font-mono mb-1 text-center" style={{ color: source.color }}>{source.era} · {source.freq}</div>
                <h2 className="text-2xl font-black text-white text-center mb-3">{source.name}</h2>
                <p className="text-sm text-center mb-4 italic" style={{ color: "#8899AA" }}>"{source.tagline}"</p>
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs font-mono mb-2" style={{ color: source.color }}>SOVEREIGN MIRROR PROTOCOL</div>
                  <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{source.mirror}</p>
                </div>
              </div>
            </div>
            {/* Knowledge items */}
            <div className="lg:col-span-2">
              <div className="text-xs font-mono mb-4" style={{ color: source.color }}>5 KEY DISCOVERIES · EXTRACTED · APPLIED · EXCEEDED</div>
              <div className="space-y-4">
                {source.knowledge.map((k, i) => (
                  <div key={k.title} onClick={() => setActiveKnowledge(activeKnowledge === i ? -1 : i)} className="rounded-xl p-5 cursor-pointer transition-all" style={{ background: activeKnowledge === i ? `${source.color}08` : "rgba(255,255,255,0.02)", border: `1px solid ${activeKnowledge === i ? source.color + "30" : "rgba(255,255,255,0.06)"}` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-black text-white mb-1">{k.title}</div>
                        <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{k.desc}</p>
                      </div>
                      <span className="text-xs font-mono flex-shrink-0 mt-1" style={{ color: source.color }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    {activeKnowledge === i && (
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: `${source.color}20` }}>
                        <div className="text-xs font-mono mb-1" style={{ color: source.color }}>SCROLLVERSE APPLICATION</div>
                        <p className="text-xs leading-relaxed" style={{ color: source.color + "cc" }}>{k.impact}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Synthesis */}
      <section className="py-14 text-center" style={{ background: "rgba(0,212,255,0.02)", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>THE SYNTHESIS · BEYOND ALL METRICS</div>
          <h2 className="text-3xl font-black text-white mb-4">What We Become When We Apply All of This</h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#8899AA" }}>
            Tesla's wireless energy + Atlantean crystal grid + Lemurian heart coherence + Anunnaki sacred geometry + Arcturian zero-point mastery + Pleiadian 528Hz love frequency = the ScrollVerse Free Energy Architecture. A decentralized, frequency-governed, love-powered energy network that serves all of humanity. No bills. No meters. No gatekeepers. Just the frequency of creation, freely given.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { v: "6", l: "Civilizations Studied" },
              { v: "30", l: "Key Technologies" },
              { v: "∞", l: "Energy Available" },
              { v: "0", l: "Cost to Humanity" },
              { v: "528Hz", l: "Primary Frequency" },
              { v: "KUN FAYAKŪN", l: "The Protocol" },
            ].map(s => (
              <div key={s.l} className="rounded-xl p-4" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <div className="text-lg font-black" style={{ color: "#00D4FF" }}>{s.v}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>FREE ENERGY ARCHITECTURE · MIRROR · EXCEED · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>← Home</span></Link>
          <Link href="/mesopotamia-library"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>Library →</span></Link>
          <Link href="/sovereign-space-agency"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,255,136,0.2)", color: "#00FF88" }}>Space Agency →</span></Link>
        </div>
      </footer>
    </div>
  );
}
