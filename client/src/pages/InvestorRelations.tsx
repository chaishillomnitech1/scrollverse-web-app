import { useEffect, useMemo, useState, useTransition } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Film, Image as ImageIcon, ShieldCheck } from "lucide-react";
import {
  filterInvestorRelationRecords,
  INVESTOR_RELATIONS_RECORDS,
  getInvestorRelationSummary,
  sortInvestorRelationRecords,
} from "@/lib/investorRelations";

export default function InvestorRelations() {
  const summary = getInvestorRelationSummary(INVESTOR_RELATIONS_RECORDS);
  const [kind, setKind] = useState<"all" | "still" | "motion">("all");
  const [sort, setSort] = useState<"title-asc" | "title-desc" | "kind">("title-asc");
  const [selectedId, setSelectedId] = useState(INVESTOR_RELATIONS_RECORDS[0]?.id ?? "");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const composition = [
    { kind: "still" as const, label: "Still masterpieces", value: summary.stills, color: "#6ee7b7" },
    { kind: "motion" as const, label: "Motion references", value: summary.motion, color: "#67e8f9" },
  ];
  const visibleRecords = useMemo(
    () => sortInvestorRelationRecords(filterInvestorRelationRecords(kind), sort),
    [kind, sort],
  );
  const selectedRecord = visibleRecords.find((record) => record.id === selectedId) ?? visibleRecords[0];
  const previewRecord = INVESTOR_RELATIONS_RECORDS.find((record) => record.id === previewId);

  useEffect(() => {
    if (!previewRecord) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewRecord]);

  const updateGallery = (update: () => void) => startTransition(update);

  return (
    <main className="min-h-screen bg-[#050b1a] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan-400/30 px-4 text-sm text-cyan-200 transition hover:border-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to ScrollVerse
        </Link>
        <header className="mt-10 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">Source-labeled local showcase</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Investor Relations Dashboard</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">A clear presentation layer for selected creator-supplied still and motion references. This page presents the catalog and its provenance; it is not an investment offer, financial performance report, rights clearance, or publication record.</p>
        </header>

        <section aria-label="Catalog summary" className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Catalog records", summary.total, "Source-labeled references"],
            ["Still masterpieces", summary.stills, "Displayed with descriptive labels"],
            ["Motion references", summary.motion, "Play only when selected"],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-black text-emerald-300">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{detail}</p>
            </div>
          ))}
        </section>

        <section aria-label="Catalog composition chart" className="mt-8 rounded-2xl border border-cyan-300/15 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">Catalog composition</p>
              <h2 className="mt-2 text-2xl font-black">Source-labeled records by format</h2>
            </div>
            <p className="text-sm text-slate-400">A display inventory, not a financial performance claim.</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2" role="group" aria-label="Show only catalog format">
            {composition.map((item) => {
              const width = summary.total ? Math.max(12, Math.round((item.value / summary.total) * 100)) : 0;
              return <button key={item.kind} type="button" aria-pressed={kind === item.kind} onClick={() => updateGallery(() => setKind(kind === item.kind ? "all" : item.kind))} className="rounded-xl border border-white/10 p-4 text-left transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none">
                <span className="flex items-center justify-between gap-3 text-sm font-semibold"><span>{item.label}</span><span className="text-slate-300">{item.value}</span></span>
                <span className="mt-3 block h-3 overflow-hidden rounded-full bg-white/10" aria-hidden="true"><span className="bar block h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${width}%`, backgroundColor: item.color }} /></span>
                <span className="mt-2 block text-xs text-slate-400">Show only {item.label.toLowerCase()}</span>
              </button>;
            })}
          </div>
        </section>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5 text-sm text-emerald-100" role="status">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p><strong>Local catalog status:</strong> {summary.externalActions} external actions. Hashes, source labels, and display boundaries remain in the accession records.</p>
        </div>

        <section aria-labelledby="investor-gallery-heading" className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300">Artifact wall</p>
              <h2 id="investor-gallery-heading" className="mt-2 text-3xl font-black">Motion to still masterpieces</h2>
            </div>
            <Link href="/digitalship-accession" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-300/30 px-4 text-sm text-amber-100 transition hover:border-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
              Open accession records <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div>
              <label htmlFor="investor-kind" className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400">View type</label>
              <select id="investor-kind" value={kind} onChange={(event) => updateGallery(() => setKind(event.target.value as typeof kind))} className="mt-2 block min-h-11 rounded-xl border border-cyan-300/25 bg-[#071124] px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <option value="all">All masterworks</option><option value="still">Still masterpieces</option><option value="motion">Motion references</option>
              </select>
            </div>
            <div>
              <label htmlFor="investor-sort" className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400">Sort</label>
              <select id="investor-sort" value={sort} onChange={(event) => updateGallery(() => setSort(event.target.value as typeof sort))} className="mt-2 block min-h-11 rounded-xl border border-amber-300/25 bg-[#071124] px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                <option value="title-asc">Title A–Z</option><option value="title-desc">Title Z–A</option><option value="kind">Group by type</option>
              </select>
            </div>
            <p className="text-sm text-slate-300" aria-live="polite">{isPending ? "Recomposing gallery…" : `${visibleRecords.length} source-labeled records shown`}</p>
          </div>
          {selectedRecord && (
            <div className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-300/[0.06] p-5" aria-live="polite">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-200">Selected gallery record</p>
              <h3 className="mt-2 text-2xl font-black">{selectedRecord.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{selectedRecord.description}</p>
            </div>
          )}
          <div className={`mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${isPending ? "opacity-60" : "opacity-100"} transition-opacity duration-300`}>
            {visibleRecords.map((record) => (
              <article key={record.id} className={`group overflow-hidden rounded-3xl border bg-white/[0.035] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-cyan-950/40 motion-reduce:transform-none motion-reduce:transition-none ${selectedRecord?.id === record.id ? "border-emerald-300/60" : "border-white/10"}`}>
                <div className="aspect-[16/10] bg-black/30">
                  {record.kind === "still" && record.image ? (
                    <button type="button" onClick={() => setPreviewId(record.id)} className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300" aria-label={`View full-size ${record.title}`}>
                      <img src={record.image} alt={record.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] motion-reduce:transform-none" />
                    </button>
                  ) : record.video ? (
                    <video controls preload="none" poster={record.poster} className="h-full w-full object-cover" aria-label={`${record.title} motion reference`}>
                      <source src={record.video} />
                    </video>
                  ) : null}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cyan-300">
                    {record.kind === "still" ? <ImageIcon className="h-4 w-4" aria-hidden="true" /> : <Film className="h-4 w-4" aria-hidden="true" />}
                    {record.kind}
                  </div>
                  <button type="button" aria-pressed={selectedRecord?.id === record.id} onClick={() => setSelectedId(record.id)} className="mt-3 rounded-lg text-left text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">{record.title}</button>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{record.description}</p>
                  <button type="button" onClick={() => setPreviewId(record.id)} className="mt-4 min-h-11 rounded-lg border border-cyan-300/30 px-3 text-sm text-cyan-100 transition hover:border-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none">View full-size</button>
                  <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">Source: {record.sourceLabel}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      {previewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="investor-preview-title" onMouseDown={(event) => { if (event.currentTarget === event.target) setPreviewId(null); }}>
          <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-2xl border border-cyan-300/30 bg-[#071124] p-4 shadow-2xl shadow-cyan-950/40 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-300">Full-size source preview</p>
                <h2 id="investor-preview-title" className="mt-2 text-2xl font-black">{previewRecord.title}</h2>
              </div>
              <button type="button" autoFocus onClick={() => setPreviewId(null)} aria-label="Close full-size preview" className="min-h-11 rounded-lg border border-white/20 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">Close</button>
            </div>
            <div className="mt-5 overflow-hidden rounded-xl bg-black/40">
              {previewRecord.kind === "still" && previewRecord.image ? (
                <img src={previewRecord.image} alt={previewRecord.title} className="mx-auto max-h-[68vh] w-full object-contain" />
              ) : previewRecord.video ? (
                <video controls preload="none" poster={previewRecord.poster} className="mx-auto max-h-[68vh] w-full" aria-label={`${previewRecord.title} full-size motion reference`}>
                  <source src={previewRecord.video} />
                </video>
              ) : null}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{previewRecord.description}</p>
            <p className="mt-3 text-xs text-slate-400">Source: {previewRecord.sourceLabel} · Display: {previewRecord.displayScope}</p>
          </div>
        </div>
      )}
    </main>
  );
}
