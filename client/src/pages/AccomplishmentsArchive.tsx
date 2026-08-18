import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  HeartHandshake,
  Landmark,
  Music2,
  RadioTower,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const RECORD_LANES = [
  {
    number: "01",
    title: "The journey is written into the work",
    eyebrow: "Books · family legacy · open record",
    copy: "Begin with the first-person journey record, the Book of the Journey, and the family-legacy pathways. These pages show how a life, a memory, and a body of creation can remain connected without being reduced to a single label.",
    color: "#FFCC4D",
    icon: BookOpen,
    links: [
      { label: "Book of the Journey", href: "/book-of-the-journey" },
      { label: "Family Legacy", href: "/harlem-vineland-legacy" },
      { label: "Open Record", href: "/open-record-continuum" },
    ],
  },
  {
    number: "02",
    title: "Faith, learning, and study stay in the center",
    eyebrow: "Seerah · 99 Names · free knowledge",
    copy: "Faith and study are not hidden in a separate room. The Seerah, the 99 Names, and the free learning routes remain visible beside research, philosophy, mathematics, and archive pathways.",
    color: "#B5F7CC",
    icon: Landmark,
    links: [
      { label: "Seerah", href: "/seerah" },
      { label: "99 Names", href: "/99-names" },
      { label: "Living Journey", href: "/living-journey-experience" },
    ],
  },
  {
    number: "03",
    title: "The sound, the image, and the story move together",
    eyebrow: "Music · media · original production",
    copy: "Music, visual work, Junior Movies, and future production packets are shown as connected creative directions. Each route keeps its own source, contributor, accessibility, and release conditions visible.",
    color: "#FF6B9A",
    icon: Music2,
    links: [
      { label: "Music", href: "/music" },
      { label: "Media Hub", href: "/media-hub" },
      { label: "Junior Movies", href: "/junior-movies" },
    ],
  },
  {
    number: "04",
    title: "Ideas become a visible system",
    eyebrow: "Method · pattern · research",
    copy: "The portal records the methods that turn a thought into a route, a source map, a production packet, or a learning path. It shows the work in motion instead of asking visitors to take an unseen process on faith.",
    color: "#00D4FF",
    icon: Compass,
    links: [
      { label: "Sovereign Methodology", href: "/sovereign-methodology" },
      { label: "Pattern Study", href: "/chais-sabir-equation" },
      { label: "Synchronization Research", href: "/synchronization-research" },
    ],
  },
  {
    number: "05",
    title: "Community is part of the record",
    eyebrow: "Exchange · contribution · co-creation",
    copy: "A visitor can read, contribute an idea, share a reflection, or help build a route. These pathways remain voluntary, human-forward, and clear about what is available now versus what needs an owner release.",
    color: "#B98CFF",
    icon: Users,
    links: [
      { label: "Contribution Exchange", href: "/sovereign-contribution-exchange" },
      { label: "Journey Archive", href: "/journey-co-creation-archive" },
      { label: "Experience Exchange", href: "/chosen-ones-exchange" },
    ],
  },
  {
    number: "06",
    title: "The record leaves room for choice",
    eyebrow: "Free access · exchange · creator release",
    copy: "ScrollVerse can hold free knowledge, direct-to-fan discovery, contribution paths, and future creator-selected releases together. A visitor decides whether to read, listen, participate, support, or return later.",
    color: "#00FF88",
    icon: HeartHandshake,
    links: [
      { label: "Direct-to-Fan Catalog", href: "/direct-fan-catalog" },
      { label: "Creator Workspace", href: "/creator-workspace" },
      { label: "Living Journey", href: "/living-journey-experience" },
    ],
  },
] as const;

const READING_METHOD = [
  {
    label: "Owner-authored record",
    detail: "The creator’s account, language, journey, and purpose are presented in the creator’s own record.",
    color: "#FFCC4D",
  },
  {
    label: "Local project record",
    detail: "Routes, components, source maps, tests, and database changes show what is present in this portal workspace.",
    color: "#00D4FF",
  },
  {
    label: "External or future state",
    detail: "Provider settings, releases, transactions, marketplace actions, and managed publication keep their own destination and release record.",
    color: "#B98CFF",
  },
] as const;

