import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, FileCheck2, GitBranch, Search, ShieldCheck } from "lucide-react";
import { SOURCE_BATCHES, SOURCE_COLLECTIONS } from "@/lib/sourceCollections";
import { ACCESSION_RECORDS } from "@/lib/accessionRecords";
import { resolveSourceCollectionsToWork } from "../../../server/atlas/source-work-resolver";

// These are explicit first-party destinations already registered in App.tsx
// and in the Digitalship Accession Desk. This list is intentionally narrow;
// unresolved collections remain visible instead of receiving guessed matches.
const REGISTERED_WORK_REFERENCES = [
  { id: "new-dominion-story-blueprint", title: "New Dominion Story Blueprint", route: "/new-dominion-story-blueprint", status: "REGISTERED_ROUTE" },
  { id: "fluidity-corpus-blueprint", title: "Fluidity & Corpus Blueprint", route: "/fluidity-corpus-blueprint", status: "REGISTERED_ROUTE" },
  { id: "episode-brief-builder", title: "Episode Brief Builder", route: "/episode-brief-builder", status: "REGISTERED_ROUTE" },
  { id: "nine-frame-manifestation-packet", title: "Nine-Frame Manifestation Planning Packet", route: "/nine-frame-manifestation-packet", status: "REGISTERED_ROUTE" },
  { id: "plasma-state-map", title: "Plasma State Map", route: "/plasma", status: "REGISTERED_ROUTE" },
] as const;

const badge = "rounded-full border px-3 py-1 text-[10px] font-mono tracking-[.12em]";

