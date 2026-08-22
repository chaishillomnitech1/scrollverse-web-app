import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpenCheck, Clapperboard, Compass, Copy, Gamepad2, Image, Layers3, Music2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type LaunchLane = {
  id: string;
  title: string;
  state: "available now" | "research" | "requires owner release";
  icon: typeof Sparkles;
  color: string;
  question: string;
  output: string;
  routes: Array<{ label: string; href: string }>;
};

const lanes: LaunchLane[] = [
  {
    id: "source",
    title: "Source the record",
    state: "available now",
    icon: Compass,
    color: "#00D4FF",
    question: "What is the source, what does it visibly show, and what is its current evidence state?",
    output: "A connected source record, visual evidence entry, or chronology handoff.",
    routes: [{ label: "Connected Source Registry", href: "/connected-source-registry" }, { label: "Transmissions Convergence", href: "/transmissions-source-convergence" }],
  },
  {
    id: "shape",
    title: "Shape the creation",
    state: "available now",
    icon: Image,
    color: "#FFB800",
    question: "How can an original idea become visual identity, story, fashion, or a collectible-readiness record?",
    output: "A source-linked creative concept that preserves origin and variant context.",
    routes: [{ label: "Digital Mirror Twin", href: "/digital-mirror-twin" }, { label: "Cartoon Gallery", href: "/sovereign-cartoon-gallery" }, { label: "Fashion Empire", href: "/fashion-empire" }],
  },
  {
    id: "compose",
    title: "Compose media and catalog",
    state: "available now",
    icon: Music2,
    color: "#FF6B9A",
    question: "Which catalog, visual, media, and narrative records can be prepared for the next release conversation?",
    output: "A browser-local media or music concept record with source and release handoffs.",
    routes: [{ label: "Music Catalog", href: "/music" }, { label: "Media Concept Board", href: "/media-release-concept-board" }, { label: "Connected Music Evidence", href: "/connected-statements-music-evidence" }],
  },
  {
    id: "study",
    title: "Study the system",
    state: "research",
    icon: BookOpenCheck,
    color: "#00FF88",
    question: "What can research, learning, evaluation, and applied design contribute to the next creative system?",
    output: "A source-led study question with a visible method, limitation, and browser-local handoff.",
    routes: [{ label: "Apex Research", href: "/apex-digital-intelligence-research" }, { label: "Game Systems Research", href: "/game-systems-research-blueprint" }, { label: "Game Worlds Studio", href: "/game-worlds-studio" }],
  },
  {
    id: "package",
    title: "Package the pathway",
    state: "requires owner release",
    icon: Layers3,
    color: "#B98CFF",
    question: "Which evidence, asset, proposal, and operating-state records belong together before an external release step?",
    output: "A locally prepared portfolio, proposal, or release-gates packet—not an external submission.",
    routes: [{ label: "Portfolio Evidence Hub", href: "/portfolio-evidence-hub" }, { label: "Capital Readiness", href: "/capital-readiness" }, { label: "Release-Gates Audit", href: "/active-pathways-release-gates-audit" }],
  },
];

const stateStyle = {
  "available now": "text-cyan-200 border-cyan-300/35 bg-cyan-300/10",
  research: "text-emerald-200 border-emerald-300/35 bg-emerald-300/10",
  "requires owner release": "text-amber-200 border-amber-300/35 bg-amber-300/10",
};

