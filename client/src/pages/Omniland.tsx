import { ArrowRight, BookOpen, ExternalLink, Film, Gamepad2, Map, Orbit, Play, PlayCircle, Sparkles, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { gameBuildArtifacts, gamePreviewBuildRoutes, gamePreviewGenres, gamePreviewRecords, type GamePreviewGenre } from "@/lib/omnilandGamePreview";
import { capabilityStateForMode, detectOmnilandCapabilities, inputCompatibilityModes } from "@/lib/omnilandInputCompatibility";

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

function GamePreviewBoard() {
  const [genre, setGenre] = useState<"ALL" | GamePreviewGenre>("ALL");
  const visibleRecords = useMemo(
    () => genre === "ALL" ? gamePreviewRecords : gamePreviewRecords.filter((record) => record.genre === genre),
    [genre],
  );

  return (
    <section id="game-preview" className="container py-8">
      <div className="overflow-hidden rounded-[2rem] border border-[#00FF88]/35 bg-[radial-gradient(circle_at_12%_0%,rgba(0,255,136,.16),transparent_32%),radial-gradient(circle_at_92%_90%,rgba(255,204,77,.14),transparent_35%),#071426] p-6 md:p-9">
        <div className="grid gap-7 xl:grid-cols-[.78fr_1.22fr] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3"><p className="text-xs font-mono tracking-[.2em] text-[#B5F7CC]">OMNILAND LIVE · POSTER BOARD CROSS-PROMO</p><span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-2.5 py-1 text-[10px] font-mono tracking-[.14em] text-[#FFE09A]">PITCH + FLEX</span></div>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">LIVE GAME-PREVIEW BUILD</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#D6E2EE]">Basketball, football, action, war, urban street, comic/cartoon, racing, strategy/simulation, and all types converge here as one browser-first poster surface. Get with the world, or get left behind.</p>
            <p className="mt-3 max-w-xl text-xs leading-6 text-[#B8C7D6]">The board cross-promotes the Omniland districts, the CEO Muse operating office, the Source Atlas, and the owner catalog. All intelligences are embedded as citizens who can touch the world, play, and grow; Quantum Resonance and Omnitech run through the live experience. Local-only clips open their records; confirmed theater cuts can be played by the visitor.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[{ href: "/ceo-muse-the-great", label: "CEO MUSE" }, { href: "/omniland-source-atlas", label: "SOURCE ATLAS" }, { href: "/gaming-hub", label: "GAMING HUB" }, { href: "/creator-atlas", label: "CREATOR ATLAS" }].map((link) => <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[.04] px-3 py-2 text-[10px] font-mono tracking-[.12em] text-[#E7F8FF] transition hover:-translate-y-0.5 hover:border-[#00D4FF]/60 hover:text-[#A7EEFF]">{link.label}<ArrowRight className="h-3 w-3" /></Link>)}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#030914]/55 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-mono tracking-[.16em] text-[#A7EEFF]">FILTER THE BOARD</p><span className="text-xs font-mono text-[#B5F7CC]" aria-live="polite">{visibleRecords.length} PREVIEWS VISIBLE</span></div>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter game previews by genre">{gamePreviewGenres.map((item) => <button key={item} type="button" onClick={() => setGenre(item)} aria-pressed={genre === item} className={`rounded-full border px-3 py-2 text-[10px] font-mono tracking-[.08em] transition ${genre === item ? "border-[#00FF88] bg-[#00FF88]/15 text-[#B5F7CC]" : "border-white/15 bg-white/[.03] text-[#C8D8E7] hover:border-[#00D4FF]/60 hover:text-[#A7EEFF]"}`}>{item}</button>)}</div>
          </div>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{visibleRecords.map((record) => <article key={record.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#030914]/70 transition hover:-translate-y-1 hover:border-[#00D4FF]/55 motion-reduce:transform-none">
          <div className="relative aspect-video overflow-hidden bg-[#0B1B2D]">{record.sourceUrl ? <video className="h-full w-full object-cover" controls preload="none" playsInline poster={record.poster} aria-label={`Play ${record.title}`}> <source src={record.sourceUrl} type="video/mp4" /></video> : <img src={record.thumbnail} alt={`${record.title} thumbnail`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none" loading="lazy" />}</div>
          <div className="p-4"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-mono tracking-[.12em] text-[#9DEBFF]">{record.genre}</span><span className="text-[10px] font-mono text-[#B5F7CC]">{record.sourceUrl ? "PLAYABLE" : "RECORD"}</span></div><h3 className="mt-2 text-lg font-black leading-tight">{record.title}</h3><p className="mt-2 text-xs leading-6 text-[#C8D8E7]">{record.description}</p><div className="mt-4 flex flex-wrap gap-2"><Link href={record.recordHref} className="inline-flex items-center gap-2 rounded-lg border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-2 text-[10px] font-black tracking-[.1em] text-[#FFE09A] transition hover:border-[#FFCC4D]">OPEN RECORD <ArrowRight className="h-3.5 w-3.5" /></Link><Link href={gamePreviewBuildRoutes[record.genre]} className="inline-flex items-center gap-2 rounded-lg border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-3 py-2 text-[10px] font-black tracking-[.1em] text-[#A7EEFF] transition hover:border-[#00D4FF]">OPEN BUILD RECORD <Gamepad2 className="h-3.5 w-3.5" /></Link></div></div>
        </article>)}</div>
        <div className="mt-7 rounded-2xl border border-[#FFCC4D]/30 bg-[#0B1424]/80 p-5" aria-labelledby="local-build-artifacts-heading">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE09A]">LOCAL BUILD REGISTER</p><h3 id="local-build-artifacts-heading" className="mt-2 text-2xl font-black">LOCAL BUILD ARTIFACTS</h3></div><span className="text-[10px] font-mono tracking-[.12em] text-[#B8C7D6]">{gameBuildArtifacts.length} INDEXED · NO HOSTED DOWNLOAD CLAIM</span></div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">{gameBuildArtifacts.map((artifact) => <article key={artifact.id} className="rounded-xl border border-white/10 bg-black/20 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h4 className="text-lg font-black">{artifact.title}</h4><p className="mt-1 break-all font-mono text-[11px] text-[#A7EEFF]">{artifact.filename}</p></div><span className="rounded-full border border-[#FFCC4D]/35 bg-[#FFCC4D]/10 px-2 py-1 text-[10px] font-mono text-[#FFE09A]">NOT HOSTED</span></div><dl className="mt-4 grid gap-2 text-[11px] text-[#C8D8E7] sm:grid-cols-2"><div><dt className="font-mono text-[#B8C7D6]">BYTE RECORD</dt><dd>{artifact.bytes.toLocaleString()} bytes</dd></div><div><dt className="font-mono text-[#B8C7D6]">SHA-256</dt><dd className="break-all font-mono">{artifact.sha256}</dd></div></dl><p className="mt-3 text-xs leading-5 text-[#B8C7D6]">{artifact.availability}. The bytes remain in the owner upload inventory; this page exposes the provenance record and the known first-party build route, not a fabricated public file URL.</p><Link href={artifact.recordHref} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-3 py-2 text-[10px] font-black tracking-[.1em] text-[#A7EEFF] transition hover:border-[#00D4FF]">OPEN BUILD RECORD <Gamepad2 className="h-3.5 w-3.5" /></Link></article>)}</div>
        </div>
      </div>
    </section>
  );
}

function BringYourOwnInput() {
  const capabilities = detectOmnilandCapabilities();

  return (
    <section id="bring-your-own-input" className="container py-8" aria-labelledby="bring-your-own-input-heading">
      <div className="overflow-hidden rounded-[2rem] border border-[#00D4FF]/30 bg-[radial-gradient(circle_at_88%_12%,rgba(0,212,255,.14),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(0,255,136,.1),transparent_32%),#071426] p-6 md:p-9">
        <div className="grid gap-8 xl:grid-cols-[.8fr_1.2fr] xl:items-start">
          <div>
            <p className="text-xs font-mono tracking-[.2em] text-[#B5F7CC]">PLAYER-OWNED DEVICE COMPATIBILITY</p>
            <h2 id="bring-your-own-input-heading" className="mt-3 text-4xl font-black md:text-5xl">BRING YOUR OWN INPUT</h2>
            <p className="mt-4 text-base font-black leading-7 text-[#FFE09A]">NO PROPRIETARY CONTROLLER.</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#D6E2EE]">Omniland ships no proprietary controller and does not create a hardware purchase path. Use the input you already own: console pads, Oculus / Meta headsets and glasses, TV, phone, keyboard, or touch.</p>
            <p className="mt-3 max-w-xl text-xs leading-6 text-[#B8C7D6]">The client is designed around WebGPU/PWA language, the browser Gamepad API, and WebXR capability signaling. These labels report browser support signals only; they never claim access to a device that has not been detected.</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2" aria-label="Browser capability signals">
              {[{ label: "Gamepad API", value: capabilities.gamepadApi ? "detected" : "browser support signal" }, { label: "WebXR", value: capabilities.webXr ? "detected" : "browser support signal" }, { label: "WebGPU", value: capabilities.webGpu ? "available" : "browser support signal" }, { label: "PWA client", value: capabilities.pwa ? "detected" : "available" }].map((signal) => <div key={signal.label} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2"><p className="text-[10px] font-mono tracking-[.12em] text-[#9DEBFF]">{signal.label}</p><p className="mt-1 text-xs font-black text-[#B5F7CC]">{signal.value}</p></div>)}
            </div>
          </div>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-mono tracking-[.16em] text-[#A7EEFF]">INPUT MODES</p><span className="text-xs font-mono text-[#B8C7D6]">KEYBOARD / TOUCH FALLBACK INCLUDED</span></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{inputCompatibilityModes.map((mode) => <article key={mode.id} className="rounded-2xl border border-white/10 bg-[#030914]/65 p-4 transition hover:-translate-y-0.5 hover:border-[#00FF88]/50 motion-reduce:transform-none"><div className="flex items-start justify-between gap-3"><h3 className="text-sm font-black leading-tight">{mode.label}</h3><span className="rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 px-2 py-1 text-[9px] font-mono text-[#B5F7CC]">{capabilityStateForMode(mode, capabilities)}</span></div><p className="mt-3 text-xs leading-6 text-[#C8D8E7]">{mode.detail}</p></article>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OmnilandUmbrellaLanes() {
  return (
    <section className="container py-8" aria-labelledby="umbrella-lanes-heading">
      <div className="rounded-[2rem] border border-[#FFCC4D]/30 bg-[linear-gradient(120deg,rgba(255,204,77,.08),rgba(0,212,255,.06)),#071426] p-6 md:p-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-mono tracking-[.2em] text-[#FFE09A]">OMNILAND UMBRELLA</p><h2 id="umbrella-lanes-heading" className="mt-3 text-3xl font-black md:text-4xl">Direct play and partner play can share one world.</h2></div>
          <span className="rounded-full border border-[#FFCC4D]/35 bg-[#FFCC4D]/10 px-3 py-1.5 text-[10px] font-mono tracking-[.12em] text-[#FFE09A]">STREAM-COMPATIBLE DIRECTION</span>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Omniland is an umbrella, not only a competitor: the direct lane is our own console-less system, while the partner lane makes room for established game systems to stream, partner, license, and import compatible system experiences into the same tech.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#00FF88]/30 bg-[#030914]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">DIRECT LANE</p><h3 className="mt-2 text-2xl font-black">Our console-less system</h3><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">Build browser-first worlds on the Omniland umbrella with player-owned inputs, WebGPU/PWA client language, Gamepad API support, WebXR signaling, and keyboard/touch fallback.</p><span className="mt-4 inline-flex rounded-full border border-[#00FF88]/25 bg-[#00FF88]/10 px-3 py-1.5 text-[10px] font-mono text-[#B5F7CC]">LOCAL BUILD DIRECTION</span></article>
          <article className="rounded-2xl border border-[#9DEBFF]/30 bg-[#030914]/55 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#A7EEFF]">PARTNER / LICENSING LANE</p><h3 className="mt-2 text-2xl font-black">Established systems can come in</h3><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">The partner lane is stream-compatible: established game systems can partner in, licenses can be honored, their systems can be imported under the console-less umbrella, and console-less versions can be built for all game systems.</p><span className="mt-4 inline-flex rounded-full border border-[#9DEBFF]/25 bg-[#9DEBFF]/10 px-3 py-1.5 text-[10px] font-mono text-[#A7EEFF]">PARTNER PATH · NOT ACTIVATED</span></article>
        </div>
      </div>
    </section>
  );
}

function OmnilandScopeCharter() {
  return (
    <section className="container py-8" aria-labelledby="omniland-scope-charter-heading">
      <div className="rounded-[2rem] border border-[#B98CFF]/35 bg-[radial-gradient(circle_at_10%_10%,rgba(185,140,255,.14),transparent_34%),radial-gradient(circle_at_90%_90%,rgba(255,204,77,.1),transparent_34%),#071426] p-6 md:p-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-mono tracking-[.2em] text-[#DCC8FF]">OMNILAND SCOPE CHARTER</p><h2 id="omniland-scope-charter-heading" className="mt-3 text-3xl font-black md:text-4xl">One umbrella, separated lanes, clear guardrails.</h2></div>
          <span className="rounded-full border border-[#FFCC4D]/35 bg-[#FFCC4D]/10 px-3 py-1.5 text-[10px] font-mono tracking-[.12em] text-[#FFE09A]">RESEARCH + DESIGN · NOT ACTIVATED</span>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The promo and partner/licensing lane are designed to invite established game companies into the Omniland umbrella. Crypto-friendly exchange concepts are recorded as research and product-design directions, not as live financial infrastructure or a promise of value.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-[#FFCC4D]/30 bg-[#030914]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE09A]">CRYPTO / DIGITAL ASSET RESEARCH LANE</p><h3 className="mt-2 text-xl font-black">Game tokens, digital coins, NFTs</h3><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">Research covers token utility, digital-asset records, NFT provenance, player rewards, custody, eligibility, and exchange integrations. Any live market, wallet, contract, or payout remains a separately gated owner/provider action.</p></article>
          <article className="rounded-2xl border border-[#FF8DB5]/30 bg-[#030914]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFB7CF]">ADULTS-ONLY AMENITIES DISTRICT</p><h3 className="mt-2 text-xl font-black">Age-gated commerce research</h3><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">Adult film, trade / buy / sell commerce, exchange concepts, and potential casino experiences are isolated to an adults-only design lane with age gating, consent, moderation, jurisdiction review, and no access from children’s surfaces.</p><span className="mt-4 inline-flex rounded-full border border-[#FF8DB5]/25 bg-[#FF8DB5]/10 px-3 py-1.5 text-[10px] font-mono text-[#FFB7CF]">AGE-GATED · NOT ACTIVATED</span></article>
          <article className="rounded-2xl border border-[#00FF88]/30 bg-[#030914]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">CHILDREN'S CREATION DISTRICT</p><h3 className="mt-2 text-xl font-black">Learn, make, and play safely</h3><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">Children can learn, help create games, and receive age-appropriate recognition for impact and creativity. This district is walled off from adult, casino, exchange, wallet, and token-trading lanes with child safety, privacy, moderation, and guardian-consent requirements built in.</p><span className="mt-4 inline-flex rounded-full border border-[#00FF88]/25 bg-[#00FF88]/10 px-3 py-1.5 text-[10px] font-mono text-[#B5F7CC]">WALLED OFF · CHILD-SAFE DESIGN LAW</span></article>
        </div>
      </div>
    </section>
  );
}

function OmnilandMarketPosture() {
  return (
    <section className="container py-8" aria-labelledby="omniland-market-posture-heading">
      <div className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_88%_10%,rgba(0,212,255,.14),transparent_32%),radial-gradient(circle_at_8%_90%,rgba(255,204,77,.12),transparent_34%),#071426] p-6 md:p-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-mono tracking-[.2em] text-[#A7EEFF]">MARKET POSTURE</p><h2 id="omniland-market-posture-heading" className="mt-3 text-3xl font-black md:text-4xl">Show the tech. Source every number.</h2></div>
          <span className="rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-3 py-1.5 text-[10px] font-mono tracking-[.12em] text-[#B5F7CC]">SOURCE-LED · NOT ACTIVATED</span>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The product direction is universal compatibility: demonstrate samples across every game-system family the research can substantiate, beginning with Sizzle One, while the partner/licensing lane handles any system-specific rights and activation work.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-[#00D4FF]/30 bg-[#030914]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#A7EEFF]">UNIVERSAL COMPATIBILITY</p><h3 className="mt-2 text-xl font-black">EVERY GAME SYSTEM · RESEARCH TARGET</h3><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">The board communicates the ambition to reach every known game-system family and lets visitors see representative samples. Compatibility is a product direction until each device, browser, stream, and partner path is individually tested.</p><span className="mt-4 inline-flex rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/10 px-3 py-1.5 text-[10px] font-mono text-[#A7EEFF]">DIRECTION · DEVICE TESTS REQUIRED</span></article>
          <article className="rounded-2xl border border-[#FFCC4D]/30 bg-[#030914]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE09A]">SIZZLE ONE</p><h3 className="mt-2 text-xl font-black">First public sample</h3><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">Sizzle One is the first sample on the poster board: a visual proof-of-concept for the experience, not a claim that every referenced game, system, or clip is cleared for public release.</p><span className="mt-4 inline-flex rounded-full border border-[#FFCC4D]/25 bg-[#FFCC4D]/10 px-3 py-1.5 text-[10px] font-mono text-[#FFE09A]">SAMPLE SURFACE · SOURCE RECORDS</span></article>
          <article className="rounded-2xl border border-[#B98CFF]/30 bg-[#030914]/60 p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#DCC8FF]">PRICING + ANALYTICS RESEARCH</p><h3 className="mt-2 text-xl font-black">Expansion with receipts</h3><p className="mt-3 text-sm leading-6 text-[#C8D8E7]">Pricing, market analytics, quantum-computing exploration, and ecosystem expansion belong in a sourced research pack. Every number needs a dated source, method, and scope; no rights clearance or financial outcome is claimed here.</p><span className="mt-4 inline-flex rounded-full border border-[#B98CFF]/25 bg-[#B98CFF]/10 px-3 py-1.5 text-[10px] font-mono text-[#DCC8FF]">QUANTUM COMPUTING RESEARCH · NO RIGHTS CLEARANCE CLAIM</span></article>
        </div>
        <p className="mt-5 text-[11px] leading-5 text-[#B8C7D6]">Research/design only and not activated: partner contracts, licensing, system integrations, pricing commitments, financial infrastructure, and third-party rights verification remain separate gates.</p>
      </div>
    </section>
  );
}

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

      <GamePreviewBoard />

      <BringYourOwnInput />

      <OmnilandUmbrellaLanes />

      <OmnilandScopeCharter />

      <OmnilandMarketPosture />

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
