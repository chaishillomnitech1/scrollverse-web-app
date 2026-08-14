import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, BookOpen, ChevronDown, Compass, MapPin, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const HERO = "/manus-storage/xlviii-blocks-hero_83f80e44.jpg";
const LIBRARY = "/manus-storage/xlviii-blocks-material-library_636e7e5f.jpg";
const TABLE = "/manus-storage/xlviii-blocks-table-after-tide_aa414602.jpg";
const NIGHT = "/manus-storage/xlviii-blocks-boardwalk-nocturne_4cda3b22.jpg";

const atlas = [
  {
    number: "01",
    title: "Table after tide",
    tag: "DINING CONTEXT",
    copy: "A dining chapter composed as atmosphere: oyster-shell linen, amber glass, ocean-dark windows, and the patient glow of a room held after sunset.",
    source: "Visit Atlantic City’s Restaurants & Bars directory",
    href: "https://www.visitatlanticcity.com/food-drink/",
  },
  {
    number: "02",
    title: "Play / drift / return",
    tag: "ACTIVITY CONTEXT",
    copy: "A day-to-night rhythm of beach, Boardwalk, rides, mini golf, cruises, performance, and the long walk back toward the water.",
    source: "Visit Atlantic City’s Beaches & Boardwalk guide",
    href: "https://www.visitatlanticcity.com/things-to-do/beaches-boardwalk/",
  },
  {
    number: "03",
    title: "Cultural markers",
    tag: "POINTS OF INTEREST",
    copy: "Murals, memorials, the lighthouse, Steel Pier, the Orange Loop, Ducktown, beach, and Boardwalk form a living reference map—not a claim of affiliation.",
    source: "Visit Atlantic City and VisitNJ destination profiles",
    href: "https://visitnj.org/city/atlantic-city",
  },
];

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#e7c4a4] transition hover:text-white">{children}<ArrowUpRight className="h-3.5 w-3.5" /></a>;
}

