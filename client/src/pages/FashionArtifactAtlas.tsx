import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type OperatingState = "available now" | "research" | "requires owner release";

type AtlasEntry = {
  id: string;
  lane: "looks" | "brand worlds" | "books & story" | "artifacts";
  title: string;
  state: OperatingState;
  description: string;
  source: string;
  href: string;
  action: string;
  accent: string;
};

const atlasEntries: AtlasEntry[] = [
  { id: "fashion-empire", lane: "looks", title: "XLVIII BLOCKS Fashion World", state: "available now", description: "A visible ScrollVerse entry point for original-look direction, color systems, apparel thinking, and brand-world exploration.", source: "ScrollVerse fashion route", href: "/fashion-empire", action: "Open fashion world", accent: "#FFB800" },
  { id: "fashion-portfolio", lane: "looks", title: "Fashion Portfolio & Look Builder", state: "available now", description: "A browser-local concept workspace for arranging original looks and moving between portfolio, archive, and review pathways.", source: "ScrollVerse fashion portfolio", href: "/fashion-portfolio", action: "Build a look", accent: "#FF8A4C" },
  { id: "atlantis", lane: "brand worlds", title: "Atlantis Collection", state: "available now", description: "A ScrollVerse collection route for visual catalog discovery and collection-level storytelling.", source: "ScrollVerse collection route", href: "/atlantis-collection", action: "Explore collection", accent: "#00D4FF" },
  { id: "future-concepts", lane: "brand worlds", title: "Future Concepts Deck", state: "requires owner release", description: "Reserved for new apparel silhouettes, campaign treatments, accessories, styling worlds, and cross-brand concept studies once each visual has its own source, rights, accessibility, intended-use, and release record.", source: "Owner-directed future-concept lane", href: "/creator-operations", action: "Open release pathway", accent: "#B98CFF" },
  { id: "books", lane: "books & story", title: "Books & Story Worlds", state: "available now", description: "A visual pathway to books, story formats, and connected media discovery. Individual releases retain their own accessibility and owner-release requirements.", source: "ScrollVerse books route", href: "/books", action: "Open books", accent: "#00FF88" },
  { id: "digital-ships", lane: "books & story", title: "Digital Ships", state: "available now", description: "An original, youth-aware browser-local comic and story-exploration route with Legion story guides and a clear adult-supported participation orientation.", source: "ScrollVerse original story route", href: "/digital-ships", action: "Enter Digital Ships", accent: "#00D4FF" },
  { id: "manus-hero", lane: "books & story", title: "Manus Hero Universe", state: "available now", description: "An original story-world route connecting character, comic, animation, music, learning, and future production pathways.", source: "ScrollVerse original story route", href: "/manus-hero", action: "Explore story universe", accent: "#FF6B9A" },
  { id: "artifact-evidence", lane: "artifacts", title: "Artifact Evidence Blueprint", state: "available now", description: "A clear record pattern for source, date, rights, accessibility, correction, and owner-release information around creative artifacts.", source: "ScrollVerse evidence route", href: "/artifact-evidence-blueprint", action: "Open evidence blueprint", accent: "#FFB800" },
  { id: "empire-assets", lane: "artifacts", title: "Empire Asset Navigator", state: "available now", description: "A cross-lane map for clothing, visual worlds, books, music, code, and collectible concepts with individual activation gates kept separate.", source: "ScrollVerse asset route", href: "/empire-asset-navigator", action: "Open asset navigator", accent: "#B98CFF" },
  { id: "harlem-vineland", lane: "artifacts", title: "Harlem–Vineland Legacy", state: "research", description: "A first-party personal archive and original basketball-city collection path built from source-labeled observations, family context, fashion worlds, and protected visual intake.", source: "Owner-provided legacy context and protected visual intake", href: "/harlem-vineland-legacy", action: "Open legacy record", accent: "#00D4FF" },
];

