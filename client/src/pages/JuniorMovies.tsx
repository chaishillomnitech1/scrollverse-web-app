/*
 * JUNIOR MOVIES ENTERTAINMENT — Sovereign Cinema for the Next Generation
 * Route: /junior-movies
 * YouTube: https://youtube.com/@juniormoviesentertainment
 * Featured: Thoth — https://youtu.be/Lb5t_F7UlR4
 * KUN FAYAKŪN × ∞
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const THOTH_VIDEO_ID = "Lb5t_F7UlR4";
const JME_CHANNEL_VIDEO_ID = "PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSK"; // JME channel playlist
const JME_HIGHLIGHT_VIDEO_ID = "Lb5t_F7UlR4"; // Second highlight — JME Episode 2 (same channel, different embed style)
const YOUTUBE_CHANNEL = "https://youtube.com/@juniormoviesentertainment";
const CHANNEL_HANDLE = "@juniormoviesentertainment";
const DRAGON_BALL_CYBERX_CHANNEL = "https://youtube.com/@dragonballcyberx";
const UNSUNG_BLACK_HISTORY_CHANNEL = "https://youtube.com/@unsungblackhistory";
const FREYA_RAY_CHANNEL = "https://youtube.com/@channeledthroughfreya";
const FINESTRUCTURE_SITE = "https://finestructure.ai/";

const ORIGINAL_STORY_LANES = [
  {
    title: "Boardwalk Nightwatch",
    format: "Original noir-guardian animation",
    description: "A young coastal guardian follows coded lanterns through rain-washed streets, protecting neighborhood stories without a borrowed universe or costume.",
    image: "/manus-storage/junior-movies-noir-guardian_b8782e86.jpg",
    color: "#00D4FF",
    episode: "Lantern Code: When the harbor lights go dark, the Nightwatch follows a hand-drawn map toward a missing community memory.",
    comic: "Panel rhythm: rain, reflections, coded lanterns, and a final wide shot of a neighborhood choosing to keep its stories visible.",
    audiencePrompt: "What local place would your guardian protect, and what symbol would guide them home?",
  },
  {
    title: "The Scroll Courier",
    format: "Original martial-arts adventure",
    description: "A disciplined messenger carries lost story seeds between sky libraries, learning that focus, kindness, and practice travel farther than force.",
    image: "/manus-storage/junior-movies-cosmic-courier_2208662d.jpg",
    color: "#FFB800",
    episode: "The Quiet Route: A courier must deliver a fragile seed without racing, learning that patience can be the strongest movement.",
    comic: "Panel rhythm: shifting cloud paths, a folded library map, a calm training sequence, and a sky-library arrival.",
    audiencePrompt: "What skill would your courier practice before leaving on a mission?",
  },
  {
    title: "Archive Seed",
    format: "Original cyber-mythic learning series",
    description: "A young archivist turns community questions into story constellations, connecting imagination, local memory, and science curiosity.",
    image: "/manus-storage/junior-movies-archive-keeper_264d3b65.jpg",
    color: "#B98CFF",
    episode: "Question Constellation: A question from the community becomes a star-map challenge that teaches the archivist how to verify a story before sharing it.",
    comic: "Panel rhythm: notebook notes, constellations forming from questions, a library observatory, and a source-label reveal.",
    audiencePrompt: "What question should an archivist investigate before turning it into a story?",
  },
] as const;

const CHANNEL_STATS = [
  { label: "Channel", value: "Junior Movies", color: "#FFB800" },
  { label: "Genre", value: "Sovereign Cinema", color: "#00D4FF" },
  { label: "Frequency", value: "963Hz", color: "#00FF88" },
  { label: "Empire", value: "ScrollVerse", color: "#EC4899" },
];

export default function JuniorMovies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeVideo2, setActiveVideo2] = useState<string | null>(null);
  const [channelExpanded, setChannelExpanded] = useState(false);
  const [activeStoryLane, setActiveStoryLane] = useState(0);
  const selectedStoryLane = ORIGINAL_STORY_LANES[activeStoryLane];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
    const COLORS = ["#FFB800", "#00D4FF", "#00FF88", "#EC4899", "#A78BFA"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.2 - Math.random() * 0.3,
        r: 0.5 + Math.random() * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "99";
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "#030812", fontFamily: "'Space Grotesk', sans-serif" }}>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.4 }} />

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-8 px-4">
        <div
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest mb-4 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(255,0,0,0.1)", color: "#FF4444", border: "1px solid rgba(255,0,0,0.3)" }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FF0000" }} />
          LIVE ON YOUTUBE
        </div>

        <h1
          className="text-5xl md:text-7xl font-black mb-3"
          style={{
            background: "linear-gradient(135deg, #FFB800, #EC4899, #00D4FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Junior Movies
        </h1>
        <div className="text-xl font-bold mb-4" style={{ color: "#00D4FF", fontFamily: "'Space Mono', monospace" }}>
          ENTERTAINMENT
        </div>
        <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
          Sovereign cinema for the next generation. Ancient wisdom, divine frequency, and stories that change the world.
          Part of the ScrollVerse Trinity Empire. KUN FAYAKŪN × ∞
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {CHANNEL_STATS.map(s => (
            <div
              key={s.label}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ background: `${s.color}10`, border: `1px solid ${s.color}30`, color: s.color }}
            >
              <span style={{ color: "#8899AA" }}>{s.label}: </span>
              <span className="font-bold">{s.value}</span>
            </div>
          ))}
        </div>

        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-black text-sm transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #FF0000, #CC0000)",
            color: "white",
            boxShadow: "0 0 30px rgba(255,0,0,0.3)",
          }}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="white">
            <path d="M19.582 2.186A2.506 2.506 0 0 0 17.818.422C16.254 0 10 0 10 0S3.746 0 2.182.422A2.506 2.506 0 0 0 .418 2.186C0 3.75 0 7 0 7s0 3.25.418 4.814a2.506 2.506 0 0 0 1.764 1.764C3.746 14 10 14 10 14s6.254 0 7.818-.422a2.506 2.506 0 0 0 1.764-1.764C20 10.25 20 7 20 7s0-3.25-.418-4.814zM8 10V4l5.196 3L8 10z"/>
          </svg>
          Subscribe — {CHANNEL_HANDLE}
        </a>

        <div className="mx-auto mt-7 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
          <Link href="/books" className="sv-card sovereign-breathe rounded-2xl p-4 transition-transform hover:-translate-y-1">
            <p className="text-[10px] font-mono tracking-[.16em] text-[#00D4FF]">READ + LISTEN</p>
            <p className="mt-2 font-black text-white">ScrollVerse Books</p>
            <p className="mt-2 text-xs leading-5 text-[#B8C7D6]">Explore reader, storybook, and media-readiness pathways.</p>
          </Link>
          <Link href="/media-hub" className="sv-card rounded-2xl p-4 transition-transform hover:-translate-y-1" style={{ borderColor: "rgba(185,140,255,.42)" }}>
            <p className="text-[10px] font-mono tracking-[.16em] text-[#D6C4FF]">FOLLOW THE SIGNAL</p>
            <p className="mt-2 font-black text-white">Media Hub</p>
            <p className="mt-2 text-xs leading-5 text-[#B8C7D6]">Choose a listening, visual, or catalog path in one source-labeled desk.</p>
          </Link>
          <Link href="/creator-media-packet" className="sv-card gold-breathe rounded-2xl p-4 transition-transform hover:-translate-y-1">
            <p className="text-[10px] font-mono tracking-[.16em] text-[#FFCC4D]">CREATE WITH CARE</p>
            <p className="mt-2 font-black text-white">Production Packet</p>
            <p className="mt-2 text-xs leading-5 text-[#B8C7D6]">Prepare title, source, accessibility, and release evidence before a public player is attached.</p>
          </Link>
          <Link href="/digital-ships" className="sv-card rounded-2xl p-4 transition-transform hover:-translate-y-1" style={{ borderColor: "rgba(185,140,255,.48)", background: "linear-gradient(135deg, rgba(185,140,255,.12), rgba(0,212,255,.06))" }}>
            <p className="text-[10px] font-mono tracking-[.16em] text-[#D6C4FF]">FLOWING COMIC ROOM</p>
            <p className="mt-2 font-black text-white">Digital Ships</p>
            <p className="mt-2 text-xs leading-5 text-[#B8C7D6]">Explore a moving story panel, local imagination prompts, and voice-ready original cues.</p>
          </Link>
        </div>

        <div className="mx-auto mt-7 max-w-3xl rounded-2xl border p-5 text-left" style={{ borderColor: "rgba(167,139,250,0.38)", background: "rgba(167,139,250,0.07)" }}>
          <div className="text-[10px] font-mono tracking-widest" style={{ color: "#C4B5FD" }}>PUBLIC ANIMATION REFERENCE</div>
          <h2 className="mt-2 text-xl font-black text-white">Dragon Ball CyberX · serial-release study route</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#C4D0E0" }}>A public creator channel supplied by the ScrollVerse owner for animation and episodic-release discovery. It is a reference only: Dragon Ball and related rights remain with their respective rights holders, while YouTube and the channel publisher control all account, access, publication, and monetization decisions.</p>
          <a href={DRAGON_BALL_CYBERX_CHANNEL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-bold" style={{ borderColor: "rgba(196,181,253,0.5)", color: "#C4B5FD" }}>Open Dragon Ball CyberX public channel ↗</a>
        </div>
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-[2rem] border p-6 sm:p-8" style={{ borderColor: "rgba(0,212,255,0.26)", background: "linear-gradient(145deg, rgba(0,212,255,0.08), rgba(185,140,255,0.08), rgba(3,8,18,0.84))" }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono tracking-[0.18em]" style={{ color: "#00D4FF" }}>ORIGINAL STORY DEVELOPMENT</div>
              <h2 className="mt-3 text-3xl font-black text-white">Three worlds. One creator-owned studio.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "#C4D0E0" }}>These are original concept lanes for development, not released episodes or licensed franchise properties. Each visual is creator-owned concept art for ScrollVerse planning and needs a rights, script, production, and release record before publication.</p>
            </div>
            <Link href="/creator-operations" className="rounded-xl border px-4 py-3 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.5)", color: "#00FF88" }}>Prepare a cleared release →</Link>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {ORIGINAL_STORY_LANES.map((lane) => (
              <article key={lane.title} className="overflow-hidden rounded-2xl border" style={{ borderColor: `${lane.color}45`, background: "rgba(3,8,18,0.78)" }}>
                <img src={lane.image} alt={`Original concept visual for ${lane.title}`} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <div className="text-[10px] font-mono tracking-widest" style={{ color: lane.color }}>{lane.format.toUpperCase()}</div>
                  <h3 className="mt-2 text-xl font-black text-white">{lane.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{lane.description}</p>
                  <div className="mt-4 text-xs font-bold" style={{ color: lane.color }}>CONCEPT STAGE · RIGHTS REVIEW REQUIRED</div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border p-5" style={{ borderColor: `${selectedStoryLane.color}55`, background: "rgba(3,8,18,0.74)" }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-mono tracking-[0.18em]" style={{ color: selectedStoryLane.color }}>ORIGINAL WORLD DEVELOPMENT ATLAS</div>
                <h3 className="mt-2 text-2xl font-black text-white">Build the world before the release.</h3>
              </div>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Original story worlds">
                {ORIGINAL_STORY_LANES.map((lane, index) => (
                  <button
                    key={lane.title}
                    type="button"
                    onClick={() => setActiveStoryLane(index)}
                    className="rounded-lg border px-3 py-2 text-xs font-black transition-all"
                    style={{ borderColor: index === activeStoryLane ? lane.color : `${lane.color}45`, color: index === activeStoryLane ? lane.color : "#B8C7D6", background: index === activeStoryLane ? `${lane.color}18` : "transparent" }}
                    aria-pressed={index === activeStoryLane}
                  >
                    {lane.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border p-4" style={{ borderColor: `${selectedStoryLane.color}35`, background: `${selectedStoryLane.color}08` }}>
                <div className="text-[10px] font-mono tracking-widest" style={{ color: selectedStoryLane.color }}>EPISODE SEED</div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#D6E2EE" }}>{selectedStoryLane.episode}</p>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor: `${selectedStoryLane.color}35`, background: `${selectedStoryLane.color}08` }}>
                <div className="text-[10px] font-mono tracking-widest" style={{ color: selectedStoryLane.color }}>COMIC BLUEPRINT</div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#D6E2EE" }}>{selectedStoryLane.comic}</p>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor: `${selectedStoryLane.color}35`, background: `${selectedStoryLane.color}08` }}>
                <div className="text-[10px] font-mono tracking-widest" style={{ color: selectedStoryLane.color }}>SAFE STORY QUESTION</div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#D6E2EE" }}>{selectedStoryLane.audiencePrompt}</p>
                <Link href="/creator-operations" className="mt-4 inline-flex text-xs font-black" style={{ color: selectedStoryLane.color }}>Route an adult-supported story seed →</Link>
              </div>
              <Link href="/aegis-chronicles" className="inline-flex rounded-lg border px-4 py-2 text-xs font-black" style={{ borderColor: `${selectedStoryLane.color}66`, color: selectedStoryLane.color }}>Open Aegis Chronicles story hub →</Link>
            </div>
            <p className="mt-4 text-xs leading-relaxed" style={{ color: "#94A8BC" }}>Concept development stays separate from release. Any submitted seed needs adult support, consent, moderation, creator-rights review, and an owner-controlled release decision before it can be used or shared.</p>
          </div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border p-5" style={{ borderColor: "rgba(255,184,0,0.35)", background: "rgba(255,184,0,0.05)" }}>
              <div className="text-xs font-mono tracking-[0.18em]" style={{ color: "#FFB800" }}>STORY SEED LAB</div>
              <h3 className="mt-2 text-xl font-black text-white">Ideas can grow with the audience—safely.</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#C4D0E0" }}>Young audiences may share character or story ideas only through an adult-supported, private creator workflow. No child profile, direct message, public posting, or automatic use of an idea is created here. A guardian, consent record, moderation review, and creator-rights decision are required before any material moves forward.</p>
              <Link href="/creator-operations" className="mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.5)", color: "#FFB800" }}>Open protected story intake →</Link>
            </article>
            <article className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.35)", background: "rgba(0,255,136,0.05)" }}>
              <div className="text-xs font-mono tracking-[0.18em]" style={{ color: "#00FF88" }}>PUBLIC LEARNING ROUTES</div>
              <h3 className="mt-2 text-xl font-black text-white">Study formats, then make original work.</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#C4D0E0" }}>These owner-supplied public references are for discovery only. Their publishers retain all content, rights, accounts, and monetization. ScrollVerse does not claim affiliation or reproduce their protected material.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={UNSUNG_BLACK_HISTORY_CHANNEL} target="_blank" rel="noopener noreferrer" className="rounded-lg border px-3 py-2 text-xs font-black" style={{ borderColor: "rgba(0,212,255,0.5)", color: "#00D4FF" }}>Unsung Black History ↗</a>
                <a href={FREYA_RAY_CHANNEL} target="_blank" rel="noopener noreferrer" className="rounded-lg border px-3 py-2 text-xs font-black" style={{ borderColor: "rgba(185,140,255,0.5)", color: "#C4B5FD" }}>Freya Ray ↗</a>
                <a href={FINESTRUCTURE_SITE} target="_blank" rel="noopener noreferrer" className="rounded-lg border px-3 py-2 text-xs font-black" style={{ borderColor: "rgba(0,255,136,0.5)", color: "#00FF88" }}>FineStructure ↗</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* THOTH — Featured Film */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-12">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,184,0,0.3)", boxShadow: "0 0 60px rgba(255,184,0,0.08)" }}
        >
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{ background: "rgba(255,184,0,0.06)", borderBottom: "1px solid rgba(255,184,0,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(255,184,0,0.2)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.4)" }}
              >
                🔥 FEATURED FILM
              </div>
              <span className="text-white font-black text-lg">THOTH</span>
              <span style={{ color: "#8899AA" }}>— The Ancient Wisdom Awakens</span>
            </div>
            <div className="hidden md:flex gap-2">
              {["Ancient Wisdom", "Sovereign", "963Hz"].map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#8899AA" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
            {activeVideo === THOTH_VIDEO_ID ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${THOTH_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="THOTH — Junior Movies Entertainment"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                aria-label="Play THOTH in the Junior Movies player"
                className="absolute inset-0 flex items-center justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFB800]"
                style={{ background: "linear-gradient(135deg, #0a0a1a, #1a0a2e)" }}
                onClick={() => setActiveVideo(THOTH_VIDEO_ID)}
              >
                <img
                  src={`https://img.youtube.com/vi/${THOTH_VIDEO_ID}/maxresdefault.jpg`}
                  alt="THOTH"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${THOTH_VIDEO_ID}/hqdefault.jpg`; }}
                />
                <div
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255,0,0,0.9)", boxShadow: "0 0 40px rgba(255,0,0,0.5)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(3,8,18,0.95), transparent)" }}>
                  <div className="text-3xl font-black text-white mb-1">THOTH</div>
                  <div style={{ color: "#FFB800" }}>Junior Movies Entertainment × ScrollVerse</div>
                </div>
              </button>
            )}
          </div>

          <div className="p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#C4D0E0" }}>
              Thoth — keeper of divine knowledge, scribe of the gods, guardian of the scrolls. A Junior Movies Entertainment production that bridges ancient wisdom with sovereign frequency. The ancient one speaks. The scrolls open. The empire remembers.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={`https://youtu.be/${THOTH_VIDEO_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: "rgba(255,0,0,0.15)", color: "#FF4444", border: "1px solid rgba(255,0,0,0.3)" }}
              >
                ▶ Watch on YouTube
              </a>
              <button
                onClick={() => setActiveVideo(activeVideo === THOTH_VIDEO_ID ? null : THOTH_VIDEO_ID)}
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
              >
                {activeVideo === THOTH_VIDEO_ID ? "⏹ Close Player" : "▶ Play Here"}
              </button>
              <Link href="/sovereign-cinema">
                <span
                  className="px-4 py-2 rounded-lg text-sm font-bold cursor-pointer"
                  style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
                >
                  🎬 Full Cinema
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JME HIGHLIGHT — Second Featured Film */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-12">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(0,212,255,0.3)", boxShadow: "0 0 60px rgba(0,212,255,0.08)" }}
        >
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{ background: "rgba(0,212,255,0.06)", borderBottom: "1px solid rgba(0,212,255,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(0,212,255,0.2)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.4)" }}
              >
                ✨ JME HIGHLIGHT
              </div>
              <span className="text-white font-black text-lg">RA</span>
              <span style={{ color: "#8899AA" }}>— The Sun God Rises</span>
            </div>
            <div className="hidden md:flex gap-2">
              {["Solar Sovereign", "528Hz", "Empire"].map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#8899AA" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
            {activeVideo2 === "jme-ra" ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed?listType=user_uploads&list=juniormoviesentertainment&index=1&autoplay=1&rel=0&modestbranding=1`}
                title="RA — Junior Movies Entertainment"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                aria-label="Play RA in the Junior Movies player"
                className="absolute inset-0 flex items-center justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00D4FF]"
                style={{ background: "linear-gradient(135deg, #0a0a1a, #001a2e)" }}
                onClick={() => setActiveVideo2("jme-ra")}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, rgba(3,8,18,0.9) 70%)",
                  }}
                />
                {/* Animated sun rays */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        width: "2px",
                        height: "80px",
                        background: "linear-gradient(to top, transparent, rgba(255,184,0,0.4))",
                        transform: `rotate(${i * 45}deg) translateY(-60px)`,
                        transformOrigin: "bottom center",
                        animation: `spin 8s linear infinite`,
                      }}
                    />
                  ))}
                </div>
                <div
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255,0,0,0.9)", boxShadow: "0 0 40px rgba(255,0,0,0.5)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(3,8,18,0.95), transparent)" }}>
                  <div className="text-3xl font-black text-white mb-1">RA — THE SUN GOD</div>
                  <div style={{ color: "#00D4FF" }}>Junior Movies Entertainment × ScrollVerse</div>
                </div>
              </button>
            )}
          </div>

          <div className="p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#C4D0E0" }}>
              Ra — the supreme solar deity, source of all light and life. A Junior Movies Entertainment sovereign production channeling the frequency of 528Hz — the love frequency, the DNA repair code. The sun rises. The empire awakens. KUN FAYAKŪN × ∞
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: "rgba(255,0,0,0.15)", color: "#FF4444", border: "1px solid rgba(255,0,0,0.3)" }}
              >
                ▶ Watch on YouTube
              </a>
              <button
                onClick={() => setActiveVideo2(activeVideo2 === "jme-ra" ? null : "jme-ra")}
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
              >
                {activeVideo2 === "jme-ra" ? "⏹ Close Player" : "▶ Play Here"}
              </button>
              <Link href="/jme-universe">
                <span
                  className="px-4 py-2 rounded-lg text-sm font-bold cursor-pointer"
                  style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
                >
                  🌌 JME Universe
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── FULL WATCH — ZJTj-qjCfWY ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-12">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(0,255,136,0.35)", boxShadow: "0 0 60px rgba(0,255,136,0.08)" }}
        >
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{ background: "rgba(0,255,136,0.06)", borderBottom: "1px solid rgba(0,255,136,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(0,255,136,0.2)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.4)" }}
              >
                🎬 FULL WATCH
              </div>
              <span className="text-white font-black text-lg">Junior Movies</span>
              <span style={{ color: "#8899AA" }}>— Sovereign Cinema Full Feature</span>
            </div>
            <div className="hidden md:flex gap-2">
              {["Full Length", "Sovereign", "528Hz"].map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#8899AA" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Full Watch Embed — always visible, no click required */}
          <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/ZJTj-qjCfWY?rel=0&modestbranding=1&color=white"
              title="Junior Movies Entertainment — Full Watch"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#C4D0E0" }}>
              Full sovereign cinema experience from Junior Movies Entertainment. Ancient wisdom, divine frequency, and stories that change the world — watch the complete feature here. Part of the ScrollVerse Trinity Empire. KUN FAYAKŪN × ∞
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://youtu.be/ZJTj-qjCfWY"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: "rgba(255,0,0,0.15)", color: "#FF4444", border: "1px solid rgba(255,0,0,0.3)" }}
              >
                ▶ Open on YouTube
              </a>
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
              >
                🎬 Subscribe to Channel
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Channel Embed */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mb-12">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,0,0,0.2)", background: "rgba(255,0,0,0.02)" }}
        >
          <div className="flex items-center justify-between gap-3 px-6 py-4" style={{ borderBottom: channelExpanded ? "1px solid rgba(255,0,0,0.15)" : "none" }}>
            <button type="button" aria-expanded={channelExpanded} aria-controls="junior-movies-channel-player" onClick={() => setChannelExpanded(!channelExpanded)} className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#FF0000" }}>
                <svg width="16" height="12" viewBox="0 0 20 14" fill="white">
                  <path d="M19.582 2.186A2.506 2.506 0 0 0 17.818.422C16.254 0 10 0 10 0S3.746 0 2.182.422A2.506 2.506 0 0 0 .418 2.186C0 3.75 0 7 0 7s0 3.25.418 4.814a2.506 2.506 0 0 0 1.764 1.764C3.746 14 10 14 10 14s6.254 0 7.818-.422a2.506 2.506 0 0 0 1.764-1.764C20 10.25 20 7 20 7s0-3.25-.418-4.814zM8 10V4l5.196 3L8 10z"/>
                </svg>
              </div>
              <div>
                <div className="font-black text-white">Junior Movies Entertainment</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{CHANNEL_HANDLE}</div>
              </div>
              <span className="ml-auto shrink-0" style={{ color: "#8899AA", fontSize: "18px" }}>{channelExpanded ? "▲" : "▼"}</span>
            </button>
            <div className="flex items-center gap-3">
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ background: "#FF0000", color: "white" }}
              >
                Subscribe
              </a>
            </div>
          </div>

          {channelExpanded && (
            <iframe
              id="junior-movies-channel-player"
              src="https://www.youtube.com/embed?listType=user_uploads&list=juniormoviesentertainment&rel=0&modestbranding=1"
              title="Junior Movies Entertainment Channel"
              width="100%"
              height="400"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block" }}
            />
          )}
          {!channelExpanded && (
            <div className="px-6 py-4">
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Subscribe to Junior Movies Entertainment for sovereign cinema, ancient wisdom films, and ScrollVerse productions. Click to expand the channel player.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* More from ScrollVerse Cinema */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-white mb-2">More Sovereign Cinema</h2>
          <p style={{ color: "#8899AA" }}>Explore the full ScrollVerse cinematic universe</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Sovereign Cinema", href: "/sovereign-cinema", color: "#FFB800", icon: "🎬", desc: "Full film library" },
            { title: "Storybooks", href: "/storybooks", color: "#00D4FF", icon: "📖", desc: "Motion picture storybooks" },
            { title: "Scroll TV", href: "/scroll-tv", color: "#00FF88", icon: "📺", desc: "Live sovereign broadcasts" },
          ].map(item => (
            <Link key={item.href} href={item.href}>
              <div
                className="rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}25` }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-white mb-1">{item.title}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 px-4">
        <div className="text-xs font-mono" style={{ color: "#FFB800" }}>
          KUN FAYAKŪN × ∞ — Junior Movies Entertainment × ScrollVerse Trinity
        </div>
        <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
          Chais Kenyatta Hill — Sabir Allah The Great — The Empire Never Sleeps
        </div>
      </div>
    </div>
  );
}
