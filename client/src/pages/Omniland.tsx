import { ArrowRight, BookOpen, ExternalLink, Film, Gamepad2, Map, Orbit, Play, PlayCircle, Sparkles, Wand2 } from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const HERO = "/manus-storage/omniland-hero_78e42db3.png";

const WORLDS = [
  {
    eyebrow: "CINEMATIC PATH",
    title: "Film + animation commons",
    detail: "Move through original episode, animation, sound, edit, and accessibility preparation paths with creator context held in view.",
    href: "/film-animation-studio",
    image: "/manus-storage/omniland-cinematic-gate-v2_986ca22c.png",
    accent: "#FFCC4D",
    icon: Film,
  },
  {
    eyebrow: "PLAY PATH",
    title: "Game worlds studio",
    detail: "Explore original hero, sport, action, history, and learning-led game concepts alongside their dedicated research routes.",
    href: "/game-worlds-studio",
    image: "/manus-storage/omniland-play-district-v2_f9e35760.png",
    accent: "#00D4FF",
    icon: Gamepad2,
  },
  {
    eyebrow: "STORY PATH",
    title: "Story vault",
    detail: "Follow creator records into visual story worlds, comic and animation concept lanes, book artifacts, and local production packets.",
    href: "/scrollverse-story-worlds",
    image: "/manus-storage/omniland-story-vault-v2_bd1fcaa1.png",
    accent: "#B98CFF",
    icon: BookOpen,
  },
] as const;

const FIRST_PARTY_PATHS = [
  { title: "Omniland Delivery", detail: "Browse the current browser-local Omniland entry and its device-aware concept lanes.", href: "/omniland-consoleless-delivery", accent: "#00FF88", icon: Orbit },
  { title: "Embodied Play", detail: "Explore accessible motion, hand, controller, and standard-input research with player choice at the center.", href: "/omniland-embodied-play", accent: "#9DEBFF", icon: Wand2 },
  { title: "Game Systems Contribution", detail: "Review the source-led game-systems contribution pathway and its next research handoffs.", href: "/omniland-game-systems-contribution", accent: "#FF8DB5", icon: Sparkles },
  { title: "Meta AI Artifacts", detail: "Open the source-labeled lookbook and visual-artifact discovery record already held in ScrollVerse.", href: "/meta-ai-artifacts-lookbooks", accent: "#FFE09A", icon: Map },
] as const;

const MANUS_CONNECTIONS = [
  { title: "ScrollVerse Catalog Sourcebook", href: "https://scrollport-ccbm4cgm.manus.space/catalog", kind: "MANUS PORTAL", state: "AVAILABLE SOURCE" },
  { title: "ScrollVerse Creator Commons", href: "https://scrollverse-cjisspe9.manus.space/", kind: "MANUS PORTAL", state: "AVAILABLE SOURCE" },
  { title: "ScrollVerse OmniMedia Matrix", href: "https://scrollhub-5edfkvsp.manus.space", kind: "MANUS PORTAL", state: "AVAILABLE SOURCE" },
  { title: "Chais Lookbook Manifest", href: "https://chaislookboo-c7rdxmdf.manus.space", kind: "MANUS PORTAL", state: "AVAILABLE SOURCE" },
  { title: "ScrollVerse Sovereign Media Workspace", href: "https://scrollverse-3mddshgp.manus.space/", kind: "MANUS PORTAL", state: "AVAILABLE SOURCE" },
  { title: "Omniscale Execution Master Plan", href: "https://manus.im/share/file/bcfe02ed-8003-436e-8e83-d68817e637e2", kind: "MANUS SHARED SOURCE", state: "RESEARCH CONTEXT" },
  { title: "YouTube Cable Channel Architecture", href: "https://manus.im/share/file/0253bae6-1887-46ca-837c-11ec31d0e57d", kind: "MANUS SHARED SOURCE", state: "RESEARCH CONTEXT" },
  { title: "ScrollVerse Trinity Presentation", href: "https://manus.im/share/file/5105792b-2951-4fe0-b5e8-4dce43f421fe", kind: "MANUS SHARED SOURCE", state: "AVAILABLE SOURCE" },
  { title: "Artifact Evidence + Readiness Standard", href: "https://manus.im/share/file/0f74994c-d791-4454-b48a-9b08c3240b7e", kind: "MANUS SHARED SOURCE", state: "AVAILABLE SOURCE" },
  { title: "Art Learning + Practice Studio", href: "https://manus.im/share/file/c4d30397-41d8-49b0-a2bb-16a69468ce42", kind: "MANUS SHARED SOURCE", state: "AVAILABLE SOURCE" },
  { title: "User Onboarding Metrics Report", href: "https://manus.im/share/file/b0ccd334-adf6-41c5-b812-10457f8445c9", kind: "MANUS SHARED SOURCE", state: "RESEARCH CONTEXT" },
  { title: "Accelerated Timeline Strategy", href: "https://manus.im/share/file/a24e0104-a88c-463c-942b-487e0cd7e4e7", kind: "MANUS SHARED SOURCE", state: "RESEARCH CONTEXT" },
  { title: "ScrollVerse Instagram Content Engine", href: "https://manus.im/share/file/2a046aad-9042-4297-a9b8-7962cf29fcff", kind: "MANUS SHARED SOURCE", state: "AVAILABLE SOURCE" },
  { title: "OmniMedia Matrix Integration Handoff", href: "https://manus.im/share/file/d8c9373f-6bf7-4f09-a65f-ad2c8508e664", kind: "MANUS SHARED SOURCE", state: "RESEARCH CONTEXT" },
  { title: "Black Batman Chronicles · Episode 3", href: "https://manus.im/share/file/b76c3293-b27a-44c3-a8ef-6f9a5cb5f3c8", kind: "MANUS NARRATIVE SOURCE", state: "AVAILABLE SOURCE" },
] as const;

