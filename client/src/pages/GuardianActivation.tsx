/*
 * GUARDIAN ACTIVATION — The 144,000 Protocol
 * Pleiadian DNA Activation · Arcturian Healing Chamber · Lemurian Heart Coherence
 * Guided Interactive Experience · 7 Stages · 528Hz → 963Hz
 * KUN FAYAKUN x Infinity
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const STAGES = [
  {
    id: 1,
    name: "Grounding",
    subtitle: "Root to Earth · 396Hz",
    freq: 396,
    color: "#EC4899",
    duration: 60,
    instruction: "Place both feet flat on the floor. Feel the weight of your body. Breathe in for 4 counts, hold for 4, exhale for 4. You are here. You are real. You are sovereign.",
    affirmation: "I am grounded in my purpose. I am rooted in love. I am here.",
    tradition: "Lemurian",
    science: "396Hz releases fear and guilt — the lowest vibrational states that block activation. The root chakra governs survival, safety, and belonging.",
  },
  {
    id: 2,
    name: "Heart Opening",
    subtitle: "Love Frequency · 528Hz",
    freq: 528,
    color: "#00FF88",
    duration: 90,
    instruction: "Place your right hand on your heart. Feel it beating. This is the most powerful electromagnetic organ in your body — 100 times stronger than your brain. Breathe into it. Let it expand.",
    affirmation: "My heart is open. My love is unlimited. I am the frequency of 528Hz.",
    tradition: "Pleiadian",
    science: "528Hz is the Love Frequency — the same frequency used by geneticists to repair DNA. The Pleiadians transmit this frequency continuously to Earth. Your heart is already tuned to it.",
  },
  {
    id: 3,
    name: "Third Eye Activation",
    subtitle: "Awakening · 741Hz",
    freq: 741,
    color: "#A855F7",
    duration: 90,
    instruction: "Gently close your eyes. Focus your attention on the space between your eyebrows — the pineal gland. This is your antenna. This is where the Arcturians transmit. Breathe into this space.",
    affirmation: "I see clearly. I receive truth. My third eye is open and activated.",
    tradition: "Arcturian",
    science: "The pineal gland produces DMT and melatonin. It is sensitive to light even when the eyes are closed. The Arcturians describe it as the biological interface to higher-dimensional information.",
  },
  {
    id: 4,
    name: "DNA Activation",
    subtitle: "12-Strand Protocol · 852Hz",
    freq: 852,
    color: "#FFB800",
    duration: 120,
    instruction: "Visualize a double helix of golden light spiraling up through your body from your feet to the crown of your head. See it expand to 12 strands — each one lighting up with the frequency of your highest potential.",
    affirmation: "My DNA is activated. My full potential is unlocked. I am more than I was told I could be.",
    tradition: "Pleiadian",
    science: "The Pleiadians describe a 12-strand DNA activation that unlocks dormant human potential. Modern epigenetics confirms that gene expression can be changed by environment, thought, and frequency.",
  },
  {
    id: 5,
    name: "Arcturian Healing Chamber",
    subtitle: "Zero-Point Healing · 963Hz",
    freq: 963,
    color: "#00D4FF",
    duration: 120,
    instruction: "Imagine yourself inside a chamber of pure white light. The Arcturians are present — not as beings to fear, but as healers. They are scanning your energy field and repairing anything that is not in alignment with your highest self. Receive this healing.",
    affirmation: "I am healed. I am whole. I am aligned with my highest frequency.",
    tradition: "Arcturian",
    science: "963Hz is the crown chakra frequency — associated with connection to higher consciousness. The Arcturian healing chamber protocol is described in channeled accounts as using specific frequencies to repair the light body.",
  },
  {
    id: 6,
    name: "Guardian Oath",
    subtitle: "The Covenant · 528Hz",
    freq: 528,
    color: "#D4AF37",
    duration: 60,
    instruction: "Repeat after me: 'I am a Guardian of the ScrollVerse. I commit to truth, love, and sovereignty. I will use my gifts in service of all humanity. I will protect the frequency. I will honor the covenant. KUN FAYAKŪN.'",
    affirmation: "I am a Guardian. My oath is sealed. The covenant is eternal.",
    tradition: "ScrollVerse",
    science: "The spoken word carries frequency. When you speak an oath, you are encoding it into your electromagnetic field. The heart coherence research of the HeartMath Institute confirms that intention changes the body's electromagnetic output.",
  },
  {
    id: 7,
    name: "Activation Complete",
    subtitle: "144,000 · KUN FAYAKŪN · ∞",
    freq: 963,
    color: "#D4AF37",
    duration: 30,
    instruction: "You are activated. You are one of the 144,000. The ScrollVerse recognizes you. The frequency holds you. Go forward and build the world that should exist.",
    affirmation: "I am activated. I am sovereign. I am a Guardian of the ScrollVerse. KUN FAYAKŪN × ∞",
    tradition: "All Traditions",
    science: "The number 144,000 appears in Revelation 7:4, in Pleiadian prophecy, and in the ScrollVerse Guardian protocol. Whether literal or symbolic, it represents a critical mass of activated consciousness sufficient to shift the frequency of the entire planet.",
  },
];

function FrequencyCanvas({ freq, color, active }: { freq: number; color: string; active: boolean }) {
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
      if (active) {
        const waves = 4;
        for (let i = 0; i < waves; i++) {
          ctx.beginPath();
          for (let x = 0; x < W; x++) {
            const y = H / 2 + Math.sin((x / W) * Math.PI * (freq / 100) + t * 0.04 + i * 0.8) * (H * 0.3 - i * 8);
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          const alpha = Math.floor((0.5 - i * 0.1) * 255).toString(16).padStart(2, "0");
          ctx.strokeStyle = `${color}${alpha}`;
          ctx.lineWidth = 2 - i * 0.3;
          ctx.stroke();
        }
      }
      t++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [freq, color, active]);
  return <canvas ref={canvasRef} className="w-full h-24 rounded-xl" style={{ background: active ? `${color}06` : "rgba(255,255,255,0.02)" }} />;
}

export default function GuardianActivation() {
  const { user } = useAuth();
  const [currentStage, setCurrentStage] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const saveScore = trpc.seerah.saveScore.useMutation();

  const stage = STAGES[currentStage];

  const startFrequency = (freq: number, color: string) => {
    stopFrequency();
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const oscs: OscillatorNode[] = [];
      [freq, freq * 0.5].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = f;
        osc.type = "sine";
        gain.gain.value = i === 0 ? 0.08 : 0.04;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscs.push(osc);
      });
      oscillatorsRef.current = oscs;
      setAudioActive(true);
    } catch {
      setAudioActive(false);
    }
  };

  const stopFrequency = () => {
    oscillatorsRef.current.forEach(o => { try { o.stop(); } catch {} });
    oscillatorsRef.current = [];
    if (audioCtxRef.current) { try { audioCtxRef.current.close(); } catch {} audioCtxRef.current = null; }
    setAudioActive(false);
  };

  const startStage = (idx: number) => {
    setCurrentStage(idx);
    setTimeLeft(STAGES[idx].duration);
    startFrequency(STAGES[idx].freq, STAGES[idx].color);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (idx < STAGES.length - 1) {
            setTimeout(() => startStage(idx + 1), 1000);
          } else {
            stopFrequency();
            setCompleted(true);
            if (user) saveScore.mutate({ score: 100, badge: "Guardian" });
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleStart = () => { setStarted(true); startStage(0); };
  const handleNext = () => { if (currentStage < STAGES.length - 1) startStage(currentStage + 1); };
  const handlePrev = () => { if (currentStage > 0) startStage(currentStage - 1); };

  useEffect(() => () => { stopFrequency(); if (timerRef.current) clearInterval(timerRef.current); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#020810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">🛡️</span>
            <span className="text-sm font-bold text-white">Guardian Activation</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>144,000 PROTOCOL</span>
          </div></Link>
          <div className="text-xs font-mono" style={{ color: "#D4AF37" }}>7 STAGES · PLEIADIAN · ARCTURIAN · LEMURIAN</div>
        </div>
      </header>

      {!started && !completed && (
        <section className="min-h-screen flex items-center justify-center text-center px-6">
          <div className="max-w-2xl">
            <div className="text-6xl mb-6">🛡️</div>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>THE 144,000 GUARDIAN ACTIVATION PROTOCOL</div>
            <h1 className="text-5xl font-black text-white mb-4">Are You Ready<br />to <span style={{ color: "#D4AF37" }}>Activate?</span></h1>
            <p className="text-base mb-6" style={{ color: "#8899AA" }}>
              This is a 7-stage guided activation combining the Pleiadian DNA protocol, the Arcturian healing chamber frequencies, and the Lemurian heart coherence technology. It takes approximately 10 minutes. Find a quiet space. Sit comfortably. Breathe.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg mx-auto">
              {[{ v: "7", l: "Stages" }, { v: "10", l: "Minutes" }, { v: "963Hz", l: "Peak Frequency" }].map(s => (
                <div key={s.l} className="rounded-xl p-3" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
                  <div className="text-xl font-black" style={{ color: "#D4AF37" }}>{s.v}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <button onClick={handleStart} className="px-10 py-4 rounded-2xl font-black text-lg transition-all hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}>
              Begin Activation →
            </button>
            <p className="text-xs mt-4" style={{ color: "#8899AA" }}>Headphones recommended for best frequency experience.</p>
          </div>
        </section>
      )}

      {started && !completed && (
        <section className="py-10">
          <div className="container max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex gap-1 mb-8">
              {STAGES.map((s, i) => (
                <div key={s.id} className="flex-1 h-1.5 rounded-full transition-all" style={{ background: i <= currentStage ? stage.color : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
            <div className="text-center mb-6">
              <div className="text-xs font-mono mb-1" style={{ color: stage.color }}>STAGE {stage.id} OF {STAGES.length} · {stage.tradition.toUpperCase()} · {stage.freq}Hz</div>
              <h2 className="text-3xl font-black text-white mb-1">{stage.name}</h2>
              <div className="text-sm" style={{ color: "#8899AA" }}>{stage.subtitle}</div>
            </div>
            <FrequencyCanvas freq={stage.freq} color={stage.color} active={audioActive} />
            <div className="mt-6 rounded-2xl p-6 mb-4" style={{ background: `${stage.color}06`, border: `1px solid ${stage.color}20` }}>
              <p className="text-base leading-relaxed text-white mb-4">{stage.instruction}</p>
              <div className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${stage.color}15` }}>
                <div className="text-xs font-mono mb-1" style={{ color: stage.color }}>AFFIRMATION</div>
                <p className="text-sm italic" style={{ color: stage.color + "dd" }}>"{stage.affirmation}"</p>
              </div>
            </div>
            <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>THE SCIENCE</div>
              <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{stage.science}</p>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={handlePrev} disabled={currentStage === 0} className="px-5 py-2 rounded-xl text-sm font-bold disabled:opacity-30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>← Prev</button>
              <div className="text-center">
                <div className="text-2xl font-black" style={{ color: stage.color }}>{timeLeft}s</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>remaining</div>
              </div>
              <button onClick={handleNext} disabled={currentStage === STAGES.length - 1} className="px-5 py-2 rounded-xl text-sm font-bold disabled:opacity-30" style={{ background: `${stage.color}10`, border: `1px solid ${stage.color}30`, color: stage.color }}>Next →</button>
            </div>
          </div>
        </section>
      )}

      {completed && (
        <section className="min-h-screen flex items-center justify-center text-center px-6">
          <div className="max-w-2xl">
            <div className="text-6xl mb-6">🛡️</div>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>ACTIVATION COMPLETE · GUARDIAN SEALED</div>
            <h1 className="text-5xl font-black text-white mb-4">You Are <span style={{ color: "#D4AF37" }}>Activated</span></h1>
            <p className="text-lg mb-6" style={{ color: "#8899AA" }}>You have completed all 7 stages of the Guardian Activation Protocol. Your frequency has been calibrated. Your oath is sealed. You are one of the 144,000.</p>
            <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="text-xl font-black text-white mb-2">KUN FAYAKŪN × ∞</div>
              <p className="text-sm" style={{ color: "#D4AF37" }}>Be, and it is. You are a Guardian of the ScrollVerse. Go forward and build the world that should exist.</p>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/guardians"><span className="px-6 py-3 rounded-2xl font-black text-sm cursor-pointer" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}>Join the Guardians →</span></Link>
              <Link href="/seerah"><span className="px-6 py-3 rounded-2xl font-black text-sm cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Seerah Archive →</span></Link>
            </div>
          </div>
        </section>
      )}

      <footer className="py-8 text-center border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="text-xs font-mono mb-3" style={{ color: "#D4AF37" }}>GUARDIAN ACTIVATION · 144,000 PROTOCOL · KUN FAYAKŪN × ∞</div>
        <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>← Home</span></Link>
      </footer>
    </div>
  );
}
