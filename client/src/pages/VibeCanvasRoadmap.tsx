import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Compass, Layers3, LockKeyhole, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type BoardState = "available now" | "research" | "requires owner release";

type Board = {
  id: string;
  title: string;
  state: BoardState;
  marker: string;
  summary: string;
  source: string;
  next: string;
  boundary: string;
  href: string;
  action: string;
};

const BOARDS: Board[] = [
  {
    id: "visual-worlds",
    title: "Visual worlds",
    state: "available now",
    marker: "01 / LOOK + MOTION",
    summary: "Map original fashion concepts, visual motifs, scene language, and release state before any external board or visual asset is shared.",
    source: "Owner-authored lookbook and visual-planning context; browser-local route structure.",
    next: "Choose one original concept and attach a cleared source, intended use, and accessible visual description.",
    boundary: "No asset import, third-party likeness, external Vibe Canvas board, image generation, upload, or publication.",
    href: "/fashion-lookbook-experience",
    action: "Open lookbook experience",
  },
  {
    id: "story-lab",
    title: "Story + episode lab",
    state: "available now",
    marker: "02 / SCENE ROUTING",
    summary: "Organize original episode and music-video planning into scene, purpose, accessibility, source, and release-readiness fields.",
    source: "Owner-authored episodic-production direction and protected production packets.",
    next: "Provide a per-song or per-episode brief with narrative, duration, aspect ratio, music-use authorization, and release destination.",
    boundary: "No music use, generated video, platform upload, or public release.",
    href: "/episode-experience",
    action: "Open episode experience",
  },
  {
    id: "co-creation-trail",
    title: "Co-creation trail",
    state: "research",
    marker: "03 / SOURCE TRAIL",
    summary: "Present owner-authored human–AI co-creation material through source, date, limitation, and correction fields for visitor-directed interpretation.",
    source: "Owner-supplied first-party archive records, source-labeled intakes, and current portal documentation.",
    next: "Select one named artifact or conversation record and provide the intended public scope and any supporting source path.",
    boundary: "No uniqueness guarantee, account synchronization claim, third-party system control, or automatic publication.",
    href: "/first-party-co-creation",
    action: "Open co-creation record",
  },
  {
    id: "technical-research",
    title: "Technical research board",
    state: "research",
    marker: "04 / METHOD + PROOF",
    summary: "Hold technical, quantum-computing, contract, and AI-tooling ideas as research cards until a reproducible source, method, and result are available.",
    source: "First-party technical research records and protected technical-planning intakes.",
    next: "For a technical result, provide a named platform, code or notebook, method, execution identifier or output, and date.",
    boundary: "No contract deployment, wallet connection, provider activation, code execution, financial routing, or quantum-computing claim.",
    href: "/quantum-research",
    action: "Open quantum research",
  },
  {
    id: "release-gates",
    title: "Release-gate control room",
    state: "requires owner release",
    marker: "05 / RELEASE CHECK",
    summary: "Use a single visible action map for source, rights, access, destination, accessibility, and exact release confirmation.",
    source: "Continuation Readiness Register and first-SKU release controls.",
    next: "Complete the exact row for the intended external action; use one item-specific source or confirmation at a time.",
    boundary: "No board sharing, account action, checkout, provider request, contract action, payment, token event, upload, or publication.",
    href: "/continuation-readiness-register",
    action: "Open readiness register",
  },
  {
    id: "project-locator",
    title: "Verified project locator",
    state: "available now",
    marker: "06 / CURRENT PORTAL",
    summary: "Locate the active ScrollVerse-side system: the managed `scrollverse-portal` project and its public portal route collection.",
    source: "Current managed project record, validated route registry, and first-party evidence documentation.",
    next: "Use the project routes and source records to identify a specific item for review rather than relying on copied status language.",
    boundary: "No external Manus account access, task mutation, repository action, Drive change, or provider activation.",
    href: "/systems-map",
    action: "Open systems map",
  },
];

const STATES: Array<BoardState | "all"> = ["all", "available now", "research", "requires owner release"];

