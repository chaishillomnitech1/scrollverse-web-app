import { useState } from "react";
import { Link } from "wouter";
import { SOURCE_BATCHES, SOURCE_COLLECTIONS, SOURCE_TITLE_INDEX, type SourceRecord } from "@/lib/sourceCollections";
import { paginatePortfolio } from "@/lib/portfolioPagination";

const categories = ["All", "Stories", "Books", "Systems", "Identity", "Artifacts"];
const control = "min-h-11 rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CEEDD]";

export default function SourceCollections() {
  const [mode, setMode] = useState<"collections" | "titles">("collections");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const records = mode === "collections" ? SOURCE_COLLECTIONS : SOURCE_TITLE_INDEX;
  const options = { query, category, page, pageSize: 6, sort: "newest" as const };
  const results = paginatePortfolio(records, options);
  const selected = results.items.find(item => item.id === selectedId) ?? results.items[0];
  const reset = () => { setPage(1); setSelectedId(null); setFeedback(""); };

  const download = () => {
    const matching = paginatePortfolio(records, { ...options, page: 1, pageSize: records.length }).items;
    const receiptIds = new Set(matching.flatMap(item => item.sources.map(source => source.batch)));
    const record = {
      recordType: "scrollverse_source_collection", version: 1, catalogDate: "2026-10-12",
      mode, filters: { query, category }, records: matching,
      sourceReceipts: SOURCE_BATCHES.filter(source => receiptIds.has(source.id)),
      scope: "Local source index. Creator descriptions and source titles; media bodies and private counsel material excluded. No publication or external operation.",
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "scrollverse-source-collections.json"; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback(`Downloaded ${matching.length} filtered source records to this device.`);
  };

  const detail = (item: SourceRecord) => <article className="rounded-3xl border border-[#8CEEDD]/35 bg-[#0A1820] p-6 md:p-8" aria-labelledby="selected-source-title">
    <p className="text-[11px] font-mono uppercase tracking-[.18em] text-[#8CEEDD]">Selected / {item.label}</p>
    <h2 id="selected-source-title" className="mt-4 text-3xl font-black leading-tight text-white">{item.title}</h2>
    <p className="mt-5 text-base leading-8 text-[#D1E4EA]">{item.detail}</p>
    {item.occurrences && <p className="mt-4 text-sm text-[#FFD18A]">{item.occurrences} source {item.occurrences === 1 ? "occurrence" : "occurrences"} retained</p>}
    <h3 className="mt-8 text-xs font-mono uppercase tracking-[.18em] text-[#8CEEDD]">Source citations</h3>
    <ul className="mt-3 space-y-3">
      {item.sources.map((citation, index) => {
        const source = SOURCE_BATCHES.find(batch => batch.id === citation.batch)!;
        return <li key={`${source.id}-${index}`} className="rounded-xl border border-white/15 bg-[#061016] px-4 py-3 text-sm leading-6 text-[#D1E4EA]"><span className="break-all font-medium text-white">{source.filename}</span><span className="block text-[#A3C3CD]">Lines {citation.lines[0]}–{citation.lines[1]} · supplied text</span><p className="mt-1 text-xs leading-5 text-[#FFD18A]">{source.versionLabel ?? 'Supplied text'}</p><details className="mt-2"><summary className="min-h-8 cursor-pointer text-xs text-[#8CEEDD] focus-visible:outline-2 focus-visible:outline-offset-2">Show source receipt</summary><p className="mt-2 text-xs">{source.bytes.toLocaleString()} bytes · {source.lineCount.toLocaleString()} lines</p><code className="mt-1 block break-all text-[11px] leading-5">SHA-256 {source.sha256}</code></details></li>;
      })}
    </ul>
    <p className="mt-6 text-xs leading-6 text-[#A3C3CD]">Cataloged October 12, 2026. Citations identify the supplied text; the continuation opens an existing creator tool.</p>
    <Link href={item.href} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#8CEEDD] px-5 py-3 text-sm font-black text-[#061016] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Open planning continuation →</Link>
  </article>;

  return <main className="min-h-screen bg-[#050D12] pb-28 text-white">
    <section className="relative overflow-hidden border-b border-[#8CEEDD]/20 bg-[radial-gradient(ellipse_at_85%_0%,rgba(140,238,221,.12),transparent_60%)]">
      <div className="container py-10 md:py-16">
        <nav aria-label="Source collection navigation" className="flex flex-wrap gap-6 text-sm text-[#8CEEDD]"><Link href="/" className="inline-flex min-h-11 items-center font-semibold">← ScrollVerse</Link><Link href="/omniversal-source-ledger" className="inline-flex min-h-11 items-center font-semibold">Source Ledger →</Link></nav>
        <div className="mt-9 grid gap-8 md:grid-cols-[1.5fr_.5fr] md:items-end">
          <div><p className="text-xs font-mono uppercase tracking-[.24em] text-[#8CEEDD]">The creator archive / October accession</p><h1 className="mt-5 text-5xl font-black leading-[.96] tracking-tight md:text-7xl">Ideas become<br /><span className="text-[#FFD18A]">collections.</span></h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#D1E4EA]">Follow the story families, preserve the original titles, and carry a precise source into the next creator tool. {SOURCE_BATCHES.length} separately identified source versions, one connected reading room.</p></div>
          <div className="border-l border-[#FFD18A]/40 pl-6"><span className="text-6xl font-light text-[#FFD18A]">{SOURCE_COLLECTIONS.length.toString().padStart(2, "0")}</span><p className="mt-2 text-xs font-mono uppercase tracking-[.16em] text-[#A3C3CD]">Editorial collections</p><p className="mt-5 text-sm leading-7 text-[#D1E4EA]">{SOURCE_TITLE_INDEX.length} unique source titles<br />{SOURCE_BATCHES.length} byte-identified receipts</p></div>
        </div>
      </div>
    </section>

    <section className="container py-10 md:py-14" aria-label="Browse source records">
      <div className="flex flex-wrap items-center justify-between gap-5"><div role="group" aria-label="Source record view" className="flex rounded-2xl border border-white/20 p-1">{([['collections', 'Collections'], ['titles', 'Artifact titles']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => { setMode(value); reset(); }} className={`${control} border-transparent ${mode === value ? 'bg-[#8CEEDD] text-[#061016]' : 'text-[#D1E4EA]'}`}>{label}</button>)}</div><button type="button" className={`${control} text-[#FFD18A]`} onClick={download}>Download filtered JSON ↓</button></div>
      <p className="mt-5 text-sm leading-7 text-[#A3C3CD]">{mode === 'titles' ? 'Exact titles from the supplied HTML artifact index. Repeated occurrences are grouped; artifact bodies are separate sources.' : 'Repeated visual and story directions are grouped into canonical collections, with their source passages retained.'}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]"><label className="flex min-h-12 items-center gap-4 rounded-xl border border-[#8CEEDD]/35 bg-[#0A1820] px-4 focus-within:ring-2 focus-within:ring-[#8CEEDD]/40"><span className="text-[11px] font-mono tracking-[.1em] text-[#8CEEDD]">SEARCH</span><input aria-label="Search source collections" type="search" value={query} onChange={event => { setQuery(event.target.value); reset(); }} placeholder="Find a title, story, or source family" className="min-w-0 flex-1 bg-transparent py-3 text-base text-white outline-none placeholder:text-[#A3C3CD]" /></label><div role="group" aria-label="Filter source category" className="flex flex-wrap gap-2">{categories.map(value => <button key={value} type="button" aria-pressed={category === value} onClick={() => { setCategory(value); reset(); }} className={`${control} ${category === value ? 'border-[#FFD18A] bg-[#FFD18A]/10 text-[#FFD18A]' : 'text-[#D1E4EA]'}`}>{value}</button>)}</div></div>
      <p role="status" className="mt-5 text-xs font-mono text-[#A3C3CD]">{results.total} matching records · Page {results.page} of {results.pageCount}</p>
      {feedback && <p role="status" className="mt-3 text-sm text-[#8CEEDD]">{feedback}</p>}
      {selected ? <div className="mt-7 grid items-start gap-6 xl:grid-cols-[1.3fr_1fr]"><div className="grid gap-4 sm:grid-cols-2">{results.items.map(item => <button key={item.id} type="button" aria-pressed={selected.id === item.id} onClick={() => setSelectedId(item.id)} className="group min-w-0 overflow-hidden rounded-3xl border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CEEDD]" style={{ borderColor: selected.id === item.id ? item.color : '#FFFFFF30', background: selected.id === item.id ? `${item.color}0C` : '#0A151D' }}><div aria-hidden="true" className="relative flex h-24 items-center overflow-hidden border-b border-white/15"><span className="text-4xl font-light tracking-tight" style={{ color: item.color }}>{item.mark}</span><span className="absolute right-2 h-20 w-20 rounded-full border border-current opacity-20" style={{ color: item.color }} /><span className="absolute right-6 h-12 w-12 rotate-45 border border-current opacity-30" style={{ color: item.color }} /></div><p className="mt-4 text-[10px] font-mono uppercase tracking-[.15em]" style={{ color: item.color }}>{item.category} / {item.label}</p><h2 className="mt-3 break-words text-xl font-black leading-snug">{item.title}</h2><p className="mt-4 text-xs leading-6 text-[#A3C3CD]">{item.sources.length} source {item.sources.length === 1 ? 'citation' : 'citations'} · Read details →</p></button>)}</div>{detail(selected)}</div> : <div className="mt-7 rounded-3xl border border-dashed border-white/25 p-10 text-center"><h2 className="text-2xl font-bold">No source records match</h2><p className="mt-3 text-[#A3C3CD]">Try a different category or keyword.</p><button type="button" className={`${control} mt-5 text-[#8CEEDD]`} onClick={() => { setQuery(''); setCategory('All'); reset(); }}>Clear filters</button></div>}
      {results.total > 0 && <nav aria-label="Source collection pagination" className="mt-8 flex flex-wrap items-center justify-center gap-4"><button type="button" className={`${control} disabled:opacity-40`} disabled={results.page === 1} onClick={() => { setPage(results.page - 1); setSelectedId(null); }}>Previous</button><span className="text-sm text-[#A3C3CD]">Page {results.page} / {results.pageCount}</span><button type="button" className={`${control} disabled:opacity-40`} disabled={results.page === results.pageCount} onClick={() => { setPage(results.page + 1); setSelectedId(null); }}>Next</button></nav>}
    </section>
    <section className="container"><div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-[#FFD18A]/25 bg-[#FFD18A]/[.04] p-6"><div><h2 className="text-xl font-black text-[#FFD18A]">Carry the source forward.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#D1E4EA]">Choose an exact passage, intended use and source file in the Accession Desk. Private counsel material is excluded from this gallery and its exports.</p></div><Link href="/digitalship-accession" className={`${control} inline-flex items-center text-[#8CEEDD]`}>Open Accession Desk →</Link></div><p className="mt-5 text-xs leading-6 text-[#A3C3CD]">Text-led local catalog. Supplied operational titles remain source wording; this reading room does not activate external systems or publish media.</p></section>
  </main>;
}
