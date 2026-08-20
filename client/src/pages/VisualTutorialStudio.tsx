import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { BookOpenCheck, BrainCircuit, CheckCircle2, ChevronRight, Clapperboard, Compass, Copy, Eye, Film, Orbit, Rocket, ShieldCheck, Sparkles, Swords, Volume2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type OperatingState = "available now" | "research" | "requires owner release";

type Tutorial = {
  id: string;
  number: string;
  lane: string;
  title: string;
  firstQuestion: string;
  summary: string;
  example: string;
  route: string;
  routeLabel: string;
  color: string;
  icon: LucideIcon;
  state: OperatingState;
  steps: string[];
  videoArc: string[];
  captionCue: string;
};

const TUTORIALS: Tutorial[] = [
  {
    id: "portal",
    number: "01",
    lane: "START HERE",
    title: "Find your first doorway",
    firstQuestion: "What is ScrollVerse, and where should I begin?",
    summary: "Start with the path that matches what you want to learn, build, read, practice, or prepare. Every route shows what is available, what is research, and what still needs owner release.",
    example: "A visitor curious about the whole portal can begin with one learning lane instead of navigating every system at once.",
    route: "/",
    routeLabel: "Open the portal front door",
    color: "#00D4FF",
    icon: Compass,
    state: "available now",
    steps: ["Choose a goal: discover, create, read, practice, or launch.", "Open one source-led route instead of trying to learn everything at once.", "Use the visible operating state to understand what the route can do today."],
    videoArc: ["A signal dot opens into six learning lanes.", "Each lane receives one plain-language purpose label.", "A visitor selects one doorway and the route handoff becomes visible."],
    captionCue: "Start with the path that matches what you want to do."
  },
  {
    id: "canvas",
    number: "02",
    lane: "CREATE WITH EVIDENCE",
    title: "Turn an idea into a visible plan",
    firstQuestion: "How do I make a creative idea clear enough to review?",
    summary: "Vibe Canvas turns a concept into browser-local planning boards for visual worlds, story, co-creation, technical research, and release gates.",
    example: "A new film, lesson, fashion concept, or story can begin as a visual plan before it becomes a public claim or provider action.",
    route: "/vibe-canvas",
    routeLabel: "Open Vibe Canvas",
    color: "#B98CFF",
    icon: Orbit,
    state: "available now",
    steps: ["Name the original idea in everyday language.", "Place it on the board that best fits the work.", "Add the source, accessibility need, next route, and release gate."],
    videoArc: ["A single idea card enters an empty grid.", "Six visual planning boards organize the idea into clear lanes.", "A source tag and next-route beacon appear before any release claim."],
    captionCue: "Plan first. Make the source and next step visible."
  },
  {
    id: "ai",
    number: "03",
    lane: "LEARN WITH AI",
    title: "Use guides without losing the boundary",
    firstQuestion: "How do original AI roles and public AI tools fit together?",
    summary: "The AI Constellation explains original ScrollVerse guide roles, offers public discovery links, and separates a useful tutorial from an external integration.",
    example: "A visitor can use an original role tutorial to frame a research question, then independently choose whether to visit a public AI service.",
    route: "/ai-constellation",
    routeLabel: "Open AI Constellation",
    color: "#00FF88",
    icon: BrainCircuit,
    state: "available now",
    steps: ["Choose an original role based on the question you are trying to answer.", "Read what the role does, how to use it, and its limit.", "Treat public AI links as visitor choices, not shared integrations."],
    videoArc: ["An original guide card comes into focus.", "A public discovery doorway appears beside an evidence gate.", "The gate remains visible as the visitor chooses their own next step."],
    captionCue: "A guide can explain a path. A public link is not an integration."
  },
  {
    id: "books",
    number: "04",
    lane: "READ AND PUBLISH",
    title: "Follow a book from source to reader path",
    firstQuestion: "How are books, editions, access, and release controls handled?",
    summary: "Creator Books separates an owner-authored source, format ideas, accessibility planning, reader routes, and the exact fields needed before a public release.",
    example: "A manuscript can be planned as an ebook, print edition, or audio edition without implying that any distributor or checkout is active.",
    route: "/creator-books",
    routeLabel: "Open Creator Books",
    color: "#D6C4FF",
    icon: BookOpenCheck,
    state: "available now",
    steps: ["Start with the manuscript or first-party source context.", "Choose a format and plan accessibility for that specific edition.", "Keep the reader path and release record separate from a provider publication."],
    videoArc: ["A manuscript card unfolds into ebook, print, and audio tiles.", "Each tile receives an accessibility tag and reader-path line.", "A release record closes the sequence without showing an external upload."],
    captionCue: "Plan each edition clearly before any upload, sale, or distribution claim."
  },
  {
    id: "chess",
    number: "05",
    lane: "PRACTICE STRATEGY",
    title: "Learn chess at your own level",
    firstQuestion: "How can I practice strategy safely and clearly?",
    summary: "The Chess Initiative combines an original browser-local board, beginner-to-advanced learning paths, local practice prompts, and adult-supported participation guidance for younger learners.",
    example: "A new player can select a level, understand a concept, practice locally, and decide the next learning step without an external account.",
    route: "/scrollverse-chess-arena",
    routeLabel: "Open Chess Initiative",
    color: "#FFB800",
    icon: Swords,
    state: "available now",
    steps: ["Choose beginner, intermediate, or advanced practice.", "Use the browser-local board and guide prompt to explore one concept.", "For younger learners, keep adult-supported participation visible."],
    videoArc: ["A chessboard lights one legal move at a time.", "A level selector changes the practice challenge.", "A youth-support reminder appears before the visitor opens the next lesson."],
    captionCue: "Choose your level, practice locally, and keep support visible."
  },
  {
    id: "launch",
    number: "06",
    lane: "PREPARE A LAUNCH",
    title: "Make the next release record clear",
    firstQuestion: "What needs to be ready before a creator release?",
    summary: "The August 28 Command Center brings evidence, creative planning, first-SKU readiness, and exact release gates into one browser-local preparation path.",
    example: "A creator can identify one missing source, rights record, accessibility item, or destination before taking a provider-side action.",
    route: "/august-28-launch",
    routeLabel: "Open Launch Command Center",
    color: "#FF6B9A",
    icon: Rocket,
    state: "available now",
    steps: ["Choose one creative release lane.", "Identify the asset, rights, accessibility, destination, and owner decision it needs.", "Move only the specific complete item to an owner-release decision."],
    videoArc: ["Evidence, creative brief, and release fields arrive as separate tiles.", "One incomplete field is highlighted rather than hidden.", "The visitor chooses a next record instead of an implied external launch."],
    captionCue: "A launch becomes clearer when each asset, right, and decision has its own record."
  }
];

const STATE_META: Record<OperatingState, { label: string; color: string }> = {
  "available now": { label: "AVAILABLE NOW", color: "#00FF88" },
  research: { label: "RESEARCH", color: "#00D4FF" },
  "requires owner release": { label: "REQUIRES OWNER RELEASE", color: "#FFCC4D" }
};

export default function VisualTutorialStudio() {
  useSovereignHeartbeat({ page: "tutorial-studio" });
  const [mode, setMode] = useState<"start" | "deeper">("start");
  const [selectedId, setSelectedId] = useState(TUTORIALS[0].id);

  const selected = useMemo(() => TUTORIALS.find((tutorial) => tutorial.id === selectedId) ?? TUTORIALS[0], [selectedId]);
  const SelectedIcon = selected.icon;
  const state = STATE_META[selected.state];
  const videoBrief = `ScrollVerse short tutorial production brief\nTutorial: ${selected.title}\nPurpose: ${selected.firstQuestion}\nAudience: ${mode === "start" ? "First-time portal visitor" : "Visitor seeking the detailed pathway"}\nTarget duration: 30–45 seconds\nAspect ratio: [16:9 or 9:16 — owner decision]\nVisual direction: Original ScrollVerse high-contrast visual tutorial; no third-party likenesses\nVisual sequence: ${selected.videoArc.join(" ")}\nCaption cue: ${selected.captionCue}\nNarration: [original narrator decision required]\nMusic-use authorization: [required if music is used]\nAccessibility: Verbatim captions + transcript + readable on-screen labels\nExact Skool destination: [required]\nOwner release: [required]\nBoundary: This is a browser-local production brief. It does not generate, upload, publish, or claim a video.`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(videoBrief);
      toast.success("Short-video production brief copied.");
    } catch {
      toast.error("Copy is unavailable in this browser.");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative border-b border-[#00D4FF]/30 bg-[radial-gradient(circle_at_12%_12%,rgba(0,212,255,.23),transparent_24%),radial-gradient(circle_at_88%_16%,rgba(185,140,255,.22),transparent_24%),radial-gradient(circle_at_55%_90%,rgba(0,255,136,.12),transparent_32%),#050B1A]">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
        <div className="container relative py-14 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← SCROLLVERSE FRONT DOOR</Link>
            <span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">VISUAL LEARNING · ACCESSIBLE TEXT · RELEASE-AWARE</span>
          </div>
          <div className="mt-11 grid gap-10 xl:grid-cols-[1.1fr_.9fr] xl:items-end">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#9DEBFF]">SCROLLVERSE VISUAL TUTORIAL STUDIO</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.91] md:text-7xl">A clear visual path for <span className="text-[#B5F7CC]">every kind of visitor.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Choose a 60-second learning path if you are new, or open the deeper packet when you want the source, practical use, related route, and short-video production record in one place.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => setMode("start")} className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Start in 60 seconds</button>
                <button type="button" onClick={() => setMode("deeper")} className="rounded-xl border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Go deeper</button>
                <a href="#tutorial-paths" className="rounded-xl border border-[#00FF88]/50 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Browse six paths</a>
              </div>
            </div>
            <aside className="relative min-h-[280px] overflow-hidden rounded-[2.2rem] border border-[#00D4FF]/30 bg-[linear-gradient(145deg,rgba(7,20,38,.92),rgba(0,212,255,.10))] p-6">
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D4FF]/70 bg-[#00D4FF]/10 shadow-[0_0_55px_rgba(0,212,255,.35)]" aria-hidden="true" />
              <Sparkles className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-[#9DEBFF]" aria-hidden="true" />
              {TUTORIALS.map((tutorial, index) => {
                const Icon = tutorial.icon;
                const angle = (index * 360) / TUTORIALS.length - 90;
                const x = 50 + Math.cos((angle * Math.PI) / 180) * 38;
                const y = 50 + Math.sin((angle * Math.PI) / 180) * 36;
                return <button key={tutorial.id} type="button" onClick={() => { setSelectedId(tutorial.id); document.getElementById("tutorial-paths")?.scrollIntoView({ behavior: "smooth" }); }} className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white" style={{ left: `${x}%`, top: `${y}%`, color: tutorial.color, borderColor: `${tutorial.color}80`, background: "#071426" }} aria-label={`Open ${tutorial.title} tutorial`}><Icon className="h-5 w-5" /></button>;
              })}
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-[10px] font-mono tracking-[.15em] text-[#9DEBFF]">VISUAL ORBIT</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Six clear doorways. One visible next step. No account, provider, or video is required to begin learning.</p></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-9"><PortalTrustLens lane="Visual Tutorial Studio" source="Original ScrollVerse tutorial routes, browser-local learning pages, the Phase 587 visual tutorial design record, and item-specific video release requirements." readiness="Six browser-local visual tutorials, plain-language guidance, local production briefs, caption planning, and registered route handoffs are available now." boundary="This page does not generate a video, clone a voice, create a Skool account, upload media, publish a lesson, connect a provider, or imply that an external tutorial video exists." /></section>

      <section id="tutorial-paths" className="container py-7">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">{mode === "start" ? "START HERE · 60-SECOND PATHS" : "GO DEEPER · SOURCE, STEPS, AND PRODUCTION BRIEFS"}</p><h2 className="mt-3 text-4xl font-black">Choose the question that feels most useful now.</h2></div><div className="flex gap-2"><button type="button" onClick={() => setMode("start")} className={`rounded-full border px-4 py-2 text-[10px] font-mono tracking-[.12em] ${mode === "start" ? "border-[#00D4FF] bg-[#00D4FF]/15 text-[#9DEBFF]" : "border-white/15 text-[#AFC0CF]"}`}>START HERE</button><button type="button" onClick={() => setMode("deeper")} className={`rounded-full border px-4 py-2 text-[10px] font-mono tracking-[.12em] ${mode === "deeper" ? "border-[#B98CFF] bg-[#B98CFF]/15 text-[#DCC8FF]" : "border-white/15 text-[#AFC0CF]"}`}>GO DEEPER</button></div></div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {TUTORIALS.map((tutorial) => {
            const Icon = tutorial.icon;
            const tutorialState = STATE_META[tutorial.state];
            const active = tutorial.id === selected.id;
            return <article key={tutorial.id} className="group relative flex flex-col overflow-hidden rounded-[1.8rem] border bg-white/[.025] p-6 transition hover:-translate-y-1" style={{ borderColor: active ? tutorial.color : `${tutorial.color}55`, boxShadow: active ? `0 0 0 1px ${tutorial.color}33, 0 24px 56px ${tutorial.color}14` : undefined }}>
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[5rem] opacity-20" style={{ background: tutorial.color }} aria-hidden="true" />
              <div className="relative flex items-start justify-between gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border" style={{ borderColor: `${tutorial.color}80`, background: `${tutorial.color}13`, color: tutorial.color }}><Icon className="h-6 w-6" /></div><span className="rounded-full border px-2 py-1 text-[9px] font-mono" style={{ borderColor: `${tutorialState.color}66`, color: tutorialState.color, background: `${tutorialState.color}12` }}>{tutorialState.label}</span></div>
              <p className="relative mt-6 text-[10px] font-mono tracking-[.16em]" style={{ color: tutorial.color }}>{tutorial.number} · {tutorial.lane}</p><h3 className="relative mt-3 text-2xl font-black leading-tight">{tutorial.title}</h3><p className="relative mt-3 text-sm leading-7 text-[#D6E2EE]">{mode === "start" ? tutorial.firstQuestion : tutorial.summary}</p>
              {mode === "deeper" && <div className="relative mt-5 rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-mono text-[#AFC0CF]">PRACTICAL EXAMPLE</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{tutorial.example}</p></div>}
              <button type="button" onClick={() => setSelectedId(tutorial.id)} className="relative mt-6 inline-flex items-center gap-2 text-left text-sm font-black" style={{ color: tutorial.color }}>Open this tutorial <ChevronRight className="h-4 w-4" /></button>
            </article>;
          })}
        </div>
      </section>

      <section className="container py-9">
        <div className="rounded-[2.2rem] border border-[#B98CFF]/40 bg-[radial-gradient(circle_at_95%_7%,rgba(185,140,255,.22),transparent_28%),radial-gradient(circle_at_6%_96%,rgba(0,255,136,.12),transparent_30%),#071426] p-7 sm:p-9">
          <div className="grid gap-8 xl:grid-cols-[.83fr_1.17fr]">
            <div><div className="flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ borderColor: `${selected.color}80`, color: selected.color, background: `${selected.color}12` }}><SelectedIcon className="h-7 w-7" /></div><p className="mt-5 text-xs font-mono tracking-[.16em]" style={{ color: selected.color }}>{selected.lane} · {selected.number}</p><h2 className="mt-3 text-4xl font-black leading-tight">{selected.title}</h2><p className="mt-4 text-base leading-8 text-[#D6E2EE]">{selected.summary}</p><div className="mt-6 rounded-2xl border border-[#00FF88]/30 bg-[#00FF88]/[.06] p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#B5F7CC]">READ IN 60 SECONDS</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.firstQuestion}</p></div></div>
            <div className="grid gap-4"><article className="rounded-2xl border border-white/10 bg-black/25 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">THREE VISUAL STEPS</p><div className="mt-5 space-y-3">{selected.steps.map((step, index) => <div key={step} className="flex gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black" style={{ background: `${selected.color}20`, color: selected.color }}>{index + 1}</span><p className="text-sm leading-6 text-[#D6E2EE]">{step}</p></div>)}</div><Link href={selected.route} className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black" style={{ background: selected.color, color: "#071426" }}>{selected.routeLabel} <ChevronRight className="h-4 w-4" /></Link></article>
              <article className="rounded-2xl border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.055] p-5"><div className="flex items-center gap-3"><Clapperboard className="h-6 w-6 text-[#FFDEA0]" /><p className="text-[10px] font-mono tracking-[.14em] text-[#FFDEA0]">SHORT-VIDEO PRODUCTION BRIEF</p></div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">A future 30–45 second original video can use this visual arc. The browser-local brief is ready; final media and Skool release remain separate decisions.</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{selected.videoArc.map((line, index) => <div key={line} className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-[9px] font-mono text-[#FFDEA0]">BEAT {index + 1}</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">{line}</p></div>)}</div><div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono text-[#9DEBFF]">CAPTIONS PLANNED</span><span className="rounded-full border border-[#B98CFF]/40 bg-[#B98CFF]/10 px-3 py-1 text-[10px] font-mono text-[#DCC8FF]">TRANSCRIPT PLANNED</span><span className="rounded-full border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono text-[#FFDEA0]">SKOOL RELEASE REQUIRED</span></div><button type="button" onClick={copyBrief} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#FFCC4D]/50 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]"><Copy className="h-4 w-4" />Copy production brief</button></article>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8"><div className="grid gap-5 lg:grid-cols-3"><article className="rounded-[1.8rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.06] p-6"><Eye className="h-7 w-7 text-[#9DEBFF]" /><h2 className="mt-5 text-2xl font-black">Visual without confusion</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">High-contrast color, icons, numbered steps, and plain-language examples make each route easy to enter without reducing the deeper record.</p></article><article className="rounded-[1.8rem] border border-[#00FF88]/35 bg-[#00FF88]/[.06] p-6"><Volume2 className="h-7 w-7 text-[#B5F7CC]" /><h2 className="mt-5 text-2xl font-black">Accessible by design</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Every planned video includes verbatim captions, a transcript, readable labels, and an original narration decision before release.</p></article><article className="rounded-[1.8rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.06] p-6"><ShieldCheck className="h-7 w-7 text-[#FFDEA0]" /><h2 className="mt-5 text-2xl font-black">Skool is a release gate</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">A production brief is not an upload. A specific destination, original media, rights, captions, and owner release are still required.</p></article></div></section>

      <section className="container py-8"><div className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.055] p-7"><CheckCircle2 className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">ONE SITE · MANY CLEAR EXPLANATIONS</p><h2 className="mt-3 text-3xl font-black">Learn at your pace. Choose your next route.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The visual system is available now as an on-site tutorial experience. The same packets can become original short videos after the exact media and Skool release record is complete.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/ai-constellation" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">AI Constellation</Link><Link href="/creator-books" className="rounded-xl border border-[#D6C4FF]/50 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Creator Books</Link><Link href="/continuation-readiness-register" className="rounded-xl border border-[#FFCC4D]/50 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Release gates</Link></div></div></section>
    </main>
  );
}
