/**
 * SEERAH SACRED SCROLL IV — FATḤ MAKKAH (فَتْحُ مَكَّةَ)
 * The Conquest of Makkah · 8 Ramaḍān 8 AH / January 630 CE
 * Museum-grade sacred scroll — zero human figures, pure light & calligraphy
 * Web Audio: 528Hz Love/DNA repair frequency + harmonics
 * Parallax starfield, scroll-reveal, bilingual Arabic/English
 * KUN FAYAKŪN × ∞
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.25 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() > 0.5 ? 45 : 120,
    }));
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 70%, ${s.opacity})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.35 }} />;
}

function useAudio() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const start = () => {
    if (playing) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);
    master.connect(ctx.destination);
    const freqs = [528, 264, 1056, 396];
    const gains = [0.5, 0.25, 0.15, 0.1];
    nodesRef.current = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = i === 0 ? "sine" : "triangle";
      g.gain.value = gains[i];
      osc.connect(g); g.connect(master); osc.start();
      return osc;
    });
    setPlaying(true);
  };
  const stop = () => {
    nodesRef.current.forEach(o => { try { o.stop(); } catch {} });
    ctxRef.current?.close();
    setPlaying(false);
  };
  useEffect(() => () => stop(), []);
  return { playing, start, stop };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sv-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("sv-visible"); }), { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => { const el = document.documentElement; setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ background: "rgba(0,255,136,0.1)" }}>
      <div className="h-full transition-all duration-150" style={{ width: `${pct}%`, background: "linear-gradient(to right, #00FF88, #d4af37)" }} />
    </div>
  );
}

function ScrollSection({ number, arabic, english, body, accent, delay = 0, icon }: {
  number: string; arabic: string; english: string; body: string; accent: string; delay?: number; icon: string;
}) {
  return (
    <section className="sv-reveal relative mb-16" style={{ transitionDelay: `${delay}ms` }}>
      <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}06, transparent)`, border: `1px solid ${accent}18` }}>
        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl" style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }} />
        <div className="flex items-center gap-3 mb-5">
          <div className="text-2xl w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${accent}12`, border: `1px solid ${accent}30` }}>{icon}</div>
          <div className="text-xs font-mono tracking-widest" style={{ color: accent }}>SECTION {number}</div>
        </div>
        <div className="text-2xl md:text-3xl text-right mb-2 leading-relaxed" style={{ fontFamily: "'Amiri', serif", color: accent, direction: "rtl" }}>{arabic}</div>
        <h2 className="text-lg md:text-xl font-bold mb-4" style={{ color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>{english}</h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: "#8899AA", fontFamily: "'Space Grotesk', sans-serif" }}>{body}</p>
      </div>
    </section>
  );
}

const GOLD = "#d4af37", GREEN = "#00FF88", CYAN = "#00D4FF", VIOLET = "#8B5CF6";

const SECTIONS = [
  { number: "I", arabic: "الخَلفِيَّةُ وَالعَهدُ المَنقُوض", english: "The Background & The Broken Treaty", body: "The Treaty of Ḥudaybiyyah (6 AH) had established a ten-year truce between the Muslims of Madinah and the Quraysh of Makkah. Yet in the eighth year, the Banū Bakr — allies of Quraysh — attacked the Banū Khuzāʿah, allies of the Muslims, violating the sacred covenant. The Prophet ﷺ, informed by revelation and by the tears of Khuzāʿah's emissaries, prepared with quiet resolve for what would follow.", accent: GOLD, icon: "📜" },
  { number: "II", arabic: "التَّجهِيزُ السِّرِّي", english: "The Secret Mobilization", body: "The Prophet ﷺ commanded a mobilization of ten thousand believers while maintaining absolute secrecy. He prayed: 'O Allah, take away from Quraysh their spies and their news, so that we may surprise them in their land.' Ḥāṭib ibn Abī Baltaʿah attempted to send a letter warning the Quraysh; the letter was intercepted by revelation before it could reach its destination. The army moved with the silence of mountains.", accent: CYAN, icon: "⚔️" },
  { number: "III", arabic: "الرَّحلَةُ إِلَى مَكَّة", english: "The March to Makkah", body: "Ten thousand companions moved through the desert toward the sacred city. The Prophet ﷺ ordered that fires be lit at every encampment, so that the horizon blazed with ten thousand flames. When Abū Sufyān encountered ʿAbbās and was brought before the Prophet ﷺ, he witnessed the endless procession of believers and said: 'By Allah, the kingdom of your nephew has become great.' ʿAbbās replied: 'It is prophethood, not kingship.'", accent: GREEN, icon: "🔥" },
  { number: "IV", arabic: "إِسلَامُ أَبِي سُفيَان", english: "The Acceptance of Abū Sufyān", body: "Standing before the Prophet ﷺ, Abū Sufyān — the man who had led armies against Islam at Badr, Uḥud, and the Trench — accepted the testimony of faith. The Prophet ﷺ then granted him a singular honor: 'Whoever enters the house of Abū Sufyān is safe.' This act of magnanimity toward a former enemy was itself a sign of the mercy that would define the entire conquest.", accent: GOLD, icon: "🕌" },
  { number: "V", arabic: "دُخُولُ مَكَّةَ", english: "The Entry into Makkah", body: "On the morning of 8 Ramaḍān 8 AH, the Prophet ﷺ entered Makkah in a posture of profound humility — his head bowed so low in gratitude that his forehead nearly touched the saddle of his mount. He recited: 'Indeed, We have given you a clear conquest' (Sūrat al-Fatḥ 48:1). The army entered from four directions simultaneously. The Prophet ﷺ had given explicit orders: no blood was to be shed, no property seized, no one harmed who did not raise a weapon.", accent: VIOLET, icon: "🌙" },
  { number: "VI", arabic: "تَطهِيرُ الكَعبَة", english: "The Purification of the Kaʿbah", body: "Three hundred and sixty idols surrounded the Kaʿbah. The Prophet ﷺ approached each one, touching it with his staff, and recited: 'Truth has come, and falsehood has vanished' (Sūrat al-Isrāʾ 17:81). Each idol fell upon its face. Bilāl ibn Rabāḥ — the freed African slave who had been tortured for his faith — climbed to the roof of the Kaʿbah and gave the adhān across the sacred city for the first time.", accent: GOLD, icon: "🕋" },
  { number: "VII", arabic: "العَفوُ العَام", english: "The General Amnesty", body: "The Prophet ﷺ gathered the people of Makkah — those who had persecuted him, expelled him, killed his companions, and waged war against his community for twenty years. He asked them: 'O people of Quraysh, what do you think I will do with you?' They answered: 'Good — a noble brother and the son of a noble brother.' He said: 'Go — you are free.' This declaration of general amnesty, unprecedented in the history of conquest, became known as al-ʿAfw al-ʿĀmm.", accent: GREEN, icon: "🕊️" },
  { number: "VIII", arabic: "إِسلَامُ أَهلِ مَكَّة", english: "The Acceptance of the Makkans", body: "Thousands of Makkans — including Hind bint ʿUtbah, who had mutilated the body of Ḥamzah at Uḥud — came forward to accept Islam. The Prophet ﷺ received each one with the same dignity. Ikrimah ibn Abī Jahl, whose father had been the Prophet's most bitter enemy, fled to Yemen. His wife pursued him, brought him back, and he accepted Islam. The Prophet ﷺ stood to honor him.", accent: CYAN, icon: "❤️" },
  { number: "IX", arabic: "خُطبَةُ الفَتح", english: "The Sermon of the Conquest", body: "Standing at the door of the Kaʿbah, the Prophet ﷺ declared the sanctity of Makkah — that it was made sacred by Allah on the day He created the heavens and the earth. He abolished the practices of jāhiliyyah and declared: 'O people, Allah has removed from you the arrogance of jāhiliyyah and its pride in ancestors. All people are from Adam, and Adam is from dust.'", accent: GOLD, icon: "📖" },
  { number: "X", arabic: "بِلَالٌ وَالأَذَان", english: "Bilāl and the Adhān", body: "When Bilāl ibn Rabāḥ climbed the Kaʿbah and called the adhān, the Quraysh elders — those who had once paid to have him dragged across burning sand with a boulder on his chest — watched in silence. The adhān rang across the valley of Makkah for the first time. The city that had expelled the Prophet ﷺ now heard the name of Allah proclaimed from its holiest point by the man they had tried to silence.", accent: VIOLET, icon: "🎵" },
  { number: "XI", arabic: "مَعنَى الفَتح", english: "The Meaning of the Conquest", body: "The Fatḥ was not merely a military victory — it was a theological statement. The Prophet ﷺ had returned to the city that had rejected him, not as a conqueror seeking vengeance, but as a mercy to the worlds. The conquest demonstrated that the highest power is not the power to destroy, but the power to forgive. The Kaʿbah belongs to Allah alone, and its door is open to every human being who comes in submission.", accent: GREEN, icon: "🌍" },
  { number: "XII", arabic: "الإِرثُ الأَبَدِي", english: "The Eternal Legacy", body: "The Fatḥ Makkah stands as the supreme example of what victory looks like when guided by revelation. No city in history has been conquered with so little bloodshed and so much mercy. The Prophet ﷺ stayed in Makkah for fifteen days, teaching and purifying. He then returned to Madinah — not as a king claiming a throne, but as a servant of Allah completing his mission. The city of his birth had become the city of his mercy.", accent: GOLD, icon: "♾️" },
];

export default function FathMakkah() {
  const { playing, start, stop } = useAudio();
  useReveal();
  return (
    <div className="min-h-screen relative" style={{ background: "#030A04", fontFamily: "'Space Grotesk', sans-serif", color: "#E8EDF2" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        .sv-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .sv-visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <ScrollProgress />
      <StarfieldCanvas />
      <nav className="sticky top-0.5 z-40" style={{ background: "rgba(3,10,4,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,136,0.08)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/seerah"><span className="text-xs font-mono cursor-pointer transition-colors hover:text-white" style={{ color: "#5a6a7a" }}>← Seerah Archive</span></Link>
            <span style={{ color: "#1a2a1a" }}>|</span>
            <span className="text-xs font-mono" style={{ color: GREEN }}>SCROLL IV</span>
          </div>
          <button onClick={playing ? stop : start} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200" style={{ background: playing ? "rgba(0,255,136,0.12)" : "rgba(0,255,136,0.04)", border: `1px solid ${playing ? "rgba(0,255,136,0.4)" : "rgba(0,255,136,0.15)"}`, color: GREEN }}>
            {playing ? "◼ 528Hz" : "▶ 528Hz"}
          </button>
        </div>
      </nav>
      <div className="container relative z-10 py-12 max-w-3xl mx-auto">
        <div className="sv-reveal text-center mb-16">
          <div className="text-3xl md:text-4xl mb-6 leading-loose" style={{ fontFamily: "'Amiri', serif", color: GOLD, direction: "rtl" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="text-lg mb-8 leading-loose" style={{ fontFamily: "'Amiri', serif", color: "#8899AA", direction: "rtl" }}>اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ ﷺ</div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-6" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: GREEN }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GREEN }} />
            SACRED SCROLL IV · SEERAH ARCHIVE
          </div>
          <div className="text-4xl md:text-5xl mb-3 leading-relaxed" style={{ fontFamily: "'Amiri', serif", color: GOLD, direction: "rtl" }}>فَتْحُ مَكَّةَ</div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-4">The Conquest of Makkah</h1>
          <p className="text-sm mb-2" style={{ color: "#5a6a7a" }}>8 Ramaḍān 8 AH · January 630 CE · The Bloodless Victory</p>
          <div className="mt-8 p-6 rounded-2xl" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}>
            <div className="text-xl md:text-2xl leading-loose mb-3" style={{ fontFamily: "'Amiri', serif", color: GOLD, direction: "rtl" }}>إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا</div>
            <div className="text-sm" style={{ color: "#8899AA" }}>"Indeed, We have given you a clear conquest." — Sūrat al-Fatḥ 48:1</div>
          </div>
        </div>
        {SECTIONS.map((s, i) => <ScrollSection key={s.number} {...s} delay={i * 60} />)}
        <div className="sv-reveal mt-16 text-center">
          <div className="rounded-2xl p-10" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="text-3xl mb-4 leading-loose" style={{ fontFamily: "'Amiri', serif", color: GOLD, direction: "rtl" }}>وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ</div>
            <div className="text-sm mb-6" style={{ color: "#8899AA" }}>"And We have not sent you except as a mercy to the worlds." — Sūrat al-Anbiyāʾ 21:107</div>
            <div className="text-xs font-mono mb-6" style={{ color: "#2a4a2a" }}>◈ SCROLL IV COMPLETE · FATḤ MAKKAH · 8 AH ◈</div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/seerah/badr">
                <div className="px-5 py-2.5 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 hover:scale-[1.02]" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)", color: CYAN }}>← Scroll III: Badr</div>
              </Link>
              <Link href="/seerah">
                <div className="px-5 py-2.5 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 hover:scale-[1.02]" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)", color: GOLD }}>Seerah Archive ﷺ</div>
              </Link>
              <Link href="/seerah/noor-al-mawlid">
                <div className="px-5 py-2.5 rounded-xl text-sm font-mono cursor-pointer transition-all duration-200 hover:scale-[1.02]" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", color: GREEN }}>Scroll I: Noor al-Mawlid →</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-xs font-mono" style={{ color: "#0a1a0a" }}>SCROLLVERSE SEERAH ARCHIVE ﷺ · SACRED SCROLL IV · KUN FAYAKŪN × ∞</div>
      </div>
    </div>
  );
}