export default function CreativeSystemsLaunchpad() {
  useSovereignHeartbeat({ page: "creative-systems-launchpad" });
  const [activeLane, setActiveLane] = useState(lanes[0].id);
  const current = useMemo(() => lanes.find((lane) => lane.id === activeLane) ?? lanes[0], [activeLane]);

  const copyPath = async () => {
    await navigator.clipboard.writeText(`${current.title}\nQuestion: ${current.question}\nLocal output: ${current.output}\nRoutes: ${current.routes.map((route) => `${route.label} (${route.href})`).join(" · ")}`);
    toast.success("Creative-system path copied for local use");
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white">
      <section className="border-b border-cyan-300/20 bg-[radial-gradient(circle_at_8%_0%,rgba(0,212,255,.18),transparent_35%),radial-gradient(circle_at_88%_10%,rgba(255,184,0,.14),transparent_28%),#050B1A]">
        <div className="container py-16 md:py-24">
          <Link href="/ecosystem-discovery" className="font-mono text-xs tracking-[.16em] text-cyan-200 hover:text-white">← ECOSYSTEM DISCOVERY</Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div><p className="font-mono text-xs tracking-[.24em] text-cyan-300">SCROLLVERSE · CREATIVE SYSTEMS LAUNCHPAD</p><h1 className="mt-5 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Source the spark.<br/><span className="text-cyan-300">Shape the system.</span></h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">A cross-domain browser-local launchpad for moving through source, creation, catalog, research, Game Worlds, portfolio, and release-readiness routes without losing the current state of each step.</p></div>
            <aside className="rounded-[2rem] border border-cyan-200/20 bg-slate-950/65 p-7"><Clapperboard className="text-amber-200" size={28}/><p className="mt-5 font-mono text-[11px] tracking-[.16em] text-amber-200">FIVE-LANE SYSTEM</p><p className="mt-3 text-2xl font-black">Choose a creative lane, then keep the source and next state visible.</p><p className="mt-4 text-sm leading-7 text-slate-300">The launchpad is a navigator for the work already present in ScrollVerse. It does not submit, publish, mint, list, transact, or change any external platform.</p></aside>
          </div>
          <div className="mt-10"><PortalTrustLens lane="Creative Systems Launchpad" source="Current browser-local ScrollVerse source, creative, catalog, research, Game Worlds, portfolio, and release-gates routes." readiness="Available now as an interactive navigation and local preparation layer." boundary="No external account, provider, marketplace, publishing, financial, token, transaction, or infrastructure state is created or changed from this route." /></div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="font-mono text-xs tracking-[.2em] text-purple-200">CURRENT CREATIVE PATH</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Pick the next useful lens for the work.</h2></div><Link href="/active-pathways-release-gates-audit" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white">View release gates <ArrowRight size={16}/></Link></div>
        <div className="mt-9 grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{lanes.map((lane, index) => { const Icon = lane.icon; return <button key={lane.id} onClick={() => setActiveLane(lane.id)} className="rounded-2xl border p-5 text-left transition hover:bg-white/[.05]" style={{ borderColor: activeLane === lane.id ? `${lane.color}88` : "rgba(255,255,255,.10)", background: activeLane === lane.id ? `${lane.color}13` : "rgba(255,255,255,.025)" }}><div className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 font-mono text-xs" style={{ color: lane.color }}><Icon size={17}/> LANE 0{index + 1}</span><span className={`rounded-full border px-2 py-1 text-[9px] font-bold ${stateStyle[lane.state]}`}>{lane.state.toUpperCase()}</span></div><h3 className="mt-4 text-lg font-black">{lane.title}</h3></button>})}</div>
          <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-7 md:p-9" style={{ boxShadow: `inset 0 1px 0 ${current.color}24` }}><div className="flex items-center gap-3" style={{ color: current.color }}><Sparkles size={24}/><span className="font-mono text-xs tracking-[.16em]">ACTIVE LAUNCH LANE</span></div><h3 className="mt-5 text-3xl font-black">{current.title}</h3><div className="mt-7 rounded-2xl border border-white/10 bg-slate-950/55 p-5"><p className="font-mono text-[10px] tracking-[.16em] text-slate-400">WORKING QUESTION</p><p className="mt-3 text-lg font-bold leading-7">{current.question}</p></div><div className="mt-4 rounded-2xl border border-white/10 p-5"><p className="font-mono text-[10px] tracking-[.16em] text-slate-400">BROWSER-LOCAL OUTPUT</p><p className="mt-3 text-sm leading-7 text-slate-200">{current.output}</p></div><div className="mt-6 flex flex-wrap gap-3">{current.routes.map((route) => <Link key={route.href} href={route.href} className="rounded-xl border border-white/15 bg-white/[.045] px-4 py-3 text-sm font-bold transition hover:border-cyan-300/40 hover:bg-cyan-300/[.08]">{route.label} <ArrowRight className="ml-1 inline" size={14}/></Link>)}</div><button onClick={copyPath} className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-950" style={{ background: current.color }}><Copy size={16}/> Copy local path</button></article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/45"><div className="container py-14 md:py-20"><div className="grid gap-7 lg:grid-cols-[1.1fr_.9fr]"><div><p className="font-mono text-xs tracking-[.2em] text-emerald-200">THE LOOP</p><h2 className="mt-3 text-3xl font-black">A creation can travel across forms while its source trail stays intact.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">Start with a source or original work. Shape a visual, music, fashion, story, or Game Worlds expression. Study its method. Then package the relevant browser-local evidence and leave any external release step at its visible gate.</p></div><div className="rounded-3xl border border-emerald-300/25 bg-emerald-300/[.055] p-7"><ShieldCheck className="text-emerald-200"/><p className="mt-5 font-mono text-[10px] tracking-[.16em] text-emerald-200">EXTERNAL RELEASE BOUNDARY</p><p className="mt-3 text-xl font-black">Preparation is visible. External execution is always named.</p><p className="mt-3 text-sm leading-7 text-slate-300">Publishing, production, finance, commerce, account changes, marketplace actions, and provider connections remain outside this launchpad until their exact record and destination are present.</p></div></div></div></section>
    </main>
  );
}
