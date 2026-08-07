/*
 * AL-GHAZWĀT — THE SACRED EXPEDITIONS CHRONICLE
 * Seerah Sacred Scroll Series · Scroll V
 * Three Chapters: Uḥud · Khandaq · Ḥunayn
 * Museum Standard: Zero human figures · Web Audio 741Hz · Parallax Starfield
 * Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";

// ── CHAPTER DATA ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: "uhud",
    number: "I",
    arabic: "غَزْوَةُ أُحُدٍ",
    title: "The Battle of Uḥud",
    subtitle: "3 AH · 625 CE · Mount Uḥud, Madinah",
    color: "#C0392B",
    glow: "rgba(192,57,43,0.4)",
    hz: "741Hz",
    sections: [
      {
        arabic: "السِّيَاقُ التَّارِيخِيُّ",
        title: "Historical Context",
        body: "One year after Badr, the Quraysh of Makkah assembled an army of three thousand warriors — cavalry, infantry, and archers — under the command of Abū Sufyān ibn Ḥarb. Their purpose was singular: to avenge the defeat of Badr and to crush the nascent Muslim community in Madinah before it could consolidate further. The Muslim force numbered seven hundred, including fifty archers stationed by the Prophet ﷺ on a strategic ridge to guard the rear flank.",
      },
      {
        arabic: "الرِّمَاةُ وَالْأَمْرُ",
        title: "The Archers and the Command",
        body: "The Prophet ﷺ issued a precise command to the fifty archers: 'Do not leave your positions, whether we are victorious or defeated.' The initial Muslim advance was decisive — the Qurayshi lines broke and the battlefield turned. But when some archers saw the apparent victory and descended to collect spoils, believing the battle was over, a cavalry unit led by Khālid ibn al-Walīd — then fighting for the Quraysh — swept around the exposed ridge and struck the Muslim rear.",
      },
      {
        arabic: "الثَّبَاتُ فِي الْمِحْنَةِ",
        title: "Steadfastness in Trial",
        body: "In the chaos that followed, the Prophet ﷺ was wounded — a tooth broken, his face cut, his helmet driven into his cheeks. A rumour spread that he had been killed, causing some to falter. Yet a core of companions formed a human shield around him, absorbing arrows and blows. Among them: Ṭalḥa ibn ʿUbaydillāh, who shielded the Prophet ﷺ with his own body until his hand was paralysed. The Prophet ﷺ called him 'a man who has purchased Paradise.'",
      },
      {
        arabic: "الشُّهَدَاءُ",
        title: "The Martyrs of Uḥud",
        body: "Seventy companions were martyred at Uḥud. Among them: Ḥamza ibn ʿAbd al-Muṭṭalib ﷺ, the Lion of Allāh and uncle of the Prophet ﷺ, whose martyrdom the Prophet ﷺ grieved deeply. The Prophet ﷺ prayed over the martyrs and said: 'I bear witness that they are alive with their Lord.' The graves of Uḥud remain a site of pilgrimage to this day — a mountain that 'loves us and we love it,' as the Prophet ﷺ declared.",
      },
      {
        arabic: "الدُّرُوسُ الْعُلْيَا",
        title: "The Supreme Lessons",
        body: "Uḥud was not a defeat — it was a refinement. The Qurʾān descended with clarity: 'And Allāh will surely make evident those who believe and will surely make evident the hypocrites' (3:179). The trial separated the sincere from the wavering. The Prophet ﷺ taught that obedience to command is the foundation of victory, and that the love of the dunyā — its spoils and its comfort — is the root of strategic failure.",
      },
    ],
  },
  {
    id: "khandaq",
    number: "II",
    arabic: "غَزْوَةُ الْخَنْدَقِ",
    title: "The Battle of the Trench",
    subtitle: "5 AH · 627 CE · Madinah",
    color: "#2980B9",
    glow: "rgba(41,128,185,0.4)",
    hz: "528Hz",
    sections: [
      {
        arabic: "التَّحَالُفُ الْعَظِيمُ",
        title: "The Grand Coalition",
        body: "The Aḥzāb — the Confederates — was the largest military coalition ever assembled against the early Muslim community. Ten thousand warriors from the Quraysh, Ghaṭafān, Banū Asad, Banū Sulaym, and other tribes converged on Madinah under Abū Sufyān's command. The city faced annihilation. It was Salmān al-Fārisī — the Persian companion — who proposed the Persian military innovation that would change history: dig a trench.",
      },
      {
        arabic: "حَفْرُ الْخَنْدَقِ",
        title: "The Digging of the Trench",
        body: "The Prophet ﷺ himself took up the pickaxe and dug alongside his companions. When a rock proved immovable, the Prophet ﷺ struck it three times — each strike producing a flash of light. He declared: 'I was shown the palaces of Persia, the palaces of Rome, and the palaces of Yemen.' The companions dug for twenty days in the cold of winter, hungry, exhausted, yet singing. The trench stretched approximately five kilometres along the northern approach to Madinah.",
      },
      {
        arabic: "الْحِصَارُ وَالثَّبَاتُ",
        title: "The Siege and Steadfastness",
        body: "The Confederate army arrived and found the trench — an obstacle they had never encountered. The siege lasted nearly a month. Food was scarce; the companions tied stones to their stomachs to suppress hunger. The Prophet ﷺ tied two stones. Psychological pressure mounted when the Banū Qurayẓa — a Jewish tribe bound by treaty — broke their covenant and threatened Madinah from within. The believers were tested to their limit. The Qurʾān recorded: 'And when the eyes were terrified and the hearts reached the throats' (33:10).",
      },
      {
        arabic: "الرِّيحُ الْإِلَهِيَّةُ",
        title: "The Divine Wind",
        body: "Then Allāh sent His unseen army. A violent wind — a divine storm — swept through the Confederate camp at night, overturning tents, extinguishing fires, scattering provisions, and filling hearts with dread. Nuʿaym ibn Masʿūd, newly converted in secret, sowed distrust between the Confederate tribes and the Banū Qurayẓa through masterful diplomacy. The coalition fractured. Abū Sufyān gave the order to withdraw. The greatest army ever assembled against Madinah dissolved without crossing the trench.",
      },
      {
        arabic: "الدُّرُوسُ الْعُلْيَا",
        title: "The Supreme Lessons",
        body: "Khandaq established the principle of strategic innovation in Islam — that wisdom from any civilization may be employed in the service of truth. It demonstrated that Allāh's help arrives precisely at the moment of maximum trial, not before. And it fulfilled the Prophet's ﷺ prophecy: 'After today, they will not attack you — you will attack them.' The age of defensive warfare was ending. The age of expansion was beginning.",
      },
    ],
  },
  {
    id: "hunayn",
    number: "III",
    arabic: "غَزْوَةُ حُنَيْنٍ",
    title: "The Battle of Ḥunayn",
    subtitle: "8 AH · 630 CE · Valley of Ḥunayn",
    color: "#27AE60",
    glow: "rgba(39,174,96,0.4)",
    hz: "963Hz",
    sections: [
      {
        arabic: "بَعْدَ الْفَتْحِ",
        title: "After the Conquest",
        body: "Weeks after the bloodless conquest of Makkah, the Prophet ﷺ led an army of twelve thousand — the largest Muslim force ever assembled — toward the valley of Ḥunayn. The Hawāzin and Thaqīf tribes had gathered to challenge the newly expanded Muslim state, deploying their families, livestock, and all their possessions behind their lines to ensure their warriors would fight to the last. Their archers were positioned in the narrow passes of the valley.",
      },
      {
        arabic: "الِابْتِلَاءُ بِالْكَثْرَةِ",
        title: "The Trial of Numbers",
        body: "As the Muslim vanguard entered the valley in the pre-dawn darkness, the Hawāzin archers unleashed a devastating volley from the heights. The vanguard broke and fled — and the rout spread through the army. Some companions later admitted that a thought had crossed their minds: 'We are twelve thousand — we cannot be defeated by numbers.' That very pride was the trial. The Qurʾān descended: 'Allāh has already given you victory in many regions, and on the day of Ḥunayn, when your great number pleased you, but it did not avail you at all' (9:25).",
      },
      {
        arabic: "صَوْتُ النَّبِيِّ ﷺ",
        title: "The Voice of the Prophet ﷺ",
        body: "In the chaos of the rout, the Prophet ﷺ did not flee. He advanced on his white mule toward the enemy, calling out: 'I am the Prophet — no lie! I am the son of ʿAbd al-Muṭṭalib!' His uncle al-ʿAbbās, with a powerful voice, called the companions back: 'O people of the Samura! O people of Sūrat al-Baqara!' The companions heard and turned. They came back running — some dismounting from their horses, throwing themselves back into the battle.",
      },
      {
        arabic: "النَّصْرُ وَالرَّحْمَةُ",
        title: "Victory and Mercy",
        body: "The tide turned completely. The Hawāzin were routed. Six thousand prisoners were taken, along with vast spoils. But the Prophet ﷺ demonstrated the highest mercy: when a delegation from the Hawāzin came to request the return of their families, he consulted his companions and then released all six thousand captives without ransom. He said: 'Whoever wishes to give back freely, let him do so; whoever wishes to keep his share, we will compensate him from the first spoils Allāh grants us.' Every captive was freed.",
      },
      {
        arabic: "الدُّرُوسُ الْعُلْيَا",
        title: "The Supreme Lessons",
        body: "Ḥunayn taught the eternal lesson that victory belongs to Allāh alone — that numbers, preparation, and strength are means, not guarantees. The moment the companions trusted in their numbers, the numbers failed them. The moment they returned to Allāh through the call of His Prophet ﷺ, the victory was restored. And in the aftermath, the Prophet's ﷺ mercy — releasing six thousand prisoners — demonstrated that the purpose of victory in Islam is not domination but liberation.",
      },
    ],
  },
];

// ── WEB AUDIO 741Hz ───────────────────────────────────────────────────────────
function useAudio741() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(() => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);
    gain.connect(ctx.destination);
    gainRef.current = gain;

    const freqs = [741, 370.5, 1482, 247];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(i === 0 ? 0.5 : 0.15 - i * 0.03, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start();
    });
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current) return;
    gainRef.current?.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 1.5);
    setTimeout(() => {
      ctxRef.current?.close();
      ctxRef.current = null;
      gainRef.current = null;
      setPlaying(false);
    }, 1600);
  }, []);

  useEffect(() => () => { ctxRef.current?.close(); }, []);
  return { playing, start, stop };
}

// ── STARFIELD CANVAS ──────────────────────────────────────────────────────────
function Starfield({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.7 + 0.2,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(s.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AlGhazwat() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { playing, start, stop } = useAudio741();
  const mainRef = useRef<HTMLDivElement>(null);

  const chapter = CHAPTERS[activeChapter];

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

  // Reset section when chapter changes
  useEffect(() => { setActiveSection(0); }, [activeChapter]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#04080F", color: "#E8EDF2", fontFamily: "'Crimson Text', 'Georgia', serif" }}
    >
      {/* ── PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%`, background: `linear-gradient(90deg, ${chapter.color}, #FFB800)` }}
        />
      </div>

      {/* ── HEADER ── */}
      <header
        className="sticky top-0.5 z-40 border-b"
        style={{ background: "rgba(4,8,15,0.96)", borderColor: `${chapter.color}30`, backdropFilter: "blur(20px)" }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/seerah">
              <button className="text-xs font-mono px-3 py-1.5 rounded border transition-colors" style={{ borderColor: `${chapter.color}40`, color: chapter.color }}>
                ← Seerah
              </button>
            </Link>
            <div>
              <div className="font-bold text-white text-sm">Al-Ghazwāt — الْغَزَوَاتُ</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>Sacred Expeditions Chronicle · Scroll V</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-xs font-mono px-3 py-1.5 rounded border"
              style={{ borderColor: `${chapter.color}40`, color: chapter.color }}
            >
              ☰ Chapters
            </button>
            <button
              onClick={playing ? stop : start}
              className="text-xs font-mono px-3 py-1.5 rounded border transition-all"
              style={{
                borderColor: playing ? `${chapter.color}80` : `${chapter.color}40`,
                color: chapter.color,
                background: playing ? `${chapter.color}15` : "transparent",
              }}
            >
              {playing ? `◉ ${chapter.hz}` : `▷ ${chapter.hz}`}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* ── CHAPTER SIDEBAR ── */}
        <aside
          className="fixed left-0 top-0 bottom-0 z-30 transition-transform duration-300 border-r overflow-y-auto"
          style={{
            width: "280px",
            background: "rgba(4,8,15,0.98)",
            borderColor: "rgba(255,255,255,0.06)",
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            paddingTop: "80px",
          }}
        >
          <div className="p-6">
            <div className="text-xs font-mono tracking-widest mb-6" style={{ color: "#8899AA" }}>CHAPTERS</div>
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => { setActiveChapter(i); setSidebarOpen(false); }}
                className="w-full text-left p-4 rounded-xl mb-3 transition-all duration-200 border"
                style={{
                  background: activeChapter === i ? `${ch.color}12` : "transparent",
                  borderColor: activeChapter === i ? `${ch.color}50` : "rgba(255,255,255,0.06)",
                }}
              >
                <div className="text-xs font-mono mb-1" style={{ color: ch.color }}>CHAPTER {ch.number}</div>
                <div className="font-bold text-white text-sm mb-1">{ch.title}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{ch.subtitle}</div>
                <div className="text-xs mt-2 font-mono" style={{ color: ch.color }}>{ch.hz}</div>
              </button>
            ))}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#8899AA" }}>SEERAH LIBRARY</div>
              {[
                { label: "Noor al-Mawlid", href: "/seerah/noor-al-mawlid" },
                { label: "Al-Hijra", href: "/seerah/al-hijra" },
                { label: "Badr", href: "/seerah/badr" },
                { label: "Fatḥ Makkah", href: "/seerah/fath-makkah" },
                { label: "Seerah Index", href: "/seerah" },
              ].map((l) => (
                <Link key={l.href} href={l.href}>
                  <div className="text-sm py-2 px-3 rounded hover:bg-white/5 transition-colors cursor-pointer" style={{ color: "#8899AA" }}>
                    {l.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* ── SIDEBAR OVERLAY ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── MAIN CONTENT ── */}
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {/* Chapter Hero */}
          <section
            className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
            style={{ background: `radial-gradient(ellipse at center, ${chapter.glow} 0%, #04080F 70%)` }}
          >
            <Starfield color={chapter.color} />
            <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto">
              <div className="text-xs font-mono tracking-widest mb-4" style={{ color: chapter.color }}>
                CHAPTER {chapter.number} · {chapter.hz}
              </div>
              <div
                className="text-5xl md:text-7xl mb-6 font-bold"
                style={{ color: chapter.color, fontFamily: "'Noto Naskh Arabic', serif", direction: "rtl" }}
              >
                {chapter.arabic}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{chapter.title}</h1>
              <p className="text-lg" style={{ color: "#8899AA" }}>{chapter.subtitle}</p>

              {/* Chapter navigation tabs */}
              <div className="flex justify-center gap-2 mt-8 flex-wrap">
                {CHAPTERS.map((ch, i) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapter(i)}
                    className="px-4 py-2 rounded-full text-sm font-mono transition-all border"
                    style={{
                      background: activeChapter === i ? `${ch.color}20` : "transparent",
                      borderColor: activeChapter === i ? `${ch.color}60` : `${ch.color}30`,
                      color: activeChapter === i ? ch.color : "#8899AA",
                    }}
                  >
                    {ch.number}. {ch.title.split(" ").slice(-1)[0]}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Section Navigation */}
          <div
            className="sticky top-12 z-10 border-b overflow-x-auto"
            style={{ background: "rgba(4,8,15,0.95)", borderColor: `${chapter.color}20` }}
          >
            <div className="flex gap-1 px-6 py-3 min-w-max">
              {chapter.sections.map((sec, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSection(i)}
                  className="px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-all"
                  style={{
                    background: activeSection === i ? `${chapter.color}20` : "transparent",
                    color: activeSection === i ? chapter.color : "#8899AA",
                    border: `1px solid ${activeSection === i ? chapter.color + "50" : "transparent"}`,
                  }}
                >
                  {i + 1}. {sec.title.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>
          </div>

          {/* Active Section Content */}
          <div className="max-w-3xl mx-auto px-6 py-16">
            {chapter.sections.map((sec, i) => (
              <div
                key={i}
                id={`section-${i}`}
                className={`mb-20 transition-all duration-500 ${activeSection === i ? "opacity-100" : "opacity-40"}`}
                onClick={() => setActiveSection(i)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="text-2xl mb-3 text-right"
                  style={{ color: chapter.color, fontFamily: "'Noto Naskh Arabic', serif", direction: "rtl" }}
                >
                  {sec.arabic}
                </div>
                <h2 className="text-2xl font-bold text-white mb-6 border-b pb-4" style={{ borderColor: `${chapter.color}30` }}>
                  {sec.title}
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: "#C8D3DC", lineHeight: "2" }}>
                  {sec.body}
                </p>
                {activeSection === i && (
                  <div className="mt-8 flex gap-3">
                    {i > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveSection(i - 1); }}
                        className="px-4 py-2 rounded text-sm font-mono border transition-colors"
                        style={{ borderColor: `${chapter.color}40`, color: chapter.color }}
                      >
                        ← Previous
                      </button>
                    )}
                    {i < chapter.sections.length - 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveSection(i + 1); }}
                        className="px-4 py-2 rounded text-sm font-mono border transition-colors"
                        style={{ borderColor: `${chapter.color}40`, color: chapter.color, background: `${chapter.color}10` }}
                      >
                        Continue →
                      </button>
                    )}
                    {i === chapter.sections.length - 1 && activeChapter < CHAPTERS.length - 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveChapter(activeChapter + 1); }}
                        className="px-4 py-2 rounded text-sm font-mono border transition-colors"
                        style={{ borderColor: `${CHAPTERS[activeChapter + 1].color}40`, color: CHAPTERS[activeChapter + 1].color, background: `${CHAPTERS[activeChapter + 1].color}10` }}
                      >
                        Next Chapter: {CHAPTERS[activeChapter + 1].title} →
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Closing Seal */}
          <section
            className="relative py-24 text-center overflow-hidden"
            style={{ background: `radial-gradient(ellipse at center, ${chapter.glow} 0%, #04080F 70%)` }}
          >
            <Starfield color={chapter.color} />
            <div className="relative z-10 max-w-2xl mx-auto px-6">
              <div className="text-4xl mb-6" style={{ color: chapter.color, fontFamily: "'Noto Naskh Arabic', serif" }}>
                ﷺ
              </div>
              <div
                className="text-2xl mb-4 font-bold"
                style={{ color: chapter.color, fontFamily: "'Noto Naskh Arabic', serif", direction: "rtl" }}
              >
                اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ
              </div>
              <p className="text-sm mb-8" style={{ color: "#8899AA" }}>
                Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/seerah">
                  <button className="px-6 py-3 rounded-xl text-sm font-mono border transition-colors" style={{ borderColor: `${chapter.color}40`, color: chapter.color }}>
                    ← Seerah Library
                  </button>
                </Link>
                <Link href="/seerah/quiz">
                  <button
                    className="px-6 py-3 rounded-xl text-sm font-mono border transition-colors"
                    style={{ background: `${chapter.color}20`, borderColor: `${chapter.color}60`, color: chapter.color }}
                  >
                    Test Your Knowledge →
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