export default function Omniland() {
  useSovereignHeartbeat({ page: "omniland" });

  return (
    <main className="min-h-screen overflow-hidden bg-[#040914] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative isolate border-b border-[#00D4FF]/20">
        <img src={HERO} alt="Original Omniland visual: a luminous future city and portal floating above a midnight ocean" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-75" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,9,20,.98)_0%,rgba(4,9,20,.82)_42%,rgba(4,9,20,.25)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[linear-gradient(0deg,#040914_0%,rgba(4,9,20,.06)_100%)]" />
        <div className="container py-10 md:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← SCROLLVERSE HOME</Link><span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1.5 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">OMNILAND · DISCOVERY WORLD</span></div>
          <div className="mt-20 max-w-3xl pb-10 md:mt-28 md:pb-16">
            <p className="text-xs font-mono tracking-[.24em] text-[#A7EEFF]">KUN FAYAKŪN × ∞</p>
            <h1 className="mt-5 text-5xl font-black leading-[.9] tracking-[-.04em] md:text-7xl">Enter the worlds<br /><span className="text-[#FFDEA0]">behind the signal.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#D6E2EE] md:text-lg">Omniland is the ScrollVerse discovery district for original visual worlds, game concepts, animation pathways, story records, and creator-selected source trails. Choose a door, follow the work, and return through the central portal whenever you want.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/omniland-cinematic-gateway" className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#04101E] transition hover:-translate-y-0.5">Enter cinematic gateway <PlayCircle className="h-4 w-4" /></Link><a href="#worlds" className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/55 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#A7EEFF] transition hover:border-[#00D4FF]">Explore Omniland <ArrowRight className="h-4 w-4" /></a><Link href="/omniland-source-atlas" className="inline-flex items-center gap-2 rounded-xl border border-[#FFCC4D]/60 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFE09A] transition hover:border-[#FFCC4D]">Open source atlas <BookOpen className="h-4 w-4" /></Link></div>
          </div>
        </div>
      </section>

      <section className="container py-9"><PortalTrustLens lane="Omniland Discovery World" source="Existing ScrollVerse Omniland, story, game, film, visual-artifact, and connected-source routes; owner-supplied Manus portal and shared-source destinations; and original Omniland visual assets created for this page." readiness="This browser-local discovery world and its linked first-party routes are available now. Each external source opens separately and carries its own current experience, access, and release context." boundary="Omniland presents creator concepts, source trails, and visitor pathways. Media publication, account access, commerce, platform partnerships, game releases, provider actions, and external operations each continue through their dedicated record." /></section>

      <section id="worlds" className="container py-8">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.2em] text-[#B5F7CC]">THREE WAYS IN</p><h2 className="mt-3 text-4xl font-black md:text-5xl">Choose your world.</h2></div><p className="max-w-xl text-sm leading-7 text-[#C8D8E7]">Each world is a first-party entry to a distinct ScrollVerse creative lane—cinema and animation, playable concept systems, or story-world archives.</p></div>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">{WORLDS.map((world) => { const Icon = world.icon; return <Link key={world.href} href={world.href} className="group overflow-hidden rounded-[2rem] border bg-[#081426] transition hover:-translate-y-1" style={{ borderColor: `${world.accent}55` }}><div className="relative h-60 overflow-hidden"><img src={world.image} alt={`Original Omniland artwork for ${world.title}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,9,20,.9)_0%,rgba(4,9,20,.02)_75%)]" /></div><div className="relative -mt-16 p-6"><div className="flex items-start justify-between gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-[#06101E]/80" style={{ borderColor: `${world.accent}66`, color: world.accent }}><Icon className="h-5 w-5" /></span><span className="text-[10px] font-mono tracking-[.14em]" style={{ color: world.accent }}>OPEN →</span></div><p className="mt-5 text-[10px] font-mono tracking-[.15em]" style={{ color: world.accent }}>{world.eyebrow}</p><h3 className="mt-2 text-2xl font-black">{world.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{world.detail}</p></div></Link>; })}</div>
      </section>

      <section className="container py-8"><div className="rounded-[2rem] border border-[#00D4FF]/30 bg-[radial-gradient(circle_at_8%_20%,rgba(0,212,255,.15),transparent_30%),radial-gradient(circle_at_88%_80%,rgba(185,140,255,.13),transparent_32%),#071325] p-7 md:p-9"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.2em] text-[#9DEBFF]">OMNILAND · FIRST-PARTY PATHS</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Play, build, keep the door open.</h2></div><Link href="/creator-atlas" className="inline-flex items-center gap-2 text-sm font-black text-[#FFE09A]">Creator Atlas <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{FIRST_PARTY_PATHS.map((path) => { const Icon = path.icon; return <Link key={path.href} href={path.href} className="group rounded-2xl border border-white/10 bg-[#030914]/55 p-5 transition hover:-translate-y-1" ><Icon className="h-7 w-7" style={{ color: path.accent }} /><p className="mt-5 text-lg font-black">{path.title}</p><p className="mt-2 text-xs leading-6 text-[#C8D8E7]">{path.detail}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-black" style={{ color: path.accent }}>Open path <ArrowRight className="h-3.5 w-3.5" /></span></Link>; })}</div></div></section>

      <section className="container py-8"><div className="grid gap-5 xl:grid-cols-[.78fr_1.22fr]"><div className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.05] p-7"><p className="text-xs font-mono tracking-[.18em] text-[#FFE09A]">MANUS CONNECTIONS</p><h2 className="mt-3 text-3xl font-black">The wider source horizon.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">These owner-supplied Manus destinations are gathered here for direct discovery. Each external source remains labeled by its own visible state; restricted library items are not represented as publicly available from this page.</p><a href="https://www.instagram.com/reel/DcIHMBdxQHT/?igsh=MW8wem1qOGw5bzZ0OQ==" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#FFE09A]">Open creator-selected visual reference <ExternalLink className="h-4 w-4" /></a><p className="mt-3 text-[11px] leading-5 text-[#B8C7D6]">External social source. Omniland’s artwork is original and does not reproduce its footage, layout, characters, or any third-party creative material.</p></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{MANUS_CONNECTIONS.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[.025] p-5 transition hover:-translate-y-0.5 hover:border-[#00D4FF]/45"><div className="flex items-start justify-between gap-3"><span className="text-[10px] font-mono tracking-[.13em] text-[#9DEBFF]">{source.kind}</span><ExternalLink className="h-4 w-4 text-[#9DEBFF]" /></div><h3 className="mt-4 text-lg font-black leading-tight">{source.title}</h3><p className="mt-3 text-[10px] font-mono tracking-[.12em] text-[#B5F7CC]">{source.state}</p></a>)}</div></div></section>

      <section className="container py-8"><div className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.05] p-7 md:p-9"><div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-mono tracking-[.18em] text-[#DCC8FF]">CENTRAL SOURCE HOME</p><h2 className="mt-3 text-3xl font-black">The central portal keeps the whole record together.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Omniland now includes a central Source Atlas for accessible creator-owned concept records across story, fashion, music, media, game, and learning worlds. Return to the front door for the central library, research, creator work, and the next pathway that fits your visit.</p></div><div className="flex flex-wrap gap-3"><Link href="/omniland-source-atlas" className="inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-5 py-3 text-sm font-black text-[#0A0B1A]">Open source atlas <BookOpen className="h-4 w-4" /></Link><Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-[#DCC8FF]/50 px-5 py-3 text-sm font-black text-[#E7DEFF]">Return home <ArrowRight className="h-4 w-4" /></Link></div></div></div></section>
    </main>
  );
}
