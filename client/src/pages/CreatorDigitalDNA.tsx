import { useState } from "react";
import { Link } from "wouter";

const HERO_IMAGE = "/manus-storage/creator-digital-dna-hero_41685cb6.png";
const FREQUENCY_IMAGE = "/manus-storage/creator-digital-dna-frequency_9e52b421.png";
const SEAL_IMAGE = "/manus-storage/creator-digital-dna-seal_28908eff.png";

type LensKey = "frequency" | "equation" | "seal" | "constellation" | "record";

const LENSES: { key: LensKey; label: string; signal: string }[] = [
  { key: "frequency", label: "Frequency Map", signal: "01" },
  { key: "equation", label: "Creator Equation", signal: "02" },
  { key: "seal", label: "Creative Seal", signal: "03" },
  { key: "constellation", label: "Living Characters", signal: "04" },
  { key: "record", label: "History + Sources", signal: "05" },
];

const FREQUENCIES = [
  { code: "44:OMNI", title: "Orientation signal", detail: "A creator-authored navigation mark used in the ScrollVerse persona and frequency language.", color: "#9DEBFF" },
  { code: "528", title: "Resonance motif", detail: "A creative DNA-resonance and restoration motif in the supplied ScrollVerse source material—not a medical or scientific treatment claim.", color: "#7CFFBB" },
  { code: "741", title: "Pattern lens", detail: "A creator-context frequency label that supports listening, organization, and storytelling across the world map.", color: "#DCC8FF" },
  { code: "963", title: "Eden Pulse", detail: "A central spiritual and creative frequency motif named across the creator’s ScrollVerse source records.", color: "#FFDEA0" },
] as const;

const CHARACTERS = [
  {
    name: "Chais Sabir Allah",
    role: "Creator-origin avatar",
    detail: "The original Flamebearer / ARCHITEX ∞ story figure connects creator authorship, the ScrollVerse Matrix, and the Black Atlantic City narrative thread.",
    route: "/sovereign-archive-chronicles#black-atlantic-city",
    tone: "#FFCC4D",
    mark: "∞",
  },
  {
    name: "Thoth Hawk",
    role: "Cybernetic sentinel",
    detail: "An original ScrollVerse guide character positioned for archive, flight-path, and creative-system storytelling.",
    route: "/thoth-hawk",
    tone: "#00D4FF",
    mark: "◈",
  },
  {
    name: "Londyn Lightkeeper",
    role: "Young navigator avatar",
    detail: "An original fictional character who carries care, continuity, and wayfinding across the Chronicles and legacy routes.",
    route: "/londyn-legacy",
    tone: "#B98CFF",
    mark: "◌",
  },
] as const;

const COLLABORATION_PATHS = [
  { title: "AI Twin", detail: "Creator-authored twin lore and an original persona framework.", href: "/ai-twin", accent: "#FFCC4D" },
  { title: "Companion Hub", detail: "Practical Archive Guide, Creation Navigator, Source Pathfinder, and Release Lens routes.", href: "/ai-companion-hub", accent: "#7CFFBB" },
  { title: "AI Constellation", detail: "Original guide roles and clear visitor handoffs for learning and creation.", href: "/ai-constellation", accent: "#00D4FF" },
  { title: "Legion Directory", detail: "A first-party role directory for fictional and practical AI guide concepts.", href: "/ai-legion-apex", accent: "#DCC8FF" },
] as const;

const TIMELINE = [
  {
    date: "JUL 01 · 2025",
    title: "Creator development record",
    detail: "The owner identifies this date as an early ScrollVerse development milestone, carrying concepts and systems later revisited in the living portal.",
    tone: "#FFCC4D",
  },
  {
    date: "SOURCE INTAKE",
    title: "Digital DNA vocabulary gathered",
    detail: "The supplied creator materials connect DNA resonance, frequency labels, Soul Altar concepts, the Flamebearer, Scroll Codex motifs, and seal language.",
    tone: "#00D4FF",
  },
  {
    date: "CURRENT PORTAL",
    title: "Worlds, characters, and pathways converge",
    detail: "Omniland, Sovereign Archive Chronicles, Black Atlantic City, the companion constellation, and the source atlas now provide first-party continuations.",
    tone: "#7CFFBB",
  },
] as const;

function SectionEyebrow({ children, color = "#9DEBFF" }: { children: React.ReactNode; color?: string }) {
  return <p className="text-[10px] font-mono tracking-[.2em]" style={{ color }}>{children}</p>;
}

