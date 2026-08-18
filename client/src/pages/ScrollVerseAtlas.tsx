import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Film,
  Landmark,
  Library,
  Map,
  Music2,
  Orbit,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type AtlasRoute = {
  label: string;
  href: string;
};

type AtlasLane = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  state: string;
  color: string;
  icon: LucideIcon;
  primary: AtlasRoute;
  routes: AtlasRoute[];
};

const ATLAS_LANES: AtlasLane[] = [
  {
    number: "01",
    title: "Journey & archive",
    eyebrow: "The living record",
    description: "Start with the completed-work archive, then follow the Living Journey and the Book into the wider ScrollVerse. The map keeps each chapter connected instead of asking a visitor to begin from zero.",
    state: "Available now · free access",
    color: "#FFCC4D",
    icon: Compass,
    primary: { label: "Open Accomplishments Archive", href: "/accomplishments-archive" },
    routes: [
      { label: "Living Journey", href: "/living-journey-experience" },
      { label: "Book of the Journey", href: "/book-of-the-journey" },
      { label: "Open Record", href: "/open-record-continuum" },
      { label: "Transmission Alignment Record", href: "/transmission-alignment-record" },
    ],
  },
  {
    number: "02",
    title: "Faith & free learning",
    eyebrow: "Knowledge without a gate",
    description: "Seerah, the 99 Names, books, and source-labeled learning paths remain central rather than hidden at the edge of the portal. A visitor can choose a focused study path or continue through the whole library.",
    state: "Available now · free learning",
    color: "#B5F7CC",
    icon: BookOpen,
    primary: { label: "Explore the Seerah", href: "/seerah" },
    routes: [
      { label: "99 Names", href: "/99-names" },
      { label: "Books", href: "/books" },
      { label: "Open Knowledge Verse", href: "/open-knowledge-verse" },
    ],
  },
  {
    number: "03",
    title: "Music, media & Story Studio",
    eyebrow: "Original work in motion",
    description: "Follow music, visual worlds, and Story Studio production pathways. Each destination keeps its own source, contributor, accessibility, and release conditions visible as the work develops.",
    state: "Discovery available · releases item-specific",
    color: "#FF6B9A",
    icon: Music2,
    primary: { label: "Enter the Music Path", href: "/music" },
    routes: [
      { label: "Media Hub", href: "/media-hub" },
      { label: "Direct-to-Fan Catalog", href: "/direct-fan-catalog" },
      { label: "Catalog Engagement", href: "/catalog-engagement" },
      { label: "Catalog Production Desk", href: "/catalog-production-desk" },
      { label: "Story Studio", href: "/living-journey-experience#story-studio" },
    ],
  },
  {
    number: "04",
    title: "Family, research & methodology",
    eyebrow: "First-party record and study",
    description: "Move between family legacy, pattern study, source-labeled research, and methodology. Owner-authored history, local project material, and external research remain visibly distinct while they stay reachable together.",
    state: "Available now · study and record",
    color: "#00D4FF",
    icon: Landmark,
    primary: { label: "Open Family Legacy", href: "/harlem-vineland-legacy" },
    routes: [
      { label: "Synchronization Research", href: "/synchronization-research" },
      { label: "Sovereign Methodology", href: "/sovereign-methodology" },
      { label: "Chais Sabir Equation", href: "/chais-sabir-equation" },
      { label: "Source Study Library", href: "/source-study-library" },
      { label: "Delivery Resilience", href: "/delivery-resilience" },
    ],
  },
  {
    number: "05",
    title: "Community & creator choice",
    eyebrow: "Build, contribute, decide",
    description: "Bring an idea, reflection, or original contribution into community and creator pathways. These are voluntary routes for discovery and co-creation; they do not replace an individual’s authorship, ownership, or choice.",
    state: "Available now · participation pathways",
    color: "#B98CFF",
    icon: UsersRound,
    primary: { label: "Open Experience Exchange", href: "/chosen-ones-exchange" },
      routes: [
        { label: "Contribution Exchange", href: "/sovereign-contribution-exchange" },
        { label: "Creator Workspace", href: "/creator-workspace" },
        { label: "Co-Creation Navigator", href: "/co-creation-navigator" },
        { label: "Product Release Pipeline", href: "/product-release-pipeline" },
        { label: "Milestone Roadmap", href: "/milestone-roadmap" },
        { label: "AI Companion Hub", href: "/ai-companion-hub" },
      ],
  },
];