export default function VibeCanvasRoadmap() {
  useSovereignHeartbeat({ page: "vibe-canvas-roadmap" });
  const [filter, setFilter] = useState<BoardState | "all">("all");
  const [activeBoard, setActiveBoard] = useState<string>("visual-worlds");

  const visibleBoards = useMemo(
    () => (filter === "all" ? BOARDS : BOARDS.filter(board => board.state === filter)),
    [filter],
  );
  const focused = BOARDS.find(board => board.id === activeBoard) ?? BOARDS[0];

  const copyHandoff = () => {
    const record = [
      "ScrollVerse Vibe Canvas handoff record",
      `Focused board: ${focused.title}`,
      `Operating state: ${focused.state}`,
      `Source: ${focused.source}`,
      `Next required input: ${focused.next}`,
      `Boundary: ${focused.boundary}`,
      "External Vibe Canvas workspace/board: not yet identified in the current project record.",
    ].join("\n");
    navigator.clipboard?.writeText(record)
      .then(() => toast.success("Local Vibe Canvas handoff record copied."))
      .catch(() => toast.message("Copy is available in a browser with clipboard permission."));
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-20 text-white">
      <section className="overflow-hidden border-b border-[#B98CFF]/20 bg-[radial-gradient(circle_at_14%_16%,rgba(185,140,255,.22),transparent_30%),radial-gradient(circle_at_84%_12%,rgba(0,212,255,.16),transparent_26%),linear-gradient(135deg,#080719_0%,#080e26_55%,#071a24_100%)]">
        <div className="container relative py-16 md:py-24">
          <div className="absolute right-2 top-8 hidden h-64 w-64 rounded-full border border-[#B98CFF]/25 md:block" />
          <div className="absolute right-16 top-16 hidden h-44 w-44 rounded-full border border-[#00D4FF]/20 md:block" />
          <Link href="/" className="relative inline-flex items-center gap-2 text-xs font-bold text-[#B5F7CC] hover:text-white"><ArrowLeft className="h-4 w-4" />Back to ScrollVerse</Link>
          <p className="relative mt-10 font-mono text-xs tracking-[.25em] text-[#B98CFF]">VIBE CANVAS / SCROLLVERSE-SIDE ACTIVATION</p>
          <h1 className="relative mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">A visual roadmap for <span className="text-[#9DEBFF]">original work, source trails,</span> and the next real release input.</h1>
          <p className="relative mt-6 max-w-3xl text-base leading-7 text-slate-300">This is the active, browser-local ScrollVerse Vibe Canvas experience. It organizes the owner-authored co-creation trail into visual worlds, story planning, research, project location, and release controls. An external Vibe Canvas workspace is not connected in this project record, so the handoff stays explicit.</p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-4 py-2 text-xs font-bold text-[#B5F7CC]">BROWSER-LOCAL ROADMAP AVAILABLE NOW</span>
            <span className="rounded-full border border-[#FFB800]/35 bg-[#FFB800]/10 px-4 py-2 text-xs font-bold text-[#FFE3A0]">EXTERNAL BOARD REQUIRES OWNER RELEASE</span>
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <PortalTrustLens lane="Vibe Canvas co-creation evidence roadmap" source="Owner-supplied co-creation records, protected source intakes, current project locator, and public Vibe Canvas product research" readiness="Browser-local visual roadmap available now" boundary="No Vibe Canvas account, workspace, board, API, import, export, sharing action, asset publication, provider action, payment, wallet, contract, token, or schedule is created here." />

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <article className="rounded-[2rem] border border-[#B98CFF]/25 bg-[#0a0920]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,.24)] md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="font-mono text-[10px] tracking-[.2em] text-[#B98CFF]">FOCUSED BOARD</p><h2 className="mt-2 text-3xl font-black">{focused.title}</h2></div>
              <span className="rounded-full bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-[#9DEBFF]">{focused.state}</span>
            </div>
            <p className="mt-5 text-base leading-7 text-slate-300">{focused.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-black tracking-widest text-[#B5F7CC]">SOURCE CONTEXT</p><p className="mt-2 text-sm leading-6 text-slate-300">{focused.source}</p></div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-black tracking-widest text-[#FFE3A0]">NEXT REAL INPUT</p><p className="mt-2 text-sm leading-6 text-slate-300">{focused.next}</p></div>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-400"><LockKeyhole className="mr-2 inline h-4 w-4 text-[#FFB800]" />{focused.boundary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={focused.href} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/35 px-4 py-3 text-xs font-black text-[#9DEBFF] hover:bg-[#00D4FF]/10"><Compass className="h-4 w-4" />{focused.action}</Link>
              <button onClick={copyHandoff} className="inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-4 py-3 text-xs font-black text-[#10091b] hover:bg-[#cbaaff]"><ClipboardCheck className="h-4 w-4" />Copy handoff record</button>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#00D4FF]/20 bg-[linear-gradient(150deg,rgba(0,212,255,.09),rgba(0,0,0,.16))] p-6 md:p-8">
            <div className="flex items-center gap-3"><Layers3 className="h-5 w-5 text-[#00D4FF]" /><div><p className="font-mono text-[10px] tracking-[.2em] text-[#00D4FF]">HANDOFF GATE</p><h2 className="mt-1 text-2xl font-black">External board context</h2></div></div>
            <p className="mt-5 text-sm leading-6 text-slate-300">The public Vibe Canvas product was researched, but no authenticated workspace, board URL, board ID, asset library, or publishing permission is present in this project record.</p>
            <div className="mt-6 space-y-3">
              {[
                "Verified Vibe Canvas workspace or board context",
                "Exact intended action: create, import, share, export, or publish",
                "Cleared original asset/source and purpose-specific rights record",
                "Accessibility plan, visibility choice, and separate owner release",
              ].map((item, index) => <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00D4FF]/15 text-xs font-black text-[#9DEBFF]">{index + 1}</span><p className="text-sm leading-6 text-slate-300">{item}</p></div>)}
            </div>
            <p className="mt-6 rounded-2xl border border-[#FFB800]/25 bg-[#FFB800]/[.07] p-4 text-xs leading-5 text-[#FFE3A0]"><Sparkles className="mr-2 inline h-4 w-4" />The ScrollVerse-side canvas can continue now. A specific external Canvas action begins only after this handoff record is complete.</p>
          </article>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" aria-label="Filter Vibe Canvas boards">
          {STATES.map(state => <button key={state} onClick={() => setFilter(state)} aria-pressed={filter === state} className={`rounded-full px-4 py-2 text-xs font-black capitalize transition ${filter === state ? "bg-[#00D4FF] text-[#050B1A]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{state}</button>)}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleBoards.map(board => <article key={board.id} className={`rounded-3xl border p-6 transition ${activeBoard === board.id ? "border-[#B98CFF]/70 bg-[#B98CFF]/[.11]" : "border-white/10 bg-white/[.025] hover:border-[#00D4FF]/35"}`}>
            <p className="font-mono text-[10px] tracking-[.18em] text-[#B98CFF]">{board.marker}</p>
            <div className="mt-4 flex items-start justify-between gap-3"><h2 className="text-xl font-black">{board.title}</h2><span className="text-[10px] font-bold text-[#B5F7CC]">{board.state}</span></div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{board.summary}</p>
            <button onClick={() => { setActiveBoard(board.id); toast.success(`${board.title} is now the local focus board.`); }} className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#9DEBFF] hover:text-white"><CheckCircle2 className="h-4 w-4" />Focus this board</button>
          </article>)}
        </div>

        <section className="mt-12 rounded-[2rem] border border-[#00FF88]/25 bg-[#00FF88]/[.045] p-6 md:p-8">
          <p className="font-mono text-[10px] tracking-[.22em] text-[#B5F7CC]">ROADMAP STANDARD</p>
          <h2 className="mt-3 text-2xl font-black">Every board stays readable to the people it is made for.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">Each future board should carry an original purpose, source/date, accessibility description, rights or custody record, direct operating-state label, limitation, correction path, and release decision. Youth-facing materials require adult-supported participation guidance. Visitors can review the work and decide for themselves.</p>
        </section>
      </section>
    </main>
  );
}