export default function XLVIIIBlocksMonograph() {
  useSovereignHeartbeat({ page: "xlviii-blocks-monograph" });
  const [showRecord, setShowRecord] = useState(false);

  return <main className="min-h-screen overflow-x-hidden bg-[#101214] text-[#F3EEE8]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="relative isolate min-h-[92vh] overflow-hidden border-b border-white/10">
      <img src={HERO} alt="Original Atlantic City-inspired coastal architecture concept for the XLVIII Blocks monograph" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,12,15,.92)_0%,rgba(10,12,15,.55)_40%,rgba(10,12,15,.18)_74%,rgba(10,12,15,.48)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-[#101214] to-transparent" />
      <header className="relative mx-auto flex max-w-[1600px] items-center justify-between px-5 py-6 sm:px-10 lg:px-14">
        <Link href="/" className="text-[11px] font-black tracking-[.2em] text-white transition hover:text-[#efc49c]">SCROLLVERSE.CO</Link>
        <div className="hidden items-center gap-3 text-[10px] font-bold tracking-[.18em] text-white/70 sm:flex"><span className="h-px w-7 bg-[#efc49c]" />XLVIII BLOCKS LLC</div>
        <span className="rounded-full border border-white/25 px-3 py-1.5 text-[9px] font-bold tracking-[.16em] text-white/80">VOL. 01</span>
      </header>
      <div className="mx-auto flex min-h-[72vh] max-w-[1600px] flex-col justify-end px-5 pb-12 pt-16 sm:px-10 sm:pb-16 lg:px-14 lg:pb-20">
        <div className="max-w-4xl">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-bold tracking-[.22em] text-[#efc49c]"><MapPin className="h-3.5 w-3.5" />ATLANTIC CITY, NEW JERSEY · EDITORIAL REFERENCE LAYER</div>
          <h1 className="max-w-4xl text-6xl leading-[.78] tracking-[-.075em] text-[#F5F0EB] sm:text-8xl lg:text-[9.6rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>XLVIII<br /><em className="font-normal text-[#efc49c]">BLOCKS</em></h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">An interiors monograph for the coastal room: stone, salt, lacquer, brass, story, and the long horizon that keeps a city in motion.</p>
        </div>
        <div className="mt-12 flex items-end justify-between border-t border-white/20 pt-4 text-[10px] font-bold uppercase tracking-[.16em] text-white/65"><span>ScrollVerse × XLVIII Blocks</span><span>Design study / not a travel offer</span></div>
      </div>
    </section>

    <section className="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20 lg:px-14 lg:py-32">
      <div><p className="text-[10px] font-bold tracking-[.2em] text-[#e8b889]">01 / THE PROPOSITION</p><div className="mt-4 h-px w-16 bg-[#e8b889]" /></div>
      <div><p className="max-w-4xl text-3xl leading-[1.12] tracking-[-.035em] text-[#EEE6DD] sm:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>A place is never only its address. It is the weight of the door, the cool of the stone, the ocean held at the edge of a window.</p><p className="mt-8 max-w-2xl text-sm leading-7 text-[#b8b2aa] sm:text-base">This single-edition digital monograph uses an original ScrollVerse × XLVIII Blocks editorial lens to study an Atlantic City-inspired coastal interior world. The architectural photographs on this page are original editorial images; real destination context is separately source-labeled so readers can distinguish atmosphere from a verifiable destination record.</p></div>
    </section>

    <section className="relative mx-auto max-w-[1720px] px-3 sm:px-6 lg:px-10"><div className="overflow-hidden rounded-[2rem] border border-white/10"><img src={LIBRARY} alt="Original fictional coastal reading salon with stone, boucle, walnut, and rose-gold material details" className="h-[60vh] w-full object-cover sm:h-[76vh]" /></div><div className="mx-auto -mt-14 max-w-4xl rounded-t-[1.75rem] bg-[#101214] px-6 pt-8 sm:-mt-20 sm:px-12 sm:pt-12"><p className="text-[10px] font-bold tracking-[.2em] text-[#e8b889]">MATERIAL STUDY / 01</p><h2 className="mt-3 text-3xl text-[#F5F0EB] sm:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>The long room holds the weather.</h2><p className="mt-5 max-w-2xl pb-2 text-sm leading-7 text-[#aaa49d]">Travertine grounds the room. Boucle softens it. Ebony gathers its shadows. Rose-gold asks the eye to pause before the ocean answers.</p></div></section>

    <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 lg:px-14 lg:py-32"><div className="flex flex-wrap items-end justify-between gap-8"><div><p className="text-[10px] font-bold tracking-[.2em] text-[#e8b889]">02 / THE FIELD GUIDE</p><h2 className="mt-3 text-4xl tracking-[-.04em] sm:text-6xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>A city, read slowly.</h2></div><p className="max-w-sm text-sm leading-6 text-[#aaa49d]">Three source-labeled chapters for an unhurried visit. Confirm details directly with the cited destination sources.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">{atlas.map((entry) => <article key={entry.number} className="min-h-[340px] bg-[#171A1C] p-7 sm:p-9"><div className="flex items-start justify-between"><span className="text-4xl text-[#e8b889]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{entry.number}</span><Compass className="h-5 w-5 text-white/35" /></div><p className="mt-14 text-[10px] font-bold tracking-[.18em] text-[#e8b889]">{entry.tag}</p><h3 className="mt-3 text-2xl text-[#F5F0EB]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{entry.title}</h3><p className="mt-4 text-sm leading-6 text-[#b8b2aa]">{entry.copy}</p><div className="mt-7"><SourceLink href={entry.href}>{entry.source}</SourceLink></div></article>)}</div></section>

    <section className="grid overflow-hidden border-y border-white/10 bg-[#171A1C] lg:grid-cols-2"><div className="min-h-[550px] overflow-hidden"><img src={TABLE} alt="Original fictional coastal dining interior with amber glassware, linen, and ocean-facing windows" className="h-full w-full object-cover" /></div><div className="flex min-h-[550px] flex-col justify-between p-8 sm:p-14 lg:p-20"><div><p className="text-[10px] font-bold tracking-[.2em] text-[#e8b889]">03 / TABLE AFTER TIDE</p><h2 className="mt-5 max-w-xl text-5xl leading-[.95] tracking-[-.04em] text-[#F5F0EB] sm:text-7xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>The room begins after the last bright thing leaves.</h2><p className="mt-8 max-w-lg text-sm leading-7 text-[#b8b2aa] sm:text-base">In this imagined dining room, salt air meets ceramic, hand-blown glass, and a table that takes its time. It is an original editorial scene, not an image of, endorsement by, or reservation at an actual restaurant.</p></div><div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-[10px] font-bold tracking-[.15em] text-[#aaa49d]"><span>AMBER / WALNUT</span><span>OYSTER / LINEN</span><span>ROSE-GOLD / FLAME</span><span>OCEAN / NIGHT</span></div></div></section>

    <section className="relative isolate overflow-hidden px-5 py-24 sm:px-10 lg:px-14 lg:py-32"><img src={NIGHT} alt="Original imagined Atlantic City boardwalk nocturne with wet timber, dune grass, and rose-gold architectural lighting" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" /><div className="absolute inset-0 -z-10 bg-[#101214]/75" /><div className="mx-auto max-w-[1150px]"><p className="text-[10px] font-bold tracking-[.2em] text-[#efc49c]">04 / THE COLLECTION RECORD</p><h2 className="mt-4 max-w-4xl text-5xl leading-[.95] tracking-[-.05em] sm:text-7xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>A publication can be prepared with care before it is ever offered.</h2><p className="mt-8 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">The monograph is collectible-ready as a record of original editorial work, source context, visual inventory, and review requirements. It is not minted, listed, or for sale. No wallet, token, NFT, transfer, or offer is created here.</p><button type="button" onClick={() => setShowRecord((value) => !value)} className="mt-8 inline-flex items-center gap-3 border border-[#efc49c]/60 px-5 py-3 text-[10px] font-bold tracking-[.16em] text-[#efc49c] transition hover:bg-[#efc49c] hover:text-[#101214]">{showRecord ? "HIDE RECORD LAYERS" : "VIEW RECORD LAYERS"}<ChevronDown className={`h-4 w-4 transition ${showRecord ? "rotate-180" : ""}`} /></button>{showRecord && <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 md:grid-cols-3">{[["ORIGINAL EDITORIAL WORK","Approved copy, edition identifier, source register, and layout version."],["VISUAL ASSET INVENTORY","Original image source, intended use, rights/review state, alt text, and file-integrity record."],["FUTURE RELEASE GATE","Contract, security, terms, consumer, wallet, pricing, and owner release decision—none complete here."]].map(([title, copy]) => <div key={title} className="bg-[#15181A]/95 p-6"><p className="text-[10px] font-bold tracking-[.16em] text-[#efc49c]">{title}</p><p className="mt-3 text-sm leading-6 text-white/70">{copy}</p></div>)}</div>}</div></section>

    <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 lg:px-14"><PortalTrustLens lane="XLVIII Blocks editorial monograph" source="Original ScrollVerse imagery and writing; destination context linked to Visit Atlantic City and VisitNJ sources retrieved August 14, 2026." readiness="Editorial route and collectible/provenance preparation are available. This is not a venue directory, partnership page, booking page, or commercial collectible release." boundary="A source, record, or interpretation is not proof of affiliation, ownership, availability, authorization, or commercial outcome. Visitors can follow the cited sources, bring corrections, and form their own interpretation." /><div className="mt-12 grid gap-8 border-t border-white/10 pt-12 lg:grid-cols-[1fr_.8fr]"><div><p className="text-[10px] font-bold tracking-[.2em] text-[#e8b889]">TRANSPARENCY LENS</p><h2 className="mt-4 text-4xl leading-[1.02] sm:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Present the record.<br />Leave room for the reader.</h2></div><div className="space-y-4 text-sm leading-7 text-[#aaa49d]"><p><b className="text-[#F5F0EB]">Context type:</b> Original editorial concept plus source-labeled real-world destination context.</p><p><b className="text-[#F5F0EB]">Limit:</b> Source labels support inquiry; they do not establish affiliation, rights, availability, ownership, endorsement, or a commercial relationship.</p><p><b className="text-[#F5F0EB]">Correction path:</b> Readers can bring an updated official source or contextual correction through the portal’s co-creation route.</p><Link href="/co-creation-navigator" className="inline-flex items-center gap-2 font-bold text-[#e8b889] transition hover:text-white">Open the co-creation pathway <ArrowDownRight className="h-4 w-4" /></Link></div></div></section>

    <footer className="border-t border-white/10 bg-[#0a0c0d] px-5 py-14 sm:px-10 lg:px-14"><div className="mx-auto flex max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold tracking-[.22em] text-[#e8b889]">SCROLLVERSE.CO × XLVIII BLOCKS LLC</p><p className="mt-3 text-2xl text-[#F5F0EB]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>The coastal room, kept in public memory.</p></div><div className="flex flex-wrap gap-3"><Link href="/empire-asset-navigator" className="inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-[10px] font-bold tracking-[.14em] text-white/80 transition hover:border-[#e8b889] hover:text-[#e8b889]"><BookOpen className="h-3.5 w-3.5" />ASSET NAVIGATOR</Link><Link href="/" className="inline-flex items-center gap-2 bg-[#e8b889] px-4 py-3 text-[10px] font-bold tracking-[.14em] text-[#101214] transition hover:bg-[#F5F0EB]"><Sparkles className="h-3.5 w-3.5" />RETURN TO SCROLLVERSE</Link></div></div></footer>
  </main>;
}
