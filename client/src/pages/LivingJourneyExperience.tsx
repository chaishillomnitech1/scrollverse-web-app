import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Crown,
  Film,
  Headphones,
  Map,
  Orbit,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const HERO_ART = "/manus-storage/living-journey-hero_4d6e5190.png";

const MOVEMENTS = [
  {
    number: "01",
    title: "Read the record",
    eyebrow: "Free visual reading",
    description: "Begin with the living book, open record, and free knowledge shelves. Every page is a doorway, not a gate.",
    state: "Available now",
    color: "#FFCC4D",
    icon: BookOpen,
    route: "/book-of-the-journey",
    routeLabel: "Open the Book of the Journey",
    links: [
      { label: "Books", href: "/books" },
      { label: "Open Record", href: "/open-record-continuum" },
      { label: "Free Knowledge", href: "/open-knowledge-verse" },
    ],
  },
  {
    number: "02",
    title: "Hear the work",
    eyebrow: "Music and creator discovery",
    description: "Move through the music catalog, creator-controlled presentation, and release-readiness pathways at your own pace.",
    state: "Discovery available",
    color: "#00D4FF",
    icon: Headphones,
    route: "/music",
    routeLabel: "Enter the Music Path",
    links: [
      { label: "Direct-to-Fan Catalog", href: "/direct-fan-catalog" },
      { label: "Release Readiness", href: "/music-creator-release-readiness" },
      { label: "Creator Operations", href: "/creator-operations-intelligence" },
    ],
  },
  {
    number: "03",
    title: "See and imagine",
    eyebrow: "Media and Junior Movies",
    description: "Explore media worlds, creator ideas, and visual discovery while each destination keeps its own source, consent, and release conditions visible.",
    state: "Research and discovery",
    color: "#FF6B9A",
    icon: Film,
    route: "/junior-movies",
    routeLabel: "Open Junior Movies",
    links: [
      { label: "Media Hub", href: "/media-hub" },
      { label: "Scroll TV", href: "/scroll-tv" },
      { label: "Sovereign Cinema", href: "/sovereign-cinema" },
    ],
  },
  {
    number: "04",
    title: "Study and question",
    eyebrow: "Method, research, and patterns",
    description: "Follow the methodology, pattern study, synchronization index, and research paths. The source trail stays open for every reader.",
    state: "Available now",
    color: "#00FF88",
    icon: Orbit,
    route: "/sovereign-methodology",
    routeLabel: "Open the Methodology",
    links: [
      { label: "Pattern Study", href: "/chais-sabir-equation" },
      { label: "Synchronization Research", href: "/synchronization-research" },
      { label: "Quantum Research", href: "/quantum-research" },
    ],
  },
  {
    number: "05",
    title: "Learn the Islamic pathways",
    eyebrow: "Seerah and the 99 Names",
    description: "Keep Islamic learning visible within the complete ScrollVerse journey through direct, free routes into the Seerah, the 99 Names, and key timeline lessons.",
    state: "Available now",
    color: "#B5F7CC",
    icon: Crown,
    route: "/seerah",
    routeLabel: "Open the Seerah",
    links: [
      { label: "99 Names", href: "/99-names" },
      { label: "Seerah Timeline", href: "/seerah/timeline" },
      { label: "Al-Hijra", href: "/seerah/al-hijra" },
    ],
  },
  {
    number: "06",
    title: "Build and continue together",
    eyebrow: "Contribution and community",
    description: "Bring an idea, a reflection, or a question into the contribution and community pathways without giving up your authorship or your choice.",
    state: "Available now",
    color: "#B98CFF",
    icon: Users,
    route: "/sovereign-contribution-exchange",
    routeLabel: "Open Contribution Exchange",
    links: [
      { label: "Journey Archive", href: "/journey-co-creation-archive" },
      { label: "Experience Exchange", href: "/chosen-ones-exchange" },
      { label: "Assistive Governance", href: "/assistive-governance" },
    ],
  },
] as const;