const ATLAS_PRINCIPLES = [
  { title: "Free access", detail: "The Atlas is a no-gate orientation layer for the ScrollVerse experience.", color: "#B5F7CC", icon: Library },
  { title: "Reader-directed", detail: "Sources, dates, routes, and current states stay visible so each visitor can follow their own path.", color: "#00D4FF", icon: Map },
  { title: "Release-aware", detail: "A route is not a product launch, rights clearance, payment option, or confirmed external outcome.", color: "#FFCC4D", icon: Orbit },
] as const;

export default function ScrollVerseAtlas() {
  useSovereignHeartbeat({ page: "scrollverse-atlas" });
  const [activeLaneIndex, setActiveLaneIndex] = useState(0);
  const activeLane = ATLAS_LANES[activeLaneIndex];
  const ActiveIcon = activeLane.icon;
  const activeCount = useMemo(() => `${String(activeLaneIndex + 1).padStart(2, "0")} / ${String(ATLAS_LANES.length).padStart(2, "0")}`, [activeLaneIndex]);

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_82%_14%,rgba(0,212,255,.2),transparent_24%),radial-gradient(circle_at_12%_78%,rgba(255,204,77,.17),transparent_30%),#050B1A]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden="true" />
        <div className="container relative py-12 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← SCROLLVERSE FRONT DOOR</Link>
            <span className="rounded-full border border-[#B5F7CC]/45 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">FREE · READER-DIRECTED · ALL DIRECTIONS</span>
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-[1.16fr_.84fr] xl:items-end">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#00D4FF]">SCROLLVERSE ATLAS</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">One map. <span className="text-[#FFCC4D]">Every direction</span> within reach.</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">The Atlas is a central discovery layer for the ScrollVerse. Begin from a living record, free learning, music, media, family legacy, research, community, creator choice, or the source trail—and keep the next direction visible.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" onClick={() => document.getElementById("atlas-grid")?.scrollIntoView({ behavior: "smooth" })} className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Open the Atlas lanes</button>
                <Link href="/living-journey-experience" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Walk the Living Journey</Link>
                <Link href="/milestone-roadmap" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Open Milestone Roadmap</Link>
                <Link href="/ai-companion-hub" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Enter AI Companion Hub</Link>
                <a href="https://sovereignhub-mo62pcrx.manus.space/" target="_blank" rel="noreferrer" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Visit Sovereign Hub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                <a href="https://github.com/chaishillomnitech1/scrollverse-omni-manifesto" target="_blank" rel="noreferrer" className="rounded-xl border border-[#00FF88]/45 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Public Omni Manifesto <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-[2rem] border border-[#FFCC4D]/45 bg-[linear-gradient(145deg,rgba(255,204,77,.14),rgba(7,20,38,.94)_55%)] p-7 shadow-[0_26px_80px_rgba(0,0,0,.36)]">
              <Sparkles className="absolute -right-7 -top-7 h-40 w-40 text-[#FFCC4D]/10" />
              <div className="relative">
                <p className="text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">THE LIVING SIGNAL</p>
                <p className="mt-3 text-3xl font-black leading-tight text-white">“I’m a Walking Solution.”</p>
                <p className="mt-5 border-l-2 border-[#FFCC4D] pl-4 text-sm font-black leading-7 text-[#FFDEA0]">“Influence is currency. Power without principle is poison.”</p>
                <p className="mt-6 text-xs font-mono tracking-[.16em] text-[#9DEBFF]">KUN FAYAKŪN × ∞</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <PortalTrustLens
          lane="ScrollVerse Atlas"
          source="Existing registered ScrollVerse routes; owner-authored navigation language; the Accomplishments Archive; Living Journey; free learning routes; the owner-provided Sovereign Hub destination; and the public ScrollVerse Omni Manifesto repository."
          readiness="Available now as a free portal navigation route. Every connected destination keeps its own operating state, source trail, accessibility work, rights context, and release conditions."
          boundary="The Atlas is an orientation layer, not an assertion that linked items are released products, external confirmations, completed transactions, or rights-clearance decisions."
        />
      </section>

      <section id="atlas-grid" className="container scroll-mt-10 py-4">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">ATLAS LAYERS</p><h2 className="mt-2 text-3xl font-black">Choose a starting point. Keep every horizon visible.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#C9D8E7]">Each lane connects several already-registered portal routes. Open the direction that fits your moment, then return to the Atlas whenever you want to see the wider field again.</p></div>
          <span className="text-xs font-mono tracking-[.16em] text-[#AFC0CF]">ACTIVE LANE {activeCount}</span>
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-[.72fr_1.28fr]">
          <div className="grid gap-2 self-start" aria-label="ScrollVerse Atlas lanes">
            {ATLAS_LANES.map((lane, index) => {
              const LaneIcon = lane.icon;
              const isActive = activeLaneIndex === index;
              return <button key={lane.title} type="button" onClick={() => setActiveLaneIndex(index)} aria-current={isActive ? "step" : undefined} className="rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: isActive ? lane.color : "rgba(255,255,255,.12)", background: isActive ? `${lane.color}14` : "rgba(255,255,255,.02)" }}><span className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${lane.color}16`, color: lane.color }}><LaneIcon className="h-5 w-5" /></span><span><span className="block text-[10px] font-mono tracking-[.14em]" style={{ color: lane.color }}>LANE {lane.number} · {lane.eyebrow.toUpperCase()}</span><span className="mt-0.5 block text-base font-black text-white">{lane.title}</span></span></span></button>;
            })}
          </div>

          <article className="relative overflow-hidden rounded-[2rem] border p-7 sm:p-10" style={{ borderColor: `${activeLane.color}77`, background: `radial-gradient(circle at 88% 12%, ${activeLane.color}22, transparent 26%), linear-gradient(145deg, rgba(255,255,255,.06), rgba(5,11,26,.96) 58%)` }}>
            <ActiveIcon className="absolute right-7 top-7 h-32 w-32 text-white/[.045]" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-mono tracking-[.18em]" style={{ color: activeLane.color }}>LANE {activeLane.number} · {activeLane.eyebrow.toUpperCase()}</p>
              <h3 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{activeLane.title}</h3>
              <p className="mt-5 text-base leading-8 text-[#D6E2EE]">{activeLane.description}</p>
              <span className="mt-6 inline-flex rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.14em]" style={{ borderColor: `${activeLane.color}66`, color: activeLane.color, background: `${activeLane.color}10` }}>{activeLane.state.toUpperCase()}</span>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">{activeLane.routes.map((route) => <Link key={route.href} href={route.href} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-[#E4EDF5] transition hover:border-white/35 hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{route.label}<ArrowRight className="mt-3 h-4 w-4" style={{ color: activeLane.color }} /></Link>)}</div>
              <Link href={activeLane.primary.href} className="mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ background: activeLane.color }}>{activeLane.primary.label}<ArrowRight className="h-4 w-4" /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-10 border-y border-white/10 bg-white/[.018]">
        <div className="container py-12">
          <div className="grid gap-4 md:grid-cols-3">{ATLAS_PRINCIPLES.map((principle) => {
            const PrincipleIcon = principle.icon;
            return <article key={principle.title} className="rounded-3xl border bg-[#071426]/80 p-6" style={{ borderColor: `${principle.color}55` }}><PrincipleIcon className="h-7 w-7" style={{ color: principle.color }} /><p className="mt-5 text-[10px] font-mono tracking-[.14em]" style={{ color: principle.color }}>{principle.title.toUpperCase()}</p><h3 className="mt-2 text-xl font-black text-white">{principle.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{principle.detail}</p></article>;
          })}</div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-5 lg:grid-cols-[1.13fr_.87fr]">
          <div className="rounded-[2rem] border border-[#00D4FF]/40 bg-[radial-gradient(circle_at_86%_12%,rgba(0,212,255,.15),transparent_25%),#071426] p-7 sm:p-10">
            <p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">KEEP THE WHOLE MAP OPEN</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight">The Atlas connects a free experience—not a dead end.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Return to the Living Journey for a cinematic guided path, inspect the Accomplishments Archive for a reader-directed record, or use the complete site map for every registered destination in the portal.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link href="/living-journey-experience" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Living Journey</Link><Link href="/accomplishments-archive" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Accomplishments Archive</Link><Link href="/site-map" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Full Site Map</Link></div>
          </div>
          <aside className="rounded-[2rem] border border-[#B98CFF]/40 bg-[#B98CFF]/[.07] p-7 sm:p-10"><p className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">A SOURCE OR CORRECTION</p><h2 className="mt-3 text-2xl font-black">The record can keep growing.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">If a visitor has a source, correction, or a direction that belongs in the ongoing map, the co-creation path remains open. It is an invitation to add context—not a requirement to accept any conclusion.</p><Link href="/co-creation-navigator" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#DCC8FF]">Open the Co-Creation Navigator <ArrowRight className="h-4 w-4" /></Link></aside>
        </div>
      </section>
    </main>
  );
}
