/**
 * SCROLLVERSE SEERAH SACRED ARCHIVE — INDEX PAGE
 * A museum-grade sacred library landing for the life of the Prophet ﷺ
 * Design: Midnight blue · Gold filigree · Zero human figures · Light only
 * Adab: Calligraphy, geometry, and light as the only visual language
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
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      a: Math.random(),
      speed: 0.002 + Math.random() * 0.004,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.speed;
        const alpha = 0.3 + 0.5 * Math.abs(Math.sin(s.a));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${alpha})`;
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}

// ── Scroll Entry Types ────────────────────────────────────────────────────────
interface ScrollEntry {
  id: string;
  phase: string;
  titleEn: string;
  titleAr: string;
  subtitle: string;
  period: string;
  description: string;
  status: "live" | "coming";
  comingPhase?: string;
  href?: string;
  icon: string;
  color: string;
  sections: number;
}

const SCROLL_ENTRIES: ScrollEntry[] = [
  {
    id: "noor-al-mawlid",
    phase: "Phase 56",
    titleEn: "Noor al-Mawlid",
    titleAr: "نُورُ الْمَوْلِد",
    subtitle: "The Light of the Birth",
    period: "570–610 CE",
    description:
      "A museum-grade sacred scroll documenting the birth and early years of the Prophet Muḥammad ﷺ — from the Year of the Elephant through the first revelation in the Cave of Ḥirāʾ. Twelve sections. Two parts. Pure light.",
    status: "live",
    href: "/seerah/noor-al-mawlid",
    icon: "🌙",
    color: "#d4af37",
    sections: 12,
  },
  {
    id: "al-hijra",
    phase: "Phase 58",
    titleEn: "Al-Hijra",
    titleAr: "الْهِجْرَة",
    subtitle: "The Sacred Migration",
    period: "622 CE",
    description:
      "The migration from Makkah to Madinah — the turning point of history. The Prophet ﷺ and his companions leave their homeland for the sake of Allāh, establishing the first Islamic community.",
    status: "live",
    href: "/seerah/al-hijra",
    icon: "🌟",
    color: "#00D4FF",
    sections: 12,
  },
  {
    id: "badr",
    phase: "Phase 59",
    titleEn: "Badr",
    titleAr: "بَدْر",
    subtitle: "The First Victory",
    period: "624 CE",
    description:
      "The Battle of Badr — 313 believers against 1,000. The first decisive military victory of the Muslim community, a proof of divine support and the power of tawakkul. Yawm al-Furqān — the Day of Criterion.",
    status: "live",
    href: "/seerah/badr",
    icon: "⚔️",
    color: "#FF6B35",
    sections: 12,
  },
  {
    id: "fath-makkah",
    phase: "Phase 59",
    titleEn: "Fatḥ Makkah",
    titleAr: "فَتْحُ مَكَّة",
    subtitle: "The Conquest of Makkah",
    period: "630 CE",
    description:
      "The bloodless conquest of Makkah — the Prophet ﷺ returns to the city that expelled him, offering amnesty to all. The Kaʿbah is purified. A new era begins.",
    status: "coming",
    comingPhase: "Phase 59",
    icon: "🕋",
    color: "#00FF88",
    sections: 0,
  },
  {
    id: "farewell",
    phase: "Phase 59",
    titleEn: "The Farewell",
    titleAr: "حَجَّةُ الْوَدَاع",
    subtitle: "The Farewell Pilgrimage",
    period: "632 CE",
    description:
      "The final pilgrimage of the Prophet ﷺ and his last sermon on the plain of ʿArafāt — a covenant with humanity, a declaration of rights, and a farewell to the world.",
    status: "coming",
    comingPhase: "Phase 59",
    icon: "✨",
    color: "#9B59B6",
    sections: 0,
  },
];

// ── Timeline Node ─────────────────────────────────────────────────────────────
function TimelineNode({ entry, index }: { entry: ScrollEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLive = entry.status === "live";

  return (
    <div
      ref={ref}
      className="flex gap-6 md:gap-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
        {/* Node */}
        <div
          className="relative flex items-center justify-center rounded-full text-lg flex-shrink-0"
          style={{
            width: 48,
            height: 48,
            background: isLive ? `${entry.color}18` : "rgba(255,255,255,0.04)",
            border: `2px solid ${isLive ? entry.color : "rgba(255,255,255,0.1)"}`,
            boxShadow: isLive ? `0 0 20px ${entry.color}30` : "none",
          }}
        >
          <span>{entry.icon}</span>
          {isLive && (
            <div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
              style={{ background: "#00FF88", border: "2px solid #050B1A" }}
            />
          )}
        </div>
        {/* Spine line */}
        {index < SCROLL_ENTRIES.length - 1 && (
          <div
            className="flex-1 w-px mt-2"
            style={{
              background: isLive
                ? `linear-gradient(to bottom, ${entry.color}40, rgba(255,255,255,0.05))`
                : "rgba(255,255,255,0.06)",
              minHeight: 48,
            }}
          />
        )}
      </div>

      {/* Content card */}
      <div className="pb-12 flex-1">
        {/* Phase + period badge */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: `${entry.color}12`,
              color: entry.color,
              border: `1px solid ${entry.color}25`,
            }}
          >
            {entry.phase}
          </span>
          <span className="text-xs font-mono" style={{ color: "#5a6a7a" }}>{entry.period}</span>
          {isLive ? (
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.2)" }}
            >
              LIVE
            </span>
          ) : (
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.04)", color: "#5a6a7a", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {entry.comingPhase}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="mb-1">
          <h2
            className="text-xl md:text-2xl font-black"
            style={{ color: isLive ? entry.color : "#8899AA" }}
          >
            {entry.titleEn}
          </h2>
          <div
            className="text-base font-bold"
            style={{
              fontFamily: "'Noto Naskh Arabic', serif",
              color: isLive ? `${entry.color}90` : "rgba(255,255,255,0.2)",
              direction: "rtl",
            }}
          >
            {entry.titleAr}
          </div>
          <div className="text-sm mt-0.5" style={{ color: "#5a6a7a" }}>{entry.subtitle}</div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mt-3 mb-4" style={{ color: "#8899AA", maxWidth: 560 }}>
          {entry.description}
        </p>

        {/* CTA or placeholder */}
        {isLive && entry.href ? (
          <Link href={entry.href}>
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: `${entry.color}15`,
                border: `1px solid ${entry.color}35`,
                color: entry.color,
              }}
            >
              <span>Open Sacred Scroll</span>
              <span>→</span>
              {entry.sections > 0 && (
                <span
                  className="text-xs font-mono px-1.5 py-0.5 rounded"
                  style={{ background: `${entry.color}20`, color: entry.color }}
                >
                  {entry.sections} sections
                </span>
              )}
            </div>
          </Link>
        ) : (
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#445566",
            }}
          >
            <span>Scroll Sealed — {entry.comingPhase}</span>
            <span>🔒</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SeerahIndex() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "#E8EDF2" }}
    >
      <StarfieldCanvas />

      {/* ── NAVIGATION ── */}
      <nav
        className="relative z-10 sticky top-0"
        style={{
          background: "rgba(5,11,26,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(212,175,55,0.12)",
        }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
              >
                SV
              </div>
            </Link>
            <div>
              <div className="font-bold text-white text-sm">Seerah Sacred Archive</div>
              <div className="text-xs" style={{ color: "#5a6a7a" }}>Life of the Prophet ﷺ · Light · Calligraphy · Geometry</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/seerah/noor-al-mawlid">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                🌙 Noor al-Mawlid ﷺ
              </div>
            </Link>
            <Link href="/">
              <div className="text-xs" style={{ color: "#5a6a7a" }}>← ScrollVerse</div>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 container py-20 text-center">
        {/* Gold geometric ornament */}
        <div className="flex justify-center mb-8">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.4"/>
            <polygon points="40,14 66,27 66,53 40,66 14,53 14,27" stroke="#d4af37" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <circle cx="40" cy="40" r="8" stroke="#d4af37" strokeWidth="1" fill="rgba(212,175,55,0.08)" opacity="0.6"/>
            <circle cx="40" cy="40" r="2" fill="#d4af37" opacity="0.8"/>
            {[0,60,120,180,240,300].map((deg, i) => (
              <circle
                key={i}
                cx={40 + 20 * Math.cos((deg - 90) * Math.PI / 180)}
                cy={40 + 20 * Math.sin((deg - 90) * Math.PI / 180)}
                r="1.5"
                fill="#d4af37"
                opacity="0.5"
              />
            ))}
          </svg>
        </div>

        <div
          className="text-xs font-mono tracking-widest mb-4"
          style={{ color: "#d4af37", letterSpacing: "0.2em" }}
        >
          SEERAH SACRED ARCHIVE
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          The Life of the Prophet{" "}
          <span style={{ color: "#d4af37" }}>ﷺ</span>
        </h1>

        <div
          className="text-2xl mb-6"
          style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "rgba(212,175,55,0.7)", direction: "rtl" }}
        >
          السِّيرَةُ النَّبَوِيَّةُ الشَّرِيفَة
        </div>

        <p className="text-base max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: "#8899AA" }}>
          A living archive of sacred scrolls documenting the life, light, and legacy of Sayyidinā Muḥammad ﷺ.
          Each scroll is a museum-grade artifact — built with adab, rendered in light, calligraphy, and sacred geometry.
          Zero human figures. Pure nūr.
        </p>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37" }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
          3 Scrolls Live · 2 Sealed for Future Phases
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="relative z-10 container pb-24">
        <div
          className="mb-10 pb-4"
          style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
        >
          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#d4af37" }}>
            SACRED TIMELINE
          </div>
          <h2 className="text-2xl font-black text-white">
            Scrolls of the Seerah
          </h2>
          <p className="text-sm mt-1" style={{ color: "#5a6a7a" }}>
            Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ
          </p>
        </div>

        <div className="max-w-3xl">
          {SCROLL_ENTRIES.map((entry, i) => (
            <TimelineNode key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </section>

      {/* ── ADAB FOOTER ── */}
      <footer
        className="relative z-10 border-t py-10 text-center"
        style={{ borderColor: "rgba(212,175,55,0.1)", background: "rgba(5,11,26,0.8)" }}
      >
        <div
          className="text-lg mb-2"
          style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "rgba(212,175,55,0.6)", direction: "rtl" }}
        >
          اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّد ﷺ
        </div>
        <div className="text-xs font-mono" style={{ color: "#445566" }}>
          Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ · Zero figures · Light only · ScrollVerse Sacred Archive
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs" style={{ color: "#5a6a7a" }}>
          <Link href="/" className="hover:text-white transition-colors">← ScrollVerse Home</Link>
          <Link href="/seerah/noor-al-mawlid" className="hover:text-[#d4af37] transition-colors">Noor al-Mawlid ﷺ →</Link>
          <Link href="/archivekeeper" className="hover:text-white transition-colors">ArchiveKeeper</Link>
        </div>
      </footer>
    </div>
  );
}