const WAYPOINTS = [
  { label: "Portal roadmap", detail: "See the home-page roadmap and then follow the ecosystem map.", href: "/#roadmap", color: "#FFCC4D" },
  { label: "Ecosystem map", detail: "Open the portal-wide view of connected ScrollVerse directions.", href: "/ecosystem", color: "#00D4FF" },
  { label: "All routes", detail: "Use the site map whenever you want a complete route directory.", href: "/site-map", color: "#B98CFF" },
  { label: "Creator path", detail: "Move from an idea to creator tools and original-work pathways.", href: "/creator-workspace", color: "#00FF88" },
] as const;

const KNOWLEDGE_SHELVES = [
  { lane: "Islamic learning", title: "Islamic Studies Shelf", detail: "Academic and public learning paths for Islamic studies, manuscripts, and broader research context.", href: "https://guides.library.harvard.edu/mideast", color: "#B5F7CC" },
  { lane: "Biblical studies", title: "Biblical Studies Shelf", detail: "A university-library research guide for the study of biblical texts and related scholarship.", href: "https://guides.library.yale.edu/bible", color: "#FFCC4D" },
  { lane: "Jewish texts", title: "Jewish Texts Shelf", detail: "A free digital library for Jewish texts, translations, and connected commentary paths.", href: "https://www.sefaria.org", color: "#9DEBFF" },
  { lane: "Asian traditions", title: "South & East Asian Shelf", detail: "A national-library entry into source discovery across regional religious traditions.", href: "https://guides.loc.gov/religion-collections-libraries-archives/dc-library-congress-asian-division", color: "#FF9CC4" },
  { lane: "Comparative learning", title: "Religious Literacy Shelf", detail: "A professional academic association’s teaching and comparative-learning resources.", href: "https://aarweb.org/religious-studies-matters/teaching-religion-today/", color: "#DCC8FF" },
  { lane: "Philosophy & method", title: "Philosophy Shelf", detail: "A scholarly reference work for philosophy, ethics, and methodological questions.", href: "https://plato.stanford.edu/", color: "#00D4FF" },
  { lane: "Science & mathematics", title: "Science and Math Shelf", detail: "Free course materials and study pathways across foundational scientific and mathematical disciplines.", href: "https://ocw.mit.edu/", color: "#00FF88" },
] as const;

const ARCHIVE_SHELVES = [
  { sourceType: "Primary manuscript archive", title: "Ethiopian Bible & Geʽez Manuscripts", detail: "Digitized Ethiopian manuscripts, including biblical and related textual witnesses, described by their collection record.", href: "https://cudl.lib.cam.ac.uk/collections/ethiopianmanuscripts", color: "#B5F7CC" },
  { sourceType: "Primary manuscript archive", title: "Dead Sea Scrolls", detail: "High-resolution manuscript fragments and archive context from the Leon Levy Digital Library.", href: "https://www.deadseascrolls.org.il/", color: "#FFCC4D" },
  { sourceType: "Primary manuscript archive", title: "Enoch, Jubilees & Ethiopic Witnesses", detail: "A Bodleian collection path for Ethiopian and Eritrean manuscript research.", href: "https://digital.bodleian.ox.ac.uk/collections/ethiopian-and-eritrean/", color: "#9DEBFF" },
  { sourceType: "Primary and scholarly collection", title: "Gilgamesh & Sumerian Records", detail: "Cuneiform texts, artifact data, translations, and collection research from the ancient Middle East.", href: "https://cdli.earth/", color: "#FF9CC4" },
  { sourceType: "Museum archive", title: "Egyptian Texts & Material Culture", detail: "Institutional artifact documentation for ancient Egyptian papyri and related collection records.", href: "https://www.britishmuseum.org/collection/object/Y_EA10470-3", color: "#FFDEA0" },
  { sourceType: "Historical translation collection", title: "Hermetic & Emerald Tablet Studies", detail: "Historical translations and commentary pathways; source history and later interpretation remain distinct.", href: "https://sacred-texts.com/alc/emerald.htm", color: "#DCC8FF" },
  { sourceType: "Official digital archive", title: "Vatican Library Records", detail: "Official digitized manuscripts and catalog pathways from the Vatican Library.", href: "https://digi.vatlib.it/", color: "#00D4FF" },
  { sourceType: "Official and scholarly archives", title: "Tesla & Einstein Papers", detail: "Historical document and scholarly-edition pathways for Nikola Tesla and Albert Einstein.", href: "https://tesla-museum.org/en/legacy/archive/", color: "#00FF88" },
  { sourceType: "Public-domain classic", title: "Strategy Literature", detail: "A public-domain entry to Sun Tzu’s Art of War; modern strategy titles retain their own copyright and publisher paths.", href: "https://www.gutenberg.org/ebooks/132", color: "#FFCC4D" },
  { sourceType: "Government education", title: "Financial Literacy", detail: "Consumer financial education resources from the Consumer Financial Protection Bureau.", href: "https://www.consumerfinance.gov/consumer-tools/educator-tools/adult-financial-education/", color: "#B5F7CC" },
  { sourceType: "Government research archive", title: "Cosmic Science", detail: "NASA technical reports and research documentation for space science study.", href: "https://ntrs.nasa.gov/", color: "#9DEBFF" },
  { sourceType: "Museum collection", title: "Global Art History", detail: "The Metropolitan Museum of Art collection pathway for cross-cultural art-history discovery.", href: "https://www.metmuseum.org/art/collection", color: "#FF6B9A" },
] as const;