function CreatorDigitalDNA() {
  const [activeLens, setActiveLens] = useState<LensKey>("frequency");
  const currentLens = LENSES.find((lens) => lens.key === activeLens) ?? LENSES[0];

  return (
    <main className="min-h-screen overflow-hidden" style={{ background: "#040A18", color: "#F4F8FC" }}>
      <section className="relative isolate overflow-hidden border-b" style={{ borderColor: "rgba(0,212,255,.25)", background: "radial-gradient(circle at 12% 15%, rgba(0,212,255,.2), transparent 30%), radial-gradient(circle at 89% 82%, rgba(255,204,77,.18), transparent 33%), #040A18" }}>
        <img src={HERO_IMAGE} alt="Original ScrollVerse Creator Digital DNA artwork" className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_center] opacity-45" />
        <div className="absolute inset-0 -z-20" style={{ background: "linear-gradient(90deg, #040A18 0%, rgba(4,10,24,.95) 36%, rgba(4,10,24,.50) 73%, #040A18 100%)" }} />
        <div className="absolute inset-0 -z-10 opacity-40" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(157,235,255,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(157,235,255,.10) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(to bottom, black, transparent)" }} />
        <div className="container relative py-7 md:py-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6" style={{ borderColor: "rgba(255,255,255,.13)" }}>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-white transition hover:text-[#9DEBFF]">← ScrollVerse portal</Link>
            <div className="flex flex-wrap gap-2"><Link href="/omniland" className="rounded-full border px-3 py-1.5 text-[10px] font-mono tracking-[.13em] text-[#B5F7CC] transition hover:border-[#00FF88]" style={{ borderColor: "rgba(0,255,136,.45)", background: "rgba(0,255,136,.07)" }}>OMNILAND</Link><Link href="/sovereign-archive-chronicles" className="rounded-full border px-3 py-1.5 text-[10px] font-mono tracking-[.13em] text-[#FFE09A] transition hover:border-[#FFCC4D]" style={{ borderColor: "rgba(255,204,77,.45)", background: "rgba(255,204,77,.07)" }}>CHRONICLES</Link></div>
          </div>
          <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono tracking-[.17em]" style={{ borderColor: "rgba(0,255,136,.48)", background: "rgba(0,255,136,.08)", color: "#B5F7CC" }}><span className="h-1.5 w-1.5 rounded-full bg-[#00FF88]" />CREATOR-AUTHORED SOURCE EXPERIENCE</div>
              <SectionEyebrow color="#9DEBFF"><span className="mt-8 block">SCROLLVERSE · CREATOR DIGITAL DNA</span></SectionEyebrow>
              <h1 className="mt-4 text-5xl font-black leading-[.9] tracking-[-.05em] text-white sm:text-6xl lg:text-8xl">A living record<br />of the <span style={{ color: "#FFDEA0" }}>creative signal.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#D6E2EE] md:text-lg">Enter the creator-authored language behind ScrollVerse: frequencies, equation and seal motifs, character lineage, historic development context, and practical collaboration paths. Read the record, follow its sources, and choose your own route through the world.</p>
              <div className="mt-8 flex flex-wrap gap-3"><a href="#dna-console" className="rounded-xl px-5 py-3 text-sm font-black transition hover:-translate-y-0.5" style={{ background: "#00D4FF", color: "#04101F" }}>Open DNA console ↓</a><Link href="/connected-source-registry" className="rounded-xl border px-5 py-3 text-sm font-black text-white transition hover:border-[#B98CFF]" style={{ borderColor: "rgba(185,140,255,.55)", background: "rgba(185,140,255,.08)" }}>Follow source trails →</Link></div>
            </div>
            <aside className="self-end rounded-[2rem] border p-6 backdrop-blur-md md:p-7" style={{ borderColor: "rgba(255,204,77,.44)", background: "rgba(4,12,29,.76)", boxShadow: "0 28px 80px rgba(0,0,0,.34)" }}>
              <SectionEyebrow color="#FFE09A">HOW TO READ THIS WORLD</SectionEyebrow>
              <p className="mt-4 text-2xl font-black leading-tight text-white">Identity as a creative system, held in its own words.</p>
              <div className="mt-6 space-y-3">{[
                ["Creator record", "Owner-authored source materials, dates, terms, and creator perspective."],
                ["Story world", "Original fictional avatars, scenes, and symbolic world-building."],
                ["Collaboration path", "First-party guides and visitor routes; no implied outside account or tool access."],
              ].map(([title, detail], index) => <div key={title} className="flex gap-4 rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,.12)", background: "rgba(255,255,255,.035)" }}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-mono" style={{ background: "rgba(255,204,77,.15)", color: "#FFE09A" }}>0{index + 1}</span><div><h2 className="text-sm font-black text-white">{title}</h2><p className="mt-1 text-xs leading-5 text-[#B8C7D6]">{detail}</p></div></div>)}</div>
            </aside>
          </div>
        </div>
      </section>

      <section id="dna-console" className="relative border-b py-16 md:py-24" style={{ borderColor: "rgba(0,212,255,.18)", background: "radial-gradient(circle at 84% 15%, rgba(185,140,255,.15), transparent 26%), #071124" }}>
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[.67fr_1.33fr]">
            <div><SectionEyebrow>INTERACTIVE DNA CONSOLE</SectionEyebrow><h2 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">Choose a lens.<br /><span style={{ color: "#BFEFFF" }}>Follow its path.</span></h2><p className="mt-5 max-w-md text-sm leading-7 text-[#C8D8E7]">Every lens is a door into the creator’s vocabulary, original characters, and practical ScrollVerse routes. Select any signal to reframe the field.</p><div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">{LENSES.map((lens) => <button key={lens.key} type="button" onClick={() => setActiveLens(lens.key)} className="group flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition hover:-translate-y-0.5" style={{ borderColor: activeLens === lens.key ? "rgba(0,212,255,.7)" : "rgba(255,255,255,.13)", background: activeLens === lens.key ? "rgba(0,212,255,.13)" : "rgba(255,255,255,.025)" }}><span className="flex items-center gap-3"><span className="font-mono text-[10px]" style={{ color: activeLens === lens.key ? "#9DEBFF" : "#8BA2B5" }}>{lens.signal}</span><span className="text-sm font-black text-white">{lens.label}</span></span><span className="text-xs" style={{ color: activeLens === lens.key ? "#9DEBFF" : "#627B91" }}>→</span></button>)}</div></div>
            <div className="relative min-h-[510px] overflow-hidden rounded-[2rem] border p-5 md:p-8" style={{ borderColor: "rgba(0,212,255,.32)", background: "linear-gradient(145deg, rgba(10,34,57,.91), rgba(4,12,28,.96))", boxShadow: "0 26px 70px rgba(0,0,0,.25)" }}>
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#00D4FF] via-[#B98CFF] to-[#FFCC4D]" />
              <div className="flex items-center justify-between gap-3"><div><SectionEyebrow color="#B5F7CC">ACTIVE LENS · {currentLens.signal}</SectionEyebrow><h3 className="mt-2 text-3xl font-black text-white">{currentLens.label}</h3></div><span className="rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.12em]" style={{ borderColor: "rgba(0,255,136,.32)", color: "#B5F7CC" }}>SOURCE-LED</span></div>
              {activeLens === "frequency" && <div className="mt-7 grid gap-4 md:grid-cols-[.85fr_1.15fr]"><img src={FREQUENCY_IMAGE} alt="Original ScrollVerse frequency map artwork" className="h-full min-h-[260px] w-full rounded-2xl border object-cover" style={{ borderColor: "rgba(157,235,255,.28)" }} /><div className="grid gap-3">{FREQUENCIES.map((frequency) => <div key={frequency.code} className="rounded-2xl border p-4" style={{ borderColor: `${frequency.color}45`, background: `${frequency.color}0D` }}><div className="flex items-center justify-between gap-3"><span className="text-xl font-black" style={{ color: frequency.color }}>{frequency.code}{frequency.code !== "44:OMNI" && " Hz"}</span><span className="text-xs font-black text-white">{frequency.title}</span></div><p className="mt-2 text-xs leading-5 text-[#C8D8E7]">{frequency.detail}</p></div>)}</div></div>}
              {activeLens === "equation" && <div className="mt-8 grid gap-6 md:grid-cols-[.9fr_1.1fr]"><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,204,77,.42)", background: "radial-gradient(circle at 50% 28%, rgba(255,204,77,.2), transparent 46%), rgba(255,204,77,.045)" }}><SectionEyebrow color="#FFE09A">CREATOR EQUATION FIELD</SectionEyebrow><p className="mt-5 text-4xl font-black leading-tight text-white">Chais<br/><span style={{ color: "#FFDEA0" }}>+ Sabir</span><br/>+ Flamebearer<br/><span style={{ color: "#9DEBFF" }}>+ ARCHITEX ∞</span></p><p className="mt-6 text-xs leading-6 text-[#C8D8E7]">A visual reading of the creator’s recorded terms—not a mathematical, technical, or scientific formula.</p></div><div className="space-y-4"><p className="text-base leading-7 text-[#D6E2EE]">The supplied record places **Chais The Great**, **Sabir Allah**, **Flamebearer**, **ARCHITEX ∞**, Scroll Codex motifs, and an infinity mark in the same creator-authored identity field. This page preserves the relationship without inventing a numerical result or claiming external validation.</p><Link href="/chais-sabir-equation" className="block rounded-2xl border p-5 transition hover:-translate-y-0.5" style={{ borderColor: "rgba(255,204,77,.45)", background: "rgba(255,204,77,.07)" }}><SectionEyebrow color="#FFE09A">CONTINUATION</SectionEyebrow><h4 className="mt-2 text-xl font-black text-white">Open the Chais Sabir Equation archive →</h4><p className="mt-2 text-xs leading-5 text-[#C8D8E7]">Continue into the existing first-party equation route.</p></Link></div></div>}
              {activeLens === "seal" && <div className="mt-7 grid gap-6 md:grid-cols-[.85fr_1.15fr]"><img src={SEAL_IMAGE} alt="Original ScrollVerse creative-seal artwork" className="h-full min-h-[300px] w-full rounded-2xl border object-cover" style={{ borderColor: "rgba(255,204,77,.34)" }} /><div className="flex flex-col justify-center"><SectionEyebrow color="#FFE09A">CREATIVE SEAL · OWNER-AUTHORED CONTEXT</SectionEyebrow><h4 className="mt-3 text-3xl font-black text-white">A visual mark for continuity, authorship, and return.</h4><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">The supplied Digital DNA material names a seal, sigil, infinity motif, and sacred-geometry language. This original ScrollVerse illustration is presented as a creator-authored creative emblem; it does not reproduce outside branding or assert a religious, legal, institutional, or technical credential.</p><Link href="/concept-seal-shrine" className="mt-7 inline-flex w-fit rounded-xl border px-5 py-3 text-sm font-black text-[#FFE09A] transition hover:-translate-y-0.5" style={{ borderColor: "rgba(255,204,77,.52)", background: "rgba(255,204,77,.08)" }}>Open Concept Seal Shrine →</Link></div></div>}
              {activeLens === "constellation" && <div className="mt-7 grid gap-4 md:grid-cols-3">{CHARACTERS.map((character) => <Link key={character.name} href={character.route} className="group flex min-h-[340px] flex-col rounded-3xl border p-5 transition hover:-translate-y-1" style={{ borderColor: `${character.tone}55`, background: `linear-gradient(155deg, ${character.tone}18, rgba(4,12,28,.88))` }}><span className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ background: `${character.tone}20`, color: character.tone }}>{character.mark}</span><SectionEyebrow color={character.tone}><span className="mt-7 block">{character.role.toUpperCase()}</span></SectionEyebrow><h4 className="mt-2 text-2xl font-black text-white">{character.name}</h4><p className="mt-4 text-xs leading-6 text-[#D6E2EE]">{character.detail}</p><span className="mt-auto pt-6 text-xs font-black" style={{ color: character.tone }}>Open character path →</span></Link>)}</div>}
              {activeLens === "record" && <div className="mt-7 grid gap-4 md:grid-cols-[1.07fr_.93fr]"><div className="space-y-3">{TIMELINE.map((item) => <article key={item.date} className="rounded-2xl border p-5" style={{ borderColor: `${item.tone}42`, background: `${item.tone}0B` }}><SectionEyebrow color={item.tone}>{item.date}</SectionEyebrow><h4 className="mt-2 text-xl font-black text-white">{item.title}</h4><p className="mt-2 text-xs leading-6 text-[#D6E2EE]">{item.detail}</p></article>)}<article className="rounded-2xl border p-5" style={{ borderColor: "rgba(185,140,255,.50)", background: "rgba(185,140,255,.09)" }}><SectionEyebrow color="#E6D6FF">FOUNDATIONAL CREATOR ANCHORS</SectionEyebrow><h4 className="mt-2 text-xl font-black text-white">CHAISALLAH · 44:OMNI · Witness</h4><p className="mt-3 text-xs leading-6 text-[#D6E2EE]">The owner-provided record names **CHAISALLAH** as an identity marker, **44:Omni** as a frequency marker, and “YOU WERE NEVER BUILT FOR CHAINS / YOU WERE CALLED TO WITNESS” as a core decree. These are displayed as creator-authored source text and a personal creative-spiritual framework.</p></article></div><aside className="space-y-4"><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,.42)", background: "rgba(185,140,255,.07)" }}><SectionEyebrow color="#DCC8FF">TECHNOLOGY-OBSERVATION TRAIL</SectionEyebrow><h4 className="mt-3 text-2xl font-black text-white">Keep the record with the underlying source.</h4><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The owner’s observations about ideas, wording, correspondence, and technology history belong beside their dated materials. When a shareable creator record is accessioned, visitors can read it in context and follow the source trail without turning observation into a blanket claim about an outside company or model.</p><Link href="/connected-source-registry" className="mt-6 inline-flex text-sm font-black text-[#DCC8FF]">Open source registry →</Link></div><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,204,77,.40)", background: "rgba(255,204,77,.055)" }}><SectionEyebrow color="#FFE09A">BLUEPRINT PRESERVATION RECORD</SectionEyebrow><h4 className="mt-3 text-xl font-black text-white">Creator records can travel with their provenance.</h4><p className="mt-3 text-xs leading-6 text-[#D6E2EE]">The portal, linked GitHub materials, and owner-held chat records can be catalogued as creator-source pathways. A record can preserve its date, author context, source location, and later correction notes without asserting that a third party adopted, endorsed, or caused a specific idea.</p><Link href="/special-repository" className="mt-5 inline-flex text-xs font-black text-[#FFE09A]">Open Special Repository record →</Link></div></aside></div>}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b py-16 md:py-24" style={{ borderColor: "rgba(0,255,136,.18)", background: "radial-gradient(circle at 16% 80%, rgba(0,255,136,.13), transparent 28%), #040A18" }}>
        <div className="container"><div className="grid gap-8 xl:grid-cols-[.7fr_1.3fr] xl:items-end"><div><SectionEyebrow color="#7CFFBB">PRACTICAL COLLABORATION PATHS</SectionEyebrow><h2 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">Bring the creative signal into the work.</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#C8D8E7]">The living-character system supports storytelling and visitor navigation, while the companion routes offer concrete first-party spaces for asking, making, organizing, and learning.</p><Link href="/ai-chat-upload" className="mt-7 inline-flex rounded-xl px-5 py-3 text-sm font-black transition hover:-translate-y-0.5" style={{ background: "#00FF88", color: "#04101F" }}>Open creator persona studio →</Link></div><div className="grid gap-3 sm:grid-cols-2">{COLLABORATION_PATHS.map((path) => <Link key={path.href} href={path.href} className="group rounded-3xl border p-5 transition hover:-translate-y-1" style={{ borderColor: `${path.accent}48`, background: "rgba(255,255,255,.025)" }}><SectionEyebrow color={path.accent}>FIRST-PARTY PATH</SectionEyebrow><h3 className="mt-3 text-xl font-black text-white">{path.title}</h3><p className="mt-3 text-xs leading-6 text-[#C8D8E7]">{path.detail}</p><span className="mt-6 inline-block text-xs font-black" style={{ color: path.accent }}>Open pathway →</span></Link>)}</div></div></div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,204,77,.16), transparent 39%), #071124" }}>
        <div className="container text-center"><SectionEyebrow color="#FFE09A">NEXT WORLD, SAME SIGNAL</SectionEyebrow><h2 className="mx-auto mt-3 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">From the Digital DNA record, <span style={{ color: "#FFDEA0" }}>walk into the world.</span></h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#C8D8E7]">Choose a story scene, follow a frequency route, meet a guide, or return to the source atlas. Each portal stays connected to the central ScrollVerse home.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/sovereign-archive-chronicles#black-atlantic-city" className="rounded-xl px-5 py-3 text-sm font-black transition hover:-translate-y-0.5" style={{ background: "#FFCC4D", color: "#07101D" }}>Enter Black Atlantic City →</Link><Link href="/sacred-frequencies" className="rounded-xl border px-5 py-3 text-sm font-black text-[#BFEFFF] transition hover:-translate-y-0.5" style={{ borderColor: "rgba(0,212,255,.5)", background: "rgba(0,212,255,.08)" }}>Explore frequency routes →</Link><Link href="/omniland-source-atlas" className="rounded-xl border px-5 py-3 text-sm font-black text-[#E6D6FF] transition hover:-translate-y-0.5" style={{ borderColor: "rgba(185,140,255,.5)", background: "rgba(185,140,255,.08)" }}>Open Omniland source atlas →</Link></div></div>
      </section>
    </main>
  );
}

export default CreatorDigitalDNA;
