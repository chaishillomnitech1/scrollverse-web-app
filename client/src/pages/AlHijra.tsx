/*
 * AL-HIJRA — The Sacred Migration
 * /seerah/al-hijra
 * Museum-grade sacred scroll · 12 sections · Web Audio 216Hz drone
 * Parallax starfield canvas · Zero human figures · Strict adab
 * Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

interface ScrollSection {
  id: string;
  arabic: string;
  title: string;
  meta: string;
  year: string;
  body: string;
  symbol: string;
}

const HIJRA_SECTIONS: ScrollSection[] = [
  {
    id: "I",
    arabic: "الإِذْنُ الإِلَهِيّ",
    title: "The Divine Permission",
    meta: "Makkah al-Mukarramah — Year 13 of Prophethood",
    year: "622 CE",
    symbol: "◈",
    body:
      "After thirteen years of patient endurance in Makkah, the divine permission for migration arrives. The societal pressure upon the believing community reaches its apex — economic boycotts, physical persecution, and the assassination plot against the Prophet ﷺ himself. The command descends: migrate to the northern oasis of Yathrib. This is not flight — it is the strategic repositioning of the light to where it may illuminate the world.",
  },
  {
    id: "II",
    arabic: "لَيْلَةُ الخُرُوجِ",
    title: "The Night of Departure",
    meta: "The Encircled House — The Green Mantle",
    year: "1 Rabīʿ al-Awwal",
    symbol: "◉",
    body:
      "Armed operatives from the Quraysh encircle the home of the Prophet ﷺ, awaiting dawn to strike. ʿAlī ibn Abī Ṭālib (RA) assumes the position upon the couch, wrapped in the familiar green mantle as a tactical shield of love. The Prophet ﷺ steps through the perimeter unseen, casting dust into the air while reciting Sūrah Yā-Sīn: 'And We have put a barrier before them and a barrier behind them, and We have covered them so they do not see.' The encirclement becomes a void.",
  },
  {
    id: "III",
    arabic: "صُحْبَةُ الصِّدِّيقِ",
    title: "The Companionship of al-Ṣiddīq",
    meta: "Abū Bakr al-Ṣiddīq (RA) — The Second of Two",
    year: "Night of Departure",
    symbol: "⬡",
    body:
      "The Prophet ﷺ arrives at the home of Abū Bakr al-Ṣiddīq (RA) before dawn. The Qurʾān would later immortalize this moment: 'the second of two, when they were in the cave, when he said to his companion: Do not grieve — indeed Allāh is with us.' Abū Bakr weeps — not from fear, but from the overwhelming honour of being chosen as the companion of this journey. He had prepared two riding camels for months, knowing this day would come.",
  },
  {
    id: "IV",
    arabic: "كَهْفُ ثَوْرٍ",
    title: "The Sanctuary of Cave Thawr",
    meta: "Three Days of Sacred Concealment",
    year: "Days 1–3 of the Migration",
    symbol: "◎",
    body:
      "The Prophet ﷺ and Abū Bakr (RA) descend south — away from Madinah — to confuse the trackers, and shelter in Cave Thawr for three days. As the Quraysh pursuit party closes in on the exact coordinate, the environment itself responds: a spider weaves an intricate web across the cave mouth, and a desert dove nests undisturbed at the entrance. The trackers glance at the unbroken web and alter their route. The cave becomes a fortress of divine protection.",
  },
  {
    id: "V",
    arabic: "لَا تَحْزَنْ",
    title: "Be Not Sad",
    meta: "The Internal Resonance of Absolute Trust",
    year: "Inside Cave Thawr",
    symbol: "◇",
    body:
      "Standing within inches of discovery, Abū Bakr (RA) whispers his concern: 'If one of them were to look down at his feet, he would see us.' The response that returns is the anchor of the entire migration: 'Be not sad — indeed Allāh is with us.' In this moment, a tranquility descends that no army could provide. This is the frequency of tawakkul — absolute reliance — crystallized into a single sentence that the Qurʾān preserves for all time.",
  },
  {
    id: "VI",
    arabic: "سُرَاقَةُ وَالوَعْدُ الذَّهَبِيّ",
    title: "Surāqah and the Golden Promise",
    meta: "The Sinking Hooves — The Sovereign Prophecy",
    year: "Open Desert — Day 4",
    symbol: "⬟",
    body:
      "The bounty-hunter Surāqah ibn Mālik rides hard across the desert, closing the distance. Three times he draws near, and three times his horse's hooves sink into the sand as if the earth itself refuses passage. Recognizing the divine barrier, Surāqah requests safety and receives a promise that would only be fulfilled decades later: 'How will you be, O Surāqah, when you wear the golden bracelets of Chosroes?' The conqueror of Persia is promised to a man who has not yet reached his destination.",
  },
  {
    id: "VII",
    arabic: "قُبَاءُ — أَوَّلُ مَسْجِدٍ",
    title: "Qubāʾ — The First Masjid",
    meta: "The Inaugural Stone Marker of the New Order",
    year: "8 Rabīʿ al-Awwal, 1 AH",
    symbol: "◆",
    body:
      "After days of desert traversal, the caravan arrives at the southern outskirts of Yathrib — the settlement of Qubāʾ. Here, before entering the city, the Prophet ﷺ lays the first stone of the first masjid built upon taqwā — pure, unshakeable God-consciousness. The Qurʾān declares: 'A masjid founded from the first day upon righteousness is more worthy that you stand in it.' The physical anchor of the new civilisation is set.",
  },
  {
    id: "VIII",
    arabic: "دُخُولُ المَدِينَةِ",
    title: "The Entry into Al-Madīnah",
    meta: "Yathrib Transformed — The Enlightened City",
    year: "12 Rabīʿ al-Awwal, 1 AH",
    symbol: "✦",
    body:
      "The entry into the city splits the timeline permanently. The Anṣār — the Helpers — line the palmgrove pathways singing the Ṭalaʿa al-Badru ʿAlaynā: 'The full moon has risen over us from the valley of Wadāʿ — gratitude is binding upon us, as long as a caller calls to Allāh.' The city of Yathrib is formally renamed Al-Madīnah al-Munawwarah — The Radiant City. The Islamic calendar begins. Year 1 is sealed.",
  },
  {
    id: "IX",
    arabic: "مُؤَاخَاةُ الأَنْصَارِ وَالمُهَاجِرِينَ",
    title: "The Brotherhood Covenant",
    meta: "Anṣār and Muhājirūn — The Social Architecture",
    year: "1 AH — Madinah",
    symbol: "⬢",
    body:
      "One of the first acts in Madinah is the establishment of the muʾākhāh — the Brotherhood Covenant. Each Muhājir (emigrant) is paired with an Anṣārī (helper) as a true brother in faith. The Anṣār offer half their wealth, their homes, their orchards. This is not charity — it is the construction of a new social architecture where belonging is not determined by blood or tribe, but by shared commitment to the divine. The first welfare state is born.",
  },
  {
    id: "X",
    arabic: "الصَّحِيفَةُ المَدَنِيَّةُ",
    title: "The Constitution of Madinah",
    meta: "The First Written Social Contract",
    year: "1 AH — Madinah",
    symbol: "◐",
    body:
      "The Prophet ﷺ drafts the Ṣaḥīfat al-Madīnah — the Constitution of Madinah — a written covenant between the Muslim emigrants, the Anṣār, and the Jewish tribes of the city. It establishes collective security, freedom of religion, shared defense obligations, and the principle that disputes are resolved by Allāh and His Messenger. Fourteen centuries before the modern concept of a constitutional state, this document exists as the first written constitution in human history.",
  },
  {
    id: "XI",
    arabic: "المَسْجِدُ النَّبَوِيّ",
    title: "The Prophet's Masjid",
    meta: "The Architectural Heart of the New Civilisation",
    year: "1 AH — Madinah",
    symbol: "◑",
    body:
      "The Prophet ﷺ's camel is released to walk freely and kneel where it will — the site of the masjid is chosen by divine guidance, not human preference. The Prophet ﷺ himself carries bricks alongside his companions, reciting: 'O Allāh, there is no good except the good of the Hereafter — so forgive the Anṣār and the Muhājirūn.' The masjid becomes simultaneously a house of prayer, a school, a court, a welfare centre, and the command headquarters of the emerging civilisation.",
  },
  {
    id: "XII",
    arabic: "التَّحْوِيلُ الكَوْنِيّ",
    title: "The Cosmic Transformation",
    meta: "The Hijra as Universal Inflection Point",
    year: "622 CE — The Permanent Seal",
    symbol: "✧",
    body:
      "The Hijra is not merely a historical event — it is the cosmic inflection point that divides all of human time. The second Caliph ʿUmar ibn al-Khaṭṭāb (RA) establishes it as Year 1 of the Islamic calendar, recognising that this migration marks the moment when the divine message gained its permanent earthly foundation. Every date in Islamic history is measured from this point. The migration of one man and his companion from one city to another becomes the axis around which fourteen centuries of civilisation revolve.",
  },
];

// ── Parallax Starfield Canvas ─────────────────────────────────────────────────
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

    // Generate stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.15 + 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      stars.forEach((s) => {
        const twinkle = Math.sin(s.twinklePhase + frame * 0.02) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 100, ${s.opacity * twinkle})`;
        ctx.fill();
        // Slow downward drift
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ── Geometric Ornament ────────────────────────────────────────────────────────
function GeometricOrnament({ symbol }: { symbol: string }) {
  return (
    <div
      className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        background: "rgba(212, 175, 55, 0.06)",
        border: "1px solid rgba(212, 175, 55, 0.25)",
        color: "#D4AF37",
        fontSize: "1.25rem",
        fontFamily: "monospace",
      }}
    >
      {symbol}
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ section, index }: { section: ScrollSection; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), index * 60);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      <div
        className="rounded-xl p-6 relative overflow-hidden"
        style={{
          background: "rgba(5, 4, 12, 0.85)",
          border: "1px solid rgba(212, 175, 55, 0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Gold left accent */}
        <div
          className="absolute top-0 left-0 w-0.5 h-full"
          style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)",
          }}
        />

        {/* Header row */}
        <div className="flex items-start gap-4 mb-4">
          <GeometricOrnament symbol={section.symbol} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: "#D4AF37" }}
              >
                {section.id}
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: "rgba(212,175,55,0.45)" }}
              >
                {section.year}
              </span>
            </div>
            <h3
              className="font-bold text-base leading-snug mb-0.5"
              style={{ color: "#F5E6C8", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {section.title}
            </h3>
            <p
              className="text-sm font-bold"
              style={{
                color: "#D4AF37",
                fontFamily: "'Amiri', 'Scheherazade New', serif",
                direction: "rtl",
                textAlign: "right",
              }}
            >
              {section.arabic}
            </p>
          </div>
        </div>

        {/* Meta tag */}
        <div
          className="text-xs mb-3 font-mono"
          style={{ color: "rgba(212,175,55,0.4)" }}
        >
          ◈ {section.meta}
        </div>

        {/* Body */}
        <p
          className="text-sm leading-relaxed"
          style={{
            color: "rgba(234, 222, 201, 0.75)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {section.body}
        </p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AlHijra() {
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscRefs = useRef<OscillatorNode[]>([]);

  const toggleAudio = () => {
    if (audioActive) {
      // Fade out then stop
      const gain = gainRef.current;
      const ctx = audioCtxRef.current;
      if (gain && ctx) {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => {
          oscRefs.current.forEach((o) => {
            try { o.stop(); } catch {}
          });
          oscRefs.current = [];
        }, 1600);
      }
      setAudioActive(false);
    } else {
      const ContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new ContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.018, ctx.currentTime + 2);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      // 216 Hz — Hijra frequency (half of 432 Hz healing tone)
      const freqs = [216, 432, 648]; // fundamental + harmonics
      const gains = [0.6, 0.25, 0.1];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        oscGain.gain.setValueAtTime(gains[i], ctx.currentTime);
        osc.connect(oscGain).connect(masterGain);
        osc.start();
        oscRefs.current.push(osc);
      });

      setAudioActive(true);
    }
  };

  useEffect(() => {
    return () => {
      oscRefs.current.forEach((o) => { try { o.stop(); } catch {} });
    };
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #0D0A1A 0%, #03020A 60%)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <StarfieldCanvas />

      {/* Content layer */}
      <div className="relative z-10">
        {/* ── Navigation bar ── */}
        <nav
          className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
          style={{
            background: "rgba(3, 2, 10, 0.9)",
            borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
            backdropFilter: "blur(16px)",
          }}
        >
          <Link href="/seerah">
            <a
              className="flex items-center gap-2 text-xs font-mono transition-colors hover:text-yellow-400"
              style={{ color: "rgba(212,175,55,0.6)" }}
            >
              ← Seerah Archive
            </a>
          </Link>
          <div
            className="text-xs font-mono tracking-widest"
            style={{ color: "rgba(212,175,55,0.4)" }}
          >
            SEERAH · SECTION II
          </div>
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
            style={{
              background: audioActive
                ? "rgba(212,175,55,0.08)"
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${audioActive ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: audioActive ? "#D4AF37" : "rgba(255,255,255,0.3)",
            }}
          >
            <span
              className={audioActive ? "animate-pulse" : ""}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: audioActive ? "#D4AF37" : "rgba(255,255,255,0.2)",
                display: "inline-block",
              }}
            />
            {audioActive ? "216Hz Active" : "Engage Tone"}
          </button>
        </nav>

        {/* ── Hero Header ── */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
          {/* Bismillah */}
          <div
            className="text-2xl mb-6"
            style={{
              color: "rgba(212,175,55,0.5)",
              fontFamily: "'Amiri', 'Scheherazade New', serif",
              direction: "rtl",
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <div
            className="text-xs font-mono tracking-widest mb-4"
            style={{ color: "rgba(212,175,55,0.5)" }}
          >
            SEERAH SACRED SCROLL · SECTION II OF XII
          </div>

          <h1
            className="text-3xl md:text-4xl font-black mb-3 tracking-wide"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F5E6C8, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AL-HIJRA
          </h1>

          <div
            className="text-2xl mb-4"
            style={{
              color: "#D4AF37",
              fontFamily: "'Amiri', 'Scheherazade New', serif",
              direction: "rtl",
            }}
          >
            الهِجْرَةُ المُقَدَّسَة
          </div>

          <p
            className="text-sm leading-relaxed max-w-xl mx-auto mb-6"
            style={{ color: "rgba(234,222,201,0.55)" }}
          >
            The Sacred Migration from Makkah al-Mukarramah to Al-Madīnah al-Munawwarah.
            622 CE — Year 1 of the Islamic Calendar. Twelve sections of sacred testimony,
            rendered in pure text, light, and geometric form. Zero human imagery. Strict adab.
          </p>

          {/* Ṣalawāt */}
          <div
            className="text-sm py-3 px-6 rounded-xl inline-block"
            style={{
              background: "rgba(212,175,55,0.04)",
              border: "1px solid rgba(212,175,55,0.15)",
              color: "rgba(212,175,55,0.7)",
              fontFamily: "'Amiri', 'Scheherazade New', serif",
              direction: "rtl",
            }}
          >
            اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ ﷺ
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 mt-8">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3))" }}
            />
            <span style={{ color: "rgba(212,175,55,0.4)", fontSize: "0.7rem", fontFamily: "monospace" }}>
              ◈ ◇ ◈
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.3))" }}
            />
          </div>
        </header>

        {/* ── Scroll Sections ── */}
        <main className="max-w-3xl mx-auto px-6 pb-16 space-y-6">
          {HIJRA_SECTIONS.map((section, i) => (
            <SectionCard key={section.id} section={section} index={i} />
          ))}

          {/* ── Closing Seal ── */}
          <div
            className="rounded-xl p-8 text-center mt-8"
            style={{
              background: "rgba(212,175,55,0.03)",
              border: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            <div
              className="text-xl mb-3"
              style={{
                color: "rgba(212,175,55,0.6)",
                fontFamily: "'Amiri', 'Scheherazade New', serif",
                direction: "rtl",
              }}
            >
              صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
            </div>
            <div
              className="text-xs font-mono tracking-widest mb-4"
              style={{ color: "rgba(212,175,55,0.4)" }}
            >
              YEAR 1 AL-HIJRA · BASELINE SEALED · 622 CE
            </div>
            <p
              className="text-xs leading-relaxed max-w-md mx-auto"
              style={{ color: "rgba(234,222,201,0.4)" }}
            >
              This scroll is a sacred trust. It contains no human imagery, no speculation,
              and no embellishment beyond what the authenticated historical record supports.
              May it be a source of light and guidance.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Link href="/seerah">
                <a
                  className="px-5 py-2 rounded-lg text-xs font-mono transition-all hover:opacity-80"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    color: "#D4AF37",
                  }}
                >
                  ← Return to Seerah Archive
                </a>
              </Link>
              <Link href="/seerah/noor-al-mawlid">
                <a
                  className="px-5 py-2 rounded-lg text-xs font-mono transition-all hover:opacity-80"
                  style={{
                    background: "rgba(0,212,255,0.05)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    color: "#00D4FF",
                  }}
                >
                  Section I: Noor al-Mawlid →
                </a>
              </Link>
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer
          className="text-center py-6 text-xs font-mono"
          style={{
            borderTop: "1px solid rgba(212,175,55,0.08)",
            color: "rgba(212,175,55,0.3)",
          }}
        >
          SCROLLVERSE SEERAH ARCHIVE · AL-HIJRA · 622 CE · SECTION II
        </footer>
      </div>
    </div>
  );
}
