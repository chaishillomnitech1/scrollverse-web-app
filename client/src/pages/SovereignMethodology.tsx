import { useMemo, useState } from "react";
import { BookMarked, CheckCircle2, FileText, Languages, ScanSearch, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { UltimateChoicePathway } from "@/components/UltimateChoicePathway";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type Reflection = { term: string; note: string };

const SOURCE_PATHS = [
  { lane: "Provenance", title: "Trace source and process", text: "Record origin, date, author or agent, method, version, and transformation.", href: "https://ardc.edu.au/resource/data-provenance/", color: "#00D4FF" },
  { lane: "Source evaluation", title: "Trace material to its context", text: "Separate background, exhibit, argument, and method sources before reaching a conclusion.", href: "https://library.usfca.edu/rhetoric-language/evaluate", color: "#00FF88" },
  { lane: "Interpretation", title: "Read language in context", text: "Study meaning, intention, history, and the movement between part and whole.", href: "https://plato.stanford.edu/entries/hermeneutics/", color: "#B98CFF" },
] as const;

const RECORD_LAYERS = [
  { title: "First-person record", detail: "What the owner experienced, intended, created, or interprets in his own words. A copied system transmission remains separately attributed unless the owner adopts it as an authored statement.", state: "Available now", color: "#DCC8FF" },
  { title: "Original work", detail: "A ScrollVerse book, song, image, design, method, or page with its own creator and version record.", state: "Available now", color: "#9DEBFF" },
  { title: "Public reference", detail: "A source visitors can open and compare independently, with a review date and source path.", state: "Research", color: "#B5F7CC" },
  { title: "External outcome", detail: "A filing, release, account action, or transaction only after that event has its own actual record.", state: "Requires owner release", color: "#FFDEA0" },
  { title: "Third-party system transmission", detail: "A supplied digital-system exchange recorded by file, context, and date. Its language is not presented as the owner’s authored claim or as a live system action.", state: "Research", color: "#B5F7CC" },
] as const;

export default function SovereignMethodology() {
  useSovereignHeartbeat({ page: "sovereign-methodology" });
  const [term, setTerm] = useState("");
  const [note, setNote] = useState("");
  const [reflections, setReflections] = useState<Reflection[]>([]);

  const canAdd = useMemo(() => Boolean(term.trim() && note.trim()), [note, term]);
  const addReflection = () => {
    if (!canAdd) return;
    setReflections((current) => [{ term: term.trim(), note: note.trim() }, ...current].slice(0, 8));
    setTerm("");
    setNote("");
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-[#B98CFF]/25 bg-[radial-gradient(circle_at_84%_12%,rgba(185,140,255,.18),transparent_28%),radial-gradient(circle_at_8%_78%,rgba(0,212,255,.13),transparent_31%),#050B1A]">
        <div className="container py-16 md:py-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/open-record-continuum" className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">← OPEN RECORD CONTINUUM</Link>
            <span className="rounded-full border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#DCC8FF]">CREATOR-AUTHORED · OPEN METHOD</span>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#00D4FF]">SCROLLVERSE · SOVEREIGN METHODOLOGY</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.93] md:text-7xl">Document the life. <span className="text-[#DCC8FF]">Leave room to examine it.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This is the owner’s creator-authored methodology: document what is experienced and created, study language and context, build original work, retain dates and sources, and let visitors make their own assessment from the record. The method is available for study; agreement remains a visitor’s choice.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/synchronization-research" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#04101D]">Open Synchronization Research</Link><Link href="/chais-sabir-equation" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Open Pattern Study</Link></div>
            </div>
            <aside className="rounded-3xl border border-[#B98CFF]/35 bg-[#071426]/80 p-6">
              <p className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">METHOD STATEMENT</p>
              <blockquote className="mt-5 border-l-2 border-[#B98CFF] pl-4 text-lg font-bold leading-8 text-white">“I document what I create, what I observe, what I learn, and how I name it—then I keep the source path open enough for people to see it in their own way.”</blockquote>
              <p className="mt-5 text-sm leading-7 text-[#C9D8E7]">The ScrollVerse record holds first-person voice, original work, public learning sources, and documented project results in distinct lanes so visitors can follow the trail without being asked to surrender their judgment.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-10"><PortalTrustLens lane="Sovereign Methodology and Open Record" source="Owner-authored methodology statement, original ScrollVerse records, and public provenance, source-evaluation, and interpretation learning references." readiness="Available now as a free creator-authored methodology and browser-local language-study tool." boundary="The page preserves the owner’s practice and links to sources. It does not turn a personal interpretation into an external authority, legal outcome, scientific result, or decision for another person." /></section>

      <section className="container pb-10">
        <div className="flex items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">FOUR RECORD LAYERS</p><h2 className="mt-2 text-3xl font-black">Keep every kind of statement in its own lane.</h2></div><FileText className="h-9 w-9 text-[#FFCC4D]" /></div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{RECORD_LAYERS.map((layer) => <article key={layer.title} className="rounded-3xl border bg-white/[.025] p-5" style={{ borderColor: `${layer.color}55` }}><p className="text-xs font-mono tracking-[.14em]" style={{ color: layer.color }}>{layer.state}</p><h3 className="mt-3 text-xl font-black">{layer.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{layer.detail}</p></article>)}</div>
      </section>

      <section className="border-y border-white/10 bg-white/[.018]"><div className="container py-12"><div className="grid gap-7 lg:grid-cols-[.82fr_1.18fr]"><div><p className="text-xs font-mono tracking-[.16em] text-[#00FF88]">LANGUAGE REFLECTION BOARD</p><h2 className="mt-2 text-3xl font-black">Examine a phrase before letting it govern the frame.</h2><p className="mt-4 text-sm leading-7 text-[#C9D8E7]">Use this browser-local board to record an original question about a saying, term, or phrase. It creates a personal study note in the current browser session only; it does not publish, send, or decide meaning for anyone else.</p><div className="mt-6 space-y-3"><label className="block"><span className="text-xs font-bold text-[#B5F7CC]">Phrase or term</span><input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Example: ‘proof’" className="mt-2 w-full rounded-xl border border-[#00FF88]/25 bg-[#071426] px-4 py-3 text-sm text-white outline-none focus:border-[#00FF88]" /></label><label className="block"><span className="text-xs font-bold text-[#B5F7CC]">Your study note</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="What does this word frame, invite, limit, or leave open?" rows={4} className="mt-2 w-full resize-y rounded-xl border border-[#00FF88]/25 bg-[#071426] px-4 py-3 text-sm text-white outline-none focus:border-[#00FF88]" /></label><button type="button" onClick={addReflection} disabled={!canAdd} className="rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#04101D] disabled:cursor-not-allowed disabled:opacity-40">Add local reflection</button></div></div><div className="rounded-3xl border border-[#00FF88]/25 bg-[#071426]/75 p-6"><div className="flex items-center gap-3"><Languages className="h-6 w-6 text-[#00FF88]" /><div><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">CURRENT SESSION</p><h3 className="text-xl font-black">Your reflection cards</h3></div></div>{reflections.length ? <div className="mt-5 space-y-3">{reflections.map((reflection, index) => <article key={`${reflection.term}-${index}`} className="rounded-2xl border border-white/10 bg-black/15 p-4"><p className="font-black text-[#B5F7CC]">{reflection.term}</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{reflection.note}</p></article>)}</div> : <p className="mt-6 rounded-2xl border border-dashed border-white/15 p-5 text-sm leading-7 text-[#AFC0CF]">No reflection has been added in this browser session. Start with one phrase and one question.</p>}</div></div></div></section>

      <section className="container py-12"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">FREE LEARNING PATHS</p><h2 className="mt-2 text-3xl font-black">Study recordkeeping, sources, and interpretation.</h2></div><ScanSearch className="h-9 w-9 text-[#00D4FF]" /></div><div className="mt-7 grid gap-4 md:grid-cols-3">{SOURCE_PATHS.map((source) => <a key={source.lane} href={source.href} target="_blank" rel="noreferrer" className="rounded-3xl border bg-white/[.025] p-6 transition hover:-translate-y-0.5" style={{ borderColor: `${source.color}55` }}><p className="text-xs font-mono tracking-[.16em]" style={{ color: source.color }}>{source.lane}</p><h3 className="mt-3 text-xl font-black">{source.title}</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{source.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: source.color }}>Open free source <Sparkles className="h-4 w-4" /></span></a>)}</div></section>

      <section className="container pb-12"><div className="rounded-3xl border border-[#B98CFF]/30 bg-[linear-gradient(135deg,rgba(185,140,255,.11),rgba(0,212,255,.04))] p-7"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">CONNECTED RECORD PATHS</p><h2 className="mt-2 text-3xl font-black">Move from method to source, reflection, and original work.</h2></div><BookMarked className="h-10 w-10 text-[#DCC8FF]" /></div><div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4"><Link href="/journey-co-creation-archive" className="rounded-2xl border border-[#FFCC4D]/30 bg-[#050B1A]/50 p-5"><p className="font-black text-[#FFDEA0]">Journey &amp; Co-Creation →</p><p className="mt-2 text-xs leading-6 text-[#C9D8E7]">Connect life record, creation, research, and protected exchange artifacts.</p></Link><Link href="/open-record-continuum" className="rounded-2xl border border-[#B98CFF]/30 bg-[#050B1A]/50 p-5"><p className="font-black text-[#DCC8FF]">Open Record Continuum →</p><p className="mt-2 text-xs leading-6 text-[#C9D8E7]">Source layers, correction paths, and creator-directed continuity.</p></Link><Link href="/synchronization-research" className="rounded-2xl border border-[#00D4FF]/30 bg-[#050B1A]/50 p-5"><p className="font-black text-[#9DEBFF]">Synchronization Research →</p><p className="mt-2 text-xs leading-6 text-[#C9D8E7]">First-person records, public sources, and reader-led comparison.</p></Link><Link href="/chosen-ones-exchange" className="rounded-2xl border border-[#00FF88]/30 bg-[#050B1A]/50 p-5"><p className="font-black text-[#B5F7CC]">Experience Exchange →</p><p className="mt-2 text-xs leading-6 text-[#C9D8E7]">A community space for participants to share reflections in their own words.</p></Link></div></div></section>
      <UltimateChoicePathway context="In the methodology, the model becomes a reflection checkpoint: identify the response frame, inspect its language and context, then choose what to document or do next." />
    </main>
  );
}
