import { ArrowRight, BookOpen, Clapperboard, ExternalLink, Gamepad2, Palette, Sparkles, Users } from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type AtlasSource = {
  title: string;
  href: string;
  label: string;
  concepts: string[];
  state: "available" | "research" | "recovery";
};

const ATLAS_LANES: Array<{ title: string; kicker: string; detail: string; accent: string; icon: typeof Sparkles; source: string; firstParty: string; sources: AtlasSource[] }> = [
  {
    title: "Story + character worlds",
    kicker: "ORIGINAL WORLDS",
    detail: "A central continuation for the Accord Gate, restoration pathways, character concepts, civic-memory worlds, and youth-learning signals surfaced by creator-supplied destinations.",
    accent: "#B98CFF",
    icon: Users,
    source: "Carry the Accord and Sovereign Archive",
    firstParty: "/scrollverse-story-worlds",
    sources: [
      { title: "Carry the Accord", href: "https://scrollverse-gjhhowxn.manus.space", label: "OWNER-SUPPLIED MANUS DESTINATION", concepts: ["Accord Gate", "Discover · Restore · Open", "Nia, Orun + Miro", "AI Legion project index"], state: "available" },
      { title: "The Sovereign Archive", href: "https://sovereignhub-mo62pcrx.manus.space/", label: "OWNER-SUPPLIED MANUS DESTINATION", concepts: ["Afrofuturist memory commons", "Lumenwright", "civic restoration", "Omniland youth-learning signals"], state: "available" },
      { title: "Black Batman Chronicles · Episode 3", href: "https://manus.im/share/file/b76c3293-b27a-44c3-a8ef-6f9a5cb5f3c8", label: "MANUS NARRATIVE SOURCE", concepts: ["fictional episode record", "narrative source trail", "future production pathway"], state: "available" },
    ],
  },
  {
    title: "Visual + fashion worlds",
    kicker: "VISUAL CULTURE",
    detail: "Source-led access to wearable culture, digital fashion, Orbit Series context, Guardian Circle concepts, and visual release treatments—now gathered beside the ScrollVerse visual and lookbook pathways.",
    accent: "#FFCC4D",
    icon: Palette,
    source: "Celestial Atelier, MEIN Music Lookbook Manifest, and Catalog Sourcebook",
    firstParty: "/evolution-lookbook",
    sources: [
      { title: "Celestial Atelier", href: "https://scrollshop-vxg9x8ac.manus.space", label: "OWNER-SUPPLIED MANUS DESTINATION", concepts: ["wearable culture", "Orbit Series", "Partner Thread", "Guardian Circle"], state: "available" },
      { title: "MEIN ∞ Music Lookbook Manifest", href: "https://chaislookboo-c7rdxmdf.manus.space", label: "OWNER-SUPPLIED MANUS DESTINATION", concepts: ["Afrofuturism", "sonic archive", "digital fashion", "frequency resonance"], state: "available" },
      { title: "Catalog Sourcebook", href: "https://scrollport-ccbm4cgm.manus.space/catalog", label: "OWNER-SUPPLIED MANUS DESTINATION", concepts: ["artist discovery", "visual release treatments", "geometric themes", "creator-owned futures"], state: "available" },
    ],
  },
  {
    title: "Music + media worlds",
    kicker: "SOUND + SCREEN",
    detail: "The media lane keeps music, channel architecture, cinematic culture, production, and creator-selected distribution ideas connected as a source trail that returns to ScrollVerse for the next practical path.",
    accent: "#00D4FF",
    icon: Clapperboard,
    source: "Sovereign Pattern Engine, Cable Channel Architecture, and OmniMedia references",
    firstParty: "/film-animation-studio",
    sources: [
      { title: "The Sovereign Pattern Engine", href: "https://scrollverse-cjisspe9.manus.space/", label: "OWNER-SUPPLIED MANUS DESTINATION", concepts: ["cinematic culture home", "pattern engine", "frequency alignment", "creator-economy context"], state: "available" },
      { title: "YouTube Cable Channel Architecture", href: "https://manus.im/share/file/0253bae6-1887-46ca-837c-11ec31d0e57d", label: "MANUS SHARED SOURCE", concepts: ["channel design", "production planning", "creative schedule", "media pathway"], state: "research" },
      { title: "OmniMedia Matrix", href: "https://scrollhub-5edfkvsp.manus.space", label: "OWNER-SUPPLIED MANUS DESTINATION", concepts: ["external source destination", "recovery path"], state: "recovery" },
    ],
  },
  {
    title: "Game + learning worlds",
    kicker: "PLAY + PRACTICE",
    detail: "A central gateway for original play concepts, browser-local delivery research, accessible interaction lanes, creative practice, and youth-supportive learning pathways.",
    accent: "#00FF88",
    icon: Gamepad2,
    source: "Omniland routes, Game Worlds Studio, and Art Learning + Practice Studio",
    firstParty: "/game-worlds-studio",
    sources: [
      { title: "Omniland Embodied Play", href: "/omniland-embodied-play", label: "FIRST-PARTY SCROLLVERSE ROUTE", concepts: ["hands-first research", "adaptive participation", "linear controls", "edition research"], state: "available" },
      { title: "Game Worlds Studio", href: "/game-worlds-studio", label: "FIRST-PARTY SCROLLVERSE ROUTE", concepts: ["hero worlds", "sport concepts", "action + history", "financial-literacy play"], state: "available" },
      { title: "Art Learning + Practice Studio", href: "https://manus.im/share/file/c4d30397-41d8-49b0-a2bb-16a69468ce42", label: "MANUS SHARED SOURCE", concepts: ["learning studio", "practice standard", "youth-safe context", "AI-station design"], state: "available" },
    ],
  },
];

