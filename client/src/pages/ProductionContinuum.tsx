import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Clapperboard, FileCheck2, Headphones, Palette, Radio, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

const lanes = [
  { icon: Clapperboard, label: "Original story worlds", title: "Beacon Arc 07", detail: "A cross-lane story-development desk for original episode, comic, and interactive-world planning. Working concepts stay source-labeled until their own final asset and release record exists.", href: "/original-media-readiness", color: "#00D4FF", track: "world" },
  { icon: Headphones, label: "Music and voice", title: "Comfort-first listening", detail: "Human-forward voice direction, listening controls, music release planning, captions, transcripts, and clean source records belong in the same creative package.", href: "/voice-language-studio", color: "#FF6B9A", track: "world" },
  { icon: Palette, label: "Fashion and artifacts", title: "Visible brand worlds", detail: "Original looks, visual artifacts, book objects, and fashion concepts are discoverable with direct states for available work, research, and owner-release review.", href: "/fashion-artifact-atlas", color: "#00FF88", track: "world" },
  { icon: BookOpen, label: "Books and free knowledge", title: "Learning stays connected", detail: "Books, story pathways, research, and youth-aware discovery can travel together without turning a preparation record into a published edition.", href: "/books-media-readiness", color: "#FFB800", track: "world" },
  { icon: UsersRound, label: "Community and channels", title: "Voluntary creative pathways", detail: "Community, creator channels, and source trails give people ways to explore and contribute original work without deciding the creator’s intent.", href: "/creator-channel-hub", color: "#B98CFF", track: "evidence" },
  { icon: ShieldCheck, label: "Evidence and release", title: "Every artifact keeps its record", detail: "Source, contributor context, rights, accessible materials, destination, correction path, and owner release move with each distinct asset.", href: "/release-readiness", color: "#7CE7FF", track: "evidence" },
];

const stages = [
  { id: "01", title: "Source the original", text: "Name the working asset, its version, and its creator context. Preserve outside references as references rather than importing their protected expression." },
  { id: "02", title: "Shape the experience", text: "Pair visual, voice, sound, text, and interaction direction with captions, alt text, transcripts, quiet controls, and youth-aware participation guidance." },
  { id: "03", title: "Connect the world", text: "Link each story, look, book, track, or artifact to the ScrollVerse routes where its audience can explore the larger creative continuum." },
  { id: "04", title: "Release with a record", text: "Use a discrete source, rights, accessibility, destination, and owner-release packet before stating that a particular asset is available now." },
];

