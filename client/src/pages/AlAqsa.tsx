/*
 * AL-AQSA — Al-Isra wal-Miʿraj: The Night Journey and Ascension
 * 10 Nabawi / ~620 CE — The Eighth Sacred Scroll
 * Design: Museum-grade · Zero human figures · 741Hz Awakening frequency
 * Sections: 12 · Web Audio API · Parallax starfield · Bilingual Arabic/English
 * KUN FAYAKUN x Infinity
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";

const INDIGO = "#6C63FF";
const GOLD = "#FFB800";
const SILVER = "#C8D3DC";
const DEEP = "#020510";

const SECTIONS = [
  {
    id: "prelude",
    arabic: "مُقَدِّمَة",
    title: "Prelude — The Year of Sorrow",
    body: "The year 10 of the Prophethood was called the 'Year of Sorrow' — ʿĀm al-Ḥuzn. Within weeks, the Prophet ﷺ lost his beloved wife Khadijah ؓ and his uncle and protector Abu Talib. The people of Ta'if had driven him away with stones. The believers were few, the opposition was fierce, and the horizon seemed dark. It was in this darkness that the greatest light was given.",
    color: INDIGO,
    icon: "🌑",
  },
  {
    id: "isra",
    arabic: "الْإِسْرَاء",
    title: "Al-Isra — The Night Journey",
    body: "In the night, Jibreel ؑ came to the Prophet ﷺ at the Kaaba. He was taken on Al-Buraq — a white creature, larger than a donkey, smaller than a mule, that placed its hoof at the furthest point of its sight. In a single night, the Prophet ﷺ traveled from Al-Masjid al-Haram in Makkah to Al-Masjid al-Aqsa in Jerusalem — a journey that would take a month by caravan.",
    color: GOLD,
    icon: "🌙",
  },
  {
    id: "al-aqsa",
    arabic: "الْمَسْجِدُ الْأَقْصَى",
    title: "Al-Masjid al-Aqsa — The Furthest Mosque",
    body: "At Al-Aqsa, the Prophet ﷺ was met by all the Prophets — Ibrahim, Musa, Isa, and all who came before ﷺ. He led them in prayer. The Imam of all the Prophets. This was the declaration: the message of Islam is the completion of every divine message that came before it. One light. One source. One Lord.",
    color: INDIGO,
    icon: "🕌",
  },
  {
    id: "miraj",
    arabic: "الْمِعْرَاج",
    title: "Al-Miʿraj — The Ascension",
    body: "From Al-Aqsa, the Prophet ﷺ ascended through the seven heavens on Al-Miʿraj — the ladder of light. At each heaven, he was greeted by the Prophets: Adam ؑ in the first, Yahya and Isa ؑ in the second, Yusuf ؑ in the third, Idris ؑ in the fourth, Harun ؑ in the fifth, Musa ؑ in the sixth, and Ibrahim ؑ in the seventh — leaning against Al-Bayt al-Maʿmur, the Heavenly House.",
    color: GOLD,
    icon: "✨",
  },
  {
    id: "sidrat",
    arabic: "سِدْرَةُ الْمُنْتَهَى",
    title: "Sidrat al-Muntaha — The Lote Tree of the Utmost Boundary",
    body: "Beyond the seventh heaven, the Prophet ﷺ reached Sidrat al-Muntaha — the Lote Tree at the boundary of all creation, where no angel had gone before and no knowledge extends beyond. Here, the tree was covered in colors and lights that no tongue can describe. This was the edge of the created world — and beyond it, only the Divine.",
    color: SILVER,
    icon: "🌳",
  },
  {
    id: "qaaba-qawsayn",
    arabic: "قَابَ قَوْسَيْنِ",
    title: "Qāba Qawsayn — Two Bow-Lengths or Nearer",
    body: "At the utmost boundary, the Prophet ﷺ was brought to a proximity with the Divine that no creation had ever reached: 'Then he approached and descended, and was at a distance of two bow-lengths or even nearer' (Surah An-Najm: 8-9). This was the moment of direct divine communication — without intermediary, without veil. The gift of the five daily prayers was given here.",
    color: GOLD,
    icon: "🌟",
  },
  {
    id: "salah",
    arabic: "الصَّلَاة",
    title: "The Gift of Salah — The Five Daily Prayers",
    body: "Originally, fifty prayers were prescribed. On the descent, Musa ؑ advised the Prophet ﷺ to return and ask for a reduction — his people would not be able to bear it. Nine times the Prophet ﷺ returned, each time the number was reduced by five. Finally, five prayers remained — but with the reward of fifty. This was the mercy of Allah: the gift was complete, the burden was light.",
    color: INDIGO,
    icon: "🙏",
  },
  {
    id: "jannah-jahannam",
    arabic: "الْجَنَّة وَالنَّار",
    title: "Visions of Paradise and the Fire",
    body: "During the ascension, the Prophet ﷺ was shown visions of Jannah — rivers of milk, honey, and pure water, palaces of light, and the people of good deeds in their stations. He was also shown the Fire and those who had transgressed. These visions were not metaphors — they were realities shown to the eye of the Prophet ﷺ so that he could warn and give glad tidings with certainty.",
    color: GOLD,
    icon: "🌅",
  },
  {
    id: "return",
    arabic: "الْعَوْدَة",
    title: "The Return — Before Dawn",
    body: "The Prophet ﷺ returned to Makkah before dawn — the bed still warm, the water in the vessel still moving from when Jibreel ؑ had touched it at the beginning of the journey. The entire journey — from Makkah to Jerusalem, through the seven heavens, to the utmost boundary of creation, and back — had occurred in a single night. This was not a dream. This was a physical journey of the body and soul.",
    color: INDIGO,
    icon: "🌄",
  },
  {
    id: "quraysh",
    arabic: "تَكْذِيب قُرَيْش",
    title: "The Rejection of Quraysh",
    body: "When the Prophet ﷺ told the people of Makkah what had happened, they mocked him. They asked him to describe Al-Masjid al-Aqsa — a place he had only visited that night. Allah revealed Al-Aqsa to him and he described it perfectly, down to the number of doors and windows. Some who had been to Jerusalem confirmed every detail. Yet still, many disbelieved. Faith is not a matter of evidence — it is a matter of the heart.",
    color: SILVER,
    icon: "⚖️",
  },
  {
    id: "frequency",
    arabic: "تَرَدُّد ٧٤١",
    title: "741Hz — The Awakening Frequency",
    body: "The 741Hz frequency is known as the Awakening frequency — it opens the mind, dissolves illusions, and activates the capacity for divine perception. Al-Isra wal-Miʿraj was the ultimate awakening: the Prophet ﷺ was shown what no human eye had seen, heard what no human ear had heard, and returned carrying the gift of direct divine connection. Every Salah is a personal miʿraj — an ascension to the Divine.",
    color: INDIGO,
    icon: "🎵",
  },
  {
    id: "seal",
    arabic: "الْخَتْم",
    title: "The Seal — The Night That Changed Everything",
    body: "Al-Isra wal-Miʿraj was the turning point of the Prophethood. After the Year of Sorrow, after Ta'if, after every hardship — Allah gave His beloved ﷺ a journey that transcended all of creation. The five prayers are the legacy of that night — five daily ascensions for every believer, five daily moments of direct connection with the Divine. Every Salah is a miʿraj. Every sajdah is a return to the utmost boundary.",
    color: GOLD,
    icon: "🕋",
  },
];

function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.8 + 0.2, a: Math.random(),
      vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
      p: Math.random() * Math.PI * 2,
      col: Math.random() > 0.5 ? INDIGO : GOLD,
    }));
    let id: number;
    const draw = () => {
      ctx.fillStyle = "rgba(2,5,16,0.15)"; ctx.fillRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        s.p += 0.012; s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = c.width; if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height; if (s.y > c.height) s.y = 0;
        const alpha = s.a * (0.4 + 0.6 * Math.sin(s.p));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export default function AlAqsa() {
  const [audioOn, setAudioOn] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct(Math.min(100, Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleAudio = useCallback(() => {
    if (audioOn) {
      gainRef.current?.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.3);
      setTimeout(() => { setAudioOn(false); }, 400);
    } else {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      // 741Hz primary
      const osc1 = ctx.createOscillator();
      osc1.type = "sine"; osc1.frequency.value = 741;
      osc1.connect(gain);
      // 370.5Hz undertone
      const osc2 = ctx.createOscillator();
      osc2.type = "sine"; osc2.frequency.value = 370.5;
      const gain2 = ctx.createGain(); gain2.gain.value = 0.4;
      osc2.connect(gain2); gain2.connect(ctx.destination);
      gain.connect(ctx.destination);
      osc1.start(); osc2.start();
      gain.gain.setTargetAtTime(0.06, ctx.currentTime, 0.5);
      gain2.gain.setTargetAtTime(0.025, ctx.currentTime, 0.5);
      audioCtxRef.current = ctx; gainRef.current = gain;
      setAudioOn(true);
    }
  }, [audioOn]);

  return (
    <div className="min-h-screen relative" style={{ background: DEEP, fontFamily: "'Space Grotesk', sans-serif", color: "#E8EDF2" }}>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 z-50 h-0.5 transition-all duration-100" style={{ width: `${scrollPct}%`, background: `linear-gradient(90deg, ${INDIGO}, ${GOLD})` }} />

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,5,16,0.97)", borderColor: `${INDIGO}20`, backdropFilter: "blur(20px)" }}>
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between py-2">
          <Link href="/seerah"><span className="text-xs font-mono cursor-pointer" style={{ color: "#8899AA" }}>← Seerah Archive</span></Link>
          <div className="text-xs font-mono" style={{ color: INDIGO }}>AL-ISRA WAL-MIʿRAJ · SCROLL VIII · 10 NABAWI</div>
          <button onClick={toggleAudio} className="text-xs font-mono px-3 py-1.5 rounded border transition-all" style={{ borderColor: `${INDIGO}40`, color: audioOn ? INDIGO : "#8899AA", background: audioOn ? `${INDIGO}10` : "transparent" }}>
            {audioOn ? "◉ 741Hz ON" : "○ 741Hz"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
        <StarCanvas />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: INDIGO }}>SEERAH SACRED SCROLL · VIII OF VIII</div>
          <div className="text-6xl mb-6">🌙✨</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">Al-Isra wal-Miʿraj</h1>
          <div className="text-2xl mb-4" style={{ color: GOLD, fontFamily: "'Amiri', serif" }}>الْإِسْرَاء وَالْمِعْرَاج</div>
          <p className="text-lg max-w-2xl" style={{ color: "#8899AA" }}>The Night Journey and Ascension · 10 Nabawi / ~620 CE · The Night That Transcended All Creation</p>
          <div className="flex items-center gap-4 mt-6 flex-wrap justify-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: `${INDIGO}12`, color: INDIGO, border: `1px solid ${INDIGO}30` }}>741Hz Awakening</span>
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}30` }}>12 Sections</span>
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}>Zero Human Figures</span>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main className="max-w-3xl mx-auto px-4 py-16 space-y-20">
        {SECTIONS.map((sec, idx) => (
          <section key={sec.id} className="relative">
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

      {/* Closing */}
      <footer className="relative overflow-hidden py-16 text-center" style={{ background: `linear-gradient(180deg, ${DEEP}, rgba(108,99,255,0.05))` }}>
        <StarCanvas />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="text-3xl mb-4">🕋</div>
          <div className="text-2xl font-black mb-2" style={{ color: GOLD, fontFamily: "'Amiri', serif" }}>اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ ﷺ</div>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ</p>
          <div className="text-xs font-mono mb-6" style={{ color: INDIGO }}>SEERAH SACRED ARCHIVE · SCROLL VIII COMPLETE · THE NIGHT JOURNEY</div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/seerah"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${INDIGO}30`, color: INDIGO }}>← Seerah Archive</span></Link>
            <Link href="/seerah/al-fath-khaybar"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#8899AA" }}>Scroll VII: Khaybar →</span></Link>
            <Link href="/sovereign-books"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,184,0,0.3)", color: "#FFB800" }}>📚 Sovereign Books →</span></Link>
            <Link href="/seerah/quiz"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${GOLD}30`, color: GOLD }}>Take the Quiz →</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