const stateCopy = { available: "AVAILABLE SOURCE", research: "RESEARCH CONTEXT", recovery: "EXTERNAL RECOVERY PATH" } as const;

export default function OmnilandSourceAtlas() {
  useSovereignHeartbeat({ page: "omniland-source-atlas" });
  return <main className="min-h-screen bg-[#040914] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="relative overflow-hidden border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_12%_14%,rgba(0,212,255,.18),transparent_26%),radial-gradient(circle_at_86%_12%,rgba(185,140,255,.16),transparent_30%),linear-gradient(135deg,#040914,#09172A_58%,#081023)]"><div className="container py-12 md:py-18"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/omniland" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← OMNILAND DISCOVERY WORLD</Link><span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1.5 text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">CENTRAL CREATOR-OWNED SOURCE ATLAS</span></div><div className="mt-14 grid gap-9 xl:grid-cols-[1.15fr_.85fr] xl:items-end"><div><p className="text-xs font-mono tracking-[.24em] text-[#9DEBFF]">SCROLLVERSE · OMNILAND SOURCE ATLAS</p><h1 className="mt-5 max-w-5xl text-5xl font-black leading-[.9] tracking-[-.04em] md:text-7xl">Bring the worlds<br/><span className="text-[#FFDEA0]">into one home.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This is the central ScrollVerse migration map for accessible creator-owned concepts, visual culture, story worlds, music and media paths, game worlds, and learning records. Each lane keeps its source visible while giving visitors a first-party place to continue.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#atlas-lanes" className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#04101E]">Explore the atlas <ArrowRight className="h-4 w-4" /></a><Link href="/omniland" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-5 py-3 text-sm font-black text-white">Return to Omniland <Sparkles className="h-4 w-4" /></Link></div></div><aside className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.055] p-7"><BookOpen className="h-8 w-8 text-[#FFE09A]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#FFE09A]">MIGRATION PRINCIPLE</p><h2 className="mt-3 text-2xl font-black">Concepts travel with their source trail.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">ScrollVerse centralizes public concept records, editorial context, and direct pathways. Page artwork remains original here unless a creator-controlled visual is supplied for reuse; external accounts and releases retain their own exact records.</p></aside></div></div></section>
    <section className="container py-9"><PortalTrustLens lane="Omniland Source Atlas" source="Creator-supplied Manus and ScrollVerse destinations inventoried in the Phase 841 Creator-Owned Omniland Source Inventory." readiness="Four central source lanes and their first-party ScrollVerse continuation paths are available now. External destinations open separately and retain their own current experience state." boundary="This Atlas consolidates visible concepts, source context, and visitor pathways. It does not reproduce restricted artwork, infer an external account state, or turn a source page into a release, transaction, partnership, or provider operation." /></section>
    <section id="atlas-lanes" className="container py-8"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.2em] text-[#B5F7CC]">FOUR CENTRAL LANES</p><h2 className="mt-3 text-4xl font-black md:text-5xl">Every concept has a next path.</h2></div><p className="max-w-xl text-sm leading-7 text-[#C8D8E7]">Use the first-party continuation links for the ScrollVerse experience, or open the labeled creator-supplied destination to follow its original context.</p></div><div className="mt-8 grid gap-6">{ATLAS_LANES.map((lane) => { const Icon = lane.icon; return <article key={lane.title} className="overflow-hidden rounded-[2rem] border bg-[#071426]/90" style={{ borderColor: `${lane.accent}4d` }}><div className="grid gap-6 p-7 xl:grid-cols-[.78fr_1.22fr]"><div><span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${lane.accent}18`, color: lane.accent }}><Icon className="h-6 w-6"/></span><p className="mt-6 text-[10px] font-mono tracking-[.16em]" style={{ color: lane.accent }}>{lane.kicker}</p><h3 className="mt-3 text-3xl font-black">{lane.title}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{lane.detail}</p><p className="mt-5 text-[11px] leading-5 text-[#B8C7D6]">Source basis: {lane.source}</p><Link href={lane.firstParty} className="mt-6 inline-flex items-center gap-2 text-sm font-black" style={{ color: lane.accent }}>Open ScrollVerse path <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-3 md:grid-cols-3">{lane.sources.map((source) => { const content = <><div className="flex items-start justify-between gap-3"><span className="text-[9px] font-mono tracking-[.12em]" style={{ color: lane.accent }}>{source.label}</span>{source.href.startsWith("/") ? <ArrowRight className="h-4 w-4" style={{ color: lane.accent }} /> : <ExternalLink className="h-4 w-4" style={{ color: lane.accent }} />}</div><h4 className="mt-4 text-lg font-black leading-tight">{source.title}</h4><div className="mt-4 flex flex-wrap gap-1.5">{source.concepts.map(concept => <span key={concept} className="rounded-full border border-white/10 bg-white/[.035] px-2 py-1 text-[9px] font-mono text-[#C8D8E7]">{concept}</span>)}</div><p className="mt-5 text-[9px] font-mono tracking-[.12em]" style={{ color: lane.accent }}>{stateCopy[source.state]}</p></>; return source.href.startsWith("/") ? <Link key={source.title} href={source.href} className="group rounded-2xl border border-white/10 bg-[#030914]/65 p-5 transition hover:-translate-y-0.5" >{content}</Link> : <a key={source.title} href={source.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-[#030914]/65 p-5 transition hover:-translate-y-0.5">{content}</a>; })}</div></div></article>; })}</div></section>
    <section className="container py-8"><div className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.055] p-7 md:p-9"><div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-mono tracking-[.18em] text-[#DCC8FF]">SCROLLVERSE CENTRAL HOME</p><h2 className="mt-3 text-3xl font-black">The source stays visible. The journey stays open.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Use this Atlas as the bridge back into Omniland, the Creator Atlas, visual worlds, story records, and source-label pathways. When a creator-controlled visual, video, comic sequence, or game artifact is supplied for release, this structure is ready to receive its dedicated record.</p></div><div className="flex flex-wrap gap-3"><Link href="/omniland" className="inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-5 py-3 text-sm font-black text-[#0A0B1A]">Enter Omniland <ArrowRight className="h-4 w-4" /></Link><Link href="/creator-atlas" className="inline-flex items-center gap-2 rounded-xl border border-[#DCC8FF]/50 px-5 py-3 text-sm font-black text-[#E7DEFF]">Creator Atlas <BookOpen className="h-4 w-4" /></Link></div></div></div></section>
  </main>;
}