export default function ProductionContinuum() {
  useSovereignHeartbeat({ page: "production-continuum" });
  const [laneFilter, setLaneFilter] = useState<"all" | "world" | "evidence">("all");
  const visibleLanes = useMemo(() => lanes.filter(lane => laneFilter === "all" || lane.track === laneFilter), [laneFilter]);

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm font-black text-[#00D4FF] transition hover:text-white">← Return to ScrollVerse</Link>
          <div className="flex flex-wrap gap-3">
            <Link href="/creator-channel-hub" className="rounded-lg border border-[#FF6B9A]/40 px-3 py-2 text-xs font-black text-[#FF9EB9] transition hover:border-[#FF6B9A]">Creator Channels</Link>
            <Link href="/capability-audit" className="rounded-lg border border-[#B98CFF]/40 px-3 py-2 text-xs font-black text-[#D6C4FF] transition hover:border-[#B98CFF]">Capability Audit</Link>
            <Link href="/production-control" className="rounded-lg border border-[#FFB800]/40 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Production Control</Link>
            <Link href="/fashion-artifact-atlas" className="rounded-lg border border-[#00FF88]/40 px-3 py-2 text-xs font-black text-[#00FF88] transition hover:border-[#00FF88]">Fashion & Artifacts</Link>
            <Link href="/release-readiness" className="rounded-lg border border-[#FFB800]/40 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Release Readiness</Link>
          </div>
        </div>

        <header className="mt-8 overflow-hidden rounded-[2rem] border border-[#00D4FF]/35 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 10% 14%, rgba(0,212,255,.18), transparent 30%), radial-gradient(circle at 84% 18%, rgba(185,140,255,.16), transparent 26%), radial-gradient(circle at 68% 94%, rgba(255,184,0,.12), transparent 33%), #071124" }}>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-[.2em] text-[#00D4FF]"><Sparkles className="h-4 w-4" />SCROLLVERSE PRODUCTION CONTINUUM · CREATOR-DIRECTED WORLD FLOW</div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.22fr_.78fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-tight sm:text-6xl">One world. Every creation has a visible route forward.</h1>
              <p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">The Production Continuum connects original story development, music and voice, fashion, books, artifacts, community, and release records across ScrollVerse. It presents the creator’s world directly while making each item’s real source and operating state visible.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/original-media-readiness" className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#04101C] transition hover:brightness-110">Open Original Media Readiness <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/creator-media-packet" className="inline-flex items-center gap-2 rounded-xl border border-[#FFB800]/45 px-5 py-3 text-sm font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Build a release packet <FileCheck2 className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#00D4FF]/35 bg-[#00D4FF]/[.08] p-5"><div className="font-mono text-3xl font-black text-[#00D4FF]">06</div><p className="mt-2 text-xs font-bold text-[#D6E2EE]">connected creative lanes</p></div>
              <div className="rounded-2xl border border-[#00FF88]/35 bg-[#00FF88]/[.08] p-5"><div className="font-mono text-3xl font-black text-[#00FF88]">01</div><p className="mt-2 text-xs font-bold text-[#D6E2EE]">creator-directed world flow</p></div>
              <div className="col-span-2 rounded-2xl border border-[#B98CFF]/35 bg-[#B98CFF]/[.08] p-5"><div className="flex items-center gap-2 text-xs font-mono text-[#D6C4FF]"><Radio className="h-4 w-4" />CURRENT PRODUCTION SIGNAL</div><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">Original Episode 7 planning is held as a source-labeled research record. It is not presented as a released episode, connected social campaign, live token program, or active transaction path.</p></div>
            </div>
          </div>
        </header>

        <div className="mt-8"><PortalTrustLens lane="Production Continuum" source="Creator-directed ScrollVerse world-flow, protected Episode 7 reference intake, current portal routes, and asset-specific evidence records." readiness="Available now as a cross-lane discovery and planning route. Episode 7, music metadata, catalog entries, and reference material remain research until each final asset has its own release record." boundary="This route does not activate a token, reward, wallet, contract, social account, schedule, financial offer, music release, product, checkout, or external publication. Those actions require their own verified records and owner-controlled gates." /></div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[.025] p-5" aria-labelledby="continuum-route-filter-title">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><div id="continuum-route-filter-title" className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">BROWSER-LOCAL ROUTE FILTER</div><p className="mt-2 text-sm text-[#C7D5E5]">Choose a discovery track. This changes only the local route view; it does not change an item’s release or network state.</p></div><div className="flex flex-wrap gap-2" role="group" aria-label="Filter Production Continuum lanes">{([ ["all", "All lanes"], ["world", "World building"], ["evidence", "Evidence & release"] ] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={laneFilter === value} onClick={() => setLaneFilter(value)} className="rounded-lg border px-3 py-2 text-xs font-black transition active:scale-[.98]" style={{ borderColor: laneFilter === value ? "#00D4FF" : "rgba(255,255,255,.14)", color: laneFilter === value ? "#00D4FF" : "#B8C7D6", background: laneFilter === value ? "rgba(0,212,255,.12)" : "transparent" }}>{label}</button>)}</div></div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleLanes.map(({ icon: Icon, label, title, detail, href, color }) => <Link key={title} href={href} aria-label={`Open ${label}: ${title}`} className="group rounded-3xl border p-6 transition hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" style={{ borderColor: `${color}52`, background: `${color}08` }}>
            <div className="flex items-center justify-between gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${color}1A`, color }}><Icon className="h-6 w-6" /></span><ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" style={{ color }} /></div>
            <div className="mt-6 text-[10px] font-mono tracking-[.16em]" style={{ color }}>{label.toUpperCase()}</div>
            <h2 className="mt-2 text-2xl font-black">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{detail}</p>
          </Link>)}
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[.025] p-7 sm:p-9">
          <div className="text-xs font-mono tracking-[.2em] text-[#FFCC4D]">ORIGINAL PRODUCTION FLOW</div>
          <h2 className="mt-3 max-w-4xl text-3xl font-black sm:text-4xl">A route from an original spark to an accountable public artifact.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{stages.map(stage => <article key={stage.id} className="rounded-2xl border border-white/10 bg-[#061226] p-5"><div className="font-mono text-sm text-[#FFCC4D]">{stage.id}</div><h3 className="mt-3 text-lg font-black">{stage.title}</h3><p className="mt-3 text-sm leading-7 text-[#C7D5E5]">{stage.text}</p></article>)}</div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-3xl border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.06] p-7"><div className="text-xs font-mono tracking-[.18em] text-[#FF9EB9]">HUMAN-FORWARD MEDIA STANDARD</div><h2 className="mt-3 text-2xl font-black">Voice, sound, and visuals should welcome people in.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Use original voice directions, comfortable pacing, clear captions, transcripts, alt text, non-audio pathways, and reduced-motion support. A recognizable person’s voice, laugh, or emotional signature needs their consent and approved source before any specific-voice production begins.</p><Link href="/voice-language-studio" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#FF9EB9]">Open Voice & Language Studio <ArrowRight className="h-4 w-4" /></Link></article>
          <article className="rounded-3xl border border-[#00FF88]/35 bg-[#00FF88]/[.06] p-7"><div className="text-xs font-mono tracking-[.18em] text-[#00FF88]">CRYPTO-RELATED DISCOVERY</div><h2 className="mt-3 text-2xl font-black">Creative records can be visible without pretending a network action happened.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Explore asset and network documentation with a source trail. A pasted tokenomics schema, yield concept, or contract reference remains research until the individual public contract, network state, authority, security review, and release gate are actually recorded.</p><Link href="/crypto-systems-atlas" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#00FF88]">Open Crypto Systems Atlas <ArrowRight className="h-4 w-4" /></Link></article>
        </section>
      </section>
    </main>
  );
}