export default function LivingJourneyExperience() {
  useSovereignHeartbeat({ page: "living-journey-experience" });
  const [activeMovement, setActiveMovement] = useState(0);
  const movement = MOVEMENTS[activeMovement];
  const Icon = movement.icon;
  const progressLabel = useMemo(() => `${String(activeMovement + 1).padStart(2, "0")} / ${String(MOVEMENTS.length).padStart(2, "0")}`, [activeMovement]);

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_84%_16%,rgba(255,204,77,.18),transparent_25%),radial-gradient(circle_at_14%_68%,rgba(0,212,255,.18),transparent_34%),#050B1A]">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(transparent,#050B1A)]" aria-hidden="true" />
        <div className="container relative z-10 py-12 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/book-of-the-journey" className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">← BOOK OF THE JOURNEY</Link>
            <span className="rounded-full border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">FREE · ALL DIRECTIONS · NO GATE</span>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-[1.08fr_.92fr] xl:items-center">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#00D4FF]">SCROLLVERSE PRESENTS</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[.9] md:text-7xl">The Living <span className="text-[#FFCC4D]">Journey</span> Experience.</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A cinematic, free way to walk through the ScrollVerse: books, music, visual worlds, study, Islamic learning, contribution, community, roadmap context, and every next direction already open in the portal.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#B5F7CC]/40 bg-[#00FF88]/[.07] p-5">
                  <p className="text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">OWNER-AUTHORED · JOURNEY IDENTITY</p>
                  <p className="mt-2 text-2xl font-black text-white">“I’m a Walking Solution.”</p>
                  <p className="mt-2 text-sm leading-6 text-[#D6E2EE]">One free journey with many entrances—and a real route back to the next page every time.</p>
                </div>
                <div className="rounded-2xl border border-[#FFCC4D]/40 bg-[#FFCC4D]/[.07] p-5">
                  <p className="text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">OWNER-AUTHORED · ETHICAL ANCHOR</p>
                  <p className="mt-2 text-xl font-black leading-7 text-[#FFDEA0]">“Influence is currency. Power without principle is poison.”</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => document.getElementById("journey-map")?.scrollIntoView({ behavior: "smooth" })} className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Begin the journey</button>
                <Link href="/seerah" className="rounded-xl border border-[#B5F7CC]/45 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Explore Seerah</Link>
                <Link href="/99-names" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Open the 99 Names</Link>
              </div>
            </div>

            <figure className="group relative overflow-hidden rounded-[2rem] border border-[#FFCC4D]/45 bg-[#071426] shadow-[0_34px_100px_rgba(0,0,0,.48)]">
              <img src={HERO_ART} alt="Original ScrollVerse Living Journey artwork: a luminous figure walking from an open book toward radiating paths of music, film, learning, community, and a dawn horizon." className="min-h-[300px] w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(5,11,26,.96))] px-6 pb-6 pt-20"><p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">ORIGINAL SCROLLVERSE ART · LIVING JOURNEY</p><p className="mt-2 text-sm text-[#D6E2EE]">From the open page into every available direction.</p></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="container py-10"><PortalTrustLens lane="Living Journey Experience" source="Owner-authored navigation copy, original ScrollVerse hero art, existing registered ScrollVerse routes, and source-labeled learning pathways." readiness="Available now as a free route navigator. Individual music, media, private record, contribution, and external release conditions remain with their destination pages." boundary="This experience links only to existing portal routes. It does not treat a route as a product launch, rights clearance, payment option, or verified external outcome; each destination retains its own source, privacy, and release conditions." /></section>

      <section id="journey-map" className="container scroll-mt-10 py-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">THE JOURNEY MAP</p><h2 className="mt-2 text-3xl font-black">Choose a direction. Keep the whole world within reach.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C9D8E7]">Each movement opens a working ScrollVerse route and keeps its public operating state legible before you continue.</p></div>
          <span className="text-xs font-mono tracking-[.16em] text-[#AFC0CF]">MOVEMENT {progressLabel}</span>
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-[.78fr_1.22fr]">
          <div className="grid gap-2 self-start" aria-label="Living Journey movements">
            {MOVEMENTS.map((item, index) => {
              const MovementIcon = item.icon;
              const isActive = index === activeMovement;
              return <button key={item.title} type="button" onClick={() => setActiveMovement(index)} aria-current={isActive ? "step" : undefined} className="rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: isActive ? item.color : "rgba(255,255,255,.12)", background: isActive ? `${item.color}14` : "rgba(255,255,255,.02)" }}><span className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${item.color}15`, color: item.color }}><MovementIcon className="h-4 w-4" /></span><span><span className="block text-[10px] font-mono tracking-[.14em]" style={{ color: item.color }}>MOVEMENT {item.number}</span><span className="mt-0.5 block text-sm font-black text-white">{item.title}</span></span></span></button>;
            })}
          </div>

          <article className="relative overflow-hidden rounded-[2rem] border p-7 sm:p-10" style={{ borderColor: `${movement.color}77`, background: `radial-gradient(circle at 88% 10%, ${movement.color}1F, transparent 25%), linear-gradient(145deg, rgba(255,255,255,.06), rgba(5,11,26,.96) 56%)` }}>
            <Icon className="absolute right-7 top-7 h-28 w-28 text-white/[.045]" />
            <div className="relative max-w-3xl"><p className="text-xs font-mono tracking-[.18em]" style={{ color: movement.color }}>MOVEMENT {movement.number} · {movement.eyebrow.toUpperCase()}</p><h3 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{movement.title}</h3><p className="mt-5 max-w-2xl text-base leading-8 text-[#D6E2EE]">{movement.description}</p><span className="mt-6 inline-flex rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.14em]" style={{ borderColor: `${movement.color}66`, color: movement.color, background: `${movement.color}10` }}>{movement.state.toUpperCase()}</span><div className="mt-8 grid gap-3 sm:grid-cols-3">{movement.links.map((link) => <Link key={link.href} href={link.href} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-[#E4EDF5] transition hover:border-white/35 hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{link.label}<ArrowRight className="mt-3 h-4 w-4" style={{ color: movement.color }} /></Link>)}</div><Link href={movement.route} className="mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ background: movement.color }}>{movement.routeLabel}<ArrowRight className="h-4 w-4" /></Link></div>
          </article>
        </div>
      </section>

      <section className="mt-8 border-y border-white/10 bg-white/[.018]"><div className="container py-12"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">THE WHOLE PORTAL, NOT A DEAD END</p><h2 className="mt-2 text-3xl font-black">Roadmap, learning, creation, community—keep walking.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C9D8E7]">The Living Journey is an orientation layer. Use these waypoints whenever you want to step out of one story and see the full ScrollVerse terrain again.</p></div><Map className="h-10 w-10 text-[#B5F7CC]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{WAYPOINTS.map((waypoint) => <a key={waypoint.href} href={waypoint.href} className="rounded-3xl border bg-[#071426]/80 p-6 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: `${waypoint.color}55` }}><p className="text-xs font-mono tracking-[.14em]" style={{ color: waypoint.color }}>WAYPOINT</p><h3 className="mt-3 text-xl font-black text-white">{waypoint.label}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{waypoint.detail}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold" style={{ color: waypoint.color }}>Open direction <ArrowRight className="h-3.5 w-3.5" /></span></a>)}</div></div></section>

      <section className="container py-12"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">KNOWLEDGE LIBRARY · SOURCE-LABELED DISCOVERY</p><h2 className="mt-2 text-3xl font-black">A wider shelf for religion, philosophy, science, mathematics, and method.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#C9D8E7]">ScrollVerse keeps its own free learning routes at the center while opening a wider, source-labeled library for visitors who want to study across traditions and disciplines. These are external learning references, not ScrollVerse-owned books or endorsements.</p></div><BookOpen className="h-10 w-10 text-[#FFCC4D]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{KNOWLEDGE_SHELVES.map((shelf) => <a key={shelf.title} href={shelf.href} target="_blank" rel="noreferrer" className="rounded-3xl border bg-[#071426]/80 p-6 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: `${shelf.color}55` }}><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: shelf.color }}>EXTERNAL SOURCE · {shelf.lane.toUpperCase()}</p><h3 className="mt-3 text-xl font-black text-white">{shelf.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{shelf.detail}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold" style={{ color: shelf.color }}>Open learning source <ArrowRight className="h-3.5 w-3.5" /></span></a>)}</div><div className="mt-5 rounded-3xl border border-[#FFCC4D]/40 bg-[linear-gradient(135deg,rgba(255,204,77,.11),rgba(7,20,38,.96))] p-6 sm:p-7"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">OWNER-RECOMMENDED SEERAH READING · EXTERNAL PURCHASE PATH</p><h3 className="mt-2 text-2xl font-black text-white">The Sealed Nectar <span className="text-[#FFCC4D]">(Ar-Raheeq Al-Makhtum)</span></h3><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">A featured Seerah reading path by Safiur Rahman al-Mubarakpuri. This link opens Darussalam’s own book page; ScrollVerse does not sell, fulfill, or claim an affiliate relationship with the publisher.</p></div><a href="https://darussalam.com/sealed-nectar-ar-raheequl-makhtum/" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Open external book path <ArrowRight className="h-4 w-4" /></a></div></div></section>

      <section className="border-y border-white/10 bg-white/[.018]"><div className="container py-12"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">ARCHIVE &amp; ANCIENT TEXT CONSTELLATION</p><h2 className="mt-2 text-3xl font-black">Manuscripts, historical records, classic literature, and research collections.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#C9D8E7]">These highlighted shelves identify the type of record before you open it: primary manuscript archive, museum collection, historical translation collection, public-domain literature, government education, or a modern research archive. “Lost” and “forgotten” materials are approached through surviving witnesses and cataloged research paths.</p></div><Orbit className="h-10 w-10 text-[#9DEBFF]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{ARCHIVE_SHELVES.map((shelf) => <a key={shelf.title} href={shelf.href} target="_blank" rel="noreferrer" className="rounded-3xl border bg-[#071426]/85 p-6 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: `${shelf.color}55` }}><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: shelf.color }}>{shelf.sourceType.toUpperCase()}</p><h3 className="mt-3 text-xl font-black text-white">{shelf.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{shelf.detail}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold" style={{ color: shelf.color }}>Open record collection <ArrowRight className="h-3.5 w-3.5" /></span></a>)}</div><div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_.85fr]"><div className="rounded-3xl border border-[#DCC8FF]/40 bg-[#B98CFF]/[.08] p-7"><p className="text-[10px] font-mono tracking-[.16em] text-[#DCC8FF]">FAMILY LEGACY · OWNER-STATED HISTORY</p><h3 className="mt-3 text-2xl font-black text-white">A lineage record can be honored while each source keeps its own voice.</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">The owner’s family and lineage account is preserved through a dated first-party record. Family-held documents, genealogy research, community records, and historical archives are added only in their own source lanes as they become owner-approved for public context.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/harlem-vineland-legacy" className="rounded-xl bg-[#DCC8FF] px-4 py-3 text-sm font-black text-[#071426]">Open family legacy</Link><Link href="/book-of-the-journey" className="rounded-xl border border-[#DCC8FF]/45 bg-[#B98CFF]/10 px-4 py-3 text-sm font-black text-[#DCC8FF]">Return to the Book</Link></div></div><div className="rounded-3xl border border-[#00D4FF]/40 bg-[#00D4FF]/[.07] p-7"><p className="text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">READING METHOD</p><p className="mt-3 text-xl font-black text-white">Source first. Date visible. Interpretation named.</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Every collection stays linked to the source institution or publisher. Its materials, access terms, and interpretation remain their own.</p></div></div></div></section>

      <section id="story-studio" className="container scroll-mt-10 py-12"><div className="relative overflow-hidden rounded-[2rem] border border-[#FF6B9A]/45 bg-[radial-gradient(circle_at_88%_12%,rgba(255,107,154,.19),transparent_24%),radial-gradient(circle_at_8%_80%,rgba(0,212,255,.13),transparent_30%),#071426] p-7 sm:p-10"><Film className="absolute right-7 top-7 h-32 w-32 text-white/[.045]" /><div className="relative"><p className="text-xs font-mono tracking-[.18em] text-[#FF9CC4]">LIVING JOURNEY STORY STUDIO</p><h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl">Make the journey legible through original visual essays, films, cartoons, and history lessons.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">The Story Studio turns a source-labeled journey record into a production packet: a visual brief, a scene plan, an accessibility plan, and a release checklist. It is an original-production pathway, not an automatic publisher.</p><p className="mt-4 max-w-4xl border-l-2 border-[#FF9CC4] pl-4 text-sm leading-7 text-[#F5DCE6]">A book, archive, film, or lived experience can spark a new ScrollVerse work. The new work carries its own original title, characters, visual language, and source record; another creator’s protected expression remains in its own rights-aware lane.</p><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="rounded-3xl border border-[#FF9CC4]/45 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#FF9CC4]">01 · SOURCE</p><h3 className="mt-3 text-lg font-black">Start with a record</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Owner-authored account, original work, archive, or scholarly collection named before the story begins.</p></div><div className="rounded-3xl border border-[#9DEBFF]/45 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">02 · BLUEPRINT</p><h3 className="mt-3 text-lg font-black">Build the scene path</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Original characters, visual language, clip sequence, narration plan, and sound direction are defined first.</p></div><div className="rounded-3xl border border-[#B5F7CC]/45 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#B5F7CC]">03 · ACCESS</p><h3 className="mt-3 text-lg font-black">Make it reachable</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Captions, transcripts, descriptions, flash and sound review, and youth support are built into the packet.</p></div><div className="rounded-3xl border border-[#FFCC4D]/45 bg-black/20 p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#FFDEA0]">04 · RELEASE</p><h3 className="mt-3 text-lg font-black">Release by asset</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">The exact asset, rights, contributors, and destination must be ready before a public release can occur.</p></div></div><div className="mt-8 flex flex-wrap gap-3"><Link href="/creator-workspace" className="rounded-xl bg-[#FF9CC4] px-5 py-3 text-sm font-black text-[#071426]">Open creator workspace</Link><Link href="/junior-movies" className="rounded-xl border border-[#FF9CC4]/45 bg-[#FF6B9A]/10 px-5 py-3 text-sm font-black text-[#FF9CC4]">Explore Junior Movies</Link><Link href="/media-hub" className="rounded-xl border border-[#9DEBFF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Enter Media Hub</Link></div></div></div></section>

      <section className="border-y border-white/10 bg-white/[.018]"><div className="container py-12"><div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">TOKENIZATION-READINESS REGISTRY</p><h2 className="mt-3 text-3xl font-black">Catalog the record now. Choose the release path only when the asset is ready.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#C9D8E7]">Eligible original works, owner-authorized legacy materials, and research records can be organized in a per-asset registry. The registry supports free access, exchange, trade, or a later creator-selected release route. It does not assume payment, and it does not mean an asset is minted, listed, priced, sold, or connected to a wallet.</p><div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[#FFCC4D]/40 bg-[#FFCC4D]/[.07] p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#FFDEA0]">READY FOR RESEARCH</p><p className="mt-2 text-lg font-black">Identity · provenance · metadata</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Record the exact version, creator, source path, date, and correction route.</p></div><div className="rounded-2xl border border-[#FF6B9A]/40 bg-[#FF6B9A]/[.07] p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#FF9CC4]">REQUIRES OWNER RELEASE</p><p className="mt-2 text-lg font-black">Rights · contributors · destination</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">Resolve the exact rights, contributor terms, chain, destination, and release choice for the particular asset.</p></div><div className="rounded-2xl border border-[#00D4FF]/40 bg-[#00D4FF]/[.07] p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">ACCESSIBILITY</p><p className="mt-2 text-lg font-black">Description · transcript · sensitivity review</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">A collector or visitor should be able to understand what the asset is and how it is presented.</p></div><div className="rounded-2xl border border-[#B5F7CC]/40 bg-[#00FF88]/[.07] p-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#B5F7CC]">OWNER DECISION</p><p className="mt-2 text-lg font-black">Free · exchange · trade · later release</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">A completed packet supports a creator choice without causing a contract, marketplace, financial, or wallet action.</p></div><div className="rounded-2xl border border-[#DCC8FF]/40 bg-[#B98CFF]/[.07] p-5 sm:col-span-2"><p className="text-[10px] font-mono tracking-[.14em] text-[#DCC8FF]">IMMUTABLE-STYLE EVIDENCE TRAIL</p><p className="mt-2 text-lg font-black">Dated source · version · creator · rights · correction · release event</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">The record retains a transparent chain of dated updates and corrections for each asset. It is a portal evidence trail, not a claim that a blockchain transaction or irreversible contract has already occurred.</p></div></div><Link href="/nft-monetization-blueprint" className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Open the tokenization blueprint <ArrowRight className="h-4 w-4" /></Link></div><aside className="rounded-3xl border border-[#B98CFF]/40 bg-[#071426] p-7"><p className="text-[10px] font-mono tracking-[.16em] text-[#DCC8FF]">RELEASE STATE</p><h3 className="mt-3 text-2xl font-black">One asset. One packet. One clear destination.</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The registry tracks what is present, what is still research, and what needs an owner release. It keeps a production concept from being mistaken for a public offering or a deployed token.</p><div className="mt-7 border-t border-white/10 pt-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#AFC0CF]">CURRENT BOUNDARY</p><p className="mt-2 text-sm leading-7 text-[#C9D8E7]">Mainnet broadcast, minting, marketplace listing, pricing, payment, and wallet connection remain outside this discovery panel until a specific asset’s release record is complete.</p></div></aside></div></div></section>

      <section className="container py-12"><div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><div className="rounded-3xl border border-[#B5F7CC]/35 bg-[linear-gradient(135deg,rgba(0,255,136,.12),rgba(5,11,26,.92))] p-7"><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">ISLAMIC LEARNING PATHWAYS</p><h2 className="mt-3 text-3xl font-black">Seerah and the 99 Names remain inside the journey—not off to the side.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">These free pages are positioned as core learning directions in the ScrollVerse experience. Start with the Seerah, explore the 99 Names, or follow a moment in the timeline when you want a more focused entry.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/seerah" className="rounded-xl bg-[#B5F7CC] px-4 py-3 text-sm font-black text-[#071426]">Open Seerah</Link><Link href="/99-names" className="rounded-xl border border-[#B5F7CC]/45 bg-[#00FF88]/10 px-4 py-3 text-sm font-black text-[#B5F7CC]">99 Names</Link><Link href="/seerah/timeline" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-4 py-3 text-sm font-black text-[#FFDEA0]">Timeline</Link><Link href="/seerah/al-farewell" className="rounded-xl border border-[#9DEBFF]/45 bg-[#00D4FF]/10 px-4 py-3 text-sm font-black text-[#9DEBFF]">Farewell Path</Link></div></div><aside className="rounded-3xl border border-[#B98CFF]/35 bg-[#071426] p-7"><Compass className="h-8 w-8 text-[#DCC8FF]" /><h2 className="mt-4 text-2xl font-black">Free to enter. Designed to continue.</h2><p className="mt-3 text-sm leading-7 text-[#C9D8E7]">The experience remains free to use. A visitor can choose one doorway, follow every route, return to the roadmap, or pause and come back without an artificial finish line.</p><Link href="/open-record-continuum" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#DCC8FF]">Understand the open record <ArrowRight className="h-4 w-4" /></Link><div className="mt-7 border-t border-white/10 pt-5"><p className="text-[10px] font-mono tracking-[.14em] text-[#AFC0CF]">LIVING SIGNAL</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">KUN FAYAKŪN × ∞</p></div></aside></div></section>
    </main>
  );
}
