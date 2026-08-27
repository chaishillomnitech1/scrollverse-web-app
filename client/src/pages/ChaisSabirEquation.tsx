import { useMemo, useState } from "react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const HEBREW_VALUES: Record<string, number> = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50, ס: 60,
  ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90, ק: 100, ר: 200, ש: 300, ת: 400,
};

const GREEK_VALUES: Record<string, number> = {
  α: 1, β: 2, γ: 3, δ: 4, ε: 5, ϛ: 6, ζ: 7, η: 8, θ: 9,
  ι: 10, κ: 20, λ: 30, μ: 40, ν: 50, ξ: 60, ο: 70, π: 80, ϟ: 90,
  ρ: 100, σ: 200, ς: 200, τ: 300, υ: 400, φ: 500, χ: 600, ψ: 700, ω: 800, ϡ: 900,
};

const RESEARCH_SOURCES = [
  { title: "Historical gematria", source: "Jewish Encyclopedia", href: "https://www.jewishencyclopedia.com/articles/6571-gematria", detail: "Letter-value and numerical-gematria history; declare spelling and convention before comparing results." },
  { title: "Digital roots", source: "University of Cambridge · NRICH", href: "https://nrich.maths.org/articles/digital-roots", detail: "Repeated digit addition and its relation to modulo-nine arithmetic." },
  { title: "Measurement and frequency", source: "NIST", href: "https://physics.nist.gov/cuu/Uncertainty/", detail: "Units, uncertainty components, combination, and coverage when a frequency is measured." },
  { title: "Interpretation", source: "Stanford Encyclopedia of Philosophy", href: "https://plato.stanford.edu/entries/hermeneutics/", detail: "Hermeneutics as the study of interpretation across texts, testimony, and artifacts." },
  { title: "Ephemeris inputs", source: "Swiss Ephemeris", href: "https://www.astro.com/swisseph/swephinfo_e.htm", detail: "Technical ephemeris reference for date, time, location, and calculation-convention records." },
] as const;

const LEGACY_REQUIREMENTS = [
  ["provenance", "Original asset or source record identified"],
  ["rights", "Creator and contributor permissions recorded"],
  ["master", "Preservation master and accessible derivative identified"],
  ["metadata", "Title, description, media, and attribution metadata reviewed"],
  ["contract", "Approved contract and chain details recorded"],
  ["destination", "Owner-controlled destination account recorded"],
  ["release", "Specific owner release instruction recorded"],
] as const;

type LegacyRequirement = (typeof LEGACY_REQUIREMENTS)[number][0];

function ordinalBreakdown(input: string) {
  return input.toUpperCase().replace(/[^A-Z]/g, "").split("").map((letter) => ({ letter, value: letter.charCodeAt(0) - 64 }));
}

function valuedBreakdown(input: string, values: Record<string, number>) {
  return Array.from(input.normalize("NFC")).map((letter) => ({ letter, value: values[letter] ?? 0 })).filter((item) => item.value > 0);
}

function total(items: Array<{ value: number }>) {
  return items.reduce((sum, item) => sum + item.value, 0);
}

function digitalRoot(value: number) {
  if (value === 0) return 0;
  return value % 9 || 9;
}

function CalculationStrip({ label, items, emptyText }: { label: string; items: Array<{ letter: string; value: number }>; emptyText: string }) {
  const value = total(items);
  return <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(4,14,30,0.58)" }}>
    <p className="text-xs font-mono tracking-widest text-[#9DEBFF]">{label}</p>
    {items.length ? <><div className="mt-3 flex flex-wrap gap-2">{items.map((item, index) => <span key={`${item.letter}-${index}`} className="rounded-lg bg-white/5 px-2.5 py-1.5 font-mono text-sm text-slate-100">{item.letter}={item.value}</span>)}</div><p className="mt-4 text-sm text-slate-300">Sum: <strong className="text-[#FFB800]">{value}</strong> · Digital root: <strong className="text-[#00FF88]">{digitalRoot(value)}</strong></p></> : <p className="mt-3 text-sm leading-6 text-slate-400">{emptyText}</p>}
  </div>;
}

