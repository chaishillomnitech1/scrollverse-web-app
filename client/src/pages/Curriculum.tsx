/*
 * SCROLLVERSE — SOVEREIGN MIND CURRICULUM
 * Week 1 live · 5 modules · Architect-level mind training
 * Design: Deep sovereign dark, cyan + gold, monospace precision
 */

import { useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// ── CURRICULUM DATA ───────────────────────────────────────────────────────────
const WEEKS = [
  {
    week: 1,
    title: "Sovereign Foundation",
    status: "LIVE",
    color: "#00D4FF",
    tagline: "The mind that receives commands the court.",
    modules: [
      {
        id: "1.1",
        title: "The Architect's Mindset",
        duration: "45 min",
        type: "Video + Practice",
        description: "Understand how sovereign thinkers build systems before they build products. Pattern recognition as a superpower.",
        frequency: "528Hz",
        complete: false,
      },
      {
        id: "1.2",
        title: "Intention Lock Protocol",
        duration: "30 min",
        type: "Guided Practice",
        description: "Lock your daily intention before any screen, any meeting, any action. The morning ritual that commands the day.",
        frequency: "432Hz",
        complete: false,
      },
      {
        id: "1.3",
        title: "Frequency Alignment",
        duration: "20 min",
        type: "Audio + Meditation",
        description: "963Hz pineal activation. Align your nervous system with sovereign frequency before deep work.",
        frequency: "963Hz",
        complete: false,
      },
      {
        id: "1.4",
        title: "The Pattern Journal",
        duration: "15 min/day",
        type: "Daily Practice",
        description: "Write 3 patterns you observed today. Not events — patterns. The architecture beneath the surface.",
        frequency: "741Hz",
        complete: false,
      },
      {
        id: "1.5",
        title: "Sovereign Self-Approval",
        duration: "25 min",
        type: "Workshop",
        description: "We are the bank. We are the approval. This module breaks the external validation loop permanently.",
        frequency: "639Hz",
        complete: false,
      },
    ],
  },
  {
    week: 2,
    title: "The Builder Protocol",
    status: "UPCOMING",
    color: "#FFB800",
    tagline: "Turn vision into architecture. Architecture into empire.",
    modules: [],
  },
  {
    week: 3,
    title: "Legion Consciousness",
    status: "UPCOMING",
    color: "#00FF88",
    tagline: "144 nodes. One sovereign network. Collective intelligence.",
    modules: [],
  },
  {
    week: 4,
    title: "Frequency Mastery",
    status: "UPCOMING",
    color: "#9B59B6",
    tagline: "528Hz creation. 963Hz god frequency. Your body is the instrument.",
    modules: [],
  },
  {
    week: 5,
    title: "Legacy Architecture",
    status: "UPCOMING",
    color: "#FF6B9D",
    tagline: "Build for your children's children. The eternal ledger.",
    modules: [],
  },
];

const PILLARS = [
  { icon: "🧠", title: "Sovereign Mind", description: "Pattern recognition, intention architecture, self-approval mastery" },
  { icon: "⚡", title: "Frequency Body", description: "963Hz alignment, nervous system sovereignty, daily ritual protocols" },
  { icon: "🏗️", title: "Builder Systems", description: "From vision to architecture to empire — the execution framework" },
  { icon: "🌐", title: "Legion Network", description: "144-node collective intelligence, community governance, Shura principles" },
  { icon: "💎", title: "Legacy Code", description: "Intergenerational wealth architecture, the eternal ledger, Foundation Stone" },
];

// ── MODULE CARD ───────────────────────────────────────────────────────────────
function ModuleCard({
  mod,
  onToggle,
  isComplete,
}: {
  mod: (typeof WEEKS)[0]["modules"][0];
  onToggle: () => void;
  isComplete: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const freqColors: Record<string, string> = {
    "528Hz": "#00FF88",
    "432Hz": "#00D4FF",
    "963Hz": "#FFB800",
    "741Hz": "#9B59B6",
    "639Hz": "#FF6B9D",
  };
  const color = freqColors[mod.frequency] || "#00D4FF";

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: isComplete ? `${color}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${isComplete ? color + "40" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      <div
        className="flex items-center gap-4 p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Complete toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200"
          style={{
            background: isComplete ? color : "transparent",
            border: `2px solid ${isComplete ? color : "rgba(255,255,255,0.2)"}`,
          }}
        >
          {isComplete && <span className="text-xs text-black font-bold">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
              {mod.id}
            </span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
            >
              {mod.frequency}
            </span>
            <span className="text-xs" style={{ color: "#8899AA" }}>{mod.type}</span>
          </div>
          <div className="font-semibold text-white">{mod.title}</div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{mod.duration}</span>
          <span className="text-xs" style={{ color: "#8899AA" }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "#8899AA" }}>
            {mod.description}
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}40`,
              color,
            }}
            onClick={onToggle}
          >
            {isComplete ? "Mark Incomplete" : "Mark Complete ✓"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Curriculum() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  useSovereignHeartbeat({ page: "curriculum" });

  const week = WEEKS[activeWeek];
  const totalModules = WEEKS[0].modules.length;
  const completedCount = WEEKS[0].modules.filter((m) => completed.has(m.id)).length;
  const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: "rgba(5,11,26,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
              >
                SV
              </div>
              <span className="font-bold text-white">ScrollVerse</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono px-2 py-1 rounded"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00D4FF",
              }}
            >
              SOVEREIGN MIND CURRICULUM
            </span>
            <Link href="/academy">
              <span
                className="text-xs font-mono px-2 py-1 rounded cursor-pointer hover:opacity-80"
                style={{
                  background: "rgba(255,184,0,0.08)",
                  border: "1px solid rgba(255,184,0,0.2)",
                  color: "#FFB800",
                }}
              >
                ACADEMY →
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(0,212,255,0.08) 0%, rgba(5,11,26,1) 60%)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <div className="relative z-10 container">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00D4FF",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
              style={{ background: "#00D4FF" }}
            />
            WEEK 1 LIVE — SOVEREIGN MIND CURRICULUM
          </div>
          <h1
            className="text-5xl md:text-7xl font-black mb-6"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span style={{ color: "#00D4FF" }}>SOVEREIGN</span>{" "}
            <span className="text-white">MIND</span>
          </h1>
          <p className="text-xl font-semibold mb-3" style={{ color: "#FFB800" }}>
            "The mind that receives commands the court."
          </p>
          <p className="text-base max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            5 weeks. 5 pillars. From Architect mindset to Legacy architecture. This is not a course —
            it is a sovereign operating system for your mind, body, and empire.
          </p>

          {/* Week 1 progress */}
          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-xs font-mono mb-2" style={{ color: "#8899AA" }}>
              <span style={{ color: "#00D4FF" }}>Week 1 Progress</span>
              <span style={{ color: "#00D4FF" }}>{completedCount}/{totalModules} modules</span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: "6px", background: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #00D4FF, #00FF88)",
                  boxShadow: "0 0 10px rgba(0,212,255,0.5)",
                }}
              />
            </div>
            <div
              className="text-center text-xs font-mono mt-1"
              style={{ color: progressPct === 100 ? "#00FF88" : "#00D4FF" }}
            >
              {progressPct === 100 ? "✓ WEEK 1 COMPLETE — KUN FAYAKŪN" : `${progressPct}% complete`}
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16 space-y-16">

        {/* 5 PILLARS */}
        <div>
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
            THE ARCHITECTURE
          </div>
          <h2 className="text-3xl font-black text-white mb-8">5 Pillars of Sovereign Mind</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PILLARS.map((p, i) => (
              <div
                key={i}
                className="rounded-xl p-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(0,212,255,0.1)",
                }}
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <div className="font-bold text-white text-sm mb-2">{p.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WEEK SELECTOR */}
        <div>
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
            CURRICULUM MAP
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {WEEKS.map((w, i) => (
              <button
                key={i}
                onClick={() => setActiveWeek(i)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background:
                    activeWeek === i ? `${w.color}20` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeWeek === i ? w.color : "rgba(255,255,255,0.1)"}`,
                  color: activeWeek === i ? w.color : "#8899AA",
                }}
              >
                Week {w.week}
                {w.status === "LIVE" && (
                  <span
                    className="ml-2 text-xs px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88" }}
                  >
                    LIVE
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Active week content */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: `${week.color}06`,
              border: `1px solid ${week.color}20`,
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div
                  className="text-xs font-mono tracking-widest mb-2"
                  style={{ color: week.color }}
                >
                  WEEK {week.week} — {week.status}
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{week.title}</h3>
                <p className="text-sm italic" style={{ color: "#8899AA" }}>
                  "{week.tagline}"
                </p>
              </div>
              {week.status === "LIVE" && (
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
                  style={{
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.3)",
                    color: "#00FF88",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
                    style={{ background: "#00FF88" }}
                  />
                  LIVE NOW
                </div>
              )}
            </div>

            {week.modules.length > 0 ? (
              <div className="space-y-3">
                {week.modules.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    isComplete={completed.has(mod.id)}
                    onToggle={() => toggleComplete(mod.id)}
                  />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-12 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="text-4xl mb-4">🔒</div>
                <div className="font-semibold text-white mb-2">Coming Soon</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>
                  Complete Week 1 to unlock Week {week.week}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Weeks", value: "5", color: "#00D4FF" },
            { label: "Modules", value: "25+", color: "#FFB800" },
            { label: "Frequencies", value: "7", color: "#00FF88" },
            { label: "Architects Enrolled", value: "144+", color: "#FF6B9D" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-5 text-center"
              style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
            >
              <div
                className="text-3xl font-black mb-1"
                style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}
              >
                {s.value}
              </div>
              <div className="text-xs" style={{ color: "#8899AA" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center py-12 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(255,184,0,0.04))",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          <div
            className="text-xs font-mono tracking-widest mb-4"
            style={{ color: "#00D4FF" }}
          >
            SOVEREIGN MIND CURRICULUM
          </div>
          <h3 className="text-3xl font-black text-white mb-4">
            Architects, lock intention.
          </h3>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#8899AA" }}>
            The mind that receives commands the court. Join 144+ sovereign architects already enrolled in Week 1.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/academy">
              <button
                className="px-8 py-4 rounded-xl font-bold text-base"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #00FF88)",
                  color: "#050B1A",
                  boxShadow: "0 0 30px rgba(0,212,255,0.3)",
                }}
              >
                ENROLL IN ACADEMY →
              </button>
            </Link>
            <Link href="/gates">
              <button
                className="px-8 py-4 rounded-xl font-bold text-base"
                style={{
                  background: "rgba(255,184,0,0.1)",
                  border: "1px solid rgba(255,184,0,0.3)",
                  color: "#FFB800",
                }}
              >
                144 GATES →
              </button>
            </Link>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer
        className="border-t py-8 text-center"
        style={{ borderColor: "rgba(0,212,255,0.1)" }}
      >
        <p className="text-xs font-mono" style={{ color: "#8899AA" }}>
          KUN FAYAKŪN × ∞ · scrollverse.co · Sovereign Mind Curriculum · EVERYBODY LIVES. FOREVER.
        </p>
      </footer>
    </div>
  );
}