const subsidiaryPathways = [
  { title: "ScrollVerse Companion", url: "https://scrollverse-4j2bciqz.manus.space", state: "research" as OperatingState, note: "Owner-supplied subsidiary-site pathway. Review its current content and destination before representing any collection, product, collaboration, or release as active." },
  { title: "ScrollVerse Studio Companion", url: "https://scrollverse-jqwuy5bt.manus.space/", state: "research" as OperatingState, note: "Owner-supplied subsidiary-site pathway for visual and project discovery; individual assets remain subject to their own release evidence." },
  { title: "Omnitech Companion", url: "https://omnitech-mwws68ge.manus.space", state: "research" as OperatingState, note: "Owner-supplied technical companion pathway. The link is presented as a discovery destination, not as proof of a deployed integration or operating claim." },
];

const stateStyle: Record<OperatingState, { color: string; bg: string }> = {
  "available now": { color: "#00FF88", bg: "rgba(0,255,136,.10)" },
  research: { color: "#00D4FF", bg: "rgba(0,212,255,.10)" },
  "requires owner release": { color: "#FFB800", bg: "rgba(255,184,0,.12)" },
};

export default function FashionArtifactAtlas() {
  useSovereignHeartbeat({ page: "fashion-artifact-atlas" });
  const [activeLane, setActiveLane] = useState<"all" | AtlasEntry["lane"]>("all");
  const [activeState, setActiveState] = useState<"all" | OperatingState>("all");

  const visibleEntries = useMemo(
    () => atlasEntries.filter(entry => (activeLane === "all" || entry.lane === activeLane) && (activeState === "all" || entry.state === activeState)),
    [activeLane, activeState],
  );

  const copyReleaseChecklist = async () => {
    const checklist = "FASHION & ARTIFACT ATLAS — RELEASE RECORD\n\nWorking title:\nSource / version:\nOriginal or licensed-rights status:\nContributor and brand/mark review:\nAccessible alt text / caption / transcript:\nIntended use and destination:\nOperating state: available now / research / requires owner release\nOwner release decision:\nCorrection contact / record:";
    try {
      await navigator.clipboard.writeText(checklist);
      toast.success("Release-record checklist copied. It remains a browser-local starting point.");
    } catch {
      toast.error("Copy is unavailable in this browser. You can select the release checklist text on this page.");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B1A] px-4 py-10 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm font-black text-[#00D4FF] transition hover:text-white">← Return to ScrollVerse</Link>
          <div className="flex flex-wrap gap-3">
            <Link href="/fashion-empire" className="rounded-lg border border-[#FF8A4C]/45 px-3 py-2 text-xs font-black text-[#FFB37C]">Fashion World</Link>
            <Link href="/books" className="rounded-lg border border-[#00FF88]/45 px-3 py-2 text-xs font-black text-[#8DFFBE]">Books & Story</Link>
            <Link href="/empire-asset-navigator" className="rounded-lg border border-[#B98CFF]/45 px-3 py-2 text-xs font-black text-[#D6C4FF]">Asset Records</Link>
          </div>
        </div>

        <header className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#00D4FF]/30 p-8 sm:p-12" style={{ background: "radial-gradient(circle at 12% 14%, rgba(0,212,255,.19), transparent 28%), radial-gradient(circle at 84% 14%, rgba(255,184,0,.17), transparent 27%), radial-gradient(circle at 72% 86%, rgba(185,140,255,.15), transparent 33%), #071124" }}>
          <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full border border-[#FFB800]/25" />
          <div className="pointer-events-none absolute -right-2 bottom-10 h-48 w-48 rounded-full border border-[#00D4FF]/20" />
          <div className="relative max-w-5xl">
            <p className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">FASHION & ARTIFACT ATLAS · XLVIII BLOCKS LLC × SCROLL VERSE LLC</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">Looks, worlds, books, and artifacts—<span className="text-[#FFB800]">one vivid discovery map.</span></h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">This is the public discovery layer for ScrollVerse fashion looks, future concepts, brand worlds, books, story artifacts, and companion sites. It makes the creative ecosystem easier to see and navigate while giving every item a direct operating state: available now, research, or requires owner release.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#atlas" className="rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-black text-[#050B1A] transition hover:bg-white">Explore the Atlas ↓</a>
              <button type="button" onClick={copyReleaseChecklist} className="rounded-xl border border-[#00D4FF]/55 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9AEFFF] transition hover:border-[#00D4FF]">Copy release-record starter</button>
            </div>
          </div>
          <div className="relative mt-8 grid gap-3 sm:grid-cols-4">
            {[{ value: "4", label: "discovery lanes", color: "#00D4FF" }, { value: "3", label: "operating states", color: "#FFB800" }, { value: "10", label: "connected Atlas entries", color: "#B98CFF" }, { value: "0", label: "live commerce actions here", color: "#00FF88" }].map(item => <div key={item.label} className="rounded-2xl border border-white/10 bg-[#050B1A]/45 p-4 backdrop-blur"><p className="font-mono text-2xl font-black" style={{ color: item.color }}>{item.value}</p><p className="mt-1 text-xs text-[#B8C7D6]">{item.label}</p></div>)}
          </div>
        </header>

        <PortalTrustLens lane="Fashion looks, brand worlds, books, story artifacts, and subsidiary-site discovery" source="ScrollVerse route inventory plus owner-supplied subsidiary-site URLs. Individual protected visual and video intake remains classified separately until its own evidence packet is complete." readiness="This Atlas provides discovery links, direct operating states, and a browser-local release-record starter. It does not create a product, SKU, release, marketplace listing, wallet action, token, manufacturer engagement, or transaction." boundary="A concept, visual treatment, brand name, external link, route, or aesthetic seal does not independently establish rights, approval, availability, affiliation, product inventory, partnership, tokenization, or commercial readiness." />

        <section className="mt-8 rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[.055] p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-mono tracking-[.18em] text-[#FFCC4D]">VISIBILITY WITH AN EVIDENCE ROUTE</p>
              <h2 className="mt-2 text-2xl font-black">Every look can be discoverable before it is commercial.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Original looks, future concepts, and brand studies can be displayed as creative direction. Before an individual visual becomes a product, campaign, release, collaboration, or collectible, the owner-controlled record must identify its source/version, rights and mark review, accessibility description, intended use, destination, and release choice.</p>
            </div>
            <div className="rounded-2xl border border-[#FFB800]/25 bg-[#050B1A]/60 p-5 text-sm leading-7 text-[#D6E2EE]">
              <p className="font-mono text-xs text-[#FFCC4D]">RELEASE RECORD FIELDS</p>
              <p className="mt-2">Title · source/version · creator/contributor · rights/mark review · alt text/caption · intended use · operating state · owner release · correction path.</p>
            </div>
          </div>
        </section>

        <section id="atlas" className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">ATLAS INDEX</p><h2 className="mt-2 text-3xl font-black">Choose a lane. Follow the creative thread.</h2></div>
            <p className="text-sm text-[#B8C7D6]">{visibleEntries.length} visible route{visibleEntries.length === 1 ? "" : "s"}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Filter Atlas entries">
            {(["all", "looks", "brand worlds", "books & story", "artifacts"] as const).map(lane => <button key={lane} type="button" onClick={() => setActiveLane(lane)} className="rounded-full border px-4 py-2 text-xs font-black transition" style={{ borderColor: activeLane === lane ? "#00D4FF" : "rgba(255,255,255,.15)", background: activeLane === lane ? "rgba(0,212,255,.15)" : "rgba(255,255,255,.025)", color: activeLane === lane ? "#9AEFFF" : "#B8C7D6" }}>{lane}</button>)}
          </div>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Filter by operating state">
            {(["all", "available now", "research", "requires owner release"] as const).map(state => <button key={state} type="button" onClick={() => setActiveState(state)} className="rounded-full border px-4 py-2 text-xs font-black transition" style={{ borderColor: activeState === state && state !== "all" ? stateStyle[state].color : "rgba(255,255,255,.15)", background: activeState === state && state !== "all" ? stateStyle[state].bg : "rgba(255,255,255,.025)", color: activeState === state && state !== "all" ? stateStyle[state].color : "#B8C7D6" }}>{state}</button>)}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleEntries.map(entry => {
              const state = stateStyle[entry.state];
              return <article key={entry.id} className="group rounded-3xl border p-6 transition duration-300 hover:-translate-y-1" style={{ borderColor: `${entry.accent}55`, background: `linear-gradient(145deg, ${entry.accent}12, rgba(5,11,26,.96) 65%)` }}>
                <div className="flex items-start justify-between gap-3"><p className="text-xs font-mono uppercase tracking-[.14em]" style={{ color: entry.accent }}>{entry.lane}</p><span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.09em]" style={{ background: state.bg, color: state.color }}>{entry.state}</span></div>
                <h3 className="mt-5 text-2xl font-black text-white">{entry.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{entry.description}</p>
                <p className="mt-5 border-t border-white/10 pt-4 text-xs text-[#B8C7D6]"><span className="font-mono" style={{ color: entry.accent }}>SOURCE</span> · {entry.source}</p>
                <Link href={entry.href} className="mt-5 inline-flex rounded-lg border px-4 py-2 text-sm font-black transition hover:bg-white/5" style={{ borderColor: entry.accent, color: entry.accent }}>{entry.action} →</Link>
              </article>;
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          {subsidiaryPathways.map(pathway => {
            const state = stateStyle[pathway.state];
            return <article key={pathway.url} className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.045] p-6"><p className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">SUBSIDIARY-SITE PATHWAY</p><div className="mt-3 flex flex-wrap items-center gap-3"><h2 className="text-xl font-black">{pathway.title}</h2><span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.09em]" style={{ background: state.bg, color: state.color }}>{pathway.state}</span></div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{pathway.note}</p><a href={pathway.url} target="_blank" rel="noreferrer" className="mt-5 inline-block break-all text-sm font-black text-[#9AEFFF] underline decoration-[#00D4FF]/45 underline-offset-4">Visit owner-supplied pathway ↗</a></article>;
          })}
        </section>

        <section className="mt-10 rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.055] p-7">
          <p className="text-xs font-mono tracking-[.18em] text-[#D6C4FF]">YOUTH-SAFE CREATIVE EXPLORATION</p>
          <h2 className="mt-2 text-2xl font-black">Stories and interactive pages welcome young people with adult-supported participation.</h2>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-[#D6E2EE]">Where the Atlas leads to youth-facing story, comic, or creative-building experiences, the route is designed for exploration, reflection, and co-creation rather than commerce, account action, or unmoderated public exchange. Guardians, parents, and educators can guide participation through the linked story and learning pathways.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/digital-ships" className="rounded-lg border border-[#B98CFF]/55 px-4 py-2 text-sm font-black text-[#D6C4FF]">Digital Ships →</Link><Link href="/junior-movies" className="rounded-lg border border-[#B98CFF]/55 px-4 py-2 text-sm font-black text-[#D6C4FF]">Junior Movies →</Link><Link href="/books" className="rounded-lg border border-[#B98CFF]/55 px-4 py-2 text-sm font-black text-[#D6C4FF]">Books →</Link></div>
        </section>

        <footer className="mt-10 border-t border-white/10 py-8 text-center"><p className="text-xs font-mono tracking-[.14em] text-[#8EA2B8]">SCROLLVERSE FASHION & ARTIFACT ATLAS · KUN FAYAKŪN × ∞</p><p className="mt-3 text-sm text-[#B8C7D6]">Living signal is active across the portal with reduced-motion support at the global layer.</p></footer>
      </section>
    </main>
  );
}
