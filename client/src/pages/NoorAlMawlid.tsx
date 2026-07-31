/*
 * NOOR AL-MAWLID — نور المولد
 * The Sacred Scroll of the Prophet's Birth ﷺ
 * Part 1 (Birth Scroll) + Part 2 (Years with Ḥalīmah)
 * Design: Midnight blue, gold Islamic geometry, lantern flicker, parallax stars, scroll-reveal
 * Adab: Zero human figures — only light, Kaʿbah, tents, lanterns, calligraphy, and text
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

interface ScrollSection {
  id: string;
  number: string;
  titleEn: string;
  titleAr: string;
  body: React.ReactNode;
  symbol?: string;
  part?: 1 | 2;
}

const SECTIONS: ScrollSection[] = [
  {
    id: "sec1",
    number: "— 1 —",
    titleEn: "The Noble Lineage",
    titleAr: "النسب الشريف",
    part: 1,
    symbol: "🕋",
    body: (
      <>
        <p>From <strong>Hāshim</strong> of Quraysh, through <strong>ʿAbd al-Muṭṭalib</strong>, to <strong>ʿAbdullāh</strong> — the purest branch of the Banū Hāshim.</p>
        <p className="mt-3">And from <strong>Āminah bint Wahb</strong> of the noble Banū Zuhrah, the lineage ascends to <strong>Ismāʿīl</strong> (AS), son of <strong>Ibrāhīm</strong> (AS), the friend of the All-Merciful.</p>
        <p className="mt-3 italic" style={{ color: "#b8a88a" }}>
          "I am the answer to the duʿāʾ of my father Ibrāhīm, the glad tidings of my brother ʿĪsā, and the dream of my mother Āminah."
        </p>
        <div className="mt-4 text-center text-sm" style={{ color: "#5a4e3a", letterSpacing: "0.12em" }}>
          Hāshim · ʿAbd al-Muṭṭalib · ʿAbdullāh · Āminah
        </div>
      </>
    ),
  },
  {
    id: "sec2",
    number: "— 2 —",
    titleEn: "The Blessed Pregnancy",
    titleAr: "الحمل المبارك",
    part: 1,
    symbol: "🏮",
    body: (
      <>
        <p>When <strong>Āminah</strong> carried the light of the worlds, the house was filled with peace. She saw in a dream a radiant tree whose branches stretched to the heavens, and a voice said:</p>
        <p className="italic text-center my-4" style={{ color: "#d4af37" }}>
          "You carry the master of the children of Ādam. Name him <strong>Muḥammad</strong>."
        </p>
        <p>Jibrīl (AS) came with glad tidings, and the angels surrounded her with orbs of pure light. The journey to Yathrib was eased, and every step was blessed.</p>
        <p className="mt-3 text-center" style={{ color: "#b8a88a" }}>
          <span style={{ color: "#f5d742" }}>✦</span> The light of prophethood filled the house <span style={{ color: "#f5d742" }}>✦</span>
        </p>
      </>
    ),
  },
  {
    id: "sec3",
    number: "— 3 —",
    titleEn: "The Light of Buṣrā",
    titleAr: "نور بصرى",
    part: 1,
    symbol: "✦",
    body: (
      <>
        <p>The monk <strong>Baḥīrā</strong> saw the cloud that followed the young caravan. He recognised the seal of prophethood and the light that illuminated the palaces of <strong>Buṣrā</strong>.</p>
        <p className="mt-3">In Makkah, the idols around the Kaʿbah fell untouched. The Quraysh were astonished, and the keepers of the sanctuary knew that something great was approaching.</p>
        <div className="mt-4 text-center text-sm" style={{ color: "#5a4e3a", letterSpacing: "0.1em" }}>
          🏮 The light preceded the Prophet ﷺ 🏮
        </div>
      </>
    ),
  },
  {
    id: "sec4",
    number: "— 4 —",
    titleEn: "The Night of Birth",
    titleAr: "ليلة الميلاد",
    part: 1,
    symbol: "🌙",
    body: (
      <>
        <p>On the night of <strong>12 Rabīʿ al-Awwal</strong>, the labour was easy. The angels descended as orbs of light, filling the house with a fragrance that had never been known. The universe paused in reverence.</p>
        <p className="italic text-center my-4" style={{ color: "#d4af37" }}>
          "He was born with his head raised to the heavens."
        </p>
        <p>The stars bent their light toward Makkah, and the fire of the Magians was extinguished. The throne of Kisrā shook, and the world knew that the Chosen One had arrived.</p>
        <div className="mt-4 text-center text-sm" style={{ color: "#5a4e3a", letterSpacing: "0.1em" }}>
          <span style={{ color: "#f5d742" }}>✦</span> The universe paused <span style={{ color: "#f5d742" }}>✦</span>
        </div>
      </>
    ),
  },
  {
    id: "sec5",
    number: "— 5 —",
    titleEn: "The Signs",
    titleAr: "الآيات",
    part: 1,
    symbol: "ﷺ",
    body: (
      <>
        <p>Between his shoulders was the <strong>Seal of Prophethood</strong>, a calligraphy medallion inscribed with divine light.</p>
        <div className="flex justify-center my-6">
          <div
            className="flex items-center justify-center rounded-full text-2xl"
            style={{
              width: 100, height: 100,
              border: "2px solid rgba(212,175,55,0.3)",
              background: "radial-gradient(circle at center, rgba(212,175,55,0.06), transparent)",
              color: "#d4af37",
              boxShadow: "0 0 40px rgba(212,175,55,0.04)",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            ﷺ
          </div>
        </div>
        <p>His grandfather <strong>ʿAbd al-Muṭṭalib</strong> took him to the Kaʿbah and made duʿāʾ, saying:</p>
        <p className="italic text-center my-3" style={{ color: "#d4af37" }}>
          "O Allah, protect him. He is the light of my eyes."
        </p>
        <p>The signs were clear. The world had been waiting.</p>
      </>
    ),
  },
  {
    id: "sec6",
    number: "— 6 —",
    titleEn: "The Naming",
    titleAr: "التسمية",
    part: 1,
    symbol: "محمد",
    body: (
      <>
        <p>On the seventh day, the family gathered. His grandfather placed him in his lap and named him <strong>Muḥammad</strong>.</p>
        <div className="flex justify-center my-5">
          <div
            className="inline-block px-8 py-3 rounded-lg text-4xl"
            style={{
              border: "2px solid rgba(212,175,55,0.25)",
              background: "rgba(212,175,55,0.03)",
              color: "#d4af37",
              fontFamily: "'Times New Roman', serif",
              letterSpacing: "0.12em",
            }}
          >
            محمد
          </div>
        </div>
        <p className="italic text-center my-3" style={{ color: "#d4af37" }}>
          "That he be praised in the heavens and on the earth."
        </p>
        <p>And so the one who would be praised by all creation received his name — a name that had never been given to any before him.</p>
      </>
    ),
  },
  {
    id: "sec7",
    number: "— 7 —",
    titleEn: "The Desert Tradition",
    titleAr: "الرضاع في البادية",
    part: 1,
    symbol: "⛺",
    body: (
      <>
        <p>It was the noble custom of the Quraysh to send their infants to the Bedouin tribes. The pure air and eloquent tongue of the desert would shape the child.</p>
        <div className="text-center my-4">
          <span className="text-3xl" style={{ letterSpacing: "0.3em", opacity: 0.6 }}>⛺ ⛺ ⛺</span>
          <div className="mt-2 text-3xl">🥛</div>
        </div>
        <p>When the wet-nurses gathered near the Kaʿbah, <strong>Ḥalīmah</strong> (RA) found the infant and felt a light enter her heart. She took him, and the blessing began.</p>
        <div className="mt-3 text-center text-sm" style={{ color: "#5a4e3a", letterSpacing: "0.1em" }}>
          The bowl never emptied · The flock never went hungry
        </div>
      </>
    ),
  },
  // Part 2
  {
    id: "sec8",
    number: "— 8 —",
    titleEn: "The Blessing of the Milk",
    titleAr: "بركة اللبن",
    part: 2,
    symbol: "🌾",
    body: (
      <>
        <p>Ḥalīmah (RA) returned to her tribe. Her land had been barren, her flock thin. But with the infant Muḥammad ﷺ, the blessing poured forth.</p>
        <p className="mt-3">The bowl of milk never emptied. The flock returned full. The tribe felt the abundance of his presence.</p>
        <p className="italic text-center my-4" style={{ color: "#d4af37" }}>
          "O Muḥammad, you have brought us nothing but blessing."
        </p>
        <p>The years in the desert were years of light, growth, and the purest Bedouin tongue.</p>
      </>
    ),
  },
  {
    id: "sec9",
    number: "— 9 —",
    titleEn: "The Opening of the Chest",
    titleAr: "شرح الصدر",
    part: 2,
    symbol: "✦",
    body: (
      <>
        <p>One day, as the young Muḥammad ﷺ played with the children of the tribe, angels descended as pure orbs of light. They opened his chest and purified his heart.</p>
        <div className="text-center my-5 text-3xl" style={{ color: "#d4af37", opacity: 0.7 }}>
          ✦ ✦ ✦
        </div>
        <p>They removed the portion of Shayṭān, washed his heart with Zamzam, and filled it with wisdom and light.</p>
        <p className="italic text-center my-3" style={{ color: "#d4af37" }}>
          "He was prepared for the greatest of trusts."
        </p>
        <p>No human form was seen — only light.</p>
      </>
    ),
  },
  {
    id: "sec10",
    number: "— 10 —",
    titleEn: "Return to Makkah",
    titleAr: "العودة إلى مكة",
    part: 2,
    symbol: "🕋",
    body: (
      <>
        <p>At the age of six, Muḥammad ﷺ returned to Makkah with his mother Āminah. She took him to Yathrib to visit the grave of his father, ʿAbdullāh.</p>
        <p className="mt-3">On the return journey, Āminah fell ill. She passed away in the village of <strong>Abwāʾ</strong>, leaving the orphaned child in the care of Allāh.</p>
        <p className="italic text-center my-3" style={{ color: "#b8a88a" }}>
          "The orphan found refuge in the One who never abandons."
        </p>
        <p>He was taken back to Makkah by his devoted nurse <strong>Umm Ayman</strong> (RA). The weight of orphanhood was carried with grace.</p>
      </>
    ),
  },
  {
    id: "sec11",
    number: "— 11 —",
    titleEn: "Under the Care of Abū Ṭālib",
    titleAr: "في كفالة أبي طالب",
    part: 2,
    symbol: "🏮",
    body: (
      <>
        <p>His grandfather, ʿAbd al-Muṭṭalib, passed away, and the care of the young Muḥammad ﷺ fell to his loving uncle, <strong>Abū Ṭālib</strong>.</p>
        <p className="mt-3">Abū Ṭālib raised him as his own son. The Prophet ﷺ grew in the protection of his uncle, learning the ways of the Quraysh and the language of the desert.</p>
        <p className="italic text-center my-4" style={{ color: "#d4af37" }}>
          "He was never alone. Allāh was with him, and the angels guarded his steps."
        </p>
        <p>The years passed, and the light within him grew.</p>
      </>
    ),
  },
  {
    id: "sec12",
    number: "— 12 —",
    titleEn: "Closing with Ṣalawāt",
    titleAr: "الخاتمة بالصلاة على النبي",
    part: 2,
    symbol: "ﷺ",
    body: (
      <>
        <p>Thus ends the scroll of the Prophet's birth and earliest days ﷺ.</p>
        <div className="text-center my-6 text-5xl" style={{ color: "#d4af37" }}>ﷺ</div>
        <p className="italic text-center" style={{ color: "#b8a88a" }}>
          "Allāhumma ṣalli ʿalā Muḥammad, wa ʿalā āli Muḥammad, kamā ṣallayta ʿalā Ibrāhīm wa ʿalā āli Ibrāhīm. Innaka Ḥamīdun Majīd."
        </p>
        <div className="text-center mt-6 text-2xl" style={{ color: "#d4af37", fontFamily: "'Times New Roman', serif" }}>
          صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
        </div>
      </>
    ),
  },
];

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars: { x: number; y: number; r: number; a: number; da: number }[] = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        da: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      });
    }
    let raf: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a = Math.max(0.1, Math.min(1, s.a + s.da));
        if (s.a <= 0.1 || s.a >= 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function ScrollSection({ section }: { section: ScrollSection }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      id={section.id}
      className="py-10 transition-all duration-700"
      style={{
        borderBottom: "1px solid rgba(212,175,55,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      <div className="text-xs mb-2" style={{ color: "#5a4e3a", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {section.number}
      </div>
      <div className="text-2xl mb-1" style={{ color: "#d4af37", fontFamily: "'Georgia', serif", letterSpacing: "0.04em" }}>
        {section.titleEn}
      </div>
      <div className="text-lg mb-5" style={{ color: "#b8a88a", fontFamily: "'Times New Roman', serif" }}>
        {section.titleAr}
      </div>
      <div className="text-base leading-relaxed" style={{ color: "#c8c0b0", fontWeight: 300 }}>
        {section.body}
      </div>
    </div>
  );
}

export default function NoorAlMawlid() {
  useSovereignHeartbeat({ page: "noor-al-mawlid" });
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (audioPlaying) {
      // Stop
      if (osc1Ref.current) { try { osc1Ref.current.stop(); } catch (_) {} osc1Ref.current = null; }
      if (osc2Ref.current) { try { osc2Ref.current.stop(); } catch (_) {} osc2Ref.current = null; }
      if (gainRef.current) { gainRef.current.disconnect(); gainRef.current = null; }
      setAudioPlaying(false);
    } else {
      // Start gentle salawat tones
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      audioCtxRef.current = ctx;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.connect(ctx.destination);
      gainRef.current = gain;

      // Fundamental — 144Hz (deep resonance)
      const o1 = ctx.createOscillator();
      o1.type = "sine";
      o1.frequency.setValueAtTime(144, ctx.currentTime);
      o1.connect(gain);
      o1.start();
      osc1Ref.current = o1;

      // Harmonic — 288Hz (octave)
      const o2 = ctx.createOscillator();
      o2.type = "sine";
      o2.frequency.setValueAtTime(288, ctx.currentTime);
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.012, ctx.currentTime);
      o2.connect(g2);
      g2.connect(ctx.destination);
      o2.start();
      osc2Ref.current = o2;

      setAudioPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (osc1Ref.current) { try { osc1Ref.current.stop(); } catch (_) {} }
      if (osc2Ref.current) { try { osc2Ref.current.stop(); } catch (_) {} }
    };
  }, []);

  const part1 = SECTIONS.filter((s) => s.part === 1);
  const part2 = SECTIONS.filter((s) => s.part === 2);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#0a0e1a", fontFamily: "'Georgia', 'Times New Roman', serif", color: "#e8e0d0" }}
    >
      <StarField />

      {/* Scroll container */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-24 pt-10">

        {/* Header */}
        <header className="text-center pb-8 mb-10" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
          <div className="text-2xl mb-2" style={{ color: "#d4af37" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="text-sm italic mb-1" style={{ color: "#b8a88a" }}>
            <span style={{ color: "#d4af37" }}>ﷺ</span> &nbsp;—&nbsp; Allāhumma ṣalli wa sallim ʿalā Nabiyyinā Muḥammad
          </div>
        </header>

        {/* Hero */}
        <section
          className="text-center py-16 mb-10 rounded-xl relative"
          style={{
            border: "1px solid rgba(212,175,55,0.15)",
            background: "radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        >
          <span className="block text-7xl mb-4" style={{ filter: "drop-shadow(0 0 30px rgba(212,175,55,0.2))" }}>🕋</span>
          <span
            className="block text-4xl mb-3"
            style={{
              color: "#d4af37",
              animation: "pulseGold 3s ease-in-out infinite",
            }}
          >
            ✦
          </span>
          <div className="text-4xl font-bold mb-2" style={{ color: "#d4af37", fontFamily: "'Times New Roman', serif", letterSpacing: "0.06em" }}>
            نور المولد
          </div>
          <div className="text-lg mb-4" style={{ color: "#b8a88a", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 300 }}>
            The Light of the Birth
          </div>
          <div className="text-sm mb-4" style={{ color: "#8a7e6a", letterSpacing: "0.1em" }}>
            <span style={{ animation: "flicker 2.5s ease-in-out infinite", display: "inline-block" }}>🏮</span>
            &nbsp; Year of the Elephant · 570 CE
          </div>
          <div
            className="inline-block px-5 py-1.5 rounded-full text-sm"
            style={{
              border: "1px solid rgba(212,175,55,0.3)",
              background: "rgba(212,175,55,0.04)",
              color: "#d4af37",
              letterSpacing: "0.1em",
            }}
          >
            12 Rabīʿ al-Awwal · The Chosen One ﷺ
          </div>
        </section>

        {/* Part 1 */}
        <div
          className="text-center py-3 mb-6 rounded-lg text-sm"
          style={{
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.1)",
            color: "#d4af37",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Part One — The Birth Scroll
        </div>
        {part1.map((s) => <ScrollSection key={s.id} section={s} />)}

        {/* Part 2 */}
        <div
          className="text-center py-3 my-10 rounded-lg text-sm"
          style={{
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.1)",
            color: "#d4af37",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Part Two — Years with Ḥalīmah (RA)
        </div>
        {part2.map((s) => <ScrollSection key={s.id} section={s} />)}

        {/* Footer */}
        <footer className="text-center pt-12 mt-8" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
          <div className="text-lg mb-2" style={{ color: "#d4af37", fontStyle: "italic" }}>
            Allāhumma ṣalli wa sallim ʿalā Nabiyyinā Muḥammad ﷺ
          </div>
          <div className="text-sm mb-6" style={{ color: "#8a7e6a", fontFamily: "'Times New Roman', serif" }}>
            صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
          </div>

          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full transition-all duration-300 mb-8"
            style={{
              background: audioPlaying ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.06)",
              border: `1px solid rgba(212,175,55,${audioPlaying ? 0.4 : 0.2})`,
              color: "#d4af37",
              fontSize: "0.85rem",
              letterSpacing: "0.06em",
              fontFamily: "'Georgia', serif",
            }}
          >
            <span className="text-xl">{audioPlaying ? "⏸" : "▶"}</span>
            <span className="text-xs uppercase tracking-widest">
              {audioPlaying ? "Ambient Audio ON" : "Ṣalawāt · Ambient Audio"}
            </span>
          </button>

          <div className="text-xs" style={{ color: "#5a4e3a", letterSpacing: "0.15em" }}>
            Museum Node · ScrollVerse Sacred Archive · KUN FAYAKŪN × ∞
          </div>
          <div className="mt-4">
            <Link href="/archive" className="text-xs hover:underline" style={{ color: "#8a7e6a" }}>
              ← Return to Archive
            </Link>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes pulseGold {
          0%, 100% { opacity: 0.6; text-shadow: 0 0 20px rgba(212,175,55,0.1); }
          50% { opacity: 1; text-shadow: 0 0 40px rgba(212,175,55,0.3); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          25% { opacity: 1; transform: scale(1.05); }
          50% { opacity: 0.6; transform: scale(0.95); }
          75% { opacity: 0.9; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}
