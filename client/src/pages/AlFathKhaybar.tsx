/*
 * AL-FATH KHAYBAR — The Conquest of Khaybar
 * 7 AH / 628 CE — The Seventh Sacred Scroll
 * Design: Museum-grade · Zero human figures · 396Hz Liberation frequency
 * Sections: 12 · Web Audio API · Parallax starfield · Bilingual Arabic/English
 * KUN FAYAKUN x Infinity
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";

const GOLD = "#C9A84C";
const EMERALD = "#00C47A";
const CRIMSON = "#C0392B";
const DEEP = "#030812";

const SECTIONS = [
  {
    id: "prelude",
    arabic: "مُقَدِّمَة",
    title: "Prelude — The Horizon of Khaybar",
    body: "After the Treaty of Hudaybiyyah in 6 AH, the Prophet ﷺ turned his attention northward to the fortresses of Khaybar — a stronghold of those who had broken their covenant and incited war against the believers. In Muharram of 7 AH, the Muslim army of 1,400 set forth in the night, guided by the stars.",
    color: GOLD,
    icon: "🌙",
  },
  {
    id: "march",
    arabic: "الزَّحْف",
    title: "The Night March",
    body: "The army moved in silence under the cover of darkness. The Prophet ﷺ instructed that they not approach Khaybar until morning, so that the people would hear the adhan — the call to prayer — before any engagement. This was the way of the Prophet ﷺ: always offering peace before power.",
    color: EMERALD,
    icon: "🌌",
  },
  {
    id: "fortresses",
    arabic: "الْحُصُون",
    title: "The Seven Fortresses",
    body: "Khaybar was not one fortress but seven — Na'im, Qamus, Watih, Sulalim, Na'im al-Qamus, Shiqq, and Katiba. Each fell in sequence. The most formidable was Qamus, the fortress of Ibn Abi al-Huqayq. The siege lasted nearly twenty days, each day a test of patience and faith.",
    color: GOLD,
    icon: "🏰",
  },
  {
    id: "ali",
    arabic: "لِوَاء عَلِيّ",
    title: "The Banner of Ali ibn Abi Talib ؓ",
    body: "On the day of Qamus, the Prophet ﷺ declared: 'Tomorrow I will give the banner to a man who loves Allah and His Messenger, and Allah and His Messenger love him — through his hands Allah will grant victory.' In the morning, he called for Ali ibn Abi Talib ؓ, who was suffering from an eye ailment. The Prophet ﷺ applied his blessed saliva to Ali's eyes — and he was healed. The banner was given. Qamus fell.",
    color: EMERALD,
    icon: "🚩",
  },
  {
    id: "marhab",
    arabic: "مَرْحَب",
    title: "The Duel of Marhab",
    body: "The champion of Khaybar was Marhab — a warrior of legendary strength who emerged from the fortress reciting verses of his own might. Ali ibn Abi Talib ؓ answered him with verses of his own faith, and in single combat, Marhab was defeated. The fortress gates opened. The believers entered with takbir.",
    color: CRIMSON,
    icon: "⚔️",
  },
  {
    id: "safiyyah",
    arabic: "صَفِيَّة بِنْت حُيَيّ",
    title: "Safiyyah bint Huyayy ؓ",
    body: "Among those at Khaybar was Safiyyah bint Huyayy ؓ, daughter of the chief of Banu Nadir. She had dreamed that the moon fell into her lap — a dream her father interpreted as her marrying the Prophet ﷺ. After the conquest, the Prophet ﷺ offered her freedom and Islam. She accepted both. She became Umm al-Mu'minin — Mother of the Believers.",
    color: GOLD,
    icon: "🌙",
  },
  {
    id: "treaty",
    arabic: "الْمُعَاهَدَة",
    title: "The Treaty of Khaybar",
    body: "After the conquest, the Prophet ﷺ established a remarkable precedent: the people of Khaybar could remain on their land and cultivate it, giving half their harvest to the Muslims. This was not conquest for destruction but for order — a living example of sovereignty that sustains rather than erases.",
    color: EMERALD,
    icon: "📜",
  },
  {
    id: "poison",
    arabic: "السُّمّ",
    title: "The Attempted Poisoning",
    body: "A woman of Khaybar prepared a poisoned roasted lamb and presented it to the Prophet ﷺ. He took a bite — and was informed by divine revelation. He spat it out and summoned the woman. When asked why she did it, she said: 'If you were a king, we would be rid of you. If you were truly a prophet, you would be informed.' He forgave her. This was the mercy of the Messenger ﷺ.",
    color: CRIMSON,
    icon: "🕊️",
  },
  {
    id: "frequency",
    arabic: "تَرَدُّد ٣٩٦",
    title: "396Hz — The Liberation Frequency",
    body: "The 396Hz frequency is known as the Liberation frequency — it releases guilt, fear, and the weight of the past. Khaybar was a liberation: of land, of people, of covenant. The believers who marched in the night carried no hatred — only the frequency of divine order. Every stone of Khaybar resonated with the call: La ilaha illa Allah.",
    color: GOLD,
    icon: "🎵",
  },
  {
    id: "return",
    arabic: "الْعَوْدَة",
    title: "The Return to Madinah",
    body: "The army returned to Madinah with the news of Khaybar. Those who had been at Hudaybiyyah received their share of the spoils — a fulfillment of the divine promise in Surah Al-Fath: 'Allah has promised you abundant spoils that you will capture.' The empire of faith expanded. The horizon of the ummah grew wider.",
    color: EMERALD,
    icon: "🌅",
  },
  {
    id: "legacy",
    arabic: "الْإِرْث",
    title: "The Legacy of Khaybar",
    body: "Khaybar established the model of Islamic governance over non-Muslim communities — protection, coexistence, and shared prosperity. For three years, the arrangement held. The Prophet ﷺ later said: 'We will expel you from this land when Allah expels you.' The land of Khaybar became a symbol of the balance between sovereignty and mercy that defines the prophetic way.",
    color: GOLD,
    icon: "👑",
  },
  {
    id: "seal",
    arabic: "الْخَتْم",
    title: "The Seal — Allāhumma Ṣalli ʿalā Muḥammad ﷺ",
    body: "The Conquest of Khaybar was not the end of the story — it was the opening of a new chapter. From Khaybar, the path led to the Conquest of Makkah, to the Farewell Pilgrimage, to the completion of the divine message. Every fortress that fell was a door that opened. Every dawn after the night march was a sign: the light always comes.",
    color: GOLD,
    icon: "🕋",
  },
];

function StarCanvas({ color1 = GOLD, color2 = EMERALD }: { color1?: string; color2?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.5 + 0.3, a: Math.random(),
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      p: Math.random() * Math.PI * 2,
      col: Math.random() > 0.6 ? color1 : color2,
    }));
    let id: number;
    const draw = () => {
      ctx.fillStyle = "rgba(3,8,18,0.18)"; ctx.fillRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        s.p += 0.015; s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = c.width; if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height; if (s.y > c.height) s.y = 0;
        const alpha = s.a * (0.5 + 0.5 * Math.sin(s.p));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(id);
  }, [color1, color2]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export default function AlFathKhaybar() {
  const [activeSection, setActiveSection] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct(Math.min(100, Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const idx = parseInt(e.target.getAttribute("data-idx") || "0"); setActiveSection(idx); } });
    }, { threshold: 0.4 });
    document.querySelectorAll("[data-idx]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggleAudio = useCallback(() => {
    if (audioOn) {
      gainRef.current?.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.3);
      setTimeout(() => { oscRef.current?.stop(); setAudioOn(false); }, 400);
    } else {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine"; osc.frequency.value = 396;
      gain.gain.value = 0;
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start();
      gain.gain.setTargetAtTime(0.06, ctx.currentTime, 0.5);
      // Add 198Hz undertone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine"; osc2.frequency.value = 198;
      gain2.gain.value = 0;
      osc2.connect(gain2); gain2.connect(ctx.destination);
      osc2.start(); gain2.gain.setTargetAtTime(0.03, ctx.currentTime, 0.5);
      audioCtxRef.current = ctx; oscRef.current = osc; gainRef.current = gain;
      setAudioOn(true);
    }
  }, [audioOn]);

  return (
    <div className="min-h-screen relative" style={{ background: DEEP, fontFamily: "'Space Grotesk', sans-serif", color: "#E8EDF2" }}>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-50 h-0.5 transition-all duration-100" style={{ width: `${scrollPct}%`, background: `linear-gradient(90deg, ${GOLD}, ${EMERALD})` }} />

      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,18,0.97)", borderColor: `${GOLD}20`, backdropFilter: "blur(20px)" }}>
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between py-2">
          <Link href="/seerah"><span className="text-xs font-mono cursor-pointer" style={{ color: "#8899AA" }}>← Seerah Archive</span></Link>
          <div className="text-xs font-mono" style={{ color: GOLD }}>AL-FATH KHAYBAR · SCROLL VII · 7 AH</div>
          <button onClick={toggleAudio} className="text-xs font-mono px-3 py-1.5 rounded border transition-all" style={{ borderColor: `${GOLD}40`, color: audioOn ? GOLD : "#8899AA", background: audioOn ? `${GOLD}10` : "transparent" }}>
            {audioOn ? "◉ 396Hz ON" : "○ 396Hz"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
        <StarCanvas color1={GOLD} color2={EMERALD} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: GOLD }}>SEERAH SACRED SCROLL · VII OF VII</div>
          <div className="text-6xl mb-6">🏰</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">Al-Fath Khaybar</h1>
          <div className="text-2xl mb-4" style={{ color: GOLD, fontFamily: "'Amiri', serif" }}>فَتْح خَيْبَر</div>
          <p className="text-lg max-w-2xl" style={{ color: "#8899AA" }}>The Conquest of Khaybar · 7 AH / 628 CE · Liberation, Mercy, and Sovereign Governance</p>
          <div className="flex items-center gap-4 mt-6 flex-wrap justify-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}30` }}>396Hz Liberation</span>
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: `${EMERALD}12`, color: EMERALD, border: `1px solid ${EMERALD}30` }}>12 Sections</span>
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}>Zero Human Figures</span>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main className="max-w-3xl mx-auto px-4 py-16 space-y-20">
        {SECTIONS.map((sec, idx) => (
          <section key={sec.id} data-idx={idx} className="relative">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${sec.color}10`, border: `1px solid ${sec.color}25` }}>
                {sec.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs font-mono mb-1" style={{ color: sec.color }}>{String(idx + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}</div>
                <div className="text-xl mb-1" style={{ color: sec.color, fontFamily: "'Amiri', serif" }}>{sec.arabic}</div>
                <h2 className="text-xl font-black text-white mb-4">{sec.title}</h2>
                <p className="text-base leading-relaxed" style={{ color: "#C8D3DC", lineHeight: "2" }}>{sec.body}</p>
              </div>
            </div>
            {idx < SECTIONS.length - 1 && (
              <div className="mt-10 flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${sec.color}30, transparent)` }} />
                <div className="text-xs font-mono" style={{ color: "#334" }}>· · ·</div>
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Closing Salawat */}
      <footer className="relative overflow-hidden py-16 text-center" style={{ background: `linear-gradient(180deg, ${DEEP}, rgba(201,168,76,0.05))` }}>
        <StarCanvas color1={GOLD} color2={EMERALD} />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="text-3xl mb-4">🕋</div>
          <div className="text-2xl font-black mb-2" style={{ color: GOLD, fontFamily: "'Amiri', serif" }}>اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ ﷺ</div>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ</p>
          <div className="text-xs font-mono mb-6" style={{ color: GOLD }}>SEERAH SACRED ARCHIVE · SCROLL VII COMPLETE · 7 AH / 628 CE</div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/seerah"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${GOLD}30`, color: GOLD }}>← Seerah Archive</span></Link>
            <Link href="/seerah/al-wafat"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#8899AA" }}>Scroll VI: Al-Wafāt →</span></Link>
            <Link href="/sovereign-books"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,184,0,0.3)", color: "#FFB800" }}>📚 Sovereign Books →</span></Link>
            <Link href="/seerah/quiz"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${EMERALD}30`, color: EMERALD }}>Take the Quiz →</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