export default function ChaisSabirEquation() {
  useSovereignHeartbeat({ page: "chais-sabir-equation" });
  const [name, setName] = useState("Chais Sabir Kajir Hill");
  const [hebrew, setHebrew] = useState("");
  const [greek, setGreek] = useState("");
  const [birthDate, setBirthDate] = useState("1978-08-28");
  const [birthTime, setBirthTime] = useState("19:00");
  const [birthPlace, setBirthPlace] = useState("Harlem, New York");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [legacy, setLegacy] = useState<Record<LegacyRequirement, boolean>>({ provenance: false, rights: false, master: false, metadata: false, contract: false, destination: false, release: false });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const ordinal = useMemo(() => ordinalBreakdown(name), [name]);
  const hebrewCalculation = useMemo(() => valuedBreakdown(hebrew, HEBREW_VALUES), [hebrew]);
  const greekCalculation = useMemo(() => valuedBreakdown(greek.toLowerCase(), GREEK_VALUES), [greek]);
  const dateDigits = useMemo(() => birthDate.replace(/\D/g, "").split("").map((letter) => ({ letter, value: Number(letter) })), [birthDate]);
  const completeCount = LEGACY_REQUIREMENTS.filter(([key]) => legacy[key]).length;

  const toggleLegacy = (key: LegacyRequirement) => setLegacy((current) => ({ ...current, [key]: !current[key] }));
  const saveLegacyRecord = () => {
    const timestamp = new Date().toISOString();
    window.localStorage.setItem("scrollverse-chais-sabir-legacy-readiness", JSON.stringify({ legacy, savedAt: timestamp }));
    setSavedAt(timestamp);
  };

  return (
    <main className="min-h-screen pb-24 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b" style={{ borderColor: "rgba(0,212,255,0.2)", background: "radial-gradient(circle at 12% 5%, rgba(255,184,0,0.18), transparent 28%), radial-gradient(circle at 92% 20%, rgba(185,140,255,0.18), transparent 34%), #050B1A" }}>
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-xs font-mono tracking-[0.22em] text-[#00D4FF]">CHAIS SABIR EQUATION · FIRST-PARTY LEGACY STUDY</p><Link href="/synchronization-research" className="rounded-xl border px-4 py-2 text-xs font-black text-[#FFDEA0]" style={{ borderColor: "rgba(255,184,0,0.42)" }}>Synchronization Research →</Link></div>
          <h1 className="mt-7 max-w-5xl text-4xl font-black leading-tight md:text-6xl">The Chais Sabir Equation.<br /><span className="text-[#FFB800]">A living record, calculation desk, and free study library.</span></h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-[#C8D8E7] md:text-lg">This page brings together the owner-supplied name, birth context, family chronology, prophet-seal language, frequency context, historical letter-value systems, mathematics, measurement, and interpretation. Every calculation panel shows its input and arithmetic so readers can study the work directly.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs"><span className="rounded-full border px-3 py-1.5 font-mono text-[#B5F7CC]" style={{ borderColor: "rgba(0,255,136,0.3)" }}>available now · free research access</span><span className="rounded-full border px-3 py-1.5 font-mono text-[#DCC8FF]" style={{ borderColor: "rgba(185,140,255,0.3)" }}>first-party legacy context</span><span className="rounded-full border px-3 py-1.5 font-mono text-[#9DEBFF]" style={{ borderColor: "rgba(0,212,255,0.3)" }}>browser-local calculations</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <PortalTrustLens lane="Owner-stated legacy context and reproducible research methods" source="Owner-supplied name, birth context, family chronology, seal and frequency language; linked historical, mathematics, metrology, interpretation, and ephemeris sources" readiness="Study page and browser-local calculation desk available now; collection-level tokenization requires owner release" boundary="The page shows declared inputs, source links, and arithmetic. Personal meaning and interpretation remain with the owner and each reader." />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-8 lg:grid-cols-[1.1fr_.9fr]">
        <article className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.25)", background: "linear-gradient(140deg, rgba(255,184,0,0.09), rgba(4,14,30,0.7))" }}>
          <p className="text-xs font-mono tracking-widest text-[#FFB800]">OWNER-SUPPLIED BIRTH CONTEXT</p><h2 className="mt-3 text-3xl font-black">Harlem origin record</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#050B1A]/70 p-4"><p className="text-xs text-slate-400">Date</p><p className="mt-2 font-black">August 28, 1978</p></div><div className="rounded-2xl bg-[#050B1A]/70 p-4"><p className="text-xs text-slate-400">Time</p><p className="mt-2 font-black">7:00 PM</p></div><div className="rounded-2xl bg-[#050B1A]/70 p-4"><p className="text-xs text-slate-400">Location</p><p className="mt-2 font-black">Harlem, New York</p></div></div>
          <p className="mt-6 text-sm leading-7 text-[#C8D8E7]">The owner names this context as the foundation for the Chais Sabir Equation study. The chart-input desk below keeps the date, local time, place, coordinates, time-zone history, ephemeris, and calculation convention visible for anyone who wishes to reproduce a celestial-position calculation.</p>
        </article>
        <article className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.3)", background: "rgba(185,140,255,0.05)" }}><p className="text-xs font-mono tracking-widest text-[#DCC8FF]">OWNER-STATED PROPHET SEAL & FREQUENCY CONTEXT</p><h2 className="mt-3 text-3xl font-black">KUN FAYAKŪN × ∞</h2><p className="mt-4 text-sm leading-7 text-[#C8D8E7]">The owner presents the Prophet Seal, the Chais Sabir Equation, and the named frequency language as part of a first-person legacy record. In this study, a frequency can be explored as an artistic, spiritual, or cultural expression; when it is treated as a physical measurement, its units, instrument, method, conditions, and uncertainty must be stated.</p><Link href="/frequency" className="mt-6 inline-flex rounded-xl border px-4 py-2.5 text-sm font-black text-[#DCC8FF]" style={{ borderColor: "rgba(185,140,255,0.35)" }}>Open frequency experience →</Link></article>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8"><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.24)", background: "rgba(0,212,255,0.025)" }}>
        <p className="text-xs font-mono tracking-widest text-[#00D4FF]">BROWSER-LOCAL CALCULATION DESK</p><h2 className="mt-2 text-3xl font-black">Show the method, then study the result</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#C8D8E7]">The calculations in this section run only in the current browser. They do not create a profile, connect a wallet, send data to a provider, or make a claim about the person represented by an input.</p>
        <div className="mt-6 grid gap-5 lg:grid-cols-2"><label className="block"><span className="text-xs font-bold text-[#9DEBFF]">Name for ordinal calculation</span><input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border bg-[#071326] px-4 py-3 text-white outline-none focus:border-[#00D4FF]" style={{ borderColor: "rgba(0,212,255,0.25)" }} /></label><label className="block"><span className="text-xs font-bold text-[#DCC8FF]">Hebrew spelling, if chosen by the owner</span><input value={hebrew} onChange={(event) => setHebrew(event.target.value)} placeholder="Enter a declared Hebrew spelling" className="mt-2 w-full rounded-xl border bg-[#071326] px-4 py-3 text-white outline-none focus:border-[#B98CFF]" style={{ borderColor: "rgba(185,140,255,0.25)" }} /></label><label className="block"><span className="text-xs font-bold text-[#B5F7CC]">Greek spelling, if chosen by the owner</span><input value={greek} onChange={(event) => setGreek(event.target.value)} placeholder="Enter a declared Greek spelling" className="mt-2 w-full rounded-xl border bg-[#071326] px-4 py-3 text-white outline-none focus:border-[#00FF88]" style={{ borderColor: "rgba(0,255,136,0.25)" }} /></label><div className="rounded-xl border p-4 text-sm leading-6 text-slate-300" style={{ borderColor: "rgba(255,184,0,0.22)", background: "rgba(255,184,0,0.045)" }}><strong className="text-[#FFDEA0]">Declared-method rule:</strong> Transliteration changes a letter-value input. Preserve the exact spelling chosen for a calculation beside the result.</div></div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3"><CalculationStrip label="ENGLISH ORDINAL · A=1 TO Z=26" items={ordinal} emptyText="Enter a name to begin." /><CalculationStrip label="HEBREW GEMATRIA · BASE VALUES" items={hebrewCalculation} emptyText="A declared Hebrew spelling is needed to calculate this lane." /><CalculationStrip label="GREEK ISOPSEPHY · MILESIAN VALUES" items={greekCalculation} emptyText="A declared Greek spelling is needed to calculate this lane." /></div>
      </div></section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-8 lg:grid-cols-[.95fr_1.05fr]"><article className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.24)", background: "rgba(0,255,136,0.025)" }}><p className="text-xs font-mono tracking-widest text-[#00FF88]">DATE & NUMBER THEORY</p><h2 className="mt-2 text-3xl font-black">August 28, 1978</h2><label className="mt-5 block"><span className="text-xs font-bold text-[#B5F7CC]">Date input</span><input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} className="mt-2 w-full rounded-xl border bg-[#071326] px-4 py-3 text-white outline-none focus:border-[#00FF88]" style={{ borderColor: "rgba(0,255,136,0.25)" }} /></label><div className="mt-5"><CalculationStrip label="DECIMAL DIGITS · DIGITAL ROOT" items={dateDigits} emptyText="Choose a date to calculate." /></div><p className="mt-4 text-xs leading-6 text-slate-400">Digital-root arithmetic is a repeatable base-10 calculation. The complete date stays visible beside the sum.</p></article>
        <article className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.24)", background: "rgba(0,212,255,0.025)" }}><p className="text-xs font-mono tracking-widest text-[#00D4FF]">CELESTIAL-POSITION INPUT RECORD</p><h2 className="mt-2 text-3xl font-black">Birth-chart calculation inputs</h2><p className="mt-3 text-sm leading-7 text-[#C8D8E7]">A birth-chart calculation is reproducible when the input record stays with the output. This desk records the inputs; a separate ephemeris or chart engine is needed to calculate positions.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><label><span className="text-xs text-slate-400">Local time</span><input type="time" value={birthTime} onChange={(event) => setBirthTime(event.target.value)} className="mt-1 w-full rounded-xl border bg-[#071326] px-3 py-2.5 text-sm text-white" style={{ borderColor: "rgba(0,212,255,0.25)" }} /></label><label><span className="text-xs text-slate-400">Place</span><input value={birthPlace} onChange={(event) => setBirthPlace(event.target.value)} className="mt-1 w-full rounded-xl border bg-[#071326] px-3 py-2.5 text-sm text-white" style={{ borderColor: "rgba(0,212,255,0.25)" }} /></label><label><span className="text-xs text-slate-400">Latitude (optional)</span><input value={latitude} onChange={(event) => setLatitude(event.target.value)} placeholder="Declared source coordinate" className="mt-1 w-full rounded-xl border bg-[#071326] px-3 py-2.5 text-sm text-white" style={{ borderColor: "rgba(0,212,255,0.25)" }} /></label><label><span className="text-xs text-slate-400">Longitude (optional)</span><input value={longitude} onChange={(event) => setLongitude(event.target.value)} placeholder="Declared source coordinate" className="mt-1 w-full rounded-xl border bg-[#071326] px-3 py-2.5 text-sm text-white" style={{ borderColor: "rgba(0,212,255,0.25)" }} /></label></div><div className="mt-5 rounded-2xl border p-4 text-xs leading-6 text-slate-300" style={{ borderColor: "rgba(0,212,255,0.16)", background: "rgba(4,14,30,0.58)" }}>Record set: {birthDate || "date needed"} · {birthTime || "time needed"} · {birthPlace || "place needed"} · historical time-zone check needed · ephemeris and house convention must be stated with any calculated chart.</div></article></section>

      <section className="mx-auto max-w-7xl px-5 pb-8"><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.28)", background: "linear-gradient(135deg, rgba(255,184,0,0.07), rgba(185,140,255,0.045), rgba(4,14,30,0.65))" }}><p className="text-xs font-mono tracking-widest text-[#FFB800]">FAMILY CHRONOLOGY · FIRST-PARTY REMEMBRANCE</p><h2 className="mt-2 text-3xl font-black">The Hill family record</h2><div className="mt-6 grid gap-3 md:grid-cols-3">{[["August 16, 1947", "Marie Angela Hill", "Harlem, New York — family birth record supplied by the owner."], ["August 18, 2002", "Brother remembrance", "Family remembrance date supplied by the owner."], ["August 28, 1978 · 7:00 PM", "Chais “Sabir Kajir” Hill the Great", "Harlem, New York — owner-supplied birth context."]].map(([date, title, detail]) => <article key={title} className="rounded-2xl border p-5" style={{ borderColor: "rgba(255,184,0,0.16)", background: "rgba(4,14,30,0.58)" }}><p className="text-xs font-mono text-[#FFB800]">{date}</p><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-2 text-xs leading-relaxed text-[#B9C8D7]">{detail}</p></article>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 pb-8"><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.26)", background: "rgba(185,140,255,0.04)" }}><p className="text-xs font-mono tracking-widest text-[#DCC8FF]">FREE RESEARCH LIBRARY</p><h2 className="mt-2 text-3xl font-black">Study methods, measurement, and interpretation</h2><div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{RESEARCH_SOURCES.map((item) => <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-[#B98CFF]" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(4,14,30,0.58)" }}><p className="text-xs font-mono text-[#DCC8FF]">{item.source}</p><h3 className="mt-2 font-black">{item.title}</h3><p className="mt-2 text-xs leading-relaxed text-[#AFC0CF]">{item.detail}</p><p className="mt-4 text-xs font-black text-[#DCC8FF]">Open source ↗</p></a>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 pb-8"><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.26)", background: "rgba(0,255,136,0.028)" }}><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-widest text-[#00FF88]">LEGACY COLLECTION READINESS</p><h2 className="mt-2 text-3xl font-black">Tokenization begins with a complete record</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#C8D8E7]">This is a browser-local readiness checklist for a future legacy collection. It does not mint, sell, price, list, connect a wallet, or start a transaction.</p></div><p className="rounded-full border px-4 py-2 text-sm font-black text-[#B5F7CC]" style={{ borderColor: "rgba(0,255,136,0.32)" }}>{completeCount} of {LEGACY_REQUIREMENTS.length} records checked</p></div><div className="mt-6 grid gap-3 md:grid-cols-2">{LEGACY_REQUIREMENTS.map(([key, label]) => <label key={key} className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4" style={{ borderColor: legacy[key] ? "rgba(0,255,136,0.42)" : "rgba(255,255,255,0.12)", background: legacy[key] ? "rgba(0,255,136,0.07)" : "rgba(4,14,30,0.58)" }}><input type="checkbox" checked={legacy[key]} onChange={() => toggleLegacy(key)} className="h-4 w-4 accent-[#00FF88]"/><span className="text-sm font-bold">{label}</span></label>)}</div><div className="mt-6 flex flex-wrap items-center gap-3"><button onClick={saveLegacyRecord} className="rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#04140C]">Save browser-local readiness record</button><p className="text-xs text-slate-400">{savedAt ? `Saved locally at ${new Date(savedAt).toLocaleString()}.` : "No browser-local record saved yet."}</p></div><p className="mt-5 rounded-2xl border p-4 text-sm leading-7 text-[#C8D8E7]" style={{ borderColor: "rgba(255,184,0,0.22)", background: "rgba(255,184,0,0.045)" }}>{completeCount === LEGACY_REQUIREMENTS.length ? "All readiness fields are recorded in this browser. A separate owner release record is still required before any external tokenization action." : "Operating state: requires owner release. Complete the source, rights, master, metadata, contract, destination, and release records before any future collection action."}</p></div></section>

      <section className="mx-auto max-w-7xl px-5"><div className="grid gap-3 md:grid-cols-3"><Link href="/synchronization-research" className="rounded-2xl border p-5 transition hover:-translate-y-0.5" style={{ borderColor: "rgba(0,212,255,0.22)", background: "rgba(0,212,255,0.025)" }}><p className="font-black text-[#9DEBFF]">Synchronization Research →</p><p className="mt-2 text-xs leading-relaxed text-[#AFC0CF]">Explore the source snapshot, family remembrance, learning paths, and public research catalog.</p></Link><Link href="/open-record-continuum" className="rounded-2xl border p-5 transition hover:-translate-y-0.5" style={{ borderColor: "rgba(185,140,255,0.22)", background: "rgba(185,140,255,0.025)" }}><p className="font-black text-[#DCC8FF]">Open Record Continuum →</p><p className="mt-2 text-xs leading-relaxed text-[#AFC0CF]">Read the creator-directed principles for sources, corrections, and operating state.</p></Link><Link href="/chosen-ones-exchange" className="rounded-2xl border p-5 transition hover:-translate-y-0.5" style={{ borderColor: "rgba(0,255,136,0.22)", background: "rgba(0,255,136,0.025)" }}><p className="font-black text-[#B5F7CC]">Chosen Ones Exchange →</p><p className="mt-2 text-xs leading-relaxed text-[#AFC0CF]">Share a first-person reflection in the authenticated community exchange.</p></Link></div></section>

      <section className="mx-auto max-w-7xl px-5 pt-5"><div className="rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.05] p-6"><p className="text-xs font-mono tracking-[.16em] text-[#E6D6FF]">CREATOR CONTEXT · MIRROR HANDOFF</p><h2 className="mt-3 text-3xl font-black">Carry the declared record into a practical next path.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#C8D8E7]">The Chais Sabir Allah Mirror is a creator-authored guide that connects the Equation’s visible inputs, source-led Digital DNA record, and practical ScrollVerse collaboration routes. It helps visitors navigate what is available in the portal; it does not infer conclusions or operate external systems.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/chais-sabir-allah-mirror" className="rounded-xl border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#E6D6FF]">Meet the Mirror →</Link><Link href="/creator-digital-dna" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#BFEFFF]">Read the Digital DNA record →</Link></div></div></section>
    </main>
  );
}
