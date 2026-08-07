/*
 * SEERAH QUIZ — GUARDIAN OF THE SEERAH
 * /seerah/quiz — Interactive 10-question knowledge challenge
 * Draws from: Noor al-Mawlid · Al-Hijra · Badr · Fatḥ Makkah · Al-Ghazwāt
 * Awards: "Guardian of the Seerah" badge on perfect score
 * Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

// ── QUIZ DATA ─────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    scroll: "Noor al-Mawlid",
    scrollColor: "#FFB800",
    question: "In which city was the Prophet Muḥammad ﷺ born?",
    options: ["Madinah", "Makkah", "Ṭāʾif", "Jerusalem"],
    correct: 1,
    explanation: "The Prophet ﷺ was born in Makkah al-Mukarrama, in the Year of the Elephant (570 CE), in the neighbourhood of Banū Hāshim.",
  },
  {
    id: 2,
    scroll: "Noor al-Mawlid",
    scrollColor: "#FFB800",
    question: "What was the name of the Prophet's ﷺ mother?",
    options: ["Khadīja", "Āmina", "Fāṭima", "Ḥalīma"],
    correct: 1,
    explanation: "His mother was Āmina bint Wahb. She passed away when the Prophet ﷺ was approximately six years old, near the village of al-Abwāʾ.",
  },
  {
    id: 3,
    scroll: "Al-Hijra",
    scrollColor: "#00D4FF",
    question: "In which year did the Hijra (migration) from Makkah to Madinah take place?",
    options: ["610 CE", "615 CE", "622 CE", "630 CE"],
    correct: 2,
    explanation: "The Hijra took place in 622 CE. This event is so significant that it marks the beginning of the Islamic lunar calendar (1 AH).",
  },
  {
    id: 4,
    scroll: "Al-Hijra",
    scrollColor: "#00D4FF",
    question: "Who accompanied the Prophet ﷺ during the Hijra to Madinah?",
    options: ["ʿAlī ibn Abī Ṭālib", "Abū Bakr al-Ṣiddīq", "ʿUmar ibn al-Khaṭṭāb", "ʿUthmān ibn ʿAffān"],
    correct: 1,
    explanation: "Abū Bakr al-Ṣiddīq accompanied the Prophet ﷺ during the Hijra. They hid in the Cave of Thawr for three days before continuing their journey.",
  },
  {
    id: 5,
    scroll: "Badr",
    scrollColor: "#C0392B",
    question: "How many Muslim warriors fought at the Battle of Badr?",
    options: ["313", "700", "1000", "3000"],
    correct: 0,
    explanation: "The Muslim army at Badr numbered 313 — a small force of believers who faced approximately 1,000 Qurayshi warriors. Their victory was a decisive miracle.",
  },
  {
    id: 6,
    scroll: "Badr",
    scrollColor: "#C0392B",
    question: "What does 'Yawm al-Furqān' mean, the Qurʾānic name for the Battle of Badr?",
    options: ["Day of Victory", "Day of the Criterion", "Day of the Angels", "Day of Sacrifice"],
    correct: 1,
    explanation: "'Yawm al-Furqān' means the Day of the Criterion — the day that distinguished truth from falsehood. The Qurʾān refers to Badr with this name in Sūrat al-Anfāl (8:41).",
  },
  {
    id: 7,
    scroll: "Fatḥ Makkah",
    scrollColor: "#27AE60",
    question: "How many warriors did the Prophet ﷺ lead during the Conquest of Makkah?",
    options: ["313", "700", "3000", "10,000"],
    correct: 3,
    explanation: "The Prophet ﷺ led an army of 10,000 into Makkah in 8 AH (630 CE). The city surrendered with virtually no bloodshed — a testament to the mercy of Islam.",
  },
  {
    id: 8,
    scroll: "Fatḥ Makkah",
    scrollColor: "#27AE60",
    question: "What did the Prophet ﷺ declare for the people of Makkah after the conquest?",
    options: ["They were enslaved", "General amnesty — 'You are free'", "They were expelled", "They were fined heavily"],
    correct: 1,
    explanation: "The Prophet ﷺ declared general amnesty: 'Go — you are free.' This act of mercy toward those who had persecuted the Muslims for 20 years is unparalleled in military history.",
  },
  {
    id: 9,
    scroll: "Al-Ghazwāt",
    scrollColor: "#8E44AD",
    question: "Who proposed the strategy of digging a trench at the Battle of Khandaq?",
    options: ["Bilāl ibn Rabāḥ", "Salmān al-Fārisī", "Khālid ibn al-Walīd", "Ṭalḥa ibn ʿUbaydillāh"],
    correct: 1,
    explanation: "Salmān al-Fārisī — the Persian companion — proposed the Persian military innovation of digging a trench (khandaq) around Madinah. The Prophet ﷺ adopted this strategy immediately.",
  },
  {
    id: 10,
    scroll: "Al-Ghazwāt",
    scrollColor: "#8E44AD",
    question: "At the Battle of Ḥunayn, what caused the initial Muslim rout despite their large numbers?",
    options: ["Lack of weapons", "Pride in their numbers (12,000 warriors)", "Betrayal by allies", "A sandstorm"],
    correct: 1,
    explanation: "The Qurʾān revealed: 'Your great number pleased you, but it did not avail you at all' (9:25). The trial of Ḥunayn was the pride of numbers — a reminder that victory belongs to Allāh alone.",
  },
];

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
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${s.opacity})`;
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
export default function SeerahQuiz() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [score, setScore] = useState(0);

  const q = QUESTIONS[current];
  const isCorrect = selected === q.correct;
  const progress = ((current + (revealed ? 1 : 0)) / QUESTIONS.length) * 100;

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    const newAnswers = [...answers];
    newAnswers[current] = i;
    setAnswers(newAnswers);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setPhase("result");
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setAnswers(Array(10).fill(null));
    setScore(0);
  };

  const isPerfect = score === QUESTIONS.length;
  const isExcellent = score >= 8;
  const isPassing = score >= 6;

  const getBadge = () => {
    if (isPerfect) return { label: "Guardian of the Seerah", color: "#FFB800", icon: "🏆" };
    if (isExcellent) return { label: "Keeper of the Seerah", color: "#00D4FF", icon: "📜" };
    if (isPassing) return { label: "Student of the Seerah", color: "#00FF88", icon: "🌱" };
    return { label: "Seeker of Knowledge", color: "#8899AA", icon: "🔍" };
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#04080F", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(4,8,15,0.96)", borderColor: "rgba(255,184,0,0.15)", backdropFilter: "blur(20px)" }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/seerah">
              <button className="text-xs font-mono px-3 py-1.5 rounded border" style={{ borderColor: "rgba(255,184,0,0.3)", color: "#FFB800" }}>
                ← Seerah
              </button>
            </Link>
            <div>
              <div className="font-bold text-white text-sm">Seerah Quiz ﷺ</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>Guardian of the Seerah Challenge</div>
            </div>
          </div>
          {phase === "quiz" && (
            <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
              {current + 1} / {QUESTIONS.length} · Score: {score}
            </div>
          )}
        </div>
        {phase === "quiz" && (
          <div className="h-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #FFB800, #00D4FF)" }}
            />
          </div>
        )}
      </header>

      {/* ── INTRO ── */}
      {phase === "intro" && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Starfield />
          <div className="relative z-10 text-center px-6 py-20 max-w-2xl mx-auto">
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800" }}>
              SEERAH KNOWLEDGE CHALLENGE
            </div>
            <div
              className="text-5xl mb-6"
              style={{ color: "#FFB800", fontFamily: "'Noto Naskh Arabic', serif" }}
            >
              السِّيرَةُ النَّبَوِيَّةُ
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Guardian of the Seerah</h1>
            <p className="text-lg mb-8" style={{ color: "#8899AA" }}>
              10 questions drawn from the five sacred scrolls. Test your knowledge of the life of the Prophet Muḥammad ﷺ — from his blessed birth to the great expeditions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
              {[
                { label: "Noor al-Mawlid", color: "#FFB800", q: "2 Qs" },
                { label: "Al-Hijra", color: "#00D4FF", q: "2 Qs" },
                { label: "Badr", color: "#C0392B", q: "2 Qs" },
                { label: "Fatḥ Makkah", color: "#27AE60", q: "2 Qs" },
                { label: "Al-Ghazwāt", color: "#8E44AD", q: "2 Qs" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}
                >
                  <div className="text-xs font-mono mb-1" style={{ color: s.color }}>{s.q}</div>
                  <div className="text-xs text-white">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <div className="rounded-xl p-4 text-left" style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-xs font-mono mb-1" style={{ color: "#FFB800" }}>🏆 PERFECT (10/10)</div>
                <div className="text-sm text-white">Guardian of the Seerah</div>
              </div>
              <div className="rounded-xl p-4 text-left" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>📜 EXCELLENT (8–9)</div>
                <div className="text-sm text-white">Keeper of the Seerah</div>
              </div>
              <div className="rounded-xl p-4 text-left" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}>
                <div className="text-xs font-mono mb-1" style={{ color: "#00FF88" }}>🌱 PASSING (6–7)</div>
                <div className="text-sm text-white">Student of the Seerah</div>
              </div>
            </div>
            <button
              onClick={() => setPhase("quiz")}
              className="px-10 py-4 rounded-xl text-lg font-black transition-all"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#04080F" }}
            >
              Begin the Challenge →
            </button>
          </div>
        </section>
      )}

      {/* ── QUIZ ── */}
      {phase === "quiz" && (
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Scroll source badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
            style={{ background: `${q.scrollColor}10`, border: `1px solid ${q.scrollColor}30`, color: q.scrollColor }}
          >
            📜 {q.scroll}
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">{q.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {q.options.map((opt, i) => {
              let bg = "rgba(255,255,255,0.03)";
              let border = "rgba(255,255,255,0.08)";
              let color = "#E8EDF2";
              if (revealed) {
                if (i === q.correct) { bg = "rgba(0,255,136,0.1)"; border = "rgba(0,255,136,0.4)"; color = "#00FF88"; }
                else if (i === selected && !isCorrect) { bg = "rgba(255,68,68,0.1)"; border = "rgba(255,68,68,0.4)"; color = "#FF4444"; }
              } else if (selected === i) {
                bg = `${q.scrollColor}15`; border = `${q.scrollColor}50`; color = q.scrollColor;
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={revealed}
                  className="w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center gap-3"
                  style={{ background: bg, border: `1px solid ${border}`, color }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${border}`, border: `1px solid ${border}` }}
                  >
                    {["A", "B", "C", "D"][i]}
                  </span>
                  <span>{opt}</span>
                  {revealed && i === q.correct && <span className="ml-auto">✓</span>}
                  {revealed && i === selected && !isCorrect && i !== q.correct && <span className="ml-auto">✗</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {revealed && (
            <div
              className="rounded-xl p-5 mb-8"
              style={{
                background: isCorrect ? "rgba(0,255,136,0.06)" : "rgba(255,68,68,0.06)",
                border: `1px solid ${isCorrect ? "rgba(0,255,136,0.2)" : "rgba(255,68,68,0.2)"}`,
              }}
            >
              <div className="text-sm font-bold mb-2" style={{ color: isCorrect ? "#00FF88" : "#FF4444" }}>
                {isCorrect ? "✓ Correct!" : "✗ Not quite"}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{q.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {revealed && (
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-bold transition-all"
              style={{ background: `linear-gradient(135deg, ${q.scrollColor}, ${q.scrollColor}99)`, color: "#04080F" }}
            >
              {current < QUESTIONS.length - 1 ? `Next Question (${current + 2}/${QUESTIONS.length}) →` : "See Results →"}
            </button>
          )}
        </div>
      )}

      {/* ── RESULT ── */}
      {phase === "result" && (() => {
        const badge = getBadge();
        return (
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <Starfield />
            <div className="relative z-10 text-center px-6 py-20 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">{badge.icon}</div>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: badge.color }}>
                YOUR BADGE
              </div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: badge.color }}>{badge.label}</h1>
              <div className="text-6xl font-black my-6" style={{ color: badge.color }}>
                {score} / {QUESTIONS.length}
              </div>
              {isPerfect && (
                <div
                  className="rounded-2xl p-6 mb-8 mx-auto max-w-md"
                  style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.3)" }}
                >
                  <div
                    className="text-2xl mb-2"
                    style={{ color: "#FFB800", fontFamily: "'Noto Naskh Arabic', serif", direction: "rtl" }}
                  >
                    اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ
                  </div>
                  <p className="text-sm" style={{ color: "#8899AA" }}>
                    Perfect score! You have earned the title of Guardian of the Seerah. The Prophet ﷺ said: 'The best of you are those who learn the Qurʾān and teach it.' May Allāh increase you in knowledge.
                  </p>
                </div>
              )}

              {/* Answer review */}
              <div className="grid grid-cols-5 gap-2 mb-8">
                {QUESTIONS.map((q, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-2 text-center"
                    style={{
                      background: answers[i] === q.correct ? "rgba(0,255,136,0.1)" : "rgba(255,68,68,0.1)",
                      border: `1px solid ${answers[i] === q.correct ? "rgba(0,255,136,0.3)" : "rgba(255,68,68,0.3)"}`,
                    }}
                  >
                    <div className="text-xs font-mono" style={{ color: answers[i] === q.correct ? "#00FF88" : "#FF4444" }}>
                      Q{i + 1}
                    </div>
                    <div className="text-xs" style={{ color: answers[i] === q.correct ? "#00FF88" : "#FF4444" }}>
                      {answers[i] === q.correct ? "✓" : "✗"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-8 py-3 rounded-xl font-bold border transition-colors"
                  style={{ borderColor: `${badge.color}40`, color: badge.color }}
                >
                  Try Again
                </button>
                <Link href="/seerah">
                  <button
                    className="px-8 py-3 rounded-xl font-bold transition-all"
                    style={{ background: `${badge.color}20`, border: `1px solid ${badge.color}50`, color: badge.color }}
                  >
                    Return to Seerah Library →
                  </button>
                </Link>
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
}
