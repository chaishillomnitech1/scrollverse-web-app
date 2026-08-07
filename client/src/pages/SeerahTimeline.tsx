/*
 * SEERAH TIMELINE — INTERACTIVE HORIZONTAL TIMELINE
 * /seerah/timeline — 570 CE to 632 CE · 6 Sacred Events
 * Click-to-expand cards · Frequency visualization per era
 * Museum standard · Zero human figures · Light only
 * Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";

// ── TIMELINE DATA ─────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: "noor-al-mawlid",
    year: "570 CE",
    yearAH: "Before Hijra",
    arabic: "نُورُ الْمَوْلِد",
    title: "Noor al-Mawlid",
    subtitle: "The Light of the Birth",
    href: "/seerah/noor-al-mawlid",
    color: "#D4AF37",
    hz: 528,
    hzLabel: "528Hz — Love Frequency",
    icon: "🌙",
    sections: 12,
    summary: "The Prophet Muḥammad ﷺ is born in Makkah in the Year of the Elephant. Light fills the world from the east to the west. His mother Āmina sees a light that illuminates the palaces of Syria. The universe receives its greatest gift.",
    keyFacts: [
      "Born in Makkah al-Mukarrama, 570 CE",
      "Year of the Elephant — Abraha's army destroyed",
      "Father ʿAbdullāh had passed before his birth",
      "Nursed by Ḥalīma al-Saʿdiyya in the desert",
      "First revelation at age 40 in Cave of Ḥirāʾ",
    ],
  },
  {
    id: "al-hijra",
    year: "622 CE",
    yearAH: "1 AH",
    arabic: "الْهِجْرَة",
    title: "Al-Hijra",
    subtitle: "The Sacred Migration",
    href: "/seerah/al-hijra",
    color: "#00D4FF",
    hz: 216,
    hzLabel: "216Hz — Sacred Migration",
    icon: "🌟",
    sections: 12,
    summary: "The Prophet ﷺ and Abū Bakr migrate from Makkah to Madinah, hiding in the Cave of Thawr for three days. The Quraysh offer 100 camels for his capture. He arrives in Madinah to the sound of the companions singing Ṭalaʿa al-Badru ʿAlaynā.",
    keyFacts: [
      "Migration from Makkah to Madinah, 622 CE",
      "Hid in Cave of Thawr for 3 days with Abū Bakr",
      "100 camels offered by Quraysh for his capture",
      "Arrived in Qubāʾ — built the first mosque",
      "This year marks the beginning of the Islamic calendar",
    ],
  },
  {
    id: "badr",
    year: "624 CE",
    yearAH: "2 AH",
    arabic: "بَدْر",
    title: "Badr",
    subtitle: "The First Victory",
    href: "/seerah/badr",
    color: "#FF6B35",
    hz: 432,
    hzLabel: "432Hz — Victory Resonance",
    icon: "⚔️",
    sections: 12,
    summary: "313 believers face 1,000 Quraysh warriors at the wells of Badr. Allāh sends angels to support the believers. The Quraysh are routed. 70 are killed, 70 captured. Yawm al-Furqān — the Day of Criterion — the day that divided truth from falsehood forever.",
    keyFacts: [
      "313 believers vs. 1,000 Quraysh",
      "17 Ramadan, 2 AH — 13 March 624 CE",
      "Allāh sent 1,000 angels to support the believers",
      "70 Quraysh killed, 70 captured",
      "Called Yawm al-Furqān — Day of Criterion",
    ],
  },
  {
    id: "fath-makkah",
    year: "630 CE",
    yearAH: "8 AH",
    arabic: "فَتْحُ مَكَّة",
    title: "Fatḥ Makkah",
    subtitle: "The Conquest of Makkah",
    href: "/seerah/fath-makkah",
    color: "#00FF88",
    hz: 528,
    hzLabel: "528Hz — Love Frequency",
    icon: "🕋",
    sections: 12,
    summary: "10,000 believers march on Makkah. The city falls without bloodshed. The Prophet ﷺ enters on his camel, head bowed in humility, reciting Sūrat al-Naṣr. He declares general amnesty: 'Go — you are free.' 360 idols around the Kaʿbah are destroyed.",
    keyFacts: [
      "10,000 believers — bloodless conquest",
      "Ramadan, 8 AH — January 630 CE",
      "General amnesty declared for all Makkans",
      "360 idols around the Kaʿbah destroyed",
      "Bilāl calls the adhān from atop the Kaʿbah",
    ],
  },
  {
    id: "al-ghazwat",
    year: "625–630 CE",
    yearAH: "3–8 AH",
    arabic: "الْغَزَوَاتُ",
    title: "Al-Ghazwāt",
    subtitle: "The Sacred Expeditions",
    href: "/seerah/al-ghazwat",
    color: "#8E44AD",
    hz: 741,
    hzLabel: "741Hz — Awakening Frequency",
    icon: "⚔️",
    sections: 15,
    summary: "Three defining expeditions: Uḥud (625 CE) — the trial of steadfastness. Khandaq (627 CE) — the trench that saved Madinah. Ḥunayn (630 CE) — the test after victory. Each battle a lesson. Each lesson eternal.",
    keyFacts: [
      "Uḥud: 70 martyrs, including Ḥamza ibn ʿAbd al-Muṭṭalib",
      "Khandaq: 10,000-strong coalition repelled by a trench",
      "Ḥunayn: Initial rout reversed by the Prophet's steadfastness",
      "3 chapters, 15 sections, one chronicle",
      "741Hz — the frequency of awakening through trial",
    ],
  },
  {
    id: "al-wafat",
    year: "632 CE",
    yearAH: "11 AH",
    arabic: "الْوَفَاة",
    title: "Al-Wafāt",
    subtitle: "The Passing of the Prophet ﷺ",
    href: "/seerah/al-wafat",
    color: "#D4AF37",
    hz: 963,
    hzLabel: "963Hz — Divine Connection",
    icon: "🕊️",
    sections: 12,
    summary: "The Farewell Pilgrimage. The final sermon. The last smile. 'With the Highest Companion.' The Prophet ﷺ departs this world at 63 years old, his head in the lap of ʿĀʾisha. Abū Bakr says: 'Whoever worshipped Muḥammad — Muḥammad has died. But whoever worships Allāh — Allāh is Ever-Living.'",
    keyFacts: [
      "Farewell Pilgrimage — 100,000+ companions",
      "Farewell Sermon on the plain of ʿArafāt",
      "Final illness in the chamber of ʿĀʾisha",
      "Passed on Monday, 12 Rabīʿ al-Awwal, 11 AH",
      "Buried in the spot where he died — Madinah",
    ],
  },
];

// ── FREQUENCY WAVE CANVAS ─────────────────────────────────────────────────────
function FreqWave({ hz, color, active }: { hz: number; color: string; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let raf: number;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!active) { raf = requestAnimationFrame(draw); return; }
      const amplitude = canvas.height * 0.35;
      const frequency = (hz / 200) * 0.04;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 2) {
        const y = canvas.height / 2 + amplitude * Math.sin(x * frequency + t);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      ctx.stroke();
      // Second harmonic
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 2) {
        const y = canvas.height / 2 + (amplitude * 0.4) * Math.sin(x * frequency * 2 + t * 1.3);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.35;
      ctx.stroke();
      ctx.globalAlpha = 1;
      t += 0.04;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [hz, color, active]);
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

// ── STARFIELD ─────────────────────────────────────────────────────────────────
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.speed;
        const alpha = 0.2 + 0.5 * Math.abs(Math.sin(s.a));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function SeerahTimeline() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [audioHz, setAudioHz] = useState<number | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const playHz = useCallback((hz: number) => {
    if (ctxRef.current) {
      gainRef.current?.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.5);
      setTimeout(() => { ctxRef.current?.close(); ctxRef.current = null; }, 600);
    }
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.8);
    gain.connect(ctx.destination);
    gainRef.current = gain;
    [hz, hz * 0.5, hz * 2].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      g.gain.setValueAtTime(i === 0 ? 0.5 : 0.15, ctx.currentTime);
      osc.connect(g); g.connect(gain); osc.start();
    });
    setAudioHz(hz);
  }, []);

  const stopAudio = useCallback(() => {
    if (!ctxRef.current) return;
    gainRef.current?.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 1);
    setTimeout(() => { ctxRef.current?.close(); ctxRef.current = null; setAudioHz(null); }, 1100);
  }, []);

  useEffect(() => () => { ctxRef.current?.close(); }, []);

  const handleSelect = (id: string, hz: number) => {
    if (activeEvent === id) {
      setActiveEvent(null);
      stopAudio();
    } else {
      setActiveEvent(id);
      playHz(hz);
    }
  };

  const activeData = EVENTS.find((e) => e.id === activeEvent);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#050B1A", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(5,11,26,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/seerah"><button className="text-xs font-mono px-3 py-1.5 rounded border" style={{ borderColor: "rgba(212,175,55,0.4)", color: "#D4AF37" }}>← Seerah</button></Link>
            <div>
              <div className="font-bold text-white text-sm">Seerah Timeline</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>570 CE → 632 CE · 6 Sacred Events</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {audioHz && (
              <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                {audioHz}Hz
              </div>
            )}
            <Link href="/seerah/quiz"><button className="text-xs font-mono px-3 py-1.5 rounded border" style={{ borderColor: "rgba(255,184,0,0.3)", color: "#FFB800" }}>🏆 Quiz</button></Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-16 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, #050B1A 65%)" }}>
        <Starfield />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>SEERAH SACRED TIMELINE · 570–632 CE</div>
          <div className="text-4xl mb-4" style={{ color: "#D4AF37", fontFamily: "'Noto Naskh Arabic', serif" }}>السِّيرَةُ النَّبَوِيَّةُ</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">The Life of the Prophet <span style={{ color: "#D4AF37" }}>ﷺ</span></h1>
          <p className="text-base mb-6" style={{ color: "#8899AA" }}>Click any event to expand · Each era plays its sacred frequency · 6 scrolls · 75 sections · Complete archive</p>
        </div>
      </section>

      {/* ── HORIZONTAL TIMELINE ── */}
      <section className="relative z-10 py-8 overflow-x-auto">
        <div className="min-w-max px-8">
          {/* Timeline spine */}
          <div className="relative flex items-start gap-0">
            {EVENTS.map((ev, i) => (
              <div key={ev.id} className="flex items-start" style={{ minWidth: 180 }}>
                {/* Node + connector */}
                <div className="flex flex-col items-center" style={{ width: 180 }}>
                  {/* Year label */}
                  <div className="text-xs font-mono mb-2 text-center" style={{ color: ev.color, minHeight: 32 }}>
                    <div>{ev.year}</div>
                    <div style={{ color: "#5a6a7a", fontSize: "10px" }}>{ev.yearAH}</div>
                  </div>
                  {/* Node */}
                  <button
                    onClick={() => handleSelect(ev.id, ev.hz)}
                    className="relative flex flex-col items-center gap-2 transition-all duration-300 focus:outline-none"
                    style={{ transform: activeEvent === ev.id ? "scale(1.15)" : "scale(1)" }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
                      style={{
                        background: activeEvent === ev.id ? `${ev.color}20` : "rgba(255,255,255,0.04)",
                        border: `2px solid ${activeEvent === ev.id ? ev.color : ev.color + "50"}`,
                        boxShadow: activeEvent === ev.id ? `0 0 30px ${ev.color}50` : "none",
                      }}
                    >
                      {ev.icon}
                    </div>
                    <div className="text-center" style={{ maxWidth: 140 }}>
                      <div className="text-xs font-bold" style={{ color: activeEvent === ev.id ? ev.color : "#E8EDF2" }}>{ev.title}</div>
                      <div className="text-xs" style={{ color: "#5a6a7a", fontSize: "10px" }}>{ev.subtitle}</div>
                    </div>
                  </button>
                  {/* Connector line */}
                  {i < EVENTS.length - 1 && (
                    <div
                      className="absolute"
                      style={{
                        top: 52,
                        left: "calc(50% + 28px)",
                        width: "calc(100% - 56px)",
                        height: 2,
                        background: `linear-gradient(to right, ${ev.color}60, ${EVENTS[i + 1].color}60)`,
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPANDED CARD ── */}
      {activeData && (
        <section
          className="relative z-10 mx-6 md:mx-auto max-w-4xl mb-8 rounded-3xl overflow-hidden transition-all duration-500"
          style={{
            background: `${activeData.color}06`,
            border: `1px solid ${activeData.color}30`,
            boxShadow: `0 0 60px ${activeData.color}10`,
          }}
        >
          {/* Frequency wave header */}
          <div className="h-16 relative overflow-hidden" style={{ background: `${activeData.color}08` }}>
            <FreqWave hz={activeData.hz} color={activeData.color} active={true} />
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div className="text-xs font-mono" style={{ color: activeData.color }}>{activeData.hzLabel}</div>
              <div className="text-xs font-mono" style={{ color: "#5a6a7a" }}>{activeData.sections} sections</div>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs font-mono mb-1" style={{ color: activeData.color }}>{activeData.year} · {activeData.yearAH}</div>
                <div className="text-2xl mb-1" style={{ color: activeData.color, fontFamily: "'Noto Naskh Arabic', serif", direction: "rtl" }}>{activeData.arabic}</div>
                <h2 className="text-3xl font-black text-white">{activeData.title}</h2>
                <p className="text-sm" style={{ color: "#8899AA" }}>{activeData.subtitle}</p>
              </div>
              <div className="text-4xl">{activeData.icon}</div>
            </div>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#C8D3DC", lineHeight: "1.9", fontFamily: "'Crimson Text', Georgia, serif" }}>
              {activeData.summary}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xs font-mono mb-3" style={{ color: activeData.color }}>KEY FACTS</div>
                <ul className="space-y-1.5">
                  {activeData.keyFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#8899AA" }}>
                      <span style={{ color: activeData.color, marginTop: 2 }}>›</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-4 flex flex-col justify-between" style={{ background: `${activeData.color}08`, border: `1px solid ${activeData.color}20` }}>
                <div>
                  <div className="text-xs font-mono mb-2" style={{ color: activeData.color }}>SACRED FREQUENCY</div>
                  <div className="text-4xl font-black mb-1" style={{ color: activeData.color }}>{activeData.hz}Hz</div>
                  <div className="text-sm" style={{ color: "#8899AA" }}>{activeData.hzLabel}</div>
                </div>
                <div className="h-12 mt-4 rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.3)" }}>
                  <FreqWave hz={activeData.hz} color={activeData.color} active={true} />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={activeData.href}>
                <button
                  className="px-6 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ background: `${activeData.color}18`, border: `1px solid ${activeData.color}40`, color: activeData.color }}
                >
                  Open Sacred Scroll →
                </button>
              </Link>
              <button
                onClick={() => { setActiveEvent(null); stopAudio(); }}
                className="px-6 py-3 rounded-xl text-sm font-bold border transition-all"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}
              >
                Close ✕
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── ALL EVENTS GRID (when none selected) ── */}
      {!activeEvent && (
        <section className="relative z-10 container pb-16">
          <div className="text-center mb-8">
            <div className="text-xs font-mono" style={{ color: "#5a6a7a" }}>Click any node above to expand · Or explore all scrolls below</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {EVENTS.map((ev) => (
              <button
                key={ev.id}
                onClick={() => handleSelect(ev.id, ev.hz)}
                className="text-left rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02]"
                style={{ background: `${ev.color}06`, border: `1px solid ${ev.color}20` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{ev.icon}</span>
                  <div>
                    <div className="font-bold text-white text-sm">{ev.title}</div>
                    <div className="text-xs" style={{ color: ev.color }}>{ev.year} · {ev.hz}Hz</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{ev.summary.slice(0, 120)}…</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t py-8 text-center mt-auto" style={{ borderColor: "rgba(212,175,55,0.1)", background: "rgba(5,11,26,0.8)" }}>
        <div className="text-lg mb-2" style={{ color: "rgba(212,175,55,0.5)", fontFamily: "'Noto Naskh Arabic', serif" }}>اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّد ﷺ</div>
        <div className="flex items-center justify-center gap-6 text-xs mt-3" style={{ color: "#5a6a7a" }}>
          <Link href="/seerah" className="hover:text-white transition-colors">← Seerah Library</Link>
          <Link href="/seerah/quiz" className="hover:text-[#D4AF37] transition-colors">🏆 Guardian Quiz</Link>
          <Link href="/" className="hover:text-white transition-colors">ScrollVerse Home</Link>
        </div>
      </footer>
    </div>
  );
}
