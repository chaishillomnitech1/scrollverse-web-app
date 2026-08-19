import { useMemo, useState } from "react";
import { ArrowRight, Eye, Layers3, Palette, Pause, Play, Sparkles, Volume2, WandSparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type LookWorld = {
  id: "mein" | "xlviii" | "atlantis";
  eyebrow: string;
  title: string;
  subtitle: string;
  color: string;
  glow: string;
  image: string;
  alt: string;
  story: string;
  silhouettes: readonly string[];
  palette: readonly { name: string; hex: string }[];
  state: string;
  source: string;
  next: string;
  route: string;
  routeLabel: string;
};

const LOOK_WORLDS: readonly LookWorld[] = [
  {
    id: "mein",
    eyebrow: "MEIN / FUSION LOOKBOOK 001",
    title: "Six Sigil Field Study",
    subtitle: "Original outerwear, movement, memory, service, craft, rhythm, and return.",
    color: "#D4AF37",
    glow: "rgba(212,175,55,.30)",
    image: "/manus-storage/chais_bust_gold_transparent_4f1b33be.png",
    alt: "Owner-provided gold bust visual reference for the MEIN fashion concept world",
    story: "A black-and-gold editorial direction for original MEIN silhouettes. The visual reference establishes atmosphere only; it is not a garment sample, product photograph, campaign release, or sale listing.",
    silhouettes: ["Six Sigil Field Jacket", "Compass Halo Vest", "Seven-Way Track Set"],
    palette: [{ name: "Blackstone", hex: "#121212" }, { name: "Metal Gold", hex: "#D4AF37" }, { name: "Signal Cyan", hex: "#00D4FF" }],
    state: "Concept direction · no live product",
    source: "MEIN Lookbook original concept records plus owner-provided gold visual reference.",
    next: "Complete selected-look accessibility text, approved imagery, production record, delivery terms, and owner release.",
    route: "/mein",
    routeLabel: "Open MEIN lookbook",
  },
  {
    id: "xlviii",
    eyebrow: "XLVIII BLOCKS / SOUTH JERSEY",
    title: "Night Drop Signal",
    subtitle: "Original colorway language from Vineland, Mays Landing, Pleasantville, and Atlantic City.",
    color: "#FF8A4C",
    glow: "rgba(255,138,76,.30)",
    image: "/manus-storage/scrollverse_black_gold_poster_8f8560c4.webp",
    alt: "Owner-provided black and gold ScrollVerse poster reference for the XLVIII Blocks fashion world",
    story: "A typography-and-texture study connecting city code, compass direction, tonal utility, and creator-owned streetwear language. It is a browser-local visual study, not an inventory, price, collectible, or checkout record.",
    silhouettes: ["Night Drop utility layer", "Sage compass tracksuit", "Sovereign Cyan runner study"],
    palette: [{ name: "Night Drop", hex: "#0A0A0A" }, { name: "Crown Gold", hex: "#FFB800" }, { name: "South Jersey Orange", hex: "#FF8A4C" }],
    state: "Visual study · requires owner release",
    source: "Fashion Empire colorway concepts plus owner-provided black-and-gold world poster.",
    next: "Select a specific look, verify a source and rights record, then define a non-public or approved release destination.",
    route: "/fashion-empire",
    routeLabel: "Open Fashion Empire",
  },
  {
    id: "atlantis",
    eyebrow: "#XLVBLOCKS / ATLANTIS CONCEPTS",
    title: "Sinking Abyss Light Study",
    subtitle: "Bioluminescent color, concentric-ring texture, and deep-water technical direction.",
    color: "#5EF3E7",
    glow: "rgba(94,243,231,.28)",
    image: "/manus-storage/atlantis-set-07-sinking-abyss-concept_bdd658e4.png",
    alt: "Concept-only Sinking Abyss technical shell fashion visual",
    story: "An existing concept-only technical-shell reference anchors the Atlantis visual lane. It communicates material direction and silhouette only; it is not approved product photography, a supplier sample, licensed merchandise, or a public campaign asset.",
    silhouettes: ["Sinking Abyss shell", "Poseidon Deep Navy layer", "Atlas Crown outerwear study"],
    palette: [{ name: "Deep Navy", hex: "#001A2E" }, { name: "Aqua Pearl", hex: "#5EF3E7" }, { name: "Orichalcum", hex: "#D65A31" }],
    state: "Concept visual · no sample or checkout",
    source: "Atlantis concept gallery and technical-pack readiness records.",
    next: "Provide real approved hero, detail, and on-body images with source, rights, accessibility, production, and release evidence.",
    route: "/atlantis-collection",
    routeLabel: "Open Atlantis collection",
  },
] as const;

const MOTION_MODES = [
  { id: "ambient", label: "Ambient drift", detail: "Slow spatial movement", icon: Sparkles },
  { id: "focus", label: "Focus glow", detail: "High-contrast visual focus", icon: Eye },
  { id: "still", label: "Still frame", detail: "Reduced motion view", icon: Pause },
] as const;

export default function FashionLookbookExperience() {
  useSovereignHeartbeat({ page: "fashion-lookbook-experience" });
  const [worldId, setWorldId] = useState<LookWorld["id"]>("mein");
  const [motionMode, setMotionMode] = useState<(typeof MOTION_MODES)[number]["id"]>("ambient");
  const [selectedSilhouette, setSelectedSilhouette] = useState(0);

  const world = useMemo(() => LOOK_WORLDS.find((entry) => entry.id === worldId) ?? LOOK_WORLDS[0], [worldId]);
  const activeMode = MOTION_MODES.find((mode) => mode.id === motionMode) ?? MOTION_MODES[0];

  const selectWorld = (id: LookWorld["id"]) => {
    setWorldId(id);
    setSelectedSilhouette(0);
    toast.success("Local fashion world selected. No media, product, campaign, or commerce action was created.");
  };

  return <main className="min-h-screen overflow-hidden bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <style>{`
      @keyframes fashionOrb { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); } 50% { transform: translate3d(3%, -5%, 0) scale(1.12); } }
      @keyframes fashionFloat { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
      @keyframes fashionSweep { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      .fashion-orb { animation: fashionOrb 12s ease-in-out infinite; }
      .fashion-float { animation: fashionFloat 7s ease-in-out infinite; }
      .fashion-sweep { background-size: 220% 220%; animation: fashionSweep 8s linear infinite; }
      @media (prefers-reduced-motion: reduce) { .fashion-orb, .fashion-float, .fashion-sweep { animation: none !important; } }
    `}</style>

    <section className="relative border-b border-white/10" style={{ background: `radial-gradient(circle at 15% 18%, ${world.glow}, transparent 28%), radial-gradient(circle at 84% 80%, rgba(185,140,255,.18), transparent 32%), #050B1A` }}>
      <div className="fashion-orb absolute -left-20 top-14 h-72 w-72 rounded-full blur-3xl" style={{ background: world.glow }} />
      <div className="container relative py-12 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/fashion-portfolio" className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">← FASHION PORTFOLIO</Link><span className="rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.15em]" style={{ color: world.color, borderColor: `${world.color}80`, background: `${world.color}14` }}>LOCAL VISUAL EXPERIENCE · CONCEPT-ONLY</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.21em]" style={{ color: world.color }}>SCROLLVERSE FASHION / LIVE LOOKBOOK ROOM</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Move through the <span style={{ color: world.color }}>look worlds.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A motion-led visual room for original MEIN, XLVIII BLOCKS, and Atlantis concept direction. Select a world, shift the viewing mood, and read its source and release state directly. The experience is active in this browser; no visual becomes a released product, sample, license, campaign, listing, checkout, or public media action here.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#look-worlds" className="rounded-xl px-5 py-3 text-sm font-black text-[#071426]" style={{ background: world.color }}>Enter look worlds</a><Link href="/meta-ai-artifacts-lookbooks" className="rounded-xl border border-[#DCC8FF]/45 bg-[#DCC8FF]/10 px-5 py-3 text-sm font-black text-[#E8DFFF]">Visual artifact room</Link></div></div><aside className="rounded-[2rem] border border-white/10 bg-[#071426]/80 p-7 backdrop-blur"><Layers3 className="h-9 w-9" style={{ color: world.color }} /><p className="mt-5 text-[10px] font-mono tracking-[.16em]" style={{ color: world.color }}>EXPERIENCE STATE</p><p className="mt-3 text-2xl font-black">Visual exploration available now.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Controls affect only this session’s visual display. They do not create a profile, save a preference, add an item to a bag, send a signal, generate media, or connect a commerce provider.</p></aside></div></div>
    </section>

    <section className="container py-10"><PortalTrustLens lane="Immersive Fashion Lookbook Experience" source="Original MEIN and XLVIII BLOCKS concept records; Atlantis concept gallery; owner-provided visual references recorded in the Meta AI Artifacts & Lookbooks catalog." readiness="Browser-local visual navigation, mood selection, and concept review are available now. Each world retains its current concept or display-reference label." boundary="This experience does not create a garment, sample, vendor order, product record, inventory, price, license, campaign, media player, listing, checkout, payment, token, wallet action, or publication." /></section>

    <section id="look-worlds" className="container scroll-mt-8 py-8"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-mono tracking-[.16em]" style={{ color: world.color }}>SELECT A LOOK WORLD</p><h2 className="mt-2 text-3xl font-black">Three visual languages. One creator-owned route.</h2></div><p className="max-w-xl text-sm leading-7 text-[#B8C7D6]">Each selection changes the local stage and the concept record. It does not alter a source file or release state.</p></div><div className="mt-7 grid gap-4 md:grid-cols-3">{LOOK_WORLDS.map((entry) => <button key={entry.id} type="button" onClick={() => selectWorld(entry.id)} className="group rounded-[1.75rem] border p-6 text-left transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" style={{ borderColor: worldId === entry.id ? `${entry.color}BA` : `${entry.color}45`, background: worldId === entry.id ? `${entry.color}14` : "rgba(255,255,255,.025)" }}><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: entry.color }}>{entry.eyebrow}</p><h3 className="mt-4 text-2xl font-black">{entry.title}</h3><p className="mt-3 text-sm leading-6 text-[#C4D1DD]">{entry.subtitle}</p><p className="mt-5 text-xs font-black" style={{ color: entry.color }}>{worldId === entry.id ? "NOW IN THE STAGE" : "OPEN THIS WORLD →"}</p></button>)}</div></section>

    <section className="container py-8"><div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#071426]"><div className="grid lg:grid-cols-[.92fr_1.08fr]"><div className="relative min-h-[32rem] overflow-hidden p-7 md:p-10" style={{ background: `radial-gradient(circle at 50% 32%, ${world.glow}, transparent 37%), linear-gradient(145deg, #0B1627 0%, #020710 100%)` }}><div className="absolute inset-x-0 top-0 h-1 fashion-sweep" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${world.color}, transparent)` }} /><div className={motionMode === "still" ? "relative h-full" : "fashion-float relative h-full"}><div className="absolute inset-7 rounded-[2rem] border" style={{ borderColor: `${world.color}40`, background: `linear-gradient(150deg, ${world.color}18, transparent 42%)` }} /><img src={world.image} alt={world.alt} className="relative z-10 mx-auto h-[24rem] w-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,.52)]" /><div className="absolute bottom-1 left-0 right-0 z-20 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: world.color }}>VISUAL LABEL</p><p className="mt-1 text-xs leading-5 text-[#D6E2EE]">{world.state}. {world.alt}.</p></div></div></div><article className="p-7 md:p-10"><p className="text-[10px] font-mono tracking-[.16em]" style={{ color: world.color }}>{world.eyebrow}</p><h2 className="mt-4 text-4xl font-black leading-[.98] md:text-5xl">{world.title}</h2><p className="mt-4 text-lg font-bold" style={{ color: world.color }}>{world.subtitle}</p><p className="mt-6 text-sm leading-7 text-[#D6E2EE]">{world.story}</p><div className="mt-7 grid gap-3 sm:grid-cols-3">{world.palette.map((chip) => <div key={chip.name} className="rounded-2xl border border-white/10 bg-black/20 p-4"><span className="block h-8 rounded-lg" style={{ background: chip.hex }} /><p className="mt-3 text-xs font-black">{chip.name}</p><p className="mt-1 text-[10px] font-mono text-[#9FB1C0]">{chip.hex}</p></div>)}</div><div className="mt-7 rounded-2xl border p-5" style={{ borderColor: `${world.color}45`, background: `${world.color}0A` }}><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: world.color }}>CURRENT CONCEPT RECORD</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]"><strong className="text-white">Source:</strong> {world.source}</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]"><strong className="text-white">Next:</strong> {world.next}</p></div></article></div></div></section>

    <section className="container py-8"><div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]"><aside className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.06] p-7"><Palette className="h-8 w-8 text-[#E8DFFF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#E8DFFF]">VIEWING MOOD</p><h2 className="mt-3 text-3xl font-black">Set the local atmosphere.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The options below only change visual motion and focus on this page. The still-frame control supports reduced-motion viewing.</p><div className="mt-6 space-y-3">{MOTION_MODES.map((mode) => { const Icon = mode.icon; return <button key={mode.id} type="button" onClick={() => setMotionMode(mode.id)} className="flex w-full items-center gap-4 rounded-2xl border p-4 text-left" style={{ borderColor: motionMode === mode.id ? `${world.color}95` : "rgba(255,255,255,.12)", background: motionMode === mode.id ? `${world.color}16` : "rgba(0,0,0,.16)" }}><Icon className="h-5 w-5" style={{ color: motionMode === mode.id ? world.color : "#B8C7D6" }} /><span><span className="block text-sm font-black">{mode.label}</span><span className="mt-1 block text-xs text-[#B8C7D6]">{mode.detail}</span></span></button>; })}</div></aside><article className="rounded-[2rem] border border-[#00D4FF]/32 bg-[#00D4FF]/[.045] p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">SILHOUETTE SELECTOR</p><h2 className="mt-3 text-3xl font-black">Build the visual sequence.</h2></div><div className="rounded-full border border-[#00D4FF]/35 bg-[#00D4FF]/10 px-3 py-2 text-[10px] font-mono text-[#9DEBFF]">{activeMode.label.toUpperCase()}</div></div><div className="mt-7 grid gap-3 md:grid-cols-3">{world.silhouettes.map((silhouette, index) => <button key={silhouette} type="button" onClick={() => setSelectedSilhouette(index)} className="rounded-2xl border p-5 text-left transition-all" style={{ borderColor: selectedSilhouette === index ? `${world.color}AB` : "rgba(255,255,255,.12)", background: selectedSilhouette === index ? `${world.color}14` : "rgba(0,0,0,.18)" }}><p className="text-[10px] font-mono" style={{ color: selectedSilhouette === index ? world.color : "#B8C7D6" }}>LOOK 0{index + 1}</p><p className="mt-4 text-lg font-black">{silhouette}</p><p className="mt-4 text-xs leading-5 text-[#B8C7D6]">Concept lane selected locally. No item has been saved, reserved, sampled, or offered.</p></button>)}</div><div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-5"><div><p className="text-[10px] font-mono tracking-[.14em]" style={{ color: world.color }}>ACTIVE VIEW</p><p className="mt-2 text-xl font-black">{world.silhouettes[selectedSilhouette]}</p></div><button type="button" onClick={() => toast.message("Local visual brief prepared", { description: `${world.silhouettes[selectedSilhouette]} is selected for browser-local review only. No external media, provider, or commerce action was created.` })} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-[#071426]" style={{ background: world.color }}><WandSparkles className="h-4 w-4" />Prepare local visual brief</button></div></article></div></section>

    <section className="container py-8"><div className="grid gap-5 md:grid-cols-3"><Link href={world.route} className="rounded-[1.8rem] border p-6 transition-transform hover:-translate-y-1" style={{ borderColor: `${world.color}50`, background: `${world.color}0A` }}><ArrowRight className="h-7 w-7" style={{ color: world.color }} /><p className="mt-5 text-xs font-mono" style={{ color: world.color }}>DEEPER CONCEPT PATH</p><h3 className="mt-2 text-2xl font-black">{world.routeLabel}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Continue through the source-labeled concept records that inform the selected look world.</p></Link><Link href="/meta-ai-artifacts-lookbooks" className="rounded-[1.8rem] border border-[#DCC8FF]/40 bg-[#DCC8FF]/[.06] p-6 transition-transform hover:-translate-y-1"><Eye className="h-7 w-7 text-[#E8DFFF]" /><p className="mt-5 text-xs font-mono text-[#E8DFFF]">OWNER-BRAND DISPLAY REFERENCES</p><h3 className="mt-2 text-2xl font-black">Meta AI artifacts</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Review display-ready owner-brand references and their item-specific next record.</p></Link><Link href="/creator-catalog-readiness" className="rounded-[1.8rem] border border-[#00FF88]/40 bg-[#00FF88]/[.06] p-6 transition-transform hover:-translate-y-1"><Volume2 className="h-7 w-7 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono text-[#B5F7CC]">RELEASE AND CATALOG PATH</p><h3 className="mt-2 text-2xl font-black">Creator catalog readiness</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">When a specific original look is ready, prepare its evidence and delivery fields before a separately authorized release.</p></Link></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.06] p-7 md:p-9"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">VISUAL-TO-RELEASE GATE</p><h2 className="mt-3 text-3xl font-black">The view can move before the commerce state does.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">This route makes original fashion direction visible and interactive without compressing concept, approved image, sample, production, license, product, campaign, and checkout into one claim. A released look requires its own source, rights, accessibility, selected use, production, delivery, customer terms, provider configuration, and exact owner authorization.</p></div><Play className="h-10 w-10 text-[#FFDEA0]" /></div></div></section>
  </main>;
}
