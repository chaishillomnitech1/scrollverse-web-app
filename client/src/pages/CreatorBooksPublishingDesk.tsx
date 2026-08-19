import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, BookOpenCheck, ClipboardCheck, FileText, Headphones, LockKeyhole, Sparkles, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ReleaseState = "available now" | "research" | "requires owner release";

type BookLane = {
  id: string;
  order: string;
  title: string;
  state: ReleaseState;
  summary: string;
  source: string;
  formats: string[];
  access: string;
  required: string;
  boundary: string;
  href?: string;
  action?: string;
};

const LANES: BookLane[] = [
  {
    id: "journey",
    order: "01",
    title: "Book of the Journey",
    state: "available now",
    summary: "A registered first-party reading path for a source-led journey record and accessible visitor discovery.",
    source: "First-party route and owner-authored journey context.",
    formats: ["Reading path", "Visible text", "Reader-directed discovery"],
    access: "The established reading route is available for visitors to inspect.",
    required: "A title-specific edition record if a new format, download, print version, or distribution destination is proposed.",
    boundary: "This desk does not claim a retailer listing, download package, audio edition, price, inventory, or distribution connection.",
    href: "/book-of-the-journey",
    action: "Open reading path",
  },
  {
    id: "manuscripts",
    order: "02",
    title: "Owner Manuscript Archive",
    state: "requires owner release",
    summary: "A protected pathway for owner-authored manuscript, chapter, and perspective records before any reader surface is opened.",
    source: "Owner-supplied book and publishing source context; protected intake record.",
    formats: ["Manuscript record", "Chapter map", "Accessible outline"],
    access: "No public manuscript file is exposed from this desk.",
    required: "A specific title, source date, public scope, rights/contributor record, accessible description, and exact owner release decision.",
    boundary: "No manuscript upload, reader access, editing service, cover generation, or publication action occurs here.",
  },
  {
    id: "perspectives",
    order: "03",
    title: "Perspectives & Study Notes",
    state: "research",
    summary: "A reader-directed lane for organizing original viewpoints, study prompts, and source labels without converting perspective into professional advice.",
    source: "Owner-authored perspectives and source-led research pathways.",
    formats: ["Study notes", "Perspective reader", "Discussion guide"],
    access: "Research and free-knowledge pathway design are available locally.",
    required: "A chosen source set, scope, audience, accessibility note, and review record before a public reader is released.",
    boundary: "No credential, legal, medical, investment, or professional-advice claim is made through this reading lane.",
    href: "/open-knowledge-verse",
    action: "Open free knowledge",
  },
  {
    id: "editions",
    order: "04",
    title: "Visual & Voice Editions",
    state: "requires owner release",
    summary: "Plan a distinct visual, print, or spoken edition with its own accessibility, contributors, representation rights, and delivery controls.",
    source: "Creator Books operating model and accessible-edition planning record.",
    formats: ["E-book plan", "Print plan", "Audio/voice plan", "Visual reading plan"],
    access: "Edition planning is available; no narrated or visual edition is released here.",
    required: "A cleared title, edition format, cover/visual scope, narration or contributor record, delivery method, support path, and owner release.",
    boundary: "No narration, third-party voice, music, visual, print-on-demand, download, or provider action is activated.",
  },
];

const STATES: Array<ReleaseState | "all"> = ["all", "available now", "research", "requires owner release"];

