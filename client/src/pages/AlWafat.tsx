/*
 * AL-WAFĀT — THE PASSING OF THE PROPHET ﷺ
 * Seerah Sacred Scroll Series · Scroll VI · The Final Chapter
 * 11 AH · 632 CE · Madinah al-Munawwara
 * Museum Standard: Zero human figures · Web Audio 963Hz · Parallax Starfield
 * Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ
 * "Every soul shall taste death." — Qurʾān 3:185
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";

// ── SECTIONS ──────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    arabic: "الْحَجَّةُ الْأَخِيرَة",
    title: "The Farewell Pilgrimage",
    body: "In the tenth year after the Hijra, the Prophet Muḥammad ﷺ performed his first and only complete Ḥajj. He led more than one hundred thousand companions from Madinah to Makkah — the largest gathering of believers the world had yet seen. On the plain of ʿArafāt, he delivered the Farewell Sermon (Khuṭbat al-Wadāʿ): 'O people, listen to me carefully, for I do not know whether I shall meet you again after this year in this place.' The companions wept, sensing what these words carried.",
  },
  {
    arabic: "الْخُطْبَةُ الْأَخِيرَة",
    title: "The Farewell Sermon",
    body: "Standing on his camel on the plain of ʿArafāt, the Prophet ﷺ spoke words that would echo through all of human history: 'O people, your blood, your property, and your honour are sacred to one another, as sacred as this day, this month, and this city. You will meet your Lord, and He will ask you about your deeds. I have conveyed the message. O Allāh, be my witness.' He declared the abolition of all pre-Islamic debts and blood feuds, the rights of women, and the equality of all human beings before Allāh. Then the revelation descended: 'This day I have perfected your religion for you, completed My favour upon you, and have chosen for you Islam as your religion.' (5:3) The companions wept — they understood this was a completion.",
  },
  {
    arabic: "الْمَرَضُ الْأَخِير",
    title: "The Final Illness",
    body: "In the month of Ṣafar, 11 AH, the Prophet ﷺ began to experience severe headaches and fever. He visited the graveyard of Baqīʿ at night and prayed for its inhabitants. He said: 'I am commanded to pray for the people of Baqīʿ.' As his illness intensified, he asked permission from his wives to be nursed in the home of ʿĀʾisha. They agreed. He spent his final days in her chamber, his blessed head resting on her lap or her chest — she later described the honour of this as the greatest gift she had ever received.",
  },
  {
    arabic: "الصَّلَاةُ فِي الْمَسْجِد",
    title: "The Last Prayers in the Mosque",
    body: "Despite his illness, the Prophet ﷺ led the prayers for as long as he was able. When he could no longer stand, he instructed Abū Bakr al-Ṣiddīq to lead the prayers in his place. On one occasion, he emerged supported by two companions, his feet dragging on the ground, and sat beside Abū Bakr to pray. The companions who saw him wept openly. He raised his hand toward the congregation in a final gesture of farewell. This was the last time they would see him in the mosque.",
  },
  {
    arabic: "الْوَصَايَا الْأَخِيرَة",
    title: "The Final Counsels",
    body: "In his final days, the Prophet ﷺ repeated certain counsels with great urgency. He said: 'The prayer, the prayer, and what your right hands possess.' He warned against taking his grave as a place of worship: 'Do not make my grave a place of idol-worship. Allāh's curse is upon those who take the graves of their prophets as mosques.' He said: 'I am leaving among you two things — if you hold fast to them, you will never go astray: the Book of Allāh and my Sunnah.' He asked forgiveness for any wrong he may have done to any companion, and freed all those in his possession.",
  },
  {
    arabic: "الْيَوْمُ الْأَخِير",
    title: "The Final Day",
    body: "On Monday, the 12th of Rabīʿ al-Awwal, 11 AH, the Prophet ﷺ felt some relief from his fever. He parted the curtain of ʿĀʾisha's chamber and looked out at the companions praying Fajr — Abū Bakr leading them. He smiled — the companions described it as the most beautiful smile they had ever seen. They almost broke their prayer in joy at seeing him. He gestured to them to continue, then let the curtain fall. He returned to his bed. ʿĀʾisha held his blessed head. He asked for his miswāk (tooth-stick), and she softened it with her teeth and gave it to him. He cleaned his teeth with it. Then he raised his finger toward the ceiling and said: 'With the Highest Companion. With the Highest Companion. With the Highest Companion.' — Al-Rafīq al-Aʿlā.",
  },
  {
    arabic: "الِانْتِقَالُ إِلَى الرَّفِيقِ الْأَعْلَى",
    title: "The Transition to the Highest Companion",
    body: "His hand fell. His soul — ṣallallāhu ʿalayhi wa sallam — departed to the Highest Companion. He was sixty-three years old. ʿĀʾisha later said: 'He died with his head between my chest and my throat. I do not envy anyone for anything after that honour.' The news spread through Madinah like a wave. ʿUmar ibn al-Khaṭṭāb stood in the mosque and declared that anyone who said the Prophet ﷺ had died would have his head cut off — he could not accept it. It was Abū Bakr who entered, uncovered the blessed face, kissed his forehead, and said: 'You are as beautiful in death as you were in life.' Then he addressed the people: 'O people, whoever worshipped Muḥammad — Muḥammad has died. But whoever worships Allāh — Allāh is Ever-Living and never dies.' Then he recited: 'Muḥammad is not but a messenger. Messengers have passed on before him.' (3:144)",
  },
  {
    arabic: "حُزْنُ الصَّحَابَة",
    title: "The Grief of the Companions",
    body: "The companions were shattered. Anas ibn Mālik said: 'The day the Prophet ﷺ arrived in Madinah, everything was illuminated. The day he died, everything was darkened.' Bilāl ibn Rabāḥ, who had called the adhān for the Prophet ﷺ for years, could not bring himself to call it again in Madinah. He left the city. When he was later asked to call the adhān in Damascus, he did so — and when he reached 'Ashhadu anna Muḥammadan rasūlullāh,' he broke down weeping, and the entire congregation wept with him. The grief was not merely personal — it was cosmic. The world had lost its greatest teacher.",
  },
  {
    arabic: "الدَّفْن",
    title: "The Burial",
    body: "The Prophet ﷺ was washed, shrouded in three white garments, and laid in the earth in the very spot where he had died — in the chamber of ʿĀʾisha. The companions prayed over him in groups, without an imām, out of respect — no one could lead the prayer over the Prophet ﷺ. He was buried on Tuesday night or Wednesday, 13th or 14th of Rabīʿ al-Awwal, 11 AH. His grave is now within the Masjid al-Nabawī in Madinah — a place of pilgrimage and prayer for all Muslims until the Day of Judgment.",
  },
  {
    arabic: "الْإِرْثُ الْخَالِد",
    title: "The Eternal Legacy",
    body: "The Prophet Muḥammad ﷺ left no gold, no silver, no estate. He left the Qurʾān — the living word of Allāh. He left the Sunnah — his example in every dimension of life. He left a community of companions who carried his light to every corner of the earth within a generation. He left a civilization that would, at its height, preserve the knowledge of humanity and advance science, medicine, mathematics, and philosophy. He left a name that is spoken by billions every day: Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ.",
  },
  {
    arabic: "الشَّفَاعَة",
    title: "The Intercession — Al-Shafāʿa",
    body: "The Prophet ﷺ said: 'My intercession is for those of my nation who committed major sins.' He said: 'Every prophet has a supplication that was answered. I have saved my supplication for the intercession of my nation on the Day of Resurrection.' On the Day of Judgment, when humanity will be in the greatest distress, they will go from prophet to prophet seeking intercession. Each will say: 'I am not for this.' Until they come to Muḥammad ﷺ, who will say: 'I am for this. I am for this.' He will prostrate before Allāh, and Allāh will say: 'Raise your head, ask and it will be given, intercede and your intercession will be accepted.' This is the Maqām al-Maḥmūd — the Praised Station — promised to him alone.",
  },
  {
    arabic: "الصَّلَاةُ عَلَيْه",
    title: "The Eternal Ṣalawāt",
    body: "Allāh said: 'Indeed, Allāh and His angels send blessings upon the Prophet. O you who have believed, ask Allāh to confer blessing upon him and ask Allāh to grant him peace.' (33:56) This verse was revealed while the Prophet ﷺ was alive — and it remains in force for all time. Every Muslim who sends ṣalawāt upon the Prophet ﷺ receives ten blessings from Allāh. The Prophet ﷺ said: 'The closest of people to me on the Day of Resurrection will be those who sent the most ṣalawāt upon me.' He is gone from this world — but he is nearer to every believer than they know. Allāhumma ṣalli wa sallim wa bārik ʿalā Sayyidinā Muḥammadin wa ʿalā ālihi wa ṣaḥbihi ajmaʿīn.",
  },
];

// ── WEB AUDIO 963Hz ───────────────────────────────────────────────────────────
function useAudio963() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(() => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3);
    gain.connect(ctx.destination);
    gainRef.current = gain;

    // 963Hz — Pineal Activation / Divine Connection
    const freqs = [963, 481.5, 1926, 321];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = i === 0 ? "sine" : "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(i === 0 ? 0.4 : 0.12 - i * 0.02, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start();
    });
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current) return;
    gainRef.current?.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 2);
    setTimeout(() => {
      ctxRef.current?.close();
      ctxRef.current = null;
      gainRef.current = null;
      setPlaying(false);
    }, 2100);
  }, []);

  useEffect(() => () => { ctxRef.current?.close(); }, []);
  return { playing, start, stop };
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
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.2,
      speed: Math.random() * 0.15 + 0.03,
      opacity: Math.random() * 0.8 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));
    let raf: number;
    let t = 0;
    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const alpha = s.opacity * (0.6 + 0.4 * Math.sin(t + s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,150,${alpha})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AlWafat() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { playing, start, stop } = useAudio963();
  const mainRef = useRef<HTMLDivElement>(null);

  const GOLD = "#D4AF37";
  const GLOW = "rgba(212,175,55,0.35)";

  useEffect(() => {
    const onScroll = () => {
      const el = mainRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      setScrollProgress(scrollTop / (scrollHeight - clientHeight));
    };
    const el = mainRef.current;
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#04080F", color: "#E8EDF2", fontFamily: "'Crimson Text', 'Georgia', serif" }}
    >
      {/* ── PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          className="h-full transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%`, background: `linear-gradient(90deg, ${GOLD}, #FF6B00)` }}
        />
      </div>

      {/* ── HEADER ── */}
      <header
        className="sticky top-0.5 z-40 border-b"
        style={{ background: "rgba(4,8,15,0.97)", borderColor: `${GOLD}20`, backdropFilter: "blur(20px)" }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/seerah">
              <button className="text-xs font-mono px-3 py-1.5 rounded border transition-colors" style={{ borderColor: `${GOLD}40`, color: GOLD, fontFamily: "'Space Grotesk', sans-serif" }}>
                ← Seerah
              </button>
            </Link>
            <div>
              <div className="font-bold text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Al-Wafāt — الْوَفَاة</div>
              <div className="text-xs" style={{ color: "#8899AA", fontFamily: "'Space Grotesk', sans-serif" }}>Sacred Scroll VI · The Final Chapter</div>
            </div>
          </div>
          <button
            onClick={playing ? stop : start}
            className="text-xs font-mono px-3 py-1.5 rounded border transition-all"
            style={{
              borderColor: playing ? `${GOLD}80` : `${GOLD}40`,
              color: GOLD,
              background: playing ? `${GOLD}12` : "transparent",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {playing ? "◉ 963Hz" : "▷ 963Hz"}
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse at center, ${GLOW} 0%, #04080F 65%)` }}
      >
        <Starfield />
        <div className="relative z-10 text-center px-6 py-24 max-w-3xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif" }}>
            SCROLL VI · FINAL CHAPTER · 963Hz
          </div>
          <div
            className="text-6xl md:text-8xl mb-6"
            style={{ color: GOLD, fontFamily: "'Noto Naskh Arabic', serif" }}
          >
            الْوَفَاة
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Al-Wafāt</h1>
          <p className="text-xl mb-3" style={{ color: "#C8D3DC" }}>The Passing of the Prophet ﷺ</p>
          <p className="text-base mb-8" style={{ color: "#8899AA" }}>11 AH · 632 CE · Madinah al-Munawwara</p>

          {/* Quranic verse */}
          <div
            className="rounded-2xl p-6 mb-8 mx-auto max-w-xl"
            style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}25` }}
          >
            <div
              className="text-2xl mb-3"
              style={{ color: GOLD, fontFamily: "'Noto Naskh Arabic', serif", direction: "rtl", lineHeight: "1.8" }}
            >
              كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ
            </div>
            <p className="text-sm" style={{ color: "#8899AA" }}>
              'Every soul shall taste death.' — Qurʾān 3:185
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={playing ? stop : start}
              className="px-8 py-3 rounded-xl font-bold text-sm transition-all"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #FF6B00)`, color: "#04080F", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {playing ? "◉ 963Hz Active" : "▷ Begin with 963Hz"}
            </button>
            <a href="#section-0" className="px-8 py-3 rounded-xl font-bold text-sm border" style={{ borderColor: `${GOLD}40`, color: GOLD, fontFamily: "'Space Grotesk', sans-serif" }}>
              Read the Scroll ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION NAV ── */}
      <div
        className="sticky top-12 z-10 border-b overflow-x-auto"
        style={{ background: "rgba(4,8,15,0.96)", borderColor: `${GOLD}15` }}
      >
        <div className="flex gap-1 px-6 py-3 min-w-max">
          {SECTIONS.map((sec, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className="px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-all"
              style={{
                background: activeSection === i ? `${GOLD}18` : "transparent",
                color: activeSection === i ? GOLD : "#8899AA",
                border: `1px solid ${activeSection === i ? GOLD + "50" : "transparent"}`,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {i + 1}. {sec.title.split(" ").slice(0, 3).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN SCROLL ── */}
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {SECTIONS.map((sec, i) => (
            <div
              key={i}
              id={`section-${i}`}
              className={`mb-20 transition-all duration-500 cursor-pointer ${activeSection === i ? "opacity-100" : "opacity-45"}`}
              onClick={() => setActiveSection(i)}
            >
              <div
                className="text-2xl mb-3 text-right"
                style={{ color: GOLD, fontFamily: "'Noto Naskh Arabic', serif", direction: "rtl" }}
              >
                {sec.arabic}
              </div>
              <h2
                className="text-2xl font-bold text-white mb-6 border-b pb-4"
                style={{ borderColor: `${GOLD}25` }}
              >
                {sec.title}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "#C8D3DC", lineHeight: "2.1" }}>
                {sec.body}
              </p>
              {activeSection === i && (
                <div className="mt-8 flex gap-3">
                  {i > 0 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveSection(i - 1); }}
                      className="px-4 py-2 rounded text-sm font-mono border transition-colors"
                      style={{ borderColor: `${GOLD}40`, color: GOLD, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      ← Previous
                    </button>
                  )}
                  {i < SECTIONS.length - 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveSection(i + 1); }}
                      className="px-4 py-2 rounded text-sm font-mono border transition-colors"
                      style={{ borderColor: `${GOLD}40`, color: GOLD, background: `${GOLD}10`, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Continue →
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── CLOSING SEAL ── */}
        <section
          className="relative py-24 text-center overflow-hidden"
          style={{ background: `radial-gradient(ellipse at center, ${GLOW} 0%, #04080F 70%)` }}
        >
          <Starfield />
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <div className="text-5xl mb-6" style={{ color: GOLD, fontFamily: "'Noto Naskh Arabic', serif" }}>ﷺ</div>
            <div
              className="text-2xl mb-4 font-bold leading-relaxed"
              style={{ color: GOLD, fontFamily: "'Noto Naskh Arabic', serif", direction: "rtl" }}
            >
              اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِين
            </div>
            <p className="text-sm mb-2" style={{ color: "#8899AA" }}>
              Allāhumma ṣalli wa sallim wa bārik ʿalā Sayyidinā Muḥammadin wa ʿalā ālihi wa ṣaḥbihi ajmaʿīn
            </p>
            <p className="text-base mt-6 mb-10" style={{ color: "#C8D3DC" }}>
              The Seerah Sacred Archive is now complete. Six scrolls. One life. Eternal light.
            </p>

            {/* Seerah complete badge */}
            <div
              className="rounded-2xl p-6 mb-8 mx-auto max-w-md"
              style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}30` }}
            >
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Seerah Archive Complete</div>
              <div className="text-sm" style={{ color: "#8899AA" }}>Birth · Migration · Badr · Conquest · Expeditions · Passing</div>
              <div className="text-xs font-mono mt-2" style={{ color: GOLD }}>6 Scrolls · 75 Sections · 963Hz Sealed</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/seerah">
                <button className="px-6 py-3 rounded-xl text-sm font-bold border" style={{ borderColor: `${GOLD}40`, color: GOLD, fontFamily: "'Space Grotesk', sans-serif" }}>
                  ← Seerah Library
                </button>
              </Link>
              <Link href="/seerah/quiz">
                <button
                  className="px-6 py-3 rounded-xl text-sm font-bold"
                  style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}50`, color: GOLD, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Test Your Knowledge →
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
