import { useState } from "react";
import { Archive, ArrowLeft, ArrowRight, BookOpenCheck, Compass, ExternalLink, FileText, LibraryBig, Quote, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { UltimateChoicePathway } from "@/components/UltimateChoicePathway";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const COVER_ART = "/manus-storage/book-of-the-journey-cover_18e58ebd.png";

const CHAPTERS = [
  {
    number: "01",
    title: "The Open Page",
    eyebrow: "A creator-led beginning",
    source: "Owner-authored methodology",
    state: "Available now",
    color: "#00D4FF",
    route: "/sovereign-methodology",
    routeLabel: "Read Sovereign Methodology",
    text: [
      "Every life record begins somewhere: a voice deciding that its work, memories, questions, and changes are worth keeping in view. The Book of the Journey is that opening page for ScrollVerse. It is a free reader built around a simple practice: let the owner’s record be stated directly, keep the source trail visible, and leave room for every reader to meet the material in their own way.",
      "This is not a final ledger or a demand for one conclusion. It is a living reading path through the work already made: the words, music, systems, family remembrance, research routes, archive notes, and community exchanges. Each passage names what kind of record it is so that a personal account, an original creation, a public source, and a protected transmission are never blended into one indistinguishable claim.",
    ],
    practice: "Start with the owner’s words. Follow the source label. Open the connected record when you want more context.",
  },
  {
    number: "02",
    title: "Foundation: Family, Place, and Memory",
    eyebrow: "The record begins close to home",
    source: "Owner-stated history · owner-held material",
    state: "Research",
    color: "#DCC8FF",
    route: "/harlem-vineland-legacy",
    routeLabel: "Open Harlem to Vineland Legacy",
    text: [
      "Foundation is the part of a living book that names place, family, memory, and the people whose lives continue to shape the reader’s sense of direction. In the ScrollVerse record, Harlem, Vineland, family remembrance, and the owner’s chronology appear as first-person history: a dated account of what the owner remembers, has been told, and holds meaningful.",
      "The archive keeps family documents, ancestry materials, and other private records in their own protected lane until an owner-approved accessible excerpt is ready. That structure protects the difference between a personal story, a family-held document, and a publicly reviewable source while allowing the reader to understand why each belongs in the larger journey.",
    ],
    practice: "Read family and place records as owner-stated history unless a distinct source record is linked beside them.",
  },
  {
    number: "03",
    title: "Making the Work",
    eyebrow: "Music, fashion, media, and the practice of creating",
    source: "Original ScrollVerse work",
    state: "Available now",
    color: "#FFCC4D",
    route: "/media-hub",
    routeLabel: "Open the Media Hub",
    text: [
      "A journey is not only remembered; it is made visible through work. ScrollVerse gathers music, moving-image worlds, fashion concepts, books, creator tools, and media pathways as a creator-controlled field of practice. This chapter is an invitation to follow the making: from a creative idea, to a recorded artifact, to a rights-aware release path when a particular work is ready.",
      "The reader can move from this chapter into the Media Hub and creator records without treating every concept as a release, product, or transaction. Some works are available now to explore. Some are research. Others require an owner release, contributor record, or a specific asset packet before they can move forward. The work remains visible at every stage.",
    ],
    practice: "Explore original work through its own media and creator record; check the operating state before assuming a release status.",
  },
  {
    number: "04",
    title: "Study as Practice",
    eyebrow: "Methods, questions, and free learning",
    source: "Original ScrollVerse work · public references",
    state: "Available now",
    color: "#00FF88",
    route: "/chais-sabir-equation",
    routeLabel: "Open the Pattern Study",
    text: [
      "Study is a way of staying open to detail. The Pattern Study, Synchronization Research Index, Quantum Research pathway, and methodology record make room for calculation, historical methods, language, interpretation, physics, mathematics, archival practice, and public source review. Each route is free to read and points outward to the sources that make a method reproducible.",
      "The book’s research chapters place personal observation beside a visible method rather than forcing one to replace the other. A reader can review the arithmetic, source date, quoted material, or public link, and then decide what the material means in their own frame. The work of study continues when the source trail stays open.",
    ],
    practice: "Use a calculation, reference, or public source as a learning tool; keep interpretation connected to the exact method and input used.",
  },
  {
    number: "05",
    title: "Transmissions and Co-Creation",
    eyebrow: "A record of dialogue with clear attribution",
    source: "Owner-stated account · protected third-party system transmission",
    state: "Research",
    color: "#B5F7CC",
    route: "/journey-co-creation-archive",
    routeLabel: "Open Journey & Co-Creation Archive",
    text: [
      "The owner has documented periods of important exchange with digital systems. The Book of the Journey preserves that part of the record by separating the owner’s account of the exchange from the language inside a supplied system transcript. A transmission is named as a third-party system artifact; it is not silently rewritten as an owner-authored statement, identity, or conclusion.",
      "This distinction allows the archive to hold the creative force of dialogue without losing provenance. The reader can see that an exchange existed, what kind of file was supplied, what language originated in a system artifact, and what the owner chose to say in his own record. Protected files remain protected until an accessible, owner-approved excerpt and appropriate context can be added.",
    ],
    practice: "Read dialogue artifacts with the sender role, file type, date context, and source boundary still attached.",
  },
  {
    number: "06",
    title: "A Record Shared",
    eyebrow: "Community without a forced conclusion",
    source: "Community first-person exchange",
    state: "Available now",
    color: "#FF9CC4",
    route: "/chosen-ones-exchange",
    routeLabel: "Open Experience Exchange",
    text: [
      "A personal archive can become a meeting place without becoming a verdict. The Chosen Ones Experience Exchange is a separate community lane where participants can write first-person reflections, replies, and questions in their own words. It is not a replacement for the owner’s record, and the owner’s record is not a replacement for anyone else’s experience.",
      "The Book of the Journey keeps this chapter open because free knowledge grows when people can compare paths with care. A reader who finds resonance can contribute a reflection. A reader who does not can still follow the sources, original work, and research chapters. The invitation is to engage with the record, not to surrender independent judgment.",
    ],
    practice: "Share only what you want to make public, keep your own source context, and respect another person’s authorship.",
  },
  {
    number: "07",
    title: "Continuation Ledger",
    eyebrow: "How the book stays alive",
    source: "Original ScrollVerse work · open record practice",
    state: "Available now",
    color: "#9DEBFF",
    route: "/open-record-continuum",
    routeLabel: "Open Record Continuum",
    text: [
      "A living book grows by adding clear pages, not by erasing the old ones. Continuation means dates, source paths, versions, accessible extracts, operating states, correction notes, contributor records, and owner releases. When a new artifact enters ScrollVerse, it can be placed in the reader with enough context for a future visitor to understand what it is and what it is not.",
      "The continuation ledger is the promise of free access with careful handling. It makes space for future chapters, for recovered chat archives, for original music and books, for family-approved materials, and for new research. It also preserves the right to correct a record, protect a private source, and keep an unfinished work in the research lane until it is ready for its own release.",
    ],
    practice: "Add the date, origin, operating state, and correction path before calling a record complete.",
  },
] as const;

const ARCHIVE_SOURCES = [
  { title: "Recovered Chat Archive", label: "Source index available", description: "Public repository metadata identifies archive-oriented paths. Individual conversations are added only with a source, date, speaker role, and owner-approved excerpt.", href: "https://github.com/chaishillomnitech1/Chaishillomnitech1", color: "#B5F7CC" },
  { title: "Personal Digital Records", label: "Free preservation learning", description: "Library of Congress guidance for preserving personal photographs, audio, video, email, and digital records.", href: "https://digitalpreservation.gov/personalarchiving/", color: "#9DEBFF" },
  { title: "Oral History Practice", label: "Free archival learning", description: "An archival framework for metadata, access, preservation, rights, and long-term care of first-person records.", href: "https://oralhistory.org/archives-principles-and-best-practices-overview/", color: "#FFDEA0" },
] as const;

const JOURNEY_COMPASS = [
  { label: "Foundation", chapter: 1, color: "#DCC8FF", description: "Start with family, place, memory, and the source lanes that hold the record with care." },
  { label: "Creation", chapter: 2, color: "#FFCC4D", description: "Follow music, books, fashion, media, and the creator-controlled work that makes the journey visible." },
  { label: "Study", chapter: 3, color: "#00FF88", description: "Explore methods, questions, public references, and free learning without being asked to abandon your own judgment." },
  { label: "Transmission", chapter: 4, color: "#B5F7CC", description: "See how owner-authored context and third-party system dialogue remain distinct inside a protected source record." },
  { label: "Community", chapter: 5, color: "#FF9CC4", description: "Meet shared reflection as a voluntary exchange of first-person voices, never a forced conclusion." },
  { label: "Continuation", chapter: 6, color: "#9DEBFF", description: "Carry the record forward through sources, dates, operating states, corrections, and owner-approved releases." },
] as const;

export default function BookOfTheJourney() {
  useSovereignHeartbeat({ page: "book-of-the-journey" });
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeCompass, setActiveCompass] = useState(0);
  const chapter = CHAPTERS[activeChapter];
  const compass = JOURNEY_COMPASS[activeCompass];
  const canGoBack = activeChapter > 0;
  const canGoForward = activeChapter < CHAPTERS.length - 1;

  const navigateChapter = (direction: -1 | 1) => {
    setActiveChapter((current) => Math.max(0, Math.min(CHAPTERS.length - 1, current + direction)));
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-[#FFCC4D]/25 bg-[radial-gradient(circle_at_84%_20%,rgba(0,212,255,.18),transparent_30%),radial-gradient(circle_at_12%_76%,rgba(185,140,255,.18),transparent_32%),#050B1A]">
        <div className="container py-12 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/journey-co-creation-archive" className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">← JOURNEY &amp; CO-CREATION ARCHIVE</Link>
            <span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">FREE LIVING READER · VOLUME 01</span>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#FFCC4D]">SCROLLVERSE PRESENTS</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[.92] md:text-7xl">The Book of the <span className="text-[#FFCC4D]">Journey.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A free, visual, source-labeled reading path through the owner’s journey, family and place record, original work, study, digital-system dialogue archive, and the practice of keeping an open ScrollVerse record.</p>
              <div className="mt-6 max-w-3xl rounded-2xl border border-[#B5F7CC]/40 bg-[#00FF88]/[.07] px-5 py-4">
                <p className="text-[10px] font-mono tracking-[.17em] text-[#B5F7CC]">OWNER-AUTHORED · JOURNEY IDENTITY</p>
                <p className="mt-2 text-2xl font-black text-white">“I’m a Walking Solution.”</p>
                <p className="mt-2 text-sm leading-6 text-[#D6E2EE]">A first-person anchor for a living record: source by source, chapter by chapter, with the reader free to follow the path that helps them think and create.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => document.getElementById("reader")?.scrollIntoView({ behavior: "smooth" })} className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#090D18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Begin reading</button>
                <Link href="/open-record-continuum" className="rounded-xl border border-[#9DEBFF]/40 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">How the record works</Link>
              </div>
            </div>
            <figure className="relative overflow-hidden rounded-[2rem] border border-[#FFCC4D]/40 bg-[#071426] shadow-[0_30px_100px_rgba(0,0,0,.45)]">
              <img src={COVER_ART} alt="Abstract ScrollVerse Book of the Journey cover: a luminous open scroll with seven paths of cyan and gold light against a midnight archival field." className="h-full min-h-[270px] w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(5,11,26,.94))] px-6 pb-6 pt-16"><p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">ORIGINAL SCROLLVERSE COVER ART</p><p className="mt-2 text-sm text-[#D6E2EE]">Seven reading paths from one open page.</p></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="container py-10"><PortalTrustLens lane="Book of the Journey" source="Owner-authored writing, connected local ScrollVerse records, source-labeled public learning references, and protected archive lanes." readiness="Available now as a free visual reader. Individual private records, family materials, chat transcripts, and release assets remain in their own source and owner-release lanes." boundary="This book preserves the owner’s account and linked sources. It distinguishes owner-authored text, owner-stated history, original work, public references, and third-party system transmissions; it does not replace a reader’s independent assessment or turn protected material into a public release." /></section>

      <section className="container pb-5">
        <div className="rounded-[2rem] border border-[#B5F7CC]/40 bg-[radial-gradient(circle_at_90%_10%,rgba(255,204,77,.13),transparent_28%),linear-gradient(135deg,rgba(0,255,136,.10),rgba(7,20,38,.96))] p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">ISLAMIC LEARNING PATHWAYS · FREE TO READ</p><h2 className="mt-2 text-3xl font-black">Keep the Seerah and the 99 Names inside the living book.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">The journey has a direct Islamic learning lane. Open the Seerah for a broad path, the 99 Names for a focused study route, or a timeline chapter when you want to follow a specific point of reference.</p></div><Sparkles className="h-10 w-10 text-[#B5F7CC]" /></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Link href="/seerah" className="rounded-2xl border border-[#B5F7CC]/45 bg-[#00FF88]/10 p-4 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><p className="text-[10px] font-mono tracking-[.14em] text-[#B5F7CC]">BEGIN HERE</p><p className="mt-2 text-lg font-black text-white">The Seerah</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">A free portal entry into the complete learning route.</p></Link><Link href="/99-names" className="rounded-2xl border border-[#DCC8FF]/45 bg-[#B98CFF]/10 p-4 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><p className="text-[10px] font-mono tracking-[.14em] text-[#DCC8FF]">FOCUS STUDY</p><p className="mt-2 text-lg font-black text-white">The 99 Names</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">A direct path for names, meaning, and reflection.</p></Link><Link href="/seerah/timeline" className="rounded-2xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 p-4 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><p className="text-[10px] font-mono tracking-[.14em] text-[#FFDEA0]">FOLLOW THE PATH</p><p className="mt-2 text-lg font-black text-white">Seerah Timeline</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">Move through the route in chronological context.</p></Link><Link href="/seerah/al-farewell" className="rounded-2xl border border-[#9DEBFF]/45 bg-[#00D4FF]/10 p-4 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><p className="text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">CONTINUE READING</p><p className="mt-2 text-lg font-black text-white">Farewell Path</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">One focused route within the Seerah learning collection.</p></Link></div>
          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#FFCC4D]/40 bg-[#FFCC4D]/[.07] p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[10px] font-mono tracking-[.14em] text-[#FFDEA0]">OWNER-RECOMMENDED SEERAH BOOK · EXTERNAL PURCHASE PATH</p><p className="mt-2 text-xl font-black text-white">The Sealed Nectar (Ar-Raheeq Al-Makhtum)</p><p className="mt-2 max-w-3xl text-sm leading-6 text-[#D6E2EE]">A Seerah reading recommendation by Safiur Rahman al-Mubarakpuri. The link opens Darussalam’s own book page; ScrollVerse does not sell, fulfill, or claim an affiliate relationship with this external publisher.</p></div><a href="https://darussalam.com/sealed-nectar-ar-raheequl-makhtum/" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#FFCC4D] px-4 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Open book path <ExternalLink className="ml-2 h-4 w-4" /></a></div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="rounded-[2rem] border border-[#B5F7CC]/35 bg-[radial-gradient(circle_at_12%_18%,rgba(0,255,136,.14),transparent_30%),linear-gradient(135deg,rgba(181,247,204,.08),rgba(7,20,38,.96))] p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">JOURNEY COMPASS · FREE INTERACTIVE READING</p><h2 className="mt-2 text-3xl font-black">Choose a lane. Open a chapter. Carry the question forward.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">The compass is a reading navigator, not a test or score. Select a lane to move the book reader to its connected chapter.</p></div><Compass className="h-10 w-10 text-[#B5F7CC]" /></div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Journey Compass lanes">
            {JOURNEY_COMPASS.map((lane, index) => <button key={lane.label} type="button" onClick={() => { setActiveCompass(index); setActiveChapter(lane.chapter); document.getElementById("reader")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: activeCompass === index ? lane.color : "rgba(255,255,255,.14)", background: activeCompass === index ? `${lane.color}16` : "rgba(5,11,26,.42)" }}><p className="text-sm font-black" style={{ color: lane.color }}>{lane.label}</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">{lane.description}</p><span className="mt-3 inline-block text-[10px] font-mono tracking-[.12em]" style={{ color: lane.color }}>OPEN CHAPTER {String(lane.chapter + 1).padStart(2, "0")}</span></button>)}
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: compass.color }}>CURRENT COMPASS LANE · {compass.label.toUpperCase()}</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{compass.description}</p></div>
        </div>
      </section>

      <UltimateChoicePathway context="In the living book, the framework is a way to pause beside a chapter, name the response that is available, and continue reading with more intention." />

      <section id="reader" className="container scroll-mt-10 pb-12">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">THE READER</p><h2 className="mt-2 text-3xl font-black">Read one chapter at a time. Follow every path.</h2></div><div className="flex items-center gap-3 text-xs font-mono text-[#AFC0CF]"><BookOpenCheck className="h-4 w-4 text-[#FFCC4D]" /> {String(activeChapter + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}</div></div>
        <div className="mt-7 grid gap-5 xl:grid-cols-[.55fr_1.45fr]">
          <nav className="grid gap-2 self-start" aria-label="Book of the Journey table of contents">
            {CHAPTERS.map((item, index) => <button key={item.number} type="button" onClick={() => setActiveChapter(index)} aria-current={activeChapter === index ? "page" : undefined} className="rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: activeChapter === index ? item.color : "rgba(255,255,255,.12)", background: activeChapter === index ? `${item.color}14` : "rgba(255,255,255,.02)" }}><span className="text-xs font-mono tracking-[.14em]" style={{ color: item.color }}>CHAPTER {item.number}</span><span className="mt-1 block text-sm font-black text-white">{item.title}</span><span className="mt-1 block text-xs text-[#AFC0CF]">{item.state}</span></button>)}
          </nav>
          <article className="relative overflow-hidden rounded-[2rem] border bg-[linear-gradient(145deg,rgba(255,204,77,.09),rgba(5,11,26,.96)_42%,rgba(0,212,255,.06))] p-6 sm:p-10" style={{ borderColor: `${chapter.color}77` }}>
            <LibraryBig className="absolute right-7 top-7 h-24 w-24 text-white/[.045]" />
            <div className="relative max-w-3xl"><p className="text-xs font-mono tracking-[.2em]" style={{ color: chapter.color }}>CHAPTER {chapter.number} · {chapter.eyebrow.toUpperCase()}</p><h3 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{chapter.title}</h3><div className="mt-5 inline-flex rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.14em]" style={{ borderColor: `${chapter.color}66`, background: `${chapter.color}10`, color: chapter.color }}>{chapter.source} · {chapter.state}</div><div className="mt-8 space-y-5 text-base leading-8 text-[#E4EDF5]">{chapter.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5"><div className="flex gap-3"><Quote className="mt-1 h-5 w-5 shrink-0" style={{ color: chapter.color }} /><div><p className="text-xs font-mono tracking-[.14em]" style={{ color: chapter.color }}>READING PRACTICE</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{chapter.practice}</p></div></div></div><div className="mt-8 flex flex-wrap gap-3"><Link href={chapter.route} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-black" style={{ borderColor: `${chapter.color}77`, color: chapter.color }}>{chapter.routeLabel}<ArrowRight className="h-4 w-4" /></Link></div></div>
            <div className="relative mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6"><button type="button" disabled={!canGoBack} onClick={() => navigateChapter(-1)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-35"><ArrowLeft className="h-4 w-4" />Previous</button><button type="button" disabled={!canGoForward} onClick={() => navigateChapter(1)} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-[#071426] transition disabled:cursor-not-allowed disabled:opacity-35" style={{ background: chapter.color }}>Next<ArrowRight className="h-4 w-4" /></button></div>
          </article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.018]"><div className="container py-12"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">SOURCE SHELF</p><h2 className="mt-2 text-3xl font-black">The book stays readable because its sources stay visible.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C9D8E7]">These free learning and repository paths support the book’s archive practice. A repository source index is not the same as an approved public transcript; a protected record stays protected until it receives its own owner-approved access path.</p></div><Archive className="h-10 w-10 text-[#B5F7CC]" /></div><div className="mt-7 grid gap-4 lg:grid-cols-3">{ARCHIVE_SOURCES.map((source) => <a key={source.title} href={source.href} target="_blank" rel="noreferrer" className="rounded-3xl border bg-[#071426]/75 p-6 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: `${source.color}55` }}><p className="text-xs font-mono tracking-[.14em]" style={{ color: source.color }}>{source.label}</p><h3 className="mt-3 text-xl font-black text-white">{source.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{source.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold" style={{ color: source.color }}>Open source path <ExternalLink className="h-3.5 w-3.5" /></span></a>)}</div></div></section>

      <section className="container py-12"><div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="rounded-3xl border border-[#DCC8FF]/35 bg-[linear-gradient(135deg,rgba(185,140,255,.13),rgba(5,11,26,.9))] p-7"><p className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">CONTINUATION NOTE</p><h2 className="mt-3 text-3xl font-black">A book can grow without losing its earlier pages.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">New chapters enter this reader with their source type, date context, operating state, rights condition where relevant, and correction path. Recovered chat archives, family material, music, books, and visual work are added source by source, not assumed into the public record.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/open-record-continuum" className="rounded-xl border border-[#DCC8FF]/40 bg-[#DCC8FF]/10 px-4 py-3 text-sm font-black text-[#DCC8FF]">Continue through the Open Record</Link><Link href="/journey-co-creation-archive" className="rounded-xl border border-[#B5F7CC]/40 bg-[#00FF88]/10 px-4 py-3 text-sm font-black text-[#B5F7CC]">Open Journey Archive</Link></div></div><aside className="rounded-3xl border border-[#00D4FF]/30 bg-[#071426] p-7"><Compass className="h-8 w-8 text-[#9DEBFF]" /><h2 className="mt-4 text-2xl font-black">Free to read. Built to keep growing.</h2><p className="mt-3 text-sm leading-7 text-[#C9D8E7]">This reader is available without a gate. Individual assets, private sources, and external releases retain their own access and release conditions.</p><Link href="/open-knowledge-verse" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#9DEBFF]">Explore free knowledge <ArrowRight className="h-4 w-4" /></Link></aside></div></section>
    </main>
  );
}
