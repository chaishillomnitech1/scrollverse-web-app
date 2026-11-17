import { useMemo, useState } from "react";

type RecordState = "Research" | "Brief ready" | "Needs owner input";

type ProductionRecord = {
  title: string;
  medium: "Music" | "Visual" | "Book";
  state: RecordState;
  detail: string;
};

const RECORDS: ProductionRecord[] = [
  { title: "CHAIS X", medium: "Music", state: "Research", detail: "Source-linked catalog discovery record; no generated video or release claim." },
  { title: "The Book of the Journey", medium: "Book", state: "Brief ready", detail: "Existing free reader path with an accessible visual and reading route." },
  { title: "Future Kicks · Aero-Neon '86", medium: "Visual", state: "Needs owner input", detail: "Creator-supplied visual reference; confirm song, master, contributors, and intended release before production." },
  { title: "Marie Sophia 721", medium: "Visual", state: "Research", detail: "Source-labeled lookbook reference with metadata and provenance context." },
];

export default function CatalogProductionRecords() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<"ALL" | RecordState>("ALL");
  const visible = useMemo(() => RECORDS.filter(record => {
    const matchesQuery = `${record.title} ${record.medium} ${record.detail}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (state === "ALL" || record.state === state);
  }), [query, state]);

  return <section className="container pb-10" aria-labelledby="catalog-production-records-title">
    <div className="rounded-[2rem] border border-[#00D4FF]/30 bg-[radial-gradient(circle_at_80%_20%,rgba(0,212,255,.12),transparent_30%),#071426] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-mono tracking-[.18em] text-[#9DEBFF]">CATALOG DISCOVERY · VALIDATED PRODUCTION RECORDS</p><h2 id="catalog-production-records-title" className="mt-3 text-3xl font-black">Find the next record without a blank doorway.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#D6E2EE]">These source-labeled records organize discovery and readiness. A record is not a generated or published video.</p></div><span className="rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-3 py-2 text-xs font-mono text-[#B5F7CC]" aria-live="polite">{visible.length} visible</span></div>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]"><div><label htmlFor="production-record-search" className="text-xs font-mono text-[#B8C7D6]">Search production records</label><input id="production-record-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search title, medium, or note" className="mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-[#061226] px-3 text-sm text-white" /></div><div><label htmlFor="production-record-state" className="text-xs font-mono text-[#B8C7D6]">Filter by state</label><select id="production-record-state" value={state} onChange={event => setState(event.target.value as "ALL" | RecordState)} className="mt-2 min-h-11 rounded-xl border border-white/15 bg-[#061226] px-3 text-sm text-white"><option value="ALL">All states</option><option value="Research">Research</option><option value="Brief ready">Brief ready</option><option value="Needs owner input">Needs owner input</option></select></div></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">{visible.map(record => <article key={record.title} className="rounded-2xl border border-white/10 bg-white/[.04] p-5 transition hover:-translate-y-0.5 hover:border-[#00D4FF]/50"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-black">{record.title}</h3><span className="rounded-full border border-[#FFCC4D]/35 bg-[#FFCC4D]/10 px-2 py-1 text-[10px] font-mono text-[#FFDEA0]">{record.state}</span></div><p className="mt-2 text-xs font-mono text-[#9DEBFF]">{record.medium} · source-labeled</p><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{record.detail}</p></article>)}</div>
      {visible.length === 0 && <p className="mt-6 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/10 p-5 text-sm text-[#FFDEA0]" role="status">No record matches this search yet. Clear the filter to return to the source-labeled catalog.</p>}
      <p className="mt-6 text-xs leading-6 text-[#AFC3D8]">No provider, upload, payment, or publication action is activated by this discovery surface. Owner input, contributor context, accessibility details, and release evidence remain item-level requirements.</p>
    </div>
  </section>;
}
