/**
 * SCROLLVERSE SEERAH — BADR SACRED SCROLL
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
 * The Battle of Badr — 17 Ramaḍān 2 AH / 13 March 624 CE
 * 313 believers vs. 1,000 — the first decisive military victory of Islām
 *
 * Design: Midnight black · Crimson gold · Zero human figures
 * Adab: Light, geometry, calligraphy, and the sword of truth only
 * Audio: 432Hz resonance — the frequency of natural harmony and courage
 * KUN FAYAKŪN × ∞
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

// ── Starfield Canvas ──────────────────────────────────────────────────────────
function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    // Stars with crimson-gold tones for Badr
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8,
      a: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.005,
      hue: Math.random() > 0.7 ? "212,175,55" : "255,100,60", // gold or crimson
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.speed;
        const alpha = 0.2 + 0.5 * Math.abs(Math.sin(s.a));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.45, zIndex: 0 }}
    />
  );
}

// ── 432Hz Web Audio ───────────────────────────────────────────────────────────
function useAudio432() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);

  const start = () => {
    if (playing) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    // 432Hz fundamental + 216Hz sub + 864Hz overtone — natural harmony triad
    const freqs = [432, 216, 864];
    const gains = [0.04, 0.025, 0.015];
    nodesRef.current = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gains[i], ctx.currentTime + 2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      return { osc, gain };
    });
    setPlaying(true);
  };

  const stop = () => {
    if (!ctxRef.current) return;
    nodesRef.current.forEach(({ gain, osc }) => {
      gain.gain.linearRampToValueAtTime(0, ctxRef.current!.currentTime + 1.5);
      osc.stop(ctxRef.current!.currentTime + 1.6);
    });
    setTimeout(() => {
      ctxRef.current?.close();
      ctxRef.current = null;
      nodesRef.current = [];
    }, 1700);
    setPlaying(false);
  };

  useEffect(() => () => { ctxRef.current?.close(); }, []);
  return { playing, start, stop, toggle: () => (playing ? stop() : start()) };
}

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Section Component ─────────────────────────────────────────────────────────
interface SectionData {
  id: string;
  part: string;
  titleEn: string;
  titleAr: string;
  verse?: string;
  verseRef?: string;
  body: string;
  accent: string;
  icon: string;
  delay?: number;
}

function ScrollSection({ section, index }: { section: SectionData; index: number }) {
  const { ref, visible } = useReveal();
  const isLeft = index % 2 === 0;
  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${(section.delay ?? 0)}ms, transform 0.7s ease ${(section.delay ?? 0)}ms`,
      }}
    >
      {/* Section connector line */}
      <div
        className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, ${section.accent}30, transparent)` }}
      />

      <div className={`flex gap-6 md:gap-10 ${isLeft ? "" : "flex-row-reverse md:flex-row"}`}>
        {/* Node */}
        <div className="flex-shrink-0 flex flex-col items-center" style={{ width: 48 }}>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 relative"
            style={{
              background: `${section.accent}12`,
              border: `2px solid ${section.accent}50`,
              boxShadow: `0 0 24px ${section.accent}20`,
            }}
          >
            {section.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-16">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: `${section.accent}12`, color: section.accent, border: `1px solid ${section.accent}25` }}
            >
              {section.part}
            </span>
          </div>

          <h2
            className="text-xl md:text-2xl font-black mb-1"
            style={{ color: section.accent }}
          >
            {section.titleEn}
          </h2>
          <div
            className="text-lg mb-4"
            style={{ fontFamily: "'Noto Naskh Arabic', serif", color: `${section.accent}80`, direction: "rtl" }}
          >
            {section.titleAr}
          </div>

          {section.verse && (
            <blockquote
              className="mb-4 pl-4 py-3 rounded-r-xl"
              style={{
                borderLeft: `3px solid ${section.accent}50`,
                background: `${section.accent}06`,
              }}
            >
              <div
                className="text-base leading-relaxed mb-1"
                style={{ fontFamily: "'Noto Naskh Arabic', serif", color: `${section.accent}90`, direction: "rtl", lineHeight: 2 }}
              >
                {section.verse}
              </div>
              {section.verseRef && (
                <div className="text-xs font-mono mt-1" style={{ color: "#5a6a7a" }}>{section.verseRef}</div>
              )}
            </blockquote>
          )}

          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#8899AA", maxWidth: 620 }}>
            {section.body}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Badr Sections Data ────────────────────────────────────────────────────────
const BADR_SECTIONS: SectionData[] = [
  {
    id: "prelude",
    part: "Prologue",
    titleEn: "The Year of Trials",
    titleAr: "عَامُ الِابْتِلَاء",
    verse: "أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ",
    verseRef: "Sūrat al-ʿAnkabūt 29:2",
    body: "Two years after the Hijra, the nascent Muslim community in Madinah faced relentless pressure. The Quraysh of Makkah had seized the property of those who emigrated, and caravans carrying the wealth of the believers passed through the trade routes of the Ḥijāz. The Prophet ﷺ received permission from Allāh to defend the community — the first permission for armed struggle in Islām.",
    accent: "#d4af37",
    icon: "📜",
    delay: 0,
  },
  {
    id: "caravan",
    part: "Section I",
    titleEn: "The Caravan of Abū Sufyān",
    titleAr: "قَافِلَةُ أَبِي سُفْيَان",
    body: "A great Qurayshi caravan led by Abū Sufyān ibn Ḥarb was returning from Syria to Makkah, laden with goods worth 50,000 dinars — wealth that had once belonged to the Muslims. The Prophet ﷺ set out with 313 companions to intercept it. Abū Sufyān, warned of their approach, sent an urgent message to Makkah: an army must come to protect the caravan.",
    accent: "#FF6B35",
    icon: "🐪",
    delay: 80,
  },
  {
    id: "army",
    part: "Section II",
    titleEn: "The Army of Quraysh",
    titleAr: "جَيْشُ قُرَيْش",
    body: "Makkah responded with a force of approximately 1,000 warriors — armored, mounted, and carrying the pride of the Arabian peninsula. They marched to the well of Badr, a crossroads of desert trade routes, accompanied by singing women and the beating of drums. The caravan slipped away safely, but Abū Jahl — the chief enemy of the Prophet ﷺ — refused to turn back. He would have his battle.",
    accent: "#8B5CF6",
    icon: "⚔️",
    delay: 160,
  },
  {
    id: "313",
    part: "Section III",
    titleEn: "The 313",
    titleAr: "ثَلَاثَةَ عَشَرَ وَثَلَاثُمِئَة",
    verse: "كَم مِّن فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللَّهِ",
    verseRef: "Sūrat al-Baqarah 2:249",
    body: "The believers numbered 313 — 83 Muhājirūn (emigrants from Makkah) and 230 Anṣār (helpers from Madinah). They had 70 camels and 2 horses between them. They were not an army by conventional measure — they were a community of faith, armed with certainty in the promise of Allāh. The Prophet ﷺ prayed through the night before the battle, his hands raised to the sky.",
    accent: "#00D4FF",
    icon: "🌙",
    delay: 240,
  },
  {
    id: "night",
    part: "Section IV",
    titleEn: "The Night Before",
    titleAr: "لَيْلَةُ بَدْر",
    body: "On the eve of battle, Allāh sent a gentle rain that settled the sand beneath the believers' feet and purified their hearts. The Quraysh camped on higher, rocky ground. The Prophet ﷺ personally arranged the ranks of the believers, straightening every line with a stick. He said: 'Stand firm, for Allāh is with you.' That night, Allāh sent sleep upon the believers as a mercy and tranquility from Him.",
    accent: "#00FF88",
    icon: "🌧️",
    delay: 320,
  },
  {
    id: "dawn",
    part: "Section V",
    titleEn: "The Dawn of Badr",
    titleAr: "فَجْرُ بَدْر",
    verse: "إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَاسْتَجَابَ لَكُمْ أَنِّي مُمِدُّكُم بِأَلْفٍ مِّنَ الْمَلَائِكَةِ مُرْدِفِينَ",
    verseRef: "Sūrat al-Anfāl 8:9",
    body: "As dawn broke on 17 Ramaḍān, 2 AH (13 March 624 CE), the Prophet ﷺ supplicated with intense fervor: 'O Allāh, if this group perishes today, You will not be worshipped on earth.' Allāh answered — sending 1,000 angels, then 3,000, then 5,000 to fight alongside the believers. The Qurʾān records this divine intervention as one of the greatest signs of Allāh's support for those who trust in Him.",
    accent: "#d4af37",
    icon: "✨",
    delay: 400,
  },
  {
    id: "battle",
    part: "Section VI",
    titleEn: "The Battle",
    titleAr: "الْمَعْرَكَة",
    body: "The battle began with single combat — three champions from each side. The Qurayshi champions fell. Then the armies clashed. The Prophet ﷺ took a handful of dust and threw it toward the enemy, saying: 'May their faces be disfigured!' The Qurʾān later revealed: 'You did not throw when you threw, but Allāh threw.' In less than an hour, the battle was decided. Seventy Qurayshi warriors were killed, including Abū Jahl. Seventy were captured.",
    accent: "#FF6B35",
    icon: "🌪️",
    delay: 480,
  },
  {
    id: "abu-jahl",
    part: "Section VII",
    titleEn: "The Fall of Abū Jahl",
    titleAr: "مَصْرَعُ أَبِي جَهْل",
    body: "Abū Jahl ibn Hishām — 'the Pharaoh of this nation' as the Prophet ﷺ called him — was struck down by two young men from the Anṣār, Muʿādh ibn ʿAmr and Muʿawwidh ibn ʿAfrāʾ. He was found dying on the battlefield. When ʿAbdullāh ibn Masʿūd came to him, Abū Jahl said: 'You have climbed high, little shepherd.' He died unrepentant — a symbol of arrogance that refuses the light.",
    accent: "#8B5CF6",
    icon: "⚖️",
    delay: 560,
  },
  {
    id: "prisoners",
    part: "Section VIII",
    titleEn: "The Prisoners of Badr",
    titleAr: "أُسَارَى بَدْر",
    verse: "مَا كَانَ لِنَبِيٍّ أَن يَكُونَ لَهُ أَسْرَىٰ حَتَّىٰ يُثْخِنَ فِي الْأَرْضِ",
    verseRef: "Sūrat al-Anfāl 8:67",
    body: "Seventy prisoners were taken. The Prophet ﷺ consulted his companions on their fate. ʿUmar ibn al-Khaṭṭāb advised execution; Abū Bakr al-Ṣiddīq advised ransom. The Prophet ﷺ chose ransom — each prisoner who could teach ten Muslim children to read and write could earn his freedom. This was the first literacy program in the history of Islām, born from the mercy of a battlefield.",
    accent: "#00D4FF",
    icon: "📖",
    delay: 640,
  },
  {
    id: "spoils",
    part: "Section IX",
    titleEn: "The Division of Spoils",
    titleAr: "قِسْمَةُ الْغَنَائِم",
    body: "The distribution of the spoils of Badr became the occasion for the revelation of Sūrat al-Anfāl — 'The Spoils of War.' Allāh established the principle: one-fifth of all war spoils belongs to Allāh, the Messenger ﷺ, the near relatives, the orphans, the poor, and the traveler. The remaining four-fifths are distributed among the fighters. Justice and mercy were encoded into the economics of victory.",
    accent: "#00FF88",
    icon: "💎",
    delay: 720,
  },
  {
    id: "significance",
    part: "Section X",
    titleEn: "The Significance of Badr",
    titleAr: "دَلَالَةُ بَدْر",
    verse: "وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ",
    verseRef: "Sūrat Āl ʿImrān 3:123",
    body: "Badr was not merely a military victory — it was a theological statement. Allāh demonstrated that truth does not require numbers, wealth, or worldly power to prevail. The 313 became a symbol for every generation: that a small, sincere community, armed with tawakkul (reliance on Allāh), can overcome forces that appear insurmountable. The companions of Badr were held in the highest esteem for the rest of their lives.",
    accent: "#d4af37",
    icon: "🌟",
    delay: 800,
  },
  {
    id: "legacy",
    part: "Epilogue",
    titleEn: "The Eternal Legacy",
    titleAr: "الْإِرْثُ الْأَبَدِي",
    body: "The Prophet ﷺ said of the companions of Badr: 'Perhaps Allāh has looked upon the people of Badr and said: Do as you wish, for I have forgiven you.' The well of Badr still exists in the Ḥijāz. The date — 17 Ramaḍān — is marked as Yawm al-Furqān, the Day of Criterion, the day Allāh separated truth from falsehood. Every generation of believers inherits the lesson of Badr: Allāh is sufficient for those who trust in Him. KUN FAYAKŪN × ∞",
    accent: "#FF6B35",
    icon: "🕋",
    delay: 880,
  },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function Badr() {
  const audio = useAudio432();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollProgress(Math.min(1, progress));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#030810", fontFamily: "'Space Grotesk', sans-serif", color: "#E8EDF2" }}
    >
      <StarfieldCanvas />

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%`, background: "linear-gradient(to right, #d4af37, #FF6B35)" }}
      />

      {/* ── NAVIGATION ── */}
      <nav
        className="relative z-10 sticky top-0"
        style={{
          background: "rgba(3,8,16,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(212,175,55,0.12)",
        }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/seerah">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg, #d4af37, #FF6B35)", color: "#030810" }}
              >
                ﷺ
              </div>
            </Link>
            <div>
              <div className="font-bold text-white text-sm">Ghazwat Badr al-Kubrā</div>
              <div className="text-xs" style={{ color: "#5a6a7a" }}>17 Ramaḍān 2 AH · 624 CE · Seerah Sacred Archive</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* 432Hz Audio Toggle */}
            <button
              onClick={audio.toggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
              style={{
                background: audio.playing ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${audio.playing ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.1)"}`,
                color: audio.playing ? "#d4af37" : "#5a6a7a",
              }}
            >
              {audio.playing ? "◉" : "◎"} 432Hz
            </button>
            <Link href="/seerah">
              <div className="text-xs" style={{ color: "#5a6a7a" }}>← Seerah Archive</div>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 container py-20 text-center">
        {/* Geometric sword / crescent ornament */}
        <div className="flex justify-center mb-8">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* Outer hexagon */}
            <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" stroke="#d4af37" strokeWidth="0.8" fill="none" opacity="0.3"/>
            {/* Inner hexagon */}
            <polygon points="50,18 82,35 82,65 50,82 18,65 18,35" stroke="#FF6B35" strokeWidth="0.6" fill="none" opacity="0.25"/>
            {/* Center star of David geometry */}
            <polygon points="50,28 61,46 50,64 39,46" stroke="#d4af37" strokeWidth="0.8" fill="rgba(212,175,55,0.04)" opacity="0.5"/>
            <polygon points="50,36 62,54 50,72 38,54" stroke="#d4af37" strokeWidth="0.5" fill="none" opacity="0.3" transform="rotate(60 50 50)"/>
            {/* Center circle */}
            <circle cx="50" cy="50" r="6" stroke="#d4af37" strokeWidth="1" fill="rgba(212,175,55,0.1)" opacity="0.7"/>
            <circle cx="50" cy="50" r="2" fill="#d4af37" opacity="0.9"/>
            {/* 6 outer dots */}
            {[0,60,120,180,240,300].map((deg, i) => (
              <circle
                key={i}
                cx={50 + 26 * Math.cos((deg - 90) * Math.PI / 180)}
                cy={50 + 26 * Math.sin((deg - 90) * Math.PI / 180)}
                r="1.5"
                fill="#FF6B35"
                opacity="0.5"
              />
            ))}
          </svg>
        </div>

        <div
          className="text-xs font-mono tracking-widest mb-4"
          style={{ color: "#FF6B35", letterSpacing: "0.2em" }}
        >
          SEERAH SACRED ARCHIVE · SCROLL III
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-3">
          Ghazwat{" "}
          <span style={{ color: "#d4af37" }}>Badr</span>
        </h1>

        <div
          className="text-3xl mb-4"
          style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "rgba(212,175,55,0.75)", direction: "rtl" }}
        >
          غَزْوَةُ بَدْرٍ الْكُبْرَى
        </div>

        <div
          className="text-lg mb-2"
          style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "rgba(255,107,53,0.7)", direction: "rtl" }}
        >
          يَوْمُ الْفُرْقَان
        </div>

        <p className="text-base max-w-2xl mx-auto leading-relaxed mb-6" style={{ color: "#8899AA" }}>
          17 Ramaḍān · 2 AH · 13 March 624 CE · The Day of Criterion
          <br />
          313 believers · 1,000 warriors of Quraysh · The first decisive victory of Islām
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
            style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
            LIVE · Scroll III of V
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37" }}
          >
            12 Sections · 432Hz Resonance
          </div>
        </div>

        {/* ṣalawāt */}
        <div
          className="text-xl mb-2"
          style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "rgba(212,175,55,0.6)", direction: "rtl" }}
        >
          اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ ﷺ
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="relative z-10 container mb-12">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3))" }} />
          <div className="text-xs font-mono tracking-widest" style={{ color: "#d4af37" }}>﷽</div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.3))" }} />
        </div>
      </div>

      {/* ── SECTIONS ── */}
      <section className="relative z-10 container pb-24">
        <div className="max-w-3xl mx-auto">
          {BADR_SECTIONS.map((section, i) => (
            <ScrollSection key={section.id} section={section} index={i} />
          ))}
        </div>
      </section>

      {/* ── CLOSING SEAL ── */}
      <section
        className="relative z-10 py-20 text-center"
        style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
      >
        <div className="container max-w-2xl mx-auto">
          {/* Gold geometric seal */}
          <div className="flex justify-center mb-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="36" stroke="#d4af37" strokeWidth="0.5" fill="none" opacity="0.3"/>
              <circle cx="40" cy="40" r="28" stroke="#FF6B35" strokeWidth="0.5" fill="none" opacity="0.2"/>
              <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" stroke="#d4af37" strokeWidth="0.8" fill="none" opacity="0.4"/>
              <circle cx="40" cy="40" r="8" stroke="#d4af37" strokeWidth="1" fill="rgba(212,175,55,0.08)" opacity="0.6"/>
              <circle cx="40" cy="40" r="2.5" fill="#d4af37" opacity="0.9"/>
            </svg>
          </div>

          <div
            className="text-2xl mb-4"
            style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "rgba(212,175,55,0.8)", direction: "rtl", lineHeight: 2 }}
          >
            وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ
          </div>
          <div className="text-sm mb-6" style={{ color: "#5a6a7a", fontStyle: "italic" }}>
            "And Allāh had already given you victory at Badr while you were few in number." — Āl ʿImrān 3:123
          </div>

          <div
            className="text-lg mb-8"
            style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "rgba(212,175,55,0.6)", direction: "rtl" }}
          >
            اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ ﷺ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِين
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/seerah/noor-al-mawlid">
              <div
                className="px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", color: "#d4af37" }}
              >
                ← Noor al-Mawlid
              </div>
            </Link>
            <Link href="/seerah">
              <div
                className="px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}
              >
                Seerah Archive →
              </div>
            </Link>
            <Link href="/seerah/al-hijra">
              <div
                className="px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}
              >
                Al-Hijra Scroll →
              </div>
            </Link>
          </div>

          <div className="mt-10 text-xs font-mono" style={{ color: "#2a3a4a" }}>
            SCROLL III · BADR · 17 RAMAḌĀN 2 AH · KUN FAYAKŪN × ∞
          </div>
        </div>
      </section>
    </div>
  );
}