export default function AccomplishmentsArchive() {
  useSovereignHeartbeat({ page: "accomplishments-archive" });

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b border-[#FFCC4D]/30 bg-[radial-gradient(circle_at_88%_14%,rgba(255,204,77,.2),transparent_26%),radial-gradient(circle_at_12%_72%,rgba(0,212,255,.18),transparent_34%),#050B1A]">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(transparent,#050B1A)]" aria-hidden="true" />
        <div className="container relative z-10 py-14 md:py-22">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/living-journey-experience" className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">← LIVING JOURNEY</Link>
            <span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">OWNER-AUTHORED RECORD · READER-DIRECTED</span>
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-[1.2fr_.8fr] xl:items-end">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#FFCC4D]">THE SCROLLVERSE ACCOMPLISHMENTS ARCHIVE</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">A life of work, <span className="text-[#FFCC4D]">shown in its connections.</span></h1>
              <p className="mt-7 max-w-4xl text-base leading-8 text-[#D6E2EE]">This is not a page asking anyone to believe before they look. It is a place to walk through the record: the books, the music, the visual worlds, the family legacy, the faith, the study, the community, and the working systems that carry the ScrollVerse forward.</p>
              <blockquote className="mt-7 max-w-4xl border-l-2 border-[#FFCC4D] pl-5 text-xl font-bold leading-8 text-[#FFDEA0]">“Influence is currency. Power without principle is poison.”</blockquote>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#record-lanes" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Walk the record <ArrowRight className="ml-2 inline h-4 w-4" /></a>
                <Link href="/book-of-the-journey" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Read the Book</Link>
                <Link href="/open-record-continuum" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Open the record</Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#00D4FF]/35 bg-[#071426]/90 p-7 shadow-[0_28px_90px_rgba(0,0,0,.35)]">
              <RadioTower className="h-9 w-9 text-[#00D4FF]" />
              <p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">HOW TO READ THIS ARCHIVE</p>
              <p className="mt-3 text-2xl font-black leading-tight">Follow the work. See the state. Decide for yourself.</p>
              <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Each direction names what is owner-authored, what is locally present, and what retains a separate external or future release state.</p>
              <Link href="/portal-trust-standard" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#9DEBFF]">See the trust standard <ArrowRight className="h-4 w-4" /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <PortalTrustLens
          lane="Reader-Directed Accomplishments Archive"
          source="Owner-authored ScrollVerse journey records, registered portal routes, local source maps, local validation records, and the reader-directed archive comparison."
          readiness="Available now as a free archive and route navigator. Individual media, catalog, payment, token, provider, and external-release conditions remain with their own exact destination pages."
          boundary="This archive presents a source-labeled record. It does not turn a local route into a public release, a source document into an external outcome, or an owner-authored statement into a claim that a visitor must accept."
        />
      </section>

      <section id="record-lanes" className="container scroll-mt-10 py-10">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">THE CORRELATION MAP</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Every direction carries a relationship to the next.</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#C9D8E7]">The archive is designed as a connected map rather than a victory list: one direction makes another easier to find, study, hear, build, or question.</p>
          </div>
          <Sparkles className="h-10 w-10 text-[#00D4FF]" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {RECORD_LANES.map((lane) => {
            const Icon = lane.icon;
            return (
              <article key={lane.number} className="relative overflow-hidden rounded-[2rem] border bg-[#071426]/85 p-7 transition hover:-translate-y-1" style={{ borderColor: `${lane.color}55` }}>
                <Icon className="absolute right-5 top-5 h-20 w-20 text-white/[.04]" />
                <p className="relative text-[10px] font-mono tracking-[.16em]" style={{ color: lane.color }}>LANE {lane.number} · {lane.eyebrow.toUpperCase()}</p>
                <h3 className="relative mt-4 text-2xl font-black leading-tight text-white">{lane.title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-[#D6E2EE]">{lane.copy}</p>
                <div className="relative mt-6 grid gap-2">
                  {lane.links.map((link) => <Link key={link.href} href={link.href} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-bold text-[#E4EDF5] transition hover:border-white/35"><span>{link.label}</span><ArrowRight className="h-4 w-4" style={{ color: lane.color }} /></Link>)}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.018]">
        <div className="container py-12">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-mono tracking-[.16em] text-[#B98CFF]">THE TRANSPARENT READING METHOD</p>
              <h2 className="mt-3 text-3xl font-black">The intimacy is in the detail.</h2>
              <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">A meaningful archive does not need to overstate its record. It can show the exact source, keep a date, name the present state, leave a correction path, and still speak with heart about why the work matters.</p>
              <p className="mt-5 text-sm font-bold leading-7 text-[#DCC8FF]">“I’m a Walking Solution.”</p>
            </div>
            <div className="grid gap-4">
              {READING_METHOD.map((item) => <div key={item.label} className="rounded-3xl border bg-[#071426]/85 p-6" style={{ borderColor: `${item.color}55` }}><div className="flex items-start gap-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: item.color }} /><div><p className="text-sm font-black text-white">{item.label}</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{item.detail}</p></div></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="rounded-[2rem] border border-[#00FF88]/35 bg-[radial-gradient(circle_at_88%_12%,rgba(0,255,136,.14),transparent_25%),#071426] p-8 md:p-10">
          <p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">THE NEXT DOOR IS STILL OPEN</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-4xl">Read it. Walk it. Carry what helps. Return when another direction calls.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The archive keeps the work connected to the routes where it can be encountered directly. There is no gate on the learning path and no obligation to follow every direction at once.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/living-journey-experience" className="rounded-xl bg-[#B5F7CC] px-5 py-3 text-sm font-black text-[#071426]">Return to Living Journey</Link>
            <Link href="/direct-fan-catalog" className="rounded-xl border border-[#B5F7CC]/45 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Explore creator choices</Link>
            <Link href="/site-map" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">See every route</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