function StateBadge({ state }: { state: ReleaseState }) {
  const style = {
    "available now": "border-[#00FF88]/35 bg-[#00FF88]/10 text-[#B5F7CC]",
    research: "border-[#00D4FF]/35 bg-[#00D4FF]/10 text-[#A7EEFF]",
    "requires owner release": "border-[#FFB800]/35 bg-[#FFB800]/10 text-[#FFE3A0]",
  }[state];
  return <span className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[.13em] ${style}`}>{state}</span>;
}

export default function CreatorBooksPublishingDesk() {
  useSovereignHeartbeat({ page: "creator-books-publishing-desk" });
  const [filter, setFilter] = useState<ReleaseState | "all">("all");
  const [focusedId, setFocusedId] = useState("journey");
  const focused = LANES.find(lane => lane.id === focusedId) ?? LANES[0];
  const visibleLanes = useMemo(() => filter === "all" ? LANES : LANES.filter(lane => lane.state === filter), [filter]);

  const copyReleaseBrief = () => {
    const brief = [
      "ScrollVerse Creator Books Publishing Desk",
      `Focused title lane: ${focused.order} / ${focused.title}`,
      `Operating state: ${focused.state}`,
      `Source context: ${focused.source}`,
      `Reader access: ${focused.access}`,
      `Required before release: ${focused.required}`,
      `Boundary: ${focused.boundary}`,
      "This is a browser-local release brief. It does not upload, publish, distribute, price, sell, or connect a provider.",
    ].join("\n");
    navigator.clipboard?.writeText(brief)
      .then(() => toast.success("Creator Books release brief copied."))
      .catch(() => toast.message("Copy is available in a browser with clipboard permission."));
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-20 text-white">
      <section className="overflow-hidden border-b border-[#B98CFF]/25 bg-[radial-gradient(circle_at_10%_12%,rgba(185,140,255,.25),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(0,212,255,.16),transparent_27%),linear-gradient(135deg,#11091e_0%,#071326_52%,#071b22_100%)]">
        <div className="container relative py-16 md:py-24">
          <div className="absolute right-5 top-8 hidden h-64 w-48 -rotate-6 rounded-[2rem] border border-[#B98CFF]/25 md:block" />
          <div className="absolute right-28 top-24 hidden h-48 w-36 rotate-6 rounded-[2rem] border border-[#00D4FF]/20 md:block" />
          <Link href="/" className="relative inline-flex items-center gap-2 text-xs font-bold text-[#E2D5FF] hover:text-white"><ArrowLeft className="h-4 w-4" />Back to ScrollVerse</Link>
          <p className="relative mt-10 font-mono text-xs tracking-[.25em] text-[#D6C4FF]">CREATOR BOOKS / READING PATHS / RELEASE CONTROLS</p>
          <h1 className="relative mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">Creator Books<br /><span className="text-[#D6C4FF]">Publishing Desk</span></h1>
          <p className="relative mt-6 max-w-3xl text-base leading-7 text-slate-300">A source-led desk for owner-authored books, manuscripts, perspectives, and future editions. Readers can see what is available now, study what is still in research, and understand exactly what requires an owner release.</p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#B98CFF]/35 bg-[#B98CFF]/10 px-4 py-2 text-xs font-bold text-[#E2D5FF]"><BookOpenCheck className="h-4 w-4" />FREE KNOWLEDGE, READER-DIRECTED</span>
            <span className="rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-4 py-2 text-xs font-bold text-[#B5F7CC]">BROWSER-LOCAL RELEASE PLANNING</span>
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <PortalTrustLens lane="Creator Books Publishing Desk" source="Owner-supplied book and publishing context, the registered Book of the Journey reading route, ScrollVerse evidence-first production workflow, and title-specific release-record standard." readiness="Browser-local catalog, reading discovery, edition planning, accessibility prompts, and copyable release briefs are available now." boundary="No manuscript upload, cover generation, narrator creation, retailer or distributor connection, SKU, price, inventory, checkout, payment, printing, publishing, or provider action is created here." />

        <section className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <article className="rounded-[2rem] border border-[#B98CFF]/30 bg-[#100d1c]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,.24)] md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="font-mono text-[10px] tracking-[.2em] text-[#D6C4FF]">FOCUSED TITLE LANE</p><h2 className="mt-2 text-3xl font-black">{focused.order} / {focused.title}</h2></div>
              <StateBadge state={focused.state} />
            </div>
            <p className="mt-5 text-base leading-7 text-slate-300">{focused.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-black tracking-widest text-[#B5F7CC]">SOURCE CONTEXT</p><p className="mt-2 text-sm leading-6 text-slate-300">{focused.source}</p></div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-black tracking-widest text-[#E2D5FF]">READER ACCESS</p><p className="mt-2 text-sm leading-6 text-slate-300">{focused.access}</p></div>
            </div>
            <div className="mt-5 rounded-2xl border border-[#00D4FF]/20 bg-[#00D4FF]/[.05] p-4"><p className="text-[10px] font-black tracking-widest text-[#A7EEFF]">EDITION MODES</p><div className="mt-3 flex flex-wrap gap-2">{focused.formats.map(format => <span key={format} className="rounded-full border border-[#00D4FF]/20 bg-black/20 px-3 py-1.5 text-xs font-bold text-[#D7F5FF]">{format}</span>)}</div></div>
            <div className="mt-5 rounded-2xl border border-[#FFB800]/20 bg-[#FFB800]/[.06] p-4"><p className="text-[10px] font-black tracking-widest text-[#FFE3A0]">REQUIRED BEFORE A RELEASE</p><p className="mt-2 text-sm leading-6 text-slate-300">{focused.required}</p></div>
            <p className="mt-5 text-xs leading-5 text-slate-400"><LockKeyhole className="mr-2 inline h-4 w-4 text-[#B98CFF]" />{focused.boundary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {focused.href && focused.action ? <Link href={focused.href} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/35 px-4 py-3 text-xs font-black text-[#A7EEFF] hover:bg-[#00D4FF]/10"><FileText className="h-4 w-4" />{focused.action}</Link> : null}
              <button type="button" onClick={copyReleaseBrief} className="inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-4 py-3 text-xs font-black text-[#150b21] hover:bg-[#d9c3ff]"><ClipboardCheck className="h-4 w-4" />Copy release brief</button>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#00D4FF]/20 bg-[linear-gradient(150deg,rgba(0,212,255,.08),rgba(0,0,0,.16))] p-6 md:p-8">
            <div className="flex items-center gap-3"><Volume2 className="h-5 w-5 text-[#00D4FF]" /><div><p className="font-mono text-[10px] tracking-[.2em] text-[#00D4FF]">ACCESSIBILITY IS PART OF THE EDITION</p><h2 className="mt-1 text-2xl font-black">Design the reading experience, not just the title.</h2></div></div>
            <div className="mt-6 space-y-3">
              {[
                ["01", "Keep a text-first reading path with a clear title, source label, and reader purpose."],
                ["02", "Describe planned visual, audio, voice, translation, and print formats separately so visitors do not mistake a plan for a live edition."],
                ["03", "For youth-facing material, add age guidance, adult-supported participation, and an independent consent and safeguarding record before programme release."],
                ["04", "Give each title its own rights, delivery, support, correction, and owner-release record before any provider action."],
              ].map(([number, item]) => <div key={number} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00D4FF]/15 text-xs font-black text-[#9DEBFF]">{number}</span><p className="text-sm leading-6 text-slate-300">{item}</p></div>)}
            </div>
            <p className="mt-6 rounded-2xl border border-[#B98CFF]/25 bg-[#B98CFF]/[.07] p-4 text-xs leading-5 text-[#E2D5FF]"><Headphones className="mr-2 inline h-4 w-4" />A voice or visual edition is a distinct release, not an automatic format conversion. The relevant contributor, representation, accessibility, delivery, and owner-release records must be complete first.</p>
          </article>
        </section>

        <section className="mt-10 flex flex-wrap gap-2" aria-label="Filter Creator Books title lanes">
          {STATES.map(state => <button key={state} type="button" onClick={() => setFilter(state)} aria-pressed={filter === state} className={`rounded-full px-4 py-2 text-xs font-black capitalize transition ${filter === state ? "bg-[#B98CFF] text-[#160a24]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{state}</button>)}
        </section>
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visibleLanes.map(lane => <article key={lane.id} className={`rounded-3xl border p-6 transition ${focusedId === lane.id ? "border-[#B98CFF]/70 bg-[#B98CFF]/[.1]" : "border-white/10 bg-white/[.025] hover:border-[#00D4FF]/35"}`}>
            <p className="font-mono text-[10px] tracking-[.18em] text-[#D6C4FF]">TITLE LANE {lane.order}</p>
            <div className="mt-4 flex items-start justify-between gap-3"><h2 className="text-xl font-black">{lane.title}</h2><StateBadge state={lane.state} /></div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{lane.summary}</p>
            <button type="button" onClick={() => { setFocusedId(lane.id); toast.success(`${lane.title} is now the focused publishing lane.`); }} className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#A7EEFF] hover:text-white"><BookOpenCheck className="h-4 w-4" />Focus this lane</button>
          </article>)}
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#00FF88]/25 bg-[#00FF88]/[.045] p-6 md:p-8"><p className="font-mono text-[10px] tracking-[.22em] text-[#B5F7CC]">FREE READER PATH</p><h2 className="mt-3 text-2xl font-black">Readers can inspect the work without a hidden exchange.</h2><p className="mt-3 text-sm leading-7 text-slate-300">The publishing desk links only to registered internal reading or learning routes. A title that has no cleared reader destination remains in a visible planning state instead of appearing as a broken download, an implied sale, or a generic product card.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/book-of-the-journey" className="rounded-xl border border-[#00FF88]/40 px-4 py-3 text-xs font-black text-[#B5F7CC]">Read the Book of the Journey →</Link><Link href="/open-knowledge-verse" className="rounded-xl border border-white/15 px-4 py-3 text-xs font-black text-white">Open free knowledge →</Link></div></article>
          <article className="rounded-[2rem] border border-[#FFB800]/25 bg-[#FFB800]/[.045] p-6 md:p-8"><p className="font-mono text-[10px] tracking-[.22em] text-[#FFE3A0]">EXACT OWNER-RELEASE GATE</p><h2 className="mt-3 text-2xl font-black">A catalog card is not a provider-side release.</h2><p className="mt-3 text-sm leading-7 text-slate-300">Before any title is sold, downloaded, printed, distributed, narrated, or published through another service, the desk requires a title-specific source and rights record, accessible public description, format and delivery definition, support terms, relevant commercial fields, provider destination, and one current owner release confirmation.</p><Link href="/continuation-readiness-register" className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#FFB800]/40 px-4 py-3 text-xs font-black text-[#FFE3A0]"><Sparkles className="h-4 w-4" />Open release readiness →</Link></article>
        </section>
      </section>
    </main>
  );
}