export default function SourceWorkReview() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | "LINKED" | "UNRESOLVED">("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const resolutions = useMemo(() => resolveSourceCollectionsToWork({
    collections: SOURCE_COLLECTIONS,
    batches: SOURCE_BATCHES,
    accessions: ACCESSION_RECORDS,
    workReferences: REGISTERED_WORK_REFERENCES,
  }), []);

  const filtered = resolutions.filter(item => {
    const text = [item.title, item.category, item.detail, item.route, ...item.matches.map(match => match.title)].join(" ").toLowerCase();
    const queryMatch = text.includes(query.trim().toLowerCase());
    const linked = item.resolution !== "UNRESOLVED";
    const stateMatch = filter === "ALL" || (filter === "LINKED" ? linked : !linked);
    return queryMatch && stateMatch;
  });
  const selected = filtered.find(item => item.sourceCollectionId === selectedId) ?? filtered[0];
  const linkedCount = resolutions.filter(item => item.resolution !== "UNRESOLVED").length;
  const citationCount = resolutions.reduce((sum, item) => sum + item.citations.length, 0);
  const exactAccessionLinks = resolutions.reduce((sum, item) => sum + item.citations.reduce((inner, citation) => inner + citation.accessions.length, 0), 0);

  return (
    <main className="min-h-screen bg-[#050914] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/source-collections" className="text-xs font-mono tracking-[.15em] text-[#9DEBFF]">← SOURCE COLLECTIONS</Link>
          <span className={badge + " border-[#FFE09A]/35 bg-[#FFE09A]/[.07] text-[#FFE09A]"}>READ-ONLY · HUMAN REVIEW REQUIRED</span>
        </div>
        <header className="mt-12 max-w-4xl">
          <p className="text-xs font-mono tracking-[.2em] text-[#9DEBFF]">SCROLLVERSE · SOURCE → PROJECT LINEAGE</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">Source-to-Work <span className="text-[#FFE09A]">Review.</span></h1>
          <p className="mt-5 text-base leading-8 text-[#D6E2EE]">A review surface connecting the existing creator collections, accession fingerprints, and explicitly registered project routes. Each connection remains a candidate until a human approves it.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/digitalship-accession" className="rounded-xl border border-[#DCC8FF]/40 bg-[#B98CFF]/[.08] px-4 py-3 text-sm font-bold text-[#E8DFFF]">Open Accession Desk <ArrowRight className="ml-2 inline h-4 w-4" /></Link>
            <Link href="/atlas-core" className="rounded-xl border border-[#9DEBFF]/40 bg-[#00D4FF]/[.06] px-4 py-3 text-sm font-bold text-[#9DEBFF]">Open Atlas Core <ArrowRight className="ml-2 inline h-4 w-4" /></Link>
          </div>
        </header>

        <section className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><p className="text-3xl font-black text-[#9DEBFF]">{resolutions.length}</p><p className="mt-2 text-xs text-[#AFC0CF]">Source collections retained</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><p className="text-3xl font-black text-[#B5F7CC]">{linkedCount}</p><p className="mt-2 text-xs text-[#AFC0CF]">Exact route/title candidates</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><p className="text-3xl font-black text-[#DCC8FF]">{citationCount}</p><p className="mt-2 text-xs text-[#AFC0CF]">Source citations retained</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><p className="text-3xl font-black text-[#FFE09A]">{exactAccessionLinks}</p><p className="mt-2 text-xs text-[#AFC0CF]">Exact accession fingerprint joins</p></div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[1.7rem] border border-[#00D4FF]/25 bg-[#071426] p-5">
            <div className="flex items-center gap-3"><Search className="h-5 w-5 text-[#9DEBFF]" /><label htmlFor="source-work-search" className="text-xs font-mono tracking-[.14em] text-[#9DEBFF]">FIND A SOURCE OR PROJECT</label></div>
            <input id="source-work-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search collection, category, route…" className="mt-4 h-12 w-full rounded-xl border border-white/15 bg-black/25 px-4 text-sm outline-none focus:border-[#9DEBFF]" />
            <div className="mt-4 flex flex-wrap gap-2">
              {(["ALL", "LINKED", "UNRESOLVED"] as const).map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)} className={badge + (filter === value ? " border-[#FFE09A]/50 bg-[#FFE09A]/10 text-[#FFE09A]" : " border-white/15 text-[#AFC0CF]")}>{value}</button>)}
            </div>
            <p className="mt-5 text-[10px] font-mono text-[#AFC0CF]">{filtered.length} REVIEW RECORDS</p>
            <div className="mt-3 space-y-2">
              {filtered.map(item => <button key={item.sourceCollectionId} type="button" onClick={() => setSelectedId(item.sourceCollectionId)} aria-pressed={selected?.sourceCollectionId === item.sourceCollectionId} className={"w-full rounded-xl border p-4 text-left transition " + (selected?.sourceCollectionId === item.sourceCollectionId ? "border-[#FFE09A]/60 bg-[#FFE09A]/[.07]" : "border-white/10 bg-black/20 hover:border-white/25")}>
                <span className="flex items-start justify-between gap-3"><span className="font-bold">{item.title}</span><span className={badge + (item.resolution === "UNRESOLVED" ? " border-white/15 text-[#AFC0CF]" : " border-[#B5F7CC]/35 text-[#B5F7CC]")}>{item.resolution.replaceAll("_", " ")}</span></span>
                <span className="mt-2 block text-[10px] font-mono text-[#9DEBFF]">{item.category} · {item.citations.length} citations</span>
              </button>)}
              {filtered.length === 0 && <p className="rounded-xl border border-white/10 p-4 text-sm text-[#AFC0CF]">No source collections match this filter. Original records remain unchanged.</p>}
            </div>
          </div>

          <div className="rounded-[1.7rem] border border-[#B98CFF]/25 bg-[#071426] p-5 sm:p-7">
            {!selected ? <div className="py-12 text-center text-[#AFC0CF]">Select a source collection to inspect its evidence trail.</div> : <>
              <div className="flex items-center gap-3 text-[#DCC8FF]"><GitBranch className="h-5 w-5" /><p className="text-xs font-mono tracking-[.15em]">CANDIDATE PROJECT CONNECTIONS</p></div>
              <h2 className="mt-4 text-3xl font-black">{selected.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.detail}</p>
              <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-mono text-[#9DEBFF]">SOURCE COLLECTION ROUTE</p><p className="mt-2 font-mono text-sm">{selected.route}</p><p className="mt-2 text-xs text-[#AFC0CF]">Catalog date: {selected.catalogDate} · Human review required</p></div>
              <h3 className="mt-6 flex items-center gap-2 text-sm font-black"><ShieldCheck className="h-4 w-4 text-[#B5F7CC]" />Registered work references</h3>
              {selected.matches.length ? <div className="mt-3 space-y-2">{selected.matches.map(match => <div key={match.workReferenceId} className="rounded-xl border border-[#B5F7CC]/25 bg-[#B5F7CC]/[.045] p-4"><p className="font-bold">{match.title}</p><p className="mt-2 font-mono text-xs text-[#B5F7CC]">{match.route} · {match.matchKind}</p><p className="mt-2 text-xs text-[#AFC0CF]">Candidate only. No Atlas relationship has been written or approved.</p></div>)}</div> : <p className="mt-3 rounded-xl border border-white/10 p-4 text-sm text-[#AFC0CF]">No exact registered route or title match. This item remains unresolved; no fuzzy match was invented.</p>}
              <h3 className="mt-6 flex items-center gap-2 text-sm font-black"><FileCheck2 className="h-4 w-4 text-[#FFE09A]" />Preserved source citations & accession receipts</h3>
              <div className="mt-3 space-y-3">{selected.citations.map((citation, index) => <article key={citation.batchId + ":" + citation.lines.join("-") + ":" + index} className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="font-mono text-xs text-[#FFE09A]">{citation.batchId} · lines {citation.lines[0]}–{citation.lines[1]}</p><p className="mt-2 break-all text-xs text-[#AFC0CF]">{citation.filename ?? "Batch receipt not found"} · {citation.recordedBytes ?? "bytes unknown"} bytes</p><p className="mt-2 break-all text-[10px] text-[#718096]">SHA-256: {citation.recordedSha256 ?? "not recorded"}</p>{citation.versionLabel && <p className="mt-2 text-xs text-[#DCC8FF]">{citation.versionLabel}</p>}{citation.accessions.map(accession => <div key={accession.recordedSha256} className="mt-3 rounded-lg border border-[#9DEBFF]/20 p-3"><p className="text-xs font-bold text-[#9DEBFF]">Exact accession fingerprint match</p><p className="mt-1 break-all text-[10px] text-[#AFC0CF]">{accession.filename} · {accession.recordedBytes} bytes · {accession.byteAvailability}</p><p className="mt-1 break-all text-[10px] text-[#718096]">SHA-256: {accession.recordedSha256}</p></div>)}</article>)}</div>
              <div className="mt-6 rounded-xl border border-[#FFE09A]/25 bg-[#FFE09A]/[.045] p-4 text-xs leading-6 text-[#E8DCC2]">Review gate: this view is read-only. It does not alter source records, accession metadata, Atlas, visibility, or publication state. Approve and write relationships only through a separately reviewed Atlas workflow.</div>
            </>}
          </div>
        </section>
      </div>
    </main>
  );
}
