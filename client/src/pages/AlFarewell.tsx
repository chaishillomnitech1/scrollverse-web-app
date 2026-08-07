/*
 * AL-FAREWELL — Ḥajjat al-Wadāʿ: The Farewell Pilgrimage
 * 10 AH / 632 CE — The Ninth Sacred Scroll
 * Design: Museum-grade · Zero human figures · 852Hz Intuition frequency
 * Sections: 12 · Web Audio API · Parallax starfield · Bilingual Arabic/English
 * KUN FAYAKUN x Infinity
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";

const ROSE = "#E8A0BF";
const GOLD = "#FFB800";
const DEEP = "#030810";

const SECTIONS = [
  {
    id: "prelude",
    arabic: "مُقَدِّمَة",
    title: "Prelude — The Tenth Year",
    body: "By the tenth year of the Hijra, the Arabian Peninsula had embraced Islam. The Prophet ﷺ had not performed Hajj since the migration to Madinah — nine years had passed. In Dhul-Qaʿdah of 10 AH, he announced his intention to perform Hajj. Tens of thousands gathered from every direction. It would be his first and last Hajj as the Prophet of Allah ﷺ.",
    color: GOLD,
    icon: "🌙",
  },
  {
    id: "departure",
    arabic: "الرَّحِيل",
    title: "The Departure from Madinah",
    body: "On the 25th of Dhul-Qaʿdah, the Prophet ﷺ departed Madinah with over 100,000 companions — some say 114,000, some say 124,000. All were dressed in the white garments of ihram, all chanting the talbiyah: 'Labbayk Allāhumma labbayk — Here I am, O Allah, here I am.' The desert rang with the sound of a hundred thousand hearts united in one call.",
    color: ROSE,
    icon: "🌅",
  },
  {
    id: "makkah",
    arabic: "مَكَّة",
    title: "Arrival at Makkah — The Return",
    body: "The Prophet ﷺ entered Makkah on the 4th of Dhul-Hijjah. He performed tawaf around the Kaʿbah — seven circuits of the house of Allah, the first house of worship on earth. He performed saʿy between Safa and Marwa, following the path of Hajar ؑ. Every step was a prayer. Every circuit was a covenant renewed.",
    color: GOLD,
    icon: "🕋",
  },
  {
    id: "mina",
    arabic: "مِنَى",
    title: "The Night at Mina",
    body: "On the 8th of Dhul-Hijjah — Yawm al-Tarwiyah — the Prophet ﷺ and the pilgrims moved to Mina, the valley between Makkah and ʿArafat. They spent the night in prayer and remembrance, preparing for the greatest day of the year. The fire of ihram burned in every heart. The world fell away. Only Allah remained.",
    color: ROSE,
    icon: "⛺",
  },
  {
    id: "arafat",
    arabic: "عَرَفَة",
    title: "The Day of ʿArafat — The Heart of Hajj",
    body: "The 9th of Dhul-Hijjah — Yawm ʿArafah. The Prophet ﷺ stood on the plain of ʿArafat on his camel Al-Qaswa, and delivered the Farewell Sermon. Over 100,000 companions stood in the valley below, tears on their faces, hearts open to the sky. The Prophet ﷺ asked: 'Have I conveyed the message?' And they answered: 'Yes, you have.' And he said: 'O Allah, bear witness.'",
    color: GOLD,
    icon: "🌄",
  },
  {
    id: "sermon-rights",
    arabic: "حُقُوق الْإِنْسَان",
    title: "The Sermon — The Rights of Humanity",
    body: "The Farewell Sermon declared: 'Your blood, your property, and your honor are sacred — as sacred as this day, in this month, in this city.' It abolished the debts of the age of ignorance. It declared the rights of women: 'You have rights over them, and they have rights over you.' It abolished racism: 'No Arab has superiority over a non-Arab, and no non-Arab over an Arab, except through taqwa.' This was the first universal declaration of human rights.",
    color: ROSE,
    icon: "⚖️",
  },
  {
    id: "sermon-trust",
    arabic: "الْأَمَانَة",
    title: "The Sermon — The Trust",
    body: "'I am leaving among you two things — if you hold to them, you will never go astray: the Book of Allah and the Sunnah of His Prophet.' The Quran and the way of the Prophet ﷺ — the two anchors of the ummah across all time. The Prophet ﷺ then asked again: 'Have I conveyed the message?' And the valley echoed: 'Yes.' And he said: 'O Allah, bear witness. O Allah, bear witness. O Allah, bear witness.'",
    color: GOLD,
    icon: "📜",
  },
  {
    id: "ayah",
    arabic: "الْآيَة",
    title: "The Final Verse — Al-Māʾidah 3",
    body: "On the day of ʿArafat, the final verse of the Quran was revealed: 'This day I have perfected your religion for you, completed My favor upon you, and have chosen for you Islam as your religion.' (Al-Māʾidah: 3). When ʿUmar ؓ heard it, he wept. The Prophet ﷺ asked why. He said: 'After perfection, there is only decline.' The Prophet ﷺ was silent. He knew.",
    color: ROSE,
    icon: "✨",
  },
  {
    id: "muzdalifah",
    arabic: "مُزْدَلِفَة",
    title: "Muzdalifah — The Night Under the Stars",
    body: "After sunset on the 9th, the pilgrims moved to Muzdalifah — the open plain between ʿArafat and Mina. There, under the open sky, they prayed Maghrib and Isha combined, and slept on the earth. No tents. No walls. Only the sky above and the earth below. This was the night of the greatest pilgrimage in history — 100,000 souls sleeping under the stars, united in one purpose.",
    color: GOLD,
    icon: "🌌",
  },
  {
    id: "jamarat",
    arabic: "الْجَمَرَات",
    title: "The Stoning of the Jamarat",
    body: "On the 10th — Yawm al-Naḥr — the pilgrims stoned the three pillars at Mina, following the tradition of Ibrahim ؑ who drove away Shaytan with stones when he was commanded to sacrifice his son. Each stone thrown is a declaration: 'I reject you, Shaytan. I choose Allah.' The sacrifice was made. The hair was cut. The ihram was removed. The Hajj was complete.",
    color: ROSE,
    icon: "🪨",
  },
  {
    id: "frequency",
    arabic: "تَرَدُّد ٨٥٢",
    title: "852Hz — The Intuition Frequency",
    body: "The 852Hz frequency is known as the frequency of intuition — it awakens the third eye, restores clarity, and aligns the soul with divine truth. The Farewell Pilgrimage was the ultimate alignment: 100,000 souls, one direction, one Lord, one final covenant. Every pilgrimage since is a re-enactment of that day — a return to the frequency of the Farewell.",
    color: GOLD,
    icon: "🎵",
  },
  {
    id: "seal",
    arabic: "الْخَتْم",
    title: "The Seal — The Covenant is Complete",
    body: "The Farewell Pilgrimage was the completion of the divine message. Ninety days after the sermon, the Prophet ﷺ would return to the Highest Companion. The religion was perfect. The covenant was sealed. The ummah was born. Every Hajj since is a return to that plain of ʿArafat — a renewal of the covenant, a declaration that the message was received, and a promise that it will be carried forward until the Day of Judgment.",
    color: ROSE,
    icon: "🕋",
  },
];

function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.6 + 0.3, a: Math.random(),
      vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1,
      p: Math.random() * Math.PI * 2,
      col: Math.random() > 0.5 ? ROSE : GOLD,
    }));
    let id: number;
    const draw = () => {
      ctx.fillStyle = "rgba(3,8,16,0.16)"; ctx.fillRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        s.p += 0.013; s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = c.width; if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height; if (s.y > c.height) s.y = 0;
        const alpha = s.a * (0.45 + 0.55 * Math.sin(s.p));
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

export default function AlFarewell() {
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
      setTimeout(() => setAudioOn(false), 400);
    } else {
      const ctx = new AudioContext();
      const gain = ctx.createGain(); gain.gain.value = 0;
      const osc1 = ctx.createOscillator(); osc1.type = "sine"; osc1.frequency.value = 852;
      osc1.connect(gain); gain.connect(ctx.destination);
      const osc2 = ctx.createOscillator(); osc2.type = "sine"; osc2.frequency.value = 426;
      const gain2 = ctx.createGain(); gain2.gain.value = 0;
      osc2.connect(gain2); gain2.connect(ctx.destination);
      osc1.start(); osc2.start();
      gain.gain.setTargetAtTime(0.06, ctx.currentTime, 0.5);
      gain2.gain.setTargetAtTime(0.025, ctx.currentTime, 0.5);
      audioCtxRef.current = ctx; gainRef.current = gain;
      setAudioOn(true);
    }
  }, [audioOn]);

  return (
    <div className="min-h-screen relative" style={{ background: DEEP, fontFamily: "'Space Grotesk', sans-serif", color: "#E8EDF2" }}>
      <div className="fixed top-0 left-0 z-50 h-0.5 transition-all duration-100" style={{ width: `${scrollPct}%`, background: `linear-gradient(90deg, ${ROSE}, ${GOLD})` }} />

      <nav className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,16,0.97)", borderColor: `${ROSE}20`, backdropFilter: "blur(20px)" }}>
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between py-2">
          <Link href="/seerah"><span className="text-xs font-mono cursor-pointer" style={{ color: "#8899AA" }}>← Seerah Archive</span></Link>
          <div className="text-xs font-mono" style={{ color: ROSE }}>ḤAJJAT AL-WADĀʿ · SCROLL IX · 10 AH</div>
          <button onClick={toggleAudio} className="text-xs font-mono px-3 py-1.5 rounded border transition-all" style={{ borderColor: `${ROSE}40`, color: audioOn ? ROSE : "#8899AA", background: audioOn ? `${ROSE}10` : "transparent" }}>
            {audioOn ? "◉ 852Hz ON" : "○ 852Hz"}
          </button>
        </div>
      </nav>

      <header className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
        <StarCanvas />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: ROSE }}>SEERAH SACRED SCROLL · IX OF IX</div>
          <div className="text-6xl mb-6">🕋</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">Ḥajjat al-Wadāʿ</h1>
          <div className="text-2xl mb-4" style={{ color: GOLD, fontFamily: "'Amiri', serif" }}>حَجَّةُ الْوَدَاع</div>
          <p className="text-lg max-w-2xl" style={{ color: "#8899AA" }}>The Farewell Pilgrimage · 10 AH / 632 CE · The Final Covenant with Humanity</p>
          <div className="flex items-center gap-4 mt-6 flex-wrap justify-center">
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: `${ROSE}12`, color: ROSE, border: `1px solid ${ROSE}30` }}>852Hz Intuition</span>
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}30` }}>12 Sections</span>
            <span className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }}>Zero Human Figures</span>
          </div>
        </div>
      </header>

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

      <footer className="relative overflow-hidden py-16 text-center" style={{ background: `linear-gradient(180deg, ${DEEP}, rgba(232,160,191,0.05))` }}>
        <StarCanvas />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="text-3xl mb-4">🕋</div>
          <div className="text-2xl font-black mb-2" style={{ color: GOLD, fontFamily: "'Amiri', serif" }}>اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ ﷺ</div>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ</p>
          <div className="text-xs font-mono mb-6" style={{ color: ROSE }}>SEERAH SACRED ARCHIVE · SCROLL IX COMPLETE · THE FAREWELL PILGRIMAGE</div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/seerah"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${ROSE}30`, color: ROSE }}>← Seerah Archive</span></Link>
            <Link href="/seerah/al-aqsa"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#8899AA" }}>Scroll VIII: Al-Miʿraj →</span></Link>
            <Link href="/sovereign-books"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${GOLD}30`, color: GOLD }}>📚 Sovereign Books →</span></Link>
            <Link href="/seerah/quiz"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${ROSE}30`, color: ROSE }}>Take the Quiz →</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
